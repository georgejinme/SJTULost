from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from lost.models import Finding
import lost.util.time as time


def get_finding_places(finding):
    finding_places_array = [p.description for p in finding.place_ids.all()]
    return ",".join(finding_places_array)


def get_all_findings(request):
    findings = Finding.objects.all().order_by('-lost_time')
    findings_array = [dict({'description': f.description,
                            'img': f.image,
                            'user_phone': f.user_id.phone,
                            'lost_time': time.timeString(f.lost_time),
                            'lost_place': get_finding_places(f),
                            'state': f.state}) for f in findings]
    return JsonResponse(findings_array, safe=False)





