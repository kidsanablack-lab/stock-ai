import {
  getCompany as getCompanyFromSource,
  getCompanyByTicker as getCompanyByTickerFromSource,
  getCompanySlugs as getCompanySlugsFromSource,
  getAllCompanies as getAllCompaniesFromSource,
} from "@/lib/company-source";
import type { CompanyProfile } from "@/types/company";
import type {
  CompanyWithExternalData,
  ExternalFinancialQuote,
} from "@/types/external-financial";
import { getFmpQuote } from "@/lib/fmp";

/**
 * Data Access Layer
 *
 * This layer provides a stable interface for the rest of the app.
 * It does not care where the data comes from.
 */

/**
 * Get a company by its URL slug.
 */
export async function getCompany(
  slug: string,
): Promise<CompanyProfile | undefined> {
  return getCompanyFromSource(slug);
}

/**
 * Get a company by its stock ticker.
 */
export async function getCompanyByStockTicker(
  ticker: string,
): Promise<{ slug: string; company: CompanyProfile } | undefined> {
  return getCompanyByTickerFromSource(ticker);
}

/**
 * Get all supported company slugs.
 */
export async function getCompanySlugs(): Promise<string[]> {
  return getCompanySlugsFromSource();
}

/**
 * Get all company profiles.
 */
export async function getAllCompanyProfiles(): Promise<
  {
    slug: string;
    company: CompanyProfile;
  }[]
> {
  return getAllCompaniesFromSource();
}

/**
 * Get all companies except the current company.
 */
export async function getOtherCompanyProfiles(
  currentSlug: string,
): Promise<
  {
    slug: string;
    company: CompanyProfile;
  }[]
> {
  const lowerCurrentSlug = currentSlug.toLowerCase();

  const companies = await getAllCompanyProfiles();

  return companies.filter(
    ({ slug }) => slug !== lowerCurrentSlug,
  );
}

export async function getExternalFinancialQuote(
  ticker: string,
): Promise<ExternalFinancialQuote> {
  const quote = await getFmpQuote(ticker);

  return {
    symbol: quote.symbol,
    name: quote.name,
    price: quote.price,
    marketCap: quote.marketCap,
    exchange: quote.exchange,
    timestamp: quote.timestamp,
  };
}

/**
 * Get a company together with its external financial data.
 */
export async function getCompanyWithExternalData(
  slug: string,
): Promise<CompanyWithExternalData | undefined> {
  const company = await getCompany(slug);

  if (!company) {
    return undefined;
  }

  const external = await getExternalFinancialQuote(
    company.identity.ticker,
  );

  return {
    slug,
    curated: company,
    external,
  };
}