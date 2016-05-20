from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import ItemType

def item_type_amount():
    return ItemType.objects.count()

def get_item_type_by_id(i):
    return ItemType.objects.get(id=i)

def get_all_item_types(request):
    item_types = ItemType.objects.all()
    item_types_dict = [dict({'id': i.id,
                             'description': i.description}) for i in item_types]
    return JsonResponse(item_types_dict, safe=False)



