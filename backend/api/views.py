from collections import defaultdict
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from .serializers import AllBoardsSerializer, ShortendUserSerializer
from .models import Board, Task
from django.db import connection

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

        res = AllBoardsSerializer(
            boards, many=True, context={"request": request})

        tasks_count = Task.objects.filter(board__in=boards)\
            .values_list('board__slug', 'status')\
            .annotate(count=Count('status'))

        boards_status = defaultdict(
            lambda: {'TODO': 0, 'INPROGRESS': 0, 'BLOCKED': 0, 'DONE': 0}
        )

        for localslug, status, count in tasks_count:
            boards_status[localslug][status] += count

        print(list(boards_status.values()))

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
