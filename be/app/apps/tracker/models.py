from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Group


class Company(models.Model):
    create_at = models.DateTimeField(auto_now_add=True, db_index=True)
    update_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        User, related_name='companies', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, db_index=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-create_at']
        verbose_name_plural = _("Companies")

    def __str__(self) -> str:
        return self.name


class Employee(models.Model):
    create_at = models.DateTimeField(auto_now_add=True, db_index=True)
    update_at = models.DateTimeField(auto_now=True)

    company = models.ForeignKey(
        Company, related_name='employees', on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name='employees', on_delete=models.CASCADE)
    roles = models.ManyToManyField(Group)

    def __str__(self) -> str:
        return self.user.first_name


class Asset(models.Model):
    class Condition(models.TextChoices):
        GOOD = 'good', _("Good")
        BAD = 'bad', _("Bad")
        UNKNOWN = 'unknown', _("Unknown")

    create_at = models.DateTimeField(auto_now_add=True, db_index=True)
    update_at = models.DateTimeField(auto_now=True)

    company = models.ForeignKey(
        Company, related_name='assets', on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        User, related_name='assets', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    amount = models.IntegerField(default=0)
    condition = models.CharField(
        max_length=15, choices=Condition.choices, default=Condition.UNKNOWN)

    class Meta:
        ordering = ['-create_at']

    def __str__(self) -> str:
        return self.name
