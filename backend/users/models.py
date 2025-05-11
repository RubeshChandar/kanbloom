import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=100, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.username.capitalize()}"

    def save(self, *args, **kwargs):
        self.username = self.username.lower()
        self.email = self.email.lower()
        return super().save(*args, **kwargs)


def user_profile_photo_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"profile_pictures/{instance.user.username}.{ext}"


class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="user_profile")
    image = models.ImageField(
        upload_to=user_profile_photo_path, blank=True, null=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Profile"

    def __str__(self):
        return f"{str(self.user.username).capitalize()}'s profile"

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)
