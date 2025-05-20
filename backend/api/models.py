import uuid
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Board(BaseModel):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, null=True, blank=True)
    owned_by = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="owned_boards")
    members = models.ManyToManyField(User, related_name="member_boards")
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.name.capitalize()


class Task(BaseModel):
    class Status(models.TextChoices):
        TO_DO = 'TO_DO', 'To Do'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        BLOCKED = 'BLOCKED', 'Blocked'
        DONE = 'DONE', 'Done'

    class Priority(models.TextChoices):
        LOW = 'LOW', 'Low'
        MEDIUM = 'MEDIUM', 'Medium'
        HIGH = 'HIGH', 'High'
        CRITICAL = 'CRITICAL', 'Critical'

    name = models.CharField(max_length=100)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.TO_DO)
    board = models.ForeignKey(
        Board, on_delete=models.CASCADE, related_name="tasks")
    assigned_to = models.ManyToManyField(
        User, related_name="assigned_tasks", blank=True)
    due_date = models.DateTimeField(blank=True, null=True)
    priority = models.CharField(
        max_length=20, choices=Priority.choices, default=Priority.MEDIUM)

    def __str__(self):
        return f"{self.name} : {self.status} || {self.priority}"
