/* =====================================================================
   Projection engine — used by the DCA Planner and both calculators.

   CONVENTIONS (shown to the user on the page):

   • The assumed annual return is an EFFECTIVE annual rate: 6% means a
     balance grows by 6% over 12 months.
   • The monthly rate is:   r = (1 + annualRate)^(1/12) - 1
     (never "annualRate / 12" — the two methods are not mixed anywhere).
   • The initial investment is made at month 0.
   • Monthly contributions are made at the END of each month, so a
     contribution does not earn a return in the month it is added.
   • The return is fixed and smooth. Real markets are not.
   • Fees, taxes, inflation, currency conversion, and changes in
     contributions are NOT modeled.

   The month-by-month schedule is the single source of truth. Cards,
   charts, and tables all read from it. The closed-form formula below
   exists only so tests can cross-check the schedule:

       FV = P * (1 + r)^n + C * (((1 + r)^n - 1) / r)      (r != 0)
       FV = P + C * n                                        (r = 0)
   ===================================================================== */

import { MAX_INVESTMENT, parseDecimalInput } from "./calculations";
import type { AllocationStatus, HoldingRow } from "./types";

export const MAX_MONTHLY_CONTRIBUTION = 1_000_000_000;
export const MAX_YEARS = 60;
export const MIN_ANNUAL_RETURN = -50;
export const MAX_ANNUAL_RETURN = 50;
/** Results above this are refused instead of shown (precision is unreliable). */
export const MAX_RESULT = 1e18;

export type ProjectionInput = {
  initial: number;
  monthly: number;
  years: number;
  annualReturnPercent: number;
};

export type ProjectionPoint = {
  month: number;
  /** Money the user has put in so far (initial + contributions). */
  principal: number;
  /** Hypothetical balance under the assumed return. */
  balance: number;
};

export type ProjectionResult = {
  input: ProjectionInput;
  periods: number;
  monthlyRate: number;
  points: ProjectionPoint[];
  initial: number;
  totalContributions: number;
  principal: number;
  futureValue: number;
  /** futureValue - principal. Negative means a hypothetical loss. */
  growth: number;
  /** growth / principal * 100, or null when principal is 0. */
  growthPercent: number | null;
  isLoss: boolean;
};

export type ProjectionOutcome =
  | { ok: true; result: ProjectionResult }
  | { ok: false; error: string };

/* ---------- Rates ---------- */

export function monthlyRateFromAnnual(annualPercent: number): number {
  return Math.pow(1 + annualPercent / 100, 1 / 12) - 1;
}

export function periodsFromYears(years: number): number {
  return Math.round(years * 12);
}

/** Reference formula, used by tests to cross-check the schedule. */
export function futureValueClosedForm(
  initial: number,
  monthly: number,
  monthlyRate: number,
  periods: number,
): number {
  if (monthlyRate === 0) return initial + monthly * periods;

  const growth = Math.pow(1 + monthlyRate, periods);

  return initial * growth + monthly * ((growth - 1) / monthlyRate);
}

/* ---------- Main calculation ---------- */

export function calculateProjection(input: ProjectionInput): ProjectionOutcome {
  const { initial, monthly, years, annualReturnPercent } = input;

  const numbers = [initial, monthly, years, annualReturnPercent];
  if (!numbers.every(Number.isFinite)) {
    return { ok: false, error: "One of the values is not a valid number." };
  }
  if (initial < 0 || monthly < 0) {
    return { ok: false, error: "Amounts cannot be negative." };
  }
  if (annualReturnPercent <= -100) {
    return {
      ok: false,
      error: "A return of -100% or lower is not possible for this calculation.",
    };
  }

  const periods = periodsFromYears(years);

  if (periods < 1 || years > MAX_YEARS) {
    return {
      ok: false,
      error: `Duration must be between one month and ${MAX_YEARS} years.`,
    };
  }

  const monthlyRate = monthlyRateFromAnnual(annualReturnPercent);

  if (!Number.isFinite(monthlyRate)) {
    return { ok: false, error: "The return assumption could not be used." };
  }

  const points: ProjectionPoint[] = [
    { month: 0, principal: initial, balance: initial },
  ];

  let balance = initial;
  let principal = initial;

  for (let month = 1; month <= periods; month += 1) {
    balance = balance * (1 + monthlyRate) + monthly;
    principal += monthly;

    if (!Number.isFinite(balance) || balance > MAX_RESULT) {
      return {
        ok: false,
        error:
          "The result is too large to show reliably. Try smaller amounts, a shorter duration, or a lower return.",
      };
    }

    points.push({ month, principal, balance });
  }

  const growth = balance - principal;

  return {
    ok: true,
    result: {
      input,
      periods,
      monthlyRate,
      points,
      initial,
      totalContributions: monthly * periods,
      principal,
      futureValue: balance,
      growth,
      growthPercent: principal > 0 ? (growth / principal) * 100 : null,
      isLoss: growth < 0,
    },
  };
}

/** Points for charts and tables: every full year, plus the final month. */
export function yearlyPoints(result: ProjectionResult): ProjectionPoint[] {
  const last = result.points[result.points.length - 1];

  return result.points.filter(
    (point) => point.month % 12 === 0 || point.month === last.month,
  );
}

/** Same inputs, different assumed returns. */
export function compareAnnualReturns(
  base: Omit<ProjectionInput, "annualReturnPercent">,
  rates: number[],
): { rate: number; outcome: ProjectionOutcome }[] {
  return rates.map((rate) => ({
    rate,
    outcome: calculateProjection({ ...base, annualReturnPercent: rate }),
  }));
}

/* ---------- Parsing the text the user typed ---------- */

export type ParsedSigned = { value: number; error: string | null; isEmpty: boolean };

/** Like parseDecimalInput, but a leading minus sign is allowed. */
export function parseSignedDecimalInput(
  raw: string,
  options: { min: number; max: number; label: string },
): ParsedSigned {
  const cleaned = raw.replace(/[,\s]/g, "").replace(/\u2212/g, "-");

  if (cleaned === "") return { value: 0, error: null, isEmpty: true };

  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(cleaned)) {
    return {
      value: 0,
      error: `${options.label} must be a number, for example 6 or -3.5.`,
      isEmpty: false,
    };
  }

  const parsed = Number(cleaned);
  const value = parsed === 0 ? 0 : parsed; // turns -0 into 0

  if (!Number.isFinite(value)) {
    return { value: 0, error: `${options.label} is not a valid number.`, isEmpty: false };
  }

  if (value < options.min || value > options.max) {
    return {
      value: 0,
      error: `${options.label} must be between ${options.min}% and ${options.max}%.`,
      isEmpty: false,
    };
  }

  return { value, error: null, isEmpty: false };
}

export type RawProjectionInputs = {
  initial: string;
  monthly: string;
  years: string;
  annualReturn: string;
};

export type ProjectionFieldErrors = Partial<Record<keyof RawProjectionInputs, string>>;

export function parseProjectionInputs(raw: RawProjectionInputs): {
  input: ProjectionInput | null;
  errors: ProjectionFieldErrors;
  returnIsBlank: boolean;
} {
  const errors: ProjectionFieldErrors = {};

  const initial = parseDecimalInput(raw.initial, {
    max: MAX_INVESTMENT,
    label: "Initial investment",
  });
  if (initial.error) errors.initial = initial.error;

  const monthly = parseDecimalInput(raw.monthly, {
    max: MAX_MONTHLY_CONTRIBUTION,
    label: "Monthly contribution",
  });
  if (monthly.error) errors.monthly = monthly.error;

  const years = parseDecimalInput(raw.years, {
    max: MAX_YEARS,
    label: "Duration",
  });
  if (years.error) {
    errors.years = years.error;
  } else if (years.isEmpty) {
    errors.years = "Enter a duration in years.";
  } else if (years.value <= 0) {
    errors.years = "Duration must be greater than 0.";
  } else if (periodsFromYears(years.value) < 1) {
    errors.years = "Duration must be at least one month (about 0.1 years).";
  }

  const rate = parseSignedDecimalInput(raw.annualReturn, {
    min: MIN_ANNUAL_RETURN,
    max: MAX_ANNUAL_RETURN,
    label: "Assumed annual return",
  });
  if (rate.error) errors.annualReturn = rate.error;

  const hasErrors = Object.keys(errors).length > 0;

  return {
    input: hasErrors
      ? null
      : {
          initial: initial.value,
          monthly: monthly.value,
          years: years.value,
          annualReturnPercent: rate.value,
        },
    errors,
    returnIsBlank: rate.isEmpty,
  };
}

/* ---------- Splitting a contribution across the portfolio ---------- */

export type ContributionSplitRow = {
  id: string;
  name: string;
  percent: number;
  monthlyAmount: number;
  totalAmount: number;
};

/**
 * Splits each monthly contribution by the portfolio's allocation.
 * Only done for a FULLY allocated portfolio (exactly 100%), because an
 * incomplete or over-allocated one would require silently rescaling the
 * percentages. Returns null otherwise.
 */
export function splitContribution(
  rows: HoldingRow[],
  status: AllocationStatus,
  monthly: number,
  periods: number,
): ContributionSplitRow[] | null {
  if (status !== "complete") return null;

  return rows
    .filter((row) => row.percent > 0)
    .map((row) => ({
      id: row.id,
      name: row.displayName,
      percent: row.percent,
      monthlyAmount: (monthly * row.percent) / 100,
      totalAmount: (monthly * row.percent * periods) / 100,
    }));
}

/** "Hypothetical growth", "Hypothetical loss", or "No growth or loss" (text, not only color). */
export function growthLabel(result: ProjectionResult): string {
  if (Math.abs(result.growth) < 0.005) return "No growth or loss";
  return result.isLoss ? "Hypothetical loss" : "Hypothetical growth";
}
