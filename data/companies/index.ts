import type { CompanyProfile } from "@/types/company";
import { appleProfile } from "./apple";

// Registry of all companies currently supported by Scope.
// To add a new company later: create `data/companies/<name>.ts` exporting a
// `CompanyProfile`, then add one line here. No other files need to change.
const companies: Record<string, CompanyProfile> = {
  AAPL: appleProfile,
};

/**
 * Look up a company's data by ticker symbol (case-insensitive).
 * Returns undefined if the ticker isn't in the registry yet.
 */
export function getCompanyByTicker(ticker: string): CompanyProfile | undefined {
  return companies[ticker.toUpperCase()];
}

/** All tickers currently supported by Scope. */
export function getAllTickers(): string[] {
  return Object.keys(companies);
}