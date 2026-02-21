"use client";

import { useState, useEffect, useRef } from "react";
import { User, Smartphone, Shield, Server } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

/* Role data */
const roles = [
  {
    id: "owner",
    name: "Resource Owner",
    subtitle: "The Gatekeeper",
    description:
      "The person who owns the data and grants permission. In every OAuth flow, this is you — the one clicking 'Authorize.'",
    icon: User,
    color: "var(--accent-primary)",
    badges: ["End user", "Data owner", "Consent grantor"],
    connections: ["client", "auth"],
  },
  {
    id: "client",
    name: "Client Application",
    subtitle: "The Requester",
    description:
      "The third-party app that wants access to your data. It never sees your password — only a scoped token.",
    icon: Smartphone,
    color: "var(--accent-secondary)",
    badges: ["Web app", "Mobile app", "SPA"],
    connections: ["owner", "auth", "resource"],
  },
  {
    id: "auth",
    name: "Authorization Server",
    subtitle: "The Checkpoint",
    description:
      "Verifies your identity, presents the consent screen, and issues tokens. Google, GitHub, Auth0 — these are auth servers.",
    icon: Shield,
    color: "var(--accent-tertiary)",
    badges: ["Google", "GitHub", "Auth0"],
    connections: ["owner", "client"],
  },
  {
    id: "resource",
    name: "Resource Server",
    subtitle: "The Vault",
    description:
      "Holds the protected data (the API). Validates access tokens on every request. Only speaks to authorized clients.",
    icon: Server,
    color: "var(--accent-success)",
    badges: ["API endpoint", "Data store", "Protected resource"],
    connections: ["client"],
  },
];

/* Positions for the relationship diagram */
const diagramPositions: Record<string, { x: number; y: number }> = {
  owner: { x: 150, y: 50 },
  client: { x: 280, y: 150 },
  auth: { x: 150, y: 250 },
  resource: { x: 20, y: 150 },
};

const roleColorMap: Record<string, string> = {
  owner: "var(--accent-primary)",
  client: "var(--accent-secondary)",
  auth: "var(--accent-tertiary)",
  resource: "var(--accent-success)",
};

export default function CastSection() {
  const [activeRole, setActiveRole] = useState<string | null>(null);
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeConnections = activeRole
    ? roles.find((r) => r.id === activeRole)?.connections ?? []
    : [];

  return (
    <SectionWrapper id="cast" layout="centered">
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            The Cast of Characters
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
          >
            OAuth 2.0 defines four roles. Think of it like a hotel — you&apos;re the
            guest, the app is your concierge, reception is the auth server, and your
            room is the resource server.
          </p>
        </div>

        {/* Full-bleed dark panel with character cards */}
        <div
          className="relative overflow-hidden rounded-2xl p-8 sm:p-12 shadow-2xl cursor-glow-panel"
          style={{
            background: "linear-gradient(160deg, #0a0a12, #151520, #0d0d18)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          {/* Character cards — vertical sequence */}
          <div className="relative z-10 flex flex-col gap-6 mb-12">
            {roles.map((role, i) => {
              const Icon = role.icon;
              const isFromLeft = i % 2 === 0;
              const isActive = activeRole === role.id;

              return (
                <div
                  key={role.id}
                  className="flex items-stretch gap-6"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateX(0)"
                      : `translateX(${isFromLeft ? "-60px" : "60px"})`,
                    transition: `opacity 0.7s ease-out ${i * 0.15}s, transform 0.7s ease-out ${i * 0.15}s`,
                  }}
                >
                  {/* Icon with pulse ring */}
                  <div className="flex-shrink-0 flex items-center">
                    <div
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `color-mix(in srgb, ${role.color} 12%, transparent)`,
                        border: `2px solid color-mix(in srgb, ${role.color} 40%, transparent)`,
                        boxShadow: isActive
                          ? `0 0 30px color-mix(in srgb, ${role.color} 25%, transparent)`
                          : `0 0 12px color-mix(in srgb, ${role.color} 10%, transparent)`,
                      }}
                    >
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full animate-pulse-glow"
                          style={{
                            "--accent-primary": role.color,
                          } as React.CSSProperties}
                        />
                      )}
                      <Icon
                        className="w-8 h-8 sm:w-10 sm:h-10"
                        style={{ color: role.color }}
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div
                    className="flex-1 rounded-xl px-6 py-5 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.02)",
                      border: isActive
                        ? `1px solid color-mix(in srgb, ${role.color} 30%, transparent)`
                        : "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3
                        className="text-xl sm:text-2xl font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {role.name}
                      </h3>
                      <span
                        className="text-sm italic"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: role.color,
                        }}
                      >
                        {role.subtitle}
                      </span>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {role.description}
                    </p>

                    {/* Badge chips */}
                    <div className="flex flex-wrap gap-2">
                      {role.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            fontFamily: "var(--font-mono)",
                            background: `color-mix(in srgb, ${role.color} 10%, transparent)`,
                            color: role.color,
                            border: `1px solid color-mix(in srgb, ${role.color} 15%, transparent)`,
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive relationship diagram */}
          <div className="relative z-10">
            <h4
              className="text-center text-sm font-semibold mb-4 tracking-wider uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.15em",
              }}
            >
              Click a role to see its connections
            </h4>

            <div className="flex justify-center">
              <svg
                viewBox="0 0 300 300"
                className="w-full max-w-sm h-auto"
                role="img"
                aria-label="Interactive OAuth 2.0 role relationship diagram. Click a role to highlight its connections."
              >
                {/* Connection lines — draw when active */}
                {activeRole &&
                  activeConnections.map((targetId) => {
                    const from = diagramPositions[activeRole];
                    const to = diagramPositions[targetId];
                    if (!from || !to) return null;

                    const midX = (from.x + to.x) / 2;
                    const midY = (from.y + to.y) / 2;
                    const dx = to.x - from.x;
                    const dy = to.y - from.y;
                    const perpX = -dy * 0.15;
                    const perpY = dx * 0.15;

                    const path = `M${from.x},${from.y} Q${midX + perpX},${midY + perpY} ${to.x},${to.y}`;

                    return (
                      <g key={`${activeRole}-${targetId}`}>
                        <path
                          d={path}
                          fill="none"
                          stroke={roleColorMap[activeRole]}
                          strokeWidth="2"
                          className="arrow-draw active"
                          markerEnd={`url(#cast-arrow-${activeRole})`}
                        />
                        {/* Traveling packet */}
                        <circle
                          r="4"
                          fill={roleColorMap[activeRole]}
                          style={{
                            offsetPath: `path("${path}")`,
                            animation:
                              "travel-packet 1.8s ease-in-out infinite 0.3s",
                          }}
                        />
                      </g>
                    );
                  })}

                {/* Arrow markers */}
                <defs>
                  {roles.map((role) => (
                    <marker
                      key={`marker-${role.id}`}
                      id={`cast-arrow-${role.id}`}
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill={role.color} />
                    </marker>
                  ))}
                </defs>

                {/* Role nodes — clickable */}
                {roles.map((role) => {
                  const pos = diagramPositions[role.id];
                  const Icon = role.icon;
                  const isActive = activeRole === role.id;
                  const isConnected = activeConnections.includes(role.id);
                  const isHighlighted = isActive || isConnected;

                  return (
                    <g
                      key={role.id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setActiveRole(activeRole === role.id ? null : role.id)
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`${role.name} — click to show connections`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveRole(activeRole === role.id ? null : role.id);
                        }
                      }}
                    >
                      {/* Pulse ring for active */}
                      {isActive && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={38}
                          fill="none"
                          stroke={role.color}
                          strokeWidth="2"
                          style={{
                            animation: "actor-pulse 2s ease-in-out infinite",
                          }}
                        />
                      )}

                      {/* Background glow */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={30}
                        fill={role.color}
                        opacity={isHighlighted ? 0.15 : 0.06}
                        style={{ transition: "opacity 0.3s ease" }}
                      />

                      {/* Main circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={24}
                        fill="#141622"
                        stroke={role.color}
                        strokeWidth={isHighlighted ? 2.5 : 1.5}
                        style={{ transition: "stroke-width 0.3s ease" }}
                      />

                      {/* Icon */}
                      <foreignObject
                        x={pos.x - 10}
                        y={pos.y - 10}
                        width={20}
                        height={20}
                        style={{
                          opacity: isHighlighted ? 1 : 0.5,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Icon size={16} color={role.color} strokeWidth={2} />
                        </div>
                      </foreignObject>

                      {/* Label */}
                      <text
                        x={pos.x}
                        y={pos.y + 40}
                        textAnchor="middle"
                        fill={isHighlighted ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)"}
                        fontSize="10"
                        fontFamily="var(--font-body)"
                        fontWeight={isHighlighted ? 600 : 400}
                        style={{ transition: "fill 0.3s ease" }}
                      >
                        {role.name.split(" ")[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active role description */}
            <div
              className="text-center mt-4 transition-all duration-300"
              style={{
                opacity: activeRole ? 1 : 0,
                transform: activeRole ? "translateY(0)" : "translateY(8px)",
              }}
              aria-live="polite"
            >
              {activeRole && (
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <span style={{ color: roleColorMap[activeRole], fontWeight: 600 }}>
                    {roles.find((r) => r.id === activeRole)?.name}
                  </span>{" "}
                  communicates with{" "}
                  {activeConnections
                    .map((id) => roles.find((r) => r.id === id)?.name)
                    .join(" and ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
