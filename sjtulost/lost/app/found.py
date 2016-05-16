from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Found
from lost.models import User
import lost.app.item as Item
import lost.app.place as Place
import lost.util.time as time
import lost.util.qiniu_tools as qiniu

def check_description(d):
    if len(d) == 0:
        return False
    else:
        return True


def check_img(i):
    if len(i) == 0:
        return False
    else:
        return True


def check_items(i):
    if len(i) == 0:
        return False
    else:
        return True


def check_time(t):
    return time.is_valid_date(t)


def check_places(p):
    if int(p) <= 0:
        return False
    else:
        return True


def check_place_detail(pd):
    if len(pd) == 0:
        return False
    else:
        return True


def check_detail(d):
    if len(d) == 0:
        return False
    else:
        return True

def check_found(j):
    return check_description(j['description']) and \
            check_img(j['img']) and \
            check_time(j['time']) and \
            check_items(j['item_type_ids']) and \
            check_places(j['place_id']) and \
            check_place_detail(j['place_detail']) and \
            check_detail(j['detail'])


# internal function

def found_item_types(found):
    found_item_types_array = [i.description for i in found.type_id.all()]
    return ",".join(found_item_types_array)

def found_item_types_ids(finding):
    return [i.id for i in finding.type_id.all()]


def found_format(founds_array):
    founds_dict = [dict({'id': f.id,
                         'description': f.description,
                         'img': f.image,
                         'item_type': found_item_types(f),
                         'item_type_ids': found_item_types_ids(f),
                         'user_phone': f.user_id.phone,
                         'time': time.timeString(f.found_time),
                         'place': f.place_id.description,
                         'place_id': f.place_id.id,
                         'place_detail': f.place_detail,
                         'detail': f.detail,
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

def founds_with_id(found_id):
    return found_format([Found.objects.get(id = found_id)])


# external function

def get_all_founds(request):
    return JsonResponse(founds(), safe=False)


def get_founds_with_filter(request):
    item = request.POST.getlist('item[]')
    place = request.POST.getlist('place[]')
    return JsonResponse(founds_with_item_and_place(item, place), safe=False)


def get_founds_with_id(request):
    found_id = request.POST['id']
    return JsonResponse(founds_with_id(found_id), safe=False)

# code:
# 0: success
# 1: fail

def publish_found_upload_image(request):
    if request.session.get('user_id', '') != '':
        url = qiniu.upload_image(request.session['user_id'], request.FILES[u'files[]'], 'found')
        if url == '':
            return JsonResponse({'code': 1,
                                 'url': ''
                                 }, safe=False)
        else:
            return JsonResponse({'code': 0,
                                 'url': url
                                 }, safe=False)
    else:
        return JsonResponse({'code': 1,
                             'url': ''
                             }, safe=False)


# code:
# 0: success
# 1: invalid format
# 2: fail


def create_found(request):
    found_dict = {
        'description': request.POST['description'],
        'img': request.POST['img'],
        'item_type_ids': request.POST.getlist('item_type_ids[]'),
        'time': request.POST['time'],
        'place_id': request.POST['place_id'],
        'place_detail': request.POST['place_detail'],
        'detail': request.POST['detail'],
    }
    if not check_found(found_dict):
        return JsonResponse({
            'code': 1
        }, safe=False)
    else:
        if request.session.get('user_id', '') != '':
            user = User.objects.get(id=request.session['user_id'])
            place = Place.get_place_by_id(int(found_dict['place_id']))
            new_found = Found(user_id=user,
                              description=found_dict['description'],
                              state=0,
                              image=found_dict['img'],
                              place_detail=found_dict['place_detail'],
                              detail=found_dict['detail'],
                              place_id=place,
                              found_time=found_dict['time'])
            new_found.save()
            for i in found_dict['item_type_ids']:
                item = Item.get_item_type_by_id(int(i))
                new_found.type_id.add(item)
            return JsonResponse({
                'code': 0
            }, safe=False)
        else:
            return JsonResponse({
                'code': 2
            }, safe=False)


def update_found(request):
    found_dict = {
        'id': request.POST['id'],
        'description': request.POST['description'],
        'img': request.POST['img'],
        'item_type_ids': request.POST.getlist('item_type_ids[]'),
        'time': request.POST['time'],
        'place_id': request.POST['place_id'],
        'place_detail': request.POST['place_detail'],
        'detail': request.POST['detail'],
    }
    if not check_found(found_dict):
        return JsonResponse({
            'code': 1
        }, safe=False)
    else:
        if request.session.get('user_id', '') != '':
            user = User.objects.get(id=request.session['user_id'])
            place = Place.get_place_by_id(int(found_dict['place_id']))
            found = Found.objects.filter(id=found_dict['id'])
            found.update(user_id=user,
                         description=found_dict['description'],
                         state=0,
                         image=found_dict['img'],
                         place_detail=found_dict['place_detail'],
                         detail=found_dict['detail'],
                         place_id=place,
                         lost_time=found_dict['time'])

            found.type_id.clear()
            for i in found_dict['item_type_ids']:
                item = Item.get_item_type_by_id(int(i))
                found.type_id.add(item)
            return JsonResponse({
                'code': 0
            }, safe=False)
        else:
            return JsonResponse({
                'code': 2
            }, safe=False)





