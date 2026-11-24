#!/usr/bin/env python3
"""One-time site-wide Ezoic JavaScript integration for the static Twin Flame Bond site."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HEADER = """<!-- Ezoic privacy and header scripts: load consent before ad/analytics code. -->
<script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
<script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
<script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
<script>
window.ezstandalone = window.ezstandalone || {};
ezstandalone.cmd = ezstandalone.cmd || [];
</script>
<script src="//ezoicanalytics.com/analytics.js"></script>
"""
PLACEMENT = """<!-- Ezoic simple ad placement. Ezoic chooses the responsive size. -->
<script>
ezstandalone.cmd.push(function () {
  ezstandalone.showAds({});
});
</script>
"""

changed = 0
header_added = 0
placements_added = 0
adsense_loaders_removed = 0
for path in ROOT.rglob("*.html"):
    if ".git" in path.parts:
        continue
    original = path.read_text(encoding="utf-8")
    content = original

    # Ezoic recommends its privacy scripts first and the header script on every page.
    if "https://www.ezojs.com/ezoic/sa.min.js" not in content and "//www.ezojs.com/ezoic/sa.min.js" not in content:
        match = re.search(r"<head\b[^>]*>", content, flags=re.I)
        if match:
            content = content[:match.end()] + "\n" + HEADER + content[match.end():]
            header_added += 1

    # Remove the direct AdSense loader so it does not compete with Ezoic.
    content, removed = re.subn(
        r'<script\b[^>]*src="https?://pagead\.googlesyndication\.com/pagead/js/adsbygoogle\.js[^"]*"[^>]*>\s*</script>\s*',
        "",
        content,
        flags=re.I,
    )
    adsense_loaders_removed += removed

    # Do not place ads on the privacy policy or 404 page.
    is_legal_or_error = path.name.lower() == "404.html" or path.name.lower() == "privacy.html"
    if not is_legal_or_error and "ezstandalone.showAds" not in content:
        body_end = re.search(r"</body\s*>", content, flags=re.I)
        if body_end:
            content = content[:body_end.start()] + PLACEMENT + content[body_end.start():]
            placements_added += 1

    if content != original:
        path.write_text(content, encoding="utf-8")
        changed += 1

print(f"HTML files changed: {changed}")
print(f"Ezoic headers added: {header_added}")
print(f"Simple ad placements added: {placements_added}")
print(f"Direct AdSense loaders removed: {adsense_loaders_removed}")
