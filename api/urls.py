# -*- coding: utf-8 -*-
from . import views
from django.urls import path


urlpatterns = [
    path('', views.get_routes, name='routes')
]
