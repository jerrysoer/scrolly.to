export interface WebhookEvent {
  id: string;
  type: string;
  created: number;
  description: string;
  timing: string;
  payload: Record<string, unknown>;
}

export const webhookEvents: WebhookEvent[] = [
  {
    id: "evt_1",
    type: "payment_intent.created",
    created: 1708300800,
    description:
      "Fired when the merchant's server creates a PaymentIntent. This is the starting signal — Stripe now knows a payment is being attempted.",
    timing: "T+0ms",
    payload: {
      id: "pi_3OpQ1rKZ6xk9N2yh1abc2def",
      object: "payment_intent",
      amount: 4999,
      currency: "usd",
      status: "requires_payment_method",
      created: 1708300800,
      metadata: {
        order_id: "ord_8x7k2m",
        customer_email: "alex@example.com",
      },
      payment_method_types: ["card"],
      client_secret: "pi_3OpQ1rKZ6xk9N2yh1abc2def_secret_xyz",
    },
  },
  {
    id: "evt_2",
    type: "payment_intent.requires_action",
    created: 1708300801,
    description:
      "Fired if 3D Secure authentication is required. The customer needs to verify their identity through their bank's authentication flow (SMS code, biometric, etc.).",
    timing: "T+200ms",
    payload: {
      id: "pi_3OpQ1rKZ6xk9N2yh1abc2def",
      object: "payment_intent",
      amount: 4999,
      currency: "usd",
      status: "requires_action",
      next_action: {
        type: "use_stripe_sdk",
        use_stripe_sdk: {
          type: "three_d_secure_redirect",
          stripe_js: "https://hooks.stripe.com/3d_secure_2/authenticate",
        },
      },
      payment_method: "pm_1OpQ1sKZ6xk9N2yh",
    },
  },
  {
    id: "evt_3",
    type: "charge.succeeded",
    created: 1708300802,
    description:
      "The core event. The charge was successfully authorized by the issuing bank. Funds are now held on the customer's card. This is where most merchants update order status.",
    timing: "T+800ms",
    payload: {
      id: "ch_3OpQ1rKZ6xk9N2yh1ghi3jkl",
      object: "charge",
      amount: 4999,
      currency: "usd",
      status: "succeeded",
      paid: true,
      payment_intent: "pi_3OpQ1rKZ6xk9N2yh1abc2def",
      payment_method: "pm_1OpQ1sKZ6xk9N2yh",
      payment_method_details: {
        card: {
          brand: "visa",
          last4: "4242",
          exp_month: 12,
          exp_year: 2026,
          funding: "credit",
          network: "visa",
          country: "US",
        },
        type: "card",
      },
      billing_details: {
        name: "Alex Johnson",
        email: "alex@example.com",
      },
      outcome: {
        network_status: "approved_by_network",
        risk_level: "normal",
        risk_score: 23,
        seller_message: "Payment complete.",
        type: "authorized",
      },
    },
  },
  {
    id: "evt_4",
    type: "payment_intent.succeeded",
    created: 1708300803,
    description:
      "The PaymentIntent lifecycle is complete. This confirms the entire payment flow succeeded. Safe to fulfill the order, send confirmation emails, and update your database.",
    timing: "T+850ms",
    payload: {
      id: "pi_3OpQ1rKZ6xk9N2yh1abc2def",
      object: "payment_intent",
      amount: 4999,
      amount_received: 4999,
      currency: "usd",
      status: "succeeded",
      charges: {
        data: [
          {
            id: "ch_3OpQ1rKZ6xk9N2yh1ghi3jkl",
            status: "succeeded",
            amount: 4999,
          },
        ],
      },
      latest_charge: "ch_3OpQ1rKZ6xk9N2yh1ghi3jkl",
      payment_method: "pm_1OpQ1sKZ6xk9N2yh",
      metadata: {
        order_id: "ord_8x7k2m",
        customer_email: "alex@example.com",
      },
    },
  },
  {
    id: "evt_5",
    type: "balance.available",
    created: 1708387200,
    description:
      "Funds are available in the merchant's Stripe balance. This typically fires 2 business days after the charge. The merchant can now initiate a payout to their bank account.",
    timing: "T+2 days",
    payload: {
      object: "balance",
      available: [
        {
          amount: 485670,
          currency: "usd",
          source_types: {
            card: 485670,
          },
        },
      ],
      pending: [
        {
          amount: 12450,
          currency: "usd",
          source_types: {
            card: 12450,
          },
        },
      ],
      livemode: true,
    },
  },
];

export const webhookHeaders = {
  "Stripe-Signature":
    "t=1708300800,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd",
  "Content-Type": "application/json",
  "User-Agent": "Stripe/1.0 (+https://stripe.com/docs/webhooks)",
};
