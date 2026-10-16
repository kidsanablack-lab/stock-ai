/**
 * Usage:
 *   npx tsx scripts/validate-business-models.ts              # static checks only (offline)
 *   npx tsx scripts/validate-business-models.ts --companies  # also checks company slugs against getAllCompanyProfiles()
 *
 * `npx tsx` runs a TypeScript file without adding it to package.json.
 */
import { MOCK_BUSINESS_MODELS } from "../lib/mock/business-models";
import {
  BUSINESS_MODEL_DETAILS,
  NOT_IMPLEMENTED_SLUGS,
} from "../lib/mock/business-model-details";
import {
  validateCompanyReferences,
  validateStatic,
  type ValidationIssue,
} from "../lib/mock/business-model-details/validate";

async function main() {
  const issues: ValidationIssue[] = validateStatic(
    MOCK_BUSINESS_MODELS,
    BUSINESS_MODEL_DETAILS,
    NOT_IMPLEMENTED_SLUGS,
  );

  if (process.argv.includes("--companies")) {
    try {
      const { getAllCompanyProfiles } = await import("../lib/company-data");
      const profiles = await getAllCompanyProfiles();
      issues.push(
        ...validateCompanyReferences(
          BUSINESS_MODEL_DETAILS,
          profiles.map((p: { slug: string }) => p.slug),
        ),
      );
    } catch (e) {
      issues.push({
        level: "error",
        scope: "companies",
        message: `Could not load company profiles (env vars / Supabase / server-only imports?): ${
          e instanceof Error ? e.message : String(e)
        }`,
      });
    }
  } else {
    console.log("Skipping company-slug check (pass --companies to include it).");
  }

  for (const i of issues) {
    console.log(`${i.level === "error" ? "ERROR  " : "WARNING"} [${i.scope}] ${i.message}`);
  }
  const errors = issues.filter((i) => i.level === "error").length;
  console.log(
    errors === 0
      ? `OK: ${BUSINESS_MODEL_DETAILS.length} detail datasets, ${MOCK_BUSINESS_MODELS.length} catalog entries.`
      : `${errors} error(s).`,
  );
  process.exit(errors === 0 ? 0 : 1);
}

main();