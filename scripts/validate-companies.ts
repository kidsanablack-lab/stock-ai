import { validateAllCompanies } from "../lib/validate-companies";

const results = validateAllCompanies();

let hasErrors = false;

for (const [slug, errors] of Object.entries(results)) {
  if (errors.length === 0) {
    console.log(`✓ ${slug}: VALID`);
    continue;
  }

  hasErrors = true;

  console.error(`✗ ${slug}: INVALID`);

  for (const error of errors) {
    console.error(`  - ${error}`);
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log("\nAll companies passed validation.");