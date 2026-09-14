import {
  getAllSlugs,
  getCompanyBySlug,
  getCompanyByTicker as getCompanyByTickerFromRegistry,
} from "@/data/companies";
import type { CompanyProfile } from "@/types/company";

/**
 * Company Data Source
 *
 * This layer is responsible for retrieving company data
 * from the current data source.
 *
 * The rest of the application should not need to know
 * whether the data comes from local files, an API, or a database.
 */

export function getCompany(
  slug: string,
): CompanyProfile | undefined {
  return getCompanyBySlug(slug);
}

export function getCompanyByTicker(
  ticker: string,
): { slug: string; company: CompanyProfile } | undefined {
  const company = getCompanyByTickerFromRegistry(ticker);

  if (!company) {
    return undefined;
  }

  const slug = getAllSlugs().find(
    (slug) => getCompanyBySlug(slug) === company,
  );

  if (!slug) {
    return undefined;
  }

  return {
    slug,
    company,
  };
}

export function getCompanySlugs(): string[] {
  return getAllSlugs();
}

export function getAllCompanies(): {
  slug: string;
  company: CompanyProfile;
}[] {
  return getAllSlugs()
    .map((slug) => {
      const company = getCompanyBySlug(slug);

      return company
        ? { slug, company }
        : null;
    })
    .filter(
      (
        company,
      ): company is {
        slug: string;
        company: CompanyProfile;
      } => company !== null,
    );
}