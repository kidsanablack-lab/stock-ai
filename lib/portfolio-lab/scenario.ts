/* =====================================================================
   Portfolio Lab — What-if Scenario Simulator (Phase 5A).
   Pure functions only. No React, no storage.

   Idea: the user types an ASSUMED price change for each asset category.
   We apply it to the money currently allocated to each holding.

     scenarioValue          = currentAmount * (1 + assumedChange / 100)
     scenarioPortfolioValue = sum of every holding's scenarioValue
     absoluteChange         = scenarioPortfolioValue - originalValue
     percentageChange       = absoluteChange / originalValue * 100
                              (only when originalValue > 0, otherwise null)

   Rules:
   • The base is the money that is currently ALLOCATED to holdings.
     Unallocated money is not treated as an asset.
   • If Cash is a holding, the Cash assumption is applied to it like any
     other category (it starts at 0%).
   • An asset cannot lose more than 100%, so the lowest allowed change is
     -100%. The highest allowed change is +1000%, to catch typing mistakes.
   • Nothing here changes the portfolio. Functions return new objects.
   • These are assumptions, not predictions.
   ===================================================================== */

import { CATEGORIES, CATEGORY_BY_ID } from "./categories";
import { parseSignedDecimalInput } from "./projection";
import type { CategoryId, HoldingRow } from "./types";

export const MIN_CHANGE_PERCENT = -100;
export const MAX_CHANGE_PERCENT = 1000;

/** Raw text for each category, exactly as typed. Source of truth for the form. */
export type ScenarioInputs = Record<CategoryId, string>;

/** Parsed numbers, one per category. */
export type ScenarioChanges = Record<CategoryId, number>;

/* ---------- Illustrative starting scenarios ---------- */

export type ScenarioPreset = {
  id: string;
  name: string;
  /** Plain-language note shown next to the button. */
  description: string;
  /** Only the categories that change. All others stay at 0%. */
  changes: Partial<Record<CategoryId, number>>;
};

// "Stocks" covers individual stocks AND equity ETFs; "Bonds" covers bonds
// AND bond ETFs. The user can still edit all ten categories by hand.
const STOCK_CATEGORIES: CategoryId[] = ["individual-stocks", "equity-etf"];
const BOND_CATEGORIES: CategoryId[] = ["bonds", "bond-etf"];

function apply(categories: CategoryId[], change: number) {
  return Object.fromEntries(categories.map((id) => [id, change])) as Partial<
    Record<CategoryId, number>
  >;
}

/** Examples only. They are not forecasts and not a view on any market. */
export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: "stocks-fall",
    name: "Stocks fall 20%",
    description: "Individual stocks and equity ETFs −20%",
    changes: apply(STOCK_CATEGORIES, -20),
  },
  {
    id: "bonds-fall",
    name: "Bonds fall 5%",
    description: "Bonds and bond ETFs −5%",
    changes: apply(BOND_CATEGORIES, -5),
  },
  {
    id: "bitcoin-fall",
    name: "Bitcoin falls 50%",
    description: "Bitcoin −50%",
    changes: { bitcoin: -50 },
  },
  {
    id: "combined-downturn",
    name: "Combined downturn",
    description: "Stocks −20%, bonds −5%, and Bitcoin −50% at the same time",
    changes: {
      ...apply(STOCK_CATEGORIES, -20),
      ...apply(BOND_CATEGORIES, -5),
      bitcoin: -50,
    },
  },
];

export function getPreset(id: string | null): ScenarioPreset | null {
  return SCENARIO_PRESETS.find((preset) => preset.id === id) ?? null;
}

/* ---------- Input text ---------- */

/** Every category at "0": no assumed change. Also the "reset" state. */
export function emptyScenarioInputs(): ScenarioInputs {
  return Object.fromEntries(
    CATEGORIES.map((category) => [category.id, "0"]),
  ) as ScenarioInputs;
}

export function presetToInputs(preset: ScenarioPreset): ScenarioInputs {
  const inputs = emptyScenarioInputs();

  for (const category of CATEGORIES) {
    const change = preset.changes[category.id];
    if (change !== undefined) inputs[category.id] = String(change);
  }

  return inputs;
}

export type ParsedScenario = {
  changes: ScenarioChanges;
  errors: Partial<Record<CategoryId, string>>;
  isValid: boolean;
};

/** Parses every category. A blank or invalid field is an error, not a silent 0. */
export function parseScenario(inputs: ScenarioInputs): ParsedScenario {
  const changes = {} as ScenarioChanges;
  const errors: Partial<Record<CategoryId, string>> = {};

  for (const category of CATEGORIES) {
    const parsed = parseSignedDecimalInput(inputs[category.id] ?? "", {
      min: MIN_CHANGE_PERCENT,
      max: MAX_CHANGE_PERCENT,
      label: `${category.short} change`,
    });

    changes[category.id] = parsed.value;

    if (parsed.isEmpty) {
      errors[category.id] = "Enter a change. Use 0 for no change.";
    } else if (parsed.error) {
      errors[category.id] = parsed.error;
    }
  }

  return { changes, errors, isValid: Object.keys(errors).length === 0 };
}

/* ---------- Calculation ---------- */

export type ScenarioHoldingRow = {
  id: string;
  displayName: string;
  category: CategoryId;
  baseAmount: number;
  changePercent: number;
  scenarioAmount: number;
  changeAmount: number;
};

export type ScenarioResult = {
  /** Money currently allocated to holdings (the simulation base). */
  baseValue: number;
  scenarioValue: number;
  absoluteChange: number;
  /** null when baseValue is 0, because a percentage of nothing is undefined. */
  percentageChange: number | null;
  /** Decided with a tiny tolerance so floating-point noise reads as "none". */
  direction: "up" | "down" | "none";
  rows: ScenarioHoldingRow[];
};

const DIRECTION_TOLERANCE = 1e-9;

/**
 * Applies the assumed changes to the current holding amounts.
 * Reads `rows` but never modifies them.
 */
export function calculateScenario(
  rows: readonly HoldingRow[],
  changes: ScenarioChanges,
): ScenarioResult {
  const resultRows: ScenarioHoldingRow[] = [];

  for (const row of rows) {
    // Rows with no money in them cannot change the result.
    if (!(row.amount > 0)) continue;

    const changePercent = changes[row.category] ?? 0;

    // An asset cannot go below zero. The form already blocks values under
    // -100%; this guard keeps the function safe if it is called directly.
    const factor = Math.max(0, 1 + changePercent / 100);
    const scenarioAmount = row.amount * factor;

    resultRows.push({
      id: row.id,
      displayName: row.displayName,
      category: row.category,
      baseAmount: row.amount,
      changePercent,
      scenarioAmount,
      changeAmount: scenarioAmount - row.amount,
    });
  }

  const baseValue = resultRows.reduce((sum, r) => sum + r.baseAmount, 0);
  const scenarioValue = resultRows.reduce((sum, r) => sum + r.scenarioAmount, 0);
  const absoluteChange = scenarioValue - baseValue;

  const percentageChange =
    baseValue > 0 ? (absoluteChange / baseValue) * 100 : null;

  const scale = Math.max(1, baseValue);
  const direction: ScenarioResult["direction"] =
    Math.abs(absoluteChange) <= DIRECTION_TOLERANCE * scale
      ? "none"
      : absoluteChange > 0
        ? "up"
        : "down";

  return {
    baseValue,
    scenarioValue,
    absoluteChange,
    percentageChange,
    direction,
    rows: resultRows,
  };
}

/** Category label for tables. Kept here so the component stays small. */
export function scenarioCategoryLabel(id: CategoryId): string {
  return CATEGORY_BY_ID[id].label;
}
