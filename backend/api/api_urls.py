from django.urls import path

from subjects.api import views as subjects_views

from sounds.api import views as sounds_views

from ratings.api import views as ratings_view

from .utils import ping, csrf

app_name = "api"
urlpatterns = [
    path(
        # {% url 'api:ping' %}
        route="ping/",
        view=ping,
        name="ping",
    ),
    path(
        # {% url 'api:csrf' %}
        route="csrf/",
        view=csrf,
        name="csrf",
    ),
    path(
        # {% url 'api:register' %}
        route="register/",
        view=subjects_views.SubjectCreateAPIView.as_view(),
        name="register",
    ),
    path(
        # {% url 'api:sounds' %}
        route="sounds/",
        view=sounds_views.get_sounds,
        name="sounds",
    ),
    path(
        # {% url 'api:ratings' %}
        route="ratings/",
        view=ratings_view.RatingCreateAPIView.as_view(),
        name="ratings",
    ),
]
