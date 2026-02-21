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

  // ── Batch 3: /learn (link swap) ──

  "fall-into-black-hole": {
    slug: "fall-into-black-hole",
    section: "learn",
    title: "Fall Into a Black Hole",
    description:
      "If you fell into a black hole, you'd be fine. The problem is everyone else's perspective. An interactive journey past the event horizon. Built with Scrolly.",
    ogDescription:
      "If you fell into a black hole, you'd be fine. The problem is everyone else's perspective.",
    keywords: [
      "black hole",
      "event horizon",
      "spaghettification",
      "time dilation",
      "Hawking radiation",
      "singularity",
      "interactive explainer",
      "scrollytelling",
    ],
    category: "Space",
    scopeName: "explainer-blackhole",
    themeKey: "blackhole-theme",
    defaultTheme: "dark",
    datePublished: "2025-12-15",
    fonts: "education",
    faqs: [
      {
        question: "What happens when you cross the event horizon?",
        answer:
          "From your perspective, nothing special — you wouldn't even notice. But from an outside observer's perspective, you'd appear to freeze at the event horizon, slowly redshifting until you fade from view.",
      },
      {
        question: "What is spaghettification?",
        answer:
          "Spaghettification is the stretching of objects into long thin shapes in a very strong gravitational field. The gravity at your feet is significantly stronger than at your head, pulling you apart like spaghetti.",
      },
      {
        question: "What is Hawking radiation?",
        answer:
          "Hawking radiation is thermal radiation predicted to be emitted by black holes due to quantum effects near the event horizon. It causes black holes to slowly evaporate over immense timescales.",
      },
    ],
    component: () =>
      import("@/components/explainers/blackhole/ExplainerApp"),
  },

  "roller-coaster-physics": {
    slug: "roller-coaster-physics",
    section: "learn",
    title: "Roller Coaster Physics",
    description:
      "At the top of a loop you're upside down at 60 mph with nothing holding you in but physics. Here's exactly why that's enough. Built with Scrolly.",
    ogDescription:
      "At the top of a loop you're upside down at 60 mph with nothing holding you in but physics. Here's exactly why that's enough.",
    keywords: [
      "roller coaster physics",
      "centripetal force",
      "potential energy",
      "kinetic energy",
      "g-force",
      "loop physics",
      "interactive explainer",
      "scrollytelling",
    ],
    category: "Physics",
    scopeName: "explainer-coaster",
    themeKey: "coaster-theme",
    defaultTheme: "dark",
    datePublished: "2025-12-20",
    fonts: "education",
    faqs: [
      {
        question: "Why don't you fall out at the top of a loop?",
        answer:
          "At the top of a loop, centripetal acceleration pushes you toward the center of the loop (downward). As long as the coaster moves fast enough, this inward force exceeds gravity, keeping you pressed into your seat.",
      },
      {
        question: "What is a g-force?",
        answer:
          "A g-force is a measurement of acceleration relative to gravity. 1g is normal gravity. At 2g you feel twice your weight. Roller coasters typically reach 3-6g in tight turns and loops.",
      },
    ],
    component: () =>
      import("@/components/explainers/coaster/ExplainerApp"),
  },

  "how-wifi-works": {
    slug: "how-wifi-works",
    section: "learn",
    title: "How WiFi Works",
    description:
      "WiFi is just invisible radio waves passing through your walls at the speed of light. Here's how your router actually turns cat videos into waves — and back again. Built with Scrolly.",
    ogDescription:
      "Your router is a radio station. Your phone is a decoder. Here's how cat videos become invisible waves.",
    keywords: [
      "WiFi",
      "wireless networking",
      "radio waves",
      "2.4 GHz",
      "5 GHz",
      "router",
      "electromagnetic spectrum",
      "interactive explainer",
      "scrollytelling",
    ],
    category: "Technology",
    scopeName: "explainer-wifi",
    themeKey: "wifi-theme",
    defaultTheme: "dark",
    datePublished: "2025-12-10",
    fonts: "education",
    faqs: [
      {
        question: "What is the difference between 2.4 GHz and 5 GHz WiFi?",
        answer:
          "2.4 GHz has longer range and better wall penetration but slower speeds and more interference. 5 GHz is faster with less interference but shorter range and weaker wall penetration.",
      },
      {
        question: "How does a WiFi router actually work?",
        answer:
          "A router converts digital data into radio waves using modulation. It encodes 1s and 0s as changes in the wave's amplitude, frequency, or phase. Your device's antenna picks up these waves and decodes them back into data.",
      },
    ],
    component: () =>
      import("@/components/explainers/wifi/ExplainerApp"),
  },

  "why-ai-hallucinate": {
    slug: "why-ai-hallucinate",
    section: "learn",
    title: "Why Do AIs Hallucinate?",
    description:
      "An interactive exploration of why AI language models confidently state false information — from token prediction mechanics to the 2023 lawyer case that shocked the legal world. Built with Scrolly.",
    ogDescription:
      "From token prediction to the lawyer who cited six fake cases — why AI confidently states false information.",
    keywords: [
      "AI hallucination",
      "LLM",
      "language model",
      "ChatGPT",
      "hallucination",
      "artificial intelligence",
      "interactive explainer",
    ],
    category: "AI",
    scopeName: "explainer-hallucinate",
    themeKey: "hallucinate-theme",
    defaultTheme: "light",
    datePublished: "2025-11-15",
    fonts: "education",
    faqs: [
      {
        question: "Why do AI models hallucinate?",
        answer:
          "AI language models predict the most likely next token based on patterns in training data. They don't 'know' facts — they generate plausible-sounding text. When the training data is sparse or ambiguous, the model fills gaps with confident-sounding but incorrect information.",
      },
      {
        question: "Can AI hallucinations be eliminated?",
        answer:
          "Not entirely with current architectures. Techniques like retrieval-augmented generation (RAG), chain-of-thought prompting, and human feedback help reduce hallucinations, but the fundamental prediction mechanism means some degree of confabulation is inherent.",
      },
    ],
    component: () =>
      import("@/components/explainers/hallucinate/ExplainerApp"),
  },

  "airline-credit-card-money": {
    slug: "airline-credit-card-money",
    section: "learn",
    title: "Airline Credit Card Money",
    description:
      "An interactive exploration of how airline loyalty programs became worth more than the airlines themselves — and why your miles are really an interest-free loan. Built with Scrolly.",
    ogDescription:
      "How airline loyalty programs became worth more than the airlines themselves — and why your miles are an interest-free loan.",
    keywords: [
      "airline loyalty programs",
      "MileagePlus valuation",
      "credit card miles",
      "airline revenue",
      "interactive explainer",
      "scrollytelling",
      "frequent flyer miles",
    ],
    category: "Business",
    scopeName: "explainer-airline",
    themeKey: "airline-theme",
    defaultTheme: "dark",
    datePublished: "2025-11-20",
    fonts: "dispatch",
    faqs: [
      {
        question: "Are airline loyalty programs worth more than the airlines?",
        answer:
          "Yes. United's MileagePlus program was valued at $22 billion — more than the airline itself. Delta's SkyMiles and American's AAdvantage show similar valuations. The loyalty programs are the real business; flying planes is almost a loss leader.",
      },
      {
        question: "Why are miles essentially an interest-free loan?",
        answer:
          "When you earn miles, the airline books future liability. You gave them money (via credit card spend) and they gave you a promise of future travel. Until you redeem, they hold your money interest-free — often for years.",
      },
    ],
    component: () =>
      import("@/components/explainers/airline/ExplainerApp"),
  },

  "gravity-explainer": {
    slug: "gravity-explainer",
    section: "learn",
    title: "What Is Gravity?",
    description:
      "An interactive exploration of gravity — from Newton's apple to Einstein's spacetime fabric. Why things fall, how orbits work, and what we still don't know. Built with Scrolly.",
    ogDescription:
      "From Newton's apple to Einstein's spacetime fabric — why things fall, how orbits work, and what we still don't know.",
    keywords: [
      "gravity",
      "general relativity",
      "spacetime",
      "Newton",
      "Einstein",
      "orbits",
      "gravitational waves",
      "interactive explainer",
    ],
    category: "Physics",
    scopeName: "explainer-gravity",
    themeKey: "gravity-theme",
    defaultTheme: "light",
    datePublished: "2025-11-10",
    fonts: "education",
    faqs: [
      {
        question: "What causes gravity?",
        answer:
          "According to Einstein's general relativity, massive objects bend spacetime around them. What we perceive as gravity is actually objects following the curved geometry of spacetime. The Earth doesn't 'pull' you — the space around it is curved, and you follow that curve.",
      },
      {
        question: "Why is there no quantum theory of gravity?",
        answer:
          "Gravity is incredibly weak compared to the other fundamental forces, making quantum gravitational effects nearly impossible to measure. The math of general relativity (smooth spacetime) and quantum mechanics (discrete particles) are fundamentally incompatible at the Planck scale.",
      },
    ],
    component: () =>
      import("@/components/explainers/gravity/ExplainerApp"),
  },

  // ── Batch 4: New /learn explainers ──

  "electoral-college-explainer": {
    slug: "electoral-college-explainer",
    section: "learn",
    title: "How the Electoral College Works",
    description:
      "An interactive, scroll-driven exploration of the Electoral College — from 538 electors and winner-take-all rules to swing states, faithless electors, and the popular vote debate. Built with Scrolly.",
    ogDescription:
      "538 electors, winner-take-all rules, swing states, and the popular vote debate — how the Electoral College actually works.",
    keywords: [
      "Electoral College",
      "US elections",
      "presidential election",
      "538 electors",
      "swing states",
      "interactive explainer",
      "scrollytelling",
    ],
    category: "Civics",
    scopeName: "explainer-electoral",
    themeKey: "electoral-theme",
    defaultTheme: "dark",
    datePublished: "2025-10-15",
    fonts: "education",
    faqs: [
      {
        question: "Why does the US use the Electoral College?",
        answer:
          "The Electoral College was a compromise at the 1787 Constitutional Convention between electing the president by Congress and by popular vote. It balanced power between large and small states and between federal and state authority.",
      },
      {
        question: "What is a faithless elector?",
        answer:
          "A faithless elector is a member of the Electoral College who doesn't vote for the candidate they were pledged to support. While rare, it has happened 165 times in US history. The Supreme Court ruled in 2020 that states can penalize or replace faithless electors.",
      },
    ],
    component: () =>
      import("@/components/explainers/electoral/ExplainerApp"),
  },

  "gps-explainer": {
    slug: "gps-explainer",
    section: "learn",
    title: "How GPS Knows Where You Are",
    description:
      "An interactive exploration of how 24 satellites 20,200 km above Earth pinpoint your location to within a few meters. From atomic clocks to trilateration. Built with Scrolly.",
    ogDescription:
      "24 satellites, atomic clocks, and the speed of light — how GPS pinpoints your location to within a few meters.",
    keywords: [
      "GPS",
      "satellite positioning",
      "trilateration",
      "atomic clocks",
      "navigation",
      "interactive explainer",
    ],
    category: "Technology",
    scopeName: "explainer-gps",
    themeKey: "gps-theme",
    defaultTheme: "light",
    datePublished: "2025-10-01",
    fonts: "education",
    faqs: [
      {
        question: "How many satellites does GPS need to find your location?",
        answer:
          "GPS needs signals from at least 4 satellites. Three satellites determine your position through trilateration (intersection of three spheres), and the fourth corrects for clock errors in your receiver.",
      },
      {
        question: "Why does GPS need atomic clocks?",
        answer:
          "GPS measures distance by timing how long radio signals take to travel from satellite to receiver. Light travels about 30 cm per nanosecond, so even tiny clock errors cause large position errors. A 1-microsecond error means 300 meters of position error.",
      },
    ],
    component: () =>
      import("@/components/explainers/gps/ExplainerApp"),
  },

  // ── Batch 5: /explore explainers ──

  "claude-code-skills-explainer": {
    slug: "claude-code-skills-explainer",
    section: "explore",
    title: "How Claude Code Skills Work",
    description:
      "An interactive, scroll-driven exploration of how Claude Code skills turn simple slash commands into powerful AI workflows — from SKILL.md anatomy to custom skill creation. Built with Scrolly.",
    ogDescription:
      "How Claude Code skills turn simple slash commands into powerful AI workflows.",
    keywords: [
      "Claude Code",
      "skills",
      "slash commands",
      "AI coding assistant",
      "interactive explainer",
      "SKILL.md",
      "Claude CLI",
    ],
    category: "Developer Tools",
    scopeName: "explainer-claude-skills",
    themeKey: "claude-skills-theme",
    defaultTheme: "light",
    datePublished: "2025-11-01",
    fonts: "default",
    component: () =>
      import("@/components/explainers/claude-skills/ExplainerApp"),
  },

  "git-worktrees-explainer": {
    slug: "git-worktrees-explainer",
    section: "explore",
    title: "Git Worktrees",
    description:
      "An interactive, scroll-driven exploration of git worktrees — how to work on multiple branches simultaneously without stashing or cloning. Built with Scrolly.",
    ogDescription:
      "Work on multiple branches simultaneously without stashing or cloning — git worktrees explained.",
    keywords: [
      "git worktrees",
      "git worktree tutorial",
      "parallel branch development",
      "git workflow",
      "git commands",
      "software development",
      "version control",
    ],
    category: "Developer Tools",
    scopeName: "explainer-worktrees",
    themeKey: "worktrees-theme",
    defaultTheme: "light",
    datePublished: "2025-10-20",
    fonts: "education",
    component: () =>
      import("@/components/explainers/worktrees/ExplainerApp"),
  },

  "microgpt-explainer": {
    slug: "microgpt-explainer",
    section: "explore",
    title: "MicroGPT — The Complete Algorithm",
    description:
      "An interactive visual explainer of Andrej Karpathy's MicroGPT — walk through tokenization, embeddings, attention, backpropagation, and generation step by step. Built with Scrolly.",
    ogDescription:
      "Walk through tokenization, embeddings, attention, backpropagation, and generation step by step.",
    keywords: [
      "MicroGPT",
      "GPT explainer",
      "transformer explained",
      "attention mechanism",
      "backpropagation",
      "tokenization",
      "Andrej Karpathy",
      "neural network",
      "machine learning",
      "interactive tutorial",
    ],
    category: "Machine Learning",
    scopeName: "explainer-microgpt",
    themeKey: "microgpt-theme",
    defaultTheme: "light",
    datePublished: "2025-09-15",
    fonts: "dispatch",
    component: () =>
      import("@/components/explainers/microgpt/ExplainerApp"),
  },

  "oauth2-explainer": {
    slug: "oauth2-explainer",
    section: "explore",
    title: "How OAuth 2.0 Actually Works",
    description:
      "An interactive, scroll-driven exploration of OAuth 2.0 — from the password-sharing problem to authorization codes, tokens, PKCE, and real-world flows. Built with Scrolly.",
    ogDescription:
      "From the password-sharing problem to authorization codes, tokens, PKCE, and real-world flows.",
    keywords: [
      "OAuth 2.0",
      "authorization",
      "PKCE",
      "access tokens",
      "interactive explainer",
      "scrollytelling",
      "authentication",
    ],
    category: "Security",
    scopeName: "explainer-oauth2",
    themeKey: "oauth2-theme",
    defaultTheme: "dark",
    datePublished: "2025-10-10",
    fonts: "education",
    component: () =>
      import("@/components/explainers/oauth2/ExplainerApp"),
  },

  "openclaw-explainer": {
    slug: "openclaw-explainer",
    section: "explore",
    title: "How OpenClaw Works",
    description:
      "An interactive, scroll-driven exploration of how OpenClaw turns your chat apps into an AI command center — from message to gateway to LLM to action. Built with Scrolly.",
    ogDescription:
      "How OpenClaw turns your chat apps into an AI command center.",
    keywords: [
      "OpenClaw",
      "ClawdBot",
      "AI agent",
      "personal AI assistant",
      "interactive explainer",
      "scrollytelling",
      "self-hosted AI",
    ],
    category: "AI Infrastructure",
    scopeName: "explainer-openclaw",
    themeKey: "openclaw-theme",
    defaultTheme: "dark",
    datePublished: "2025-09-20",
    fonts: "dispatch",
    component: () =>
      import("@/components/explainers/openclaw/ExplainerApp"),
  },

  "precision-recall-explainer": {
    slug: "precision-recall-explainer",
    section: "explore",
    title: "Precision vs Recall",
    description:
      "Learn the precision-recall tradeoff through interactive examples: spam filters, cancer screening, self-driving cars, fraud detection, and more. Includes confusion matrix visualizer and quiz. Built with Scrolly.",
    ogDescription:
      "The precision-recall tradeoff through interactive examples — spam filters, cancer screening, self-driving cars, and more.",
    keywords: [
      "precision recall",
      "machine learning",
      "classification metrics",
      "confusion matrix",
      "F1 score",
      "data science",
      "interactive tutorial",
      "ML fundamentals",
    ],
    category: "Machine Learning",
    scopeName: "explainer-precision-recall",
    themeKey: "precision-recall-theme",
    defaultTheme: "light",
    datePublished: "2025-09-01",
    fonts: "default",
    component: () =>
      import("@/components/explainers/precision-recall/ExplainerApp"),
  },

  "seed2-explainer": {
    slug: "seed2-explainer",
    section: "explore",
    title: "Seed2.0 — ByteDance's Frontier LLM",
    description:
      "Explore how ByteDance's Seed2.0 matches GPT-5.2, Claude Opus, and Gemini-3-Pro at a fraction of the cost. Interactive benchmarks, pricing calculators, and capability breakdowns. Built with Scrolly.",
    ogDescription:
      "ByteDance's Seed2.0 matches frontier models at 1/10th the cost. Interactive benchmarks and pricing comparisons.",
    keywords: [
      "Seed2.0",
      "ByteDance",
      "LLM",
      "AI model comparison",
      "GPT-5.2 alternative",
      "Claude Opus comparison",
      "frontier model",
      "AI pricing",
      "interactive explainer",
    ],
    category: "AI Industry",
    scopeName: "explainer-seed2",
    themeKey: "seed2-theme",
    defaultTheme: "dark",
    datePublished: "2026-02-10",
    fonts: "dispatch",
    component: () =>
      import("@/components/explainers/seed2/ExplainerApp"),
  },

  "stripe-payments-explainer": {
    slug: "stripe-payments-explainer",
    section: "explore",
    title: "How Stripe Processes a Payment",
    description:
      "An interactive deep-dive into what happens in the ~2 seconds between clicking 'Pay' and seeing 'Payment Confirmed.' From card tokenization to bank settlement. Built with Scrolly.",
    ogDescription:
      "What happens in the ~2 seconds between clicking 'Pay' and seeing 'Payment Confirmed.'",
    keywords: [
      "Stripe",
      "payment processing",
      "card tokenization",
      "bank settlement",
      "PCI DSS",
      "interactive explainer",
      "fintech",
    ],
    category: "Fintech",
    scopeName: "explainer-stripe",
    themeKey: "stripe-theme",
    defaultTheme: "light",
    datePublished: "2025-08-15",
    fonts: "dispatch",
    component: () =>
      import("@/components/explainers/stripe/ExplainerApp"),
  },

  "tiktok-algorithm-explainer": {
    slug: "tiktok-algorithm-explainer",
    section: "explore",
    title: "How TikTok's Algorithm Works",
    description:
      "Explore how TikTok's recommendation algorithm learns your preferences in minutes. Interactive visualizations of signal weights, interest graphs, cold start mechanics, and filter bubble dynamics. Built with Scrolly.",
    ogDescription:
      "How TikTok's recommendation algorithm learns your preferences in minutes.",
    keywords: [
      "TikTok algorithm",
      "recommendation system",
      "For You page",
      "interest graph",
      "social media algorithm",
      "content recommendation",
      "machine learning",
      "filter bubble",
      "interactive explainer",
    ],
    category: "Algorithms",
    scopeName: "explainer-tiktok",
    themeKey: "tiktok-theme",
    defaultTheme: "dark",
    datePublished: "2025-09-10",
    fonts: "dispatch",
    component: () =>
      import("@/components/explainers/tiktok/ExplainerApp"),
  },

  "tortoise-hare-explainer": {
    slug: "tortoise-hare-explainer",
    section: "explore",
    title: "The Tortoise and the Hare",
    description:
      "An editorial, data-driven exploration of Aesop's classic fable. Interactive visualizations reveal what a 2,500-year-old story teaches about compounding, consistency, and the myth of talent. Built with Scrolly.",
    ogDescription:
      "What a 2,500-year-old fable teaches about compounding, consistency, and the myth of talent.",
    keywords: [
      "tortoise and hare",
      "consistency",
      "compounding",
      "interactive fable",
      "data visualization",
      "atomic habits",
      "kaizen",
    ],
    category: "Strategy",
    scopeName: "explainer-tortoise-hare",
    themeKey: "tortoise-hare-theme",
    defaultTheme: "light",
    datePublished: "2025-08-20",
    fonts: "dispatch",
    component: () =>
      import("@/components/explainers/tortoise-hare/ExplainerApp"),
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
