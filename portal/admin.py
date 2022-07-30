from django.contrib import admin

# Register your models here.
from .models import Tasks, LocalUser, BaseBoard, Board

admin.site.register(Tasks)
admin.site.register(LocalUser)
admin.site.register(BaseBoard)
admin.site.register(Board)
