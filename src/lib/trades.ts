export const FIXGAD_TRADES = [
  "Plumbing",
  "Electrical work",
  "Air conditioning and HVAC",
  "Painting",
  "Carpentry",
  "Locksmith",
  "Appliance repair",
  "Masonry and construction",
  "Cleaning",
  "General maintenance",
  "Other",
] as const;

export type FixgadTrade = (typeof FIXGAD_TRADES)[number];
