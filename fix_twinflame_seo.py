#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""twinflame.bond sitewide SEO fix: titles ≤60 (smart per-section patterns) + BreadcrumbList on all pages."""
import re, glob, json, os

SITE = "https://twinflame.bond"

def head_of(title):
    return re.sub(r"\s*\|.*$", "", title.split(" — ")[0]).strip()

def fix_compatibility(title):
    m = re.match(r"(\w+) and (\w+) Compatibility", title)
    if not m: return None
    s1, s2 = m.group(1), m.group(2)
    t = f"{s1} and {s2} Compatibility — Zodiac & Twin Flame"
    if len(t) > 60:
        t = f"{s1} and {s2} Compatibility"
    return t

def strip_suffix(title):
    return re.sub(r"\s*\|\s*Twin Flame Bond\s*$", "", title).strip()

fixed_titles, injected_bc, still_long = 0, 0, []

files = [f for f in glob.glob("**/*.html", recursive=True) if ".git" not in f and f != "404.html"]
for f in files:
    s = open(f, encoding="utf-8").read()
    m = re.search(r"<title>([^<]*)</title>", s)
    if not m: continue
    old = m.group(1)
    new = old

    if f.startswith("compatibility/"):
        new = fix_compatibility(old) or strip_suffix(old)
    elif f == "index.html":
        new = "Twin Flame Calculator, Angel Numbers & Compatibility"
    else:
        new = strip_suffix(old)

    if len(new) > 60:  # last-resort trim on the em-dash segment
        parts = new.split(" — ")
        if len(parts) > 2:
            new = " — ".join(parts[:2])
    if len(new) > 60:
        still_long.append((f, len(new), new))

    if new != old:
        s = s.replace(f"<title>{old}</title>", f"<title>{new}</title>", 1)
        # og:title mirror
        s = re.sub(r'(og:title" content=")[^"]*(")', r"\g<1>" + new + r"\g<2>", s, count=1)
        fixed_titles += 1

    # BreadcrumbList
    if "BreadcrumbList" not in s:
        if f.startswith("compatibility/"):
            trail = [("Home", SITE + "/"), ("Compatibility", SITE + "/compatibility/"), (head_of(new), SITE + "/" + f)]
        elif f.startswith("numbers/"):
            trail = [("Home", SITE + "/"), ("Angel Numbers", SITE + "/numbers/"), (head_of(new), SITE + "/" + f)]
        elif f.startswith("tools/"):
            trail = [("Home", SITE + "/"), ("Tools", SITE + "/tools/"), (head_of(new), SITE + "/" + f)]
        elif f.startswith("recommendations/"):
            trail = [("Home", SITE + "/"), ("Recommended Offers", SITE + "/recommendations/"), (head_of(new), SITE + "/" + f)]
        else:
            trail = [("Home", SITE + "/"), (head_of(new), SITE + "/" + f)]
        bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(trail)]}
        block = '<script type="application/ld+json">' + json.dumps(bc, ensure_ascii=False) + "</script>\n</head>"
        s = s.replace("</head>", block, 1)
        injected_bc += 1

    open(f, "w", encoding="utf-8").write(s)

print(f"✓ titles fixed: {fixed_titles} | breadcrumbs injected: {injected_bc}")
if still_long:
    print("still long:")
    for f, l, t in still_long: print(f"  {l} {f}: {t[:70]}")

# update sitemap lastmod
sm = open("sitemap.xml", encoding="utf-8").read()
sm = re.sub(r"<lastmod>[^<]*</lastmod>", "<lastmod>2026-10-13</lastmod>", sm)
open("sitemap.xml", "w", encoding="utf-8").write(sm)
print(f"✓ sitemap lastmod updated ({sm.count('<loc>')} URLs)")
