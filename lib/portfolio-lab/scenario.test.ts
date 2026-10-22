// Run with:  npx tsx --test lib/portfolio-lab/scenario.test.ts

import { describe, it } from "vitest";
import assert from "node:assert/strict";

import { calculatePortfolio } from "./calculations";
import { CATEGORIES } from "./categories";
import {
  MAX_CHANGE_PERCENT,
  MIN_CHANGE_PERCENT,
  SCENARIO_PRESETS,
  calculateScenario,
  emptyScenarioInputs,
  getPreset,
  parseScenario,
  presetToInputs,
  type ScenarioChanges,
} from "./scenario";
import { initialState, labReducer } from "./state";
import type { CategoryId, Holding } from "./types";

type Part = [name: string, category: CategoryId, percent: number];

function build(parts: Part[], investment = 10000) {
  const holdings: Holding[] = parts.map(([name, category, percent], index) => ({
    id: `h${index}`,
    name,
    category,
    percent,
  }));
  return calculatePortfolio(investment, holdings);
}

function changes(partial: Partial<Record<CategoryId, number>>): ScenarioChanges {
  const all = {} as ScenarioChanges;
  for (const category of CATEGORIES) all[category.id] = partial[category.id] ?? 0;
  return all;
}

const near = (a: number, b: number, tolerance = 1e-9) =>
  assert.ok(Math.abs(a - b) <= tolerance, `${a} is not close to ${b}`);

describe("calculateScenario: basic results", () => {
  it("no change keeps every value the same", () => {
    const summary = build([
      ["Stocks", "individual-stocks", 60],
      ["Bonds", "bonds", 40],
    ]);
    const result = calculateScenario(summary.rows, changes({}));

    assert.equal(result.baseValue, 10000);
    assert.equal(result.scenarioValue, 10000);
    assert.equal(result.absoluteChange, 0);
    assert.equal(result.percentageChange, 0);
    assert.equal(result.direction, "none");
  });

  it("a positive change raises the value", () => {
    const summary = build([["Gold", "gold", 100]]);
    const result = calculateScenario(summary.rows, changes({ gold: 25 }));

    near(result.scenarioValue, 12500);
    near(result.absoluteChange, 2500);
    near(result.percentageChange as number, 25);
    assert.equal(result.direction, "up");
  });

  it("a negative change lowers the value", () => {
    const summary = build([["Bitcoin", "bitcoin", 100]]);
    const result = calculateScenario(summary.rows, changes({ bitcoin: -50 }));

    near(result.scenarioValue, 5000);
    near(result.absoluteChange, -5000);
    near(result.percentageChange as number, -50);
    assert.equal(result.direction, "down");
  });

  it("-100% takes a holding to exactly zero, never below", () => {
    const summary = build([["Crypto", "other-crypto", 100]]);
    const result = calculateScenario(summary.rows, changes({ "other-crypto": -100 }));

    assert.equal(result.scenarioValue, 0);
    near(result.percentageChange as number, -100);
  });

  it("clamps a value below -100% to zero if called directly", () => {
    const summary = build([["Crypto", "other-crypto", 100]]);
    const result = calculateScenario(summary.rows, changes({ "other-crypto": -250 }));

    assert.equal(result.scenarioValue, 0);
    assert.ok(result.rows.every((row) => row.scenarioAmount >= 0));
  });
});

describe("calculateScenario: several holdings", () => {
  it("applies one category change to every holding in that category", () => {
    const summary = build([
      ["Apple", "individual-stocks", 20],
      ["Microsoft", "individual-stocks", 30],
      ["Bonds", "bonds", 50],
    ]);
    const result = calculateScenario(summary.rows, changes({ "individual-stocks": -20 }));

    near(result.rows[0].scenarioAmount, 1600);
    near(result.rows[1].scenarioAmount, 2400);
    near(result.rows[2].scenarioAmount, 5000);
    near(result.scenarioValue, 9000);
    near(result.absoluteChange, -1000);
    near(result.percentageChange as number, -10);
  });

  it("handles several categories with different changes", () => {
    const summary = build([
      ["Equity ETF", "equity-etf", 50],
      ["Bond ETF", "bond-etf", 30],
      ["Bitcoin", "bitcoin", 20],
    ]);
    const result = calculateScenario(
      summary.rows,
      changes({ "equity-etf": -20, "bond-etf": 5, bitcoin: -50 }),
    );

    // 5000*0.8 + 3000*1.05 + 2000*0.5 = 4000 + 3150 + 1000
    near(result.scenarioValue, 8150);
    near(result.absoluteChange, -1850);
    near(result.percentageChange as number, -18.5);
  });

  it("applies the Cash assumption when cash is a holding", () => {
    const summary = build([
      ["Savings", "cash", 50],
      ["Gold", "gold", 50],
    ]);
    const result = calculateScenario(summary.rows, changes({ cash: -10 }));

    near(result.rows[0].scenarioAmount, 4500);
    near(result.rows[1].scenarioAmount, 5000);
  });
});

describe("calculateScenario: base value and edge cases", () => {
  it("uses only the allocated money, not the unallocated money", () => {
    const summary = build([["Stocks", "individual-stocks", 60]]); // 40% unallocated
    const result = calculateScenario(summary.rows, changes({ "individual-stocks": -50 }));

    assert.equal(result.baseValue, 6000);
    near(result.scenarioValue, 3000);
    near(result.percentageChange as number, -50);
  });

  it("starting value of zero gives no percentage and no crash", () => {
    const summary = build([["Stocks", "individual-stocks", 100]], 0);
    const result = calculateScenario(summary.rows, changes({ "individual-stocks": -20 }));

    assert.equal(result.baseValue, 0);
    assert.equal(result.scenarioValue, 0);
    assert.equal(result.absoluteChange, 0);
    assert.equal(result.percentageChange, null);
    assert.equal(result.direction, "none");
    assert.deepEqual(result.rows, []);
  });

  it("an empty portfolio gives a zero base and no percentage", () => {
    const summary = build([]);
    const result = calculateScenario(summary.rows, changes({ gold: 10 }));

    assert.equal(result.baseValue, 0);
    assert.equal(result.percentageChange, null);
  });

  it("holdings at 0% are left out of the rows", () => {
    const summary = build([
      ["Stocks", "individual-stocks", 100],
      ["Idea", "gold", 0],
    ]);
    const result = calculateScenario(summary.rows, changes({ gold: 50 }));

    assert.equal(result.rows.length, 1);
    assert.equal(result.baseValue, 10000);
  });

  it("an over-allocated portfolio uses the amounts as entered", () => {
    const summary = build([
      ["A", "individual-stocks", 80],
      ["B", "bonds", 40],
    ]); // 120%
    const result = calculateScenario(summary.rows, changes({ bonds: -50 }));

    near(result.baseValue, 12000);
    near(result.scenarioValue, 10000);
  });

  it("floating-point noise is reported as no change", () => {
    const summary = build([
      ["A", "individual-stocks", 33.33],
      ["B", "bonds", 33.33],
      ["C", "gold", 33.34],
    ]);
    const result = calculateScenario(summary.rows, changes({}));

    assert.equal(result.direction, "none");
  });

  it("works with very large amounts", () => {
    const summary = build([["Stocks", "individual-stocks", 100]], 1_000_000_000_000);
    const result = calculateScenario(
      summary.rows,
      changes({ "individual-stocks": MAX_CHANGE_PERCENT }),
    );

    assert.ok(Number.isFinite(result.scenarioValue));
    near(result.percentageChange as number, MAX_CHANGE_PERCENT, 1e-6);
  });
});

describe("parseScenario", () => {
  it("accepts the default inputs", () => {
    const parsed = parseScenario(emptyScenarioInputs());
    assert.equal(parsed.isValid, true);
    assert.deepEqual(parsed.errors, {});
  });

  it("accepts negatives, decimals, and the unicode minus sign", () => {
    const inputs = emptyScenarioInputs();
    inputs.bitcoin = "-12.5";
    inputs.gold = "\u22123";
    const parsed = parseScenario(inputs);

    assert.equal(parsed.changes.bitcoin, -12.5);
    assert.equal(parsed.changes.gold, -3);
  });

  it("rejects anything below -100% with a message", () => {
    const inputs = emptyScenarioInputs();
    inputs.bitcoin = "-100.01";
    const parsed = parseScenario(inputs);

    assert.equal(parsed.isValid, false);
    assert.ok(parsed.errors.bitcoin);
    assert.ok(parsed.errors.bitcoin?.includes(String(MIN_CHANGE_PERCENT)));
  });

  it("accepts exactly -100%", () => {
    const inputs = emptyScenarioInputs();
    inputs.bitcoin = "-100";
    assert.equal(parseScenario(inputs).isValid, true);
  });

  it("rejects values above the maximum", () => {
    const inputs = emptyScenarioInputs();
    inputs.gold = String(MAX_CHANGE_PERCENT + 1);
    assert.equal(parseScenario(inputs).isValid, false);
  });

  it("treats blank and invalid text as errors, not silent zeros", () => {
    const inputs = emptyScenarioInputs();
    inputs.bonds = "";
    inputs.gold = "abc";
    inputs.cash = "Infinity";
    inputs["real-estate"] = "1e3";
    const parsed = parseScenario(inputs);

    assert.equal(parsed.isValid, false);
    assert.ok(parsed.errors.bonds);
    assert.ok(parsed.errors.gold);
    assert.ok(parsed.errors.cash);
    assert.ok(parsed.errors["real-estate"]);
  });
});

describe("presets and reset", () => {
  it("every category appears in the inputs", () => {
    const inputs = emptyScenarioInputs();
    assert.equal(Object.keys(inputs).length, 10);
    for (const category of CATEGORIES) assert.equal(inputs[category.id], "0");
  });

  it("'Stocks' covers individual stocks and equity ETFs", () => {
    const preset = getPreset("stocks-fall");
    assert.ok(preset);
    const parsed = parseScenario(presetToInputs(preset));

    assert.equal(parsed.changes["individual-stocks"], -20);
    assert.equal(parsed.changes["equity-etf"], -20);
    assert.equal(parsed.changes.bonds, 0);
  });

  it("'Bonds' covers bonds and bond ETFs", () => {
    const preset = getPreset("bonds-fall");
    assert.ok(preset);
    const parsed = parseScenario(presetToInputs(preset));

    assert.equal(parsed.changes.bonds, -5);
    assert.equal(parsed.changes["bond-etf"], -5);
    assert.equal(parsed.changes["equity-etf"], 0);
  });

  it("Bitcoin only changes Bitcoin, not other crypto", () => {
    const parsed = parseScenario(presetToInputs(getPreset("bitcoin-fall")!));
    assert.equal(parsed.changes.bitcoin, -50);
    assert.equal(parsed.changes["other-crypto"], 0);
  });

  it("the combined downturn is all three at once", () => {
    const parsed = parseScenario(presetToInputs(getPreset("combined-downturn")!));

    assert.equal(parsed.changes["individual-stocks"], -20);
    assert.equal(parsed.changes["equity-etf"], -20);
    assert.equal(parsed.changes.bonds, -5);
    assert.equal(parsed.changes["bond-etf"], -5);
    assert.equal(parsed.changes.bitcoin, -50);
    assert.equal(parsed.changes.gold, 0);
  });

  it("every preset is valid and none is below -100%", () => {
    for (const preset of SCENARIO_PRESETS) {
      assert.equal(parseScenario(presetToInputs(preset)).isValid, true, preset.id);
    }
  });

  it("an unknown preset id returns null", () => {
    assert.equal(getPreset("nope"), null);
    assert.equal(getPreset(null), null);
  });

  it("reset returns to no change, and is a fresh object each time", () => {
    const loaded = presetToInputs(getPreset("combined-downturn")!);
    const reset = emptyScenarioInputs();

    assert.notDeepEqual(loaded, reset);
    assert.deepEqual(reset, emptyScenarioInputs());
    assert.notEqual(emptyScenarioInputs(), emptyScenarioInputs());
  });

  it("preset wording stays educational (no advice or predictions)", () => {
    const text = SCENARIO_PRESETS.map((p) => `${p.name} ${p.description}`).join(" ");
    assert.doesNotMatch(text, /\b(buy|sell|will|expect|forecast|predict|bullish|bearish)\b/i);
  });
});

describe("simulation never changes the portfolio", () => {
  it("does not modify the rows it reads", () => {
    const summary = build([
      ["Stocks", "individual-stocks", 60],
      ["Bonds", "bonds", 40],
    ]);
    const before = structuredClone(summary);

    summary.rows.forEach((row) => Object.freeze(row));
    Object.freeze(summary.rows);

    const result = calculateScenario(summary.rows, changes({ "individual-stocks": -90 }));

    assert.deepEqual(summary, before);
    assert.notEqual(result.rows[0].scenarioAmount, summary.rows[0].amount);
  });

  it("the reducer state is a separate thing and stays untouched", () => {
    const state = structuredClone(initialState);
    const snapshot = structuredClone(state);

    const summary = build([["Stocks", "individual-stocks", 100]]);
    calculateScenario(summary.rows, changes({ "individual-stocks": -50 }));
    parseScenario(emptyScenarioInputs());

    assert.deepEqual(state, snapshot);
    // The reducer has no scenario action, so a scenario cannot reach it.
    // Editing the portfolio works exactly as before.
    const edited = labReducer(state, { type: "setInvestment", value: "500" });
    assert.equal(edited.investmentInput, "500");
    assert.deepEqual(state, snapshot);
  });
});
