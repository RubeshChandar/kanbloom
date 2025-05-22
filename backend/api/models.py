import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django_extensions.db.fields import AutoSlugField
from django.utils import timezone

User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Board(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=300, null=True, blank=True)
    owned_by = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="owned_boards")
    members = models.ManyToManyField(User, related_name="member_boards")
    slug = AutoSlugField(populate_from='name')
    is_archived = models.BooleanField(default=False, db_index=True)

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
    due_date = models.DateTimeField(blank=True, null=True)
    priority = models.IntegerField(
        choices=Priority.choices, default=Priority.MEDIUM)

    # Reporting
    assigned_to = models.ForeignKey(
        User, related_name="assigned_tasks", on_delete=models.DO_NOTHING, blank=True)
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
        ordering = ["-last_modified", "-priority"]
