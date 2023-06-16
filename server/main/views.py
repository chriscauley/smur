from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

from natureRando.loadout import Loadout
from natureRando.item_data import all_items
from natureRando import logicCasual

name_by_slug = {
    'bomb': 'Bombs',
    'spring-ball': 'Springball',
    'x-ray': 'Beam Burst',
    'grappling-beam': 'Grapple Beam',
    'hi-jump-boots': 'HiJump',
    'spazer-beam': 'Spazer',
}
item_by_name = {}
item_by_slug = {}

for name, item in all_items.items():
    slug = name.lower().replace(' ', '-')
    name_by_slug[slug] = name
    item_by_name[name] = item
    item_by_slug[slug] = item


@csrf_exempt
def solve(request):
    data = json.loads(request.body.decode('utf-8') or "{}")
    loadout = Loadout('whatever')
    for slug, quantity in data['inventory'].items():
        name = name_by_slug[slug]
        item = item_by_name[name]
        loadout.contents[item] = quantity
    locations = {}
    for name, func in logicCasual.location_logic.items():
        locations[name] = func(loadout)
    return JsonResponse({'locations': locations})