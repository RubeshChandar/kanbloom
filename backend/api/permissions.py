from rest_framework import permissions

from .models import Board


class IsBoardMember(permissions.BasePermission):
    """
    Allows access only to users who are members of the board.
    Expects `slug` in URL kwargs.
    """
    message = "You are not a member of this board."

    def has_permission(self, request, view):
        slug = view.kwargs.get('slug') or request.data.get('slug')
        if not slug:
            self.message = "Board slug not provided."
            return False
        board = Board.objects.filter(slug=slug).first()
        if not board:
            self.message = "Board does not exist."
            return False
        if request.user not in board.members.all():
            self.message = f"You are not a member of {board.name} board."
            return False
        return True
