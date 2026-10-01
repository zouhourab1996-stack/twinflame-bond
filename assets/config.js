/* ==========================================================================
   TWIN FLAME BOND — SITE CONFIGURATION
   The ONLY file you ever need to edit. Change a value, commit, done.
   ========================================================================== */

var SITE_CONFIG = {

  /* ---- MONETIZATION -----------------------------------------------------
     clickbankAffiliate = your ClickBank account nickname.
     Offers are switched by data-offer="sketch|twin|reading|manifest" on
     each a.offer-cta button (default: sketch). Every button site-wide is
     rewritten to the matching hoplink with the tracking id below.
  ----------------------------------------------------------------------- */
  clickbankAffiliate: "heditouati",  // ClickBank nickname — all offer buttons use this hoplink
  clickbankTid:       "tfb",         // tracking id shown in ClickBank reports
  offers: {
    sketch:   { vendor: "tinapsc",    label: "Soulmate Sketch (Tina)",   fallback: "https://www.soulmatesketch.com/" },
    twin:     { vendor: "drawmytf",   label: "Draw My Twin Flame",       fallback: "https://drawmytwinflame.com/" },
    reading:  { vendor: "smreading",  label: "Soulmate Reading",         fallback: "https://soulmate-reading.com/" },
    soulsk:   { vendor: "soulmatesk", label: "Soulmate Sketch (original)", fallback: "https://www.soulmatesketch.com/" },
    numerology: { vendor: "numerology", label: "Numerologist",           fallback: "https://www.numerologist.com/" },
    astro:    { vendor: "astrotv",    label: "Astrology.TV",             fallback: "https://astrology.tv/" },
    bioenergy:{ vendor: "bienergyco", label: "The BioEnergy Code",       fallback: "https://bioenergycode.com/" },
    wealth:   { vendor: "wealthdna",  label: "Wealth DNA Code",          fallback: "https://wealthdnacode.com/" },
    archetype:{ vendor: "individua1", label: "Individualogist",          fallback: "https://individualogist.com/" },
    manifest: { vendor: "soulmanif",  label: "Soul Manifestation",       fallback: "https://www.soulmanifestation.net/" }
  },

  /* ---- GOOGLE ANALYTICS (GA4) ---------------------------------------------
     Loaded automatically on every page. Ads stay off until enabled below.
  -------------------------------------------------------------------------- */
  gaMeasurementId: "G-1W7PC1JDKH",

  /* ---- ADSENSE ----------------------------------------------------------
     Flip to true AFTER adding twinflame.bond in your AdSense console
     (Account → Sites → Add site). ads.txt is already in the repo root.
  ----------------------------------------------------------------------- */
  adsenseEnabled: false,
  adsenseClient:  "ca-pub-3898992716389443",

  /* ---- SITE ------------------------------------------------------------ */
  siteName:  "Twin Flame Bond",
  siteUrl:   "https://twinflame.bond",
  contactEmail: "anistouati74@gmail.com"
};
