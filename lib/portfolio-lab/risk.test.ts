// Run with:  npx tsx --test lib/portfolio-lab/risk.test.ts

import { describe, it } from "vitest";
import assert from "node:assert/strict";

import { calculatePortfolio, generateObservations } from "./calculations";
import { CATEGORIES } from "./categories";
import { CATEGORY_NOTES, NOT_AVAILABLE } from "./categoryNotes";
import { analyzeRisk, buildRiskNotes, effectiveNumber } from "./risk";
import { TEMPLATES } from "./templates";
import type { CategoryId, Holding } from "./types";

type Part = [name: string, category: CategoryId, percent: number];

function analyze(parts: Part[], investment = 10000) {
  const holdings: Holding[] = parts.map(([name, category, percent], index) => ({
    id: `h${index}`,
    name,
    category,
    percent,
  }));
  const summary = calculatePortfolio(investment, holdings);
  return { summary, analysis: analyzeRisk(summary) };
}

const near = (a: number, b: number, tolerance = 1e-9) =>
  assert.ok(Math.abs(a - b) <= tolerance, `${a} is not close to ${b}`);

describe("effective number of holdings (1 / HHI)", () => {
  it("equal weights give the count", () => {
    near(effectiveNumber([25, 25, 25, 25])!, 4);
    near(effectiveNumber([50, 50])!, 2);
    near(effectiveNumber([1, 1, 1])!, 3);
  });

  it("one holding gives 1", () => {
    near(effectiveNumber([100])!, 1);
    near(effectiveNumber([7])!, 1);
  });

  it("uneven weights give less than the count", () => {
    near(effectiveNumber([60, 30, 10])!, 1 / 0.46);
    assert.ok(effectiveNumber([90, 5, 5])! < 1.25);
  });

  it("does not depend on the scale of the weights", () => {
    near(effectiveNumber([60, 30, 10])!, effectiveNumber([6, 3, 1])!);
  });

  it("ignores zero, negative, and invalid weights; null when nothing is left", () => {
    near(effectiveNumber([50, 50, 0, -3, NaN, Infinity])!, 2);
    assert.equal(effectiveNumber([]), null);
    assert.equal(effectiveNumber([0, 0]), null);
  });
});

describe("analyzeRisk", () => {
  it("empty portfolio: nothing to analyze and no NaN", () => {
    const { analysis } = analyze([]);
    assert.equal(analysis.status, "empty");
    assert.equal(analysis.holdings.length, 0);
    assert.equal(analysis.topHolding, null);
    assert.equal(analysis.effectiveHoldings, null);
    assert.equal(analysis.topCategory, null);
    assert.equal(analysis.topThreePercent, 0);
    assert.equal(analysis.absentCategories.length, CATEGORIES.length);
  });

  it("ranks holdings largest first and keeps input order for ties", () => {
    const { analysis } = analyze([
      ["A", "equity-etf", 20], ["B", "bond-etf", 50], ["C", "cash", 20], ["D", "gold", 10],
    ]);
    assert.deepEqual(analysis.holdings.map((h) => h.name), ["B", "A", "C", "D"]);
    assert.equal(analysis.topHolding?.name, "B");
    assert.equal(analysis.topThreePercent, 90);
  });

  it("zero-allocation holdings are not analyzed but are counted", () => {
    const { analysis } = analyze([["A", "equity-etf", 100], ["B", "bitcoin", 0]]);
    assert.equal(analysis.holdings.length, 1);
    assert.equal(analysis.zeroAllocationCount, 1);
    assert.equal(analysis.bitcoinPercent, 0);
    assert.ok(analysis.absentCategories.includes("bitcoin"));
  });

  it("groups categories and computes the group shares", () => {
    const { analysis } = analyze([
      ["S1", "individual-stocks", 20], ["S2", "individual-stocks", 10],
      ["F1", "equity-etf", 25], ["F2", "bond-etf", 15],
      ["Cash", "cash", 10], ["BTC", "bitcoin", 12], ["ETH", "other-crypto", 8],
    ]);
    assert.equal(analysis.individualStockPercent, 30);
    assert.equal(analysis.individualStockCount, 2);
    assert.equal(analysis.fundPercent, 40);
    assert.equal(analysis.cashPercent, 10);
    assert.equal(analysis.bitcoinPercent, 12);
    assert.equal(analysis.otherCryptoPercent, 8);
    assert.equal(analysis.cryptoPercent, 20);
    assert.equal(analysis.categories[0].category, "individual-stocks");
    assert.equal(analysis.categories[0].holdingCount, 2);
  });

  it("category list and absent list together cover every category once", () => {
    const { analysis } = analyze([["A", "equity-etf", 60], ["B", "cash", 40]]);
    const all = [...analysis.categories.map((c) => c.category), ...analysis.absentCategories];
    assert.equal(new Set(all).size, CATEGORIES.length);
    assert.equal(all.length, CATEGORIES.length);
  });

  it("evenness uses the allocated money, so an incomplete portfolio is not distorted", () => {
    const full = analyze([["A", "equity-etf", 60], ["B", "bond-etf", 30], ["C", "cash", 10]]).analysis;
    const partial = analyze([["A", "equity-etf", 30], ["B", "bond-etf", 15], ["C", "cash", 5]]).analysis;
    near(full.effectiveHoldings!, partial.effectiveHoldings!);
  });

  it("an over-allocated portfolio still analyzes without errors", () => {
    const { analysis } = analyze([["A", "equity-etf", 80], ["B", "cash", 50]]);
    assert.equal(analysis.status, "over");
    assert.equal(analysis.overPercent, 30);
    assert.ok(Number.isFinite(analysis.effectiveHoldings!));
  });

  it("finds duplicate names ignoring case and spaces, and unnamed holdings", () => {
    const { analysis } = analyze([
      ["Apple", "individual-stocks", 20], [" apple ", "individual-stocks", 20],
      ["APPLE", "individual-stocks", 10], ["", "cash", 20], ["   ", "cash", 10], ["Gold", "gold", 20],
    ]);
    assert.deepEqual(analysis.duplicateNames, [{ name: "Apple", count: 3 }]);
    assert.equal(analysis.unnamedCount, 2);
  });

  it("counts funds by kind", () => {
    const { analysis } = analyze([["E1", "equity-etf", 30], ["E2", "equity-etf", 30], ["B1", "bond-etf", 40]]);
    assert.equal(analysis.equityEtfCount, 2);
    assert.equal(analysis.bondEtfCount, 1);
  });

  it("amounts follow the investment", () => {
    const { analysis } = analyze([["A", "equity-etf", 25]], 20000);
    assert.equal(analysis.holdings[0].amount, 5000);
    assert.equal(analysis.allocatedAmount, 5000);
    assert.equal(analysis.unallocatedAmount, 15000);
  });

  it("every template analyzes cleanly as fully allocated", () => {
    for (const template of TEMPLATES) {
      const { analysis } = analyze(template.holdings.map((h) => [h.name, h.category, h.percent] as Part));
      assert.equal(analysis.status, "complete", template.name);
      assert.ok(analysis.effectiveHoldings! >= 1 && analysis.effectiveHoldings! <= template.holdings.length);
    }
  });
});

describe("risk notes (wording and thresholds)", () => {
  const ids = (parts: Part[]) => {
    const { analysis } = analyze(parts);
    return buildRiskNotes(analysis).map((n) => n.id);
  };

  it("no notes for an empty portfolio or a single holding", () => {
    assert.deepEqual(ids([]), []);
    assert.deepEqual(ids([["A", "equity-etf", 100]]), []);
  });

  it("uneven spread is flagged, even spread is not", () => {
    const { analysis: uneven } = analyze([["A", "equity-etf", 85], ["B", "bond-etf", 10], ["C", "cash", 5]]);
    const note = buildRiskNotes(uneven).find((n) => n.id === "evenness")!;
    assert.equal(note.tone, "notice");
    assert.match(note.text, /3 holdings/);
    assert.match(note.text, /about 1\.4 equal-sized holdings/);

    const { analysis: even } = analyze([["A", "equity-etf", 34], ["B", "bond-etf", 33], ["C", "cash", 33]]);
    const evenNote = buildRiskNotes(even).find((n) => n.id === "evenness")!;
    assert.equal(evenNote.tone, "info");
    assert.match(evenNote.text, /not how the holdings behave together/);
  });

  it("top-three note needs 4+ holdings and 80%+", () => {
    assert.ok(ids([["A", "equity-etf", 40], ["B", "bond-etf", 30], ["C", "cash", 15], ["D", "gold", 15]]).includes("top-three"));
    assert.ok(!ids([["A", "equity-etf", 28], ["B", "bond-etf", 28], ["C", "cash", 22], ["D", "gold", 22]]).includes("top-three"), "78% is below the 80% wording threshold");
    assert.ok(ids([["A", "equity-etf", 30], ["B", "bond-etf", 30], ["C", "cash", 20], ["D", "gold", 20]]).includes("top-three"), "exactly 80% meets the threshold");
    assert.ok(!ids([["A", "equity-etf", 50], ["B", "bond-etf", 40], ["C", "cash", 10]]).includes("top-three"));
  });

  it("few-stocks note: 1-4 stocks and 50%+", () => {
    assert.ok(ids([["S1", "individual-stocks", 30], ["S2", "individual-stocks", 30], ["C", "cash", 40]]).includes("few-stocks"));
    assert.ok(!ids([["S1", "individual-stocks", 20], ["C", "cash", 80]]).includes("few-stocks"));
    const many = Array.from({ length: 5 }, (_, i) => [`S${i}`, "individual-stocks", 12] as Part);
    assert.ok(!ids([...many, ["C", "cash", 40]]).includes("few-stocks"));
  });

  it("fund-overlap note appears only for two or more funds of one kind, and admits it cannot measure overlap", () => {
    const parts: Part[] = [["E1", "equity-etf", 40], ["E2", "equity-etf", 40], ["B", "bond-etf", 20]];
    const note = buildRiskNotes(analyze(parts).analysis).find((n) => n.id === "fund-overlap")!;
    assert.ok(note);
    assert.match(note.text, /2 equity ETFs/);
    assert.match(note.text, /cannot measure the overlap/);
    assert.doesNotMatch(note.text, /%.*overlap|overlap of \d/);
    assert.ok(!ids([["E1", "equity-etf", 50], ["B", "bond-etf", 50]]).includes("fund-overlap"));
  });

  it("duplicate-name note", () => {
    const note = buildRiskNotes(analyze([["Apple", "individual-stocks", 50], ["apple", "individual-stocks", 50]]).analysis)
      .find((n) => n.id === "duplicates")!;
    assert.match(note.text, /“Apple” \(2 times\)/);
  });

  it("no note or observation contains a risk score, forecast, or recommendation", () => {
    const parts: Part[] = [
      ["S1", "individual-stocks", 30], ["S2", "individual-stocks", 20], ["E1", "equity-etf", 20],
      ["E2", "equity-etf", 10], ["BTC", "bitcoin", 10], ["Cash", "cash", 10],
    ];
    const { summary, analysis } = analyze(parts);
    const all = [...generateObservations(summary), ...buildRiskNotes(analysis)]
      .map((n) => `${n.title} ${n.text}`)
      .join(" ");
    assert.doesNotMatch(all, /risk score|\d\s*\/\s*10|will (rise|fall|grow|go)|guarantee|you should|we recommend|safe\b|well[- ]diversified/i);
  });
});

describe("explanations", () => {
  it("every category has a note, written conditionally", () => {
    for (const category of CATEGORIES) {
      const note = CATEGORY_NOTES[category.id];
      assert.ok(note, category.id);
      assert.ok(note.what.length > 10 && note.canAffect.length > 20);
      assert.doesNotMatch(`${note.what} ${note.canAffect}`, /will (rise|fall|grow)|guarantee|always|never|safe\b/i);
      assert.match(note.canAffect, /\b(can|may|depends)\b/i, `${category.id} uses conditional wording`);
    }
  });

  it("states what cannot be determined", () => {
    const titles = NOT_AVAILABLE.map((item) => item.title);
    for (const expected of ["Geographic exposure", "Currency exposure", "ETF overlap"]) {
      assert.ok(titles.includes(expected), expected);
    }
    for (const item of NOT_AVAILABLE) assert.ok(item.reason.length > 20);
  });
});
