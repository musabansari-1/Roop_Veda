import Link from "next/link";
import { ArrowRight, Shield, Smile, Zap, Users, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-12">
        {/* Header */}
        <header className="surface px-6 py-6 sm:px-10">
          <p className="eyebrow">Learn About Us</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            About CREATIVE TECHNOLOGIES
          </h1>
          <p className="mt-4 text-forest/70">
            Transforming facial wellness through accessible, modern digital solutions
          </p>
        </header>

        {/* Main About Section */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="surface bg-gradient-to-br from-ember/5 to-forest/5 px-6 py-10 sm:px-10">
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-forest">
              Our Story
            </h2>
            <p className="mt-6 text-lg leading-8 text-forest/75 mb-4">
              CREATIVE TECHNOLOGIES is a digital-first brand focused on delivering modern, accessible, and effective solutions in the Beauty & Personal Care space.
            </p>
            <p className="text-lg leading-8 text-forest/75">
              We specialize in providing Face Yoga and skincare-based digital programs designed to help individuals improve facial wellness, confidence, and self-care routines from the comfort of their homes.
            </p>
          </div>

          <div className="surface px-6 py-10 sm:px-10 border border-forest/20 bg-forest/5">
            <p className="eyebrow">Our Mission</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-forest">
              Making Beauty Accessible
            </h2>
            <p className="mt-6 text-lg leading-8 text-forest/75 mb-6">
              To make natural beauty and self-care practices easy, affordable, and accessible to everyone through structured digital learning.
            </p>
            <p className="text-lg leading-8 text-forest/75 italic border-l-4 border-ember pl-4">
              We aim to bridge the gap between traditional beauty practices and modern digital convenience.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="surface px-6 py-10 sm:px-10">
          <p className="eyebrow">Our Offerings</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest mb-8">
            What We Provide
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-ember/10 flex items-center justify-center text-ember font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-forest text-lg">Guided Video Programs</h3>
                  <p className="text-forest/75 mt-1">Structured Face Yoga video content designed by experts</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-ember/10 flex items-center justify-center text-ember font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-forest text-lg">Easy-to-Follow Routines</h3>
                  <p className="text-forest/75 mt-1">Daily routines designed for real-world results</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-ember/10 flex items-center justify-center text-ember font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-forest text-lg">Structured Content</h3>
                  <p className="text-forest/75 mt-1">Comprehensive programs with progression and depth</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-ember/10 flex items-center justify-center text-ember font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-forest text-lg">Secure Dashboard Access</h3>
                  <p className="text-forest/75 mt-1">Instant access to all content after purchase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="surface px-6 py-10 sm:px-10">
          <p className="eyebrow">Our Values</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest mb-8">
            Why Choose CREATIVE TECHNOLOGIES
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Smile,
                title: "Simple & Easy-to-Follow",
                description: "Programs designed for clarity and ease of implementation"
              },
              {
                icon: Zap,
                title: "Accessible Anywhere",
                description: "Learn at your own pace, anytime, from anywhere"
              },
              {
                icon: Users,
                title: "For Everyone",
                description: "Whether you're a beginner or regular practitioner"
              },
              {
                icon: Leaf,
                title: "Natural Approach",
                description: "Focused on natural beauty and wellness practices"
              },
              {
                icon: Shield,
                title: "Commitment to Quality",
                description: "Continuous content improvements and updates"
              },
              {
                icon: ArrowRight,
                title: "User Experience First",
                description: "Everything designed with your convenience in mind"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="rounded-[22px] border border-ember/20 bg-ember/5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember/10 text-ember mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-forest text-lg mb-2">{item.title}</h3>
                  <p className="text-forest/75">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Approach */}
        <section className="surface px-6 py-10 sm:px-10 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
          <p className="eyebrow">Our Philosophy</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest mb-6">
            Our Approach to Wellness
          </h2>
          <div className="space-y-4 text-forest/75 text-lg leading-8">
            <p>
              We believe <span className="font-semibold text-forest">consistency is key</span>. Our programs are designed to:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="text-ember font-bold">→</span>
                <span>Encourage daily habits that become part of your routine</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ember font-bold">→</span>
                <span>Promote natural facial care techniques backed by research</span>
              </li>
              <li className="flex gap-3">
                <span className="text-ember font-bold">→</span>
                <span>Deliver practical, easy-to-apply routines you can do anywhere</span>
              </li>
            </ul>
            <p className="pt-4 italic border-l-4 border-amber-300 pl-4">
              We do not believe in complicated systems — only effective, repeatable practices.
            </p>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="surface px-6 py-10 sm:px-10 bg-red-50 border border-red-200">
          <div className="flex gap-4 items-start">
            <Shield className="h-6 w-6 text-red-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-red-900 mb-4">Important Disclaimer</h3>
              <p className="text-red-900/75 mb-3">
                Our content is intended for educational and informational purposes only.
              </p>
              <ul className="space-y-2 text-red-900/75">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>We do not provide medical advice, diagnosis, or treatment</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Results may vary from person to person</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Consult a professional before starting any new facial or physical routine</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="surface px-6 py-10 sm:px-10">
          <p className="eyebrow">Our Promise</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest mb-6">
            Our Commitment to You
          </h2>
          <p className="text-lg leading-8 text-forest/75">
            We are committed to continuously improving our platform, content quality, and user experience to provide maximum value to our users. Your feedback matters, and we're always working to make CREATIVE TECHNOLOGIES better.
          </p>
        </section>

        {/* CTA */}
        <section className="surface bg-hero-radial px-6 py-10 sm:px-10">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-display text-3xl leading-tight text-forest">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-2xl text-forest/75">
              Join our community and discover the power of Face Yoga with our guided programs designed just for you.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forest text-white font-semibold shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
            >
              Take the Quiz
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-forest/10 pt-8">
          <div className="grid gap-8 md:grid-cols-3 mb-10">
            <div>
              <p className="eyebrow">Company</p>
              <p className="mt-4 font-semibold text-forest">CREATIVE TECHNOLOGIES</p>
              <p className="mt-2 text-sm text-forest/65">Legal Name: PRANAV BHANDARI</p>
            </div>
            <div>
              <p className="eyebrow">Legal</p>
              <nav className="mt-4 flex flex-col gap-2">
                <Link href="/privacy" className="text-forest/75 hover:text-forest transition text-sm">Privacy Policy</Link>
                <Link href="/terms" className="text-forest/75 hover:text-forest transition text-sm">Terms & Conditions</Link>
                <Link href="/refund" className="text-forest/75 hover:text-forest transition text-sm">Refund Policy</Link>
              </nav>
            </div>
            <div>
              <p className="eyebrow">Support</p>
              <nav className="mt-4 flex flex-col gap-2">
                <Link href="/contact" className="text-forest/75 hover:text-forest transition text-sm">Contact Us</Link>
                <a href="mailto:Ameerlunera@gmail.com" className="text-forest/75 hover:text-forest transition text-sm">Email Support</a>
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
