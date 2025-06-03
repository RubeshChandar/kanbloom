from django.contrib import admin

from .models import *


class BoardAdmin(admin.ModelAdmin):
    list_display = ('name', 'owned_by', 'is_active')
    readonly_fields = ('slug', 'last_modified', 'created_at', )

    def get_queryset(self, request):
        return Board.all_objects.all()


class TasksAdmin(admin.ModelAdmin):
    list_display = ('name', 'board', 'priority', 'status')
    readonly_fields = ('last_modified', 'created_at', 'id')


admin.site.register(Board, BoardAdmin)
admin.site.register(Task, TasksAdmin)
