import Link from "next/link";
import { ArrowRight, Shield, Smile, Zap, Users, Leaf } from "lucide-react";

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

export function LandingPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col gap-16">
        {/* Header */}
        <header className="surface flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">CREATIVE TECHNOLOGIES</p>
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

        {/* CTA Section */}
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
