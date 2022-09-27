from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DatePoint
from .serializers import DatePointSerializer
from datetime import date
from django.db import connection


class DatePointView(APIView):
    def get(self, request, *args, **kwargs):
        data = request.GET
        queryset = get_sentiment(
            data.get('keyword'),
            data.get('start_date'),
            data.get('end_date')
        )
        serializer = DatePointSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


def get_sentiment(keyword, start_date=None, end_date=None):
    query = prepare_query(keyword, start_date, end_date)
    with connection.cursor() as cursor:
        print(f'executing query: {query}')
        cursor.execute(query)
        rows = cursor.fetchall()
    # list of (year, mo, sentiment) triples
    return transform_qs(rows)


def prepare_query(keyword, start_date, end_date):
    date_stmt = ''
    if start_date and end_date:
        date_stmt = f"and a.date between '{start_date}' and '{end_date}'"
    elif start_date:
        date_stmt = f"and a.date >= '{start_date}'"
    elif end_date:
        date_stmt = f"and a.date <= '{start_date}'"
    return f"""select strftime('%Y', a.date), strftime('%m', a.date), avg(a.sentiment) 
                    from api_article a
                    where UPPER(a.text) LIKE UPPER('%{keyword}%') {date_stmt}
                    group by strftime('%Y', a.date), strftime('%m', a.date)"""


# list of (year, mo, sentiment) triples
def transform_qs(queryset):
    return list(map(
        lambda row: DatePoint(date=date(int(row[0]), int(row[1]), 1), sentiment=row[2]),
        queryset
    ))
