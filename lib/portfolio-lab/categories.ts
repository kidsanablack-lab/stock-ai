import type { CategoryId } from "./types";

export type CategoryInfo = {
  id: CategoryId;
  label: string;
  /** Short label for tight spaces. */
  short: string;
};

// Order here is the order shown in the category dropdown.
// It is also the order of the chart colors: the first six categories take
// --cat-1 to --cat-6 (see categoryColor.ts) and the rest are drawn as one
// grey "Other categories" group in charts. Reorder this list to change which
// six get their own color.
// Bitcoin and other crypto stay separate on purpose, so users can see
// their exposure to each one.
export const CATEGORIES: CategoryInfo[] = [
  { id: "individual-stocks", label: "Individual Stocks", short: "Stocks" },
  { id: "equity-etf", label: "Equity ETFs", short: "Equity ETFs" },
  { id: "bonds", label: "Bonds", short: "Bonds" },
  { id: "bond-etf", label: "Bond ETFs", short: "Bond ETFs" },
  { id: "cash", label: "Cash and Cash Equivalents", short: "Cash" },
  { id: "bitcoin", label: "Bitcoin", short: "Bitcoin" },
  { id: "other-crypto", label: "Other Cryptocurrency", short: "Other crypto" },
  { id: "gold", label: "Gold", short: "Gold" },
  { id: "real-estate", label: "Real Estate and REITs", short: "Real estate" },
  { id: "other", label: "Other Assets", short: "Other" },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
) as Record<CategoryId, CategoryInfo>;

export function isCategoryId(value: unknown): value is CategoryId {
  return (
    typeof value === "string" &&
    CATEGORIES.some((category) => category.id === value)
  );
}
