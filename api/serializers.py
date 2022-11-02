from rest_framework import serializers
from .models import DatePoint, Article


class DatePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatePoint
        fields = ["date", "sentiment"]


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['text', 'sentiment', 'date', 'url']
