from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
import json
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
    print 123
    code_str = request.GET['code']
    data = {
        'code': code_str,
        'grant_type': 'authorization_code',
        'redirect_uri': GET_ACCESS_TOKEN_URI
    }
    session = jaccount.get_auth_session(data = data, decoder=json.loads)
    print session.get('me/profile', params={'access_token': session.access_token}).json()

    return HttpResponseRedirect(REDIRECT_URI)