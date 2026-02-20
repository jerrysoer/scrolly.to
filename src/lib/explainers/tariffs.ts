// ── Types ──

export interface FlowStep {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface CostLayer {
  label: string;
  amount: number;
  color: string;
}

export interface Law {
  id: string;
  name: string;
  year: number;
  icon: string;
  summary: string;
  whenUsed: string;
  limits: string;
  examples: string;
  accentColor: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "normal" | "critical" | "resolution";
}

export interface CountryTariff {
  name: string;
  rate: number;
  region: string;
}

export interface Justice {
  name: string;
  vote: "majority" | "dissent";
  position: number;
}

export interface TariffStatus {
  label: string;
  description: string;
  status: "struck" | "standing";
}

export interface RevenueFlow {
  label: string;
  amount: string;
  refundable: boolean;
  width: number;
}

export interface Metric {
  value: string;
  label: string;
  trend?: "positive" | "negative" | "neutral" | "warning";
  trendText?: string;
}

export interface Highlight {
  value: string;
  label: string;
  color?: string;
}

// ── Section 1: Tariff Flow Steps ──

export const tariffFlowSteps: FlowStep[] = [
  {
    id: "factory",
    label: "Factory in China",
    description: "Goods manufactured overseas",
    icon: "Factory",
  },
  {
    id: "port",
    label: "US Port",
    description: "Arrives at the border",
    icon: "Ship",
  },
  {
    id: "importer",
    label: "Importer Pays Tariff",
    description: "Tax paid to US Customs",
    icon: "Building2",
  },
  {
    id: "consumer",
    label: "You Pay More",
    description: "Higher prices at the store",
    icon: "ShoppingBag",
  },
];

// ── Section 2: Shoe Cost Breakdown ──

export const shoeCostBreakdown: CostLayer[] = [
  { label: "Factory Cost", amount: 30, color: "var(--accent-blue)" },
  { label: "Shipping", amount: 10, color: "#6b7fa3" },
  { label: "Tariff (25%)", amount: 10, color: "var(--accent-red)" },
  { label: "Importer Margin", amount: 15, color: "#8b95a8" },
  { label: "Retailer Markup", amount: 20, color: "#a0aab8" },
];

export const supplyChainMetrics: Metric[] = [
  {
    value: "90%",
    label: "Burden on US",
    trend: "negative",
    trendText: "Businesses & Consumers",
  },
  {
    value: "10%",
    label: "Burden on Exporters",
    trend: "neutral",
    trendText: "Foreign firms",
  },
  {
    value: "$25",
    label: "Added Cost Per Shoe",
    trend: "warning",
    trendText: "$60 → $85",
  },
];

// ── Section 3: Legal Architecture ──

export const tariffLaws: Law[] = [
  {
    id: "section-232",
    name: "Section 232",
    year: 1962,
    icon: "Shield",
    summary: "National security threats to US industry",
    whenUsed:
      "When imports threaten to impair national security. Requires Commerce Department investigation.",
    limits:
      "President must act on Commerce Dept. findings. Investigation takes months. Subject to legal challenge but historically upheld.",
    examples:
      "Steel & aluminum tariffs (2018). Still in effect after SCOTUS ruling.",
    accentColor: "var(--accent-blue)",
  },
  {
    id: "section-301",
    name: "Section 301",
    year: 1974,
    icon: "Scale",
    summary: "Unfair trade practices by foreign governments",
    whenUsed:
      "When trading partners engage in unfair practices (IP theft, subsidies). Requires USTR investigation, 12+ months.",
    limits:
      "Must demonstrate specific trade violations. Time-limited, subject to review. WTO dispute implications.",
    examples:
      "China tariffs from 2018-19 trade war. Most still in effect and expanded under Biden.",
    accentColor: "var(--accent-amber)",
  },
  {
    id: "ieepa",
    name: "IEEPA",
    year: 1977,
    icon: "AlertTriangle",
    summary: "National emergency economic powers — no explicit tariff authority",
    whenUsed:
      'President declares a national emergency, then "regulates importation." Fastest lever — no investigation required.',
    limits:
      'No explicit mention of tariffs or duties. Designed for sanctions and asset freezes. The word "tariff" does not appear in the statute.',
    examples:
      "Iran sanctions (1979), Russia sanctions, terrorist financing. First-ever tariff use: April 2025.",
    accentColor: "var(--accent-red)",
  },
];

// ── Section 4: IEEPA Timeline ──

export const ieepaTimeline: TimelineEvent[] = [
  {
    year: "1977",
    title: "IEEPA Passed",
    description:
      "Congress creates emergency economic powers for sanctions and asset freezes.",
    type: "normal",
  },
  {
    year: "1979",
    title: "Iran Hostage Crisis",
    description:
      "First major use — President Carter freezes Iranian assets in US banks.",
    type: "normal",
  },
  {
    year: "2001–2020",
    title: "Sanctions Era",
    description:
      "Used against Russia, North Korea, ISIS financing. Always for sanctions — never tariffs.",
    type: "normal",
  },
  {
    year: "APR 2025",
    title: "First-Ever Tariff Use",
    description:
      'Trump uses IEEPA to impose sweeping "reciprocal" tariffs on nearly every country. Unprecedented.',
    type: "critical",
  },
  {
    year: "FEB 2026",
    title: "SCOTUS Strikes It Down",
    description:
      "Supreme Court rules 6-3 that IEEPA does not authorize tariffs. Major questions doctrine applied.",
    type: "resolution",
  },
];

// ── Section 5: Country Tariffs ──

export const countryTariffs: CountryTariff[] = [
  { name: "China", rate: 145, region: "asia" },
  { name: "EU", rate: 20, region: "europe" },
  { name: "India", rate: 26, region: "asia" },
  { name: "Japan", rate: 24, region: "asia" },
  { name: "South Korea", rate: 25, region: "asia" },
  { name: "Taiwan", rate: 32, region: "asia" },
  { name: "Vietnam", rate: 46, region: "asia" },
  { name: "Thailand", rate: 36, region: "asia" },
  { name: "Brazil", rate: 10, region: "americas" },
  { name: "Canada", rate: 25, region: "americas" },
  { name: "Mexico", rate: 25, region: "americas" },
  { name: "UK", rate: 10, region: "europe" },
  { name: "Switzerland", rate: 31, region: "europe" },
  { name: "Australia", rate: 10, region: "oceania" },
];

export const liberationDayMetrics: Metric[] = [
  {
    value: "$200B+",
    label: "Tariffs Collected 2025",
    trend: "warning",
  },
  {
    value: "145%",
    label: "China Rate",
    trend: "negative",
  },
  {
    value: "10%",
    label: "Baseline Floor",
    trend: "neutral",
  },
  {
    value: "190+",
    label: "Countries Hit",
    trend: "neutral",
  },
];

// ── Section 6: SCOTUS Justices ──

export const justices: Justice[] = [
  { name: "Roberts", vote: "majority", position: 4 },
  { name: "Kagan", vote: "majority", position: 1 },
  { name: "Sotomayor", vote: "majority", position: 0 },
  { name: "Jackson", vote: "majority", position: 2 },
  { name: "Gorsuch", vote: "majority", position: 5 },
  { name: "Barrett", vote: "majority", position: 6 },
  { name: "Thomas", vote: "dissent", position: 3 },
  { name: "Alito", vote: "dissent", position: 7 },
  { name: "Kavanaugh", vote: "dissent", position: 8 },
];

// ── Section 7: Tariff Status ──

export const struckDownTariffs: TariffStatus[] = [
  {
    label: '"Reciprocal" tariffs (10–50%)',
    description: "Applied to most countries under Liberation Day executive order",
    status: "struck",
  },
  {
    label: "Fentanyl tariffs on Canada, Mexico, China",
    description: "Emergency tariffs citing drug trafficking as national emergency",
    status: "struck",
  },
  {
    label: '"Liberation Day" baseline tariff',
    description: "10% floor tariff on nearly all imports worldwide",
    status: "struck",
  },
];

export const standingTariffs: TariffStatus[] = [
  {
    label: "Steel & aluminum tariffs (Section 232)",
    description: "Imposed under national security authority — separate legal basis",
    status: "standing",
  },
  {
    label: "Section 301 tariffs on China",
    description: "Original trade war tariffs from 2018–19, expanded under Biden",
    status: "standing",
  },
  {
    label: "Any tariffs reimposed under other laws",
    description:
      "Administration can repackage tariffs under 232/301 with proper process",
    status: "standing",
  },
];

// ── Section 8: Revenue Flows ──

export const revenueFlows: RevenueFlow[] = [
  {
    label: "Government Retained",
    amount: "$133.5B",
    refundable: false,
    width: 45,
  },
  {
    label: "Passed to Businesses",
    amount: "Cost absorbed",
    refundable: true,
    width: 30,
  },
  {
    label: "Passed to Consumers",
    amount: "Higher prices",
    refundable: false,
    width: 25,
  },
];

export const yourMoneyMetrics: Metric[] = [
  {
    value: "$133.5B",
    label: "IEEPA Revenue Collected",
    trend: "warning",
  },
  {
    value: "$175B+",
    label: "Refund Exposure",
    trend: "negative",
  },
  {
    value: "~$1,000",
    label: "Cost Per Household 2025",
    trend: "negative",
  },
  {
    value: "-$600–800",
    label: "Projected Savings 2026",
    trend: "positive",
  },
];

// ── Completion Card ──

export const completionHighlights: Highlight[] = [
  { value: "9", label: "Sections" },
  { value: "6–3", label: "Ruling" },
  { value: "$133.5B", label: "At Stake" },
  { value: "Feb 20", label: "The Date" },
];

// ── FAQs (for JSON-LD) ──

export const faqs = [
  {
    question: "Who pays tariffs — the foreign country or the US?",
    answer:
      "Tariffs are paid by the American importer of record when goods cross the US border. The cost is then passed downstream to retailers and consumers. Studies from the NY Fed found that US firms and consumers bore roughly 90% of the economic burden of recent tariffs.",
  },
  {
    question: "What did the Supreme Court rule about Trump's tariffs?",
    answer:
      'On February 20, 2026, the Supreme Court ruled 6-3 that Trump\'s IEEPA tariffs were unconstitutional. Chief Justice Roberts wrote that IEEPA\'s grant of authority to "regulate importation" does not include the power to impose tariffs or duties.',
  },
  {
    question: "Are all of Trump's tariffs gone after the SCOTUS ruling?",
    answer:
      "No. The ruling only strikes down tariffs imposed under IEEPA (the International Emergency Economic Powers Act). Steel and aluminum tariffs under Section 232, and Section 301 tariffs on China, remain in effect. The administration can also reimpose tariffs under other legal authorities.",
  },
  {
    question: "Will consumers get refunds from struck-down tariffs?",
    answer:
      "Direct consumer refunds are unlikely. Importers who paid IEEPA tariffs and are party to lawsuits have the strongest refund claims. The benefit to consumers is expected to come indirectly through lower prices over time as tariff costs normalize.",
  },
  {
    question: "What is IEEPA and why was it used for tariffs?",
    answer:
      "The International Emergency Economic Powers Act (1977) gives presidents power to regulate economic transactions during national emergencies. It was designed for sanctions and asset freezes. Trump was the first president to use it for tariffs, which the Supreme Court ruled exceeded the law's scope.",
  },
];

// ── Section Nav items ──

export const navSections = [
  { id: "hero", label: "Overview" },
  { id: "what-is-a-tariff", label: "What Is a Tariff" },
  { id: "supply-chain", label: "Supply Chain" },
  { id: "legal-architecture", label: "Legal Architecture" },
  { id: "ieepa", label: "IEEPA" },
  { id: "liberation-day", label: "Liberation Day" },
  { id: "scotus", label: "SCOTUS Ruling" },
  { id: "still-standing", label: "Still Standing" },
  { id: "your-money", label: "Your Money" },
  { id: "bigger-picture", label: "Bigger Picture" },
];
