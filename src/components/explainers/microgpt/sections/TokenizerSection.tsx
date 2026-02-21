'use client';

import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import { tokenize, VOCAB } from '@/lib/explainers/microgpt-vocab';

export default function TokenizerSection() {
  const [input, setInput] = useState('emma');

  const tokens = useMemo(() => tokenize(input), [input]);
  const activeIds = useMemo(
    () => new Set(tokens.map((t) => t.id)),
    [tokens]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value
      .toLowerCase()
      .replace(/[^a-z]/g, '')
      .slice(0, 10);
    setInput(cleaned);
  };

  return (
    <SectionWrapper id="tokenizer">
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
            From Characters to Numbers
          </h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl">
            The model sees numbers, not letters. Every character becomes a token ID.
          </p>

          {/* Input field */}
          <div className="mb-10">
            <label
              htmlFor="token-input"
              className="block font-mono text-sm uppercase tracking-widest text-text-tertiary mb-2"
            >
              Enter a name
            </label>
            <input
              id="token-input"
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="emma"
              className="w-full max-w-sm text-2xl md:text-3xl font-serif px-5 py-3 rounded-xl
                bg-bg-card border border-border text-text-primary
                focus:outline-none focus:ring-2 focus:ring-forward-blue/50 focus:border-forward-blue
                transition-all"
            />
          </div>

          {/* Token display */}
          <div className="flex flex-wrap items-center gap-2 mb-16">
            {tokens.map((token, i) => (
              <div key={`${token.char}-${token.position}-${i}`} className="flex items-center gap-2">
                <div
                  className={`flex flex-col items-center justify-center rounded-xl
                    border-2 min-w-[56px] h-[72px] px-3 transition-all duration-500
                    ${
                      token.id === 0
                        ? 'border-accent-purple bg-accent-purple/10'
                        : 'border-forward-blue bg-forward-blue/10'
                    }`}
                  style={{
                    animation: `rise-up 0.4s ease-out ${i * 0.08}s both`,
                  }}
                >
                  <span
                    className={`text-lg font-serif font-semibold ${
                      token.id === 0 ? 'text-accent-purple' : 'text-forward-blue'
                    }`}
                  >
                    {token.id === 0 ? '\u27E8BOS\u27E9' : token.char}
                  </span>
                  <span className="text-sm font-mono text-text-tertiary">
                    {token.id}
                  </span>
                </div>
                {i < tokens.length - 1 && (
                  <ArrowRight size={16} className="text-text-tertiary shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Vocab grid */}
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-4">
              Full Vocabulary (27 tokens)
            </h3>
            <div className="grid grid-cols-6 md:grid-cols-9 gap-2">
              {VOCAB.map((entry) => {
                const isActive = activeIds.has(entry.id);
                const isBos = entry.id === 0;
                return (
                  <div
                    key={entry.id}
                    className={`flex flex-col items-center justify-center rounded-lg py-2 px-1
                      border transition-all duration-300
                      ${
                        isBos && isActive
                          ? 'border-accent-purple bg-accent-purple/15 shadow-sm'
                          : isActive
                          ? 'border-forward-blue bg-forward-blue/15 shadow-sm'
                          : 'border-border bg-bg-card'
                      }`}
                  >
                    <span
                      className={`text-sm font-serif font-medium ${
                        isBos && isActive
                          ? 'text-accent-purple'
                          : isActive
                          ? 'text-forward-blue'
                          : 'text-text-secondary'
                      }`}
                    >
                      {entry.label}
                    </span>
                    <span className="text-xs font-mono text-text-tertiary">
                      {entry.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
