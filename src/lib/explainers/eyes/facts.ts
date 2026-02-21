export interface WhoaFact {
  id: string;
  text: string;
  section: string; // which section it belongs near
  source?: string;
}

export const whoaFacts: WhoaFact[] = [
  { id: "mantis-shrimp", text: "Mantis shrimp have 16 types of cone cells (vs. our 3)", section: "detectors" },
  { id: "bee-uv", text: "You can't see ultraviolet — but bees can, and flowers have patterns invisible to us", section: "spectrum" },
  { id: "cone-replacement", text: "The cone cells in your eye are physically burned out and replaced every ~10 days", section: "detectors" },
  { id: "yellow-trick", text: "'Yellow' as a pure wavelength and 'yellow' as R+G mixed look identical to your brain — it cannot tell the difference", section: "mix" },
  { id: "tetrachromat", text: "Some women may have 4 types of cones — seeing colors the rest of us can't even imagine", section: "punchline" },
  { id: "no-brown", text: "Brown doesn't exist as a wavelength of light — it's dark orange. Your brain invented brown.", section: "mix" },
];

export interface FAQItem {
  q: string;
  a: string;
}

export const faqItems: FAQItem[] = [
  {
    q: "How do cone cells in the eye detect color?",
    a: "Your retina contains three types of cone cells, each sensitive to different wavelengths of light: S-cones (short/blue, ~440nm peak), M-cones (medium/green, ~530nm peak), and L-cones (long/red, ~580nm peak). When light hits your retina, each cone type responds with a different signal strength. Your brain combines these three signals to create the perception of color.",
  },
  {
    q: "Why do we only have 3 types of cone cells?",
    a: "Three cone types evolved as an efficient solution for survival. With just 3 detectors, the brain can distinguish roughly 1 million colors by comparing the relative activation of each cone type. Adding more cone types (like the mantis shrimp's 16) provides diminishing returns for the neural processing cost. Our 3-cone system is optimized for distinguishing ripe fruit from foliage — a critical survival advantage for primates.",
  },
  {
    q: "What is color blindness and how common is it?",
    a: "Color blindness (color vision deficiency) occurs when one or more cone types are missing or shifted in sensitivity. About 8% of men and 0.5% of women have some form. The most common is red-green color blindness (protanopia or deuteranopia), where the L-cones or M-cones are affected. It's not seeing in black and white — it's seeing a different set of colors.",
  },
  {
    q: "Do dogs see in black and white?",
    a: "No! Dogs have 2 types of cone cells (blue and yellow), compared to our 3. They see a range of blues and yellows but cannot distinguish red from green. Their color vision is similar to a person with red-green color blindness. The myth that dogs see only in black and white is outdated.",
  },
  {
    q: "Why did people see different colors in 'The Dress'?",
    a: "The viral dress photo had ambiguous lighting cues. Your brain constantly makes assumptions about the light source illuminating objects to determine their 'true' color. People who assumed the dress was in warm shadow subtracted yellow from the image and saw white and gold. People who assumed cool bright light subtracted blue and saw blue and black. The actual dress was blue and black.",
  },
  {
    q: "Does everyone see the same colors?",
    a: "We can't know for certain. While most humans with normal vision have similar cone cell biology, the exact sensitivity of each person's cones varies slightly based on genetics. Your brain's interpretation of cone signals is also shaped by experience and context. We agree on color names, but whether your 'red' looks the same as someone else's 'red' is a philosophical question (known as 'qualia') that science cannot definitively answer.",
  },
];
