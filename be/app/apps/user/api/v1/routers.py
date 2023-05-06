from django.urls import path
from .auth.views import AuthenticationView, GroupListAPIView, UserListAPIView


urlpatterns = [
    path('authentication/', AuthenticationView.as_view(), name='authentication'),
    path('groups/', GroupListAPIView.as_view(), name='group_list'),
    path('users/', UserListAPIView.as_view(), name='user_list'),
]
