from django.urls import path
from .views import VerificarView
from .views import AssinarView
 
 
urlpatterns = [
    path('verificar/', VerificarView.as_view()),
    path('assinar/', AssinarView.as_view()),
]