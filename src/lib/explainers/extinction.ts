export const scaleComparisons = [
  {
    name: "Chicxulub Asteroid",
    height: 6,
    unit: "miles",
    color: "var(--firestorm-hot)",
    description: "The impactor that ended the Cretaceous",
  },
  {
    name: "Mount Everest",
    height: 5.5,
    unit: "miles",
    color: "var(--winter-blue)",
    description: "Tallest mountain on Earth",
  },
  {
    name: "Los Angeles (width)",
    height: 44,
    unit: "miles",
    color: "var(--text-tertiary)",
    description: "For scale reference",
  },
];

export const first24Hours = [
  {
    hour: "Hour 0",
    title: "Impact",
    description:
      "The asteroid strikes the Yucatan Peninsula at 45,000 mph. Everything within 1,500 miles is vaporized instantly. A crater 93 miles wide and 12 miles deep forms in seconds. The energy released equals 10 billion Hiroshima bombs.",
    color: "var(--firestorm-hot)",
    icon: "impact",
  },
  {
    hour: "Hour 1",
    title: "Global Firestorm",
    description:
      "Superheated debris is ejected into the upper atmosphere and rains down across the globe. The sky glows red-hot. Forests on every continent catch fire. Fish 2,000 miles away in North Dakota die within minutes as the shockwave arrives.",
    color: "var(--firestorm)",
    icon: "fire",
  },
  {
    hour: "Hour 24",
    title: "Darkness Begins",
    description:
      "Trillions of tons of ash, soot, and vaporized sulfur rise into the stratosphere. Sunlight begins dimming worldwide. The temperature starts dropping. The two-year winter that will end 165 million years of dominance has begun.",
    color: "var(--winter-blue)",
    icon: "darkness",
  },
];

export const temperatureData = [
  { month: 0, temp: 18, label: "Impact" },
  { month: 1, temp: 14, label: "" },
  { month: 2, temp: 8, label: "" },
  { month: 3, temp: 3, label: "3 months" },
  { month: 4, temp: 0, label: "" },
  { month: 5, temp: -2, label: "" },
  { month: 6, temp: -4, label: "6 months" },
  { month: 7, temp: -5, label: "" },
  { month: 8, temp: -5, label: "" },
  { month: 9, temp: -4, label: "" },
  { month: 10, temp: -3, label: "" },
  { month: 11, temp: -2, label: "" },
  { month: 12, temp: -1, label: "1 year" },
  { month: 13, temp: 0, label: "" },
  { month: 14, temp: 1, label: "" },
  { month: 15, temp: 2, label: "" },
  { month: 16, temp: 3, label: "" },
  { month: 17, temp: 4, label: "" },
  { month: 18, temp: 5, label: "18 months" },
  { month: 19, temp: 7, label: "" },
  { month: 20, temp: 8, label: "" },
  { month: 21, temp: 10, label: "" },
  { month: 22, temp: 11, label: "" },
  { month: 23, temp: 13, label: "" },
  { month: 24, temp: 15, label: "2 years" },
];

export interface Survivor {
  name: string;
  survived: boolean;
  reason: string;
  category: string;
}

export const survivors: Survivor[] = [
  {
    name: "Small Mammals",
    survived: true,
    reason: "Burrowed underground, ate insects and seeds",
    category: "Burrowed",
  },
  {
    name: "Crocodilians",
    survived: true,
    reason: "Semi-aquatic, slow metabolism, could fast for months",
    category: "Aquatic",
  },
  {
    name: "Birds",
    survived: true,
    reason: "Small body size, could eat seeds, ground-dwelling species survived",
    category: "Small",
  },
  {
    name: "Insects",
    survived: true,
    reason: "Tiny size, diverse diet, underground colonies",
    category: "Small",
  },
  {
    name: "Sharks & Fish",
    survived: true,
    reason: "Deep water insulated from surface devastation",
    category: "Aquatic",
  },
  {
    name: "Turtles",
    survived: true,
    reason: "Semi-aquatic, could burrow and fast",
    category: "Aquatic",
  },
  {
    name: "T-Rex & Large Theropods",
    survived: false,
    reason: "Too large, needed too much food daily",
    category: "Large",
  },
  {
    name: "Triceratops & Herbivores",
    survived: false,
    reason: "Dependent on vegetation that died in darkness",
    category: "Large",
  },
  {
    name: "Pterosaurs",
    survived: false,
    reason: "Large flying reptiles, dependent on fish and thermals",
    category: "Large",
  },
  {
    name: "Mosasaurs",
    survived: false,
    reason: "Giant marine reptiles, food chain collapsed",
    category: "Marine",
  },
  {
    name: "Ammonites",
    survived: false,
    reason: "Shelled marine animals, ocean acidification",
    category: "Marine",
  },
  {
    name: "Plesiosaurs",
    survived: false,
    reason: "Large marine reptiles, needed large prey",
    category: "Marine",
  },
];

export const recoveryTimeline = [
  {
    yearsAgo: "66M",
    label: "Mass Extinction",
    description: "75% of all species wiped out. Ecological niches emptied worldwide.",
    color: "var(--firestorm-hot)",
  },
  {
    yearsAgo: "55M",
    label: "Mammal Explosion",
    description: "Mammals rapidly diversify to fill empty niches. First whales, bats, and primates appear.",
    color: "var(--firestorm)",
  },
  {
    yearsAgo: "7M",
    label: "Primates Diverge",
    description: "Human and chimpanzee lineages split. Bipedalism emerges in Africa.",
    color: "var(--winter-blue)",
  },
  {
    yearsAgo: "300K",
    label: "Modern Humans",
    description: "Homo sapiens appears. None of this happens if the asteroid misses.",
    color: "var(--life-green)",
  },
];

export const impactScenarios = {
  land: {
    title: "Hits Land (What Happened)",
    description:
      "The asteroid struck a shallow continental shelf in the Yucatan rich in sulfur and gypsum. The impact vaporized billions of tons of sulfur compounds, which combined with water to form sulfuric acid aerosols. These particles blocked sunlight for nearly two years.",
    consequences: [
      "Massive sulfur release into stratosphere",
      "18-24 month nuclear winter",
      "Global temperature drops 15-20\u00B0C",
      "Total food chain collapse",
      "75% of all species go extinct",
      "Mammals inherit an empty world",
    ],
    severity: "catastrophic",
  },
  ocean: {
    title: "Hits Deep Ocean (30 Min Later)",
    description:
      "If the asteroid had arrived 30 minutes later, Earth's rotation would have placed deep Atlantic ocean in the impact zone. An ocean impact would have produced enormous tsunamis but dramatically less sulfur aerosol.",
    consequences: [
      "Massive tsunamis devastate coastlines",
      "Far less sulfur ejected into atmosphere",
      "Winter lasts months, not years",
      "Most dinosaurs likely survive",
      "Mammals stay small and nocturnal",
      "Humans probably never evolve",
    ],
    severity: "severe",
  },
};

export const faqs = [
  {
    question: "What actually killed the dinosaurs?",
    answer:
      "The asteroid impact itself killed everything within about 1,500 miles. But the real killer was what came next: the impact vaporized sulfur-rich rock, launching trillions of tons of aerosols into the stratosphere. This blocked sunlight for nearly two years, collapsing photosynthesis and the entire food chain from the bottom up.",
  },
  {
    question: "How do we know the Chicxulub crater caused the extinction?",
    answer:
      "A thin layer of iridium (rare on Earth but common in asteroids) marks the exact boundary between Cretaceous and Paleogene rock worldwide. The Chicxulub crater was discovered in 1978 beneath the Yucatan Peninsula and precisely matches the timing. Impact debris has been found on every continent, including Antarctica.",
  },
  {
    question: "Could a similar asteroid hit Earth today?",
    answer:
      "Yes, but we'd likely see it coming. NASA's Planetary Defense Coordination Office tracks near-Earth objects. The DART mission in 2022 successfully demonstrated asteroid deflection technology. No known asteroid poses a significant threat for the next 100+ years.",
  },
  {
    question: "Were all dinosaurs wiped out?",
    answer:
      "No. One group survived: the ancestors of modern birds. All roughly 10,000 living bird species are technically dinosaurs, classified within Dinosauria. A chicken is more closely related to T-Rex than T-Rex is to Stegosaurus, which lived 80 million years earlier.",
  },
  {
    question: "How long did it take for life to fully recover?",
    answer:
      "The nuclear winter lasted about 18-24 months, but full ecosystem recovery took roughly 10 million years. In the aftermath, mammals rapidly diversified into the ecological niches left empty by dinosaurs, eventually giving rise to whales, bats, primates, and eventually humans.",
  },
];
