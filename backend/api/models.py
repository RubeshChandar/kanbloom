import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from django_extensions.db.fields import AutoSlugField

User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ActiveBoardManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class Board(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=300, null=True, blank=True)
    owned_by = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="owned_boards")
    members = models.ManyToManyField(User, related_name="member_boards")
    slug = AutoSlugField(populate_from='name', db_index=True, unique=True)
    is_active = models.BooleanField(default=True, db_index=True)

    objects = ActiveBoardManager()
    all_objects = models.Manager()

    def __str__(self):
        return self.name.capitalize()

    class Meta:
        ordering = ["-last_modified"]


class Task(BaseModel):
    class Status(models.TextChoices):
        TO_DO = 'TODO', 'To Do'
        IN_PROGRESS = 'INPROGRESS', 'In Progress'
        BLOCKED = 'BLOCKED', 'Blocked'
        DONE = 'DONE', 'Done'

    class Priority(models.IntegerChoices):
        LOW = 1, 'Low'
        MEDIUM = 2, 'Medium'
        HIGH = 3, 'High'
        CRITICAL = 4, 'Critical'

    # Basic details
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=300, null=True, blank=True)
    board = models.ForeignKey(
        Board, on_delete=models.CASCADE, related_name="tasks")

    # Tracking
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.TO_DO)
    completed_at = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField()
    priority = models.IntegerField(
        choices=Priority.choices, default=Priority.MEDIUM)

    # Reporting
    assigned_to = models.ForeignKey(
        User, related_name="assigned_tasks", on_delete=models.DO_NOTHING, blank=True, null=True)
    reported_by = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="reported_tasks")

    def __str__(self):
        return f"{self.name} : {self.status} || {self.priority}"

    def save(self, *args, **kwargs):
        result = super().save(*args, **kwargs)
        self.board.last_modified = timezone.now()
        self.board.save(update_fields=['last_modified'])
        return result

    class Meta:
        ordering = ["-priority", "due_date"]
