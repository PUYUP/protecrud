from django.db import transaction

from rest_framework import serializers

from apps.tracker.models import *


class BaseCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company


class ListCompanySerializer(BaseCompanySerializer):
    class Meta(BaseCompanySerializer.Meta):
        fields = '__all__'


class SubmitCompanySerializer(BaseCompanySerializer):
    created_by = serializers.HiddenField(
        default=serializers.CurrentUserDefault())

    class Meta(BaseCompanySerializer.Meta):
        fields = ['id', 'created_by', 'name', 'description']
        ekstra_kwargs = {
            'id': {'read_only': True}
        }

    @transaction.atomic
    def create(self, validated_data):
        defaults = {
            'description': validated_data.pop('description'),
        }

        instance, updated = self.Meta.model.objects \
            .update_or_create(defaults=defaults, **validated_data)

        return instance
