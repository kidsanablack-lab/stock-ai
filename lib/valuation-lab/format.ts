// Presentation only. Never feed formatted strings back into calculations.

export const NOT_AVAILABLE = "N/A";

function isNum(v: number | null | undefined): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export function formatNumber(value: number | null | undefined, maxDecimals = 2): string {
  if (!isNum(value)) return NOT_AVAILABLE;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatCurrency(
  value: number | null | undefined,
  currency: string,
  maxDecimals = 2,
): string {
  if (!isNum(value)) return NOT_AVAILABLE;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: maxDecimals,
      minimumFractionDigits: Math.min(2, maxDecimals),
    }).format(value);
  } catch {
    return `${formatNumber(value, maxDecimals)} ${currency}`;
  }
}

/** Input is a decimal: 0.1 -> "10.0%". */
export function formatPercent(decimal: number | null | undefined, decimals = 1): string {
  if (!isNum(decimal)) return NOT_AVAILABLE;
  return `${(decimal * 100).toFixed(decimals)}%`;
}

/** Input is already a percentage value: 24.53 -> "24.5%". */
export function formatPercentValue(percent: number | null | undefined, decimals = 1): string {
  if (!isNum(percent)) return NOT_AVAILABLE;
  return `${percent.toFixed(decimals)}%`;
}

export function formatMultiple(value: number | null | undefined, decimals = 1): string {
  if (!isNum(value)) return NOT_AVAILABLE;
  return `${value.toFixed(decimals)}x`;
}