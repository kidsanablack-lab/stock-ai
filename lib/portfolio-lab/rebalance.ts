/* =====================================================================
   Portfolio Lab — Rebalancing Tool (Phase 5B).
   Pure functions only. No React, no storage. Never places trades.

   Compare the CURRENT allocation with a TARGET the user typed.

   Base value V = the money currently allocated to holdings
   (the sum of the category amounts). It is NOT always the initial
   investment: if the portfolio is only 80% allocated, V is 80% of it.
   Unallocated money is not part of the comparison.

   Shares of V:
     currentPercent   = currentAmount / V * 100
     differencePoints = currentPercent - targetPercent   (percentage points)

   Method 1 — adjust existing amounts (theory, no trades are made):
     targetAmount     = V * t / 100
     adjustment       = targetAmount - currentAmount
                        positive = add, negative = reduce

   Method 2 — new contribution only (N = new money, nothing is reduced):
     postTargetAmount = (V + N) * t / 100
     shortfall        = max(0, postTargetAmount - currentAmount)
     new money to a category = N * shortfall / (sum of all shortfalls)
     remainingAmount  = amountAfter - postTargetAmount
                        positive = still above target, negative = still below

   Σ shortfall is always at least N, so all of N can be placed. When some
   category is above target, new money alone cannot bring it down, and the
   "remaining" columns show what is left.

   The target is never normalized or adjusted. Results exist only when the
   target adds up to 100% (within the same tolerance the builder uses).
   ===================================================================== */

import { MAX_INVESTMENT, getAllocationStatus, parseDecimalInput, roundTo, sumPercent } from "./calculations";
import { CATEGORIES } from "./categories";
import type { AllocationStatus, CategoryId, CategoryRow } from "./types";

/** Raw text for each category's target percentage. */
export type TargetInputs = Record<CategoryId, string>;

export function emptyTargetInputs(): TargetInputs {
  return Object.fromEntries(
    CATEGORIES.map((category) => [category.id, "0"]),
  ) as TargetInputs;
}

/**
 * Copies the current portfolio's shares of V into target text.
 * Rounded to 8 decimals: that is far finer than anything shown, and the
 * rounding error stays well inside the 100% tolerance.
 */
export function targetInputsFromCurrent(
  current: Pick<CategoryRow, "category" | "amount">[],
): TargetInputs {
  const inputs = emptyTargetInputs();
  const base = current.reduce((sum, row) => sum + row.amount, 0);

  if (!(base > 0)) return inputs;

  for (const row of current) {
    if (row.amount > 0) {
      inputs[row.category] = String(roundTo((row.amount / base) * 100, 8));
    }
  }

  return inputs;
}

/* ---------- Parsing and validating the target ---------- */

export type ParsedTarget = {
  percents: Record<CategoryId, number>;
  errors: Partial<Record<CategoryId, string>>;
  totalPercent: number;
  status: AllocationStatus;
  /** True only when every field is valid AND the total is 100%. */
  isValid: boolean;
};

export function parseTarget(inputs: TargetInputs): ParsedTarget {
  const percents = {} as Record<CategoryId, number>;
  const errors: Partial<Record<CategoryId, string>> = {};

  for (const category of CATEGORIES) {
    const parsed = parseDecimalInput(inputs[category.id] ?? "", {
      max: 100,
      label: `${category.short} target`,
    });

    percents[category.id] = parsed.value;

    if (parsed.isEmpty) {
      errors[category.id] = "Enter a target. Use 0 for none.";
    } else if (parsed.error) {
      errors[category.id] = parsed.error;
    }
  }

  const values = CATEGORIES.map((c) => ({ percent: percents[c.id] }));
  const totalPercent = sumPercent(values);
  const count = values.filter((v) => v.percent > 0).length;
  const status = getAllocationStatus(count, totalPercent);
  const hasErrors = Object.keys(errors).length > 0;

  return {
    percents,
    errors,
    totalPercent,
    status,
    isValid: !hasErrors && status === "complete",
  };
}

/* ---------- Calculation ---------- */

export type RebalanceRow = {
  category: CategoryId;
  currentAmount: number;
  currentPercent: number;
  targetPercent: number;
  /** currentPercent - targetPercent, in percentage points. */
  differencePoints: number;

  /* Method 1: adjust existing amounts (theory) */
  targetAmount: number;
  /** targetAmount - currentAmount. Positive = add, negative = reduce. */
  adjustment: number;

  /* Method 2: new contribution only */
  postTargetAmount: number;
  contribution: number;
  amountAfter: number;
  percentAfter: number;
  /** amountAfter - postTargetAmount. Positive = still above target. */
  remainingAmount: number;
  /** percentAfter - targetPercent, in percentage points. */
  remainingPoints: number;
};

export type RebalanceResult = {
  baseValue: number;
  contribution: number;
  /** baseValue + contribution */
  newTotal: number;
  rows: RebalanceRow[];
  /** Method 1: total of the "add" amounts. */
  totalToAdd: number;
  /** Method 1: total of the "reduce" amounts (shown as a positive number). */
  totalToReduce: number;
  /** Method 2: total of what is still above target after the new money. */
  remainingOverweight: number;
  /** Method 2: true when the new money brings every category onto target. */
  contributionBalances: boolean;
};

export type AdjustmentDirection = "add" | "reduce" | "none";

/** Amounts closer to zero than this are floating-point noise, not a real gap. */
function noiseLimit(baseValue: number, contribution: number): number {
  return 1e-9 * Math.max(1, baseValue + contribution);
}

export function adjustmentDirection(
  amount: number,
  baseValue: number,
  contribution = 0,
): AdjustmentDirection {
  if (Math.abs(amount) <= noiseLimit(baseValue, contribution)) return "none";
  return amount > 0 ? "add" : "reduce";
}

/**
 * Compares current amounts with a target.
 * Returns null when the target is not valid (it must total 100%): the
 * target is never fixed or normalized for the user.
 * Reads its inputs and never modifies them.
 */
export function calculateRebalance(
  current: readonly Pick<CategoryRow, "category" | "amount">[],
  target: Pick<ParsedTarget, "percents" | "isValid">,
  contribution = 0,
): RebalanceResult | null {
  if (!target.isValid) return null;

  const newMoney =
    Number.isFinite(contribution) && contribution > 0 ? contribution : 0;

  const currentById = new Map<CategoryId, number>();
  for (const row of current) {
    if (row.amount > 0) {
      currentById.set(row.category, (currentById.get(row.category) ?? 0) + row.amount);
    }
  }

  const baseValue = [...currentById.values()].reduce((sum, a) => sum + a, 0);
  const newTotal = baseValue + newMoney;
  const noise = noiseLimit(baseValue, newMoney);

  // Only categories that matter: held now, or wanted in the target.
  const categories = CATEGORIES.filter(
    (category) =>
      currentById.has(category.id) || target.percents[category.id] > 0,
  );

  const partial = categories.map((category) => {
    const currentAmount = currentById.get(category.id) ?? 0;
    const targetPercent = target.percents[category.id];
    const postTargetAmount = (newTotal * targetPercent) / 100;

    return {
      category: category.id,
      currentAmount,
      targetPercent,
      postTargetAmount,
      shortfall: Math.max(0, postTargetAmount - currentAmount),
    };
  });

  const totalShortfall = partial.reduce((sum, row) => sum + row.shortfall, 0);

  const rows: RebalanceRow[] = partial.map((row) => {
    const currentPercent =
      baseValue > 0 ? (row.currentAmount / baseValue) * 100 : 0;
    const targetAmount = (baseValue * row.targetPercent) / 100;

    const contributionAmount =
      newMoney > 0 && totalShortfall > 0
        ? (newMoney * row.shortfall) / totalShortfall
        : 0;

    const amountAfter = row.currentAmount + contributionAmount;
    const rawRemaining = amountAfter - row.postTargetAmount;
    const remainingAmount = Math.abs(rawRemaining) <= noise ? 0 : rawRemaining;
    const percentAfter = newTotal > 0 ? (amountAfter / newTotal) * 100 : 0;

    return {
      category: row.category,
      currentAmount: row.currentAmount,
      currentPercent,
      targetPercent: row.targetPercent,
      differencePoints: currentPercent - row.targetPercent,
      targetAmount,
      adjustment: targetAmount - row.currentAmount,
      postTargetAmount: row.postTargetAmount,
      contribution: contributionAmount,
      amountAfter,
      percentAfter,
      remainingAmount,
      remainingPoints: percentAfter - row.targetPercent,
    };
  });

  const totalToAdd = rows.reduce(
    (sum, row) => sum + (row.adjustment > noise ? row.adjustment : 0),
    0,
  );
  const totalToReduce = rows.reduce(
    (sum, row) => sum + (row.adjustment < -noise ? -row.adjustment : 0),
    0,
  );
  const remainingOverweight = rows.reduce(
    (sum, row) => sum + (row.remainingAmount > 0 ? row.remainingAmount : 0),
    0,
  );

  return {
    baseValue,
    contribution: newMoney,
    newTotal,
    rows,
    totalToAdd,
    totalToReduce,
    remainingOverweight,
    contributionBalances: rows.every((row) => row.remainingAmount === 0),
  };
}

/** Parses the new-contribution text with the same rules as the investment amount. */
export function parseContribution(raw: string) {
  return parseDecimalInput(raw, { max: MAX_INVESTMENT, label: "New contribution" });
}
