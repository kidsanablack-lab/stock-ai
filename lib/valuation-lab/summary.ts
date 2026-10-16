// Helpers for the summary section. No React here, so it can be tested.

import type { SensitivityBuild } from "./analysis-form";
import { ILLUSTRATIVE_ASSUMPTIONS, readNumber, type FormState } from "./form";
import { fieldState } from "./numbers";

export interface InputGap {
  label: string;
  state: "missing" | "invalid";
  neededFor: string;
}

type CheckedKey =
  | "sharePrice"
  | "eps"
  | "revenue"
  | "sharesOutstanding"
  | "startingFcff"
  | "forecastYears"
  | "discountRate"
  | "terminalGrowth"
  | "cash"
  | "debt"
  | "otherClaims"
  | "dilutedShares";

const CHECKS: { key: CheckedKey; label: string; neededFor: string }[] = [
  { key: "sharePrice", label: "Share price", neededFor: "P/E, P/S, Margin of Safety" },
  { key: "eps", label: "EPS", neededFor: "P/E" },
  { key: "revenue", label: "Revenue", neededFor: "P/S" },
  { key: "sharesOutstanding", label: "Shares outstanding", neededFor: "P/S" },
  { key: "startingFcff", label: "Starting FCFF", neededFor: "DCF, scenarios, sensitivity" },
  { key: "forecastYears", label: "Forecast period", neededFor: "DCF, scenarios, sensitivity" },
  { key: "discountRate", label: "Discount rate", neededFor: "DCF, sensitivity" },
  { key: "terminalGrowth", label: "Terminal growth rate", neededFor: "DCF, sensitivity" },
  { key: "cash", label: "Cash and cash equivalents", neededFor: "DCF, scenarios, sensitivity" },
  { key: "debt", label: "Debt", neededFor: "DCF, scenarios, sensitivity" },
  { key: "otherClaims", label: "Other claims", neededFor: "DCF, scenarios, sensitivity" },
  { key: "dilutedShares", label: "Diluted shares outstanding", neededFor: "DCF, scenarios, sensitivity" },
];

/** Inputs that are empty (missing) or unreadable (invalid). A typed 0 is fine. */
export function collectInputGaps(form: FormState): InputGap[] {
  const gaps: InputGap[] = [];

  for (const check of CHECKS) {
    const state = fieldState(readNumber(form[check.key]));
    if (state !== "ok") {
      gaps.push({ label: check.label, state, neededFor: check.neededFor });
    }
  }

  const growth = form.growthRates.map((g) => fieldState(readNumber(g)));
  if (growth.includes("invalid")) {
    gaps.push({ label: "Annual FCFF growth", state: "invalid", neededFor: "DCF, main model" });
  } else if (growth.includes("missing")) {
    gaps.push({ label: "Annual FCFF growth", state: "missing", neededFor: "DCF, main model" });
  }

  return gaps;
}

/** True while the DCF assumptions are still exactly the illustrative defaults. */
export function matchesIllustrativeAssumptions(form: FormState): boolean {
  return (
    form.forecastYears === ILLUSTRATIVE_ASSUMPTIONS.forecastYears &&
    form.discountRate === ILLUSTRATIVE_ASSUMPTIONS.discountRate &&
    form.terminalGrowth === ILLUSTRATIVE_ASSUMPTIONS.terminalGrowth &&
    form.growthRates.join("|") === ILLUSTRATIVE_ASSUMPTIONS.growthRates.join("|")
  );
}

export interface SensitivityRange {
  min: number;
  max: number;
  calculated: number;
  total: number;
  discountMin: number;
  discountMax: number;
  growthMin: number;
  growthMax: number;
}

/** Summarizes the values the engine produced. Nothing is calculated here. */
export function sensitivityRange(build: SensitivityBuild): SensitivityRange | null {
  if (build.status !== "ok") return null;

  const values: number[] = [];
  let total = 0;
  for (const row of build.table.cells) {
    for (const cell of row) {
      total += 1;
      if (cell.status === "ok" && cell.valuePerShare !== null) {
        values.push(cell.valuePerShare);
      }
    }
  }
  if (values.length === 0) return null;

  const { discountRates, terminalGrowthRates } = build.table;
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    calculated: values.length,
    total,
    discountMin: Math.min(...discountRates),
    discountMax: Math.max(...discountRates),
    growthMin: Math.min(...terminalGrowthRates),
    growthMax: Math.max(...terminalGrowthRates),
  };
}