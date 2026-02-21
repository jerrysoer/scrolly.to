export interface BenchmarkEntry {
  benchmark: string;
  category: string;
  seed2Pro: number;
  gpt52: number;
  claudeOpus: number;
  gemini3Pro: number;
}

export const benchmarkCategories = ["All", "Reasoning", "Code", "Math", "General"] as const;
export type BenchmarkCategory = (typeof benchmarkCategories)[number];

export const benchmarks: BenchmarkEntry[] = [
  {
    benchmark: "MMLU-Pro",
    category: "General",
    seed2Pro: 87.0,
    gpt52: 85.8,
    claudeOpus: 84.2,
    gemini3Pro: 85.0,
  },
  {
    benchmark: "GPQA Diamond",
    category: "Reasoning",
    seed2Pro: 68.7,
    gpt52: 72.2,
    claudeOpus: 68.4,
    gemini3Pro: 68.9,
  },
  {
    benchmark: "AIME 2025",
    category: "Math",
    seed2Pro: 94.2,
    gpt52: 86.7,
    claudeOpus: 74.2,
    gemini3Pro: 92.0,
  },
  {
    benchmark: "Codeforces Elo",
    category: "Code",
    seed2Pro: 3020,
    gpt52: 2773,
    claudeOpus: 2070,
    gemini3Pro: 2741,
  },
  {
    benchmark: "SWE-Bench Verified",
    category: "Code",
    seed2Pro: 76.5,
    gpt52: 72.0,
    claudeOpus: 72.5,
    gemini3Pro: 63.8,
  },
  {
    benchmark: "LiveCodeBench",
    category: "Code",
    seed2Pro: 87.8,
    gpt52: 78.2,
    claudeOpus: 66.4,
    gemini3Pro: 78.0,
  },
];

export const modelColors: Record<string, string> = {
  "Seed2.0 Pro": "var(--forward-blue)",
  "GPT-5.2": "var(--correct-green)",
  "Claude Opus": "var(--accent-purple)",
  "Gemini-3-Pro": "var(--accent-amber)",
};

export const benchmarkInsight =
  "Seed2.0 Pro leads in 4 of 6 key benchmarks, with particularly strong showings in competitive programming (3020 Elo) and math olympiad tasks (94.2% AIME 2025).";
