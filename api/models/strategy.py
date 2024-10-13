# -*- coding: utf-8 -*-
from django.db import models


class Strategy(models.Model):
    """
    Model for Strategy
    """
    name = models.CharField(max_length=120)
    description = models.TextField(max_length=120)
    success_rate = models.FloatField()
