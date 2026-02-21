export interface PricingEntry {
  model: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
  color: string;
}

export const pricingData: PricingEntry[] = [
  { model: "Seed2.0 Pro", provider: "ByteDance", inputPer1M: 0.47, outputPer1M: 2.57, color: "var(--forward-blue)" },
  { model: "Seed2.0 Lite", provider: "ByteDance", inputPer1M: 0.09, outputPer1M: 0.53, color: "var(--backward-orange)" },
  { model: "Seed2.0 Mini", provider: "ByteDance", inputPer1M: 0.03, outputPer1M: 0.31, color: "var(--correct-green)" },
  { model: "GPT-5.2 High", provider: "OpenAI", inputPer1M: 1.75, outputPer1M: 14.00, color: "var(--correct-green)" },
  { model: "Claude Opus 4.5", provider: "Anthropic", inputPer1M: 5.00, outputPer1M: 25.00, color: "var(--accent-purple)" },
  { model: "Claude Sonnet 4.5", provider: "Anthropic", inputPer1M: 3.00, outputPer1M: 15.00, color: "var(--accent-purple)" },
  { model: "Gemini-3-Pro High", provider: "Google", inputPer1M: 3.00, outputPer1M: 15.00, color: "var(--accent-amber)" },
];

// For cost calculator — compare frontier models only
export const calculatorModels: PricingEntry[] = [
  { model: "Seed2.0 Pro", provider: "ByteDance", inputPer1M: 0.47, outputPer1M: 2.57, color: "var(--forward-blue)" },
  { model: "GPT-5.2 High", provider: "OpenAI", inputPer1M: 1.75, outputPer1M: 14.00, color: "var(--correct-green)" },
  { model: "Claude Opus 4.5", provider: "Anthropic", inputPer1M: 5.00, outputPer1M: 25.00, color: "var(--accent-purple)" },
  { model: "Gemini-3-Pro High", provider: "Google", inputPer1M: 3.00, outputPer1M: 15.00, color: "var(--accent-amber)" },
];

export function calculateMonthlyCost(
  entry: PricingEntry,
  millionTokensPerMonth: number,
  inputOutputRatio: number = 0.6 // 60% input, 40% output
): number {
  const inputTokens = millionTokensPerMonth * inputOutputRatio;
  const outputTokens = millionTokensPerMonth * (1 - inputOutputRatio);
  return inputTokens * entry.inputPer1M + outputTokens * entry.outputPer1M;
}
