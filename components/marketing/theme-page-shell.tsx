import Link from "next/link";
import type { ReactNode } from "react";

type NavLink = {
  href: string;
  label: string;
};

export function ThemePageShell({
  eyebrow,
  title,
  subtitle,
  children
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/refund", label: "Refund" }
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#fff6fb_100%)] text-[#2d1b35]">
      <header className="sticky top-0 z-20 border-b border-[#f8b4d4] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold text-[#e91e8c]">
            Roop Veda&apos;s Face Yoga
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#5a4a6a] md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[#e91e8c]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/quiz"
            className="rounded-full bg-[#e91e8c] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(233,30,140,0.22)] transition hover:bg-[#c4177a]"
          >
            Start Quiz
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[30px] border border-[#f8b4d4] bg-[linear-gradient(135deg,#fff_0%,#fff3f9_55%,#fde4f0_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(233,30,140,0.1)] sm:px-10">
          <p className="inline-flex rounded-full border border-[#f8b4d4] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#e91e8c]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-[#2d1b35] sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#5a4a6a] sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </section>

        {children}

        <footer className="rounded-[28px] border border-[#f8b4d4] bg-[#fce4ec] px-6 py-8 text-sm text-[#7a5a70] shadow-[0_12px_36px_rgba(233,30,140,0.08)] sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Roop Veda&apos;s Face Yoga. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-[#e91e8c]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export function ThemeCard({
  title,
  children,
  accent = "white"
}: {
  title?: string;
  children: ReactNode;
  accent?: "white" | "pink" | "soft";
}) {
  const accentClass =
    accent === "pink"
      ? "bg-[linear-gradient(135deg,#fff5fb_0%,#fde4f0_100%)]"
      : accent === "soft"
        ? "bg-[#fdf6fa]"
        : "bg-white";

  return (
    <section
      className={`rounded-[26px] border border-[#f8b4d4] px-6 py-8 shadow-[0_18px_50px_rgba(233,30,140,0.08)] sm:px-10 ${accentClass}`}
    >
      {title ? (
        <h2 className="mb-5 text-2xl font-semibold text-[#2d1b35]">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}
