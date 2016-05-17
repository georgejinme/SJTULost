#coding: utf-8
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
from lost.models import User
import lost.util.time as time


def get_all_ranks(request):
    users = User.objects.all()
    users_dict = [dict({
        'name': u.name,
        'student_id': u.student_number,
        'times': len(u.found_set.all())
    }) for u in users]
    sorted_rank = sorted(users_dict, key=lambda x: x['times'], reverse=True)
    return JsonResponse(sorted_rank, safe=False)