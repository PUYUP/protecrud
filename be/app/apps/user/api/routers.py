from django.urls import path, include
from .v1 import routers

urlpatterns = [
    path('user/v1/', include((routers, 'user_api_v1'), namespace='user_api_v1')),
]
