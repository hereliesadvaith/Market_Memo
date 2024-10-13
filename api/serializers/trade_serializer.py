# -*- coding: utf-8 -*-
from ..models.trade import Trade
from rest_framework import serializers


class TradeSerializer(serializers.ModelSerializer):
    """
    Serializer for trade
    """
    class Meta:
        model = Trade
        fields = [
            'name',
            'symbol',
            'entry_price',
            'exit_price',
            'quantity',
        ]
        