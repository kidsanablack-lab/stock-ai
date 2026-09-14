import type { CompanyProfile } from "@/types/company";

/**
 * Search metadata used by the Home search and Navbar search.
 *
 * This keeps search-specific information outside CompanyIdentity.
 * CompanyIdentity remains focused on the actual company identity.
 */

export type CompanySearchItem = {
  slug: string;
  name: string;
  ticker: string;
  aliases: string[];
};

/**
 * Additional search aliases that are not part of CompanyIdentity.
 *
 * Example:
 * - Alphabet can be found by searching "Alphabet"
 * - Google can be found by both "GOOG" and "GOOGL"
 */
const SEARCH_ALIASES: Record<string, string[]> = {
  google: ["alphabet", "goog"],
};

/**
 * Convert company profiles into search metadata.
 */
export function createCompanySearchItems(
  companies: { slug: string; company: CompanyProfile }[],
): CompanySearchItem[] {
  return companies.map(({ slug, company }) => {
    const identity = company.identity;

    const aliases = [
      identity.brandName,
      identity.name,
      identity.ticker,
      slug,
      ...(SEARCH_ALIASES[slug.toLowerCase()] ?? []),
    ]
      .filter(Boolean)
      .map((value) => value!.toLowerCase());

    return {
      slug,
      name: identity.brandName ?? identity.name,
      ticker: identity.ticker,
      aliases: [...new Set(aliases)],
    };
  });
}