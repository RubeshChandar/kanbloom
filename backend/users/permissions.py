from rest_framework import permissions

from .models import UserProfile


class CheckUserProfile(permissions.BasePermission):
    message = "You are not a member of this board."

    def has_permission(self, request, view):
        id = request.data.get('profile_id')
        profile = UserProfile.objects.filter(id=id).first()

        if not profile:
            self.message = "Profile not found"
            return False

        if profile.user != request.user:
            self.message = "Not Your profile"
            return False

        return True
