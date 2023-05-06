from django.urls import path
from .auth.views import AuthenticationView, GroupListAPIView


urlpatterns = [
    path('authentication/', AuthenticationView.as_view(), name='authentication'),
    path('groups/', GroupListAPIView.as_view(), name='group'),
]
