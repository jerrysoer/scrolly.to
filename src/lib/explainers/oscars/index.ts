// ── Academy Branches ──────────────────────────────────────────────────────────

export interface Branch {
  name: string;
  members: number;
  categories: string[];
}

export const BRANCHES: Branch[] = [
  { name: "Actors", members: 1302, categories: ["Best Actor", "Best Actress", "Best Supporting Actor", "Best Supporting Actress"] },
  { name: "Directors", members: 487, categories: ["Best Director"] },
  { name: "Writers", members: 406, categories: ["Best Original Screenplay", "Best Adapted Screenplay"] },
  { name: "Cinematographers", members: 228, categories: ["Best Cinematography"] },
  { name: "Editors", members: 265, categories: ["Best Film Editing"] },
  { name: "Producers", members: 523, categories: ["Best Picture"] },
  { name: "Composers", members: 268, categories: ["Best Original Score", "Best Original Song"] },
  { name: "Costume Designers", members: 193, categories: ["Best Costume Design"] },
  { name: "Documentary", members: 427, categories: ["Best Documentary Feature", "Best Documentary Short"] },
  { name: "Makeup Artists", members: 221, categories: ["Best Makeup and Hairstyling"] },
  { name: "Production Designers", members: 475, categories: ["Best Production Design"] },
  { name: "Short Films & Animation", members: 432, categories: ["Best Animated Feature", "Best Animated Short", "Best Live Action Short"] },
  { name: "Sound", members: 480, categories: ["Best Sound"] },
  { name: "Visual Effects", members: 298, categories: ["Best Visual Effects"] },
  { name: "At-Large Members", members: 842, categories: ["Best Picture"] },
];

export const TOTAL_MEMBERS = 10820;

// ── Guild Awards ──────────────────────────────────────────────────────────────

export interface GuildAward {
  guild: string;
  guildFull: string;
  award: string;
  oscarCorrelation: number;
  winner2026: string | null;
  film2026: string | null;
  announced: boolean;
}

export const GUILD_AWARDS: GuildAward[] = [
  {
    guild: "DGA",
    guildFull: "Directors Guild of America",
    award: "Feature Film Director",
    oscarCorrelation: 84,
    winner2026: "Paul Thomas Anderson",
    film2026: "One Battle After Another",
    announced: true,
  },
  {
    guild: "SAG",
    guildFull: "Screen Actors Guild",
    award: "Outstanding Cast",
    oscarCorrelation: 60,
    winner2026: null,
    film2026: null,
    announced: false,
  },
  {
    guild: "PGA",
    guildFull: "Producers Guild of America",
    award: "Theatrical Motion Picture",
    oscarCorrelation: 55,
    winner2026: null,
    film2026: null,
    announced: false,
  },
  {
    guild: "WGA",
    guildFull: "Writers Guild of America",
    award: "Original Screenplay",
    oscarCorrelation: 62,
    winner2026: null,
    film2026: null,
    announced: false,
  },
  {
    guild: "ASC",
    guildFull: "American Society of Cinematographers",
    award: "Theatrical Feature",
    oscarCorrelation: 73,
    winner2026: null,
    film2026: null,
    announced: false,
  },
  {
    guild: "ACE",
    guildFull: "American Cinema Editors",
    award: "Feature Film (Drama)",
    oscarCorrelation: 65,
    winner2026: null,
    film2026: null,
    announced: false,
  },
];

// ── Most Nominated ────────────────────────────────────────────────────────────

export interface NominatedFilm {
  film: string;
  year: number;
  nominations: number;
  isRecord?: boolean;
}

export const MOST_NOMINATED: NominatedFilm[] = [
  { film: "Sinners", year: 2025, nominations: 16, isRecord: true },
  { film: "All About Eve", year: 1950, nominations: 14 },
  { film: "Titanic", year: 1997, nominations: 14 },
  { film: "La La Land", year: 2016, nominations: 14 },
  { film: "Gone with the Wind", year: 1939, nominations: 13 },
  { film: "Oppenheimer", year: 2023, nominations: 13 },
  { film: "The Shape of Water", year: 2017, nominations: 13 },
  { film: "Ben-Hur", year: 1959, nominations: 12 },
  { film: "The Power of the Dog", year: 2021, nominations: 12 },
  { film: "The Revenant", year: 2015, nominations: 12 },
];

// ── STV Demo ─────────────────────────────────────────────────────────────────

export interface STVRound {
  counts: Record<string, number>;
  eliminated: string;
  total: number;
}

export interface STVResult {
  films: string[];
  rounds: STVRound[];
  winner: string;
}

// Pre-computed 5-film STV demo with 100 total ballots
export const STV_FILMS = [
  "The Outsiders",
  "Midnight Rain",
  "Edge of Never",
  "Last October",
  "The Glass Road",
];

export const STV_DEMO: STVResult = {
  films: STV_FILMS,
  rounds: [
    {
      counts: {
        "The Outsiders": 28,
        "Midnight Rain": 22,
        "Edge of Never": 20,
        "Last October": 18,
        "The Glass Road": 12,
      },
      eliminated: "The Glass Road",
      total: 100,
    },
    {
      counts: {
        "The Outsiders": 32,
        "Midnight Rain": 26,
        "Edge of Never": 23,
        "Last October": 19,
      },
      eliminated: "Last October",
      total: 100,
    },
    {
      counts: {
        "The Outsiders": 38,
        "Midnight Rain": 35,
        "Edge of Never": 27,
      },
      eliminated: "Edge of Never",
      total: 100,
    },
    {
      counts: {
        "Midnight Rain": 52,
        "The Outsiders": 48,
      },
      eliminated: "The Outsiders",
      total: 100,
    },
  ],
  winner: "Midnight Rain",
};

// STV algorithm for the interactive widget
export function runSTV(ballots: string[][]): {
  rounds: Array<{ counts: Record<string, number>; eliminated: string; total: number }>;
  winner: string;
} {
  const allFilms = Array.from(new Set(ballots.flat())).filter(Boolean);
  const rounds: Array<{ counts: Record<string, number>; eliminated: string; total: number }> = [];
  let active = [...allFilms];
  let currentBallots = ballots.map((b) => b.filter((f) => allFilms.includes(f)));

  while (active.length > 1) {
    const counts: Record<string, number> = {};
    active.forEach((f) => (counts[f] = 0));

    for (const ballot of currentBallots) {
      const topChoice = ballot.find((f) => active.includes(f));
      if (topChoice) counts[topChoice]++;
    }

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const threshold = total / 2;

    const winner = active.find((f) => counts[f] > threshold);
    if (winner) {
      return { rounds, winner };
    }

    // Eliminate the lowest vote-getter (with tie-break: alphabetical)
    const loser = active.reduce((a, b) => {
      if (counts[a] !== counts[b]) return counts[a] < counts[b] ? a : b;
      return a < b ? a : b;
    });

    rounds.push({ counts: { ...counts }, eliminated: loser, total });
    active = active.filter((f) => f !== loser);
    currentBallots = currentBallots.map((b) => b.filter((f) => f !== loser));
  }

  return { rounds, winner: active[0] };
}

// Generate random ballots for the widget demo
export function generateRandomBallots(films: string[], count: number = 50): string[][] {
  return Array.from({ length: count }, () => {
    const shuffled = [...films].sort(() => Math.random() - 0.5);
    return shuffled;
  });
}

// ── Nav + Completion data ─────────────────────────────────────────────────────

export const navSections = [
  { id: "hero", label: "Introduction", shortLabel: "Intro" },
  { id: "academy", label: "The Academy", shortLabel: "Academy" },
  { id: "nominations", label: "Nominations", shortLabel: "Noms" },
  { id: "stv", label: "Preferential Ballot", shortLabel: "STV" },
  { id: "plurality", label: "Two Systems", shortLabel: "Voting" },
  { id: "campaign", label: "Campaign Season", shortLabel: "Campaign" },
  { id: "guilds", label: "Guild Predictors", shortLabel: "Guilds" },
  { id: "sinners", label: "Sinners (2026)", shortLabel: "Sinners" },
  { id: "modernizing", label: "Modernizing", shortLabel: "Changes" },
];

export const completionHighlights = [
  { value: "10,820", label: "Academy voters", color: "text-blue-500" },
  { value: "17", label: "voting branches", color: "text-amber-500" },
  { value: "84%", label: "DGA → Oscar correlation", color: "text-blue-500" },
  { value: "Mar 15", label: "98th Oscars ceremony", color: "text-amber-500" },
];
