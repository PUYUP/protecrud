from django.db import transaction
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.encoding import smart_str

from rest_framework import viewsets, status as res_status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from apps.tracker.models import Company
from .serializers import ListCompanySerializer, SubmitCompanySerializer


class CompanyViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def initialize_request(self, request, *args, **kwargs):
        self.context = {'request': request}
        return super().initialize_request(request, *args, **kwargs)

    def queryset(self):
        qs = Company.objects \
            .prefetch_related('assets') \
            .select_related('created_by')

        return qs

    def queryset_authorization(self):
        queryset = self.queryset()
        current_user = self.context.get('request').user
        groups = current_user.groups.values_list('name', flat=True)

        # Not Admin only show their companies
        if 'Admin' not in groups:
            queryset = queryset.filter(created_by_id=current_user.id)

        return queryset

    def list(self, request):
        instances = self.queryset_authorization()
        serializer = ListCompanySerializer(
            instance=instances, many=True, context=self.context)

        return Response(serializer.data, status=res_status.HTTP_200_OK)

    @transaction.atomic
    def create(self, request):
        serializer = SubmitCompanySerializer(
            data=request.data, context=self.context)
        if serializer.is_valid():
            try:
                serializer.save()
            except (ValueError, DjangoValidationError) as error:
                raise ValidationError(detail=smart_str(error))
            return Response(serializer.data, status=res_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=res_status.HTTP_403_FORBIDDEN)
