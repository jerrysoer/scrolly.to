export interface Capability {
  id: string;
  title: string;
  icon: string;
  color: string;
  summary: string;
  benchmarks: string[];
  examples: { input: string; output: string }[];
  insight: string;
}

export const capabilities: Capability[] = [
  {
    id: "text",
    title: "Text & Reasoning",
    icon: "Brain",
    color: "var(--forward-blue)",
    summary: "Frontier-level language understanding, generation, and multi-step reasoning",
    benchmarks: [
      "MMLU-Pro: 87.0%",
      "GPQA Diamond: 68.7%",
      "SimpleQA: 35.3%",
    ],
    examples: [
      {
        input: "Analyze the causal chain from quantitative easing to asset inflation",
        output: "Multi-step economic reasoning with cited mechanisms",
      },
    ],
    insight: "Matches or exceeds GPT-5.2 on general knowledge benchmarks while offering deeper reasoning chains on complex analytical tasks.",
  },
  {
    id: "vision",
    title: "Vision & Image",
    icon: "Eye",
    color: "var(--correct-green)",
    summary: "Image understanding, OCR, chart analysis, and visual reasoning",
    benchmarks: [
      "MMMU: 74.0%",
      "MathVista: 76.4%",
      "ChartQA: strong",
    ],
    examples: [
      {
        input: "Extract data from this earnings chart and identify the trend",
        output: "Structured data extraction with trend analysis",
      },
    ],
    insight: "Particularly strong on document and chart understanding — critical for enterprise workflows involving financial reports and dashboards.",
  },
  {
    id: "video",
    title: "Video Understanding",
    icon: "Video",
    color: "var(--backward-orange)",
    summary: "Long-form video comprehension, temporal reasoning, and scene analysis",
    benchmarks: [
      "Video-MME (w/o sub): 78.5%",
      "MLVU: 77.8%",
      "Long video support",
    ],
    examples: [
      {
        input: "Summarize the key arguments in this 45-minute lecture",
        output: "Timestamped summary with argument structure",
      },
    ],
    insight: "Native video understanding without frame extraction — a capability gap in most competing models.",
  },
  {
    id: "documents",
    title: "Document Processing",
    icon: "FileText",
    color: "var(--accent-amber)",
    summary: "Long-context document analysis, extraction, and cross-reference",
    benchmarks: [
      "128K+ context window",
      "Multi-document synthesis",
      "Structured extraction",
    ],
    examples: [
      {
        input: "Compare these three contract versions and highlight changes",
        output: "Diff analysis with clause-level annotations",
      },
    ],
    insight: "The combination of long context and strong extraction makes Seed2.0 particularly effective for legal, compliance, and research workflows.",
  },
  {
    id: "agentic",
    title: "Agentic & Tool Use",
    icon: "Wrench",
    color: "var(--accent-purple)",
    summary: "Function calling, multi-step tool use, and autonomous task completion",
    benchmarks: [
      "\u03C4-Bench airline: 53.5%",
      "\u03C4-Bench retail: 67.1%",
      "SWE-Bench: 76.5%",
    ],
    examples: [
      {
        input: "Debug this failing CI pipeline and submit a fix",
        output: "Autonomous code review, fix generation, and PR submission",
      },
    ],
    insight: "76.5% on SWE-Bench Verified places Seed2.0 Pro among the top agentic coding models — capable of autonomous software engineering tasks.",
  },
  {
    id: "scientific",
    title: "Scientific & Math",
    icon: "FlaskConical",
    color: "var(--forward-blue)",
    summary: "Olympiad-level mathematics, scientific reasoning, and formal proofs",
    benchmarks: [
      "AIME 2025: 94.2%",
      "IMO 2025: Gold (35/42)",
      "CMO 2025: Gold (114/126)",
    ],
    examples: [
      {
        input: "Prove that for all primes p > 3, p\u00B2 \u2261 1 (mod 24)",
        output: "Formal proof with number-theoretic reasoning",
      },
    ],
    insight: "Gold medals at both IMO and CMO 2025 demonstrate genuine mathematical reasoning — not pattern matching.",
  },
];
