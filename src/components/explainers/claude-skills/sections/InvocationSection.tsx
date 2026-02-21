'use client';

import { useState, useEffect, useRef } from 'react';
import ExpandableDeepDive from '@/components/explainers/shared/ExpandableDeepDive';
import { Terminal, Search, FileText, Maximize2, Shield, Play } from 'lucide-react';

const STEPS = [
  {
    icon: Terminal,
    label: 'User types command',
    detail: 'You type /code-reviewer in the Claude Code CLI. This is the entry point — a simple slash command that triggers the entire pipeline.',
    color: 'var(--accent-indigo)',
    nodeHighlight: [0],
  },
  {
    icon: Search,
    label: 'Skill tool matches',
    detail: 'Claude matches the slash command to a registered skill by scanning all loaded skill names. If no exact match, it falls back to description-based fuzzy matching.',
    color: 'var(--accent-cyan)',
    nodeHighlight: [0, 1],
  },
  {
    icon: FileText,
    label: 'SKILL.md loaded',
    detail: 'The full SKILL.md file is read from disk. YAML frontmatter is parsed for configuration. The markdown body is extracted as the raw prompt template.',
    color: 'var(--accent-violet)',
    nodeHighlight: [1, 2],
  },
  {
    icon: Maximize2,
    label: 'Prompt expanded',
    detail: 'The markdown body becomes the system prompt. Any arguments you passed after the slash command are appended as user context. The conversation history is preserved.',
    color: 'var(--accent-amber)',
    nodeHighlight: [2, 3],
  },
  {
    icon: Shield,
    label: 'Tool sandbox applied',
    detail: 'The allowed-tools list from the frontmatter creates a permission boundary. Only the listed tools are available to the agent — everything else is blocked.',
    color: 'var(--accent-rose)',
    nodeHighlight: [3, 4],
  },
  {
    icon: Play,
    label: 'Agent executes',
    detail: 'Claude runs with the expanded prompt, sandboxed tools, and the full conversation context. The skill\'s expertise now drives every decision.',
    color: 'var(--accent-emerald)',
    nodeHighlight: [4, 5],
  },
];

const PIPELINE_NODES = [
  { x: 80, y: 160, label: '/command', shortLabel: 'CMD' },
  { x: 220, y: 160, label: 'Match', shortLabel: 'MTH' },
  { x: 360, y: 160, label: 'Load', shortLabel: 'LDR' },
  { x: 500, y: 160, label: 'Expand', shortLabel: 'EXP' },
  { x: 640, y: 160, label: 'Sandbox', shortLabel: 'SBX' },
  { x: 780, y: 160, label: 'Execute', shortLabel: 'EXE' },
];

export default function InvocationSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-driven step detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i);
          }
        },
        { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const step = STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      id="invocation"
      className="relative px-4 sm:px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="mx-auto max-w-5xl pt-20 sm:pt-28">
        {/* Section divider */}
        <div
          className="mx-auto mb-10"
          style={{
            height: '1px',
            maxWidth: '72%',
            background: 'linear-gradient(90deg, transparent, var(--border) 25%, var(--border) 75%, transparent)',
          }}
        />
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The Invocation Flow
        </h2>
        <p
          className="text-lg mb-10 max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Like a switchboard routing your call. You press the digits, the system connects you to the right specialist.
        </p>
      </div>

      {/* Scrollytelling layout */}
      <div className="mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: narrative cards (scroll naturally) */}
          <div className="flex flex-col gap-8 lg:gap-[40vh] pb-20 lg:pb-[30vh]">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  ref={(el) => { stepsRef.current[i] = el; }}
                  className="rounded-xl p-6 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: i === activeStep ? `2px solid ${s.color}` : '1px solid var(--border)',
                    opacity: i === activeStep ? 1 : 0.6,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `color-mix(in srgb, ${s.color} 15%, transparent)` }}
                    >
                      <Icon size={20} style={{ color: s.color }} />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                          color: s.color,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        Step {i + 1}
                      </span>
                      <h3
                        className="font-semibold mt-1"
                        style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}
                      >
                        {s.label}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {s.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: sticky pipeline diagram */}
          <div className="hidden lg:block">
            <div className="sticky top-24" style={{ height: 'calc(100vh - 200px)' }}>
              <div
                className="rounded-xl p-6 h-full flex flex-col"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="text-xs font-medium mb-4"
                  style={{
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Pipeline visualization
                </div>

                {/* SVG Pipeline */}
                <div className="flex-1 flex items-center">
                  <svg viewBox="0 0 860 320" className="w-full" role="img" aria-label="Invocation pipeline diagram">
                    {/* Connection lines */}
                    {PIPELINE_NODES.slice(0, -1).map((node, i) => {
                      const next = PIPELINE_NODES[i + 1];
                      const isActive = step.nodeHighlight.includes(i) && step.nodeHighlight.includes(i + 1);
                      return (
                        <line
                          key={`line-${i}`}
                          x1={node.x + 30}
                          y1={node.y}
                          x2={next.x - 30}
                          y2={next.y}
                          stroke={isActive ? step.color : 'var(--border)'}
                          strokeWidth={isActive ? 3 : 1.5}
                          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                        />
                      );
                    })}

                    {/* Nodes */}
                    {PIPELINE_NODES.map((node, i) => {
                      const isHighlighted = step.nodeHighlight.includes(i);
                      const nodeStep = STEPS[i];
                      const color = nodeStep?.color || 'var(--text-tertiary)';

                      return (
                        <g key={`node-${i}`}>
                          {/* Glow ring for active nodes */}
                          {isHighlighted && (
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={36}
                              fill="none"
                              stroke={color}
                              strokeWidth="2"
                              opacity="0.3"
                              className="animate-pulse-glow"
                            />
                          )}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={28}
                            fill={isHighlighted ? color : 'var(--bg-secondary)'}
                            stroke={isHighlighted ? color : 'var(--border)'}
                            strokeWidth={isHighlighted ? 2 : 1}
                            style={{ transition: 'fill 0.4s, stroke 0.4s' }}
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fontFamily="var(--font-mono)"
                            fontSize="10"
                            fontWeight="700"
                            fill={isHighlighted ? '#fff' : 'var(--text-tertiary)'}
                            style={{ transition: 'fill 0.4s' }}
                          >
                            {node.shortLabel}
                          </text>
                          <text
                            x={node.x}
                            y={node.y + 52}
                            textAnchor="middle"
                            fontFamily="var(--font-body)"
                            fontSize="12"
                            fontWeight={isHighlighted ? '600' : '400'}
                            fill={isHighlighted ? color : 'var(--text-tertiary)'}
                            style={{ transition: 'fill 0.4s' }}
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Active step info */}
                <div
                  className="mt-4 rounded-lg p-4 transition-all duration-300"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${step.color} 8%, transparent)`,
                    borderLeft: `3px solid ${step.color}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold"
                      style={{ color: step.color, fontFamily: 'var(--font-mono)' }}
                    >
                      Step {activeStep + 1}/6
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {step.label}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {activeStep < 5 ? 'Scroll to advance →' : 'Pipeline complete'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile fallback: simple step list (non-sticky) */}
        <div className="lg:hidden mt-8">
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              Pipeline trace
            </div>
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-1.5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: i <= activeStep ? s.color : 'var(--text-tertiary)',
                }}
              >
                <span>{i <= activeStep ? '✓' : '○'}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto pb-20 sm:pb-28">
          <div className="mt-6">
            <ExpandableDeepDive label="Go deeper">
              <p className="mb-3">
                The entire wiring from /command to agent execution takes single-digit milliseconds.
                The expensive part is the LLM inference, not the skill loading.
              </p>
              <p>
                When a skill has <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>allowed-tools</code> set,
                Claude physically cannot call tools outside that list&mdash;it&rsquo;s not just a suggestion,
                it&rsquo;s an enforcement boundary. A code review skill with only{' '}
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>Read, Grep, Glob</code>{' '}
                cannot write files, run commands, or access the internet.
              </p>
            </ExpandableDeepDive>
          </div>

          <p className="why-care mt-10 max-w-2xl">
            The entire process from /command to agent execution takes milliseconds.
            The expensive part is the thinking, not the wiring.
          </p>
        </div>
      </div>
    </section>
  );
}
