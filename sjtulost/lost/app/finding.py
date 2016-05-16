from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
from lost.models import User
import lost.app.item as Item
import lost.app.place as Place
import lost.util.time as time
import lost.util.number as number
import django.utils.timezone as timezone
import qiniu
import qiniu.config

ACCESS_KEY = '8cWwOsrZzbf55SkNtySdbHoQ4ctqFCLWQtGpz2HO'
SECRET_KEY = 'ARUvI86Xvip6JoEE1wE6-uAaoHE1EuHORaZSO-m3'


def upload_image(id, file):
    current_time = timezone.now()
    current_time_str = str(current_time)
    current_time_str = current_time_str.replace(' ', '').replace('.', '').replace('-', '').replace(':', '')
    file_name = str(id) + current_time_str + '.jpg'

    bucket_src = 'sjtulost'
    q = qiniu.Auth(ACCESS_KEY, SECRET_KEY)
    token = q.upload_token(bucket_src)
    ret, info = qiniu.put_data(token, file_name, file)
    if ret is None:
        return ''
    else:
        return "http://7xtbqj.com1.z0.glb.clouddn.com/" + file_name


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
    if len(p) == 0:
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


def check_pay(p):
    if len(p) == 0:
        return False
    else:
        return number.is_valid_float(p)


def check_finding(j):
    return check_description(j['description']) and \
            check_img(j['img']) and \
            check_time(j['time']) and \
            check_items(j['item_type_ids']) and \
            check_places(j['place_ids']) and \
            check_place_detail(j['place_detail']) and \
            check_detail(j['detail']) and \
            check_pay(j['pay'])


# internal function

def finding_places(finding):
    finding_places_array = [p.description for p in finding.place_ids.all()]
    return ",".join(finding_places_array)

def finding_places_ids(finding):
    return [p.id for p in finding.place_ids.all()]

def finding_item_types(finding):
    finding_item_types_array = [i.description for i in finding.type_id.all()]
    return ",".join(finding_item_types_array)

def finding_item_types_ids(finding):
    return [i.id for i in finding.type_id.all()]


def finding_format(findings_array):
    findings_dict = [dict({'id': f.id,
                           'description': f.description,
                           'img': f.image,
                           'item_type': finding_item_types(f),
                           'item_type_ids': finding_item_types_ids(f),
                           'user_phone': f.user_id.phone,
                           'time': time.timeString(f.lost_time),
                           'place': finding_places(f),
                           'place_ids': finding_places_ids(f),
                           'place_detail': f.place_detail,
                           'detail': f.detail,
                           'pay': f.pay,
                           'state': f.state}) for f in findings_array]
    return findings_dict

def findings():
    findings_array = Finding.objects.all().order_by('-lost_time')
    return finding_format(findings_array)

def findings_with_item(item):
    findings_list = Finding.objects.none()
    for each in item:
        item = Item.get_item_type_by_id(int(each))
        item_findings = item.finding_set.all()
        findings_list = findings_list | item_findings
    return findings_list.distinct()

def findings_with_place(place):
    findings_list = Finding.objects.none()
    for each in place:
        item = Place.get_place_by_id(int(each))
        place_findings = item.finding_set.all()
        findings_list = findings_list | place_findings
    return findings_list.distinct()


def findings_with_item_and_place(item, place):
    item_findings = findings_with_item(item)
    place_findings = findings_with_place(place)
    print item_findings
    print place_findings
    findings_list = (item_findings & place_findings).order_by('-lost_time')
    return finding_format(findings_list)

def findings_with_id(finding_id):
    return finding_format([Finding.objects.get(id = finding_id)])

# external function

def get_all_findings(request):
    return JsonResponse(findings(), safe=False)


def get_findings_with_filter(request):
    item = request.POST.getlist('item[]')
    place = request.POST.getlist('place[]')
    return JsonResponse(findings_with_item_and_place(item, place), safe=False)


def get_findings_with_id(request):
    finding_id = request.POST['id']
    return JsonResponse(findings_with_id(finding_id), safe=False)

# code:
# 0: success
# 1: fail

def publish_finding_upload_image(request):
    if request.session.get('user_id', '') != '':
        url = upload_image(request.session['user_id'], request.FILES[u'files[]'])
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


def create_finding(request):
    finding_dict = {
        'description': request.POST['description'],
        'img': request.POST['img'],
        'item_type_ids': request.POST.getlist('item_type_ids[]'),
        'time': request.POST['time'],
        'place_ids': request.POST.getlist('place_ids[]'),
        'place_detail': request.POST['place_detail'],
        'detail': request.POST['detail'],
        'pay': request.POST['pay']
    }
    if not check_finding(finding_dict):
        return JsonResponse({
            'code': 1
        }, safe=False)
    else:
        if request.session.get('user_id', '') != '':
            user = User.objects.get(id=request.session['user_id'])
            new_finding = Finding(user_id=user,
                                  description=finding_dict['description'],
                                  pay=finding_dict['pay'],
                                  state=0,
                                  image=finding_dict['img'],
                                  place_detail=finding_dict['place_detail'],
                                  detail=finding_dict['detail'], lost_time=finding_dict['time'])
            new_finding.save()
            for i in finding_dict['item_type_ids']:
                item = Item.get_item_type_by_id(int(i))
                new_finding.type_id.add(item)
            for p in finding_dict['place_ids']:
                place = Place.get_place_by_id(int(p))
                new_finding.place_ids.add(place)
            return JsonResponse({
                'code': 0
            }, safe=False)
        else:
            return JsonResponse({
                'code': 2
            }, safe=False)










