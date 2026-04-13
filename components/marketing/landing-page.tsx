"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const IMGS = {
  hero: "https://roopveda.co.in/Images/index-main-girl.png",
  cmp1: "/Images/camparison1.png",
  cmp2: "/Images/camparison2.png",
  cmp3: "/Images/camparison3.png"
};

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  // { label: "About", href: "#about" }
];

const BENEFITS = [
  {
    icon: "⏳",
    title: "Natural Anti-Aging",
    desc: "Slow down the clock naturally by toning facial muscles, smoothing out wrinkles, and enhancing your skin's elasticity without any injections."
  },
  {
    icon: "🩸",
    title: "Glowing Complexion",
    desc: "Targeted exercises drastically increase blood flow to the surface of the skin, nourishing cells and giving you a permanent, healthy glow."
  },
  {
    icon: "🧘‍♀️",
    title: "Release Facial Tension",
    desc: "Stop jaw clenching and squinting. Our mindful routines reduce stress-induced wrinkles and help relieve tension headaches."
  },
  {
    icon: "✨",
    title: "Sculpt & Define",
    desc: "Regular practice helps lift sagging cheeks, eliminate double chins, and sharpen your jawline without the need for contouring makeup."
  }
];

const COMPARISONS = [
  { img: IMGS.cmp1, label: "Visibly Lifted Eyelids & Brow" },
  { img: IMGS.cmp2, label: "Clearer, Brighter Complexion" },
  { img: IMGS.cmp3, label: "Smoothed Fine Lines & Wrinkles" }
];

const REVIEWS = [
  {
    title: "Refreshing and Effective",
    text: "I've been practicing Face Yoga for a couple of months, and my skin looks firmer with reduced fine lines. The routines are so easy to follow. It's now the best part of my morning!",
    name: "Meera K.",
    loc: "Mumbai, India"
  },
  {
    title: "Quick Results, Happy User",
    text: "After only three weeks, my skin feels completely rejuvenated and much tighter. It fits perfectly into my busy schedule. I can't imagine my day without it now.",
    name: "Sarah T.",
    loc: "London, UK"
  },
  {
    title: "A Natural Confidence Booster",
    text: "Face Yoga has not only improved my skin's appearance but also boosted my confidence. The personalized program is incredibly convenient and genuinely enjoyable.",
    name: "Anita R.",
    loc: "Toronto, Canada"
  },
  {
    title: "Game Changer for Elasticity",
    text: "Since I started practicing, I've noticed a massive improvement in my skin's elasticity and tone. It's literally like a natural facelift without the hefty price tag!",
    name: "Chloe D.",
    loc: "Sydney, Australia"
  },
  {
    title: "Incredible Jawline Definition",
    text: "My jawline is sharper than ever. I didn't realize how much stress I was holding in my face. Now I'm feeling more relaxed, and I look less tired all the time.",
    name: "Priya M.",
    loc: "New Delhi, India"
  },
  {
    title: "From Skeptic to Believer",
    text: "Deep forehead lines, be gone. My skin feels so much smoother and looks years younger. I honestly never thought I could achieve such results without Botox.",
    name: "Jessica L.",
    loc: "New York, USA"
  }
];

const PKG_ITEMS = [
  "Customized daily facial workout plan",
  "Premium library of anti-aging face yoga exercises",
  "Expert diet guidelines for clear, glowing skin",
  "Ayurvedic secrets for natural skin rejuvenation",
  "Daily hydration & water intake tracker",
  "Beginner-friendly, step-by-step video tutorials",
  "24/7 Priority Customer Support"
];

const PLANS = [
  {
    badge: "Starter Kit",
    name: "1-Week Plan",
    bonus: "Free Skincare Diet Guide",
    orig: "Rs. 299",
    price: "Rs. 199",
    per: "Rs. 28 per Day",
    featured: false,
    topColor: "#ff6b9d"
  },
  {
    badge: "Most Loved",
    name: "4-Week Plan",
    bonus: "Free Skincare Diet Guide",
    orig: "Rs. 799",
    price: "Rs. 399",
    per: "Rs. 14 per Day",
    featured: true,
    topColor: "#e91e8c"
  },
  {
    badge: "Transformation!",
    name: "12-Week Plan",
    bonus: "Free Skincare Diet Guide",
    orig: "Rs. 2,399",
    price: "Rs. 599",
    per: "Rs. 7 per Day",
    featured: false,
    topColor: "#c4177a"
  }
];

const FAQS = [
  {
    q: "How quickly will I see results?",
    a: "Most of our users feel a difference in skin tightness and relaxation within the very first week. Visible changes, like a sharper jawline or smoothed fine lines, typically start to appear after 3 to 4 weeks of consistent, daily practice."
  },
  {
    q: "How much time do I need to practice each day?",
    a: "You only need 10 to 15 minutes a day. Our facial exercises are specifically designed to be highly effective without taking up your whole morning."
  },
  {
    q: "Do I need any expensive tools, rollers, or creams?",
    a: "No special equipment is required at all. You just need your hands and a mirror. We do recommend applying a few drops of your favorite facial oil or moisturizer before starting."
  },
  {
    q: "Is Face Yoga safe for mature skin or deep wrinkles?",
    a: "Absolutely. Roop Veda's Face Yoga is a gentle, natural approach suitable for all ages and skin types."
  },
  {
    q: "I've had Botox or fillers before. Can I still do Face Yoga?",
    a: "Yes. However, we recommend consulting with your dermatologist or doctor first, and avoiding exercises directly on freshly injected areas."
  }
];

const FOOTER_LINKS = [
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Contact Us", href: "/contact" },
  { label: "About", href: "/about" }
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
.rv-home, .rv-home * { box-sizing:border-box; }
.rv-home { --pink:#e91e8c; --pink-dark:#c4177a; --pink-light:#ff6b9d; --pink-pale:#fce4ec; --pink-border:#f8b4d4; --text-h:#2d1b35; --text-b:#5a4a6a; --text-m:#9a8aaa; --bg:#ffffff; --bg-alt:#fdf6fa; --bg-pink:#fce4ec; --gold:#f59e0b; --green:#10b981; --shadow-pink:rgba(233,30,140,0.18); font-family:'Poppins','Segoe UI',sans-serif; background:var(--bg); color:var(--text-h); line-height:1.6; -webkit-font-smoothing:antialiased; }
.rv-home a { text-decoration:none; color:inherit; }
.rv-home img { max-width:100%; display:block; }
.rv-home .nav { position:sticky; top:0; z-index:1000; background:rgba(255,255,255,0.97); backdrop-filter:blur(20px); border-bottom:1px solid var(--pink-border); padding:0 48px; min-height:70px; display:flex; align-items:center; justify-content:space-between; }
.rv-home .nav-logo { font-size:1.15rem; font-weight:700; color:var(--pink); white-space:nowrap; letter-spacing:-0.01em; }
.rv-home .nav-links { display:flex; gap:32px; }
.rv-home .nav-links a { font-size:0.875rem; font-weight:500; color:var(--text-b); position:relative; padding-bottom:3px; transition:color 0.2s; }
.rv-home .nav-links a:hover { color:var(--pink); }
.rv-home .nav-links a::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--pink); border-radius:2px; transform:scaleX(0); transition:transform 0.2s; transform-origin:left; }
.rv-home .nav-links a:hover::after { transform:scaleX(1); }
.rv-home .nav-right { display:flex; align-items:center; gap:10px; }
.rv-home .nav-login { font-size:0.85rem; font-weight:600; color:var(--pink); border:1.5px solid var(--pink); padding:7px 22px; border-radius:50px; background:none; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.rv-home .nav-login:hover { background:var(--pink); color:#fff; }
.rv-home .nav-icon-btn { width:38px; height:38px; border-radius:50%; border:1.5px solid var(--pink-border); background:none; cursor:pointer; font-size:0.76rem; display:flex; align-items:center; justify-content:center; transition:border-color 0.2s; }
.rv-home .nav-icon-btn:hover { border-color:var(--pink); }
.rv-home .hamburger { display:none; background:none; border:none; cursor:pointer; font-size:1rem; color:var(--text-h); line-height:1; }
.rv-home .mmenu { position:fixed; top:70px; inset-inline:0; bottom:0; z-index:999; background:#fff; padding:24px 32px; display:flex; flex-direction:column; transform:translateX(-100%); transition:transform 0.28s ease; border-top:1px solid var(--pink-border); }
.rv-home .mmenu.open { transform:translateX(0); }
.rv-home .mmenu a { font-size:1rem; font-weight:500; color:var(--text-b); padding:15px 0; border-bottom:1px solid var(--pink-pale); }
.rv-home .btn-pink { display:inline-block; background:var(--pink); color:#fff; font-size:0.95rem; font-weight:700; padding:15px 36px; border-radius:50px; border:none; cursor:pointer; letter-spacing:0.02em; box-shadow:0 6px 28px var(--shadow-pink); transition:all 0.25s; }
.rv-home .btn-pink:hover { background:var(--pink-dark); transform:translateY(-2px); box-shadow:0 10px 36px rgba(233,30,140,0.38); }
.rv-home .btn-outline { display:inline-block; background:transparent; color:var(--pink); font-size:0.95rem; font-weight:700; padding:14px 36px; border-radius:50px; border:2px solid var(--pink); transition:all 0.25s; }
.rv-home .btn-outline:hover { background:var(--pink); color:#fff; transform:translateY(-2px); }
.rv-home .hero { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; max-width:1200px; margin:0 auto; padding:80px 48px; }
.rv-home .hero-eyebrow, .rv-home .sec-eyebrow { display:inline-block; font-size:0.72rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--pink); background:var(--pink-pale); padding:6px 16px; border-radius:50px; border:1px solid var(--pink-border); }
.rv-home .hero h1 { font-size:clamp(2rem,3.2vw,3rem); font-weight:800; line-height:1.18; color:var(--text-h); margin:20px 0; letter-spacing:-0.025em; }
.rv-home .hero h1 em { font-style:normal; color:var(--pink); }
.rv-home .hero p { font-size:1.02rem; color:var(--text-b); line-height:1.8; margin-bottom:32px; }
.rv-home .hero-img { border-radius:28px; overflow:hidden; box-shadow:0 32px 80px rgba(233,30,140,0.2), 0 8px 24px rgba(0,0,0,0.06); }
.rv-home .hero-stats { display:flex; gap:36px; margin-top:32px; }
.rv-home .stat-num { font-size:1.6rem; font-weight:800; color:var(--pink); line-height:1; }
.rv-home .stat-lbl { font-size:0.7rem; font-weight:600; color:var(--text-m); text-transform:uppercase; letter-spacing:0.08em; margin-top:2px; }
.rv-home .sec { padding:80px 48px; }
.rv-home .sec-alt { background:var(--bg-alt); }
.rv-home .sec-pink-bg { background:var(--bg-pink); }
.rv-home .inner { max-width:1200px; margin:0 auto; }
.rv-home .sec-head { text-align:center; margin-bottom:56px; }
.rv-home .sec-head h2 { font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800; color:var(--text-h); margin:14px 0; letter-spacing:-0.025em; }
.rv-home .sec-head p { font-size:1rem; color:var(--text-b); max-width:560px; margin:0 auto; line-height:1.78; }
.rv-home .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
.rv-home .about-text h2 { font-size:clamp(1.6rem,2.4vw,2.2rem); font-weight:800; color:var(--text-h); margin:14px 0 18px; letter-spacing:-0.02em; }
.rv-home .about-text p { font-size:1rem; color:var(--text-b); line-height:1.8; margin-bottom:28px; }
.rv-home .benefits-2x2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.rv-home .benefits-4col { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
.rv-home .bcard, .rv-home .rcard, .rv-home .cmp-card, .rv-home .faq-item, .rv-home .pkg-box, .rv-home .extra-card, .rv-home .plan-card { background:#fff; border:1px solid var(--pink-border); border-radius:20px; }
.rv-home .bcard { padding:22px 18px; transition:transform 0.22s, box-shadow 0.22s; }
.rv-home .bcard:hover, .rv-home .rcard:hover { transform:translateY(-4px); box-shadow:0 12px 36px var(--shadow-pink); }
.rv-home .bcard-icon { font-size:1.7rem; margin-bottom:10px; }
.rv-home .bcard h3 { font-size:0.95rem; font-weight:700; color:var(--text-h); margin-bottom:7px; }
.rv-home .bcard p { font-size:0.83rem; color:var(--text-b); line-height:1.65; }
.rv-home .cmp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:start; }
.rv-home .cmp-card { overflow:hidden; padding:20px; background:linear-gradient(180deg, #fff 0%, #fdf6fa 100%); box-shadow:0 10px 32px rgba(233,30,140,0.08); }
.rv-home .cmp-ba-labels { display:flex; justify-content:space-between; padding:0 2px 12px; font-size:0.68rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--pink); }
.rv-home .cmp-wrap { overflow:hidden; border-radius:16px; background:#fff; border:1px solid var(--pink-border); }
.rv-home .cmp-wrap img { display:block; width:100%; height:auto; aspect-ratio:auto; }
.rv-home .cmp-label { padding:15px 4px 0; text-align:center; font-size:0.88rem; font-weight:600; color:var(--text-b); }
.rv-home .reviews-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.rv-home .rcard { padding:28px 24px; transition:transform 0.22s, box-shadow 0.22s; }
.rv-home .stars { color:var(--gold); font-size:0.95rem; letter-spacing:2px; margin-bottom:10px; }
.rv-home .r-title { font-size:1rem; font-weight:700; color:var(--text-h); margin-bottom:10px; }
.rv-home .r-text { font-size:0.875rem; color:var(--text-b); line-height:1.72; margin-bottom:16px; font-style:italic; }
.rv-home .r-author { font-size:0.8rem; font-weight:700; color:var(--pink); }
.rv-home .r-loc { font-weight:400; color:var(--text-m); }
.rv-home .pkg-box { padding:40px 48px; margin-bottom:48px; }
.rv-home .pkg-box-title { font-size:1.25rem; font-weight:700; color:var(--text-h); margin-bottom:24px; text-align:center; }
.rv-home .pkg-list { list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:14px 56px; }
.rv-home .pkg-item { display:flex; align-items:center; gap:12px; font-size:0.92rem; font-weight:500; color:var(--text-b); }
.rv-home .pkg-check { width:22px; height:22px; border-radius:50%; flex-shrink:0; background:var(--green); display:flex; align-items:center; justify-content:center; }
.rv-home .pkg-check svg { width:12px; height:12px; stroke:#fff; stroke-width:2.5; fill:none; }
.rv-home .plans-row { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; margin-bottom:48px; }
.rv-home .plan-card { overflow:hidden; display:flex; flex-direction:column; transition:transform 0.25s, box-shadow 0.25s; position:relative; }
.rv-home .plan-card:hover { transform:translateY(-6px); box-shadow:0 20px 56px rgba(233,30,140,0.16); }
.rv-home .plan-top { padding:20px 24px 18px; display:flex; align-items:center; justify-content:space-between; }
.rv-home .plan-badge-pill { font-size:0.72rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#fff; background:rgba(255,255,255,0.25); padding:5px 14px; border-radius:50px; border:1px solid rgba(255,255,255,0.45); }
.rv-home .plan-body { padding:28px 28px 32px; flex:1; display:flex; flex-direction:column; }
.rv-home .plan-name { font-size:1.35rem; font-weight:800; color:var(--text-h); margin-bottom:6px; }
.rv-home .plan-bonus { font-size:0.82rem; color:var(--text-m); margin-bottom:24px; font-style:italic; }
.rv-home .plan-divider { border:none; border-top:1px solid var(--pink-border); margin-bottom:24px; }
.rv-home .plan-orig { font-size:0.95rem; color:var(--text-m); font-weight:500; text-decoration:line-through; margin-bottom:4px; }
.rv-home .plan-price { font-size:3rem; font-weight:900; color:var(--pink); line-height:1; margin-bottom:6px; letter-spacing:-0.02em; }
.rv-home .plan-per { font-size:0.8rem; font-weight:600; color:var(--text-m); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:28px; }
.rv-home .plan-cta { margin-top:auto; display:block; text-align:center; background:var(--pink); color:#fff; font-size:0.9rem; font-weight:700; padding:13px 24px; border-radius:50px; transition:all 0.22s; box-shadow:0 4px 18px var(--shadow-pink); letter-spacing:0.02em; }
.rv-home .plan-cta:hover { background:var(--pink-dark); box-shadow:0 8px 28px rgba(233,30,140,0.4); }
.rv-home .plan-card.featured { border-color:var(--pink); border-width:2px; box-shadow:0 12px 48px rgba(233,30,140,0.22); transform:scale(1.04); z-index:2; }
.rv-home .plan-card.featured:hover { transform:scale(1.04) translateY(-6px); }
.rv-home .plan-card.featured .plan-name { font-size:1.5rem; }
.rv-home .plan-card.featured .plan-price { font-size:3.5rem; }
.rv-home .plan-card.featured .plan-cta { background:linear-gradient(135deg, var(--pink-light) 0%, var(--pink) 50%, var(--pink-dark) 100%); box-shadow:0 6px 24px rgba(233,30,140,0.45); padding:15px 24px; font-size:0.95rem; }
.rv-home .most-loved-ribbon { position:absolute; top:16px; right:-28px; background:var(--gold); color:#fff; font-size:0.62rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; padding:5px 36px; transform:rotate(45deg); box-shadow:0 2px 8px rgba(0,0,0,0.15); }
.rv-home .faq-wrap { max-width:760px; margin:0 auto; }
.rv-home .faq-item { margin-bottom:12px; overflow:hidden; transition:box-shadow 0.2s, border-color 0.2s; }
.rv-home .faq-item.open { border-color:var(--pink); box-shadow:0 4px 24px rgba(233,30,140,0.1); }
.rv-home .faq-q { width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; font-size:0.95rem; font-weight:600; color:var(--text-h); font-family:inherit; }
.rv-home .faq-icon { width:30px; height:30px; border-radius:50%; flex-shrink:0; background:var(--pink-pale); border:1px solid var(--pink-border); color:var(--pink); font-size:1.1rem; line-height:1; display:flex; align-items:center; justify-content:center; transition:transform 0.25s, background 0.25s, color 0.25s; }
.rv-home .faq-item.open .faq-icon { transform:rotate(45deg); background:var(--pink); color:#fff; border-color:var(--pink); }
.rv-home .faq-a { border-top:1px solid var(--pink-pale); padding:16px 24px 20px; font-size:0.9rem; color:var(--text-b); line-height:1.78; }
.rv-home .extras-grid { display:grid; grid-template-columns:1.1fr 0.9fr; gap:24px; }
.rv-home .extra-card { padding:28px; }
.rv-home .extra-card h3 { font-size:1.2rem; font-weight:700; margin-bottom:12px; color:var(--text-h); }
.rv-home .extra-card p { font-size:0.92rem; color:var(--text-b); line-height:1.8; }
.rv-home .extra-links { list-style:none; display:grid; gap:12px; }
.rv-home .extra-links a { color:var(--pink); font-weight:600; }
.rv-home .footer { background:var(--bg-pink); border-top:1px solid var(--pink-border); padding:64px 48px 32px; }
.rv-home .footer-grid { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1.6fr 1fr; gap:64px; padding-bottom:40px; border-bottom:1px solid var(--pink-border); margin-bottom:28px; }
.rv-home .footer-logo { font-size:1.15rem; font-weight:700; color:var(--pink); margin-bottom:14px; }
.rv-home .footer-brand p { font-size:0.88rem; color:var(--text-b); line-height:1.78; max-width:360px; }
.rv-home .footer-links h4 { font-size:0.78rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--text-h); margin-bottom:16px; }
.rv-home .footer-links ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
.rv-home .footer-links a { font-size:0.88rem; color:var(--text-b); transition:color 0.2s; }
.rv-home .footer-links a:hover { color:var(--pink); }
.rv-home .footer-bottom { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; }
.rv-home .footer-copy { font-size:0.82rem; color:var(--text-m); }
.rv-home .footer-ssl { font-size:0.82rem; color:var(--text-m); background:#fff; border:1px solid var(--pink-border); border-radius:50px; padding:5px 16px; }
.rv-home.dark { --bg:#13060e; --bg-alt:#190c13; --bg-pink:#200e18; --pink-pale:#2e1224; --pink-border:#5a1e42; --text-h:#f5dff0; --text-b:#b890aa; --text-m:#7a5a70; }
.rv-home.dark .nav, .rv-home.dark .mmenu { background:rgba(14,5,11,0.97); }
.rv-home.dark .footer { background:#100610; }
.rv-home.dark .footer-ssl { background:#1d0c18; }
@media (max-width:1024px) { .rv-home .benefits-4col { grid-template-columns:1fr 1fr; } .rv-home .pkg-list { grid-template-columns:1fr; } .rv-home .plan-card.featured { transform:scale(1.02); } }
@media (max-width:900px) { .rv-home .nav { padding:0 20px; } .rv-home .nav-links { display:none; } .rv-home .hamburger { display:block; } .rv-home .sec { padding:60px 20px; } .rv-home .hero { grid-template-columns:1fr; gap:36px; padding:48px 20px; } .rv-home .hero-img { order:-1; max-width:480px; margin:0 auto; } .rv-home .about-grid, .rv-home .extras-grid { grid-template-columns:1fr; gap:40px; } .rv-home .cmp-grid { grid-template-columns:1fr; max-width:380px; margin:0 auto; } .rv-home .reviews-grid { grid-template-columns:1fr 1fr; } .rv-home .plans-row { grid-template-columns:1fr; max-width:380px; margin:0 auto 48px; } .rv-home .plan-card.featured { transform:none; } .rv-home .plan-card.featured:hover { transform:translateY(-6px); } .rv-home .pkg-box { padding:28px 20px; } .rv-home .footer { padding:48px 20px 28px; } .rv-home .footer-grid { grid-template-columns:1fr; gap:36px; } .rv-home .footer-bottom { flex-direction:column; align-items:flex-start; } }
@media (max-width:600px) { .rv-home .benefits-2x2, .rv-home .benefits-4col, .rv-home .reviews-grid { grid-template-columns:1fr; } .rv-home .hero h1 { font-size:1.85rem; } .rv-home .hero-stats { gap:20px; } .rv-home .plan-price { font-size:2.5rem; } .rv-home .plan-card.featured .plan-price { font-size:2.8rem; } }
`;

function ComparisonCard({ img, label }: { img: string; label: string }) {
  return (
    <div className="cmp-card">
      <div className="cmp-ba-labels"><span>Before</span><span>After</span></div>
      <div className="cmp-wrap">
        <img src={img} alt={`Before and after face yoga result for ${label}`} />
      </div>
      <div className="cmp-label">{label}</div>
    </div>
  );
}

function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <div className={`plan-card${plan.featured ? " featured" : ""}`}>
      {plan.featured ? <div className="most-loved-ribbon">Most Loved</div> : null}
      <div
        className="plan-top"
        style={{
          background: plan.featured
            ? `linear-gradient(135deg, ${plan.topColor} 0%, #e91e8c 100%)`
            : `linear-gradient(135deg, ${plan.topColor}cc 0%, ${plan.topColor} 100%)`,
          minHeight: plan.featured ? 72 : 64
        }}
      >
        <span className="plan-badge-pill">{plan.badge}</span>
      </div>
      <div className="plan-body">
        <div className="plan-name">{plan.name}</div>
        <div className="plan-bonus">Star {plan.bonus}</div>
        <hr className="plan-divider" />
        <div className="plan-orig">{plan.orig}</div>
        <div className="plan-price">{plan.price}</div>
        <div className="plan-per">{plan.per}</div>
        <Link href="/quiz" className="plan-cta">Get Started</Link>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.background = dark ? "#13060e" : "#ffffff";
    return () => {
      document.body.style.background = "";
    };
  }, [dark]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={`rv-home${dark ? " dark" : ""}`}>
        <nav className="nav">
          <a href="#" className="nav-logo">Roop Veda&apos;s Face Yoga</a>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="nav-right">
            {/* <Link href="/login" className="nav-login">Login</Link> */}
            {/* <button className="nav-icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
              {dark ? "Sun" : "Moon"}
            </button> */}
            <button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Menu">
              {menu ? "X" : "Menu"}
            </button>
          </div>
        </nav>

        <div className={`mmenu${menu ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenu(false)}>{link.label}</a>
          ))}
          <Link href="/about" onClick={() => setMenu(false)}>About Page</Link>
          <Link href="/contact" onClick={() => setMenu(false)}>Contact Us</Link>
          <Link href="/login" onClick={() => setMenu(false)}>Login</Link>
        </div>

        <section>
          <div className="hero">
            <div>
              <span className="hero-eyebrow">Your Natural Skincare Journey</span>
              <h1>Look Years Younger <em>Naturally</em> with Roop Veda&apos;s Face Yoga</h1>
              <p>
                Unlock your skin&apos;s true potential. Our personalized face yoga routines help you reduce wrinkles, tone your jawline, and achieve a radiant glow all naturally, in just minutes a day.
              </p>
              <Link href="/quiz" className="btn-pink">Take a Free Quiz</Link>
              {/* <div className="hero-stats">
                <div><div className="stat-num">10K+</div><div className="stat-lbl">Happy Users</div></div>
                <div><div className="stat-num">57</div><div className="stat-lbl">Face Muscles</div></div>
                <div><div className="stat-num">15 min</div><div className="stat-lbl">Per Day</div></div>
              </div> */}
            </div>
            <div className="hero-img">
              <img src={IMGS.hero} alt="Woman practicing natural Face Yoga" />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="sec sec-alt">
          <div className="inner">
            <div className="pkg-box" style={{ textAlign: "center" }}>
              <h2 className="pkg-box-title">Your Personalized Routine: The 100% Natural Alternative</h2>
              <p style={{ maxWidth: 800, margin: "0 auto 30px" }}>
                Skip the expensive creams and invasive procedures! Roop Veda&apos;s Face Yoga offers a safe, natural way to lift and firm your skin. By exercising the 57 muscles in your face and neck, you can reverse signs of aging, boost collagen, and sculpt your features in just 10-15 minutes a day from the comfort of your home.
              </p>
              <Link href="/quiz" className="btn-pink">Take a Free Quiz</Link>
            </div>
          </div>
        </section>

        <section id="results" className="sec">
          <div className="inner">
            <div className="sec-head">
              <span className="sec-eyebrow">Real Transformations</span>
              <h2>Real Women, Real Transformations</h2>
              <p>Discover the power of facial exercises with real-life success stories. Watch your skin improve week after week.</p>
            </div>
            <div className="cmp-grid">
              {COMPARISONS.map((comparison) => (
                <ComparisonCard key={comparison.label} img={comparison.img} label={comparison.label} />
              ))}
            </div>
          </div>
        </section>

        <section className="sec sec-pink-bg">
          <div className="inner">
            <div className="sec-head">
              <span className="sec-eyebrow">Benefits</span>
              <h2>How Face Yoga Transforms You</h2>
            </div>
            <div className="benefits-4col">
              {BENEFITS.map((benefit) => (
                <div className="bcard" key={`${benefit.title}-grid`}>
                  <div className="bcard-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="sec sec-alt">
          <div className="inner">
            <div className="sec-head">
              <span className="sec-eyebrow">Testimonials</span>
              <h2>Loved by Users Worldwide</h2>
              <p>Real stories from women who transformed their skin naturally.</p>
            </div>
            <div className="reviews-grid">
              {REVIEWS.map((review) => (
                <div className="rcard" key={`${review.name}-${review.title}`}>
                  <div className="stars">★★★★★</div>
                  <div className="r-title">{review.title}</div>
                  <p className="r-text">&ldquo;{review.text}&rdquo;</p>
                  <div className="r-author">{review.name} <span className="r-loc">from {review.loc}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="sec">
          <div className="inner">
            <div className="sec-head">
              <span className="sec-eyebrow">Pricing</span>
              <h2>Unlock Your Natural Glow</h2>
              <p>Choose the perfect plan to begin your customized face yoga journey.</p>
            </div>

            <div className="pkg-box">
              <p className="pkg-box-title">Your Personalized Package Includes:</p>
              <ul className="pkg-list">
                {PKG_ITEMS.map((item) => (
                  <li className="pkg-item" key={item}>
                    <span className="pkg-check">
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="plans-row">
              {PLANS.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/quiz" className="btn-pink">Take a Free Quiz</Link>
            </div>
          </div>
        </section>

        <section id="faq" className="sec sec-alt">
          <div className="inner">
            <div className="sec-head">
              <span className="sec-eyebrow">FAQ</span>
              <h2>Important Questions Answered</h2>
              <p>Everything you need to know before starting your face yoga journey.</p>
            </div>
            <div className="faq-wrap">
              {FAQS.map((faq, index) => (
                <div className={`faq-item${openFaq === index ? " open" : ""}`} key={faq.q}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <span>{faq.q}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  {openFaq === index ? <div className="faq-a">{faq.a}</div> : null}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "44px", textAlign: "center" }}>
              <Link href="/quiz" className="btn-pink">Take a Free Quiz</Link>
            </div>
          </div>
        </section>

        {/* <section id="about" className="sec">
          <div className="inner">
            <div className="sec-head">
              <span className="sec-eyebrow">More From Roop Veda</span>
              <h2>Keep The Earlier Additional Sections Connected</h2>
              <p>
                This new homepage follows the visual style you shared, while still linking users into the existing support, about and legal content already in the project.
              </p>
            </div>
            <div className="extras-grid">
              <div className="extra-card">
                <h3>About The Brand</h3>
                <p>
                  Creative Technologies is a digital-first beauty and wellness brand focused on accessible face yoga and skincare education. The new homepage now acts as the main landing experience, while the rest of your earlier informational pages remain available through linked destinations.
                </p>
              </div>
              <div className="extra-card">
                <h3>Explore Additional Pages</h3>
                <ul className="extra-links">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section> */}

        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">Roop Veda&apos;s Face Yoga</div>
              <p>
                Our mission is to reshape beauty worldwide through compassionate skincare, natural wellness, and non-invasive care that respects who you truly are.
              </p>
            </div>
            <div className="footer-links">
              <h4>Legal &amp; Support</h4>
              <ul>
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">&copy; 2026 Roop Veda&apos;s Face Yoga. All rights reserved.</p>
            <span className="footer-ssl">Secure Checkout Enabled Site-Wide</span>
          </div>
        </footer>
      </div>
    </>
  );
}
