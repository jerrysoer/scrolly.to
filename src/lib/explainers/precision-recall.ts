// ── Types ──

export interface QuizQuestion {
  question: string;
  options: { id: string; label: string; desc: string }[];
  correct: string;
  explanation: string;
}

export interface FormulaTerm {
  symbol: string;
  meaning: string;
  color: string;
}

export interface Highlight {
  value: string;
  label: string;
  color?: string;
}

// ── Section Nav ──

export const navSections = [
  { id: "hero", label: "Intro" },
  { id: "email", label: "Email" },
  { id: "medical", label: "Medical" },
  { id: "car", label: "Car" },
  { id: "fraud", label: "Fraud" },
  { id: "content", label: "Content" },
  { id: "search", label: "Search" },
  { id: "interactive", label: "Interactive" },
  { id: "matrix", label: "Matrix" },
  { id: "formulas", label: "Formulas" },
  { id: "f1-score", label: "F1 Score" },
  { id: "quiz", label: "Quiz" },
  { id: "conclusion", label: "Conclusion" },
];

// ── Quiz Questions ──

export const quizQuestions: QuizQuestion[] = [
  {
    question: "A hospital's cancer screening test. What matters more?",
    options: [
      { id: "recall", label: "High Recall", desc: "Catch every possible case" },
      { id: "precision", label: "High Precision", desc: "Only flag certain cases" },
    ],
    correct: "recall",
    explanation:
      "Missing a cancer case can be fatal. False alarms lead to more tests, but that's better than missing a real cancer.",
  },
  {
    question: "A spam filter for your personal email. What matters more?",
    options: [
      { id: "recall", label: "High Recall", desc: "Block all possible spam" },
      { id: "precision", label: "High Precision", desc: "Only block obvious spam" },
    ],
    correct: "precision",
    explanation:
      "Blocking a real email from a friend or employer is worse than letting some spam through. You can delete spam manually.",
  },
  {
    question: "An airport security system detecting weapons. What matters more?",
    options: [
      { id: "recall", label: "High Recall", desc: "Flag anything suspicious" },
      { id: "precision", label: "High Precision", desc: "Only flag clear threats" },
    ],
    correct: "recall",
    explanation:
      "The cost of missing a weapon is catastrophic. Extra security checks are inconvenient but acceptable.",
  },
];

// ── Formula Terms ──

export const recallTerms: FormulaTerm[] = [
  { symbol: "TP", meaning: "True Positives — correctly identified", color: "var(--pr-green)" },
  { symbol: "FN", meaning: "False Negatives — missed", color: "var(--pr-terracotta)" },
];

export const precisionTerms: FormulaTerm[] = [
  { symbol: "TP", meaning: "True Positives — correct predictions", color: "var(--pr-green)" },
  { symbol: "FP", meaning: "False Positives — wrong predictions", color: "var(--pr-terracotta)" },
];

// ── Completion Card ──

export const completionHighlights: Highlight[] = [
  { value: "13", label: "Sections" },
  { value: "6", label: "Scenarios" },
  { value: "3", label: "Quiz Q's" },
  { value: "F1", label: "Score" },
];
