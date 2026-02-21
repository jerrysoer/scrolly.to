import type { TimelineEvent } from "./openclaw-types";

export const nameTimeline: TimelineEvent[] = [
  {
    date: "Nov 2025",
    name: "ClawdBot",
    description:
      "Peter Steinberger launches ClawdBot as a weekend side project. The name is a playful nod to Claude, the LLM it was originally built on.",
    color: "var(--forward-blue)",
  },
  {
    date: "Jan 27, 2026",
    name: "MoltBot",
    description:
      "Anthropic's legal team sends a trademark notice — 'Clawd' is too similar to 'Claude.' Steinberger renames to MoltBot within hours. In the 10-second window when the old GitHub handle was released, scammers launch fake $CLAWD meme tokens on Solana that briefly hit a $16M market cap.",
    color: "var(--accent-amber)",
  },
  {
    date: "Jan 30, 2026",
    name: "OpenClaw",
    description:
      "Pronunciation issues with 'MoltBot' force another rename. OpenClaw sticks — cleaner brand, open-source ethos in the name. The community migrates repos, links, and documentation in 48 hours.",
    color: "var(--correct-green)",
  },
  {
    date: "Feb 14, 2026",
    name: "Foundation",
    description:
      "Steinberger announces he's joining OpenAI to work on agentic AI infrastructure. OpenClaw is simultaneously transferred to an independent open-source foundation. The repo hits 190,000+ GitHub stars.",
    color: "var(--accent-purple)",
  },
];

export const growthMilestones = [
  { month: "Nov 2025", stars: 2000, label: "Launch" },
  { month: "Dec 2025", stars: 18000, label: "Viral on X" },
  { month: "Jan 2026", stars: 85000, label: "Rename drama" },
  { month: "Feb 2026", stars: 190000, label: "OpenAI hire" },
];
