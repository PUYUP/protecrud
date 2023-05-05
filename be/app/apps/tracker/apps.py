from django.apps import AppConfig
from django.db.models.signals import m2m_changed


class TrackerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.tracker'
    label = 'tracker'

    def ready(self):
        from .models import Employee
        from .signals import employee_m2m_changed_save_handler

        # Employee m2m changed
        m2m_changed.connect(employee_m2m_changed_save_handler, sender=Employee.roles.through,
                            dispatch_uid='employee_m2m_changed_save_signal')
