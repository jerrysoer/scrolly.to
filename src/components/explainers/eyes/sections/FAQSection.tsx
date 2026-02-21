"use client";

import { useEffect, useRef, useState } from "react";
import { faqItems } from "@/lib/explainers/eyes/facts";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-lg border border-border bg-bg-card">
      <summary className="cursor-pointer select-none px-5 py-4 text-base sm:text-lg font-semibold text-text-primary list-none flex items-center justify-between min-h-[44px]">
        {question}
        <span className="ml-2 shrink-0 transition-transform duration-200 group-open:rotate-45 text-text-tertiary text-xl">+</span>
      </summary>
      <div className="px-5 pb-4 text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
        {answer}
      </div>
    </details>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="faq"
      className={`mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24 section-fade-in ${visible ? "visible" : ""}`}
    >
      <h2 className="font-serif text-2xl font-bold text-text-primary text-center">
        Frequently Asked Questions
      </h2>
      <dl className="mt-8 space-y-3">
        {faqItems.map((faq, i) => (
          <div
            key={faq.q}
            className={`transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
          >
            <FAQItem question={faq.q} answer={faq.a} />
          </div>
        ))}
      </dl>
    </section>
  );
}
