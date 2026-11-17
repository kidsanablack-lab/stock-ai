// Put this file in lib/company-data/ next to facts.ts.
// P/E at each fiscal year end, read from the saved API data (data/raw/<TICKER>.json).
// Field names differ between API versions, so the likely ones are tried.
// Years with a loss (no positive P/E) are left out. If nothing is found the list is empty and the chart shows only "Now".
// Alphabet and Amazon had a copy of this code each; they now import it from here.
import type { RawFmp, Row } from "./facts";

export function peAtYearEnd(raw: RawFmp): { year: string; value: number }[] {
  return [...(raw.ratios ?? [])]
    .sort((a: Row, b: Row) => String(a.date).localeCompare(String(b.date)))
    .map((r: Row) => {
      const v = [r.priceToEarningsRatio, r.priceEarningsRatio, r.peRatio].find(
        (x) => typeof x === "number" && Number.isFinite(x) && (x as number) > 0,
      );
      return { year: `’${String(r.date).slice(2, 4)}`, value: typeof v === "number" ? Number(v.toFixed(1)) : NaN };
    })
    .filter((x) => Number.isFinite(x.value));
}