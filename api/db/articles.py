from django.db import connection
from ..models import NytArticle


def most_negative_articles(year, month, keyword='', results=5):
    query, params = prepare_query(keyword, year, month, results)
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        rows = cursor.fetchall()
    print('executing query: ', connection.queries)
    return transform_qs(rows)


def prepare_query(keyword, year, month, limit):
    keyword = f"%{keyword.upper()}%"
    year = str(year)
    month = month_to_str(month)
    params = [year, month, keyword, limit]
    query = """
    select a.text, a.date, round(a.sentiment, 2), a.url
    from nyt_article as a 
    where strftime('%%Y', a.date) = %s
    and strftime('%%m', a.date) = %s 
    and UPPER(a.text) LIKE %s
    order by a.sentiment
    limit %s;"""
    return query, params


# list of (year, mo, sentiment) triples
def transform_qs(queryset):
    return list(map(
        lambda row: NytArticle(text=row[0], date=row[1], sentiment=row[2], url=row[3]),
        queryset
    ))


def month_to_str(month):
    if month < 10:
        return '0' + str(month)
    return str(month)
