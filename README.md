# Twin Flame Bond — twinflame.bond

Free twin flame & angel number tools built on real numerology and zodiac engines. Static site, zero dependencies, everything runs client-side.

## Structure

```
index.html                      Homepage
tools/
  twin-flame-calculator.html    Flagship: life paths + masters + bond number + zodiac → weighted score
  angel-number-lookup.html      Decoder for 40+ angel sequences
  twin-flame-test.html          20-question, 6-stage test
zodiac-compatibility.html       Interactive 144-pairing matrix
stages.html signs.html separation.html   Long-form guides
numbers/                        10 angel-number pages (1111, 111, 222, … 1212)
recommendations/soulmate-sketch.html     Sponsored pre-sell page
assets/
  style.css                     Shared stylesheet (dark mystic theme)
  app.js                        Engines (numerology/zodiac/bond) + shared UI wiring
  angels.js                     Angel number dictionary
  config.js                     ⬅ SITE CONFIGURATION — the only file you normally edit
```

## Configuration

Everything monetization-related lives in **`assets/config.js`**:

- `clickbankAffiliate` — your ClickBank nickname. The moment it is set, every
  sponsored button on the whole site points to your hoplink automatically
  (currently the Soulmate Sketch offer, tracking id `tfb`).
- `adsenseEnabled` — flip to `true` after adding the domain in your AdSense
  console. `ads.txt` is already in the repo root.

## Deploy

GitHub Pages serves the `main` branch at https://twinflame.bond (custom domain
configured). Any push to `main` deploys automatically.

## License

All rights reserved. Content is offered for reflection and entertainment;
numerology and astrology are symbolic traditions, not sciences.
