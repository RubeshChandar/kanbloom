from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()


class ShortendUserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    imageURL = serializers.SerializerMethodField()

    def get_name(self, obj):
        return str(obj.username).capitalize()

    def get_imageURL(self, obj):
        request = self.context.get('request')
        if obj.user_profile.image and request:
            return request.build_absolute_uri(obj.user_profile.image.url)
        else:
            return None

    class Meta:
        model = User
        fields = ['id', 'name', 'imageURL']


class AllBoardsSerializer(serializers.ModelSerializer):
    members = ShortendUserSerializer(many=True, read_only=True)
    owned_by = ShortendUserSerializer(read_only=True)
    lastUpdated = serializers.SerializerMethodField()

    def get_lastUpdated(self, obj):
        if not obj.last_modified:
            return "Unknown"

        now = timezone.now()
        diff = now - obj.last_modified

        seconds = diff.total_seconds()
        minutes = seconds // 60
        hours = minutes // 60
        days = diff.days

        if seconds < 60:
            return "Just now"
        elif minutes < 60:
            return f"{int(minutes)} minutes ago"
        elif hours < 24:
            return f"{int(hours)} hours ago"
        elif days == 1:
            return "Yesterday"
        elif days < 7:
            return f"{int(days)} days ago"
        else:
            return obj.last_modified.strftime("%d %b %Y")

    class Meta:
        model = Board
        exclude = ['id', 'is_archived', 'created_at', 'last_modified']
        read_only_fields = ['lastUpdated', 'slug']
