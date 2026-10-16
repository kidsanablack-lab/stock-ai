// Number helpers shared by the engine and (later) the UI.

export type ParsedNumber =
  | { status: "missing" }
  | { status: "invalid"; raw: string }
  | { status: "valid"; value: number };

const NUMERIC = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

/** Turn what the user typed into a number, without guessing. */
export function parseNumericInput(raw: string): ParsedNumber {
  const cleaned = raw.trim().replace(/[,\s]/g, "");
  if (cleaned === "") return { status: "missing" };
  if (!NUMERIC.test(cleaned)) return { status: "invalid", raw };
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return { status: "invalid", raw };
  return { status: "valid", value };
}

/**
 * Convert a parsed field for the engine:
 * missing -> null, invalid -> NaN (so the engine reports "invalid", not "missing"),
 * valid -> the number. Nothing is ever turned into 0.
 */
export function toEngineValue(parsed: ParsedNumber): number | null {
  if (parsed.status === "missing") return null;
  if (parsed.status === "invalid") return Number.NaN;
  return parsed.value;
}

export type FieldState = "missing" | "invalid" | "ok";

export function fieldState(value: number | null | undefined): FieldState {
  if (value === null || value === undefined) return "missing";
  if (typeof value !== "number" || !Number.isFinite(value)) return "invalid";
  return "ok";
}

export function percentToDecimal(percent: number): number {
  return percent / 100;
}

export function decimalToPercent(decimal: number): number {
  return decimal * 100;
}