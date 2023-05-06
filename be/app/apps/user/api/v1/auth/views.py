from django.contrib.auth.models import Group

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import AuthenticationSerializer, GroupSerializer


class AuthenticationView(TokenObtainPairView):
    serializer_class = AuthenticationSerializer


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
