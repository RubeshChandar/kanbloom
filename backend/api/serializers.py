from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.utils import timezone
from .utils import convert_time_to_human_readable

User = get_user_model()


class ShortendUserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    imageURL = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()

    def get_name(self, obj):
        return str(obj.username).capitalize()

    def get_imageURL(self, obj):
        request = self.context.get('request')
        if obj.user_profile.image and request:
            return request.build_absolute_uri(obj.user_profile.image.url)
        else:
            return None

    def get_title(self, obj):
        if not obj.user_profile.title:
            return "no title given"
        return obj.user_profile.title

    class Meta:
        model = User
        fields = ['id', 'name', 'imageURL', 'title']


class AllBoardsSerializer(serializers.ModelSerializer):
    members = ShortendUserSerializer(many=True, read_only=True)
    owned_by = ShortendUserSerializer(read_only=True)
    lastUpdated = serializers.SerializerMethodField()

    def get_lastUpdated(self, obj):
        if not obj.last_modified:
            return "Unknown"
        return convert_time_to_human_readable(obj.last_modified)

    class Meta:
        model = Board
        exclude = ['id', 'is_archived', 'created_at', 'last_modified']
        read_only_fields = ['lastUpdated', 'slug']
