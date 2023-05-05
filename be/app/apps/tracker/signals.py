from django.db import transaction

from .models import *


@transaction.atomic
def employee_m2m_changed_save_handler(sender, **kwargs):
    # here we set user groups based on employee roles
    instance = kwargs.get('instance')
    action = kwargs.get('action')
    roles = instance.roles.all()
    user = instance.user

    if action == 'post_add' or action == 'post_remove':
        user.groups.set(roles)
