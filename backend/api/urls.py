from django.urls import path
from . import views

urlpatterns = [
    path("boards/", views.get_all_boards.as_view())
]
