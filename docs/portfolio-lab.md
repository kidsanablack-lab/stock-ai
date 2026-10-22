# Scope Portfolio Lab

An educational portfolio-planning tool at `/portfolio-lab`. A visitor builds a
**hypothetical** portfolio, explores it, and (optionally) saves it in their own
browser. It runs entirely in the browser: no backend, no accounts, no prices,
no exchange rates, no fund holdings, and no live data of any kind.

It is **not investment advice**. Every number comes from values the visitor
typed. Nothing here predicts what any asset will do.

## What is on the page

| # | Section | What it does |
|---|---|---|
| 1 | Hero | Introduction and a decorative ring |
| 2 | Getting started | Three steps with links to the sections below |
| 3 | Example portfolios | Six teaching templates that fill the builder |
| 4 | Portfolio Builder | Holdings, categories, percentages, investment amount, currency |
| 5 | Portfolio Overview | Donut chart, cards, and tables from the same summary |
| 6 | Risk and diversification | Plain-language concentration notes (no risk score) |
| 7 | DCA Planner | Regular monthly investing, with an assumed yearly return |
| 8 | Investment Calculator | Lump sum or monthly, compared at three assumed returns |
| 9 | What-if Simulator | Assumed price change per category applied to the portfolio |
| 10 | Rebalancing Tool | Current mix compared with a target mix |
| 11 | My Portfolio Plans | Save, load, rename, duplicate, delete, export, import |
| 12 | Learn and Explore | 15 plain-language guides and two example paths |
| - | Disclaimer | Educational, hypothetical, not advice |

## File map

```
app/portfolio-lab/
  page.tsx                  Page: Hero, GettingStarted, PortfolioLab, LearnSection, Disclaimer
  portfolio-lab.css         Base styles (class prefix pl-)

components/portfolio-lab/   One file per section (see the table above), plus
                            small pieces: NumberField, DonutChart, ProjectionChart,
                            AssumptionsList. Each feature has its own CSS file
                            (portfolio-lab-<feature>.css) with its own prefix:
                            pl-wi- what-if, pl-rb- rebalancing, pl-pn- plans,
                            pl-ln- learn.
  PortfolioLab.tsx          The one stateful root. Owns the portfolio and the tool inputs.

lib/portfolio-lab/          All calculations and rules. No React in here.
  types.ts, categories.ts   Shared types; the ten asset categories
  calculations.ts           Parsing, allocation, summary, chart segments, observations
  state.ts                  Builder state and reducer
  toolInputs.ts             Typed values of the DCA, calculator, and rebalancing tools
  projection.ts             DCA and calculator maths
  risk.ts                   Concentration analysis
  scenario.ts               What-if maths and example scenarios
  rebalance.ts              Rebalancing maths and target validation
  plans.ts                  Saved-plan data, validation, and list operations
  plansStorage.ts           localStorage reading and writing (the only file that touches it)
  learn.ts                  Text of the guides and example paths
  templates.ts, categoryNotes.ts   Teaching content
  currency.ts               Display formatting only
  *.test.ts                 Tests
```

## How the data flows

1. `PortfolioLab.tsx` holds two pieces of state:
   - `state` (reducer in `state.ts`): investment text, currency, holdings.
   - `tools` (`toolInputs.ts`): the typed values of the DCA planner, the
     calculator, and the rebalancing target. They live here, and not inside
     each tool, so Saved Plans can save and restore them.
2. Percentages and amounts stay as **raw text** while typing. Numbers are
   always derived from that text by the parsers in `calculations.ts` and
   `projection.ts`.
3. `calculatePortfolio()` runs once and produces a `summary`. Every section
   reads the same `summary`: table, cards, chart, risk, what-if, rebalancing,
   DCA split. Components only do display work (bar widths, chart geometry).
4. The What-if and Rebalancing tools keep only their own view settings. They
   **never change** the portfolio.

## Formulas and assumptions

**Allocation.** `amount = investment x percent / 100`. The total is
`complete` when it is within 0.000001 of 100, `incomplete` below that,
`over` above it, and `empty` with no holdings. Percentages are never
rescaled to make them fit. Unallocated money is shown as unallocated.

**DCA and calculator.** The yearly return is treated as an effective yearly
rate: `monthlyRate = (1 + annual/100)^(1/12) - 1`. Each month:
`balance = balance x (1 + monthlyRate) + monthly`, so each contribution is
added at the **end** of the month. Duration is rounded to whole months. A
return of -100% or lower is rejected. The tests cross-check the monthly
schedule against the closed-form formula. Results are illustrations from the
rates typed, not forecasts. Fees, taxes, and inflation are not modelled.

**Risk notes.** Based only on names, categories, and percentages. "Effective
number of holdings" is `1 / HHI` (the sum of squared weights). It describes how
evenly money is spread, nothing more. Thresholds are constants at the top of
`calculations.ts` and `risk.ts`.

**What-if.** `new amount = amount x (1 + change/100)` per holding, using the
change typed for its category. The base is the money currently allocated.
Changes run from -100% to +1000%. Example scenarios: "Stocks" means individual
stocks and equity ETFs; "Bonds" means bonds and bond ETFs.

**Rebalancing.** The base `V` is the money currently allocated. The target
must total exactly 100% or nothing is shown.
- Adjust existing amounts: `adjustment = V x target% / 100 - current amount`.
- New money only (amount `N`): the target applies to `V + N`. Each category's
  shortfall is `max(0, (V+N) x target% - current)`, and `N` is shared in
  proportion to the shortfalls. Nothing is reduced, so a category above target
  can stay above target, and the table shows what remains.

**Currency.** Changes only how amounts are written. No conversion.

## Saved plans

- Stored in `localStorage` under the key `scope-portfolio-lab-plans`, as
  `{ "schemaVersion": 1, "plans": [...] }`. Maximum 50 plans.
- A plan holds inputs only, stored as numbers: currency, investment, holdings,
  DCA and calculator inputs, rebalancing target, name, created and updated
  dates. It never stores results.
- Every read validates every plan. An entry that cannot be used is **set aside,
  not deleted**, and is shown as "could not be read".
- Corrupt data, a newer schema version, blocked storage, and a full browser all
  stop writes and show a message. Saved data is never overwritten because
  parsing failed.
- Every change re-reads storage first, then writes, then reads back to confirm,
  so a second browser tab is not overwritten.
- Plans exist only in that browser. They are not sent anywhere.

## How to add things

**A template.** Add an object to `TEMPLATES` in `templates.ts`. Its holdings
must total exactly 100%, and its id must be unique. Tests check both for every
template, and `consistency.test.ts` checks that it survives saving and loading.

**A Learn topic.** Add an object to `LEARN_TOPICS` in `learn.ts`. The wording
tests in `learn.test.ts` and `wording.test.ts` reject buy/sell language,
advice, promises, and predictions.

**An example what-if scenario.** Add to `SCENARIO_PRESETS` in `scenario.ts`.

**An asset category.** This is the largest change, so go in this order:
1. `types.ts`: add the id to `CategoryId`.
2. `categories.ts`: add the entry to `CATEGORIES` (label, short label, colour).
3. `categoryNotes.ts`: add its note. The compiler will stop you if you forget.
4. Update the "10 categories" assertions in the tests.
5. **Saved plans:** the plan's `target` must contain every category, so older
   saved plans would stop loading. Raise `SCHEMA_VERSION` in `plans.ts` to 2,
   and in `migrateEnvelope` (`plansStorage.ts`) add a step that gives every
   saved plan's `target` the new category with the value `0`. Add a test.

## Tests

```
npm test
```

| File | Covers |
|---|---|
| `calculations.test.ts` | Parsing, allocation, chart data, observations, templates |
| `projection.test.ts` | DCA and calculator maths, input rules |
| `risk.test.ts` | Concentration measures and notes |
| `scenario.test.ts` | What-if maths, example scenarios |
| `rebalance.test.ts` | Target rules, both rebalancing methods |
| `plans.test.ts`, `plansStorage.test.ts` | Saving, loading, validation, damaged and unavailable storage |
| `learn.test.ts` | Guide content, links, example paths |
| `consistency.test.ts` | 400 generated portfolios: every section agrees with every other |
| `wording.test.ts` | No advice, promises, predictions, or market data anywhere in the source |

`learn.test.ts` and `wording.test.ts` read the source files, so run the tests
from the project root.

## Accessibility and layout (checked)

Checked in a real browser (headless Chromium) at 320, 375, 768, and 1280 px:
no sideways scrolling, every button and field at least 44 px tall, form fields
16 px on phones, text contrast at least 4.5:1, no axe-core violations apart
from the page needing a `<main>` landmark, which depends on the site layout.
Status is always given in words and an icon, never by colour alone. Animation
respects `prefers-reduced-motion`.

`portfolio-lab.css` sets `box-sizing: border-box` on `.pl-page` and everything
inside it, so the page does not depend on the rest of the site for its layout.

## Known limits

- Icons are Tabler (`ti ti-...`) loaded by the site. Names were not checked
  against the installed version.
- The explanations in `categoryNotes.ts`, `templates.ts`, and `learn.ts` were
  written for beginners and should be read by someone with finance knowledge
  before launch.
- `PlansSection.tsx` is the largest component (about 700 lines). Its rules all
  live in `lib/portfolio-lab/plans*.ts` and are tested there.
