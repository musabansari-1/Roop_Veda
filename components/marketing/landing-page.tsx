import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Video } from "lucide-react";

const pillars = [
  {
    title: "Personalized quiz funnel",
    description:
      "Guide cold traffic into a clear next step with a short, mobile-first quiz that turns curiosity into intent.",
    icon: Sparkles
  },
  {
    title: "Secure subscription delivery",
    description:
      "Convert with Stripe, follow up through Resend, and unlock premium content in a protected private dashboard.",
    icon: ShieldCheck
  },
  {
    title: "Private video access",
    description:
      "Serve premium sessions through signed Google Cloud Storage URLs, never public files or exposed buckets.",
    icon: Video
  }
];

export function LandingPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <header className="surface flex items-center justify-between px-6 py-5">
          <div>
            <p className="eyebrow">Roop Veda</p>
            <p className="mt-2 text-sm text-forest/70">
              Quiz-driven transformation and premium private access.
            </p>
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
          >
            Start Quiz
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface bg-hero-radial px-6 py-10 sm:px-10">
            <p className="eyebrow">High-conversion funnel</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-forest sm:text-6xl">
              Turn quiz intent into paid access and long-term video retention.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-forest/75">
              Roop Veda combines an SEO landing page, a fast quiz, pixel and
              server-side attribution, Stripe checkout, and a private member
              dashboard in one production-ready flow.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quiz"
                className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
              >
                Start Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-forest/15 px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white/70"
              >
                See the funnel
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["3-7 step quiz", "Fast by design"],
                ["Meta Pixel + CAPI", "Deduped event tracking"],
                ["GCS signed URLs", "Private delivery only"]
              ].map(([title, caption]) => (
                <div
                  key={title}
                  className="rounded-[22px] border border-white/60 bg-white/60 px-4 py-5"
                >
                  <p className="font-semibold text-forest">{title}</p>
                  <p className="mt-2 text-sm text-forest/65">{caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div key={pillar.title} className="surface px-6 py-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember/10 text-ember">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-forest">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-forest/70">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="how-it-works"
          className="surface grid gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-5"
        >
          {[
            "SEO landing page",
            "Quiz experience",
            "Email capture",
            "Stripe payment",
            "Private dashboard"
          ].map((step, index) => (
            <div key={step} className="rounded-[24px] bg-white/65 p-5">
              <p className="text-sm font-semibold text-ember">
                Step {index + 1}
              </p>
              <p className="mt-3 text-lg font-semibold text-forest">{step}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
