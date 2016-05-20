#coding:utf-8
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
import json
from lost.models import User
from lost.models import Finding
import lost.app.finding as FindingFunctions
from lost.models import Found
import lost.app.found as FoundFunctions
import django.utils.timezone as timezone
from rauth import OAuth2Service

CLIENT_ID = 'jaseieelost20160504'
SECRET_KEY = '457F80CE2013F75D25E5347C830452F79DEA3B7A3E102325'
SCOPE = 'basic,essential,profile'

BASE_URL = 'https://api.sjtu.edu.cn/v1/'
AUTHORIZATION_URL = 'https://jaccount.sjtu.edu.cn/oauth2/authorize'
TOKEN_URL = 'https://jaccount.sjtu.edu.cn/oauth2/token'

GET_ACCESS_TOKEN_URI = 'http://127.0.0.1:8888/getaccesstoken/'
HOMEPAGE_URL = 'http://127.0.0.1:8888/'

FINDINGS_AMOUNT_EACH_PAGE = 4
FOUNDS_AMOUNT_EACH_PAGE = 4

jaccount = OAuth2Service(
    client_id=CLIENT_ID,
    client_secret=SECRET_KEY,
    authorize_url=AUTHORIZATION_URL,
    access_token_url=TOKEN_URL,
    base_url=BASE_URL
)

# login

def login_with_jaccount(request):
    params = {
        'scope': ['basic essential profile'],
        'response_type': 'code',
        'state': 'text',
        'redirect_uri': GET_ACCESS_TOKEN_URI
    }

    url = jaccount.get_authorize_url(**params)
    return HttpResponseRedirect(url)


def get_access_token(request):
    code_str = request.GET['code']
    data = {
        'code': code_str,
        'grant_type': 'authorization_code',
        'redirect_uri': GET_ACCESS_TOKEN_URI
    }
    session = jaccount.get_auth_session(data = data, decoder=json.loads)
    user_info = session.get('me/profile', params={'access_token': session.access_token}).json()

    id = check_user_exists_in_databases(user_info)
    request.session['user_id'] = id

    return HttpResponseRedirect(HOMEPAGE_URL)

def check_user_exists_in_databases(user_info):
    stu_id = user_info['entities'][0]['code']
    user_name = user_info['entities'][0]['name']
    user = User.objects.filter(student_number = stu_id)
    if len(user) == 0:
        new_user = User(phone = '0', name = user_name, student_number = stu_id)
        new_user.save()
        return new_user.id
    return user[0].id

def check_user_logined(request):
    if request.session.get('user_id', '') != '':
        return True
    else:
        return False


def user_info(sid):
    user = User.objects.get(id = sid)
    user_dict = {
        'name': user.name,
        'phone': user.phone,
        'student_number': user.student_number
    }
    return user_dict


# external functions


def get_user_info(request):
    if check_user_logined(request):
        return JsonResponse(user_info(request.session['user_id']), safe=False)
    else:
        return JsonResponse({
            'name': '使用Jaccount登录',
            'phone': '',
            'student_number': ''
        }, safe=False)

# code:
# 0: success
# 1: invalid format
# 2: fail

def update_user_info(request):
    if check_user_logined(request):
        user_phone = request.POST['phone']
        user_student_number = request.POST['student_number']
        if len(user_phone) == 11:
            User.objects.filter(id=request.session['user_id']).update(phone=user_phone, student_number=user_student_number)
            return JsonResponse({'code': 0}, safe=False)
        else:
            return JsonResponse({'code': 1}, safe=False)
    else:
        return JsonResponse({'code': 2}, safe=False)


def get_user_findings(request):
    page_number = int(request.POST['position']) - 1
    start = page_number * FINDINGS_AMOUNT_EACH_PAGE
    end = (page_number + 1) * FINDINGS_AMOUNT_EACH_PAGE
    if check_user_logined(request):
        user = User.objects.get(id = request.session['user_id'])
        findings = user.finding_set.all().order_by('-lost_time')
        return JsonResponse({
            'findings': FindingFunctions.finding_format(findings[start:end]),
            'amount': findings.count()
        }, safe=False)
    else:
        return JsonResponse([], safe=False)

# code:
# 0: success
# 1: fail

def user_findings_done(request):
    if check_user_logined(request):
        id = request.POST['id']
        Finding.objects.filter(id = id).update(state=1, complete_time=timezone.now())
        return JsonResponse({'code': 0}, safe=False)
    else:
        return JsonResponse({'code': 1}, safe=False)



def get_user_founds(request):
    page_number = int(request.POST['position']) - 1
    start = page_number * FOUNDS_AMOUNT_EACH_PAGE
    end = (page_number + 1) * FOUNDS_AMOUNT_EACH_PAGE
    if check_user_logined(request):
        user = User.objects.get(id = request.session['user_id'])
        founds = user.found_set.all().order_by('-found_time')
        return JsonResponse({
            'founds': FoundFunctions.found_format(founds[start:end]),
            'amount': founds.count()
        }, safe=False)
    else:
        return JsonResponse([], safe=False)

# code:
# 0: success
# 1: fail

def user_founds_done(request):
    if check_user_logined(request):
        id = request.POST['id']
        Found.objects.filter(id = id).update(state=1, complete_time=timezone.now())
        return JsonResponse({'code': 0}, safe=False)
    else:
        return JsonResponse({'code': 1}, safe=False)



def logout(request):
    if check_user_logined(request):
        del request.session['user_id']
    return HttpResponseRedirect(HOMEPAGE_URL)

