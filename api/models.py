from django.db import models

# Create your models here.


class NytArticle(models.Model):
    text = models.CharField(max_length=2000)
    url = models.URLField()
    sentiment = models.FloatField()
    date = models.DateField()

    class Meta:
        db_table = 'nyt_article'

    def __str__(self):
        return f'text: {self.text} date: {str(self.date)} url: {self.url} sentiment: {self.sentiment}'


class DatePoint(models.Model):
    sentiment = models.FloatField()
    date = models.DateField()
