"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { ExternalLink, GitBranch, Users, Zap, ArrowRight } from "lucide-react";

const milestones = [
  {
    icon: GitBranch,
    title: "Open-Source Foundation",
    description:
      "OpenClaw was transferred to an independent foundation on Feb 14, 2026. No single company controls the roadmap — governance is community-driven with elected maintainers.",
    color: "var(--correct-green)",
  },
  {
    icon: Users,
    title: "Steinberger → OpenAI",
    description:
      "Peter Steinberger, the creator, joined OpenAI to work on agentic AI infrastructure. The move validated the personal AI agent paradigm — and sparked debate about open-source founders leaving their projects.",
    color: "var(--forward-blue)",
  },
  {
    icon: Zap,
    title: "190K+ Stars & Growing",
    description:
      "One of the fastest-growing open-source projects ever. The community contributes hundreds of skills weekly, and forks like Cloudflare's moltworker and pgclaw are extending it into new environments.",
    color: "var(--accent-amber)",
  },
  {
    icon: ExternalLink,
    title: "The Bigger Picture",
    description:
      "OpenClaw proved that people want AI agents that run locally, connect to existing tools, and work autonomously. Every major AI lab is now building their own version. The question isn't whether personal AI agents will exist — it's who controls them.",
    color: "var(--accent-purple)",
  },
];

export default function RoadAheadSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <SectionWrapper id="road-ahead">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-purple mb-3">
          Section 06
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Road Ahead
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          A weekend side project became one of the most consequential open-source launches in years. What happens next?
        </p>
      </div>

      {/* Analogy */}
      <div className="mx-auto max-w-2xl mb-12 rounded-xl bg-bg-secondary/50 px-6 py-5 border border-border">
        <p className="font-sans text-base leading-relaxed text-text-secondary">
          Think of it like the early days of smartphones. The first iPhone was
          clunky and limited — but it showed the world what was possible. OpenClaw
          is that moment for personal AI agents: imperfect, sometimes dangerous,
          but a glimpse of a future where everyone has an AI that works for{" "}
          <em>them</em>.
        </p>
      </div>

      {/* Milestone cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const isActive = i === activeIdx;
          return (
            <button
              key={m.title}
              onClick={() => setActiveIdx(i)}
              className={`group relative rounded-xl border p-6 text-left transition-all duration-300 ${
                isActive
                  ? "bg-bg-card border-forward-blue shadow-lg scale-[1.02]"
                  : "bg-bg-card/50 border-border hover:border-text-tertiary hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${m.color} 15%, transparent)` }}
                >
                  <Icon
                    size={20}
                    style={{ color: m.color }}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold text-text-primary mb-2">
                    {m.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-text-secondary">
                    {m.description}
                  </p>
                </div>
              </div>
              {isActive && (
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* The key question */}
      <div className="mx-auto mt-16 max-w-2xl text-center">
        <blockquote className="font-serif text-2xl font-bold italic text-text-primary leading-relaxed sm:text-3xl">
          &ldquo;The question isn&rsquo;t whether you&rsquo;ll have a personal AI agent.
          It&rsquo;s whether you&rsquo;ll control it — or someone else will.&rdquo;
        </blockquote>
      </div>

      {/* Links */}
      <div className="mx-auto mt-12 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href="https://github.com/openclaw/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-6 py-3 font-sans text-sm font-semibold text-bg-primary transition-transform hover:scale-105"
        >
          <GitBranch size={16} />
          View on GitHub
          <ArrowRight size={14} />
        </a>
        <a
          href="https://openclaw.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-6 py-3 font-sans text-sm font-semibold text-text-primary transition-transform hover:scale-105"
        >
          <ExternalLink size={16} />
          openclaw.ai
        </a>
      </div>

      {/* Why care */}
      <div className="why-care mx-auto mt-12 max-w-2xl">
        This is the beginning of the personal AI agent era. Whether OpenClaw itself
        survives doesn&rsquo;t matter — it proved the concept. Your future AI
        assistant will owe something to this wild, messy, brilliant experiment.
      </div>
    </SectionWrapper>
  );
}
