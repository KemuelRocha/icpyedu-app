from django.urls import path
from .views import VerificarView
 
 
urlpatterns = [
    path('verificar/', VerificarView.as_view()),
]