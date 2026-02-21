"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import MobileNav from "@/components/explainers/shared/MobileNav";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";
import HeroSection from "./sections/HeroSection";
import MessageFlowSection from "./sections/MessageFlowSection";
import GatewaySection from "./sections/GatewaySection";
import SkillsSection from "./sections/SkillsSection";
import NamingSection from "./sections/NamingSection";
import SecuritySection from "./sections/SecuritySection";
import RoadAheadSection from "./sections/RoadAheadSection";
import FAQSection from "./sections/FAQSection";
import { navSections, completionHighlights } from "@/lib/explainers/openclaw-sections";

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="OpenClaw Framework" />
      <MobileNav sections={navSections} />
      <main className="bg-noise">
        <HeroSection />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <MessageFlowSection />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <GatewaySection />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SkillsSection />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <NamingSection />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <SecuritySection />
        <div style={{ borderTop: "1px solid var(--border)" }} />
        <RoadAheadSection />
      </main>
      <CompletionCard
        variant="dashboard"
        title="You explored all of this!"
        subtitle="If this was useful, share it with someone who'd find it interesting."
        highlights={completionHighlights}
        sharePrompt="This interactive explainer of how OpenClaw works is incredible."
      />
      <div style={{ borderTop: "1px solid var(--border)" }} />
      <FAQSection />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
