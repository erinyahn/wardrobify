from django.contrib import admin
from .models import Bin, Location

# Register your models here.
@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass

# Register your models here.
@admin.register(Location)
class Location(admin.ModelAdmin):
    pass