# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from importlib import import_module
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


@api_view(['GET'])
def get_routes(request):
    """
    To return all the endpoints available in the API.
    """
    routes = {
        "endpoints": [
            {
                'endpoint': '/api/token/',
                'method': 'POST',
                'description': 'Obtain a new token by providing username and password.'
            },
            {
                'endpoint': '/api/token/refresh/',
                'method': 'POST',
                'description': 'Refresh an existing token using a refresh token.'
            },
            {
                'endpoint': '/api/signup/',
                'method': 'POST',
                'description': 'Create a new user account.'
            },
            {
                'endpoint': '/api/orm/<str:model>/',
                'methods': [
                    {
                        'method': 'GET',
                        'description': 'Retrieve all instances of a specified  model.'
                    },
                    {'method': 'POST',
                     'description': 'Create a new instance of the specified model.'
                    }
                ]
            },
            {
                'endpoint': '/api/orm/<str:model>/<str:id>/',
                'methods': [
                    {
                        'method': 'GET',
                        'description': 'Retrieve a specific instance of a model by ID.'
                    },
                    {
                        'method': 'PUT',
                        'description': 'Update a specific instance of a model by ID.'
                    },
                    {
                        'method': 'DELETE',
                        'description': 'Delete a specific instance of a model by ID.'
                    }
                ]
            }
        ],
        "status": "operational"
    }
    return Response(routes)

@api_view(['POST'])
def signup(request):
    """
    To create user.
    """
    data = request.data
    user = User.objects.create_user(
        data.get('username'),
        data.get('username'),
        data.get('password')
    )
    user.first_name = data.get('fname')
    user.last_name = data.get('lname')
    user.save()
    return Response()


class ORMViewSet(ModelViewSet):
    """
    For orm calls
    """
    def get_queryset(self):
        model = self.kwargs.get('model')
        model_class =  ContentType.objects.get(model=model).model_class()
        return model_class.objects.all()

    def get_serializer_class(self):
        model = self.kwargs.get('model')
        serializer_class = getattr(
            import_module('api.serializers.' + model + '_serializer'),
            model.capitalize() + 'Serializer'
        )
        return serializer_class
