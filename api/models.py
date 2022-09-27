from django.db import models

# Create your models here.


class Article(models.Model):
    text = models.CharField(max_length=2000)
    url = models.URLField()
    sentiment = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return f'text: {self.text} date: {str(self.date)} url: {self.url} sentiment: {self.sentiment}'


    # def __init__(self, text, url, sentiment, date, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.text = text
    #     self.url = url
    #     self.sentiment = sentiment
    #     self.date = date


class DatePoint(models.Model):
    sentiment = models.FloatField()
    date = models.DateField()
