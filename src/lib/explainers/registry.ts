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

  "how-money-works": {
    slug: "how-money-works",
    section: "learn",
    title: "How Money Actually Works",
    description:
      "An interactive explainer on money — from barter to banks to Bitcoin, and why 97% of dollars are just numbers in a computer. Built with Scrolly.",
    ogDescription:
      "Most people have no idea where money comes from. Banks don't lend savings — they create money from nothing. Here's how it actually works.",
    keywords: [
      "how money works",
      "fractional reserve banking",
      "money creation",
      "fiat currency",
      "gold standard",
      "Federal Reserve",
      "inflation",
      "Bitcoin",
      "interactive explainer",
    ],
    category: "Economics",
    scopeName: "explainer-money",
    themeKey: "money-theme",
    defaultTheme: "light",
    datePublished: "2026-01-20",
    fonts: "education",
    faqs: [
      {
        question: "Where does money come from?",
        answer:
          "Most money is created by commercial banks when they issue loans. The bank doesn't transfer existing money — it types new numbers into the borrower's account, creating money that didn't exist before. About 97% of money in circulation is digital, created this way.",
      },
      {
        question: "Is the US dollar backed by gold?",
        answer:
          "No. The US dollar hasn't been backed by gold since August 15, 1971, when President Nixon ended the gold standard (the 'Nixon Shock'). Today's dollar is fiat money — its value comes from trust in the US government, not from any physical commodity.",
      },
      {
        question: "What causes inflation?",
        answer:
          "Inflation occurs when the money supply grows faster than the economy's output. When more money chases the same amount of goods, prices rise and each dollar buys less. Central banks like the Federal Reserve try to control this through interest rates.",
      },
      {
        question: "How is Bitcoin different from regular money?",
        answer:
          "Bitcoin's supply is fixed at 21 million coins and controlled by math (cryptographic algorithms), not by any government or bank. Regular money (fiat) can be created in unlimited quantities by banks and governments. Bitcoin requires trust in mathematics; dollars require trust in institutions.",
      },
      {
        question: "What does the Federal Reserve actually do?",
        answer:
          "The Federal Reserve sets interest rates that influence how much it costs to borrow money. Low rates make borrowing cheap (stimulating spending and growth), while high rates make borrowing expensive (cooling the economy and fighting inflation). It's like a thermostat for the economy.",
      },
    ],
    component: () =>
      import("@/components/explainers/money/ExplainerApp"),
  },

  "dinosaur-extinction": {
    slug: "dinosaur-extinction",
    section: "learn",
    title: "How Dinosaurs Went Extinct",
    description:
      "An interactive explainer on the Chicxulub asteroid impact — the first 24 hours, nuclear winter, and why some species survived while dinosaurs didn't. Built with Scrolly.",
    ogDescription:
      "66 million years ago, a rock the size of San Francisco hit Earth at 45,000 mph. Here's what happened in the first 24 hours — and the 10 million years after.",
    keywords: [
      "dinosaur extinction",
      "Chicxulub asteroid",
      "mass extinction",
      "K-Pg boundary",
      "nuclear winter",
      "asteroid impact",
      "dinosaurs",
      "interactive explainer",
    ],
    category: "Science",
    scopeName: "explainer-dino",
    themeKey: "dino-theme",
    defaultTheme: "light",
    datePublished: "2026-01-25",
    fonts: "education",
    faqs: [
      {
        question: "What actually killed the dinosaurs?",
        answer:
          "The asteroid impact itself killed everything within about 1,500 miles. But the real killer was what came next: the impact vaporized sulfur-rich rock, launching trillions of tons of aerosols into the stratosphere. This blocked sunlight for nearly two years, collapsing photosynthesis and the entire food chain from the bottom up.",
      },
      {
        question: "How do we know the Chicxulub crater caused the extinction?",
        answer:
          "A thin layer of iridium (rare on Earth but common in asteroids) marks the exact boundary between Cretaceous and Paleogene rock worldwide. The Chicxulub crater was discovered in 1978 beneath the Yucatan Peninsula and precisely matches the timing. Impact debris has been found on every continent, including Antarctica.",
      },
      {
        question: "Could a similar asteroid hit Earth today?",
        answer:
          "Yes, but we'd likely see it coming. NASA's Planetary Defense Coordination Office tracks near-Earth objects. The DART mission in 2022 successfully demonstrated asteroid deflection technology. No known asteroid poses a significant threat for the next 100+ years.",
      },
      {
        question: "Were all dinosaurs wiped out?",
        answer:
          "No. One group survived: the ancestors of modern birds. All roughly 10,000 living bird species are technically dinosaurs, classified within Dinosauria. A chicken is more closely related to T-Rex than T-Rex is to Stegosaurus, which lived 80 million years earlier.",
      },
      {
        question: "How long did it take for life to fully recover?",
        answer:
          "The nuclear winter lasted about 18-24 months, but full ecosystem recovery took roughly 10 million years. In the aftermath, mammals rapidly diversified into the ecological niches left empty by dinosaurs, eventually giving rise to whales, bats, primates, and eventually humans.",
      },
    ],
    component: () =>
      import("@/components/explainers/dino/ExplainerApp"),
  },

  "dividing-fractions": {
    slug: "dividing-fractions",
    section: "learn",
    title: "Dividing Fractions",
    description:
      "An interactive explainer on dividing fractions — why 'flip and multiply' works, with pizza slices, visual proofs, and practice problems. Built with Scrolly.",
    ogDescription:
      "Every 5th grader is taught to 'flip and multiply.' Almost none are told why it works. Here's the visual proof.",
    keywords: [
      "dividing fractions",
      "flip and multiply",
      "reciprocal",
      "fraction division",
      "math explainer",
      "visual math",
      "interactive explainer",
    ],
    category: "Math",
    scopeName: "explainer-fractions",
    themeKey: "fractions-theme",
    defaultTheme: "light",
    datePublished: "2026-01-10",
    fonts: "education",
    faqs: [
      {
        question: "Why do we flip and multiply when dividing fractions?",
        answer:
          "Dividing by a fraction asks 'how many groups of this size fit inside that amount?' Multiplying by the reciprocal gives the same answer because the reciprocal inverts the grouping. It's a mathematical shortcut, not a trick — it's the same question rephrased.",
      },
      {
        question: "What is a reciprocal?",
        answer:
          "A reciprocal is a fraction flipped upside down. The reciprocal of 3/4 is 4/3. The reciprocal of 2 (which is 2/1) is 1/2. Any number multiplied by its reciprocal equals 1.",
      },
      {
        question: "Why does dividing by a fraction give a bigger number?",
        answer:
          "When you divide by a number less than 1, you're asking how many small pieces fit inside. More small pieces fit than whole ones, so the answer is larger. For example, 6 divided by 1/2 = 12, because twelve halves fit inside 6 wholes.",
      },
      {
        question: "Does flip and multiply work for all fractions?",
        answer:
          "Yes. It works for proper fractions (like 3/4), improper fractions (like 7/3), mixed numbers (convert to improper first), and whole numbers (write as n/1). The rule is universal because it's based on the mathematical definition of division.",
      },
      {
        question: "How is dividing fractions used in real life?",
        answer:
          "Dividing fractions appears in cooking (how many 1/3 cup servings in 2 cups?), construction (how many 3/4 inch tiles fit in 6 inches?), time management (how many 1/2 hour meetings fit in 3 hours?), and anywhere you need to figure out how many parts fit into a whole.",
      },
    ],
    component: () =>
      import("@/components/explainers/fractions/ExplainerApp"),
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
