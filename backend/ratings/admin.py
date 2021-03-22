import csv
from datetime import datetime

from django.urls import path
from django.contrib import admin
from django.http import HttpResponse

from .models import Rating


def export_to_csv(modeladmin, request, queryset):
    NOW = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    csv_response = HttpResponse(content_type="text/csv")
    csv_response["Content-Disposition"] = f'attachment; filename="responses_{NOW}.csv"'

    writer = csv.writer(csv_response)
    fields = [
        "subject id",
        "sound",
        "arousal",
        "dominance",
        "valence",
    ]
    writer.writerow(fields)

    for rating in queryset:
        data_row = []
        data_row.append(f"S{rating.subject.participant_id}")
        data_row.append(rating.sound)
        data_row.append(rating.arousal)
        data_row.append(rating.dominance)
        data_row.append(rating.valence)
        writer.writerow(data_row)

    return csv_response


export_to_csv.short_description = "Export to CSV"


@admin.register(Rating)
class ResponseAdmin(admin.ModelAdmin):
    actions = [export_to_csv]
    change_list_template = "ratings/ratings_changelist.html"

    def get_urls(self):
        urls = super().get_urls()
        button_urls = [
            path("export/", self.export_all_to_csv),
        ]
        return button_urls + urls

    def export_all_to_csv(self, request):
        NOW = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        csv_response = HttpResponse(content_type="text/csv")
        csv_response[
            "Content-Disposition"
        ] = f'attachment; filename="responses_{NOW}.csv"'

        writer = csv.writer(csv_response)
        fields = [
            "subject id",
            "sound",
            "arousal",
            "dominance",
            "valence",
        ]

        writer.writerow(fields)

        for rating in self.model.objects.all():
            data_row = []
            data_row.append(f"S{rating.subject.participant_id}")
            data_row.append(rating.sound)
            data_row.append(rating.arousal)
            data_row.append(rating.dominance)
            data_row.append(rating.valence)
            writer.writerow(data_row)

        return csv_response
