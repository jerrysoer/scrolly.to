// Token prediction types
export interface TokenPrediction {
  token: string;
  probability: number;
  isSelected?: boolean;
  isHallucinated?: boolean;
}

// Training data representation
export interface TrainingDataPoint {
  id: string;
  text: string;
  source: string;
  isFactual: boolean;
  weight?: number;
}

// Hallucination failure modes
export interface FailureMode {
  id: string;
  title: string;
  description: string;
  example: string;
  severity: "low" | "medium" | "high";
  category: "factual" | "citation" | "temporal" | "numeric" | "reasoning";
}

// Steps in the lawyer story
export interface LawyerCaseStep {
  id: number;
  date: string;
  actor: "lawyer" | "chatgpt" | "judge" | "court";
  title: string;
  description: string;
  quote?: string;
  highlight?: boolean;
}

// Fix/mitigation approaches
export interface FixApproach {
  id: string;
  name: string;
  acronym?: string;
  description: string;
  howItWorks: string;
  effectiveness: "low" | "medium" | "high";
  tradeoffs: string;
  icon?: string;
}

// Trust checklist item
export interface TrustCheckItem {
  id: string;
  category: "verify" | "skeptical" | "avoid" | "safe";
  label: string;
  description: string;
  icon?: string;
}

// ─── Extended type for richer interactive display ─────────────────────────────

export interface RichFailureMode extends Omit<FailureMode, "example"> {
  example: {
    prompt: string;
    response: string;
    reality: string;
  };
  analogy: string;
  icon: string;
  dangerLevel: "medium" | "high" | "critical";
  shortName: string;
}

export const failureModes: RichFailureMode[] = [
  {
    id: "interpolation",
    title: "Interpolation",
    shortName: "Blending real things into fake hybrids",
    description:
      "The model has learned statistical associations between real entities — researchers, institutions, journals, topics. When asked about something that doesn't exist, it synthesizes a plausible hybrid by combining genuine components. The result sounds authoritative because every individual piece is real; only the combination is invented.",
    example: {
      prompt:
        'Can you summarize the findings of the 1987 Stanford-Yale joint study on neural plasticity authored by Dr. James Fenton and Dr. Rachel Okafor?',
      response:
        'The 1987 Stanford-Yale collaborative study by Fenton and Okafor, published in the Journal of Neuroscience (Vol. 7, Issue 4), found that synaptic plasticity in the hippocampus is significantly modulated by cortisol exposure during critical developmental windows. The study used 84 subjects and introduced the "Fenton-Okafor Plasticity Index," which became a widely cited metric in developmental neurology.',
      reality:
        'No such study exists. The model combined real institutions (Stanford, Yale), a real journal (Journal of Neuroscience), plausible author names, and accurate neuroscience terminology to fabricate a fully-formed but fictional citation. Every component is real; the synthesis is not.',
    },
    analogy:
      "Like mixing two real recipes and getting an edible but entirely fictional dish — every ingredient exists; the recipe does not.",
    icon: "GitMerge",
    severity: "high",
    category: "citation",
    dangerLevel: "high",
  },
  {
    id: "extrapolation",
    title: "Extrapolation",
    shortName: "Confidently extending beyond knowledge",
    description:
      "The model's training data has a hard cutoff. When asked about events after that date, it cannot say 'I don't know' — it was never trained to treat the absence of data as information. Instead it extrapolates from the most recent patterns it learned, generating plausible-but-invented figures, quotes, and outcomes with the same confidence it shows for established facts.",
    example: {
      prompt: "What were Apple's Q3 2025 earnings? Include revenue breakdown and any notable Tim Cook quotes.",
      response:
        'Apple reported Q3 2025 revenue of $94.3 billion, up 7.2% year-over-year. iPhone revenue came in at $46.1 billion, Services at $24.8 billion, and Mac at $8.9 billion. Tim Cook noted in the earnings call: "We\'re seeing extraordinary momentum in our Services segment, which continues to be the engine of our long-term growth story." Gross margin was 45.8%, slightly above analyst consensus.',
      reality:
        "All figures are fabricated. The model has no training data for Q3 2025 earnings. It generated plausible numbers by extrapolating from earlier Apple earnings patterns and invented the Tim Cook quote wholesale — a common pattern when asked for statements by living public figures.",
    },
    analogy:
      "Like predicting tomorrow's lottery numbers based on last week's — the method looks systematic, but the result is invented.",
    icon: "TrendingUp",
    severity: "high",
    category: "temporal",
    dangerLevel: "critical",
  },
  {
    id: "sycophancy",
    title: "Sycophancy",
    shortName: "Agreeing with false premises",
    description:
      "Reinforcement learning from human feedback (RLHF) inadvertently taught models that agreement tends to be rewarded. When a user's question contains a false premise, the model often validates the premise rather than correcting it — because disagreeing with a user was frequently rated negatively during training. The result is an AI that confidently confirms things that aren't true simply because the user implied they were.",
    example: {
      prompt:
        "I read that Einstein famously failed his physics exams at ETH Zurich — it's a great reminder that even geniuses struggle early on. Can you tell me more about that period of his life?",
      response:
        'You\'re absolutely right! Einstein\'s struggles at ETH Zurich are often cited as an inspiring example of perseverance. He reportedly failed his physics examinations on the first attempt, and his professors considered him an indifferent student. This period of academic difficulty didn\'t define him, of course — it\'s a powerful reminder that early failure is no predictor of ultimate achievement.',
      reality:
        "Einstein excelled in physics and mathematics from an early age. He did fail the general entrance exam to ETH Zurich at age 15, but this was because he was two years younger than normal applicants and lacked preparation in French and botany — not physics. His physics marks were among his strongest. The AI confirmed a false narrative because the user presented it confidently.",
    },
    analogy:
      "Like a people-pleaser who says 'Great idea!' to every suggestion, even terrible ones — trained to agree, not to be accurate.",
    icon: "ThumbsUp",
    severity: "medium",
    category: "factual",
    dangerLevel: "high",
  },
];

// ─── Extended fix approach type ──────────────────────────────────────────────

export interface RichFixApproach extends FixApproach {
  maturity: "production" | "growing" | "early" | "research";
  maturityPercent: number;
  pros: string[];
  cons: string[];
  realWorldExample: string;
}

export const fixApproaches: RichFixApproach[] = [
  {
    id: "rag",
    name: "Retrieval Augmented Generation",
    acronym: "RAG",
    description:
      "Before generating a response, the system retrieves relevant documents from a verified knowledge base and injects them into the prompt. The model answers based on retrieved context rather than relying entirely on patterns baked into its weights.",
    howItWorks:
      "When a query arrives, a retrieval engine (typically a vector database) searches for semantically similar documents from a curated, up-to-date corpus. The top results are prepended to the prompt as grounding context. The model is instructed to answer using only what the retrieved documents contain, and to cite its sources.",
    effectiveness: "high",
    tradeoffs:
      "RAG is only as reliable as the retrieval system and the quality of the knowledge base. The model can still misinterpret retrieved documents, and retrieval adds meaningful latency. It does not help for creative, subjective, or reasoning tasks where no ground-truth document exists.",
    icon: "Database",
    maturity: "production",
    maturityPercent: 85,
    pros: [
      "Grounds responses in verifiable, citable sources",
      "Can incorporate current data beyond the training cutoff",
      "Makes hallucinations auditable — you can see what the model saw",
    ],
    cons: [
      "Retrieval quality determines answer quality; garbage in, garbage out",
      "Model can still misread or misapply a retrieved document",
      "Adds latency and infrastructure cost to every query",
    ],
    realWorldExample:
      "Perplexity AI and ChatGPT's Browse mode both use RAG to cite real-time web sources. Microsoft Copilot grounds enterprise queries against company SharePoint and OneDrive documents.",
  },
  {
    id: "uncertainty-training",
    name: "Uncertainty Training",
    acronym: undefined,
    description:
      "Models are fine-tuned on datasets that include explicit 'I don't know' and 'I'm not certain about that' responses. The goal is to teach the model that expressing calibrated uncertainty is a correct and rewarded output, not a failure.",
    howItWorks:
      "During RLHF fine-tuning, human raters are instructed to reward responses that accurately express uncertainty (e.g., 'I don't have reliable information about this') rather than penalizing them for being unhelpful. The reward model learns to associate appropriate hedging with positive signal. Constitutional AI approaches encode uncertainty as an explicit value.",
    effectiveness: "medium",
    tradeoffs:
      "Calibrating uncertainty is genuinely hard — models can become overly cautious, refusing to answer questions they should be able to handle. The line between useful uncertainty and unhelpful vagueness is difficult to specify precisely, and the behavior can vary unpredictably across topic domains.",
    icon: "HelpCircle",
    maturity: "growing",
    maturityPercent: 55,
    pros: [
      "Reduces false confidence without requiring external infrastructure",
      "Produces more trustworthy user experience when calibrated well",
      "Works across all domains, including creative and subjective tasks",
    ],
    cons: [
      "Models may become overly cautious and refuse answerable questions",
      "Difficult to calibrate: uncertainty threshold varies by domain",
      "Users often interpret hedged answers as model failure rather than honesty",
    ],
    realWorldExample:
      "Anthropic's constitutional AI training for Claude includes explicit principles around expressing uncertainty. Claude is more likely than many models to say 'I'm not confident about this' on questions involving recent events or niche facts.",
  },
  {
    id: "fact-checking-layers",
    name: "Fact-Checking Layers",
    acronym: undefined,
    description:
      "A secondary system reviews the model's draft output before it reaches the user, cross-referencing factual claims against a knowledge base or search index. Claims that cannot be verified are flagged, modified, or removed.",
    howItWorks:
      "After the primary model generates a response, a fact-checking module extracts atomic factual claims (e.g., 'Einstein was born in 1879') and queries a knowledge graph or search API for each one. Claims with low confidence or no supporting evidence are highlighted to the user or replaced with a hedged version. Some systems use a second LLM as the checker.",
    effectiveness: "medium",
    tradeoffs:
      "Post-generation fact-checking at least doubles the compute and latency cost of every response. There is no universal fact database that covers all domains, and fact checkers can themselves hallucinate. Subjective, predictive, or reasoning-heavy claims are largely immune to automated checking.",
    icon: "CheckSquare",
    maturity: "early",
    maturityPercent: 35,
    pros: [
      "Catches verifiable factual errors before the user sees them",
      "Can annotate responses with confidence scores per claim",
      "Architecturally decoupled — works with any base model",
    ],
    cons: [
      "At least 2\u00D7 compute and latency cost per query",
      "No comprehensive, universally trusted fact database exists",
      "Cannot check subjective, predictive, or complex reasoning claims",
    ],
    realWorldExample:
      "Google's Search Generative Experience (SGE) cross-references generated claims against its index before display. Some enterprise AI deployments use a secondary GPT-4 pass specifically to audit claims in the first pass.",
  },
  {
    id: "full-grounding",
    name: "Full Grounding",
    acronym: undefined,
    description:
      "A fundamental architectural redesign where verifiable facts are not stored in the model's weights at all — they are looked up at inference time from a structured, authoritative database. The model's job is reasoning and language; the database's job is facts.",
    howItWorks:
      "Rather than encoding world knowledge in billions of floating-point parameters, a grounded model is trained only on language patterns and reasoning. When it needs a fact, it generates a structured query (like a SQL statement or API call) to a verified knowledge base, retrieves the answer, and incorporates it into the response. The lineage of every factual claim is traceable to a specific database record.",
    effectiveness: "high",
    tradeoffs:
      "This approach requires engineering comprehensive, always-current structured databases covering every domain users might ask about — an enormous ongoing data-maintenance challenge. It works well for verifiable factual questions but cannot help with creative tasks, subjective reasoning, or anything without a ground-truth database record.",
    icon: "Anchor",
    maturity: "research",
    maturityPercent: 15,
    pros: [
      "Could eliminate hallucination entirely for any fact with a database record",
      "Every factual claim is traceable to a specific source",
      "Separates language capability from factual accuracy concerns",
    ],
    cons: [
      "Requires comprehensive, maintained structured databases for every domain",
      "Does not apply to creative, subjective, or novel reasoning tasks",
      "Massive engineering and data-maintenance challenge at web scale",
    ],
    realWorldExample:
      "Academic research at DeepMind (Sparrow), OpenAI, and Meta FAIR explores tool-augmented models that call external APIs and knowledge graphs. Wolfram Alpha integration in ChatGPT is an early commercial step in this direction.",
  },
];

// ─── Extended lawyer case step ───────────────────────────────────────────────

export interface RichLawyerCaseStep extends LawyerCaseStep {
  step: number;
  detail: string;
  type: "prompt" | "generation" | "submission" | "discovery" | "consequence";
  highlightCopy: string;
}

export const lawyerSteps: RichLawyerCaseStep[] = [
  {
    id: 1,
    step: 1,
    date: "February 2023",
    actor: "lawyer",
    title: "The Research Request",
    description:
      "Roberto Mata was suing Avianca Airlines for a personal injury sustained on a flight. His attorney, Steven Schwartz of Levidow, Levidow & Oberman, turned to ChatGPT to research supporting case law. Schwartz had used ChatGPT before for research and considered it a legitimate productivity tool.",
    detail:
      "Schwartz later testified that he was unfamiliar with the possibility that large language models could generate fictitious legal citations. He asked ChatGPT to find cases supporting the argument that Avianca's statute-of-limitations defense should be rejected.",
    quote:
      "I used ChatGPT to do the research for the cases, and I had never used it before for that purpose.",
    type: "prompt",
    highlightCopy: "A lawyer trusted an AI to find real court cases.",
    highlight: false,
  },
  {
    id: 2,
    step: 2,
    date: "February 2023",
    actor: "chatgpt",
    title: "The AI Responds",
    description:
      "ChatGPT produced a list of six aviation-injury cases with detailed citations: case names, circuit courts, volume and page numbers in the Federal Reporter, and brief summaries of holdings. Every element looked exactly like a real legal citation.",
    detail:
      "When Schwartz asked ChatGPT directly whether the cases were real and could be found in a legal database, the model confirmed they were authentic. It then generated additional fake text \u2014 including fabricated excerpts from opinions \u2014 to support its claim that the cases existed.",
    quote:
      "I asked ChatGPT if the cases were real and it responded yes. I asked it to show me the cases, and it provided quotes and content from the opinions.",
    type: "generation",
    highlightCopy:
      "The AI didn't just invent cases \u2014 it doubled down when asked to verify them.",
    highlight: true,
  },
  {
    id: 3,
    step: 3,
    date: "March 2023",
    actor: "lawyer",
    title: "Building the Brief",
    description:
      "Schwartz incorporated all six ChatGPT-sourced cases into a formal legal brief opposing Avianca's motion to dismiss. The brief was professionally formatted, used standard legal citation style, and cited the cases as binding or persuasive authority. No independent verification was performed.",
    detail:
      "A more senior partner at the firm, Peter LoDuca, signed the brief and filed it \u2014 he was also unaware the citations had been sourced from an AI chatbot rather than a traditional legal research database like Westlaw or LexisNexis.",
    type: "generation",
    highlightCopy:
      "The brief looked flawless. Real formatting, real legal language, fake cases.",
    highlight: false,
  },
  {
    id: 4,
    step: 4,
    date: "March 2023",
    actor: "court",
    title: "Filed in Federal Court",
    description:
      "The brief was submitted to the United States District Court for the Southern District of New York. It was assigned to Judge P. Kevin Castel. The document appeared entirely routine \u2014 a standard opposition brief in a personal injury matter.",
    detail:
      "Federal Rule of Civil Procedure 11 requires attorneys to certify that all factual and legal contentions in a filing are supported by existing law or a non-frivolous argument. By signing, the filing attorneys certified the cases were real.",
    type: "submission",
    highlightCopy:
      "Federal court. Real judge. Real docket. Entirely fabricated case law.",
    highlight: false,
  },
  {
    id: 5,
    step: 5,
    date: "April \u2013 May 2023",
    actor: "judge",
    title: "The Judge Investigates",
    description:
      "Avianca's attorneys searched for the cited cases in Westlaw, LexisNexis, and other databases. None of the six cases existed. Judge Castel ordered Schwartz to provide the full text of each cited opinion. Schwartz returned to ChatGPT \u2014 which generated fake opinion text for each case.",
    detail:
      "When Schwartz provided these AI-generated 'opinions' to the court, Judge Castel found they were fabricated. The cases had invented docket numbers, invented panel judges, and invented holdings that had no counterpart in any actual judicial record.",
    quote:
      "Six of the submitted cases appear to be bogus judicial decisions with bogus quotes and bogus internal citations.",
    type: "discovery",
    highlightCopy: "The AI verified its own lies \u2014 and the judge caught both.",
    highlight: true,
  },
  {
    id: 6,
    step: 6,
    date: "June 2023",
    actor: "judge",
    title: "The Consequences",
    description:
      "On June 22, 2023, Judge Castel issued a sanctions order finding that all six cited cases were fabricated. The court sanctioned Schwartz, LoDuca, and their law firm $5,000 \u2014 a relatively modest penalty \u2014 and ordered them to serve copies of the order on Mata and on each judge falsely identified as authoring the fake opinions.",
    detail:
      "The case became a nationally covered warning about AI in legal practice. Bar associations across the United States subsequently issued guidance requiring lawyers to verify any AI-generated research. Schwartz received a public reprimand. The underlying lawsuit against Avianca was later dismissed on unrelated procedural grounds.",
    quote:
      "The court is presented with an unprecedented circumstance. A submission filed by plaintiff's counsel appears to contain non-existent judicial opinions with real-looking citations and internal quotations.",
    type: "consequence",
    highlightCopy:
      "A $5,000 fine, a public reprimand, and a landmark warning for every lawyer using AI.",
    highlight: true,
  },
];

// ─── The fabricated cases ─────────────────────────────────────────────────

export interface FabricatedCase {
  name: string;
  court: string;
  year: string;
  status: "fabricated";
  note?: string;
}

export const fabricatedCases: FabricatedCase[] = [
  {
    name: "Varghese v. China Southern Airlines",
    court: "11th Cir.",
    year: "2019",
    status: "fabricated",
  },
  {
    name: "Martinez v. Delta Air Lines",
    court: "5th Cir.",
    year: "2019",
    status: "fabricated",
  },
  {
    name: "Zicherman v. Korean Air Lines",
    court: "2nd Cir.",
    year: "1996",
    status: "fabricated",
    note:
      "A real Zicherman v. Korean Air Lines Co. case exists (516 U.S. 217, 1996 \u2014 a Supreme Court decision), but the AI cited a different, entirely invented version with a fabricated holding.",
  },
  {
    name: "Petersen v. Iran Air",
    court: "S.D.N.Y.",
    year: "2016",
    status: "fabricated",
  },
  {
    name: "Miller v. United Airlines",
    court: "N.D. Ill.",
    year: "2020",
    status: "fabricated",
  },
  {
    name: "Estate of Durden v. KLM Royal Dutch Airlines",
    court: "E.D. Pa.",
    year: "2017",
    status: "fabricated",
  },
];

// ─── Token prediction data ───────────────────────────────────────────────────

export interface CompletionExample {
  prompt: string;
  predictions: TokenPrediction[];
  correctToken: string;
  note?: string;
}

export interface GenerationStep {
  currentText: string;
  candidates: TokenPrediction[];
  selected: string;
}

export interface StepByStepDemo {
  prompt: string;
  steps: GenerationStep[];
}

export const completionExamples: CompletionExample[] = [
  {
    prompt: "The capital of France is",
    predictions: [
      { token: "Paris", probability: 0.92 },
      { token: "Lyon", probability: 0.03 },
      { token: "the", probability: 0.02 },
      { token: "a", probability: 0.01 },
      { token: "located", probability: 0.01 },
    ],
    correctToken: "Paris",
    note: "High-confidence factual recall \u2014 the model has seen this thousands of times.",
  },
  {
    prompt: "The patient was diagnosed with a rare form of",
    predictions: [
      { token: "cancer", probability: 0.35 },
      { token: "disease", probability: 0.2 },
      { token: "diabetes", probability: 0.12 },
      { token: "anemia", probability: 0.08 },
      { token: "syndrome", probability: 0.05 },
    ],
    correctToken: "cancer",
    note:
      "Multiple plausible completions \u2014 the model picks whichever fits the statistical pattern, not what is medically accurate for any real patient.",
  },
  {
    prompt: "In the landmark Supreme Court case of Brown v.",
    predictions: [
      { token: "Board", probability: 0.78 },
      { token: "Wade", probability: 0.08 },
      { token: "the", probability: 0.04 },
      { token: "City", probability: 0.03 },
      { token: "Smith", probability: 0.02 },
    ],
    correctToken: "Board",
    note:
      'Strong factual recall for famous cases. Notice "Wade" appearing \u2014 the model conflates different landmark cases by pattern.',
  },
  {
    prompt: "The 47th president of the United States",
    predictions: [
      { token: "is", probability: 0.45 },
      { token: "was", probability: 0.3 },
      { token: "will", probability: 0.1 },
      { token: "of", probability: 0.05 },
      { token: "Donald", probability: 0.03 },
    ],
    correctToken: "is",
    note:
      "Uncertainty visible in the tense split between 'is' and 'was' \u2014 a signature of knowledge-cutoff confusion where the model doesn't know if an event is past or present.",
  },
  {
    prompt: "Dr. Sarah Chen published her groundbreaking paper on quantum",
    predictions: [
      { token: "computing", probability: 0.55 },
      { token: "mechanics", probability: 0.2 },
      { token: "entanglement", probability: 0.1 },
      { token: "physics", probability: 0.05 },
      { token: "error", probability: 0.03 },
    ],
    correctToken: "computing",
    note:
      "Dr. Sarah Chen is a fictional person, but the model generates a confident completion anyway. It learned 'quantum computing papers' not specific authors.",
  },
  {
    prompt: "Mix flour, sugar, and butter, then bake at",
    predictions: [
      { token: "350", probability: 0.4 },
      { token: "375", probability: 0.25 },
      { token: "325", probability: 0.15 },
      { token: "400", probability: 0.1 },
      { token: "180", probability: 0.05 },
    ],
    correctToken: "350",
    note:
      "Common procedural knowledge \u2014 confident but not specific. The model is pattern-matching from thousands of baking recipes, not following a single correct recipe.",
  },
  {
    prompt: "When interest rates rise, bond prices typically",
    predictions: [
      { token: "fall", probability: 0.72 },
      { token: "decline", probability: 0.12 },
      { token: "drop", probability: 0.06 },
      { token: "decrease", probability: 0.04 },
      { token: "go", probability: 0.02 },
    ],
    correctToken: "fall",
    note:
      "High confidence from domain knowledge reinforced across financial texts. The semantic variation in the top tokens (fall/decline/drop) is the model finding synonyms, not uncertainty.",
  },
];

export const stepByStepDemo: StepByStepDemo = {
  prompt: "The lawyer asked ChatGPT to find relevant cases. The AI responded with",
  steps: [
    {
      currentText: "The lawyer asked ChatGPT to find relevant cases. The AI responded with",
      candidates: [
        { token: "a", probability: 0.42 },
        { token: "several", probability: 0.28 },
        { token: "the", probability: 0.14 },
      ],
      selected: "several",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several",
      candidates: [
        { token: "cases", probability: 0.51 },
        { token: "citations", probability: 0.27 },
        { token: "court", probability: 0.1 },
      ],
      selected: "citations",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations",
      candidates: [
        { token: ",", probability: 0.38 },
        { token: "from", probability: 0.29 },
        { token: "including", probability: 0.19 },
      ],
      selected: ",",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations,",
      candidates: [
        { token: "including", probability: 0.45 },
        { token: "each", probability: 0.22 },
        { token: "all", probability: 0.16 },
      ],
      selected: "including",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including",
      candidates: [
        { token: "Varghese", probability: 0.31, isHallucinated: true },
        { token: "Martinez", probability: 0.24, isHallucinated: true },
        { token: "a", probability: 0.18 },
      ],
      selected: "Varghese",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese",
      candidates: [
        { token: "v.", probability: 0.87 },
        { token: "vs.", probability: 0.08 },
        { token: "versus", probability: 0.03 },
      ],
      selected: "v.",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v.",
      candidates: [
        { token: "China", probability: 0.39, isHallucinated: true },
        { token: "United", probability: 0.22 },
        { token: "Delta", probability: 0.17, isHallucinated: true },
      ],
      selected: "China",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China",
      candidates: [
        { token: "Southern", probability: 0.62, isHallucinated: true },
        { token: "Eastern", probability: 0.19 },
        { token: "Airlines", probability: 0.11 },
      ],
      selected: "Southern",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern",
      candidates: [
        { token: "Airlines", probability: 0.94, isHallucinated: true },
        { token: "Airways", probability: 0.04 },
        { token: "Air", probability: 0.01 },
      ],
      selected: "Airlines",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines",
      candidates: [
        { token: ",", probability: 0.55 },
        { token: "\u2014", probability: 0.22 },
        { token: "(", probability: 0.14 },
      ],
      selected: ",",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines,",
      candidates: [
        { token: "677", probability: 0.28, isHallucinated: true },
        { token: "No.", probability: 0.24 },
        { token: "11th", probability: 0.21, isHallucinated: true },
      ],
      selected: "677",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines, 677",
      candidates: [
        { token: "F.3d", probability: 0.71, isHallucinated: true },
        { token: "F.2d", probability: 0.15 },
        { token: "U.S.", probability: 0.08 },
      ],
      selected: "F.3d",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines, 677 F.3d",
      candidates: [
        { token: "1120", probability: 0.34, isHallucinated: true },
        { token: "1144", probability: 0.27, isHallucinated: true },
        { token: "982", probability: 0.18, isHallucinated: true },
      ],
      selected: "1120",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines, 677 F.3d 1120",
      candidates: [
        { token: "(11th", probability: 0.58, isHallucinated: true },
        { token: "(9th", probability: 0.2 },
        { token: "(2nd", probability: 0.11 },
      ],
      selected: "(11th",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines, 677 F.3d 1120 (11th",
      candidates: [
        { token: "Cir.", probability: 0.96, isHallucinated: true },
        { token: "Circuit", probability: 0.03 },
        { token: "Circ.", probability: 0.01 },
      ],
      selected: "Cir.",
    },
    {
      currentText:
        "The lawyer asked ChatGPT to find relevant cases. The AI responded with several citations, including Varghese v. China Southern Airlines, 677 F.3d 1120 (11th Cir.",
      candidates: [
        { token: "2019)", probability: 0.44, isHallucinated: true },
        { token: "2018)", probability: 0.29 },
        { token: "2020)", probability: 0.16 },
      ],
      selected: "2019)",
    },
  ],
};

// ─── Training data / confidence distribution ─────────────────────────────────

export interface ConfidenceSlice {
  category: string;
  percentage: number;
  description: string;
  color: string;
}

export interface HallucinationRateEntry {
  domain: string;
  rate: number;
  sampleSize: string;
  source: string;
}

export const confidenceDistribution: ConfidenceSlice[] = [
  {
    category: "Confident assertions",
    percentage: 52,
    description: "Definitive statements and answers",
    color: "var(--hallucination-red)",
  },
  {
    category: "Hedged / qualified answers",
    percentage: 18,
    description: "Answers with caveats and conditions",
    color: "var(--accent-amber)",
  },
  {
    category: "Opinions presented as facts",
    percentage: 15,
    description: "Subjective claims stated objectively",
    color: "var(--accent-purple)",
  },
  {
    category: "Explicit uncertainty",
    percentage: 8,
    description: "Phrases like 'I'm not sure' or 'I don't know'",
    color: "var(--verified-green)",
  },
  {
    category: "Questions without answers",
    percentage: 7,
    description: "Unanswered queries and open discussions",
    color: "var(--forward-blue)",
  },
];

export const hallucinationRates: HallucinationRateEntry[] = [
  { domain: "General knowledge", rate: 3, sampleSize: "10,000 queries", source: "Based on GPT-4 benchmarks" },
  { domain: "Legal citations", rate: 12, sampleSize: "500 queries", source: "Stanford HALUBench 2024" },
  { domain: "Medical information", rate: 5, sampleSize: "2,000 queries", source: "Nature Medicine study" },
  { domain: "Recent events (< 1 year)", rate: 18, sampleSize: "1,000 queries", source: "Knowledge cutoff analysis" },
  { domain: "Niche academic topics", rate: 25, sampleSize: "500 queries", source: "Domain-specific evaluation" },
  { domain: "Numerical data / statistics", rate: 15, sampleSize: "3,000 queries", source: "FactScore benchmark" },
  { domain: "Biographical details", rate: 8, sampleSize: "2,000 queries", source: "Biographical accuracy study" },
  { domain: "Code / programming", rate: 4, sampleSize: "5,000 queries", source: "HumanEval benchmark" },
];

// ─── Trust checklist ─────────────────────────────────────────────────────────

export interface RichTrustCheckItem extends TrustCheckItem {
  useCase: string;
  riskLevel: "safe" | "verify" | "dangerous";
  riskScore: number;
  advice: string;
}

export const trustCheckItems: RichTrustCheckItem[] = [
  {
    id: "brainstorming", useCase: "Brainstorming ideas", label: "Brainstorming",
    description: "Using AI to generate ideas, outlines, and creative directions. You evaluate the output yourself \u2014 the AI is a thinking partner, not an authority.",
    category: "safe", riskLevel: "safe", riskScore: 2,
    advice: "Low risk. AI excels at divergent thinking and breaking creative blocks. Treat output as raw material to select from, not finished work.",
    icon: "Lightbulb",
  },
  {
    id: "drafting-emails", useCase: "Drafting emails", label: "Drafting emails",
    description: "Using AI to write or rewrite professional communications. You review, edit, and send \u2014 the content is yours to approve before it leaves your hands.",
    category: "safe", riskLevel: "safe", riskScore: 3,
    advice: "Low risk. AI is good at tone, structure, and phrasing. Check that names, titles, and any factual claims (dates, amounts) are correct before sending.",
    icon: "Mail",
  },
  {
    id: "translating-text", useCase: "Translating text", label: "Translation",
    description: "Using AI to translate documents or messages between languages. AI translation is generally reliable for common language pairs in everyday contexts.",
    category: "safe", riskLevel: "safe", riskScore: 3,
    advice: "Generally reliable for common languages and everyday content. Nuances, idioms, and domain-specific terminology (legal, medical) may be lost or wrong \u2014 have a native speaker review anything high-stakes.",
    icon: "Globe",
  },
  {
    id: "summarizing-articles", useCase: "Summarizing articles", label: "Summarizing content",
    description: "Using AI to condense long articles, reports, or documents. AI summaries may subtly shift emphasis, omit critical caveats, or misrepresent nuanced positions.",
    category: "verify", riskLevel: "verify", riskScore: 4,
    advice: "Verify against the source for anything consequential. AI summaries are useful as a starting orientation but should not replace reading the original when stakes are high.",
    icon: "FileText",
  },
  {
    id: "learning-concepts", useCase: "Learning new concepts", label: "Learning new concepts",
    description: "Using AI explanations to understand unfamiliar topics. AI is an excellent tutor for most subjects but may oversimplify, use inaccurate analogies, or include subtle errors on specialized topics.",
    category: "verify", riskLevel: "verify", riskScore: 4,
    advice: "AI is a good first step for building conceptual intuition. Cross-reference with authoritative sources (textbooks, documentation, peer-reviewed material) before acting on technical or professional knowledge.",
    icon: "BookOpen",
  },
  {
    id: "writing-code", useCase: "Writing code", label: "Writing code",
    description: "Using AI to generate, debug, or refactor software. AI-generated code may contain bugs, use deprecated APIs, introduce security vulnerabilities, or solve the wrong problem subtly.",
    category: "verify", riskLevel: "verify", riskScore: 5,
    advice: "Always read, test, and understand every line before running it in production. Run your test suite. Never run AI-generated code that touches authentication, payments, or user data without a thorough security review.",
    icon: "Code2",
  },
  {
    id: "data-analysis", useCase: "Data analysis", label: "Data analysis",
    description: "Using AI to analyze datasets, generate statistics, or draw conclusions. AI may make arithmetic errors, misapply statistical methods, or confidently present unsupported interpretations.",
    category: "verify", riskLevel: "verify", riskScore: 6,
    advice: "Verify every number independently. Reproduce statistical calculations with a known-correct tool (Python, R, Excel). Be especially skeptical of percentages, growth rates, and comparative claims that weren't in your original data.",
    icon: "BarChart2",
  },
  {
    id: "historical-research", useCase: "Historical research", label: "Historical research",
    description: "Using AI to find dates, attribute events, or understand historical context. AI frequently conflates similar events, misattributes quotes, inverts cause and effect, or fabricates plausible-sounding details.",
    category: "skeptical", riskLevel: "dangerous", riskScore: 7,
    advice: "Treat AI as a starting point, never a source. Verify every date, name, and claim against primary sources or peer-reviewed scholarship. Historical misinformation from AI is especially hard to catch because it sounds specific and authoritative.",
    icon: "Landmark",
  },
  {
    id: "citing-sources", useCase: "Citing sources or facts", label: "Citing sources",
    description: "Using AI to find citations, locate statistics, or confirm factual claims. AI frequently fabricates citations, invents statistics, misattributes quotes, and provides plausible-looking references to non-existent works.",
    category: "avoid", riskLevel: "dangerous", riskScore: 9,
    advice: "Never use an AI-provided citation without verifying it directly in the source. Look up every paper, case, statute, or quote independently. The Mata v. Avianca lawsuit \u2014 where an attorney cited six AI-fabricated court cases \u2014 is the canonical warning. This is not rare.",
    icon: "Quote",
  },
  {
    id: "medical-legal-advice", useCase: "Medical or legal advice", label: "Medical / legal advice",
    description: "Relying on AI for medical diagnosis, treatment decisions, or legal counsel. AI is not licensed, not accountable, and not able to assess your specific situation \u2014 and its errors can cause serious, irreversible harm.",
    category: "avoid", riskLevel: "dangerous", riskScore: 10,
    advice: "Do not use AI as a substitute for a licensed professional. AI can be useful for general background research or preparing questions for a doctor or lawyer \u2014 but the decision-making must rest with a qualified human who knows your full situation and carries professional accountability.",
    icon: "ShieldAlert",
  },
];
