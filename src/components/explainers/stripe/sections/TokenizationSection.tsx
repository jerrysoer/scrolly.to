"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const CARD_NUMBER = "4242 4242 4242 4242";
const TOKEN = "tok_1OpQ1rKZ6xk9N2yh";

export default function TokenizationSection() {
  const [phase, setPhase] = useState<
    "idle" | "encrypting" | "tokenized"
  >("idle");
  const [encryptedChars, setEncryptedChars] = useState<boolean[]>(
    new Array(CARD_NUMBER.length).fill(false)
  );
  const [showOriginal, setShowOriginal] = useState(true);
  const [tokenRevealed, setTokenRevealed] = useState(0);

  const startEncryption = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("encrypting");
    setEncryptedChars(new Array(CARD_NUMBER.length).fill(false));
    setTokenRevealed(0);

    const charIndices = CARD_NUMBER.split("")
      .map((char, i) => (char !== " " ? i : -1))
      .filter((i) => i !== -1);

    // Shuffle indices for random encryption order
    const shuffled = [...charIndices].sort(() => Math.random() - 0.5);

    shuffled.forEach((charIdx, i) => {
      setTimeout(() => {
        setEncryptedChars((prev) => {
          const next = [...prev];
          next[charIdx] = true;
          return next;
        });
      }, i * 80);
    });

    // After all characters encrypted, reveal token
    setTimeout(() => {
      setPhase("tokenized");
      // Animate token reveal
      TOKEN.split("").forEach((_, i) => {
        setTimeout(() => {
          setTokenRevealed(i + 1);
        }, i * 40);
      });
    }, shuffled.length * 80 + 300);
  }, [phase]);

  const reset = () => {
    setPhase("idle");
    setEncryptedChars(new Array(CARD_NUMBER.length).fill(false));
    setTokenRevealed(0);
  };

  const renderCardNumber = () => {
    return CARD_NUMBER.split("").map((char, i) => {
      if (char === " ") {
        return (
          <span key={i} className="inline-block w-3">
            &nbsp;
          </span>
        );
      }
      const isEncrypted = encryptedChars[i];
      return (
        <span
          key={i}
          className="inline-block w-[1.1em] text-center font-mono transition-all duration-200"
          style={{
            color: isEncrypted
              ? "var(--stripe-purple)"
              : "var(--text-primary)",
            transform: isEncrypted ? "rotateY(180deg)" : "rotateY(0deg)",
            opacity: isEncrypted && phase === "encrypting" ? 0.6 : 1,
          }}
        >
          {isEncrypted
            ? String.fromCharCode(33 + Math.floor(Math.random() * 93))
            : char}
        </span>
      );
    });
  };

  // Auto-randomize encrypted character symbols
  const [, setTick] = useState(0);
  useEffect(() => {
    if (phase !== "encrypting") return;
    const interval = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <SectionWrapper id="tokenization">
      <div className="mb-10 sm:mb-14">
        <span className="stripe-section-number">01</span>
        <h2 className="stripe-section-title">The Card Becomes a Token</h2>
        <p className="stripe-section-subtitle">
          Your card number never touches the merchant&apos;s server. Stripe.js encrypts it in the browser and replaces it with a single-use token.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Interactive Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              Card Details
            </h3>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="flex items-center gap-1.5 text-sm"
              style={{ color: "var(--text-tertiary)" }}
            >
              {showOriginal ? <Eye size={14} /> : <EyeOff size={14} />}
              {showOriginal ? "Visible" : "Hidden"}
            </button>
          </div>

          {/* Card visual */}
          <div
            className="relative mb-6 rounded-xl p-6 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              minHeight: "180px",
            }}
          >
            {phase === "encrypting" && (
              <div className="absolute inset-0 animate-shimmer" />
            )}
            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                  {phase === "tokenized" ? "Tokenized" : "Card Number"}
                </span>
                <Lock
                  size={16}
                  className="transition-colors duration-300"
                  style={{
                    color:
                      phase === "tokenized"
                        ? "var(--correct-green)"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              </div>

              <div className="mb-6 text-xl sm:text-2xl tracking-wider text-white">
                {phase === "tokenized" ? (
                  <span className="font-mono text-lg sm:text-xl">
                    {TOKEN.slice(0, tokenRevealed)}
                    <span className="animate-pulse">|</span>
                  </span>
                ) : (
                  <div className="font-mono">{renderCardNumber()}</div>
                )}
              </div>

              <div className="flex justify-between text-white/60">
                <div>
                  <div className="text-[10px] uppercase tracking-wider mb-1">
                    Expiry
                  </div>
                  <div className="font-mono text-sm text-white/80">12/26</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider mb-1">
                    CVC
                  </div>
                  <div className="font-mono text-sm text-white/80">
                    {showOriginal ? "314" : "***"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={phase === "idle" ? startEncryption : reset}
            className="w-full rounded-lg py-3 font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor:
                phase === "idle"
                  ? "var(--stripe-purple)"
                  : "var(--text-tertiary)",
            }}
          >
            {phase === "idle"
              ? "Tokenize Card Number"
              : phase === "encrypting"
              ? "Encrypting..."
              : "Reset Demo"}
          </button>
        </div>

        {/* Explanation panel */}
        <div className="space-y-6">
          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              <Shield size={18} style={{ color: "var(--correct-green)" }} />
              Why Tokenize?
            </h3>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>PCI Compliance.</strong>{" "}
                Any server that handles raw card numbers must comply with PCI
                DSS — a rigorous (and expensive) security standard. Tokenization
                means the merchant&apos;s server never sees the actual card data.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Single-use tokens.</strong>{" "}
                Each <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)" }}>tok_xxx</code> token can only be charged once and
                expires after minutes. Even if intercepted, it&apos;s useless.
              </p>
              <p>
                <strong style={{ color: "var(--text-primary)" }}>Client-side encryption.</strong>{" "}
                Stripe.js uses RSA encryption with Stripe&apos;s public key. The
                card number is encrypted in the browser before the HTTPS request
                is even made — double encryption.
              </p>
            </div>
          </div>

          {/* Token anatomy */}
          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              Token Anatomy
            </h3>
            <div className="font-mono text-sm space-y-2">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-block rounded px-2 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--stripe-purple)" }}
                >
                  tok
                </span>
                <span style={{ color: "var(--text-secondary)" }}>
                  Object type prefix — tells Stripe this is a token
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-block rounded px-2 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--forward-blue)" }}
                >
                  _
                </span>
                <span style={{ color: "var(--text-secondary)" }}>
                  Delimiter separating prefix from identifier
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-block rounded px-2 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--accent-purple)" }}
                >
                  1OpQ1rKZ6xk9N2yh
                </span>
                <span style={{ color: "var(--text-secondary)" }}>
                  Base62-encoded unique identifier — maps to encrypted card data
                  in Stripe&apos;s vault
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
