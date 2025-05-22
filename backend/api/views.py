from collections import defaultdict
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from .serializers import AllBoardsSerializer
from .models import Board, Task
from django.db import connection

User = get_user_model()


class get_all_boards(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        boards = (
            user.member_boards.filter(is_archived=False)
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

        for slug, status, count in tasks_count:
            boards_status[slug][status] += count

        for data in res.data:
            slug = data['slug']
            data['taskStatus'] = [{"status": status, "count": count}
                                  for status, count in boards_status[slug].items()]

        print(len(connection.queries))
        return Response(res.data)
