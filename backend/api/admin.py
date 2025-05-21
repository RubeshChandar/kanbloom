from django.contrib import admin
from .models import *


class BoardAdmin(admin.ModelAdmin):
    list_display = ('name', 'owned_by', 'is_archived')
    readonly_fields = ('slug', 'last_modified', 'created_at', )


class TasksAdmin(admin.ModelAdmin):
    list_display = ('name', 'board', 'priority', 'status')
    readonly_fields = ('last_modified', 'created_at')


admin.site.register(Board, BoardAdmin)
admin.site.register(Task, TasksAdmin)
