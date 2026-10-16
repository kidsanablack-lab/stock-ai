// Run with:  npx tsx --test lib/portfolio-lab/projection.test.ts

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  MAX_ANNUAL_RETURN,
  MAX_YEARS,
  calculateProjection,
  compareAnnualReturns,
  futureValueClosedForm,
  monthlyRateFromAnnual,
  parseProjectionInputs,
  parseSignedDecimalInput,
  periodsFromYears,
  splitContribution,
  yearlyPoints,
  type ProjectionInput,
  type ProjectionResult,
} from "./projection";
import { calculatePortfolio } from "./calculations";
import { formatCompactMoney, formatSignedMoney, formatSignedPercent } from "./currency";
import type { Holding } from "./types";

function run(input: Partial<ProjectionInput> = {}): ProjectionResult {
  const outcome = calculateProjection({
    initial: 10000,
    monthly: 0,
    years: 10,
    annualReturnPercent: 6,
    ...input,
  });
  assert.ok(outcome.ok, outcome.ok ? "" : outcome.error);
  return outcome.result;
}

const near = (a: number, b: number, tolerance = 1e-6) =>
  assert.ok(Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(b)), `${a} is not close to ${b}`);

describe("rate conversion", () => {
  it("uses the effective annual rate, not annual/12", () => {
    const r = monthlyRateFromAnnual(6);
    near(Math.pow(1 + r, 12), 1.06, 1e-12);
    assert.ok(r < 0.06 / 12, "effective monthly rate is below 6%/12");
  });

  it("zero and negative annual rates convert correctly", () => {
    assert.equal(monthlyRateFromAnnual(0), 0);
    assert.ok(monthlyRateFromAnnual(-12) < 0);
    near(Math.pow(1 + monthlyRateFromAnnual(-12), 12), 0.88, 1e-12);
  });
});

describe("lump sum", () => {
  it("grows by the annual rate after one year", () => {
    near(run({ years: 1 }).futureValue, 10600, 1e-9);
  });

  it("compounds over ten years", () => {
    near(run().futureValue, 10000 * Math.pow(1.06, 10), 1e-9);
  });

  it("zero return keeps the principal unchanged", () => {
    const result = run({ annualReturnPercent: 0 });
    assert.equal(result.futureValue, 10000);
    assert.equal(result.growth, 0);
    assert.equal(result.isLoss, false);
  });

  it("negative return is a loss, finite, and not below zero", () => {
    const result = run({ annualReturnPercent: -10 });
    assert.ok(result.growth < 0 && result.isLoss);
    assert.ok(Number.isFinite(result.futureValue) && result.futureValue > 0);
    near(result.futureValue, 10000 * Math.pow(0.9, 10), 1e-9);
    assert.ok(result.growthPercent !== null && result.growthPercent < 0);
  });

  it("separates principal from growth", () => {
    const result = run();
    assert.equal(result.principal, 10000);
    assert.equal(result.totalContributions, 0);
    near(result.growth, result.futureValue - result.principal);
  });
});

describe("monthly contributions", () => {
  it("zero return: initial plus contributions", () => {
    const result = run({ initial: 1000, monthly: 100, years: 2, annualReturnPercent: 0 });
    assert.equal(result.futureValue, 1000 + 100 * 24);
    assert.equal(result.totalContributions, 2400);
    assert.equal(result.principal, 3400);
    assert.equal(result.growth, 0);
  });

  it("matches the closed-form formula for several cases", () => {
    for (const [initial, monthly, years, rate] of [
      [0, 500, 10, 6], [10000, 300, 30, 9], [5000, 100, 1, 3],
      [2500, 750, 25, -5], [0, 50, 0.5, 20], [100000, 0, 40, 7.5],
    ]) {
      const result = run({ initial, monthly, years, annualReturnPercent: rate });
      near(
        result.futureValue,
        futureValueClosedForm(initial, monthly, monthlyRateFromAnnual(rate), periodsFromYears(years)),
        1e-9,
      );
    }
  });

  it("contributes at the END of each month (first deposit earns nothing that month)", () => {
    const result = run({ initial: 0, monthly: 100, years: 1 / 12, annualReturnPercent: 12 });
    assert.equal(result.periods, 1);
    assert.equal(result.futureValue, 100);
  });

  it("counts every contribution", () => {
    const result = run({ initial: 0, monthly: 250, years: 3, annualReturnPercent: 5 });
    assert.equal(result.totalContributions, 250 * 36);
    assert.equal(result.principal, 250 * 36);
  });

  it("the schedule has month 0..n and its last point equals the summary", () => {
    const result = run({ monthly: 200, years: 5 });
    assert.equal(result.points.length, 61);
    assert.equal(result.points[0].month, 0);
    assert.equal(result.points[0].balance, 10000);
    const last = result.points[result.points.length - 1];
    assert.equal(last.balance, result.futureValue);
    assert.equal(last.principal, result.principal);
  });

  it("principal never decreases and balance stays positive", () => {
    const result = run({ monthly: 100, annualReturnPercent: -20 });
    for (let i = 1; i < result.points.length; i += 1) {
      assert.ok(result.points[i].principal >= result.points[i - 1].principal);
      assert.ok(result.points[i].balance > 0);
    }
  });
});

describe("edge cases", () => {
  it("zero initial and zero contribution give zero and no percent", () => {
    const result = run({ initial: 0, monthly: 0 });
    assert.equal(result.futureValue, 0);
    assert.equal(result.principal, 0);
    assert.equal(result.growthPercent, null);
    assert.ok(Number.isFinite(result.growth));
  });

  it("rejects invalid numbers, negatives, impossible returns, bad durations", () => {
    const bad: Partial<ProjectionInput>[] = [
      { initial: NaN }, { monthly: Infinity }, { years: NaN }, { annualReturnPercent: -Infinity },
      { initial: -1 }, { monthly: -5 },
      { annualReturnPercent: -100 }, { annualReturnPercent: -150 },
      { years: 0 }, { years: -2 }, { years: 0.01 }, { years: MAX_YEARS + 1 },
    ];
    for (const input of bad) {
      const outcome = calculateProjection({ initial: 100, monthly: 10, years: 5, annualReturnPercent: 5, ...input });
      assert.equal(outcome.ok, false, JSON.stringify(input));
      if (!outcome.ok) assert.ok(outcome.error.length > 0);
    }
  });

  it("refuses a result that is too large instead of showing a wrong number", () => {
    const outcome = calculateProjection({
      initial: 1_000_000_000_000, monthly: 1_000_000_000, years: MAX_YEARS, annualReturnPercent: MAX_ANNUAL_RETURN,
    });
    if (outcome.ok) {
      assert.ok(Number.isFinite(outcome.result.futureValue));
      assert.ok(outcome.result.futureValue <= 1e18);
    } else {
      assert.match(outcome.error, /too large/i);
    }
  });

  it("a large but supported input stays finite", () => {
    const result = run({ initial: 1_000_000_000, monthly: 1_000_000, years: 40, annualReturnPercent: 10 });
    assert.ok(Number.isFinite(result.futureValue) && result.futureValue > result.principal);
  });
});

describe("year-by-year points", () => {
  it("includes each full year and the final month", () => {
    const result = run({ years: 2.5, monthly: 100 });
    assert.deepEqual(yearlyPoints(result).map((p) => p.month), [0, 12, 24, 30]);
  });

  it("an exact number of years has no extra row", () => {
    assert.deepEqual(yearlyPoints(run({ years: 3 })).map((p) => p.month), [0, 12, 24, 36]);
  });
});

describe("comparing return assumptions", () => {
  it("higher assumed returns give higher values for the same inputs", () => {
    const rows = compareAnnualReturns({ initial: 10000, monthly: 200, years: 15 }, [3, 6, 9]);
    const values = rows.map((row) => {
      assert.ok(row.outcome.ok);
      return row.outcome.ok ? row.outcome.result.futureValue : 0;
    });
    assert.ok(values[0] < values[1] && values[1] < values[2]);
    for (const row of rows) {
      assert.ok(row.outcome.ok);
      if (row.outcome.ok) assert.equal(row.outcome.result.principal, 10000 + 200 * 180);
    }
  });

  it("each scenario matches a direct calculation (single engine)", () => {
    const [row] = compareAnnualReturns({ initial: 5000, monthly: 0, years: 7 }, [6]);
    assert.ok(row.outcome.ok);
    if (row.outcome.ok) {
      assert.equal(row.outcome.result.futureValue, run({ initial: 5000, years: 7 }).futureValue);
    }
  });

  it("a bad rate fails that row only", () => {
    const rows = compareAnnualReturns({ initial: 100, monthly: 0, years: 1 }, [5, -100]);
    assert.equal(rows[0].outcome.ok, true);
    assert.equal(rows[1].outcome.ok, false);
  });
});

describe("parsing the text fields", () => {
  const base = { initial: "10,000", monthly: "500", years: "10", annualReturn: "6" };

  it("accepts valid text", () => {
    const { input, errors } = parseProjectionInputs(base);
    assert.deepEqual(errors, {});
    assert.deepEqual(input, { initial: 10000, monthly: 500, years: 10, annualReturnPercent: 6 });
  });

  it("a blank return is allowed and means 0%", () => {
    const parsed = parseProjectionInputs({ ...base, annualReturn: "" });
    assert.equal(parsed.input?.annualReturnPercent, 0);
    assert.equal(parsed.returnIsBlank, true);
  });

  it("allows negative returns inside the supported range", () => {
    assert.equal(parseProjectionInputs({ ...base, annualReturn: "-5" }).input?.annualReturnPercent, -5);
    assert.equal(parseProjectionInputs({ ...base, annualReturn: "−5" }).input?.annualReturnPercent, -5);
    assert.ok(parseProjectionInputs({ ...base, annualReturn: "-51" }).errors.annualReturn);
    assert.ok(parseProjectionInputs({ ...base, annualReturn: "51" }).errors.annualReturn);
  });

  it("reports an error per field and returns no input", () => {
    const parsed = parseProjectionInputs({ initial: "abc", monthly: "-5", years: "", annualReturn: "1e2" });
    assert.equal(parsed.input, null);
    assert.ok(parsed.errors.initial && parsed.errors.monthly && parsed.errors.years && parsed.errors.annualReturn);
  });

  it("validates duration", () => {
    for (const years of ["0", "-1", "abc", "61", "0.01"]) {
      assert.ok(parseProjectionInputs({ ...base, years }).errors.years, years);
    }
    assert.equal(parseProjectionInputs({ ...base, years: "0.5" }).input?.years, 0.5);
    assert.equal(parseProjectionInputs({ ...base, years: "60" }).errors.years, undefined);
  });

  it("rejects exponent, Infinity, and NaN text", () => {
    for (const text of ["1e3", "Infinity", "NaN", "5%", "$5"]) {
      assert.ok(parseProjectionInputs({ ...base, initial: text }).errors.initial, text);
    }
  });

  it("signed parser", () => {
    assert.equal(parseSignedDecimalInput("-3.5", { min: -50, max: 50, label: "R" }).value, -3.5);
    assert.equal(parseSignedDecimalInput("-0", { min: -50, max: 50, label: "R" }).value, 0);
    assert.ok(Object.is(parseSignedDecimalInput("-0", { min: -50, max: 50, label: "R" }).value, 0));
    assert.ok(parseSignedDecimalInput("--3", { min: -50, max: 50, label: "R" }).error);
  });
});

describe("splitting a contribution by the portfolio allocation", () => {
  const rows = (parts: [string, number][]) => {
    const holdings: Holding[] = parts.map(([id, percent]) => ({ id, name: id, category: "equity-etf", percent }));
    return calculatePortfolio(10000, holdings);
  };

  it("splits only a fully allocated portfolio", () => {
    const summary = rows([["a", 60], ["b", 30], ["c", 10]]);
    const split = splitContribution(summary.rows, summary.status, 500, 12);
    assert.ok(split);
    assert.deepEqual(split.map((r) => r.monthlyAmount), [300, 150, 50]);
    assert.deepEqual(split.map((r) => r.totalAmount), [3600, 1800, 600]);
    near(split.reduce((s, r) => s + r.monthlyAmount, 0), 500);
  });

  it("returns null when incomplete, over-allocated, or empty (never rescales silently)", () => {
    for (const parts of [[["a", 60]], [["a", 70], ["b", 50]], []] as [string, number][][]) {
      const summary = rows(parts);
      assert.equal(splitContribution(summary.rows, summary.status, 500, 12), null);
    }
  });

  it("skips zero-percent holdings", () => {
    const summary = rows([["a", 100], ["b", 0]]);
    assert.equal(splitContribution(summary.rows, summary.status, 100, 1)?.length, 1);
  });
});

describe("display helpers", () => {
  it("signed money puts the sign in the text", () => {
    assert.equal(formatSignedMoney(1200, "USD"), "+$1,200");
    assert.equal(formatSignedMoney(-300, "USD"), "\u2212$300");
    assert.equal(formatSignedMoney(0, "USD"), "$0");
    assert.equal(formatSignedMoney(-0.001, "USD"), "$0");
    assert.equal(formatSignedMoney(NaN, "USD"), "—");
  });

  it("signed percent", () => {
    assert.equal(formatSignedPercent(12.5), "+12.5%");
    assert.equal(formatSignedPercent(-3), "\u22123%");
    assert.equal(formatSignedPercent(0), "0%");
    assert.equal(formatSignedPercent(Infinity), "—");
  });

  it("compact money for axes", () => {
    assert.equal(formatCompactMoney(1500000, "USD"), "$1.5M");
    assert.equal(formatCompactMoney(0, "USD"), "$0");
    assert.equal(formatCompactMoney(NaN, "USD"), "—");
  });
});
