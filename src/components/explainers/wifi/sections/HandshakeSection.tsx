"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const handshakeSteps = [
  {
    step: 1,
    from: "phone",
    label: "Probe Request",
    message: "Hey, any networks out there?",
    description: "Your device sends out a probe request, scanning for available networks.",
  },
  {
    step: 2,
    from: "router",
    label: "Beacon Response",
    message: "I'm 'HomeNetwork' on channel 6!",
    description: "The router responds with its name (SSID), channel, and supported speeds.",
  },
  {
    step: 3,
    from: "phone",
    label: "Authentication",
    message: "Here's my password...",
    description: "Your device sends encrypted credentials using the WPA2/WPA3 protocol.",
  },
  {
    step: 4,
    from: "router",
    label: "Key Exchange",
    message: "Verified! Here's your encryption key.",
    description: "The router generates a unique session key for encrypting all your traffic.",
  },
  {
    step: 5,
    from: "both",
    label: "Connected!",
    message: "Secure channel established.",
    description: "Both devices now share an encryption key. All data is encrypted end-to-end.",
  },
];

export default function HandshakeSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <SectionWrapper id="handshake" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 04
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          The Handshake
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Before any data flows, your phone and router perform a secret handshake.
          Five steps to establish trust and create a secure, encrypted connection.
        </p>
      </div>

      {/* Handshake sequence */}
      <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color: "var(--accent-blue)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <p className="mt-2 font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>Your Phone</p>
          </div>
          <div className="flex-1 mx-4 h-px" style={{ backgroundColor: "var(--border)" }} />
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(245, 158, 11, 0.15)" }}>
              <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color: "var(--accent-amber)" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="10" width="20" height="8" rx="2" />
                <line x1="7" y1="10" x2="7" y2="4" />
                <line x1="17" y1="10" x2="17" y2="4" />
                <circle cx="7" cy="3" r="1" />
                <circle cx="17" cy="3" r="1" />
              </svg>
            </div>
            <p className="mt-2 font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>Router</p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {handshakeSteps.map((hs, i) => (
            <button
              key={hs.step}
              onClick={() => setActiveStep(i)}
              className="w-full flex items-start gap-4 rounded-lg p-4 text-left transition-all duration-200"
              style={{
                backgroundColor: activeStep === i ? "rgba(59, 130, 246, 0.1)" : i <= activeStep ? "var(--bg-secondary)" : "var(--bg-secondary)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: activeStep === i ? "rgba(59, 130, 246, 0.3)" : "transparent",
                opacity: i > activeStep ? 0.5 : 1,
              }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                style={{
                  backgroundColor: activeStep === i ? "var(--accent-blue)" : i <= activeStep ? "rgba(59, 130, 246, 0.2)" : "var(--border)",
                  color: activeStep === i ? "white" : i <= activeStep ? "var(--accent-blue)" : "var(--text-tertiary)",
                }}
              >
                {hs.step}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs"
                    style={{
                      color: hs.from === "phone" ? "var(--accent-blue)" : hs.from === "router" ? "var(--accent-amber)" : "var(--accent-green)",
                    }}
                  >
                    {hs.from === "phone" ? "PHONE" : hs.from === "router" ? "ROUTER" : "BOTH"} &rarr;
                  </span>
                  <span className="font-sans text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{hs.label}</span>
                </div>
                {activeStep === i && (
                  <div className="mt-2">
                    <p className="font-mono text-sm" style={{ color: "var(--accent-blue)" }}>&ldquo;{hs.message}&rdquo;</p>
                    <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{hs.description}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
