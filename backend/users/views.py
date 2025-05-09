from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def all_users(request):
    userProf = UserProfile.objects.all()
    res = UserProfileSerialiser(userProf, many=True)
    return Response(res.data)


@api_view(['GET', 'POST'])
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
