from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Place


def get_all_places(request):
    places = Place.objects.all()
    places_dict = [dict({'id': p.id,
                          'description': p.description}) for p in places]
    return JsonResponse(places_dict, safe=False)


