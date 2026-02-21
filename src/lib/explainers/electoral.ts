// ── Electoral College Explainer Data ──

export interface NavSection {
  id: string;
  label: string;
  shortLabel?: string;
}

export const navSections: NavSection[] = [
  { id: "hero", label: "Overview", shortLabel: "Overview" },
  { id: "big-idea", label: "The Big Idea", shortLabel: "538" },
  { id: "math", label: "The Math", shortLabel: "Math" },
  { id: "winner-take-all", label: "Winner Takes All", shortLabel: "WTA" },
  { id: "swing-states", label: "Swing States", shortLabel: "Swing" },
  { id: "election-night", label: "Election Night", shortLabel: "Night" },
  { id: "debate", label: "The Debate", shortLabel: "Debate" },
  { id: "faq", label: "FAQ", shortLabel: "FAQ" },
];

export const completionHighlights = [
  { value: "538", label: "Total Electors", color: "text-accent-primary" },
  { value: "270", label: "To Win", color: "text-accent-secondary" },
  { value: "7", label: "Swing States", color: "text-accent-tertiary" },
  { value: "5\u00d7", label: "PV/EV Mismatches", color: "text-accent-muted" },
];

export const confettiColors = [
  "var(--accent-primary, #2D8659)",
  "var(--accent-secondary, #D4A026)",
  "var(--accent-tertiary, #8B6914)",
  "var(--accent-success, #4CAF50)",
];
