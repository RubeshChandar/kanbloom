from django.urls import path
from . import views

urlpatterns = [
    path("boards/", views.get_boards.as_view()),
    path("boards/<str:slug>/", views.get_boards.as_view()),
]
