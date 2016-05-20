from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
from lost.models import User
import lost.app.item as Item
import lost.app.place as Place
import lost.util.time as time
import lost.util.number as number
import lost.util.qiniu_tools as qiniu

FINDINGS_AMOUNT_EACH_PAGE = 10

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

def findings(page):
    start = page * FINDINGS_AMOUNT_EACH_PAGE
    end = (page + 1) * FINDINGS_AMOUNT_EACH_PAGE
    findings_list = Finding.objects.all().order_by('-lost_time')
    return finding_format(findings_list[start:end]), findings_list.count()

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


def findings_with_item_and_place(item, place, page):
    start = page * FINDINGS_AMOUNT_EACH_PAGE
    end = (page + 1) * FINDINGS_AMOUNT_EACH_PAGE
    item_findings = findings_with_item(item)
    place_findings = findings_with_place(place)
    findings_list = (item_findings & place_findings).order_by('-lost_time')
    return finding_format(findings_list[start:end]), findings_list.count()

def findings_with_id(finding_id):
    return finding_format([Finding.objects.get(id = finding_id)])

def findings_with_description(d):
    return Finding.objects.filter(description__contains=d)

def findings_with_detail(d):
    return Finding.objects.filter(detail__contains=d)

def findings_with_place_detail(pd):
    return Finding.objects.filter(place_detail__contains=pd)

# external function

def get_all_findings(request):
    page_number = int(request.POST['position']) - 1
    findings_list, findings_amount = findings(page_number)
    return JsonResponse({
        'findings': findings_list,
        'amount': findings_amount
    }, safe=False)


def get_findings_with_filter(request):
    page_number = int(request.POST['position']) - 1
    item = request.POST.getlist('item[]')
    place = request.POST.getlist('place[]')
    findings_list, findings_amount = findings_with_item_and_place(item, place, page_number)
    return JsonResponse({
        'findings': findings_list,
        'amount': findings_amount
    }, safe=False)


def get_findings_with_id(request):
    finding_id = request.POST['id']
    return JsonResponse(findings_with_id(finding_id), safe=False)

def get_findings_with_keyword(request):
    page_number = int(request.POST['position']) - 1
    start = page_number * FINDINGS_AMOUNT_EACH_PAGE
    end = (page_number + 1) * FINDINGS_AMOUNT_EACH_PAGE
    keyword = request.POST['keyword']
    keyword_list_and = keyword.split(' ')
    findings_set_and = Finding.objects.all().distinct()
    for each in keyword_list_and:
        keyword_list_or = each.split('|')
        findings_set_or = Finding.objects.none()
        for each_keyword in keyword_list_or:
            each_findings_set = (findings_with_description(each_keyword) | findings_with_detail(each_keyword) | findings_with_place_detail(each_keyword)).distinct()
            findings_set_or = (findings_set_or | each_findings_set).distinct()
        findings_set_and = (findings_set_and & findings_set_or).distinct().order_by('-lost_time')
    return JsonResponse({
        'findings': finding_format(findings_set_and[start:end]),
        'amount': findings_set_and.count()
    }, safe=False)


# code:
# 0: success
# 1: fail

def publish_finding_upload_image(request):
    if request.session.get('user_id', '') != '':
        url = qiniu.upload_image(request.session['user_id'], request.FILES[u'files[]'], 'finding')
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
# 3: user_phone


def create_finding(request):
    code = 0
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
        code = 1
    else:
        if request.session.get('user_id', '') != '':
            user = User.objects.get(id=request.session['user_id'])
            if user.phone == '0':
                code = 3
            else:
                new_finding = Finding(user_id=user,
                                      description=finding_dict['description'],
                                      pay=finding_dict['pay'],
                                      state=0,
                                      image=finding_dict['img'],
                                      place_detail=finding_dict['place_detail'],
                                      detail=finding_dict['detail'],
                                      lost_time=finding_dict['time'])
                new_finding.save()
                for i in finding_dict['item_type_ids']:
                    item = Item.get_item_type_by_id(int(i))
                    new_finding.type_id.add(item)
                for p in finding_dict['place_ids']:
                    place = Place.get_place_by_id(int(p))
                    new_finding.place_ids.add(place)
                code = 0
        else:
            code = 2
    return JsonResponse({
        'code': code
    }, safe=False)


def update_finding(request):
    code = 0
    finding_dict = {
        'id': request.POST['id'],
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
        code = 1
    else:
        if request.session.get('user_id', '') != '':
            finding = Finding.objects.filter(id=finding_dict['id'])
            finding.update(description=finding_dict['description'],
                           pay=finding_dict['pay'],
                           image=finding_dict['img'],
                           place_detail=finding_dict['place_detail'],
                           detail=finding_dict['detail'],
                           lost_time=finding_dict['time'])
            if len(finding) > 0:
                finding[0].place_ids.clear()
                finding[0].type_id.clear()
                for i in finding_dict['item_type_ids']:
                    item = Item.get_item_type_by_id(int(i))
                    finding[0].type_id.add(item)
                for p in finding_dict['place_ids']:
                    place = Place.get_place_by_id(int(p))
                    finding[0].place_ids.add(place)
                code = 0
            else:
                code = 2
        else:
            code = 2
    return JsonResponse({
        'code': code
    }, safe=False)










