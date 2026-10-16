import { issue, requireNumber, requirePositive, statusFromIssues, hasErrors } from "./validation";
import type { DcfResult, MarginOfSafetyResult, ValidationIssue } from "./types";

/**
 * MOS (%) = ((Value per share − Share price) / Value per share) × 100
 * Neutral math only: no buy/sell labels.
 */
export function calculateMarginOfSafety(
  estimatedValuePerShare: number | null,
  sharePrice: number | null,
): MarginOfSafetyResult {
  const issues: ValidationIssue[] = [];
  const base = { sharePrice, estimatedValuePerShare, issues };

  requirePositive(issues, sharePrice, "sharePrice", "Share price");
  requireNumber(issues, estimatedValuePerShare, "estimatedValuePerShare", "Estimated value per share");

  if (hasErrors(issues) || sharePrice === null || estimatedValuePerShare === null) {
    return {
      ...base,
      status: statusFromIssues(issues),
      absoluteDifference: null,
      marginOfSafetyPercent: null,
    };
  }

  const absoluteDifference = estimatedValuePerShare - sharePrice;

  if (estimatedValuePerShare === 0) {
    issues.push(issue("estimatedValuePerShare", "undefined", "value_zero", "Margin of Safety is undefined when the estimated value per share is zero."));
    return { ...base, status: "undefined_result", absoluteDifference, marginOfSafetyPercent: null };
  }
  if (estimatedValuePerShare < 0) {
    // The formula would divide by a negative number and give a misleading positive %.
    issues.push(issue("estimatedValuePerShare", "questionable", "value_negative", "The estimated value per share is negative, so a Margin of Safety percentage is not meaningful."));
    return { ...base, status: "not_meaningful", absoluteDifference, marginOfSafetyPercent: null };
  }

  const percent = (absoluteDifference / estimatedValuePerShare) * 100;
  if (!Number.isFinite(percent)) {
    issues.push(issue("marginOfSafety", "undefined", "mos_overflow", "The result is too large to calculate."));
    return { ...base, status: "undefined_result", absoluteDifference, marginOfSafetyPercent: null };
  }
  return { ...base, status: "ok", absoluteDifference, marginOfSafetyPercent: percent };
}

/** Convenience: compare directly against any DCF result (main, bear, base, bull). */
export function marginOfSafetyFromDcf(
  result: DcfResult,
  sharePrice: number | null,
): MarginOfSafetyResult {
  return calculateMarginOfSafety(
    result.status === "ok" ? result.valuePerShare : null,
    sharePrice,
  );
}