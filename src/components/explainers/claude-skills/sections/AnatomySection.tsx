'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import ExpandableDeepDive from '@/components/explainers/shared/ExpandableDeepDive';
import JargonTerm from '@/components/explainers/shared/JargonTerm';

const SKILL_LINES = [
  { num: 1, text: '---', zone: 'delimiter', indent: 0 },
  { num: 2, text: 'name: code-reviewer', zone: 'frontmatter', indent: 0 },
  { num: 3, text: 'description: Expert code review specialist.', zone: 'frontmatter', indent: 0 },
  { num: 4, text: '  Proactively reviews code for quality,', zone: 'frontmatter', indent: 2 },
  { num: 5, text: '  security, and maintainability.', zone: 'frontmatter', indent: 2 },
  { num: 6, text: 'allowed-tools: Read, Grep, Glob, Bash', zone: 'frontmatter', indent: 0 },
  { num: 7, text: '---', zone: 'delimiter', indent: 0 },
  { num: 8, text: '', zone: 'body', indent: 0 },
  { num: 9, text: '# Code Reviewer', zone: 'body', indent: 0 },
  { num: 10, text: '', zone: 'body', indent: 0 },
  { num: 11, text: '## Review Checklist', zone: 'body', indent: 0 },
  { num: 12, text: '', zone: 'body', indent: 0 },
  { num: 13, text: '1. **Simplicity** — Could this be simpler?', zone: 'body', indent: 0 },
  { num: 14, text: '2. **Naming** — Are names descriptive?', zone: 'body', indent: 0 },
  { num: 15, text: '3. **Duplication** — Any repeated logic?', zone: 'body', indent: 0 },
  { num: 16, text: '4. **Error handling** — Are errors surfaced?', zone: 'body', indent: 0 },
  { num: 17, text: '5. **Secrets** — Any hardcoded credentials?', zone: 'body', indent: 0 },
  { num: 18, text: '6. **Validation** — Inputs checked at boundaries?', zone: 'body', indent: 0 },
  { num: 19, text: '7. **Testing** — Is critical logic tested?', zone: 'body', indent: 0 },
  { num: 20, text: '8. **Performance** — Any obvious bottlenecks?', zone: 'body', indent: 0 },
  { num: 21, text: '', zone: 'body', indent: 0 },
  { num: 22, text: '## Output Format', zone: 'body', indent: 0 },
  { num: 23, text: '', zone: 'body', indent: 0 },
  { num: 24, text: 'Organize findings by priority:', zone: 'body', indent: 0 },
  { num: 25, text: '- **Critical** — Must fix before merge', zone: 'body', indent: 0 },
  { num: 26, text: '- **Warning** — Should fix soon', zone: 'body', indent: 0 },
  { num: 27, text: '- **Suggestion** — Nice to have', zone: 'body', indent: 0 },
];

type HighlightZone = 'all' | 'frontmatter' | 'name' | 'description' | 'tools' | 'body';

const HIGHLIGHTS: { zone: HighlightZone; label: string; color: string; description: string }[] = [
  { zone: 'all', label: 'Full file', color: 'var(--text-tertiary)', description: 'The complete SKILL.md — everything Claude needs to become a specialist' },
  { zone: 'frontmatter', label: 'Frontmatter', color: 'var(--accent-indigo)', description: 'YAML metadata between --- delimiters. Configures identity and permissions.' },
  { zone: 'name', label: 'name', color: 'var(--accent-cyan)', description: 'The slash command identifier. This becomes /code-reviewer in the CLI.' },
  { zone: 'description', label: 'description', color: 'var(--accent-amber)', description: 'How Claude matches your intent to this skill. Can be multi-line.' },
  { zone: 'tools', label: 'allowed-tools', color: 'var(--accent-rose)', description: 'Security boundary. Only these tools are available — the skill can\'t do anything else.' },
  { zone: 'body', label: 'Prompt body', color: 'var(--accent-violet)', description: 'The full prompt template. Becomes Claude\'s system prompt when the skill runs.' },
];

function isHighlighted(line: typeof SKILL_LINES[0], zone: HighlightZone): boolean {
  if (zone === 'all') return true;
  if (zone === 'frontmatter') return line.zone === 'frontmatter' || line.zone === 'delimiter';
  if (zone === 'name') return line.num === 2;
  if (zone === 'description') return line.num >= 3 && line.num <= 5;
  if (zone === 'tools') return line.num === 6;
  if (zone === 'body') return line.zone === 'body';
  return false;
}

export default function AnatomySection() {
  const [activeZone, setActiveZone] = useState<HighlightZone>('all');
  const activeHighlight = HIGHLIGHTS.find((h) => h.zone === activeZone)!;

  return (
    <SectionWrapper id="anatomy">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Anatomy of a SKILL.md
      </h2>
      <p
        className="text-lg mb-10 max-w-2xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        Like a blueprint with two layers: the spec sheet and the construction plan.
        Click each part to explore.
      </p>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Controls */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {HIGHLIGHTS.map((h) => (
            <button
              key={h.zone}
              onClick={() => setActiveZone(h.zone)}
              className="text-left px-4 py-3 rounded-lg transition-all"
              style={{
                backgroundColor: activeZone === h.zone ? 'var(--bg-card)' : 'transparent',
                border: activeZone === h.zone ? `2px solid ${h.color}` : '2px solid transparent',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: h.color }}
                />
                <span
                  className="font-semibold text-sm"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: activeZone === h.zone ? h.color : 'var(--text-primary)',
                  }}
                >
                  {h.label}
                </span>
              </div>
              {activeZone === h.zone && (
                <p
                  className="text-sm ml-5 animate-fadeIn"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
                >
                  {h.description}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Code display */}
        <div className="lg:col-span-3">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            {/* File tab */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>📄</span>
              <span
                className="text-xs font-medium"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
              >
                ~/.claude/skills/code-reviewer/SKILL.md
              </span>
            </div>

            {/* Code lines */}
            <div className="py-2 overflow-x-auto">
              {SKILL_LINES.map((line) => {
                const highlighted = isHighlighted(line, activeZone);
                const dimmed = activeZone !== 'all' && !highlighted;

                return (
                  <div
                    key={line.num}
                    className="code-line flex px-4 py-0.5 transition-all duration-300"
                    style={{
                      opacity: dimmed ? 0.3 : 1,
                      backgroundColor: highlighted && activeZone !== 'all'
                        ? `color-mix(in srgb, ${activeHighlight.color} 8%, transparent)`
                        : 'transparent',
                    }}
                  >
                    <span
                      className="w-8 text-right mr-4 select-none flex-shrink-0"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      {line.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: line.zone === 'delimiter'
                          ? 'var(--accent-indigo)'
                          : line.text.startsWith('#')
                            ? 'var(--accent-violet)'
                            : line.text.startsWith('name:') || line.text.startsWith('description:') || line.text.startsWith('allowed-tools:')
                              ? 'var(--accent-cyan)'
                              : line.text.startsWith('- **') || line.text.match(/^\d+\./)
                                ? 'var(--text-primary)'
                                : 'var(--text-secondary)',
                        paddingLeft: `${line.indent * 8}px`,
                        whiteSpace: 'pre',
                      }}
                    >
                      {line.text || '\u00A0'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <div
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>27</span> lines total
            </div>
            <div
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>3</span>{' '}
              <JargonTerm term="frontmatter" definition="YAML metadata at the top of a markdown file, between --- delimiters">
                frontmatter fields
              </JargonTerm>
            </div>
            <div
              className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>4</span> tools allowed
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ExpandableDeepDive label="Go deeper">
          <p className="mb-3">
            The <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>description</code> field is more important than it looks.
            Claude uses it for <strong>intent matching</strong>&mdash;even without typing a slash command, if you say
            &ldquo;review my code,&rdquo; Claude compares your request against all skill descriptions to find the best match.
          </p>
          <p className="mb-3">
            Multi-line descriptions (using YAML line continuation with indented lines) work well for skills
            with nuanced trigger conditions. The description can include{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>&lt;example&gt;</code> blocks
            that help Claude understand when to invoke the skill automatically.
          </p>
          <p>
            The <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>allowed-tools</code> field
            accepts any Claude Code tool name: Read, Write, Edit, Bash, Grep, Glob, WebSearch, WebFetch, Task.
            Omitting this field grants access to all tools.
          </p>
        </ExpandableDeepDive>
      </div>

      <p className="why-care mt-10 max-w-2xl">
        This is how 27 lines of markdown can replace a 5-paragraph prompt you&rsquo;d otherwise type from memory each time.
      </p>
    </SectionWrapper>
  );
}
