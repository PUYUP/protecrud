from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import AuthenticationSerializer, GroupListSerializer, UserListSerializer

User = get_user_model()


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
