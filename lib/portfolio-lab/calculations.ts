/* =====================================================================
   Portfolio Lab — calculation rules (all pure functions, no React).

   Definitions used everywhere on the page:

   • A holding's percentage is a percentage of the INITIAL INVESTMENT.
   • holdingAmount      = investment * percent / 100
   • totalPercent       = sum of all holding percentages
   • allocatedAmount    = investment * totalPercent / 100
   • unallocatedAmount  = investment * max(0, 100 - totalPercent) / 100
   • overAmount         = investment * max(0, totalPercent - 100) / 100

   Nothing is ever normalized or adjusted behind the user's back.
   ===================================================================== */

import { CATEGORY_BY_ID } from "./categories";
import { formatPercent } from "./currency";
import type {
  AllocationStatus,
  CategoryId,
  CategoryRow,
  ChartSegment,
  Holding,
  HoldingDraft,
  HoldingRow,
  Observation,
  PortfolioSummary,
  PortfolioTemplate,
} from "./types";

/**
 * Two allocation totals are treated as "equal to 100%" when they are within
 * 0.000001 percentage points. That is far smaller than anything shown on
 * screen (at most 2 decimals) but larger than floating-point noise
 * (about 0.00000000000001), so it absorbs rounding errors without hiding
 * a real difference.
 */
export const ALLOCATION_TOLERANCE = 0.000001;

/** Largest investment amount accepted by the input (one trillion). */
export const MAX_INVESTMENT = 1_000_000_000_000;

/** Wording thresholds for plain-language notes. They are NOT risk scores. */
export const LARGE_HOLDING_PERCENT = 50;
export const MEANINGFUL_HOLDING_PERCENT = 25;
export const LARGE_CATEGORY_PERCENT = 60;

/* ---------- Small helpers ---------- */

export function roundTo(value: number, digits: number): number {
  if (!Number.isFinite(value)) return value;
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function amountForPercent(investment: number, percent: number): number {
  return (investment * percent) / 100;
}

/** Sum of percentages, rounded to 8 decimals to remove floating-point noise. */
export function sumPercent(holdings: Pick<Holding, "percent">[]): number {
  const total = holdings.reduce((sum, holding) => sum + holding.percent, 0);
  return roundTo(total, 8);
}

export function getAllocationStatus(
  holdingCount: number,
  totalPercent: number,
): AllocationStatus {
  if (holdingCount === 0) return "empty";
  if (Math.abs(totalPercent - 100) <= ALLOCATION_TOLERANCE) return "complete";
  return totalPercent < 100 ? "incomplete" : "over";
}

/* ---------- Parsing user input ---------- */

export type ParsedInput = {
  /** 0 when the text is empty or invalid. */
  value: number;
  error: string | null;
  isEmpty: boolean;
};

/**
 * Turns the text a user typed into a safe number.
 * Accepts digits, an optional decimal point, and thousands separators
 * ("10,000"). Rejects negatives, exponents, "Infinity", and anything else.
 */
export function parseDecimalInput(
  raw: string,
  options: { max: number; label: string },
): ParsedInput {
  const cleaned = raw.replace(/[,\s]/g, "");

  if (cleaned === "") {
    return { value: 0, error: null, isEmpty: true };
  }

  if (cleaned.startsWith("-")) {
    return {
      value: 0,
      error: `${options.label} cannot be negative.`,
      isEmpty: false,
    };
  }

  if (!/^(\d+\.?\d*|\.\d+)$/.test(cleaned)) {
    return {
      value: 0,
      error: `${options.label} must be a number, for example 25 or 12.5.`,
      isEmpty: false,
    };
  }

  const value = Number(cleaned);

  if (!Number.isFinite(value)) {
    return { value: 0, error: `${options.label} is not a valid number.`, isEmpty: false };
  }

  if (value > options.max) {
    return {
      value: 0,
      error: `${options.label} must be ${options.max.toLocaleString("en-US")} or less.`,
      isEmpty: false,
    };
  }

  return { value, error: null, isEmpty: false };
}

/** Parses every draft. Invalid or empty percentages count as 0%. */
export function toHoldings(drafts: HoldingDraft[]): {
  holdings: Holding[];
  errors: Record<string, string | null>;
} {
  const errors: Record<string, string | null> = {};

  const holdings = drafts.map((draft) => {
    const parsed = parseDecimalInput(draft.percentInput, {
      max: 100,
      label: "Allocation",
    });

    errors[draft.id] = parsed.error;

    return {
      id: draft.id,
      name: draft.name,
      category: draft.category,
      percent: parsed.value,
    };
  });

  return { holdings, errors };
}

/* ---------- Portfolio summary ---------- */

export function calculatePortfolio(
  investment: number,
  holdings: Holding[],
): PortfolioSummary {
  const safeInvestment =
    Number.isFinite(investment) && investment > 0 ? investment : 0;

  const rows: HoldingRow[] = holdings.map((holding) => ({
    ...holding,
    displayName: holding.name.trim() || "Unnamed holding",
    amount: amountForPercent(safeInvestment, holding.percent),
  }));

  const totalPercent = sumPercent(holdings);
  const status = getAllocationStatus(holdings.length, totalPercent);

  const unallocatedPercent =
    status === "complete" ? 0 : Math.max(0, roundTo(100 - totalPercent, 8));
  const overPercent =
    status === "complete" ? 0 : Math.max(0, roundTo(totalPercent - 100, 8));

  const byCategory = new Map<CategoryId, CategoryRow>();

  for (const row of rows) {
    if (row.percent <= 0) continue;

    const existing = byCategory.get(row.category);

    if (existing) {
      existing.percent = roundTo(existing.percent + row.percent, 8);
      existing.amount += row.amount;
      existing.holdingCount += 1;
    } else {
      byCategory.set(row.category, {
        category: row.category,
        percent: row.percent,
        amount: row.amount,
        holdingCount: 1,
      });
    }
  }

  const categories = [...byCategory.values()].sort(
    (a, b) => b.percent - a.percent,
  );

  return {
    investment: safeInvestment,
    holdingCount: holdings.length,
    allocatedCategoryCount: categories.length,
    totalPercent,
    allocatedAmount: amountForPercent(safeInvestment, totalPercent),
    unallocatedPercent,
    unallocatedAmount: amountForPercent(safeInvestment, unallocatedPercent),
    overPercent,
    overAmount: amountForPercent(safeInvestment, overPercent),
    status,
    rows,
    categories,
  };
}

/* ---------- Chart data ---------- */

/**
 * Builds the donut segments from the same summary used by the table.
 *
 * • Incomplete: the ring represents 100% and the missing part is drawn as
 *   an "Unallocated" segment.
 * • Over-allocated: the ring cannot exceed a full circle, so each holding
 *   is drawn as its share of the TOTAL. The screen must say so.
 */
export function buildChartSegments(summary: PortfolioSummary): ChartSegment[] {
  const active = summary.rows.filter((row) => row.percent > 0);

  if (active.length === 0) return [];

  const ringBase = Math.max(summary.totalPercent, 100);
  const seenInCategory = new Map<CategoryId, number>();

  const segments: ChartSegment[] = active.map((row) => {
    const shade = seenInCategory.get(row.category) ?? 0;
    seenInCategory.set(row.category, shade + 1);

    return {
      id: row.id,
      label: row.displayName,
      categoryId: row.category,
      percent: row.percent,
      share: (row.percent / ringBase) * 100,
      shade,
    };
  });

  if (summary.status === "incomplete") {
    segments.push({
      id: "unallocated",
      label: "Unallocated",
      categoryId: "unallocated",
      percent: summary.unallocatedPercent,
      share: (summary.unallocatedPercent / ringBase) * 100,
      shade: 0,
    });
  }

  return segments;
}

/* ---------- Plain-language observations ---------- */

function categoryLabel(id: CategoryId) {
  return CATEGORY_BY_ID[id].label;
}

/**
 * Observations are based ONLY on what the user typed: names, categories, and
 * percentages. They never claim anything about geography, fund contents,
 * correlations, volatility, returns, or the user's risk tolerance.
 */
export function generateObservations(summary: PortfolioSummary): Observation[] {
  if (summary.status === "empty") return [];

  const observations: Observation[] = [];

  // 1. Allocation status
  if (summary.status === "incomplete") {
    observations.push({
      id: "status",
      tone: "notice",
      title: "The portfolio is not fully allocated",
      text: `${formatPercent(summary.totalPercent)} of the initial investment is allocated, and ${formatPercent(summary.unallocatedPercent)} is not. The observations below describe only the allocated part.`,
    });
  } else if (summary.status === "over") {
    observations.push({
      id: "status",
      tone: "warning",
      title: "The allocation is above 100%",
      text: `The holdings add up to ${formatPercent(summary.totalPercent)}, which is ${formatPercent(summary.overPercent)} more than the initial investment. Lower one or more allocations before reading the observations below as a complete portfolio.`,
    });
  } else {
    observations.push({
      id: "status",
      tone: "info",
      title: "The portfolio is fully allocated",
      text: "The holdings add up to 100% of the initial investment.",
    });
  }

  const active = summary.rows.filter((row) => row.percent > 0);

  if (active.length === 0) {
    return observations;
  }

  // 2. Largest holding
  const largest = active.reduce((best, row) =>
    row.percent > best.percent ? row : best,
  );

  if (largest.category === "cash") {
    observations.push({
      id: "largest-holding",
      tone: "info",
      title: "Your largest holding is cash",
      text: `${largest.displayName} is ${formatPercent(largest.percent)} of the initial investment. Money kept as cash is less exposed to market price swings, but cash can lose buying power to inflation and may earn little interest.`,
    });
  } else if (largest.percent >= LARGE_HOLDING_PERCENT) {
    observations.push({
      id: "largest-holding",
      tone: "notice",
      title: "One holding is a large share",
      text: `${largest.displayName} is ${formatPercent(largest.percent)} of the initial investment. A large position can make the portfolio's results depend heavily on that one holding.`,
    });
  } else if (largest.percent >= MEANINGFUL_HOLDING_PERCENT) {
    observations.push({
      id: "largest-holding",
      tone: "info",
      title: "Your largest holding is a meaningful share",
      text: `${largest.displayName} is ${formatPercent(largest.percent)} of the initial investment, so its performance can noticeably affect the portfolio.`,
    });
  } else {
    observations.push({
      id: "largest-holding",
      tone: "info",
      title: "No single holding dominates",
      text: `Your largest holding, ${largest.displayName}, is ${formatPercent(largest.percent)} of the initial investment. This says nothing about how the holdings behave together.`,
    });
  }

  // 3. Largest category and category count
  const topCategory = summary.categories[0];

  if (summary.allocatedCategoryCount === 1) {
    observations.push({
      id: "categories",
      tone: "notice",
      title: "All allocated money is in one category",
      text: `Everything allocated sits in ${categoryLabel(topCategory.category)}. The portfolio may move mostly with that one kind of asset.`,
    });
  } else {
    const spread = `Your allocation spans ${summary.allocatedCategoryCount} asset categories. Different categories can behave differently, but spreading money across categories does not by itself prove the portfolio is diversified.`;

    if (topCategory.percent >= LARGE_CATEGORY_PERCENT) {
      observations.push({
        id: "categories",
        tone: "notice",
        title: "One category is most of the portfolio",
        text: `${categoryLabel(topCategory.category)} make up ${formatPercent(topCategory.percent)} of the initial investment. ${spread}`,
      });
    } else {
      observations.push({
        id: "categories",
        tone: "info",
        title: "Spread across several categories",
        text: `The largest category is ${categoryLabel(topCategory.category)} at ${formatPercent(topCategory.percent)}. ${spread}`,
      });
    }
  }

  // 4. Cryptocurrency
  const bitcoin = summary.categories.find((c) => c.category === "bitcoin");
  const otherCrypto = summary.categories.find(
    (c) => c.category === "other-crypto",
  );

  if (bitcoin || otherCrypto) {
    const parts: string[] = [];
    if (bitcoin) parts.push(`Bitcoin ${formatPercent(bitcoin.percent)}`);
    if (otherCrypto) {
      parts.push(`other cryptocurrency ${formatPercent(otherCrypto.percent)}`);
    }

    observations.push({
      id: "crypto",
      tone: "notice",
      title: "Cryptocurrency is included",
      text: `The portfolio includes ${parts.join(" and ")}. Cryptocurrency prices can swing sharply and may fall by a large amount. Scope cannot predict how they will move.`,
    });
  }

  // 5. Funds
  const hasFunds = summary.categories.some(
    (c) => c.category === "equity-etf" || c.category === "bond-etf",
  );

  if (hasFunds) {
    observations.push({
      id: "funds",
      tone: "info",
      title: "A fund label does not show what is inside",
      text: "ETFs can hold very different things. Two equity ETFs may own similar companies, and one ETF can be concentrated in a single country, industry, or company. Portfolio Lab does not analyze fund holdings.",
    });
  }

  return observations;
}

/* ---------- Templates ---------- */

/** True when the current holdings are exactly the template's holdings. */
export function portfolioMatchesTemplate(
  holdings: Holding[],
  template: PortfolioTemplate,
): boolean {
  if (holdings.length !== template.holdings.length) return false;

  return holdings.every((holding, index) => {
    const expected = template.holdings[index];

    return (
      holding.name === expected.name &&
      holding.category === expected.category &&
      Math.abs(holding.percent - expected.percent) < 1e-9
    );
  });
}
