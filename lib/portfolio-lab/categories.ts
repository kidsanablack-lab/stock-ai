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
//
// Colors come from the Scope category palette in design-tokens.css, in the
// same order as --cat-1 … --cat-6 and --cat-other. Related categories share a
// hue family. None is red, green or yellow, so none reads as good / bad /
// caution. Kept as hex here because charts and SVG attributes read this value
// directly. Change a color here and nowhere else.
export const CATEGORIES: CategoryInfo[] = [
  { id: "individual-stocks", label: "Individual Stocks", short: "Stocks", color: "#1E40AF" }, // --color-chart-1
  { id: "equity-etf", label: "Equity ETFs", short: "Equity ETFs", color: "#2563EB" }, // --cat-1
  { id: "bonds", label: "Bonds", short: "Bonds", color: "#4338CA" }, // --color-theme-switching-accent
  { id: "bond-etf", label: "Bond ETFs", short: "Bond ETFs", color: "#7C3AED" }, // --cat-2
  { id: "cash", label: "Cash and Cash Equivalents", short: "Cash", color: "#0E7490" }, // --cat-3
  { id: "bitcoin", label: "Bitcoin", short: "Bitcoin", color: "#BE185D" }, // --cat-4
  { id: "other-crypto", label: "Other Cryptocurrency", short: "Other crypto", color: "#86198F" }, // --color-theme-cornered-accent
  { id: "gold", label: "Gold", short: "Gold", color: "#C2410C" }, // --cat-6
  { id: "real-estate", label: "Real Estate and REITs", short: "Real estate", color: "#0F766E" }, // --cat-5
  { id: "other", label: "Other Assets", short: "Other", color: "#64748B" }, // --cat-other
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
) as Record<CategoryId, CategoryInfo>;

export const UNALLOCATED_COLOR = "#DCE4EE"; // --color-border

export function isCategoryId(value: unknown): value is CategoryId {
  return (
    typeof value === "string" &&
    CATEGORIES.some((category) => category.id === value)
  );
}