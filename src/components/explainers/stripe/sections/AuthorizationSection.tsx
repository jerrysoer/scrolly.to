"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  User,
  Store,
  Zap,
  Landmark,
  Network,
  Building2,
} from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { authorizationFlow, flowNodes } from "@/lib/explainers/stripe-flow";

const iconMap = {
  User,
  Store,
  Zap,
  Landmark,
  Network,
  Building2,
} as const;

export default function AuthorizationSection() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setCurrentStep(-1);
    setSelectedNode(null);
  }, [pause]);

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= authorizationFlow.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // Map step to active node
  const getActiveNodeId = (step: number): string => {
    if (step < 0) return "";
    const flow = authorizationFlow[step];
    if (!flow) return "";
    return flow.id.replace("-back", "");
  };

  const activeNodeId = getActiveNodeId(currentStep);
  const currentFlowStep = currentStep >= 0 ? authorizationFlow[currentStep] : null;

  // Get the description for a given node
  const getNodeDescription = (nodeId: string): string => {
    const relevantStep = authorizationFlow.find(
      (s) => s.id === nodeId || s.id === `${nodeId}-back`
    );
    return relevantStep?.detail || "";
  };

  return (
    <SectionWrapper id="authorization">
      <div className="mb-10 sm:mb-14">
        <span className="stripe-section-number">02</span>
        <h2 className="stripe-section-title">The Authorization Dance</h2>
        <p className="stripe-section-subtitle">
          Watch a payment request bounce from Stripe to the issuing bank and back. Each hop takes ~100ms. Click any node to learn what it does.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={isPlaying ? pause : play}
          className="flex h-11 items-center gap-2 rounded-lg border px-5 font-medium text-sm transition-all duration-200 hover:opacity-80 active:scale-[0.97]"
          style={{
            backgroundColor: isPlaying ? "var(--bg-card)" : "var(--stripe-purple)",
            borderColor: isPlaying ? "var(--border)" : "var(--stripe-purple)",
            color: isPlaying ? "var(--text-primary)" : "#fff",
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={reset}
          className="flex h-11 items-center gap-2 rounded-lg border px-5 font-medium text-sm transition-all duration-200 hover:opacity-80 active:scale-[0.97]"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <RotateCcw size={16} />
          Reset
        </button>

        {/* Progress bar */}
        <div className="ml-4 flex-1">
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${
                  currentStep < 0
                    ? 0
                    : ((currentStep + 1) / authorizationFlow.length) * 100
                }%`,
                backgroundColor:
                  currentFlowStep?.direction === "backward"
                    ? "var(--backward-orange)"
                    : "var(--forward-blue)",
              }}
            />
          </div>
        </div>

        {/* Timing */}
        <span className="font-mono text-xs whitespace-nowrap" style={{ color: "var(--text-tertiary)" }}>
          {currentFlowStep?.timing || "Ready"}
        </span>
      </div>

      {/* Flow Diagram */}
      <div
        className="rounded-2xl border p-4 sm:p-8 mb-8"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Nodes row */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-6">
          {flowNodes.map((node, i) => {
            const IconComponent = iconMap[node.icon as keyof typeof iconMap];
            const isActive = activeNodeId === node.id;
            const isPast = authorizationFlow
              .slice(0, currentStep + 1)
              .some(
                (s) =>
                  s.id === node.id ||
                  s.id === `${node.id}-back` ||
                  s.id.startsWith(node.id)
              );
            const isSelected = selectedNode === node.id;

            return (
              <div key={node.id} className="flex flex-1 flex-col items-center">
                {/* Connection line */}
                {i > 0 && (
                  <div
                    className="absolute h-0.5 -z-10"
                    style={{
                      backgroundColor: isPast
                        ? "var(--forward-blue)"
                        : "var(--border)",
                    }}
                  />
                )}
                <button
                  onClick={() =>
                    setSelectedNode(
                      selectedNode === node.id ? null : node.id
                    )
                  }
                  className="relative flex flex-col items-center gap-2 transition-all duration-300"
                  aria-label={`View details for ${node.label}`}
                >
                  <div
                    className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? "var(--stripe-purple)"
                        : isPast
                        ? "var(--bg-secondary)"
                        : "var(--bg-card)",
                      borderColor: isActive
                        ? "var(--stripe-purple)"
                        : isSelected
                        ? "var(--forward-blue)"
                        : isPast
                        ? "var(--forward-blue)"
                        : "var(--border)",
                      transform: isActive ? "scale(1.15)" : "scale(1)",
                      boxShadow: isActive
                        ? "0 0 20px rgba(99, 91, 255, 0.4)"
                        : "none",
                    }}
                  >
                    <IconComponent
                      size={20}
                      style={{
                        color: isActive
                          ? "#fff"
                          : isPast
                          ? "var(--forward-blue)"
                          : "var(--text-tertiary)",
                      }}
                    />
                  </div>
                  <span
                    className="text-xs sm:text-sm font-medium text-center leading-tight max-w-[70px] sm:max-w-none"
                    style={{
                      color: isActive
                        ? "var(--stripe-purple)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {node.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Direction indicator */}
        {currentFlowStep && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="h-0.5 w-8 rounded-full"
              style={{
                backgroundColor:
                  currentFlowStep.direction === "forward"
                    ? "var(--forward-blue)"
                    : "var(--backward-orange)",
              }}
            />
            <span className="font-mono text-xs" style={{
              color: currentFlowStep.direction === "forward"
                ? "var(--forward-blue)"
                : "var(--backward-orange)",
            }}>
              {currentFlowStep.direction === "forward"
                ? "Request \u2192"
                : "\u2190 Response"}
            </span>
            <div
              className="h-0.5 w-8 rounded-full"
              style={{
                backgroundColor:
                  currentFlowStep.direction === "forward"
                    ? "var(--forward-blue)"
                    : "var(--backward-orange)",
              }}
            />
          </div>
        )}
      </div>

      {/* Step detail panel */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current step info */}
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-2 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            {currentFlowStep
              ? `Step ${currentStep + 1}: ${currentFlowStep.label}`
              : "Press Play to start"}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {currentFlowStep
              ? currentFlowStep.detail
              : "Watch the authorization request travel from the customer through every participant in the payment chain and back. Each node performs a critical function in the ~2 second journey."}
          </p>
          {currentFlowStep && (
            <div className="mt-4 flex items-center gap-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-medium"
                style={{
                  backgroundColor:
                    currentFlowStep.direction === "forward"
                      ? "rgba(74, 144, 217, 0.1)"
                      : "rgba(232, 115, 74, 0.1)",
                  color:
                    currentFlowStep.direction === "forward"
                      ? "var(--forward-blue)"
                      : "var(--backward-orange)",
                }}
              >
                {currentFlowStep.timing}
              </span>
              <span
                className="text-xs"
                style={{
                  color:
                    currentFlowStep.direction === "forward"
                      ? "var(--forward-blue)"
                      : "var(--backward-orange)",
                }}
              >
                {currentFlowStep.direction === "forward"
                  ? "Outbound request"
                  : "Return response"}
              </span>
            </div>
          )}
        </div>

        {/* Selected node detail */}
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: selectedNode
              ? "var(--forward-blue)"
              : "var(--border)",
          }}
        >
          <h3 className="mb-2 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            {selectedNode
              ? flowNodes.find((n) => n.id === selectedNode)?.label
              : "Click a node above"}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {selectedNode
              ? getNodeDescription(selectedNode)
              : "Click on any node in the flow diagram to see a detailed explanation of what that participant does during payment authorization."}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
