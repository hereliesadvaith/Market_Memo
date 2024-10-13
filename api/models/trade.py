# -*- coding: utf-8 -*-
from django.db import models


class Trade(models.Model):
    """
    Model for Trade
    """
    name = models.CharField(max_length=120)
    symbol = models.CharField(max_length=120)
    entry_price = models.FloatField()
    exit_price = models.FloatField()
    quantity = models.FloatField()
