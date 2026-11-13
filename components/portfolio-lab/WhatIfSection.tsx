"use client";

import { useMemo, useState } from "react";
import Button, { buttonClass } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DeltaPill, { directionOf } from "@/components/ui/DeltaPill";
import NoteBox from "@/components/ui/NoteBox";
import { CATEGORIES } from "@/lib/portfolio-lab/categories";
import {
  formatMoney,
  formatPercent,
  formatSignedMoney,
  formatSignedPercent,
} from "@/lib/portfolio-lab/currency";
import {
  MAX_CHANGE_PERCENT,
  MIN_CHANGE_PERCENT,
  SCENARIO_PRESETS,
  calculateScenario,
  emptyScenarioInputs,
  parseScenario,
  presetToInputs,
  scenarioCategoryLabel,
  type ScenarioInputs,
  type ScenarioPreset,
} from "@/lib/portfolio-lab/scenario";
import type { CategoryId, CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";
import DataTable from "./DataTable";
import FactList from "./FactList";
import LeadPanel from "./LeadPanel";
import NumberField from "./NumberField";
import PlSection from "./PlSection";

type WhatIfSectionProps = {
  /** Read-only. The simulator never changes the portfolio. */
  summary: PortfolioSummary;
  currency: CurrencyCode;
};

const DIRECTION_WORD = {
  up: "Higher",
  down: "Lower",
  none: "No change",
} as const;

export default function WhatIfSection({ summary, currency }: WhatIfSectionProps) {
  // Simulation state lives here, completely separate from the portfolio state.
  const [inputs, setInputs] = useState<ScenarioInputs>(emptyScenarioInputs);
  const [presetId, setPresetId] = useState<string | null>(null);

  const parsed = useMemo(() => parseScenario(inputs), [inputs]);

  const result = useMemo(
    () => (parsed.isValid ? calculateScenario(summary.rows, parsed.changes) : null),
    [parsed, summary.rows],
  );

  const inPortfolio = useMemo(
    () => new Set<CategoryId>(summary.rows.filter((r) => r.amount > 0).map((r) => r.category)),
    [summary.rows],
  );

  const noHoldings = summary.rows.every((row) => row.percent <= 0);

  function setChange(id: CategoryId, value: string) {
    setInputs((current) => ({ ...current, [id]: value }));
    setPresetId(null); // hand-edited, so it is no longer the example
  }

  function loadPreset(preset: ScenarioPreset) {
    setInputs(presetToInputs(preset));
    setPresetId(preset.id);
  }

  function reset() {
    setInputs(emptyScenarioInputs());
    setPresetId(null);
  }

  const ignored =
    result && !noHoldings
      ? CATEGORIES.filter(
          (category) => parsed.changes[category.id] !== 0 && !inPortfolio.has(category.id),
        )
      : [];

  const activePreset = SCENARIO_PRESETS.find((preset) => preset.id === presetId);
  const ready = result && !noHoldings && result.baseValue > 0;

  return (
    <PlSection
      id="what-if-simulator"
      titleId="pl-whatif-title"
      title="Explore an assumed price change"
      lead="Type a price change you want to imagine for each kind of asset and see what it would do to your hypothetical portfolio. These are made-up scenarios to help you understand risk. They are not predictions, and your portfolio above is never changed."
      labels={["hypothetical"]}
      source="Source: your portfolio and the price changes you typed. No market data is used. Hypothetical example, not a forecast."
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Card>
          <div role="group" aria-labelledby="pl-wi-presets-title">
            <p id="pl-wi-presets-title" className="text-small font-semibold text-ink">
              Illustrative starting examples
            </p>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {SCENARIO_PRESETS.map((preset) => {
                const active = preset.id === presetId;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => loadPreset(preset)}
                    className={`flex min-h-12 flex-col items-start gap-0.5 rounded-xl border px-3 py-2 text-left ${
                      active
                        ? "border-primary bg-primary-soft text-primary-ink"
                        : "border-border bg-white text-ink hover:border-primary"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-note font-semibold">
                      {active && <i className="ti ti-check" aria-hidden="true" />}
                      {preset.name}
                    </span>
                    <span className="text-caption font-normal text-ink-muted">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-small text-ink-muted">
              Examples only, not predictions. Loading one replaces the numbers below, and you can
              edit any of them afterwards.
            </p>
          </div>

          <fieldset className="mt-5 min-w-0">
            <legend className="mb-2 p-0 text-small font-semibold text-ink">
              Assumed change for each asset category
            </legend>

            <div className="grid gap-4 sm:grid-cols-2">
              {CATEGORIES.map((category) => (
                <NumberField
                  key={category.id}
                  id={`whatif-${category.id}`}
                  label={category.label}
                  value={inputs[category.id]}
                  onChange={(value) => setChange(category.id, value)}
                  error={parsed.errors[category.id]}
                  hint={inPortfolio.has(category.id) ? "In your portfolio" : "Not in your portfolio"}
                  suffix="%"
                />
              ))}
            </div>

            <p className="mt-2 text-small text-ink-muted">
              Use negative numbers for a fall, for example −20. An asset cannot lose more than 100%
              of its value, so the lowest allowed number is {MIN_CHANGE_PERCENT}. The highest is{" "}
              {MAX_CHANGE_PERCENT}.
            </p>
          </fieldset>

          <div className="mt-5">
            <Button variant="quiet" onClick={reset}>
              <i className="ti ti-restore" aria-hidden="true" />
              Reset to no change
            </Button>
          </div>
        </Card>

        <div className="grid min-w-0 gap-4" aria-live="polite">
          {noHoldings ? (
            <NoteBox title="Add holdings to run a scenario">
              <p>
                The simulator uses the money allocated in your portfolio. Add holdings in the
                builder, or load an example portfolio first.
              </p>
              <a href="#portfolio-builder" className={`${buttonClass("primary")} mt-2`}>
                Go to the builder
              </a>
            </NoteBox>
          ) : !result ? (
            <NoteBox tone="problem" title="Check the highlighted fields">
              <p>Results appear as soon as every category has a valid number.</p>
            </NoteBox>
          ) : result.baseValue <= 0 ? (
            <NoteBox title="Percentage change is not available">
              <p>
                The amount allocated to your holdings is {formatMoney(0, currency)}, so there is
                nothing to simulate. Enter an investment amount in the builder.
              </p>
            </NoteBox>
          ) : (
            <>
              {summary.status === "incomplete" && (
                <NoteBox title="Only the allocated part is simulated">
                  <p>
                    {formatPercent(summary.totalPercent)} of your initial investment (
                    {formatMoney(summary.allocatedAmount, currency)}) is allocated to holdings. The{" "}
                    {formatMoney(summary.unallocatedAmount, currency)} that is not allocated is left
                    out, and it is not treated as an investment.
                  </p>
                </NoteBox>
              )}

              {summary.status === "over" && (
                <NoteBox tone="problem" title="The allocation is above 100%">
                  <p>
                    The holdings add up to {formatPercent(summary.totalPercent)}, so the amounts
                    below are more than your initial investment. The simulation uses the amounts
                    exactly as entered.
                  </p>
                </NoteBox>
              )}

              <LeadPanel
                label="Hypothetical value after these changes"
                value={formatMoney(result.scenarioValue, currency)}
              >
                <p className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{DIRECTION_WORD[result.direction]}:</span>
                  <DeltaPill
                    direction={directionOf(result.absoluteChange)}
                    text={formatSignedMoney(result.absoluteChange, currency)}
                  />
                  {result.percentageChange !== null && (
                    <span>{formatSignedPercent(result.percentageChange)}</span>
                  )}
                </p>
                <p>
                  Compared with {formatMoney(result.baseValue, currency)} currently allocated. This
                  is an assumption you chose, not a forecast.
                  {activePreset && ` Example loaded: ${activePreset.name}.`}
                </p>
              </LeadPanel>

              <FactList
                facts={[
                  {
                    label: "Original allocated value",
                    value: formatMoney(result.baseValue, currency),
                    note: "The simulation base",
                  },
                  {
                    label: "Hypothetical value",
                    value: formatMoney(result.scenarioValue, currency),
                    note: "After the assumed changes",
                  },
                  {
                    label: "Change",
                    value: formatSignedMoney(result.absoluteChange, currency),
                    note:
                      result.percentageChange !== null
                        ? formatSignedPercent(result.percentageChange)
                        : "Percentage not available",
                  },
                ]}
              />

              {ignored.length > 0 && (
                <p className="text-small text-ink-muted">
                  No effect on this portfolio: {ignored.map((category) => category.label).join(", ")}
                  . You entered a change for {ignored.length === 1 ? "a category" : "categories"}{" "}
                  you do not hold.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {ready && (
        <>
          <Card>
            <h3 className="font-serif text-h3 font-normal text-ink">
              {result.direction === "none"
                ? "With no change assumed, every holding keeps its amount"
                : `The assumed changes move the total from ${formatMoney(result.baseValue, currency)} to ${formatMoney(result.scenarioValue, currency)}`}
            </h3>

            <div className="mt-5">
              <DataTable
                caption="Hypothetical value of each holding after the assumed changes"
                regionLabel="What-if impact by holding"
                firstColumn="Holding"
                columns={[
                  { label: "Current amount", numeric: true },
                  { label: "Assumed change", numeric: true },
                  { label: "Hypothetical amount", numeric: true },
                  { label: "Difference", numeric: true },
                ]}
                rows={result.rows.map((row) => ({
                  id: row.id,
                  header: (
                    <span>
                      {row.displayName}
                      <span className="block text-caption font-normal text-ink-muted">
                        {scenarioCategoryLabel(row.category)}
                      </span>
                    </span>
                  ),
                  cells: [
                    formatMoney(row.baseAmount, currency),
                    formatSignedPercent(row.changePercent),
                    formatMoney(row.scenarioAmount, currency),
                    <DeltaPill
                      key="difference"
                      direction={directionOf(row.changeAmount)}
                      text={formatSignedMoney(row.changeAmount, currency)}
                    />,
                  ],
                }))}
                footer={{
                  header: "Total",
                  cells: [
                    formatMoney(result.baseValue, currency),
                    result.percentageChange !== null
                      ? formatSignedPercent(result.percentageChange)
                      : "Not available",
                    formatMoney(result.scenarioValue, currency),
                    <DeltaPill
                      key="total-difference"
                      direction={directionOf(result.absoluteChange)}
                      text={formatSignedMoney(result.absoluteChange, currency)}
                    />,
                  ],
                }}
              />
            </div>

            <p className="mt-3 text-caption text-ink-muted">
              Amounts are rounded for display, so rows may differ slightly from the rounded total.
              The total’s change is a share of the whole portfolio, not an average of the rows.
            </p>
          </Card>

          <Card>
            <h3 className="font-serif text-h4 font-normal text-ink">
              How to read this, and what it leaves out
            </h3>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-note text-ink">
              <li>
                <strong className="font-semibold">Assumptions, not predictions.</strong> You chose
                every percentage. Scope does not know what any market will do, and a real fall or
                rise can be smaller or larger.
              </li>
              <li>
                <strong className="font-semibold">One instant change.</strong> Each change is
                applied once to today’s amounts. It does not show how long a fall lasts, whether
                prices recover, or what happens along the way.
              </li>
              <li>
                <strong className="font-semibold">Only allocated money.</strong> The base is the
                amount currently allocated to your holdings. Unallocated money is left out. If cash
                is one of your holdings, the Cash change is applied to it, and it starts at 0%.
              </li>
              <li>
                <strong className="font-semibold">Categories are broad.</strong> Every holding in a
                category gets the same change. Real funds and companies in the same category can
                move very differently, and assets can move together or in opposite directions. This
                tool does not model that.
              </li>
              <li>
                <strong className="font-semibold">What is left out.</strong> Fees, taxes, trading
                costs, new contributions, rebalancing, inflation, and currency conversion are not
                included. Amounts use your display currency ({currency}) without conversion.
              </li>
              <li>
                <strong className="font-semibold">Your portfolio is unchanged.</strong> Nothing here
                edits your holdings, and it is not a suggestion to change anything.
              </li>
            </ul>
          </Card>
        </>
      )}
    </PlSection>
  );
}
