from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

import environ

# Set Django-environ
env = environ.Env()
environ.Env.read_env(env_file=settings.ENV_PATH)


class Command(BaseCommand):
    def handle(self, *args, **options):
        if User.objects.count() == 0:
            DJANGO_SU_NAME = env("DJANGO_SU_NAME")
            DJANGO_SU_EMAIL = env("DJANGO_SU_EMAIL")
            DJANGO_SU_PASSWORD = env("DJANGO_SU_PASSWORD")

            superuser = User.objects.create_superuser(
                username=DJANGO_SU_NAME,
                email=DJANGO_SU_EMAIL,
                password=DJANGO_SU_PASSWORD,
            )

            superuser.save()
        else:
            print("Admin accounts can only be initialized if no Accounts exist")
