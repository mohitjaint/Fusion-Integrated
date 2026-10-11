from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import LeaveApplication, SubstituteRequest, LeaveBalance, HolidayCalendar, LeavePolicy
from .serializers import (
    LeaveApplicationSerializer,
    SubstituteRequestSerializer,
    LeaveBalanceSerializer,
    HolidayCalendarSerializer,
    LeavePolicySerializer
)

class LeaveApplicationViewSet(viewsets.ModelViewSet):
    queryset = LeaveApplication.objects.all()
    serializer_class = LeaveApplicationSerializer
    permission_classes = [IsAuthenticated]

class SubstituteRequestViewSet(viewsets.ModelViewSet):
    queryset = SubstituteRequest.objects.all()
    serializer_class = SubstituteRequestSerializer
    permission_classes = [IsAuthenticated]

class LeaveBalanceViewSet(viewsets.ModelViewSet):
    queryset = LeaveBalance.objects.all()
    serializer_class = LeaveBalanceSerializer
    permission_classes = [IsAuthenticated]

class HolidayCalendarViewSet(viewsets.ModelViewSet):
    queryset = HolidayCalendar.objects.all()
    serializer_class = HolidayCalendarSerializer
    permission_classes = [IsAuthenticated]

class LeavePolicyViewSet(viewsets.ModelViewSet):
    queryset = LeavePolicy.objects.all()
    serializer_class = LeavePolicySerializer
    permission_classes = [IsAuthenticated]
