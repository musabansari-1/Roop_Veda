"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  QUIZ_ANSWERS_STORAGE_KEY,
  readAttribution,
  setActiveLead
} from "@/lib/meta/attribution";
import {
  createEventId,
  trackBrowserMetaEvent,
  trackServerMetaEvent
} from "@/lib/meta/browser";

const questions = [
  {
    id: "goal",
    prompt: "What brought you here today?",
    answers: [
      "I want a guided transformation plan",
      "I need clarity before I buy",
      "I want premium video support",
      "I need a routine that fits my schedule"
    ]
  },
  {
    id: "timeline",
    prompt: "How soon do you want results to feel visible?",
    answers: ["This week", "This month", "Within 90 days", "I want lasting change"]
  },
  {
    id: "routine",
    prompt: "How much time can you realistically commit each day?",
    answers: ["5 minutes", "10-15 minutes", "20-30 minutes", "Flexible sessions"]
  },
  {
    id: "support",
    prompt: "What kind of support helps you stay consistent?",
    answers: [
      "Simple bite-sized videos",
      "A full step-by-step system",
      "Gentle reminders and follow-up",
      "A premium all-in-one dashboard"
    ]
  },
  {
    id: "purchase",
    prompt: "Which option sounds closest to what you want next?",
    answers: [
      "A lower-risk starter plan",
      "The most complete experience",
      "One-time lifetime access",
      "I want to compare a few options"
    ]
  }
];

export function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventId = createEventId();
    const attribution = readAttribution();
    const eventSourceUrl = window.location.href;

    trackBrowserMetaEvent("ViewContent", eventId, { content_name: "quiz" });
    void trackServerMetaEvent({
      eventName: "ViewContent",
      eventId,
      eventSourceUrl,
      attribution: attribution ?? undefined,
      customData: {
        source: attribution?.source
      }
    });
  }, []);

  const currentQuestion = questions[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / questions.length) * 100),
    [step]
  );

  function handleAnswer(answer: string) {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };

    setAnswers(nextAnswers);
    window.localStorage.setItem(
      QUIZ_ANSWERS_STORAGE_KEY,
      JSON.stringify(nextAnswers)
    );

    if (step === questions.length - 1) {
      setShowEmailCapture(true);
      return;
    }

    setStep((value) => value + 1);
  }

  async function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const eventId = createEventId();
    const attribution = readAttribution();
    const eventSourceUrl = window.location.href;

    trackBrowserMetaEvent("Lead", eventId, {
      content_name: "quiz_email_capture"
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          quizAnswers: answers,
          eventId,
          eventSourceUrl,
          attribution
        })
      });

      const data = (await response.json()) as { error?: string; leadId?: string };

      if (!response.ok || !data.leadId) {
        throw new Error(data.error ?? "Failed to save your lead.");
      }

      setActiveLead({
        leadId: data.leadId,
        email
      });

      router.push(`/plans?leadId=${data.leadId}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn’t save your details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="surface px-6 py-5">
          <p className="eyebrow">Quiz entry</p>
          <div className="mt-4 h-2 rounded-full bg-forest/10">
            <div
              className="h-2 rounded-full bg-ember transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-forest/70">
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <span>{progress}% complete</span>
          </div>
        </div>

        <section className="surface px-6 py-8 sm:px-8">
          <p className="eyebrow">Personalization step</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest">
            {currentQuestion.prompt}
          </h1>
          <div className="mt-8 grid gap-4">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer}
                type="button"
                onClick={() => handleAnswer(answer)}
                className="rounded-[24px] border border-forest/10 bg-white px-5 py-5 text-left text-base font-medium text-forest transition hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-glow"
              >
                {answer}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-20 transition-transform duration-300 ${
          showEmailCapture ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-4xl rounded-t-[32px] border border-white/70 bg-white px-6 py-8 shadow-2xl sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">One last step</p>
              <h2 className="mt-3 font-display text-3xl text-forest">
                Unlock your personalized plan and pricing.
              </h2>
              <p className="mt-3 text-sm leading-7 text-forest/70">
                Enter your email to continue to plan selection and receive your
                purchase link.
              </p>
            </div>
          </div>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleLeadSubmit}>
            <Input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? "Saving your progress..." : "Continue to plans"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
