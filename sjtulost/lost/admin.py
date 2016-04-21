from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(ItemType)
admin.site.register(User)
admin.site.register(Place)
admin.site.register(Finding)
admin.site.register(Found)
admin.site.register(Recommend)