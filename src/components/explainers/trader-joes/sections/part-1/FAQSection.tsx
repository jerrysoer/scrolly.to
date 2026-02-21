"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who founded Trader Joe's?",
    a: "Joe Coulombe, a Stanford MBA, founded Trader Joe's in 1967 in Pasadena, California. He previously managed a chain of Pronto Market convenience stores before pivoting to the gourmet-wine-and-spirits concept that became Trader Joe's.",
  },
  {
    q: "Why is Trader Joe's so popular?",
    a: "Trader Joe's built its cult following through private-label products, curated selection, competitive pricing, and a unique tiki-themed store culture. Joe Coulombe identified an underserved market of educated consumers who wanted quality food at affordable prices.",
  },
  {
    q: "When did the first Trader Joe's open?",
    a: "The first Trader Joe's opened in August 1967 at 610 South Arroyo Parkway in Pasadena, California. It was a converted Pronto Market — barely 5,000 square feet — with tiki decor, cedar plank walls, and Hawaiian shirts on every employee.",
  },
  {
    q: "Who owns Trader Joe's?",
    a: "Trader Joe's has been owned by Aldi Nord since 1979, though it operates completely independently with its own product sourcing, store design, and company culture.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full cursor-pointer select-none px-5 py-4 text-left text-base font-semibold sm:text-lg flex items-center justify-between"
        style={{ color: "var(--text-primary)" }}
        aria-expanded={open}
      >
        {question}
        <span
          className="ml-2 transition-transform duration-200 text-lg"
          style={{
            color: "var(--text-tertiary)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="px-5 pb-4 text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h2
        className="text-2xl font-bold"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          color: "var(--text-primary)",
        }}
      >
        Frequently Asked Questions
      </h2>
      <div className="mt-8 space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem key={faq.q} question={faq.q} answer={faq.a} index={i} />
        ))}
      </div>
    </section>
  );
}
