import Stripe from "stripe";

import { env, requireEnv } from "@/lib/env";

let stripeInstance: Stripe | null = null;

export function getStripeServer() {
  if (!stripeInstance) {
    stripeInstance = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2024-04-10"
    });
  }

  return stripeInstance;
}

export function hasStripe() {
  return Boolean(env.STRIPE_SECRET_KEY);
}
