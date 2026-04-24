"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getActiveLead, readAttribution, readQuizAnalysis } from "@/lib/meta/attribution";
import { createEventId, trackBrowserMetaEvent } from "@/lib/meta/browser";
import type { QuizAnalysis } from "@/lib/quiz/analysis";
import { pricingPlans } from "@/lib/payments/plans";
import { formatCurrency } from "@/lib/utils";

type PlansGridProps = {
  initialLeadId?: string | null;
};

type Review = {
  initials: string;
  name: string;
  meta: string;
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const PAGE_CSS = `
.rv-checkout, .rv-checkout * { box-sizing:border-box; }
.rv-checkout {
  --primary:#f53163;
  --primary-dark:#d61d4c;
  --secondary:#ff7f9f;
  --bg:#f8f1e6;
  --text:#19332d;
  --text-light:rgba(25,51,45,0.74);
  --border:rgba(25,51,45,0.12);
  --white:#ffffff;
  --green:#2e9d65;
  --pink:#fff5ee;
  --muted:#f3e9dc;
  --gradient:linear-gradient(135deg,#f53163 0%,#ff7f9f 100%);
  --accent-gradient:linear-gradient(135deg,#f53163 0%,#ff7f9f 100%);
  font-family:var(--font-space-grotesk),sans-serif;
  background:
    radial-gradient(circle at top left, rgba(245,49,99,0.16), transparent 28%),
    radial-gradient(circle at bottom right, rgba(25,51,45,0.1), transparent 32%),
    var(--bg);
  color:var(--text);
  line-height:1.6;
}
.rv-checkout a { color:inherit; text-decoration:none; }
.rv-checkout img { max-width:100%; display:block; }
.rv-checkout .nav-sticky { position:sticky; top:0; z-index:100; background:rgba(255,255,255,0.94); backdrop-filter:blur(18px); box-shadow:0 2px 12px rgba(245,49,99,0.08); border-bottom:1px solid rgba(245,49,99,0.12); }
.rv-checkout .nav-top { display:flex; align-items:center; justify-content:space-between; padding:12px 20px; max-width:640px; margin:0 auto; gap:16px; }
.rv-checkout .nav-logo { font-family:var(--font-fraunces),serif; font-size:1.3rem; font-weight:700; color:var(--text); letter-spacing:-0.02em; }
.rv-checkout .nav-logo span { color:var(--primary); }
.rv-checkout .nav-timer { display:flex; align-items:center; gap:6px; font-size:13px; color:var(--text-light); font-weight:600; }
.rv-checkout .nav-timer .time { color:var(--primary); font-weight:800; font-size:15px; }
.rv-checkout .nav-bottom { background:var(--gradient); padding:10px 20px; }
.rv-checkout .nav-bottom-inner { max-width:960px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.rv-checkout .timer-text { color:white; font-size:13px; font-weight:500; }
.rv-checkout .timer-digits { display:flex; align-items:center; gap:4px; color:white; font-weight:700; font-size:16px; }
.rv-checkout .timer-unit { font-size:11px; font-weight:400; opacity:0.9; }
.rv-checkout .btn-primary {
  background:var(--accent-gradient);
  color:white;
  border:none;
  border-radius:999px;
  padding:13px 32px;
  font-size:15px;
  font-weight:800;
  cursor:pointer;
  letter-spacing:0.04em;
  transition:opacity 0.2s, transform 0.1s;
  text-transform:uppercase;
  box-shadow:0 14px 30px rgba(245,49,99,0.22);
}
.rv-checkout .btn-primary:hover { opacity:0.94; transform:translateY(-1px); }
.rv-checkout .btn-primary:disabled { cursor:not-allowed; opacity:0.65; transform:none; }
.rv-checkout .btn-white {
  background:white;
  color:var(--text);
  border:2px solid white;
  border-radius:999px;
  padding:9px 22px;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  transition:all 0.2s;
}
.rv-checkout .btn-white:hover { background:#f53163; color:white; border-color:#f53163; }
.rv-checkout .section { padding:40px 20px; }
.rv-checkout .section-inner { max-width:560px; margin:0 auto; }
.rv-checkout .section-alt { background:linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(243,233,220,0.72) 100%); }
.rv-checkout .section-title {
  font-family:var(--font-fraunces),serif;
  font-size:24px;
  font-weight:700;
  color:var(--text);
  margin-bottom:20px;
  text-align:center;
  line-height:1.3;
}
.rv-checkout .section-title b { color:var(--primary); }
.rv-checkout .hero { background:transparent; padding:0; }
.rv-checkout .hero-inner { max-width:560px; margin:0 auto; background:rgba(255,255,255,0.72); box-shadow:0 18px 50px rgba(25,51,45,0.08); }
.rv-checkout .hero-image {
  background:linear-gradient(135deg,#ead8c9 0%,#f8efe5 100%);
  padding:14px 14px 0;
}
.rv-checkout .hero-image img {
  width:100%;
  max-height:420px;
  object-fit:contain;
  object-position:center top;
}
.rv-checkout .hero-content { padding:24px 20px; }
.rv-checkout .trustpilot-row { display:flex; align-items:center; gap:6px; margin-bottom:12px; font-size:13px; font-weight:500; color:var(--text-light); flex-wrap:wrap; }
.rv-checkout .stars { color:#00b67a; font-size:18px; letter-spacing:1px; }
.rv-checkout .hero-title {
  font-family:var(--font-fraunces),serif;
  font-size:26px;
  font-weight:700;
  line-height:1.3;
  margin-bottom:12px;
  color:var(--text);
}
.rv-checkout .hero-title b { color:var(--primary); }
.rv-checkout .hero-subtitle { font-size:15px; color:var(--text-light); margin-bottom:20px; line-height:1.7; }
.rv-checkout .hero-subtitle b { color:var(--text); }
.rv-checkout .analysis-card {
  background:linear-gradient(135deg, rgba(25,51,45,0.04), rgba(245,49,99,0.08));
  border:1px solid rgba(245,49,99,0.18);
  border-radius:14px;
  padding:16px;
  margin-bottom:18px;
}
.rv-checkout .analysis-label {
  font-size:11px;
  font-weight:800;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--primary);
  margin-bottom:8px;
}
.rv-checkout .analysis-card p { font-size:13px; color:var(--text-light); line-height:1.7; }
.rv-checkout .promo-box {
  background:linear-gradient(135deg, #fffaf5, #fce9dc);
  border:1px solid var(--border);
  border-radius:12px;
  padding:16px;
  margin-bottom:20px;
}
.rv-checkout .promo-label { display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700; color:var(--primary); margin-bottom:8px; }
.rv-checkout .promo-code-box {
  background:white;
  border:2px dashed var(--primary);
  border-radius:8px;
  padding:8px 14px;
  font-size:15px;
  font-weight:800;
  color:var(--primary);
  letter-spacing:1px;
  margin-bottom:10px;
  text-align:center;
}
.rv-checkout .promo-expires { display:flex; justify-content:space-between; gap:12px; font-size:13px; color:var(--text-light); }
.rv-checkout .promo-expires span:last-child { font-weight:800; color:var(--primary); }
.rv-checkout .price-cards { display:flex; flex-direction:column; gap:12px; margin-bottom:20px; }
.rv-checkout .price-card {
  border:2px solid var(--border);
  border-radius:14px;
  overflow:hidden;
  position:relative;
  background:white;
  transition:border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.rv-checkout .price-card:hover { border-color:var(--primary); box-shadow:0 6px 22px rgba(245,49,99,0.12); transform:translateY(-1px); }
.rv-checkout .price-card.popular { border-color:var(--primary); box-shadow:0 8px 24px rgba(245,49,99,0.16); }
.rv-checkout .price-card.recommended { border-color:var(--text); box-shadow:0 8px 28px rgba(25,51,45,0.18); }
.rv-checkout .card-flair {
  background:var(--accent-gradient);
  color:white;
  font-size:11px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.5px;
  padding:5px 14px;
  text-align:center;
}
.rv-checkout .card-flair.try { background:#8d7c72; }
.rv-checkout .card-flair.best { background:linear-gradient(135deg, #2e9d65, #48b27b); }
.rv-checkout .card-flair.recommended { background:var(--gradient); }
.rv-checkout .card-body { padding:14px 16px; display:flex; align-items:center; justify-content:space-between; gap:10px; }
.rv-checkout .card-info { flex:1; }
.rv-checkout .card-title { font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px; }
.rv-checkout .card-pricing { display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap; }
.rv-checkout .card-old { font-size:13px; color:#999; text-decoration:line-through; }
.rv-checkout .card-new { font-size:20px; font-weight:800; color:var(--primary); }
.rv-checkout .card-feature { display:flex; align-items:center; gap:4px; font-size:12px; color:var(--text-light); }
.rv-checkout .card-right { text-align:center; }
.rv-checkout .per-day-old { font-size:12px; color:#999; text-decoration:line-through; }
.rv-checkout .per-day-new { font-size:22px; font-weight:800; color:var(--primary); }
.rv-checkout .per-day-label { font-size:11px; color:var(--text-light); margin-bottom:8px; }
.rv-checkout .btn-card {
  background:transparent;
  border:2px solid var(--primary);
  color:var(--primary);
  border-radius:999px;
  padding:8px 16px;
  font-size:12px;
  font-weight:800;
  cursor:pointer;
  white-space:nowrap;
  transition:all 0.2s;
}
.rv-checkout .btn-card:hover, .rv-checkout .btn-card.active { background:var(--primary); color:white; }
.rv-checkout .btn-card.active { background:var(--accent-gradient); border-color:transparent; }
.rv-checkout .btn-card:disabled { opacity:0.6; cursor:not-allowed; }
.rv-checkout .checkout-info { margin-top:16px; }
.rv-checkout .checkbox-row { display:flex; align-items:flex-start; gap:8px; margin-bottom:10px; font-size:12px; color:var(--text-light); }
.rv-checkout .checkbox-row input[type=checkbox] { accent-color:var(--primary); width:16px; height:16px; flex-shrink:0; margin-top:2px; }
.rv-checkout .checkbox-row a { color:var(--primary); text-decoration:underline; text-underline-offset:3px; }
.rv-checkout .secure-row { display:flex; align-items:center; gap:6px; font-size:13px; color:var(--text-light); margin-bottom:10px; flex-wrap:wrap; }
.rv-checkout .lock-icon { color:var(--primary); font-size:16px; }
.rv-checkout .card-icons { display:flex; gap:6px; font-size:10px; color:white; }
.rv-checkout .card-icon { background:#1a1f71; border-radius:4px; padding:3px 7px; font-weight:700; font-size:9px; }
.rv-checkout .card-icon.mc { background:#eb001b; }
.rv-checkout .card-icon.amex { background:#2e77bc; }
.rv-checkout .card-icon.discover { background:#ff6600; }
.rv-checkout .auto-renew-note { font-size:11px; color:#7a7a7a; line-height:1.5; margin-top:10px; }
.rv-checkout .fox-quote {
  background:#faf8f5;
  border-left:4px solid var(--primary);
  border-radius:8px;
  padding:14px 16px;
  margin-top:20px;
  display:flex;
  align-items:flex-start;
  gap:12px;
}
.rv-checkout .fox-logo { font-size:22px; font-weight:900; color:var(--text); flex-shrink:0; font-style:italic; }
.rv-checkout .fox-text { font-size:13px; font-style:italic; color:var(--text-light); line-height:1.5; }
.rv-checkout .body-text { font-size:15px; color:var(--text-light); line-height:1.8; text-align:center; }
.rv-checkout .media-quote {
  font-size:16px;
  font-style:italic;
  color:var(--text);
  line-height:1.7;
  margin-bottom:16px;
  border-left:3px solid var(--primary);
  padding-left:16px;
  text-align:left;
}
.rv-checkout .review-card {
  background:white;
  border-radius:14px;
  padding:16px;
  margin-bottom:12px;
  box-shadow:0 2px 12px rgba(25,51,45,0.06);
  border:1px solid var(--border);
}
.rv-checkout .review-header { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.rv-checkout .review-avatar {
  width:42px;
  height:42px;
  border-radius:50%;
  background:var(--accent-gradient);
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-weight:800;
  font-size:16px;
  flex-shrink:0;
}
.rv-checkout .review-name { font-weight:800; font-size:14px; color:var(--text); }
.rv-checkout .review-date { font-size:12px; color:#999; }
.rv-checkout .review-stars { color:#00b67a; font-size:16px; letter-spacing:1px; }
.rv-checkout .review-text { font-size:14px; color:var(--text-light); line-height:1.6; }
.rv-checkout .savings-table { background:white; border-radius:14px; overflow:hidden; box-shadow:0 2px 12px rgba(25,51,45,0.06); }
.rv-checkout .savings-row {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:12px 16px;
  border-bottom:1px solid var(--border);
  font-size:14px;
}
.rv-checkout .savings-row:last-child { border-bottom:none; }
.rv-checkout .item-name { color:var(--text-light); display:flex; align-items:center; gap:8px; }
.rv-checkout .check { color:var(--green); font-size:16px; }
.rv-checkout .item-price { font-weight:700; color:var(--text); white-space:nowrap; }
.rv-checkout .savings-row.total { background:#fff8f2; font-weight:700; }
.rv-checkout .savings-row.monthly .item-price { text-decoration:line-through; color:#999; }
.rv-checkout .savings-row.highlight { background:var(--gradient); color:white; }
.rv-checkout .savings-row.highlight .item-name, .rv-checkout .savings-row.highlight .item-price { color:white; }
.rv-checkout .savings-row.highlight .item-price { font-size:18px; }
.rv-checkout .social-img {
  border-radius:12px;
  overflow:hidden;
  margin-bottom:16px;
  box-shadow:0 4px 16px rgba(25,51,45,0.1);
  background:#fff;
  padding:12px;
}
.rv-checkout .social-img img {
  width:100%;
  max-height:520px;
  object-fit:contain;
  object-position:center top;
  background:#fff;
}
.rv-checkout .faq-item {
  background:white;
  border-radius:10px;
  margin-bottom:10px;
  border:1px solid var(--border);
  overflow:hidden;
  box-shadow:0 1px 4px rgba(25,51,45,0.04);
}
.rv-checkout .faq-question {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 16px;
  cursor:pointer;
  font-size:14px;
  font-weight:700;
  color:var(--text);
  gap:10px;
  user-select:none;
}
.rv-checkout .faq-question:hover { background:#fff7f0; }
.rv-checkout .faq-icon { color:var(--primary); font-size:18px; flex-shrink:0; }
.rv-checkout .faq-chevron { color:var(--text-light); font-size:18px; transition:transform 0.3s; flex-shrink:0; }
.rv-checkout .faq-item.open .faq-chevron { transform:rotate(180deg); }
.rv-checkout .faq-answer { max-height:0; overflow:hidden; transition:max-height 0.3s ease; font-size:14px; color:var(--text-light); line-height:1.7; }
.rv-checkout .faq-item.open .faq-answer { max-height:320px; }
.rv-checkout .faq-answer-inner { padding:0 16px 14px 44px; }
.rv-checkout .cta-block { text-align:center; padding:24px 0; }
.rv-checkout .tp-stars { margin-top:16px; display:inline-flex; align-items:center; gap:6px; font-size:13px; color:var(--text-light); flex-wrap:wrap; justify-content:center; }
.rv-checkout .tp-logo { font-weight:900; font-size:13px; color:#00b67a; }
.rv-checkout video { width:100%; border-radius:12px; box-shadow:0 4px 20px rgba(25,51,45,0.1); }
.rv-checkout .feature-video {
  display:block;
  width:min(100%, 360px);
  aspect-ratio:9/16;
  margin:0 auto;
  object-fit:cover;
  background:#000;
}
.rv-checkout .testimonial-slider { margin-bottom:24px; }
.rv-checkout .testimonial-video {
  display:block;
  width:min(100%, 360px);
  aspect-ratio:9/16;
  margin:0 auto;
  object-fit:cover;
  background:#000;
}
.rv-checkout .testimonial-controls {
  display:flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  margin-top:14px;
}
.rv-checkout .testimonial-nav {
  border:1px solid rgba(25,51,45,0.14);
  background:#fff;
  color:var(--text);
  border-radius:999px;
  min-width:44px;
  height:44px;
  padding:0 16px;
  font-size:13px;
  font-weight:800;
  cursor:pointer;
  transition:all 0.2s;
}
.rv-checkout .testimonial-nav:hover { border-color:var(--primary); color:var(--primary); }
.rv-checkout .testimonial-dots { display:flex; align-items:center; gap:8px; }
.rv-checkout .testimonial-dot {
  width:10px;
  height:10px;
  border-radius:50%;
  border:none;
  background:rgba(25,51,45,0.18);
  cursor:pointer;
  transition:transform 0.2s, background 0.2s;
}
.rv-checkout .testimonial-dot.active {
  background:var(--primary);
  transform:scale(1.15);
}
.rv-checkout .testimonial-count {
  text-align:center;
  margin-top:10px;
  font-size:12px;
  font-weight:700;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--text-light);
}
.rv-checkout .before-after img { width:100%; border-radius:12px; margin-bottom:16px; aspect-ratio:16/12; object-fit:cover; }
.rv-checkout .program-img img { width:100%; max-width:355px; display:block; margin:0 auto; }
.rv-checkout footer { background:white; border-top:1px solid var(--border); padding:40px 20px; text-align:center; }
.rv-checkout .footer-inner { max-width:640px; margin:0 auto; }
.rv-checkout .footer-logo { margin-bottom:20px; font-family:var(--font-fraunces),serif; font-size:2rem; font-weight:700; color:var(--text); }
.rv-checkout .footer-logo span { color:var(--primary); }
.rv-checkout .footer-links { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin-bottom:20px; }
.rv-checkout .footer-links a { color:var(--primary); text-decoration:none; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; }
.rv-checkout .footer-links a:hover { text-decoration:underline; }
.rv-checkout .footer-company { font-size:12px; color:var(--primary-dark); margin-bottom:6px; }
.rv-checkout .footer-copy { font-size:12px; color:var(--primary-dark); }
.rv-checkout .fb-comment {
  background:white;
  border-radius:10px;
  padding:14px;
  margin-bottom:12px;
  border:1px solid var(--border);
  font-size:14px;
  color:var(--text-light);
  line-height:1.6;
}
.rv-checkout .fb-comment-header { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.rv-checkout .fb-avatar {
  width:36px;
  height:36px;
  border-radius:50%;
  background:#1877f2;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-weight:800;
  font-size:14px;
  flex-shrink:0;
}
.rv-checkout .fb-name { font-weight:800; color:#1877f2; font-size:14px; }
.rv-checkout .fb-date { font-size:11px; color:#999; }
.rv-checkout .fb-reactions { margin-top:10px; font-size:13px; }
.rv-checkout hr.section-sep { border:none; border-top:1px solid var(--border); margin:0; }
.rv-checkout .error-box { margin-top:16px; border-radius:12px; border:1px solid rgba(245,49,99,0.28); background:#fff4f7; padding:12px 14px; color:#a51f45; font-size:13px; }
.rv-checkout .plan-scroll-anchor { scroll-margin-top:120px; }
@media (min-width:600px) {
  .rv-checkout .hero-title { font-size:30px; }
  .rv-checkout .section-title { font-size:28px; }
}
`;

const HERO_IMAGE =
  "https://cdn.hoola.com/faceyoga-cms/1765272322679_1764069933227_before_after_mobile.webp";
const PROGRAM_IMAGE =
  "https://cdn.hoola.com/faceyoga-cms/1765447286374_Untitled_design__22_.webp";
const FEATURE_VIDEO =
  "/videos/First_Excercise.mp4";
const TESTIMONIAL_VIDEOS = [
  "/videos/testimonial_1.mp4",
  "/videos/testimonail_2.mp4",
  "/videos/testimonial_3.mp4"
];
const YAHOO_LOGO =
  "https://cdn.hoola.com/faceyoga-cms/1765284982468_1764070228254_yahoo_logo.webp";
const SOCIAL_IMAGES = [
  "https://cdn.hoola.com/faceyoga-cms/1765281205748_1.eaa51d71af37c21a1a30.webp",
  // "https://cdn.hoola.com/faceyoga-cms/1765281219821_2.1dca099a77af3dca4679.webp",
  // "https://cdn.hoola.com/faceyoga-cms/1765281233951_3.a48da4ad25b088391536.webp"
];
const FINAL_IMAGE =
  "https://cdn.hoola.com/faceyoga-cms/1765281306994_1764068331309_faceyoga_beforeAfter.webp";

const REVIEWS: Review[] = [
  {
    initials: "CB",
    name: "Cate Bridget",
    meta: "Verified Purchase",
    text: "I was skeptical at first but after just 2 weeks I could already see a difference in my jawline. My friends keep asking what I've done differently and I tell them it is my secret weapon."
  },
  {
    initials: "CM",
    name: "Christina Miller",
    meta: "18 Dec, 2021 · Verified",
    text: "This is truly a hidden gem. I have noticed my skin feels firmer and my double chin has reduced significantly. Worth every penny and more."
  },
  {
    initials: "SL",
    name: "Sarah L.",
    meta: "Verified Purchase · USA",
    text: "I am 52 and people now think I am in my early 40s. The exercises are simple and I do them every morning while having my coffee. Absolutely love this program."
  }
];

const FAQS: FaqItem[] = [
  {
    question: "What is Face Yoga?",
    answer:
      "Face Yoga is a routine of facial exercises designed to support younger-looking skin, improved tone, and stronger facial muscles through consistent practice."
  },
  {
    question: "What are the main Face Yoga benefits?",
    answer:
      "Users commonly report smoother-looking skin, a more defined jawline, reduced facial tension, and a more refreshed overall appearance. Individual results can vary."
  },
  {
    question: "Do I need any special equipment to do Face Yoga?",
    answer:
      "No. All you need is your hands and a phone or laptop. Many people also like practicing in front of a mirror."
  },
  {
    question: "How do I access my program?",
    answer:
      "Your plan becomes available after payment through the existing secure flow, and access details are shared via the normal Roop Veda process."
  },
  {
    question: "How often should I practice to see results?",
    answer:
      "Most people notice progress with steady daily practice. Small improvements can start early, and visible changes tend to build over the following weeks."
  },
  {
    question: "How hard is it to do Face Yoga?",
    answer:
      "It is beginner-friendly. The routines are simple to follow and designed to feel approachable even if this is your first time."
  },
  {
    question: "I do not exercise. Can I still do Face Yoga?",
    answer:
      "Yes. The program is suitable for beginners and built around short, manageable sessions."
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact support through the Contact page and share your registered email plus transaction details for faster assistance."
  }
];

const INSIGHT_FALLBACKS = [
  "Customized daily facial workout plan",
  "Premium library of anti-aging face yoga routines",
  "Expert glow-focused guidance"
];

function getPlanDays(index: number) {
  return [7, 28, 84][index] ?? 30;
}

function getPlanFlair(index: number, isRecommended: boolean, isPopular: boolean) {
  if (isRecommended) {
    return { text: "Recommended For You", className: "recommended" };
  }

  if (isPopular) {
    return { text: "Most Popular", className: "" };
  }

  if (index === 0) {
    return { text: "Try It Out", className: "try" };
  }

  return { text: "Best Value!", className: "best" };
}

function getPromoCode(leadId: string | null) {
  if (!leadId) {
    return "ROOPVEDA_GLOW";
  }

  return `ROOPVEDA_${leadId.slice(0, 8).toUpperCase()}`;
}

export function PlansGrid({ initialLeadId }: PlansGridProps) {
  const router = useRouter();
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<QuizAnalysis | null>(null);
  const [totalSeconds, setTotalSeconds] = useState(14 * 60 + 16);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hideTopNav, setHideTopNav] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const activeLead = useMemo(() => getActiveLead(), []);
  const leadId = initialLeadId ?? activeLead?.leadId ?? null;
  const email = activeLead?.email ?? null;
  const recommendedPlan = analysis
    ? pricingPlans.find((plan) => plan.id === analysis.recommendedPlanId) ?? null
    : null;

  useEffect(() => {
    setAnalysis(readQuizAnalysis());
  }, []);

  useEffect(() => {
    if (totalSeconds <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTotalSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [totalSeconds]);

  useEffect(() => {
    function handleScroll() {
      setHideTopNav(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToPlans() {
    document.getElementById("plans")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  async function handlePlanSelection(planId: string) {
    if (!leadId) {
      router.push("/quiz");
      return;
    }

    setPendingPlanId(planId);
    setError(null);

    const plan = pricingPlans.find((item) => item.id === planId);
    const attribution = readAttribution();
    const eventId = createEventId();

    if (plan) {
      trackBrowserMetaEvent("InitiateCheckout", eventId, {
        value: plan.amount / 100,
        currency: plan.currency.toUpperCase()
      });
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          leadId,
          planId,
          eventId,
          eventSourceUrl: window.location.href,
          attribution
        })
      });

      const data = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (selectionError) {
      setError(
        selectionError instanceof Error
          ? selectionError.message
          : "Unable to start checkout."
      );
    } finally {
      setPendingPlanId(null);
    }
  }

  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const promoCode = getPromoCode(leadId);
  const insightBullets = analysis?.insightBullets?.length
    ? analysis.insightBullets
    : INSIGHT_FALLBACKS;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <main className="rv-checkout">
        <div className="nav-sticky">
          <div
            className="nav-top"
            style={{
              maxHeight: hideTopNav ? 0 : 80,
              opacity: hideTopNav ? 0 : 1,
              paddingTop: hideTopNav ? 0 : 12,
              paddingBottom: hideTopNav ? 0 : 12,
              overflow: "hidden",
              transition:
                "max-height 0.25s ease, opacity 0.2s ease, padding 0.25s ease"
            }}
          >
            <div className="nav-logo">
              <span>Roop</span> Veda
            </div>
            <div className="nav-timer">
              <span>Price reserved for:</span>
              <span className="time">{minutes}:{seconds}</span>
            </div>
          </div>
          <div className="nav-bottom">
            <div className="nav-bottom-inner">
              <div className="nav-timer" style={{ color: "white", gap: 8 }}>
                <span className="timer-text">Price reserved for:</span>
                <div className="timer-digits">
                  <span>{minutes}</span>
                  <span>:</span>
                  <span>{seconds}</span>
                  <span className="timer-unit">min / sec</span>
                </div>
              </div>
              <button className="btn-white" type="button" onClick={scrollToPlans}>
                GET MY PLAN
              </button>
            </div>
          </div>
        </div>

        <section className="hero">
          <div className="hero-inner">
            <div className="hero-image">
              <img
                src={HERO_IMAGE}
                alt="Before and after comparison showing facial transformation results"
              />
            </div>
            <div className="hero-content">
              <div className="trustpilot-row">
                <span className="stars">★★★★★</span>
                <span>
                  Rated 4.8/5 by <strong>1000&apos;s</strong> of <strong>verified</strong>{" "}
                  customers.
                </span>
              </div>

              <h1 className="hero-title">
                Your Personal <b>Face Yoga</b> Plan is Ready
              </h1>

              <p className="hero-subtitle">
                Learn the <b>natural method users love.</b> Our guided face yoga
                routines help reduce the look of <b>wrinkles and double-chin</b>{" "}
                while supporting a more sculpted, lifted appearance in just a few
                weeks of steady practice.
              </p>

              {analysis ? (
                <div className="analysis-card">
                  <div className="analysis-label">
                    {recommendedPlan ? "Your Recommendation" : "Your Results"}
                  </div>
                  <p>
                    {analysis.summary}
                    <br />
                    {analysis.planReason}
                  </p>
                </div>
              ) : null}

              <div className="promo-box">
                <div className="promo-label">🏷️ Your promo code applied!</div>
                <div className="promo-code-box">{promoCode}</div>
                <div className="promo-expires">
                  <span>Expires In:</span>
                  <span>00:{minutes}:{seconds}</span>
                </div>
              </div>

              <div className="price-cards plan-scroll-anchor" id="plans">
                {pricingPlans.map((plan, index) => {
                  const isRecommended = analysis?.recommendedPlanId === plan.id;
                  const isPopular = plan.id === "signature-ritual";
                  const isPending = pendingPlanId === plan.id;
                  const flair = getPlanFlair(index, Boolean(isRecommended), isPopular);
                  const originalPrice = Math.round(plan.amount * 1.5);
                  const dayCount = getPlanDays(index);
                  const perDay = plan.amount / 100 / dayCount;
                  const originalPerDay = originalPrice / 100 / dayCount;

                  return (
                    <div
                      key={plan.id}
                      className={`price-card${isPopular ? " popular" : ""}${isRecommended ? " recommended" : ""}`}
                    >
                      <div className={`card-flair ${flair.className}`.trim()}>
                        {flair.text}
                      </div>
                      <div className="card-body">
                        <div className="card-info">
                          <div className="card-title">{plan.name}</div>
                          <div className="card-pricing">
                            <span className="card-old">
                              {formatCurrency(originalPrice, plan.currency)}
                            </span>
                            <span className="card-new">
                              {formatCurrency(plan.amount, plan.currency)}
                            </span>
                          </div>
                          <div className="card-feature">
                            ⚙️ {plan.benefits[1] ?? plan.description}
                          </div>
                        </div>
                        <div className="card-right">
                          <div className="per-day-old">
                            {formatCurrency(Math.round(originalPerDay * 100), plan.currency)}
                          </div>
                          <div className="per-day-new">
                            {formatCurrency(Math.round(perDay * 100), plan.currency)}
                          </div>
                          <div className="per-day-label">per Day</div>
                          <button
                            className={`btn-card${isRecommended || isPopular ? " active" : ""}`}
                            type="button"
                            onClick={() => handlePlanSelection(plan.id)}
                            disabled={isPending}
                          >
                            {isPending ? "OPENING..." : "GET MY PLAN 👉"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-info">
                <div className="checkbox-row">
                  <input type="checkbox" checked readOnly />
                  <span>
                    I agree with the <Link href="/privacy">Privacy Policy</Link> &{" "}
                    <Link href="/terms">Terms And Conditions</Link>
                  </span>
                </div>
                {/* <div className="secure-row">
                  <span className="lock-icon">🔒</span>
                  <span>Guaranteed Safe Checkout</span>
                  <div className="card-icons" aria-hidden="true">
                    <span className="card-icon visa">VISA</span>
                    <span className="card-icon mc">MC</span>
                    <span className="card-icon amex">AMEX</span>
                    <span className="card-icon discover">DISC</span>
                  </div>
                </div> */}
                {/* <p className="auto-renew-note">
                  Secure checkout continues through your existing payment
                  gateway. Any recommendation logic and Meta tracking remain
                  connected to this flow.
                </p> */}
              </div>

              {error ? <div className="error-box">{error}</div> : null}

              <div className="fox-quote">
                <div className="fox-logo">RV</div>
                <p className="fox-text">
                  &quot;A natural routine designed to help lift the look of the
                  face, soften visible lines, and support a younger-looking glow
                  without invasive treatments.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section">
          <div className="section-inner">
            <h2 className="section-title">
              What is <b>Face Yoga</b>?
            </h2>
            <p className="body-text">
              Face Yoga is a guided routine of facial exercises
              designed to support a firmer-looking face, a more defined jawline,
              and healthier-looking skin. With a strategically designed practice,
              anyone can build consistency, strengthen facial muscles, and bring
              out a more radiant, naturally lifted look.
            </p>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section section-alt">
          <div className="section-inner">
            <h2 className="section-title">
              See <b>Your</b> First Face Yoga <b>Exercise</b>
            </h2>
            <video className="feature-video" controls playsInline preload="metadata">
              <source src={FEATURE_VIDEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section">
          <div className="section-inner">
            <h2 className="section-title">
              Your <b>Personal Program</b> Includes:
            </h2>
            <div className="program-img">
              <img
                src={PROGRAM_IMAGE}
                alt="Features of the program including custom facial exercises and guided support"
              />
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section section-alt">
          <div className="section-inner">
            <h2 className="section-title">
              <b>Face Yoga</b> in the Media
            </h2>
            <blockquote className="media-quote">
              &quot;As a free, non-invasive and highly effective method of
              looking younger and firmer, Face Yoga offers a natural beauty
              ritual without the cost and risk of harsher alternatives.&quot;
            </blockquote>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <img
                src={YAHOO_LOGO}
                alt="Yahoo News logo"
                style={{ height: 37, margin: "0 auto" }}
              />
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section">
          <div className="section-inner">
            <h2 className="section-title">
              Users Love <b>Face Yoga</b>
            </h2>

            {REVIEWS.map((review) => (
              <div className="review-card" key={review.name}>
                <div className="review-header">
                  <div className="review-avatar">{review.initials}</div>
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-date">{review.meta}</div>
                  </div>
                </div>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section section-alt">
          <div className="section-inner">
            <h2 className="section-title">
              Here&apos;s What <b>Our Users</b> Have To Say
            </h2>
            <div className="testimonial-slider">
              <video
                key={TESTIMONIAL_VIDEOS[activeTestimonialIndex]}
                className="testimonial-video"
                controls
                playsInline
                preload="metadata"
              >
                <source
                  src={TESTIMONIAL_VIDEOS[activeTestimonialIndex]}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="testimonial-controls">
                <button
                  className="testimonial-nav"
                  type="button"
                  onClick={() =>
                    setActiveTestimonialIndex((current) =>
                      current === 0 ? TESTIMONIAL_VIDEOS.length - 1 : current - 1
                    )
                  }
                  aria-label="Show previous testimonial video"
                >
                  Prev
                </button>
                <div className="testimonial-dots">
                  {TESTIMONIAL_VIDEOS.map((video, index) => (
                    <button
                      key={video}
                      className={`testimonial-dot${index === activeTestimonialIndex ? " active" : ""}`}
                      type="button"
                      onClick={() => setActiveTestimonialIndex(index)}
                      aria-label={`Show testimonial video ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  className="testimonial-nav"
                  type="button"
                  onClick={() =>
                    setActiveTestimonialIndex((current) =>
                      current === TESTIMONIAL_VIDEOS.length - 1 ? 0 : current + 1
                    )
                  }
                  aria-label="Show next testimonial video"
                >
                  Next
                </button>
              </div>
              <div className="testimonial-count">
                Video {activeTestimonialIndex + 1} / {TESTIMONIAL_VIDEOS.length}
              </div>
            </div>
            <div className="cta-block">
              <button className="btn-primary" type="button" onClick={scrollToPlans}>
                GET MY PLAN
              </button>
              <div className="tp-stars">
                <span className="stars" style={{ fontSize: 16 }}>
                  ★★★★★
                </span>
                {/* <span className="tp-logo">Trustpilot</span> */}
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section">
          <div className="section-inner">
            <h2 className="section-title">
              Here&apos;s What You&apos;re Saving With Roop Veda
            </h2>
            <div className="savings-table">
              {[
                ["Medically designed facial exercises", "₹24,999.00"],
                ["Personal face yoga routine", "₹12,999.00"],
                ["Exclusive tutorial videos", "₹8,999.00"],
                ["Skin glow guidance", "₹4,999.00"],
                ["Hydration tracker", "₹1,999.00"],
                ["24/7 support", "Invaluable!"],
                ["Personalized recommendation insights", "Invaluable!"]
              ].map(([label, value]) => (
                <div className="savings-row" key={label}>
                  <span className="item-name">
                    <span className="check">✓</span> {label}
                  </span>
                  <span className="item-price">{value}</span>
                </div>
              ))}
              <div className="savings-row total">
                <span className="item-name" style={{ color: "var(--text)", fontWeight: 700 }}>
                  Total Package Value
                </span>
                <span className="item-price" style={{ color: "var(--text)" }}>
                  ₹53,995.00
                </span>
              </div>
              <div className="savings-row monthly">
                <span className="item-name" style={{ color: "var(--text)" }}>
                  Your Plan Today
                </span>
                <span className="item-price">
                  {formatCurrency(
                    pricingPlans.find((plan) => plan.id === "signature-ritual")?.amount ??
                      pricingPlans[0].amount,
                    pricingPlans[0].currency
                  )}
                </span>
              </div>
              <div className="savings-row highlight">
                <span className="item-name">Value You Unlock</span>
                <span className="item-price">₹44,000+</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section section-alt">
          <div className="section-inner">
            <h2 className="section-title">
              <b>Social</b> Media <b>Buzz</b>
            </h2>

            {SOCIAL_IMAGES.map((image, index) => (
              <div className="social-img" key={image}>
                <img
                  src={image}
                  alt={`Face yoga social proof image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section">
          <div className="section-inner">
            <div className="fb-comment">
              <div className="fb-comment-header">
                <div className="fb-avatar">JB</div>
                <div>
                  <div className="fb-name">Jane Barton</div>
                  <div className="fb-date">2 days ago</div>
                </div>
              </div>
              <p>
                I have been doing this for 3 weeks now and my skin looks more
                lifted already. Highly recommend if you want something natural
                and simple to stay consistent with.
              </p>
              <div className="fb-reactions">👍 ❤️ 😮 &nbsp; 247 reactions</div>
            </div>

            <div className="fb-comment">
              <div className="fb-comment-header">
                <div className="fb-avatar">KH</div>
                <div>
                  <div className="fb-name">Kate Heldon</div>
                  <div className="fb-date">5 days ago</div>
                </div>
              </div>
              <p>
                Just finished my first week and already notice my cheeks look
                more defined. Can&apos;t wait to see the results after the full
                course.
              </p>
              <div className="fb-reactions">👍 ❤️ &nbsp; 183 reactions</div>
            </div>

            <div className="cta-block">
              <button className="btn-primary" type="button" onClick={scrollToPlans}>
                GET MY PLAN
              </button>
              <div className="tp-stars">
                <span className="stars" style={{ fontSize: 16 }}>
                  ★★★★★
                </span>
                {/* <span className="tp-logo">Trustpilot</span> */}
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section section-alt">
          <div className="section-inner">
            <h2 className="section-title">Frequently Asked Questions</h2>

            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={`faq-item${isOpen ? " open" : ""}`}
                  key={faq.question}
                >
                  <div
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setOpenFaq(isOpen ? null : index);
                      }
                    }}
                  >
                    <span className="faq-icon">❓</span>
                    <span>{faq.question}</span>
                    <span className="faq-chevron">▼</span>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                </div>
              );
            })}

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <button className="btn-primary" type="button" onClick={scrollToPlans}>
                GET MY PLAN
              </button>
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        <section className="section">
          <div className="section-inner">
            <div className="before-after">
              <img src={FINAL_IMAGE} alt="Before and after comparison" />
            </div>
            <div className="cta-block">
              <button className="btn-primary" type="button" onClick={scrollToPlans}>
                GET MY PLAN
              </button>
              <div className="tp-stars">
                <span className="stars" style={{ fontSize: 16 }}>
                  ★★★★★
                </span>
                {/* <span className="tp-logo">Trustpilot</span> */}
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <h2 className="section-title">
              Why this recommendation <b>fits you</b>
            </h2>
            <div className="savings-table">
              {insightBullets.map((item) => (
                <div className="savings-row" key={item}>
                  <span className="item-name">
                    <span className="check">✓</span> {item}
                  </span>
                  <span className="item-price">Included</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-inner">
            <div className="footer-logo">
              <span>Roop</span> Veda
            </div>
            <div className="footer-links">
              <Link href="/terms">Terms &amp; Conditions</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/refund">Refund Policy</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
            <p className="footer-company">
              Creative Technologies · Pranav Bhandari · Doctor Residency,
              Barkatpura Narayanguda, Hyderabad, Telangana 500027, India
            </p>
            <p className="footer-copy">© 2026 Roop Veda. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
