from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .db.financial_news_weekly_sentiment import get_stock_news_sentiment_weekly
from .db.nyt_sentiment import get_nyt_date_point_list
from .db.nyt_articles import most_negative_articles
from .db.financial_news_sentiment import get_stock_news_date_point_list
from .serializers import DatePointSerializer, ArticleSerializer


class NYTNewsSentiment(APIView):
    """/api/nyt-news-sentiment?keyword=keyword&start-date=date&end-date=date"""
    def get(self, request, *args, **kwargs):
        data = request.GET
        queryset = get_nyt_date_point_list(
            data.get('keyword'),
            data.get('start-date'),
            data.get('end-date')
        )
        serializer = DatePointSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FinancialNewsSentimentMonthly(APIView):
    """/api/financial-news-sentiment/stocks/{ticker}"""
    def get(self, request, *args, **kwargs):
        if not kwargs.get('ticker'):
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        queryset = get_stock_news_date_point_list(
            kwargs.get('ticker')
        )
        serializer = DatePointSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FinancialNewsSentimentWeekly(APIView):
    """/api/financial-news-weekly-sentiment/stocks/{ticker}?period=x"""
    def get(self, request, *args, **kwargs):
        if not kwargs.get('ticker'):
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        # months
        period = 12
        if request.GET.get('period'):
            period = int(request.GET.get('period'))
        queryset = get_stock_news_sentiment_weekly(
            kwargs.get('ticker'),
            period
        )
        serializer = DatePointSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MostNegativeArticles(APIView):
    """/api/most-negative-articles/year/month?keyword=keyword&results=number"""
    def get(self, request, *args, **kwargs):
        # todo input validation
        results = 5
        if request.GET.get('results'):
            results = request.GET.get('results')
        queryset = most_negative_articles(
            kwargs.get('year'),
            kwargs.get('month'),
            request.GET.get('keyword'),
            results
        )
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


