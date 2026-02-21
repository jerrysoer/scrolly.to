"use client";

const faqs = [
  {
    q: "What is OpenClaw?",
    a: "OpenClaw is a free, open-source, self-hosted AI agent that connects to your messaging apps (WhatsApp, Telegram, Slack, Discord, etc.) and acts as an always-on autonomous assistant with full system access.",
  },
  {
    q: "How does OpenClaw connect to my chat apps?",
    a: "OpenClaw runs a WebSocket gateway on your machine that uses adapter libraries (Baileys for WhatsApp, grammY for Telegram, Bolt for Slack, discord.js for Discord) to connect to 50+ messaging platforms simultaneously.",
  },
  {
    q: "Why was ClawdBot renamed to OpenClaw?",
    a: "Anthropic's legal team sent a trademark notice asserting that 'Clawd' was too similar to 'Claude.' The project was briefly renamed Moltbot, then settled on OpenClaw in January 2026.",
  },
  {
    q: "Is OpenClaw safe to use?",
    a: "OpenClaw has significant security considerations. Multiple CVEs have been disclosed (including CVE-2026-25253 for auth token leakage), malicious skills have appeared on ClawHub, and hundreds of publicly exposed instances were found with zero authentication. Users should carefully evaluate the risks before deploying.",
  },
  {
    q: "What LLMs does OpenClaw support?",
    a: "OpenClaw is model-agnostic and supports Claude (Anthropic), GPT-4 (OpenAI), DeepSeek, and local models via Ollama. The documentation recommends Claude Opus 4.6 for long-context strength.",
  },
];

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h2 className="font-serif text-2xl font-bold text-text-primary">
        Frequently Asked Questions
      </h2>
      <dl className="mt-8 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.q}>
            <dt className="text-lg font-semibold text-text-primary font-sans">
              {faq.q}
            </dt>
            <dd className="mt-2 text-text-secondary leading-relaxed font-sans text-base">
              {faq.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
