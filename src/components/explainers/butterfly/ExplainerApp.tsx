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
import SetupSection from "./sections/SetupSection";
import SignalSection from "./sections/SignalSection";
import ChrysalisSection from "./sections/ChrysalisSection";
import SoupStageSection from "./sections/SoupStageSection";
import RebuildingSection from "./sections/RebuildingSection";
import EmergenceSection from "./sections/EmergenceSection";
import PayoffSection from "./sections/PayoffSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "the-setup", label: "The Setup" },
  { id: "the-signal", label: "The Signal" },
  { id: "chrysalis", label: "Chrysalis" },
  { id: "soup-stage", label: "Soup Stage" },
  { id: "rebuilding", label: "Rebuilding" },
  { id: "emergence", label: "Emergence" },
  { id: "the-payoff", label: "The Payoff" },
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
      <ShareButton title="How Butterflies Transform" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <SetupSection />
          <SignalSection />
          <ChrysalisSection />
          <SoupStageSection />
          <RebuildingSection />
          <EmergenceSection />
          <PayoffSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how butterflies transform."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "100×", label: "Weight gain" },
          { value: "16K", label: "Imaginal disc cells" },
          { value: "10–14", label: "Days to transform" },
          { value: "4", label: "Life stages" },
        ]}
        sharePrompt="A caterpillar dissolves into soup and rebuilds itself into a butterfly. Here's how metamorphosis actually works."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
