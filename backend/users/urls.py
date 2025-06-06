from django.urls import path
from rest_framework_simplejwt.views import (TokenBlacklistView,
                                            TokenObtainPairView,
                                            TokenRefreshView)

from . import views

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="access-token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh-token"),
    path("token/logout/", TokenBlacklistView.as_view(), name="token_blacklist"),
    path("register/", views.CreateUserView.as_view()),
    path("update-profile/", views.update_user_profile.as_view()),
    path("change-password/", views.ChangePassword.as_view()),
    path("user-profiles/", views.get_user_profile, {"pk": None}),
    path("user-profiles/<str:pk>/", views.get_user_profile),
    path("board/<str:slug>/", views.BoardUsers.as_view()),
    path("<str:slug>/handle-users/", views.manage_board_members.as_view()),
]
