from django.urls import path, include
from . import views

urlpatterns = [
    path("users-list/", views.all_users),
    path("users-list/<str:pk>/", views.get_user)
]
