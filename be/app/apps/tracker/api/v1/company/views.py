from django.db import transaction
from django.db.models import Count
from django.core.exceptions import ValidationError as DjangoValidationError, ObjectDoesNotExist
from django.utils.encoding import smart_str
from django.utils.translation import gettext_lazy as _

from rest_framework import viewsets, status as res_status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

from apps.tracker.models import Company, Employee
from .serializers import ListCompanySerializer, RetrieveCompanySerializer, SubmitCompanySerializer, SubmitEmployeeSerializer


class ViewSet(viewsets.ViewSet):
    def initialize_request(self, request, *args, **kwargs):
        self.context = {'request': request}
        return super().initialize_request(request, *args, **kwargs)


class CompanyViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)

    def queryset(self):
        qs = Company.objects \
            .prefetch_related('assets') \
            .select_related('created_by')

        return qs

    def queryset_authorization(self):
        queryset = self.queryset()
        current_user = self.context.get('request').user

        # show companies only for Employee (all Roles)
        groups = current_user.groups.values_list('name', flat=True)
        queryset = queryset.filter(employees__roles__name__in=groups, employees__user_id=current_user.id) \
            .annotate(count=Count('id')) \
            .order_by()

        return queryset

    def get_instance(self, pk, for_update=False):
        queryset = self.queryset_authorization()
        if for_update:
            queryset = queryset.select_for_update()

        return queryset.get(id=pk)

    def get_instance_or_notfound(self, pk, for_update=False):
        try:
            return self.get_instance(pk, for_update)
        except ObjectDoesNotExist:
            raise NotFound()

    def list(self, request):
        instances = self.queryset_authorization()
        serializer = ListCompanySerializer(
            instance=instances, many=True, context=self.context)

        return Response(serializer.data, status=res_status.HTTP_200_OK)

    def retrieve(self, request, pk):
        instance = self.get_instance_or_notfound(pk)
        serializer = RetrieveCompanySerializer(instance, context=self.context)
        return Response(serializer.data, status=res_status.HTTP_200_OK)

    @transaction.atomic
    def create(self, request):
        serializer = SubmitCompanySerializer(
            data=request.data, context=self.context)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
            except (ValueError, DjangoValidationError) as error:
                raise ValidationError(detail=smart_str(error))
            return Response(serializer.data, status=res_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=res_status.HTTP_403_FORBIDDEN)

    @transaction.atomic
    def partial_update(self, request, pk):
        instance = self.get_instance_or_notfound(pk, True)
        serializer = SubmitCompanySerializer(
            instance=instance, data=request.data, context=self.context)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
            except (ValueError, DjangoValidationError) as error:
                raise ValidationError(detail=smart_str(error))
            return Response(serializer.data, status=res_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=res_status.HTTP_403_FORBIDDEN)

    @transaction.atomic
    def destroy(self, request, pk):
        instance = self.get_instance_or_notfound(pk, True)
        instance.delete()

        return Response({'detail': _("Delete success!")}, status=res_status.HTTP_204_NO_CONTENT)


class EmployeeViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)

    def queryset(self):
        qs = Employee.objects \
            .prefetch_related('roles') \
            .select_related('user', 'company')

        return qs

    def get_instance(self, pk, for_update=False):
        queryset = self.queryset()
        if for_update:
            queryset = queryset.select_for_update()

        return queryset.get(id=pk)

    def get_instance_or_notfound(self, pk, for_update=False):
        try:
            return self.get_instance(pk, for_update)
        except ObjectDoesNotExist:
            raise NotFound()

    @transaction.atomic
    def create(self, request):
        serializer = SubmitEmployeeSerializer(
            data=request.data, context=self.context)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
            except (ValueError, DjangoValidationError) as error:
                raise ValidationError(detail=smart_str(error))
            return Response(serializer.data, status=res_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=res_status.HTTP_403_FORBIDDEN)

    @transaction.atomic
    def partial_update(self, request, pk):
        instance = self.get_instance_or_notfound(pk, True)

        # super admin a.k.a company creator can't delete
        if instance.is_super_admin:
            return Response({'detail': _("Cant update super admin")}, status=res_status.HTTP_403_FORBIDDEN)

        serializer = SubmitEmployeeSerializer(
            instance=instance, data=request.data, context=self.context)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
            except (ValueError, DjangoValidationError) as error:
                raise ValidationError(detail=smart_str(error))
            return Response(serializer.data, status=res_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=res_status.HTTP_403_FORBIDDEN)

    @transaction.atomic
    def destroy(self, request, pk):
        instance = self.get_instance_or_notfound(pk, True)

        # super admin a.k.a company creator can't delete
        if instance.is_super_admin:
            return Response({'detail': _("Cant delete super admin")}, status=res_status.HTTP_403_FORBIDDEN)

        instance.delete()

        return Response({'detail': _("Delete success!")}, status=res_status.HTTP_204_NO_CONTENT)
