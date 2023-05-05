from django.db import transaction

from rest_framework import serializers

from apps.tracker.models import *


class BaseAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset


class ListAssetSerializer(BaseAssetSerializer):
    class Meta(BaseAssetSerializer.Meta):
        fields = '__all__'


class SubmitAssetSerializer(BaseAssetSerializer):
    created_by = serializers.HiddenField(
        default=serializers.CurrentUserDefault())

    class Meta(BaseAssetSerializer.Meta):
        fields = ['id', 'created_by', 'company', 'name',
                  'amount', 'condition', 'description']
        ekstra_kwargs = {
            'id': {'read_only': True}
        }

    @transaction.atomic
    def create(self, validated_data):
        defaults = {
            'description': validated_data.pop('description'),
            'amount': validated_data.pop('amount', 0),
            'condition': validated_data.pop('condtion', self.Meta.model.Condition.UNKNOWN),
        }

        instance, updated = self.Meta.model.objects \
            .update_or_create(defaults=defaults, **validated_data)

        return instance
