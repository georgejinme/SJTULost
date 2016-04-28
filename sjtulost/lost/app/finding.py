from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
import lost.app.item as Item
import lost.app.place as Place
import lost.util.time as time

def finding_places(finding):
    finding_places_array = [p.description for p in finding.place_ids.all()]
    return ",".join(finding_places_array)

def finding_item_types(finding):
    finding_item_types_array = [i.description for i in finding.type_id.all()]
    return ",".join(finding_item_types_array)


def finding_format(findings_array):
    findings_dict = [dict({'id': f.id,
                           'description': f.description,
                           'img': f.image,
                           'item_type': finding_item_types(f),
                           'user_phone': f.user_id.phone,
                           'time': time.timeString(f.lost_time),
                           'place': finding_places(f),
                           'place_detail': f.place_detail,
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


def get_all_findings(request):
    return JsonResponse(findings(), safe=False)


def get_findings_with_filter(request):
    item = request.POST.getlist('item[]')
    place = request.POST.getlist('place[]')
    return JsonResponse(findings_with_item_and_place(item, place), safe=False)






