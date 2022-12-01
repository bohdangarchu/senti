from django.urls import path
from .views import index
# forward requests to api.urls


urlpatterns = [
    path('financial-news/', index),
    path('nyt-news/', index),
    path('', index)
]
