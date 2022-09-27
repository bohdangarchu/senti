from django.urls import path
from .views import DatePointView
# additional urls.py file to define urls for this api

urlpatterns = [
    path('', DatePointView.as_view())
]
