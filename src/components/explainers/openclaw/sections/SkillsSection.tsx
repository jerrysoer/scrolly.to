"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { sampleSkills, clawHubStats } from "@/lib/explainers/openclaw-channels";
import {
  Share2,
  Mail,
  Home,
  Calendar,
  GitBranch,
  DollarSign,
  Globe,
  Clock,
  FolderTree,
  FileJson,
  Brain,
  Package,
  Download,
  Users,
  Layers,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Share2,
  Mail,
  Home,
  Calendar,
  GitBranch,
  DollarSign,
  Globe,
  Clock,
};

/* mock SKILL.md content per skill */
const skillMdContent: Record<string, string> = {
  "bluesky-post": `---
name: bluesky-post
version: 1.2.0
triggers:
  - "post to bluesky"
  - "thread on bsky"
---

Post or thread content on Bluesky.
Split long text into 300-char
segments. Attach images when
provided. Return post URL.`,
  "email-summarizer": `---
name: email-summarizer
version: 2.0.1
triggers:
  - "check my email"
  - "inbox summary"
---

Fetch unread Gmail via IMAP.
Summarize each in one sentence.
Flag urgent items. Return count
and top-3 action items.`,
  "smart-home": `---
name: smart-home
version: 1.5.3
triggers:
  - "turn on the lights"
  - "set thermostat"
---

Bridge to Home Assistant API.
Support lights, locks, thermostat,
and scenes. Confirm actions with
current device state.`,
  "calendar-manager": `---
name: calendar-manager
version: 3.1.0
triggers:
  - "schedule a meeting"
  - "what's on my calendar"
---

Read/write Google Calendar via
OAuth. Check conflicts before
booking. Decline with reason
when requested.`,
  "code-reviewer": `---
name: code-reviewer
version: 1.0.4
triggers:
  - "review this PR"
  - "check my code"
---

Fetch PR diff from GitHub API.
Analyze for bugs, style, and
security issues. Post inline
review comments.`,
  "finance-tracker": `---
name: finance-tracker
version: 2.3.1
triggers:
  - "how much did I spend"
  - "bank balance"
---

Connect to Plaid for transactions.
Categorize spending. Track vs
monthly budget. Alert when
category exceeds limit.`,
  "web-scraper": `---
name: web-scraper
version: 1.8.0
triggers:
  - "scrape this page"
  - "extract data from"
---

Fetch URL via headless browser.
Extract structured data using
CSS selectors or LLM parsing.
Return JSON or markdown.`,
  "cron-runner": `---
name: cron-runner
version: 1.1.2
triggers:
  - "run every morning"
  - "schedule task"
---

Register cron expressions in
the daemon scheduler. Execute
any skill on a timer. Log
results to memory.json.`,
};

/* category color map */
const categoryColors: Record<string, string> = {
  Social: "var(--forward-blue)",
  Productivity: "var(--accent-purple)",
  IoT: "var(--correct-green)",
  Dev: "var(--backward-orange)",
  Finance: "var(--accent-amber)",
  Data: "var(--forward-blue)",
  System: "var(--text-tertiary)",
};

/* stat formatting */
function formatNumber(n: number): string {
  if (n >= 10000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toLocaleString();
}

const statItems = [
  { label: "Skills", value: clawHubStats.totalSkills, icon: Package },
  { label: "Categories", value: clawHubStats.categories, icon: Layers },
  { label: "Contributors", value: clawHubStats.contributors, icon: Users },
  { label: "Downloads / day", value: clawHubStats.downloadsPerDay, icon: Download },
];

export default function SkillsSection() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleFlip = useCallback((i: number) => {
    setFlippedIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <SectionWrapper id="skills">
      {/* Section header */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-correct-green mb-3">
          Section 03
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Skills &amp; Memory
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          Teach your agent new tricks with simple markdown files&mdash;and browse 5,700+ that
          others have already built.
        </p>
      </div>

      {/* Everyday analogy */}
      <div className="mt-10 rounded-xl border border-border bg-bg-card px-6 py-5 shadow-sm">
        <p className="font-sans text-sm font-semibold uppercase tracking-wide text-text-tertiary mb-2">
          Everyday analogy
        </p>
        <p className="font-serif text-base leading-relaxed text-text-primary sm:text-lg">
          Skills are like apps on your phone&mdash;each one gives your agent a new ability. But
          instead of downloading from the App Store, you write a{" "}
          <JargonTerm
            term="SKILL.md"
            definition="A plain markdown file with YAML frontmatter that defines a skill's name, triggers, and instructions for the agent."
          >
            markdown file
          </JargonTerm>{" "}
          that says &ldquo;here&rsquo;s how to do this thing.&rdquo;
        </p>
      </div>

      {/* Skill browser grid */}
      <div className="mt-14">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-text-tertiary mb-5">
          Browse skills
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sampleSkills.map((skill, i) => {
            const isFlipped = flippedIndex === i;
            const IconComp = iconMap[skill.icon];
            const catColor = categoryColors[skill.category] || "var(--text-tertiary)";

            return (
              <button
                key={skill.name}
                onClick={() => handleFlip(i)}
                className="group relative min-h-[180px] w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forward-blue rounded-xl"
                style={{ perspective: "800px" }}
                aria-label={`${isFlipped ? "Hide" : "Show"} SKILL.md for ${skill.name}`}
              >
                <div
                  className="relative h-full w-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 rounded-xl border border-border bg-bg-card p-5 shadow-sm flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: catColor + "14" }}
                      >
                        {IconComp && (
                          <span style={{ color: catColor }}>
                            <IconComp size={20} />
                          </span>
                        )}
                      </div>
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium"
                        style={{
                          backgroundColor: catColor + "14",
                          color: catColor,
                        }}
                      >
                        {skill.category}
                      </span>
                    </div>
                    <p className="font-mono text-sm font-bold text-text-primary mb-1">
                      {skill.name}
                    </p>
                    <p className="font-sans text-sm leading-relaxed text-text-secondary flex-1">
                      {skill.description}
                    </p>
                    <p className="mt-3 font-mono text-[10px] text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view SKILL.md
                    </p>
                  </div>

                  {/* BACK (SKILL.md content) */}
                  <div
                    className="absolute inset-0 rounded-xl border border-border bg-bg-secondary p-4 shadow-sm flex flex-col overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-accent-red" />
                      <div className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
                      <div className="h-2.5 w-2.5 rounded-full bg-correct-green" />
                      <span className="ml-auto font-mono text-[10px] text-text-tertiary">
                        SKILL.md
                      </span>
                    </div>
                    <pre className="flex-1 overflow-hidden font-mono text-[10.5px] leading-[1.5] text-text-primary whitespace-pre-wrap">
                      {skillMdContent[skill.name] || `---\nname: ${skill.name}\n---\n\n${skill.description}`}
                    </pre>
                    <p className="mt-2 font-mono text-[10px] text-text-tertiary">
                      Click to flip back
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ClawHub stats bar */}
      <div className="mt-14">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-text-tertiary mb-5 text-center">
          ClawHub Marketplace
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {statItems.map(({ label, value, icon: StatIcon }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-full border border-border bg-bg-card px-5 py-2.5 shadow-sm"
            >
              <StatIcon size={16} className="text-text-tertiary shrink-0" />
              <span className="font-mono text-lg font-bold text-text-primary">
                {formatNumber(value)}
              </span>
              <span className="font-sans text-sm text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Memory explainer */}
      <div className="mt-14">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-text-tertiary mb-5">
          Local memory
        </h3>
        <div className="rounded-xl border border-border bg-bg-card p-6 shadow-sm">
          <p className="font-sans text-sm leading-relaxed text-text-secondary mb-5">
            Everything your agent learns stays on your machine. Preferences, conversation history,
            and skill configs live in a single directory&mdash;no cloud sync, no third-party
            storage.
          </p>
          {/* directory tree illustration */}
          <div className="rounded-lg bg-bg-secondary p-5">
            <svg
              viewBox="0 0 400 210"
              width="100%"
              height="auto"
              role="img"
              aria-label="Directory tree showing the ~/.openclaw/ folder structure with config.json, memory.json, and skills/ subfolder"
              className="mx-auto max-w-sm"
            >
              {/* root folder */}
              <foreignObject x={0} y={0} width={24} height={24}>
                <div className="flex items-center justify-center h-full">
                  <FolderTree size={16} className="text-accent-amber" />
                </div>
              </foreignObject>
              <text
                x={30}
                y={16}
                className="font-mono"
                style={{ fontSize: "14px", fontWeight: 700, fill: "var(--text-primary)" }}
              >
                ~/.openclaw/
              </text>

              {/* tree lines */}
              <line x1={12} y1={28} x2={12} y2={170} stroke="var(--border)" strokeWidth={1.5} />

              {/* config.json */}
              <line x1={12} y1={54} x2={36} y2={54} stroke="var(--border)" strokeWidth={1.5} />
              <foreignObject x={40} y={42} width={24} height={24}>
                <div className="flex items-center justify-center h-full">
                  <FileJson size={15} className="text-forward-blue" />
                </div>
              </foreignObject>
              <text
                x={68}
                y={56}
                className="font-mono"
                style={{ fontSize: "13px", fill: "var(--text-primary)" }}
              >
                config.json
              </text>
              <text
                x={180}
                y={56}
                className="font-sans"
                style={{ fontSize: "11px", fill: "var(--text-tertiary)" }}
              >
                LLM keys, adapter credentials, preferences
              </text>

              {/* memory.json */}
              <line x1={12} y1={94} x2={36} y2={94} stroke="var(--border)" strokeWidth={1.5} />
              <foreignObject x={40} y={82} width={24} height={24}>
                <div className="flex items-center justify-center h-full">
                  <Brain size={15} className="text-accent-purple" />
                </div>
              </foreignObject>
              <text
                x={68}
                y={96}
                className="font-mono"
                style={{ fontSize: "13px", fill: "var(--text-primary)" }}
              >
                memory.json
              </text>
              <text
                x={182}
                y={96}
                className="font-sans"
                style={{ fontSize: "11px", fill: "var(--text-tertiary)" }}
              >
                Conversation history, learned preferences
              </text>

              {/* skills/ folder */}
              <line x1={12} y1={134} x2={36} y2={134} stroke="var(--border)" strokeWidth={1.5} />
              <foreignObject x={40} y={122} width={24} height={24}>
                <div className="flex items-center justify-center h-full">
                  <FolderTree size={15} className="text-correct-green" />
                </div>
              </foreignObject>
              <text
                x={68}
                y={136}
                className="font-mono"
                style={{ fontSize: "13px", fill: "var(--text-primary)" }}
              >
                skills/
              </text>
              <text
                x={132}
                y={136}
                className="font-sans"
                style={{ fontSize: "11px", fill: "var(--text-tertiary)" }}
              >
                SKILL.md files &mdash; one per ability
              </text>

              {/* nested skill files */}
              <line x1={52} y1={148} x2={52} y2={200} stroke="var(--border)" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={52} y1={170} x2={72} y2={170} stroke="var(--border)" strokeWidth={1} strokeDasharray="3 3" />
              <text
                x={78}
                y={174}
                className="font-mono"
                style={{ fontSize: "11px", fill: "var(--text-tertiary)" }}
              >
                email-summarizer.md
              </text>
              <line x1={52} y1={194} x2={72} y2={194} stroke="var(--border)" strokeWidth={1} strokeDasharray="3 3" />
              <text
                x={78}
                y={198}
                className="font-mono"
                style={{ fontSize: "11px", fill: "var(--text-tertiary)" }}
              >
                smart-home.md
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Why care? */}
      <div className="why-care mt-10">
        <p className="font-sans text-sm font-semibold uppercase tracking-wide text-forward-blue mb-1">
          Why care?
        </p>
        <p className="font-serif text-base leading-relaxed sm:text-lg">
          This is why your agent remembers that you like your coffee orders texted to you at
          7am&mdash;and can learn to do anything the community has already figured out.
        </p>
      </div>
    </SectionWrapper>
  );
}
