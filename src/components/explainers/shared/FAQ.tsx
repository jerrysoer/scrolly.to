'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is a Girl Scout cookie?',
    answer: 'Girl Scout cookies are delicious treats sold by Girl Scout troops as a fundraiser. They help girls earn money for their troop activities, trips, and programs while teaching valuable business and entrepreneurship skills.',
  },
  {
    question: 'How many Girl Scout cookies are sold each year?',
    answer: 'Girl Scouts sell approximately 200 million boxes of cookies each year in the United States, generating hundreds of millions of dollars for troops and the organization.',
  },
  {
    question: 'Why do Girl Scout cookies have different names?',
    answer: 'Different Girl Scout councils across the country license cookies from two national bakeries. These bakeries produce similar cookies under different names, so the same cookie might be called "Thin Mints" in one region and "Peppermint Patties" in another.',
  },
  {
    question: 'Where does the money go when you buy Girl Scout cookies?',
    answer: 'Cookie sales revenue is split between the Girl Scout council, the troop, the individual girl scout, and the bakery. The exact split varies by location, but girls typically keep a portion to fund their troop\'s activities and personal goals.',
  },
  {
    question: 'How long have Girl Scouts been selling cookies?',
    answer: 'Girl Scouts have been selling cookies since the 1920s, making it one of the longest-running fundraising programs in America. What started as a local fundraiser has grown into a multi-million dollar annual business.',
  },
  {
    question: 'What do girls learn from selling cookies?',
    answer: 'Girl Scouts develop essential life skills including goal-setting, decision-making, money management, business ethics, customer service, leadership, and confidence through the cookie selling experience.',
  },
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 px-6 bg-[var(--color-bg-secondary)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[var(--color-text-primary)]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={index}
              open={expandedIndex === index}
              className="group border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg-primary)]"
              onClick={(e) => {
                e.preventDefault();
                toggleItem(index);
              }}
            >
              <summary className="cursor-pointer px-6 py-4 font-semibold text-lg text-[var(--color-text-primary)] flex items-center justify-between hover:bg-[var(--color-bg-hover)]">
                <span>{item.question}</span>
                <svg
                  className="w-6 h-6 transform transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </summary>
              <div className="px-6 py-4 border-t border-[var(--color-border)] text-[var(--color-text-secondary)]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
