export interface BakerDetails {
  name: string;
  owner: string;
  regions: string[];
  founded: number;
}

export interface BakerInfo {
  littleBrownie: BakerDetails;
  abcBakers: BakerDetails;
}

export const bakerInfo: BakerInfo = {
  littleBrownie: {
    name: "Little Brownie Bakers",
    owner: "Ferrero (Nutella, Kinder)",
    regions: ["California (most)", "Western states", "Parts of Midwest"],
    founded: 1974
  },
  abcBakers: {
    name: "ABC Bakers",
    owner: "Interbake Foods",
    regions: ["East Coast", "South", "Parts of California"],
    founded: 1936
  }
};
