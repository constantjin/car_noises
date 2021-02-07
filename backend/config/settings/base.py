import os
from pathlib import Path

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = os.path.join(BASE_DIR, ".env")

# Set Django-environ
env = environ.Env(
    DEBUG=(bool, False),
)

# Optionally read .env file
try:
    environ.Env.read_env(env_file=ENV_PATH)
except FileNotFoundError:
    pass

# SECURITY
SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env("DEBUG")
ALLOWED_HOSTS = []

CORS_ORIGIN_WHITELIST = env("CORS_ORIGIN_WHITELIST").split(",")
CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS").split(",")

# DOMAIN
SERVER_DOMAIN = env("SERVER_DOMAIN")
SERVER_PORT = env("SERVER_PORT")
SERVER_URL = SERVER_DOMAIN + ":" + SERVER_PORT

# Application definition

INSTALLED_APPS = [
    # Project apps
    "subjects.apps.SubjectsConfig",
    "ratings.apps.RatingsConfig",
    # 3rd party apps
    "rest_framework",
    "corsheaders",
    # Django contrib
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    # 3rd Party middlewares
    "corsheaders.middleware.CorsMiddleware",
    # Django base middlewares
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Django Static files

STATIC_URL = "/django-static/"
STATIC_ROOT = os.path.join(BASE_DIR, "django_static")

# Sounds directories
SOUNDS_URL = "/sounds/"
SOUNDS_ROOT = os.path.join(BASE_DIR.parent, "sounds/")
