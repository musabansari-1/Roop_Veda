"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
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
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="surface px-6 py-8 sm:px-8">
          <p className="eyebrow">Plans</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-4xl text-forest">
                Choose the best next step for your transformation.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-forest/70">
                {email
                  ? `Your quiz recommendations are saved for ${email}.`
                  : "Your plan recommendations are ready. Select the offer that fits your momentum best."}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ember/80">
                Local development can continue without Stripe when bypass checkout is enabled.
              </p>
            </div>
            {!leadId ? (
              <Link
                href="/quiz"
                className="text-sm font-semibold text-forest underline underline-offset-4"
              >
                Complete the quiz first
              </Link>
            ) : null}
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <section
              key={plan.id}
              className={`surface flex flex-col px-6 py-7 ${
                plan.highlight ? "border-ember/25 ring-2 ring-ember/10" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">
                    {plan.tagline}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-forest">
                    {plan.name}
                  </h2>
                </div>
                {plan.highlight ? (
                  <span className="rounded-full bg-ember/10 px-3 py-1 text-xs font-semibold text-ember">
                    {plan.highlight}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-forest/70">
                {plan.description}
              </p>
              <p className="mt-6 font-display text-5xl text-forest">
                {formatCurrency(plan.amount, plan.currency)}
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-forest/75">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-2xl bg-mist px-4 py-3">
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  fullWidth
                  onClick={() => handlePlanSelection(plan.id)}
                  disabled={pendingPlanId === plan.id}
                >
                  {pendingPlanId === plan.id
                    ? "Opening secure checkout..."
                    : "Continue to payment"}
                </Button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
