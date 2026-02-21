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
import TheSetupSection from "./sections/TheSetupSection";
import EnergySection from "./sections/EnergySection";
import WhyYouDontFallSection from "./sections/WhyYouDontFallSection";
import MinimumSpeedSection from "./sections/MinimumSpeedSection";
import WeightlessnessSection from "./sections/WeightlessnessSection";
import TeardropShapeSection from "./sections/TeardropShapeSection";
import TrackClampSection from "./sections/TrackClampSection";
import FirstHillSection from "./sections/FirstHillSection";

const navSections = [
  { id: "the-setup", label: "The Setup" },
  { id: "energy", label: "Energy" },
  { id: "why-you-dont-fall", label: "Why You Don't Fall" },
  { id: "minimum-speed", label: "Minimum Speed" },
  { id: "weightlessness", label: "Weightlessness" },
  { id: "teardrop-shape", label: "Teardrop Shape" },
  { id: "track-clamp", label: "Track Clamp" },
  { id: "first-hill", label: "The First Hill" },
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
      <ShareButton title="Roller Coaster Physics" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <TheSetupSection />
          <EnergySection />
          <WhyYouDontFallSection />
          <MinimumSpeedSection />
          <WeightlessnessSection />
          <TeardropShapeSection />
          <TrackClampSection />
          <FirstHillSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Just Physics"
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "0", label: "engines after first hill" },
          { value: "4g", label: "max g-force" },
          { value: "128", label: "mph top speed" },
          { value: "1", label: "law that explains it all" },
        ]}
        sharePrompt="At the top of a loop you're upside down at 60 mph with nothing holding you in but physics. Here's exactly why that's enough."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
