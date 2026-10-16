import {
  hasErrors,
  issue,
  requireNonNegative,
  requireNumber,
  requirePositive,
  statusFromIssues,
} from "./validation";
import type {
  DcfInputs,
  DcfResult,
  ForecastYear,
  ValidationIssue,
} from "./types";

/*
  Two-stage FCFF DCF.
  - Cash flows are free cash flow to the FIRM, so the discount rate must be a
    firm-level rate (WACC-style), not a cost of equity.
  - Stage 1: explicit forecast of n years. Stage 2: Gordon Growth terminal value.
  - Cash, debt, other claims are treated as of the valuation date.
  - Nothing is rounded here. Round only when displaying.
*/

export const FORECAST_YEARS_MIN = 1;
export const FORECAST_YEARS_MAX = 15; // UI bound, not a financial rule

// Heuristics that only ever trigger WARNINGS (never block a calculation):
// - Gordon Growth divides by (r - g); a tiny spread makes TV extremely sensitive.
export const SMALL_SPREAD_WARNING = 0.01;
// - Annual growth above 100% is unusual enough to double-check for a typo.
export const HIGH_GROWTH_WARNING = 1;

export function validateDcfInputs(input: DcfInputs): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  requireNumber(issues, input.startingFcff, "startingFcff", "Starting FCFF");

  // Forecast period
  const years = input.forecastYears;
  let yearsOk = false;
  if (requireNumber(issues, years, "forecastYears", "Forecast period")) {
    if (
      !Number.isInteger(years) ||
      years < FORECAST_YEARS_MIN ||
      years > FORECAST_YEARS_MAX
    ) {
      issues.push(
        issue(
          "forecastYears",
          "invalid",
          "forecast_years_range",
          `Forecast period must be a whole number from ${FORECAST_YEARS_MIN} to ${FORECAST_YEARS_MAX} years.`,
        ),
      );
    } else {
      yearsOk = true;
    }
  }

  // Growth by year
  if (yearsOk && years !== null) {
    if (!Array.isArray(input.growthRates) || input.growthRates.length !== years) {
      issues.push(
        issue(
          "growthRates",
          "invalid",
          "growth_length",
          `Provide exactly one growth rate for each of the ${years} forecast years.`,
        ),
      );
    } else {
      input.growthRates.forEach((g, index) => {
        const field = `growthRates.${index}`;
        const label = `Year ${index + 1} growth rate`;
        if (!requireNumber(issues, g, field, label)) return;
        if (g <= -1) {
          issues.push(
            issue(field, "invalid", "growth_at_or_below_minus_100", `${label} must be greater than -100%.`),
          );
        } else if (g > HIGH_GROWTH_WARNING) {
          issues.push(
            issue(field, "questionable", "growth_very_high", `${label} is above 100% per year. Check that this is intended.`),
          );
        }
      });
    }
  }

  // Rates
  const r = input.discountRate;
  const g = input.terminalGrowthRate;
  const rOk = requireNumber(issues, r, "discountRate", "Discount rate");
  const gOk = requireNumber(issues, g, "terminalGrowthRate", "Terminal growth rate");

  if (rOk && r <= -1) {
    issues.push(
      issue("discountRate", "invalid", "discount_rate_too_low", "Discount rate must be greater than -100%."),
    );
  }
  if (gOk && g <= -1) {
    issues.push(
      issue("terminalGrowthRate", "invalid", "terminal_growth_too_low", "Terminal growth rate must be greater than -100%."),
    );
  }
  if (rOk && gOk) {
    if (r === g) {
      issues.push(
        issue("discountRate", "undefined", "discount_equals_terminal", "Discount rate equals terminal growth rate, so terminal value is undefined (division by zero)."),
      );
    } else if (r < g) {
      issues.push(
        issue("discountRate", "invalid", "discount_below_terminal", "Discount rate must be greater than terminal growth rate."),
      );
    } else if (r - g < SMALL_SPREAD_WARNING) {
      issues.push(
        issue("discountRate", "questionable", "spread_small", "The gap between discount rate and terminal growth is under 1 percentage point. Terminal value will be extremely sensitive to small changes."),
      );
    }
  }
  if (rOk && r <= 0 && r > -1) {
    issues.push(
      issue("discountRate", "questionable", "discount_non_positive", "A discount rate at or below zero means future cash flows are not discounted for risk or time."),
    );
  }

  // Balance sheet items must be entered explicitly (enter 0 if truly none).
  requireNonNegative(issues, input.cash, "cash", "Cash and cash equivalents");
  requireNonNegative(issues, input.debt, "debt", "Debt");
  const other = input.otherClaims;
  if (requireNumber(issues, other, "otherClaims", "Other claims") && other < 0) {
    issues.push(
      issue("otherClaims", "questionable", "other_claims_negative", "Other claims are negative, which increases equity value. Check that this is intended."),
    );
  }
  requirePositive(issues, input.dilutedShares, "dilutedShares", "Diluted shares outstanding");

  return issues;
}

export function calculateDcf(input: DcfInputs): DcfResult {
  const issues = validateDcfInputs(input);
  if (hasErrors(issues)) {
    return {
      status: statusFromIssues(issues) as "missing_input" | "invalid_input" | "undefined_result",
      issues,
    };
  }

  // After validation these are all finite numbers.
  const start = input.startingFcff as number;
  const n = input.forecastYears as number;
  const r = input.discountRate as number;
  const g = input.terminalGrowthRate as number;
  const cash = input.cash as number;
  const debt = input.debt as number;
  const other = input.otherClaims as number;
  const shares = input.dilutedShares as number;

  const forecast: ForecastYear[] = [];
  let fcff = start;
  let sumPv = 0;

  for (let t = 1; t <= n; t += 1) {
    const growthRate = input.growthRates[t - 1] as number;
    fcff = fcff * (1 + growthRate);
    const discountFactor = Math.pow(1 + r, t);
    const presentValue = fcff / discountFactor;
    forecast.push({ year: t, growthRate, fcff, discountFactor, presentValue });
    sumPv += presentValue;
  }

  const terminalFcff = fcff * (1 + g);
  const terminalValue = terminalFcff / (r - g);
  const terminalDiscountFactor = Math.pow(1 + r, n);
  const pvTerminalValue = terminalValue / terminalDiscountFactor;
  const enterpriseValue = sumPv + pvTerminalValue;
  const equityValue = enterpriseValue + cash - debt - other;
  const valuePerShare = equityValue / shares;

  const numbers = [
    ...forecast.flatMap((f) => [f.fcff, f.discountFactor, f.presentValue]),
    sumPv,
    terminalFcff,
    terminalValue,
    terminalDiscountFactor,
    pvTerminalValue,
    enterpriseValue,
    equityValue,
    valuePerShare,
  ];
  if (numbers.some((x) => !Number.isFinite(x))) {
    issues.push(
      issue("result", "undefined", "overflow", "The calculation produced a number too large to represent. Check for extreme inputs."),
    );
    return { status: "undefined_result", issues };
  }

  // Economically questionable but computable: report, never correct.
  if (start === 0) {
    issues.push(issue("startingFcff", "questionable", "fcff_zero", "Starting FCFF is zero, so every projected cash flow and the terminal value are zero."));
  } else if (start < 0) {
    issues.push(issue("startingFcff", "questionable", "fcff_negative", "Starting FCFF is negative. Growth rates are applied to the negative base, so a positive growth rate makes the loss larger, not smaller."));
  }
  if (terminalFcff < 0) {
    issues.push(issue("terminalValue", "questionable", "terminal_value_negative", "Terminal cash flow is negative, so terminal value is negative. This implies the business loses cash forever, which is rarely a realistic assumption."));
  }
  if (equityValue < 0) {
    issues.push(issue("equityValue", "questionable", "equity_negative", "Equity value is negative: debt and other claims exceed the estimated enterprise value."));
  }
  const terminalValueShareOfEv = enterpriseValue > 0 ? pvTerminalValue / enterpriseValue : null;
  if (terminalValueShareOfEv !== null && terminalValueShareOfEv > 1) {
    issues.push(issue("terminalValue", "questionable", "terminal_exceeds_ev", "Terminal value is more than 100% of enterprise value because forecast cash flows are negative in total."));
  }

  return {
    status: "ok",
    inputs: input,
    forecast,
    sumPvForecastFcff: sumPv,
    terminalFcff,
    terminalValue,
    terminalDiscountFactor,
    pvTerminalValue,
    enterpriseValue,
    equityValue,
    valuePerShare,
    terminalValueShareOfEv,
    warnings: issues,
  };
}