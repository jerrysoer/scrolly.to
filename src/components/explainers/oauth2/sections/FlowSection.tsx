"use client";

import { User, AppWindow, ShieldCheck, Database } from "lucide-react";
import ScrollySection from "./ScrollySection";

/* Step data */
const stepData = [
  {
    title: 'User clicks "Sign in with GitHub"',
    description:
      "The client redirects the user to the authorization server's authorization endpoint with specific parameters.",
    code: `GET https://github.com/login/oauth/authorize?
  client_id=abc123
  &redirect_uri=https://yourapp.com/callback
  &scope=user:email,read:org
  &state=random_string_xyz
  &response_type=code`,
  },
  {
    title: "Authorization server shows consent screen",
    description:
      'The user sees what permissions are being requested: "App X wants to read your repos." This is the authorization step.',
    code: `\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  Authorize "YourApp"            \u2502
\u2502                                 \u2502
\u2502  YourApp wants permission to:   \u2502
\u2502  \u2022 Read your email address      \u2502
\u2502  \u2022 Read your organization data  \u2502
\u2502                                 \u2502
\u2502  [ Deny ]      [ Authorize ]    \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
  },
  {
    title: "User approves",
    description:
      "The authorization server redirects back to the client with an authorization code and the state parameter for CSRF protection.",
    code: `HTTP/1.1 302 Found
Location: https://yourapp.com/callback?
  code=auth_code_xyz789
  &state=random_string_xyz`,
  },
  {
    title: "Client exchanges code for token",
    description:
      "The client makes a server-side POST request to exchange the authorization code for an access token. This includes the client secret.",
    code: `POST https://github.com/login/oauth/access_token
Content-Type: application/json

{
  "client_id": "abc123",
  "client_secret": "secret_key_456",
  "code": "auth_code_xyz789",
  "redirect_uri": "https://yourapp.com/callback",
  "grant_type": "authorization_code"
}`,
  },
  {
    title: "Authorization server validates and returns tokens",
    description:
      "After validating the code and client credentials, the authorization server responds with access and refresh tokens.",
    code: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "gho_refresh_16C7e42F292c6912E771",
  "scope": "user:email,read:org"
}`,
  },
  {
    title: "Client uses access token to call API",
    description:
      "The client includes the access token in the Authorization header to make authenticated requests to the resource server.",
    code: `GET https://api.github.com/user
Authorization: Bearer gho_16C7e42F292c6912E7710c838347Ae178B4a

Response:
{
  "login": "octocat",
  "id": 1,
  "email": "octocat@github.com",
  ...
}`,
  },
];

/* Actor layout (vertical: top-to-bottom) */
const actors = [
  { id: "user",     label: "User",       cx: 140, cy: 60,  color: "var(--accent-primary)" },
  { id: "client",   label: "Client App",  cx: 140, cy: 180, color: "var(--accent-secondary)" },
  { id: "auth",     label: "Auth Server", cx: 140, cy: 300, color: "var(--accent-tertiary)" },
  { id: "resource", label: "Resource",    cx: 140, cy: 420, color: "var(--accent-success)" },
];

/* Lucide icon components for each actor */
const actorLucideIcons: Record<string, typeof User> = {
  user: User,
  client: AppWindow,
  auth: ShieldCheck,
  resource: Database,
};

/* Connection definitions */
interface Connection {
  id: string;
  from: string;
  to: string;
  path: string;
  color: string;
}

const connections: Connection[] = [
  {
    id: "user-to-client",
    from: "user",
    to: "client",
    path: "M140,85 C140,105 140,115 100,132 C60,150 60,155 140,155",
    color: "var(--accent-primary)",
  },
  {
    id: "client-to-auth",
    from: "client",
    to: "auth",
    path: "M140,205 C140,225 100,240 100,260 C100,280 140,275 140,275",
    color: "var(--accent-secondary)",
  },
  {
    id: "auth-to-client-return",
    from: "auth",
    to: "client",
    path: "M165,278 C200,260 210,240 200,220 C190,200 165,205 165,205",
    color: "var(--accent-tertiary)",
  },
  {
    id: "client-to-auth-exchange",
    from: "client",
    to: "auth",
    path: "M115,205 C80,225 70,250 80,270 C90,290 115,278 115,278",
    color: "var(--accent-secondary)",
  },
  {
    id: "auth-to-client-tokens",
    from: "auth",
    to: "client",
    path: "M175,280 C220,260 230,230 215,210 C200,195 165,205 165,205",
    color: "var(--accent-tertiary)",
  },
  {
    id: "client-to-resource",
    from: "client",
    to: "resource",
    path: "M140,205 C140,260 140,320 140,340 C140,360 140,380 140,395",
    color: "var(--accent-success)",
  },
];

/* Map: step index -> active connection ids */
const stepConnections: string[][] = [
  ["user-to-client", "client-to-auth"],
  [],
  ["auth-to-client-return"],
  ["client-to-auth-exchange"],
  ["auth-to-client-tokens"],
  ["client-to-resource"],
];

/* Map: step index -> active (pulsing) actor ids */
const stepActiveActors: string[][] = [
  ["user", "client", "auth"],
  ["auth"],
  ["auth", "client"],
  ["client", "auth"],
  ["auth", "client"],
  ["client", "resource"],
];

/* Build ScrollStep array */
const steps = stepData.map((s) => ({
  label: s.title,
  content: (
    <>
      <p>{s.description}</p>
      <div className="terminal-bg rounded-lg p-4 mt-4 overflow-x-auto max-w-full">
        <pre className="font-mono text-xs whitespace-pre max-w-full">
          <code>{s.code}</code>
        </pre>
      </div>
    </>
  ),
}));

/* Sticky diagram render prop */
function renderDiagram(activeStep: number) {
  const activeConns = stepConnections[activeStep] ?? [];
  const activeActorIds = stepActiveActors[activeStep] ?? [];

  return (
    <svg
      viewBox="0 0 280 500"
      className="w-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="OAuth 2.0 authorization code flow diagram"
    >
      <defs>
        <marker id="ah-primary" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--accent-primary)" />
        </marker>
        <marker id="ah-secondary" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--accent-secondary)" />
        </marker>
        <marker id="ah-tertiary" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--accent-tertiary)" />
        </marker>
        <marker id="ah-success" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--accent-success)" />
        </marker>
      </defs>

      {/* Connection paths */}
      {connections.map((conn) => {
        const isActive = activeConns.includes(conn.id);
        const markerId = conn.color.includes("primary")
          ? "ah-primary"
          : conn.color.includes("secondary")
            ? "ah-secondary"
            : conn.color.includes("tertiary")
              ? "ah-tertiary"
              : "ah-success";

        return (
          <g key={conn.id}>
            <path
              d={conn.path}
              fill="none"
              stroke={conn.color}
              strokeWidth="2.5"
              className={`arrow-draw${isActive ? " active" : ""}`}
              style={{ opacity: isActive ? 1 : 0.15 }}
              markerEnd={`url(#${markerId})`}
            />
            {isActive && (
              <circle
                r="4"
                fill={conn.color}
                style={{
                  offsetPath: `path("${conn.path}")`,
                  animation: "travel-packet 1.5s ease-in-out infinite 0.4s",
                }}
              />
            )}
          </g>
        );
      })}

      {/* Actor circles + Lucide icons */}
      {actors.map((actor) => {
        const isActive = activeActorIds.includes(actor.id);
        const LucideIcon = actorLucideIcons[actor.id];

        return (
          <g key={actor.id}>
            {isActive && (
              <circle
                cx={actor.cx}
                cy={actor.cy}
                r={42}
                fill="none"
                stroke={actor.color}
                strokeWidth="2"
                style={{ animation: "actor-pulse 2s ease-in-out infinite" }}
              />
            )}

            <circle
              cx={actor.cx}
              cy={actor.cy}
              r={32}
              fill={actor.color}
              opacity={isActive ? 0.15 : 0.08}
            />

            {isActive && (
              <circle
                cx={actor.cx}
                cy={actor.cy}
                r={34}
                fill="none"
                stroke={actor.color}
                strokeWidth="1"
                opacity={0.2}
              />
            )}

            <circle
              cx={actor.cx}
              cy={actor.cy}
              r={28}
              fill="#1a1c2e"
              stroke={actor.color}
              strokeWidth={isActive ? 2.5 : 1.5}
              style={{
                transition: "stroke-width 0.3s ease",
              }}
            />

            <foreignObject
              x={actor.cx - 10}
              y={actor.cy - 10}
              width={20}
              height={20}
              style={{
                opacity: isActive ? 1 : 0.6,
                transition: "opacity 0.3s ease",
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <LucideIcon size={18} color={actor.color} strokeWidth={2} />
              </div>
            </foreignObject>

            <text
              x={actor.cx}
              y={actor.cy + 44}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="11"
              fontFamily="var(--font-body)"
              fontWeight={isActive ? 600 : 400}
              style={{
                opacity: isActive ? 1 : 0.4,
                transition: "opacity 0.3s ease",
              }}
            >
              {actor.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* Component */
export default function FlowSection() {
  return (
    <div className="bg-bg-secondary">
      {/* Heading acts as a curtain */}
      <div className="relative z-20 bg-bg-secondary pt-24 sm:pt-36 pb-16">
        <div className="text-center max-w-5xl mx-auto px-4">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            The Authorization Code Flow
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            The most common OAuth flow, used by web apps. Follow each step.
          </p>
        </div>
      </div>
      <ScrollySection id="flow" steps={steps} stickyDiagram={renderDiagram} />
      <div className="h-24 sm:h-36" />
    </div>
  );
}
