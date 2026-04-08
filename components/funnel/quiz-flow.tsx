"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Shield, Lock } from "lucide-react";

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

interface Answer {
  label: string;
  value: string;
  image?: string;
}

interface Question {
  id: string;
  prompt: string;
  subPrompt?: string;
  type: "gender" | "single-choice" | "multi-choice";
  answers: (string | Answer)[];
}

const questions: Question[] = [
  {
    id: "gender",
    prompt: "Would you like to eliminate wrinkles, hooded eyelids, neck lines & look 10 years younger?",
    subPrompt: "Select Your Gender",
    type: "gender",
    answers: [
      { 
        label: "👨 Male", 
        value: "male",
        image: "https://promo.faceyoga.com/_next/image?url=https%3A%2F%2Fcdn.hoola.com%2Ffaceyoga-cms%2F1765369700175_1760430171864_thumbnail_man_c6dc188129.webp&w=1200&q=75"
      },
      { 
        label: "👩 Female", 
        value: "female",
        image: "https://promo.faceyoga.com/_next/image?url=https%3A%2F%2Fcdn.hoola.com%2Ffaceyoga-cms%2F1765369692185_1760430181414_thumbnail_woman_288a247836.webp&w=1200&q=75"
      }
    ]
  },
  {
    id: "age",
    prompt: "What's your age range?",
    type: "single-choice",
    answers: [
      "18-25",
      "26-35",
      "36-45",
      "46-55",
      "56-65",
      "65+"
    ]
  },
  {
    id: "concerns",
    prompt: "Which skin concerns bother you the most?",
    type: "multi-choice",
    answers: [
      "👀 Fine lines & wrinkles",
      "😞 Sagging skin",
      "🎀 Double chin",
      "😐 Forehead wrinkles",
      "👃 Nasolabial folds",
      "👂 Jawline definition",
      "🌟 Overall skin tightness",
      "💫 All of the above"
    ]
  },
  {
    id: "timeline",
    prompt: "How soon would you like to see noticeable results?",
    type: "single-choice",
    answers: [
      "⚡ ASAP (within 2 weeks)",
      "📅 Within 1 month",
      "🎯 Within 3 months",
      "🚀 I'm committed for long-term"
    ]
  },
  {
    id: "commitment",
    prompt: "How much time can you dedicate daily?",
    type: "single-choice",
    answers: [
      "⏱️ 5-10 minutes",
      "🕐 10-15 minutes",
      "⏰ 15-20 minutes",
      "⏳ 20+ minutes"
    ]
  },
  {
    id: "experience",
    prompt: "Have you tried face yoga before?",
    type: "single-choice",
    answers: [
      "🆕 No, this is my first time",
      "🤔 I tried it but didn't stick with it",
      "✨ Yes, and I loved it!",
      "📚 I'm familiar with it"
    ]
  },
  {
    id: "purchase",
    prompt: "Which option sounds closest to what you want next?",
    type: "single-choice",
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
    <main className="min-h-screen bg-gradient-to-b from-forest/5 to-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {/* Progress Bar */}
        <div className="sticky top-0 z-10 -mx-4 -mt-6 mb-4 bg-white px-4 py-4 shadow-sm sm:-mx-6 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="h-1 rounded-full bg-forest/10">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-ember to-amber-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-forest/60">
              <span>
                Step {step + 1} of {questions.length}
              </span>
              <span className="font-semibold text-forest">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-xs text-forest/70">
            <Shield className="h-4 w-4 text-ember" />
            <span>Your data is secure with us</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-forest/70">
            <Lock className="h-4 w-4 text-ember" />
            <span>SSL Encrypted</span>
          </div>
        </div>

        <section className="surface px-6 py-8 sm:px-8">
          <p className="eyebrow">Personalization step</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest">
            {currentQuestion.prompt}
          </h1>
          
          {currentQuestion.subPrompt && (
            <p className="mt-6 text-sm font-medium text-forest/70">
              {currentQuestion.subPrompt}
            </p>
          )}

          <div className="mt-8 grid gap-4">
            {currentQuestion.type === "gender" ? (
              // Gender image selection
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {(currentQuestion.answers as Answer[]).map((answer) => (
                  <button
                    key={answer.value}
                    type="button"
                    onClick={() => handleAnswer(answer.value)}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                      answers[currentQuestion.id] === answer.value
                        ? "border-ember shadow-glow"
                        : "border-forest/10 hover:border-ember/40"
                    }`}
                  >
                    <div className="aspect-video overflow-hidden bg-forest/5">
                      <img
                        src={answer.image}
                        alt={answer.label}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-white px-4 py-3 text-center">
                      <p className="text-base font-semibold text-forest">
                        {answer.label}
                      </p>
                    </div>
                    {answers[currentQuestion.id] === answer.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-ember/10 rounded-2xl">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember text-white">
                          ✓
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : currentQuestion.type === "multi-choice" ? (
              // Multi-choice selection
              <div className="space-y-3">
                {(currentQuestion.answers as string[]).map((answer) => (
                  <button
                    key={answer}
                    type="button"
                    onClick={() => {
                      const current = answers[currentQuestion.id]?.split(",") || [];
                      const updated = current.includes(answer)
                        ? current.filter((a) => a !== answer)
                        : [...current, answer];
                      handleAnswer(updated.join(","));
                    }}
                    className={`w-full rounded-2xl border-2 px-5 py-4 text-left font-medium transition-all duration-200 ${
                      answers[currentQuestion.id]?.includes(answer)
                        ? "border-ember bg-ember/5 text-forest shadow-glow"
                        : "border-forest/10 bg-white text-forest hover:border-ember/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{answer}</span>
                      {answers[currentQuestion.id]?.includes(answer) && (
                        <span className="text-lg">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // Single choice selection
              <div className="space-y-3">
                {(currentQuestion.answers as string[]).map((answer) => (
                  <button
                    key={answer}
                    type="button"
                    onClick={() => handleAnswer(answer)}
                    className={`w-full rounded-2xl border-2 px-5 py-4 text-left font-medium transition-all duration-200 ${
                      answers[currentQuestion.id] === answer
                        ? "border-ember bg-ember/5 text-forest shadow-glow"
                        : "border-forest/10 bg-white text-forest hover:border-ember/40"
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            )}
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
