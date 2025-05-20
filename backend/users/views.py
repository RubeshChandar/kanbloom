from django.shortcuts import get_object_or_404
from django.db import connection

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

from django.contrib.auth import get_user_model
from .serializers import *
from .models import *


User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerialiser
    permission_classes = [AllowAny]


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request, pk):
    if pk:
        try:
            userProf = get_object_or_404(UserProfile, user_id=pk)
            res = UserProfileSerialiser(userProf, context={"request": request})
            return Response(res.data)

        except Exception as e:
            return Response(
                {"detail": "User not found based on ID", "exception": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )

    userProf = UserProfile.objects.all()
    res = UserProfileSerialiser(userProf, many=True)
    return Response(res.data)
