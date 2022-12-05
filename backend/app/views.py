from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponse
from .models import Alert, TransactionNotified
import json

# Create your views here.
@csrf_exempt
def alert(request):
    if request.method == 'GET':
        data = []
        for i in Alert.objects.all():
            data.append({
                "alertName": i.name,
                "alertAddress": i.address,
                "slackWebhook": i.slack_webhook
            })
        return HttpResponse(json.dumps({"status": "ok", "data": data}), content_type="text/json")
    if request.method == 'POST':
        data = json.loads(request.body)
        Alert.objects.create(name=data["alertName"], address=data["alertAddress"], slack_webhook=data["alertSlackWebhook"])
        return HttpResponse(json.dumps({"status": "ok"}), content_type="text/json")

@csrf_exempt
def transaction_notified(request):
    if request.method == 'GET':
        txn = request.GET['txn']
        try:
            if TransactionNotified.objects.filter(txn=txn).exists():
                return HttpResponse(json.dumps({"status": "ok", "exists": True}), content_type="text/json")
            else:
                return HttpResponse(json.dumps({"status": "ok", "exists": False}), content_type="text/json")
        except TransactionNotified.DoesNotExist:
            return HttpResponse(json.dumps({"status": "ok", "exists": False}), content_type="text/json")
    if request.method == 'POST':
        txn = json.loads(request.body)['txn']
        TransactionNotified.objects.create(txn=txn)
        return HttpResponse(json.dumps({"status": "ok"}), content_type="text/json")

@csrf_exempt
def login(request):
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        pass

@csrf_exempt
def dashboard(request):
    if request.method == 'GET':
        pass
