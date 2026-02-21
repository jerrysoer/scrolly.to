export const apolloTimeline = [
  {
    year: 1969,
    event: "Apollo 11",
    detail: "First humans on the Moon. Armstrong and Aldrin walk on the surface for 2 hours 31 minutes.",
    highlight: true,
  },
  {
    year: 1969,
    event: "Apollo 12",
    detail: "Precision landing near Surveyor 3. Demonstrated pinpoint landing capability.",
    highlight: false,
  },
  {
    year: 1970,
    event: "Apollo 13",
    detail: "\"Houston, we've had a problem.\" Crew survives catastrophic oxygen tank failure.",
    highlight: false,
  },
  {
    year: 1971,
    event: "Apollo 14 & 15",
    detail: "First use of the Lunar Roving Vehicle. Extended surface exploration to 3 days.",
    highlight: false,
  },
  {
    year: 1972,
    event: "Apollo 17",
    detail: "Last humans on the Moon. Gene Cernan's final footprints remain undisturbed.",
    highlight: true,
  },
  {
    year: 2022,
    event: "Artemis I",
    detail: "Uncrewed test flight. Orion spacecraft orbits the Moon and returns safely.",
    highlight: true,
  },
  {
    year: 2025,
    event: "Artemis II",
    detail: "First crewed flight around the Moon since 1972. Four astronauts orbit without landing.",
    highlight: true,
  },
  {
    year: 2027,
    event: "Artemis III",
    detail: "Target: First woman and first person of color on the lunar surface.",
    highlight: true,
  },
] as const;

export const budgetComparison = {
  apollo: {
    label: "Apollo Era (1966)",
    percentage: 4.4,
    dollarsBillions: 5.9,
    adjustedBillions: 50,
    context: "Cold War urgency. National prestige on the line.",
  },
  today: {
    label: "NASA Today (2024)",
    percentage: 0.5,
    dollarsBillions: 25.4,
    adjustedBillions: 25.4,
    context: "Shared with ISS, Mars rovers, Webb telescope, and 50+ other missions.",
  },
} as const;

export const artemisPhases = [
  {
    phase: 1,
    name: "Orbit",
    title: "Artemis I-II: Prove the Hardware",
    description:
      "Test the SLS rocket and Orion capsule. Send astronauts around the Moon without landing. Validate life support, heat shield re-entry at 25,000 mph, and deep-space communications.",
    details: [
      "SLS produces 8.8 million lbs of thrust",
      "Orion heat shield handles 5,000\u00B0F re-entry",
      "22-day mission profile for Artemis II",
    ],
  },
  {
    phase: 2,
    name: "Land",
    title: "Artemis III-IV: Boots on the Ground",
    description:
      "Land astronauts at the lunar south pole using SpaceX Starship as the Human Landing System. Conduct surface experiments, collect ice samples, and deploy instruments.",
    details: [
      "First woman and first person of color on the Moon",
      "Up to 6.5 days on the surface (Apollo max: 3 days)",
      "Starship carries 100+ tons of cargo to the surface",
    ],
  },
  {
    phase: 3,
    name: "Stay",
    title: "Artemis V+: Build a Permanent Base",
    description:
      "Construct the Gateway space station in lunar orbit. Build the Artemis Base Camp on the surface for stays up to 30 days. Use lunar resources (ISRU) to produce water, oxygen, and rocket fuel.",
    details: [
      "Gateway orbits the Moon as a waystation",
      "Pressurized rover for 15-mile surface trips",
      "30-day surface stays with habitat modules",
    ],
  },
] as const;

export const missionStack = [
  {
    name: "SLS",
    role: "Heavy-lift rocket",
    detail: "322 feet tall. 8.8M lbs of thrust. Gets Orion out of Earth orbit.",
    color: "#3b82f6",
  },
  {
    name: "Orion",
    role: "Crew capsule",
    detail: "Carries 4 astronauts. Survives 25,000 mph re-entry from lunar distance.",
    color: "#f59e0b",
  },
  {
    name: "Gateway",
    role: "Lunar space station",
    detail: "Small station in lunar orbit. Acts as a staging point for surface missions.",
    color: "#8b5cf6",
  },
  {
    name: "Starship HLS",
    role: "Lunar lander",
    detail: "SpaceX-built. Taller than the Statue of Liberty. Lands 100+ tons on the surface.",
    color: "#22c55e",
  },
] as const;

export const competitionTimeline = {
  us: [
    { year: 2022, event: "Artemis I uncrewed test" },
    { year: 2025, event: "Artemis II crewed orbit" },
    { year: 2027, event: "Artemis III crewed landing" },
    { year: 2028, event: "Gateway first modules" },
    { year: 2030, event: "Artemis Base Camp" },
  ],
  china: [
    { year: 2020, event: "Chang'e 5 sample return" },
    { year: 2024, event: "Chang'e 6 far-side samples" },
    { year: 2026, event: "Chang'e 7 south pole survey" },
    { year: 2028, event: "Chang'e 8 ISRU test" },
    { year: 2030, event: "Crewed lunar landing" },
  ],
  india: {
    year: 2023,
    event: "Chandrayaan-3 lands at south pole",
    detail: "First country to soft-land near the lunar south pole.",
  },
} as const;

export const faqs = [
  {
    q: "Why did we stop going to the Moon?",
    a: "After Apollo 17 in 1972, NASA's budget was slashed from 4.4% of federal spending to under 1%. The Cold War space race was won, public interest waned, and there was no political will to continue expensive lunar missions.",
  },
  {
    q: "What is the Artemis program?",
    a: "Artemis is NASA's program to return humans to the Moon, land the first woman and first person of color on the lunar surface, and establish a sustainable presence including a lunar Gateway station and surface base camp.",
  },
  {
    q: "Why is the lunar south pole important?",
    a: "The lunar south pole has permanently shadowed craters that contain water ice. This ice can be converted to drinking water, breathable oxygen, and rocket fuel \u2014 potentially reducing mission costs by up to 80%.",
  },
  {
    q: "How does the SLS rocket compare to Saturn V?",
    a: "The Space Launch System produces 8.8 million pounds of thrust at liftoff, about 15% more than the Saturn V. It can carry 27 metric tons to the Moon, compared to Saturn V's 45 metric tons, but uses modern avionics and safety systems.",
  },
  {
    q: "Is China also going to the Moon?",
    a: "Yes. China's CNSA plans to land astronauts on the Moon by 2030. They have already landed robotic missions on the far side (Chang'e 4) and returned samples (Chang'e 5), making them a serious contender in the new space race.",
  },
] as const;

export const navSections = [
  { id: "hero", label: "Introduction" },
  { id: "we-did-it-once", label: "We Did It Once" },
  { id: "why-did-we-stop", label: "Why We Stopped" },
  { id: "whats-different", label: "What's Different" },
  { id: "meet-artemis", label: "Meet Artemis" },
  { id: "why-south-pole", label: "South Pole" },
  { id: "the-rocket", label: "The Rocket" },
  { id: "competition", label: "The Competition" },
  { id: "what-comes-after", label: "What Comes After" },
  { id: "faq", label: "FAQ" },
];

export const completionHighlights = [
  { value: "50", label: "years since last landing" },
  { value: "6", label: "Apollo missions" },
  { value: "30", label: "days on surface" },
  { value: "238,900", label: "miles away" },
];
