import "./ui-setup";
import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanup, fireEvent, render, within } from "@testing-library/react";
import PortfolioLab from "@/components/portfolio-lab/PortfolioLab";

afterEach(() => cleanup());

function setup() {
  const view = render(<PortfolioLab />);
  const root = view.container;
  const byId = (id: string) => root.querySelector<HTMLInputElement>(`#${id}`)!;
  const text = () => root.textContent ?? "";
  const click = (label: string | RegExp) => {
    const matches = within(root).getAllByRole("button", { name: label });
    fireEvent.click(matches[0]);
  };
  const clickAll = (label: string | RegExp) => within(root).getAllByRole("button", { name: label });
  const rows = () => Array.from(root.querySelectorAll(".pl-holding"));
  const type = (el: HTMLInputElement, value: string) => fireEvent.change(el, { target: { value } });
  /** Adds a holding and fills it in through the real form controls. */
  const addHolding = (name: string, category: string, percent: string) => {
    click("Add a holding");
    const row = rows()[rows().length - 1] as HTMLElement;
    type(row.querySelector<HTMLInputElement>('input[id^="name-"]')!, name);
    fireEvent.change(row.querySelector<HTMLSelectElement>("select")!, { target: { value: category } });
    type(row.querySelector<HTMLInputElement>('input[id^="percent-"]')!, percent);
  };
  return { view, root, byId, text, click, clickAll, rows, type, addHolding };
}

const BAD = /NaN|Infinity|undefined/;

describe("Portfolio Builder (real clicks and typing)", () => {
  it("first visit: empty state, defaults, no errors", () => {
    const { text, byId } = setup();
    assert.match(text(), /Your portfolio is empty/);
    assert.equal(byId("pl-investment").value, "10000");
    assert.doesNotMatch(text(), BAD);
  });

  it("scenario B: build 60/30/10 and see correct numbers", () => {
    const { text, addHolding, rows } = setup();
    addHolding("Equity ETF", "equity-etf", "60");
    addHolding("Bond ETF", "bond-etf", "30");
    addHolding("Cash", "cash", "10");
    assert.equal(rows().length, 3);
    for (const t of ["Fully allocated", "$6,000", "$3,000", "$1,000", "100%"]) assert.ok(text().includes(t), t);
    assert.doesNotMatch(text(), BAD);
  });

  it("scenario C: Cash 10 -> 5 gives 95% and $500 unallocated, others untouched", () => {
    const { text, addHolding, rows, type } = setup();
    addHolding("Equity ETF", "equity-etf", "60");
    addHolding("Bond ETF", "bond-etf", "30");
    addHolding("Cash", "cash", "10");
    type(rows()[2].querySelector<HTMLInputElement>('input[id^="percent-"]')!, "5");
    assert.ok(text().includes("Not fully allocated") && text().includes("$500") && text().includes("95%"));
    assert.equal(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "60");
    assert.equal(rows()[1].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "30");
  });

  it("scenario D: 110% shows a warning, never negative money", () => {
    const { text, addHolding, rows, type } = setup();
    addHolding("A", "equity-etf", "60");
    addHolding("B", "bond-etf", "30");
    addHolding("C", "cash", "10");
    type(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!, "70");
    assert.ok(text().includes("Over-allocated") && text().includes("110%") && text().includes("over 100%"));
    assert.ok(!text().includes("Fully allocated"));
    assert.doesNotMatch(text(), /-\$|\u2212\$/);
  });

  it("scenario F: changing the investment keeps percentages", () => {
    const { text, addHolding, byId, type } = setup();
    addHolding("A", "equity-etf", "60");
    addHolding("B", "cash", "40");
    type(byId("pl-investment"), "20000");
    assert.ok(text().includes("$12,000") && text().includes("$8,000"));
  });

  it("scenario G/H: remove holdings one by one down to the empty state", () => {
    const { text, addHolding, rows, click } = setup();
    addHolding("A", "equity-etf", "50");
    addHolding("B", "bond-etf", "30");
    addHolding("C", "cash", "20");
    click("Remove B");
    assert.equal(rows().length, 2);
    assert.ok(text().includes("80%"));
    click("Remove A");
    click("Remove C");
    assert.equal(rows().length, 0);
    assert.match(text(), /Your portfolio is empty/);
    assert.doesNotMatch(text(), BAD);
  });

  it("invalid typing shows messages and keeps the page stable", () => {
    const { text, byId, addHolding, rows, type } = setup();
    type(byId("pl-investment"), "abc");
    assert.match(text(), /Investment amount must be a number/);
    addHolding("A", "equity-etf", "oops");
    assert.match(text(), /Allocation must be a number/);
    assert.equal(rows()[0].querySelector('input[id^="percent-"]')!.getAttribute("aria-invalid"), "true");
    type(byId("pl-investment"), "10,000");
    assert.doesNotMatch(text(), /Investment amount must be/);
    assert.doesNotMatch(text(), BAD);
  });

  it("scenario E: template loads without confirmation on an empty portfolio and keeps amount + currency", () => {
    const { text, click, byId, type, root, rows } = setup();
    type(byId("pl-investment"), "25000");
    fireEvent.click(within(root).getByLabelText(/Thai Baht/));
    click("Use the Growth + Bitcoin template");
    assert.equal(rows().length, 3);
    assert.equal(byId("pl-investment").value, "25000");
    assert.ok(text().includes("฿17,500") && text().includes("฿5,000") && text().includes("฿2,500"));
    assert.ok(text().includes("Started from the Growth + Bitcoin example"));
    assert.equal(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "70");
    assert.equal(rows()[2].querySelector<HTMLInputElement>('input[id^="name-"]')!.value, "Bitcoin");
  });

  it("loading a template over edited holdings asks first; Cancel keeps them, Replace swaps them", () => {
    const { text, click, rows, type, root } = setup();
    click("Use the Balanced template");
    type(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!, "55");
    assert.ok(text().includes("(edited)"));

    click("Use the Conservative template");
    assert.match(text(), /Replace your current holdings with this example/);
    assert.equal(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "55", "nothing replaced yet");

    click("Cancel");
    assert.doesNotMatch(text(), /Replace your current holdings with this example/);
    assert.equal(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "55");

    click("Use the Conservative template");
    click("Replace holdings");
    assert.equal(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "20");
    assert.ok(!text().includes("(edited)"));
    void root;
  });

  it("an unedited loaded template can be swapped without a prompt", () => {
    const { text, click, rows } = setup();
    click("Use the Balanced template");
    click("Use the Long-term Growth template");
    assert.doesNotMatch(text(), /Replace your current holdings with this example/);
    assert.equal(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!.value, "80");
  });

  it("switching currency changes only the display", () => {
    const { text, click, byId, root } = setup();
    click("Use the Balanced template");
    assert.ok(text().includes("$5,000"));
    fireEvent.click(within(root).getByLabelText(/Lao Kip/));
    assert.ok(text().includes("₭5,000"));
    assert.equal(byId("pl-investment").value, "10000");
  });

  it("reset asks first, then restores the defaults", () => {
    const { text, click, byId, type, rows } = setup();
    click("Use the Balanced template");
    type(byId("pl-investment"), "999");
    click("Reset portfolio");
    assert.match(text(), /Reset everything/);
    click("Cancel");
    assert.equal(rows().length, 3);
    click("Reset portfolio");
    click("Yes, reset");
    assert.equal(rows().length, 0);
    assert.equal(byId("pl-investment").value, "10000");
  });

  it("table Remove button and Edit button work", () => {
    const { text, click, rows, root } = setup();
    click("Use the Balanced template");
    const table = root.querySelector("table.pl-table") as HTMLElement;
    fireEvent.click(within(table).getByRole("button", { name: "Remove Cash" }));
    assert.equal(rows().length, 2);
    assert.ok(text().includes("90%"));
    fireEvent.click(within(table).getByRole("button", { name: "Edit Equity ETF" }));
  });
});

describe("DCA Planner (real typing)", () => {
  it("shows results with the default plan and distinguishes principal from growth", () => {
    const { text } = setup();
    assert.match(text(), /Hypothetical future value/);
    assert.match(text(), /Additional contributions/);
    assert.match(text(), /Total contributed principal/);
    assert.ok(text().includes("$10,000") && text().includes("$70,000"), "10,000 + 120 x 500 = 70,000 principal");
    assert.match(text(), /Hypothetical growth/);
  });

  it("a negative return is labelled a loss with a minus sign", () => {
    const { text, byId, type } = setup();
    type(byId("dca-return"), "-5");
    assert.match(text(), /Hypothetical loss/);
    assert.ok(text().includes("\u2212$"));
  });

  it("blank return means 0% and says so; zero return shows no growth or loss", () => {
    const { text, byId, type } = setup();
    type(byId("dca-return"), "");
    assert.match(text(), /Blank, so 0% is used/);
    assert.match(text(), /No growth or loss/);
  });

  it("invalid fields replace the results with a clear message (no stale numbers)", () => {
    const { text, byId, type } = setup();
    type(byId("dca-years"), "abc");
    assert.match(text(), /Check the highlighted fields/);
    assert.match(text(), /Duration must be a number/);
    assert.equal(byId("dca-years").getAttribute("aria-invalid"), "true");
    type(byId("dca-years"), "10");
    assert.doesNotMatch(text(), /Check the highlighted fields/);
  });

  it("too-large values are refused, not shown", () => {
    const { text, byId, type } = setup();
    type(byId("dca-initial"), "1000000000000");
    type(byId("dca-monthly"), "1000000000");
    type(byId("dca-years"), "60");
    type(byId("dca-return"), "50");
    assert.match(text(), /can.t be calculated|too large/i);
    assert.doesNotMatch(text(), BAD);
  });

  it("zero initial and zero monthly: safe, with an empty-chart message", () => {
    const { text, byId, type } = setup();
    type(byId("dca-initial"), "0");
    type(byId("dca-monthly"), "0");
    assert.match(text(), /Add an initial investment or a contribution/);
    assert.doesNotMatch(text(), BAD);
  });

  it("the contribution split follows the builder portfolio, and refuses to rescale", () => {
    const { text, click, rows, type } = setup();
    assert.match(text(), /Build a portfolio above/);
    click("Use the Balanced template");
    assert.match(text(), /Over the whole plan/);
    assert.ok(text().includes("$250") && text().includes("$200") && text().includes("$50"), "500 x 50/40/10");
    type(rows()[0].querySelector<HTMLInputElement>('input[id^="percent-"]')!, "40");
    assert.match(text(), /not fully allocated/);
    assert.doesNotMatch(text(), /Over the whole plan/);
  });

  it("'Use my builder amount' copies the builder investment", () => {
    const { byId, type, click } = setup();
    type(byId("pl-investment"), "42000");
    click(/Use my builder amount/);
    assert.equal(byId("dca-initial").value, "42000");
  });

  it("uses the display currency", () => {
    const { text, root } = setup();
    fireEvent.click(within(root).getByLabelText(/Thai Baht/));
    assert.ok(text().includes("฿"));
  });
});

describe("Investment Calculator (real typing)", () => {
  it("lump sum by default: three scenarios side by side", () => {
    const { text } = setup();
    assert.match(text(), /Assumed 3% a year/);
    assert.match(text(), /Assumed 6% a year/);
    assert.match(text(), /Assumed 9% a year/);
    assert.ok(text().includes("A single amount, left for 15 years"));
    assert.ok(text().includes("$23,966") || text().includes("$23,965"), "10,000 at 6% for 15 years");
  });

  it("monthly mode adds the contribution field and changes the principal", () => {
    const { text, root, byId } = setup();
    assert.equal(byId("calc-monthly"), null);
    fireEvent.click(within(root).getByLabelText(/Monthly contributions/));
    assert.ok(byId("calc-monthly"));
    assert.ok(text().includes("$64,000"), "10,000 + 180 x 300 = 64,000");
  });

  it("rates are editable, negative allowed, invalid rejected", () => {
    const { text, byId, type } = setup();
    type(byId("calc-rate-0"), "-5");
    assert.match(text(), /Assumed -5% a year|Assumed \u22125% a year|Assumed -5%/);
    assert.match(text(), /Hypothetical loss/);
    type(byId("calc-rate-1"), "1e2");
    assert.match(text(), /must be a number/);
    assert.match(text(), /Check the highlighted fields/);
    type(byId("calc-rate-1"), "");
    assert.match(text(), /Enter a rate/);
    type(byId("calc-rate-1"), "60");
    assert.match(text(), /between -50% and 50%/);
  });

  it("the comparison table has one column per scenario", () => {
    const { root } = setup();
    const table = root.querySelector('[aria-label="Year-by-year comparison table"] table') as HTMLElement;
    assert.ok(table);
    const heads = Array.from(table.querySelectorAll("thead th")).map((th) => th.textContent);
    assert.deepEqual(heads, ["When", "Contributed principal", "At 3%", "At 6%", "At 9%"]);
    assert.equal(table.querySelectorAll("tbody tr").length, 16, "Start + 15 years");
  });

  it("accessibility: radio group, fieldsets, labelled controls, scroll regions", () => {
    const { root } = setup();
    assert.ok(within(root).getByRole("group", { name: "Calculator mode" }));
    for (const input of Array.from(root.querySelectorAll<HTMLInputElement>('input[type="text"]'))) {
      assert.ok(input.id, "every text input has an id");
      assert.ok(root.querySelector(`label[for="${input.id}"]`), `label for ${input.id}`);
    }
    for (const region of Array.from(root.querySelectorAll('[role="region"]'))) {
      assert.equal(region.getAttribute("tabindex"), "0");
      assert.ok(region.getAttribute("aria-label"));
    }
    assert.ok(root.querySelectorAll('svg[role="img"]').length >= 2);
  });
});

describe("Risk & Diversification (real interaction)", () => {
  const riskText = (root: HTMLElement) => root.querySelector("#risk-diversification")!.textContent ?? "";

  it("empty portfolio: explains there is nothing to analyze, still says what cannot be measured", () => {
    const { root } = setup();
    const t = riskText(root);
    assert.match(t, /There is nothing to analyze yet/);
    for (const x of ["Geographic exposure", "Currency exposure", "ETF overlap", "Your personal risk tolerance", "What Portfolio Lab can work out"]) {
      assert.ok(t.includes(x), x);
    }
    assert.doesNotMatch(t, BAD);
  });

  it("Growth + Bitcoin: concentration numbers, crypto note, categories, absent list", () => {
    const { root, click } = setup();
    click("Use the Growth + Bitcoin template");
    const t = riskText(root);
    assert.match(t, /Fully allocated/);
    assert.ok(t.includes("Largest holding") && t.includes("70%") && t.includes("Equity ETF"));
    assert.ok(t.includes("Three largest") && t.includes("100%"));
    assert.ok(t.includes("Effective holdings") && t.includes("1.9"), "70/20/10 -> 1.85 -> 1.9");
    assert.match(t, /Cryptocurrency is included/);
    assert.match(t, /Bitcoin 10%/);
    assert.match(t, /What your categories can mean/);
    assert.match(t, /Digital currency|A digital currency/);
    assert.match(t, /No allocation in:.*Gold/);
    assert.match(t, /not a suggestion to add them/);
    assert.ok(root.querySelector('#risk-diversification [role="img"][aria-label*="Equity ETFs 70%"]'), "stacked bar has a text equivalent");
    assert.ok(root.querySelector('ol[aria-label="Holdings ranked by size"]'));
    assert.doesNotMatch(t, BAD);
  });

  it("follows edits: 95% shows unallocated, 110% shows the over-allocation message", () => {
    const { root, click, rows, type } = setup();
    click("Use the Balanced template");
    type(rows()[2].querySelector<HTMLInputElement>('input[id^="percent-"]')!, "5");
    let t = riskText(root);
    assert.match(t, /Not fully allocated/);
    assert.match(t, /describe only the allocated part/);
    assert.ok(t.includes("Unallocated") && t.includes("$500"));

    type(rows()[2].querySelector<HTMLInputElement>('input[id^="percent-"]')!, "30");
    t = riskText(root);
    assert.match(t, /Allocated above 100%/);
    assert.ok(t.includes("120%"));
    assert.doesNotMatch(t, /Fully allocated/);
    assert.doesNotMatch(t, BAD);
  });

  it("duplicate names, several funds, and zero-allocation holdings are called out honestly", () => {
    const { root, addHolding } = setup();
    addHolding("S&P 500 ETF", "equity-etf", "40");
    addHolding("s&p 500 etf", "equity-etf", "40");
    addHolding("Gold", "gold", "20");
    addHolding("Spare", "cash", "0");
    const t = riskText(root);
    assert.match(t, /Some holdings share a name/);
    assert.match(t, /Several funds of the same kind may overlap/);
    assert.match(t, /cannot measure the overlap/);
    assert.match(t, /About your entries/);
    assert.match(t, /allocation of 0%/);
    assert.ok(!/overlap of \d|\d+% overlap/i.test(t), "never invents an overlap number");
  });

  it("never shows a risk score, forecast, or recommendation", () => {
    const { root, click } = setup();
    for (const name of ["Conservative", "Balanced", "Long-term Growth", "Dividend & Income", "Global Diversification", "Growth + Bitcoin"]) {
      click(`Use the ${name} template`);
      const t = riskText(root);
      // the lead sentence says "It is not a risk score", which is a denial, so allow that exact phrase
      assert.doesNotMatch(t, /(?<!not a )risk score|\d\s*\/\s*10\b|will (rise|fall|grow)|guarantee|you should|we recommend|well[- ]diversified/i, name);
      assert.doesNotMatch(t, BAD, name);
    }
  });

  it("removing every holding returns to the empty explanation", () => {
    const { root, click, rows } = setup();
    click("Use the Balanced template");
    for (let i = rows().length; i > 0; i -= 1) click(/^Remove /);
    assert.match(riskText(root), /There is nothing to analyze yet/);
  });
});
