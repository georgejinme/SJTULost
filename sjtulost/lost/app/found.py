from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Found
import lost.util.time as time


def get_found_item_types(found):
    found_item_types_array = [i.description for i in found.type_id.all()]
    return ",".join(found_item_types_array)


def get_all_founds(request):
    founds = Found.objects.all().order_by('-found_time')
    founds_array = [dict({'id': f.id,
                          'description': f.description,
                          'img': f.image,
                          'item_type': get_found_item_types(f),
                          'user_phone': f.user_id.phone,
                          'time': time.timeString(f.found_time),
                          'place': f.place_id.description,
                          'place_detail': f.place_detail,
                          'state': f.state}) for f in founds]
    return JsonResponse(founds_array, safe=False)



