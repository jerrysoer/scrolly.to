'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  caption?: string;
}

export default function CodeBlock({
  code,
  language = 'python',
  highlightLines = [],
  caption,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div className="overflow-hidden rounded-xl bg-[#1e1e2e] shadow-lg">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
          <span className="text-sm font-medium text-white/40 font-mono uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <pre className="overflow-x-auto p-4 scrollbar-hide">
          <code className="text-sm leading-7 font-mono">
            {lines.map((line, i) => {
              const lineNum = i + 1;
              const isHighlighted = highlightLines.includes(lineNum);
              return (
                <div
                  key={i}
                  className={`flex ${
                    isHighlighted
                      ? 'bg-forward-blue/15 -mx-4 px-4 border-l-2 border-forward-blue'
                      : ''
                  }`}
                >
                  <span className="mr-4 inline-block w-8 shrink-0 select-none text-right text-white/20">
                    {lineNum}
                  </span>
                  <span className="text-gray-200">{line || '\u00A0'}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Caption */}
      {caption && (
        <p className="mt-2.5 text-center text-sm text-text-tertiary italic">
          {caption}
        </p>
      )}
    </div>
  );
}
