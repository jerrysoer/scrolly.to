'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import ExpandableDeepDive from '@/components/explainers/shared/ExpandableDeepDive';
import JargonTerm from '@/components/explainers/shared/JargonTerm';
import { Wrench, MessageSquare, Zap } from 'lucide-react';

const VERBOSE_LINES = [
  'Hey Claude, can you review this code?',
  'Check for bugs and security vulnerabilities.',
  'Look at naming conventions too.',
  'Also check for code duplication.',
  'Make sure error handling is proper.',
  "Don't forget about secrets/credentials.",
  'Validate inputs at boundaries.',
  'Check if critical logic is tested.',
  'Look for performance bottlenecks.',
  'Format output by priority:',
  '  - Critical issues first',
  '  - Warnings next',
  '  - Suggestions last',
  "And be thorough but don't over-nitpick.",
  'Thanks!',
];

export default function WhatAreSkillsSection() {
  const [view, setView] = useState<'everyday' | 'technical'>('everyday');
  const [diffState, setDiffState] = useState<'verbose' | 'collapsing' | 'collapsed'>('verbose');
  const [visibleLines, setVisibleLines] = useState(VERBOSE_LINES.length);

  const triggerCollapse = () => {
    if (diffState !== 'verbose') {
      setDiffState('verbose');
      setVisibleLines(VERBOSE_LINES.length);
      return;
    }
    setDiffState('collapsing');
    let count = VERBOSE_LINES.length;
    const interval = setInterval(() => {
      count--;
      setVisibleLines(count);
      if (count <= 0) {
        clearInterval(interval);
        setDiffState('collapsed');
      }
    }, 60);
  };

  // Reset diff when switching views
  useEffect(() => {
    setDiffState('verbose');
    setVisibleLines(VERBOSE_LINES.length);
  }, [view]);

  return (
    <SectionWrapper id="what-are-skills">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        What Are Skills?
      </h2>
      <p
        className="text-lg mb-10 max-w-2xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        Think of them as recipes for a chef. Without a recipe, the chef can cook&mdash;but with one,
        the result is consistent every time.
      </p>

      {/* Before / After Diff Animation */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-sm font-semibold"
            style={{
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {diffState === 'collapsed' ? 'After: one command' : 'Before: the prompt you\'d type every time'}
          </h3>
          <button
            onClick={triggerCollapse}
            className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--accent-indigo)',
              color: '#fff',
            }}
          >
            {diffState === 'collapsed' ? 'Show verbose prompt' : 'Collapse to skill'}
          </button>
        </div>

        <div
          className="rounded-xl overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="px-5 py-4">
            {diffState === 'collapsed' ? (
              <div className="flex items-center gap-2 animate-fadeIn py-2">
                <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>$</span>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)' }}
                >
                  /code-reviewer
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full ml-2"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--accent-emerald)',
                  }}
                >
                  Same result, every time
                </span>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  lineHeight: '1.7',
                  overflow: 'hidden',
                }}
              >
                {VERBOSE_LINES.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    className="transition-all duration-150"
                    style={{
                      color: 'var(--text-secondary)',
                      opacity: diffState === 'collapsing' && i >= visibleLines - 2 ? 0.4 : 1,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>
          15 lines of instructions → 1 slash command. The expertise is in the file, not your memory.
        </p>
      </div>

      {/* Everyday vs Technical toggle */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setView('everyday')}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            backgroundColor: view === 'everyday' ? 'var(--accent-indigo)' : 'var(--bg-secondary)',
            color: view === 'everyday' ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${view === 'everyday' ? 'var(--accent-indigo)' : 'var(--border)'}`,
          }}
        >
          Everyday view
        </button>
        <button
          onClick={() => setView('technical')}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            backgroundColor: view === 'technical' ? 'var(--accent-indigo)' : 'var(--bg-secondary)',
            color: view === 'technical' ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${view === 'technical' ? 'var(--accent-indigo)' : 'var(--border)'}`,
          }}
        >
          Technical view
        </button>
      </div>

      {view === 'everyday' ? (
        <div className="grid gap-6 md:grid-cols-3 animate-fadeIn">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <MessageSquare size={20} style={{ color: 'var(--accent-rose)' }} />
              </div>
              <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>Without skills</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
              &ldquo;Hey Claude, can you review this code? Check for bugs, security issues,
              naming conventions, maybe testing coverage too?...&rdquo;
            </p>
            <div className="mt-4 text-xs font-medium px-3 py-1 rounded-full inline-block" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-rose)' }}>
              Inconsistent results every time
            </div>
          </div>

          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--accent-indigo)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                <Zap size={20} style={{ color: 'var(--accent-indigo)' }} />
              </div>
              <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>With skills</h3>
            </div>
            <div className="rounded-lg px-4 py-3 mb-3" style={{ backgroundColor: 'var(--bg-secondary)', fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--accent-indigo)' }}>
              /code-reviewer
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
              One command. The same expert-level review, every time.
            </p>
            <div className="mt-4 text-xs font-medium px-3 py-1 rounded-full inline-block" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-indigo)' }}>
              Consistent, repeatable, shareable
            </div>
          </div>

          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                <Wrench size={20} style={{ color: 'var(--accent-emerald)' }} />
              </div>
              <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px' }}>The insight</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
              Skills are <strong style={{ color: 'var(--text-primary)' }}>saved expertise</strong>.
              Encode a prompt once as a{' '}
              <JargonTerm term="SKILL.md" definition="A markdown file with YAML frontmatter that defines a skill's identity, tool access, and prompt template">
                SKILL.md file
              </JargonTerm>
              &mdash;then invoke it with a slash command forever.
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <figure>
            <svg viewBox="0 0 800 320" className="w-full max-w-3xl" role="img" aria-labelledby="skills-tech-diagram">
              <title id="skills-tech-diagram">Technical diagram: Skills are prompt templates with tool restrictions</title>
              <rect x="0" y="0" width="800" height="320" rx="12" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1" />
              <rect x="40" y="30" width="220" height="260" rx="8" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1" />
              <text x="150" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fontWeight="700" fill="var(--text-primary)">SKILL.md</text>
              <rect x="56" y="76" width="188" height="80" rx="6" fill="var(--bg-card)" stroke="var(--accent-indigo)" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="72" y="96" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent-indigo)">---</text>
              <text x="72" y="112" fontFamily="var(--font-mono)" fontSize="11" fill="var(--text-secondary)">name: code-reviewer</text>
              <text x="72" y="128" fontFamily="var(--font-mono)" fontSize="11" fill="var(--text-secondary)">allowed-tools: Read...</text>
              <text x="72" y="144" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent-indigo)">---</text>
              <rect x="56" y="168" width="188" height="108" rx="6" fill="var(--bg-card)" stroke="var(--accent-violet)" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="72" y="192" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent-violet)"># Code Reviewer</text>
              <text x="72" y="210" fontFamily="var(--font-mono)" fontSize="11" fill="var(--text-tertiary)">Review checklist...</text>
              <text x="72" y="228" fontFamily="var(--font-mono)" fontSize="11" fill="var(--text-tertiary)">Output format...</text>
              <text x="72" y="246" fontFamily="var(--font-mono)" fontSize="11" fill="var(--text-tertiary)">Examples...</text>
              <line x1="280" y1="160" x2="340" y2="160" stroke="var(--accent-indigo)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <rect x="360" y="50" width="200" height="220" rx="8" fill="var(--bg-secondary)" stroke="var(--accent-indigo)" strokeWidth="1.5" />
              <text x="460" y="80" textAnchor="middle" fontFamily="var(--font-body)" fontSize="14" fontWeight="700" fill="var(--accent-indigo)">Claude Runtime</text>
              <text x="380" y="110" fontFamily="var(--font-body)" fontSize="12" fill="var(--text-secondary)">System prompt =</text>
              <text x="380" y="128" fontFamily="var(--font-body)" fontSize="12" fill="var(--text-secondary)">  markdown body</text>
              <text x="380" y="156" fontFamily="var(--font-body)" fontSize="12" fill="var(--text-secondary)">Tool sandbox =</text>
              <text x="380" y="174" fontFamily="var(--font-body)" fontSize="12" fill="var(--text-secondary)">  allowed-tools list</text>
              <text x="380" y="202" fontFamily="var(--font-body)" fontSize="12" fill="var(--text-secondary)">Context =</text>
              <text x="380" y="220" fontFamily="var(--font-body)" fontSize="12" fill="var(--text-secondary)">  conversation + args</text>
              <line x1="580" y1="160" x2="640" y2="160" stroke="var(--accent-emerald)" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
              <rect x="660" y="100" width="110" height="120" rx="8" fill="var(--bg-secondary)" stroke="var(--accent-emerald)" strokeWidth="1.5" />
              <text x="715" y="135" textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill="var(--accent-emerald)">Specialized</text>
              <text x="715" y="155" textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fontWeight="600" fill="var(--accent-emerald)">Output</text>
              <text x="715" y="185" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="var(--text-tertiary)">Consistent,</text>
              <text x="715" y="200" textAnchor="middle" fontFamily="var(--font-body)" fontSize="11" fill="var(--text-tertiary)">structured</text>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-indigo)" />
                </marker>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-emerald)" />
                </marker>
              </defs>
            </svg>
            <figcaption className="mt-3 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
              A SKILL.md file splits into two parts: the frontmatter configures the runtime, the body becomes the system prompt
            </figcaption>
          </figure>
        </div>
      )}

      <div className="mt-6">
        <ExpandableDeepDive label="Go deeper">
          <p className="mb-3">
            Under the hood, Claude Code uses a <strong>progressive disclosure</strong> system.
            At startup, only the <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>name</code> and{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>description</code> from each SKILL.md
            are loaded into the system prompt (~50-100 tokens per skill). The full markdown body is only loaded when the skill is invoked.
          </p>
          <p>
            This means you can have dozens of skills installed without bloating the context window.
            Claude uses the descriptions to decide which skill is relevant, then lazy-loads the full prompt on demand.
          </p>
        </ExpandableDeepDive>
      </div>

      <p className="why-care mt-8 max-w-2xl">
        This is why you can share a skill with your team and everyone gets the same quality output&mdash;the
        expertise is in the file, not in your head.
      </p>
    </SectionWrapper>
  );
}
