from django.db import transaction
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.encoding import smart_str
from django.utils.translation import gettext_lazy as _

from rest_framework import viewsets, status as res_status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from apps.tracker.models import Asset
from .serializers import ListAssetSerializer, SubmitAssetSerializer


class AssetViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def initialize_request(self, request, *args, **kwargs):
        self.context = {'request': request}
        return super().initialize_request(request, *args, **kwargs)

    def queryset(self):
        qs = Asset.objects \
            .select_related('created_by', 'company')

        return qs

    def list(self, request):
        if 'company_id' not in request.query_params:
            return Response(
                {'company_id': _("This property required")},
                status=res_status.HTTP_406_NOT_ACCEPTABLE
            )

        company_id = request.query_params.get('company_id')
        queryset = self.queryset().filter(company_id=company_id)

        serializer = ListAssetSerializer(
            instance=queryset, many=True, context=self.context)

        return Response(serializer.data, status=res_status.HTTP_200_OK)

    @transaction.atomic
    def create(self, request):
        serializer = SubmitAssetSerializer(
            data=request.data, context=self.context)
        if serializer.is_valid():
            try:
                serializer.save()
            except (ValueError, DjangoValidationError) as error:
                raise ValidationError(detail=smart_str(error))
            return Response(serializer.data, status=res_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=res_status.HTTP_403_FORBIDDEN)
