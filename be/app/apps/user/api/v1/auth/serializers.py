from django.contrib.auth.models import Group

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class AuthenticationSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here
        data['groups'] = self.user.groups.values_list('name', flat=True)

        return data


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'
