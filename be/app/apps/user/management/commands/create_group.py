from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _
from django.db import transaction


class Command(BaseCommand):
    help = "Creates read only default permission groups for users"
    group_data = [
        {'name': 'Admin'},
        {'name': 'User'},
    ]

    @transaction.atomic
    def handle(self, *args, **kwargs):
        for group in self.group_data:
            group_name = group.get('name')
            new_group, created = Group.objects.get_or_create(name=group_name)

            if new_group:
                self.stdout.write(
                    self.style.SUCCESS(
                        _("Create group {} OK".format(group_name))
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                _("Successfully create default group")
            )
        )
