"""sjtulost URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    #url(r'^initdb/', 'lost.db.initdb.init_database', name='init_database'),

    url(r'^$', 'lost.app.views.home', name='home'),
    url(r'^finding/$', 'lost.app.views.finding', name='finding'),
    url(r'^found/$', 'lost.app.views.found', name='found'),
    url(r'^rank/$', 'lost.app.views.rank', name='rank'),
    url(r'^me/$', 'lost.app.views.me', name='me'),

    url(r'^loginwithjaccount/$', 'lost.app.user.login_with_jaccount', name='login_with_jaccount'),
    url(r'^getaccesstoken/$', 'lost.app.user.get_access_token', name='get_access_token'),
    url(r'^getuserinfo/$', 'lost.app.user.get_user_info', name='get_access_token'),
    url(r'^updateuserinfo/$', 'lost.app.user.update_user_info', name='update_user_info'),

    url(r'^findingview/(\d+)/$', 'lost.app.views.findingview', name='findingview'),
    url(r'^foundview/(\d+)/$', 'lost.app.views.foundview', name='foundview'),

    url(r'^getfindings/', 'lost.app.finding.get_all_findings', name='get_all_findings'),
    url(r'^getfounds/', 'lost.app.found.get_all_founds', name='get_all_founds'),
    url(r'^getitems/', 'lost.app.item.get_all_item_types', name = 'get_all_item_types'),
    url(r'^getplaces/', 'lost.app.place.get_all_places', name='get_all_places'),
    url(r'^getrank/', 'lost.app.rank.get_all_ranks', name='get_all_ranks'),

    url(r'^getfindingswithfilter/', 'lost.app.finding.get_findings_with_filter', name='get_findings_with_filter'),
    url(r'^getfoundswithfilter/', 'lost.app.found.get_founds_with_filter', name='get_founds_with_filter'),

    url(r'^getfindingswithid/', 'lost.app.finding.get_findings_with_id', name='get_findings_with_id'),
    url(r'^getfoundswithid/', 'lost.app.found.get_founds_with_id', name='get_founds_with_id'),

    url(r'^admin/', include(admin.site.urls)),
]
