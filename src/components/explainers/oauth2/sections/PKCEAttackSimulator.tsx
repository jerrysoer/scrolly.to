"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, ShieldCheck, ShieldX, Lock, X, Check } from "lucide-react";

type Phase = "idle" | "traveling" | "intercepted" | "result";

export default function PKCEAttackSimulator() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      clearTimeouts();
      return;
    }

    if (phase === "result") {
      setPhase("idle");
    }

    setIsPlaying(true);
    setPhase("traveling");

    addTimeout(() => {
      setPhase("intercepted");
    }, 1400);

    addTimeout(() => {
      setPhase("result");
      setIsPlaying(false);
    }, 2800);
  }, [isPlaying, phase, clearTimeouts, addTimeout]);

  const handleReset = useCallback(() => {
    clearTimeouts();
    setPhase("idle");
    setIsPlaying(false);
  }, [clearTimeouts]);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #141622, #1a1c2e)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Title */}
      <h3
        className="text-xl sm:text-2xl font-heading font-bold text-center mb-6"
        style={{ color: "rgba(255,255,255,0.92)" }}
      >
        PKCE Attack Simulator
      </h3>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Without PKCE */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            className="px-4 py-2.5 text-center font-semibold text-sm tracking-wide"
            style={{ background: "rgba(232,93,93,0.15)", color: "#f87171" }}
          >
            <ShieldX className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />
            Without PKCE
          </div>
          <div className="p-4" style={{ background: "rgba(0,0,0,0.2)" }}>
            <svg
              viewBox="0 0 200 220"
              className="w-full"
              style={{ maxHeight: 220 }}
              aria-label="Animation showing an attacker intercepting an authorization code without PKCE protection"
            >
              <rect x="55" y="8" width="90" height="32" rx="6" fill="rgba(74,144,217,0.15)" stroke="rgba(74,144,217,0.5)" strokeWidth="1.5" />
              <text x="100" y="29" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.8)">Client App</text>

              <rect x="55" y="94" width="90" height="32" rx="6" fill="rgba(232,93,93,0.15)" stroke="rgba(232,93,93,0.5)" strokeWidth="1.5" />
              <text x="100" y="115" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="#f87171">Attacker</text>

              <rect x="55" y="180" width="90" height="32" rx="6" fill="rgba(124,92,191,0.15)" stroke="rgba(124,92,191,0.5)" strokeWidth="1.5" />
              <text x="100" y="201" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.8)">Auth Server</text>

              <line x1="100" y1="180" x2="100" y2="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4,4" />

              {(phase === "traveling" || phase === "intercepted" || phase === "result") && (
                <circle
                  cx="100"
                  cy={phase === "traveling" ? 175 : 110}
                  r="6"
                  fill={phase === "traveling" ? "#7C5CBF" : "#f87171"}
                >
                  {phase === "traveling" && (
                    <animate attributeName="cy" from="175" to="110" dur="1.4s" fill="freeze" />
                  )}
                </circle>
              )}

              {(phase === "intercepted" || phase === "result") && (
                <circle
                  cx="100"
                  cy="110"
                  r="22"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="2"
                  opacity="0"
                  style={{ animation: "intercept-flash 0.8s ease-out forwards" }}
                />
              )}

              {phase === "result" && (
                <g style={{ animation: "attack-blocked 0.5s ease-out forwards" }}>
                  <circle cx="100" cy="60" r="14" fill="rgba(232,93,93,0.2)" stroke="#f87171" strokeWidth="1.5" />
                  <line x1="93" y1="53" x2="107" y2="67" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="107" y1="53" x2="93" y2="67" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}
            </svg>

            <div className="h-6 mt-2 text-center">
              {phase === "result" && (
                <span
                  className="text-xs font-semibold inline-flex items-center gap-1"
                  style={{ color: "#f87171", animation: "attack-blocked 0.4s ease-out forwards" }}
                >
                  <X className="w-3.5 h-3.5" />
                  Tokens stolen!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* With PKCE */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            className="px-4 py-2.5 text-center font-semibold text-sm tracking-wide"
            style={{ background: "rgba(76,175,80,0.15)", color: "#66bb6a" }}
          >
            <ShieldCheck className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />
            With PKCE
          </div>
          <div className="p-4" style={{ background: "rgba(0,0,0,0.2)" }}>
            <svg
              viewBox="0 0 200 220"
              className="w-full"
              style={{ maxHeight: 220 }}
              aria-label="Animation showing PKCE blocking an attacker from using an intercepted authorization code"
            >
              <rect x="55" y="8" width="90" height="32" rx="6" fill="rgba(74,144,217,0.15)" stroke="rgba(74,144,217,0.5)" strokeWidth="1.5" />
              <text x="100" y="29" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.8)">Client App</text>

              <rect x="55" y="94" width="90" height="32" rx="6" fill="rgba(232,93,93,0.15)" stroke="rgba(232,93,93,0.5)" strokeWidth="1.5" />
              <text x="100" y="115" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="#f87171">Attacker</text>

              <rect x="55" y="180" width="90" height="32" rx="6" fill="rgba(124,92,191,0.15)" stroke="rgba(124,92,191,0.5)" strokeWidth="1.5" />
              <text x="100" y="201" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.8)">Auth Server</text>

              <foreignObject x="145" y="185" width="16" height="16">
                <Lock width={14} height={14} stroke="#66bb6a" strokeWidth={1.5} />
              </foreignObject>

              <line x1="100" y1="180" x2="100" y2="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4,4" />

              {(phase === "traveling" || phase === "intercepted" || phase === "result") && (
                <circle
                  cx="100"
                  cy={phase === "traveling" ? 175 : 110}
                  r="6"
                  fill="#7C5CBF"
                >
                  {phase === "traveling" && (
                    <animate attributeName="cy" from="175" to="110" dur="1.4s" fill="freeze" />
                  )}
                </circle>
              )}

              {(phase === "intercepted" || phase === "result") && (
                <circle
                  cx="100"
                  cy="110"
                  r="22"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="2"
                  opacity="0"
                  style={{ animation: "intercept-flash 0.8s ease-out forwards" }}
                />
              )}

              {phase === "result" && (
                <g style={{ animation: "attack-blocked 0.5s ease-out forwards" }}>
                  <circle cx="100" cy="165" r="14" fill="rgba(76,175,80,0.2)" stroke="#66bb6a" strokeWidth="1.5" />
                  <line x1="92" y1="165" x2="98" y2="171" stroke="#66bb6a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="98" y1="171" x2="108" y2="159" stroke="#66bb6a" strokeWidth="2.5" strokeLinecap="round" />

                  <text x="155" y="114" fontSize="9" fill="#f87171" fontFamily="var(--font-mono)" opacity="0.8">
                    Rejected
                  </text>
                  <line x1="145" y1="110" x2="152" y2="110" stroke="#f87171" strokeWidth="1" opacity="0.5" />
                </g>
              )}
            </svg>

            <div className="h-6 mt-2 text-center">
              {phase === "result" && (
                <span
                  className="text-xs font-semibold inline-flex items-center gap-1"
                  style={{ color: "#66bb6a", animation: "attack-blocked 0.4s ease-out forwards" }}
                >
                  <Check className="w-3.5 h-3.5" />
                  Attack blocked!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility live region */}
      <div aria-live="polite" className="sr-only">
        {phase === "result" && "Animation complete. Without PKCE: tokens stolen. With PKCE: attack blocked."}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePlay}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
          style={{
            background: isPlaying
              ? "rgba(255,255,255,0.1)"
              : "rgba(74,144,217,0.2)",
            color: isPlaying ? "rgba(255,255,255,0.7)" : "#5B9FE8",
            border: `1px solid ${isPlaying ? "rgba(255,255,255,0.1)" : "rgba(74,144,217,0.3)"}`,
          }}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {phase === "result" ? "Replay" : "Play"}
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          aria-label="Reset animation"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
