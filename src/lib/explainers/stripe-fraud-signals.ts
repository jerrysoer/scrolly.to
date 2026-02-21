export interface FraudSignal {
  id: string;
  label: string;
  description: string;
  icon: string;
  weight: number;
  riskContribution: number;
  details: string;
  category: "device" | "behavior" | "network" | "card";
}

export const fraudSignals: FraudSignal[] = [
  {
    id: "ip-geolocation",
    label: "IP Geolocation",
    description: "IP address is from a high-risk region",
    icon: "MapPin",
    weight: 18,
    riskContribution: 18,
    details:
      "The transaction originates from an IP in a country with elevated fraud rates. Stripe maintains a real-time database of IP risk scores based on historical fraud data across millions of merchants.",
    category: "network",
  },
  {
    id: "device-fingerprint",
    label: "Device Fingerprint",
    description: "New device, no previous legitimate transactions",
    icon: "Fingerprint",
    weight: 15,
    riskContribution: 15,
    details:
      "Stripe.js collects browser characteristics (screen size, fonts, timezone, WebGL renderer) to create a unique device fingerprint. This device has never been seen before in Stripe's network of millions of merchants.",
    category: "device",
  },
  {
    id: "card-testing",
    label: "Card Testing Pattern",
    description: "Multiple small charges in rapid succession",
    icon: "Repeat",
    weight: 25,
    riskContribution: 25,
    details:
      "Fraudsters test stolen card numbers with small charges ($0.50-$1.00) before making large purchases. Stripe detected 8 authorization attempts with different card numbers from this IP in the last 3 minutes.",
    category: "behavior",
  },
  {
    id: "velocity",
    label: "Transaction Velocity",
    description: "Unusual number of transactions in a short time",
    icon: "Activity",
    weight: 12,
    riskContribution: 12,
    details:
      "This card has been used 5 times in the last hour across 3 different merchants. Normal usage for this cardholder is 2-3 transactions per day. Sudden spikes in velocity are a strong fraud signal.",
    category: "behavior",
  },
  {
    id: "email-risk",
    label: "Email Analysis",
    description: "Disposable email domain, recently created",
    icon: "Mail",
    weight: 10,
    riskContribution: 10,
    details:
      "The email used was created on a disposable email service 2 hours ago. Stripe checks email age, domain reputation, and whether the email has been seen in previous legitimate transactions across the network.",
    category: "network",
  },
  {
    id: "address-mismatch",
    label: "Address Mismatch",
    description: "Billing address doesn't match card records",
    icon: "MapPinOff",
    weight: 14,
    riskContribution: 14,
    details:
      "The billing address provided doesn't match the address on file with the card issuer. AVS (Address Verification System) returned a partial match — the ZIP code matches but the street address doesn't.",
    category: "card",
  },
  {
    id: "browser-anomaly",
    label: "Browser Anomaly",
    description: "Browser characteristics suggest automation",
    icon: "Monitor",
    weight: 8,
    riskContribution: 8,
    details:
      "The browser is running in headless mode with WebDriver flags present. The navigator.webdriver property is true, suggesting an automated script rather than a human user. Screen resolution is 0x0.",
    category: "device",
  },
];

export const riskThresholds = {
  low: { max: 30, label: "Low Risk", color: "var(--correct-green)" },
  medium: { max: 60, label: "Medium Risk", color: "var(--accent-amber)" },
  high: { max: 100, label: "High Risk", color: "var(--backward-orange)" },
};

export const baseRiskScore = 5;

export const globalFraudHeatmapData = [
  { region: "North America", rate: 0.98, volume: "high" },
  { region: "Western Europe", rate: 1.2, volume: "high" },
  { region: "Eastern Europe", rate: 3.4, volume: "medium" },
  { region: "Southeast Asia", rate: 2.8, volume: "medium" },
  { region: "Latin America", rate: 2.1, volume: "medium" },
  { region: "Sub-Saharan Africa", rate: 4.2, volume: "low" },
  { region: "Middle East", rate: 1.9, volume: "low" },
  { region: "East Asia", rate: 0.7, volume: "high" },
  { region: "South Asia", rate: 1.5, volume: "medium" },
  { region: "Oceania", rate: 0.8, volume: "medium" },
];
