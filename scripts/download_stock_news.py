import requests
import time
import json
import os
from typing import Optional
from api.models import FinancialArticle

URL_ALL = 'https://api.tickertick.com/feed?n=1000'


def run():
    start = time.time()
    # tickers = load_tickers()
    tickers = ['nio']
    download_articles(tickers)
    end = time.time()
    print(f'startup script finished, total instances in the db: {len(FinancialArticle.objects.all())}')
    print('execution time: ' + str(round((end - start) / 60)) + ' minutes')
    exit()


def download_all(base_url=URL_ALL):
    print(f'downloading stock news from {base_url}...')
    last_id = None
    while True:
        if last_id:
            articles = fetch_older_articles(last_id, base_url)
        else:
            articles = fetch_articles(base_url)
        if articles is None:
            time.sleep(2)
            continue
        elif len(articles) == 0:
            print(f'all articles downloaded. lastId={last_id}')
            time.sleep(2)
            break
        save_articles(articles)
        last_id = articles[-1]['id']
        time.sleep(2)


def download_articles(tickers: list[str]):
    for ticker in tickers:
        for source in load_sources():
            url = f'{URL_ALL}&q=(and tt:{ticker} s:{source})'
            download_all(base_url=url)


def fetch_articles(url: str) -> Optional[list[dict]]:
    response = None
    try:
        response = requests.get(url)
        data = response.json()
        return list(data['stories'])
    except Exception as e:
        if response:
            print(f'exception for response {response.text}: {e}')
        else:
            print(e)
        return None


def fetch_older_articles(last_id: str, base_url: str) -> list[dict]:
    """fetch articles older than last_id"""
    url = f'{base_url}&last={last_id}'
    return fetch_articles(url)


def save_articles(articles: list[dict]):
    for article in articles:
        entry = FinancialArticle.create(article)
        entry.save()


def load_sources() -> list[str]:
    file = open(os.path.join(os.path.dirname(__file__), 'top_news_sources.json'))
    return json.load(file)['sources']


def load_tickers() -> list[str]:
    file = open(os.path.join(os.path.dirname(__file__), 'tickers.json'))
    return json.load(file)['tickers']


