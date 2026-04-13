"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { getActiveLead, readAttribution } from "@/lib/meta/attribution";
import { createEventId, trackBrowserMetaEvent } from "@/lib/meta/browser";
import { pricingPlans } from "@/lib/stripe/plans";
import { formatCurrency } from "@/lib/utils";

type PlansGridProps = {
  initialLeadId?: string | null;
};

export function PlansGrid({ initialLeadId }: PlansGridProps) {
  const router = useRouter();
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeLead = useMemo(() => getActiveLead(), []);
  const leadId = initialLeadId ?? activeLead?.leadId ?? null;
  const email = activeLead?.email ?? null;

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

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#fff6fb_100%)] px-4 py-8 text-[#2d1b35] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[34px] border border-[#f8b4d4] bg-[linear-gradient(135deg,#fff_0%,#fff3f9_55%,#fde4f0_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(233,30,140,0.1)] sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#f8b4d4] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#e91e8c]">
                Pricing
              </p>
              <h1 className="mt-5 font-display text-4xl leading-tight text-[#2d1b35] sm:text-5xl">
                Choose the best next step for your transformation
              </h1>
              <p className="mt-4 text-base leading-8 text-[#5a4a6a] sm:text-lg">
                {email
                  ? `Your quiz recommendations are saved for ${email}. Pick the plan that feels right for your glow journey.`
                  : "Your plan recommendations are ready. Select the offer that fits your momentum best."}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c4177a]/80">
                Secure checkout powered by your existing payment flow
              </p>
            </div>

            {!leadId ? (
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full border border-[#e91e8c] px-5 py-3 text-sm font-semibold text-[#e91e8c] transition hover:bg-[#e91e8c] hover:text-white"
              >
                Complete the quiz first
              </Link>
            ) : null}
          </div>

          {error ? (
            <div className="mt-6 rounded-[20px] border border-[#f3a8c9] bg-[#fff5fa] px-5 py-4 text-sm text-[#a02b67]">
              {error}
            </div>
          ) : null}
        </header>

        <section className="mt-8 rounded-[30px] border border-[#f8b4d4] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(233,30,140,0.08)] sm:px-10">
          <h2 className="text-center text-2xl font-semibold text-[#2d1b35]">
            Your Personalized Package Includes
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Customized daily facial workout plan",
              "Premium library of anti-aging face yoga routines",
              "Expert glow-focused guidance",
              "Simple dashboard access after purchase",
              "Step-by-step video support",
              "Designed for natural, consistent progress"
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[18px] border border-[#f8b4d4] bg-[#fff7fb] px-4 py-4 text-sm font-medium text-[#5a4a6a]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981] text-xs font-bold text-white">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const isFeatured = Boolean(plan.highlight);
            const isPending = pendingPlanId === plan.id;

            return (
              <section
                key={plan.id}
                className={`relative overflow-hidden rounded-[30px] border transition-all duration-300 ${
                  isFeatured
                    ? "scale-[1.02] border-[#e91e8c] bg-[linear-gradient(180deg,#fff_0%,#fff0f7_100%)] shadow-[0_24px_70px_rgba(233,30,140,0.18)]"
                    : "border-[#f8b4d4] bg-white shadow-[0_18px_50px_rgba(233,30,140,0.08)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(233,30,140,0.14)]"
                }`}
              >
                {isFeatured ? (
                  <div className="absolute right-[-34px] top-5 rotate-45 bg-[#f59e0b] px-10 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    Most Loved
                  </div>
                ) : null}

                <div
                  className="px-6 py-5 text-white"
                  style={{
                    background: isFeatured
                      ? "linear-gradient(135deg, #ff6b9d 0%, #e91e8c 55%, #c4177a 100%)"
                      : "linear-gradient(135deg, #ff8db6 0%, #e91e8c 100%)"
                  }}
                >
                  <span className="inline-flex rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                    {plan.tagline}
                  </span>
                </div>

                <div className="flex h-full flex-col px-6 py-7">
                  <h2 className="text-3xl font-bold text-[#2d1b35]">
                    {plan.name}
                  </h2>
                  <p className="mt-3 min-h-[72px] text-sm leading-7 text-[#5a4a6a]">
                    {plan.description}
                  </p>

                  <div className="mt-6 border-t border-[#f8b4d4] pt-6">
                    <p className="text-sm font-medium text-[#9a8aaa] line-through">
                      {formatCurrency(Math.round(plan.amount * 1.5), plan.currency)}
                    </p>
                    <p className="mt-1 text-5xl font-black leading-none text-[#e91e8c]">
                      {formatCurrency(plan.amount, plan.currency)}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a8aaa]">
                      Secure one-time payment
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-3 rounded-[18px] border border-[#f8b4d4] bg-[#fff7fb] px-4 py-3 text-sm leading-7 text-[#5a4a6a]"
                      >
                        <span className="mt-1 text-[#e91e8c]">✦</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handlePlanSelection(plan.id)}
                    disabled={isPending}
                    className={`mt-8 w-full rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] transition ${
                      isFeatured
                        ? "bg-[linear-gradient(135deg,#ff6b9d_0%,#e91e8c_50%,#c4177a_100%)] text-white shadow-[0_12px_34px_rgba(233,30,140,0.3)] hover:opacity-95"
                        : "bg-[#e91e8c] text-white shadow-[0_10px_30px_rgba(233,30,140,0.22)] hover:bg-[#c4177a]"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {isPending ? "Opening Secure Checkout..." : "Continue to Payment"}
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
