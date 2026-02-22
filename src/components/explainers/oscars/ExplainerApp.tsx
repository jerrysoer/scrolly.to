"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import MobileNav from "@/components/explainers/shared/MobileNav";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";
import HeroSection from "./sections/HeroSection";
import AcademySection from "./sections/AcademySection";
import NominationsSection from "./sections/NominationsSection";
import STVSection from "./sections/STVSection";
import PluralitySection from "./sections/PluralitySection";
import CampaignSection from "./sections/CampaignSection";
import GuildSection from "./sections/GuildSection";
import SinnersSection from "./sections/SinnersSection";
import ModernizingSection from "./sections/ModernizingSection";
import CompletionSection from "./sections/CompletionSection";
import { navSections } from "@/lib/explainers/oscars";

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="How the Oscars Actually Work" />
      <MobileNav sections={navSections} />
      <main>
        <HeroSection />
        <AcademySection />
        <NominationsSection />
        <STVSection />
        <PluralitySection />
        <CampaignSection />
        <GuildSection />
        <SinnersSection />
        <ModernizingSection />
        <CompletionSection />
      </main>
      <div className="flex justify-center pb-8">
        <a
          href="https://scrolly.to/#waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-6 py-3 font-sans text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "var(--forward-blue)",
            color: "white",
          }}
        >
          Build your own explainer &rarr;
        </a>
      </div>
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
