export interface InterestCluster {
  id: string;
  name: string;
  keywords: string[];
  color: string;
  relatedClusters: string[];
}

export const interestClusters: InterestCluster[] = [
  {
    id: "food",
    name: "Food & Cooking",
    keywords: ["recipe", "cooking", "food", "chef", "baking", "meal", "kitchen", "dinner", "lunch", "breakfast", "restaurant", "foodie", "yummy", "delicious", "homemade", "easyrecipe"],
    color: "var(--backward-orange)",
    relatedClusters: ["lifestyle", "health"],
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    keywords: ["workout", "fitness", "gym", "exercise", "health", "yoga", "running", "muscle", "protein", "cardio", "weightlifting", "gains", "fitcheck", "hiit", "stretch"],
    color: "var(--correct-green)",
    relatedClusters: ["health", "lifestyle"],
  },
  {
    id: "tech",
    name: "Tech & Gadgets",
    keywords: ["tech", "iphone", "android", "app", "ai", "coding", "developer", "software", "gadget", "review", "unboxing", "setup", "hack", "productivity", "macbook"],
    color: "var(--forward-blue)",
    relatedClusters: ["education", "gaming"],
  },
  {
    id: "fashion",
    name: "Fashion & Style",
    keywords: ["fashion", "outfit", "style", "ootd", "grwm", "aesthetic", "thrift", "haul", "trend", "streetwear", "vintage", "designer", "beauty", "makeup", "skincare"],
    color: "var(--accent-purple)",
    relatedClusters: ["lifestyle", "beauty"],
  },
  {
    id: "comedy",
    name: "Comedy & Entertainment",
    keywords: ["funny", "comedy", "meme", "joke", "skit", "prank", "laugh", "humor", "relatable", "storytime", "fyp", "viral", "trending", "lol", "duet"],
    color: "var(--accent-amber)",
    relatedClusters: ["lifestyle", "music"],
  },
  {
    id: "education",
    name: "Education & Learning",
    keywords: ["learn", "education", "tutorial", "howto", "explained", "science", "history", "math", "study", "school", "university", "facts", "didyouknow", "tips", "guide"],
    color: "var(--forward-blue)",
    relatedClusters: ["tech", "finance"],
  },
  {
    id: "music",
    name: "Music & Dance",
    keywords: ["music", "dance", "song", "singer", "rapper", "beat", "remix", "cover", "choreography", "concert", "playlist", "newmusic", "musician", "producer", "dj"],
    color: "var(--accent-purple)",
    relatedClusters: ["comedy", "lifestyle"],
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Vlogs",
    keywords: ["lifestyle", "vlog", "dayinmylife", "routine", "morning", "productive", "minimalist", "apartment", "roomtour", "decor", "home", "organization", "selfcare", "motivation", "goals"],
    color: "var(--correct-green)",
    relatedClusters: ["food", "fashion"],
  },
  {
    id: "gaming",
    name: "Gaming",
    keywords: ["gaming", "gamer", "gameplay", "fortnite", "minecraft", "valorant", "twitch", "streamer", "esports", "console", "pc", "playstation", "xbox", "nintendo", "rpg"],
    color: "var(--backward-orange)",
    relatedClusters: ["tech", "comedy"],
  },
  {
    id: "finance",
    name: "Finance & Business",
    keywords: ["finance", "money", "investing", "stocks", "crypto", "budget", "savings", "entrepreneur", "business", "startup", "sidehustle", "passive", "income", "realestate", "wealth"],
    color: "var(--accent-amber)",
    relatedClusters: ["education", "tech"],
  },
  {
    id: "health",
    name: "Health & Wellness",
    keywords: ["health", "wellness", "mental", "therapy", "meditation", "mindfulness", "anxiety", "sleep", "nutrition", "vitamins", "holistic", "healing", "selfcare", "journaling", "gratitude"],
    color: "var(--correct-green)",
    relatedClusters: ["fitness", "lifestyle"],
  },
  {
    id: "beauty",
    name: "Beauty & Skincare",
    keywords: ["beauty", "skincare", "makeup", "cosmetics", "foundation", "lipstick", "serum", "cleanser", "routine", "glow", "tutorial", "drugstore", "sephora", "dermatologist", "spf"],
    color: "var(--accent-purple)",
    relatedClusters: ["fashion", "lifestyle"],
  },
];

export function matchClusters(
  caption: string,
  hashtags: string[]
): { cluster: InterestCluster; score: number }[] {
  const text = [caption, ...hashtags].join(" ").toLowerCase();
  const words = text.split(/\s+/).map((w) => w.replace(/^#/, ""));

  const scores = interestClusters.map((cluster) => {
    let score = 0;
    for (const keyword of cluster.keywords) {
      if (words.some((w) => w.includes(keyword) || keyword.includes(w))) {
        score += 1;
      }
    }
    // Boost for hashtag exact matches
    for (const tag of hashtags) {
      const clean = tag.replace(/^#/, "").toLowerCase();
      if (cluster.keywords.includes(clean)) {
        score += 0.5;
      }
    }
    return { cluster, score };
  });

  return scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export const popularHashtags: string[] = [
  "#fyp", "#recipe", "#workout", "#tech", "#fashion", "#funny",
  "#learn", "#music", "#vlog", "#gaming", "#money", "#skincare",
  "#foodie", "#gym", "#coding", "#ootd", "#comedy", "#tutorial",
  "#dance", "#lifestyle", "#crypto", "#grwm", "#meme", "#howto",
];
