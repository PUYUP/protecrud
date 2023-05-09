from django.contrib.auth.models import User


class User(User):
    class Meta:
        proxy = True

    @property
    def full_name(self) -> str:
        if self.first_name:
            return f'{self.first_name} {self.last_name}'.strip()
        return self.username
