"use client";

import { faqs } from "@/lib/explainers/airline-loyalty";

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16" id="faq">
      <h2 className="font-serif text-2xl font-bold text-text-primary">
        Frequently Asked Questions
      </h2>
      <dl className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-lg border border-border bg-bg-card"
          >
            <summary className="flex cursor-pointer select-none list-none items-center justify-between px-5 py-4 text-base font-semibold text-text-primary">
              {faq.q}
              <span className="ml-2 text-text-tertiary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">
              {faq.a}
            </div>
          </details>
        ))}
      </dl>
    </section>
  );
}
