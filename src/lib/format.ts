export function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function buildBrief(story: {
  title: string;
  source: string;
  url: string;
  score: number;
  summary: string;
  key_facts: string[];
  scrolly_angle: string;
}): string {
  const facts = story.key_facts.map((f) => `  - ${f}`).join("\n");
  return [
    `# ${story.title}`,
    `Source: ${story.source} | Scrolly Score: ${story.score}/10`,
    `Link: ${story.url}`,
    "",
    story.summary,
    "",
    "Key Facts:",
    facts,
    "",
    `Scrolly Angle: ${story.scrolly_angle}`,
  ].join("\n");
}
