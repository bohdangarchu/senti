from django.urls import path
from .views import index
# forward requests to api.urls


urlpatterns = [
    path('', index)
]
