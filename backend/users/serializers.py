from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import UserProfile

User = get_user_model()


class UserSerialiser(serializers.ModelSerializer):
    username = serializers.CharField(max_length=70)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "date_joined"]
        extra_kwargs = {
            "password": {"write_only": True},
            "date_joined": {"read_only": True},
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["username"] = str(instance.username).capitalize()
        rep["date_joined"] = instance.date_joined.strftime("%d/%m/%y")
        return rep

    def validate_username(self, value: str):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError(
                f"{value.capitalize()} is already being used! Please create a new one!!!"
            )

        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user)
        return user


class UserProfileSerialiser(serializers.ModelSerializer):
    user = UserSerialiser(read_only=True)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["profile_id"] = rep.pop("id")
        rep["imageURL"] = rep.pop("image")
        request = self.context.get("request")

        if request and (request.user.id == instance.user.id):
            rep["created_at"] = instance.created_at
            rep["last_modified"] = instance.last_modified

        return rep

    class Meta:
        model = UserProfile
        exclude = ["created_at", "last_modified"]
        read_only_fields = ["profile_id"]


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
