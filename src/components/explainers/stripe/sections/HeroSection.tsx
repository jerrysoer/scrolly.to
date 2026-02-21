"use client";

import { useEffect, useState, useCallback } from "react";
import {
  User,
  Store,
  Zap,
  Network,
  Landmark,
  Building2,
  ChevronDown,
} from "lucide-react";

const nodes = [
  { id: "customer", label: "Customer", Icon: User, x: 8, y: 50 },
  { id: "merchant", label: "Merchant", Icon: Store, x: 23, y: 50 },
  { id: "stripe", label: "Stripe", Icon: Zap, x: 38, y: 50 },
  { id: "network", label: "Card Network", Icon: Network, x: 53, y: 50 },
  { id: "issuer", label: "Issuing Bank", Icon: Building2, x: 68, y: 50 },
  { id: "acquirer", label: "Acquiring Bank", Icon: Landmark, x: 83, y: 50 },
];

interface Particle {
  id: number;
  fromIdx: number;
  toIdx: number;
  progress: number;
  color: string;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeNode, setActiveNode] = useState<number>(-1);
  const [particleId, setParticleId] = useState(0);

  const spawnParticle = useCallback(() => {
    const fromIdx = Math.floor(Math.random() * (nodes.length - 1));
    const direction = Math.random() > 0.5 ? 1 : -1;
    const toIdx = Math.min(
      Math.max(fromIdx + direction, 0),
      nodes.length - 1
    );
    if (fromIdx === toIdx) return;

    const color =
      direction > 0 ? "var(--forward-blue)" : "var(--backward-orange)";

    setParticleId((prev) => {
      const newId = prev + 1;
      setParticles((p) => [
        ...p.slice(-15),
        { id: newId, fromIdx, toIdx, progress: 0, color },
      ]);
      return newId;
    });
  }, []);

  useEffect(() => {
    const spawnInterval = setInterval(spawnParticle, 400);
    return () => clearInterval(spawnInterval);
  }, [spawnParticle]);

  useEffect(() => {
    const animInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 0.03 }))
          .filter((p) => p.progress <= 1)
      );
    }, 16);
    return () => clearInterval(animInterval);
  }, []);

  useEffect(() => {
    const nodeInterval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 2000);
    return () => clearInterval(nodeInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl text-center">
        <span
          className="mb-4 inline-block font-mono text-sm tracking-widest uppercase"
          style={{ color: "var(--stripe-purple)" }}
        >
          Interactive Explainer
        </span>
        <h1
          className="mb-6 text-4xl sm:text-5xl lg:text-7xl font-bold italic tracking-tight"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Two Seconds,
          <br />
          <span style={{ color: "var(--stripe-purple)" }}>Seven Players</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg sm:text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          What really happens in the ~2 seconds between clicking &ldquo;Pay&rdquo; and seeing
          &ldquo;Payment Confirmed.&rdquo; From card tokenization to bank settlement &mdash;
          every hop, every millisecond.
        </p>

        {/* Flow Diagram */}
        <div className="relative mx-auto mb-16 w-full max-w-4xl">
          <svg
            viewBox="0 0 100 100"
            className="w-full"
            style={{ height: "auto", aspectRatio: "2.5 / 1" }}
            aria-label="Payment flow diagram showing Customer, Merchant, Stripe, Card Network, Issuing Bank, and Acquiring Bank"
          >
            {/* Connection lines */}
            {nodes.slice(0, -1).map((node, i) => (
              <line
                key={`line-${i}`}
                x1={node.x}
                y1={50}
                x2={nodes[i + 1].x}
                y2={50}
                stroke="var(--border)"
                strokeWidth="0.3"
                strokeDasharray="1,1"
              />
            ))}

            {/* Particles */}
            {particles.map((p) => {
              const from = nodes[p.fromIdx];
              const to = nodes[p.toIdx];
              const x = from.x + (to.x - from.x) * p.progress;
              const opacity =
                p.progress < 0.1
                  ? p.progress / 0.1
                  : p.progress > 0.9
                  ? (1 - p.progress) / 0.1
                  : 1;
              return (
                <circle
                  key={p.id}
                  cx={x}
                  cy={50}
                  r="0.8"
                  fill={p.color}
                  opacity={opacity * 0.8}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => {
              const isActive = i === activeNode;
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={50}
                    r={isActive ? "5" : "4"}
                    fill="var(--bg-card)"
                    stroke={
                      isActive ? "var(--stripe-purple)" : "var(--border)"
                    }
                    strokeWidth={isActive ? "0.5" : "0.3"}
                    style={{
                      transition: "all 0.3s ease",
                      filter: isActive
                        ? "drop-shadow(0 0 4px rgba(99, 91, 255, 0.4))"
                        : "none",
                    }}
                  />
                  <text
                    x={node.x}
                    y={62}
                    textAnchor="middle"
                    fill="var(--text-secondary)"
                    fontSize="2.5"
                    fontFamily="var(--font-body)"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Node icons overlay - positioned absolutely over the SVG */}
          <div className="absolute inset-0 pointer-events-none" style={{ aspectRatio: "2.5 / 1" }}>
            {nodes.map((node, i) => {
              const isActive = i === activeNode;
              const leftPercent = node.x;
              return (
                <div
                  key={`icon-${node.id}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${leftPercent}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isActive ? "28px" : "22px",
                    height: isActive ? "28px" : "22px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <node.Icon
                    size={isActive ? 16 : 13}
                    style={{
                      color: isActive
                        ? "var(--stripe-purple)"
                        : "var(--text-tertiary)",
                      transition: "all 0.3s ease",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Time indicator */}
        <div
          className="mx-auto mb-16 flex items-center gap-3 rounded-full border px-6 py-3"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--correct-green)" }}
          />
          <span className="font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
            Average total time: <strong style={{ color: "var(--text-primary)" }}>1.8 seconds</strong>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() =>
          document
            .getElementById("tokenization")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "var(--text-tertiary)" }}
        aria-label="Scroll to first section"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
