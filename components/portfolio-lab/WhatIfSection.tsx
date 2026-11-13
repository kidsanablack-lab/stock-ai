"use client";

import { useMemo, useState } from "react";
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
import type {
  CategoryId,
  CurrencyCode,
  PortfolioSummary,
} from "@/lib/portfolio-lab/types";
import NumberField from "./NumberField";
import "./portfolio-lab-tools.css";
import "./portfolio-lab-whatif.css";

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
          (category) =>
            parsed.changes[category.id] !== 0 && !inPortfolio.has(category.id),
        )
      : [];

  const activePreset = SCENARIO_PRESETS.find((preset) => preset.id === presetId);

  return (
    <section
      id="what-if-simulator"
      className="pl-section"
      aria-labelledby="pl-whatif-title"
    >
      <p className="pl-eyebrow">What-if Simulator</p>
      <h2 id="pl-whatif-title" className="pl-h2">
        Explore an assumed price change
      </h2>
      <p className="pl-lead">
        Type a price change you want to imagine for each kind of asset and see
        what it would do to your hypothetical portfolio. These are made-up
        scenarios to help you understand risk. They are not predictions, and
        your portfolio above is never changed.
      </p>

      <div className="pl-tool-grid">
        <div className="pl-panel pl-tool-inputs">
          <div role="group" aria-labelledby="pl-wi-presets-title">
            <p id="pl-wi-presets-title" className="pl-field-label">
              Illustrative starting examples
            </p>

            <div className="pl-wi-presets">
              {SCENARIO_PRESETS.map((preset) => {
                const active = preset.id === presetId;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`pl-wi-preset${active ? " is-active" : ""}`}
                    aria-pressed={active}
                    onClick={() => loadPreset(preset)}
                  >
                    <span className="pl-wi-preset-name">
                      {active && <i className="ti ti-check" aria-hidden="true" />}
                      {preset.name}
                    </span>
                    <small>{preset.description}</small>
                  </button>
                );
              })}
            </div>

            <p className="pl-hint">
              Examples only, not predictions. Loading one replaces the numbers
              below, and you can edit any of them afterwards.
            </p>
          </div>

          <fieldset className="pl-rates pl-wi-fieldset">
            <legend>Assumed change for each asset category</legend>

            <div className="pl-wi-grid">
              {CATEGORIES.map((category) => (
                <NumberField
                  key={category.id}
                  id={`whatif-${category.id}`}
                  label={category.label}
                  value={inputs[category.id]}
                  onChange={(value) => setChange(category.id, value)}
                  error={parsed.errors[category.id]}
                  hint={
                    inPortfolio.has(category.id)
                      ? "In your portfolio"
                      : "Not in your portfolio"
                  }
                  suffix="%"
                />
              ))}
            </div>

            <p className="pl-hint">
              Use negative numbers for a fall, for example -20. An asset cannot
              lose more than 100% of its value, so the lowest allowed number is{" "}
              {MIN_CHANGE_PERCENT}. The highest is {MAX_CHANGE_PERCENT}.
            </p>
          </fieldset>

          <div className="pl-tool-actions">
            <button type="button" className="pl-btn pl-btn-quiet" onClick={reset}>
              <i className="ti ti-restore" aria-hidden="true" />
              Reset to no change
            </button>
          </div>
        </div>

        <div className="pl-tool-results" aria-live="polite">
          {noHoldings ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-chart-pie" aria-hidden="true" />
              <p className="pl-empty-title">Add holdings to run a scenario</p>
              <p className="pl-empty-text">
                The simulator uses the money allocated in your portfolio. Add
                holdings in the builder, or load an example portfolio first.
              </p>
              <div className="pl-empty-actions">
                <a className="pl-btn pl-btn-primary" href="#portfolio-builder">
                  Go to the builder
                </a>
              </div>
            </div>
          ) : !result ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-alert-circle" aria-hidden="true" />
              <p className="pl-empty-title">Check the highlighted fields</p>
              <p className="pl-empty-text">
                Results appear as soon as every category has a valid number.
              </p>
            </div>
          ) : result.baseValue <= 0 ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-info-circle" aria-hidden="true" />
              <p className="pl-empty-title">Percentage change is not available</p>
              <p className="pl-empty-text">
                The amount allocated to your holdings is{" "}
                {formatMoney(0, currency)}, so there is nothing to simulate.
                Enter an investment amount in the builder.
              </p>
            </div>
          ) : (
            <>
              {summary.status === "incomplete" && (
                <div className="pl-status is-incomplete">
                  <i className="ti ti-info-circle" aria-hidden="true" />
                  <div>
                    <p className="pl-status-title">
                      Only the allocated part is simulated
                    </p>
                    <p className="pl-status-text">
                      {formatPercent(summary.totalPercent)} of your initial
                      investment ({formatMoney(summary.allocatedAmount, currency)})
                      is allocated to holdings. The{" "}
                      {formatMoney(summary.unallocatedAmount, currency)} that is
                      not allocated is left out, and it is not treated as an
                      investment.
                    </p>
                  </div>
                </div>
              )}

              {summary.status === "over" && (
                <div className="pl-status is-over">
                  <i className="ti ti-alert-triangle" aria-hidden="true" />
                  <div>
                    <p className="pl-status-title">The allocation is above 100%</p>
                    <p className="pl-status-text">
                      The holdings add up to {formatPercent(summary.totalPercent)},
                      so the amounts below are more than your initial investment.
                      The simulation uses the amounts exactly as entered.
                    </p>
                  </div>
                </div>
              )}

              <div className={`pl-result-hero${result.direction === "down" ? " is-loss" : ""}`}>
                <p className="pl-card-label">Hypothetical value after these changes</p>
                <p className="pl-result-value">
                  {formatMoney(result.scenarioValue, currency)}
                </p>
                <p className="pl-result-growth">
                  <strong>{DIRECTION_WORD[result.direction]}:</strong>{" "}
                  {formatSignedMoney(result.absoluteChange, currency)}
                  {result.percentageChange !== null &&
                    ` (${formatSignedPercent(result.percentageChange)})`}
                </p>
                <p className="pl-result-sub">
                  Compared with {formatMoney(result.baseValue, currency)}{" "}
                  currently allocated. This is an assumption you chose, not a
                  forecast.
                  {activePreset && ` Example loaded: ${activePreset.name}.`}
                </p>
              </div>

              <div className="pl-mini-cards">
                <div className="pl-card">
                  <p className="pl-card-label">Original allocated value</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatMoney(result.baseValue, currency)}
                  </p>
                  <p className="pl-card-note">The simulation base</p>
                </div>

                <div className="pl-card">
                  <p className="pl-card-label">Hypothetical value</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatMoney(result.scenarioValue, currency)}
                  </p>
                  <p className="pl-card-note">After the assumed changes</p>
                </div>

                <div className={`pl-card${result.direction === "down" ? " is-warning" : ""}`}>
                  <p className="pl-card-label">Change</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatSignedMoney(result.absoluteChange, currency)}
                  </p>
                  <p className="pl-card-note">
                    {result.percentageChange !== null
                      ? formatSignedPercent(result.percentageChange)
                      : "Percentage not available"}
                  </p>
                </div>
              </div>

              {ignored.length > 0 && (
                <p className="pl-hint">
                  No effect on this portfolio:{" "}
                  {ignored.map((category) => category.label).join(", ")}. You
                  entered a change for{" "}
                  {ignored.length === 1 ? "a category" : "categories"} you do
                  not hold.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {result && !noHoldings && result.baseValue > 0 && (
        <>
          <div className="pl-panel">
            <h3 className="pl-h3">Impact on each holding</h3>

            <div
              className="pl-scroll"
              role="region"
              aria-label="What-if impact by holding"
              tabIndex={0}
            >
              <table className="pl-table pl-proj-table pl-wi-table">
                <caption className="pl-sr-only">
                  Hypothetical value of each holding after the assumed changes
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Holding</th>
                    <th scope="col" className="pl-num">Current amount</th>
                    <th scope="col" className="pl-num">Assumed change</th>
                    <th scope="col" className="pl-num">Hypothetical amount</th>
                    <th scope="col" className="pl-num">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.id}>
                      <th scope="row">
                        {row.displayName}
                        <small className="pl-wi-cat">
                          {scenarioCategoryLabel(row.category)}
                        </small>
                      </th>
                      <td className="pl-num">{formatMoney(row.baseAmount, currency)}</td>
                      <td className="pl-num">{formatSignedPercent(row.changePercent)}</td>
                      <td className="pl-num">{formatMoney(row.scenarioAmount, currency)}</td>
                      <td className="pl-num">
                        {formatSignedMoney(row.changeAmount, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Total</th>
                    <td className="pl-num">{formatMoney(result.baseValue, currency)}</td>
                    <td className="pl-num">
                      {result.percentageChange !== null
                        ? formatSignedPercent(result.percentageChange)
                        : "—"}
                    </td>
                    <td className="pl-num">
                      {formatMoney(result.scenarioValue, currency)}
                    </td>
                    <td className="pl-num">
                      {formatSignedMoney(result.absoluteChange, currency)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="pl-hint">
              Amounts are rounded for display, so rows may differ slightly from
              the rounded total. The total&apos;s change is a share of the whole
              portfolio, not an average of the rows.
            </p>
          </div>

          <div className="pl-assumptions">
            <h3 className="pl-h3">How to read this, and what it leaves out</h3>

            <ul>
              <li>
                <strong>Assumptions, not predictions.</strong> You chose every
                percentage. Scope does not know what any market will do, and a
                real fall or rise can be smaller or larger.
              </li>
              <li>
                <strong>One instant change.</strong> Each change is applied once
                to today&apos;s amounts. It does not show how long a fall lasts,
                whether prices recover, or what happens along the way.
              </li>
              <li>
                <strong>Only allocated money.</strong> The base is the amount
                currently allocated to your holdings. Unallocated money is left
                out. If cash is one of your holdings, the Cash change is applied
                to it, and it starts at 0%.
              </li>
              <li>
                <strong>Categories are broad.</strong> Every holding in a
                category gets the same change. Real funds and companies in the
                same category can move very differently, and assets can move
                together or in opposite directions. This tool does not model
                that.
              </li>
              <li>
                <strong>What is left out.</strong> Fees, taxes, trading costs,
                new contributions, rebalancing, inflation, and currency
                conversion are not included. Amounts use your display currency
                ({currency}) without conversion.
              </li>
              <li>
                <strong>Your portfolio is unchanged.</strong> Nothing here edits
                your holdings, and it is not a suggestion to change
                anything.
              </li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
