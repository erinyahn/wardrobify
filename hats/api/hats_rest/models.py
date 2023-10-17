from django.db import models

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)

class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        "LocationVO",
        related_name="hats",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
