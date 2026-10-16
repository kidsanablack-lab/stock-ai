import { calculateDcf } from "./dcf";
import type { DcfInputs, SensitivityCell, SensitivityTable } from "./types";

export const MAX_AXIS_POINTS = 9;

/**
 * Evenly spaced axis centered on `center`. An odd `count` keeps the center value
 * on the axis. Rounding here only removes floating-point noise from axis labels.
 */
export function buildAxis(center: number, step: number, count: number): number[] {
  if (
    !Number.isFinite(center) ||
    !Number.isFinite(step) ||
    step <= 0 ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > MAX_AXIS_POINTS
  ) {
    return [];
  }
  const half = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) =>
    Math.round((center + (i - half) * step) * 1e10) / 1e10,
  );
}

function unavailable(
  discountRate: number,
  terminalGrowthRate: number,
  reason: string,
): SensitivityCell {
  return {
    discountRate,
    terminalGrowthRate,
    status: "unavailable",
    valuePerShare: null,
    reason,
    result: null,
  };
}

/**
 * Rows = discount rates, columns = terminal growth rates.
 * The `base` object is never modified; each cell runs the shared DCF engine
 * on a copy with the cell's two rates substituted.
 */
export function calculateSensitivity(
  base: DcfInputs,
  discountRates: number[],
  terminalGrowthRates: number[],
): SensitivityTable {
  const cells = discountRates.map((r) =>
    terminalGrowthRates.map((g): SensitivityCell => {
      if (!Number.isFinite(r) || !Number.isFinite(g)) {
        return unavailable(r, g, "Rates must be finite numbers.");
      }
      if (r <= g) {
        return unavailable(
          r,
          g,
          "Not calculated: the discount rate must be greater than the terminal growth rate.",
        );
      }
      const result = calculateDcf({
        ...base,
        discountRate: r,
        terminalGrowthRate: g,
      });
      if (result.status !== "ok") {
        return {
          discountRate: r,
          terminalGrowthRate: g,
          status: "unavailable",
          valuePerShare: null,
          reason: result.issues.find((i) => i.severity === "error")?.message ?? "Calculation unavailable.",
          result,
        };
      }
      return {
        discountRate: r,
        terminalGrowthRate: g,
        status: "ok",
        valuePerShare: result.valuePerShare,
        reason: null,
        result,
      };
    }),
  );
  return { discountRates, terminalGrowthRates, cells };
}