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
import BeforeMoneySection from "./sections/BeforeMoneySection";
import FirstMoneySection from "./sections/FirstMoneySection";
import GoldAndCoinsSection from "./sections/GoldAndCoinsSection";
import PaperTrickSection from "./sections/PaperTrickSection";
import WhereMoneyComesFromSection from "./sections/WhereMoneyComesFromSection";
import InfinitePrintingSection from "./sections/InfinitePrintingSection";
import FederalReserveSection from "./sections/FederalReserveSection";
import CryptoSection from "./sections/CryptoSection";
import PunchlineSection from "./sections/PunchlineSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "before-money", label: "Before Money" },
  { id: "first-money", label: "First Money" },
  { id: "gold-and-coins", label: "Gold & Coins" },
  { id: "paper-trick", label: "Paper Trick" },
  { id: "where-money-comes-from", label: "Where Money Comes From" },
  { id: "infinite-printing", label: "Infinite Printing" },
  { id: "federal-reserve", label: "Federal Reserve" },
  { id: "crypto", label: "Trust Spectrum" },
  { id: "punchline", label: "The Punchline" },
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
      <ShareButton title="How Money Actually Works" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <BeforeMoneySection />
          <FirstMoneySection />
          <GoldAndCoinsSection />
          <PaperTrickSection />
          <WhereMoneyComesFromSection />
          <InfinitePrintingSection />
          <FederalReserveSection />
          <CryptoSection />
          <PunchlineSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how money works."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "$21T", label: "US money supply" },
          { value: "97%", label: "Created by banks" },
          { value: "1971", label: "Gold standard ended" },
          { value: "21M", label: "Max Bitcoin supply" },
        ]}
        sharePrompt="Most people have no idea where money comes from. Here's how it actually works."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
