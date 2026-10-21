// Run with:  npx tsx --test lib/portfolio-lab/plans.test.ts

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { CATEGORIES } from "./categories";
import {
  MAX_PLANS,
  MAX_PLAN_NAME_LENGTH,
  addImportedPlans,
  buildPlanData,
  createPlan,
  deletePlan,
  duplicatePlan,
  makePlanId,
  numberToInput,
  planDataToState,
  plansDataEqual,
  renamePlan,
  updatePlanData,
  validatePlan,
  validatePlanName,
  type PlanData,
  type SavedPlan,
} from "./plans";
import { draftsFromTemplate, initialState, labReducer, type LabState } from "./state";
import { TEMPLATES } from "./templates";
import { defaultToolInputs, type ToolInputs } from "./toolInputs";

const NOW = new Date("2026-10-20T10:00:00.000Z");
const LATER = new Date("2026-10-21T12:30:00.000Z");

function sampleState(): LabState {
  return {
    ...initialState,
    investmentInput: "12,500",
    currency: "THB",
    holdings: draftsFromTemplate(TEMPLATES[1]), // Balanced
  };
}

function sampleTools(): ToolInputs {
  const tools = defaultToolInputs();
  tools.dca.monthly = "750.5";
  tools.calculator.mode = "monthly";
  tools.calculator.rates = ["2", "-1.5", "8"];
  tools.target["equity-etf"] = "60";
  tools.target["bond-etf"] = "40";
  return tools;
}

function built(state = sampleState(), tools = sampleTools()): PlanData {
  const result = buildPlanData(state, tools);
  assert.ok(result.ok, "expected the plan data to build");
  return result.data;
}

function validPlan(overrides: Partial<SavedPlan> = {}): SavedPlan {
  return {
    id: "plan-a",
    name: "My plan",
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
    data: built(),
    ...overrides,
  };
}

function problems(state: LabState, tools: ToolInputs): string[] {
  const result = buildPlanData(state, tools);
  assert.equal(result.ok, false, "expected the build to be blocked");
  return result.ok ? [] : result.problems;
}

describe("numberToInput", () => {
  it("keeps ordinary numbers readable", () => {
    assert.equal(numberToInput(10000), "10000");
    assert.equal(numberToInput(33.33), "33.33");
    assert.equal(numberToInput(0), "0");
    assert.equal(numberToInput(-3.5), "-3.5");
  });

  it("never produces an exponent", () => {
    assert.doesNotMatch(numberToInput(1e-7), /e/i);
    assert.equal(Number(numberToInput(1e-7)), 1e-7);
    assert.doesNotMatch(numberToInput(5e-9), /e/i);
  });

  it("falls back to 0 for NaN and Infinity", () => {
    assert.equal(numberToInput(Number.NaN), "0");
    assert.equal(numberToInput(Number.POSITIVE_INFINITY), "0");
  });
});

describe("buildPlanData: what is stored", () => {
  it("stores numbers as numbers, not formatted text", () => {
    const data = built();

    assert.equal(data.investment, 12500);
    assert.equal(typeof data.investment, "number");
    assert.equal(data.dca.monthly, 750.5);
    assert.deepEqual(data.calculator.rates, [2, -1.5, 8]);
    assert.equal(data.target["equity-etf"], 60);
    assert.ok(data.holdings.every((h) => typeof h.percent === "number"));

    const json = JSON.stringify(data);
    assert.doesNotMatch(json, /12,500|\$|%/);
  });

  it("stores only inputs, never values that can be recalculated", () => {
    const data = built();

    assert.deepEqual(Object.keys(data), [
      "currency",
      "investment",
      "holdings",
      "dca",
      "calculator",
      "target",
    ]);
    assert.deepEqual(Object.keys(data.holdings[0]), ["id", "name", "category", "percent"]);
    assert.doesNotMatch(JSON.stringify(data), /amount|totalPercent|futureValue|status|loadedTemplate/i);
  });

  it("keeps holding ids, names, and categories", () => {
    const state = sampleState();
    const data = built(state);

    assert.deepEqual(
      data.holdings.map((h) => [h.id, h.name, h.category]),
      state.holdings.map((h) => [h.id, h.name, h.category]),
    );
  });

  it("an empty portfolio can be saved", () => {
    const data = built({ ...initialState }, defaultToolInputs());
    assert.deepEqual(data.holdings, []);
  });

  it("an incomplete rebalancing target is fine to save", () => {
    const tools = defaultToolInputs();
    tools.target.gold = "10"; // totals 10%, not 100%
    assert.equal(built(sampleState(), tools).target.gold, 10);
  });

  it("a blank allocation counts as 0, like the builder already does", () => {
    const state = sampleState();
    state.holdings[0] = { ...state.holdings[0], percentInput: "" };
    assert.equal(built(state).holdings[0].percent, 0);
  });
});

describe("buildPlanData: blocks invalid input", () => {
  it("an invalid investment amount", () => {
    const list = problems({ ...sampleState(), investmentInput: "abc" }, sampleTools());
    assert.ok(list.some((p) => p.startsWith("Builder:")));
  });

  it("an invalid holding percentage", () => {
    const state = sampleState();
    state.holdings[0] = { ...state.holdings[0], percentInput: "12x" };
    assert.ok(problems(state, sampleTools()).some((p) => p.startsWith("Builder:")));
  });

  it("an invalid DCA field", () => {
    const tools = sampleTools();
    tools.dca.years = "";
    assert.ok(problems(sampleState(), tools).some((p) => p.startsWith("DCA Planner:")));
  });

  it("an invalid calculator rate", () => {
    const tools = sampleTools();
    tools.calculator.rates = ["3", "oops", "9"];
    assert.ok(problems(sampleState(), tools).some((p) => p.startsWith("Investment Calculator:")));
  });

  it("an invalid target field", () => {
    const tools = sampleTools();
    tools.target.gold = "abc";
    assert.ok(problems(sampleState(), tools).some((p) => p.startsWith("Rebalancing:")));
  });

  it("lists every section that has a problem, not just the first", () => {
    const tools = sampleTools();
    tools.dca.years = "";
    tools.target.gold = "abc";
    const list = problems({ ...sampleState(), investmentInput: "-5" }, tools);

    assert.ok(list.length >= 3);
  });

  it("hidden monthly field in lump-sum mode does not block, and is saved as 0", () => {
    const tools = sampleTools();
    tools.calculator.mode = "lump";
    tools.calculator.fields.monthly = "junk";

    assert.equal(built(sampleState(), tools).calculator.monthly, 0);
  });

  it("the same bad monthly field does block in monthly mode", () => {
    const tools = sampleTools();
    tools.calculator.mode = "monthly";
    tools.calculator.fields.monthly = "junk";

    assert.ok(problems(sampleState(), tools).some((p) => p.includes("Investment Calculator")));
  });
});

describe("save then load keeps everything", () => {
  it("round trip: screen -> plan -> screen -> plan is identical", () => {
    const first = built();
    const back = planDataToState(first);
    const second = built(back.state, back.tools);

    assert.deepEqual(second, first);
    assert.equal(plansDataEqual(first, second), true);
  });

  it("restores raw text the form fields can read", () => {
    const { state, tools } = planDataToState(built());

    assert.equal(state.investmentInput, "12500");
    assert.equal(state.currency, "THB");
    assert.equal(tools.dca.monthly, "750.5");
    assert.equal(tools.calculator.mode, "monthly");
    assert.deepEqual(tools.calculator.rates, ["2", "-1.5", "8"]);
    assert.equal(tools.target["equity-etf"], "60");
    assert.equal(tools.target.gold, "0");
    assert.equal(state.loadedTemplateId, null);
  });

  it("all six templates survive a round trip", () => {
    for (const template of TEMPLATES) {
      const state = { ...initialState, holdings: draftsFromTemplate(template) };
      const first = built(state, defaultToolInputs());
      const back = planDataToState(first);
      assert.deepEqual(built(back.state, back.tools), first, template.id);
    }
  });

  it("awkward decimals survive", () => {
    const state = sampleState();
    state.holdings = [
      { id: "x1", name: "A", category: "gold", percentInput: "33.333333" },
      { id: "x2", name: "B", category: "cash", percentInput: "0.0000001" },
    ];
    const first = built(state);
    const back = planDataToState(first);

    assert.deepEqual(built(back.state, back.tools).holdings, first.holdings);
  });

  it("the reducer accepts a loaded plan and replaces the whole state", () => {
    const { state } = planDataToState(built());
    const next = labReducer(initialState, { type: "replaceAll", state });

    assert.deepEqual(next, state);
    assert.equal(initialState.holdings.length, 0, "initial state is untouched");
  });

  it("detects an unsaved change", () => {
    const state = sampleState();
    const tools = sampleTools();
    const saved = built(state, tools);
    const edited = built({ ...state, investmentInput: "13000" }, tools);
    const toolEdit = sampleTools();
    toolEdit.target.gold = "5";

    assert.equal(plansDataEqual(saved, built(state, tools)), true);
    assert.equal(plansDataEqual(saved, edited), false);
    assert.equal(plansDataEqual(saved, built(state, toolEdit)), false);
  });
});

describe("validatePlan: accepts good data", () => {
  it("a plan built by this code is always valid", () => {
    assert.equal(validatePlan(validPlan()).ok, true);
  });

  it("survives a JSON round trip unchanged", () => {
    const plan = validPlan();
    const result = validatePlan(JSON.parse(JSON.stringify(plan)));

    assert.ok(result.ok);
    assert.deepEqual(result.ok && result.plan, plan);
  });

  it("drops fields it does not know and trims the name", () => {
    const raw = { ...validPlan(), name: "  Spaced   out  ", sneaky: "x" };
    const result = validatePlan(raw);

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plan.name, "Spaced out");
      assert.equal("sneaky" in result.plan, false);
    }
  });
});

describe("validatePlan: rejects bad data without throwing", () => {
  const good = () => JSON.parse(JSON.stringify(validPlan()));

  function rejects(mutate: (plan: ReturnType<typeof good>) => void, label: string) {
    const plan = good();
    mutate(plan);
    const result = validatePlan(plan);
    assert.equal(result.ok, false, label);
    assert.ok(!result.ok && result.error.length > 0, `${label}: needs a message`);
  }

  it("not an object", () => {
    for (const value of [null, undefined, 5, "text", [], true]) {
      assert.equal(validatePlan(value).ok, false);
    }
  });

  it("missing fields", () => {
    for (const key of ["id", "name", "createdAt", "updatedAt", "data"]) {
      rejects((p) => delete p[key], `missing ${key}`);
    }
    for (const key of ["currency", "investment", "holdings", "dca", "calculator", "target"]) {
      rejects((p) => delete p.data[key], `missing data.${key}`);
    }
  });

  it("wrong types", () => {
    rejects((p) => (p.id = 7), "numeric id");
    rejects((p) => (p.name = 7), "numeric name");
    rejects((p) => (p.data.investment = "12500"), "investment as text");
    rejects((p) => (p.data.holdings = "none"), "holdings as text");
    rejects((p) => (p.data.holdings[0].percent = "50"), "percent as text");
    rejects((p) => (p.data.dca = []), "dca as array");
    rejects((p) => (p.data.calculator.rates = "3,6,9"), "rates as text");
  });

  it("invalid numbers", () => {
    rejects((p) => (p.data.investment = -1), "negative investment");
    rejects((p) => (p.data.investment = 1e15), "investment too large");
    rejects((p) => (p.data.holdings[0].percent = 101), "percent over 100");
    rejects((p) => (p.data.holdings[0].percent = -1), "negative percent");
    rejects((p) => (p.data.dca.years = 0), "zero years");
    rejects((p) => (p.data.dca.years = 61), "too many years");
    rejects((p) => (p.data.dca.annualReturn = 51), "return too high");
    rejects((p) => (p.data.calculator.rates[1] = -51), "rate too low");
    rejects((p) => (p.data.target.gold = 101), "target over 100");
  });

  it("non-finite numbers that JSON can produce", () => {
    const text = JSON.stringify(validPlan()).replace('"investment":12500', '"investment":1e999');
    assert.equal(validatePlan(JSON.parse(text)).ok, false);
  });

  it("unknown or malformed values", () => {
    rejects((p) => (p.data.currency = "EUR"), "unknown currency");
    rejects((p) => (p.data.holdings[0].category = "memes"), "unknown category");
    rejects((p) => (p.data.calculator.mode = "weekly"), "unknown mode");
    rejects((p) => (p.data.calculator.rates = [1, 2]), "two rates");
    rejects((p) => (p.createdAt = "not a date"), "bad date");
    rejects((p) => (p.updatedAt = 12345), "numeric date");
    rejects((p) => (p.name = "   "), "blank name");
    rejects((p) => (p.name = "x".repeat(MAX_PLAN_NAME_LENGTH + 1)), "long name");
    rejects((p) => (p.id = ""), "empty id");
  });

  it("duplicate holding ids", () => {
    rejects((p) => (p.data.holdings[1].id = p.data.holdings[0].id), "duplicate holding id");
  });

  it("a target that is missing a category", () => {
    rejects((p) => delete p.data.target["real-estate"], "missing category");
    assert.equal(CATEGORIES.length, 10);
  });

  it("too many holdings", () => {
    rejects((p) => {
      p.data.holdings = Array.from({ length: 101 }, (_, i) => ({
        id: `h${i}`,
        name: "x",
        category: "gold",
        percent: 0,
      }));
    }, "101 holdings");
  });

  it("a hostile __proto__ key does not pollute anything", () => {
    const text = JSON.stringify(validPlan()).replace(
      '"name":"My plan"',
      '"name":"My plan","__proto__":{"polluted":true}',
    );
    const result = validatePlan(JSON.parse(text));

    assert.ok(result.ok);
    assert.equal(({} as Record<string, unknown>).polluted, undefined);
  });
});

describe("validatePlanName", () => {
  it("trims and collapses spaces", () => {
    const result = validatePlanName("  Retirement   idea ");
    assert.ok(result.ok && result.name === "Retirement idea");
  });

  it("rejects blank and too-long names", () => {
    assert.equal(validatePlanName("").ok, false);
    assert.equal(validatePlanName("   ").ok, false);
    assert.equal(validatePlanName("x".repeat(MAX_PLAN_NAME_LENGTH + 1)).ok, false);
    assert.equal(validatePlanName("x".repeat(MAX_PLAN_NAME_LENGTH)).ok, true);
  });
});

describe("save, rename, duplicate, delete", () => {
  it("save adds a plan with matching created and updated dates", () => {
    const result = createPlan([], { name: " First ", data: built(), now: NOW });

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plans.length, 1);
      assert.equal(result.plan.name, "First");
      assert.equal(result.plan.createdAt, NOW.toISOString());
      assert.equal(result.plan.updatedAt, NOW.toISOString());
    }
  });

  it("save refuses a blank name and does not change the list", () => {
    const existing = [validPlan()];
    const result = createPlan(existing, { name: "  ", data: built(), now: NOW });

    assert.equal(result.ok, false);
    assert.equal(existing.length, 1);
  });

  it("save refuses beyond the plan limit", () => {
    const full = Array.from({ length: MAX_PLANS }, (_, i) => validPlan({ id: `p${i}` }));
    assert.equal(createPlan(full, { name: "One more", data: built(), now: NOW }).ok, false);
    assert.equal(duplicatePlan(full, "p0", NOW).ok, false);
  });

  it("update replaces data and updatedAt, keeps name and createdAt", () => {
    const original = validPlan();
    const newData = built({ ...sampleState(), investmentInput: "99" });
    const result = updatePlanData([original], original.id, newData, LATER);

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plan.data.investment, 99);
      assert.equal(result.plan.name, original.name);
      assert.equal(result.plan.createdAt, original.createdAt);
      assert.equal(result.plan.updatedAt, LATER.toISOString());
    }
    assert.equal(original.data.investment, 12500, "the old list is untouched");
  });

  it("rename changes the name and updatedAt only", () => {
    const original = validPlan();
    const result = renamePlan([original], original.id, " New name ", LATER);

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plan.name, "New name");
      assert.equal(result.plan.updatedAt, LATER.toISOString());
      assert.deepEqual(result.plan.data, original.data);
    }
  });

  it("rename rejects a blank name", () => {
    const original = validPlan();
    assert.equal(renamePlan([original], original.id, "  ", LATER).ok, false);
  });

  it("duplicate makes an independent copy with a new id and fresh dates", () => {
    const original = validPlan({ createdAt: "2026-01-01T00:00:00.000Z" });
    const result = duplicatePlan([original], original.id, LATER);

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plans.length, 2);
      assert.notEqual(result.plan.id, original.id);
      assert.equal(result.plan.name, "My plan (copy)");
      assert.equal(result.plan.createdAt, LATER.toISOString());
      assert.deepEqual(result.plan.data, original.data);

      result.plan.data.holdings[0].name = "changed";
      assert.notEqual(original.data.holdings[0].name, "changed");
    }
  });

  it("duplicate keeps the name within the length limit", () => {
    const long = validPlan({ name: "x".repeat(MAX_PLAN_NAME_LENGTH) });
    const result = duplicatePlan([long], long.id, LATER);

    assert.ok(result.ok);
    if (result.ok) assert.ok(result.plan.name.length <= MAX_PLAN_NAME_LENGTH);
  });

  it("delete removes only that plan", () => {
    const a = validPlan({ id: "a" });
    const b = validPlan({ id: "b" });
    const result = deletePlan([a, b], "a");

    assert.ok(result.ok);
    if (result.ok) assert.deepEqual(result.plans.map((p) => p.id), ["b"]);
  });

  it("every operation reports a missing plan instead of crashing", () => {
    const plans = [validPlan()];

    assert.equal(updatePlanData(plans, "nope", built(), NOW).ok, false);
    assert.equal(renamePlan(plans, "nope", "x", NOW).ok, false);
    assert.equal(duplicatePlan(plans, "nope", NOW).ok, false);
    assert.equal(deletePlan(plans, "nope").ok, false);
  });
});

describe("ids and import", () => {
  it("makePlanId never repeats an id that is in use", () => {
    const taken = [validPlan({ id: "plan-1-0000" })];
    const id = makePlanId(taken, () => 0, () => 1);

    assert.notEqual(id, "plan-1-0000");
    assert.ok(id.startsWith("plan-"));
  });

  it("imported plans get new ids and nothing saved is replaced", () => {
    const existing = [validPlan({ id: "same", name: "Mine" })];
    const incoming = [validPlan({ id: "same", name: "Theirs" })];
    const result = addImportedPlans(existing, incoming);

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plans.length, 2);
      assert.equal(result.plans[0].name, "Mine");
      assert.notEqual(result.plans[1].id, "same");
      assert.equal(new Set(result.plans.map((p) => p.id)).size, 2);
    }
  });

  it("import refuses to go over the limit, and an empty import", () => {
    const full = Array.from({ length: MAX_PLANS }, (_, i) => validPlan({ id: `p${i}` }));

    assert.equal(addImportedPlans(full, [validPlan({ id: "z" })]).ok, false);
    assert.equal(addImportedPlans([], []).ok, false);
  });
});
