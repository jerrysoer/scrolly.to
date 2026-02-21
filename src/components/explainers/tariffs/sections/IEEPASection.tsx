"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import DateStampedChapter from "@/components/explainers/shared/DateStampedChapter";
import { ieepaTimeline } from "@/lib/explainers/tariffs";

export default function IEEPASection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleNodes, setVisibleNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger-reveal each node
          ieepaTimeline.forEach((_, i) => {
            setTimeout(() => {
              setVisibleNodes((prev) => new Set(prev).add(i));
            }, i * 300);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dotColor = (type: string) => {
    if (type === "critical") return "var(--accent-red)";
    if (type === "resolution") return "var(--accent-green)";
    return "var(--accent-blue)";
  };

  // Determine if the line between two nodes should be red (APR 2025 -> FEB 2026)
  const isRedSegment = (i: number) => {
    if (i >= ieepaTimeline.length - 1) return false;
    const current = ieepaTimeline[i];
    const next = ieepaTimeline[i + 1];
    return current.type === "critical" && next.type === "resolution";
  };

  return (
    <DateStampedChapter
      id="ieepa"
      date="1977 — PRESENT"
      title="A 1977 emergency law written for sanctions, not tariffs."
    >
      <p className="text-base leading-relaxed text-text-secondary">
        The International Emergency Economic Powers Act was designed to let
        presidents freeze assets and block transactions during national
        emergencies. The word &ldquo;tariff&rdquo; doesn&apos;t appear
        anywhere in the statute. For 48 years, every president used it the
        same way &mdash; until one didn&apos;t.
      </p>

      {/* SVG Timeline */}
      <div ref={timelineRef} className="relative mt-12">
        {/* Desktop: centered vertical line with alternating cards */}
        {/* Mobile: left-aligned vertical line with stacked cards */}

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-px"
            style={{ backgroundColor: "var(--border)" }}
          />

          {/* Nodes */}
          <div className="space-y-10">
            {ieepaTimeline.map((event, i) => {
              const visible = visibleNodes.has(i);
              const color = dotColor(event.type);
              const isCritical = event.type === "critical";
              const isResolution = event.type === "resolution";
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={event.year}
                  className={`relative flex items-start transition-all duration-600 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Red segment line between critical and resolution */}
                  {isRedSegment(i) && (
                    <div
                      className="absolute left-5 md:left-1/2 md:-translate-x-px"
                      style={{
                        top: "1.25rem",
                        width: "2px",
                        height: "calc(100% + 2.5rem)",
                        backgroundColor: "var(--accent-red)",
                        opacity: visible ? 0.6 : 0,
                        transition: "opacity 0.5s ease",
                      }}
                    />
                  )}

                  {/* Dot */}
                  <div
                    className={`absolute left-5 -translate-x-1/2 md:left-1/2 z-10 flex items-center justify-center rounded-full border-2 ${
                      isCritical ? "h-7 w-7" : "h-5 w-5"
                    }`}
                    style={{
                      borderColor: color,
                      backgroundColor: visible ? color : "var(--bg-primary)",
                      boxShadow: isCritical && visible
                        ? `0 0 12px ${color}, 0 0 24px color-mix(in srgb, ${color} 30%, transparent)`
                        : "none",
                      transition: "background-color 0.4s ease, box-shadow 0.4s ease",
                      top: "0.25rem",
                    }}
                  >
                    {isResolution && visible && (
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    )}
                  </div>

                  {/* Card - mobile: always right; desktop: alternating */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft
                        ? "md:mr-auto md:pr-8 md:text-right"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-wider"
                      style={{ color }}
                    >
                      {event.year}
                    </span>
                    <h4 className="mt-1 font-sans text-base font-bold text-text-primary">
                      {event.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DateStampedChapter>
  );
}
