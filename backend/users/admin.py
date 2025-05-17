from django.contrib import admin
from .models import CustomUser, UserProfile


class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "username", "id")
    readonly_fields = ("id",)


class UserProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'last_modified')


admin.site.register(CustomUser, UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
