'use client';

import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import { FAQS } from '@/lib/explainers/claude-skills';
import { ExternalLink } from 'lucide-react';

export default function FAQSection() {
  return (
    <SectionWrapper id="faq">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Frequently Asked Questions
      </h2>
      <dl className="space-y-6 max-w-2xl">
        {FAQS.map((faq) => (
          <div key={faq.q}>
            <dt
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              {faq.q}
            </dt>
            <dd
              className="leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontSize: '15px' }}
            >
              {faq.a}
              {'link' in faq && faq.link && (
                <a
                  href={faq.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--accent-indigo)',
                    border: '1px solid var(--border)',
                    display: 'inline-flex',
                  }}
                >
                  <ExternalLink size={14} />
                  {faq.link.label}
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}
