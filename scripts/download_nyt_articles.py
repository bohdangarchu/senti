import requests
import pandas as pd
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from statistics import mean
from api.models import NytArticle
from datetime import datetime
from django.db import transaction
from decouple import config
import time

KEY_NYT = config('KEY_NYT')
sia = SentimentIntensityAnalyzer()


# is called when running the script
def run():
    print(f'articles in the db: {len(NytArticle.objects.all())}')
    start = time.time()
    download()
    end = time.time()
    print(f'startup script finished, total instances in the db: {len(NytArticle.objects.all())}')
    total_time = end - start
    print('execution time: ' + str(total_time / 60) + ' minutes')
    exit()


# returns a list of all articles for given month and year
def fetch_articles(year, month):
    url = f'https://api.nytimes.com/svc/archive/v1/{year}/{month}.json?api-key={KEY_NYT}'
    print('fetching ', url)
    json_data = requests.get(url).json()
    return list(map(process_article, list(json_data['response']['docs'])))


# returns float from -1 to 1
def get_sentiment(text):
    scores = [
        sia.polarity_scores(sentence)["compound"]
        for sentence in nltk.sent_tokenize(text)
    ]
    if len(scores) == 0:
        return 0
    return mean(scores)


def process_article(article):
    text = get_text(article)
    return {
        'text': text,
        'url': article['web_url'],
        'date': get_date(article['pub_date']),
        'sentiment': get_sentiment(text)
    }


def get_date(custom_date):
    return datetime.strptime(custom_date[:10], '%Y-%m-%d').date()


def get_text(article):
    if article['snippet'] == article['abstract']:
        return article['snippet'] + ' ' + article['lead_paragraph']
    return article['snippet'] + ' ' + article['abstract'] + ' ' + article['lead_paragraph']


@transaction.atomic
def download(start_date='2010-1-1', end_date='2019-1-1'):
    print('downloading articles...')
    for date in pd.period_range(start_date, end_date, freq='M'):
        articles = fetch_articles(date.year, date.month)
        print(f'articles downloaded: {len(articles)}')
        for article in articles:
            entry = NytArticle(text=article['text'],
                               url=article['url'],
                               date=article['date'],
                               sentiment=article['sentiment'])
            entry.save()


