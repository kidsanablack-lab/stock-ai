// Run with:  npx tsx --test lib/portfolio-lab/calculations.test.ts
// Uses Node's built-in test runner, so no test framework is needed.

import { describe, it } from "vitest";
import assert from "node:assert/strict";

import {
  ALLOCATION_TOLERANCE,
  MAX_INVESTMENT,
  buildChartSegments,
  calculatePortfolio,
  generateObservations,
  getAllocationStatus,
  parseDecimalInput,
  portfolioMatchesTemplate,
  roundTo,
  sumPercent,
  toHoldings,
} from "./calculations";
import { CATEGORIES, isCategoryId } from "./categories";
import { formatMoney, formatPercent } from "./currency";
import {
  createBlankHolding,
  draftsFromTemplate,
  initialState,
  labReducer,
  type LabState,
} from "./state";
import { TEMPLATES } from "./templates";
import type { Holding } from "./types";

function h(id: string, percent: number, category: Holding["category"] = "equity-etf", name = id): Holding {
  return { id, name, category, percent };
}

describe("allocation totals and status", () => {
  it("empty portfolio", () => {
    const summary = calculatePortfolio(10000, []);
    assert.equal(summary.status, "empty");
    assert.equal(summary.totalPercent, 0);
    assert.equal(summary.holdingCount, 0);
    assert.equal(summary.allocatedAmount, 0);
  });

  it("single holding at 100%", () => {
    const summary = calculatePortfolio(10000, [h("a", 100)]);
    assert.equal(summary.status, "complete");
    assert.equal(summary.unallocatedAmount, 0);
    assert.equal(summary.rows[0].amount, 10000);
  });

  it("multiple holdings totaling 100%", () => {
    const summary = calculatePortfolio(10000, [h("a", 60), h("b", 30, "bond-etf"), h("c", 10, "cash")]);
    assert.equal(summary.status, "complete");
    assert.deepEqual(summary.rows.map((r) => r.amount), [6000, 3000, 1000]);
    assert.equal(summary.allocatedAmount, 10000);
    assert.equal(summary.unallocatedAmount, 0);
    assert.equal(summary.allocatedCategoryCount, 3);
    assert.equal(summary.holdingCount, 3);
  });

  it("allocation below 100% (scenario C: 95%)", () => {
    const summary = calculatePortfolio(10000, [h("a", 60), h("b", 30, "bond-etf"), h("c", 5, "cash")]);
    assert.equal(summary.status, "incomplete");
    assert.equal(summary.totalPercent, 95);
    assert.equal(summary.unallocatedPercent, 5);
    assert.equal(summary.unallocatedAmount, 500);
    assert.equal(summary.allocatedAmount, 9500);
    assert.equal(summary.overAmount, 0);
  });

  it("allocation above 100% (scenario D: 110%)", () => {
    const summary = calculatePortfolio(10000, [h("a", 70), h("b", 30, "bond-etf"), h("c", 10, "cash")]);
    assert.equal(summary.status, "over");
    assert.equal(summary.totalPercent, 110);
    assert.equal(summary.overPercent, 10);
    assert.equal(summary.overAmount, 1000);
    assert.equal(summary.unallocatedAmount, 0, "never negative unallocated money");
    assert.equal(summary.unallocatedPercent, 0);
  });

  it("decimal percentages and floating-point noise", () => {
    assert.equal(sumPercent([{ percent: 33.3 }, { percent: 33.3 }, { percent: 33.4 }]), 100);
    assert.equal(sumPercent([{ percent: 0.1 }, { percent: 0.2 }]), 0.3);
    assert.equal(getAllocationStatus(3, sumPercent([{ percent: 33.33 }, { percent: 33.33 }, { percent: 33.34 }])), "complete");
    const tenths = Array.from({ length: 10 }, () => ({ percent: 10 }));
    assert.equal(getAllocationStatus(10, sumPercent(tenths)), "complete");
  });

  it("tolerance is small: a real 0.01 difference is not hidden", () => {
    assert.ok(ALLOCATION_TOLERANCE < 0.001);
    assert.equal(getAllocationStatus(2, 99.99), "incomplete");
    assert.equal(getAllocationStatus(2, 100.01), "over");
  });

  it("zero investment gives zero amounts and no NaN", () => {
    const summary = calculatePortfolio(0, [h("a", 60), h("b", 40, "bond-etf")]);
    assert.equal(summary.allocatedAmount, 0);
    assert.equal(summary.unallocatedAmount, 0);
    for (const row of summary.rows) assert.equal(row.amount, 0);
  });

  it("invalid investment values are treated as zero", () => {
    for (const bad of [NaN, Infinity, -Infinity, -5]) {
      const summary = calculatePortfolio(bad, [h("a", 50)]);
      assert.equal(summary.investment, 0);
      assert.equal(summary.allocatedAmount, 0);
    }
  });

  it("zero-allocation holdings count as holdings but not as categories", () => {
    const summary = calculatePortfolio(10000, [h("a", 100), h("b", 0, "bitcoin")]);
    assert.equal(summary.holdingCount, 2);
    assert.equal(summary.allocatedCategoryCount, 1);
    assert.equal(summary.categories.length, 1);
  });

  it("two holdings in one category count as one category", () => {
    const summary = calculatePortfolio(10000, [h("a", 40), h("b", 20), h("c", 40, "cash")]);
    assert.equal(summary.allocatedCategoryCount, 2);
    assert.equal(summary.categories.find((c) => c.category === "equity-etf")?.percent, 60);
  });

  it("amount scales with investment and keeps percentages (scenario F)", () => {
    const holdings = [h("a", 60), h("b", 30, "bond-etf"), h("c", 10, "cash")];
    const small = calculatePortfolio(10000, holdings);
    const large = calculatePortfolio(20000, holdings);
    assert.deepEqual(large.rows.map((r) => r.amount), [12000, 6000, 2000]);
    assert.equal(small.totalPercent, large.totalPercent);
  });

  it("empty names get a safe display name", () => {
    const summary = calculatePortfolio(100, [h("a", 50, "cash", "   ")]);
    assert.equal(summary.rows[0].displayName, "Unnamed holding");
  });

  it("rounding helper", () => {
    assert.equal(roundTo(1.005, 2), 1.01);
    assert.equal(roundTo(2.5, 0), 3);
    assert.ok(Number.isNaN(roundTo(NaN, 2)));
  });
});

describe("input parsing", () => {
  const opts = { max: 100, label: "Allocation" };

  it("accepts plain numbers, decimals, and thousands separators", () => {
    assert.equal(parseDecimalInput("25", opts).value, 25);
    assert.equal(parseDecimalInput("12.5", opts).value, 12.5);
    assert.equal(parseDecimalInput(".5", opts).value, 0.5);
    assert.equal(parseDecimalInput("5.", opts).value, 5);
    assert.equal(parseDecimalInput("10,000", { max: MAX_INVESTMENT, label: "x" }).value, 10000);
  });

  it("empty input is 0 without an error", () => {
    const parsed = parseDecimalInput("", opts);
    assert.equal(parsed.value, 0);
    assert.equal(parsed.error, null);
    assert.equal(parsed.isEmpty, true);
  });

  it("rejects invalid input and returns 0", () => {
    for (const bad of ["abc", "1e3", "Infinity", "NaN", "--5", "5%", "1.2.3", "$100"]) {
      const parsed = parseDecimalInput(bad, opts);
      assert.equal(parsed.value, 0, bad);
      assert.ok(parsed.error, `expected an error for ${bad}`);
    }
  });

  it("rejects negatives with a clear message", () => {
    const parsed = parseDecimalInput("-5", opts);
    assert.match(parsed.error ?? "", /negative/i);
  });

  it("rejects values above the maximum", () => {
    assert.ok(parseDecimalInput("101", opts).error);
    assert.equal(parseDecimalInput("100", opts).error, null);
    assert.ok(parseDecimalInput("1000000000001", { max: MAX_INVESTMENT, label: "x" }).error);
  });

  it("toHoldings parses drafts and reports errors per holding", () => {
    const { holdings, errors } = toHoldings([
      { id: "a", name: "A", category: "cash", percentInput: "40" },
      { id: "b", name: "B", category: "cash", percentInput: "oops" },
      { id: "c", name: "C", category: "cash", percentInput: "" },
    ]);
    assert.deepEqual(holdings.map((x) => x.percent), [40, 0, 0]);
    assert.equal(errors.a, null);
    assert.ok(errors.b);
    assert.equal(errors.c, null);
  });
});

describe("chart data", () => {
  it("empty portfolio has no segments", () => {
    assert.deepEqual(buildChartSegments(calculatePortfolio(100, [])), []);
    assert.deepEqual(buildChartSegments(calculatePortfolio(100, [h("a", 0)])), []);
  });

  it("complete portfolio: segments fill the ring and match the table", () => {
    const summary = calculatePortfolio(10000, [h("a", 60), h("b", 30, "bond-etf"), h("c", 10, "cash")]);
    const segments = buildChartSegments(summary);
    assert.equal(segments.length, 3);
    assert.equal(roundTo(segments.reduce((s, x) => s + x.share, 0), 6), 100);
    assert.deepEqual(segments.map((s) => s.percent), summary.rows.map((r) => r.percent));
  });

  it("incomplete portfolio adds a labelled unallocated segment", () => {
    const summary = calculatePortfolio(10000, [h("a", 60), h("b", 25, "cash")]);
    const segments = buildChartSegments(summary);
    const last = segments[segments.length - 1];
    assert.equal(last.categoryId, "unallocated");
    assert.equal(last.percent, 15);
    assert.equal(roundTo(segments.reduce((s, x) => s + x.share, 0), 6), 100);
  });

  it("over-allocated portfolio is scaled to the full ring and has no unallocated segment", () => {
    const summary = calculatePortfolio(10000, [h("a", 70), h("b", 40, "cash")]);
    const segments = buildChartSegments(summary);
    assert.equal(segments.some((s) => s.categoryId === "unallocated"), false);
    assert.equal(roundTo(segments.reduce((s, x) => s + x.share, 0), 6), 100);
    assert.equal(segments[0].percent, 70, "real percent is kept for labels");
  });

  it("assigns different shades to holdings of the same category", () => {
    const summary = calculatePortfolio(100, [h("a", 40), h("b", 40), h("c", 20, "cash")]);
    const segments = buildChartSegments(summary);
    assert.deepEqual(segments.map((s) => s.shade), [0, 1, 0]);
  });
});

describe("observations", () => {
  it("none for an empty portfolio", () => {
    assert.deepEqual(generateObservations(calculatePortfolio(100, [])), []);
  });

  it("states the largest holding using the real percentage", () => {
    const summary = calculatePortfolio(10000, [h("a", 70, "individual-stocks", "NVIDIA"), h("b", 30, "cash")]);
    const text = generateObservations(summary).find((o) => o.id === "largest-holding");
    assert.ok(text);
    assert.match(text.text, /NVIDIA/);
    assert.match(text.text, /70%/);
    assert.equal(text.tone, "notice");
  });

  it("flags incomplete and over-allocated states", () => {
    const incomplete = generateObservations(calculatePortfolio(100, [h("a", 50)]));
    assert.equal(incomplete[0].tone, "notice");
    const over = generateObservations(calculatePortfolio(100, [h("a", 80), h("b", 40, "cash")]));
    assert.equal(over[0].tone, "warning");
    const complete = generateObservations(calculatePortfolio(100, [h("a", 100)]));
    assert.equal(complete[0].tone, "info");
  });

  it("mentions cryptocurrency only when it is allocated", () => {
    const without = generateObservations(calculatePortfolio(100, [h("a", 100)]));
    assert.equal(without.some((o) => o.id === "crypto"), false);
    const withBtc = generateObservations(calculatePortfolio(100, [h("a", 90), h("b", 10, "bitcoin")]));
    const crypto = withBtc.find((o) => o.id === "crypto");
    assert.ok(crypto);
    assert.match(crypto.text, /Bitcoin 10%/);
    const zero = generateObservations(calculatePortfolio(100, [h("a", 100), h("b", 0, "bitcoin")]));
    assert.equal(zero.some((o) => o.id === "crypto"), false);
  });

  it("only mentions funds when a fund category is allocated, and never claims holdings", () => {
    const none = generateObservations(calculatePortfolio(100, [h("a", 100, "cash")]));
    assert.equal(none.some((o) => o.id === "funds"), false);
    const some = generateObservations(calculatePortfolio(100, [h("a", 100, "equity-etf")]));
    const funds = some.find((o) => o.id === "funds");
    assert.ok(funds);
    assert.match(funds.text, /does not analyze fund holdings/);
  });

  it("describes a single-category portfolio honestly", () => {
    const summary = calculatePortfolio(100, [h("a", 50), h("b", 50)]);
    const cat = generateObservations(summary).find((o) => o.id === "categories");
    assert.ok(cat);
    assert.match(cat.title, /one category/i);
  });

  it("never mentions risk scores or predictions", () => {
    const summary = calculatePortfolio(100, [h("a", 50, "bitcoin"), h("b", 50, "equity-etf")]);
    const all = generateObservations(summary).map((o) => `${o.title} ${o.text}`).join(" ");
    assert.doesNotMatch(all, /risk score|will (rise|fall|grow)|guarantee/i);
  });
});

describe("templates", () => {
  it("all six templates exist", () => {
    assert.deepEqual(
      TEMPLATES.map((t) => t.name),
      ["Conservative", "Balanced", "Long-term Growth", "Dividend & Income", "Global Diversification", "Growth + Bitcoin"],
    );
  });

  it("every template totals exactly 100% with valid categories", () => {
    for (const template of TEMPLATES) {
      const total = template.holdings.reduce((sum, x) => sum + x.percent, 0);
      assert.equal(total, 100, `${template.name} must total 100`);
      for (const holding of template.holdings) {
        assert.ok(isCategoryId(holding.category), `${template.name}: ${holding.category}`);
        assert.ok(holding.percent > 0);
        assert.ok(holding.name.trim().length > 0);
      }
      assert.ok(template.risks.length >= 3, `${template.name} has risks`);
      assert.ok(template.objective && template.idea && template.description);
    }
  });

  it("template ids are unique", () => {
    assert.equal(new Set(TEMPLATES.map((t) => t.id)).size, TEMPLATES.length);
  });

  it("has the exact allocations from the specification", () => {
    const get = (id: string) => TEMPLATES.find((t) => t.id === id)!.holdings.map((x) => [x.name, x.percent]);
    assert.deepEqual(get("conservative"), [["Equity ETF", 20], ["Bond ETF", 50], ["Cash", 30]]);
    assert.deepEqual(get("balanced"), [["Equity ETF", 50], ["Bond ETF", 40], ["Cash", 10]]);
    assert.deepEqual(get("long-term-growth"), [["Equity ETF", 80], ["Bond ETF", 15], ["Cash", 5]]);
    assert.deepEqual(get("dividend-income"), [["Dividend Stocks", 40], ["Bond ETF", 40], ["Cash", 20]]);
    assert.deepEqual(get("global-diversification"), [["Global Equity ETF", 70], ["Global Bond ETF", 25], ["Cash", 5]]);
    assert.deepEqual(get("growth-bitcoin"), [["Equity ETF", 70], ["Bond ETF", 20], ["Bitcoin", 10]]);
  });

  it("drafts from a template parse back to the template and match it", () => {
    for (const template of TEMPLATES) {
      const drafts = draftsFromTemplate(template);
      const { holdings, errors } = toHoldings(drafts);
      assert.ok(Object.values(errors).every((e) => e === null));
      assert.ok(portfolioMatchesTemplate(holdings, template));
      assert.equal(calculatePortfolio(10000, holdings).status, "complete");
    }
  });

  it("an edited template no longer matches", () => {
    const template = TEMPLATES[0];
    const drafts = draftsFromTemplate(template);
    drafts[0] = { ...drafts[0], percentInput: "25" };
    assert.equal(portfolioMatchesTemplate(toHoldings(drafts).holdings, template), false);
  });
});

describe("state reducer", () => {
  const start: LabState = { ...initialState, investmentInput: "10000", currency: "THB" };

  it("adds a holding with a unique id and 0%", () => {
    const a = createBlankHolding();
    const b = createBlankHolding();
    assert.notEqual(a.id, b.id);
    assert.equal(a.percentInput, "0");
    const next = labReducer(start, { type: "addHolding", holding: a });
    assert.equal(next.holdings.length, 1);
  });

  it("editing one holding never changes the others", () => {
    let state = start;
    const a = { ...createBlankHolding(), percentInput: "50", name: "A" };
    const b = { ...createBlankHolding("cash"), percentInput: "30", name: "B" };
    state = labReducer(state, { type: "addHolding", holding: a });
    state = labReducer(state, { type: "addHolding", holding: b });
    const edited = labReducer(state, { type: "updateHolding", id: a.id, patch: { percentInput: "60" } });
    assert.equal(edited.holdings[0].percentInput, "60");
    assert.equal(edited.holdings[1].percentInput, "30");
    assert.equal(edited.holdings[1].name, "B");
  });

  it("removes only the chosen holding and leaves the rest untouched", () => {
    let state = start;
    const a = { ...createBlankHolding(), percentInput: "50" };
    const b = { ...createBlankHolding(), percentInput: "30" };
    const c = { ...createBlankHolding(), percentInput: "20" };
    for (const holding of [a, b, c]) state = labReducer(state, { type: "addHolding", holding });
    const next = labReducer(state, { type: "removeHolding", id: b.id });
    assert.deepEqual(next.holdings.map((x) => x.percentInput), ["50", "20"]);
    const empty = [a, c].reduce((s, x) => labReducer(s, { type: "removeHolding", id: x.id }), next);
    assert.equal(calculatePortfolio(10000, toHoldings(empty.holdings).holdings).status, "empty");
  });

  it("changing the investment keeps percentages", () => {
    let state = labReducer(start, { type: "addHolding", holding: { ...createBlankHolding(), percentInput: "40" } });
    state = labReducer(state, { type: "setInvestment", value: "20000" });
    assert.equal(state.holdings[0].percentInput, "40");
    assert.equal(state.investmentInput, "20000");
  });

  it("loading a template keeps the investment amount and currency", () => {
    const template = TEMPLATES.find((t) => t.id === "growth-bitcoin")!;
    let state = labReducer(start, { type: "setInvestment", value: "25000" });
    state = labReducer(state, { type: "loadTemplate", templateId: template.id, holdings: draftsFromTemplate(template) });
    assert.equal(state.investmentInput, "25000");
    assert.equal(state.currency, "THB");
    assert.equal(state.loadedTemplateId, "growth-bitcoin");
    assert.equal(state.holdings.length, 3);
  });

  it("switching currency changes only the currency (no conversion)", () => {
    const state = labReducer({ ...start, investmentInput: "10000" }, { type: "setCurrency", currency: "LAK" });
    assert.equal(state.currency, "LAK");
    assert.equal(state.investmentInput, "10000");
  });

  it("reset returns the defaults", () => {
    const dirty = labReducer(start, { type: "addHolding", holding: createBlankHolding() });
    assert.deepEqual(labReducer(dirty, { type: "reset" }), initialState);
  });
});

describe("formatting", () => {
  it("formats USD without needless decimals", () => {
    assert.equal(formatMoney(2500, "USD"), "$2,500");
    assert.equal(formatMoney(2500.5, "USD"), "$2,500.50");
    assert.equal(formatMoney(0, "USD"), "$0");
  });

  it("LAK has no decimals", () => {
    assert.doesNotMatch(formatMoney(1234567.89, "LAK"), /\./);
  });

  it("never prints NaN or Infinity", () => {
    for (const bad of [NaN, Infinity, -Infinity]) {
      assert.equal(formatMoney(bad, "USD"), "—");
      assert.equal(formatPercent(bad), "—");
    }
  });

  it("formats percentages compactly", () => {
    assert.equal(formatPercent(60), "60%");
    assert.equal(formatPercent(33.333333), "33.33%");
    assert.equal(formatPercent(0), "0%");
  });

  it("every category has a label and color", () => {
    assert.equal(CATEGORIES.length, 10);
    for (const category of CATEGORIES) {
      assert.ok(category.label && /^#[0-9a-f]{6}$/i.test(category.color));
    }
  });
});
