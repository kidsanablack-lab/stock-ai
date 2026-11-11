// Checks which data we can really get on the FREE FMP plan, and whether the SEC feed works.
// It never prints your keys. Run:  npx tsx --env-file=.env.local scripts/probe-data-sources.ts

const FMP_KEY = process.env.FMP_API_KEY;
const SEC_UA = process.env.SEC_USER_AGENT; // example: "Scope Education Site your-name your-email@example.com"

const FMP_TESTS: [string, string][] = [
  ["Quote (price, market cap)", "quote?symbol=AAPL"],
  ["Company profile", "profile?symbol=AAPL"],
  ["Income statement, annual", "income-statement?symbol=AAPL&period=annual&limit=5"],
  ["Income statement, quarterly", "income-statement?symbol=AAPL&period=quarter&limit=5"],
  ["Balance sheet, annual", "balance-sheet-statement?symbol=AAPL&period=annual&limit=5"],
  ["Cash flow, annual", "cash-flow-statement?symbol=AAPL&period=annual&limit=5"],
  ["Key metrics, annual", "key-metrics?symbol=AAPL&period=annual&limit=5"],
  ["Ratios, annual", "ratios?symbol=AAPL&period=annual&limit=5"],
  ["Analyst price target", "price-target-consensus?symbol=AAPL"],
  ["Analyst estimates, annual", "analyst-estimates?symbol=AAPL&period=annual&page=0&limit=5"],
  ["Daily prices", "historical-price-eod/light?symbol=AAPL"],
  ["Same call for Microsoft (MSFT)", "income-statement?symbol=MSFT&period=annual&limit=5"],
];

async function fmp(path: string) {
  const res = await fetch(`https://financialmodelingprep.com/stable/${path}&apikey=${FMP_KEY}`);
  const text = await res.text();
  let body: unknown = text;
  try { body = JSON.parse(text); } catch {}
  return { status: res.status, body };
}

function describe(body: unknown): string {
  if (Array.isArray(body)) return body.length ? `${body.length} row(s), ${Object.keys(body[0] as object).length} fields` : "empty list";
  if (body && typeof body === "object") return String(JSON.stringify(body)).slice(0, 110);
  return String(body).slice(0, 110);
}

async function main() {
  console.log("=== FMP (free plan) ===");
  if (!FMP_KEY) console.log("FMP_API_KEY not found in .env.local");
  else {
    for (const [label, path] of FMP_TESTS) {
      try {
        const r = await fmp(path);
        const ok = r.status === 200 && Array.isArray(r.body) && r.body.length > 0;
        console.log(`${ok ? "OK  " : "NO  "} ${label} [HTTP ${r.status}] ${describe(r.body)}`);
      } catch (e) {
        console.log(`ERR  ${label}: ${(e as Error).message}`);
      }
    }
  }

  console.log("\n=== SEC EDGAR (free, no key) ===");
  if (!SEC_UA) console.log("SEC_USER_AGENT not found in .env.local (SEC requires one, see instructions)");
  else {
    try {
      const res = await fetch("https://data.sec.gov/api/xbrl/companyfacts/CIK0000789019.json", { headers: { "User-Agent": SEC_UA } });
      console.log(`HTTP ${res.status}`);
      if (res.ok) {
        const j = (await res.json()) as { entityName: string; facts: Record<string, Record<string, { units: Record<string, { end: string; form: string }[]> }>> };
        const gaap = j.facts["us-gaap"] ?? {};
        console.log(`OK   Company: ${j.entityName}, ${Object.keys(gaap).length} us-gaap facts`);
        for (const c of ["Revenues", "RevenueFromContractWithCustomerExcludingAssessedTax", "OperatingIncomeLoss", "NetIncomeLoss", "NetCashProvidedByUsedInOperatingActivities", "PaymentsToAcquirePropertyPlantAndEquipment", "EarningsPerShareDiluted"]) {
          const u = gaap[c]?.units?.USD ?? gaap[c]?.units?.["USD/shares"];
          console.log(`${u ? "OK  " : "NO  "} ${c}${u ? ` (latest period end ${u[u.length - 1].end}, form ${u[u.length - 1].form})` : ""}`);
        }
      }
    } catch (e) {
      console.log(`ERR  ${(e as Error).message}`);
    }
  }
}
main();