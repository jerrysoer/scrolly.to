// Pre-computed data for airline loyalty program explainer
// Sources: United Airlines SEC filings, Chase bank partnerships, industry analysis

export const moneyChainSteps = [
  {
    id: "swipe",
    label: "You swipe your card",
    detail: "Purchase: $100 at a restaurant",
    icon: "credit-card",
  },
  {
    id: "chase",
    label: "Chase pays interchange fee",
    detail: "Chase earns ~2.5% ($2.50) from the merchant",
    icon: "building",
  },
  {
    id: "buy-miles",
    label: "Chase buys miles from United",
    detail: "Chase buys 200 miles at ~1.5\u00A2 each = $3.00 to United",
    icon: "dollar-sign",
  },
  {
    id: "revenue",
    label: "United books revenue immediately",
    detail: "United records $3.00 as revenue the moment miles are sold",
    icon: "trending-up",
  },
  {
    id: "redeem",
    label: "You maybe redeem someday",
    detail: "~30% of miles are never redeemed (breakage)",
    icon: "help-circle",
  },
];

export const valuationComparison = {
  mileagePlus: {
    label: "MileagePlus Valuation",
    value: 22,
    unit: "B",
    color: "var(--airline-blue)",
    year: 2020,
    context: "Pledged as loan collateral during COVID",
  },
  airlineMarketCap: {
    label: "United Airlines Market Cap",
    value: 10,
    unit: "B",
    color: "var(--mile-gold)",
    year: 2020,
    context: "Total value of the airline itself",
  },
};

export const deferredRevenueData = [
  { year: 2018, deferred: 5.2, redeemed: 3.8, label: "2018" },
  { year: 2019, deferred: 5.8, redeemed: 4.1, label: "2019" },
  { year: 2020, deferred: 7.1, redeemed: 2.3, label: "2020" },
  { year: 2021, deferred: 8.0, redeemed: 3.5, label: "2021" },
  { year: 2022, deferred: 8.5, redeemed: 4.8, label: "2022" },
  { year: 2023, deferred: 9.2, redeemed: 5.1, label: "2023" },
  { year: 2024, deferred: 9.8, redeemed: 5.4, label: "2024" },
];

export const redemptionStats = {
  totalIssued: 100,
  redeemed: 70,
  expired: 15,
  devalued: 10,
  forgotten: 5,
  breakageValueBillions: 3.2,
};

export const earnRateComparison = {
  before: {
    label: "Before April 2026",
    rates: [
      { category: "Basic Economy", withCard: "5x per $", withoutCard: "1x per $" },
      { category: "Main Cabin", withCard: "7x per $", withoutCard: "2x per $" },
      { category: "Business/First", withCard: "11x per $", withoutCard: "3x per $" },
      { category: "Bag Check", withCard: "Free 1st bag", withoutCard: "$35" },
    ],
  },
  after: {
    label: "After April 2026",
    rates: [
      { category: "Basic Economy", withCard: "10x per $", withoutCard: "0x" },
      { category: "Main Cabin", withCard: "14x per $", withoutCard: "2x per $" },
      { category: "Business/First", withCard: "22x per $", withoutCard: "3x per $" },
      { category: "Bag Check", withCard: "Free 1st bag", withoutCard: "$40" },
    ],
  },
};

export const faqs = [
  {
    q: "How much is United's MileagePlus loyalty program worth?",
    a: "In 2020, United valued MileagePlus at $22 billion when it pledged the program as loan collateral. At the time, United's entire airline market cap was only about $10 billion \u2014 meaning the loyalty program was worth more than twice the airline itself.",
  },
  {
    q: "How do airlines make money from credit cards?",
    a: "Airlines sell miles in bulk to banks like Chase and American Express at roughly 1.5 cents per mile. The banks then award those miles to credit card holders as rewards. This generates billions in upfront cash for airlines, regardless of whether passengers ever fly.",
  },
  {
    q: "What happens to airline miles that are never redeemed?",
    a: "Approximately 30% of airline miles are never redeemed \u2014 they expire, get devalued, or are forgotten. This breakage is pure profit for airlines, since they already collected cash when the miles were sold but never have to provide the promised flights.",
  },
  {
    q: "What is deferred revenue from airline miles?",
    a: "When airlines sell miles to banks, they book the cash immediately but record the obligation to provide future flights as \u2018deferred revenue\u2019 on their balance sheet. This is essentially an interest-free loan from miles holders \u2014 airlines use the cash now and may never have to deliver the service.",
  },
  {
    q: "Why are airlines pushing credit card sign-ups so aggressively?",
    a: "Every new cardholder means the bank buys more miles from the airline, generating immediate revenue. United's 2026 changes \u2014 offering 2x miles for cardholders and zero miles for basic economy without a card \u2014 are designed to maximize card adoption, not reward loyal flyers.",
  },
];
