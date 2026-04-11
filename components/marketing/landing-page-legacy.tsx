
"use client";
import Link from "next/link";
import { ArrowRight, Shield, Smile, Zap, Users, Leaf, Clock, Droplets, Wind, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

const features = [
  {
    title: "Guided Face Yoga Programs",
    description: "Structured, easy-to-follow routines designed for real-world results.",
    icon: Smile
  },
  {
    title: "Instant Access",
    description: "Get immediate dashboard access to all video content after purchase.",
    icon: Zap
  },
  {
    title: "For Everyone",
    description: "Designed for beginners and regular users alike.",
    icon: Users
  },
  {
    title: "Natural Approach",
    description: "Traditional beauty practices through modern digital convenience.",
    icon: Leaf
  }
];

const benefits = [
  {
    title: "Natural Anti-Aging",
    description: "Slow down the clock naturally by toning facial muscles, smoothing out wrinkles, and enhancing your skin's elasticity without any injections.",
    icon: Clock
  },
  {
    title: "Glowing Complexion",
    description: "Targeted exercises drastically increase blood flow to the surface of the skin, nourishing cells and giving you a permanent, healthy glow.",
    icon: Sparkles
  },
  {
    title: "Release Facial Tension",
    description: "Stop jaw clenching and squinting. Our mindful routines reduce stress-induced wrinkles and help relieve tension headaches.",
    icon: Wind
  },
  {
    title: "Sculpt & Define",
    description: "Regular practice helps lift sagging cheeks, eliminate double chins, and sharpen your jawline without the need for contouring makeup.",
    icon: Droplets
  }
];

const transformations = [
  {
    title: "Visibly Lifted Eyelids & Brow",
    beforeImage: "/images/camparison1.png",
    highlight: "Lifted Eyelids"
  },
  {
    title: "Clearer, Brighter Complexion",
    beforeImage: "/images/camparison2.png",
    highlight: "Brighter Skin"
  },
  {
    title: "Smoothed Fine Lines & Wrinkles",
    beforeImage: "/images/camparison3.png",
    highlight: "Smooth Skin"
  }
];

const testimonials = [
  {
    name: "Meera K.",
    location: "Mumbai, India",
    rating: 5,
    title: "Refreshing and Effective",
    quote: "I've been practicing Face Yoga for a couple of months, and my skin looks firmer with reduced fine lines. The routines are so easy to follow—it's now the best part of my morning!"
  },
  {
    name: "Sarah T.",
    location: "London, UK",
    rating: 5,
    title: "Quick Results, Happy User",
    quote: "After only three weeks, my skin feels completely rejuvenated and much tighter. It fits perfectly into my busy schedule. I can't imagine my day without it now."
  },
  {
    name: "Anita R.",
    location: "Toronto, Canada",
    rating: 5,
    title: "A Natural Confidence Booster",
    quote: "Face Yoga has not only improved my skin's appearance but also boosted my confidence. The personalized program is incredibly convenient and genuinely enjoyable."
  },
  {
    name: "Chloe D.",
    location: "Sydney, Australia",
    rating: 5,
    title: "Game Changer for Elasticity",
    quote: "Since I started practicing, I've noticed a massive improvement in my skin's elasticity and tone. It's literally like a natural facelift without the hefty price tag!"
  },
  {
    name: "Priya M.",
    location: "New Delhi, India",
    rating: 5,
    title: "Incredible Jawline Definition",
    quote: "My jawline is sharper than ever! I didn't realize how much stress I was holding in my face. Now I'm feeling more relaxed, and I look less tired all the time."
  },
  {
    name: "Jessica L.",
    location: "New York, USA",
    rating: 5,
    title: "From Skeptic to Believer",
    quote: "Deep forehead lines, be gone! My skin feels so much smoother and looks years younger. I honestly never thought I could achieve such results without Botox."
  }
];

const plans = [
  {
    name: "STARTER KIT",
    duration: "1-Week Plan",
    originalPrice: 299,
    price: 199,
    perDay: 28,
    popular: false,
    features: [
      "Customized daily facial workout plan",
      "Premium library of anti-aging exercises",
      "Expert diet guidelines",
      "Beginner-friendly video tutorials"
    ]
  },
  {
    name: "MOST LOVED",
    duration: "4-Week Plan",
    originalPrice: 799,
    price: 399,
    perDay: 14,
    popular: true,
    features: [
      "Customized daily facial workout plan",
      "Premium library of anti-aging exercises",
      "Expert diet guidelines",
      "Ayurvedic skincare secrets",
      "Daily hydration tracker",
      "Step-by-step video tutorials",
      "24/7 Priority support"
    ]
  },
  {
    name: "TRANSFORMATION!",
    duration: "12-Week Plan",
    originalPrice: 2399,
    price: 599,
    perDay: 7,
    popular: false,
    features: [
      "Customized daily facial workout plan",
      "Premium library of anti-aging exercises",
      "Expert diet guidelines",
      "Ayurvedic skincare secrets",
      "Daily hydration tracker",
      "Step-by-step video tutorials",
      "24/7 Priority support",
      "Personalized guidance"
    ]
  }
];

const faqs = [
  {
    question: "How quickly will I see results?",
    answer: "Most users report visible improvements within 2-3 weeks of consistent practice. However, results vary from person to person. The key is consistency—practicing 10-15 minutes daily will deliver the best outcomes."
  },
  {
    question: "How much time do I need to practice each day?",
    answer: "Our routines are designed to fit into your busy schedule. Just 10-15 minutes daily is enough to see noticeable results. You can practice during your morning routine, lunch break, or before bed."
  },
  {
    question: "Do I need any expensive tools, rollers, or creams?",
    answer: "No! Face Yoga requires nothing but your own hands and a few minutes of your time. This makes it the most affordable and accessible beauty solution available."
  },
  {
    question: "Is Face Yoga safe for mature skin or deep wrinkles?",
    answer: "Yes, absolutely! Face Yoga is safe for all skin types and ages. In fact, it's especially beneficial for mature skin as it helps improve elasticity and reduce deep wrinkles naturally."
  },
  {
    question: "I've had Botox or fillers before. Can I still do Face Yoga?",
    answer: "Yes, you can! Face Yoga complements any previous treatments and helps maintain results. However, consult with your dermatologist before starting if you have recent procedures."
  }
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div key={index} className="border border-forest/15 rounded-[18px] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/50 transition text-left"
      >
        <h4 className="font-semibold text-forest">{item.question}</h4>
        <ChevronDown className={`h-5 w-5 text-forest transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-5 bg-white/50 border-t border-forest/15">
          <p className="text-forest/75 leading-7">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-16">
        {/* Header */}
        <header className="surface flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">ROOP VEDA</p>
            <p className="mt-2 text-lg font-semibold text-forest">
              Transform Your Face & Confidence
            </p>
          </div>
          <nav className="flex flex-wrap gap-3">
            <Link
              href="#about"
              className="rounded-full border border-forest/15 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-white/70"
            >
              About
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
            >
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="surface bg-hero-radial px-6 py-10 sm:px-10">
            <p className="eyebrow">Face Yoga Transformation</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-forest sm:text-6xl">
              Natural Beauty Through Facial Wellness
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/75">
              Discover structured, easy-to-follow Face Yoga programs designed to improve facial wellness, boost confidence, and enhance your self-care routine from home.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quiz"
                className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-forest/15 px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white/70"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="surface px-6 py-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember/10 text-ember">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-forest">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-forest/70">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="surface px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">About Us</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Who We Are
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold text-forest mb-4">Our Foundation</h3>
              <p className="text-lg leading-8 text-forest/75 mb-4">
                CREATIVE TECHNOLOGIES is a digital-first brand focused on delivering modern, accessible, and effective solutions in the Beauty & Personal Care space.
              </p>
              <p className="text-lg leading-8 text-forest/75">
                We specialize in providing Face Yoga and skincare-based digital programs designed to help individuals improve facial wellness, confidence, and self-care routines from the comfort of their homes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-ember/5 to-forest/5 rounded-[24px] p-8">
              <h3 className="text-2xl font-semibold text-forest mb-4">Our Mission</h3>
              <p className="text-lg leading-8 text-forest/75">
                To make natural beauty and self-care practices easy, affordable, and accessible to everyone through structured digital learning.
              </p>
              <p className="text-lg leading-8 text-forest/75 mt-4">
                We aim to bridge the gap between traditional beauty practices and modern digital convenience.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-[22px] border border-ember/20 bg-ember/5 p-8">
              <h4 className="text-xl font-semibold text-forest mb-4">What We Offer</h4>
              <ul className="space-y-3 text-forest/75">
                <li className="flex items-start gap-3">
                  <span className="text-ember font-bold mt-1">✓</span>
                  <span>Guided Face Yoga video programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ember font-bold mt-1">✓</span>
                  <span>Easy-to-follow routines for daily use</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ember font-bold mt-1">✓</span>
                  <span>Structured content designed for real-world results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ember font-bold mt-1">✓</span>
                  <span>Instant access through a secure dashboard</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[22px] border border-forest/20 bg-forest/5 p-8">
              <h4 className="text-xl font-semibold text-forest mb-4">Why Choose Us</h4>
              <ul className="space-y-3 text-forest/75">
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-1">★</span>
                  <span>Simple and easy-to-follow programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-1">★</span>
                  <span>Accessible anytime, anywhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-1">★</span>
                  <span>Designed for beginners and regular users</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-1">★</span>
                  <span>Continuous content improvements</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-[22px] bg-gradient-to-r from-amber-50 to-orange-50 p-8 border border-amber-200">
            <h4 className="text-xl font-semibold text-forest mb-4">Our Approach</h4>
            <p className="text-lg leading-8 text-forest/75 mb-4">
              We believe consistency is key. Our programs are designed to encourage daily habits, promote natural facial care techniques, and deliver practical, easy-to-apply routines.
            </p>
            <p className="text-lg leading-8 text-forest/75 italic">
              We do not believe in complicated systems — only effective, repeatable practices.
            </p>
          </div>

          <div className="mt-12 p-8 rounded-[22px] bg-red-50 border border-red-200">
            <h4 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Important Disclaimer
            </h4>
            <p className="text-forest/75">
              Our content is intended for educational and informational purposes only. We do not provide medical advice, diagnosis, or treatment. Results may vary from person to person.
            </p>
          </div>
        </section>

        {/* How Face Yoga Transforms You Section */}
        <section className="px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">Benefits</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              How Face Yoga Transforms You
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="surface px-6 py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ember/10 text-ember">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-forest">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-forest/70">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Real Transformations Section */}
        <section className="px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">Real Results</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Real Women, Real Transformations
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-forest/75">
              Discover the power of facial exercises with real-life success stories. Watch your skin improve week after week.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {transformations.map((transform) => (
              <div key={transform.title} className="surface overflow-hidden">
                <div className="bg-gradient-to-br from-ember/10 to-forest/10 h-48 flex items-center justify-center">
                  <div className="text-center">
                    {/* <p className="text-sm font-semibold text-forest/60 mb-2">Before / After Comparison</p>
                    <p className="text-lg font-bold text-forest">{transform.highlight}</p> */}
                    <img src={transform.beforeImage} alt={transform.title} className="w-full h-auto rounded-lg object-cover border border-forest/15" />
                  </div>
                </div>
                <div className="px-6 py-6">
                  <h3 className="text-lg font-semibold text-forest">{transform.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="surface px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">Success Stories</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Loved by Users Worldwide
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-[22px] border border-forest/15 bg-white p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                <h4 className="font-semibold text-forest mb-2">{testimonial.title}</h4>
                <p className="text-sm leading-7 text-forest/70 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                  <div>
                    <p className="text-sm font-semibold text-forest">{testimonial.name}</p>
                    <p className="text-xs text-forest/60">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className="px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">Plans</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Unlock Your Natural Glow
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-forest/75">
              Choose the perfect plan to begin your customized face yoga journey. All plans include our complete face yoga program and expert support.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`surface px-6 py-10 relative transition-transform duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-ember lg:scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ember text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {plan.name}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-xl font-bold ${plan.popular ? 'text-ember' : 'text-forest'}`}>
                    {plan.duration}
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-forest">₹{plan.price}</span>
                    <span className="text-sm text-forest/60 line-through">₹{plan.originalPrice}</span>
                  </div>
                  <p className="text-sm text-forest/70">₹{plan.perDay} per day</p>
                </div>

                <div className="mb-8 pt-8 border-t border-forest/15">
                  <p className="text-sm font-semibold text-forest/75 mb-4">⭐ Free Skincare Diet Guide</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-sm text-forest/75">
                        <span className="text-ember mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/quiz"
                  className={`w-full py-3 rounded-full font-semibold transition text-center block ${
                    plan.popular
                      ? 'bg-ember text-white hover:bg-ember/90 shadow-glow'
                      : 'border border-forest/15 text-forest hover:bg-white/70'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full border border-forest/15 px-6 py-3 font-semibold text-forest transition hover:bg-white/70"
            >
              Take a Free Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="surface px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">Your Package</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Your Personalized Package Includes
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[18px] border border-forest/15 p-6 text-center hover:border-ember/30 transition">
              <div className="h-12 w-12 rounded-lg bg-ember/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-ember" />
              </div>
              <h4 className="font-semibold text-forest">Customized Daily Workout</h4>
              <p className="mt-2 text-sm text-forest/70">Personalized facial exercise plan</p>
            </div>

            <div className="rounded-[18px] border border-forest/15 p-6 text-center hover:border-ember/30 transition">
              <div className="h-12 w-12 rounded-lg bg-ember/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 text-ember" />
              </div>
              <h4 className="font-semibold text-forest">Skincare Diet Guide</h4>
              <p className="mt-2 text-sm text-forest/70">Expert nutrition guidelines</p>
            </div>

            <div className="rounded-[18px] border border-forest/15 p-6 text-center hover:border-ember/30 transition">
              <div className="h-12 w-12 rounded-lg bg-ember/10 flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-6 w-6 text-ember" />
              </div>
              <h4 className="font-semibold text-forest">Hydration Tracker</h4>
              <p className="mt-2 text-sm text-forest/70">Daily water intake monitoring</p>
            </div>

            <div className="rounded-[18px] border border-forest/15 p-6 text-center hover:border-ember/30 transition">
              <div className="h-12 w-12 rounded-lg bg-ember/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-ember" />
              </div>
              <h4 className="font-semibold text-forest">24/7 Support</h4>
              <p className="mt-2 text-sm text-forest/70">Priority customer assistance</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-12 sm:px-10">
          <div className="mb-12">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Important Questions Answered
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, index) => (
              <FAQItem key={index} item={faq} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-4 text-lg font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
            >
              Take a Free Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="surface bg-hero-radial px-6 py-10 sm:px-10">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
              Ready to Transform Your Skin?
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-forest/75">
              Join thousands of users who have already started their face yoga journey. Begin with our personalized quiz to find the perfect program for you.
            </p>
            <Link
              href="/quiz"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-forest px-8 py-4 text-lg font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
            >
              Start Quiz Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-forest/10 pt-10">
          <div className="grid gap-8 md:grid-cols-3 mb-10">
            <div>
              <p className="eyebrow">Company</p>
              <p className="mt-4 font-semibold text-forest">CREATIVE TECHNOLOGIES</p>
              <p className="mt-2 text-sm text-forest/65">Legal Name: PRANAV BHANDARI</p>
              <p className="text-sm text-forest/65">Hyderabad, Telangana, India – 500027</p>
            </div>
            <div>
              <p className="eyebrow">Quick Links</p>
              <nav className="mt-4 flex flex-col gap-3">
                <Link href="/#about" className="text-forest/75 hover:text-forest transition">About Us</Link>
                <Link href="/about" className="text-forest/75 hover:text-forest transition">Learn More</Link>
                <Link href="/privacy" className="text-forest/75 hover:text-forest transition">Privacy Policy</Link>
                <Link href="/terms" className="text-forest/75 hover:text-forest transition">Terms & Conditions</Link>
              </nav>
            </div>
            <div>
              <p className="eyebrow">Support</p>
              <nav className="mt-4 flex flex-col gap-3">
                <Link href="/contact" className="text-forest/75 hover:text-forest transition">Contact Us</Link>
                <Link href="/refund" className="text-forest/75 hover:text-forest transition">Refund Policy</Link>
                <a href="mailto:Ameerlunera@gmail.com" className="text-forest/75 hover:text-forest transition">Email Support</a>
              </nav>
            </div>
          </div>
          <div className="border-t border-forest/10 pt-6 text-center text-sm text-forest/65">
            <p>&copy; 2026 CREATIVE TECHNOLOGIES. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
