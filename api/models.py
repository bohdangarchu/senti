from django.db import models
import json


class NytArticle(models.Model):
    text = models.CharField(max_length=2000)
    url = models.URLField()
    sentiment = models.FloatField()
    date = models.DateField()

    class Meta:
        db_table = 'nyt_article'

    def __str__(self):
        return json.dumps(self)


class DatePoint(models.Model):
    sentiment = models.FloatField()
    date = models.DateField()


class FinancialArticle(models.Model):
    _id = models.CharField(max_length=100)
    title = models.CharField(max_length=1000)
    url = models.URLField
    website = models.CharField(max_length=100)
    date = models.DateTimeField()
    tickers = models.TextField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = 'financial_article'

    def __str__(self):
        return json.dumps(self)
