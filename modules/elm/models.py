from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class LeaveBalance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=10)  # CL, RH, SCL, EL, VL, COL
    balance = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user} - {self.leave_type}: {self.balance}"

class LeaveApplication(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
        ("CANCELLED", "Cancelled"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=10)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="PENDING")
    substitute = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="substitute_for")

    def __str__(self):
        return f"{self.user} - {self.leave_type} ({self.status})"

class SubstituteRequest(models.Model):
    leave_application = models.OneToOneField(LeaveApplication, on_delete=models.CASCADE)
    substitute = models.ForeignKey(User, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.leave_application} - {self.substitute} ({self.approved})"

class HolidayCalendar(models.Model):
    date = models.DateField(unique=True)
    description = models.CharField(max_length=255)
    is_rh = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.date}: {self.description}"

class LeavePolicy(models.Model):
    leave_type = models.CharField(max_length=10)  # CL, RH, SCL, EL, VL, COL
    max_days = models.IntegerField()

    def __str__(self):
        return f"{self.leave_type}: {self.max_days}"
