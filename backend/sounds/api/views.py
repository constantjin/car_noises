import os
import glob

from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def get_sounds(request):
    sounds_list = []
    SOUNDS_GLOB = settings.SOUNDS_ROOT + "*.wav"
    sound_paths = glob.glob(SOUNDS_GLOB, recursive=True)

    for sound_path in sound_paths:
        sound_with_ext = os.path.basename(sound_path)
        sound_name = os.path.splitext(sound_with_ext)[0]
        sound_url = settings.SOUNDS_URL + sound_with_ext
        sounds_list.append({"name": sound_name, "url": sound_url})

    return Response(sounds_list)
