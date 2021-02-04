from rest_framework import generics

# from ..models import Subject
from .serializers import SubjectSerializer


class SubjectCreateAPIView(generics.CreateAPIView):
    serializer_class = SubjectSerializer
