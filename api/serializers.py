from rest_framework import serializers
from .models import DatePoint


class DatePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatePoint
        fields = ["date", "sentiment"]

        