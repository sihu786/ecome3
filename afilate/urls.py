from django.urls import path
from .views import *

urlpatterns = [
    path('',product, name='home'),
    path('products/<str:slug>',product_details,name='product_details'),
    path('search/',Search_product,name='search'),
    
    
]
