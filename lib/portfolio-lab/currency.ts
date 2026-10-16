import type { CurrencyCode } from "./types";

export type CurrencyInfo = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Decimal places used when an amount is not a whole number. */
  decimals: number;
};

// Currency is a display setting only. Switching it never converts values
// and no exchange rate is used anywhere in Portfolio Lab.
export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", label: "US Dollar", symbol: "$", decimals: 2 },
  { code: "THB", label: "Thai Baht", symbol: "฿", decimals: 2 },
  { code: "LAK", label: "Lao Kip", symbol: "₭", decimals: 0 },
];

const BY_CODE = Object.fromEntries(
  CURRENCIES.map((currency) => [currency.code, currency]),
) as Record<CurrencyCode, CurrencyInfo>;

function roundTo(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Formats a number for display. Never used for calculation. */
export function formatMoney(value: number, code: CurrencyCode): string {
  if (!Number.isFinite(value)) return "—";

  const info = BY_CODE[code];
  const rounded = roundTo(value, info.decimals);
  const digits = Number.isInteger(rounded) ? 0 : info.decimals;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(rounded === 0 ? 0 : rounded);
  } catch {
    // Fallback if the runtime cannot format this currency.
    return `${info.symbol}${rounded.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })}`;
  }
}

/** Formats a percentage such as 33.33 as "33.33%". Never used for calculation. */
export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "—";

  const rounded = roundTo(value, 2);

  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(rounded === 0 ? 0 : rounded)}%`;
}

const MINUS = "\u2212";

/** "+$1,200", "−$300", or "$0". The sign is part of the text, not just a color. */
export function formatSignedMoney(value: number, code: CurrencyCode): string {
  if (!Number.isFinite(value)) return "—";

  const info = BY_CODE[code];
  const rounded = roundTo(value, info.decimals);

  if (rounded === 0) return formatMoney(0, code);

  const text = formatMoney(Math.abs(rounded), code);
  return rounded > 0 ? `+${text}` : `${MINUS}${text}`;
}

/** "+12.5%", "−3%", or "0%". */
export function formatSignedPercent(value: number): string {
  if (!Number.isFinite(value)) return "—";

  const rounded = roundTo(value, 2);

  if (rounded === 0) return "0%";

  const text = formatPercent(Math.abs(rounded));
  return rounded > 0 ? `+${text}` : `${MINUS}${text}`;
}

/** Short axis label such as "$1.5M". For charts only. */
export function formatCompactMoney(value: number, code: CurrencyCode): string {
  if (!Number.isFinite(value)) return "—";

  const info = BY_CODE[code];
  const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

  return `${info.symbol}${compact}`;
}
