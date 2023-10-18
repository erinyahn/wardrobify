import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

from hats_rest.models import LocationVO

def get_location():
    url = "http://wardrobe-api:8000/api/locations/"
    response = requests.get(url)
    print(response)
    content = json.loads(response.content)
    print(content)
    for location in content["locations"]:
        try:
            obj, created = LocationVO.objects.update_or_create(
            import_href=location["href"],
        )
            if created:
                print("Created and Object", obj)
            else:
                print("updated Object")
        except:
            print("Did not create an object")


def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_location()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
