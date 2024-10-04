from django.shortcuts import render,get_object_or_404,redirect
from .models import Category,Product,Image
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.db.models import Q

# Create your views here.
def product(request):
    q=Product.objects.order_by('create_date')
    page=request.GET.get('page',1)
    paginator=Paginator(q,5)

    try:
        products=paginator.page(page)
    except EmptyPage:
        products.paginator.page(1)
    except PageNotAnInteger:
        products=paginator.page(1)
        return redirect ('home')
       
        
    
    context={
        'products':products,
        'paginator':paginator
        

    }
    return render(request,'home.html',context)




def product_details(request,slug):
    product=get_object_or_404(Product,slug=slug)
    images=Image.objects.filter(product=product)
    context={
        'product':product,
        'images':images
        

    }
    return render(request,'product_details.html',context)



#Search Product

def Search_product(request):
    search_key=request.GET.get("search") 
    if search_key:
        products=Product.objects.filter(
            Q(product_title__icontains=search_key)|
            Q(category__title__icontains=search_key) 
            

        )
        
        
                
        page=request.GET.get('page',1)
        paginator=Paginator(products,2)
            
        try:
            products=paginator.page(page)
        except EmptyPage:
            products.paginator.page(1)
        except PageNotAnInteger:
            products=paginator.page(1)
            return redirect('home')
        context={ 
            
            "products": products,
            "paginator":paginator,
            "search_key":search_key
            
            
            }
    
        
        return render(request,'search_result.html',context)
    else:
        return redirect('home')
    # query = request.GET.get('search','')
    # object_list = Product.objects.filter(Q(product_title__icontains=query))
    # paginator = Paginator(object_list, 3)  # 10 items per page
    # page_number = request.GET.get('page')
    # page_obj = paginator.get_page(page_number)
    # context={
    #     "page_obj":page_obj,
    #     "query":query
    # }


    # return render(request, 'search_result.html', context)