// Saves company pages into Supabase (table company_pages). One script for every company.
// It replaces seed-apple.ts and the other one-company scripts.
//
// Run:  npx tsx --env-file=.env.local scripts/seed-company.ts meta
//       npx tsx --env-file=.env.local scripts/seed-company.ts apple microsoft
//       npx tsx --env-file=.env.local scripts/seed-company.ts all
//       npx tsx --env-file=.env.local scripts/seed-company.ts --list
import { createClient } from "@supabase/supabase-js";
import { companyPageLoaders } from "../lib/company-next/pages";

async function main() {
  const args = process.argv.slice(2);
  const known = Object.keys(companyPageLoaders);

  if (args.length === 0 || args[0] === "--list") {
    console.log("Companies in lib/company-next/pages.ts:", known.join(", "));
    console.log("Usage: npx tsx --env-file=.env.local scripts/seed-company.ts <slug> [<slug> ...] | all");
    process.exit(args.length === 0 ? 1 : 0);
  }

  const slugs = args[0] === "all" ? known : args;
  const unknown = slugs.filter((s) => !known.includes(s));
  if (unknown.length > 0) {
    console.error(`Unknown slug: ${unknown.join(", ")}. Known slugs: ${known.join(", ")}`);
    console.error("Add the company to lib/company-next/pages.ts first.");
    process.exit(1);
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
  }
  const supabase = createClient(url, key);

  let failed = 0;
  for (const slug of slugs) {
    try {
      // The page file is read here. A missing number stops that company with a clear message, not the others.
      const data = await companyPageLoaders[slug]();
      const { error } = await supabase
        .from("company_pages")
        .upsert({ slug, data, updated_at: new Date().toISOString() });
      if (error) throw new Error(error.message);
      console.log(`Saved ${slug}.`);
    } catch (e) {
      failed++;
      console.error(`Failed ${slug}: ${(e as Error).message}`);
    }
  }

  if (failed > 0) process.exit(1);
}

main();