import type { CompanyProfile } from "@/types/company";

/**
 * Financial data retrieved from an external data provider.
 *
 * This data is time-sensitive and should remain separate
 * from Scope's curated company information.
 */
export interface ExternalFinancialQuote {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  exchange: string;
  timestamp: number;
}

/**
 * Combined company data used by the application.
 *
 * `curated` contains Scope-owned company information.
 * `external` contains time-sensitive financial data
 * from an external provider.
 */
export interface CompanyWithExternalData {
  slug: string;
  curated: CompanyProfile;
  external: ExternalFinancialQuote;
}