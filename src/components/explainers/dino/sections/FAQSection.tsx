"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { faqs } from "@/lib/explainers/extinction";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        FAQ
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 mx-auto max-w-2xl space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-bg-card overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-bg-secondary"
            >
              <span className="font-sans text-sm font-semibold text-text-primary pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`accordion-content ${
                openIndex === i ? "open" : ""
              }`}
            >
              <div>
                <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
