/* =====================================================================
   Portfolio Lab — risk and concentration analysis (Phase 4)

   Everything here is computed ONLY from what the user typed: holding
   names, asset categories, and percentages. Nothing is guessed about
   what a fund holds, where a company earns money, or how assets move
   together, and there is no risk score.

   Concentration measure
   ---------------------
   "Effective number of holdings" = 1 / HHI, where HHI is the sum of the
   squared weights (the Herfindahl-Hirschman index, a standard measure of
   how evenly something is spread). Weights are each holding's share of
   the ALLOCATED money. Reading it:
     • 4 equal holdings            -> 4.0
     • 60% / 30% / 10%             -> about 2.2
     • one holding                 -> 1.0
   It only describes how evenly the money is spread. It says nothing
   about how the holdings behave together.
   ===================================================================== */

import { CATEGORIES } from "./categories";
import { roundTo } from "./calculations";
import type {
  AllocationStatus,
  CategoryId,
  Observation,
  PortfolioSummary,
} from "./types";

/** Wording thresholds for plain-language notes. They are NOT risk scores. */
export const UNEVEN_RATIO = 0.7; // effective holdings below 70% of the count
export const TOP_THREE_NOTE_PERCENT = 80;
export const STOCK_GROUP_NOTE_PERCENT = 50;
export const STOCK_GROUP_MAX_COUNT = 4;

export type RankedHolding = {
  id: string;
  name: string;
  category: CategoryId;
  percent: number; // % of the initial investment
  amount: number;
};

export type ExposureRow = {
  category: CategoryId;
  percent: number;
  amount: number;
  holdingCount: number;
};

export type RiskAnalysis = {
  status: AllocationStatus;
  investment: number;
  totalPercent: number;
  allocatedAmount: number;
  unallocatedPercent: number;
  unallocatedAmount: number;
  overPercent: number;
  overAmount: number;

  /** Holdings with an allocation above 0%, largest first. */
  holdings: RankedHolding[];
  topHolding: RankedHolding | null;
  /** Sum of the three largest holdings, as % of the initial investment. */
  topThreePercent: number;
  effectiveHoldings: number | null;

  /** Only categories with an allocation above 0%, largest first. */
  categories: ExposureRow[];
  absentCategories: CategoryId[];
  topCategory: ExposureRow | null;
  effectiveCategories: number | null;

  cashPercent: number;
  bitcoinPercent: number;
  otherCryptoPercent: number;
  cryptoPercent: number;
  /** Equity ETFs + bond ETFs: money in funds whose contents are unknown here. */
  fundPercent: number;
  individualStockPercent: number;
  individualStockCount: number;
  equityEtfCount: number;
  bondEtfCount: number;

  duplicateNames: { name: string; count: number }[];
  unnamedCount: number;
  zeroAllocationCount: number;
};

/** 1 / HHI of the weights (normalized to add up to 1). Null when there is nothing. */
export function effectiveNumber(weights: number[]): number | null {
  const positive = weights.filter((w) => Number.isFinite(w) && w > 0);
  const total = positive.reduce((sum, w) => sum + w, 0);

  if (positive.length === 0 || !(total > 0)) return null;

  const hhi = positive.reduce((sum, w) => sum + (w / total) ** 2, 0);

  return 1 / hhi;
}

function percentOf(categories: ExposureRow[], ids: CategoryId[]): number {
  return roundTo(
    categories
      .filter((row) => ids.includes(row.category))
      .reduce((sum, row) => sum + row.percent, 0),
    8,
  );
}

export function analyzeRisk(summary: PortfolioSummary): RiskAnalysis {
  const holdings: RankedHolding[] = summary.rows
    .filter((row) => row.percent > 0)
    .map((row) => ({
      id: row.id,
      name: row.displayName,
      category: row.category,
      percent: row.percent,
      amount: row.amount,
    }))
    .sort((a, b) => b.percent - a.percent);

  const categories: ExposureRow[] = summary.categories.map((row) => ({
    category: row.category,
    percent: row.percent,
    amount: row.amount,
    holdingCount: row.holdingCount,
  }));

  const present = new Set(categories.map((row) => row.category));
  const absentCategories = CATEGORIES.map((c) => c.id).filter(
    (id) => !present.has(id),
  );

  // Names typed more than once (ignoring case and spaces).
  const nameCounts = new Map<string, { name: string; count: number }>();

  for (const row of summary.rows) {
    const trimmed = row.name.trim();
    if (trimmed === "") continue;

    const key = trimmed.toLowerCase();
    const existing = nameCounts.get(key);

    if (existing) existing.count += 1;
    else nameCounts.set(key, { name: trimmed, count: 1 });
  }

  const bitcoinPercent = percentOf(categories, ["bitcoin"]);
  const otherCryptoPercent = percentOf(categories, ["other-crypto"]);

  return {
    status: summary.status,
    investment: summary.investment,
    totalPercent: summary.totalPercent,
    allocatedAmount: summary.allocatedAmount,
    unallocatedPercent: summary.unallocatedPercent,
    unallocatedAmount: summary.unallocatedAmount,
    overPercent: summary.overPercent,
    overAmount: summary.overAmount,

    holdings,
    topHolding: holdings[0] ?? null,
    topThreePercent: roundTo(
      holdings.slice(0, 3).reduce((sum, h) => sum + h.percent, 0),
      8,
    ),
    effectiveHoldings: effectiveNumber(holdings.map((h) => h.percent)),

    categories,
    absentCategories,
    topCategory: categories[0] ?? null,
    effectiveCategories: effectiveNumber(categories.map((c) => c.percent)),

    cashPercent: percentOf(categories, ["cash"]),
    bitcoinPercent,
    otherCryptoPercent,
    cryptoPercent: roundTo(bitcoinPercent + otherCryptoPercent, 8),
    fundPercent: percentOf(categories, ["equity-etf", "bond-etf"]),
    individualStockPercent: percentOf(categories, ["individual-stocks"]),
    individualStockCount: holdings.filter(
      (h) => h.category === "individual-stocks",
    ).length,
    equityEtfCount: holdings.filter((h) => h.category === "equity-etf").length,
    bondEtfCount: holdings.filter((h) => h.category === "bond-etf").length,

    duplicateNames: [...nameCounts.values()].filter((item) => item.count > 1),
    unnamedCount: summary.rows.filter((row) => row.name.trim() === "").length,
    zeroAllocationCount: summary.rows.filter((row) => row.percent <= 0).length,
  };
}

/* ---------- Additional plain-language notes (conditional wording) ---------- */

function pct(value: number): string {
  const rounded = roundTo(value, 2);
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}%`;
}

/**
 * Notes that go beyond the basic ones in generateObservations().
 * Each one is based only on the numbers in the analysis.
 */
export function buildRiskNotes(analysis: RiskAnalysis): Observation[] {
  const notes: Observation[] = [];
  const count = analysis.holdings.length;

  // How evenly the money is spread across holdings
  if (count >= 2 && analysis.effectiveHoldings !== null) {
    const effective = roundTo(analysis.effectiveHoldings, 1);
    const ratio = analysis.effectiveHoldings / count;

    if (ratio < UNEVEN_RATIO) {
      notes.push({
        id: "evenness",
        tone: "notice",
        title: "The money is spread unevenly across holdings",
        text: `You have ${count} holdings, but the concentration is similar to about ${effective} equal-sized holdings, because a few holdings are much larger than the rest.`,
      });
    } else {
      notes.push({
        id: "evenness",
        tone: "info",
        title: "The money is spread fairly evenly across holdings",
        text: `You have ${count} holdings and the concentration is similar to about ${effective} equal-sized holdings. This only describes how evenly the money is split, not how the holdings behave together.`,
      });
    }
  }

  // Three largest holdings
  if (count >= 4 && analysis.topThreePercent >= TOP_THREE_NOTE_PERCENT) {
    notes.push({
      id: "top-three",
      tone: "notice",
      title: "Three holdings make up most of the portfolio",
      text: `Your three largest holdings are ${pct(analysis.topThreePercent)} of the initial investment, so the rest of the holdings have a small effect on the total.`,
    });
  }

  // A handful of individual stocks
  if (
    analysis.individualStockCount >= 1 &&
    analysis.individualStockCount <= STOCK_GROUP_MAX_COUNT &&
    analysis.individualStockPercent >= STOCK_GROUP_NOTE_PERCENT
  ) {
    const noun = analysis.individualStockCount === 1 ? "stock" : "stocks";

    notes.push({
      id: "few-stocks",
      tone: "notice",
      title: "A large share is in a few individual stocks",
      text: `${pct(analysis.individualStockPercent)} of the initial investment is in ${analysis.individualStockCount} individual ${noun}. News that affects one company can move the portfolio noticeably.`,
    });
  }

  // Several funds of the same kind
  if (analysis.equityEtfCount >= 2 || analysis.bondEtfCount >= 2) {
    const parts: string[] = [];
    if (analysis.equityEtfCount >= 2) parts.push(`${analysis.equityEtfCount} equity ETFs`);
    if (analysis.bondEtfCount >= 2) parts.push(`${analysis.bondEtfCount} bond ETFs`);

    notes.push({
      id: "fund-overlap",
      tone: "notice",
      title: "Several funds of the same kind may overlap",
      text: `You listed ${parts.join(" and ")}. Funds of the same kind can own many of the same things, so holding several does not automatically add diversification. Portfolio Lab cannot measure the overlap because it does not have the funds' holdings.`,
    });
  }

  // Duplicate names
  if (analysis.duplicateNames.length > 0) {
    const list = analysis.duplicateNames
      .map((item) => `“${item.name}” (${item.count} times)`)
      .join(", ");

    notes.push({
      id: "duplicates",
      tone: "info",
      title: "Some holdings share a name",
      text: `${list}. If they are the same asset, the totals above treat them as separate holdings, so combining them would show the true size of that position.`,
    });
  }

  return notes;
}
