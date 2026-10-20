"use client";

import { useMemo, useState } from "react";
import { roundTo } from "@/lib/portfolio-lab/calculations";
import { CATEGORIES, CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import {
  formatMoney,
  formatPercent,
  formatSignedMoney,
  formatSignedPercent,
} from "@/lib/portfolio-lab/currency";
import {
  adjustmentDirection,
  calculateRebalance,
  emptyTargetInputs,
  parseContribution,
  parseTarget,
  targetInputsFromCurrent,
  type TargetInputs,
} from "@/lib/portfolio-lab/rebalance";
import type { CategoryId, CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";
import NumberField from "./NumberField";
import "./portfolio-lab-tools.css";
import "./portfolio-lab-rebalance.css";

type RebalanceSectionProps = {
  /** Read-only. The rebalancing tool never changes the portfolio. */
  summary: PortfolioSummary;
  currency: CurrencyCode;
};

type Method = "trade" | "contribute";

const ADJUSTMENT_WORD = { add: "Add", reduce: "Reduce", none: "On target" } as const;

/** "+10%" read as percentage points: "+10 pp". */
function formatPoints(value: number): string {
  return formatSignedPercent(value).replace("%", " pp");
}

export default function RebalanceSection({ summary, currency }: RebalanceSectionProps) {
  // Target and settings live here, separate from the portfolio state.
  const [targetInputs, setTargetInputs] = useState<TargetInputs>(emptyTargetInputs);
  const [method, setMethod] = useState<Method>("trade");
  const [contributionInput, setContributionInput] = useState("0");

  const current = useMemo(
    () => summary.categories.map(({ category, amount }) => ({ category, amount })),
    [summary.categories],
  );

  const baseValue = useMemo(
    () => current.reduce((sum, row) => sum + row.amount, 0),
    [current],
  );

  const target = useMemo(() => parseTarget(targetInputs), [targetInputs]);
  const contribution = useMemo(
    () => parseContribution(contributionInput),
    [contributionInput],
  );

  const contributionUsed =
    method === "contribute" && !contribution.error ? contribution.value : 0;

  const result = useMemo(
    () => calculateRebalance(current, target, contributionUsed),
    [current, target, contributionUsed],
  );

  const noHoldings = summary.rows.every((row) => row.percent <= 0);
  const hasTargetErrors = Object.keys(target.errors).length > 0;
  const heldIds = useMemo(
    () => new Set<CategoryId>(current.map((row) => row.category)),
    [current],
  );

  function setTargetField(id: CategoryId, value: string) {
    setTargetInputs((existing) => ({ ...existing, [id]: value }));
  }

  /* ---------- Target status message ---------- */

  const gap = roundTo(Math.abs(100 - target.totalPercent), 8);

  const targetStatus = hasTargetErrors
    ? {
        tone: "is-over",
        icon: "ti-alert-circle",
        title: "Some target fields need fixing",
        text: "Correct the highlighted fields. Your target is never adjusted automatically.",
      }
    : target.status === "empty"
      ? {
          tone: "is-incomplete",
          icon: "ti-info-circle",
          title: "No target yet",
          text: "Type the percentage you want for each category, or copy your current portfolio as a starting point.",
        }
      : target.status === "incomplete"
        ? {
            tone: "is-incomplete",
            icon: "ti-info-circle",
            title: `The target adds up to ${formatPercent(target.totalPercent)}`,
            text: `It needs another ${formatPercent(gap)} to reach 100%. Nothing is filled in for you.`,
          }
        : target.status === "over"
          ? {
              tone: "is-over",
              icon: "ti-alert-triangle",
              title: `The target adds up to ${formatPercent(target.totalPercent)}`,
              text: `It is ${formatPercent(gap)} above 100%. Lower one or more categories. Nothing is scaled down for you.`,
            }
          : {
              tone: "is-complete",
              icon: "ti-circle-check",
              title: "The target adds up to 100%",
              text: "The comparison is ready.",
            };

  return (
    <section
      id="rebalancing-tool"
      className="pl-section"
      aria-labelledby="pl-rb-title"
    >
      <p className="pl-eyebrow">Rebalancing</p>
      <h2 id="pl-rb-title" className="pl-h2">
        Compare your portfolio with a target
      </h2>
      <p className="pl-lead">
        Rebalancing means moving a portfolio back toward the mix you intended.
        Choose a target of your own, and see how far your current portfolio is
        from it. This is a learning tool: it shows differences, it does not
        place trades, and the target is not a recommendation.
      </p>

      <div className="pl-tool-grid">
        <div className="pl-panel pl-tool-inputs">
          <h3 className="pl-h3">Your target allocation</h3>

          <div className="pl-tool-actions">
            <button
              type="button"
              className="pl-btn pl-btn-ghost"
              disabled={baseValue <= 0}
              onClick={() => setTargetInputs(targetInputsFromCurrent(current))}
            >
              <i className="ti ti-copy" aria-hidden="true" />
              Copy my current portfolio
            </button>

            <button
              type="button"
              className="pl-btn pl-btn-quiet"
              onClick={() => setTargetInputs(emptyTargetInputs())}
            >
              <i className="ti ti-restore" aria-hidden="true" />
              Clear target
            </button>
          </div>

          <div className="pl-rb-grid">
            {CATEGORIES.map((category) => (
              <NumberField
                key={category.id}
                id={`rebalance-${category.id}`}
                label={category.label}
                value={targetInputs[category.id]}
                onChange={(value) => setTargetField(category.id, value)}
                error={target.errors[category.id]}
                hint={heldIds.has(category.id) ? "In your portfolio" : "Not in your portfolio"}
                suffix="%"
              />
            ))}
          </div>

          <div
            className={`pl-status ${targetStatus.tone}`}
            role="status"
            aria-live="polite"
          >
            <i className={`ti ${targetStatus.icon}`} aria-hidden="true" />
            <div>
              <p className="pl-status-title">{targetStatus.title}</p>
              <p className="pl-status-text">{targetStatus.text}</p>
            </div>
          </div>

          <fieldset className="pl-currency pl-mode">
            <legend>How do you want to compare?</legend>

            <div className="pl-segmented pl-segmented-2">
              {(
                [
                  ["trade", "Buy and sell", "A theoretical comparison"],
                  ["contribute", "New money only", "Add money, sell nothing"],
                ] as const
              ).map(([value, title, note]) => (
                <label key={value} className="pl-segment">
                  <input
                    type="radio"
                    name="pl-rb-method"
                    value={value}
                    checked={method === value}
                    onChange={() => setMethod(value)}
                  />
                  <span>
                    {title}
                    <small>{note}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {method === "contribute" && (
            <NumberField
              id="rebalance-contribution"
              label="New contribution"
              value={contributionInput}
              onChange={setContributionInput}
              error={contribution.error}
              hint="Money you would add. Nothing is sold."
              prefix={currency}
            />
          )}
        </div>

        <div className="pl-tool-results" aria-live="polite">
          {noHoldings || baseValue <= 0 ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-scale" aria-hidden="true" />
              <p className="pl-empty-title">
                {noHoldings ? "Add holdings to compare" : "There is no allocated amount yet"}
              </p>
              <p className="pl-empty-text">
                {noHoldings
                  ? "Rebalancing compares your current portfolio with a target. Add holdings in the builder, or load an example portfolio first."
                  : "Your holdings have no money in them. Enter an investment amount in the builder."}
              </p>
              <div className="pl-empty-actions">
                <a className="pl-btn pl-btn-primary" href="#portfolio-builder">
                  Go to the builder
                </a>
              </div>
            </div>
          ) : !result ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-target" aria-hidden="true" />
              <p className="pl-empty-title">Complete your target to compare</p>
              <p className="pl-empty-text">
                The comparison needs a target that adds up to exactly 100%. The
                tool never changes your numbers to make them fit.
              </p>
            </div>
          ) : method === "contribute" && contribution.error ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-alert-circle" aria-hidden="true" />
              <p className="pl-empty-title">Check the new contribution</p>
              <p className="pl-empty-text">{contribution.error}</p>
            </div>
          ) : (
            <>
              {summary.status === "incomplete" && (
                <div className="pl-status is-incomplete">
                  <i className="ti ti-info-circle" aria-hidden="true" />
                  <div>
                    <p className="pl-status-title">Compared on the allocated part</p>
                    <p className="pl-status-text">
                      Only {formatMoney(baseValue, currency)} of your{" "}
                      {formatMoney(summary.investment, currency)} initial
                      investment is allocated, so the percentages below are
                      shares of that {formatMoney(baseValue, currency)}, not of
                      the initial investment. The unallocated{" "}
                      {formatMoney(summary.unallocatedAmount, currency)} is left
                      out.
                    </p>
                  </div>
                </div>
              )}

              {summary.status === "over" && (
                <div className="pl-status is-over">
                  <i className="ti ti-alert-triangle" aria-hidden="true" />
                  <div>
                    <p className="pl-status-title">The portfolio is above 100%</p>
                    <p className="pl-status-text">
                      The holdings add up to {formatPercent(summary.totalPercent)}.
                      The comparison uses the amounts as entered, and the
                      percentages below are shares of that total.
                    </p>
                  </div>
                </div>
              )}

              {method === "trade" ? (
                <>
                  <div className="pl-result-hero">
                    <p className="pl-card-label">Current allocated value</p>
                    <p className="pl-result-value">
                      {formatMoney(result.baseValue, currency)}
                    </p>
                    <p className="pl-result-sub">
                      This is the base for every percentage. In theory, matching
                      the target would mean{" "}
                      {result.totalToReduce > 0
                        ? `adding ${formatMoney(result.totalToAdd, currency)} to some categories and reducing ${formatMoney(result.totalToReduce, currency)} in others.`
                        : "no changes: the portfolio is already on target."}{" "}
                      These are calculated differences, not trade instructions.
                    </p>
                  </div>

                  <div className="pl-mini-cards pl-rb-two">
                    <div className="pl-card">
                      <p className="pl-card-label">Amount to add (theory)</p>
                      <p className="pl-card-value pl-card-value-sm">
                        {formatMoney(result.totalToAdd, currency)}
                      </p>
                      <p className="pl-card-note">To categories below target</p>
                    </div>

                    <div className="pl-card">
                      <p className="pl-card-label">Amount to reduce (theory)</p>
                      <p className="pl-card-value pl-card-value-sm">
                        {formatMoney(result.totalToReduce, currency)}
                      </p>
                      <p className="pl-card-note">From categories above target</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="pl-result-hero">
                    <p className="pl-card-label">Value after the new contribution</p>
                    <p className="pl-result-value">
                      {formatMoney(result.newTotal, currency)}
                    </p>
                    <p className="pl-result-sub">
                      {formatMoney(result.baseValue, currency)} allocated now plus{" "}
                      {formatMoney(result.contribution, currency)} of new money.
                      {result.contribution <= 0
                        ? " Enter a contribution to see how it could be split."
                        : result.contributionBalances
                          ? " This new money is enough to reach the target without selling anything."
                          : " Nothing is sold, so some categories stay above target."}
                    </p>
                  </div>

                  <div className="pl-mini-cards pl-rb-two">
                    <div className="pl-card">
                      <p className="pl-card-label">New money placed</p>
                      <p className="pl-card-value pl-card-value-sm">
                        {formatMoney(result.contribution, currency)}
                      </p>
                      <p className="pl-card-note">Split across categories below target</p>
                    </div>

                    <div className={`pl-card${result.remainingOverweight > 0 ? " is-warning" : ""}`}>
                      <p className="pl-card-label">Still above target</p>
                      <p className="pl-card-value pl-card-value-sm">
                        {formatMoney(result.remainingOverweight, currency)}
                      </p>
                      <p className="pl-card-note">
                        {result.remainingOverweight > 0
                          ? "New money alone cannot lower this"
                          : "Nothing remains above target"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {result && !noHoldings && baseValue > 0 && !(method === "contribute" && contribution.error) && (
        <>
          <div className="pl-panel">
            <h3 className="pl-h3">
              {method === "trade"
                ? "Current mix compared with your target"
                : "How new money would be split"}
            </h3>

            <div
              className="pl-scroll"
              role="region"
              aria-label="Rebalancing comparison table"
              tabIndex={0}
            >
              {method === "trade" ? (
                <table className="pl-table pl-proj-table pl-rb-table">
                  <caption className="pl-sr-only">
                    Current allocation, target allocation, and the theoretical
                    adjustment for each category
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col" className="pl-num">Current %</th>
                      <th scope="col" className="pl-num">Target %</th>
                      <th scope="col" className="pl-num">Difference</th>
                      <th scope="col" className="pl-num">Current amount</th>
                      <th scope="col" className="pl-num">Target amount</th>
                      <th scope="col" className="pl-num">Adjustment (theory)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => {
                      const direction = adjustmentDirection(row.adjustment, result.baseValue);

                      return (
                        <tr key={row.category}>
                          <th scope="row">{CATEGORY_BY_ID[row.category].label}</th>
                          <td className="pl-num">{formatPercent(row.currentPercent)}</td>
                          <td className="pl-num">{formatPercent(row.targetPercent)}</td>
                          <td className="pl-num">{formatPoints(row.differencePoints)}</td>
                          <td className="pl-num">{formatMoney(row.currentAmount, currency)}</td>
                          <td className="pl-num">{formatMoney(row.targetAmount, currency)}</td>
                          <td className="pl-num">
                            <strong>{ADJUSTMENT_WORD[direction]}</strong>
                            {direction !== "none" && (
                              <> {formatSignedMoney(row.adjustment, currency)}</>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Total</th>
                      <td className="pl-num">100%</td>
                      <td className="pl-num">100%</td>
                      <td className="pl-num">—</td>
                      <td className="pl-num">{formatMoney(result.baseValue, currency)}</td>
                      <td className="pl-num">{formatMoney(result.baseValue, currency)}</td>
                      <td className="pl-num">—</td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <table className="pl-table pl-proj-table pl-rb-table">
                  <caption className="pl-sr-only">
                    How a new contribution would be placed, and what difference
                    from the target remains afterwards
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col" className="pl-num">Current %</th>
                      <th scope="col" className="pl-num">Target %</th>
                      <th scope="col" className="pl-num">Current amount</th>
                      <th scope="col" className="pl-num">Target after new money</th>
                      <th scope="col" className="pl-num">New money</th>
                      <th scope="col" className="pl-num">Amount after</th>
                      <th scope="col" className="pl-num">Remaining difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr key={row.category}>
                        <th scope="row">{CATEGORY_BY_ID[row.category].label}</th>
                        <td className="pl-num">{formatPercent(row.currentPercent)}</td>
                        <td className="pl-num">{formatPercent(row.targetPercent)}</td>
                        <td className="pl-num">{formatMoney(row.currentAmount, currency)}</td>
                        <td className="pl-num">{formatMoney(row.postTargetAmount, currency)}</td>
                        <td className="pl-num">{formatMoney(row.contribution, currency)}</td>
                        <td className="pl-num">{formatMoney(row.amountAfter, currency)}</td>
                        <td className="pl-num">
                          {row.remainingAmount === 0 ? (
                            <strong>On target</strong>
                          ) : (
                            <>
                              <strong>
                                {row.remainingAmount > 0 ? "Above" : "Below"}
                              </strong>{" "}
                              {formatSignedMoney(row.remainingAmount, currency)}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Total</th>
                      <td className="pl-num">100%</td>
                      <td className="pl-num">100%</td>
                      <td className="pl-num">{formatMoney(result.baseValue, currency)}</td>
                      <td className="pl-num">{formatMoney(result.newTotal, currency)}</td>
                      <td className="pl-num">{formatMoney(result.contribution, currency)}</td>
                      <td className="pl-num">{formatMoney(result.newTotal, currency)}</td>
                      <td className="pl-num">
                        {result.remainingOverweight > 0
                          ? `${formatMoney(result.remainingOverweight, currency)} above`
                          : "—"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>

            <p className="pl-hint">
              {method === "trade"
                ? "Difference is in percentage points (pp): current minus target. "
                : "Percentages are shares of the current allocated value. After new money, targets apply to the larger total. "}
              Amounts are rounded for display, so rows may differ slightly from
              the rounded total.
            </p>
          </div>

          <div className="pl-assumptions">
            <h3 className="pl-h3">How to read this, and what it leaves out</h3>

            <ul>
              <li>
                <strong>The base.</strong> Percentages are shares of the money
                currently allocated to your holdings. If the portfolio is not
                100% allocated, that is less than your initial investment, and
                unallocated money is not part of the comparison.
              </li>
              <li>
                <strong>Buy and sell is theory.</strong> It shows the calculated
                difference between your amounts and the target amounts. It is
                not a list of trades, and Scope never places or connects to
                orders.
              </li>
              <li>
                <strong>New money only is different.</strong> New money can only
                be added, so it can move a mix toward the target but cannot
                lower a category that is already above it. That is why
                something may remain above target. It is not the same as selling
                and buying.
              </li>
              <li>
                <strong>Real life adds costs and limits.</strong> Taxes, trading
                fees, minimum trade sizes, trading restrictions, price moves
                before an order is filled, how easily something can be sold,
                whether fractional shares are available, and currency
                conversion costs are all left out. None of them are assumed to
                be zero. They are simply not modelled, so real results would
                differ.
              </li>
              <li>
                <strong>Your target is your own choice.</strong> Scope does not
                suggest a target, and moving toward one does not guarantee a
                better result. Amounts use your display currency ({currency})
                without conversion.
              </li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
