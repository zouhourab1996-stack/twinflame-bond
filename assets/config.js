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
    sketch:   { vendor: "tinapsc",    label: "Soulmate Sketch (Tina)",   fallback: "https://www.soulmatesketch.com/", tid: "tfbsketch" },
    twin:     { vendor: "drawmytf",   label: "Draw My Twin Flame",       fallback: "https://drawmytwinflame.com/", tid: "tfbtwin" },
    reading:  { vendor: "smreading",  label: "Soulmate Reading",         fallback: "https://soulmate-reading.com/", tid: "tfbreading" },
    soulsk:   { vendor: "soulmatesk", label: "Soulmate Sketch (original)", fallback: "https://www.soulmatesketch.com/", tid: "tfbsoulsk" },
    numerology: { vendor: "numerology", label: "Numerologist",           fallback: "https://www.numerologist.com/", tid: "tfbnumerology" },
    astro:    { vendor: "astrotv",    label: "Astrology.TV",             fallback: "https://astrology.tv/", tid: "tfbastro" },
    bioenergy:{ vendor: "bienergyco", label: "The BioEnergy Code",       fallback: "https://bioenergycode.com/", tid: "tfbbioenergy" },
    wealth:   { vendor: "wealthdna",  label: "Wealth DNA Code",          fallback: "https://wealthdnacode.com/", tid: "tfbwealth" },
    archetype:{ vendor: "individua1", label: "Individualogist",          fallback: "https://individualogist.com/", tid: "tfbarchetype" },
    manifest: { vendor: "soulmanif",  label: "Soul Manifestation",       fallback: "https://www.soulmanifestation.net/", tid: "tfbmanifest" },
    seraphina: { vendor: "SERAPHTARO", label: "Seraphina Tarot",          fallback: "https://reading.seraphinatarot.co/", tid: "tfbseraphina" },
    mystery:   { vendor: "MYSTERY42",  label: "MysterySchool Code",       fallback: "https://mysteryschoolcode.com/", tid: "tfbmystery" },
    eastern:   { vendor: "ASTROLAN",   label: "Your Astrology Language",  fallback: "https://start.yourastrologylanguage.net/", tid: "tfbeastern" },
    lastwish:  { vendor: "UMAKEBREAD", label: "The Last Wish",            fallback: "https://messageofmanifestation.org/", tid: "tfblastwish" }
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
