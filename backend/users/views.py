from django.shortcuts import get_object_or_404

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_users(request):
    userProf = UserProfile.objects.all()
    res = UserProfileSerialiser(userProf, many=True)
    return Response(res.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request, pk):

    try:
        user = get_object_or_404(CustomUser, pk=pk)
        res = UserSerialiser(user)
        return Response(res.data)

    except Exception as e:
        return Response(
            {
                'detail': "User not found based on ID",
                'exception': e
            },
            status=status.HTTP_404_NOT_FOUND
        )
