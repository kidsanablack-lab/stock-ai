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

/* -------------------------------------------------------------------------- */
/* CLI runner                                                                */
/* -------------------------------------------------------------------------- */

const results = validateAllCompanies();

let hasErrors = false;

for (const [slug, errors] of Object.entries(results)) {
  if (errors.length === 0) {
    console.log(`✓ ${slug}: VALID`);
  } else {
    hasErrors = true;
    console.error(`✗ ${slug}: INVALID`);

    for (const error of errors) {
      console.error(`  - ${error}`);
    }
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log("\nAll companies passed validation.");