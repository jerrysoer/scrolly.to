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
  defaultTheme: "light" | "dark";
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
    defaultTheme: "dark",
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

  "butterfly-metamorphosis-explainer": {
    slug: "butterfly-metamorphosis-explainer",
    section: "learn",
    title: "How Butterflies Transform",
    description:
      "An interactive explainer on metamorphosis — how a caterpillar dissolves into soup and rebuilds itself into a butterfly. Built with Scrolly.",
    ogDescription:
      "A caterpillar dissolves into soup and rebuilds itself into a butterfly. Here's how metamorphosis actually works.",
    keywords: [
      "metamorphosis",
      "butterfly",
      "chrysalis",
      "imaginal discs",
      "caterpillar",
      "insect transformation",
      "interactive explainer",
    ],
    category: "Biology",
    scopeName: "explainer-butterfly",
    themeKey: "butterfly-theme",
    defaultTheme: "light",
    datePublished: "2026-01-15",
    fonts: "education",
    faqs: [
      {
        question: "What happens inside a chrysalis?",
        answer:
          "The caterpillar releases enzymes that dissolve most of its body into a liquid. Only clusters called imaginal discs survive, and these rebuild into the butterfly's new body parts.",
      },
      {
        question: "What are imaginal discs?",
        answer:
          "Imaginal discs are pre-programmed cell clusters present from the caterpillar's egg stage. Each disc is destined to become a specific body part — wings, eyes, legs, antennae.",
      },
      {
        question: "Is a chrysalis the same as a cocoon?",
        answer:
          "No. A chrysalis is the hardened outer skin of a butterfly pupa. A cocoon is a silk casing spun by moths. Butterflies form chrysalises, moths spin cocoons.",
      },
      {
        question: "Can butterflies remember their caterpillar life?",
        answer:
          "Research at Georgetown University (2008) found that butterflies can retain aversive memories from their caterpillar stage, suggesting some neural pathways survive metamorphosis.",
      },
      {
        question: "How long does metamorphosis take?",
        answer:
          "Most butterflies complete metamorphosis in 10-14 days, though it varies by species and temperature. Monarchs take about 8-13 days.",
      },
    ],
    component: () =>
      import("@/components/explainers/butterfly/ExplainerApp"),
  },

  "how-eyes-see-color": {
    slug: "how-eyes-see-color",
    section: "learn",
    title: "How Your Eye Sees Color",
    description:
      "An interactive explainer on how cone cells, trichromacy, and your brain create the experience of color from light waves. Built with Scrolly.",
    ogDescription:
      "Color doesn't exist in the world. Your brain invents it from 3 types of cone cells. Here's how — with an RGB mixer you can play with.",
    keywords: [
      "color vision",
      "cone cells",
      "trichromacy",
      "how eyes work",
      "RGB color",
      "color blindness",
      "the dress",
      "interactive explainer",
    ],
    category: "Science",
    scopeName: "explainer-eyes",
    themeKey: "eyes-theme",
    defaultTheme: "light",
    datePublished: "2026-02-20",
    fonts: "education",
    faqs: [
      {
        question: "How do cone cells in the eye detect color?",
        answer:
          "Your retina contains three types of cone cells, each sensitive to different wavelengths of light: S-cones (short/blue, ~440nm peak), M-cones (medium/green, ~530nm peak), and L-cones (long/red, ~580nm peak). When light hits your retina, each cone type responds with a different signal strength. Your brain combines these three signals to create the perception of color.",
      },
      {
        question: "Why do we only have 3 types of cone cells?",
        answer:
          "Three cone types evolved as an efficient solution for survival. With just 3 detectors, the brain can distinguish roughly 1 million colors by comparing the relative activation of each cone type. Our 3-cone system is optimized for distinguishing ripe fruit from foliage — a critical survival advantage for primates.",
      },
      {
        question: "What is color blindness and how common is it?",
        answer:
          "Color blindness (color vision deficiency) occurs when one or more cone types are missing or shifted in sensitivity. About 8% of men and 0.5% of women have some form. The most common is red-green color blindness, where the L-cones or M-cones are affected.",
      },
      {
        question: "Do dogs see in black and white?",
        answer:
          "No! Dogs have 2 types of cone cells (blue and yellow), compared to our 3. They see a range of blues and yellows but cannot distinguish red from green. Their color vision is similar to a person with red-green color blindness.",
      },
      {
        question: "Why did people see different colors in 'The Dress'?",
        answer:
          "The viral dress photo had ambiguous lighting cues. Your brain constantly makes assumptions about the light source to determine 'true' color. People who assumed warm shadow saw white and gold. People who assumed cool bright light saw blue and black. The actual dress was blue and black.",
      },
      {
        question: "Does everyone see the same colors?",
        answer:
          "We can't know for certain. While most humans with normal vision have similar cone cell biology, the exact sensitivity varies by genetics. Whether your 'red' looks the same as someone else's 'red' is a philosophical question known as 'qualia' that science cannot definitively answer.",
      },
    ],
    component: () =>
      import("@/components/explainers/eyes/ExplainerApp"),
  },

  "going-back-to-the-moon": {
    slug: "going-back-to-the-moon",
    section: "learn",
    title: "Going Back to the Moon",
    description:
      "We went to the moon 50 years ago with less computing power than your calculator. An interactive explainer on why going back is harder — and way more ambitious.",
    ogDescription:
      "Artemis, Gateway, and the tech that makes a lunar return possible 50 years later.",
    keywords: [
      "artemis program",
      "moon landing",
      "lunar south pole",
      "SLS rocket",
      "space race",
      "NASA moon",
      "interactive explainer",
    ],
    category: "Space",
    scopeName: "explainer-moon",
    themeKey: "moon-explainer-theme",
    defaultTheme: "light",
    datePublished: "2026-02-01",
    fonts: "education",
    faqs: [
      {
        question: "Why did we stop going to the Moon?",
        answer:
          "After Apollo 17 in 1972, NASA's budget was slashed from 4.4% of federal spending to under 1%. The Cold War space race was won, public interest waned, and there was no political will to continue expensive lunar missions.",
      },
      {
        question: "What is the Artemis program?",
        answer:
          "Artemis is NASA's program to return humans to the Moon, land the first woman and first person of color on the lunar surface, and establish a sustainable presence including a lunar Gateway station and surface base camp.",
      },
      {
        question: "Why is the lunar south pole important?",
        answer:
          "The lunar south pole has permanently shadowed craters that contain water ice. This ice can be converted to drinking water, breathable oxygen, and rocket fuel — potentially reducing mission costs by up to 80%.",
      },
      {
        question: "How does the SLS rocket compare to Saturn V?",
        answer:
          "The Space Launch System produces 8.8 million pounds of thrust at liftoff, about 15% more than the Saturn V. It can carry 27 metric tons to the Moon, compared to Saturn V's 45 metric tons, but uses modern avionics and safety systems.",
      },
      {
        question: "Is China also going to the Moon?",
        answer:
          "Yes. China's CNSA plans to land astronauts on the Moon by 2030. They have already landed robotic missions on the far side (Chang'e 4) and returned samples (Chang'e 5), making them a serious contender in the new space race.",
      },
    ],
    component: () =>
      import("@/components/explainers/moon/ExplainerApp"),
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
