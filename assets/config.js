/* ==========================================================================
   TWIN FLAME BOND — SITE CONFIGURATION
   The ONLY file you ever need to edit. Change a value, commit, done.
   ========================================================================== */

var SITE_CONFIG = {

  /* ---- MONETIZATION -----------------------------------------------------
     clickbankAffiliate = your ClickBank account nickname.
     As soon as it is set, EVERY "Soulmate Sketch" button on the whole site
     points to your hoplink automatically (with tracking id "tfb").
     Leave empty ("") and buttons fall back to the product's public page
     (no commission) until you fill it in.
  ----------------------------------------------------------------------- */
  clickbankAffiliate: "heditouati",  // ClickBank nickname — all offer buttons use this hoplink
  clickbankVendor:    "tinapsc",     // Soulmate Sketch by Tina (top ClickBank offer)
  clickbankTid:       "tfb",         // tracking id shown in ClickBank reports
  clickbankFallback:  "https://www.soulmatesketch.com/",  // used while affiliate is empty

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
