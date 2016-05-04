from django.shortcuts import render
# Create your views here.


def finding(request):
    return render(request, 'main.html')

def home(request):
    return render(request, 'main.html')

def found(request):
    return render(request, 'main.html')

def rank(request):
    return render(request, 'main.html')