'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import ExpandableDeepDive from '@/components/explainers/shared/ExpandableDeepDive';
import { Folder, FolderOpen, FileText, ChevronRight } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'dir' | 'file';
  children?: FileNode[];
  highlight?: boolean;
  label?: string;
}

const FILE_TREE: FileNode[] = [
  {
    name: '~/.claude/',
    type: 'dir',
    children: [
      {
        name: 'skills/',
        type: 'dir',
        highlight: true,
        label: 'Claude scans this directory on startup',
        children: [
          {
            name: 'code-reviewer/',
            type: 'dir',
            children: [
              { name: 'SKILL.md', type: 'file', highlight: true, label: '/code-reviewer' },
            ],
          },
          {
            name: 'debugger/',
            type: 'dir',
            children: [
              { name: 'SKILL.md', type: 'file', highlight: true, label: '/debugger' },
            ],
          },
          {
            name: 'scrolly/',
            type: 'dir',
            children: [
              { name: 'SKILL.md', type: 'file', highlight: true, label: '/scrolly' },
            ],
          },
          {
            name: 'prd-specialist/',
            type: 'dir',
            children: [
              { name: 'SKILL.md', type: 'file', highlight: true, label: '/prd-specialist' },
            ],
          },
        ],
      },
      { name: 'settings.json', type: 'file' },
      { name: 'CLAUDE.md', type: 'file' },
    ],
  },
];

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const isDir = node.type === 'dir';

  return (
    <div>
      <button
        onClick={() => isDir && setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-md hover:bg-[var(--bg-secondary)] transition-colors group"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {isDir ? (
          <>
            <ChevronRight
              size={14}
              style={{
                color: 'var(--text-tertiary)',
                transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
                transition: 'transform 0.2s',
              }}
            />
            {expanded ? (
              <FolderOpen size={16} style={{ color: node.highlight ? 'var(--accent-indigo)' : 'var(--accent-amber)' }} />
            ) : (
              <Folder size={16} style={{ color: node.highlight ? 'var(--accent-indigo)' : 'var(--accent-amber)' }} />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <FileText size={16} style={{ color: node.highlight ? 'var(--accent-violet)' : 'var(--text-tertiary)' }} />
          </>
        )}
        <span
          className="text-sm"
          style={{
            fontFamily: 'var(--font-mono)',
            color: node.highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: node.highlight ? 600 : 400,
          }}
        >
          {node.name}
        </span>
        {node.label && (
          <span
            className="text-xs px-2 py-0.5 rounded-full ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--accent-indigo)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {node.label}
          </span>
        )}
      </button>
      {isDir && expanded && node.children?.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function DiscoverySection() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Scan the skills directory',
      description: 'On startup, Claude Code reads ~/.claude/skills/ and finds every subdirectory.',
    },
    {
      title: 'Find SKILL.md files',
      description: 'Inside each subdirectory, it looks for a SKILL.md file. The directory name doesn\'t matter — the name field in the frontmatter is what counts.',
    },
    {
      title: 'Parse and register',
      description: 'Each SKILL.md is parsed: YAML frontmatter extracted for identity and tool restrictions, markdown body stored as the prompt template. The skill is now available as a /command.',
    },
    {
      title: 'Match on invocation',
      description: 'When you type /code-reviewer, Claude searches registered skills by name. It also uses the description field to match natural language requests to skills without explicit slash commands.',
    },
  ];

  return (
    <SectionWrapper id="discovery">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        How Skills Are Discovered
      </h2>
      <p
        className="text-lg mb-10 max-w-2xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        Like a library scanning its catalog at opening time. Each entry gets indexed before the first visitor arrives.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* File tree */}
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            className="text-xs font-medium mb-3 px-2"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
          >
            File System
          </div>
          {FILE_TREE.map((node, i) => (
            <TreeNode key={i} node={node} />
          ))}
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className="text-left rounded-xl p-5 transition-all"
              style={{
                backgroundColor: step === i ? 'var(--bg-card)' : 'transparent',
                border: step === i ? '2px solid var(--accent-indigo)' : '2px solid var(--border)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    backgroundColor: step === i ? 'var(--accent-indigo)' : 'var(--bg-secondary)',
                    color: step === i ? '#fff' : 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {i + 1}
                </span>
                <h3
                  className="font-semibold"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: step === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '17px',
                  }}
                >
                  {s.title}
                </h3>
              </div>
              {step === i && (
                <p
                  className="ml-10 text-sm animate-fadeIn"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}
                >
                  {s.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <ExpandableDeepDive label="Go deeper">
          <p className="mb-3">
            Skills can also live in project-level directories. A repo can ship its own skills
            in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>.claude/skills/</code> at
            the project root, enabling team-specific workflows that travel with the codebase.
          </p>
          <p>
            Organization admins can deploy skills workspace-wide through centralized management&mdash;a
            feature shipped in December 2025. Updates propagate automatically to all team members.
          </p>
        </ExpandableDeepDive>
      </div>

      <p className="why-care mt-10 max-w-2xl">
        This is why adding a new skill is as simple as dropping a file into a folder&mdash;no config changes,
        no restarts, no package installations.
      </p>
    </SectionWrapper>
  );
}
