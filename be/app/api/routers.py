from django.urls import path, include

from apps.tracker.api import routers as trakcer_routers
from apps.user.api import routers as user_routers

urlpatterns = [
    path('', include(trakcer_routers)),
    path('', include(user_routers)),
]
