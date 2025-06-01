from api.models import Board
from api.permissions import IsBoardMember
from django.contrib.auth import get_user_model
from django.db import connection
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .permissions import CheckUserProfile
from .serializers import *

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


class BoardUsers(APIView):
    permission_classes = [IsAuthenticated, IsBoardMember]

    def get(self, request, slug):
        board = Board.objects.get(slug=slug)
        res = ShortendUserSerializer(
            board.members.all(), many=True, context={"request": request})
        print(f"Users -> {len(connection.queries)}")
        return Response(res.data)


class update_user_profile(APIView):
    permission_classes = [IsAuthenticated, CheckUserProfile]

    def post(self, request):
        profile = UserProfile.objects.get(id=request.data.get('profile_id'))
        profile.image = request.data.get('image_file')
        profile.save()
        return Response({"data": "Image uploaded successfully"}, status=status.HTTP_200_OK)

    def patch(self, request):
        profile = UserProfile.objects.get(id=request.data.get('profile_id'))
        username = request.data.get("username")
        title = request.data.get("title")

        if username and request.user.username != username:
            if User.objects.filter(username=username).exists():
                print("In here")
                return Response({"error": "Username is already in use"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            profile.user.username = username
            profile.user.save()
        if title:
            profile.title = title

        profile.save()
        return Response({"data": "Successfully updated data"}, status=status.HTTP_200_OK)

    def delete(self, request):
        profile = UserProfile.objects.get(id=request.data.get('profile_id'))

        try:
            profile.image.delete(save=False)
            profile.image = None
            profile.save(update_fields=['image'])
            return Response({"data": "Image Deleted Successfully"}, status=200)

        except Exception as e:
            return Response({'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get("currentPassword")
        new_password = request.data.get("newPassword")

        if not current_password or not new_password:
            return Response({"error": "Passwords not provided"}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"error": "Incorrect current password"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"data": "Password changed successfully!!!"})
