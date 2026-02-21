"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { Users, Sparkles, ArrowRight } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "user" | "content" | "creator";
}

interface GraphEdge {
  from: string;
  to: string;
}

const socialGraphNodes: GraphNode[] = [
  { id: "you", label: "You", x: 50, y: 50, type: "user" },
  { id: "friend1", label: "Best Friend", x: 20, y: 25, type: "user" },
  { id: "friend2", label: "Coworker", x: 80, y: 20, type: "user" },
  { id: "friend3", label: "Sister", x: 15, y: 70, type: "user" },
  { id: "celeb1", label: "Celebrity Chef", x: 75, y: 75, type: "creator" },
  { id: "celeb2", label: "Pop Star", x: 85, y: 45, type: "creator" },
];

const socialGraphEdges: GraphEdge[] = [
  { from: "you", to: "friend1" },
  { from: "you", to: "friend2" },
  { from: "you", to: "friend3" },
  { from: "you", to: "celeb1" },
  { from: "you", to: "celeb2" },
  { from: "friend1", to: "celeb2" },
  { from: "friend2", to: "celeb1" },
];

const interestGraphNodes: GraphNode[] = [
  { id: "you", label: "You", x: 50, y: 50, type: "user" },
  { id: "cooking", label: "Cooking", x: 25, y: 20, type: "content" },
  { id: "tech", label: "Tech", x: 78, y: 18, type: "content" },
  { id: "comedy", label: "Comedy", x: 15, y: 65, type: "content" },
  { id: "education", label: "Education", x: 82, y: 65, type: "content" },
  { id: "creator1", label: "@unknownchef", x: 10, y: 38, type: "creator" },
  { id: "creator2", label: "@newtechguy", x: 90, y: 38, type: "creator" },
  { id: "creator3", label: "@sciencenerd", x: 60, y: 82, type: "creator" },
];

const interestGraphEdges: GraphEdge[] = [
  { from: "you", to: "cooking" },
  { from: "you", to: "tech" },
  { from: "you", to: "comedy" },
  { from: "you", to: "education" },
  { from: "cooking", to: "creator1" },
  { from: "tech", to: "creator2" },
  { from: "education", to: "creator3" },
];

function GraphVisualization({
  nodes,
  edges,
  accentColor,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  accentColor: string;
}) {
  return (
    <div className="relative aspect-square w-full max-w-xs mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodes.find((n) => n.id === edge.from);
          const to = nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--border)"
              strokeWidth="0.4"
              strokeDasharray="1 1"
            />
          );
        })}
        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.id === "you" ? 4 : 3}
              fill={
                node.id === "you"
                  ? accentColor
                  : node.type === "content"
                  ? "var(--accent-amber)"
                  : node.type === "creator"
                  ? "var(--accent-purple)"
                  : "var(--text-tertiary)"
              }
              opacity={node.id === "you" ? 1 : 0.8}
            />
            <text
              x={node.x}
              y={node.y + 6.5}
              textAnchor="middle"
              fontSize="2.8"
              fill="var(--text-secondary)"
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function InterestGraphSection() {
  const [activeGraph, setActiveGraph] = useState<"social" | "interest">("social");

  const comparisons = [
    {
      aspect: "Content Discovery",
      social: "From people you follow",
      interest: "From anyone, anywhere",
    },
    {
      aspect: "New Creator Reach",
      social: "Need followers first",
      interest: "Content quality decides",
    },
    {
      aspect: "Feed Diversity",
      social: "Limited to your circle",
      interest: "Unlimited exploration",
    },
    {
      aspect: "Personalization Speed",
      social: "Slow (build connections)",
      interest: "Fast (~30 min cold start)",
    },
  ];

  return (
    <SectionWrapper id="interest-graph">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-correct-green mb-3">
          Section 05
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Interest Graph vs Social Graph
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          This is TikTok&apos;s secret weapon. Instagram and YouTube recommend based on{" "}
          <em>who you know</em>. TikTok recommends based on{" "}
          <em>what you care about</em>. That distinction changes everything.
        </p>
      </div>

      {/* Toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-bg-card p-1">
          <button
            onClick={() => setActiveGraph("social")}
            className={`flex items-center gap-2 rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
              activeGraph === "social"
                ? "bg-text-tertiary/15 text-text-primary"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            <Users className="h-4 w-4" />
            Social Graph
          </button>
          <button
            onClick={() => setActiveGraph("interest")}
            className={`flex items-center gap-2 rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
              activeGraph === "interest"
                ? "bg-forward-blue/15 text-forward-blue"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Interest Graph
          </button>
        </div>
      </div>

      {/* Side-by-side on desktop, tabbed on mobile */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-12">
        {/* Social Graph */}
        <div
          className={`rounded-2xl border bg-bg-card p-6 transition-all ${
            activeGraph === "social"
              ? "border-text-tertiary/30 shadow-sm"
              : "border-border opacity-50 lg:opacity-100"
          } ${activeGraph !== "social" ? "hidden lg:block" : ""}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-text-tertiary" />
            <h3 className="font-serif text-lg font-semibold text-text-primary">
              Social Graph
            </h3>
          </div>
          <p className="font-sans text-sm text-text-secondary mb-4">
            Instagram, Facebook, YouTube: your feed is shaped by your social connections.
            Content from strangers rarely breaks through.
          </p>
          <GraphVisualization
            nodes={socialGraphNodes}
            edges={socialGraphEdges}
            accentColor="var(--text-tertiary)"
          />
          <p className="mt-4 font-sans text-xs text-text-tertiary text-center italic">
            You only see content from people in your network
          </p>
        </div>

        {/* Interest Graph */}
        <div
          className={`rounded-2xl border bg-bg-card p-6 transition-all ${
            activeGraph === "interest"
              ? "border-forward-blue/30 shadow-sm"
              : "border-border opacity-50 lg:opacity-100"
          } ${activeGraph !== "interest" ? "hidden lg:block" : ""}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-forward-blue" />
            <h3 className="font-serif text-lg font-semibold text-text-primary">
              Interest Graph
            </h3>
          </div>
          <p className="font-sans text-sm text-text-secondary mb-4">
            TikTok: your feed is shaped by your behavior patterns.
            Unknown creators surface if their content matches your interests.
          </p>
          <GraphVisualization
            nodes={interestGraphNodes}
            edges={interestGraphEdges}
            accentColor="var(--forward-blue)"
          />
          <p className="mt-4 font-sans text-xs text-forward-blue text-center italic">
            Content finds you — no followers required
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
        <div className="grid grid-cols-3 border-b border-border bg-bg-secondary px-4 py-3 sm:px-6">
          <span className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider" />
          <span className="font-sans text-xs font-medium text-text-tertiary uppercase tracking-wider text-center">
            Social Graph
          </span>
          <span className="font-sans text-xs font-medium text-forward-blue uppercase tracking-wider text-center">
            Interest Graph
          </span>
        </div>
        {comparisons.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 px-4 py-3 sm:px-6 ${
              i < comparisons.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="font-sans text-sm font-medium text-text-primary">
              {row.aspect}
            </span>
            <span className="font-sans text-sm text-text-secondary text-center">
              {row.social}
            </span>
            <span className="font-sans text-sm text-forward-blue text-center font-medium">
              {row.interest}
            </span>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="mt-8 flex items-start gap-3 rounded-xl bg-forward-blue/5 border border-forward-blue/20 p-5">
        <ArrowRight className="h-5 w-5 text-forward-blue shrink-0 mt-0.5" />
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-primary">
            Why this matters for creators:
          </span>{" "}
          On Instagram, a new creator with 0 followers has almost no chance of being
          seen. On TikTok, a first-time poster can reach millions — because the
          algorithm evaluates the <em>content</em>, not the <em>creator&apos;s network</em>.
        </p>
      </div>
    </SectionWrapper>
  );
}
