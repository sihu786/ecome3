

# Create your models here.

from django.db import models
from django.utils.text import slugify

# Create your models here.

class Category(models.Model):
    title=models.CharField(max_length=255,unique=True)
    slug=models.SlugField(null=True,blank=True)
    create_date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
       
    
    def save(self,*args, **kwargs):
        self.slug=slugify(self.title)
        super().save(*args, **kwargs)




class Product(models.Model):
    category=models.ForeignKey(Category,related_name='products',on_delete=models.CASCADE)
    product_title=models.CharField(max_length=255,unique=True)
    slug=models.SlugField(null=True,blank=True)
    price=models.DecimalField(max_digits=8,decimal_places=2,blank=True)
    thumblain=models.ImageField(upload_to='product_thumblain/')
    descriptions=models.TextField()
    link=models.URLField()
    create_date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_title
    
    def save(self,*args, **kwargs):

        self.slug=slugify(self.product_title)
        super().save(*args, **kwargs)


class Image(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_image')
    image=models.ImageField(upload_to='img')

    def __str__(self):
        return self.product.product_title
        

