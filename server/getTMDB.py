import urllib.request
import re
import json
import urllib.parse

movies = ['Toy Story 5', 'Disclosure Day', 'Obsession', 'The Backrooms', 'Scary Movie', 'Masters of the Universe', 'The Mandalorian and Grogu', 'The Death of Robin Hood', 'Leviticus', 'Michael']
posters = []

for m in movies:
    try:
        url = 'https://www.themoviedb.org/search?query=' + urllib.parse.quote(m)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'<img loading="lazy" class="poster" src="(https://media\.themoviedb\.org/t/p/w94_and_h141_bestv2/[^"]+)"', html)
        if match:
            # high res version
            img_url = match.group(1).replace('w94_and_h141_bestv2', 'w600_and_h900_bestv2')
            posters.append(img_url)
        else:
            posters.append('')
    except Exception as e:
        posters.append('')

print(json.dumps(posters, indent=2))
