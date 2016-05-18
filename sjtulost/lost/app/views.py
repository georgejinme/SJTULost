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


def findingview(request, id):
    return render(request, 'main.html')


def foundview(request, id):
    return render(request, 'main.html')


def me(request):
    return render(request, 'main.html')


def publish_finding(request):
    return render(request, 'main.html')


def publish_found(request):
    return render(request, 'main.html')


def publish_finding_with_id(request, id):
    return render(request, 'main.html')


def publish_found_with_id(request, id):
    return render(request, 'main.html')

def search_finding(request, keyword):
    print keyword
    return render(request, 'main.html')

def search_found(request, keyword):
    print keyword
    return render(request, 'main.html')