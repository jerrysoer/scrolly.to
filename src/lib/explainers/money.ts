export const barterTraders = [
  {
    name: "Fisher",
    emoji: "fish",
    has: "Fish",
    needs: "Shoes",
    color: "#3b82f6",
  },
  {
    name: "Cobbler",
    emoji: "boot",
    has: "Shoes",
    needs: "Bread",
    color: "#f59e0b",
  },
  {
    name: "Baker",
    emoji: "bread",
    has: "Bread",
    needs: "Fish",
    color: "#ef4444",
  },
] as const;

export const moneyProperties = [
  {
    property: "Scarce",
    description: "Limited supply, can't be easily created",
    gold: true,
    shells: false,
    paper: false,
    bitcoin: true,
  },
  {
    property: "Portable",
    description: "Easy to carry around",
    gold: false,
    shells: true,
    paper: true,
    bitcoin: true,
  },
  {
    property: "Durable",
    description: "Doesn't rot, break, or disappear",
    gold: true,
    shells: false,
    paper: false,
    bitcoin: true,
  },
  {
    property: "Divisible",
    description: "Can be split into smaller units",
    gold: false,
    shells: false,
    paper: true,
    bitcoin: true,
  },
] as const;

export const goldSteps = [
  {
    step: 1,
    title: "Raw Gold",
    description: "Gold nuggets found in rivers and mines. Valuable, but every trade requires weighing and verifying purity.",
    icon: "nugget",
  },
  {
    step: 2,
    title: "Weighed & Measured",
    description: "Merchants use scales to measure gold weight. But who calibrates the scales? Trust is already an issue.",
    icon: "scale",
  },
  {
    step: 3,
    title: "King Stamps a Coin",
    description: "A ruler stamps gold into standard coins. The stamp says: 'I guarantee this weight and purity.' First centralized trust.",
    icon: "stamp",
  },
  {
    step: 4,
    title: "Accepted Everywhere",
    description: "Standardized coins flow freely. You don't need to weigh each coin — you trust the stamp. Money as we know it is born.",
    icon: "globe",
  },
] as const;

export const dollarComparison = {
  goldBacked: {
    label: "Gold-Backed Dollar (pre-1971)",
    backing: "Each dollar redeemable for gold at $35/oz",
    trust: "Trust the vault — gold is physically there",
    limit: "Government can only print money it has gold for",
    weakness: "Can't expand money supply during crises",
  },
  fiat: {
    label: "Modern Fiat Dollar (post-1971)",
    backing: "Backed by 'full faith and credit' of the US government",
    trust: "Trust the institution — the government promises value",
    limit: "No physical limit — government decides how much to print",
    weakness: "Temptation to print too much (inflation risk)",
  },
} as const;

export const moneyCreationSteps = [
  {
    step: 1,
    title: "You Request a Loan",
    description: "You walk into a bank and ask for a $300,000 mortgage to buy a house.",
    detail: "The bank doesn't check a vault",
  },
  {
    step: 2,
    title: "Bank Approves",
    description: "The bank reviews your credit, income, and the house value. You're approved.",
    detail: "Still no money has moved",
  },
  {
    step: 3,
    title: "Bank Types Numbers",
    description: "The bank adds $300,000 to your account. It didn't transfer this from anyone else's savings. It typed new numbers.",
    detail: "This is the moment new money is created",
  },
  {
    step: 4,
    title: "New Money Exists",
    description: "$300,000 that didn't exist yesterday now exists in the economy. When you repay the loan, that money is destroyed.",
    detail: "97% of all money is created this way",
  },
] as const;

export const inflationData = [
  { supply: 1, label: "$1T", power: 100, year: "Baseline" },
  { supply: 2, label: "$2T", power: 85, year: "+5 years" },
  { supply: 4, label: "$4T", power: 68, year: "+15 years" },
  { supply: 8, label: "$8T", power: 48, year: "+25 years" },
  { supply: 16, label: "$16T", power: 30, year: "+40 years" },
  { supply: 21, label: "$21T", power: 22, year: "Today" },
] as const;

export const fedRateEffects = {
  low: {
    rate: "0.25%",
    label: "Low Rates",
    effects: [
      "Borrowing is cheap — people buy houses, cars, start businesses",
      "Banks create more money through loans",
      "Stock market tends to rise",
      "Risk: prices start rising (inflation)",
    ],
    mood: "hot",
  },
  high: {
    rate: "5.50%",
    label: "High Rates",
    effects: [
      "Borrowing is expensive — fewer loans, less spending",
      "Banks create less money",
      "Economy slows down",
      "Benefit: inflation comes under control",
    ],
    mood: "cold",
  },
} as const;

export const trustComparison = [
  {
    name: "US Dollar",
    trustModel: "Government Trust",
    icon: "building",
    description: "Value backed by the US government's promise and economic power",
    supply: "Unlimited — set by the Federal Reserve and commercial banks",
    weakness: "Requires trusting politicians and institutions not to abuse the system",
    color: "#22c55e",
  },
  {
    name: "Gold",
    trustModel: "Scarcity Trust",
    icon: "gem",
    description: "Value comes from physical scarcity — hard to mine, can't be faked",
    supply: "Limited — only ~244,000 metric tons ever mined",
    weakness: "Heavy, hard to divide, impractical for digital economy",
    color: "#f59e0b",
  },
  {
    name: "Bitcoin",
    trustModel: "Mathematical Trust",
    icon: "cpu",
    description: "Value secured by cryptographic math — no government, no bank needed",
    supply: "Fixed at exactly 21 million coins, ever",
    weakness: "Volatile, energy-intensive, and still requires trust in the code",
    color: "#3b82f6",
  },
] as const;

export const faqs = [
  {
    q: "Where does money come from?",
    a: "Most money is created by commercial banks when they issue loans. The bank doesn't transfer existing money — it types new numbers into the borrower's account, creating money that didn't exist before. About 97% of money in circulation is digital, created this way.",
  },
  {
    q: "Is the US dollar backed by gold?",
    a: "No. The US dollar hasn't been backed by gold since August 15, 1971, when President Nixon ended the gold standard (the 'Nixon Shock'). Today's dollar is fiat money — its value comes from trust in the US government, not from any physical commodity.",
  },
  {
    q: "What causes inflation?",
    a: "Inflation occurs when the money supply grows faster than the economy's output. When more money chases the same amount of goods, prices rise and each dollar buys less. Central banks like the Federal Reserve try to control this through interest rates.",
  },
  {
    q: "How is Bitcoin different from regular money?",
    a: "Bitcoin's supply is fixed at 21 million coins and controlled by math (cryptographic algorithms), not by any government or bank. Regular money (fiat) can be created in unlimited quantities by banks and governments. Bitcoin requires trust in mathematics; dollars require trust in institutions.",
  },
  {
    q: "What does the Federal Reserve actually do?",
    a: "The Federal Reserve sets interest rates that influence how much it costs to borrow money. Low rates make borrowing cheap (stimulating spending and growth), while high rates make borrowing expensive (cooling the economy and fighting inflation). It's like a thermostat for the economy.",
  },
] as const;
