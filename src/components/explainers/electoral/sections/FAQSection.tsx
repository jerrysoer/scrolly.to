"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is the Electoral College?",
      answer: "The Electoral College is a body of 538 electors who formally elect the President of the United States. A candidate needs at least 270 electoral votes to win. Each state gets electors equal to its total Congressional representation (House seats + 2 Senators), plus DC gets 3.",
    },
    {
      question: "Why does the US use the Electoral College instead of a popular vote?",
      answer: "The Founders created the Electoral College as a compromise between electing the president by Congress and by popular vote. It was designed to balance power between large and small states and between federal and state authority. Whether it still serves that purpose is actively debated.",
    },
    {
      question: "What are swing states and why do they matter?",
      answer: "Swing states (or battleground states) are states where neither party has a reliable majority, making them competitive in elections. Because most states use winner-take-all rules, candidates focus their campaigns on these states since they're the ones that determine the outcome.",
    },
    {
      question: "Can a president win without the popular vote?",
      answer: "Yes — it has happened five times in US history (1824, 1876, 1888, 2000, and 2016). Because the Electoral College is based on winner-take-all at the state level, a candidate can win by narrow margins in enough states to reach 270 while losing the overall popular vote.",
    },
    {
      question: "What is a faithless elector?",
      answer: "A faithless elector is one who votes for a candidate other than the one they pledged to support. While rare and never outcome-changing, it has happened 165 times in US history. As of 2020, 33 states plus DC have laws binding electors to their pledge.",
    },
  ];

  return (
    <SectionWrapper id="faq" layout="centered">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-heading font-bold text-center text-text-primary mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-border bg-bg-card overflow-hidden hover:border-accent-primary transition-colors"
              style={{
                opacity: 0,
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: `${index * 100}ms`,
              }}
            >
              <summary className="cursor-pointer select-none px-5 py-4 text-lg font-semibold list-none flex items-center justify-between hover:bg-bg-hover transition-colors text-text-primary font-body">
                <span>{faq.question}</span>
                <span className="text-text-tertiary transition-transform group-open:rotate-45 text-2xl ml-4">
                  +
                </span>
              </summary>

              <div className="px-5 pb-4 leading-relaxed text-text-secondary font-body">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
