from django.urls import path

from . import views

urlpatterns = [
    path("boards/", views.get_boards.as_view()),
    path("boards/create/", views.create_baord.as_view()),
    path("boards/<str:slug>/", views.get_boards.as_view()),
    path("boards/<str:slug>/edit/", views.edit_board.as_view()),
]
