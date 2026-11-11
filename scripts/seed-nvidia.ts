import { createClient } from "@supabase/supabase-js";
import { nvidiaPage } from "../lib/company-next/nvidia";

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("company_pages").upsert({
    slug: "nvidia",
    data: nvidiaPage,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
  console.log("Saved NVIDIA page data.");
}

main();