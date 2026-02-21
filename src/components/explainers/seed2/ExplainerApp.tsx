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
import BenchmarkSection from "./sections/BenchmarkSection";
import PricingSection from "./sections/PricingSection";
import ModelFamilySection from "./sections/ModelFamilySection";
import CapabilitiesSection from "./sections/CapabilitiesSection";
import ProductionSection from "./sections/ProductionSection";
import AchievementsSection from "./sections/AchievementsSection";
import ImplicationsSection from "./sections/ImplicationsSection";

const navSections = [
  { id: "hero", label: "The Quiet Disruption" },
  { id: "benchmarks", label: "The Scoreboard" },
  { id: "pricing", label: "The Price Gap" },
  { id: "model-family", label: "Three Tiers" },
  { id: "capabilities", label: "Beyond Text" },
  { id: "production", label: "Battle-Tested" },
  { id: "achievements", label: "Gold Standard" },
  { id: "implications", label: "What This Means" },
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
      <ShareButton title="Seed-to-Plant Algorithms" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <BenchmarkSection />
          <PricingSection />
          <ModelFamilySection />
          <CapabilitiesSection />
          <ProductionSection />
          <AchievementsSection />
          <ImplicationsSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="You explored all of this!"
        subtitle="8 sections, 6 benchmarks, 4 competitions, 3 model tiers, and 1 big disruption. Now you know Seed2.0."
        highlights={[
          { value: "4/6", label: "Benchmarks led" },
          { value: "~10x", label: "Cheaper" },
          { value: "100M+", label: "DAU" },
          { value: "8", label: "Sections explored" },
        ]}
        sharePrompt="How ByteDance's Seed2.0 matched frontier AI models at a fraction of the cost."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
