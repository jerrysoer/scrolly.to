export interface MoneyBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export const moneyBreakdown: MoneyBreakdownItem[] = [
  { category: "Baker (production)", amount: 2.40, percentage: 40, color: "#8B6F47" },
  { category: "Troop (girls' share)", amount: 1.20, percentage: 20, color: "#4A7C59" },
  { category: "Council (programs)", amount: 1.80, percentage: 30, color: "#D4824A" },
  { category: "Rewards & prizes", amount: 0.60, percentage: 10, color: "#8B5A8E" }
];
