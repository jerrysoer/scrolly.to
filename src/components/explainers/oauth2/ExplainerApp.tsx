"use client";

/*
 * Variety Recipe — OAuth 2.0 Explainer (devrel template) — SHOWSTOPPER UPGRADE
 * --------------------------------------------------
 * Phase 2-4 upgrades (Feb 2026):
 *   CastSection      -> cinematic character reveal with interactive relationship diagram
 *   WildSection      -> tabbed provider playground with OAuth URL Builder
 *   ThreatSection    -> NEW section bridging tokens -> PKCE
 *   PKCESection      -> live SHA-256 pipeline + attack simulator + tamper demo
 *   FAQSection       -> searchable knowledge base with 8 FAQs + Venn diagram
 *   HeroSection      -> video-ready with reduced-motion fallback
 *   ShareableQuote   -> pull-quote cards after key sections
 *   LoadingScreen    -> branded 600ms intro
 */

import { useState, useEffect } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import MobileNav from "@/components/explainers/shared/MobileNav";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";

import LoadingScreen from "./sections/LoadingScreen";
import ShareableQuote from "./sections/ShareableQuote";

import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import CastSection from "./sections/CastSection";
import FlowSection from "./sections/FlowSection";
import TokensSection from "./sections/TokensSection";
import ThreatSection from "./sections/ThreatSection";
import PKCESection from "./sections/PKCESection";
import WildSection from "./sections/WildSection";
import FAQSection from "./sections/FAQSection";

const sections = [
  { id: "hero", label: "Introduction" },
  { id: "problem", label: "The Problem" },
  { id: "cast", label: "The Cast" },
  { id: "flow", label: "Auth Code Flow" },
  { id: "tokens", label: "Tokens" },
  { id: "threats", label: "Threats" },
  { id: "pkce", label: "PKCE" },
  { id: "wild", label: "In the Wild" },
  { id: "faq", label: "FAQ" },
];

function SectionDivider({ number }: { number: number }) {
  return (
    <div className="section-number-divider" aria-hidden="true">
      <span className="number">{String(number).padStart(2, "0")}</span>
    </div>
  );
}

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <LoadingScreen />

      {/* Skip to content */}
      <a href="#problem" className="skip-to-content">
        Skip to content
      </a>

      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={sections} />
      <ShareButton title="How OAuth 2.0 Actually Works — Interactive Explainer" />
      <MobileNav sections={sections} />

      <main id="main-content">
        <article>
          <HeroSection />
          <SectionDivider number={1} />
          <ProblemSection />

          <ShareableQuote
            quote="81% of data breaches involve stolen credentials. OAuth exists because passwords were never meant to be shared."
            gradient="linear-gradient(135deg, #1a0a0a, #2d1b1b, #1a1a2e)"
          />

          <SectionDivider number={2} />
          <CastSection />
          <SectionDivider number={3} />
          <FlowSection />

          <ShareableQuote
            quote="6 steps. 4 actors. Zero passwords shared."
            gradient="linear-gradient(135deg, #0a1a2e, #1b2d4e, #0a2a1a)"
          />

          <SectionDivider number={4} />
          <TokensSection />
          <SectionDivider number={5} />
          <ThreatSection />
          <SectionDivider number={6} />
          <PKCESection />

          <ShareableQuote
            quote="PKCE turns a stolen authorization code into a worthless string."
            gradient="linear-gradient(135deg, #1a1c2e, #2d1b4e, #1a2a3e)"
          />

          <SectionDivider number={7} />
          <WildSection />
          <FAQSection />
        </article>
      </main>

      <CompletionCard
        variant="dashboard"
        title="You Understand OAuth 2.0"
        quote="The best security is invisible. OAuth makes sure you never have to share a password with an app again."
        highlights={[
          { value: "4", label: "OAuth roles", color: "var(--accent-primary)" },
          { value: "6", label: "Flow steps", color: "var(--accent-secondary)" },
          { value: "3", label: "Threats blocked", color: "var(--accent-danger)" },
          { value: "2", label: "Token types", color: "var(--accent-tertiary)" },
        ]}
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
