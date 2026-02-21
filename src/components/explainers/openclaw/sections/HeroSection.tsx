"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronDown, Star, Puzzle, Radio, Calendar, Mail, TerminalSquare } from "lucide-react";

/* --- Animated hero visual: chat bubble -> agent claw -> action icons --- */

interface FloatingMessage {
  id: number;
  progress: number;
  opacity: number;
}

export default function HeroSection() {
  const [messages, setMessages] = useState<FloatingMessage[]>([]);
  const [msgId, setMsgId] = useState(0);
  const [activeAction, setActiveAction] = useState(0);

  /* Spawn a message bubble that travels from phone to agent */
  const spawnMessage = useCallback(() => {
    setMsgId((prev) => {
      const newId = prev + 1;
      setMessages((m) => [
        ...m.slice(-6),
        { id: newId, progress: 0, opacity: 0 },
      ]);
      return newId;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnMessage, 2400);
    return () => clearInterval(interval);
  }, [spawnMessage]);

  /* Animate messages along the path */
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) =>
        prev
          .map((m) => ({
            ...m,
            progress: m.progress + 0.012,
            opacity:
              m.progress < 0.08
                ? m.progress / 0.08
                : m.progress > 0.42
                  ? Math.max(0, (0.5 - m.progress) / 0.08)
                  : 1,
          }))
          .filter((m) => m.progress <= 0.55)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  /* Cycle through the action icons that fan out from the agent */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAction((prev) => (prev + 1) % 3);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl text-center">
        {/* Kicker */}
        <span className="mb-4 inline-block font-mono text-sm tracking-widest uppercase text-forward-blue animate-fade-in">
          Interactive Explainer
        </span>

        {/* Heading */}
        <h1 className="mb-6 font-serif text-4xl font-bold italic tracking-tight text-text-primary sm:text-5xl lg:text-7xl animate-fade-in">
          The Agent That
          <br />
          <span className="text-forward-blue">Never Sleeps</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl animate-rise-up">
          OpenClaw turns your chat apps into a command center for an AI that
          runs 24/7 on your own machine&nbsp;&mdash; no cloud, no subscription,
          no limits.
        </p>

        {/* Everyday analogy */}
        <p className="mx-auto mb-14 max-w-xl font-serif text-base italic leading-relaxed text-text-tertiary sm:text-lg animate-rise-up">
          Imagine hiring a personal assistant who works around the clock, lives
          inside your phone, and never forgets a thing. That&rsquo;s the promise
          of OpenClaw.
        </p>

        {/* --- Animated SVG Visual --- */}

        {/* Desktop: horizontal layout */}
        <div className="relative mx-auto mb-16 w-full max-w-3xl animate-rise-up hidden md:block">
          <svg
            viewBox="0 0 600 200"
            width="100%"
            height="auto"
            aria-label="Diagram showing a chat message flowing into the OpenClaw agent, which fans out to Calendar, Email, and Terminal actions"
            className="overflow-visible"
          >
            {/* Phone / Chat bubble (left) */}
            <g>
              <rect x="30" y="50" width="70" height="100" rx="12" fill="var(--bg-card)" stroke="var(--text-tertiary)" strokeWidth="2" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.1))" />
              <rect x="38" y="62" width="54" height="76" rx="4" fill="var(--bg-primary)" />
              <rect x="42" y="70" width="46" height="22" rx="6" fill="var(--forward-blue)" opacity="0.3" />
              <text x="65" y="84" textAnchor="middle" fill="var(--forward-blue)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="600">Schedule my</text>
              <rect x="42" y="96" width="46" height="16" rx="6" fill="var(--forward-blue)" opacity="0.3" />
              <text x="65" y="107" textAnchor="middle" fill="var(--forward-blue)" fontSize="7" fontFamily="var(--font-sans)" fontWeight="600">meetings...</text>
              <rect x="52" y="142" width="26" height="3" rx="1.5" fill="var(--text-tertiary)" />
            </g>

            {/* Connection line: Phone -> Agent */}
            <line x1="110" y1="100" x2="240" y2="100" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="6,4" />
            <polygon points="236,95 244,100 236,105" fill="var(--text-tertiary)" />

            {/* Traveling message particles */}
            {messages.map((m) => {
              const x = 110 + (240 - 110) * (m.progress / 0.5);
              return (
                <g key={m.id} opacity={m.opacity}>
                  <rect x={x - 14} y="90" width="28" height="18" rx="6" fill="var(--forward-blue)" opacity="0.4" />
                  <circle cx={x - 4} cy="99" r="1.5" fill="var(--forward-blue)" />
                  <circle cx={x} cy="99" r="1.5" fill="var(--forward-blue)" />
                  <circle cx={x + 4} cy="99" r="1.5" fill="var(--forward-blue)" />
                </g>
              );
            })}

            {/* Agent / Claw-Gear Icon (center) */}
            <g>
              <circle cx="300" cy="100" r="48" fill="none" stroke="var(--forward-blue)" strokeWidth="1.5" opacity="0.35" className="animate-ping-slow" />
              <circle cx="300" cy="100" r="40" fill="var(--bg-card)" stroke="var(--forward-blue)" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const tx = 300 + 36 * Math.cos(rad);
                const ty = 100 + 36 * Math.sin(rad);
                return (
                  <rect key={angle} x={tx - 4} y={ty - 4} width="8" height="8" rx="2" fill="var(--forward-blue)" opacity="0.5" transform={`rotate(${angle}, ${tx}, ${ty})`} />
                );
              })}
              <text x="300" y="108" textAnchor="middle" fontSize="28" fill="var(--forward-blue)" fontFamily="var(--font-serif)" fontWeight="700">{"{ }"}</text>
              <text x="300" y="158" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600">OpenClaw Agent</text>
            </g>

            {/* Fan-out lines: Agent -> Actions */}
            {[
              { x: 490, y: 40, label: "Calendar", Icon: Calendar },
              { x: 510, y: 100, label: "Email", Icon: Mail },
              { x: 490, y: 160, label: "Terminal", Icon: TerminalSquare },
            ].map((action, i) => {
              const isActive = i === activeAction;
              const boxW = 80;
              const boxH = 36;
              const boxX = action.x - boxW / 2;
              const boxY = action.y - boxH / 2;
              return (
                <g key={action.label}>
                  <line x1={340} y1={100} x2={boxX - 4} y2={action.y} stroke={isActive ? "var(--forward-blue)" : "var(--text-tertiary)"} strokeWidth={isActive ? "2" : "1.5"} strokeDasharray={isActive ? "none" : "6,4"} style={{ transition: "all 0.4s ease" }} />
                  <polygon points={`${boxX - 6},${action.y - 3} ${boxX},${action.y} ${boxX - 6},${action.y + 3}`} fill={isActive ? "var(--forward-blue)" : "var(--text-tertiary)"} style={{ transition: "fill 0.4s ease" }} />
                  <rect x={boxX} y={boxY} width={boxW} height={boxH} rx="8" fill={isActive ? "var(--forward-blue)" : "var(--bg-card)"} fillOpacity={isActive ? 0.12 : 1} stroke={isActive ? "var(--forward-blue)" : "var(--text-tertiary)"} strokeWidth={isActive ? "2" : "1.5"} style={{ transition: "all 0.4s ease" }} />
                  {/* Lucide icon via foreignObject */}
                  <foreignObject x={action.x - 28} y={action.y - 7} width={14} height={14}>
                    <div className="flex items-center justify-center h-full" style={{ color: isActive ? "var(--forward-blue)" : "var(--text-tertiary)", transition: "color 0.4s ease" }}>
                      <action.Icon size={11} />
                    </div>
                  </foreignObject>
                  <text x={action.x + 2} y={action.y + 4} textAnchor="middle" fontSize="10" fontFamily="var(--font-sans)" fontWeight="600" fill={isActive ? "var(--forward-blue)" : "var(--text-secondary)"} style={{ transition: "fill 0.4s ease" }}>{action.label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile & tablet: vertical stacked layout */}
        <div className="relative mx-auto mb-16 w-full max-w-xs animate-rise-up block md:hidden">
          <div className="flex flex-col items-center gap-3">
            {/* Phone icon */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-card px-5 py-3.5 w-full">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forward-blue/10">
                <span className="text-forward-blue font-mono text-sm font-bold">💬</span>
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-text-primary">Your Message</p>
                <p className="font-mono text-xs text-text-tertiary">&ldquo;Schedule my meetings&rdquo;</p>
              </div>
            </div>

            {/* Arrow down */}
            <svg width="12" height="24" viewBox="0 0 12 24" aria-hidden="true">
              <line x1="6" y1="0" x2="6" y2="18" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4,3" />
              <polygon points="3,16 6,22 9,16" fill="var(--text-tertiary)" />
            </svg>

            {/* Agent circle */}
            <div className="relative flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-forward-blue bg-bg-card shadow-md">
                <span className="font-serif text-2xl font-bold text-forward-blue">{"{ }"}</span>
              </div>
              <p className="mt-2 font-sans text-sm font-semibold text-text-secondary">OpenClaw Agent</p>
            </div>

            {/* Arrow down */}
            <svg width="12" height="24" viewBox="0 0 12 24" aria-hidden="true">
              <line x1="6" y1="0" x2="6" y2="18" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4,3" />
              <polygon points="3,16 6,22 9,16" fill="var(--text-tertiary)" />
            </svg>

            {/* Actions */}
            <div className="flex flex-col gap-2 w-full">
              {[
                { emoji: "📅", label: "Calendar", desc: "Schedule events" },
                { emoji: "✉️", label: "Email", desc: "Send messages" },
                { emoji: ">_", label: "Terminal", desc: "Run commands" },
              ].map((action, i) => {
                const isActive = i === activeAction;
                return (
                  <div
                    key={action.label}
                    className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-400"
                    style={{
                      borderColor: isActive ? "var(--forward-blue)" : "var(--border)",
                      backgroundColor: isActive ? "color-mix(in srgb, var(--forward-blue) 6%, var(--bg-card))" : "var(--bg-card)",
                    }}
                  >
                    <span className="text-lg" style={{ opacity: isActive ? 1 : 0.5, transition: "opacity 0.4s ease" }}>
                      {action.emoji}
                    </span>
                    <div>
                      <p className="font-sans text-sm font-semibold" style={{ color: isActive ? "var(--forward-blue)" : "var(--text-primary)", transition: "color 0.4s ease" }}>
                        {action.label}
                      </p>
                      <p className="font-mono text-xs text-text-tertiary">{action.desc}</p>
                    </div>
                    {isActive && (
                      <div className="ml-auto h-2 w-2 rounded-full animate-pulse-glow" style={{ backgroundColor: "var(--forward-blue)" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mx-auto mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12 animate-rise-up">
          {[
            { icon: Star, value: "190K+", label: "GitHub stars" },
            { icon: Puzzle, value: "5,700+", label: "community skills" },
            { icon: Radio, value: "50+", label: "chat platforms" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-full border border-border bg-bg-card px-5 py-2.5"
            >
              <stat.icon
                size={16}
                className="text-forward-blue"
                aria-hidden="true"
              />
              <span className="font-mono text-sm text-text-primary">
                <strong>{stat.value}</strong>{" "}
                <span className="text-text-secondary">{stat.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-down Indicator */}
      <button
        onClick={() =>
          document
            .getElementById("message-flow")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-down"
        aria-label="Scroll to first section"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
          Scroll
        </span>
        <ChevronDown size={20} className="text-text-tertiary" />
      </button>
    </section>
  );
}
