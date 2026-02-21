"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { nameTimeline, growthMilestones } from "@/lib/explainers/openclaw-timeline";

/* --- Custom Recharts tooltip --- */

interface TooltipPayloadEntry {
  value: number;
  payload: { month: string; stars: number; label: string };
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-bg-card px-3 py-2 shadow-md">
      <p className="font-mono text-xs text-text-tertiary">{d.month}</p>
      <p className="font-sans text-sm font-semibold text-text-primary">
        {d.stars.toLocaleString()} stars
      </p>
      <p className="font-sans text-xs text-text-secondary">{d.label}</p>
    </div>
  );
}

/* --- NamingSection --- */

export default function NamingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-play timeline every 4 seconds */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nameTimeline.length);
    }, 4000);
  }, []);

  useEffect(() => {
    if (playing) {
      startAutoPlay();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, startAutoPlay]);

  const togglePlay = () => setPlaying((p) => !p);

  const selectEvent = (i: number) => {
    setActiveIndex(i);
    /* Reset the timer so the user gets a full 4s on the newly selected event */
    if (playing) startAutoPlay();
  };

  return (
    <SectionWrapper id="naming">
      {/* Section header */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-amber mb-3">
          Section 04
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Naming Saga
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          Three names in three months&nbsp;&mdash; and a $16&nbsp;million meme
          coin scam in between.
        </p>
      </div>

      {/* Vertical timeline */}
      <div className="relative mt-14 pl-12 sm:pl-16">
        {/* Gradient connector line */}
        <div className="timeline-line" aria-hidden="true" />

        {/* Play / Pause control */}
        <div className="mb-8">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause timeline" : "Play timeline"}
            className="flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-text-secondary transition-colors hover:border-forward-blue hover:text-forward-blue"
            style={{ minHeight: 44, minWidth: 44 }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>

        {/* Events */}
        {nameTimeline.map((event, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={event.name}
              onClick={() => selectEvent(i)}
              className="relative mb-10 block w-full text-left transition-opacity duration-500 last:mb-0"
              style={{ opacity: isActive ? 1 : 0.4 }}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Dot on the line */}
              <span
                className="absolute -left-12 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:-left-16"
                style={{
                  borderColor: event.color,
                  backgroundColor: isActive ? event.color : "var(--bg-card)",
                  transition: "background-color 0.4s ease",
                }}
                aria-hidden="true"
              >
                {isActive && (
                  <span
                    className="block h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--bg-card)" }}
                  />
                )}
              </span>

              {/* Date */}
              <p className="font-mono text-xs uppercase tracking-wide text-text-tertiary">
                {event.date}
              </p>

              {/* Name */}
              <h3
                className="mt-1 font-serif text-2xl font-bold sm:text-3xl"
                style={{ color: isActive ? event.color : "var(--text-primary)" }}
              >
                {event.name}
              </h3>

              {/* Description */}
              <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-text-secondary sm:text-base">
                {event.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* GitHub stars growth chart */}
      <div className="mt-20">
        <h3 className="mb-2 text-center font-serif text-xl font-bold text-text-primary sm:text-2xl">
          GitHub Stars Explosion
        </h3>
        <p className="mb-8 text-center font-sans text-sm text-text-tertiary">
          From weekend project to 190K stars in four months
        </p>

        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={growthMilestones}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="openclaw-starGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--forward-blue)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--forward-blue)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "var(--text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
                }
                tick={{
                  fontSize: 12,
                  fill: "var(--text-tertiary)",
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="stars"
                stroke="var(--forward-blue)"
                strokeWidth={2.5}
                fill="url(#openclaw-starGradient)"
                dot={{
                  r: 5,
                  fill: "var(--forward-blue)",
                  stroke: "var(--bg-card)",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "var(--forward-blue)",
                  stroke: "var(--bg-card)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Milestone labels below the chart */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {growthMilestones.map((m) => (
            <span
              key={m.month}
              className="rounded-full border border-border bg-bg-card px-3 py-1 font-mono text-xs text-text-secondary"
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Why care? callout */}
      <div className="why-care mt-16 font-serif text-base sm:text-lg">
        This is what happens when open-source goes viral&nbsp;&mdash; trademark
        lawyers, meme coin scammers, and 190,000 developers all arrive at once.
      </div>
    </SectionWrapper>
  );
}
