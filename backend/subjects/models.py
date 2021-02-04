from django.db import models

from django.core.validators import MinValueValidator


class Subject(models.Model):
    participant_id = models.IntegerField(unique=True, validators=[MinValueValidator(0)])
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["participant_id"]

    def __str__(self):
        created_data = self.created_at.strftime("%Y.%m.%d")
        return f"S{self.participant_id} / {self.name} / @{created_data}"
