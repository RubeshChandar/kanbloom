from rest_framework import serializers
from .models import CustomUser, UserProfile


class UserSerialiser(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self,object):
        return object.username.capitalize()

    class Meta:
        model = CustomUser
        fields = ['id','username','email']


class UserProfileSerialiser(serializers.ModelSerializer):
    user = UserSerialiser(read_only=True)
    
    class Meta:
        model = UserProfile
        exclude = ['created_at']
        read_only_fields = ['id','user','last_modified']
