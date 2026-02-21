import type { NavSection } from "@/components/explainers/shared/SectionNav";

export interface HeroStat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  target: number;
}

export interface TimelineStep {
  year: string;
  title: string;
  description: string;
}

export interface StickyStep {
  id: string;
  content: string;
}

// Section metadata for navigation
export const part1Sections: NavSection[] = [
  { id: "hero", label: "The Paradox", shortLabel: "Paradox" },
  { id: "origin", label: "Joe Coulombe", shortLabel: "Joe" },
  { id: "seven-eleven", label: "7-Eleven Origins", shortLabel: "7-Eleven" },
  { id: "clone-mission", label: "The Clone Mission", shortLabel: "Clone" },
  { id: "buyout", label: "Management Buyout", shortLabel: "Buyout" },
  { id: "malibu", label: "The Malibu Crisis", shortLabel: "Malibu" },
  { id: "epiphany", label: "The Epiphany", shortLabel: "Epiphany" },
  { id: "lightning", label: "Two Bolts", shortLabel: "Lightning" },
  { id: "liquor", label: "Hard Liquor Moat", shortLabel: "Liquor" },
  { id: "first-store", label: "August 1967", shortLabel: "1967" },
];

// S1: Hero stats
export const heroStats: HeroStat[] = [
  { value: "$2,000", label: "Revenue per sq ft", prefix: "$", suffix: "", target: 2000 },
  { value: "580+", label: "Stores nationwide", suffix: "+", target: 580 },
  { value: "#1", label: "Customer satisfaction", prefix: "#", target: 1 },
];

// S2: Joe Coulombe quotes
export const joeCoulombeQuote =
  "I wanted to appeal to the overeducated and underpaid — people who were smart enough to know what they wanted but too broke to shop at the gourmet stores.";

export const joeCoulombeBio = [
  "Joseph Hardin Coulombe was born in San Diego in 1930. His father was a French Canadian who worked as an engineer. Joe grew up middle-class, studied at Stanford, earned an MBA, and graduated into a California that was about to explode with growth.",
  "He was cerebral — the kind of businessman who read academic journals for fun and carried a briefcase full of research wherever he went. He believed retail was an intellectual puzzle, not just a real estate game.",
  "After Stanford, he joined the Rexall Drug Company and was assigned to manage a small chain of convenience stores called Pronto Markets. This is where our story really begins.",
];

// S3: 7-Eleven timeline
export const sevenElevenTimeline: TimelineStep[] = [
  {
    year: "1927",
    title: "Southland Ice",
    description: "Southland Ice Company in Dallas begins selling milk, bread, and eggs alongside ice blocks.",
  },
  {
    year: "1946",
    title: "7-Eleven is born",
    description: "Renamed to 7-Eleven for its 7am–11pm hours — revolutionary in an era when shops closed at 6pm.",
  },
  {
    year: "1952",
    title: "Franchise explosion",
    description: "7-Eleven pioneers the convenience store franchise model. 100+ stores across the South.",
  },
  {
    year: "1958",
    title: "California invasion",
    description: "7-Eleven enters Southern California. Rexall Drug's Pronto Markets face an existential threat.",
  },
  {
    year: "1962",
    title: "398 stores",
    description: "7-Eleven hits 398 stores. Pronto's 6 locations look like a rounding error.",
  },
];

// S4: Clone mission — Pronto Markets locations
export const prontoLocations = [
  { name: "Pasadena", x: 68, y: 38 },
  { name: "Eagle Rock", x: 60, y: 34 },
  { name: "Hollywood", x: 42, y: 42 },
  { name: "Santa Monica", x: 25, y: 55 },
  { name: "Glendale", x: 58, y: 28 },
  { name: "Burbank", x: 52, y: 22 },
];

export const cloneMissionSteps: StickyStep[] = [
  {
    id: "step-1",
    content:
      "In 1958, Rexall Drug Company handed 27-year-old Joe Coulombe a problem: their chain of Pronto Market convenience stores was getting crushed by 7-Eleven.",
  },
  {
    id: "step-2",
    content:
      "Six tiny stores scattered across Los Angeles. Same layout as 7-Eleven. Same products. Same hours. But none of the brand recognition or buying power.",
  },
  {
    id: "step-3",
    content:
      "The original mandate was simple — be a 7-Eleven clone, but run by Rexall. It was a losing proposition. You can't out-franchise the franchise king.",
  },
  {
    id: "step-4",
    content:
      "Joe knew he needed to find a different game entirely. But first, he needed to own the stores. That meant convincing Rexall to sell.",
  },
];

// S5: Buyout data
export const buyoutAmount = 25000;
export const buyoutYear = 1962;
export const buyoutQuote =
  "I scraped together every dollar I had. Twenty-five thousand dollars to buy six convenience stores that were losing to 7-Eleven. My wife thought I was insane.";

// S6: Malibu crisis data
export const malibuSteps: StickyStep[] = [
  {
    id: "malibu-1",
    content:
      "By the early 1960s, Joe owned the Pronto stores outright. But 7-Eleven was still eating his lunch. Same products, bigger scale, lower prices.",
  },
  {
    id: "malibu-2",
    content:
      "He tried everything — longer hours, better locations, more inventory. Nothing worked. The convenience store playbook was 7-Eleven's to write.",
  },
  {
    id: "malibu-3",
    content:
      "Then in 1965, something happened that changed everything. A development in Malibu threatened to destroy the ranch-country character of the coast.",
  },
  {
    id: "malibu-4",
    content:
      "Joe and his wife took a trip to escape the stress of the business. They ended up on the Caribbean island of St. Barts. What he saw there would change American grocery forever.",
  },
];

// S7: Epiphany
export const epiphanyQuote =
  "I was sitting on the beach in St. Barts, watching the tourists. Educated, well-traveled, adventurous. They wanted something different. And suddenly I realized — these were my customers.";

export const epiphanyInsights = [
  "Air travel was democratizing. By 1965, more Americans had been abroad than in all of history combined.",
  "The GI Bill was creating a massive class of college-educated consumers who had tasted wine in France and cheese in Italy.",
  "These people came home to American supermarkets full of Wonder Bread and Velveeta. There was a gap — and nobody was filling it.",
];

// S8: Two bolts of lightning
export const lightningBolt1 = {
  title: "The Overeducated Consumer",
  description:
    "College enrollment was up 700% since WWII. A new class of educated consumers wanted sophisticated food at working-class prices.",
  stat: "700%",
  statLabel: "College enrollment growth since WWII",
};

export const lightningBolt2 = {
  title: "The End of Fair Trade Laws",
  description:
    "In 1966, California repealed Fair Trade pricing laws. For the first time, retailers could undercut manufacturer-set prices. This meant Joe could sell premium goods at discount prices.",
  stat: "1966",
  statLabel: "Fair Trade laws repealed in CA",
};

// S9: Liquor moat
export const liquorInsight =
  "In California, you needed a separate license to sell hard liquor — and licenses were capped. Joe realized his Pronto stores already had these licenses. If he pivoted to a gourmet-wine-and-spirits concept, he'd have a regulatory moat that 7-Eleven could never cross.";

export const vennData = {
  left: { label: "Gourmet Taste", items: ["Wine", "Imported cheese", "Specialty foods"] },
  right: { label: "Discount Prices", items: ["No middlemen", "Bulk buying", "No-frills stores"] },
  overlap: { label: "Trader Joe's", items: ["Educated consumers", "Value + quality", "Liquor license moat"] },
};

// S10: First store
export const firstStoreData = {
  date: "August 1967",
  address: "610 South Arroyo Parkway, Pasadena, CA",
  details: [
    "The first Trader Joe's was a converted Pronto Market — barely 5,000 square feet.",
    "Tiki decor, cedar plank walls, and Hawaiian shirts on every employee. Joe wanted the store to feel like a South Seas trading post.",
    "The name itself was a play on Trader Vic's, the tiki bar chain that was wildly popular with the same demographic Joe was targeting.",
    "On day one, the store stocked an unheard-of selection of California wines at prices 20–40% below the competition.",
  ],
};

export const cliffhangerText =
  "Joe Coulombe had found his white space — but building a cult brand from a single Pasadena storefront would require a playbook that broke every rule in retail.";
