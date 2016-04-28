from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Found
import lost.app.item as Item
import lost.app.place as Place
import lost.util.time as time


def found_item_types(found):
    found_item_types_array = [i.description for i in found.type_id.all()]
    return ",".join(found_item_types_array)


def found_format(founds_array):
    founds_dict = [dict({'id': f.id,
                         'description': f.description,
                         'img': f.image,
                         'item_type': found_item_types(f),
                         'user_phone': f.user_id.phone,
                         'time': time.timeString(f.found_time),
                         'place': f.place_id.description,
                         'place_detail': f.place_detail,
                         'state': f.state}) for f in founds_array]
    return founds_dict


def founds():
    founds_array = Found.objects.all().order_by('-found_time')
    return found_format(founds_array)


def founds_with_item(item):
    founds_list = Found.objects.none()
    for each in item:
        item = Item.get_item_type_by_id(int(each))
        item_founds = item.found_set.all()
        founds_list = founds_list | item_founds
    return founds_list.distinct()


def founds_with_place(place):
    founds_list = Found.objects.none()
    for each in place:
        item = Place.get_place_by_id(int(each))
        place_founds = item.found_set.all()
        founds_list = founds_list | place_founds
    return founds_list.distinct()


def founds_with_item_and_place(item, place):
    item_founds = founds_with_item(item)
    place_founds = founds_with_place(place)
    founds_list = (item_founds & place_founds).order_by('-found_time')
    return found_format(founds_list)


def get_all_founds(request):
    return JsonResponse(founds(), safe=False)


def get_founds_with_filter(request):
    item = request.POST.getlist('item[]')
    place = request.POST.getlist('place[]')
    return JsonResponse(founds_with_item_and_place(item, place), safe=False)




