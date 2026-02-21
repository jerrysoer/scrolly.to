"use client";

import { useState } from "react";
import {
  MessageSquare,
  Radio,
  Brain,
  Wrench,
  Send,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

/* --- Flow stages data --- */

interface Stage {
  id: number;
  title: string;
  shortLabel: string;
  description: string;
  Icon: typeof MessageSquare;
  color: string;
}

const stages: Stage[] = [
  {
    id: 0,
    title: "You send a message",
    shortLabel: "Message",
    description:
      "You type a natural-language command in WhatsApp, Telegram, Slack, or any connected chat app. It could be as casual as \"cancel my 3pm\" or as specific as \"deploy the staging branch to prod.\"",
    Icon: MessageSquare,
    color: "var(--correct-green)",
  },
  {
    id: 1,
    title: "Gateway receives it",
    shortLabel: "Gateway",
    description:
      "The OpenClaw daemon running on your machine holds a persistent WebSocket connection to each chat platform. When your message arrives, the gateway normalizes it into a standard format regardless of which app sent it.",
    Icon: Radio,
    color: "var(--accent-amber)",
  },
  {
    id: 2,
    title: "LLM thinks",
    shortLabel: "LLM",
    description:
      "Your message — plus conversation history and available skill definitions — is sent to the configured LLM (Claude, GPT-4, DeepSeek, or a local model via Ollama). The model decides what action to take and which tools to invoke.",
    Icon: Brain,
    color: "var(--accent-purple)",
  },
  {
    id: 3,
    title: "Agent acts",
    shortLabel: "Action",
    description:
      "Based on the LLM's response, the agent executes tools: running shell commands, reading or writing files, browsing the web, calling APIs, or triggering installed skills. It can chain multiple actions in sequence.",
    Icon: Wrench,
    color: "var(--backward-orange)",
  },
  {
    id: 4,
    title: "Reply delivered",
    shortLabel: "Reply",
    description:
      "The result is formatted and sent back through the same chat channel you messaged from. You see a normal reply in your chat app — as if you were texting a very capable friend.",
    Icon: Send,
    color: "var(--forward-blue)",
  },
];

/* --- SVG Flow Diagram --- */

function FlowDiagram({ activeStage }: { activeStage: number }) {
  const nodeWidth = 80;
  const nodeHeight = 54;
  const gap = 24;
  const totalWidth = stages.length * nodeWidth + (stages.length - 1) * gap;
  const viewBoxWidth = totalWidth + 40;
  const viewBoxHeight = 90;

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width="100%"
      height="auto"
      aria-label="Five-stage flow diagram: Message, Gateway, LLM, Action, Reply"
      className="block"
    >
      {stages.map((stage, i) => {
        const x = 20 + i * (nodeWidth + gap);
        const centerX = x + nodeWidth / 2;
        const centerY = viewBoxHeight / 2;
        const isActive = i === activeStage;
        const isPast = i < activeStage;

        return (
          <g key={stage.id}>
            {/* Arrow to next node */}
            {i < stages.length - 1 && (
              <>
                <line
                  x1={x + nodeWidth + 2}
                  y1={centerY}
                  x2={x + nodeWidth + gap - 6}
                  y2={centerY}
                  stroke={
                    i < activeStage
                      ? "var(--forward-blue)"
                      : "var(--border)"
                  }
                  strokeWidth={i < activeStage ? "2" : "1.5"}
                  strokeDasharray={i < activeStage ? "none" : "4,3"}
                  style={{ transition: "all 0.4s ease" }}
                />
                <polygon
                  points={`${x + nodeWidth + gap - 8},${centerY - 3} ${x + nodeWidth + gap - 2},${centerY} ${x + nodeWidth + gap - 8},${centerY + 3}`}
                  fill={
                    i < activeStage
                      ? "var(--forward-blue)"
                      : "var(--border)"
                  }
                  style={{ transition: "fill 0.4s ease" }}
                />
              </>
            )}

            {/* Node rectangle */}
            <rect
              x={x}
              y={centerY - nodeHeight / 2}
              width={nodeWidth}
              height={nodeHeight}
              rx="10"
              fill={
                isActive
                  ? "var(--forward-blue)"
                  : "var(--bg-card)"
              }
              fillOpacity={isActive ? 0.1 : 1}
              stroke={
                isActive
                  ? "var(--forward-blue)"
                  : isPast
                    ? "var(--forward-blue)"
                    : "var(--border)"
              }
              strokeWidth={isActive ? "2.5" : isPast ? "1.5" : "1.5"}
              strokeOpacity={isPast && !isActive ? 0.4 : 1}
              style={{ transition: "all 0.4s ease" }}
            />

            {/* Icon placeholder (small circle) */}
            <circle
              cx={centerX}
              cy={centerY - 6}
              r="8"
              fill={
                isActive
                  ? stage.color
                  : isPast
                    ? stage.color
                    : "var(--bg-secondary)"
              }
              fillOpacity={isActive ? 0.2 : isPast ? 0.12 : 0.5}
              style={{ transition: "all 0.4s ease" }}
            />

            {/* Stage number inside icon circle */}
            <text
              x={centerX}
              y={centerY - 3}
              textAnchor="middle"
              fontSize="8"
              fontFamily="var(--font-mono)"
              fontWeight="700"
              fill={
                isActive
                  ? stage.color
                  : isPast
                    ? stage.color
                    : "var(--text-tertiary)"
              }
              style={{ transition: "fill 0.4s ease" }}
            >
              {i + 1}
            </text>

            {/* Short label */}
            <text
              x={centerX}
              y={centerY + 16}
              textAnchor="middle"
              fontSize="8"
              fontFamily="var(--font-sans)"
              fontWeight="600"
              fill={
                isActive
                  ? "var(--forward-blue)"
                  : isPast
                    ? "var(--text-secondary)"
                    : "var(--text-tertiary)"
              }
              style={{ transition: "fill 0.4s ease" }}
            >
              {stage.shortLabel}
            </text>

            {/* Active indicator dot */}
            {isActive && (
              <circle
                cx={centerX}
                cy={centerY + nodeHeight / 2 + 8}
                r="3"
                fill="var(--forward-blue)"
                className="animate-pulse-glow"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* --- Mobile-friendly vertical flow --- */

function FlowDiagramMobile({ activeStage }: { activeStage: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {stages.map((stage, i) => {
        const isActive = i === activeStage;
        const isPast = i < activeStage;

        return (
          <div key={stage.id} className="flex flex-col items-center">
            {/* Node */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3 w-full max-w-xs"
              style={{
                borderColor: isActive
                  ? "var(--forward-blue)"
                  : isPast
                    ? "color-mix(in srgb, var(--forward-blue) 40%, transparent)"
                    : "var(--border)",
                backgroundColor: isActive
                  ? "color-mix(in srgb, var(--forward-blue) 8%, var(--bg-card))"
                  : "var(--bg-card)",
                transition: "all 0.4s ease",
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: isActive
                    ? stage.color
                    : isPast
                      ? stage.color
                      : "var(--bg-secondary)",
                  opacity: isActive ? 0.2 : isPast ? 0.15 : 0.5,
                  transition: "all 0.4s ease",
                }}
              >
                <span
                  className="font-mono text-xs font-bold"
                  style={{
                    color: isActive || isPast ? stage.color : "var(--text-tertiary)",
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <span
                className="font-sans text-sm font-semibold"
                style={{
                  color: isActive
                    ? "var(--forward-blue)"
                    : isPast
                      ? "var(--text-secondary)"
                      : "var(--text-tertiary)",
                  transition: "color 0.4s ease",
                }}
              >
                {stage.shortLabel}
              </span>
              {isActive && (
                <div
                  className="ml-auto h-2 w-2 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: "var(--forward-blue)" }}
                />
              )}
            </div>

            {/* Arrow down between nodes */}
            {i < stages.length - 1 && (
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                className="my-0.5"
                aria-hidden="true"
              >
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="14"
                  stroke={
                    i < activeStage
                      ? "var(--forward-blue)"
                      : "var(--border)"
                  }
                  strokeWidth="1.5"
                  strokeDasharray={i < activeStage ? "none" : "3,2"}
                  style={{ transition: "all 0.4s ease" }}
                />
                <polygon
                  points="3,13 6,18 9,13"
                  fill={
                    i < activeStage
                      ? "var(--forward-blue)"
                      : "var(--border)"
                  }
                  style={{ transition: "fill 0.4s ease" }}
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* --- Main Section Component --- */

export default function MessageFlowSection() {
  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];

  const goNext = () =>
    setActiveStage((prev) => Math.min(prev + 1, stages.length - 1));
  const goPrev = () =>
    setActiveStage((prev) => Math.max(prev - 1, 0));

  return (
    <SectionWrapper id="message-flow">
      {/* Section Header */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-3">
          Section 01
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Your Chat, Its Brain
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          Every interaction follows the same five-step loop: you send a message
          in plain language, and OpenClaw turns it into real-world action&nbsp;&mdash;
          then reports back in the same chat thread.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="mt-14">
        {/* Desktop: horizontal SVG */}
        <div className="hidden sm:block">
          <FlowDiagram activeStage={activeStage} />
        </div>
        {/* Mobile: vertical layout */}
        <div className="block sm:hidden">
          <FlowDiagramMobile activeStage={activeStage} />
        </div>
      </div>

      {/* Stage Description Card */}
      <div
        className="mt-8 rounded-xl border border-border bg-bg-card p-6 sm:p-8"
        style={{ transition: "border-color 0.4s ease" }}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: current.color,
              opacity: 0.15,
            }}
          >
            <current.Icon
              size={20}
              style={{ color: current.color }}
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-1">
              Step {activeStage + 1} of {stages.length}
            </p>
            <h3 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
              {current.title}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary sm:text-base">
              {activeStage === 1 ? (
                <>
                  The OpenClaw daemon running on your machine holds a persistent{" "}
                  <JargonTerm
                    term="WebSocket"
                    definition="A persistent two-way connection between your machine and the chat platform — like a phone line that stays open instead of hanging up after each message."
                  >
                    WebSocket
                  </JargonTerm>{" "}
                  connection to each chat platform. When your message arrives,
                  the gateway normalizes it into a standard format regardless of
                  which app sent it.
                </>
              ) : (
                current.description
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={activeStage === 0}
          className="flex h-11 min-w-[44px] items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2 font-sans text-sm font-medium text-text-secondary transition-colors hover:border-forward-blue hover:text-forward-blue disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-secondary"
          aria-label="Previous step"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Flow stages">
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(i)}
              className="h-[44px] w-[44px] flex items-center justify-center"
              role="tab"
              aria-selected={i === activeStage}
              aria-label={`Step ${i + 1}: ${stage.title}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === activeStage ? "24px" : "8px",
                  height: "8px",
                  backgroundColor:
                    i === activeStage
                      ? "var(--forward-blue)"
                      : i < activeStage
                        ? "color-mix(in srgb, var(--forward-blue) 40%, transparent)"
                        : "var(--border)",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={activeStage === stages.length - 1}
          className="flex h-11 min-w-[44px] items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2 font-sans text-sm font-medium text-text-secondary transition-colors hover:border-forward-blue hover:text-forward-blue disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-secondary"
          aria-label="Next step"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      {/* "Why should I care?" Callout */}
      <div className="why-care mt-12">
        <p className="font-sans text-base leading-relaxed sm:text-lg">
          This is why you can text &ldquo;cancel my 3pm meeting&rdquo; from a
          beach in Thailand and have it actually happen&nbsp;&mdash; without
          opening a laptop.
        </p>
      </div>
    </SectionWrapper>
  );
}
