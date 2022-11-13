from rest_framework import serializers
from .models import DatePoint, NytArticle


class DatePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatePoint
        fields = ["date", "sentiment"]


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NytArticle
        fields = ['text', 'sentiment', 'date', 'url']
