from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name='access-token'),
    path("token/refresh", TokenRefreshView.as_view(), name="refresh-token"),
    path("register/", views.CreateUserView.as_view()),
    path("user-profiles/", views.all_users),
    path("user-profiles/<str:pk>/", views.get_user),
]
