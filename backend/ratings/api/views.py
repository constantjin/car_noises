from rest_framework import generics

from .serializers import RatingSerializer


class RatingCreateAPIView(generics.CreateAPIView):
    serializer_class = RatingSerializer
