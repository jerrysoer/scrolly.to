export interface ModelTier {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  inputPer1M: string;
  outputPer1M: string;
  highlights: string[];
  useCases: string[];
  color: string;
}

export const modelTiers: ModelTier[] = [
  {
    id: "pro",
    name: "Seed2.0 Pro",
    tagline: "Frontier accuracy, competitive pricing",
    bestFor: "Complex reasoning & research",
    inputPer1M: "$0.47",
    outputPer1M: "$2.57",
    highlights: [
      "94.2% AIME 2025",
      "3020 Codeforces Elo",
      "76.5% SWE-Bench Verified",
      "IMO 2025 Gold Medal",
    ],
    useCases: [
      "Advanced code generation & debugging",
      "Mathematical & scientific reasoning",
      "Complex multi-step analysis",
      "Research synthesis & long-form writing",
    ],
    color: "var(--forward-blue)",
  },
  {
    id: "lite",
    name: "Seed2.0 Lite",
    tagline: "Strong performance, fraction of the cost",
    bestFor: "Balanced workloads",
    inputPer1M: "$0.09",
    outputPer1M: "$0.53",
    highlights: [
      "Competitive with GPT-4.1",
      "Strong code & reasoning",
      "~50x cheaper than Opus input",
      "Fast inference speed",
    ],
    useCases: [
      "Content generation & summarization",
      "Customer support automation",
      "Data extraction & classification",
      "General-purpose API workloads",
    ],
    color: "var(--backward-orange)",
  },
  {
    id: "mini",
    name: "Seed2.0 Mini",
    tagline: "Maximum speed at minimum cost",
    bestFor: "High-volume, latency-sensitive",
    inputPer1M: "$0.03",
    outputPer1M: "$0.31",
    highlights: [
      "~167x cheaper than Opus input",
      "Lowest latency in family",
      "Strong for structured tasks",
      "Ideal for chained pipelines",
    ],
    useCases: [
      "Real-time classification & routing",
      "High-volume data processing",
      "Chatbot & conversational AI",
      "Embedding pipeline preprocessing",
    ],
    color: "var(--correct-green)",
  },
];
