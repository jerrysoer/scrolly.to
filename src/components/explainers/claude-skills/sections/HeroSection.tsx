'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Terminal } from 'lucide-react';

const SKILLS = [
  { name: 'code-reviewer', desc: 'Expert code review specialist' },
  { name: 'debugger', desc: 'Systematic debugging for errors and failures' },
  { name: 'scrolly', desc: 'Interactive visual explainer generator' },
  { name: 'prd-specialist', desc: 'Comprehensive product requirements' },
  { name: 'decision-doc', desc: 'Structured decision documents' },
];

const EXECUTION_LINES = [
  { text: 'Launching skill: code-reviewer', color: 'var(--accent-indigo)', delay: 200 },
  { text: 'Loading ~/.claude/skills/code-reviewer/SKILL.md', color: 'var(--text-tertiary)', delay: 400 },
  { text: 'Parsing frontmatter → 3 fields extracted', color: 'var(--text-tertiary)', delay: 300 },
  { text: 'Expanding prompt → 29 lines of expertise loaded', color: 'var(--text-tertiary)', delay: 300 },
  { text: 'Tool sandbox: Read, Grep, Glob, Bash', color: 'var(--accent-amber)', delay: 200 },
  { text: '', color: '', delay: 100 },
  { text: 'Reviewing src/components/ExplainerApp.tsx...', color: 'var(--accent-emerald)', delay: 600 },
  { text: '', color: '', delay: 100 },
  { text: '■ Critical: No input sanitization on user query (line 42)', color: 'var(--accent-rose)', delay: 400 },
  { text: '▲ Warning: useEffect missing dependency array (line 18)', color: 'var(--accent-amber)', delay: 300 },
  { text: '◆ Suggestion: Extract magic number 200 to named constant', color: 'var(--accent-indigo)', delay: 300 },
  { text: '', color: '', delay: 100 },
  { text: '✓ Review complete — 1 critical, 1 warning, 1 suggestion', color: 'var(--accent-emerald)', delay: 200 },
];

export default function HeroSection() {
  const [input, setInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(-1);
  const [phase, setPhase] = useState<'typing' | 'autocomplete' | 'executing' | 'done'>('typing');
  const [executionLines, setExecutionLines] = useState<typeof EXECUTION_LINES>([]);
  const [autoPlayed, setAutoPlayed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const filteredSkills = SKILLS.filter((s) =>
    input.length > 1 ? s.name.startsWith(input.slice(1)) : true
  );

  const executeSkill = useCallback(() => {
    setPhase('executing');
    setShowAutocomplete(false);
    setExecutionLines([]);

    let cumDelay = 300;
    EXECUTION_LINES.forEach((line, i) => {
      cumDelay += line.delay;
      setTimeout(() => {
        setExecutionLines((prev) => [...prev, line]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (i === EXECUTION_LINES.length - 1) setPhase('done');
      }, cumDelay);
    });
  }, []);

  // Auto-play demo after 2 seconds if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'typing' && input === '' && !autoPlayed) {
        setAutoPlayed(true);
        // Type /code-reviewer character by character
        const cmd = '/code-reviewer';
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i <= cmd.length) {
            setInput(cmd.slice(0, i));
            if (i === 1) setShowAutocomplete(true);
            i++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setSelectedSkill(0);
              setTimeout(executeSkill, 500);
            }, 600);
          }
        }, 70);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [phase, input, autoPlayed, executeSkill]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '/' && input === '') {
      setInput('/');
      setShowAutocomplete(true);
      e.preventDefault();
    } else if (e.key === 'ArrowDown' && showAutocomplete) {
      setSelectedSkill((prev) => Math.min(prev + 1, filteredSkills.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp' && showAutocomplete) {
      setSelectedSkill((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' && showAutocomplete && selectedSkill >= 0) {
      setInput('/' + filteredSkills[selectedSkill].name);
      setShowAutocomplete(false);
      setTimeout(executeSkill, 300);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.startsWith('/') && val.length >= 1) {
      setShowAutocomplete(true);
      setSelectedSkill(0);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleSkillClick = (i: number) => {
    setInput('/' + filteredSkills[i].name);
    setSelectedSkill(i);
    setShowAutocomplete(false);
    setTimeout(executeSkill, 300);
  };

  const handleReset = () => {
    setInput('');
    setPhase('typing');
    setShowAutocomplete(false);
    setSelectedSkill(-1);
    setExecutionLines([]);
    setAutoPlayed(true); // don't auto-play again
    inputRef.current?.focus();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Atmospheric background — refined dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 0.5px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 75%)',
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center z-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-wide uppercase"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--accent-indigo)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            letterSpacing: '0.08em',
          }}
        >
          <Terminal size={13} />
          Interactive Explainer
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.08] mb-6 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          How Claude Code
          <br />
          <span
            style={{
              color: 'var(--accent-indigo)',
              textDecoration: 'underline',
              textDecorationColor: 'color-mix(in srgb, var(--accent-indigo) 25%, transparent)',
              textUnderlineOffset: '6px',
              textDecorationThickness: '3px',
            }}
          >
            Skills
          </span>{' '}
          Work
        </h1>

        <p
          className="text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-14"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          A single markdown file becomes a specialized AI workflow.
          Type{' '}
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85em',
              color: 'var(--accent-indigo)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
            }}
          >
            /
          </code>{' '}
          below to see it in action.
        </p>

        {/* Interactive terminal */}
        <div
          className="mx-auto max-w-xl rounded-xl overflow-hidden text-left"
          style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#27CA40' }} />
            <span
              className="ml-2 text-xs font-medium"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
            >
              Claude Code
            </span>
            {phase !== 'typing' && (
              <button
                onClick={handleReset}
                className="ml-auto text-xs px-2 py-0.5 rounded"
                style={{
                  color: 'var(--text-tertiary)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="px-5 py-4 relative"
            style={{
              backgroundColor: 'var(--bg-card)',
              maxHeight: '320px',
              overflowY: 'auto',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Input line */}
            <div className="flex items-center gap-2">
              <span
                style={{
                  color: 'var(--accent-emerald)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                }}
              >
                $
              </span>
              {phase === 'typing' || phase === 'autocomplete' ? (
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Type / to explore skills..."
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    caretColor: 'var(--accent-indigo)',
                  }}
                  autoFocus={false}
                />
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {input}
                </span>
              )}
            </div>

            {/* Autocomplete dropdown */}
            {showAutocomplete && filteredSkills.length > 0 && (
              <div
                className="mt-2 rounded-lg overflow-hidden animate-fadeIn"
                style={{
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                {filteredSkills.map((skill, i) => (
                  <button
                    key={skill.name}
                    onClick={() => handleSkillClick(i)}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 transition-colors"
                    style={{
                      backgroundColor: i === selectedSkill ? 'var(--bg-card)' : 'transparent',
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-indigo)' }}
                    >
                      /{skill.name}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {skill.desc}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Execution output */}
            {executionLines.length > 0 && (
              <div className="mt-3">
                {executionLines.map((line, i) => (
                  <div
                    key={i}
                    className="animate-fadeIn"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: line.color || 'var(--text-secondary)',
                      lineHeight: '1.8',
                      minHeight: line.text ? undefined : '8px',
                    }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)' }}
        >
          Scroll to explore
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce-down"
          style={{ color: 'var(--text-tertiary)' }}
        />
      </div>
    </section>
  );
}
