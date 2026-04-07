"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Unable to log in.");
      setSubmitting(false);
      return;
    }

    const nextPath =
      new URLSearchParams(window.location.search).get("next") ?? "/dashboard";

    router.push(nextPath);
  }
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="surface w-full max-w-lg px-6 py-8 sm:px-8">
        <p className="eyebrow">Account access</p>
        <h1 className="mt-4 font-display text-4xl text-forest">Log in</h1>
        <p className="mt-3 text-sm leading-7 text-forest/70">
          Use the email and password you created after checkout.
        </p>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? "Logging you in..." : "Log in"}
          </Button>
        </form>
        <div className="mt-6 flex justify-between text-sm text-forest/70">
          <Link href="/forgot-password" className="underline underline-offset-4">
            Forgot password?
          </Link>
          <Link href="/quiz" className="underline underline-offset-4">
            Start new quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
