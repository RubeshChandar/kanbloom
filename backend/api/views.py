from collections import defaultdict

from django.contrib.auth import get_user_model
from django.db import connection
from django.db.models import Count
from django.template.defaultfilters import slugify
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Board, Task
from .serializers import BoardsSerializer, ShortendUserSerializer

User = get_user_model()


class get_boards(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None):
        user = request.user

        if slug:
            qset = user.member_boards.filter(slug=slug, is_archived=False)
        else:
            qset = user.member_boards.filter(is_archived=False)

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

        # Legacy
        # for data in res.data:
        #     localslug = data['slug']
        #     data['taskStatus'] = [{"status": status, "count": count}
        #                           for status, count in boards_status[localslug].items()]

        for data in res.data:
            localslug = data['slug']
            data['taskCount'] = boards_status[localslug]
            data['totalTasks'] = sum(data['taskCount'].values())

        print(len(connection.queries))

        # Here I'm returning just the first object if slug was provided
        return Response(res.data[0] if slug else res.data)


class edit_board(APIView):
    permission_classes = [IsAuthenticated]

    def get_new_slug(self, name):
        base_slug = slugify(name)
        slug = base_slug
        counter = 1

        while Board.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        return slug

    def post(self, request, slug):
        name, description = (request.data.get(k)
                             for k in ('name', 'description'))

        board = Board.objects.filter(slug=slug).first()

        if not board:
            return Response({'data': "Board not found check slug"}, status=404)

        new_slug = self.get_new_slug(name) if name else slug
        if name and name != board.name:
            if name.lower() != board.name.lower():
                board.slug = new_slug

            board.name = name

        if description != board.description:
            board.description = description

        if not name and not description:
            return Response({'data': 'Nothing to update'}, status=200)

        board.save()

        return Response({'data': 'Successfully updated board', 'slug': board.slug}, status=200)
