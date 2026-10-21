/* =====================================================================
   Portfolio Lab — Saved Plans: data and rules (Phase 6A).
   Pure functions only. No React, no browser storage (that is in
   plansStorage.ts), so everything here can be tested without a browser.

   What a saved plan keeps:
     • the portfolio: currency, initial investment, holdings
     • DCA Planner and Investment Calculator inputs
     • the Rebalancing target allocation
   Numbers are stored as NUMBERS, not as formatted text. Nothing that can be
   recalculated is stored (no totals, no chart data, no results).

   A plan is saved only if every number in it is valid, so a saved plan can
   always be loaded back. Blank fields count as 0, the same way the builder
   already treats them.
   ===================================================================== */

import {
  MAX_INVESTMENT,
  parseDecimalInput,
  toHoldings,
} from "./calculations";
import { CATEGORIES, isCategoryId } from "./categories";
import {
  MAX_ANNUAL_RETURN,
  MAX_MONTHLY_CONTRIBUTION,
  MIN_ANNUAL_RETURN,
  parseProjectionInputs,
  parseSignedDecimalInput,
} from "./projection";
import { parseTarget, type TargetInputs } from "./rebalance";
import type { LabState } from "./state";
import type { CalculatorMode, ToolInputs } from "./toolInputs";
import type { CategoryId, CurrencyCode, Holding } from "./types";

/* ---------- Constants ---------- */

/** Bump when the stored shape changes, and add a migration in plansStorage. */
export const SCHEMA_VERSION = 1;

export const MAX_PLANS = 50;
export const MAX_PLAN_NAME_LENGTH = 60;
export const MAX_HOLDINGS = 100;
const MAX_TEXT_LENGTH = 100;

const CURRENCY_CODES: CurrencyCode[] = ["USD", "THB", "LAK"];
const CALCULATOR_MODES: CalculatorMode[] = ["lump", "monthly"];

/* ---------- Types ---------- */

export type PlanData = {
  currency: CurrencyCode;
  investment: number;
  holdings: Holding[];
  dca: {
    initial: number;
    monthly: number;
    years: number;
    annualReturn: number;
  };
  calculator: {
    mode: CalculatorMode;
    initial: number;
    monthly: number;
    years: number;
    rates: number[];
  };
  target: Record<CategoryId, number>;
};

export type SavedPlan = {
  id: string;
  name: string;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  updatedAt: string;
  data: PlanData;
};

export type Result<T> = ({ ok: true } & T) | { ok: false; error: string };

/* ---------- Numbers <-> text ---------- */

/**
 * Turns a stored number back into the text the form fields use.
 * Never produces an exponent ("1e-7"), because the parsers reject it.
 */
export function numberToInput(value: number): string {
  if (!Number.isFinite(value)) return "0";

  const text = String(value);
  if (!/e/i.test(text)) return text;

  return value.toFixed(12).replace(/\.?0+$/, "") || "0";
}

/* ---------- Current screen -> plan data ---------- */

export type BuildResult =
  | { ok: true; data: PlanData }
  | { ok: false; problems: string[] };

/**
 * Reads the portfolio and the tool inputs as they are on screen and turns
 * them into plan data. Fails with a readable list when something is not a
 * valid number yet, so a half-typed plan is never saved.
 */
export function buildPlanData(state: LabState, tools: ToolInputs): BuildResult {
  const problems: string[] = [];

  /* Portfolio */
  const investment = parseDecimalInput(state.investmentInput, {
    max: MAX_INVESTMENT,
    label: "Investment amount",
  });
  if (investment.error) problems.push(`Builder: ${investment.error}`);

  const { holdings, errors } = toHoldings(state.holdings);
  if (Object.values(errors).some((error) => error)) {
    problems.push("Builder: fix the highlighted allocation percentages.");
  }
  if (holdings.length > MAX_HOLDINGS) {
    problems.push(`Builder: a plan can hold at most ${MAX_HOLDINGS} holdings.`);
  }

  /* DCA Planner */
  const dca = parseProjectionInputs(tools.dca);
  const dcaError = Object.values(dca.errors)[0];
  if (dcaError) problems.push(`DCA Planner: ${dcaError}`);

  /* Investment Calculator.
     In "lump sum" mode the monthly field is hidden and ignored by the
     calculator, so an invalid value there is stored as 0 instead of
     blocking the save. */
  const calc = tools.calculator;
  const lump = calc.mode === "lump";
  const monthlyCheck = parseProjectionInputs({
    initial: calc.fields.initial,
    monthly: lump ? "0" : calc.fields.monthly,
    years: calc.fields.years,
    annualReturn: "0",
  });
  const calcError = Object.entries(monthlyCheck.errors).find(
    ([key]) => key !== "annualReturn",
  )?.[1];
  if (calcError) problems.push(`Investment Calculator: ${calcError}`);

  const rates = calc.rates.map((raw, index) => {
    const parsed = parseSignedDecimalInput(raw, {
      min: MIN_ANNUAL_RETURN,
      max: MAX_ANNUAL_RETURN,
      label: `Return ${index + 1}`,
    });
    return {
      value: parsed.value,
      error: parsed.isEmpty ? "Enter a rate. Use 0 for no growth." : parsed.error,
    };
  });
  const rateError = rates.find((rate) => rate.error)?.error;
  if (rateError) problems.push(`Investment Calculator: ${rateError}`);
  if (rates.length !== 3) {
    problems.push("Investment Calculator: three assumed returns are needed.");
  }

  const monthlyForCalc = lump
    ? parseDecimalInput(calc.fields.monthly, {
        max: MAX_MONTHLY_CONTRIBUTION,
        label: "Monthly contribution",
      })
    : null;

  /* Rebalancing target (the total does not have to be 100% to be saved) */
  const target = parseTarget(tools.target);
  const targetError = Object.values(target.errors)[0];
  if (targetError) problems.push(`Rebalancing: ${targetError}`);

  if (problems.length > 0 || !dca.input || !monthlyCheck.input) {
    return { ok: false, problems };
  }

  // Hidden monthly value in lump-sum mode: keep it only if it is valid.
  const hiddenMonthly =
    monthlyForCalc && !monthlyForCalc.error ? monthlyForCalc.value : 0;

  return {
    ok: true,
    data: canonicalData({
      currency: state.currency,
      investment: investment.value,
      holdings,
      dca: {
        initial: dca.input.initial,
        monthly: dca.input.monthly,
        years: dca.input.years,
        annualReturn: dca.input.annualReturnPercent,
      },
      calculator: {
        mode: calc.mode,
        initial: monthlyCheck.input.initial,
        monthly: lump ? hiddenMonthly : monthlyCheck.input.monthly,
        years: monthlyCheck.input.years,
        rates: rates.map((rate) => rate.value),
      },
      target: target.percents,
    }),
  };
}

/** Same data, fixed key order. Makes "is it unchanged?" a simple comparison. */
function canonicalData(data: PlanData): PlanData {
  const target = {} as Record<CategoryId, number>;
  for (const category of CATEGORIES) target[category.id] = data.target[category.id];

  return {
    currency: data.currency,
    investment: data.investment,
    holdings: data.holdings.map((h) => ({
      id: h.id,
      name: h.name,
      category: h.category,
      percent: h.percent,
    })),
    dca: {
      initial: data.dca.initial,
      monthly: data.dca.monthly,
      years: data.dca.years,
      annualReturn: data.dca.annualReturn,
    },
    calculator: {
      mode: data.calculator.mode,
      initial: data.calculator.initial,
      monthly: data.calculator.monthly,
      years: data.calculator.years,
      rates: [...data.calculator.rates],
    },
    target,
  };
}

export function plansDataEqual(a: PlanData, b: PlanData): boolean {
  return JSON.stringify(canonicalData(a)) === JSON.stringify(canonicalData(b));
}

/* ---------- Plan data -> screen ---------- */

/** Turns a saved plan back into the text state the screen uses. */
export function planDataToState(data: PlanData): {
  state: LabState;
  tools: ToolInputs;
} {
  const target = {} as TargetInputs;
  for (const category of CATEGORIES) {
    target[category.id] = numberToInput(data.target[category.id]);
  }

  return {
    state: {
      investmentInput: numberToInput(data.investment),
      currency: data.currency,
      holdings: data.holdings.map((holding) => ({
        id: holding.id,
        name: holding.name,
        category: holding.category,
        percentInput: numberToInput(holding.percent),
      })),
      // Not saved: it only says "this started from a template".
      loadedTemplateId: null,
    },
    tools: {
      dca: {
        initial: numberToInput(data.dca.initial),
        monthly: numberToInput(data.dca.monthly),
        years: numberToInput(data.dca.years),
        annualReturn: numberToInput(data.dca.annualReturn),
      },
      calculator: {
        mode: data.calculator.mode,
        fields: {
          initial: numberToInput(data.calculator.initial),
          monthly: numberToInput(data.calculator.monthly),
          years: numberToInput(data.calculator.years),
        },
        rates: data.calculator.rates.map(numberToInput),
      },
      target,
    },
  };
}

/* ---------- Validating data that came from storage or a file ---------- */

type Unknown = Record<string, unknown>;

function isRecord(value: unknown): value is Unknown {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && value.length <= 40 && !Number.isNaN(Date.parse(value));
}

function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

function validateData(raw: unknown): Result<{ data: PlanData }> {
  if (!isRecord(raw)) return fail("The plan has no data.");

  const { currency, investment, holdings, dca, calculator, target } = raw;

  if (!CURRENCY_CODES.includes(currency as CurrencyCode)) {
    return fail("The currency is missing or not recognised.");
  }

  if (!isNumber(investment) || investment < 0 || investment > MAX_INVESTMENT) {
    return fail("The investment amount is missing or out of range.");
  }

  if (!Array.isArray(holdings) || holdings.length > MAX_HOLDINGS) {
    return fail("The holdings list is missing or too long.");
  }

  const seen = new Set<string>();
  const cleanHoldings: Holding[] = [];

  for (const item of holdings) {
    if (!isRecord(item)) return fail("A holding is not in the expected format.");

    const { id, name, category, percent } = item;

    if (typeof id !== "string" || id.length === 0 || id.length > MAX_TEXT_LENGTH) {
      return fail("A holding has a missing or invalid id.");
    }
    if (seen.has(id)) return fail("Two holdings share the same id.");
    seen.add(id);

    if (typeof name !== "string" || name.length > MAX_TEXT_LENGTH) {
      return fail("A holding has an invalid name.");
    }
    if (!isCategoryId(category)) return fail("A holding has an unknown category.");
    if (!isNumber(percent) || percent < 0 || percent > 100) {
      return fail("A holding has an allocation outside 0% to 100%.");
    }

    cleanHoldings.push({ id, name, category, percent });
  }

  /* DCA: run the same checks the planner itself uses. */
  if (!isRecord(dca)) return fail("The DCA Planner values are missing.");
  const { initial: dInitial, monthly: dMonthly, years: dYears, annualReturn } = dca;
  if (![dInitial, dMonthly, dYears, annualReturn].every(isNumber)) {
    return fail("The DCA Planner values are not all numbers.");
  }
  const dcaCheck = parseProjectionInputs({
    initial: numberToInput(dInitial as number),
    monthly: numberToInput(dMonthly as number),
    years: numberToInput(dYears as number),
    annualReturn: numberToInput(annualReturn as number),
  });
  if (!dcaCheck.input) return fail("A DCA Planner value is out of range.");

  /* Calculator */
  if (!isRecord(calculator)) return fail("The Investment Calculator values are missing.");
  const { mode, initial: cInitial, monthly: cMonthly, years: cYears, rates } = calculator;
  if (!CALCULATOR_MODES.includes(mode as CalculatorMode)) {
    return fail("The calculator mode is missing or not recognised.");
  }
  if (![cInitial, cMonthly, cYears].every(isNumber)) {
    return fail("The Investment Calculator values are not all numbers.");
  }
  if (!Array.isArray(rates) || rates.length !== 3 || !rates.every(isNumber)) {
    return fail("The calculator needs exactly three assumed returns.");
  }
  const calcCheck = parseProjectionInputs({
    initial: numberToInput(cInitial as number),
    monthly: numberToInput(cMonthly as number),
    years: numberToInput(cYears as number),
    annualReturn: "0",
  });
  if (!calcCheck.input) return fail("An Investment Calculator value is out of range.");
  if (
    (rates as number[]).some((rate) => rate < MIN_ANNUAL_RETURN || rate > MAX_ANNUAL_RETURN)
  ) {
    return fail("A calculator return is out of range.");
  }

  /* Target: every category must be present. */
  if (!isRecord(target)) return fail("The target allocation is missing.");
  const cleanTarget = {} as Record<CategoryId, number>;
  for (const category of CATEGORIES) {
    const value = target[category.id];
    if (!isNumber(value) || value < 0 || value > 100) {
      return fail("The target allocation is incomplete or out of range.");
    }
    cleanTarget[category.id] = value;
  }

  return {
    ok: true,
    data: canonicalData({
      currency: currency as CurrencyCode,
      investment,
      holdings: cleanHoldings,
      dca: {
        initial: dInitial as number,
        monthly: dMonthly as number,
        years: dYears as number,
        annualReturn: annualReturn as number,
      },
      calculator: {
        mode: mode as CalculatorMode,
        initial: cInitial as number,
        monthly: cMonthly as number,
        years: cYears as number,
        rates: rates as number[],
      },
      target: cleanTarget,
    }),
  };
}

/** Name rules shared by save, rename, and duplicate. */
export function validatePlanName(raw: string): Result<{ name: string }> {
  const name = raw.trim().replace(/\s+/g, " ");

  if (name.length === 0) return fail("Enter a name for the plan.");
  if (name.length > MAX_PLAN_NAME_LENGTH) {
    return fail(`Use ${MAX_PLAN_NAME_LENGTH} characters or fewer for the name.`);
  }

  return { ok: true, name };
}

/**
 * Checks one plan taken from storage or an imported file.
 * Returns a clean copy that has only the known fields, or the reason it
 * cannot be used. Never throws.
 */
export function validatePlan(raw: unknown): Result<{ plan: SavedPlan }> {
  if (!isRecord(raw)) return fail("The plan is not in the expected format.");

  const { id, name, createdAt, updatedAt, data } = raw;

  if (typeof id !== "string" || id.length === 0 || id.length > MAX_TEXT_LENGTH) {
    return fail("The plan has a missing or invalid id.");
  }

  if (typeof name !== "string") return fail("The plan has no name.");
  const checkedName = validatePlanName(name);
  if (!checkedName.ok) return fail("The plan has an invalid name.");

  if (!isIsoDate(createdAt) || !isIsoDate(updatedAt)) {
    return fail("The plan has a missing or invalid date.");
  }

  const checkedData = validateData(data);
  if (!checkedData.ok) return checkedData;

  return {
    ok: true,
    plan: {
      id,
      name: checkedName.name,
      createdAt,
      updatedAt,
      data: checkedData.data,
    },
  };
}

/* ---------- Operations on a list of plans (always return a new list) ---------- */

export type PlanOpResult = { ok: true; plans: SavedPlan[]; plan: SavedPlan } | { ok: false; error: string };

/** A new id that is not already used. */
export function makePlanId(
  existing: readonly SavedPlan[],
  random: () => number = Math.random,
  now: () => number = Date.now,
): string {
  const used = new Set(existing.map((plan) => plan.id));

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const id = `plan-${now().toString(36)}-${Math.floor(random() * 36 ** 4)
      .toString(36)
      .padStart(4, "0")}`;
    if (!used.has(id)) return id;
  }

  // Practically unreachable; keeps the function total.
  return `plan-${now().toString(36)}-${used.size}`;
}

export function createPlan(
  plans: readonly SavedPlan[],
  input: { name: string; data: PlanData; now: Date; id?: string },
): PlanOpResult {
  if (plans.length >= MAX_PLANS) {
    return fail(`You can keep up to ${MAX_PLANS} plans. Delete one to make room.`);
  }

  const name = validatePlanName(input.name);
  if (!name.ok) return name;

  const stamp = input.now.toISOString();
  const plan: SavedPlan = {
    id: input.id ?? makePlanId(plans),
    name: name.name,
    createdAt: stamp,
    updatedAt: stamp,
    data: canonicalData(input.data),
  };

  return { ok: true, plans: [...plans, plan], plan };
}

function replaceOne(
  plans: readonly SavedPlan[],
  id: string,
  change: (plan: SavedPlan) => SavedPlan,
): PlanOpResult {
  const found = plans.find((plan) => plan.id === id);
  if (!found) return fail("That plan no longer exists.");

  const updated = change(found);
  return {
    ok: true,
    plans: plans.map((plan) => (plan.id === id ? updated : plan)),
    plan: updated,
  };
}

/** Replaces the saved data of one plan. Name and created date stay. */
export function updatePlanData(
  plans: readonly SavedPlan[],
  id: string,
  data: PlanData,
  now: Date,
): PlanOpResult {
  return replaceOne(plans, id, (plan) => ({
    ...plan,
    data: canonicalData(data),
    updatedAt: now.toISOString(),
  }));
}

export function renamePlan(
  plans: readonly SavedPlan[],
  id: string,
  rawName: string,
  now: Date,
): PlanOpResult {
  const name = validatePlanName(rawName);
  if (!name.ok) return name;

  return replaceOne(plans, id, (plan) => ({
    ...plan,
    name: name.name,
    updatedAt: now.toISOString(),
  }));
}

export function duplicatePlan(
  plans: readonly SavedPlan[],
  id: string,
  now: Date,
  newId?: string,
): PlanOpResult {
  if (plans.length >= MAX_PLANS) {
    return fail(`You can keep up to ${MAX_PLANS} plans. Delete one to make room.`);
  }

  const source = plans.find((plan) => plan.id === id);
  if (!source) return fail("That plan no longer exists.");

  const suffix = " (copy)";
  const base = source.name.slice(0, MAX_PLAN_NAME_LENGTH - suffix.length).trimEnd();
  const stamp = now.toISOString();

  const copy: SavedPlan = {
    id: newId ?? makePlanId(plans),
    name: `${base}${suffix}`,
    createdAt: stamp,
    updatedAt: stamp,
    data: canonicalData(structuredClone(source.data)),
  };

  return { ok: true, plans: [...plans, copy], plan: copy };
}

export function deletePlan(
  plans: readonly SavedPlan[],
  id: string,
): { ok: true; plans: SavedPlan[] } | { ok: false; error: string } {
  if (!plans.some((plan) => plan.id === id)) {
    return fail("That plan no longer exists.");
  }

  return { ok: true, plans: plans.filter((plan) => plan.id !== id) };
}

/**
 * Adds imported plans as NEW plans with new ids. Nothing already saved is
 * replaced or changed. Fails as a whole if the result would be too large.
 */
export function addImportedPlans(
  plans: readonly SavedPlan[],
  imported: readonly SavedPlan[],
): { ok: true; plans: SavedPlan[]; added: number } | { ok: false; error: string } {
  if (imported.length === 0) return fail("The file has no plans to import.");

  if (plans.length + imported.length > MAX_PLANS) {
    return fail(
      `Importing ${imported.length} plans would go over the limit of ${MAX_PLANS}. Delete some plans first.`,
    );
  }

  const next = [...plans];
  for (const plan of imported) {
    next.push({ ...plan, id: makePlanId(next) });
  }

  return { ok: true, plans: next, added: imported.length };
}
