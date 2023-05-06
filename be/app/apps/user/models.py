from django.db import models
from django.contrib.auth.models import Group, AbstractUser


class User(AbstractUser):
    def full_name(self) -> str:
        if self.first_name:
            return f'{self.first_name} {self.last_name}'
        return self.username


Group.add_to_class('is_default', models.BooleanField(default=False))
