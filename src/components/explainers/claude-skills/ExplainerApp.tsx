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
import WhatAreSkillsSection from "./sections/WhatAreSkillsSection";
import AnatomySection from "./sections/AnatomySection";
import DiscoverySection from "./sections/DiscoverySection";
import InvocationSection from "./sections/InvocationSection";
import ExamplesSection from "./sections/ExamplesSection";
import BuildYourOwnSection from "./sections/BuildYourOwnSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "hero", label: "Overview" },
  { id: "what-are-skills", label: "What Are Skills" },
  { id: "anatomy", label: "SKILL.md Anatomy" },
  { id: "discovery", label: "Discovery" },
  { id: "invocation", label: "Invocation Flow" },
  { id: "examples", label: "Real Examples" },
  { id: "build-your-own", label: "Build Your Own" },
  { id: "faq", label: "FAQ" },
];

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="Claude Code Skills" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <WhatAreSkillsSection />
          <AnatomySection />
          <DiscoverySection />
          <InvocationSection />
          <ExamplesSection />
          <BuildYourOwnSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="You made it through the whole thing."
        subtitle="If this was useful, share it with someone who'd find it interesting."
        highlights={[
          { value: "27", label: "lines in a SKILL.md" },
          { value: "6", label: "pipeline steps" },
          { value: "1", label: "slash command" },
          { value: "∞", label: "reusable invocations" },
        ]}
        sharePrompt="This interactive explainer of how Claude Code skills work is worth your time."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
