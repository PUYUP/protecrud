from django.urls import path
from .auth.views import AuthenticationView


urlpatterns = [
    path('authentication/', AuthenticationView.as_view(), name='authentication'),
]
