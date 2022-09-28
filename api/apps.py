from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    # uncomment to run the startup script
    # after running comment it out
    # def ready(self):
    #     run_download_script()


def get_sentiment_sql():
    from django.db import connection
    query = """select strftime('%Y', a.date), strftime('%m', a.date), avg(a.sentiment) from api_article a
                where UPPER(a.text) LIKE UPPER('%housing%')
                and a.date between '2011-1-1' and '2022-8-1'
                group by strftime('%Y', a.date), strftime('%m', a.date)"""
    with connection.cursor() as cursor:
        cursor.execute(query)
        rows = cursor.fetchall()
    print(rows)


def run_download_script():
    from .scripts import download_articles
    from .models import Article
    import time
    print(f'articles in the db: {len(Article.objects.all())}')
    start = time.time()
    download_articles.run()
    end = time.time()
    print(f'startup script finished, total instances in the db: {len(Article.objects.all())}')
    total_time = end - start
    print('execution time: ' + str(total_time/60) + ' minutes')
    exit()




