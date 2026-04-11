"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
import TopBar from "./top-bar";

const QUESTIONS = [
  {
    id: 0,
    question: "Would you like to eliminate wrinkles, hooded eyelids, neck lines & look 10 years younger?",
    type: "gender",
    options: [
      { label: "👨 Male",   value: "male",   img: "https://cdn.hoola.com/faceyoga-cms/1765369700175_1760430171864_thumbnail_man_c6dc188129.webp" },
      { label: "👩 Female", value: "female", img: "https://cdn.hoola.com/faceyoga-cms/1765369692185_1760430181414_thumbnail_woman_288a247836.webp" },
    ],
  // Removed subquestion
  },
  {
    id: 1,
    question: "What is your age?",
    type: "single",
    options: [
      { emoji: "🌱", label: "18-24" },
      { emoji: "✨", label: "25-34" },
      { emoji: "🌸", label: "35-44" },
      { emoji: "🌺", label: "45-54" },
      { emoji: "🌻", label: "55-64" },
      { emoji: "🍀", label: "65+" },
    ],
  },
  {
    id: 2,
    question: "Which areas concern you the most?",
    type: "multi",
    options: [
      { emoji: "👁️",  label: "Hooded / droopy eyelids" },
      { emoji: "😮",  label: "Sagging cheeks & jowls" },
      { emoji: "💋",  label: "Lip lines & thinning lips" },
      { emoji: "😤",  label: "Double chin & neck lines" },
      { emoji: "😑",  label: "Forehead wrinkles" },
      { emoji: "🙁",  label: "Nasolabial folds (smile lines)" },
    ],
  },
  {
    id: 3,
    question: "How would you describe your current skin condition?",
    type: "single",
    options: [
      { emoji: "🌟", label: "Firm and elastic" },
      { emoji: "💧", label: "Slightly loose" },
      { emoji: "😕", label: "Noticeably sagging" },
      { emoji: "😟", label: "Very loose and wrinkled" },
    ],
  },
  {
    id: 4,
    question: "Have you tried any face exercises or routines before?",
    type: "single",
    options: [
      { emoji: "✅", label: "Yes, regularly" },
      { emoji: "🔄", label: "A few times" },
      { emoji: "❌", label: "Never" },
    ],
  },
  {
    id: 5,
    question: "How much time can you dedicate daily to face yoga?",
    type: "single",
    options: [
      { emoji: "⏱️", label: "5 minutes" },
      { emoji: "🕐", label: "10 minutes" },
      { emoji: "🕕", label: "15-20 minutes" },
      { emoji: "🏆", label: "30+ minutes" },
    ],
  },
  {
    id: 6,
    question: "What is your primary goal with Face Yoga?",
    type: "single",
    options: [
      { emoji: "⏪", label: "Look younger" },
      { emoji: "💪", label: "Tone & firm facial muscles" },
      { emoji: "😌", label: "Reduce stress & relax" },
      { emoji: "✨", label: "Improve skin glow" },
      { emoji: "🎯", label: "All of the above" },
    ],
  },
  {
    id: 7,
    question: "How did you hear about Face Yoga?",
    type: "single",
    options: [
      { emoji: "📱", label: "Social media" },
      { emoji: "👭", label: "Friend or family" },
      { emoji: "📰", label: "Article or blog" },
      { emoji: "📺", label: "TV or podcast" },
      { emoji: "🔍", label: "Online search" },
    ],
  },
  {
    id: 8,
    question: "Have you heard about Face Yoga before?",
    type: "single",
    options: [
      { emoji: "🧘‍♂️", label: "Yes" },
      { emoji: "🤏", label: "I have heard a little bit" },
      { emoji: "🤔", label: "No" },
    ],
  },
  {
    id: 9,
    question: "Choose your skin type",
    type: "multi",
    options: [
      { emoji: "🧘‍♀️", label: "Normal" },
      { emoji: "🌵", label: "Dry" },
      { emoji: "⚡️", label: "Sensitive" },
      { emoji: "🥑", label: "Oily" },
      { emoji: "🤏", label: "Combination" },
      { emoji: "🤷‍♂️", label: "Not sure" },
    ],
  },
  {
    id: 10,
    question: "Do you have any of the following skin concerns?",
    type: "multi",
    subLabel: "Select all that apply",
    options: [
      { emoji: "🫣", label: "Acne" },
      { emoji: "🌵", label: "Dryness" },
      { emoji: "👤", label: "Neck lines" },
      { emoji: "🥹", label: "Hooded eyelids" },
      { emoji: "🗿", label: "Wrinkles" },
      { emoji: "🥑", label: "Oiliness" },
      { emoji: "⚫️", label: "Dark spots" },
      { emoji: "✅", label: "None of the above" },
    ],
  },
  {
    id: 11,
    question: "How would you describe your skin's sensitivity level?",
    type: "single",
    options: [
      { emoji: "⚡️", label: "Very sensitive" },
      { emoji: "🤏", label: "Moderately sensitive" },
      { emoji: "🔅", label: "Not sensitive" },
      { emoji: "🤷‍♂️", label: "Not sure" },
    ],
  },
  {
    id: 12,
    question: "Have you noticed any loss of elasticity or firmness in your skin?",
    type: "single",
    options: [
      { emoji: "👍", label: "Yes" },
      { emoji: "👎", label: "No" },
      { emoji: "🤷‍♂️", label: "Not sure" },
    ],
  },
  {
    id: 13,
    question: "Worried about results? Over 45,132 people improved their skin condition with Face Yoga",
    type: "info",
    beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
    afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
    caption: "See how your face can change in just a few weeks!",
  },
  {
    id: 14,
    question: "How many hours do you sleep on average per night?",
    type: "single",
    options: [
      { emoji: "😴️", label: "Less than 6 hours" },
      { emoji: "💤", label: "6-8 hours" },
      { emoji: "🛌", label: "More than 8 hours" },
    ],
  },
  {
    id: 15,
    question: "How would you rate your daily stress level?",
    type: "single",
    options: [
      { emoji: "🌿", label: "Low" },
      { emoji: "⚖️", label: "Moderate" },
      { emoji: "💥", label: "High" },
    ],
  },
  {
    id: 16,
    question: "What is your daily water intake?",
    type: "single",
    options: [
      { emoji: "💧", label: "1-2 glasses a day" },
      { emoji: "🥤", label: "2-6 glasses a day" },
      { emoji: "🌊", label: "More than 6 glasses" },
    ],
  },
  {
    id: 17,
    question: "Do you smoke?",
    type: "single",
    options: [
      { emoji: "🚬", label: "Yes" },
      { emoji: "🚭", label: "No" },
    ],
  },
  {
    id: 18,
    question: "How often do you consume alcohol?",
    type: "single",
    options: [
      { emoji: "🍷", label: "Almost daily" },
      { emoji: "🍸", label: "A few times a week" },
      { emoji: "🥂", label: "A few times a month" },
      { emoji: "🙅", label: "Almost never" },
    ],
  },
  {
    id: 19,
    question: "How often do you exercise?",
    type: "single",
    options: [
      { emoji: "🚴‍♂️", label: "Daily" },
      { emoji: "🤸‍♂️", label: "A few times a week" },
      { emoji: "🗓", label: "Rarely" },
      { emoji: "🙅", label: "Almost never" },
    ],
  },
  {
    id: 20,
    question: "Do you use sunscreen regularly?",
    type: "single",
    options: [
      { emoji: "👍", label: "Yes" },
      { emoji: "👎", label: "No" },
    ],
  },
  {
    id: 21,
    question: "How often do you cleanse and moisturize your face?",
    type: "single",
    options: [
      { emoji: "👌", label: "More than once a day" },
      { emoji: "🤞", label: "Once a day" },
      { emoji: "✌️", label: "A few times a week" },
      { emoji: "🙅", label: "Never" },
    ],
  },
  {
    id: 22,
    question: "How often do you visit a cosmetologist?",
    type: "single",
    options: [
      { emoji: "👌", label: "Once per month or more" },
      { emoji: "✌️", label: "Once in several months" },
      { emoji: "🤞", label: "Once a year" },
      { emoji: "🙅", label: "Never" },
    ],
  },
  {
    id: 23,
    question: "How would you describe your diet?",
    type: "single",
    options: [
      { emoji: "⚖️", label: "Balanced" },
      { emoji: "🥦", label: "Vegetarian/Vegan" },
      { emoji: "🥫", label: "Inconsistent" },
      { emoji: "🍔", label: "High in processed foods" },
      { emoji: "🥩", label: "High-protein" },
      { emoji: "🍲", label: "Other" },
    ],
  },
  {
    id: 24,
    question: "Do you experience any recurring facial discomforts such as jaw clenching, teeth grinding, or frequent headaches?",
    type: "single",
    options: [
      { emoji: "👍", label: "Yes" },
      { emoji: "👎", label: "No" },
      { emoji: "🤷‍♂️", label: "Not sure" },
    ],
  },
  {
    id: 25,
    question: "How many hours per day do you spend in front of screens (computer, phone, tablet, etc.)?",
    type: "single",
    options: [
      { emoji: "🤏", label: "Less than 2 hours" },
      { emoji: "🕑", label: "2-5 hours" },
      { emoji: "🕓", label: "5-8 hours" },
      { emoji: "⏳", label: "More than 8 hours" },
    ],
  },
  {
    id: 26,
    question: "How often do you experience facial tension or discomfort?",
    type: "single",
    options: [
      { emoji: "😩", label: "Often" },
      { emoji: "😬", label: "Sometimes" },
      { emoji: "🙄", label: "Rarely" },
      { emoji: "🙅", label: "Never" },
    ],
  },
  {
    id: 27,
    question: "What is your name?",
    type: "text",
    placeholder: "First Name",
  },
  {
    id: 28,
    question: "What is your age?",
    type: "number",
    placeholder: "Age",
  },
  {
    id: 29,
    question: "You have great potential to crush your goals!",
    type: "info",
    beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
    afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
    caption: "See how your face can change in just a few weeks!",
  },
  {
    id: 30,
    question: "How much time are you willing to dedicate to Face Yoga daily?",
    type: "single",
    options: [
      { emoji: "🤏", label: "Less than 5 minutes" },
      { emoji: "✌️", label: "5-10 minutes" },
      { emoji: "🙌", label: "More than 10 minutes" },
    ],
  },
  {
    id: 31,
    question: "What are your main goals for practicing face yoga?",
    type: "multi",
    subLabel: "Select all that apply",
    options: [
      { emoji: "👸", label: "Improve skin appearance" },
      { emoji: "🧏‍♀️", label: "Fix hooded eyelids" },
      { emoji: "👧", label: "Look younger" },
      { emoji: "👩", label: "Reduce wrinkles" },
      { emoji: "👱‍♀️", label: "Eliminate double-chin" },
      { emoji: "☝️", label: "All of the above" },
    ],
  },
  {
    id: 32,
    question: "Once you reach perfect skin with Face Yoga, how would you see yourself?",
    type: "single",
    options: [
      { emoji: "👍", label: "Being proud of myself" },
      { emoji: "🥰", label: "Feeling sexier" },
      { emoji: "👑", label: "More confident" },
      { emoji: "☝️", label: "All of the above" },
    ],
  },
  {
    id: 33,
    question: "After reaching your goal, how would you reward yourself?",
    type: "single",
    options: [
      { emoji: "👗", label: "Buying new clothes" },
      { emoji: "✈️", label: "Travelling somewhere new" },
      { emoji: "😎", label: "Taking a personal day" },
      { emoji: "📸", label: "Taking more pictures" },
      { emoji: "🥂", label: "Fun hang-out with friends" },
      { emoji: "🎁", label: "Other" },
    ],
  },
  {
    id: 34,
    question: "We predict you will enjoy skin that looks younger and has less facial fat in two weeks!",
    type: "info",
    beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
    afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283738603_female-after.b483bbc117cb9f38e0ec.webp",
    caption: "See how your face can change in just a few weeks!",
  },
];

const TOTAL_STEPS = QUESTIONS.length;

// Sub-components
function GenderStep({ onSelect, subAnswer, setSubAnswer }: {
  onSelect: (val: any) => void;
  subAnswer: string | null;
  setSubAnswer: (val: string | null) => void;
}) {
  const q = QUESTIONS[0] as any;
  const [selected, setSelected] = useState<string | null>(null);
  const handleGender = (val: string) => {
    if (!selected) {
      setSelected(val);
      setTimeout(() => onSelect(val), 300);
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {q.options && q.options.map((opt: any) => (
          <button
            key={opt.value}
            className={`rounded-2xl border-2 p-3 text-center transition-all bg-white ${
              selected === opt.value
                ? "border-ember bg-sand/20 shadow-lg"
                : "border-mist hover:border-ember/40"
            }`}
            onClick={() => handleGender(opt.value)}
            disabled={!!selected}
          >
            <img src={opt.img} alt={opt.label} className="w-full h-40 object-cover rounded-lg mb-2" />
            <p className="font-semibold text-forest">{opt.label}</p>
            {selected === opt.value && <span className="block text-ember font-bold mt-2">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function SingleStep({ q, onSelect }: {
  q: any;
  onSelect: (val: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const handle = (val: string) => {
    setSelected(val);
    setTimeout(() => onSelect(val), 300);
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className={`grid gap-3 ${q.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {q.options.map((o: any) => (
          <button
            key={o.label}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left ${
              selected === o.label
                ? "border-ember bg-sand/20"
                : "border-mist hover:border-ember/40 bg-white"
            }`}
            onClick={() => handle(o.label)}
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="font-medium flex-1">{o.label}</span>
            {selected === o.label && <span className="text-ember font-bold">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiStep({ q, onNext }: {
  q: any;
  onNext: (val: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (label: string) => {
    setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
        {q.subLabel && <p className="text-center text-sm text-forest/60 mt-2">{q.subLabel}</p>}
      </div>
      <div className={`grid gap-3 ${q.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {q.options.map((o: any) => (
          <button
            key={o.label}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left ${
              selected.includes(o.label)
                ? "border-ember bg-sand/20"
                : "border-mist hover:border-ember/40 bg-white"
            }`}
            onClick={() => toggle(o.label)}
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="font-medium flex-1">{o.label}</span>
            {selected.includes(o.label) && <span className="text-ember font-bold">✓</span>}
          </button>
        ))}
      </div>
      <button
        className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${
          selected.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
        }`}
        disabled={selected.length === 0}
        onClick={() => onNext(selected)}
      >
        Continue →
      </button>
    </div>
  );
}

function TextStep({ q, onSelect }: {
  q: any;
  onSelect: (val: string) => void;
}) {
  const [value, setValue] = useState("");
  const handle = () => {
    if (value.trim()) {
      setTimeout(() => onSelect(value), 300);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={q.placeholder}
          className="w-full p-4 border-2 border-mist rounded-lg text-center text-2xl font-semibold focus:outline-none focus:border-ember"
          onKeyPress={(e) => e.key === "Enter" && handle()}
        />
        <button
          className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${
            !value.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
          }`}
          disabled={!value.trim()}
          onClick={handle}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function NumberStep({ q, onSelect }: {
  q: any;
  onSelect: (val: string) => void;
}) {
  const [value, setValue] = useState("");
  const handle = () => {
    if (value.trim()) {
      setTimeout(() => onSelect(value), 300);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className="space-y-4">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={q.placeholder}
          className="w-full p-4 border-2 border-mist rounded-lg text-center text-2xl font-semibold focus:outline-none focus:border-ember"
          onKeyPress={(e) => e.key === "Enter" && handle()}
        />
        <button
          className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${
            !value.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
          }`}
          disabled={!value.trim()}
          onClick={handle}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function InfoStep({ q, onContinue }: {
  q: any;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      </div>
      <div className="bg-white rounded-2xl p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <img src={q.beforeImg} alt="Before" className="w-32 h-40 object-cover rounded-lg" />
          <svg className="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L12 13.17l3.41 3.42 1.41-1.41L13.41 12l3.41-3.41-1.41-1.41L12 10.59 8.59 7.17 7.17 8.59 10.59 12l-3.42 3.41 1.41 1.41z"/>
          </svg>
          <img src={q.afterImg} alt="After" className="w-32 h-40 object-cover rounded-lg" />
        </div>
        {q.caption && <p className="text-center font-semibold text-forest">{q.caption}</p>}
      </div>
      <button
        className="w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all hover:bg-forest/90"
        onClick={onContinue}
      >
        Continue →
      </button>
    </div>
  );
}

// Main component
export function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [subAnswer, setSubAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, any>>({});
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

    const progress = Math.round((step / TOTAL_STEPS) * 100);

    const advance = (val: any) => {
      const newAnswers = { ...answers, [step]: val };
      setAnswers(newAnswers);
      window.localStorage.setItem(
        QUIZ_ANSWERS_STORAGE_KEY,
        JSON.stringify(newAnswers)
      );
      
      if (step + 1 >= TOTAL_STEPS) {
        setShowEmailCapture(true);
      } else {
        setStep(s => s + 1);
      }
    };

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
        const stringifiedAnswers: Record<string, string> = {};
        for (const [key, value] of Object.entries(answers)) {
          stringifiedAnswers[key] = Array.isArray(value) ? value.join(", ") : String(value);
        }

        const response = await fetch("/api/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            quizAnswers: stringifiedAnswers,
            eventId,
            eventSourceUrl,
            attribution
          })
        });

        let data: { error?: string; leadId?: string } = {};

        try {
          data = (await response.json()) as { error?: string; leadId?: string };
        } catch (parseError) {
          console.error("[quiz] Failed to parse lead response", parseError);
        }

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
            : "We couldn't save your details. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    }

    const q = QUESTIONS[step];

    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-2 py-4" style={{ backgroundColor: "#fceef0" }}>
        {/* Header with Logo and Rating */}
      <TopBar/>

        {/* Main Quiz Card - Wider */}
        <div className="w-full max-w-4xl mb-8">
          <div className="bg-white rounded-[32px] shadow-glow p-6 sm:p-10 lg:p-12 flex flex-col gap-6 border border-white/80">
            {/* Progress Bar Inside Card at Top */}
            <div className="w-full">
              <div className="h-1.5 rounded-full bg-mist overflow-hidden shadow-sm">
                <div
                  className="h-full bg-gradient-to-r from-forest to-ember transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-center text-sm text-forest/60">
                <span className="font-semibold">{progress}%</span>
              </div>
            </div>

            {showEmailCapture ? (
              <div className="space-y-8 w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-forest text-center">You're almost there!</h2>
                <p className="text-center text-forest/70 text-lg">Enter your email to get your personalized plan</p>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-4 border-2 border-mist rounded-xl focus:outline-none focus:border-ember text-lg"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full p-4 rounded-xl bg-forest text-white font-bold text-lg hover:bg-ember transition-all disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : "Continue to Plans"}
                  </button>
                </form>
              </div>
            ) : q.type === "info" ? (
              <InfoStep q={q} onContinue={() => advance(true)} />
            ) : q.type === "gender" ? (
              <GenderStep onSelect={advance} subAnswer={subAnswer} setSubAnswer={setSubAnswer} />
            ) : q.type === "multi" ? (
              <MultiStep key={step} q={q} onNext={advance} />
            ) : q.type === "text" ? (
              <TextStep key={step} q={q} onSelect={advance} />
            ) : q.type === "number" ? (
              <NumberStep key={step} q={q} onSelect={advance} />
            ) : (
              <SingleStep key={step} q={q} onSelect={advance} />
            )}
          </div>
          {/* As Seen On and Security Badges (removed stray alt links below) */}
        </div>

        {/* Back button */}
        {step > 0 && !showEmailCapture && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="text-forest/70 hover:text-forest font-medium text-lg mt-2"
          >
            {''} Back
          </button>
        )}
      </main>
  );
}
