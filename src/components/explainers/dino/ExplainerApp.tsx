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
import WorldBeforeSection from "./sections/WorldBeforeSection";
import TheRockSection from "./sections/TheRockSection";
import First24HoursSection from "./sections/First24HoursSection";
import LongWinterSection from "./sections/LongWinterSection";
import WhySomeSurvivedSection from "./sections/WhySomeSurvivedSection";
import SlowRecoverySection from "./sections/SlowRecoverySection";
import TheTwistSection from "./sections/TheTwistSection";
import WhatIfItMissedSection from "./sections/WhatIfItMissedSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "world-before", label: "The World Before" },
  { id: "the-rock", label: "The Rock" },
  { id: "first-24-hours", label: "First 24 Hours" },
  { id: "long-winter", label: "The Long Winter" },
  { id: "why-some-survived", label: "Why Some Survived" },
  { id: "slow-recovery", label: "Slow Recovery" },
  { id: "the-twist", label: "The Twist" },
  { id: "what-if-it-missed", label: "What If It Missed?" },
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
      <ShareButton title="How Dinosaurs Went Extinct" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <WorldBeforeSection />
          <TheRockSection />
          <First24HoursSection />
          <LongWinterSection />
          <WhySomeSurvivedSection />
          <SlowRecoverySection />
          <TheTwistSection />
          <WhatIfItMissedSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how the dinosaurs died."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "45K mph", label: "Impact speed" },
          { value: "75%", label: "Species wiped out" },
          { value: "10M yrs", label: "To recover" },
          { value: "10,000", label: "Dino species alive today" },
        ]}
        sharePrompt="66 million years ago, a rock the size of San Francisco hit Earth at 45,000 mph. Here's what happened next."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
