from django.shortcuts import render
# Create your views here.


def finding(request):
    return render(request, 'main.html')