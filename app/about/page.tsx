import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Smile,
  Zap,
  Users,
  Leaf
} from "lucide-react";

import {
  ThemeCard,
  ThemePageShell
} from "@/components/marketing/theme-page-shell";

const values = [
  {
    icon: Smile,
    title: "Simple & Easy-to-Follow",
    description: "Programs designed for clarity and ease of implementation."
  },
  {
    icon: Zap,
    title: "Accessible Anywhere",
    description: "Learn at your own pace, anytime, from anywhere."
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Whether you're a beginner or regular practitioner."
  },
  {
    icon: Leaf,
    title: "Natural Approach",
    description: "Focused on natural beauty and wellness practices."
  },
  {
    icon: Shield,
    title: "Commitment to Quality",
    description: "Continuous content improvements and updates."
  },
  {
    icon: ArrowRight,
    title: "User Experience First",
    description: "Everything designed with your convenience in mind."
  }
];

export default function AboutPage() {
  return (
    <ThemePageShell
      eyebrow="Learn About Us"
      title="About Creative Technologies"
      subtitle="Transforming facial wellness through accessible, modern digital solutions."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <ThemeCard title="Our Story" accent="pink">
          <div className="space-y-4 text-base leading-8 text-[#5a4a6a]">
            <p>
              Creative Technologies is a digital-first brand focused on
              delivering modern, accessible, and effective solutions in the
              beauty and personal care space.
            </p>
            <p>
              We specialize in Face Yoga and skincare-based digital programs
              designed to help individuals improve facial wellness, confidence,
              and self-care routines from the comfort of their homes.
            </p>
          </div>
        </ThemeCard>

        <ThemeCard title="Our Mission" accent="soft">
          <div className="space-y-4 text-base leading-8 text-[#5a4a6a]">
            <p>
              To make natural beauty and self-care practices easy, affordable,
              and accessible to everyone through structured digital learning.
            </p>
            <p className="border-l-4 border-[#e91e8c] pl-4 italic text-[#7a5a70]">
              We aim to bridge the gap between traditional beauty practices and
              modern digital convenience.
            </p>
          </div>
        </ThemeCard>
      </div>

      <ThemeCard title="What We Provide">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            "Guided Video Programs",
            "Easy-to-Follow Routines",
            "Structured Content",
            "Secure Dashboard Access"
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-[22px] border border-[#f8b4d4] bg-[#fff7fb] p-5"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fde4f0] font-bold text-[#e91e8c]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2d1b35]">{item}</h3>
                  <p className="mt-1 text-sm leading-7 text-[#5a4a6a]">
                    Designed to make your daily beauty practice more structured,
                    premium and accessible.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ThemeCard>

      <ThemeCard title="Why Choose Creative Technologies" accent="pink">
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[22px] border border-[#f8b4d4] bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fde4f0] text-[#e91e8c]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#2d1b35]">
                  {item.title}
                </h3>
                <p className="text-[#5a4a6a]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </ThemeCard>

      <ThemeCard title="Our Approach" accent="soft">
        <div className="space-y-4 text-base leading-8 text-[#5a4a6a]">
          <p>
            We believe <span className="font-semibold text-[#2d1b35]">consistency is key</span>.
            Our programs are designed to encourage daily habits, promote natural
            facial care techniques, and deliver practical routines you can
            follow anywhere.
          </p>
          <p className="border-l-4 border-[#f8b4d4] pl-4 italic text-[#7a5a70]">
            We do not believe in complicated systems, only effective,
            repeatable practices.
          </p>
        </div>
      </ThemeCard>

      <ThemeCard title="Important Disclaimer" accent="pink">
        <div className="space-y-3 text-base leading-8 text-[#5a4a6a]">
          <p>
            Our content is intended for educational and informational purposes
            only.
          </p>
          <p>We do not provide medical advice, diagnosis, or treatment.</p>
          <p>Results may vary from person to person.</p>
        </div>
      </ThemeCard>

      <ThemeCard title="Ready to Start Your Journey?" accent="soft">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-base leading-8 text-[#5a4a6a]">
            Join our community and discover the power of Face Yoga with our
            guided programs designed just for you.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-full bg-[#e91e8c] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(233,30,140,0.22)] transition hover:bg-[#c4177a]"
          >
            Take the Quiz
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </ThemeCard>
    </ThemePageShell>
  );
}
