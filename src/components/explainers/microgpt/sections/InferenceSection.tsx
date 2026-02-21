'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Sparkles, RotateCcw, Check } from 'lucide-react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import { GENERATION_SAMPLES } from '@/lib/explainers/microgpt-generation-samples';

function getTemperatureDescription(t: number): string {
  if (t <= 0.3) return 'Very conservative — always picks the most likely character';
  if (t <= 0.6) return 'Balanced — diverse but still name-like';
  if (t <= 0.9) return 'Creative — unusual but pronounceable names';
  if (t === 1.0) return "Standard — the model's natural distribution";
  if (t <= 1.5) return 'Experimental — increasingly strange combinations';
  return 'Chaotic — nearly random character selection';
}

function findClosestSample(temperature: number) {
  let closest = GENERATION_SAMPLES[0];
  let minDiff = Math.abs(temperature - closest.temperature);
  for (const sample of GENERATION_SAMPLES) {
    const diff = Math.abs(temperature - sample.temperature);
    if (diff < minDiff) {
      minDiff = diff;
      closest = sample;
    }
  }
  return closest;
}

export default function InferenceSection() {
  const [temperature, setTemperature] = useState(0.7);
  const [fadeKey, setFadeKey] = useState(0);

  // Generation animation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGenStep, setCurrentGenStep] = useState(0);
  const [generatedSoFar, setGeneratedSoFar] = useState('');
  const [highlightedToken, setHighlightedToken] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sample = useMemo(() => findClosestSample(temperature), [temperature]);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setTemperature(Math.round(val * 10) / 10);
    setFadeKey((k) => k + 1);
    resetGeneration();
  };

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetGeneration = useCallback(() => {
    clearTimer();
    setIsGenerating(false);
    setCurrentGenStep(0);
    setGeneratedSoFar('');
    setHighlightedToken(null);
    setIsComplete(false);
  }, [clearTimer]);

  const startGeneration = () => {
    resetGeneration();
    setIsGenerating(true);
    setCurrentGenStep(0);
    setGeneratedSoFar('');
  };

  // Animation loop
  useEffect(() => {
    if (!isGenerating) return;

    const walkthrough = sample.walkthrough;
    if (currentGenStep >= walkthrough.length) {
      setIsGenerating(false);
      setIsComplete(true);
      return;
    }

    const step = walkthrough[currentGenStep];

    // After 600ms, highlight and append the selected token
    timerRef.current = setTimeout(() => {
      setHighlightedToken(step.selectedToken);

      timerRef.current = setTimeout(() => {
        setGeneratedSoFar((prev) => prev + step.selectedToken);
        setHighlightedToken(null);
        setCurrentGenStep((prev) => prev + 1);
      }, 400);
    }, 600);

    return clearTimer;
  }, [isGenerating, currentGenStep, sample.walkthrough, clearTimer]);

  const currentProbabilities = isGenerating && currentGenStep < sample.walkthrough.length
    ? sample.walkthrough[currentGenStep].probabilities.slice(0, 10)
    : null;

  const maxProb = currentProbabilities
    ? Math.max(...currentProbabilities.map((p) => p.prob))
    : 0;

  return (
    <SectionWrapper id="inference">
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
            Generation: Creativity vs. Chaos
          </h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl">
            Temperature controls randomness. Too low = boring. Too high = nonsense.
          </p>

          {/* Temperature control */}
          <div className="mb-10">
            <label className="block font-mono text-sm uppercase tracking-widest text-text-tertiary mb-3">
              Temperature
            </label>
            <div className="flex items-center gap-4 mb-3">
              <input
                type="range"
                min={0.1}
                max={2.0}
                step={0.1}
                value={temperature}
                onChange={handleTemperatureChange}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer
                  bg-bg-secondary accent-forward-blue"
              />
              <span className="font-mono text-2xl font-bold text-forward-blue min-w-[3ch] text-right">
                {temperature.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-text-secondary italic">
              {getTemperatureDescription(temperature)}
            </p>
          </div>

          {/* Name grid */}
          <div className="mb-10">
            <h3 className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-4">
              Generated Names at T={temperature.toFixed(1)}
            </h3>
            <div
              key={fadeKey}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              style={{ animation: 'fade-in 0.4s ease-out' }}
            >
              {sample.names.map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex items-center justify-center px-4 py-3
                    rounded-xl border border-border bg-bg-card
                    font-mono text-lg text-text-primary transition-all"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div className="mb-8">
            <button
              onClick={startGeneration}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 rounded-lg
                bg-forward-blue text-white font-sans font-medium text-base
                hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Sparkles size={18} />
              {isGenerating ? 'Generating...' : 'Generate Step-by-Step'}
            </button>
          </div>

          {/* Step-by-step generation */}
          {(isGenerating || isComplete) && (
            <div className="bg-bg-card border border-border rounded-2xl p-6">
              {/* Name being built */}
              <div className="mb-6">
                <p className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-2">
                  Building name
                </p>
                <div className="flex items-center">
                  <span className="font-mono text-3xl md:text-4xl text-text-primary font-bold tracking-wide">
                    {generatedSoFar}
                  </span>
                  {isGenerating && (
                    <span
                      className="inline-block w-0.5 h-8 md:h-10 bg-forward-blue ml-0.5"
                      style={{ animation: 'pulse-glow 1s infinite' }}
                    />
                  )}
                  {isComplete && (
                    <Check size={24} className="text-correct-green ml-2" />
                  )}
                </div>
              </div>

              {/* Probability bars */}
              {currentProbabilities && (
                <div className="space-y-1.5">
                  <p className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-3">
                    Next token probabilities
                  </p>
                  {currentProbabilities
                    .sort((a, b) => b.prob - a.prob)
                    .map((entry) => {
                      const isSelected = highlightedToken === entry.token;
                      const barWidth = maxProb > 0 ? (entry.prob / maxProb) * 100 : 0;
                      return (
                        <div key={entry.token} className="flex items-center gap-2">
                          <span
                            className={`w-8 text-center font-mono text-sm font-semibold
                              ${isSelected ? 'text-forward-blue' : 'text-text-secondary'}`}
                          >
                            {entry.token === '.' ? '\u23F9' : entry.token}
                          </span>
                          <div className="flex-1 h-6 rounded bg-bg-secondary overflow-hidden">
                            <div
                              className={`h-full rounded transition-all duration-300 ease-out
                                ${isSelected ? 'bg-forward-blue' : 'bg-forward-blue/25'}`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span
                            className={`w-14 text-right font-mono text-sm
                              ${isSelected ? 'text-forward-blue font-bold' : 'text-text-tertiary'}`}
                          >
                            {(entry.prob * 100).toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Complete state */}
              {isComplete && (
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <p className="text-sm text-correct-green font-medium">
                    Generation complete
                  </p>
                  <button
                    onClick={resetGeneration}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                      bg-bg-secondary text-text-secondary font-sans text-sm
                      hover:text-text-primary transition-colors"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
