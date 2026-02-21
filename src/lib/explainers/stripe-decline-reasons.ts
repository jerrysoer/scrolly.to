export interface DeclineNode {
  id: string;
  label: string;
  description: string;
  failedAt: string;
  children?: DeclineNode[];
  isTerminal?: boolean;
  code?: string;
}

export const declineTree: DeclineNode = {
  id: "root",
  label: "Payment Submitted",
  description: "A $49.99 charge is submitted for authorization",
  failedAt: "",
  children: [
    {
      id: "stripe-check",
      label: "Stripe Fraud Check",
      description: "Stripe Radar evaluates the transaction before it even reaches the bank",
      failedAt: "Stripe",
      children: [
        {
          id: "fraud-block",
          label: "Blocked by Radar",
          description:
            "Stripe's ML model flagged this transaction as high-risk. The risk score was 87/100 — well above the 65 threshold. Common triggers: unusual IP location, rapid card testing, or mismatched billing address.",
          failedAt: "Stripe",
          isTerminal: true,
          code: "card_declined (fraud_detected)",
        },
        {
          id: "passes-radar",
          label: "Passes Radar",
          description: "Risk score 23/100 — within acceptable range. Forwarded to acquirer.",
          failedAt: "",
          children: [
            {
              id: "network-check",
              label: "Card Network Validation",
              description: "The card network validates the BIN and routes to the correct issuer",
              failedAt: "Card Network",
              children: [
                {
                  id: "invalid-card",
                  label: "Invalid Card Number",
                  description:
                    "The card number failed Luhn check or the BIN doesn't map to any known issuer. The card may be mistyped or from a decommissioned range.",
                  failedAt: "Card Network",
                  isTerminal: true,
                  code: "incorrect_number",
                },
                {
                  id: "valid-card",
                  label: "Valid Card, Routes to Issuer",
                  description: "BIN validated. Routing to Chase (issuing bank).",
                  failedAt: "",
                  children: [
                    {
                      id: "issuer-check",
                      label: "Issuing Bank Decision",
                      description: "The issuer performs final authorization checks",
                      failedAt: "Issuing Bank",
                      children: [
                        {
                          id: "insufficient-funds",
                          label: "Insufficient Funds",
                          description:
                            "Available balance: $32.17. Requested: $49.99. The hold cannot be placed. The customer needs to add funds or use a different payment method.",
                          failedAt: "Issuing Bank",
                          isTerminal: true,
                          code: "card_declined (insufficient_funds)",
                        },
                        {
                          id: "expired-card",
                          label: "Expired Card",
                          description:
                            "Card expiry 03/24 has passed. The issuer rejects all transactions on expired cards. The customer needs to update their card details with the new expiry date.",
                          failedAt: "Issuing Bank",
                          isTerminal: true,
                          code: "expired_card",
                        },
                        {
                          id: "incorrect-cvc",
                          label: "Incorrect CVC",
                          description:
                            "The 3-digit security code doesn't match. This is a strong signal for fraud — someone may have the card number but not the physical card. Most issuers decline immediately.",
                          failedAt: "Issuing Bank",
                          isTerminal: true,
                          code: "incorrect_cvc",
                        },
                        {
                          id: "velocity-limit",
                          label: "Velocity Limit Exceeded",
                          description:
                            "Too many authorization attempts in a short period. The issuer detected 12 transactions in the last 5 minutes — classic card-testing behavior. The card is temporarily locked for online transactions.",
                          failedAt: "Issuing Bank",
                          isTerminal: true,
                          code: "card_declined (card_velocity_exceeded)",
                        },
                        {
                          id: "issuer-fraud",
                          label: "Issuer Fraud Detection",
                          description:
                            "The issuer's own fraud model flagged this transaction. The cardholder typically shops in New York, but this transaction originated from an IP in Romania. The issuer requires 3D Secure verification.",
                          failedAt: "Issuing Bank",
                          isTerminal: true,
                          code: "card_declined (issuer_declined)",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const declineScenarios = [
  {
    id: "insufficient-funds",
    title: "Insufficient Funds",
    icon: "DollarSign",
    path: ["root", "stripe-check", "passes-radar", "network-check", "valid-card", "issuer-check", "insufficient-funds"],
    color: "var(--backward-orange)",
  },
  {
    id: "fraud-block",
    title: "Fraud Detected",
    icon: "ShieldAlert",
    path: ["root", "stripe-check", "fraud-block"],
    color: "var(--accent-purple)",
  },
  {
    id: "expired-card",
    title: "Expired Card",
    icon: "CalendarX",
    path: ["root", "stripe-check", "passes-radar", "network-check", "valid-card", "issuer-check", "expired-card"],
    color: "var(--backward-orange)",
  },
  {
    id: "incorrect-cvc",
    title: "Incorrect CVC",
    icon: "KeyRound",
    path: ["root", "stripe-check", "passes-radar", "network-check", "valid-card", "issuer-check", "incorrect-cvc"],
    color: "var(--backward-orange)",
  },
  {
    id: "velocity-limit",
    title: "Velocity Limit",
    icon: "Gauge",
    path: ["root", "stripe-check", "passes-radar", "network-check", "valid-card", "issuer-check", "velocity-limit"],
    color: "var(--accent-amber)",
  },
  {
    id: "invalid-card",
    title: "Invalid Card Number",
    icon: "CreditCard",
    path: ["root", "stripe-check", "passes-radar", "network-check", "invalid-card"],
    color: "var(--backward-orange)",
  },
];
