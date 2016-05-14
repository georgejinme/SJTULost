from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
import lost.app.item as Item
import lost.app.place as Place
import lost.util.time as time
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
    url = upload_image(request.session['user_id'], request.FILES[u'files[]'])
    print url
    if url == '':
        return JsonResponse({'code': 1,
                             'url': url
                             }, safe=False)
    else:
        return JsonResponse({'code': 0,
                             'url': url
                             }, safe=False)








