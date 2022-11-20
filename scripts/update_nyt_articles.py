from django.db import transaction
from .download_nyt_articles import fetch_articles
from api.models import NytArticle
from django.db.models import Max
from datetime import datetime
import pandas as pd
import time


def run():
    start = time.time()
    download_new_articles()
    end = time.time()
    print(f'startup script finished, total instances in the db: {len(NytArticle.objects.all())}')
    print('execution time: ' + str(round((end - start) / 60)) + ' minutes')
    exit()


# save articles that are not in the db
@transaction.atomic
def save_articles(articles):
    start_date = get_last_date_in_db()
    for article in articles:
        if article.get('date') > start_date:
            entry = NytArticle(text=article['text'],
                               url=article['url'],
                               date=article['date'],
                               sentiment=article['sentiment'])
            entry.save()


def download_new_articles():
    start_date = str(get_last_date_in_db())
    end_date = str(datetime.now().date())
    print(f'downloading articles published after {start_date}...')
    for date in pd.period_range(start_date, end_date, freq='M'):
        articles = fetch_articles(date.year, date.month)
        save_articles(articles)


def get_last_date_in_db():
    return NytArticle.objects.aggregate(Max('date')).get('date__max')



