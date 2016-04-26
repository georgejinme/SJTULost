from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Place


def get_all_places(request):
    places = Place.objects.all()
    places_array = [p.description for p in places]
    return JsonResponse(places_array, safe=False)


