import requests
from datetime import datetime
import time

from django.db import transaction

from api.models import FinancialArticle

URL_ALL = 'https://api.tickertick.com/feed?n=1000'


def run():
    start = time.time()
    download_all()
    end = time.time()
    print(f'startup script finished, total instances in the db: {len(FinancialArticle.objects.all())}')
    total_time = end - start
    print('execution time: ' + str(total_time / 60) + ' minutes')
    print('finished')
    exit()


@transaction.atomic
def save_articles(articles: [dict]):
    for article in articles:
        entry = FinancialArticle.create(article)
        entry.save()


@transaction.atomic
def download_all():
    print('downloading stock news...')
    last_id = None
    while True:
        if last_id:
            articles = fetch_older_articles(last_id)
        else:
            articles = fetch_articles(URL_ALL)
        if len(articles) == 0:
            break
        save_articles(articles)
        last_id = articles[-1]['id']
        time.sleep(2)


def fetch_articles(url):
    response = requests.get(url)
    data = response.json()
    return list(data['stories'])


def fetch_older_articles(article_id: str):
    """fetch articles older than article_id"""
    url = f'{URL_ALL}&last={article_id}'
    return fetch_articles(url)


def fetch_last_x_articles(x, last_id=None):
    if x < 1000:
        return fetch_articles(URL_ALL)
    articles = []
    for i in range(int(x / 1000)):
        if last_id:
            articles.extend(fetch_older_articles(last_id))
        else:
            articles.extend(fetch_articles(URL_ALL))
        last_id = articles[-1]['id']
        time.sleep(2)
    return articles
