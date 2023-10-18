from django.contrib import admin
<<<<<<< HEAD
from .models import Bin

# Register your models here.
@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
=======
from .models import Location

# Register your models here.
@admin.register(Location)
class Location(admin.ModelAdmin):
>>>>>>> 3219cadd44c035a1037a814e89270c01dc2355f1
    pass
