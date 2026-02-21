"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { faqs } from "@/lib/explainers/money";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SectionWrapper id="faq" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
        Questions
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        FAQ
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        The questions people keep asking once they realize money is a shared fiction.
      </p>

      <dl className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <dt>
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-sans text-base font-semibold text-text-primary pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
            </dt>
            <dd className={`accordion-content ${openIndex === i ? "open" : ""}`}>
              <div>
                <p className="px-6 pb-5 font-sans text-base leading-relaxed text-text-secondary">
                  {faq.a}
                </p>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}
