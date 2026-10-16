// Shared types for Valuation Lab. No React here.
// Rates are DECIMALS (0.10 = 10%). Missing input = null. Invalid input = NaN.

export const REPORTING_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CNY", "THB", "SGD",
  "HKD", "AUD", "CAD", "CHF", "INR", "KRW",
] as const;
export type ReportingCurrency = (typeof REPORTING_CURRENCIES)[number];

export type FinancialPeriod = "ttm" | "fiscal-year" | "quarter" | "forward";

export const PERIOD_LABELS: Record<FinancialPeriod, string> = {
  ttm: "Trailing 12 months",
  "fiscal-year": "Fiscal year",
  quarter: "Single quarter",
  forward: "Forward estimate (user-entered)",
};

export type SharesMeasure = "basic" | "diluted";

export interface CompanyIdentity {
  name: string; // descriptive only, never required for math
  ticker: string; // descriptive only
  notes: string;
}

export interface MarketInputs {
  sharePrice: number | null;
  priceDate: string; // free text / ISO date, descriptive
  sourceNote: string;
}

/* ---------- Validation ---------- */

export type CalcStatus =
  | "ok"
  | "missing_input" // a required value was not entered
  | "invalid_input" // entered but not acceptable (NaN, negative where impossible...)
  | "undefined_result" // mathematically undefined (÷0, overflow)
  | "not_meaningful"; // computable but would mislead (e.g. P/E with negative EPS)

export type IssueKind = "missing" | "invalid" | "undefined" | "questionable";

export interface ValidationIssue {
  code: string;
  field: string;
  kind: IssueKind;
  severity: "error" | "warning";
  message: string;
}

/* ---------- Relative valuation ---------- */

export interface PeInputs {
  sharePrice: number | null;
  eps: number | null;
  epsPeriod: FinancialPeriod;
  priceCurrency?: ReportingCurrency;
  epsCurrency?: ReportingCurrency;
}

export interface PeResult {
  status: CalcStatus;
  value: number | null;
  epsPeriod: FinancialPeriod;
  issues: ValidationIssue[];
}

export interface PsInputs {
  sharePrice: number | null;
  sharesOutstanding: number | null;
  sharesMeasure: SharesMeasure;
  revenue: number | null;
  revenuePeriod: FinancialPeriod;
  priceCurrency?: ReportingCurrency;
  revenueCurrency?: ReportingCurrency;
}

export interface PsResult {
  status: CalcStatus;
  value: number | null;
  marketCapitalization: number | null;
  sharesMeasure: SharesMeasure;
  revenuePeriod: FinancialPeriod;
  issues: ValidationIssue[];
}

/* ---------- DCF (two-stage FCFF) ---------- */

export interface DcfInputs {
  startingFcff: number | null;
  forecastYears: number | null;
  growthRates: Array<number | null>; // one per forecast year
  discountRate: number | null; // WACC-style, decimal
  terminalGrowthRate: number | null;
  cash: number | null;
  debt: number | null;
  otherClaims: number | null;
  dilutedShares: number | null;
}

export interface ForecastYear {
  year: number; // 1..n
  growthRate: number;
  fcff: number;
  discountFactor: number; // (1 + r)^t
  presentValue: number;
}

export interface DcfSuccess {
  status: "ok";
  inputs: DcfInputs;
  forecast: ForecastYear[];
  sumPvForecastFcff: number;
  terminalFcff: number; // FCF[n] × (1 + g)
  terminalValue: number;
  terminalDiscountFactor: number;
  pvTerminalValue: number;
  enterpriseValue: number;
  equityValue: number;
  valuePerShare: number;
  /** pvTerminalValue / enterpriseValue; null when EV <= 0 (ratio would mislead). */
  terminalValueShareOfEv: number | null;
  warnings: ValidationIssue[];
}

export interface DcfFailure {
  status: Exclude<CalcStatus, "ok" | "not_meaningful">;
  issues: ValidationIssue[];
}

export type DcfResult = DcfSuccess | DcfFailure;

/* ---------- Scenarios ---------- */

export type ScenarioName = "bear" | "base" | "bull";

export interface ScenarioAssumptions {
  growthRates: Array<number | null>;
  discountRate: number | null;
  terminalGrowthRate: number | null;
}

export type ScenarioSet = Record<ScenarioName, ScenarioAssumptions>;

export type DcfBaseInputs = Omit<
  DcfInputs,
  "growthRates" | "discountRate" | "terminalGrowthRate"
>;

export interface ScenarioResult {
  name: ScenarioName;
  assumptions: ScenarioAssumptions;
  result: DcfResult;
}

/* ---------- Sensitivity ---------- */

export interface SensitivityCell {
  discountRate: number;
  terminalGrowthRate: number;
  status: "ok" | "unavailable";
  valuePerShare: number | null;
  reason: string | null;
  result: DcfResult | null; // null when never calculated (invalid combination)
}

export interface SensitivityTable {
  discountRates: number[]; // rows
  terminalGrowthRates: number[]; // columns
  cells: SensitivityCell[][]; // cells[row][col]
}

/* ---------- Margin of safety ---------- */

export interface MarginOfSafetyResult {
  status: CalcStatus;
  sharePrice: number | null;
  estimatedValuePerShare: number | null;
  absoluteDifference: number | null; // estimate - price
  marginOfSafetyPercent: number | null;
  issues: ValidationIssue[];
}