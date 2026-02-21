"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Check, RefreshCw, Shuffle } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import PKCEAttackSimulator from "./PKCEAttackSimulator";

export default function PKCESection() {
  const [codeVerifier, setCodeVerifier] = useState<string | null>(null);
  const [codeChallenge, setCodeChallenge] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [tampered, setTampered] = useState(false);
  const [tamperedHash, setTamperedHash] = useState<string | null>(null);

  const hashMachineRef = useRef<HTMLDivElement>(null);
  const [hashAnimating, setHashAnimating] = useState(false);

  const [displayedChallenge, setDisplayedChallenge] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const el = hashMachineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHashAnimating(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const inputChars = "dBjftJeZ4CVP".split("");
  const outputChars = "E9Melhoa2Owv".split("");

  const generateRandomString = (length: number) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  };

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  const revealCharByChar = useCallback((text: string) => {
    setIsRevealing(true);
    setDisplayedChallenge("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedChallenge(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsRevealing(false);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    const verifier = generateRandomString(64);
    const challenge = await sha256(verifier);
    setCodeVerifier(verifier);
    setCodeChallenge(challenge);
    setIsVerified(false);
    setShowVerification(false);
    setTampered(false);
    setTamperedHash(null);
    revealCharByChar(challenge);
  };

  const handleTamper = async () => {
    if (!codeVerifier) return;
    const tamperedVerifier =
      (codeVerifier[0] === "a" ? "b" : "a") + codeVerifier.slice(1);
    const newHash = await sha256(tamperedVerifier);
    setTampered(true);
    setTamperedHash(newHash);
  };

  const handleVerify = () => {
    setShowVerification(true);
    setTimeout(() => {
      setIsVerified(true);
    }, 300);
  };

  const handleReset = () => {
    setCodeVerifier(null);
    setCodeChallenge(null);
    setIsVerified(false);
    setShowVerification(false);
    setTampered(false);
    setTamperedHash(null);
    setDisplayedChallenge("");
  };

  return (
    <SectionWrapper id="pkce" layout="centered">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6 text-text-primary">
            PKCE: The Security Upgrade
          </h2>

          <div className="my-8 py-6 border-t border-b border-border">
            <p className="text-xl sm:text-2xl italic text-text-secondary max-w-3xl mx-auto" style={{ fontFamily: "var(--font-heading)" }}>
              &ldquo;PKCE is mandatory in OAuth 2.1. If you&apos;re building a new
              app today, you must use it.&rdquo;
            </p>
          </div>
        </div>

        {/* Problem / Solution — full-bleed dark panel */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #0a0a12, #151520, #0d0d18)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: "rgba(232, 93, 93, 0.06)", border: "1px solid rgba(232, 93, 93, 0.15)" }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#F87171", fontFamily: "var(--font-heading)" }}>
                The Problem
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                Mobile apps and SPAs can&apos;t keep a{" "}
                <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-mono)" }}>
                  client_secret
                </code>{" "}
                safe — it&apos;s in the binary or JS bundle. Without PKCE, an attacker
                who intercepts the authorization code can exchange it for tokens.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ background: "rgba(102, 187, 106, 0.06)", border: "1px solid rgba(102, 187, 106, 0.15)" }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#66BB6A", fontFamily: "var(--font-heading)" }}>
                The Solution
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                PKCE (Proof Key for Code Exchange, pronounced &ldquo;pixie&rdquo;).
                Generate a random{" "}
                <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-mono)" }}>
                  code_verifier
                </code>
                , hash it to create a{" "}
                <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-mono)" }}>
                  code_challenge
                </code>
                , and prove possession later.
              </p>
            </div>
          </div>
        </div>

        {/* Hash Machine Visualization */}
        <div ref={hashMachineRef} className="bg-bg-secondary p-8 rounded-xl">
          <h3 className="text-lg font-semibold text-text-primary text-center mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How the Hash Machine Works
          </h3>
          <div className="relative flex items-center justify-center gap-2 overflow-hidden" style={{ height: "120px" }}>
            <div className="flex flex-col items-end gap-0.5 w-28 sm:w-36">
              <span className="text-xs text-text-tertiary mb-1 font-mono">code_verifier</span>
              <div className="flex flex-wrap justify-end gap-0.5">
                {inputChars.map((char, i) => (
                  <span
                    key={`in-${i}`}
                    className="inline-block w-5 h-6 text-center text-xs font-mono font-bold rounded bg-accent-primary/20 text-accent-primary leading-6"
                    style={{
                      opacity: hashAnimating ? 1 : 0,
                      transform: hashAnimating ? "translateX(0)" : "translateX(-30px)",
                      transition: `opacity 0.4s ease-out ${i * 0.08}s, transform 0.4s ease-out ${i * 0.08}s`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="flex-shrink-0 relative mx-2 sm:mx-4"
              style={{
                opacity: hashAnimating ? 1 : 0,
                transform: hashAnimating ? "scale(1)" : "scale(0.8)",
                transition: "opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s",
              }}
            >
              <div className="bg-bg-card border-2 border-accent-tertiary rounded-lg px-3 py-4 sm:px-5 sm:py-6 text-center shadow-md">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mx-auto mb-1 text-accent-tertiary"
                  style={{
                    animation: hashAnimating ? "hash-gear-spin 3s linear 0.8s infinite" : "none",
                  }}
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <path d="M12 6l-1 4-3 2 3 2 1 4 1-4 3-2-3-2-1-4z" fill="currentColor" />
                </svg>
                <span className="text-xs font-mono font-bold text-accent-tertiary">SHA-256</span>
              </div>
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 text-accent-tertiary">&rarr;</div>
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 text-accent-tertiary">&rarr;</div>
            </div>

            <div className="flex flex-col items-start gap-0.5 w-28 sm:w-36">
              <span className="text-xs text-text-tertiary mb-1 font-mono">code_challenge</span>
              <div className="flex flex-wrap gap-0.5">
                {outputChars.map((char, i) => (
                  <span
                    key={`out-${i}`}
                    className="inline-block w-5 h-6 text-center text-xs font-mono font-bold rounded bg-accent-success/20 text-accent-success leading-6"
                    style={{
                      opacity: hashAnimating ? 1 : 0,
                      transform: hashAnimating ? "translateX(0)" : "translateX(30px)",
                      transition: `opacity 0.4s ease-out ${1.0 + i * 0.08}s, transform 0.4s ease-out ${1.0 + i * 0.08}s`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive PKCE Demo */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #141622, #1a1c2e, #12141e)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.9)" }}
          >
            Live SHA-256 Pipeline
          </h3>

          <div className="space-y-6" aria-live="polite">
            {!codeVerifier ? (
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  className="btn-ripple px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 text-white"
                  style={{
                    background: "var(--accent-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Generate PKCE Pair
                </button>
                <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Generates a real code_verifier and computes its SHA-256 hash
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
                  >
                    Code Verifier <span style={{ color: "rgba(255,255,255,0.25)" }}>(64 random characters)</span>
                  </label>
                  <div
                    className="p-4 rounded-lg font-mono text-sm break-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(91, 159, 232, 0.2)",
                      color: "rgba(91, 159, 232, 0.9)",
                    }}
                  >
                    {codeVerifier}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(155, 127, 212, 0.15)",
                      color: "#9B7FD4",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    SHA-256
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
                    >
                      Code Challenge <span style={{ color: "rgba(255,255,255,0.25)" }}>(base64url-encoded hash)</span>
                    </label>
                    {!tampered && (
                      <button
                        onClick={handleTamper}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                        style={{
                          background: "rgba(248, 113, 113, 0.1)",
                          color: "#F87171",
                          border: "1px solid rgba(248, 113, 113, 0.2)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        <Shuffle className="w-3 h-3" />
                        Tamper 1 char
                      </button>
                    )}
                  </div>
                  <div
                    className="p-4 rounded-lg font-mono text-sm break-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${tampered ? "rgba(248, 113, 113, 0.3)" : "rgba(102, 187, 106, 0.2)"}`,
                      color: tampered ? "rgba(248, 113, 113, 0.9)" : "rgba(102, 187, 106, 0.9)",
                    }}
                  >
                    {isRevealing ? displayedChallenge : codeChallenge}
                    {isRevealing && <span className="animate-pulse">|</span>}
                  </div>

                  {tampered && tamperedHash && (
                    <div className="mt-4 space-y-2">
                      <p
                        className="text-xs font-semibold"
                        style={{ color: "rgba(248, 113, 113, 0.7)", fontFamily: "var(--font-body)" }}
                      >
                        Changing just 1 character completely changes the hash (avalanche effect):
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs flex-shrink-0" style={{ color: "rgba(102, 187, 106, 0.7)", fontFamily: "var(--font-mono)" }}>
                            Original:
                          </span>
                          <code className="text-xs break-all" style={{ color: "rgba(102, 187, 106, 0.6)" }}>
                            {codeChallenge?.substring(0, 20)}...
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs flex-shrink-0" style={{ color: "rgba(248, 113, 113, 0.7)", fontFamily: "var(--font-mono)" }}>
                            Tampered:
                          </span>
                          <code className="text-xs break-all" style={{ color: "rgba(248, 113, 113, 0.6)" }}>
                            {tamperedHash.substring(0, 20)}...
                          </code>
                        </div>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Completely different — this is why hash functions are one-way
                      </p>
                    </div>
                  )}
                </div>

                {!showVerification && !tampered && (
                  <div className="text-center">
                    <button
                      onClick={handleVerify}
                      className="btn-ripple px-8 py-3 rounded-xl font-semibold transition-colors text-white"
                      style={{
                        background: "var(--accent-success)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Verify Code
                    </button>
                  </div>
                )}

                {showVerification && (
                  <div
                    className="p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: isVerified
                        ? "rgba(102, 187, 106, 0.08)"
                        : "rgba(255,255,255,0.03)",
                      border: isVerified
                        ? "1px solid rgba(102, 187, 106, 0.2)"
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {isVerified && (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce"
                          style={{ background: "#66BB6A" }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <h4
                        className="text-xl font-bold"
                        style={{
                          color: isVerified ? "#66BB6A" : "rgba(255,255,255,0.6)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {isVerified ? "Code verified! Token issued." : "Verifying..."}
                      </h4>
                    </div>
                    {isVerified && (
                      <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                        The server hashed your verifier and confirmed it matches
                        the challenge sent earlier. Authentication successful!
                      </p>
                    )}
                  </div>
                )}

                {(isVerified || tampered) && (
                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset Demo
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Attack Simulator */}
        <div>
          <h3
            className="text-2xl font-bold text-center mb-6 text-text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Attack Simulator
          </h3>
          <p
            className="text-center text-sm mb-6"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
          >
            See what happens when an attacker intercepts an authorization code
          </p>
          <PKCEAttackSimulator />
        </div>

        {/* PKCE Flow Diagram */}
        <div className="bg-bg-secondary p-8 rounded-xl">
          <h3
            className="text-2xl font-bold mb-8 text-center text-text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            PKCE Flow Summary
          </h3>

          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {[
              {
                step: 1,
                color: "var(--accent-primary)",
                title: "Client generates verifier -> hashes to challenge",
                detail: "code_verifier (random) -> SHA-256 -> code_challenge",
              },
              {
                step: 2,
                color: "var(--accent-secondary)",
                title: "Challenge sent with authorization request",
                detail: "Client -> code_challenge + code_challenge_method=S256 -> Auth Server",
              },
              {
                step: 3,
                color: "var(--accent-success)",
                title: "Verifier sent with code exchange -> server hashes and compares",
                detail: "hash(verifier) === stored challenge -> Token issued",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-text-primary mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </p>
                  <code
                    className="text-xs px-3 py-1.5 rounded-lg inline-block"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {item.detail}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
