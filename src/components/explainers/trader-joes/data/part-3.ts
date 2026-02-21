import type { NavSection } from "@/components/explainers/shared/SectionNav";
import type { HeroStat, StickyStep } from "./part-1";

// Re-export shared types
export type { HeroStat, StickyStep };

// Section metadata for navigation
export const part3Sections: NavSection[] = [
  { id: "hero-3", label: "The Cult Machine", shortLabel: "Cult" },
  { id: "treasure-hunt", label: "The Treasure Hunt", shortLabel: "Hunt" },
  { id: "two-buck-chuck", label: "Two Buck Chuck", shortLabel: "Chuck" },
  { id: "anti-grocer", label: "The Anti-Grocer", shortLabel: "Anti" },
  { id: "fan-economy", label: "The Fan Economy", shortLabel: "Fans" },
  { id: "reckoning", label: "The Reckoning", shortLabel: "Reckoning" },
  { id: "joes-farewell", label: "Joe's Farewell", shortLabel: "Farewell" },
  { id: "machine-today", label: "The Machine Today", shortLabel: "Today" },
];

// S1: Hero — The Cult Machine
export const hero3Stats: HeroStat[] = [
  { value: "3", label: "CEOs in 35 years", target: 3 },
  { value: "631", label: "Stores today", target: 631 },
  { value: "$2,200", label: "Revenue per sqft", prefix: "$", suffix: "", target: 2200 },
];

export const successionNarrative = [
  "When Joe Coulombe walked away in 1988, he handed the keys to John Shields — a quiet operator who had spent a decade learning Joe's playbook from the inside. Shields didn't reinvent. He scaled.",
  "Under Shields, the chain grew from 27 stores to 158, expanding from California to Arizona, Oregon, and the Pacific Northwest. No fanfare. No press tours. Just methodical, disciplined growth.",
  "Dan Bane took over in 2001 and tripled the footprint to 543 stores, pushing east past the Mississippi for the first time. Bryan Palbaum succeeded him in 2023. Three CEOs in 35 years — all internal promotions, zero celebrity.",
];

// S2: The Treasure Hunt
export const treasureHuntSteps: StickyStep[] = [
  {
    id: "hunt-1",
    content:
      "4,000 SKUs vs 40,000. The discipline of less isn't a limitation — it's the entire strategy. Every product on the shelf has survived a gauntlet that most grocers can't imagine.",
  },
  {
    id: "hunt-2",
    content:
      "Products rotate without notice, creating a perpetual FOMO loop. Your favorite snack might vanish next Tuesday. This isn't poor inventory management — it's engineered scarcity.",
  },
  {
    id: "hunt-3",
    content:
      "Seasonal products create annual mania. Pumpkin Joe-Joe's in October, Everything But The Bagel Seasoning year-round (after fans rioted when it was briefly seasonal), Candy Cane Joe-Joe's in December.",
  },
  {
    id: "hunt-4",
    content:
      "The secret tasting panel: anonymous crew members convene in a sterile room. 70% must vote yes for a product to make the shelf. Even candles get burned. Even hand soap gets lathered. It's an ultra-Darwinian exercise.",
  },
  {
    id: "hunt-5",
    content:
      "\"One in, one out\" at industrial scale. When a new product enters, an underperformer exits. The result: customers buy immediately because their favorite item might vanish next week. Scarcity as strategy.",
  },
];

export const tastingRoomInsight = {
  title: "The Tasting Room",
  description:
    "An ultra-Darwinian exercise in a sterile room. Anonymous crew members taste, test, and vote on every single product. 70% approval or it's dead. No executives in the room. No brand loyalty. Just palates.",
};

// S2: Product funnel stages for SVG
export const funnelStages = [
  { label: "10,000+ candidates", width: 180 },
  { label: "4,000 survive tasting", width: 140 },
  { label: "2,000 pass margin test", width: 100 },
  { label: "800 fit the shelf", width: 70 },
  { label: "~200 new products/year", width: 45 },
];

// S3: Two Buck Chuck
export const twoBuckChuckData = {
  debutPrice: 1.99,
  bottlesSold: "1B+",
  brandPurchasePrice: 27000,
  debutYear: 2002,
  doubleGoldYear: 2007,
  competitorPrice: 67,
};

export const twoBuckChuckNarrative = [
  "In 1995, Fred Franzia — nephew of Ernest Gallo and the wine industry's most notorious provocateur — bought the Charles Shaw brand name for $27,000 at a bankruptcy auction.",
  "Seven years later, he struck a deal with Trader Joe's to sell bottles at $1.99. Customers filled SUVs with cases. Stores in LA sold a million bottles in the first three months.",
  "In 2007, a bottle of Two Buck Chuck won double gold at the California State Fair wine competition — beating a $67 Napa Valley reserve. The wine establishment was apoplectic.",
];

export const twoBuckChuckQuote =
  "The real Charles Shaw finds Two Buck Chuck embarrassing and demeaning — and has never seen a penny.";

// S4: The Anti-Grocer
export const antiGrocerRefusals = [
  { item: "No e-commerce", icon: "globe" },
  { item: "No self-checkout", icon: "scan" },
  { item: "No loyalty cards", icon: "credit-card" },
  { item: "No national ads", icon: "tv" },
  { item: "No coupons", icon: "scissors" },
  { item: "No delivery", icon: "truck" },
];

export const radarChartData = [
  { axis: "Rev/sqft", tj: 95, walmart: 22, wholeFoods: 55 },
  { axis: "Cust Satisfaction", tj: 86, walmart: 50, wholeFoods: 72 },
  { axis: "Employee Retention", tj: 94, walmart: 35, wholeFoods: 60 },
  { axis: "Low Ad Spend", tj: 100, walmart: 15, wholeFoods: 40 },
  { axis: "Curated SKUs", tj: 90, walmart: 5, wholeFoods: 30 },
];

export const antiGrocerInsight = {
  title: "Invest in People, Not Technology",
  description:
    "\"We're not going to put self-checkout in our stores. We like talking to our customers.\" — Trader Joe's official policy. Every absence is intentional: no loyalty cards means no data brokering, no coupons means no price games, no delivery means you have to walk the aisles.",
};

export const antiGrocerPunchline = {
  tjRevenuePerSqft: "$2,200",
  walmartRevenuePerSqft: "$500",
};

// S5: The Fan Economy
export const fanStats = [
  { value: "1.5M", label: "Followers (@TraderJoesList)", color: "var(--accent-gold)" },
  { value: "1.2B", label: "TikTok impressions", color: "var(--accent-red)" },
  { value: "86/100", label: "ACSI score (#1 grocer)", color: "var(--accent-navy)" },
  { value: "$0", label: "Advertising spend", color: "var(--accent-green)" },
];

export const fanMilestones = [
  { year: "2008", event: "@TraderJoesList launched — became the brand's unofficial marketing department" },
  { year: "2018", event: "Inside Trader Joe's podcast launched — a rare crack in the secrecy" },
  { year: "2020", event: "TJ's named #1 grocery in ACSI for the fifth consecutive year" },
  { year: "2023", event: "TikTok explosion: \"TJ's haul\" videos hit 1.2 billion impressions" },
];

export const bellCodes = {
  one: "More cashiers needed",
  two: "Customer assistance",
  three: "Manager to the floor",
};

// S6: The Reckoning
export const reckoningSteps: StickyStep[] = [
  {
    id: "reckoning-1",
    content:
      "July 2020: A petition called on Trader Joe's to remove ethnic branding — \"Trader José's,\" \"Trader Ming's,\" \"Arabian Joe's.\" TJ's initially agreed, then reversed course a week later, calling the names \"an expression of fun.\"",
  },
  {
    id: "reckoning-2",
    content:
      "COVID hazard pay: TJ's added $2–$4/hour in early 2020, then quietly cut it while simultaneously offering new hires higher starting wages. Crew members who had risked their health felt betrayed.",
  },
  {
    id: "reckoning-3",
    content:
      "July 2022: The Hadley, Massachusetts store voted to unionize — the first in company history. Trader Joe's United was born: independent, unaffiliated with any national union. Minneapolis and Louisville followed.",
  },
  {
    id: "reckoning-4",
    content:
      "The Pirate Joe's saga: A Vancouver man named Mike Hallatt ran a store reselling TJ's products bought on cross-border van runs — $4,000 per week in sales. TJ's sued. The case was dismissed, appealed, and became a cult legal drama.",
  },
];

export const reckoningQuote =
  "We disagree that any of these labels are racist. They are an expression of fun.";

// S6: Tension timeline data for SVG
export const tensionTimelineData = [
  { year: "2020", label: "Naming petition", severity: 60 },
  { year: "2020", label: "COVID hazard pay cut", severity: 75 },
  { year: "2022", label: "First union vote", severity: 90 },
  { year: "2023", label: "3 stores unionized", severity: 85 },
];

// S7: Joe's Farewell
export const joesFarewellData = {
  date: "February 28, 2020",
  location: "Pasadena, California",
  age: 89,
  memoirTitle: "Becoming Trader Joe",
  memoirYear: 2021,
};

export const joesFarewellNarrative = [
  "Joe Coulombe died on February 28, 2020 — just weeks before COVID shutdowns turned his grocery stores into essential infrastructure. He never saw the lines stretching around the block.",
  "In his later years, Joe became a patron of the LA Opera, an amateur watercolor painter, and a quiet philanthropist. He remained a regular at his neighborhood Trader Joe's in Pasadena, browsing the aisles like any other customer.",
  "His posthumous memoir, \"Becoming Trader Joe,\" was published in 2021. It revealed a man who was equal parts intellectual, contrarian, and romantic — someone who genuinely believed that grocery shopping could be an adventure.",
];

export const joesFarewellQuote =
  "Do I regret having sold? Yes. I admit it. To mine own self I was not true when I sold.";

// S8: The Machine Today — Store Growth Chart Data
export const storeGrowthData = [
  { year: 1967, stores: 1, era: "Coulombe" },
  { year: 1972, stores: 6, era: "Coulombe" },
  { year: 1979, stores: 21, era: "Coulombe" },
  { year: 1988, stores: 27, era: "Coulombe" },
  { year: 1993, stores: 60, era: "Shields" },
  { year: 2001, stores: 158, era: "Shields" },
  { year: 2005, stores: 250, era: "Bane" },
  { year: 2010, stores: 365, era: "Bane" },
  { year: 2015, stores: 460, era: "Bane" },
  { year: 2020, stores: 510, era: "Bane" },
  { year: 2023, stores: 543, era: "Bane" },
  { year: 2025, stores: 631, era: "Palbaum" },
];

export const machineTodayStats: HeroStat[] = [
  { value: "631", label: "Stores", target: 631 },
  { value: "$25B", label: "Est. revenue", prefix: "~$", suffix: "B", target: 25 },
  { value: "$2,200", label: "Revenue per sqft", prefix: "$", suffix: "", target: 2200 },
];

export const aldiComparison = [
  { metric: "Stores (US)", tj: "631", aldi: "2,626" },
  { metric: "Philosophy", tj: "Curated experience", aldi: "Utilitarian efficiency" },
  { metric: "Strategy", tj: "Experiential retail", aldi: "Aggressive expansion" },
  { metric: "Same family?", tj: "Yes (Aldi Nord)", aldi: "Yes (Aldi Süd)" },
];

export const codaText =
  "The machine Joe built runs without him. It may run forever.";

// CompletionCard data
export const completionData3 = {
  title: "The Cult Machine",
  quote:
    "A Stanford MBA, a Pasadena storefront, and a German discount dynasty — together they built America's most unlikely retail institution. The machine runs on.",
  highlights: [
    { value: "1967", label: "First store opened", color: "var(--accent-gold)" },
    { value: "631", label: "Stores today", color: "var(--accent-navy)" },
    { value: "$2,200", label: "Revenue per sqft", color: "var(--accent-red)" },
    { value: "#1", label: "Customer satisfaction", color: "var(--accent-green)" },
  ],
  cta: "You've read the full story. Share it with someone who shops at Trader Joe's.",
};
