// Scope Score methodology, in ONE place.
// Change a weight or a cut-off here and every company's score changes with it.
//
// Cut-offs are 5 numbers that score 0, 2.5, 5, 7.5 and 10, with a straight line between.
// They can go up (higher is better) or down (lower is better, like debt).

export type InputKey =
  | "roic" | "cashConversion" | "marginRange"
  | "marketCap" | "revenueTtm"
  | "operatingMargin" | "netMargin" | "fcfMargin"
  | "growthTtm" | "growthForecast" | "growthCagr"
  | "topProductShare" | "netDebtEbitda" | "worstGrowth"
  | "peVsAvg" | "evEbitdaVsAvg" | "fcfYield";

export type Cutoffs = [number, number, number, number, number];

export type Unit = "pct" | "usdB" | "points" | "x" | "plain";

export type InputConfig = {
  key: InputKey;
  name: string;
  short: string; // short name used in the cut-off text
  unit: Unit;
  weight: number; // percent inside its category
  cutoffs: Cutoffs;
  analyst?: boolean; // true if the input comes from analyst forecasts
};

export type CategoryConfig = {
  key: string;
  name: string;
  weight: number; // percent of the total score
  note?: string; // extra sentence shown in the method text
  inputs: InputConfig[];
};

export const SCORE_CONFIG: CategoryConfig[] = [
  {
    key: "quality", name: "Quality", weight: 20,
    inputs: [
      { key: "roic", short: "ROIC", unit: "pct", name: "ROIC", weight: 40, cutoffs: [0, 5, 10, 18, 30] },
      { key: "cashConversion", short: "Cash conversion", unit: "pct", name: "Cash conversion, 5-year free cash flow ÷ net income", weight: 30, cutoffs: [30, 60, 80, 95, 105] },
      { key: "marginRange", short: "Margin range", unit: "points", name: "Operating margin range over 5 years, lower is steadier", weight: 30, cutoffs: [12, 8, 5, 3, 1.5] },
    ],
  },
  {
    key: "scale", name: "Scale", weight: 10, note: "Scale is context, not a quality judgment.",
    inputs: [
      { key: "marketCap", short: "Market cap", unit: "usdB", name: "Market cap", weight: 60, cutoffs: [5, 25, 100, 500, 2000] }, // $ billions
      { key: "revenueTtm", short: "Revenue", unit: "usdB", name: "Revenue, last 12 months", weight: 40, cutoffs: [2, 10, 50, 150, 300] }, // $ billions
    ],
  },
  {
    key: "profitability", name: "Profitability", weight: 25,
    inputs: [
      { key: "operatingMargin", short: "Operating margin", unit: "pct", name: "Operating margin", weight: 40, cutoffs: [0, 5, 10, 20, 30] },
      { key: "netMargin", short: "Net margin", unit: "pct", name: "Net margin", weight: 30, cutoffs: [0, 3, 8, 14, 22] },
      { key: "fcfMargin", short: "Free cash flow margin", unit: "pct", name: "Free cash flow margin", weight: 30, cutoffs: [0, 3, 8, 14, 22] },
    ],
  },
  {
    key: "growth", name: "Revenue growth", weight: 20, note: "Forecast growth is an analyst input and is flagged.",
    inputs: [
      { key: "growthTtm", short: "Last 12 months growth", unit: "pct", name: "Revenue growth, last 12 months", weight: 40, cutoffs: [-5, 0, 5, 10, 16] },
      { key: "growthForecast", short: "Forecast growth", unit: "pct", name: "Forecast revenue growth, next 3 years", weight: 30, cutoffs: [-5, 0, 5, 10, 16], analyst: true },
      { key: "growthCagr", short: "Multi-year growth", unit: "pct", name: "Revenue growth a year over the last 4 years", weight: 30, cutoffs: [-5, 0, 5, 10, 16] },
    ],
  },
  {
    key: "risk", name: "Risk", weight: 15,
    inputs: [
      { key: "topProductShare", short: "Product share", unit: "pct", name: "Largest product’s share of sales, lower is safer", weight: 40, cutoffs: [90, 70, 50, 35, 20] },
      { key: "netDebtEbitda", short: "Net debt ÷ EBITDA", unit: "plain", name: "Net debt ÷ EBITDA, lower is safer", weight: 35, cutoffs: [5, 3, 2, 1, 0] },
      { key: "worstGrowth", short: "Worst year", unit: "pct", name: "Worst year of revenue growth in 5 years", weight: 25, cutoffs: [-25, -12, -6, -2, 0] },
    ],
  },
  {
    key: "valuation", name: "Valuation", weight: 10, note: "Cheaper than its own history scores higher. The fair value model is shown separately and is not in the score.",
    inputs: [
      { key: "peVsAvg", short: "P/E against average", unit: "x", name: "P/E against its own 5-year average", weight: 35, cutoffs: [1.8, 1.5, 1.25, 1.0, 0.8] },
      { key: "evEbitdaVsAvg", short: "EV/EBITDA against average", unit: "x", name: "EV/EBITDA against its own 5-year average", weight: 35, cutoffs: [1.8, 1.5, 1.25, 1.0, 0.8] },
      { key: "fcfYield", short: "Free cash flow yield", unit: "pct", name: "Free cash flow yield", weight: 30, cutoffs: [0.3, 1.5, 3, 5, 7] },
    ],
  },
];

// If more than this share of a category's weight is missing, the category shows "Not enough data".
export const MAX_MISSING_SHARE = 0.4;

export const GRADES: [number, string][] = [
  [9.0, "A+"], [8.0, "A"], [7.5, "B+"], [7.0, "B"], [6.0, "C+"], [5.0, "C"], [3.0, "D"], [-Infinity, "F"],
];

export const LABELS: [number, string][] = [
  [9.0, "Excellent"], [7.5, "Strong"], [6.0, "Good"], [5.0, "Fair"], [-Infinity, "Weak"],
];