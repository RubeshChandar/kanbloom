from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView


urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name='access-token'),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh-token"),
    path("token/logout/", TokenBlacklistView.as_view(), name='token_blacklist'),
    path("register/", views.CreateUserView.as_view()),
    path("user-profiles/", views.get_user_profile, {'pk': None}),
    path("user-profiles/<str:pk>/", views.get_user_profile),
]
