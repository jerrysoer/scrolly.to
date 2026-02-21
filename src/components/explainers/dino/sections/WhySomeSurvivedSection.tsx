"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { survivors } from "@/lib/explainers/extinction";
import type { Survivor } from "@/lib/explainers/extinction";

function AnimalSilhouette({ name, survived }: { name: string; survived: boolean }) {
  const color = survived ? "var(--life-green)" : "var(--firestorm-hot)";

  // Simple silhouette SVGs for each animal type
  const silhouettes: Record<string, React.ReactNode> = {
    "Small Mammals": (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="24" rx="12" ry="8" fill={color} opacity="0.7" />
        <circle cx="14" cy="18" r="5" fill={color} opacity="0.7" />
        <circle cx="12" cy="15" r="2" fill={color} opacity="0.7" />
        <circle cx="16" cy="15" r="2" fill={color} opacity="0.7" />
        <path d="M32 24 Q36 20 34 28" stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
    ),
    Crocodilians: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="22" rx="16" ry="5" fill={color} opacity="0.7" />
        <path d="M4 20 L2 18 L6 22" fill={color} opacity="0.7" />
        <circle cx="10" cy="19" r="1.5" fill={color} />
        <path d="M34 22 Q38 22 40 24" stroke={color} strokeWidth="2" fill="none" />
      </svg>
    ),
    Birds: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="22" rx="8" ry="6" fill={color} opacity="0.7" />
        <circle cx="14" cy="18" r="4" fill={color} opacity="0.7" />
        <path d="M10 18 L8 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 18 Q34 14 36 16" stroke={color} strokeWidth="1.5" fill="none" />
        <line x1="18" y1="28" x2="16" y2="33" stroke={color} strokeWidth="1" />
        <line x1="22" y1="28" x2="24" y2="33" stroke={color} strokeWidth="1" />
      </svg>
    ),
    Insects: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="22" rx="5" ry="3" fill={color} opacity="0.7" />
        <circle cx="14" cy="22" r="3" fill={color} opacity="0.7" />
        <ellipse cx="27" cy="22" rx="4" ry="2.5" fill={color} opacity="0.7" />
        <line x1="12" y1="20" x2="8" y2="16" stroke={color} strokeWidth="0.8" />
        <line x1="12" y1="20" x2="8" y2="18" stroke={color} strokeWidth="0.8" />
      </svg>
    ),
    "Sharks & Fish": (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path d="M8 22 Q20 12 32 22 Q20 32 8 22" fill={color} opacity="0.7" />
        <path d="M32 22 L38 16 L38 28 Z" fill={color} opacity="0.7" />
        <circle cx="14" cy="21" r="1.5" fill="var(--bg-card)" />
      </svg>
    ),
    Turtles: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="20" cy="22" rx="12" ry="8" fill={color} opacity="0.5" />
        <ellipse cx="20" cy="20" rx="10" ry="7" fill={color} opacity="0.7" />
        <circle cx="10" cy="22" r="3" fill={color} opacity="0.5" />
        <circle cx="8" cy="21" r="1" fill={color} />
      </svg>
    ),
    "T-Rex & Large Theropods": (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="22" cy="20" rx="10" ry="7" fill={color} opacity="0.7" />
        <circle cx="12" cy="14" r="5" fill={color} opacity="0.7" />
        <path d="M8 12 L6 11 L9 14" fill={color} />
        <line x1="22" y1="27" x2="20" y2="35" stroke={color} strokeWidth="2" />
        <line x1="28" y1="27" x2="30" y2="35" stroke={color} strokeWidth="2" />
        <path d="M30 16 Q36 14 34 20" stroke={color} strokeWidth="2" fill="none" />
      </svg>
    ),
    "Triceratops & Herbivores": (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="22" cy="22" rx="12" ry="8" fill={color} opacity="0.7" />
        <circle cx="10" cy="18" r="6" fill={color} opacity="0.7" />
        <line x1="6" y1="14" x2="4" y2="10" stroke={color} strokeWidth="1.5" />
        <line x1="10" y1="12" x2="10" y2="8" stroke={color} strokeWidth="1.5" />
        <line x1="14" y1="14" x2="16" y2="10" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
    Pterosaurs: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path d="M20 22 L4 14 L12 20" fill={color} opacity="0.5" />
        <path d="M20 22 L36 14 L28 20" fill={color} opacity="0.5" />
        <ellipse cx="20" cy="22" rx="5" ry="3" fill={color} opacity="0.7" />
        <path d="M15 22 L10 20" stroke={color} strokeWidth="1" />
      </svg>
    ),
    Mosasaurs: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <path d="M6 22 Q20 14 34 22 Q20 30 6 22" fill={color} opacity="0.7" />
        <path d="M34 22 L40 18 L40 26 Z" fill={color} opacity="0.7" />
        <path d="M6 22 L2 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="21" r="1" fill="var(--bg-card)" />
      </svg>
    ),
    Ammonites: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <circle cx="20" cy="20" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
        <path d="M20 10 Q26 14 26 20 Q26 26 20 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
        <path d="M20 13 Q24 16 24 20 Q24 24 20 27" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
        <circle cx="20" cy="20" r="3" fill={color} opacity="0.7" />
      </svg>
    ),
    Plesiosaurs: (
      <svg viewBox="0 0 40 40" className="h-8 w-8">
        <ellipse cx="26" cy="24" rx="10" ry="6" fill={color} opacity="0.7" />
        <path d="M16 24 Q10 18 8 14 Q6 10 10 12" stroke={color} strokeWidth="2" fill="none" />
        <circle cx="10" cy="12" r="3" fill={color} opacity="0.7" />
      </svg>
    ),
  };

  return silhouettes[name] || (
    <svg viewBox="0 0 40 40" className="h-8 w-8">
      <circle cx="20" cy="20" r="10" fill={color} opacity="0.5" />
    </svg>
  );
}

export default function WhySomeSurvivedSection() {
  const [filter, setFilter] = useState<"all" | "survived" | "extinct">("all");

  const filtered: Survivor[] =
    filter === "all"
      ? survivors
      : filter === "survived"
        ? survivors.filter((s) => s.survived)
        : survivors.filter((s) => !s.survived);

  return (
    <SectionWrapper id="why-some-survived">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        Section 5
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        Why Some Survived
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        The extinction wasn&rsquo;t random. Size, metabolism, habitat, and diet
        determined who lived and who died. Small, burrowing, aquatic, or
        cold-tolerant animals had the best chances.
      </p>

      {/* Filter toggles */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {(["all", "survived", "extinct"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
              filter === f
                ? f === "survived"
                  ? "bg-life-green text-white"
                  : f === "extinct"
                    ? "bg-firestorm-hot text-white"
                    : "bg-firestorm text-white"
                : "bg-bg-secondary text-text-secondary hover:text-text-primary"
            }`}
          >
            {f === "all" ? "All" : f === "survived" ? "Survived" : "Didn't"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((animal) => (
          <div
            key={animal.name}
            className="flex items-start gap-4 rounded-xl border border-border bg-bg-card p-4 transition-all hover:shadow-md"
            style={{
              borderLeftWidth: 3,
              borderLeftColor: animal.survived
                ? "var(--life-green)"
                : "var(--firestorm-hot)",
            }}
          >
            <div className="shrink-0 pt-1">
              <AnimalSilhouette
                name={animal.name}
                survived={animal.survived}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-sans text-sm font-semibold text-text-primary">
                  {animal.name}
                </p>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: animal.survived
                      ? "color-mix(in srgb, var(--life-green) 15%, transparent)"
                      : "color-mix(in srgb, var(--firestorm-hot) 15%, transparent)",
                    color: animal.survived
                      ? "var(--life-green)"
                      : "var(--firestorm-hot)",
                  }}
                >
                  {animal.survived ? "Survived" : "Extinct"}
                </span>
              </div>
              <p className="mt-1 text-xs text-text-tertiary">
                {animal.reason}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
                {animal.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
