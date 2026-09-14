import type {
  FinancialUnit,
  FinancialValue,
  PercentageValue,
} from "@/types/company";

function trimNumber(value: number): string {
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

export function formatFinancialValue(
  financial: FinancialValue,
): string {
  return `$${trimNumber(financial.value)}${financial.unit}`;
}

export function formatPercentage(
  percentage: PercentageValue,
): string {
  const sign = percentage.value > 0 ? "+" : "";
  return `${sign}${trimNumber(percentage.value)}%`;
}

export function formatYoY(
  percentage: PercentageValue,
): string {
  return `${formatPercentage(percentage)} YoY`;
}

export function formatHistoricalValue(
  value: number,
  unit: FinancialUnit,
): string {
  return formatFinancialValue({
    value,
    unit,
  });
}

export function getPercentageTrend(
  percentage: PercentageValue,
): "up" | "down" {
  return percentage.value >= 0 ? "up" : "down";
}