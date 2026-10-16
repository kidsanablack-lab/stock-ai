// Turns what the user typed into scenario inputs and a sensitivity table.
// No React here, so it can be tested. All numbers come from the shared engine.

import { FORECAST_YEARS_MAX, FORECAST_YEARS_MIN } from "./dcf";
import { buildDcfInputs, readNumber, readPercent, type FormState } from "./form";
import { evaluateScenarios } from "./scenarios";
import {
  buildAxis,
  calculateSensitivity,
  MAX_AXIS_POINTS,
} from "./sensitivity";
import type {
  DcfBaseInputs,
  ScenarioName,
  ScenarioResult,
  ScenarioSet,
  SensitivityTable,
} from "./types";

/* ---------- Scenarios ---------- */

// Percent text, e.g. "8" means 8%. One growth rate is used for every year.
export interface ScenarioForm {
  growth: string;
  discountRate: string;
  terminalGrowth: string;
}

export type ScenarioFormSet = Record<ScenarioName, ScenarioForm>;

export type ValuationSource = "main" | ScenarioName;

/** Illustrative only. These are not predictions or estimates for any company. */
export const ILLUSTRATIVE_SCENARIO_FORMS: ScenarioFormSet = {
  bear: { growth: "3", discountRate: "12", terminalGrowth: "1.5" },
  base: { growth: "8", discountRate: "10", terminalGrowth: "2.5" },
  bull: { growth: "12", discountRate: "9", terminalGrowth: "3" },
};

function wholeYears(years: number | null): number | null {
  if (
    years === null ||
    !Number.isInteger(years) ||
    years < FORECAST_YEARS_MIN ||
    years > FORECAST_YEARS_MAX
  ) {
    return null;
  }
  return years;
}

export function evaluateScenarioForms(
  form: FormState,
  forms: ScenarioFormSet,
): Record<ScenarioName, ScenarioResult> {
  const main = buildDcfInputs(form);

  const base: DcfBaseInputs = {
    startingFcff: main.startingFcff,
    forecastYears: main.forecastYears,
    cash: main.cash,
    debt: main.debt,
    otherClaims: main.otherClaims,
    dilutedShares: main.dilutedShares,
  };

  const count = wholeYears(main.forecastYears);

  const build = (f: ScenarioForm) => {
    const growth = readPercent(f.growth);
    return {
      growthRates:
        count === null ? [] : Array.from({ length: count }, () => growth),
      discountRate: readPercent(f.discountRate),
      terminalGrowthRate: readPercent(f.terminalGrowth),
    };
  };

  const set: ScenarioSet = {
    bear: build(forms.bear),
    base: build(forms.base),
    bull: build(forms.bull),
  };

  return evaluateScenarios(base, set);
}

/* ---------- Sensitivity ---------- */

// Steps are typed in percentage points: "1" means 1 percentage point.
export interface SensitivitySettings {
  discountStep: string;
  growthStep: string;
  points: string; // grid size per side: 3, 5, 7 or 9
}

export const DEFAULT_SENSITIVITY_SETTINGS: SensitivitySettings = {
  discountStep: "1",
  growthStep: "0.5",
  points: "5",
};

// A usability bound, not a financial rule.
export const SENSITIVITY_MAX_STEP = 0.05;

export type SensitivityBuild =
  | { status: "ok"; table: SensitivityTable; centerIndex: number }
  | { status: "unavailable"; reasons: string[] };

function readStep(
  text: string,
  label: string,
  reasons: string[],
): number | null {
  const value = readPercent(text);
  if (value === null) {
    reasons.push(`${label} is required.`);
    return null;
  }
  if (Number.isNaN(value) || value <= 0 || value > SENSITIVITY_MAX_STEP) {
    reasons.push(
      `${label} must be greater than 0 and at most 5 percentage points.`,
    );
    return null;
  }
  return value;
}

function readPoints(text: string, reasons: string[]): number | null {
  const value = readNumber(text);
  if (
    value === null ||
    !Number.isInteger(value) ||
    value < 3 ||
    value > MAX_AXIS_POINTS ||
    value % 2 === 0
  ) {
    reasons.push("Table size must be 3, 5, 7 or 9.");
    return null;
  }
  return value;
}

/**
 * The table is centered on the main DCF's discount rate and terminal growth.
 * The main model is only read, never changed.
 */
export function buildSensitivity(
  form: FormState,
  settings: SensitivitySettings,
): SensitivityBuild {
  const main = buildDcfInputs(form);
  const reasons: string[] = [];

  const r = main.discountRate;
  const g = main.terminalGrowthRate;

  if (typeof r !== "number" || !Number.isFinite(r)) {
    reasons.push("Enter a valid discount rate in the DCF inputs.");
  }
  if (typeof g !== "number" || !Number.isFinite(g)) {
    reasons.push("Enter a valid terminal growth rate in the DCF inputs.");
  }

  const discountStep = readStep(settings.discountStep, "Discount rate step", reasons);
  const growthStep = readStep(settings.growthStep, "Terminal growth step", reasons);
  const points = readPoints(settings.points, reasons);

  if (
    reasons.length > 0 ||
    typeof r !== "number" ||
    typeof g !== "number" ||
    discountStep === null ||
    growthStep === null ||
    points === null
  ) {
    return { status: "unavailable", reasons };
  }

  const discountRates = buildAxis(r, discountStep, points);
  const terminalGrowthRates = buildAxis(g, growthStep, points);

  return {
    status: "ok",
    table: calculateSensitivity(main, discountRates, terminalGrowthRates),
    centerIndex: (points - 1) / 2,
  };
}