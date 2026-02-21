export interface Scenario {
  id: string;
  title: string;
  icon: string;
  recommendations: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "building",
    title: "Building a Product",
    icon: "Rocket",
    recommendations: [
      "Start with Seed2.0 Lite for prototyping \u2014 at $0.09/M input tokens, you can iterate rapidly without budget anxiety",
      "Use Pro for complex reasoning tasks (code gen, analysis) and Mini for high-volume classification/routing",
      "The three-tier architecture lets you optimize cost per feature, not cost per model",
      "Test against GPT-5.2 and Claude on your specific use cases \u2014 benchmark parity doesn\u2019t mean identical behavior on your data",
    ],
  },
  {
    id: "evaluating",
    title: "Evaluating Providers",
    icon: "Scale",
    recommendations: [
      "Seed2.0 breaks the assumption that frontier performance requires frontier pricing",
      "Run your own evals \u2014 public benchmarks are necessary but not sufficient for production decisions",
      "Consider the full stack: API reliability, rate limits, content policies, data residency, and support SLAs",
      "The Doubao production track record (hundreds of millions DAU) provides confidence that infrastructure scales",
    ],
  },
  {
    id: "reducing",
    title: "Reducing AI Costs",
    icon: "TrendingDown",
    recommendations: [
      "A direct model swap from Claude Opus to Seed2.0 Pro could reduce costs by ~90% on input and ~90% on output",
      "Implement intelligent routing: Pro for hard tasks, Lite for medium, Mini for simple \u2014 can cut blended cost by 5-10x",
      "The Mini tier at $0.03/M input enables use cases previously too expensive to justify (logging analysis, bulk classification)",
      "Factor in the switching cost: prompt engineering, eval pipeline updates, and edge case handling will require investment",
    ],
  },
];

export interface TakeawayStat {
  label: string;
  value: string;
  detail: string;
}

export const takeawayStats: TakeawayStat[] = [
  {
    label: "Performance Parity",
    value: "4 of 6",
    detail: "key benchmarks where Seed2.0 Pro leads or matches frontier models",
  },
  {
    label: "Cost Advantage",
    value: "~10x",
    detail: "cheaper than Claude Opus on input tokens, ~4x cheaper than GPT-5.2",
  },
  {
    label: "Production Scale",
    value: "100M+",
    detail: "daily active users already served through Doubao",
  },
];
