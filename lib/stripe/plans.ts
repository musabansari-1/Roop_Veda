import { env } from "@/lib/env";

export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  amount: number;
  currency: string;
  benefits: string[];
  highlight?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "clarity-reset",
    name: "Clarity Reset",
    tagline: "A fast, focused start",
    description:
      "Perfect for first-time buyers who want a guided kickoff with the quiz-based plan.",
    amount: 4900,
    currency: env.NEXT_PUBLIC_DEFAULT_CURRENCY,
    benefits: [
      "Personalized quiz recommendation",
      "Core starter video path",
      "Mobile-friendly dashboard access"
    ]
  },
  {
    id: "signature-ritual",
    name: "Signature Ritual",
    tagline: "Most popular",
    description:
      "The highest-converting path for users who want the full guided experience and the deepest transformation plan.",
    amount: 9900,
    currency: env.NEXT_PUBLIC_DEFAULT_CURRENCY,
    highlight: "Best Value",
    benefits: [
      "Everything in Clarity Reset",
      "Extended transformation video library",
      "Priority support and access emails"
    ]
  },
  {
    id: "lifetime-sanctuary",
    name: "Lifetime Sanctuary",
    tagline: "Pay once, revisit anytime",
    description:
      "One-time access for repeat viewing, refreshers, and future private library additions.",
    amount: 19900,
    currency: env.NEXT_PUBLIC_DEFAULT_CURRENCY,
    benefits: [
      "Everything in Signature Ritual",
      "Lifetime dashboard access",
      "Future library releases included"
    ]
  }
];

export function getPlanById(planId: string) {
  return pricingPlans.find((plan) => plan.id === planId);
}
