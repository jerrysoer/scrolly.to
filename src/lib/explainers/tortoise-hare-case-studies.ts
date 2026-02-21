// Real-world tortoise case studies with pre-computed data
export interface CaseStudy {
  id: string;
  name: string;
  title: string;
  tagline: string;
  principle: string;
  frontStat: string;
  frontDescription: string;
  backData: {
    label: string;
    value: string;
    detail: string;
  }[];
  quote: string;
  quoteAttribution: string;
  chartData: { year: number; value: number }[];
  chartLabel: string;
  chartUnit: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "buffett",
    name: "Warren Buffett",
    title: "The Power of Compounding",
    tagline: "Patience as a competitive advantage",
    principle: "Compound interest is the eighth wonder of the world.",
    frontStat: "99%",
    frontDescription: "of his wealth earned after age 50",
    backData: [
      { label: "Started investing", value: "Age 11", detail: "Bought first stock in 1941" },
      { label: "First million", value: "Age 30", detail: "19 years of compounding" },
      { label: "First billion", value: "Age 56", detail: "Another 26 years of compounding" },
      { label: "Net worth at 93", value: "$130B+", detail: "99% earned after age 50" },
    ],
    quote: "The stock market is a device for transferring money from the impatient to the patient.",
    quoteAttribution: "Warren Buffett",
    chartData: [
      { year: 1941, value: 0.000114 },
      { year: 1950, value: 0.01 },
      { year: 1960, value: 1 },
      { year: 1970, value: 25 },
      { year: 1980, value: 140 },
      { year: 1990, value: 3400 },
      { year: 2000, value: 36000 },
      { year: 2010, value: 47000 },
      { year: 2020, value: 73500 },
      { year: 2024, value: 133000 },
    ],
    chartLabel: "Net Worth",
    chartUnit: "$M",
  },
  {
    id: "clear",
    name: "James Clear",
    title: "Atomic Habits",
    tagline: "1% better every day",
    principle: "Habits are the compound interest of self-improvement.",
    frontStat: "37.78x",
    frontDescription: "improvement from 1% daily gains over 1 year",
    backData: [
      { label: "1% worse daily", value: "0.03", detail: "(0.99^365) -- nearly zero" },
      { label: "1% better daily", value: "37.78", detail: "(1.01^365) -- nearly 38x" },
      { label: "Blog to book", value: "7 years", detail: "Started blog 2012, book published 2018" },
      { label: "Copies sold", value: "15M+", detail: "Built one article at a time" },
    ],
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    quoteAttribution: "James Clear",
    chartData: [
      { year: 0, value: 1 },
      { year: 30, value: 1.35 },
      { year: 60, value: 1.82 },
      { year: 90, value: 2.45 },
      { year: 120, value: 3.31 },
      { year: 150, value: 4.47 },
      { year: 180, value: 6.03 },
      { year: 210, value: 8.14 },
      { year: 240, value: 10.99 },
      { year: 270, value: 14.83 },
      { year: 300, value: 20.02 },
      { year: 330, value: 27.03 },
      { year: 365, value: 37.78 },
    ],
    chartLabel: "1% Daily Improvement",
    chartUnit: "x",
  },
  {
    id: "kaizen",
    name: "Japanese Kaizen",
    title: "Continuous Improvement",
    tagline: "Change for the better, always",
    principle: "Small, daily improvements over time lead to stunning results.",
    frontStat: "50+",
    frontDescription: "years of Toyota Production System refinement",
    backData: [
      { label: "Origin", value: "1950s", detail: "Toyota Production System begins" },
      { label: "Philosophy", value: "Kaizen", detail: '"Change for better" -- continuous small improvements' },
      { label: "Result", value: "#1 automaker", detail: "World's largest by 2008, from war-torn startup" },
      { label: "Key metric", value: "1M+ ideas/yr", detail: "Toyota employees submit over 1M improvement suggestions annually" },
    ],
    quote: "The key is not the will to win. Everybody has that. It is the will to prepare to win that is important.",
    quoteAttribution: "Bobby Knight (adapted for Kaizen)",
    chartData: [
      { year: 1950, value: 11706 },
      { year: 1960, value: 154770 },
      { year: 1970, value: 1609000 },
      { year: 1980, value: 3293000 },
      { year: 1990, value: 4212000 },
      { year: 2000, value: 5955000 },
      { year: 2008, value: 8972000 },
      { year: 2015, value: 10151000 },
      { year: 2023, value: 10307000 },
    ],
    chartLabel: "Toyota Annual Production",
    chartUnit: "units",
  },
];
