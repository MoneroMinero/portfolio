# Izračuna "izgled" svake fotke s naslovnice (boja, svjetlina, zasićenost, raspored svjetla)
# da se naslovnica može složiti tako da susjedne fotke budu što različitije.
# Pokretanje: python3 alati/izgled-fotki.py  → zapiše alati/izgled-fotki.json
import json, os, colorsys
from PIL import Image, ImageStat
D = os.path.join(os.path.dirname(__file__), "..", "public", "fotke", "naslovna")
out = {}
for f in sorted(os.listdir(D)):
    if not f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")): continue
    im = Image.open(os.path.join(D, f)).convert("RGB")
    w, h = im.size
    m = im.resize((64, 64))
    hsv = [colorsys.rgb_to_hsv(*(c / 255 for c in p)) for p in m.getdata()]
    # prosječna boja (težinski po zasićenosti i svjetlini, kao vektor na krugu nijansi)
    import math
    x = y = tw = 0
    for hh, s, v in hsv:
        t = s * v
        x += math.cos(2 * math.pi * hh) * t; y += math.sin(2 * math.pi * hh) * t; tw += t
    nij = (math.atan2(y, x) / (2 * math.pi)) % 1
    jakost = math.hypot(x, y) / max(tw, 1e-6)  # koliko je boja "jedna" (1) ili šarena (0)
    sv = sum(v for _, _, v in hsv) / len(hsv)
    zas = sum(s for _, s, _ in hsv) / len(hsv)
    sitno = [round(p / 255, 2) for p in im.convert("L").resize((6, 6)).getdata()]
    out[os.path.splitext(f)[0]] = {"o": round(w / h, 3), "nij": round(nij, 3), "jak": round(jakost, 3),
                                   "sv": round(sv, 3), "zas": round(zas, 3), "sitno": sitno}
json.dump(out, open(os.path.join(os.path.dirname(__file__), "izgled-fotki.json"), "w", encoding="utf8"), ensure_ascii=False, indent=0)
print(len(out))
