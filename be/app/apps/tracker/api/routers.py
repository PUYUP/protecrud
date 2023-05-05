from django.urls import path, include
from .v1 import routers

urlpatterns = [
    path('tracker/v1/', include((routers, 'tracker_api_v1'),
         namespace='tracker_api_v1')),
]
