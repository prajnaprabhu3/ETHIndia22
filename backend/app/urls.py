from django.urls import path
from . import views

urlpatterns = [
    path('alert', views.alert, name='alert'),
    path('txn_notified', views.transaction_notified, name='transaction_notified'),
]