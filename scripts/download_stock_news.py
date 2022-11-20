import requests
from datetime import datetime
import time
from typing import Optional

from django.db import transaction
from api.models import FinancialArticle

URL_ALL = 'https://api.tickertick.com/feed?n=1000'
# todo save tickers to a json file


def run():
    start = time.time()
    # tickers = ['jnj', 'goog', 'msft', 'fb', 'mrk', 'aapl', 'twtr', 'tsm', 'nflx', 'tsla', 'amzn', 'pfe']
    tickers = ['nvda']
    download_articles_for_tickers(tickers)
    end = time.time()
    print(f'startup script finished, total instances in the db: {len(FinancialArticle.objects.all())}')
    print('execution time: ' + str(round((end - start) / 60)) + ' minutes')
    exit()


def save_articles(articles: list[dict]):
    for article in articles:
        entry = FinancialArticle.create(article)
        entry.save()


def download_all(base_url=URL_ALL):
    print('downloading stock news...')
    last_id = None
    while True:
        if last_id:
            articles = fetch_older_articles(last_id, base_url)
        else:
            articles = fetch_articles(base_url)
        if articles is None:
            continue
        elif len(articles) == 0:
            print(f'all articles downloaded. lastId={last_id}')
            break
        save_articles(articles)
        last_id = articles[-1]['id']
        time.sleep(2)


def download_articles_for_tickers(tickers: list[str]):
    for ticker in tickers:
        url = f'{URL_ALL}&q=tt:{ticker}'
        print(f'downloading articles for ticker {ticker}...')
        download_all(base_url=url)


def fetch_articles(url: str) -> Optional[list[dict]]:
    try:
        response = requests.get(url)
        data = response.json()
        return list(data['stories'])
    except Exception as e:
        print(f'exception for response {response.text}: {e}')
        return None


def fetch_older_articles(article_id: str, base_url: str) -> list[dict]:
    """fetch articles older than article_id"""
    url = f'{base_url}&last={article_id}'
    return fetch_articles(url)


def fetch_last_x_articles(x: int, last_id=None) -> list[dict]:
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
