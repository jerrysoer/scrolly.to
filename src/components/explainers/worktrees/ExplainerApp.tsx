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
import ProblemSection from "./sections/ProblemSection";
import WhatIsWorktreeSection from "./sections/WhatIsWorktreeSection";
import UnderTheHoodSection from "./sections/UnderTheHoodSection";
import CommandsSection from "./sections/CommandsSection";
import ComparisonSection from "./sections/ComparisonSection";
import WorkflowsSection from "./sections/WorkflowsSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "hero", label: "Introduction" },
  { id: "problem", label: "The Problem" },
  { id: "what-is-worktree", label: "What Is a Worktree" },
  { id: "under-the-hood", label: "Under the Hood" },
  { id: "commands", label: "Commands" },
  { id: "comparison", label: "Comparison" },
  { id: "workflows", label: "Workflows" },
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
      <ShareButton title="Git Worktrees Explained" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <ProblemSection />
          <WhatIsWorktreeSection />
          <UnderTheHoodSection />
          <CommandsSection />
          <ComparisonSection />
          <WorkflowsSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Worktree Master"
        subtitle="You explored every section of this git worktrees deep dive. Share it with a teammate who still does the stash shuffle."
        highlights={[
          { value: "2.5+", label: "Git version" },
          { value: "< 1s", label: "Setup time" },
          { value: "5", label: "Commands covered" },
          { value: "~0%", label: "Disk overhead" },
        ]}
        sharePrompt="Found this useful? Share it with someone who could use git worktrees."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
