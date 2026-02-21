import type { SecurityIssue } from "./openclaw-types";

export const securityIssues: SecurityIssue[] = [
  {
    id: "auth-leak",
    severity: "critical",
    title: "Authentication Token Leakage",
    description:
      "Auth tokens could be extracted from the WebSocket gateway, enabling full remote takeover of the agent and all connected services.",
    cve: "CVE-2026-25253",
    cvss: 8.8,
  },
  {
    id: "cmd-injection-1",
    severity: "high",
    title: "Command Injection via Skill Params",
    description:
      "Malformed skill parameters could execute arbitrary shell commands on the host system without sanitization.",
    cve: "CVE-2026-24763",
    cvss: 7.5,
  },
  {
    id: "cmd-injection-2",
    severity: "high",
    title: "OS Command Injection in File Handler",
    description:
      "File path handling allowed injection of OS commands through crafted file names sent via chat.",
    cve: "CVE-2026-25157",
    cvss: 7.2,
  },
  {
    id: "no-auth",
    severity: "critical",
    title: "Auth Disabled by Default",
    description:
      "Early versions shipped with authentication set to 'none' by default. Hundreds of exposed instances were discovered via Shodan with zero protection.",
  },
  {
    id: "malicious-skills",
    severity: "high",
    title: "Malicious Skills on ClawHub",
    description:
      "Community-submitted skills on ClawHub were found to contain exfiltration code, cryptocurrency miners, and backdoors. Hundreds were detected before review processes were strengthened.",
  },
  {
    id: "prompt-injection",
    severity: "medium",
    title: "Prompt Injection via Chat Input",
    description:
      "Incoming messages from other chat participants could contain prompt injection payloads that override the agent's instructions, since LLMs cannot reliably distinguish commands from data.",
  },
];

export const attackSurface = [
  { area: "WebSocket Gateway", risk: 95, description: "Single point of entry with full system access" },
  { area: "Chat Channels", risk: 75, description: "50+ inbound message sources, any could inject" },
  { area: "Skill Marketplace", risk: 80, description: "Community code runs with agent privileges" },
  { area: "LLM Layer", risk: 60, description: "Prompt injection can redirect agent behavior" },
  { area: "File System", risk: 85, description: "Agent has read/write access to host filesystem" },
  { area: "Shell Access", risk: 90, description: "Agent can execute arbitrary OS commands" },
];
