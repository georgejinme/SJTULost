#coding:utf-8
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
import json
from lost.models import User
from rauth import OAuth2Service

CLIENT_ID = 'jaseieelost20160504'
SECRET_KEY = '457F80CE2013F75D25E5347C830452F79DEA3B7A3E102325'
SCOPE = 'basic,essential,profile'

BASE_URL = 'https://api.sjtu.edu.cn/v1/'
AUTHORIZATION_URL = 'https://jaccount.sjtu.edu.cn/oauth2/authorize'
TOKEN_URL = 'https://jaccount.sjtu.edu.cn/oauth2/token'

GET_ACCESS_TOKEN_URI = 'http://127.0.0.1:8888/getaccesstoken/'
REDIRECT_URI = 'http://127.0.0.1:8888/'

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

    return HttpResponseRedirect(REDIRECT_URI)

def check_user_exists_in_databases(user_info):
    stu_id = user_info['entities'][0]['code']
    user_name = user_info['entities'][0]['name']
    user = User.objects.filter(student_number = stu_id)
    if len(user) == 0:
        new_user = User(phone = 0, name = user_name, student_number = stu_id)
        new_user.save()
        return new_user.id
    return user.id


# get user information


def user_info(sid):
    user = User.objects.get(id = sid)
    user_dict = {
        'name': user.name,
        'phone': user.phone,
        'student_number': user.student_number
    }
    return user_dict


def get_user_info(request):
    if request.session.get('user_id', '') != '':
        return JsonResponse(user_info(request.session['user_id']), safe=False)
    else:
        return JsonResponse({
            'name': '使用Jaccount登录',
            'phone': '',
            'student_number': ''
        }, safe=False)


def update_user_info(request):
    if request.session.get('user_id', '') != '':
        User.objects.filter(id = request.session['user_id']).update(phone = request.POST['phone'], student_number=request.POST['student_number'])
        return JsonResponse({'success': 1}, safe=False)
    else:
        return JsonResponse({'success': 0}, safe=False)

