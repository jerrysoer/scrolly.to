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

// Part-specific section components (to be added by section-porter agents)
// Part 1 sections
// import HeroSection from "./sections/part-1/HeroSection";
// import OriginSection from "./sections/part-1/OriginSection";
// ... (10 sections total)

// Part 2 sections
// import Part2HeroSection from "./sections/part-2/HeroSection";
// ... (7 sections total)

// Part 3 sections
// import Part3HeroSection from "./sections/part-3/HeroSection";
// ... (8 sections total)

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
            {/* Part 1 sections will be added by section-porter agent */}
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
              <div className="max-w-2xl text-center">
                <h1
                  className="mb-4 text-4xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Part 1: {currentPartData?.title}
                </h1>
                <p
                  className="mb-2 text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {currentPartData?.subtitle}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {currentPartData?.sectionCount} sections •{" "}
                  {currentPartData?.readingTime}
                </p>
                <p
                  className="mt-8 text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Section components will be added by the section-porter agent.
                </p>
              </div>
            </div>
          </article>
        )}

        {currentPart === 2 && (
          <article>
            {/* Part 2 sections will be added by section-porter agent */}
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
              <div className="max-w-2xl text-center">
                <h1
                  className="mb-4 text-4xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Part 2: {currentPartData?.title}
                </h1>
                <p
                  className="mb-2 text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {currentPartData?.subtitle}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {currentPartData?.sectionCount} sections •{" "}
                  {currentPartData?.readingTime}
                </p>
                <p
                  className="mt-8 text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Section components will be added by the section-porter agent.
                </p>
              </div>
            </div>
          </article>
        )}

        {currentPart === 3 && (
          <article>
            {/* Part 3 sections will be added by section-porter agent */}
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
              <div className="max-w-2xl text-center">
                <h1
                  className="mb-4 text-4xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Part 3: {currentPartData?.title}
                </h1>
                <p
                  className="mb-2 text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {currentPartData?.subtitle}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {currentPartData?.sectionCount} sections •{" "}
                  {currentPartData?.readingTime}
                </p>
                <p
                  className="mt-8 text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Section components will be added by the section-porter agent.
                </p>
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Completion card - different for each part */}
      {currentPart === 1 && (
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
          sharePrompt="Part 2 continues the story. Share Part 1 with someone who loves Trader Joe's."
        />
      )}

      {currentPart === 2 && (
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
          sharePrompt="Part 3 reveals how TJ's became a cult brand. Share Part 2 →"
        />
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
