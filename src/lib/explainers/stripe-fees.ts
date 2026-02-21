export interface FeeBreakdown {
  label: string;
  description: string;
  percentage: number;
  fixedCents: number;
  color: string;
  recipient: string;
}

export const feeStructure: FeeBreakdown[] = [
  {
    label: "Interchange Fee",
    description:
      "Paid to the issuing bank (customer's bank). This is the largest component and is set by the card networks. It compensates the issuer for the risk of extending credit and fraud protection.",
    percentage: 1.8,
    fixedCents: 0,
    color: "var(--forward-blue)",
    recipient: "Issuing Bank",
  },
  {
    label: "Network Assessment",
    description:
      "Paid to the card network (Visa/Mastercard). This fee funds the network infrastructure, brand marketing, and dispute resolution systems. It's typically the smallest component.",
    percentage: 0.13,
    fixedCents: 0,
    color: "var(--accent-purple)",
    recipient: "Card Network",
  },
  {
    label: "Stripe Processing Fee",
    description:
      "Stripe's fee for providing the payment infrastructure, fraud prevention (Radar), developer tools, dashboard, and 24/7 support. This is Stripe's revenue from each transaction.",
    percentage: 0.97,
    fixedCents: 30,
    color: "#635BFF",
    recipient: "Stripe",
  },
];

export function calculateFees(amount: number) {
  const interchange = amount * 0.018;
  const networkAssessment = amount * 0.0013;
  const stripePercentage = amount * 0.0097;
  const stripeFixed = 0.3;
  const stripeFee = stripePercentage + stripeFixed;
  const totalFees = interchange + networkAssessment + stripeFee;
  const merchantReceives = amount - totalFees;

  return {
    amount,
    interchange: Math.round(interchange * 100) / 100,
    networkAssessment: Math.round(networkAssessment * 100) / 100,
    stripeFee: Math.round(stripeFee * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    merchantReceives: Math.round(merchantReceives * 100) / 100,
    merchantPercentage: Math.round((merchantReceives / amount) * 10000) / 100,
  };
}

export const settlementTimeline = [
  {
    day: "Day 0",
    label: "Authorization",
    description: "Funds are held on the customer's card. No money has moved yet.",
  },
  {
    day: "Day 0",
    label: "Capture",
    description:
      "Stripe captures the authorized amount (usually automatic). This signals the intent to collect.",
  },
  {
    day: "Day 1",
    label: "Batch Settlement",
    description:
      "At end of day, all captured transactions are batched and sent to the card network for settlement.",
  },
  {
    day: "Day 2",
    label: "Funds Transfer",
    description:
      "The issuing bank transfers funds to the acquiring bank, minus interchange. The card network facilitates.",
  },
  {
    day: "Day 2",
    label: "Stripe Payout",
    description:
      "Stripe receives funds from the acquirer and initiates payout to the merchant's bank account.",
  },
];
