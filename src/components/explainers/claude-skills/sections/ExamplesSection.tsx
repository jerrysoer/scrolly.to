'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import ExpandableDeepDive from '@/components/explainers/shared/ExpandableDeepDive';
import { EXAMPLE_SKILLS, SKILL_CATEGORIES, TOOL_ICONS } from '@/lib/explainers/claude-skills';

const ALL_TOOLS = ['Read', 'Write', 'Edit', 'Bash', 'Grep', 'Glob', 'WebSearch', 'WebFetch'];

export default function ExamplesSection() {
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const skill = EXAMPLE_SKILLS[selectedSkill];
  const categoryColor = SKILL_CATEGORIES.find((c) => c.name === skill.category)?.color || 'var(--accent-indigo)';

  return (
    <SectionWrapper id="examples">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Skills in the Wild
      </h2>
      <p
        className="text-lg mb-10 max-w-2xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        From 29-line checklists to 1,255-line frameworks&mdash;skills range from
        simple utilities to complete application generators.
      </p>

      {/* Category legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: `color-mix(in srgb, ${cat.color} 12%, transparent)`,
              color: cat.color,
              border: `1px solid color-mix(in srgb, ${cat.color} 25%, transparent)`,
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
            {cat.name}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Skill selector - bar chart */}
        <div>
          <h3
            className="text-sm font-semibold mb-4"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Skill complexity (lines of prompt)
          </h3>
          <div className="flex flex-col gap-3">
            {EXAMPLE_SKILLS.map((s, i) => {
              const catColor = SKILL_CATEGORIES.find((c) => c.name === s.category)?.color || 'var(--accent-indigo)';
              const maxLines = Math.max(...EXAMPLE_SKILLS.map((x) => x.lines));
              const widthPct = Math.max(8, (s.lines / maxLines) * 100);
              return (
                <button key={i} onClick={() => setSelectedSkill(i)} className="flex items-center gap-3 text-left group">
                  <span
                    className="w-32 text-sm text-right flex-shrink-0 truncate"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '13px',
                      color: selectedSkill === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: selectedSkill === i ? 600 : 400,
                    }}
                  >
                    {s.name}
                  </span>
                  <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div
                      className="h-full rounded-lg flex items-center px-3 transition-all duration-500"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: selectedSkill === i ? catColor : `color-mix(in srgb, ${catColor} 40%, transparent)`,
                      }}
                    >
                      <span className="text-xs font-bold" style={{ color: selectedSkill === i ? '#fff' : 'var(--text-tertiary)' }}>
                        {s.lines}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill detail card */}
        <div
          className="rounded-xl p-6 animate-fadeIn"
          key={selectedSkill}
          style={{ backgroundColor: 'var(--bg-card)', border: `2px solid ${categoryColor}` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${categoryColor} 12%, transparent)`, color: categoryColor }}>
              {skill.category}
            </span>
            <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              {skill.complexity}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            /{skill.name}
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {skill.purpose}
          </p>
          <div className="mb-6">
            <h4 className="text-xs font-semibold mb-3" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Allowed tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.tools.map((tool) => (
                <span key={tool} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  <span>{TOOL_ICONS[tool] || '🔧'}</span>{tool}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: categoryColor }}>{skill.lines}</span>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>lines of prompt</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {skill.lines < 50 ? 'Concise and focused — a checklist-style skill'
                : skill.lines < 200 ? 'Medium complexity — methodology + examples + output templates'
                  : 'Full framework — complete project scaffolding with design system, SEO, and deployment'}
            </p>
          </div>
        </div>
      </div>

      {/* Tool Permission Matrix */}
      <div className="mt-12">
        <h3
          className="text-sm font-semibold mb-4"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          Tool permission matrix
        </h3>
        <div
          className="rounded-xl overflow-hidden overflow-x-auto"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th
                  className="text-left px-4 py-3 text-xs font-semibold"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border)' }}
                >
                  Skill
                </th>
                {ALL_TOOLS.map((tool) => (
                  <th
                    key={tool}
                    className="text-center px-2 py-3 text-xs font-semibold cursor-pointer transition-colors"
                    style={{
                      color: hoveredTool === tool ? 'var(--accent-indigo)' : 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      borderBottom: '1px solid var(--border)',
                      backgroundColor: hoveredTool === tool ? 'color-mix(in srgb, var(--accent-indigo) 5%, transparent)' : 'transparent',
                    }}
                    onMouseEnter={() => setHoveredTool(tool)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <div className="text-base mb-0.5">{TOOL_ICONS[tool]}</div>
                    {tool}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_SKILLS.map((s, i) => {
                const catColor = SKILL_CATEGORIES.find((c) => c.name === s.category)?.color || 'var(--accent-indigo)';
                const isSelected = i === selectedSkill;
                return (
                  <tr
                    key={s.name}
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedSkill(i)}
                    style={{
                      backgroundColor: isSelected ? `color-mix(in srgb, ${catColor} 6%, transparent)` : 'transparent',
                    }}
                  >
                    <td
                      className="px-4 py-2.5 text-sm font-medium"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: isSelected ? catColor : 'var(--text-secondary)',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      /{s.name}
                    </td>
                    {ALL_TOOLS.map((tool) => {
                      const hasAccess = (s.tools as readonly string[]).includes(tool);
                      const isToolHovered = hoveredTool === tool;
                      return (
                        <td
                          key={tool}
                          className="text-center px-2 py-2.5"
                          style={{
                            borderBottom: '1px solid var(--border)',
                            backgroundColor: isToolHovered && hasAccess
                              ? `color-mix(in srgb, var(--accent-indigo) 10%, transparent)`
                              : 'transparent',
                          }}
                          onMouseEnter={() => setHoveredTool(tool)}
                          onMouseLeave={() => setHoveredTool(null)}
                        >
                          {hasAccess ? (
                            <span
                              className="inline-block h-5 w-5 rounded-full text-xs font-bold leading-5"
                              style={{
                                backgroundColor: isSelected ? catColor : 'var(--accent-emerald)',
                                color: '#fff',
                              }}
                            >
                              ✓
                            </span>
                          ) : (
                            <span
                              className="inline-block h-5 w-5 rounded-full text-xs leading-5"
                              style={{
                                backgroundColor: 'var(--bg-secondary)',
                                color: 'var(--text-tertiary)',
                              }}
                            >
                              –
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
          Click a row to select that skill. Hover a column to highlight that tool across all skills.
        </p>
      </div>

      <div className="mt-6">
        <ExpandableDeepDive label="Go deeper">
          <p className="mb-3">
            The permission matrix reveals design philosophy: <strong>code-reviewer</strong> has Read but not Write&mdash;it
            can analyze but never modify your code. <strong>scrolly</strong> needs everything because it generates entire
            projects from scratch.
          </p>
          <p>
            If you omit <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>allowed-tools</code> from
            the frontmatter, the skill gets access to all tools. This is fine for personal skills, but for
            team-shared skills, explicit tool lists are a best practice.
          </p>
        </ExpandableDeepDive>
      </div>

      <p className="why-care mt-10 max-w-2xl">
        The scrolly skill that generated THIS explainer is 1,255 lines&mdash;a full architectural blueprint
        that produces production-grade interactive pages from a single sentence.
      </p>
    </SectionWrapper>
  );
}
