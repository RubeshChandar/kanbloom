from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerialiser(serializers.ModelSerializer):
    username = serializers.CharField(max_length=70)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'date_joined']
        extra_kwargs = {"password": {"write_only": True},
                        'date_joined': {"read_only": True}}

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['username'] = str(instance.username).capitalize()
        rep['date_joined'] = instance.date_joined.strftime("%d/%m/%y")
        return rep

    def validate_username(self, value: str):
        if User.objects.filter(username__iexact=value).exists():
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
        request = self.context.get('request')

        if request and (request.user.id == instance.user.id):
            rep['created_at'] = instance.created_at
            rep['last_modified'] = instance.last_modified

        return rep

    class Meta:
        model = UserProfile
        exclude = ['created_at', 'last_modified']
        read_only_fields = ['id']
