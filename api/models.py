from django.db import models
import json
from datetime import datetime, timezone
from utils.sentiment_util import SentimentAnalyzer


sa = SentimentAnalyzer()


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


def format_tickers(tickers: [str]):
    return json.dumps(tickers)


def format_time(unix_time_in_ms: str):
    time_in_s = int(unix_time_in_ms) / 1000
    return datetime.fromtimestamp(time_in_s, timezone.utc)


class FinancialArticle(models.Model):
    _id = models.CharField(max_length=100)
    title = models.CharField(max_length=1000)
    url = models.URLField(null=True)
    website = models.CharField(max_length=100, null=True)
    date = models.DateTimeField()
    tickers = models.TextField(max_length=100, null=True)
    description = models.TextField(null=True)
    sentiment = models.FloatField(default=0)

    class Meta:
        db_table = 'financial_article'

    def __str__(self):
        return json.dumps(self)

    def calculate_sentiment(self):
        if self.description is not None and len(self.description) > 0:
            self.sentiment = sa.analyze(self.description)
        else:
            self.sentiment = sa.analyze(self.title)

    @classmethod
    def create(cls, json_data: dict):
        article = cls(
            _id=json_data.get('id'),
            title=json_data.get('title'),
            url=json_data.get('url'),
            website=json_data.get('site'),
            date=format_time(json_data.get('time')),
            tickers=format_tickers(json_data.get('tickers')),
            description=json_data.get('description')
        )
        article.calculate_sentiment()
        return article



