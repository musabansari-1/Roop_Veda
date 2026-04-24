"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackBrowserMetaEvent } from "@/lib/meta/browser";

type SessionDetails = {
  email: string;
  amount: number;
  currency: string;
  planName: string;
};

export default function SetupPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState("");
  const [purchaseEventId, setPurchaseEventId] = useState("");
  const [details, setDetails] = useState<SessionDetails | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [queryReady, setQueryReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id") ?? "");
    setPurchaseEventId(params.get("purchase_event_id") ?? "");
    setQueryReady(true);
  }, []);

  useEffect(() => {
    if (!queryReady) {
      return;
    }

    async function loadSession() {
      if (!sessionId) {
        setError("Missing payment session ID.");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/checkout/session?sessionId=${sessionId}`);
      const data = (await response.json()) as SessionDetails & { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to verify your purchase.");
        setLoading(false);
        return;
      }

      setDetails({
        email: data.email,
        amount: data.amount,
        currency: data.currency,
        planName: data.planName
      });
      setLoading(false);
    }

    void loadSession();
  }, [queryReady, sessionId]);

  useEffect(() => {
    if (!details || !purchaseEventId) {
      return;
    }

    const marker = `purchase:${purchaseEventId}`;

    if (window.sessionStorage.getItem(marker)) {
      return;
    }

    window.sessionStorage.setItem(marker, "1");

    trackBrowserMetaEvent("Purchase", purchaseEventId, {
      value: details.amount / 100,
      currency: details.currency.toUpperCase()
    });
  }, [details, purchaseEventId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const response = await fetch("/api/auth/account-setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId,
        email: details?.email,
        password,
        confirmPassword
      })
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Unable to finish account setup.");
      setSubmitting(false);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="surface w-full max-w-2xl px-6 py-8 sm:px-8">
        <p className="eyebrow">Payment success</p>
        <h1 className="mt-4 font-display text-4xl text-forest">
          Finish account setup
        </h1>
        <p className="mt-3 text-sm leading-7 text-forest/70">
          Create your password to unlock the private dashboard immediately after
          payment.
        </p>

        {loading ? (
          <p className="mt-8 text-sm text-forest/70">Verifying your payment...</p>
        ) : details ? (
          <div className="mt-8 rounded-[28px] bg-mist px-5 py-5">
            <p className="text-sm text-forest/70">Plan confirmed</p>
            <p className="mt-2 text-lg font-semibold text-forest">
              {details.planName}
            </p>
            <p className="mt-1 text-sm text-forest/70">{details.email}</p>
          </div>
        ) : null}

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input type="email" value={details?.email ?? ""} disabled />
          <Input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create password"
          />
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" fullWidth disabled={submitting || loading}>
            {submitting ? "Creating your account..." : "Create account and continue"}
          </Button>
        </form>
      </div>
    </main>
  );
}
