export interface Achievement {
  competition: string;
  score: string;
  threshold: string;
  medal: string;
  context: string;
}

export const achievements: Achievement[] = [
  {
    competition: "IMO 2025",
    score: "35/42",
    threshold: "Gold \u2265 35",
    medal: "Gold",
    context: "International Mathematical Olympiad \u2014 the most prestigious math competition in the world",
  },
  {
    competition: "CMO 2025",
    score: "114/126",
    threshold: "Gold \u2265 87",
    medal: "Gold",
    context: "Chinese Mathematical Olympiad \u2014 national-level competition with tens of thousands of participants",
  },
  {
    competition: "ICPC Pass@8",
    score: "73.02%",
    threshold: "vs GPT-5.2: 65.08%",
    medal: "1st",
    context: "International Collegiate Programming Contest \u2014 algorithmic programming under time pressure",
  },
  {
    competition: "Putnam-200",
    score: "35.5",
    threshold: "vs Gemini-3-Pro: 26.5",
    medal: "1st",
    context: "William Lowell Putnam Competition \u2014 regarded as the hardest undergraduate math exam in North America",
  },
];

export interface RadarDimension {
  dimension: string;
  seed2Pro: number;
  gpt52: number;
  claudeOpus: number;
}

export const radarData: RadarDimension[] = [
  { dimension: "Reasoning", seed2Pro: 92, gpt52: 88, claudeOpus: 85 },
  { dimension: "Code", seed2Pro: 95, gpt52: 85, claudeOpus: 82 },
  { dimension: "Math", seed2Pro: 97, gpt52: 89, claudeOpus: 78 },
  { dimension: "Vision", seed2Pro: 85, gpt52: 88, claudeOpus: 82 },
  { dimension: "Agentic", seed2Pro: 90, gpt52: 86, claudeOpus: 88 },
  { dimension: "Cost Efficiency", seed2Pro: 98, gpt52: 60, claudeOpus: 35 },
];
