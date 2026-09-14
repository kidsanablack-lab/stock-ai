import { getAllSlugs, getCompanyBySlug } from "@/data/companies";
import { validateCompany } from "./validate-company";
import { validateRegistry } from "./validate-registry";

export function validateAllCompanies(): Record<string, string[]> {
  const results: Record<string, string[]> = {};

  for (const slug of getAllSlugs()) {
    const company = getCompanyBySlug(slug);

    if (!company) {
      results[slug] = ["Company could not be loaded."];
      continue;
    }

    results[slug] = validateCompany(company);
  }

  const registryErrors = validateRegistry();

  if (registryErrors.length > 0) {
    results._registry = registryErrors;
  }

  return results;
}