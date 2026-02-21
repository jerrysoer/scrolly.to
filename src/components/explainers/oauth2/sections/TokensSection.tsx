"use client";

import { useState, useEffect, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { ChevronDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts";

export default function TokensSection() {
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isRevoked, setIsRevoked] = useState(false);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);

  useEffect(() => {
    if (isRevoked) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRevoked]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  };

  const handleRevoke = () => {
    setIsRevoked(true);
  };

  const handleReset = () => {
    setIsRevoked(false);
    setTimeRemaining(3600);
  };

  const chartData = useMemo(() => {
    const data = [];
    const totalMinutes = 120;

    for (let i = 0; i <= totalMinutes; i++) {
      const accessToken = i <= 60 ? 1 : 0;
      const refreshToken = i <= 120 ? 0.6 : 0;
      const renewedAccess = i > 62 && i <= 120 ? 1 : 0;

      data.push({
        time: i,
        accessToken,
        refreshToken,
        renewedAccess,
      });
    }
    return data;
  }, []);

  const currentChartPosition = useMemo(
    () => Math.floor((3600 - timeRemaining) / 30),
    [timeRemaining]
  );

  return (
    <SectionWrapper id="tokens" layout="split-right">
      <div className="flex flex-col gap-8">
        {/* Left panel - Token visualization */}
        <div className="flex flex-col gap-6">
          {/* Token Lifecycle Chart */}
          <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-text-primary">Token Lifecycle</h4>
              <span className="text-xs text-text-tertiary font-mono">0 &rarr; 2hr</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="accessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="refreshGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="renewedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-success)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }}
                  tickFormatter={(v) => v === 0 ? '0' : v === 60 ? '1hr' : v === 120 ? '2hr' : ''}
                  ticks={[0, 60, 120]}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                />
                <YAxis hide />
                <Area
                  type="stepAfter"
                  dataKey="accessToken"
                  stroke="var(--accent-primary)"
                  fill="url(#accessGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="refreshToken"
                  stroke="var(--accent-secondary)"
                  fill="url(#refreshGrad)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Area
                  type="stepAfter"
                  dataKey="renewedAccess"
                  stroke="var(--accent-success)"
                  fill="url(#renewedGrad)"
                  strokeWidth={2}
                />
                <ReferenceLine
                  x={currentChartPosition}
                  stroke="var(--text-tertiary)"
                  strokeDasharray="3 3"
                  label={{ value: "now", position: "top", fontSize: 10, fill: "var(--text-tertiary)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-accent-primary inline-block rounded" /> Access
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-accent-secondary inline-block rounded border-dashed" /> Refresh
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-accent-success inline-block rounded" /> Renewed
              </span>
            </div>
          </div>

          {/* Access Token Card */}
          <div
            className={`relative transition-all duration-500 ${
              isRevoked
                ? "opacity-0 scale-95 blur-sm"
                : "opacity-100 scale-100 blur-0"
            }`}
          >
            {isRevoked && (
              <div className="absolute inset-0 bg-accent-danger/20 rounded-lg animate-pulse pointer-events-none z-10" />
            )}
            <div className="bg-bg-card border-2 border-accent-primary rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-accent-primary">
                  Access Token
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      timeRemaining > 600
                        ? "bg-accent-success"
                        : timeRemaining > 0
                        ? "bg-accent-amber"
                        : "bg-accent-danger"
                    } ${timeRemaining > 0 && !isRevoked ? "animate-pulse" : ""}`}
                  />
                  <span className="text-sm text-text-tertiary">
                    {isRevoked ? "Revoked" : "Active"}
                  </span>
                </div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">iss:</span>
                  <span className="text-text-primary">&quot;github.com&quot;</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">sub:</span>
                  <span className="text-text-primary">&quot;user_12345&quot;</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">scope:</span>
                  <span className="text-text-primary">&quot;read:repos read:user&quot;</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">exp:</span>
                  <span
                    className={`${
                      timeRemaining > 600
                        ? "text-accent-success"
                        : timeRemaining > 0
                        ? "text-accent-amber"
                        : "text-accent-danger"
                    }`}
                  >
                    1708300800{" "}
                    <span className="text-xs">({formatTime(timeRemaining)})</span>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">iat:</span>
                  <span className="text-text-primary">1708297200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Refresh Token Card */}
          <div
            className={`transition-all duration-500 ${
              isRevoked
                ? "opacity-0 scale-95 blur-sm"
                : "opacity-100 scale-100 blur-0"
            }`}
          >
            <div className="bg-bg-card border-2 border-accent-secondary rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-accent-secondary">
                  Refresh Token
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-success" />
                  <span className="text-sm text-text-tertiary">Valid</span>
                </div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">token:</span>
                  <span className="text-text-primary break-all">&quot;rt_9k3j2h1g...&quot;</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">exp:</span>
                  <span className="text-text-primary">30 days</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-tertiary">type:</span>
                  <span className="text-text-primary">&quot;rotating&quot;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Control Button */}
          <button
            onClick={isRevoked ? handleReset : handleRevoke}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              isRevoked
                ? "bg-accent-success hover:bg-accent-success/90 text-white"
                : "bg-accent-danger hover:bg-accent-danger/90 text-white"
            }`}
          >
            {isRevoked ? "Reset Tokens" : "Revoke Token"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Right panel - Text explanation */}
        <div>
          <h2 className="text-4xl font-heading font-bold mb-4 text-text-primary">
            Tokens: Your Temporary Pass
          </h2>
          <p className="text-lg text-text-secondary italic mb-6">
            A token is like a hotel key card. It opens specific doors for a
            limited time, and the front desk can deactivate it instantly.
          </p>
        </div>

        {/* Atmospheric photo */}
        <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '200px' }}>
          <img
            src="/explainers/oauth2/generated/tokens-keycard.png"
            alt="Hotel key cards arranged on a surface"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-accent-primary">
              Access Token
            </h3>
            <p className="text-text-secondary">
              Short-lived (minutes to hours). Sent with every API request. Like
              a day pass. If stolen, damage is limited by expiry.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 text-accent-secondary">
              Refresh Token
            </h3>
            <p className="text-text-secondary">
              Long-lived (days to months). Used to get new access tokens without
              bothering the user again. Stored securely server-side.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 text-accent-tertiary">
              Scopes
            </h3>
            <p className="text-text-secondary">
              Define what the token can do.{" "}
              <code className="px-2 py-1 bg-bg-secondary rounded font-mono text-sm">
                read:repos
              </code>{" "}
              vs{" "}
              <code className="px-2 py-1 bg-bg-secondary rounded font-mono text-sm">
                write:repos
              </code>{" "}
              vs{" "}
              <code className="px-2 py-1 bg-bg-secondary rounded font-mono text-sm">
                admin:org
              </code>
              . Principle of least privilege.
            </p>
          </div>
        </div>

        {/* Deep Dive */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setDeepDiveOpen(!deepDiveOpen)}
            className="w-full flex items-center justify-between p-4 bg-bg-secondary hover:bg-bg-hover transition-colors"
          >
            <span className="font-semibold text-text-primary">
              JWT vs opaque tokens
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                deepDiveOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-300 ${
              deepDiveOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 bg-bg-card">
                <p className="text-text-secondary">
                  Access tokens come in two flavors: JWTs (JSON Web Tokens) are
                  self-contained — the resource server can validate them without
                  calling the auth server. Opaque tokens are random strings that
                  require the resource server to call the auth server&apos;s
                  introspection endpoint. JWTs are more common because they
                  reduce network calls, but they can&apos;t be revoked instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
