import { issue, requireNumber, requirePositive, statusFromIssues, hasErrors } from "./validation";
import type { PeInputs, PeResult, PsInputs, PsResult, ValidationIssue } from "./types";

function periodWarning(
  issues: ValidationIssue[],
  field: string,
  period: string,
  label: string,
) {
  if (period === "quarter") {
    issues.push(
      issue(
        field,
        "questionable",
        `${field}_quarterly`,
        `${label} is for a single quarter. It is not annualized, so the ratio is not comparable with ratios based on a full year.`,
      ),
    );
  }
}

/** P/E = Share Price / EPS */
export function calculatePe(input: PeInputs): PeResult {
  const issues: ValidationIssue[] = [];
  const out = { epsPeriod: input.epsPeriod, issues };

  const price = input.sharePrice;
  const eps = input.eps;

  const priceOk = requirePositive(issues, price, "sharePrice", "Share price");
  const epsOk = requireNumber(issues, eps, "eps", "EPS");

  if (
    input.priceCurrency &&
    input.epsCurrency &&
    input.priceCurrency !== input.epsCurrency
  ) {
    issues.push(
      issue(
        "currency",
        "invalid",
        "currency_mismatch",
        "Share price and EPS must use the same currency.",
      ),
    );
  }

  if (hasErrors(issues)) {
    return { ...out, status: statusFromIssues(issues), value: null };
  }
  if (!priceOk || !epsOk) return { ...out, status: "invalid_input", value: null };

  periodWarning(issues, "eps", input.epsPeriod, "EPS");

  if (eps === 0) {
    issues.push(
      issue("eps", "undefined", "eps_zero", "P/E is undefined when EPS is zero."),
    );
    return { ...out, status: "undefined_result", value: null };
  }
  if (eps < 0) {
    issues.push(
      issue(
        "eps",
        "questionable",
        "eps_negative",
        "EPS is negative (a loss per share), so a P/E ratio is not meaningful.",
      ),
    );
    return { ...out, status: "not_meaningful", value: null };
  }

  const value = price / eps;
  if (!Number.isFinite(value)) {
    issues.push(issue("pe", "undefined", "pe_overflow", "The result is too large to calculate."));
    return { ...out, status: "undefined_result", value: null };
  }
  return { ...out, status: "ok", value };
}

/** Market Cap = Share Price × Shares; P/S = Market Cap / Revenue */
export function calculatePs(input: PsInputs): PsResult {
  const issues: ValidationIssue[] = [];
  const out = {
    sharesMeasure: input.sharesMeasure,
    revenuePeriod: input.revenuePeriod,
    issues,
  };
  const fail = (status: PsResult["status"], marketCapitalization: number | null = null): PsResult => ({
    ...out,
    status,
    value: null,
    marketCapitalization,
  });

  const price = input.sharePrice;
  const shares = input.sharesOutstanding;
  const revenue = input.revenue;

  requirePositive(issues, price, "sharePrice", "Share price");
  requirePositive(issues, shares, "sharesOutstanding", "Shares outstanding");
  const revenueEntered = requireNumber(issues, revenue, "revenue", "Revenue");
  if (revenueEntered && revenue < 0) {
    issues.push(
      issue("revenue", "invalid", "revenue_negative", "Revenue cannot be negative."),
    );
  }

  if (
    input.priceCurrency &&
    input.revenueCurrency &&
    input.priceCurrency !== input.revenueCurrency
  ) {
    issues.push(
      issue(
        "currency",
        "invalid",
        "currency_mismatch",
        "Share price and revenue must use the same currency.",
      ),
    );
  }

  if (hasErrors(issues)) return fail(statusFromIssues(issues));
  if (price === null || shares === null || revenue === null) return fail("invalid_input");

  periodWarning(issues, "revenue", input.revenuePeriod, "Revenue");

  const marketCapitalization = price * shares;
  if (!Number.isFinite(marketCapitalization)) {
    issues.push(
      issue("marketCapitalization", "undefined", "market_cap_overflow", "Market capitalization is too large to calculate."),
    );
    return fail("undefined_result");
  }
  if (revenue === 0) {
    issues.push(
      issue("revenue", "undefined", "revenue_zero", "P/S is undefined when revenue is zero."),
    );
    return fail("undefined_result", marketCapitalization);
  }

  const value = marketCapitalization / revenue;
  if (!Number.isFinite(value)) {
    issues.push(issue("ps", "undefined", "ps_overflow", "The result is too large to calculate."));
    return fail("undefined_result", marketCapitalization);
  }
  return { ...out, status: "ok", value, marketCapitalization };
}