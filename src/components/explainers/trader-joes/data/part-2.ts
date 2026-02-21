import type { NavSection } from "@/components/explainers/shared/SectionNav";
import type { HeroStat, StickyStep } from "./part-1";

// Re-export shared types
export type { HeroStat, StickyStep };

// Section metadata for navigation
export const part2Sections: NavSection[] = [
  { id: "hero-2", label: "The Aldi Paradox", shortLabel: "Paradox" },
  { id: "albrecht", label: "The Albrecht Brothers", shortLabel: "Albrecht" },
  { id: "sale", label: "The Reluctant Sale", shortLabel: "Sale" },
  { id: "private-label", label: "Private Label", shortLabel: "Labels" },
  { id: "fearless-flyer", label: "Fearless Flyer", shortLabel: "Flyer" },
  { id: "intentional-store", label: "The Store", shortLabel: "Store" },
  { id: "less-is-more", label: "Less is More", shortLabel: "Less" },
  { id: "pay-people-well", label: "Pay People Well", shortLabel: "Pay" },
];

// S1: Hero stats
export const hero2Stats: HeroStat[] = [
  { value: "$38B", label: "Albrecht fortune", prefix: "$", suffix: "B", target: 38 },
  { value: "100%", label: "Hands-off ownership", suffix: "%", target: 100 },
  { value: "0", label: "Public photos since 1971", target: 0 },
];

// S2: Albrecht Brothers
export const albrechtSteps: StickyStep[] = [
  {
    id: "albrecht-1",
    content:
      "In 1913, Anna Albrecht opened a small grocery store in Essen, Germany. After the war, her two sons — Karl and Theo — took over. They had one obsession: eliminating waste.",
  },
  {
    id: "albrecht-2",
    content:
      "By the mid-1950s, the brothers had built Albrecht Diskont (Aldi) into 300 bare-bones stores across Germany. No decor, no marketing, no brands — just the lowest prices in Europe.",
  },
  {
    id: "albrecht-3",
    content:
      "In 1960, the brothers had their only recorded disagreement: whether to sell cigarettes. Karl said no (too much shoplifting). Theo said yes. They couldn't resolve it.",
  },
  {
    id: "albrecht-4",
    content:
      "The solution was extraordinary. They split the company in two — Aldi Nord (Theo, northern Germany) and Aldi Süd (Karl, southern Germany). A handshake deal between brothers that created two separate retail empires.",
  },
  {
    id: "albrecht-5",
    content:
      "In 1971, Theo was kidnapped and held for 17 days. The ransom was 7 million Deutschmarks. After his release, both brothers vanished from public life entirely. No interviews. No photos. No appearances. Ever.",
  },
];

export const albrechtSecrecyQuote =
  "The Albrecht brothers were more reclusive than the yeti — except the yeti at least had alleged sightings.";

// S3: The Reluctant Sale (1979)
export const saleData = {
  year: 1979,
  storeCount: 21,
  profitableSince: 1976,
  bookValueMultiple: 3,
};

export const saleNarrative = [
  "By the late 1970s, Joe Coulombe had built Trader Joe's into a profitable 21-store chain. Every location had been profitable since 1976. He'd created something genuinely unique in American retail.",
  "Joe wanted to set up an Employee Stock Ownership Plan — let the people who built the brand own a piece of it. But a change in tax law made the ESOP structure financially ruinous.",
  "Enter Theo Albrecht. Aldi Nord had been quietly buying grocery chains across Europe and was looking at America. The deal was struck at roughly three times book value — and sealed with a contract so simple it stunned Joe's lawyers.",
];

export const saleContractInsight = {
  title: "The One-Page Contract",
  description:
    "The acquisition agreement guaranteed complete operational independence. Aldi would never interfere with product selection, store design, employee policies, or the Trader Joe's brand. It was the corporate equivalent of 'We'll write the checks. You do your thing.'",
};

export const saleRegretQuote =
  "I was determined never to sell. But when the tax laws changed, the ESOP became impossible. Theo Albrecht offered complete independence. I took it — and never fully made peace with it.";

// S4: Private Label Revolution
export const privateLabelMetrics = {
  tjSkus: 4000,
  supermarketSkus: 40000,
  tjPrivateLabelPct: 80,
  industryPrivateLabelPct: 18,
  priceAdvantageVsWholeFoods: "30–50%",
};

export const privateLabelNames = [
  { brand: "Trader Giotto's", origin: "Italian products" },
  { brand: "Trader José's", origin: "Mexican products" },
  { brand: "Trader Ming's", origin: "Asian products" },
  { brand: "Trader Joe-San's", origin: "Japanese products" },
  { brand: "Pilgrim Joe's", origin: "New England products" },
  { brand: "Arabian Joe's", origin: "Middle Eastern products" },
];

export const chartData = [
  { category: "SKU Count", tj: 4000, supermarket: 40000 },
  { category: "Private Label %", tj: 80, supermarket: 18 },
  { category: "Avg Margin %", tj: 40, supermarket: 25 },
];

// S5: Fearless Flyer
export const flyerQuote =
  "A cross between Consumer Reports and Mad Magazine — written for people who read the ingredient list before the price tag.";

export const flyerInsights = [
  {
    title: "Wine Newsletter Origins",
    description:
      "The Fearless Flyer began in 1969 as a wine-buying guide — one of the first direct-to-consumer content marketing pieces in retail history.",
  },
  {
    title: "Victorian Wit",
    description:
      "Victorian woodcut illustrations paired with Ogilvy-inspired copywriting. Each product got a short essay, not a bullet-point spec sheet.",
  },
  {
    title: "Content Before Content Marketing",
    description:
      "Decades before the term 'content marketing' existed, TJ's was building brand loyalty through editorial voice — no coupons, no price matching, just stories.",
  },
];

// S6: The Intentional Store
export const storeSteps: StickyStep[] = [
  {
    id: "store-1",
    content:
      "Trader Joe's stores are 10,000–15,000 square feet. A typical supermarket is 45,000–65,000. This isn't a budget constraint — it's a strategic weapon. Smaller stores mean lower rent, faster restocking, and a treasure-hunt browsing experience.",
  },
  {
    id: "store-2",
    content:
      "The tiki theme started as a South Seas trading post aesthetic in the original 1967 Pasadena store. Cedar plank walls, ship bells, hand-lettered signs. Joe wanted shopping to feel like an adventure, not an errand.",
  },
  {
    id: "store-3",
    content:
      "Hawaiian shirts weren't dress code — they were philosophy. The 'Captain' (store manager) and 'Crew' (employees) created a flat hierarchy that felt more like a ship's company than a corporate org chart.",
  },
  {
    id: "store-4",
    content:
      "Every store features hand-painted chalkboard signs by a local artist. No two stores look exactly alike. This deliberate imperfection was the antithesis of the sterile, standardized supermarket.",
  },
  {
    id: "store-5",
    content:
      "What they DON'T have is the real strategy: no self-checkout, no loyalty cards, no coupons, no delivery service, no e-commerce, no mobile app. Every absence is intentional — it forces human connection and keeps overhead razor-thin.",
  },
];

export const storeSpecs = {
  tjSqFt: 12500,
  supermarketSqFt: 50000,
  tjLabel: "Trader Joe's",
  supermarketLabel: "Avg Supermarket",
};

// S7: Less is More — Joe's Four Tests
export const fourTests = [
  {
    number: 1,
    title: "High Value per Cubic Inch",
    description:
      "Every product must justify its shelf space. With only 4,000 SKUs vs 40,000, a product that doesn't sell fast gets cut — no second chances.",
  },
  {
    number: 2,
    title: "High Consumption Rate",
    description:
      "Trader Joe's wants products people buy every week, not once a year. High turnover means fresher stock and more revenue per shelf foot.",
  },
  {
    number: 3,
    title: "Easily Handled",
    description:
      "Products must be easy to ship, stock, and store. This is why you won't find many oddly shaped or fragile items — efficiency is baked into the product selection.",
  },
  {
    number: 4,
    title: "Outstanding Price or Assortment",
    description:
      "Either offer a price no competitor can touch (by going direct to producers) or offer something nobody else carries. Preferably both.",
  },
];

export const oneInOneOutInsight = {
  title: "One In, One Out",
  description:
    "When a new product enters the store, an underperformer leaves. This creates the 'treasure hunt' effect — shoppers buy immediately because their favorite item might vanish next week. Scarcity as strategy.",
};

export const buyingStrategy =
  "Trader Joe's buys direct from producers worldwide, pays cash on delivery, and never asks for slotting fees. Suppliers get certainty; TJ's gets prices 20–40% below wholesale.";

// S8: Pay People Well
export const payStats = {
  wageMultiple: 2,
  wageMultipleLabel: "times minimum wage starting pay",
  tjTurnover: 6,
  industryTurnover: 65,
  promoteFromWithin: 100,
  captainSalary: 100000,
};

export const payQuote =
  "This is the most important single business decision I ever made: to pay people well.";

export const payContrast = [
  { label: "TJ's Crew Turnover", value: "6%", color: "var(--accent-green)" },
  { label: "Industry Avg Turnover", value: "65%", color: "var(--accent-red)" },
  { label: "Promote from Within", value: "100%", color: "var(--accent-gold)" },
  { label: "Captain Salary", value: "$100K+", color: "var(--accent-navy)" },
];

export const cliffhangerText2 =
  "In 1988, Joe Coulombe walked away from the company he built. But the machine he created was just getting started.";

// CompletionCard data
export const completionData = {
  title: "The Paradox Resolved",
  quote:
    "A German discount dynasty and a California dreamer built the most unlikely partnership in retail — by agreeing to never interfere.",
  highlights: [
    { value: "1979", label: "Aldi acquires TJ's", color: "var(--accent-navy)" },
    { value: "$38B", label: "Albrecht fortune", color: "var(--accent-gold)" },
    { value: "4,000", label: "Curated SKUs", color: "var(--accent-red)" },
    { value: "6%", label: "Staff turnover", color: "var(--accent-green)" },
  ],
  cta: "Part 3 continues the story. Share Part 2 with someone who shops at Trader Joe's.",
};
