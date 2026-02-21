// The Dress — lighting assumption data
export interface LightingAssumption {
  id: string;
  name: string;
  description: string;
  perceivedColors: { stripe1: string; stripe2: string };
  explanation: string;
}

export const dressAssumptions: LightingAssumption[] = [
  {
    id: "warm",
    name: "Warm light (shadow)",
    description: "Your brain assumes the dress is in shadow lit by warm/yellow light",
    perceivedColors: { stripe1: "#F5F5DC", stripe2: "#DAA520" }, // white & gold
    explanation: "If the lighting is warm and dim, your brain subtracts the yellow tint — and sees white and gold underneath.",
  },
  {
    id: "cool",
    name: "Cool light (bright)",
    description: "Your brain assumes the dress is in bright, cool/blue light",
    perceivedColors: { stripe1: "#1a1a6e", stripe2: "#1a1a1a" }, // blue & black
    explanation: "If the lighting is cool and bright, your brain subtracts the blue tint — and sees blue and black underneath.",
  },
];

// The actual dress colors (from the photo)
export const actualDressColors = {
  stripe1: "#7B82A8", // ambiguous blue-ish
  stripe2: "#9B854E", // ambiguous brown-gold-ish
};

// Key facts about The Dress
export const dressFacts = [
  "The photo went viral on February 26, 2015",
  "~57% of viewers saw white & gold, ~30% saw blue & black, ~13% saw blue & brown",
  "The photo's ambiguous lighting removes cues your brain normally uses to determine color",
  "Scientists published over 20 peer-reviewed papers studying this phenomenon",
  "Your brain makes an unconscious assumption about the light source — and that changes everything",
];
