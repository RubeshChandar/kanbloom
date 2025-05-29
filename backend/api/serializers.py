from django.contrib.auth import get_user_model
from rest_framework import serializers
from users.serializers import ShortendUserSerializer

from .models import *
from .utils import convert_time_to_human_readable

User = get_user_model()


class BoardsSerializer(serializers.ModelSerializer):
    members = ShortendUserSerializer(many=True, read_only=True)
    owned_by = ShortendUserSerializer(read_only=True)
    lastUpdated = serializers.SerializerMethodField()

    def get_lastUpdated(self, obj):
        if not obj.last_modified:
            return "Unknown"
        return convert_time_to_human_readable(obj.last_modified)

    def to_representation(self, instance):
        res = super().to_representation(instance)
        res['created_at'] = instance.created_at.strftime('%I:%M%p, %-d %B %Y')
        return res

    class Meta:
        model = Board
        exclude = ['id', 'is_active', 'last_modified']
        read_only_fields = ['lastUpdated', 'slug']


class TaskTransformerMixin:
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['task_id'] = rep.pop('id')
        rep['board'] = instance.board.name
        return rep


class TasksSerializer(TaskTransformerMixin, serializers.ModelSerializer):
    assigned_to = ShortendUserSerializer(read_only=True)
    reported_by = ShortendUserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = "__all__"


class ShortendTaskSerializer(TaskTransformerMixin, serializers.ModelSerializer):
    assigned_to = ShortendUserSerializer(read_only=True)

    class Meta:
        model = Task
        read_only_fields = ['task_id']
        exclude = ['description', 'created_at',
                   'last_modified', 'reported_by', 'board']
