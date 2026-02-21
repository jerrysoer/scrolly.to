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
import WhatIsATariffSection from "./sections/WhatIsATariffSection";
import SupplyChainSection from "./sections/SupplyChainSection";
import LegalArchitectureSection from "./sections/LegalArchitectureSection";
import IEEPASection from "./sections/IEEPASection";
import LiberationDaySection from "./sections/LiberationDaySection";
import SCOTUSSection from "./sections/SCOTUSSection";
import StillStandingSection from "./sections/StillStandingSection";
import YourMoneySection from "./sections/YourMoneySection";
import BiggerPictureSection from "./sections/BiggerPictureSection";
import { navSections, completionHighlights } from "@/lib/explainers/tariffs";

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="How Tariffs Actually Work" />
      <MobileNav sections={navSections} />
      <main>
        <HeroSection />
        <WhatIsATariffSection />
        <div className="section-tinted">
          <SupplyChainSection />
        </div>
        <LegalArchitectureSection />
        <div className="section-tinted">
          <IEEPASection />
        </div>
        <LiberationDaySection />
        <div className="section-tinted">
          <SCOTUSSection />
        </div>
        <StillStandingSection />
        <div className="section-tinted">
          <YourMoneySection />
        </div>
        <BiggerPictureSection />
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how tariffs actually work."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={completionHighlights}
        sharePrompt="Most people think foreign countries pay tariffs. They don't. Here's how tariffs actually work — and what the Supreme Court just changed."
      />
      <div className="flex justify-center pb-8">
        <a
          href="https://scrolly.to/#waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-6 py-3 font-sans text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "var(--accent-blue)",
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
