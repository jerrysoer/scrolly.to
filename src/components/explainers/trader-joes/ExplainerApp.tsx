/*
 * Trader Joe's 3-Part Explainer Series
 * --------------------------------------
 * This explainer tells the complete Trader Joe's story across three distinct parts.
 * Navigation uses URL hash (#part-1, #part-2, #part-3) for seamless transitions.
 */

"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";

// Part 1 sections
import P1HeroSection from "./sections/part-1/HeroSection";
import OriginSection from "./sections/part-1/OriginSection";
import SevenElevenSection from "./sections/part-1/SevenElevenSection";
import CloneMissionSection from "./sections/part-1/CloneMissionSection";
import BuyoutSection from "./sections/part-1/BuyoutSection";
import MalibuSection from "./sections/part-1/MalibuSection";
import EpiphanySection from "./sections/part-1/EpiphanySection";
import LightningSection from "./sections/part-1/LightningSection";
import LiquorSection from "./sections/part-1/LiquorSection";
import FirstStoreSection from "./sections/part-1/FirstStoreSection";
import FAQSection from "./sections/part-1/FAQSection";

// Part 2 sections
import P2HeroSection from "./sections/part-2/HeroSection";
import AlbrechtSection from "./sections/part-2/AlbrechtSection";
import SaleSection from "./sections/part-2/SaleSection";
import PrivateLabelSection from "./sections/part-2/PrivateLabelSection";
import FearlessFlyerSection from "./sections/part-2/FearlessFlyerSection";
import IntentionalStoreSection from "./sections/part-2/IntentionalStoreSection";
import LessIsMoreSection from "./sections/part-2/LessIsMoreSection";
import PayPeopleWellSection from "./sections/part-2/PayPeopleWellSection";

// Part 3 sections
import P3HeroSection from "./sections/part-3/HeroSection";
import TreasureHuntSection from "./sections/part-3/TreasureHuntSection";
import TwoBuckChuckSection from "./sections/part-3/TwoBuckChuckSection";
import AntiGrocerSection from "./sections/part-3/AntiGrocerSection";
import FanEconomySection from "./sections/part-3/FanEconomySection";
import ReckoningSection from "./sections/part-3/ReckoningSection";
import JoesFarewellSection from "./sections/part-3/JoesFarewellSection";
import MachineTodaySection from "./sections/part-3/MachineTodaySection";

// Custom shared components
import PartNav from "./shared/PartNav";

// Data imports
import { series } from "./data/series";
import { part1Sections } from "./data/part-1";
import { part2Sections } from "./data/part-2";
import { part3Sections } from "./data/part-3";

export default function ExplainerApp() {
  const [currentPart, setCurrentPart] = useState<1 | 2 | 3>(1);
  const [mounted, setMounted] = useState(false);

  // Initialize from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#part-2") setCurrentPart(2);
    else if (hash === "#part-3") setCurrentPart(3);
    else setCurrentPart(1);
    setMounted(true);
  }, []);

  // Update URL hash when part changes
  useEffect(() => {
    if (!mounted) return;
    window.location.hash = `part-${currentPart}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPart, mounted]);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#part-2") setCurrentPart(2);
      else if (hash === "#part-3") setCurrentPart(3);
      else setCurrentPart(1);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Prevent flash of wrong content
  if (!mounted) return <div className="min-h-screen" />;

  // Get current part metadata
  const currentPartData = series.find((p) => p.number === currentPart);

  // Determine which section nav to show
  const currentSections =
    currentPart === 1
      ? part1Sections
      : currentPart === 2
        ? part2Sections
        : part3Sections;

  return (
    <div data-scope="explainer-trader-joes">
      <style jsx global>{`
        [data-scope="explainer-trader-joes"] {
          --bg-primary: #faf8f3;
          --bg-card: #ffffff;
          --bg-secondary: #f5edd6;
          --text-primary: #1a2744;
          --text-secondary: #4a5568;
          --text-tertiary: #8b9cb5;
          --border: #d4c5a9;
          --accent-red: #c0392b;
          --accent-gold: #b8860b;
          --accent-navy: #1a2744;
          --accent-green: #2d6a4f;
        }
        [data-scope="explainer-trader-joes"][data-theme="dark"] {
          --bg-primary: #0f1419;
          --bg-card: #1a1f29;
          --bg-secondary: #242a35;
          --text-primary: #e8eef5;
          --text-secondary: #c5d1de;
          --text-tertiary: #8b9cb5;
          --border: #2d3748;
        }
      `}</style>

      <ProgressBar />
      <ThemeToggle />
      <PartNav currentPart={currentPart} onPartChange={setCurrentPart} />
      <SectionNav sections={currentSections} />
      <ShareButton title={`Trader Joe's: ${currentPartData?.title || ""}`} />

      <main>
        {currentPart === 1 && (
          <article>
            <P1HeroSection />
            <OriginSection />
            <SevenElevenSection />
            <CloneMissionSection />
            <BuyoutSection />
            <MalibuSection />
            <EpiphanySection />
            <LightningSection />
            <LiquorSection />
            <FirstStoreSection />
            <FAQSection />
          </article>
        )}

        {currentPart === 2 && (
          <article>
            <P2HeroSection />
            <AlbrechtSection />
            <SaleSection />
            <PrivateLabelSection />
            <FearlessFlyerSection />
            <IntentionalStoreSection />
            <LessIsMoreSection />
            <PayPeopleWellSection />
          </article>
        )}

        {currentPart === 3 && (
          <article>
            <P3HeroSection />
            <TreasureHuntSection />
            <TwoBuckChuckSection />
            <AntiGrocerSection />
            <FanEconomySection />
            <ReckoningSection />
            <JoesFarewellSection />
            <MachineTodaySection />
          </article>
        )}
      </main>

      {/* Completion card - different for each part */}
      {currentPart === 1 && (
        <>
          <CompletionCard
            variant="dashboard"
            title="The Origin Story Begins"
            subtitle="Joe Coulombe didn't just open a store — he identified a gap in American culture that nobody else could see."
            highlights={[
              { value: "1930", label: "Joe born" },
              { value: "$25K", label: "Buyout cost" },
              { value: "1967", label: "First store" },
              { value: "3", label: "Key insights" },
            ]}
            sharePrompt="Share Part 1 with someone who loves Trader Joe's."
          />
          <div className="mx-auto max-w-3xl px-4 pb-20 text-center">
            <button
              onClick={() => setCurrentPart(2)}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "var(--accent-navy)",
                color: "white",
                fontFamily: "inherit",
              }}
            >
              Continue to Part 2: The Aldi Paradox
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </>
      )}

      {currentPart === 2 && (
        <>
          <CompletionCard
            variant="dashboard"
            title="The Aldi Connection Revealed"
            subtitle="The most surprising chapter in American retail history involved a secretive German family that almost nobody knew about."
            highlights={[
              { value: "1979", label: "Aldi enters" },
              { value: "1988", label: "Full sale" },
              { value: "70+", label: "Countries" },
              { value: "Private", label: "Still today" },
            ]}
            sharePrompt="Share Part 2 with someone who loves Trader Joe's."
          />
          <div className="mx-auto max-w-3xl px-4 pb-20 text-center">
            <button
              onClick={() => setCurrentPart(3)}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "var(--accent-navy)",
                color: "white",
                fontFamily: "inherit",
              }}
            >
              Continue to Part 3: The Cult Machine
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </>
      )}

      {currentPart === 3 && (
        <CompletionCard
          variant="dashboard"
          title="The Complete Story"
          subtitle="From Stanford MBA to German billionaires to America's most beloved grocery chain. Now you know the whole story."
          highlights={[
            { value: "500+", label: "Stores" },
            { value: "$2000", label: "Sales/sqft" },
            { value: "80%", label: "Private label" },
            { value: "10¢", label: "Cookie profit" },
          ]}
          sharePrompt="The complete Trader Joe's story. From convenience store clone to cult grocery brand."
        />
      )}

      <ScrollyFooter attribution="Built with Scrolly" />
    </div>
  );
}
