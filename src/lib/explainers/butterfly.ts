export const sizeComparisons = [
  { label: "Egg", size: 1, unit: "mm", visualScale: 0.05 },
  { label: "Newborn caterpillar", size: 2, unit: "mm", visualScale: 0.1 },
  { label: "Full-grown caterpillar", size: 50, unit: "mm", visualScale: 1 },
  { label: "US penny", size: 19, unit: "mm", visualScale: 0.38 },
  { label: "Human thumb", size: 60, unit: "mm", visualScale: 1.2 },
] as const;

export const chrysalisStages = [
  {
    step: 1,
    title: "Silk Pad",
    description:
      "The caterpillar spins a small silk button on a branch and grips it with its rear legs.",
    duration: "~1 hour",
    analogy: "Like hammering a nail to hang from",
  },
  {
    step: 2,
    title: "The J-Hang",
    description:
      "It hangs upside down in a 'J' shape. Inside, the transformation has already begun.",
    duration: "12-24 hours",
    analogy: "The calm before a total remodel",
  },
  {
    step: 3,
    title: "Final Shed",
    description:
      "The caterpillar's skin splits from the head down, revealing the soft chrysalis underneath.",
    duration: "~5 minutes",
    analogy: "Shedding a costume to reveal who you really are",
  },
  {
    step: 4,
    title: "Hardening",
    description:
      "The chrysalis hardens into a protective shell. It may look like a dead leaf — that's the point.",
    duration: "1-2 hours",
    analogy: "The construction site gets its walls",
  },
] as const;

export const imaginalDiscs = [
  {
    name: "Wing discs",
    count: 4,
    location: "thorax (sides)",
    color: "#2D8659",
    becomes: "Two pairs of wings",
  },
  {
    name: "Eye discs",
    count: 2,
    location: "head",
    color: "#D4A026",
    becomes: "Compound eyes",
  },
  {
    name: "Leg discs",
    count: 6,
    location: "thorax (ventral)",
    color: "#8B6914",
    becomes: "Six jointed legs",
  },
  {
    name: "Antenna discs",
    count: 2,
    location: "head",
    color: "#7B6B8A",
    becomes: "Two antennae",
  },
  {
    name: "Proboscis disc",
    count: 1,
    location: "head (midline)",
    color: "#4CAF50",
    becomes: "Coiled feeding tube",
  },
  {
    name: "Genital disc",
    count: 1,
    location: "abdomen",
    color: "#A08DB0",
    becomes: "Reproductive organs",
  },
] as const;

export const emergenceTimeline = [
  {
    hour: 0,
    event: "Shell cracks",
    detail:
      "The butterfly pushes out, wet and crumpled. Wings are folded and soft.",
  },
  {
    hour: 0.25,
    event: "Pumping begins",
    detail:
      "Hemolymph (insect blood) is pumped through wing veins, slowly expanding them.",
  },
  {
    hour: 1,
    event: "Wings expand",
    detail: "Full wing span reached. Wings are still soft and damp.",
  },
  {
    hour: 2,
    event: "Drying",
    detail:
      "Wings harden as they dry. The butterfly flexes them slowly.",
  },
  {
    hour: 3,
    event: "First flight",
    detail: "Wings are rigid and dry. The butterfly takes its first flight.",
  },
] as const;

export const whyItMattersStats = [
  {
    number: "100x",
    label: "A caterpillar eats until it's 100x its hatching weight",
    source: "University of Arizona",
  },
  {
    number: "~16,000",
    label: "Number of imaginal disc cells that survive the soup",
    source: "Nature Reviews",
  },
  {
    number: "10-14",
    label: "Days the entire transformation takes (most species)",
    unit: "days",
    source: "Smithsonian",
  },
] as const;

export const faqs = [
  {
    q: "What happens inside a chrysalis?",
    a: "The caterpillar releases enzymes that dissolve most of its body into a liquid. Only clusters called imaginal discs survive, and these rebuild into the butterfly's new body parts.",
  },
  {
    q: "What are imaginal discs?",
    a: "Imaginal discs are pre-programmed cell clusters present from the caterpillar's egg stage. Each disc is destined to become a specific body part — wings, eyes, legs, antennae.",
  },
  {
    q: "Is a chrysalis the same as a cocoon?",
    a: "No. A chrysalis is the hardened outer skin of a butterfly pupa. A cocoon is a silk casing spun by moths. Butterflies form chrysalises, moths spin cocoons.",
  },
  {
    q: "Can butterflies remember their caterpillar life?",
    a: "Research at Georgetown University (2008) found that butterflies can retain aversive memories from their caterpillar stage, suggesting some neural pathways survive metamorphosis.",
  },
  {
    q: "How long does metamorphosis take?",
    a: "Most butterflies complete metamorphosis in 10-14 days, though it varies by species and temperature. Monarchs take about 8-13 days.",
  },
] as const;

// ── Navigation sections for SectionNav / MobileNav ──

export const navSections = [
  { id: "hero", label: "Intro" },
  { id: "the-setup", label: "The Setup" },
  { id: "the-signal", label: "The Signal" },
  { id: "chrysalis", label: "Chrysalis" },
  { id: "soup-stage", label: "Soup Stage" },
  { id: "rebuilding", label: "Rebuilding" },
  { id: "emergence", label: "Emergence" },
  { id: "the-payoff", label: "The Payoff" },
  { id: "faq", label: "FAQ" },
] as const;

export const completionHighlights = [
  "4 life stages from egg to adult",
  "100x weight gain before metamorphosis",
  "10-14 days of total transformation",
  "~16,000 imaginal disc cells survive dissolution",
] as const;
