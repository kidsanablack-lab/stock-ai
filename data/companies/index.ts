import type { CompanyProfile } from "@/types/company";
import { appleProfile } from "./apple";
import { microsoftProfile } from "./microsoft";
import { googleProfile } from "./google";
import { nvidiaProfile } from "./nvidia";
import { amazonProfile } from "./amazon";
import { metaProfile } from "./meta";

// Registry of all companies currently supported by Scope, keyed by URL slug.
// To add a new company later: create `data/companies/<name>.ts` exporting a
// `CompanyProfile`, then add one line here. No routing or page changes needed.
const companies: Record<string, CompanyProfile> = {
  apple: appleProfile,
  microsoft: microsoftProfile,
  google: googleProfile,
  nvidia: nvidiaProfile,
  amazon: amazonProfile,
  meta: metaProfile,
};

/**
 * Look up a company's data by URL slug (case-insensitive), e.g. "apple".
 * Returns undefined if the slug isn't in the registry yet.
 */
export function getCompanyBySlug(slug: string): CompanyProfile | undefined {
  return companies[slug.toLowerCase()];
}

/** All slugs currently supported by Scope, e.g. ["apple"]. */
export function getAllSlugs(): string[] {
  return Object.keys(companies);
}

/**
 * Look up a company's data by ticker symbol (case-insensitive).
 * Kept for backward compatibility with any existing callers.
 * Prefer `getCompanyBySlug` for new code, since slug is the registry's
 * primary key.
 */
export function getCompanyByTicker(ticker: string): CompanyProfile | undefined {
  const upperTicker = ticker.toUpperCase();
  return Object.values(companies).find((company) => company.identity.ticker === upperTicker);
}

/** All tickers currently supported by Scope. Kept for backward compatibility. */
export function getAllTickers(): string[] {
  return Object.values(companies).map((company) => company.identity.ticker);
}

/**
 * All registered companies (slug + full profile) except the one matching
 * `currentSlug` (case-insensitive). Used to power "Recommended Companies"
 * on a company page — since it's derived from the same `companies` registry
 * as `getAllSlugs()`, any company added to the registry later is
 * automatically eligible to appear here, on every page, with no changes
 * needed elsewhere.
 */
export function getOtherCompanies(
  currentSlug: string,
): { slug: string; company: CompanyProfile }[] {
  const lowerCurrentSlug = currentSlug.toLowerCase();
  return Object.entries(companies)
    .filter(([slug]) => slug !== lowerCurrentSlug)
    .map(([slug, company]) => ({ slug, company }));
}