export interface ColdStartVideo {
  id: number;
  category: string;
  title: string;
  creator: string;
  thumbnail: string; // emoji placeholder
  duration: string;
  purpose: string;
  userAction: "watched" | "skipped" | "liked" | "shared";
  watchPercent: number;
  algorithmLearning: string;
}

export const coldStartSequence: ColdStartVideo[] = [
  {
    id: 1,
    category: "Comedy",
    title: "When your roommate eats your leftovers",
    creator: "@skitmaster",
    thumbnail: "\u{1F602}",
    duration: "15s",
    purpose: "Universally popular \u2014 baseline engagement test",
    userAction: "watched",
    watchPercent: 100,
    algorithmLearning: "Completes short comedy content. Humor is a viable interest.",
  },
  {
    id: 2,
    category: "Dance",
    title: "New trending choreography \u{1F525}",
    creator: "@dancequeen",
    thumbnail: "\u{1F483}",
    duration: "30s",
    purpose: "Test music/dance affinity \u2014 TikTok\u2019s core content type",
    userAction: "skipped",
    watchPercent: 12,
    algorithmLearning: "Low interest in dance content. Deprioritize choreography cluster.",
  },
  {
    id: 3,
    category: "Cooking",
    title: "5-minute pasta that\u2019ll change your life",
    creator: "@quickchef",
    thumbnail: "\u{1F35D}",
    duration: "45s",
    purpose: "Test food/cooking interest \u2014 high engagement category",
    userAction: "liked",
    watchPercent: 95,
    algorithmLearning: "Strong food interest. Near-complete watch + like = high confidence signal.",
  },
  {
    id: 4,
    category: "Tech",
    title: "iPhone trick you didn\u2019t know existed",
    creator: "@techbro",
    thumbnail: "\u{1F4F1}",
    duration: "20s",
    purpose: "Test tech/gadget curiosity \u2014 information-seeking behavior",
    userAction: "shared",
    watchPercent: 100,
    algorithmLearning: "Very high tech interest. Share = strongest signal. Boost tech cluster heavily.",
  },
  {
    id: 5,
    category: "Fitness",
    title: "No-equipment morning workout",
    creator: "@fitcoach",
    thumbnail: "\u{1F4AA}",
    duration: "60s",
    purpose: "Test health/fitness interest \u2014 longer content tolerance",
    userAction: "skipped",
    watchPercent: 8,
    algorithmLearning: "No fitness interest. Quick skip on long content = strong negative signal.",
  },
  {
    id: 6,
    category: "Education",
    title: "Why the sky is actually violet",
    creator: "@sciencenerd",
    thumbnail: "\u{1F52C}",
    duration: "35s",
    purpose: "Test educational content appetite \u2014 fact-based engagement",
    userAction: "watched",
    watchPercent: 88,
    algorithmLearning: "Education interest confirmed. Pairs with tech cluster \u2014 information seeker profile emerging.",
  },
  {
    id: 7,
    category: "Cooking",
    title: "The perfect grilled cheese \u2014 trust me",
    creator: "@cheesegod",
    thumbnail: "\u{1F9C0}",
    duration: "25s",
    purpose: "Confirmation probe \u2014 validate food interest from video #3",
    userAction: "liked",
    watchPercent: 100,
    algorithmLearning: "Food interest confirmed with second data point. High-confidence cluster assignment.",
  },
  {
    id: 8,
    category: "Tech",
    title: "AI tools that replace 10 apps",
    creator: "@aidaily",
    thumbnail: "\u{1F916}",
    duration: "40s",
    purpose: "Convergence \u2014 serve predicted interest to validate model",
    userAction: "shared",
    watchPercent: 100,
    algorithmLearning: "Model validated. User profile: tech + food + education + comedy. Feed now personalizing.",
  },
];

export interface ColdStartPhase {
  name: string;
  videoRange: [number, number];
  description: string;
  color: string;
}

export const coldStartPhases: ColdStartPhase[] = [
  {
    name: "Exploration",
    videoRange: [1, 4],
    description: "Diverse probes across popular categories. The algorithm casts a wide net, watching every micro-signal.",
    color: "var(--forward-blue)",
  },
  {
    name: "Hypothesis",
    videoRange: [5, 6],
    description: "Testing adjacent interests to refine the emerging profile. Negative signals are just as valuable as positive ones.",
    color: "var(--accent-amber)",
  },
  {
    name: "Convergence",
    videoRange: [7, 8],
    description: "Confirmation probes validate the model. The feed begins personalizing with high confidence.",
    color: "var(--correct-green)",
  },
];

export const timelineMinutes = [0, 2, 5, 8, 12, 17, 22, 28];
