export interface SeriesPart {
  number: 1 | 2 | 3;
  slug: string;
  title: string;
  subtitle: string;
  yearRange: string;
  sectionCount: number;
  readingTime: string;
  status: "live" | "coming-soon";
}

export const series: SeriesPart[] = [
  {
    number: 1,
    slug: "part-1",
    title: "The Unlikely Origin",
    subtitle: "From 7-Eleven clone to Pasadena revelation",
    yearRange: "1930–1967",
    sectionCount: 10,
    readingTime: "12 min",
    status: "live",
  },
  {
    number: 2,
    slug: "part-2",
    title: "The Aldi Paradox",
    subtitle: "How a secretive German family acquired America's favorite grocer",
    yearRange: "1967–1988",
    sectionCount: 8,
    readingTime: "10 min",
    status: "live",
  },
  {
    number: 3,
    slug: "part-3",
    title: "The Cult Machine",
    subtitle: "Private labels, fearless buyers, and the $2,000/sqft secret",
    yearRange: "1988–Today",
    sectionCount: 8,
    readingTime: "10 min",
    status: "live",
  },
];

export const seriesTitle = "The Trader Joe's Story";
export const seriesTagline =
  "How a Stanford MBA turned a tiny chain of LA convenience stores into America's most beloved grocery brand.";
