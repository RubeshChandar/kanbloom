from django.urls import path

from . import views

urlpatterns = [
    path("boards/", views.get_boards.as_view()),
    path("boards/create/", views.board.as_view()),
    path("boards/delete/<str:slug>/", views.board.as_view()),
    path("boards/<str:slug>/", views.get_boards.as_view()),
    path("boards/<str:slug>/edit/", views.board.as_view()),
]

tasks_urlpatterns = [
    path("<str:slug>/tasks/", views.tasks.as_view()),
]


urlpatterns += tasks_urlpatterns
