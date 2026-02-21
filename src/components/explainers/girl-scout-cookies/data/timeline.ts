export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: string;
}

export const timeline: TimelineEvent[] = [
  { year: 1917, title: "First sale", description: "Oklahoma troop bakes cookies at home", icon: "🏠" },
  { year: 1933, title: "Philadelphia goes big", description: "First commercial baker partnership", icon: "🏭" },
  { year: 1936, title: "National rollout", description: "All councils start selling cookies", icon: "🇺🇸" },
  { year: 1942, title: "WWII pause", description: "Sugar rationing - sold calendars instead", icon: "📅" },
  { year: 1951, title: "Thin Mints debut", description: "The legend is born", icon: "🌿" },
  { year: 1975, title: "Samoas arrive", description: "Caramel coconut perfection", icon: "🥥" },
  { year: 2000, title: "Digital age", description: "Online ordering begins", icon: "💻" },
  { year: 2026, title: "Today", description: "200M+ boxes sold annually", icon: "📦" }
];
