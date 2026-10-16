// Form state for the Valuation Lab page. No React here, so it can be tested.
// Everything the user types is kept as TEXT, so half-typed input is never
// overwritten. Text is converted to numbers only when calculating.

import { parseNumericInput, toEngineValue } from "./numbers";
import type {
  DcfInputs,
  FinancialPeriod,
  ReportingCurrency,
  SharesMeasure,
} from "./types";

export interface FormState {
  companyName: string;
  ticker: string;
  currency: ReportingCurrency;
  sharePrice: string;
  priceDate: string;
  sourceNote: string;

  eps: string;
  epsPeriod: FinancialPeriod;
  revenue: string;
  revenuePeriod: FinancialPeriod;
  sharesOutstanding: string;
  sharesMeasure: SharesMeasure;

  startingFcff: string;
  fcffPeriod: FinancialPeriod;
  forecastYears: string;
  growthRates: string[]; // percent, e.g. "8" means 8%
  discountRate: string; // percent
  terminalGrowth: string; // percent
  cash: string;
  debt: string;
  otherClaims: string;
  dilutedShares: string;
}

/** Illustrative assumptions only. Not an estimate for any real company. */
export const ILLUSTRATIVE_ASSUMPTIONS: Pick<
  FormState,
  "forecastYears" | "growthRates" | "discountRate" | "terminalGrowth"
> = {
  forecastYears: "5",
  growthRates: ["8", "8", "8", "8", "8"],
  discountRate: "10",
  terminalGrowth: "2.5",
};

export const INITIAL_FORM: FormState = {
  companyName: "",
  ticker: "",
  currency: "USD",
  sharePrice: "",
  priceDate: "",
  sourceNote: "",

  eps: "",
  epsPeriod: "ttm",
  revenue: "",
  revenuePeriod: "fiscal-year",
  sharesOutstanding: "",
  sharesMeasure: "diluted",

  startingFcff: "",
  fcffPeriod: "fiscal-year",
  ...ILLUSTRATIVE_ASSUMPTIONS,
  cash: "",
  debt: "",
  otherClaims: "",
  dilutedShares: "",
};

/** A made-up company so beginners can see every calculator working. */
export const EXAMPLE_FORM: FormState = {
  ...INITIAL_FORM,
  companyName: "Hypothetical Company",
  sharePrice: "30",
  eps: "1.5",
  revenue: "500",
  sharesOutstanding: "50",
  startingFcff: "100",
  cash: "20",
  debt: "40",
  otherClaims: "0",
  dilutedShares: "50",
};

/** "" -> null (missing), unreadable text -> NaN (invalid), otherwise the number. */
export function readNumber(text: string): number | null {
  return toEngineValue(parseNumericInput(text));
}

/** Same as readNumber, but the text is a percentage: "8" -> 0.08. */
export function readPercent(text: string): number | null {
  const value = readNumber(text);
  if (value === null || Number.isNaN(value)) return value;
  return value / 100;
}

export function buildDcfInputs(form: FormState): DcfInputs {
  return {
    startingFcff: readNumber(form.startingFcff),
    forecastYears: readNumber(form.forecastYears),
    growthRates: form.growthRates.map((g) => readPercent(g)),
    discountRate: readPercent(form.discountRate),
    terminalGrowthRate: readPercent(form.terminalGrowth),
    cash: readNumber(form.cash),
    debt: readNumber(form.debt),
    otherClaims: readNumber(form.otherClaims),
    dilutedShares: readNumber(form.dilutedShares),
  };
}