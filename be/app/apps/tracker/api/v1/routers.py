from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .company.views import CompanyViewSet, EmployeeViewSet
from .asset.views import AssetViewSet

router = DefaultRouter(trailing_slash=True)
router.register('companies', CompanyViewSet, basename='company')
router.register('employees', EmployeeViewSet, basename='employee')
router.register('assets', AssetViewSet, basename='asset')

urlpatterns = [
    path('', include(router.urls)),
]
