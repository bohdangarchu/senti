from datetime import date
from django.db import connection
from ..models import DatePoint, NytArticle


def get_sentiment_list(keyword, start_date=None, end_date=None):
    """
    fetches a list of DatePoints which contain month,
    year and average sentiment for a given keyword
    """
    query, params = prepare_query(keyword, start_date, end_date)
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        rows = cursor.fetchall()
    print('executing query: ', connection.queries)
    # list of (year, mo, sentiment) triples
    return transform_qs(rows)


def prepare_query(keyword, start_date, end_date):
    keyword = f"%{keyword.upper()}%"
    params = [keyword]
    date_stmt, date_params = prepare_date_stmt(start_date, end_date)
    params.extend(date_params)
    # %% is used for single %
    # single quotes are set automatically around parameters
    query = f"""select strftime('%%Y', a.date), strftime('%%m', a.date), round(avg(a.sentiment), 2)
                    from nyt_article a
                    where UPPER(a.text) LIKE %s {date_stmt}
                    group by strftime('%%Y', a.date), strftime('%%m', a.date)"""
    return query, params


# list of (year, mo, sentiment) triples
def transform_qs(queryset):
    return list(map(
        lambda row: DatePoint(date=date(int(row[0]), int(row[1]), 1), sentiment=row[2]),
        queryset
    ))


def prepare_date_stmt(start_date, end_date):
    date_stmt = ''
    params = []
    if start_date and end_date:
        date_stmt = "and a.date between %s and %s"
        params.append(start_date)
        params.append(end_date)
    elif start_date:
        date_stmt = "and a.date >= %s"
        params.append(start_date)
    elif end_date:
        date_stmt = "and a.date <= %s"
        params.append(end_date)
    return date_stmt, params

