// Shared types for Scope Portfolio Lab.
// Everything here is hypothetical planning data. Nothing is a real holding.

export type CategoryId =
  | "individual-stocks"
  | "equity-etf"
  | "bonds"
  | "bond-etf"
  | "cash"
  | "bitcoin"
  | "other-crypto"
  | "gold"
  | "real-estate"
  | "other";

export type CurrencyCode = "USD" | "THB" | "LAK";

/**
 * What the user is editing. Percentages stay as raw text so typing feels
 * natural ("3", "33.", "33.3"). This text is the single source of truth;
 * numbers are always derived from it.
 */
export type HoldingDraft = {
  id: string;
  name: string;
  category: CategoryId;
  percentInput: string;
};

/** A holding after its percentage text has been parsed into a number. */
export type Holding = {
  id: string;
  name: string;
  category: CategoryId;
  percent: number;
};

export type AllocationStatus = "empty" | "incomplete" | "complete" | "over";

export type HoldingRow = Holding & {
  displayName: string; // never empty, safe for tables and charts
  amount: number; // investment * percent / 100
};

export type CategoryRow = {
  category: CategoryId;
  percent: number;
  amount: number;
  holdingCount: number;
};

export type PortfolioSummary = {
  investment: number;
  holdingCount: number;
  /** Categories that have an allocation above 0%. */
  allocatedCategoryCount: number;
  totalPercent: number;
  allocatedAmount: number;
  unallocatedPercent: number;
  unallocatedAmount: number;
  overPercent: number;
  overAmount: number;
  status: AllocationStatus;
  rows: HoldingRow[];
  /** Only categories with an allocation above 0%, largest first. */
  categories: CategoryRow[];
};

export type ChartSegment = {
  id: string;
  label: string;
  categoryId: CategoryId | "unallocated";
  /** The real allocation percentage of this item. */
  percent: number;
  /** Size of the segment on the ring, 0 to 100. */
  share: number;
  /** 0 for the first holding of a category, 1 for the second, ... */
  shade: number;
};

export type Observation = {
  id: string;
  tone: "info" | "notice" | "warning";
  title: string;
  text: string;
};

export type TemplateHolding = {
  name: string;
  category: CategoryId;
  percent: number;
};

export type PortfolioTemplate = {
  id: string;
  name: string;
  description: string;
  objective: string;
  idea: string;
  risks: string[];
  context: string;
  holdings: TemplateHolding[];
};
