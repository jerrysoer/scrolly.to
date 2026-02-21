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
import AtomicClocksSection from "./sections/AtomicClocksSection";
import TrilaterationSection from "./sections/TrilaterationSection";
import FourthSatelliteSection from "./sections/FourthSatelliteSection";
import RelativitySection from "./sections/RelativitySection";
import ErrorBudgetSection from "./sections/ErrorBudgetSection";
import HistorySection from "./sections/HistorySection";

const navSections = [
  { id: "hero", label: "Satellites" },
  { id: "atomic-clocks", label: "Speed of Light" },
  { id: "trilateration", label: "Trilateration" },
  { id: "fourth-satellite", label: "Clock Sync" },
  { id: "relativity", label: "Relativity" },
  { id: "error-budget", label: "Error Budget" },
  { id: "history", label: "History" },
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
      <ShareButton title="How GPS Works" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <AtomicClocksSection />
          <TrilaterationSection />
          <FourthSatelliteSection />
          <RelativitySection />
          <ErrorBudgetSection />
          <HistorySection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how GPS works."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "31", label: "Active satellites" },
          { value: "20,200 km", label: "Orbital altitude" },
          { value: "38 \u00B5s/day", label: "Relativity correction" },
          { value: "<1m", label: "Modern accuracy" },
        ]}
        sharePrompt="31 satellites, 20,200 km up, atomic clocks, and Einstein's relativity — all working together to tell you where you are. Here's how GPS actually works."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
