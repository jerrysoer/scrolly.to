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
import EmailSection from "./sections/EmailSection";
import MedicalSection from "./sections/MedicalSection";
import CarSection from "./sections/CarSection";
import FraudSection from "./sections/FraudSection";
import ContentSection from "./sections/ContentSection";
import SearchSection from "./sections/SearchSection";
import InteractiveSection from "./sections/InteractiveSection";
import MatrixSection from "./sections/MatrixSection";
import FormulasSection from "./sections/FormulasSection";
import F1ScoreSection from "./sections/F1ScoreSection";
import QuizSection from "./sections/QuizSection";
import ConclusionSection from "./sections/ConclusionSection";

import { navSections, completionHighlights } from "@/lib/explainers/precision-recall";

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  const [threshold, setThreshold] = useState(50);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  const metrics = {
    recall: Math.round(Math.min(95, 30 + (100 - threshold) * 0.7)),
    precision: Math.round(Math.min(95, 20 + threshold * 0.8)),
  };

  const actualPositives = 30;
  const actualNegatives = 70;
  const truePositives = Math.round((metrics.recall / 100) * actualPositives);
  const falseNegatives = actualPositives - truePositives;
  const totalPredictedPositives =
    metrics.precision > 0 ? Math.round(truePositives / (metrics.precision / 100)) : truePositives;
  const falsePositives = Math.max(0, totalPredictedPositives - truePositives);
  const trueNegatives = actualNegatives - falsePositives;

  const f1Score =
    metrics.precision + metrics.recall > 0
      ? Math.round((2 * metrics.precision * metrics.recall) / (metrics.precision + metrics.recall))
      : 0;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="Precision & Recall Explained" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <EmailSection />
          <MedicalSection />
          <CarSection />
          <FraudSection />
          <ContentSection />
          <SearchSection />
          <InteractiveSection
            threshold={threshold}
            onThresholdChange={setThreshold}
            metrics={metrics}
          />
          <MatrixSection
            truePositives={truePositives}
            falseNegatives={falseNegatives}
            falsePositives={falsePositives}
            trueNegatives={trueNegatives}
          />
          <FormulasSection />
          <F1ScoreSection f1Score={f1Score} recall={metrics.recall} precision={metrics.precision} />
          <QuizSection />
          <ConclusionSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you understand precision & recall."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={completionHighlights}
        sharePrompt="Every prediction system makes a fundamental choice: cast a wide net, or aim with precision. Here's how to think about the tradeoff."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
