"use client";

import { useState } from "react";
import {
  DollarSign,
  ShieldAlert,
  CalendarX,
  KeyRound,
  Gauge,
  CreditCard,
  ChevronRight,
  RotateCcw,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { declineTree, declineScenarios, type DeclineNode } from "@/lib/explainers/stripe-decline-reasons";

const iconMap = {
  DollarSign,
  ShieldAlert,
  CalendarX,
  KeyRound,
  Gauge,
  CreditCard,
} as const;

function findNodeByPath(root: DeclineNode, path: string[]): DeclineNode | null {
  if (path.length === 0) return null;
  if (path[0] !== root.id) return null;
  if (path.length === 1) return root;

  let current: DeclineNode = root;
  for (let i = 1; i < path.length; i++) {
    const next = current.children?.find((c) => c.id === path[i]);
    if (!next) return null;
    current = next;
  }
  return current;
}

export default function DeclineSection() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const activeScenario = declineScenarios.find(
    (s) => s.id === selectedScenario
  );
  const activePath = activeScenario?.path || [];
  const visiblePath = activePath.slice(0, currentPathIndex + 1);
  const currentNode = visiblePath.length > 0
    ? findNodeByPath(declineTree, visiblePath)
    : null;
  const isComplete = currentPathIndex >= activePath.length - 1 && activePath.length > 0;
  const terminalNode = isComplete
    ? findNodeByPath(declineTree, activePath)
    : null;

  const selectScenario = (id: string) => {
    setSelectedScenario(id);
    setCurrentPathIndex(0);
  };

  const advance = () => {
    if (currentPathIndex < activePath.length - 1) {
      setCurrentPathIndex((prev) => prev + 1);
    }
  };

  const reset = () => {
    setSelectedScenario(null);
    setCurrentPathIndex(0);
  };

  return (
    <SectionWrapper id="decline">
      <div className="mb-10 sm:mb-14">
        <span className="stripe-section-number">03</span>
        <h2 className="stripe-section-title">Decline Forensics</h2>
        <p className="stripe-section-subtitle">
          Why do payments fail? Pick a scenario and trace exactly where in the chain the decline happened — and why.
        </p>
      </div>

      {/* Scenario picker */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {declineScenarios.map((scenario) => {
          const IconComponent = iconMap[scenario.icon as keyof typeof iconMap];
          const isActive = selectedScenario === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => selectScenario(scenario.id)}
              className="flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: isActive
                  ? "var(--bg-secondary)"
                  : "var(--bg-card)",
                borderColor: isActive ? scenario.color : "var(--border)",
                boxShadow: isActive
                  ? `0 0 12px ${scenario.color}33`
                  : "none",
              }}
            >
              <IconComponent
                size={20}
                style={{
                  color: isActive ? scenario.color : "var(--text-tertiary)",
                }}
              />
              <span
                className="text-xs font-medium text-center leading-tight"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {scenario.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Decision tree visualization */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Path visualization */}
        <div
          className="rounded-2xl border p-6 lg:col-span-3"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {!selectedScenario ? (
            <div className="flex h-64 items-center justify-center text-center">
              <div>
                <AlertTriangle
                  size={32}
                  className="mx-auto mb-3"
                  style={{ color: "var(--text-tertiary)" }}
                />
                <p style={{ color: "var(--text-secondary)" }}>
                  Select a decline scenario above to trace the failure path
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {visiblePath.map((nodeId, i) => {
                const node = findNodeByPath(
                  declineTree,
                  activePath.slice(0, i + 1)
                );
                if (!node) return null;
                const isLast = i === visiblePath.length - 1;
                const isTerminal = node.isTerminal;

                return (
                  <div
                    key={nodeId}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Vertical line + dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold"
                          style={{
                            backgroundColor: isTerminal
                              ? "var(--backward-orange)"
                              : isLast
                              ? "var(--stripe-purple)"
                              : "var(--bg-secondary)",
                            borderColor: isTerminal
                              ? "var(--backward-orange)"
                              : isLast
                              ? "var(--stripe-purple)"
                              : "var(--forward-blue)",
                            color: isTerminal || isLast ? "#fff" : "var(--forward-blue)",
                          }}
                        >
                          {isTerminal ? (
                            <XCircle size={14} />
                          ) : (
                            i + 1
                          )}
                        </div>
                        {!isLast && (
                          <div
                            className="h-8 w-0.5"
                            style={{
                              backgroundColor: "var(--forward-blue)",
                              opacity: 0.3,
                            }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                            {node.label}
                          </h4>
                          {node.failedAt && isTerminal && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider"
                              style={{
                                backgroundColor: "rgba(232, 115, 74, 0.1)",
                                color: "var(--backward-orange)",
                              }}
                            >
                              Failed at {node.failedAt}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {node.description}
                        </p>
                        {isTerminal && node.code && (
                          <div
                            className="mt-2 rounded-lg px-3 py-2 font-mono text-xs"
                            style={{
                              backgroundColor: "#1e1e2e",
                              color: "#f38ba8",
                            }}
                          >
                            Error: {node.code}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Advance button */}
              {!isComplete && (
                <button
                  onClick={advance}
                  className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: "var(--stripe-purple)",
                    borderColor: "var(--stripe-purple)",
                    color: "#fff",
                  }}
                >
                  Next Step
                  <ChevronRight size={14} />
                </button>
              )}

              {isComplete && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <RotateCcw size={14} />
                  Try Another Scenario
                </button>
              )}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div
          className="rounded-2xl border p-6 lg:col-span-2"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            {terminalNode ? "Decline Summary" : "How to Read This"}
          </h3>
          {terminalNode ? (
            <div className="space-y-4">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                  Error Code
                </div>
                <div
                  className="font-mono text-sm font-medium"
                  style={{ color: "var(--backward-orange)" }}
                >
                  {terminalNode.code}
                </div>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                  Failed At
                </div>
                <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {terminalNode.failedAt}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {terminalNode.description}
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <p>
                Each payment decline has a specific point of failure. By tracing
                the path, you can see exactly which player in the chain rejected
                the transaction.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Stripe Radar</strong>{" "}
                catches fraud before it reaches the bank.{" "}
                <strong style={{ color: "var(--text-primary)" }}>Card Networks</strong>{" "}
                validate card numbers.{" "}
                <strong style={{ color: "var(--text-primary)" }}>Issuing Banks</strong>{" "}
                check funds, CVCs, and expiry.
              </p>
              <p>
                Select a scenario to walk through a real decline step-by-step.
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
