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
import RaceSimulation from "./sections/RaceSimulation";
import CompoundGrowth from "./sections/CompoundGrowth";
import OverconfidenceSection from "./sections/OverconfidenceSection";
import RealWorldSection from "./sections/RealWorldSection";
import GoalSimulator from "./sections/GoalSimulator";
import FinishLineSection from "./sections/FinishLineSection";

const navSections = [
  { id: "race-simulation", label: "Sprint & Nap" },
  { id: "compound-growth", label: "Consistency" },
  { id: "overconfidence", label: "Psychology" },
  { id: "real-world", label: "Case Studies" },
  { id: "goal-simulator", label: "Your Race" },
  { id: "finish-line", label: "The Moral" },
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
      <ShareButton title="Tortoise & Hare Algorithm" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <RaceSimulation />
          <CompoundGrowth />
          <OverconfidenceSection />
          <RealWorldSection />
          <GoalSimulator />
          <FinishLineSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="The tortoise is still walking."
        subtitle="This explainer was built with Scrolly -- an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "37.78x", label: "1% daily for 1 year" },
          { value: "Day 11", label: "Crossover point" },
          { value: "6", label: "Sections explored" },
          { value: "8", label: "Min read" },
        ]}
        sharePrompt="What a 2,500-year-old fable teaches about compounding, consistency, and the myth of talent."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
