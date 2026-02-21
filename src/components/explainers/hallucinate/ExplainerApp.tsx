"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import MobileNav from "@/components/explainers/shared/MobileNav";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";

import SectionDivider from "./SectionDivider";

import HeroSection from "./sections/HeroSection";
import WhatIsHallucinationSection from "./sections/WhatIsHallucinationSection";
import HowLLMsWorkSection from "./sections/HowLLMsWorkSection";
import AutocompleteSection from "./sections/AutocompleteSection";
import CantSayIDontKnowSection from "./sections/CantSayIDontKnowSection";
import WhereHallucinationsSection from "./sections/WhereHallucinationsSection";
import LawyerStorySection from "./sections/LawyerStorySection";
import ConfidentWrongnessSection from "./sections/ConfidentWrongnessSection";
import HowItsBeingFixedSection from "./sections/HowItsBeingFixedSection";
import WhatYouShouldDoSection from "./sections/WhatYouShouldDoSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "what-is-hallucination", label: "What It Means" },
  { id: "how-llms-work", label: "How LLMs Work" },
  { id: "autocomplete", label: "Autocomplete" },
  { id: "cant-say-i-dont-know", label: "Can't Say IDK" },
  { id: "where-hallucinations", label: "Where They Come From" },
  { id: "lawyer-story", label: "Lawyer Story" },
  { id: "confident-wrongness", label: "Fluency Trap" },
  { id: "how-its-being-fixed", label: "Being Fixed" },
  { id: "what-you-should-do", label: "What To Do" },
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
      <ShareButton title="Why Do AIs Hallucinate?" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />

          <SectionDivider number={1} />
          <WhatIsHallucinationSection />

          <SectionDivider number={2} />
          <HowLLMsWorkSection />

          <SectionDivider number={3} />
          <AutocompleteSection />

          <SectionDivider number={4} />
          <CantSayIDontKnowSection />

          <SectionDivider number={5} />
          <WhereHallucinationsSection />

          <SectionDivider number={6} />
          <LawyerStorySection />

          <SectionDivider number={7} />
          <ConfidentWrongnessSection />

          <SectionDivider number={8} />
          <HowItsBeingFixedSection />

          <SectionDivider number={9} />
          <WhatYouShouldDoSection />

          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you understand why AIs hallucinate."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "3", label: "Failure modes" },
          { value: "6", label: "Fake cases cited" },
          { value: "4", label: "Fix approaches" },
          { value: "8", label: "Min read" },
        ]}
        sharePrompt="AIs don't lie. They hallucinate. Here's the interactive explainer on why language models confidently state false information."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
