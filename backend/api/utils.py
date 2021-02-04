from django.middleware.csrf import get_token

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def csrf(request):
    return Response({"csrfToken": get_token(request)})


@api_view(["GET"])
def ping(request):
    return Response({"result": "OK"})
