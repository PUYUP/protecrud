from django.db import models
from django.contrib.auth.models import Group


Group.add_to_class('is_default', models.BooleanField(default=False))
