#coding: utf-8
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
from lost.models import User
import lost.util.time as time


def get_all_ranks(request):
    ranks_array = [
        {
            'no': 1,
            'name': '金嘉骏',
            'student_id': 5130309578,
            'times': 4
        },
        {
            'no': 2,
            'name': '胡逸飞',
            'student_id': 5130309538,
            'times': 1
        }
    ]
    return JsonResponse(ranks_array, safe=False)