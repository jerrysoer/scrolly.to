'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import { TRAINING_SNAPSHOTS, RANDOM_LOSS } from '@/lib/explainers/microgpt-training-snapshots';

const SPEED_OPTIONS = [1, 2, 5, 10] as const;

function getStepDescription(step: number): string {
  if (step <= 50) return 'Random noise — the model knows nothing yet';
  if (step <= 200) return 'Structure emerges — learning common letter patterns';
  if (step <= 500) return 'Getting name-like — recognizable fragments appear';
  return 'Well-trained — generating plausible names';
}

function lossColor(loss: number): string {
  if (loss > 2.8) return 'text-backward-orange';
  if (loss > 2.3) return 'text-accent-amber';
  return 'text-correct-green';
}

export default function TrainingSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chartData = useMemo(
    () => TRAINING_SNAPSHOTS.slice(0, currentStep + 1),
    [currentStep]
  );

  const snapshot = TRAINING_SNAPSHOTS[currentStep];

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimer();
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 1000) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 50 / speed);

    return clearTimer;
  }, [isPlaying, speed, clearTimer]);

  const togglePlay = () => {
    if (currentStep >= 1000) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <SectionWrapper id="training">
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
            Learning, One Step at a Time
          </h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl">
            Watch the model learn to generate names by minimizing prediction error.
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-forward-blue text-white font-sans font-medium text-sm
                hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : currentStep >= 1000 ? 'Replay' : 'Play'}
            </button>

            <div className="flex items-center gap-1 ml-2">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-4 py-2.5 rounded-md text-sm font-mono transition-all
                    ${
                      speed === s
                        ? 'bg-forward-blue text-white'
                        : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
                    }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <span className="ml-auto font-mono text-sm text-text-tertiary">
              Step: {currentStep} / 1000
            </span>
          </div>

          {/* Chart */}
          <div className="bg-bg-card border border-border rounded-2xl p-4 md:p-6 mb-8">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="step"
                  label={{ value: 'Training Step', position: 'insideBottom', offset: -5, fill: '#4a4a4a', fontSize: 13 }}
                  tick={{ fill: '#4a4a4a', fontSize: 12 }}
                />
                <YAxis
                  domain={[1.5, 3.5]}
                  label={{ value: 'Loss', angle: -90, position: 'insideLeft', offset: 10, fill: '#4a4a4a', fontSize: 13 }}
                  tick={{ fill: '#4a4a4a', fontSize: 12 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-bg-card border border-border rounded-lg px-4 py-3 shadow-lg">
                        <p className="font-mono text-sm text-text-tertiary mb-1">
                          Step {d.step}
                        </p>
                        <p className="font-sans text-sm text-text-primary">
                          Loss: <span className="font-mono font-semibold">{d.loss.toFixed(3)}</span>
                        </p>
                        <p className="font-sans text-sm text-text-secondary">
                          LR: <span className="font-mono">{d.learningRate.toFixed(5)}</span>
                        </p>
                        <p className="font-sans text-sm text-text-secondary mt-1">
                          Sample: <span className="font-mono text-forward-blue">{d.sampleName}</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <ReferenceLine
                  y={RANDOM_LOSS}
                  stroke="#E8734A"
                  strokeDasharray="6 4"
                  label={{
                    value: `Random guessing (ln 27)`,
                    position: 'right',
                    fill: '#E8734A',
                    fontSize: 11,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#4A90D9"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Step detail panel */}
          {snapshot && (
            <div className="bg-bg-card border border-border rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Loss */}
                <div>
                  <p className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-1">
                    Loss
                  </p>
                  <p className={`text-3xl font-serif font-bold ${lossColor(snapshot.loss)}`}>
                    {snapshot.loss.toFixed(3)}
                  </p>
                </div>

                {/* Learning Rate */}
                <div>
                  <p className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-1">
                    Learning Rate
                  </p>
                  <p className="text-xl font-mono text-text-primary">
                    {snapshot.learningRate.toFixed(5)}
                  </p>
                </div>

                {/* Sample Name */}
                <div>
                  <p className="font-mono text-sm uppercase tracking-widest text-text-tertiary mb-1">
                    Sample Output
                  </p>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-forward-blue/10 border border-forward-blue/30 font-mono text-lg text-forward-blue">
                    {snapshot.sampleName}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-sm text-text-secondary italic">
                  {getStepDescription(currentStep)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
