// lib/company-next/pages.ts
// The list of company pages in the new version, one line per company.
// The key is the slug in the URL (/company/<slug>). It must be the SAME slug the old version uses for that company:
// the page route shows the new version when the database has a row for the slug, and the old version when it does not.
//
// Each company is loaded only when it is asked for, so a problem in one company file (for example a missing number)
// does not stop another company from being saved.
import type { CompanyPageData } from "./types";

export const companyPageLoaders: Record<string, () => Promise<CompanyPageData>> = {
  apple: async () => (await import("./apple")).applePage,
  microsoft: async () => (await import("./microsoft")).microsoftPage,
  google: async () => (await import("./google")).googlePage,
  nvidia: async () => (await import("./nvidia")).nvidiaPage,
  amazon: async () => (await import("./amazon")).amazonPage,
  meta: async () => (await import("./meta")).metaPage,
  // A new company: add one line here, for example
  // netflix: async () => (await import("./netflix")).netflixPage,
};