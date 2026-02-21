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
import WhatDivisionMeansSection from "./sections/WhatDivisionMeansSection";
import SameQuestionSection from "./sections/SameQuestionSection";
import PatternSection from "./sections/PatternSection";
import WhyFlipMultiplySection from "./sections/WhyFlipMultiplySection";
import PizzaExampleSection from "./sections/PizzaExampleSection";
import TryItYourselfSection from "./sections/TryItYourselfSection";
import SummarySection from "./sections/SummarySection";

const navSections = [
  { id: "what-division-means", label: "What Division Means" },
  { id: "same-question", label: "The Same Question" },
  { id: "pattern", label: "The Pattern" },
  { id: "why-flip-multiply", label: "Why Flip & Multiply" },
  { id: "pizza-example", label: "Pizza Proof" },
  { id: "try-it-yourself", label: "Try It Yourself" },
  { id: "summary", label: "The Whole Picture" },
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
      <ShareButton title="Dividing Fractions" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <WhatDivisionMeansSection />
          <SameQuestionSection />
          <PatternSection />
          <WhyFlipMultiplySection />
          <PizzaExampleSection />
          <TryItYourselfSection />
          <SummarySection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know why we flip and multiply."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "1", label: "Rule to remember" },
          { value: "3", label: "Practice problems" },
          { value: "6", label: "Step proof" },
          { value: "7", label: "Interactive sections" },
        ]}
        sharePrompt="Why do we 'flip and multiply' when dividing fractions? Here's the visual proof."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
