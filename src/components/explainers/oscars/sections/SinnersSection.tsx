"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { MOST_NOMINATED, type NominatedFilm } from "@/lib/explainers/oscars";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_NOMINATIONS = 16;
const BAR_ANIMATION_STAGGER_MS = 80;

// Sort ascending so Sinners (record) renders last
const FILMS_ASCENDING: NominatedFilm[] = [...MOST_NOMINATED].sort(
  (a, b) => a.nominations - b.nominations
);

// ─── AnimatedBarChart ─────────────────────────────────────────────────────────

function AnimatedBarChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-2.5" role="list" aria-label="Most nominated films at the Oscars">
      {FILMS_ASCENDING.map((film, i) => {
        const isSinners = film.isRecord === true;
        const targetWidthPct = (film.nominations / MAX_NOMINATIONS) * 100;
        const delay = revealed ? i * BAR_ANIMATION_STAGGER_MS : 0;

        return (
          <div
            key={`${film.film}-${film.year}`}
            className="flex items-center gap-3"
            role="listitem"
          >
            {/* Film name */}
            <div
              className="text-xs leading-tight text-right flex-shrink-0"
              style={{
                width: "130px",
                color: isSinners ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: isSinners ? 700 : 400,
              }}
            >
              <span>{film.film}</span>
              <span
                className="block text-[10px]"
                style={{ color: "var(--text-tertiary)" }}
              >
                {film.year}
              </span>
            </div>

            {/* Bar track */}
            <div
              className="relative h-6 rounded-md flex-1 overflow-hidden"
              style={{ background: "var(--bg-secondary)" }}
            >
              {/* Animated fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-md transition-all ease-out"
                style={{
                  width: revealed ? `${targetWidthPct}%` : "0%",
                  transitionDuration: "600ms",
                  transitionDelay: `${delay}ms`,
                  background: isSinners
                    ? "var(--forward-blue)"
                    : "var(--text-tertiary)",
                  opacity: isSinners ? 1 : 0.45,
                }}
              />

              {/* Record star badge on Sinners bar */}
              {isSinners && (
                <div
                  className="absolute inset-y-0 right-1 flex items-center"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transition: `opacity 300ms ease-out ${delay + 500}ms`,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="var(--accent-amber)"
                    aria-label="Record holder"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Nomination count */}
            <span
              className="text-xs font-semibold tabular-nums flex-shrink-0"
              style={{
                width: "24px",
                color: isSinners ? "var(--forward-blue)" : "var(--text-tertiary)",
                fontWeight: isSinners ? 700 : 400,
              }}
            >
              {film.nominations}
            </span>
          </div>
        );
      })}

      <p
        className="text-[10px] mt-1"
        style={{ color: "var(--text-tertiary)" }}
      >
        Source: Academy of Motion Picture Arts and Sciences
      </p>
    </div>
  );
}

// ─── DirectorCard ─────────────────────────────────────────────────────────────

function DirectorCard() {
  return (
    <div
      className="rounded-xl p-4 flex items-center gap-4"
      style={{
        background: "linear-gradient(145deg, #141622, #1a1c2e)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      {/* SVG silhouette */}
      <div
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          background: "color-mix(in srgb, var(--forward-blue) 20%, rgba(15,23,42,0.8))",
          border: "1.5px solid color-mix(in srgb, var(--forward-blue) 40%, transparent)",
        }}
        aria-hidden="true"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          {/* Head */}
          <circle cx="14" cy="9" r="5" fill="rgba(96,165,250,0.55)" />
          {/* Shoulders */}
          <path
            d="M4 26c0-5.523 4.477-10 10-10s10 4.477 10 10"
            fill="rgba(96,165,250,0.35)"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-0.5">
        <p
          className="text-sm font-bold"
          style={{ color: "var(--forward-blue)" }}
        >
          Ryan Coogler
        </p>
        <p
          className="text-[11px]"
          style={{ color: "rgba(148,163,184,0.75)" }}
        >
          Director &mdash; Sinners (2026)
        </p>
      </div>
    </div>
  );
}

// ─── StatSubCards ─────────────────────────────────────────────────────────────

const STAT_SUB_CARDS = [
  {
    label: "Previous record",
    value: "14 nominations",
    note: "Shared by All About Eve (1950), Titanic (1997), and La La Land (2016)",
  },
  {
    label: "Representation milestone",
    value: "10 Black nominees",
    note: "Ties the record set by Judas and the Black Messiah (2021)*",
  },
  {
    label: "Historic triple",
    value: "2nd Black filmmaker",
    note: "Nominated for producing + directing + writing the same film — after Jordan Peele",
  },
];

// ─── SinnersSection ───────────────────────────────────────────────────────────

export default function SinnersSection() {
  return (
    <SectionWrapper id="sinners" layout="split-left">
      {/* ── LEFT COLUMN — Animated bar chart ── */}
      <div className="flex flex-col gap-6">
        {/* Section number divider */}
        <div className="section-number-divider" aria-hidden="true">
          <span className="section-number-badge">07</span>
        </div>

        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Sinners
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Most nominated films in Oscar history
          </p>
        </div>

        <AnimatedBarChart />
      </div>

      {/* ── RIGHT COLUMN — Stats callout ── */}
      <div className="flex flex-col gap-6">
        {/* Hero stat */}
        <div className="flex flex-col gap-1">
          <span className="stat-hero" aria-label="16 nominations">16</span>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            nominations &mdash; an all-time record
          </p>
        </div>

        {/* Stat sub-cards */}
        <div className="flex flex-col gap-3">
          {STAT_SUB_CARDS.map((card) => (
            <div
              key={card.label}
              className="rounded-xl p-4"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                {card.label}
              </p>
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {card.value}
              </p>
              <p
                className="text-xs leading-snug"
                style={{ color: "var(--text-secondary)" }}
              >
                {card.note}
              </p>
            </div>
          ))}
        </div>

        {/* Director card */}
        <DirectorCard />

        {/* Accuracy footnote */}
        <aside
          className="rounded-lg px-4 py-3"
          style={{
            background: "color-mix(in srgb, var(--accent-amber) 6%, var(--bg-secondary))",
            border: "1px solid color-mix(in srgb, var(--accent-amber) 20%, var(--border))",
          }}
          aria-label="Accuracy note"
        >
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="font-semibold"
              style={{ color: "var(--accent-amber)" }}
            >
              * Accuracy note:
            </span>{" "}
            &ldquo;Ties the record&rdquo; &mdash; Judas and the Black Messiah had 10
            Black nominees in 2021.
          </p>
        </aside>
      </div>
    </SectionWrapper>
  );
}
