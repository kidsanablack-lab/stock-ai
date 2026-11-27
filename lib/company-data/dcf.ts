// lib/company-data/dcf.ts
// Scope's fair value model in ONE place, so no company file types a fair value by hand.
//
// Method (the same one every company page describes): free cash flow grows at g1 for years 1-5 and at g2 for
// years 6-10, then at gt for ever. Everything is discounted at r. Net cash is added and the total is divided by
// diluted shares. I checked this against the hand-typed values in apple.ts, microsoft.ts, nvidia.ts and google.ts:
// all bear, base and bull values and all "needed growth" figures match within 1 (rounding of the inputs).
//
// Rates are decimals here (0.08 = 8%). Money is in billions, shares in billions, price in dollars.

export type DcfInput = {
  /** Free cash flow, last 12 months. Use facts.ttm.fcf. */
  fcf0: number;
  /** Cash and securities minus debt, from the NEWEST balance sheet you use on the page (not always the annual one). */
  netCash: number;
  /** Diluted shares, in billions. */
  shares: number;
};

export type DcfCase = { g1: number; g2: number; gt: number; r: number };

export const DCF_CASE_NAMES = ["Bear", "Base", "Bull"] as const;

type Result = { perShare: number; terminalShare: number };

// Returns null when the model cannot work: no positive starting cash flow, or a discount rate not above the terminal growth.
function run(i: DcfInput, c: DcfCase): Result | null {
  if (!(i.fcf0 > 0) || !(i.shares > 0) || !(c.r > c.gt)) return null;
  let f = i.fcf0;
  let pv = 0;
  for (let t = 1; t <= 10; t++) {
    f *= 1 + (t <= 5 ? c.g1 : c.g2);
    pv += f / (1 + c.r) ** t;
  }
  const tv = (f * (1 + c.gt)) / (c.r - c.gt) / (1 + c.r) ** 10;
  return { perShare: (pv + tv + i.netCash) / i.shares, terminalShare: tv / (pv + tv) };
}

const pct = (x: number) => `${+(x * 100).toFixed(1)}%`;

/**
 * Everything the Valuation section needs from the model.
 * `cases` must be [bear, base, bull]. Returns null when there is no fair value (for example negative free cash flow),
 * and the company file then sets `fair: null` and fills `noFair`, as amazon.ts does.
 */
export function dcfCases(input: DcfInput, cases: [DcfCase, DcfCase, DcfCase]) {
  const results = cases.map((c) => run(input, c));
  if (results.some((r) => r === null)) return null;
  const rs = results as Result[];
  const fairValues = rs.map((r) => Math.round(r.perShare));
  return {
    /** The base case, for `fair`. */
    fair: fairValues[1],
    /** For `implied.fairValues` and the first row of `field.rows` (low, mark, high). */
    fairValues,
    /** Share of the base-case value that comes after year 10, in percent. Use it in the note instead of typing "69%". */
    terminalSharePct: Math.round(rs[1].terminalShare * 100),
    /** For `implied.cases` and `implied.assumptions`. */
    casesLabels: [...DCF_CASE_NAMES],
    assumptions: [
      { label: "Cash flow growth, years 1–5", values: cases.map((c) => pct(c.g1)) },
      { label: "Cash flow growth, years 6–10", values: cases.map((c) => pct(c.g2)) },
      { label: "Growth after year 10", values: cases.map((c) => pct(c.gt)) },
      { label: "Discount rate", values: cases.map((c) => pct(c.r)) },
    ],
  };
}

/**
 * The growth per year, for years 1-5, that makes the model equal today's price. Years 6-10, terminal growth
 * and discount rate are the base case's. Returns a percent (14.0 = 14% a year), or null if no growth up to 300% reaches the price.
 */
export function impliedGrowthPct(input: DcfInput, price: number, base: Omit<DcfCase, "g1">): number | null {
  const at = (g1: number) => run(input, { ...base, g1 })?.perShare ?? null;
  const top = at(3);
  if (top === null || top < price) return null;
  let lo = -0.5;
  let hi = 3;
  for (let n = 0; n < 100; n++) {
    const mid = (lo + hi) / 2;
    const v = at(mid);
    if (v === null) return null;
    if (v < price) lo = mid;
    else hi = mid;
  }
  return Math.round(((lo + hi) / 2) * 1000) / 10;
}