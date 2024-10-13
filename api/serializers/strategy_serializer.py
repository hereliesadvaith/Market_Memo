# -*- coding: utf-8 -*-
from ..models.strategy import Strategy
from rest_framework import serializers


class StrategySerializer(serializers.ModelSerializer):
    """
    Serializer for trade
    """
    class Meta:
        model = Strategy
        fields = [
            'name',
            'description',
            'success_rate',
        ]
        