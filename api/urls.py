# -*- coding: utf-8 -*-
from . import views
from django.urls import path


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('orm/<str:model>/', views.ORMViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('orm/<str:model>/<int:pk>/', views.ORMViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    }))
]
