from django.shortcuts import render
from .models import Hat, LocationVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href"
    ]

class HatEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric",
                  "name",
                  "color",
                  "picture_url",
                  ]
    encoders = {
        "location": LocationVOEncoder
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location = location_vo_id)
        else:
            hats = Hat.objects.all()
            return JsonResponse({
                "hats": hats},
                encoder = HatEncoder,
                safe=False,
            )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location ID"},
                status=400
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_hat(request):
    pass
