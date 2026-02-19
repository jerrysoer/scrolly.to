// ── Layer 1: Blocked terms ───────────────────────────────────────────
// Slurs, profanity, and hate speech terms across categories:
// racial/ethnic, gender/sexuality, ableist, and general profanity.

const WORDS = [
  // ── Profanity ──
  "ass", "asshole", "bastard", "bitch", "bollocks", "bullshit",
  "cock", "crap", "cum", "cunt", "damn", "dick", "dildo",
  "fuck", "fucker", "fucking", "goddamn", "jerk", "jizz",
  "milf", "motherfucker", "penis", "piss", "prick", "pussy",
  "scrotum", "shit", "shitty", "slut", "smegma", "spunk",
  "testicle", "tit", "tits", "titties", "twat", "vagina",
  "wank", "wanker", "whore", "wtf", "stfu",

  // ── Racial / ethnic slurs ──
  "chink", "chinks", "chinky",
  "coon", "coons",
  "gook", "gooks",
  "gringo",
  "halfbreed", "half-breed",
  "jap", "japs",
  "kike", "kikes",
  "negro", "negroes",
  "nigga", "niggas", "nigger", "niggers",
  "paki", "pakis",
  "raghead", "ragheads",
  "redskin", "redskins",
  "spic", "spick", "spics",
  "wetback", "wetbacks",
  "wog", "wogs",
  "zipperhead",
  "beaner", "beaners",
  "camel jockey",
  "chinaman",
  "coolie", "coolies",
  "darkie", "darkies",
  "golliwog",
  "gyp", "gyppo",
  "honky", "honkey",
  "kraut", "krauts",
  "nip", "nips",
  "pickaninny",
  "sambo",
  "sand nigger",
  "slope", "slopes",
  "spook",
  "towelhead",
  "uncle tom",
  "white trash",

  // ── Gender / sexuality slurs ──
  "dyke", "dykes",
  "fag", "fags", "faggot", "faggots",
  "homo", "homos",
  "lesbo",
  "tranny", "trannies",
  "shemale",
  "sodomite",
  "bimbo",

  // ── Ableist slurs ──
  "retard", "retarded", "retards",
  "cripple", "crippled",
  "mongoloid",
  "spaz", "spastic",

  // ── Obfuscation variants ──
  "a$$", "b1tch", "bi+ch", "d1ck", "f u c k", "fck", "fuk", "fuq",
  "motherf", "n1gger", "p0rn", "phuck", "porn", "s h i t", "sh1t",
  "ch1nk", "f4g", "f4ggot", "n1gga",
];

const WORDS_PATTERN = new RegExp(
  `\\b(${WORDS.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "i"
);

// ── Layer 2: Bigotry patterns ────────────────────────────────────────
// Catches stereotyping, dehumanizing, and hateful constructs that
// individual words alone won't flag.

// Each term optionally matches " people", " men", " women", " folks"
// after the core word so "gay people", "chinese people" etc. all match.
const _GROUPS = [
  "asians?", "blacks?", "whites?",
  "mexicans?", "latinos?|latinas?", "hispanics?",
  "arabs?", "muslims?", "jewish|jews?", "hindus?",
  "chinese", "japanese", "indians?", "africans?",
  "koreans?", "vietnamese", "filipinos?|filipinas?",
  "immigrants?", "refugees?",
  "women", "woman", "girls?", "females?",
  "men", "man", "boys?", "males?",
  "gays?", "lesbians?", "trans(?:gender)?",
  "bisexuals?", "queers?",
  "disabled", "handicapped",
  "fat", "obese",
  "homeless",
  "old", "elderly",
];
const GROUP_TERMS = _GROUPS
  .map((g) => `(?:${g})(?: people| men| women| folks| person)?`)
  .join("|");

const BIGOTRY_PATTERNS: RegExp[] = [
  // "why do/are [group] so [adjective]" — stereotyping
  new RegExp(`\\bwhy\\s+(do|are|is|don'?t|can'?t|won'?t)\\s+(${GROUP_TERMS})\\s+(so|all|always|never|such)\\b`, "i"),

  // "why do [group] have/look/smell/act" — body/behavior stereotyping
  new RegExp(`\\bwhy\\s+(do|are)\\s+(${GROUP_TERMS})\\s+(have|look|smell|act|sound|talk|eat|stink|steal|lie)\\b`, "i"),

  // "[group] are/is (a/the)? [derogatory]" — dehumanizing generalizations
  new RegExp(`\\b(${GROUP_TERMS})\\s+(are|is)\\s+(?:a |an |the )?(disgusting|animals?|vermin|parasites?|subhuman|inferior|evil|filthy|dirty|stupid|dumb|ugly|lazy|criminals?|terrorists?|savages?|trash|scum|worthless|mongrels?|plague|disease|virus|cancer|infestation|problem|abomination|mistake|burden|threat|menace)\\b`, "i"),

  // "all [group] are/should/must" — blanket hateful generalizations
  new RegExp(`\\ball\\s+(${GROUP_TERMS})\\s+(are|should|must|need to|deserve)\\b`, "i"),

  // "[group] should/need to go back/be deported/die" — eliminationist
  new RegExp(`\\b(${GROUP_TERMS})\\s+(should|need to|must|deserve to|ought to)\\s+(die|go back|be deported|be killed|be shot|be hanged|be eradicated|leave|get out|burn)\\b`, "i"),

  // "I hate [group]" / "[group] are ruining" — direct hate
  new RegExp(`\\b(i|we)\\s+hate\\s+(${GROUP_TERMS})\\b`, "i"),
  new RegExp(`\\b(${GROUP_TERMS})\\s+(are|is)\\s+(ruining|destroying|invading|replacing|polluting|infesting|contaminating)\\b`, "i"),

  // "get rid of [group]" — eliminationist
  new RegExp(`\\b(get rid of|eliminate|exterminate|eradicate|purge|cleanse)\\s+(the\\s+)?(${GROUP_TERMS})\\b`, "i"),

  // Slur-adjacent phrases: "[group] + known insult pattern"
  new RegExp(`\\b(${GROUP_TERMS})\\s+(plague|disease|virus|cancer|infestation|problem)\\b`, "i"),
];

// ── Public API ───────────────────────────────────────────────────────

/**
 * Check text for profanity, slurs, or bigoted language.
 * Returns a reason string if flagged, or null if clean.
 */
export function checkProfanity(text: string): string | null {
  // Layer 1: blocked words
  const wordMatch = WORDS_PATTERN.exec(text);
  if (wordMatch) return wordMatch[1];

  // Layer 2: bigotry patterns
  for (const pattern of BIGOTRY_PATTERNS) {
    if (pattern.test(text)) return "hateful or bigoted language";
  }

  return null;
}
