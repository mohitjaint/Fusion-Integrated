from .models import LeaveApplication, LeaveBalance, SubstituteRequest

def apply_leave(user, leave_type, start_date, end_date, reason, substitute=None):
    # Check leave balance
    balance = LeaveBalance.objects.get(user=user, leave_type=leave_type)
    days_requested = (end_date - start_date).days + 1
    if balance.balance < days_requested:
        raise ValueError("Insufficient leave balance")

    # Create leave application
    leave_application = LeaveApplication.objects.create(
        user=user,
        leave_type=leave_type,
        start_date=start_date,
        end_date=end_date,
        reason=reason,
        substitute=substitute
    )

    # If substitute is nominated, create a substitute request
    if substitute:
        SubstituteRequest.objects.create(
            leave_application=leave_application,
            substitute=substitute
        )

    return leave_application

def approve_substitute(substitute_request_id):
    substitute_request = SubstituteRequest.objects.get(id=substitute_request_id)
    if not substitute_request.approved:
        substitute_request.approved = True
        substitute_request.save()

def update_leave_balance(user, leave_type, days):
    balance = LeaveBalance.objects.get(user=user, leave_type=leave_type)
    balance.balance -= days
    balance.save()
