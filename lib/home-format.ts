import type { FinancialValue } from "@/types/company";

/**
 * Display helpers for the home page. They only change how stored values are
 * shown (for example 4910 B becomes $4.91T). Company data is never modified.
 */

export function toBillions(value: FinancialValue): number {
  if (value.unit === "T") return value.value * 1000;
  if (value.unit === "M") return value.value / 1000;
  return value.value;
}

function trim(n: number, digits = 2): string {
  return Number(n.toFixed(digits)).toString();
}

export function formatMoney(value: FinancialValue): string {
  if (!Number.isFinite(value.value)) return "N/A";

  const billions = toBillions(value);
  const abs = Math.abs(billions);

  if (abs >= 1000) return `$${trim(billions / 1000)}T`;
  if (abs >= 1) return `$${trim(billions)}B`;
  return `$${trim(billions * 1000)}M`;
}

export function formatGrowth(percent: number): string {
  if (!Number.isFinite(percent)) return "N/A";
  return `${percent > 0 ? "+" : ""}${percent.toFixed(1)}%`;
}

export function formatShare(percent: number): string {
  return `${Number.isInteger(percent) ? percent : percent.toFixed(1)}%`;
}
