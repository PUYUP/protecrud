from django.contrib import admin

from .models import *


class EmployeeInline(admin.StackedInline):
    model = Employee


class CompanyAdmin(admin.ModelAdmin):
    model = Company
    inlines = [EmployeeInline]


admin.site.register(Company, CompanyAdmin)
admin.site.register(Asset)
