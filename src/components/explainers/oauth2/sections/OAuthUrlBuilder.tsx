"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const PROVIDERS = {
  GitHub: {
    authUrl: "https://github.com/login/oauth/authorize",
    scopes: ["repo", "read:user", "read:org", "user:email", "gist"],
  },
  Google: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scopes: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
  },
  Spotify: {
    authUrl: "https://accounts.spotify.com/authorize",
    scopes: [
      "user-read-private",
      "playlist-modify-public",
      "streaming",
      "user-library-read",
      "user-top-read",
    ],
  },
} as const;

type ProviderName = keyof typeof PROVIDERS;

function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function OAuthUrlBuilder() {
  const [provider, setProvider] = useState<ProviderName>("GitHub");
  const [clientId, setClientId] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [state, setState] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(new Set());
  const [builtUrl, setBuiltUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const config = PROVIDERS[provider];

  const handleProviderChange = useCallback((name: ProviderName) => {
    setProvider(name);
    setSelectedScopes(new Set());
    setBuiltUrl(null);
  }, []);

  const toggleScope = useCallback((scope: string) => {
    setSelectedScopes((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) next.delete(scope);
      else next.add(scope);
      return next;
    });
    setBuiltUrl(null);
  }, []);

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.set("client_id", clientId || "your_client_id");
    params.set("redirect_uri", redirectUri || "https://yourapp.com/callback");
    params.set("response_type", "code");
    if (state) params.set("state", state);
    if (selectedScopes.size > 0) {
      const separator = provider === "Google" ? " " : ",";
      params.set("scope", Array.from(selectedScopes).join(separator));
    }
    setBuiltUrl(`${config.authUrl}?${params.toString()}`);
  }, [clientId, redirectUri, state, selectedScopes, provider, config.authUrl]);

  const copyUrl = useCallback(async () => {
    if (!builtUrl) return;
    await navigator.clipboard.writeText(builtUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [builtUrl]);

  const renderHighlightedUrl = (url: string) => {
    const [base, queryString] = url.split("?");
    if (!queryString) {
      return <span style={{ color: "rgba(255,255,255,0.95)" }}>{url}</span>;
    }
    const pairs = queryString.split("&");
    return (
      <>
        <span style={{ color: "rgba(255,255,255,0.95)" }}>{base}</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>?</span>
        {pairs.map((pair, i) => {
          const eqIdx = pair.indexOf("=");
          const key = pair.slice(0, eqIdx);
          const value = pair.slice(eqIdx + 1);
          return (
            <span key={i}>
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.35)" }}>&amp;</span>
              )}
              <span className="text-accent-tertiary">{key}</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span>
              <span className="text-accent-success">
                {decodeURIComponent(value)}
              </span>
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #141622, #1a1c2e, #12141e)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h3
            className="text-lg font-semibold font-heading"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            Authorization URL Builder
          </h3>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Select a provider and configure your OAuth parameters
          </p>
        </div>

        {/* Provider tabs */}
        <div className="flex gap-2">
          {(Object.keys(PROVIDERS) as ProviderName[]).map((name) => (
            <button
              key={name}
              onClick={() => handleProviderChange(name)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={
                provider === name
                  ? {
                      background: "rgba(99,135,255,0.15)",
                      color: "rgba(130,165,255,1)",
                      border: "1px solid rgba(99,135,255,0.3)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
              }
            >
              {name}
            </button>
          ))}
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              client_id
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                setBuiltUrl(null);
              }}
              placeholder="your_client_id"
              className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none transition-all duration-200 focus:ring-2"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              redirect_uri
            </label>
            <input
              type="text"
              value={redirectUri}
              onChange={(e) => {
                setRedirectUri(e.target.value);
                setBuiltUrl(null);
              }}
              placeholder="https://yourapp.com/callback"
              className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none transition-all duration-200 focus:ring-2"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              state
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setBuiltUrl(null);
                }}
                placeholder="random_csrf_token"
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
              <button
                onClick={() => {
                  setState(generateState());
                  setBuiltUrl(null);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:brightness-110 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                title="Auto-generate state parameter"
              >
                <RefreshCw size={13} />
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* Scopes */}
        <div>
          <label
            className="block text-xs font-medium mb-2"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            scopes
          </label>
          <div className="flex flex-wrap gap-2">
            {config.scopes.map((scope) => {
              const active = selectedScopes.has(scope);
              return (
                <button
                  key={scope}
                  onClick={() => toggleScope(scope)}
                  className="px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer"
                  style={
                    active
                      ? {
                          background: "rgba(74,222,128,0.12)",
                          color: "rgba(74,222,128,0.9)",
                          border: "1px solid rgba(74,222,128,0.25)",
                        }
                      : {
                          background: "rgba(255,255,255,0.03)",
                          color: "rgba(255,255,255,0.45)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }
                  }
                  aria-pressed={active}
                >
                  {scope}
                </button>
              );
            })}
          </div>
        </div>

        {/* Build button */}
        <button
          onClick={buildUrl}
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:brightness-110 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(99,135,255,0.8), rgba(139,92,246,0.8))",
            color: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(99,135,255,0.3)",
          }}
        >
          Build URL
        </button>

        {/* Output */}
        <div aria-live="polite">
          {builtUrl && (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "rgba(255,95,87,0.7)" }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "rgba(255,189,46,0.7)" }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "rgba(39,201,63,0.7)" }}
                    />
                  </div>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    authorization-url
                  </span>
                </div>
                <button
                  onClick={copyUrl}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all duration-200 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: copied
                      ? "rgba(74,222,128,0.9)"
                      : "rgba(255,255,255,0.5)",
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <code
                  className="text-xs font-mono leading-relaxed break-all whitespace-pre-wrap"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {renderHighlightedUrl(builtUrl)}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
