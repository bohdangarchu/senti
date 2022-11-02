from django.urls import path
from .views import DatePointView, MostNegativeArticles
# additional urls.py file to define urls for this api

urlpatterns = [
    path('', DatePointView.as_view()),
    path('/most-negative-articles/<int:year>/<int:month>',
         MostNegativeArticles.as_view())
]
