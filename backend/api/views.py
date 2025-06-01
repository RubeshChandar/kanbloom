from collections import defaultdict

from django.contrib.auth import get_user_model
from django.db import IntegrityError, connection
from django.db.models import Count
from django.template.defaultfilters import slugify
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import Board, Task
from .permissions import IsBoardMember
from .serializers import (BoardsSerializer, ShortendTaskSerializer,
                          TasksSerializer)

User = get_user_model()


class get_boards(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        user = request.user

        if slug:
            qset = user.member_boards.filter(slug=slug)
        else:
            qset = user.member_boards.all()

        if not qset:
            return Response({"data": "Board not found"}, status=404)

        boards = (
            qset
            .select_related("owned_by__user_profile")
            .prefetch_related("members__user_profile")
        )

        res = BoardsSerializer(
            boards, many=True, context={"request": request})

        tasks_count = Task.objects.filter(board__in=boards)\
            .values_list('board__slug', 'status')\
            .annotate(count=Count('status'))

        boards_status = defaultdict(
            lambda: {'TODO': 0, 'INPROGRESS': 0, 'BLOCKED': 0, 'DONE': 0}
        )

        for localslug, status, count in tasks_count:
            boards_status[localslug][status] += count

        for data in res.data:
            localslug = data['slug']
            data['taskCount'] = boards_status[localslug]
            data['totalTasks'] = sum(data['taskCount'].values())

        print("Get boards-> ", len(connection.queries))

        # Here I'm returning just the first object if slug was provided
        return Response(res.data[0] if slug else res.data)


class board(APIView):
    permission_classes = [IsAuthenticated, IsBoardMember]

    def get_new_slug(self, name):
        base_slug = slugify(name)
        slug = base_slug
        counter = 1

        while Board.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        return slug

    def put(self, request, slug):
        name, description = (request.data.get(k)
                             for k in ('name', 'description'))

        board = Board.objects.filter(slug=slug).first()

        if board.owned_by != request.data:
            return Response(
                {'data': "You don't own the board to make change"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        new_slug = self.get_new_slug(name) if name else slug
        if name and name != board.name:
            if name.lower() != board.name.lower():
                board.slug = new_slug

            board.name = name

        if description and description != board.description:
            board.description = description

        if not name and not description:
            return Response({'data': 'Nothing to update'}, status=status.HTTP_200_OK)

        board.save()

        return Response({'data': 'Successfully updated board', 'slug': board.slug}, status=status.HTTP_200_OK)

    def post(self, request):
        name, description = (request.data.get(k)
                             for k in ('name', 'description'))

        if not request.data.get('name'):
            return Response({'data': 'Name is a required field'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            board, created = Board.objects.get_or_create(
                name=name,
                description=description,
                owned_by=request.user
            )

        except IntegrityError as e:
            return Response(
                {'error': 'A board with this name already exists for you.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        board.members.add(request.user)

        if not created:
            return Response(
                {'error': 'Board already exists', 'slug': board.slug},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {'data': 'Successfully created board', 'slug': board.slug},
            status=status.HTTP_200_OK
        )

    def delete(self, request, slug):
        board = Board.objects.filter(slug=slug).first()

        if request.user != board.owned_by:
            return Response(
                {"error": f"{request.user} doesn't own '{board.name}' board"},
                status=status.HTTP_400_BAD_REQUEST
            )

        board.is_active = False
        board.save()
        return Response(
            {"data": f"{board.name} deleted Successfully!!!"},
            status=status.HTTP_200_OK
        )


class tasks(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsBoardMember]
    serializer_class = TasksSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        return Task.objects.filter(board__slug=slug)

    def list(self, request, slug):
        only_status = request.query_params.get("only")

        if only_status:
            only_status = only_status.strip('"')
            serializer = ShortendTaskSerializer(
                self.get_queryset().filter(status=only_status), many=True,
                context={'request': request}
            )

        else:
            serializer = ShortendTaskSerializer(
                self.get_queryset(), many=True,
                context={'request': request}
            )

        print("List of tasks -> ", len(connection.queries))
        return Response(serializer.data)


class update_task_status(APIView):
    permission_classes = [IsAuthenticated, IsBoardMember]

    def post(self, request, slug, task_id):
        task = Task.objects.get(id=task_id)
        status_to_be_updated = request.data.get("status")

        if task.status == status_to_be_updated:
            return Response({"warning": "Task status wasn't changed"}, status=status.HTTP_208_ALREADY_REPORTED)

        if status_to_be_updated == "DONE":
            task.completed_at = timezone.now()
        else:
            task.completed_at = None

        task.status = status_to_be_updated
        task.save()

        return Response({"data": "Successfully changed Status"})

    def patch(self, request, slug, task_id):
        task = Task.objects.get(id=task_id)
        assigned_to, priority = request.data.get(
            "assigned_to"), request.data.get("priority")
        pass
