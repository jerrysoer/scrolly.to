export const navSections = [
  { id: "hero", label: "Intro" },
  { id: "message-flow", label: "Flow" },
  { id: "gateway", label: "Gateway" },
  { id: "skills", label: "Skills" },
  { id: "naming", label: "Naming" },
  { id: "security", label: "Security" },
  { id: "road-ahead", label: "Future" },
];

export const completionHighlights = [
  { value: "7", label: "Sections" },
  { value: "190K+", label: "GitHub Stars" },
  { value: "5,700+", label: "Skills" },
  { value: "50+", label: "Platforms" },
];

export const faqs = [
  {
    question: "What is OpenClaw?",
    answer: "OpenClaw is a free, open-source, self-hosted AI agent that connects to your messaging apps (WhatsApp, Telegram, Slack, Discord, etc.) and acts as an always-on autonomous assistant with full system access.",
  },
  {
    question: "How does OpenClaw connect to my chat apps?",
    answer: "OpenClaw runs a WebSocket gateway on your machine that uses adapter libraries (Baileys for WhatsApp, grammY for Telegram, Bolt for Slack, discord.js for Discord) to connect to 50+ messaging platforms simultaneously.",
  },
  {
    question: "Why was ClawdBot renamed to OpenClaw?",
    answer: "Anthropic's legal team sent a trademark notice asserting that 'Clawd' was too similar to 'Claude.' The project was briefly renamed Moltbot, then settled on OpenClaw in January 2026.",
  },
  {
    question: "Is OpenClaw safe to use?",
    answer: "OpenClaw has significant security considerations. Multiple CVEs have been disclosed (including CVE-2026-25253 for auth token leakage), malicious skills have appeared on ClawHub, and hundreds of publicly exposed instances were found with zero authentication. Users should carefully evaluate the risks before deploying.",
  },
  {
    question: "What LLMs does OpenClaw support?",
    answer: "OpenClaw is model-agnostic and supports Claude (Anthropic), GPT-4 (OpenAI), DeepSeek, and local models via Ollama. The documentation recommends Claude Opus 4.6 for long-context strength.",
  },
];
