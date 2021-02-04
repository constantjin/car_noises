from django.db import models

from subjects.models import Subject

RATING_CHOICES = [(0, "No response")] + [(i, str(i)) for i in range(1, 10)]


class Rating(models.Model):
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE)
    sound = models.CharField(max_length=50)
    arousal = models.IntegerField(choices=RATING_CHOICES)
    dominance = models.IntegerField(choices=RATING_CHOICES)
    valence = models.IntegerField(choices=RATING_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["subject__participant_id", "created_at"]
        unique_together = ("subject", "sound")

    def __str__(self):
        created_data = self.created_at.strftime("%Y.%m.%d")
        return (
            f"S{self.subject.participant_id} / {self.sound} / "
            f"A-{self.arousal} / D-{self.dominance} / "
            f"V-{self.valence} / @{created_data}"
        )
