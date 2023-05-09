from django.contrib.auth.models import Group, User

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status as res_status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import AuthenticationSerializer, GroupListSerializer, UserListSerializer, SignUpSerializer
from apps.user.models import User


class AuthenticationView(TokenObtainPairView):
    serializer_class = AuthenticationSerializer


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GroupListSerializer
    queryset = Group.objects.all()


class UserListAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserListSerializer
    queryset = User.objects.all()


class SignUpAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.pop('username')
        password = request.data.pop('password')
        email = f'{username}@poralia.com'
        groups = Group.objects.values_list('id', flat=True)

        instance = User.objects.create_user(
            username, email, password, **request.data)

        if groups.exists():
            instance.groups.set(groups)

        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=res_status.HTTP_201_CREATED)
