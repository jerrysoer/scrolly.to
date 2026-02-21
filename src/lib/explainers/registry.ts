import type { Metadata } from "next";

export type Section = "learn" | "explore";

export interface ExplainerFaq {
  question: string;
  answer: string;
}

export interface ExplainerConfig {
  slug: string;
  section: Section;
  title: string;
  description: string;
  ogDescription?: string;
  keywords: string[];
  category: string;
  scopeName: string;
  themeKey: string;
  datePublished: string;
  fonts: "dispatch" | "education" | "default";
  faqs?: ExplainerFaq[];
  component: () => Promise<{ default: React.ComponentType }>;
}

// ── All explainers ──

export const explainers: Record<string, ExplainerConfig> = {
  "how-tariffs-actually-work": {
    slug: "how-tariffs-actually-work",
    section: "learn",
    title: "How Tariffs Actually Work",
    description:
      "An interactive explainer on tariffs, who pays them, and what the Supreme Court's 6-3 ruling means for trade. Built with Scrolly.",
    ogDescription:
      "Most people think foreign countries pay tariffs. They don't. Here's how tariffs actually work — and what the Supreme Court just changed.",
    keywords: [
      "tariffs",
      "trade",
      "SCOTUS",
      "IEEPA",
      "Supreme Court tariffs",
      "who pays tariffs",
      "tariff explainer",
      "interactive explainer",
      "Liberation Day tariffs",
    ],
    category: "Economics",
    scopeName: "explainer-tariffs",
    themeKey: "tariffs-theme",
    datePublished: "2026-02-20",
    fonts: "dispatch",
    faqs: [
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
        question:
          "Are all of Trump's tariffs gone after the SCOTUS ruling?",
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
    ],
    component: () =>
      import("@/components/explainers/tariffs/ExplainerApp"),
  },
};

// ── Helpers ──

export function getBySection(s: Section): ExplainerConfig[] {
  return Object.values(explainers).filter((e) => e.section === s);
}

export function getSlugs(): string[] {
  return Object.keys(explainers);
}

export function getSlugsBySection(s: Section): string[] {
  return getBySection(s).map((e) => e.slug);
}

export function getExplainer(slug: string): ExplainerConfig | undefined {
  return explainers[slug];
}

// ── Metadata generator ──

export function generateExplainerMetadata(
  slug: string,
  section: Section
): Metadata {
  const config = explainers[slug];
  if (!config) {
    return { title: "Not Found" };
  }

  const canonical = `https://scrolly.to/${section}/${slug}`;

  return {
    title: `${config.title} — Interactive Explainer`,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.ogDescription ?? config.description,
      type: "article",
      locale: "en_US",
      siteName: "Scrolly",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.ogDescription ?? config.description,
    },
    robots: { index: true, follow: true },
  };
}
