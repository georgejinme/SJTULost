from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Found
import lost.util.time as time


def get_all_founds(request):
    founds = Found.objects.all().order_by('-found_time')
    founds_array = [dict({'description': f.description,
                          'img': f.image,
                          'user_phone': f.user_id.phone,
                          'lost_time': time.timeString(f.found_time),
                          'lost_place': f.place_id.description,
                          'state': f.state}) for f in founds]
    return JsonResponse(founds_array, safe=False)



