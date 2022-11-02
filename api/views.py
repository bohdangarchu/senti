from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .db.sentiment import get_sentiment_list
from .db.articles import most_negative_articles
from .serializers import DatePointSerializer, ArticleSerializer


class DatePointView(APIView):
    """/api?keyword=keyword&start-date=date&end-date=date"""
    def get(self, request, *args, **kwargs):
        data = request.GET
        queryset = get_sentiment_list(
            data.get('keyword'),
            data.get('start-date'),
            data.get('end-date')
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
            keyword=request.GET.get('keyword'),
            results=results
        )
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


