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

  const relatedCompanies: Record<string, string[]> = {
  adobe: ["salesforce", "microsoft", "oracle", "palantir"],
  amazon: ["walmart", "microsoft", "google", "costco"],
  amd: ["nvidia", "broadcom", "tsmc", "microsoft"],
  apple: ["microsoft", "google", "adobe", "nvidia"],
  "berkshire-hathaway": ["jpmorgan-chase", "coca-cola", "apple", "visa"],
  broadcom: ["nvidia", "amd", "tsmc", "oracle"],
  chevron: ["exxon-mobil", "nextera-energy", "walmart", "costco"],
  "coca-cola": ["mcdonald-s", "costco", "walmart", "nike"],
  costco: ["walmart", "amazon", "coca-cola", "mcdonald-s"],
  "eli-lilly": ["johnson-johnson", "unitedhealth-group", "mastercard", "visa"],
  "exxon-mobil": ["chevron", "nextera-energy", "walmart", "costco"],
  google: ["microsoft", "meta", "amazon", "adobe"],
  "johnson-johnson": ["eli-lilly", "unitedhealth-group", "walmart", "costco"],
  "jpmorgan-chase": ["visa", "mastercard", "paypal", "berkshire-hathaway"],
  mastercard: ["visa", "paypal", "jpmorgan-chase", "berkshire-hathaway"],
  "mcdonald-s": ["coca-cola", "walmart", "costco", "nike"],
  meta: ["google", "amazon", "microsoft", "netflix"],
  microsoft: ["google", "amazon", "adobe", "salesforce"],
  netflix: ["meta", "amazon", "google", "mcdonald-s"],
  "nextera-energy": ["chevron", "exxon-mobil", "walmart", "costco"],
  nike: ["walmart", "costco", "amazon", "coca-cola"],
  nvidia: ["amd", "broadcom", "tsmc", "microsoft"],
  oracle: ["salesforce", "microsoft", "adobe", "palantir"],
  palantir: ["oracle", "salesforce", "microsoft", "nvidia"],
  paypal: ["visa", "mastercard", "jpmorgan-chase", "walmart"],
  salesforce: ["adobe", "oracle", "microsoft", "palantir"],
  tsmc: ["nvidia", "amd", "broadcom", "apple"],
  "unitedhealth-group": ["eli-lilly", "johnson-johnson", "walmart", "costco"],
  visa: ["mastercard", "paypal", "jpmorgan-chase", "berkshire-hathaway"],
  walmart: ["costco", "amazon", "mcdonald-s", "coca-cola"],
};

  const priority = relatedCompanies[lowerCurrentSlug] ?? [];

  return companies
    .filter(({ slug }) => slug.toLowerCase() !== lowerCurrentSlug)
    .sort((a, b) => {
      const aIndex = priority.indexOf(a.slug.toLowerCase());
      const bIndex = priority.indexOf(b.slug.toLowerCase());

      const aPriority = aIndex === -1 ? Infinity : aIndex;
      const bPriority = bIndex === -1 ? Infinity : bIndex;

      return aPriority - bPriority;
    });
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