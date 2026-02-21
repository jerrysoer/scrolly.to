"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import OAuthUrlBuilder from "./OAuthUrlBuilder";

/* Provider data */
const providers = [
  {
    id: "github" as const,
    name: "GitHub",
    accentColor: "var(--accent-primary)",
    accentHex: "#5B9FE8",
    scopes: [
      { name: "repo", desc: "Full control of private repositories" },
      { name: "read:user", desc: "Read user profile data" },
      { name: "read:org", desc: "Read organization membership" },
      { name: "user:email", desc: "Access email addresses" },
      { name: "gist", desc: "Create and manage gists" },
    ],
    authUrl: "github.com/login/oauth/authorize",
    notable:
      "Classic authorization code flow. Coarse-grained scopes. Token format: opaque strings. Personal access tokens as alternative for CLI tools.",
    description:
      "GitHub's OAuth implementation is straightforward and developer-friendly. Simple scope names, extensive documentation, and a well-documented REST API make it the go-to for learning OAuth.",
    keyDifferences: [
      "Scopes are coarse-grained (e.g., 'repo' gives full access)",
      "Tokens are opaque strings, not JWTs",
      "Supports GitHub App installation tokens for granular permissions",
    ],
  },
  {
    id: "google" as const,
    name: "Google",
    accentColor: "var(--accent-secondary)",
    accentHex: "#FF8A5C",
    scopes: [
      { name: "openid", desc: "OpenID Connect authentication" },
      { name: "profile", desc: "User's basic profile" },
      { name: "email", desc: "User's email address" },
      { name: "drive.readonly", desc: "Read Google Drive files" },
      { name: "calendar.readonly", desc: "Read calendar events" },
    ],
    authUrl: "accounts.google.com/o/oauth2/v2/auth",
    notable:
      "Requires PKCE for mobile. URL-based scopes for API access. Tight OpenID Connect integration for identity.",
    description:
      "Google's implementation is more complex with URL-based scopes and mandatory PKCE for mobile apps. Deep OIDC integration means 'Sign in with Google' combines identity + authorization in one flow.",
    keyDifferences: [
      "Scopes are full URLs (e.g., googleapis.com/auth/drive.readonly)",
      "PKCE mandatory for mobile and SPA clients",
      "ID tokens (JWTs) included by default with 'openid' scope",
    ],
  },
  {
    id: "spotify" as const,
    name: "Spotify",
    accentColor: "var(--accent-success)",
    accentHex: "#66BB6A",
    scopes: [
      { name: "user-read-private", desc: "Read subscription details" },
      { name: "playlist-modify-public", desc: "Create/edit public playlists" },
      { name: "streaming", desc: "Stream music via Web Playback SDK" },
      { name: "user-library-read", desc: "Access saved tracks & albums" },
      { name: "user-top-read", desc: "Read top artists and tracks" },
    ],
    authUrl: "accounts.spotify.com/authorize",
    notable:
      "Refresh tokens don't expire. Access tokens last 1 hour. Unique streaming scope for Web Playback SDK.",
    description:
      "Spotify's OAuth is optimized for music apps with long-lived refresh tokens and specialized grants for browser-based playback. The 1-hour access token expiration balances security with user experience.",
    keyDifferences: [
      "Refresh tokens never expire (until user revokes)",
      "Access tokens always expire in exactly 1 hour",
      "'streaming' scope required for Web Playback SDK",
    ],
  },
];

export default function WildSection() {
  const [activeProvider, setActiveProvider] = useState(0);
  const [isOidcExpanded, setIsOidcExpanded] = useState(false);
  const tabListRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const provider = providers[activeProvider];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % providers.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + providers.length) % providers.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = providers.length - 1;
    } else {
      return;
    }
    setActiveProvider(nextIndex);
    const tabs = tabListRef.current?.querySelectorAll('[role="tab"]');
    (tabs?.[nextIndex] as HTMLElement)?.focus();
  };

  return (
    <SectionWrapper id="wild" layout="centered">
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            OAuth in the Wild
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
          >
            Every major platform implements OAuth 2.0 with its own personality.
            Here&apos;s how three of the biggest do it — and how to build a real
            authorization URL.
          </p>
        </div>

        {/* Provider tabs */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="OAuth provider examples"
          className="flex gap-1 p-1 rounded-xl mb-8"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          {providers.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={activeProvider === i}
              aria-controls={`panel-${p.id}`}
              id={`tab-${p.id}`}
              tabIndex={activeProvider === i ? 0 : -1}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
              onClick={() => setActiveProvider(i)}
              className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200"
              style={{
                fontFamily: "var(--font-body)",
                background:
                  activeProvider === i
                    ? "var(--bg-card)"
                    : "transparent",
                color:
                  activeProvider === i
                    ? p.accentHex
                    : "var(--text-tertiary)",
                boxShadow:
                  activeProvider === i
                    ? "0 2px 8px rgba(0,0,0,0.08)"
                    : "none",
                borderBottom:
                  activeProvider === i
                    ? `2px solid ${p.accentHex}`
                    : "2px solid transparent",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Provider panel */}
        <div
          id={`panel-${provider.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${provider.id}`}
          className="transition-all duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
            {/* Left — Provider details */}
            <div className="flex flex-col gap-6">
              <div
                className="rounded-xl p-6 border"
                style={{
                  borderColor: `color-mix(in srgb, ${provider.accentColor} 20%, var(--border))`,
                  background: "var(--bg-card)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1.5 h-10 rounded-full"
                    style={{ backgroundColor: provider.accentHex }}
                  />
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                  >
                    {provider.name}
                  </h3>
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
                >
                  {provider.description}
                </p>

                <div className="mb-4">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider mb-1.5 block"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                  >
                    Auth Endpoint
                  </span>
                  <code
                    className="block px-3 py-2 rounded-lg text-sm border"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: "var(--bg-secondary)",
                      borderColor: "var(--border)",
                      color: provider.accentHex,
                    }}
                  >
                    {provider.authUrl}
                  </code>
                </div>

                <p
                  className="text-sm italic leading-relaxed px-4 py-3 rounded-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                    background: `color-mix(in srgb, ${provider.accentColor} 5%, var(--bg-secondary))`,
                    borderLeft: `3px solid ${provider.accentHex}`,
                  }}
                >
                  {provider.notable}
                </p>
              </div>

              <div
                className="rounded-xl p-6 border"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                >
                  Key Differences
                </h4>
                <ul className="space-y-2">
                  {provider.keyDifferences.map((diff, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{
                          background: `color-mix(in srgb, ${provider.accentColor} 15%, transparent)`,
                          color: provider.accentHex,
                        }}
                      >
                        {i + 1}
                      </span>
                      {diff}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Scopes */}
            <div className="flex flex-col gap-6">
              <div
                className="rounded-xl p-6 border"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                >
                  Available Scopes
                </h4>
                <div className="flex flex-col gap-2.5">
                  {provider.scopes.map((scope) => (
                    <div
                      key={scope.name}
                      className="group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                      style={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <code
                        className="text-xs font-semibold"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: provider.accentHex,
                        }}
                      >
                        {scope.name}
                      </code>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        {scope.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="px-5 py-4 rounded-xl border-l-4"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-secondary)",
                  borderColor: "var(--accent-primary)",
                  background: "color-mix(in srgb, var(--accent-primary) 4%, var(--bg-card))",
                }}
              >
                <p className="text-sm leading-relaxed">
                  Despite surface differences, they all speak the same protocol.
                  An app that works with GitHub&apos;s OAuth can work with
                  Google&apos;s by changing a few URLs and scope strings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OAuth URL Builder */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              Build Your Own Authorization URL
            </h3>
            <p
              className="text-sm mt-2"
              style={{ fontFamily: "var(--font-body)", color: "var(--text-tertiary)" }}
            >
              See how the parameters come together
            </p>
          </div>
          <OAuthUrlBuilder />
        </div>

        {/* OIDC expandable */}
        <div className="mt-10">
          <details
            className="group rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            open={isOidcExpanded}
            onToggle={(e) =>
              setIsOidcExpanded((e.target as HTMLDetailsElement).open)
            }
          >
            <summary
              className="cursor-pointer select-none px-6 py-4 text-lg font-semibold list-none flex items-center justify-between hover:bg-bg-secondary/50 transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--text-primary)",
              }}
            >
              What about OpenID Connect?
              <ChevronDown
                className="ml-2 transition-transform duration-200 group-open:rotate-180"
                style={{ color: "var(--text-tertiary)" }}
                size={20}
              />
            </summary>
            <div
              className="px-6 pb-5 leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              <p className="mb-4">
                OAuth 2.0 handles <strong>authorization</strong> — what you can
                access. OpenID Connect (OIDC) is a thin identity layer on top
                that handles <strong>authentication</strong> — who you are.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h5
                    className="text-sm font-bold mb-2"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    OAuth 2.0
                  </h5>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Returns an <code className="text-xs">access_token</code>{" "}
                    for API access. No user identity info.
                  </p>
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h5
                    className="text-sm font-bold mb-2"
                    style={{ color: "var(--accent-success)" }}
                  >
                    OIDC (OAuth 2.0 + Identity)
                  </h5>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Also returns an <code className="text-xs">id_token</code>{" "}
                    (JWT with name, email, picture).
                  </p>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </SectionWrapper>
  );
}
