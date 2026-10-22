// Run with:  npx tsx --test lib/portfolio-lab/consistency.test.ts
//
// One portfolio goes in, and every part of Portfolio Lab that reads it must
// agree: the table, the cards, the chart, the risk section, the What-if base,
// the Rebalancing base, the DCA split, and a saved-and-reloaded plan.
// Hundreds of generated portfolios are checked, including empty, incomplete,
// complete, and over-allocated ones. The generator is seeded, so a failure
// can always be reproduced.

import { describe, it } from "vitest";
import assert from "node:assert/strict";

import { buildChartSegments, calculatePortfolio } from "./calculations";
import { CATEGORIES } from "./categories";
import { formatMoney } from "./currency";
import { buildPlanData, planDataToState } from "./plans";
import { calculateRebalance, parseTarget, targetInputsFromCurrent } from "./rebalance";
import { analyzeRisk } from "./risk";
import { periodsFromYears, splitContribution } from "./projection";
import { calculateScenario } from "./scenario";
import type { LabState } from "./state";
import { defaultToolInputs } from "./toolInputs";
import type { CurrencyCode, Holding, PortfolioSummary } from "./types";

/* ---------- Seeded generator ---------- */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Case = {
  label: string;
  investment: number;
  holdings: Holding[];
  expectedStatus: "empty" | "incomplete" | "complete" | "over";
};

/** Hundredths of a percent, so that a "complete" portfolio is exactly 100. */
function splitHundred(rand: () => number, parts: number): number[] {
  const total = 10000;
  const cuts = Array.from({ length: parts - 1 }, () => Math.floor(rand() * (total + 1))).sort((a, b) => a - b);
  const pieces: number[] = [];
  let previous = 0;
  for (const cut of [...cuts, total]) {
    pieces.push((cut - previous) / 100);
    previous = cut;
  }
  return pieces;
}

function makeHoldings(rand: () => number, percents: number[]): Holding[] {
  return percents.map((percent, index) => ({
    id: `h${index}`,
    name: rand() < 0.15 ? "" : `Holding ${index}`,
    category: CATEGORIES[Math.floor(rand() * CATEGORIES.length)].id,
    percent,
  }));
}

function generateCases(count: number): Case[] {
  const rand = mulberry32(20261020);
  const cases: Case[] = [];

  for (let i = 0; i < count; i += 1) {
    const investment = Math.round(rand() * 1e9) / 100 + (rand() < 0.1 ? 0 : 1);
    const kind = i % 4;
    const parts = 1 + Math.floor(rand() * 8);

    if (kind === 0) {
      cases.push({ label: `empty #${i}`, investment, holdings: [], expectedStatus: "empty" });
    } else if (kind === 1) {
      const percents = splitHundred(rand, parts).map((p) => p * 0.6);
      cases.push({
        label: `incomplete #${i}`,
        investment,
        holdings: makeHoldings(rand, percents.map((p) => Math.round(p * 100) / 100)),
        expectedStatus: "incomplete",
      });
    } else if (kind === 2) {
      cases.push({
        label: `complete #${i}`,
        investment,
        holdings: makeHoldings(rand, splitHundred(rand, parts)),
        expectedStatus: "complete",
      });
    } else {
      const percents = splitHundred(rand, parts);
      percents.push(Math.round((1 + rand() * 40) * 100) / 100);
      cases.push({ label: `over #${i}`, investment, holdings: makeHoldings(rand, percents), expectedStatus: "over" });
    }
  }

  return cases;
}

/* ---------- Helpers ---------- */

function close(a: number, b: number, label: string, scale = 1) {
  const limit = 1e-9 * Math.max(1, Math.abs(scale));
  assert.ok(Math.abs(a - b) <= limit, `${label}: ${a} vs ${b}`);
}

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

const CASES = generateCases(400);

/* ---------- The checks ---------- */

describe("the generator covers every state", () => {
  it("has hundreds of cases in all four states", () => {
    const counts = { empty: 0, incomplete: 0, complete: 0, over: 0 };

    for (const c of CASES) {
      // Sums of cents can land exactly on 100; the status below is what matters.
      const summary = calculatePortfolio(c.investment, c.holdings);
      counts[summary.status] += 1;
    }

    for (const state of Object.keys(counts) as (keyof typeof counts)[]) {
      assert.ok(counts[state] >= 50, `${state}: only ${counts[state]} cases`);
    }
  });

  it("a 'complete' case really is complete", () => {
    for (const c of CASES.filter((x) => x.expectedStatus === "complete")) {
      assert.equal(calculatePortfolio(c.investment, c.holdings).status, "complete", c.label);
    }
  });
});

describe("one portfolio, every consumer agrees", () => {
  for (const c of CASES) {
    it(c.label, () => {
      const summary: PortfolioSummary = calculatePortfolio(c.investment, c.holdings);
      const allocated = summary.allocatedAmount;
      const rowsSum = sum(summary.rows.map((r) => r.amount));

      /* Table and cards */
      close(rowsSum, allocated, "sum of holding amounts vs allocated card", summary.investment);
      close(sum(summary.categories.map((x) => x.amount)), allocated, "sum of category amounts", summary.investment);
      close(
        sum(summary.categories.map((x) => x.percent)),
        summary.totalPercent,
        "sum of category percents vs total",
      );

      if (summary.status === "complete") {
        close(allocated, summary.investment, "complete: allocated equals investment", summary.investment);
      } else if (summary.status === "incomplete") {
        close(allocated + summary.unallocatedAmount, summary.investment, "incomplete: parts add up", summary.investment);
      } else if (summary.status === "over") {
        close(allocated - summary.overAmount, summary.investment, "over: excess adds up", summary.investment);
      }

      /* Chart */
      const segments = buildChartSegments(summary);
      if (segments.length > 0) {
        close(sum(segments.map((s) => s.share)), 100, "chart shares add up to a full ring");
        close(
          sum(segments.filter((s) => s.id !== "unallocated").map((s) => s.percent)),
          sum(summary.rows.filter((r) => r.percent > 0).map((r) => r.percent)),
          "chart percents match the table",
        );
      } else {
        assert.equal(summary.rows.filter((r) => r.percent > 0).length, 0);
      }

      /* Risk section */
      const risk = analyzeRisk(summary);
      assert.equal(risk.status, summary.status);
      close(risk.totalPercent, summary.totalPercent, "risk total percent");
      close(risk.allocatedAmount, allocated, "risk allocated amount", summary.investment);
      close(risk.unallocatedAmount, summary.unallocatedAmount, "risk unallocated amount", summary.investment);
      close(sum(risk.holdings.map((h) => h.amount)), allocated, "risk holdings add up", summary.investment);
      assert.deepEqual(
        risk.categories.map((x) => [x.category, x.percent, x.holdingCount]),
        summary.categories.map((x) => [x.category, x.percent, x.holdingCount]),
        "risk categories match the overview",
      );

      /* What-if base, with no change assumed */
      const noChange = Object.fromEntries(CATEGORIES.map((k) => [k.id, 0])) as Record<(typeof CATEGORIES)[number]["id"], number>;
      const scenario = calculateScenario(summary.rows, noChange);
      close(scenario.baseValue, allocated, "what-if base", summary.investment);
      close(scenario.scenarioValue, scenario.baseValue, "what-if with no change", summary.investment);

      /* Rebalancing base, with the current portfolio as the target */
      if (scenario.baseValue > 0) {
        const target = parseTarget(targetInputsFromCurrent(summary.categories));
        assert.equal(target.isValid, true, "a copied target is valid");

        const rebalance = calculateRebalance(summary.categories, target);
        assert.ok(rebalance);
        close(rebalance.baseValue, allocated, "rebalancing base", summary.investment);
        close(rebalance.totalToAdd, 0, "copied target needs no adds", summary.investment);
        close(rebalance.totalToReduce, 0, "copied target needs no reductions", summary.investment);
        close(
          sum(rebalance.rows.map((r) => r.currentAmount)),
          allocated,
          "rebalancing rows add up",
          summary.investment,
        );
      }

      /* DCA split */
      const monthly = 1234.56;
      const periods = periodsFromYears(7);
      const split = splitContribution(summary.rows, summary.status, monthly, periods);
      if (summary.status === "complete") {
        assert.ok(split);
        close(sum(split.map((r) => r.monthlyAmount)), monthly, "DCA monthly split adds up", monthly);
        close(sum(split.map((r) => r.totalAmount)), monthly * periods, "DCA total split adds up", monthly * periods);
      } else {
        assert.equal(split, null, "no split unless fully allocated");
      }

      /* Display: the same number shown in two places reads the same */
      for (const code of ["USD", "THB", "LAK"] as CurrencyCode[]) {
        assert.equal(
          formatMoney(rowsSum, code),
          formatMoney(allocated, code),
          `${code}: table total and card read the same`,
        );
      }

      /* Saving and reopening a plan changes nothing */
      const state: LabState = {
        investmentInput: String(c.investment),
        currency: "USD",
        holdings: c.holdings.map((h) => ({
          id: h.id,
          name: h.name,
          category: h.category,
          percentInput: String(h.percent),
        })),
        loadedTemplateId: null,
      };
      const built = buildPlanData(state, defaultToolInputs());
      assert.ok(built.ok, c.label);

      const restored = planDataToState(built.data);
      const again = buildPlanData(restored.state, restored.tools);
      assert.ok(again.ok);
      assert.deepEqual(again.data, built.data, "plan data is stable through save and load");

      const reloaded = calculatePortfolio(
        Number(restored.state.investmentInput),
        again.data.holdings,
      );
      assert.deepEqual(reloaded, summary, "the reloaded portfolio is identical to the original");
    });
  }
});
