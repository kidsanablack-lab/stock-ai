// Static content for the 7 Powers page.
// The framework is by Hamilton Helmer ("7 Powers: The Foundations of
// Business Strategy"). All wording below is Scope's own.

export type PowerSlug =
  | "scale-economies"
  | "network-economies"
  | "counter-positioning"
  | "switching-costs"
  | "branding"
  | "cornered-resource"
  | "process-power";

export type Power = {
  number: string; // "01" ... "07"
  slug: PowerSlug; // also used as the anchor id of its detail section
  name: string;
  short: string; // one-line description used on the overview card
  icon: string; // Tabler icon class
  tint: string; // soft background
  accent: string; // main color
  ink: string; // dark text color
};

// One color pair per power, taken from Scope's existing pastel palette.
export const POWERS: Power[] = [
  {
    number: "01",
    slug: "scale-economies",
    name: "Scale Economies",
    short:
      "Growing scale can lower the cost of producing or delivering each unit.",
    icon: "ti-building-factory-2",
    tint: "#E6F1FB",
    accent: "#185FA5",
    ink: "#042C53",
  },
  {
    number: "02",
    slug: "network-economies",
    name: "Network Economies",
    short:
      "A network can become more valuable as more participants join and interact.",
    icon: "ti-network",
    tint: "#E6F5F1",
    accent: "#0F6E56",
    ink: "#04342C",
  },
  {
    number: "03",
    slug: "counter-positioning",
    name: "Counter-Positioning",
    short:
      "A new business model can challenge established companies that struggle to adopt it without harming their existing business.",
    icon: "ti-arrows-split-2",
    tint: "#F1EFFB",
    accent: "#7c3aed",
    ink: "#2A1259",
  },
  {
    number: "04",
    slug: "switching-costs",
    name: "Switching Costs",
    short:
      "Customers may face time, money, or effort when moving to another provider.",
    icon: "ti-lock",
    tint: "#FAEEDA",
    accent: "#854F0B",
    ink: "#412402",
  },
  {
    number: "05",
    slug: "branding",
    name: "Branding",
    short:
      "A strong brand can create customer preference that competitors find difficult to reproduce.",
    icon: "ti-award",
    tint: "#FBEAF0",
    accent: "#993556",
    ink: "#4B1528",
  },
  {
    number: "06",
    slug: "cornered-resource",
    name: "Cornered Resource",
    short:
      "Access to a valuable resource that competitors cannot easily obtain can create an advantage.",
    icon: "ti-diamond",
    tint: "#FAECE7",
    accent: "#993C1D",
    ink: "#4A1B0C",
  },
  {
    number: "07",
    slug: "process-power",
    name: "Process Power",
    short:
      "Distinctive ways of working can become difficult for competitors to replicate.",
    icon: "ti-route",
    tint: "#F1EFE8",
    accent: "#5F5E5A",
    ink: "#2C2C2A",
  },
];

// Section anchor ids used by the hero buttons and cards.
export const SECTION_IDS = {
  bigPicture: "big-picture",
  explore: "explore-powers",
} as const;