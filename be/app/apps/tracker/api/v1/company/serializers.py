from django.db import transaction

from rest_framework import serializers

from apps.tracker.models import *


"""
EMPLOYEE
"""


class BaseEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee


class ListEmployeeSerializer(BaseEmployeeSerializer):
    roles = serializers.StringRelatedField(many=True)
    employee_name = serializers.CharField(source='user.full_name')

    class Meta(BaseEmployeeSerializer.Meta):
        fields = '__all__'


class SubmitEmployeeSerializer(BaseEmployeeSerializer):
    class Meta(BaseEmployeeSerializer.Meta):
        fields = ['company', 'user', 'roles']


"""
COMPANY
"""


class BaseCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company


class ListCompanySerializer(BaseCompanySerializer):
    class Meta(BaseCompanySerializer.Meta):
        fields = '__all__'


class RetrieveCompanySerializer(BaseCompanySerializer):
    employees = ListEmployeeSerializer(many=True)

    class Meta(BaseCompanySerializer.Meta):
        fields = '__all__'


class SubmitCompanySerializer(BaseCompanySerializer):
    created_by = serializers.HiddenField(
        default=serializers.CurrentUserDefault())

    class Meta(BaseCompanySerializer.Meta):
        fields = ['id', 'create_at', 'update_at',
                  'created_by', 'name', 'description']
        ekstra_kwargs = {
            'id': {'read_only': True},
            'create_at': {'read_only': True},
            'update_at': {'read_only': True},
        }

    @transaction.atomic
    def create(self, validated_data):
        defaults = {
            'description': validated_data.pop('description', None),
        }

        instance, created = self.Meta.model.objects \
            .update_or_create(defaults=defaults, **validated_data)

        # on first insert set `created_by` as `Admin` roles
        if created:
            employee_model = instance.employees.model
            employee, created = employee_model.objects \
                .get_or_create(user=instance.created_by, company=instance)

            try:
                group_by_name = Group.objects.get(name='Admin')
                employee.roles.set([group_by_name])
            except:
                pass

        return instance
