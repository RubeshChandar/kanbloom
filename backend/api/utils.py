from django.utils import timezone


def convert_time_to_human_readable(time_to_be_converted):
    now = timezone.now()
    diff = now - time_to_be_converted

    seconds = diff.total_seconds()
    minutes = seconds // 60
    hours = minutes // 60
    days = diff.days

    if seconds < 120:
        return "Just now"
    elif minutes < 60:
        return f"{int(minutes)} minutes ago"
    elif hours < 24:
        return f"{int(hours)} hour{'s' if int(hours) != 1 else ''} ago"
    elif days == 1:
        return "Yesterday"
    elif days < 7:
        return f"{int(days)} days ago"
    else:
        return time_to_be_converted.strftime("%d %b %Y")
