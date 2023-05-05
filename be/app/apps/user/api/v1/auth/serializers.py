from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class AuthenticationSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here
        data['groups'] = self.user.groups.values_list('name', flat=True)

        return data
