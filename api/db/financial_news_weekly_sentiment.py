import datetime
from datetime import date

from dateutil.relativedelta import relativedelta
from django.db import connection
from ..models import DatePoint


def get_stock_news_sentiment_weekly(ticker: str, period_in_months: int = 12):
    """
    fetches a list of DatePoints which contain month,
    year and average sentiment for a given stock ticker
    """
    query, params = prepare_query(ticker, period_in_months)
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        rows = cursor.fetchall()
    print('executing query: ', connection.queries)
    return transform_qs(rows)


def prepare_query(ticker, period_in_months):
    params = [f"%{ticker}%", get_date_x_months_ago(period_in_months)]
    # %% is used for single %
    # single quotes are set automatically around parameters
    query = f"""select strftime('%%Y', a.date), strftime('%%W', a.date), round(avg(a.sentiment), 2)
                    from financial_article a
                    where a.tickers LIKE %s
                    and a.date > %s
                    group by strftime('%%Y', a.date), strftime('%%W', a.date)"""
    return query, params


def get_date_x_months_ago(months: int) -> str:
    return str(date.today() + relativedelta(months=-months))


def get_date(year, week):
    d = f"{year}-W{week}"
    # The -1 and -%w pattern tells the parser to pick the Monday in that week
    return datetime.datetime.strptime(d + '-1', "%Y-W%W-%w").date()


# list of (year, mo, sentiment) triples
def transform_qs(queryset):
    return list(map(
        lambda row: DatePoint(date=get_date(row[0], row[1]), sentiment=row[2]),
        queryset
    ))

