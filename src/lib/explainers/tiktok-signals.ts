export interface Signal {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-100 default weight
  icon: string; // lucide icon name
  color: string;
  examples: string[];
}

export const signals: Signal[] = [
  {
    id: "watch-time",
    name: "Watch Time",
    description: "How long you watch before scrolling. Watching to completion — or replaying — is the strongest signal TikTok uses. A 3-second skip tells the algorithm more than any like ever could.",
    weight: 95,
    icon: "Clock",
    color: "var(--forward-blue)",
    examples: [
      "Watched full 60s cooking tutorial",
      "Scrolled past dance video at 2s",
      "Paused and rewatched the punchline",
    ],
  },
  {
    id: "replays",
    name: "Replays",
    description: "Rewatching a video is treated as an even stronger signal than a single full watch. It tells TikTok the content was compelling enough to consume twice.",
    weight: 85,
    icon: "RotateCcw",
    color: "var(--accent-purple)",
    examples: [
      "Replayed a recipe 3 times to memorize steps",
      "Looped a funny clip repeatedly",
      "Re-watched a product review before buying",
    ],
  },
  {
    id: "shares",
    name: "Shares",
    description: "Sharing is high-intent. It means you found the content worth sending to someone specific — a signal of genuine value that maps you to interest clusters.",
    weight: 75,
    icon: "Share2",
    color: "var(--correct-green)",
    examples: [
      "Sent workout routine to gym buddy",
      "Shared meme to group chat",
      "DM'd a travel tip to partner",
    ],
  },
  {
    id: "comments",
    name: "Comments",
    description: "Writing a comment requires effort. TikTok weighs this heavily — especially substantive comments vs. emoji spam. Commenting maps you to engaged interest clusters.",
    weight: 65,
    icon: "MessageCircle",
    color: "var(--accent-amber)",
    examples: [
      "Asked a follow-up question on a tutorial",
      "Debated a hot take in comments",
      "Tagged a friend in a relatable clip",
    ],
  },
  {
    id: "likes",
    name: "Likes",
    description: "The classic double-tap. Useful signal but lower weight than watch time because it's low-effort. Many users like reflexively without deep engagement.",
    weight: 45,
    icon: "Heart",
    color: "var(--backward-orange)",
    examples: [
      "Liked a satisfying pottery video",
      "Hearted a motivational quote",
      "Double-tapped a cute pet clip",
    ],
  },
  {
    id: "follows",
    name: "Follows",
    description: "Following a creator signals sustained interest. But TikTok's interest graph means your feed isn't defined by who you follow — it's defined by what you watch.",
    weight: 35,
    icon: "UserPlus",
    color: "var(--text-secondary)",
    examples: [
      "Followed a chef after 5 recipe videos",
      "Subscribed to a finance creator",
      "Hit follow on a travel vlogger",
    ],
  },
];

export function calculateVideoScore(weights: Record<string, number>): number {
  const maxPossible = signals.reduce((sum, s) => sum + s.weight, 0);
  const actual = signals.reduce((sum, s) => sum + (weights[s.id] ?? s.weight), 0);
  return Math.round((actual / maxPossible) * 100);
}
