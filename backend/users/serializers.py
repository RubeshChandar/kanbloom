from rest_framework import serializers
from .models import CustomUser, UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerialiser(serializers.ModelSerializer):
    username = serializers.CharField(max_length=70)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['username'] = str(instance.username).capitalize()
        return rep

    def validate_username(self, value: str):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                f"{value.capitalize()} is already being used! Please create a new one!!!")

        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerialiser(serializers.ModelSerializer):
    user = UserSerialiser(read_only=True)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['created_at'] = instance.created_at.strftime("%d/%m/%y %I:%M %p")
        rep['last_modified'] = instance.last_modified\
            .strftime("%d/%m/%y %I:%M %p")

        return rep

    class Meta:
        model = UserProfile
        exclude = []
        read_only_fields = ['id', 'last_modified', 'created_at']
