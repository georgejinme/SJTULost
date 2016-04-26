from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import ItemType


def get_all_item_types(request):
    item_types = ItemType.objects.all()
    item_types_array = [i.description for i in item_types]
    return JsonResponse(item_types_array, safe=False)



