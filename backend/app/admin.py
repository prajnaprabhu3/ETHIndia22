from django.contrib import admin
from .models import Alert, TransactionNotified

# Register your models here.
admin.site.register(Alert)
admin.site.register(TransactionNotified)
