/* ==========================================================================
   Twin Flame Bond — engines + shared UI wiring
   Pure client-side. No dependencies. Real numerology & zodiac computation.
   ========================================================================== */

/* ======================= NUMEROLOGY ENGINE ======================= */
const Num = {
  digitSum(n){ return String(n).split('').reduce((a,c)=>a+(+c),0); },
  reduce(n){ while(n>9 && n!==11 && n!==22 && n!==33) n=Num.digitSum(n); return n; },
  lifePath(y,m,d){ return Num.reduce(Num.digitSum(y)+Num.digitSum(m)+Num.digitSum(d)); },
  isMaster(n){ return n===11||n===22||n===33; }
};

/* Life-path triads (classical numerology groupings):
   T1 mind/independence [1,5,7] · T2 builders/practical [2,4,8] · T3 heart/creative [3,6,9]
   Masters are higher octaves: 11→2, 22→4, 33→6 (but carry the master flag). */
const LP = {
  base(n){ return n===11?2 : n===22?4 : n===33?6 : n; },
  triad(n){ const b=LP.base(n); return [1,5,7].includes(b)?1 : [2,4,8].includes(b)?2 : 3; },
  masterCount(a,b){ return (Num.isMaster(a)?1:0)+(Num.isMaster(b)?1:0); },
  score(a,b){
    let s;
    const ta=LP.triad(a), tb=LP.triad(b);
    if(ta===tb) s=8.5; else if((ta===1&&tb===3)||(ta===3&&tb===1)) s=7.5;
    else if((ta===1&&tb===2)||(ta===2&&tb===1)) s=7; else s=7;
    if(a===b) s+=0.5;                                   // mirror numbers
    const mc=LP.masterCount(a,b);
    if(mc===2) s=Math.max(s,9.5); else if(mc===1) s+=0.4;
    return Math.min(10,Math.round(s*10)/10);
  },
  label(a,b){
    if(LP.masterCount(a,b)===2) return "Master-Number Bond";
    if(a===b) return "Mirror Life Paths";
    const ta=LP.triad(a),tb=LP.triad(b);
    if(ta===tb) return ["Independent Minds","Builder Pair","Heart-Creative Pair"][(ta-1)];
    return "Growth Pair";
  },
  story(a,b){
    if(LP.masterCount(a,b)===2) return "Master numbers on both sides is rare territory: 11, 22 and 33 are the \"old soul\" channels of numerology. When two people carry them at once, the connection tends to feel fated, intense and slightly electric — the classic signature people describe when they talk about twin flames.";
    if(a===b) return "Identical life paths create the mirror effect numerologists associate with twin flames: you meet your own energetic reflection. The connection feels instantly familiar — same wavelength, same lessons, same teacher.";
    const ta=LP.triad(a),tb=LP.triad(b);
    if(ta===1&&tb===1) return "Two independent-mind paths (1, 5, 7 energy). You respect each other's space and never run out of conversation — the risk is two people politely orbiting instead of merging.";
    if(ta===2&&tb===2) return "Two builder paths (2, 4, 8 energy). This is the \"let's build something real\" combination — homes, plans, security. Slow to ignite, very hard to break.";
    if(ta===3&&tb===3) return "Two heart-creative paths (3, 6, 9 energy). Emotional, expressive, artistic — this bond lives in feelings and imagination, and teaches both hearts to stay open.";
    if((ta===1&&tb===2)||(ta===2&&tb===1)) return "Independence meets structure. One of you explores, the other builds — friction is possible, but so is a strangely complete partnership where each covers the other's blind spot.";
    if((ta===1&&tb===3)||(ta===3&&tb===1)) return "Spark meets heart. There is a playful, creative charge here: one path pushes forward, the other warms everything up. Passion is rarely the problem; grounding is.";
    return "Structure meets heart — the classic growth pair. One path brings order and plans, the other brings feeling and meaning. Where both stay humble, this combination ages beautifully.";
  }
};

/* Bond number = life path A + life path B, reduced (masters preserved). */
const BOND = {
  of(a,b){ return Num.reduce(a+b); },
  score(n){ return ({1:7,2:9,3:7,4:6,5:6,6:9,7:8,8:7,9:9,11:10,22:9,33:9})[n] || 7; },
  meaning(n){
    return ({
      1:"A pioneering bond. Together you start things — projects, moves, cycles. The lesson: don't compete for the steering wheel; take turns leading.",
      2:"The partnership bond — numerology's true \"two souls, one path\" number. Cooperation, sensitivity, quiet telepathy. Protect the bond from over-giving.",
      3:"A joyful, expressive bond. You make each other laugh and create. The work is depth: keep choosing the real conversation over the fun one.",
      4:"A builder bond. Slow, steady, structural — this is \"let's build a life\" energy. It can feel unromantic on paper and unbreakable in practice.",
      5:"The bond of change. Expect reinvention, travel, sudden turns. It survives only where both people keep choosing each other after every plot twist.",
      6:"The heart bond — love, family, responsibility, beauty. One of the most \"home\" numbers a shared path can carry. Watch caretaking vs. receiving.",
      7:"The spiritual bond. You meet to learn, retreat, and understand — the connection often survives silences and distance. Trust needs words too.",
      8:"The power bond. Ambition, money, manifestation — together you can move mountains, if the mountain isn't the relationship itself.",
      9:"The completion bond. Old souls closing cycles together — forgiveness, service, letting go. Often feels like the \"final teacher\" connection.",
      11:"The twin flame channel itself. 11 is the master intuitive — the two pillars standing as one gate. Synchronicities, mirrored moods, 11:11 on clocks. The most spiritually charged bond number there is.",
      22:"The master builder bond. Your union is meant to build something that outlasts you both — a family, a work, a legacy. Dream at soul scale.",
      33:"The master teacher bond. Compassion at full volume: this path is about healing — each other, and everyone your love touches."
    })[n];
  }
};

/* ======================= ZODIAC ENGINE ======================= */
/* [name, element(fire/earth/air/water), modality(cardinal/fixed/mutable), polarity(yang/yin)] */
const ZODIAC = [
  {n:"Aries",      e:"fire",  m:"cardinal", p:"yang"},
  {n:"Taurus",     e:"earth", m:"fixed",    p:"yin"},
  {n:"Gemini",     e:"air",   m:"mutable",  p:"yang"},
  {n:"Cancer",     e:"water", m:"cardinal", p:"yin"},
  {n:"Leo",        e:"fire",  m:"fixed",    p:"yang"},
  {n:"Virgo",      e:"earth", m:"mutable",  p:"yin"},
  {n:"Libra",      e:"air",   m:"cardinal", p:"yang"},
  {n:"Scorpio",    e:"water", m:"fixed",    p:"yin"},
  {n:"Sagittarius",e:"fire",  m:"mutable",  p:"yang"},
  {n:"Capricorn",  e:"earth", m:"cardinal", p:"yin"},
  {n:"Aquarius",   e:"air",   m:"fixed",    p:"yang"},
  {n:"Pisces",     e:"water", m:"mutable",  p:"yin"}
];
const SIGN_RANGES = [[3,21],[4,20],[5,21],[6,21],[7,23],[8,23],[9,23],[10,23],[11,22],[12,22],[1,20],[2,19]];
const SIGN_DATES = ["Mar 21 – Apr 19","Apr 20 – May 20","May 21 – Jun 20","Jun 21 – Jul 22","Jul 23 – Aug 22","Aug 23 – Sep 22","Sep 23 – Oct 22","Oct 23 – Nov 21","Nov 22 – Dec 21","Dec 22 – Jan 19","Jan 20 – Feb 18","Feb 19 – Mar 20"];

const Zod = {
  idx(m,d){
    for(let i=0;i<12;i++){
      const r=SIGN_RANGES[i], nr=SIGN_RANGES[(i+1)%12];
      // sign i spans [r .. nr) — same-month spans only exist for none here, keep general
      const inSign = (r[0]<nr[0] || (r[0]===12&&nr[0]===1))
        ? ((m===r[0]&&d>=r[1])||(m===nr[0]&&d<nr[1]))
        : (m===r[0]&&d>=r[1]&&d<nr[1]);
      if(inSign) return i;
    }
    return 9; // unreachable: every date is covered
  },
  sign(m,d){ return ZODIAC[Zod.idx(m,d)]; },
  axis(i,j){ return (i+6)%12===j; },
  score(i,j){
    if(i===j) return 8;
    if(Zod.axis(i,j)) return 9;
    const a=ZODIAC[i].e, b=ZODIAC[j].e;
    if(a===b) return 9;
    const pair=[a,b].sort().join("+");
    if(pair==="air+fire"||pair==="earth+water") return 8;
    if(pair==="earth+fire") return 5;
    if(pair==="air+water") return 5;
    if(pair==="fire+water") return 4;
    return 4; // air+earth
  },
  tag(i,j){
    if(i===j) return "Same-sign mirror";
    if(Zod.axis(i,j)) return "Axis pair (opposites)";
    const a=ZODIAC[i].e,b=ZODIAC[j].e,pair=[a,b].sort().join("+");
    if(a===b) return "Same element — instant dialect";
    if(pair==="air+fire") return "Fire + Air — combustion";
    if(pair==="earth+water") return "Earth + Water — fertile";
    if(pair==="earth+fire") return "Fire + Earth — forge";
    if(pair==="air+water") return "Air + Water — mist";
    if(pair==="fire+water") return "Fire + Water — steam";
    return "Air + Earth — dust";
  }
};

/* ======================= OVERALL READING ======================= */
function twinFlameReading(dob1, dob2){
  const [y1,m1,d1]=dob1, [y2,m2,d2]=dob2;
  const lp1=Num.lifePath(y1,m1,d1), lp2=Num.lifePath(y2,m2,d2);
  const s1=Zod.idx(m1,d1), s2=Zod.idx(m2,d2);
  const bond=BOND.of(lp1,lp2);
  const lpScore=LP.score(lp1,lp2), zScore=Zod.score(s1,s2), bScore=BOND.score(bond);
  const total=Math.round(lpScore*4+zScore*3.5+bScore*2.5); // weighted /100
  let tier,text;
  if(total>=88){ tier="Mirror-Grade Bond";
    text="This pairing lands in the rarest band of the index. Mirror life-path energy, an elemental rhythm that understands itself, and a bond number that behaves like a key in a lock — numerologically, this is the territory twin flame stories are written about. Intensity is guaranteed; the only homework is surviving your own depth."; }
  else if(total>=72){ tier="Strong Twin Flame Signature";
    text="A strong signature. There is real mirrored energy here — enough recognition to feel like fate and enough friction to make sure you both grow. Connections in this band tend to arrive with lessons attached: read the breakdown below honestly, because the same intensity that pulls you together will surface whatever each of you still carries."; }
  else if(total>=55){ tier="Growth Bond — the Karmic Teacher";
    text="In classical language this reads closer to a karmic bond than a twin flame: a teacher connection that arrives loaded with lessons, not mirrors. That is not a downgrade — karmic bonds do the deep repair work twin flames often skip. It asks for more translation, more patience, and clearer words."; }
  else { tier="Catalyst Connection";
    text="Numerologically these two paths run on different rails. That does not mean \"no\" — it means this connection works as a catalyst: short, bright, and educational rather than mirrored and enduring. Take the lesson, keep what opens, and don't force a lock that isn't yours to open."; }
  return {lp1,lp2,lpScore,s1,s2,zScore,bond,bScore,total,tier,text};
}

/* ======================= SHARED UI WIRING ======================= */
(function(){
  /* config reader — works with var-declared global or window property */
  function CFG(){ return (typeof SITE_CONFIG!=="undefined" && SITE_CONFIG) || window.SITE_CONFIG || null; }
  /* offer links — one hoplink per product, switched by data-offer */
  function offerUrl(offerName){
    const c=CFG(); if(!c) return "#";
    const o=(c.offers&&(c.offers[offerName]||c.offers.sketch))||null;
    if(!o) return "#";
    if(c.clickbankAffiliate){
      return "https://hop.clickbank.net/?affiliate="+encodeURIComponent(c.clickbankAffiliate)
           + "&vendor="+encodeURIComponent(o.vendor)+"&tid="+encodeURIComponent(c.clickbankTid);
    }
    return o.fallback||"#";
  }
  function wireOffers(){
    document.querySelectorAll("a.offer-cta").forEach(a=>{
      a.href=offerUrl(a.dataset.offer||"sketch"); a.target="_blank"; a.rel="sponsored nofollow noopener";
    });
  }
  /* AdSense loader (only when enabled in config) */
  function adsense(){
    const c=CFG(); if(!c||!c.adsenseEnabled) return;
    const s=document.createElement("script");
    s.async=true; s.crossOrigin="anonymous";
    s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+c.adsenseClient;
    document.head.appendChild(s);
  }
  /* toast helper */
  window.tfToast=function(msg){
    let t=document.getElementById("toast");
    if(!t){ t=document.createElement("div"); t.id="toast"; document.body.appendChild(t); }
    t.textContent=msg; t.classList.add("show");
    setTimeout(()=>t.classList.remove("show"),1800);
  };
  /* copy buttons with data-copy-text or data-copy-target */
  function wireCopy(){
    document.querySelectorAll("[data-copy-text]").forEach(b=>{
      b.addEventListener("click",()=>{
        const txt=b.getAttribute("data-copy-text");
        const done=()=>tfToast("Copied ✓");
        if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done); }
        else{ const ta=document.createElement("textarea"); ta.value=txt; document.body.appendChild(ta); ta.select();
          try{document.execCommand("copy"); done();}catch(e){} document.body.removeChild(ta); }
      });
    });
  }
  /* scroll reveal */
  function reveal(){
    if(!("IntersectionObserver" in window)){ document.querySelectorAll(".reveal").forEach(e=>e.classList.add("in")); return; }
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }),{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }
  function year(){ document.querySelectorAll(".yr").forEach(e=>e.textContent=new Date().getFullYear()); }
  /* Google Analytics (GA4) — loaded only when gaMeasurementId is set */
  function ga(){
    const c=CFG(); if(!c||!c.gaMeasurementId) return;
    const s=document.createElement("script");
    s.async=true; s.src="https://www.googletagmanager.com/gtag/js?id="+c.gaMeasurementId;
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){ dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", c.gaMeasurementId);
  }
  document.addEventListener("DOMContentLoaded",()=>{ wireOffers(); adsense(); ga(); wireCopy(); reveal(); year(); });
})();
