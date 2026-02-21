'use client';

import { useState, useMemo } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import ExpandableDeepDive from '@/components/explainers/shared/ExpandableDeepDive';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { TOOL_ICONS } from '@/lib/explainers/claude-skills';

const STARTER = `---
name: lint-fixer
description: Automatically fixes linting errors across the
  codebase. Runs the linter, reads errors, and applies fixes.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Lint Fixer

## Process

1. Run the project's linter (detect from package.json)
2. Parse the error output
3. Fix each error in priority order:
   - Syntax errors first
   - Import ordering
   - Unused variables
   - Style issues last
4. Re-run linter to verify fixes
5. Report what was fixed

## Rules

- Never change logic to fix a lint error
- Prefer auto-fixable solutions
- If unsure, leave a TODO comment`;

const TEMPLATES: Record<string, string> = {
  'Code Quality': STARTER,
  'Documentation': `---
name: api-documenter
description: Generates API documentation from code.
  Reads route handlers and produces OpenAPI-style docs.
allowed-tools: Read, Write, Grep, Glob
---

# API Documenter

## Process

1. Find all route/endpoint files
2. For each endpoint, extract:
   - HTTP method and path
   - Request body/query parameters
   - Response shape and status codes
3. Generate markdown documentation

## Output Format

For each endpoint:
- \`METHOD /path\` — one-line description
- **Auth:** required/optional/none
- **Request:** parameter table
- **Response:** JSON example
- **curl example** for quick testing`,
  'Testing': `---
name: test-writer
description: Writes unit tests for untested functions.
  Analyzes code to find gaps and generates test files.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Test Writer

## Process

1. Scan for functions without test files
2. For each untested function:
   - Read the implementation
   - Identify edge cases
   - Generate tests covering:
     - Happy path
     - Edge cases
     - Error handling
3. Use existing test framework conventions

## Rules

- Match existing test naming patterns
- Use descriptive names: "should X when Y"
- Don't mock what you don't own
- Test behavior, not implementation`,
};

function parseSkillMd(content: string) {
  const lines = content.split('\n');
  const firstDelim = lines.indexOf('---');
  const secondDelim = lines.indexOf('---', firstDelim + 1);

  if (firstDelim === -1 || secondDelim === -1) {
    return { valid: false, name: '', description: '', tools: [] as string[], body: content, error: 'Missing YAML frontmatter delimiters (---)' };
  }

  const frontmatterLines = lines.slice(firstDelim + 1, secondDelim);
  const body = lines.slice(secondDelim + 1).join('\n').trim();

  let name = '';
  let description = '';
  let toolsStr = '';

  for (let i = 0; i < frontmatterLines.length; i++) {
    const line = frontmatterLines[i];
    if (line.startsWith('name:')) {
      name = line.replace('name:', '').trim();
    } else if (line.startsWith('description:')) {
      description = line.replace('description:', '').trim();
      // Collect continuation lines
      while (i + 1 < frontmatterLines.length && frontmatterLines[i + 1].match(/^\s+/)) {
        i++;
        description += ' ' + frontmatterLines[i].trim();
      }
    } else if (line.startsWith('allowed-tools:')) {
      toolsStr = line.replace('allowed-tools:', '').trim();
    }
  }

  const tools = toolsStr ? toolsStr.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const errors: string[] = [];
  if (!name) errors.push('Missing "name" field');
  if (!description) errors.push('Missing "description" field');

  return {
    valid: errors.length === 0,
    name,
    description,
    tools,
    body,
    bodyLines: body.split('\n').length,
    error: errors.join(', '),
  };
}

export default function BuildYourOwnSection() {
  const [content, setContent] = useState(STARTER);
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseSkillMd(content), [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTemplate = (name: string) => {
    setContent(TEMPLATES[name]);
  };

  return (
    <SectionWrapper id="build-your-own">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Build Your Own
      </h2>
      <p
        className="text-lg mb-10 max-w-2xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        Edit the SKILL.md on the left, see it parsed in real-time on the right.
      </p>

      {/* Template selector */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="text-sm font-medium self-center" style={{ color: 'var(--text-tertiary)' }}>
          Start from:
        </span>
        {Object.keys(TEMPLATES).map((name) => (
          <button
            key={name}
            onClick={() => handleTemplate(name)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Live split-pane editor */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor pane */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
          >
            <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              SKILL.md — Edit me
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: copied ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                color: copied ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                border: `1px solid ${copied ? 'var(--accent-emerald)' : 'var(--border)'}`,
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[480px] px-5 py-4 resize-none outline-none"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              lineHeight: '1.7',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-card)',
              border: 'none',
            }}
            spellCheck={false}
          />
        </div>

        {/* Parsed preview pane */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: parsed.valid ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}
            />
            <span className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              Parsed preview {parsed.valid ? '— Valid' : '— Issues found'}
            </span>
          </div>

          <div className="px-5 py-4 h-[480px] overflow-y-auto">
            {/* Validation */}
            {!parsed.valid && (
              <div
                className="flex items-start gap-2 rounded-lg p-3 mb-4"
                style={{ backgroundColor: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)' }}
              >
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-rose)' }} />
                <span className="text-sm" style={{ color: 'var(--accent-rose)' }}>{parsed.error}</span>
              </div>
            )}

            {/* Name */}
            <div className="mb-5">
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Slash command
              </label>
              <div
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-mono)', color: parsed.name ? 'var(--accent-indigo)' : 'var(--text-tertiary)' }}
              >
                /{parsed.name || '???'}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Description
              </label>
              <p className="text-sm leading-relaxed" style={{ color: parsed.description ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>
                {parsed.description || 'No description found'}
              </p>
            </div>

            {/* Tools */}
            <div className="mb-5">
              <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Allowed tools ({parsed.tools.length})
              </label>
              {parsed.tools.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {parsed.tools.map((tool) => (
                    <span
                      key={tool}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                    >
                      <span>{TOOL_ICONS[tool] || '🔧'}</span>{tool}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm" style={{ color: 'var(--accent-amber)' }}>
                  All tools (no restriction)
                </span>
              )}
            </div>

            {/* Body preview */}
            <div className="mb-5">
              <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Prompt body ({parsed.bodyLines || 0} lines)
              </label>
              <div
                className="rounded-lg p-3 overflow-auto max-h-48"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <pre
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}
                >
                  {parsed.body || '(empty)'}
                </pre>
              </div>
            </div>

            {/* Install command */}
            {parsed.valid && (
              <div
                className="rounded-lg p-3"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent-emerald) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-emerald) 20%, transparent)' }}
              >
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                  Install command
                </label>
                <code className="text-xs block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  mkdir -p ~/.claude/skills/{parsed.name}
                </code>
                <code className="text-xs block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  # Paste content into ~/.claude/skills/{parsed.name}/SKILL.md
                </code>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Best practices */}
      <div
        className="rounded-xl p-6 mt-8 max-w-2xl"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Best practices
        </h4>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span>
            <span>Start with <strong>allowed-tools</strong> — restrict to only what&rsquo;s needed</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span>
            <span>Include a worked <strong>example</strong> showing realistic input and output</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span>
            <span>Define clear <strong>output format</strong> so results are always structured</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span>
            <span>Add <strong>rules/constraints</strong> to prevent common mistakes</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: 'var(--accent-rose)' }}>&#10007;</span>
            <span>Don&rsquo;t make it too broad — a focused skill beats a vague one</span>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <ExpandableDeepDive label="Go deeper">
          <p className="mb-3">
            Skill descriptions can include <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>&lt;example&gt;</code> blocks
            in the YAML description field. These help Claude understand not just <em>what</em> the skill does,
            but <em>when</em> to invoke it automatically without an explicit slash command.
          </p>
          <p>
            For complex skills (100+ lines), organize the body with clear markdown headings:
            Purpose, Process, Output Format, Rules, Examples. This structure helps Claude navigate
            the prompt efficiently during execution.
          </p>
        </ExpandableDeepDive>
      </div>

      <p className="why-care mt-10 max-w-2xl">
        Your best prompt is the one you never have to write twice. Encode it once, invoke it forever.
      </p>
    </SectionWrapper>
  );
}
