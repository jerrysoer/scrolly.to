"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const faqs = [
  {
    question: "What does AI hallucination mean?",
    answer:
      "AI hallucination refers to when an artificial intelligence model generates information that sounds plausible and is stated confidently, but is factually incorrect or entirely fabricated. Unlike human lies, AI hallucinations aren't intentional — they're a structural feature of how language models predict text.",
  },
  {
    question: "Why do AI models hallucinate?",
    answer:
      "AI models hallucinate because they predict the most statistically likely next word based on patterns in their training data. They have no built-in mechanism to verify facts or express uncertainty — confident answers appear far more often in training data than expressions of doubt.",
  },
  {
    question: "Can AI hallucination be fixed?",
    answer:
      "Several approaches are reducing hallucination rates: Retrieval Augmented Generation (RAG) grounds responses in real sources, fine-tuning teaches models to express uncertainty, and post-generation fact-checking layers verify claims. However, no approach fully eliminates hallucination yet.",
  },
  {
    question: "What was the lawyer ChatGPT case?",
    answer:
      "In 2023, a New York lawyer submitted a legal brief citing six court cases he found using ChatGPT. The judge discovered all six cases were completely fabricated — including fake quotes, docket numbers, and outcomes. The lawyer faced sanctions for submitting fictitious citations.",
  },
  {
    question: "How can I tell if AI is hallucinating?",
    answer:
      "Always verify factual claims, especially citations, dates, statistics, and quotes. Cross-reference with primary sources. Be especially skeptical of niche topics, recent events, and specific numbers — areas where AI hallucinates most frequently.",
  },
  {
    question: "What is RAG and how does it reduce hallucination?",
    answer:
      "RAG (Retrieval Augmented Generation) is a technique that retrieves relevant documents from a verified knowledge base before generating a response. By grounding the AI's output in real sources, RAG significantly reduces — but doesn't eliminate — hallucination.",
  },
];

export default function FAQSection() {
  return (
    <SectionWrapper id="faq" layout="centered-card" stagger>
      {/* Header */}
      <div className="text-center mb-10">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--forward-blue)" }}
        >
          FAQ
        </p>
        <h2
          className="font-serif text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordion list */}
      <div className="flex flex-col gap-3 max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="stagger-item group rounded-xl border overflow-hidden"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 select-none"
              style={{
                minHeight: 56,
                listStyle: "none",
                WebkitAppearance: "none",
              }}
              aria-label={faq.question}
            >
              <span
                className="font-sans text-sm font-semibold leading-snug sm:text-base"
                style={{ color: "var(--text-primary)" }}
              >
                {faq.question}
              </span>
              {/* + icon rotates to × when open */}
              <span
                className="shrink-0 flex h-7 w-7 items-center justify-center rounded-md font-mono text-base font-bold"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--forward-blue)",
                  transition: "transform 0.2s ease",
                }}
                aria-hidden="true"
              >
                <svg
                  className="group-open:rotate-45 transition-transform duration-200"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </summary>

            {/* Answer body */}
            <div
              className="px-5 pb-5 pt-1 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <p
                className="font-sans text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
