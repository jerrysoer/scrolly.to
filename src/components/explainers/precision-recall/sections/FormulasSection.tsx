"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { recallTerms, precisionTerms, type FormulaTerm } from "@/lib/explainers/precision-recall";

function FormulaCard({
  title,
  formula,
  question,
  color,
  terms,
}: {
  title: string;
  formula: React.ReactNode;
  question: string;
  color: string;
  terms: FormulaTerm[];
}) {
  return (
    <div className="formula-card">
      <div className="text-base font-medium mb-4 tracking-wide" style={{ color }}>
        {title}
      </div>
      <div className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "Georgia, serif" }}>
        {formula}
      </div>
      <p className="pr-body italic mb-6 text-base md:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        &ldquo;{question}&rdquo;
      </p>
      <div className="border-t pt-4 space-y-2" style={{ borderColor: "var(--border)" }}>
        {terms.map((term, i) => (
          <div key={i} className="flex items-center gap-3 text-base">
            <span className="font-mono font-medium" style={{ color: term.color }}>
              {term.symbol}
            </span>
            <span className="pr-body" style={{ color: "var(--text-tertiary)" }}>
              {term.meaning}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FormulasSection() {
  return (
    <SectionWrapper id="formulas">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="pr-body text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            The Mathematics
          </p>
          <h2 className="pr-display text-4xl md:text-5xl">
            Simple Formulas,
            <br />
            Profound Implications
          </h2>
        </div>
        <div className="grid gap-6">
          <FormulaCard
            title="RECALL"
            formula={
              <span>
                <span style={{ color: "var(--pr-green)" }}>TP</span>
                <span style={{ color: "var(--text-tertiary)" }}> / (</span>
                <span style={{ color: "var(--pr-green)" }}>TP</span>
                <span style={{ color: "var(--text-tertiary)" }}> + </span>
                <span style={{ color: "var(--pr-terracotta)" }}>FN</span>
                <span style={{ color: "var(--text-tertiary)" }}>)</span>
              </span>
            }
            question="Of all the actual positives, how many did we catch?"
            color="var(--pr-green)"
            terms={recallTerms}
          />
          <FormulaCard
            title="PRECISION"
            formula={
              <span>
                <span style={{ color: "var(--pr-green)" }}>TP</span>
                <span style={{ color: "var(--text-tertiary)" }}> / (</span>
                <span style={{ color: "var(--pr-green)" }}>TP</span>
                <span style={{ color: "var(--text-tertiary)" }}> + </span>
                <span style={{ color: "var(--pr-terracotta)" }}>FP</span>
                <span style={{ color: "var(--text-tertiary)" }}>)</span>
              </span>
            }
            question="Of all our positive predictions, how many were correct?"
            color="var(--pr-terracotta)"
            terms={precisionTerms}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
