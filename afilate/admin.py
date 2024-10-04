from django.contrib import admin
from .models import Category,Product,Image

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    list_display=["product","image"]
    search_fields=('product__product_title',)
class ProductAdmin(admin.ModelAdmin):
    list_display=["product_title"]
    search_fields=("product",)



admin.site.register(Category)
admin.site.register(Product,ProductAdmin)
admin.site.register(Image,BookAdmin)



