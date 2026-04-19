export type QuizAnalysis = {
  firstName: string | null;
  age: number | null;
  skinProfile: string[];
  primaryConcerns: string[];
  goals: string[];
  recommendedPlanId: string;
  routineLabel: string;
  summary: string;
  planReason: string;
  insightBullets: string[];
};

type QuizAnswers = Record<number, unknown>;

function toList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function toText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getRoutineLabel(timeCommitment: string | null) {
  switch (timeCommitment) {
    case "More than 10 minutes":
      return "an intensive daily sculpting routine";
    case "5-10 minutes":
      return "a consistent 5-10 minute daily ritual";
    case "Less than 5 minutes":
      return "a quick-start routine you can keep up with";
    default:
      return "a personalized daily face yoga routine";
  }
}

function getHabitInsight(answers: QuizAnswers) {
  const sleep = toText(answers[6]);
  const water = toText(answers[7]);
  const exercise = toText(answers[8]);
  const cleanse = toText(answers[9]);
  const screenTime = toText(answers[11]);

  if (sleep === "Less than 6 hours") {
    return "Your routine should support recovery and facial relaxation on lower-rest days.";
  }

  if (water === "1-2 glasses a day") {
    return "Hydration-friendly routines can help support a fresher, less tired look.";
  }

  if (screenTime === "More than 8 hours" || screenTime === "5-8 hours") {
    return "Screen-heavy days often pair well with tension-release moves for the eyes, jaw, and forehead.";
  }

  if (exercise === "Rarely" || exercise === "Almost never") {
    return "A low-friction routine will make consistency easier to build into your day.";
  }

  if (cleanse === "A few times a week" || cleanse === "Never") {
    return "A simple step-by-step ritual will fit best if you want easier self-care consistency.";
  }

  return "Your answers suggest you can build visible progress with a steady, manageable routine.";
}

export function buildQuizAnalysis(answers: QuizAnswers): QuizAnalysis {
  const firstName = toText(answers[12]);
  const age = toNumber(answers[13]);
  const skinProfile = toList(answers[2]).filter((item) => item !== "Not sure");
  const primaryConcerns = toList(answers[3]).filter(
    (item) => item !== "None of the above"
  );
  const goals = toList(answers[16]);
  const timeCommitment = toText(answers[15]);
  const routineLabel = getRoutineLabel(timeCommitment);
  const concernCount = primaryConcerns.length;
  const goalCount = goals.length;
  const allGoalsSelected = goals.includes("All of the above");

  let recommendationScore = 0;

  if (age !== null && age >= 45) {
    recommendationScore += 2;
  } else if (age !== null && age >= 35) {
    recommendationScore += 1;
  }

  if (concernCount >= 4) {
    recommendationScore += 2;
  } else if (concernCount >= 2) {
    recommendationScore += 1;
  }

  if (goalCount >= 3 || allGoalsSelected) {
    recommendationScore += 2;
  } else if (goalCount >= 2) {
    recommendationScore += 1;
  }

  if (timeCommitment === "More than 10 minutes") {
    recommendationScore += 2;
  } else if (timeCommitment === "5-10 minutes") {
    recommendationScore += 1;
  }

  const recommendedPlanId =
    recommendationScore >= 6
      ? "lifetime-sanctuary"
      : recommendationScore >= 3
        ? "signature-ritual"
        : "clarity-reset";

  const planReason =
    recommendedPlanId === "lifetime-sanctuary"
      ? "You showed strong motivation, broader goals, and enough commitment for the deepest library and long-term access."
      : recommendedPlanId === "signature-ritual"
        ? "You look like the best fit for a guided, higher-support path that balances visible results with consistency."
        : "You are a strong match for a focused starter plan that keeps things simple and easy to stick with.";

  const focusArea =
    primaryConcerns[0] ??
    goals[0] ??
    "overall facial tone and glow";

  const skinSummary = skinProfile.length
    ? `${skinProfile.join(", ").toLowerCase()} skin`
    : "your current skin profile";

  const summary = firstName
    ? `${firstName}, your answers point to ${routineLabel} focused on ${focusArea.toLowerCase()} while respecting ${skinSummary}.`
    : `Your answers point to ${routineLabel} focused on ${focusArea.toLowerCase()} while respecting ${skinSummary}.`;

  const insightBullets = [
    `Primary focus: ${focusArea}.`,
    `Best routine style: ${routineLabel}.`,
    getHabitInsight(answers)
  ];

  return {
    firstName,
    age,
    skinProfile,
    primaryConcerns,
    goals,
    recommendedPlanId,
    routineLabel,
    summary,
    planReason,
    insightBullets
  };
}
