"use client";

import { Eye, Users, Bot } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CardData {
  icon: React.ReactNode;
  title: string;
  body: string;
  badge: string;
  badgeVariant: "green" | "amber";
}

// ─── Card data ────────────────────────────────────────────────────────────────

const CARDS: CardData[] = [
  {
    icon: <Eye className="w-10 h-10" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    title: "Watch All Nominees to Vote",
    body: "Academy members must certify they've watched all nominated films in a category before voting in it. No more voting by reputation alone.",
    badge: "Effective: 2026",
    badgeVariant: "green",
  },
  {
    icon: <Users className="w-10 h-10" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    title: "Best Casting — New Category",
    body: "The first new competitive Oscar category since Best Animated Feature in 2001. Honors the casting directors who assemble ensemble casts.",
    badge: "First new category since 2001",
    badgeVariant: "amber",
  },
  {
    icon: <Bot className="w-10 h-10" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    title: "AI Disclosure Required",
    body: "Films must disclose use of generative AI in their production. The Academy has not (yet) disqualified films for AI use, but transparency is now mandatory.",
    badge: "Effective: 2026",
    badgeVariant: "green",
  },
];

// ─── Badge styles ─────────────────────────────────────────────────────────────

function Badge({ label, variant }: { label: string; variant: "green" | "amber" }) {
  const isGreen = variant === "green";
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        background: isGreen
          ? "color-mix(in srgb, #22c55e 15%, var(--bg-secondary))"
          : "color-mix(in srgb, var(--accent-amber) 15%, var(--bg-secondary))",
        color: isGreen ? "var(--success-green)" : "var(--accent-amber)",
        border: isGreen
          ? "1px solid color-mix(in srgb, #22c55e 30%, var(--border))"
          : "1px solid color-mix(in srgb, var(--accent-amber) 30%, var(--border))",
      }}
    >
      {label}
    </span>
  );
}

// ─── ModernizingCard ──────────────────────────────────────────────────────────

function ModernizingCard({ card }: { card: CardData }) {
  return (
    <div
      className="card-glow scrollbar-none"
      style={{
        minWidth: "280px",
        maxWidth: "320px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        flexShrink: 0,
      }}
    >
      {/* Icon */}
      <div>{card.icon}</div>

      {/* Title */}
      <h3
        className="text-base font-bold leading-snug"
        style={{ color: "var(--text-primary)" }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {card.body}
      </p>

      {/* Badge */}
      <div>
        <Badge label={card.badge} variant={card.badgeVariant} />
      </div>
    </div>
  );
}

// ─── ModernizingSection ───────────────────────────────────────────────────────

export default function ModernizingSection() {
  return (
    <SectionWrapper id="modernizing" layout="centered" tinted>
      {/* Section number divider */}
      <div className="section-number-divider" aria-hidden="true">
        <span className="section-number-badge">08</span>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2 mb-8">
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: "var(--text-primary)",
          }}
        >
          The Academy Modernizes
        </h2>
        <p
          className="text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Three significant changes taking effect for the 2026 Oscars.
        </p>
      </div>

      {/* Horizontal scroll cards */}
      <div
        className="horizontal-scroll scrollbar-none"
        role="list"
        aria-label="Academy modernization changes"
      >
        {CARDS.map((card) => (
          <div key={card.title} role="listitem">
            <ModernizingCard card={card} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
