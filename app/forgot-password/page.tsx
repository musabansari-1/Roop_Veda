"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setStatus(data.message ?? data.error ?? "Please try again.");
    setSubmitting(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="surface w-full max-w-lg px-6 py-8 sm:px-8">
        <p className="eyebrow">Password reset</p>
        <h1 className="mt-4 font-display text-4xl text-forest">
          Reset your password
        </h1>
        <p className="mt-3 text-sm leading-7 text-forest/70">
          We’ll email you a secure reset link through Resend.
        </p>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? "Sending reset link..." : "Send reset link"}
          </Button>
        </form>
        {status ? <p className="mt-4 text-sm text-forest/70">{status}</p> : null}
      </div>
    </main>
  );
}
