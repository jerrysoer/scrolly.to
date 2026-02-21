"use client";

import { useState, useCallback, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { channelAdapters } from "@/lib/explainers/openclaw-channels";
import {
  MessageCircle,
  Send,
  Hash,
  Gamepad2,
  Shield,
  Smartphone,
  Globe,
  Users,
  Settings,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageCircle,
  Send,
  Hash,
  Gamepad2,
  Shield,
  Smartphone,
  Globe,
  Users,
};

/* protocol metadata for the detail card */
const protocolInfo: Record<string, { protocol: string; note: string }> = {
  WhatsApp: { protocol: "Binary WebSocket (noise protocol)", note: "Connects via reverse-engineered WhatsApp Web protocol without needing a linked device." },
  Telegram: { protocol: "MTProto over HTTP/2", note: "Uses the grammY framework to poll or webhook Telegram Bot API updates." },
  Slack: { protocol: "Socket Mode WebSocket", note: "Bolt listens for events, commands, and interactions via Slack's Socket Mode." },
  Discord: { protocol: "Discord Gateway WebSocket", note: "Maintains a persistent gateway connection with heartbeating and resumable sessions." },
  Signal: { protocol: "Signal Protocol (double ratchet)", note: "Bridges via the Signal client library with sealed-sender encryption." },
  iMessage: { protocol: "AppleScript IPC", note: "Sends and reads iMessages through macOS AppleScript bridge — Mac-only." },
  Matrix: { protocol: "Matrix Client-Server API (HTTPS + SSE)", note: "Connects to any Matrix homeserver with end-to-end encryption support." },
  Teams: { protocol: "Bot Framework REST API", note: "Registers as a Teams bot via Azure Bot Framework connector." },
};

/* geometry helpers */
const CENTER_X = 250;
const CENTER_Y = 200;
const RADIUS = 145;
const NODE_RX = 38;
const NODE_RY = 28;

function getAdapterPosition(index: number, total: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    x: CENTER_X + RADIUS * Math.cos(angle),
    y: CENTER_Y + RADIUS * Math.sin(angle),
  };
}

/* curved path between center and spoke */
function buildCurvedPath(tx: number, ty: number): string {
  const dx = tx - CENTER_X;
  const dy = ty - CENTER_Y;
  const px = -dy * 0.15;
  const py = dx * 0.15;
  const cx = CENTER_X + dx * 0.5 + px;
  const cy = CENTER_Y + dy * 0.5 + py;
  return `M ${CENTER_X} ${CENTER_Y} Q ${cx} ${cy} ${tx} ${ty}`;
}

export default function GatewaySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSelect = useCallback((i: number) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  const positions = useMemo(
    () => channelAdapters.map((_, i) => getAdapterPosition(i, channelAdapters.length)),
    []
  );

  const activeAdapter = activeIndex !== null ? channelAdapters[activeIndex] : null;
  const activeDetail = activeAdapter ? protocolInfo[activeAdapter.name] : null;

  return (
    <SectionWrapper id="gateway">
      {/* Section header */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-purple mb-3">
          Section 02
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Gateway
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          A single daemon on your machine that speaks every chat language at once.
        </p>
      </div>

      {/* Everyday analogy */}
      <div className="mt-10 rounded-xl border border-border bg-bg-card px-6 py-5 shadow-sm">
        <p className="font-sans text-sm font-semibold uppercase tracking-wide text-text-tertiary mb-2">
          Everyday analogy
        </p>
        <p className="font-serif text-base leading-relaxed text-text-primary sm:text-lg">
          Think of it as a multilingual receptionist&mdash;one person who can answer phones, emails,
          texts, and walk-ins simultaneously, translating each into the same language before passing
          it to the boss.
        </p>
      </div>

      {/* Hub-and-spoke SVG diagram */}
      <div className="mt-14">
        <svg
          viewBox="0 0 500 400"
          width="100%"
          height="auto"
          role="img"
          aria-label="Hub-and-spoke diagram showing the OpenClaw WebSocket gateway connected to eight messaging platform adapters"
          className="mx-auto max-w-xl"
        >
          {/* connection lines */}
          {positions.map((pos, i) => {
            const isActive = activeIndex === i;
            const adapter = channelAdapters[i];
            return (
              <path
                key={`line-${i}`}
                d={buildCurvedPath(pos.x, pos.y)}
                fill="none"
                stroke={isActive ? adapter.color : "var(--border)"}
                strokeWidth={isActive ? 3 : 1.5}
                strokeLinecap="round"
                className="diagram-connection"
                style={{
                  opacity: activeIndex === null || isActive ? 1 : 0.25,
                  transition: "stroke 0.35s ease, stroke-width 0.35s ease, opacity 0.35s ease",
                }}
              />
            );
          })}

          {/* center gateway node */}
          <g className="diagram-node">
            <rect
              x={CENTER_X - 64}
              y={CENTER_Y - 30}
              width={128}
              height={60}
              rx={14}
              fill="var(--bg-card)"
              stroke="var(--accent-purple)"
              strokeWidth={2}
            />
            {/* gear icon via foreignObject */}
            <foreignObject x={CENTER_X - 56} y={CENTER_Y - 22} width={20} height={20}>
              <div className="flex items-center justify-center h-full">
                <Settings size={14} className="text-accent-purple" />
              </div>
            </foreignObject>
            <text
              x={CENTER_X + 2}
              y={CENTER_Y - 6}
              textAnchor="middle"
              className="font-mono"
              style={{ fontSize: "8.5px", fill: "var(--text-tertiary)" }}
            >
              ws://127.0.0.1:18789
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 14}
              textAnchor="middle"
              className="font-sans"
              style={{ fontSize: "12px", fontWeight: 700, fill: "var(--text-primary)" }}
            >
              Gateway
            </text>
          </g>

          {/* adapter spoke nodes */}
          {channelAdapters.map((adapter, i) => {
            const pos = positions[i];
            const isActive = activeIndex === i;
            const IconComp = iconMap[adapter.icon];

            return (
              <g
                key={adapter.name}
                className="diagram-node cursor-pointer"
                onClick={() => handleSelect(i)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${adapter.name} adapter`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(i);
                  }
                }}
                style={{
                  opacity: activeIndex === null || isActive ? 1 : 0.35,
                  transition: "opacity 0.35s ease",
                }}
              >
                {/* touch-target invisible rect */}
                <rect
                  x={pos.x - 28}
                  y={pos.y - 24}
                  width={56}
                  height={52}
                  fill="transparent"
                />
                {/* node ellipse */}
                <ellipse
                  cx={pos.x}
                  cy={pos.y - 4}
                  rx={NODE_RX}
                  ry={NODE_RY}
                  fill={isActive ? adapter.color : "var(--bg-card)"}
                  stroke={adapter.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ transition: "fill 0.3s ease, stroke-width 0.3s ease" }}
                />
                {/* active pulse ring */}
                {isActive && (
                  <ellipse
                    cx={pos.x}
                    cy={pos.y - 4}
                    rx={NODE_RX + 4}
                    ry={NODE_RY + 4}
                    fill="none"
                    stroke={adapter.color}
                    strokeWidth={1}
                    className="animate-ping-slow"
                    style={{ opacity: 0.4 }}
                  />
                )}
                {/* icon via foreignObject */}
                <foreignObject
                  x={pos.x - 8}
                  y={pos.y - 18}
                  width={16}
                  height={16}
                >
                  <div
                    className="flex items-center justify-center h-full"
                    style={!isActive ? { color: adapter.color } : undefined}
                  >
                    {IconComp && (
                      <IconComp
                        size={13}
                        className={isActive ? "text-white" : ""}
                      />
                    )}
                  </div>
                </foreignObject>
                {/* label */}
                <text
                  x={pos.x}
                  y={pos.y + 10}
                  textAnchor="middle"
                  className="font-sans"
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    fill: isActive ? "#fff" : "var(--text-primary)",
                    transition: "fill 0.3s ease",
                  }}
                >
                  {adapter.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Detail card (appears on adapter click) */}
        <div
          className="mx-auto mt-6 max-w-md overflow-hidden transition-all duration-400 ease-out"
          style={{
            maxHeight: activeAdapter ? "220px" : "0px",
            opacity: activeAdapter ? 1 : 0,
            transition: "max-height 0.4s ease, opacity 0.35s ease",
          }}
        >
          {activeAdapter && activeDetail && (
            <div
              className="rounded-xl border bg-bg-card p-5 shadow-sm"
              style={{ borderColor: activeAdapter.color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: activeAdapter.color + "18" }}
                >
                  {iconMap[activeAdapter.icon] &&
                    (() => {
                      const Ic = iconMap[activeAdapter.icon];
                      return (
                        <span style={{ color: activeAdapter.color }}>
                          <Ic size={18} />
                        </span>
                      );
                    })()}
                </div>
                <div>
                  <p className="font-sans text-base font-bold text-text-primary">
                    {activeAdapter.name}
                  </p>
                  <p className="font-mono text-xs text-text-tertiary">
                    {activeAdapter.library}
                  </p>
                </div>
                <span
                  className="ml-auto rounded-full px-3 py-1 font-mono text-[11px] font-medium"
                  style={{
                    backgroundColor: activeAdapter.color + "14",
                    color: activeAdapter.color,
                  }}
                >
                  {activeDetail.protocol}
                </span>
              </div>
              <p className="font-sans text-sm leading-relaxed text-text-secondary">
                {activeDetail.note}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* WebSocket jargon callout */}
      <p className="mt-12 text-center font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
        The gateway holds a single{" "}
        <JargonTerm
          term="WebSocket"
          definition="A persistent two-way connection — like a phone line that stays open instead of hanging up after each message."
        >
          WebSocket
        </JargonTerm>{" "}
        connection per platform, marshalling every inbound message into a unified envelope before
        routing it to the LLM.
      </p>

      {/* Why care? */}
      <div className="why-care mt-10">
        <p className="font-sans text-sm font-semibold uppercase tracking-wide text-forward-blue mb-1">
          Why care?
        </p>
        <p className="font-serif text-base leading-relaxed sm:text-lg">
          This is why you can message your AI from WhatsApp, get a response in Slack, and never
          need to install another app.
        </p>
      </div>
    </SectionWrapper>
  );
}
