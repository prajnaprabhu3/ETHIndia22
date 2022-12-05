from django.db import models

# Create your models here.

class Alert(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    address = models.CharField(max_length=200, db_index=True)
    slack_webhook = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class TransactionNotified(models.Model):
    txn = models.CharField(max_length=200, db_index=True)

    def __str__(self):
        return self.txn
