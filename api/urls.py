from django.urls import path
from .views import NYTNewsSentiment, MostNegativeArticles, FinancialNewsSentiment
# additional urls.py file to define urls for this api

# /api
urlpatterns = [
    path('nyt-news-sentiment', NYTNewsSentiment.as_view()),
    path('most-negative-articles/<int:year>/<int:month>', MostNegativeArticles.as_view()),
    path('financial-news-sentiment/stocks/<str:ticker>', FinancialNewsSentiment.as_view())
]
