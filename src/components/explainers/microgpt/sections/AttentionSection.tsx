'use client';

import { useState, useMemo } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import { ATTENTION_PATTERNS } from '@/lib/explainers/microgpt-attention-patterns';

const STEP_LABELS = [
  'Input Embeddings',
  'Q, K, V Projection',
  'Dot Product QK\u1D40',
  'Scale + Softmax',
  'Weighted Sum',
];

export default function AttentionSection() {
  const [selectedName, setSelectedName] = useState('emma');
  const [currentStep, setCurrentStep] = useState(0);

  const pattern = useMemo(
    () => ATTENTION_PATTERNS.find((p) => p.name === selectedName)!,
    [selectedName]
  );

  const step = pattern.steps[currentStep];
  const showHeatmaps = currentStep >= 3;

  return (
    <SectionWrapper id="attention">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          Attention Is All You Need
        </h2>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          Each head learns to focus on different patterns in the sequence.
        </p>

        {/* Controls */}
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
          {/* Name selector */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name-select"
              className="text-sm font-medium text-text-tertiary uppercase tracking-wider"
            >
              Name
            </label>
            <select
              id="name-select"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="rounded-lg border border-border bg-bg-card px-4 py-2.5 text-base font-mono text-text-primary shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-forward-blue/40"
            >
              {ATTENTION_PATTERNS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step slider */}
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="step-slider"
              className="text-sm font-medium text-text-tertiary uppercase tracking-wider"
            >
              Step {currentStep} of {STEP_LABELS.length - 1}
            </label>
            <input
              id="step-slider"
              type="range"
              min={0}
              max={4}
              step={1}
              value={currentStep}
              onChange={(e) => setCurrentStep(Number(e.target.value))}
              className="w-full accent-forward-blue"
            />
            <div className="flex justify-between">
              {STEP_LABELS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`text-xs sm:text-sm transition-colors ${
                    i === currentStep
                      ? 'font-semibold text-forward-blue'
                      : 'text-text-tertiary hover:text-text-secondary'
                  }`}
                  style={{ maxWidth: `${100 / STEP_LABELS.length}%` }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step info panel */}
        <div className="mt-8 rounded-xl border border-border bg-bg-card p-5 shadow-sm transition-all duration-300">
          <div className="flex items-baseline gap-3">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forward-blue text-xs font-bold text-white">
              {currentStep}
            </span>
            <h3 className="text-lg font-semibold text-text-primary font-sans">
              {step.label}
            </h3>
          </div>
          <p className="mt-2 ml-10 text-sm text-text-secondary leading-relaxed">
            {step.description}
          </p>
          <div className="mt-3 ml-10 inline-block rounded-lg bg-bg-secondary px-4 py-2">
            <code className="font-mono text-sm text-text-primary">{step.formula}</code>
          </div>
        </div>

        {/* Attention heatmaps */}
        <div className="relative mt-10">
          {!showHeatmaps && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-bg-primary/60 backdrop-blur-sm">
              <p className="rounded-lg bg-bg-card px-6 py-4 text-center text-sm font-medium text-text-secondary shadow-lg border border-border">
                Complete steps 0-3 to reveal attention patterns
              </p>
            </div>
          )}

          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 transition-all duration-500 ${
              !showHeatmaps ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'
            }`}
          >
            {pattern.heads.map((head, headIdx) => (
              <HeatmapCard
                key={`${selectedName}-${headIdx}`}
                head={head}
                tokens={pattern.tokens}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function HeatmapCard({
  head,
  tokens,
}: {
  head: { name: string; description: string; weights: number[][] };
  tokens: string[];
}) {
  const size = tokens.length;
  // Scale cell sizes based on token count
  const cellSize = size <= 5 ? 'w-11 h-11 text-sm' : size <= 6 ? 'w-10 h-10 text-xs' : 'w-9 h-9 text-xs';
  const labelSize = size <= 5 ? 'text-sm w-11' : size <= 6 ? 'text-xs w-10' : 'text-xs w-9';

  return (
    <div className="rounded-xl border border-border bg-bg-card p-4 shadow-sm">
      <h4 className="text-sm font-semibold text-text-primary font-sans">{head.name}</h4>
      <p className="mt-1 text-sm text-text-tertiary leading-relaxed line-clamp-2">
        {head.description}
      </p>

      <div className="mt-4 overflow-x-auto">
        <div className="inline-block">
          {/* Column headers (keys) */}
          <div className="flex">
            {/* Spacer for row labels */}
            <div className={labelSize} />
            {tokens.map((token, j) => (
              <div
                key={`col-${j}`}
                className={`${cellSize} flex items-end justify-center pb-1 font-mono font-medium text-text-tertiary`}
              >
                {token === '.' ? '\u00B7' : token}
              </div>
            ))}
          </div>

          {/* Rows */}
          {tokens.map((rowToken, i) => (
            <div key={`row-${i}`} className="flex">
              {/* Row label (query) */}
              <div
                className={`${labelSize} flex shrink-0 items-center justify-center font-mono font-medium text-text-tertiary`}
              >
                {rowToken === '.' ? '\u00B7' : rowToken}
              </div>

              {/* Cells */}
              {tokens.map((_, j) => {
                const weight = head.weights[i]?.[j] ?? 0;
                return (
                  <div
                    key={`cell-${i}-${j}`}
                    className={`${cellSize} flex items-center justify-center rounded-sm border border-border/30 font-mono transition-colors duration-300`}
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--forward-blue) ${Math.round(weight * 100)}%, transparent)`,
                    }}
                    title={`Q: ${tokens[i]}, K: ${tokens[j]}, weight: ${weight.toFixed(3)}`}
                  >
                    {weight > 0.1 && (
                      <span
                        className={`font-medium ${
                          weight > 0.5 ? 'text-white' : 'text-text-primary'
                        }`}
                      >
                        {weight < 0.995 ? `.${Math.round(weight * 100).toString().padStart(2, '0')}` : '1.0'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Axis labels */}
      <div className="mt-3 flex items-center justify-between text-xs text-text-tertiary uppercase tracking-widest">
        <span>Query (row)</span>
        <span>Key (col)</span>
      </div>
    </div>
  );
}
