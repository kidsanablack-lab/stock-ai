// Run with:  npx tsx --test lib/portfolio-lab/rebalance.test.ts

import { describe, it } from "vitest";
import assert from "node:assert/strict";

import { calculatePortfolio } from "./calculations";
import { CATEGORIES } from "./categories";
import {
  adjustmentDirection,
  calculateRebalance,
  emptyTargetInputs,
  parseContribution,
  parseTarget,
  targetInputsFromCurrent,
  type RebalanceRow,
  type TargetInputs,
} from "./rebalance";
import { TEMPLATES } from "./templates";
import type { CategoryId, Holding } from "./types";

type Part = [name: string, category: CategoryId, percent: number];

function current(parts: Part[], investment = 10000) {
  const holdings: Holding[] = parts.map(([name, category, percent], index) => ({
    id: `h${index}`,
    name,
    category,
    percent,
  }));
  return calculatePortfolio(investment, holdings).categories;
}

function target(partial: Partial<Record<CategoryId, string>>): TargetInputs {
  return { ...emptyTargetInputs(), ...partial } as TargetInputs;
}

const near = (a: number, b: number, tolerance = 1e-9) =>
  assert.ok(Math.abs(a - b) <= tolerance, `${a} is not close to ${b}`);

function row(rows: RebalanceRow[], category: CategoryId) {
  const found = rows.find((r) => r.category === category);
  assert.ok(found, `no row for ${category}`);
  return found;
}

describe("parseTarget: validation", () => {
  it("accepts a target that totals exactly 100%", () => {
    const parsed = parseTarget(target({ "equity-etf": "60", "bond-etf": "40" }));
    assert.equal(parsed.isValid, true);
    assert.equal(parsed.status, "complete");
    assert.equal(parsed.totalPercent, 100);
  });

  it("accepts decimals that add up to 100 despite floating point", () => {
    const parsed = parseTarget(
      target({ "equity-etf": "33.3", bonds: "33.3", gold: "33.4" }),
    );
    assert.equal(parsed.isValid, true);
  });

  it("an incomplete target is invalid and says by how much", () => {
    const parsed = parseTarget(target({ "equity-etf": "60", "bond-etf": "30" }));
    assert.equal(parsed.isValid, false);
    assert.equal(parsed.status, "incomplete");
    assert.equal(parsed.totalPercent, 90);
  });

  it("an over-allocated target is invalid", () => {
    const parsed = parseTarget(target({ "equity-etf": "70", "bond-etf": "40" }));
    assert.equal(parsed.isValid, false);
    assert.equal(parsed.status, "over");
    assert.equal(parsed.totalPercent, 110);
  });

  it("an all-zero target is 'empty' and invalid", () => {
    const parsed = parseTarget(emptyTargetInputs());
    assert.equal(parsed.status, "empty");
    assert.equal(parsed.isValid, false);
  });

  it("blank, negative, and non-numeric fields are errors, never silent zeros", () => {
    const parsed = parseTarget(
      target({
        "equity-etf": "100",
        bonds: "",
        gold: "-5",
        cash: "abc",
        bitcoin: "100.5",
      }),
    );

    assert.equal(parsed.isValid, false);
    assert.ok(parsed.errors.bonds);
    assert.ok(parsed.errors.gold);
    assert.ok(parsed.errors.cash);
    assert.ok(parsed.errors.bitcoin);
  });

  it("does not normalize: the typed numbers are kept as typed", () => {
    const parsed = parseTarget(target({ "equity-etf": "30", bonds: "30" }));
    assert.equal(parsed.percents["equity-etf"], 30);
    assert.equal(parsed.percents.bonds, 30);
    assert.equal(parsed.totalPercent, 60);
  });
});

describe("calculateRebalance: refuses an invalid target", () => {
  it("returns null for incomplete, over, or empty targets", () => {
    const cur = current([["Stocks", "equity-etf", 100]]);

    for (const inputs of [
      target({ "equity-etf": "60" }),
      target({ "equity-etf": "60", bonds: "60" }),
      emptyTargetInputs(),
    ]) {
      assert.equal(calculateRebalance(cur, parseTarget(inputs)), null);
    }
  });
});

describe("buy and sell (theory)", () => {
  // Current: 70% equity ETF, 30% bonds.  Target: 50 / 50.  V = 10,000.
  const cur = current([
    ["Equity", "equity-etf", 70],
    ["Bonds", "bonds", 30],
  ]);
  const parsed = parseTarget(target({ "equity-etf": "50", bonds: "50" }));
  const result = calculateRebalance(cur, parsed)!;

  it("finds the overweight and underweight categories", () => {
    const equity = row(result.rows, "equity-etf");
    const bonds = row(result.rows, "bonds");

    near(equity.currentPercent, 70);
    near(equity.differencePoints, 20); // above target
    near(equity.targetAmount, 5000);
    near(equity.adjustment, -2000); // reduce

    near(bonds.differencePoints, -20); // below target
    near(bonds.adjustment, 2000); // add
  });

  it("the adds and the reductions cancel out", () => {
    near(result.totalToAdd, 2000);
    near(result.totalToReduce, 2000);
    near(result.rows.reduce((s, r) => s + r.adjustment, 0), 0);
  });

  it("uses the allocated value as the base, not the initial investment", () => {
    // Only 80% allocated: V = 8,000 even though the investment is 10,000.
    const partial = current([
      ["Equity", "equity-etf", 56],
      ["Bonds", "bonds", 24],
    ]);
    const res = calculateRebalance(partial, parsed)!;

    near(res.baseValue, 8000);
    near(row(res.rows, "equity-etf").currentPercent, 70);
    near(row(res.rows, "equity-etf").targetAmount, 4000);
    near(row(res.rows, "equity-etf").adjustment, 4000 - 5600);
  });

  it("a category in the target but not held shows as an 'add' of the full target", () => {
    const res = calculateRebalance(
      current([["Equity", "equity-etf", 100]]),
      parseTarget(target({ "equity-etf": "80", gold: "20" })),
    )!;

    near(row(res.rows, "gold").currentAmount, 0);
    near(row(res.rows, "gold").adjustment, 2000);
  });

  it("a held category with a 0% target shows as a full reduction", () => {
    const res = calculateRebalance(
      current([
        ["Equity", "equity-etf", 80],
        ["Crypto", "bitcoin", 20],
      ]),
      parseTarget(target({ "equity-etf": "100" })),
    )!;

    near(row(res.rows, "bitcoin").adjustment, -2000);
    near(row(res.rows, "equity-etf").adjustment, 2000);
  });

  it("sums several holdings of the same category", () => {
    const res = calculateRebalance(
      current([
        ["A", "individual-stocks", 20],
        ["B", "individual-stocks", 30],
        ["Bonds", "bonds", 50],
      ]),
      parseTarget(target({ "individual-stocks": "50", bonds: "50" })),
    )!;

    near(row(res.rows, "individual-stocks").currentAmount, 5000);
    near(row(res.rows, "individual-stocks").adjustment, 0);
    assert.equal(adjustmentDirection(row(res.rows, "bonds").adjustment, res.baseValue), "none");
  });

  it("already on target gives no adjustments and no noise", () => {
    const res = calculateRebalance(
      current([
        ["A", "equity-etf", 33.33],
        ["B", "bonds", 33.33],
        ["C", "gold", 33.34],
      ]),
      parseTarget(target({ "equity-etf": "33.33", bonds: "33.33", gold: "33.34" })),
    )!;

    assert.equal(res.totalToAdd, 0);
    assert.equal(res.totalToReduce, 0);
  });
});

describe("zero and empty portfolios", () => {
  const parsed = parseTarget(target({ "equity-etf": "60", bonds: "40" }));

  it("zero portfolio value gives no NaN or Infinity anywhere", () => {
    const res = calculateRebalance(current([["Equity", "equity-etf", 100]], 0), parsed)!;

    assert.equal(res.baseValue, 0);
    for (const r of res.rows) {
      for (const value of Object.values(r)) {
        if (typeof value === "number") assert.ok(Number.isFinite(value), String(value));
      }
    }
    assert.equal(res.totalToAdd, 0);
  });

  it("an empty portfolio has a zero base", () => {
    const res = calculateRebalance([], parsed)!;
    assert.equal(res.baseValue, 0);
  });

  it("with no portfolio, new money is split exactly by the target", () => {
    const res = calculateRebalance([], parsed, 1000)!;

    near(row(res.rows, "equity-etf").contribution, 600);
    near(row(res.rows, "bonds").contribution, 400);
    assert.equal(res.contributionBalances, true);
  });
});

describe("contribution only", () => {
  // Current 60 / 40, target 50 / 50, V = 100 (scaled to 10,000 below).
  const cur = current([
    ["Equity", "equity-etf", 60],
    ["Bonds", "bonds", 40],
  ]); // 6,000 / 4,000
  const parsed = parseTarget(target({ "equity-etf": "50", bonds: "50" }));

  it("enough new money reaches the target exactly, with nothing left over", () => {
    // (10,000 + 4,000) * 50% = 7,000 each: equity needs 1,000, bonds 3,000
    const res = calculateRebalance(cur, parsed, 4000)!;

    near(row(res.rows, "equity-etf").contribution, 1000);
    near(row(res.rows, "bonds").contribution, 3000);
    near(res.rows.reduce((s, r) => s + r.contribution, 0), 4000);
    assert.equal(res.contributionBalances, true);
    assert.equal(res.remainingOverweight, 0);
    near(row(res.rows, "equity-etf").percentAfter, 50);
  });

  it("a smaller contribution goes only to the underweight category", () => {
    // post-target (10,000+2,000)*50% = 6,000 each: equity already there, bonds +2,000
    const res = calculateRebalance(cur, parsed, 2000)!;

    near(row(res.rows, "equity-etf").contribution, 0);
    near(row(res.rows, "bonds").contribution, 2000);
    assert.equal(res.contributionBalances, true);
  });

  it("too little new money leaves a remaining deviation", () => {
    // post-target 5,500 each: equity 6,000 (500 over), bonds needs 1,500; N = 1,000
    const res = calculateRebalance(cur, parsed, 1000)!;
    const equity = row(res.rows, "equity-etf");
    const bonds = row(res.rows, "bonds");

    near(equity.contribution, 0);
    near(bonds.contribution, 1000);
    near(equity.remainingAmount, 500); // still above target
    near(bonds.remainingAmount, -500); // still below target
    near(res.remainingOverweight, 500);
    assert.equal(res.contributionBalances, false);

    near(equity.percentAfter, (6000 / 11000) * 100);
    assert.ok(equity.remainingPoints > 0);
    assert.ok(bonds.remainingPoints < 0);
  });

  it("the new money is always fully placed and the totals add up", () => {
    for (const n of [1, 250, 1000, 1999.99, 2000, 5000, 100000]) {
      const res = calculateRebalance(cur, parsed, n)!;

      near(res.rows.reduce((s, r) => s + r.contribution, 0), n, 1e-6);
      near(res.rows.reduce((s, r) => s + r.amountAfter, 0), 10000 + n, 1e-6);
      assert.ok(res.rows.every((r) => r.contribution >= 0), "no negative contributions");
    }
  });

  it("splits new money across several underweight categories by their shortfall", () => {
    // Current 40 / 10 / 50, target 20 / 40 / 40 (V = 10,000), N = 3,000.
    // post-target (13,000): 2,600 / 5,200 / 5,200 -> shortfalls 0 / 4,200 / 200.
    const res = calculateRebalance(
      current([
        ["A", "equity-etf", 40],
        ["B", "bonds", 10],
        ["C", "gold", 50],
      ]),
      parseTarget(target({ "equity-etf": "20", bonds: "40", gold: "40" })),
      3000,
    )!;

    near(row(res.rows, "equity-etf").contribution, 0);
    near(row(res.rows, "bonds").contribution, (3000 * 4200) / 4400);
    near(row(res.rows, "gold").contribution, (3000 * 200) / 4400);
  });

  it("zero contribution changes nothing", () => {
    const res = calculateRebalance(cur, parsed, 0)!;

    assert.ok(res.rows.every((r) => r.contribution === 0));
    near(row(res.rows, "equity-etf").percentAfter, 60);
  });

  it("ignores a negative or non-finite contribution", () => {
    for (const n of [-5, Number.NaN, Number.POSITIVE_INFINITY]) {
      const res = calculateRebalance(cur, parsed, n)!;
      assert.equal(res.contribution, 0);
      assert.ok(res.rows.every((r) => Number.isFinite(r.contribution)));
    }
  });
});

describe("the two methods are different things", () => {
  it("contribution-only does not equal buy-and-sell", () => {
    const cur = current([
      ["Equity", "equity-etf", 70],
      ["Bonds", "bonds", 30],
    ]);
    const parsed = parseTarget(target({ "equity-etf": "50", bonds: "50" }));
    const res = calculateRebalance(cur, parsed, 1000)!;

    const equity = row(res.rows, "equity-etf");

    // Theory says reduce equity by 2,000. New money never reduces anything.
    near(equity.adjustment, -2000);
    near(equity.contribution, 0);
    assert.ok(equity.remainingAmount > 0, "equity is still above target");
    assert.ok(res.remainingOverweight > 0);
  });
});

describe("copying the current portfolio", () => {
  it("makes a valid target that matches the current shares", () => {
    const cur = current([
      ["A", "equity-etf", 33.33],
      ["B", "bonds", 33.33],
      ["C", "gold", 33.34],
    ]);
    const inputs = targetInputsFromCurrent(cur);
    const parsed = parseTarget(inputs);

    assert.equal(parsed.isValid, true);

    const res = calculateRebalance(cur, parsed)!;
    near(res.totalToAdd, 0, 1e-6);
    near(res.totalToReduce, 0, 1e-6);
  });

  it("works for an incomplete portfolio by using shares of the allocated part", () => {
    const cur = current([
      ["A", "equity-etf", 40],
      ["B", "bonds", 20],
    ]); // 60% allocated
    const inputs = targetInputsFromCurrent(cur);

    near(Number(inputs["equity-etf"]), (2 / 3) * 100, 1e-6);
    assert.equal(parseTarget(inputs).isValid, true);
  });

  it("copies the six templates into valid targets", () => {
    for (const template of TEMPLATES) {
      const cur = current(
        template.holdings.map((h) => [h.name, h.category, h.percent] as Part),
      );
      assert.equal(parseTarget(targetInputsFromCurrent(cur)).isValid, true, template.id);
    }
  });

  it("an empty portfolio copies to an empty target", () => {
    assert.deepEqual(targetInputsFromCurrent([]), emptyTargetInputs());
  });
});

describe("inputs and state", () => {
  it("does not modify the data it reads", () => {
    const cur = current([
      ["Equity", "equity-etf", 70],
      ["Bonds", "bonds", 30],
    ]);
    const parsed = parseTarget(target({ "equity-etf": "50", bonds: "50" }));
    const before = structuredClone({ cur, parsed });

    cur.forEach((c) => Object.freeze(c));
    calculateRebalance(cur, parsed, 500);

    assert.deepEqual({ cur, parsed }, before);
  });

  it("every category has a target field, all starting at 0", () => {
    const inputs = emptyTargetInputs();
    assert.equal(Object.keys(inputs).length, CATEGORIES.length);
    assert.ok(Object.values(inputs).every((v) => v === "0"));
  });

  it("parses the contribution like other money fields", () => {
    assert.equal(parseContribution("1,500").value, 1500);
    assert.ok(parseContribution("-5").error);
    assert.ok(parseContribution("abc").error);
    assert.equal(parseContribution("").isEmpty, true);
  });
});
