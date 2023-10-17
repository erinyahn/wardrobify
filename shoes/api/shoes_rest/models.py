from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)


class Shoes(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=200)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_shoes", kwargs={"pk": self.pk})

