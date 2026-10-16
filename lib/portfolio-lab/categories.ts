import type { CategoryId } from "./types";

export type CategoryInfo = {
  id: CategoryId;
  label: string;
  /** Short label for tight spaces. */
  short: string;
  /** Used for chart segments and swatches only, never as the only signal. */
  color: string;
};

// Order here is the order shown in the category dropdown.
// Bitcoin and other crypto stay separate on purpose, so users can see
// their exposure to each one.
export const CATEGORIES: CategoryInfo[] = [
  { id: "individual-stocks", label: "Individual Stocks", short: "Stocks", color: "#185FA5" },
  { id: "equity-etf", label: "Equity ETFs", short: "Equity ETFs", color: "#0F6E56" },
  { id: "bonds", label: "Bonds", short: "Bonds", color: "#7c3aed" },
  { id: "bond-etf", label: "Bond ETFs", short: "Bond ETFs", color: "#A78BFA" },
  { id: "cash", label: "Cash and Cash Equivalents", short: "Cash", color: "#6B8E5A" },
  { id: "bitcoin", label: "Bitcoin", short: "Bitcoin", color: "#EA8C00" },
  { id: "other-crypto", label: "Other Cryptocurrency", short: "Other crypto", color: "#993C1D" },
  { id: "gold", label: "Gold", short: "Gold", color: "#C9A227" },
  { id: "real-estate", label: "Real Estate and REITs", short: "Real estate", color: "#993556" },
  { id: "other", label: "Other Assets", short: "Other", color: "#5F5E5A" },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
) as Record<CategoryId, CategoryInfo>;

export const UNALLOCATED_COLOR = "#d9d9d4";

export function isCategoryId(value: unknown): value is CategoryId {
  return (
    typeof value === "string" &&
    CATEGORIES.some((category) => category.id === value)
  );
}
