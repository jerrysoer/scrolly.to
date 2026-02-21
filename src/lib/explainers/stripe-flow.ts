export interface FlowStep {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  detail: string;
  timing: string;
  timingMs: number;
  direction: "forward" | "backward";
}

export const authorizationFlow: FlowStep[] = [
  {
    id: "customer",
    label: "Customer",
    shortLabel: "Customer",
    description: "Clicks \"Pay\" and submits payment",
    detail:
      "The customer enters their card details on the merchant's checkout page. Stripe.js running in the browser collects the card number, expiry, and CVC — and immediately tokenizes it client-side before it ever touches the merchant's server.",
    timing: "0ms",
    timingMs: 0,
    direction: "forward",
  },
  {
    id: "merchant",
    label: "Merchant Server",
    shortLabel: "Merchant",
    description: "Creates a PaymentIntent with the token",
    detail:
      "The merchant's backend receives the token (tok_xxx) and calls Stripe's API to create a PaymentIntent. The merchant never sees or handles the raw card number — only the token. This keeps them out of PCI scope.",
    timing: "~50ms",
    timingMs: 50,
    direction: "forward",
  },
  {
    id: "stripe",
    label: "Stripe",
    shortLabel: "Stripe",
    description: "Validates, runs fraud checks, routes to acquirer",
    detail:
      "Stripe receives the PaymentIntent, decrypts the token to retrieve card details, runs Radar fraud checks (ML models analyzing 1,000+ signals), determines the optimal acquiring bank, and formats the authorization request for the card network.",
    timing: "~100ms",
    timingMs: 100,
    direction: "forward",
  },
  {
    id: "acquirer",
    label: "Acquiring Bank",
    shortLabel: "Acquirer",
    description: "Forwards authorization to card network",
    detail:
      "The acquiring bank (Stripe's banking partner) receives the authorization request and forwards it to the appropriate card network (Visa, Mastercard, etc.). The acquirer is the merchant's bank — they take on the risk of processing the transaction.",
    timing: "~150ms",
    timingMs: 150,
    direction: "forward",
  },
  {
    id: "network",
    label: "Card Network",
    shortLabel: "Visa / MC",
    description: "Routes to the issuing bank",
    detail:
      "The card network (Visa, Mastercard, Amex) acts as a router. It identifies which bank issued the customer's card using the BIN (first 6-8 digits), applies its own fraud rules, and forwards the authorization request to the issuing bank. This happens in ~30ms.",
    timing: "~200ms",
    timingMs: 200,
    direction: "forward",
  },
  {
    id: "issuer",
    label: "Issuing Bank",
    shortLabel: "Issuer",
    description: "Checks balance, fraud, and approves/declines",
    detail:
      "The issuing bank (customer's bank) performs the final checks: Does the account have sufficient funds? Does this transaction match the cardholder's spending patterns? Is the CVC correct? Is the card expired? If everything passes, it places a hold on the funds and sends back an approval code.",
    timing: "~350ms",
    timingMs: 350,
    direction: "forward",
  },
  {
    id: "network-back",
    label: "Card Network",
    shortLabel: "Visa / MC",
    description: "Relays approval back to acquirer",
    detail:
      "The card network receives the issuer's response (approved or declined) and relays it back through the chain. It also logs the transaction for settlement processing that happens later in the day.",
    timing: "~500ms",
    timingMs: 500,
    direction: "backward",
  },
  {
    id: "acquirer-back",
    label: "Acquiring Bank",
    shortLabel: "Acquirer",
    description: "Passes response to Stripe",
    detail:
      "The acquiring bank receives the authorization response and forwards it to Stripe. If approved, the acquirer records the transaction for batch settlement. The acquirer earns a small portion of the interchange fee.",
    timing: "~600ms",
    timingMs: 600,
    direction: "backward",
  },
  {
    id: "stripe-back",
    label: "Stripe",
    shortLabel: "Stripe",
    description: "Updates PaymentIntent, fires webhooks",
    detail:
      "Stripe receives the authorization result, updates the PaymentIntent status to 'succeeded' or 'requires_action', fires webhooks to notify the merchant (payment_intent.succeeded), and returns the result to the client. Stripe also logs everything for the Dashboard.",
    timing: "~700ms",
    timingMs: 700,
    direction: "backward",
  },
  {
    id: "customer-confirmed",
    label: "Customer",
    shortLabel: "Customer",
    description: "Sees \"Payment Confirmed\" on screen",
    detail:
      "The customer sees the confirmation message. The entire round trip took under 2 seconds. The funds are now held (authorized) on their card but haven't actually moved yet — settlement happens 1-2 business days later through a separate batch process.",
    timing: "~800ms",
    timingMs: 800,
    direction: "backward",
  },
];

export const flowNodes = [
  { id: "customer", label: "Customer", icon: "User" },
  { id: "merchant", label: "Merchant", icon: "Store" },
  { id: "stripe", label: "Stripe", icon: "Zap" },
  { id: "acquirer", label: "Acquiring Bank", icon: "Landmark" },
  { id: "network", label: "Card Network", icon: "Network" },
  { id: "issuer", label: "Issuing Bank", icon: "Building2" },
] as const;
