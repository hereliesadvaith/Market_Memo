# -*- coding: utf-8 -*-
from . import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
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
