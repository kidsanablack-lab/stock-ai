import {
  getAllCompanyProfiles,
} from "@/lib/company-data";
import { validateCompany } from "./validate-company";

export async function validateAllCompanies(): Promise<
  Record<string, string[]>
> {
  const results: Record<string, string[]> = {};

  const profiles = await getAllCompanyProfiles();

  if (profiles.length === 0) {
    results._registry = ["No companies were loaded from Supabase."];
    return results;
  }

  for (const { slug, company } of profiles) {
    results[slug] = validateCompany(company);
  }

  return results;
}

/* -------------------------------------------------------------------------- */
/* CLI runner                                                                */
/* -------------------------------------------------------------------------- */

async function runValidation() {
  const results = await validateAllCompanies();

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
}

runValidation();