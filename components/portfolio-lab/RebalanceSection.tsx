"use client";

import { useMemo, useState } from "react";
import Button, { buttonClass } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DeltaPill, { directionOf } from "@/components/ui/DeltaPill";
import NoteBox from "@/components/ui/NoteBox";
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
import DataTable from "./DataTable";
import FactList from "./FactList";
import LeadPanel from "./LeadPanel";
import NumberField from "./NumberField";
import PlSection from "./PlSection";
import Segmented from "./Segmented";

type RebalanceSectionProps = {
  /** Read-only. The rebalancing tool never changes the portfolio. */
  summary: PortfolioSummary;
  currency: CurrencyCode;
  /** The typed target. It lives in PortfolioLab so Saved Plans can keep it. */
  targetInputs: TargetInputs;
  onTargetInputsChange: (inputs: TargetInputs) => void;
};

type Method = "trade" | "contribute";

// Describes where a category stands against its target. It is a comparison,
// not an instruction.
const POSITION_WORD = { add: "Below target", reduce: "Above target", none: "On target" } as const;

/** "+10%" read as percentage points: "+10 pp". */
function formatPoints(value: number): string {
  return formatSignedPercent(value).replace("%", " pp");
}

export default function RebalanceSection({
  summary,
  currency,
  targetInputs,
  onTargetInputsChange,
}: RebalanceSectionProps) {
  // The method and the new-contribution amount are view settings, so they
  // stay here. The target itself belongs to the plan.
  const [method, setMethod] = useState<Method>("trade");
  const [contributionInput, setContributionInput] = useState("0");

  const current = useMemo(
    () => summary.categories.map(({ category, amount }) => ({ category, amount })),
    [summary.categories],
  );

  const baseValue = useMemo(() => current.reduce((sum, row) => sum + row.amount, 0), [current]);

  const target = useMemo(() => parseTarget(targetInputs), [targetInputs]);
  const contribution = useMemo(() => parseContribution(contributionInput), [contributionInput]);

  const contributionUsed = method === "contribute" && !contribution.error ? contribution.value : 0;

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
    onTargetInputsChange({ ...targetInputs, [id]: value });
  }

  /* ---------- Target status message ---------- */

  const gap = roundTo(Math.abs(100 - target.totalPercent), 8);

  const targetStatus = hasTargetErrors
    ? {
        tone: "problem" as const,
        icon: "ti-alert-circle",
        title: "Some target fields need fixing",
        text: "Correct the highlighted fields. Your target is never adjusted automatically.",
      }
    : target.status === "empty"
      ? {
          tone: "note" as const,
          icon: "ti-info-circle",
          title: "No target yet",
          text: "Type the percentage you want for each category, or copy your current portfolio as a starting point.",
        }
      : target.status === "incomplete"
        ? {
            tone: "note" as const,
            icon: "ti-info-circle",
            title: `The target adds up to ${formatPercent(target.totalPercent)}`,
            text: `It needs another ${formatPercent(gap)} to reach 100%. Nothing is filled in for you.`,
          }
        : target.status === "over"
          ? {
              tone: "problem" as const,
              icon: "ti-alert-triangle",
              title: `The target adds up to ${formatPercent(target.totalPercent)}`,
              text: `It is ${formatPercent(gap)} above 100%. Lower one or more categories. Nothing is scaled down for you.`,
            }
          : {
              tone: "note" as const,
              icon: "ti-circle-check",
              title: "The target adds up to 100%",
              text: "The comparison is ready.",
            };

  const showTables =
    result && !noHoldings && baseValue > 0 && !(method === "contribute" && contribution.error);

  return (
    <PlSection
      id="rebalancing-tool"
      titleId="pl-rb-title"
      title="Compare your portfolio with a target"
      lead="Rebalancing means moving a portfolio back toward the mix you intended. Choose a target of your own, and see how far your current portfolio is from it. This is a learning tool: it shows differences, it does not place trades, and the target is not a recommendation."
      labels={["hypothetical"]}
      source="Source: your portfolio and the target you typed. No prices or market data are used. Hypothetical example. Differences are calculated, not trade instructions."
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Card>
          <h3 className="font-serif text-h4 font-normal text-ink">Your target allocation</h3>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              disabled={baseValue <= 0}
              onClick={() => onTargetInputsChange(targetInputsFromCurrent(current))}
            >
              <i className="ti ti-copy" aria-hidden="true" />
              Copy my current portfolio
            </Button>

            <Button variant="quiet" onClick={() => onTargetInputsChange(emptyTargetInputs())}>
              <i className="ti ti-restore" aria-hidden="true" />
              Clear target
            </Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

          <NoteBox
            className="mt-5"
            tone={targetStatus.tone}
            icon={targetStatus.icon}
            title={targetStatus.title}
            role="status"
          >
            <p>{targetStatus.text}</p>
          </NoteBox>

          <div className="mt-5">
            <Segmented
              legend="How do you want to compare?"
              name="pl-rb-method"
              columns={2}
              value={method}
              onChange={setMethod}
              options={[
                { value: "trade", title: "Adjust existing amounts", note: "A theoretical comparison" },
                { value: "contribute", title: "New money only", note: "Add money, reduce nothing" },
              ]}
            />
          </div>

          {method === "contribute" && (
            <div className="mt-5">
              <NumberField
                id="rebalance-contribution"
                label="New contribution"
                value={contributionInput}
                onChange={setContributionInput}
                error={contribution.error}
                hint="Money you would add. Nothing is reduced."
                prefix={currency}
              />
            </div>
          )}
        </Card>

        <div className="grid min-w-0 gap-4" aria-live="polite">
          {noHoldings || baseValue <= 0 ? (
            <NoteBox
              title={noHoldings ? "Add holdings to compare" : "There is no allocated amount yet"}
            >
              <p>
                {noHoldings
                  ? "Rebalancing compares your current portfolio with a target. Add holdings in the builder, or load an example portfolio first."
                  : "Your holdings have no money in them. Enter an investment amount in the builder."}
              </p>
              <a href="#portfolio-builder" className={`${buttonClass("primary")} mt-2`}>
                Go to the builder
              </a>
            </NoteBox>
          ) : !result ? (
            <NoteBox title="Complete your target to compare">
              <p>
                The comparison needs a target that adds up to exactly 100%. The tool never changes
                your numbers to make them fit.
              </p>
            </NoteBox>
          ) : method === "contribute" && contribution.error ? (
            <NoteBox tone="problem" title="Check the new contribution">
              <p>{contribution.error}</p>
            </NoteBox>
          ) : (
            <>
              {summary.status === "incomplete" && (
                <NoteBox title="Compared on the allocated part">
                  <p>
                    Only {formatMoney(baseValue, currency)} of your{" "}
                    {formatMoney(summary.investment, currency)} initial investment is allocated, so
                    the percentages below are shares of that {formatMoney(baseValue, currency)}, not
                    of the initial investment. The unallocated{" "}
                    {formatMoney(summary.unallocatedAmount, currency)} is left out.
                  </p>
                </NoteBox>
              )}

              {summary.status === "over" && (
                <NoteBox tone="problem" title="The portfolio is above 100%">
                  <p>
                    The holdings add up to {formatPercent(summary.totalPercent)}. The comparison
                    uses the amounts as entered, and the percentages below are shares of that total.
                  </p>
                </NoteBox>
              )}

              {method === "trade" ? (
                <>
                  <LeadPanel
                    label="Current allocated value"
                    value={formatMoney(result.baseValue, currency)}
                  >
                    <p>
                      This is the base for every percentage. In theory, matching the target would
                      mean{" "}
                      {result.totalToReduce > 0
                        ? `adding ${formatMoney(result.totalToAdd, currency)} to some categories and reducing ${formatMoney(result.totalToReduce, currency)} in others.`
                        : "no changes: the portfolio is already on target."}{" "}
                      These are calculated differences, not trade instructions.
                    </p>
                  </LeadPanel>

                  <FactList
                    facts={[
                      {
                        label: "Total below target (theory)",
                        value: formatMoney(result.totalToAdd, currency),
                        note: "Sum of the gaps in categories below target",
                      },
                      {
                        label: "Total above target (theory)",
                        value: formatMoney(result.totalToReduce, currency),
                        note: "Sum of the excess in categories above target",
                      },
                    ]}
                  />
                </>
              ) : (
                <>
                  <LeadPanel
                    label="Value after the new contribution"
                    value={formatMoney(result.newTotal, currency)}
                  >
                    <p>
                      {formatMoney(result.baseValue, currency)} allocated now plus{" "}
                      {formatMoney(result.contribution, currency)} of new money.
                      {result.contribution <= 0
                        ? " Enter a contribution to see how it could be split."
                        : result.contributionBalances
                          ? " This new money is enough to reach the target without reducing anything."
                          : " Nothing is reduced, so some categories stay above target."}
                    </p>
                  </LeadPanel>

                  <FactList
                    facts={[
                      {
                        label: "New money placed",
                        value: formatMoney(result.contribution, currency),
                        note: "Split across categories below target",
                      },
                      {
                        label: "Still above target",
                        value: formatMoney(result.remainingOverweight, currency),
                        note:
                          result.remainingOverweight > 0
                            ? "New money alone cannot lower this"
                            : "Nothing remains above target",
                      },
                    ]}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {showTables && (
        <>
          <Card>
            <h3 className="font-serif text-h3 font-normal text-ink">
              {method === "trade"
                ? "Current mix compared with your target"
                : "How new money would be split"}
            </h3>

            <div className="mt-5">
              {method === "trade" ? (
                <DataTable
                  caption="Current allocation, target allocation, and the theoretical gap for each category"
                  regionLabel="Rebalancing comparison table"
                  firstColumn="Category"
                  columns={[
                    { label: "Current %", numeric: true },
                    { label: "Target %", numeric: true },
                    { label: "Difference", numeric: true },
                    { label: "Current amount", numeric: true },
                    { label: "Target amount", numeric: true },
                    { label: "Gap to target (theory)", numeric: true },
                  ]}
                  rows={result.rows.map((row) => {
                    const direction = adjustmentDirection(row.adjustment, result.baseValue);

                    return {
                      id: row.category,
                      header: CATEGORY_BY_ID[row.category].label,
                      cells: [
                        formatPercent(row.currentPercent),
                        formatPercent(row.targetPercent),
                        <DeltaPill
                          key="difference"
                          direction={directionOf(row.differencePoints)}
                          text={formatPoints(row.differencePoints)}
                        />,
                        formatMoney(row.currentAmount, currency),
                        formatMoney(row.targetAmount, currency),
                        <span key="gap">
                          <span className="font-semibold">{POSITION_WORD[direction]}</span>
                          {direction !== "none" && <> {formatSignedMoney(row.adjustment, currency)}</>}
                        </span>,
                      ],
                    };
                  })}
                  footer={{
                    header: "Total",
                    cells: [
                      "100%",
                      "100%",
                      "Not applicable",
                      formatMoney(result.baseValue, currency),
                      formatMoney(result.baseValue, currency),
                      "Not applicable",
                    ],
                  }}
                />
              ) : (
                <DataTable
                  caption="How a new contribution would be placed, and what difference from the target remains afterwards"
                  regionLabel="Rebalancing comparison table"
                  firstColumn="Category"
                  columns={[
                    { label: "Current %", numeric: true },
                    { label: "Target %", numeric: true },
                    { label: "Current amount", numeric: true },
                    { label: "Target after new money", numeric: true },
                    { label: "New money", numeric: true },
                    { label: "Amount after", numeric: true },
                    { label: "Remaining difference", numeric: true },
                  ]}
                  rows={result.rows.map((row) => ({
                    id: row.category,
                    header: CATEGORY_BY_ID[row.category].label,
                    cells: [
                      formatPercent(row.currentPercent),
                      formatPercent(row.targetPercent),
                      formatMoney(row.currentAmount, currency),
                      formatMoney(row.postTargetAmount, currency),
                      formatMoney(row.contribution, currency),
                      formatMoney(row.amountAfter, currency),
                      row.remainingAmount === 0 ? (
                        <span key="remaining" className="font-semibold">
                          On target
                        </span>
                      ) : (
                        <span key="remaining">
                          <span className="font-semibold">
                            {row.remainingAmount > 0 ? "Above" : "Below"}
                          </span>{" "}
                          {formatSignedMoney(row.remainingAmount, currency)}
                        </span>
                      ),
                    ],
                  }))}
                  footer={{
                    header: "Total",
                    cells: [
                      "100%",
                      "100%",
                      formatMoney(result.baseValue, currency),
                      formatMoney(result.newTotal, currency),
                      formatMoney(result.contribution, currency),
                      formatMoney(result.newTotal, currency),
                      result.remainingOverweight > 0
                        ? `${formatMoney(result.remainingOverweight, currency)} above`
                        : "Not applicable",
                    ],
                  }}
                />
              )}
            </div>

            <p className="mt-3 text-caption text-ink-muted">
              {method === "trade"
                ? "Difference is in percentage points (pp): current minus target. "
                : "Percentages are shares of the current allocated value. After new money, targets apply to the larger total. "}
              Amounts are rounded for display, so rows may differ slightly from the rounded total.
            </p>
          </Card>

          <Card>
            <h3 className="font-serif text-h4 font-normal text-ink">
              How to read this, and what it leaves out
            </h3>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-note text-ink">
              <li>
                <strong className="font-semibold">The base.</strong> Percentages are shares of the
                money currently allocated to your holdings. If the portfolio is not 100% allocated,
                that is less than your initial investment, and unallocated money is not part of the
                comparison.
              </li>
              <li>
                <strong className="font-semibold">Adjusting existing amounts is theory.</strong> It
                shows the calculated difference between your amounts and the target amounts. It is
                not a list of trades, and Scope never places or connects to orders.
              </li>
              <li>
                <strong className="font-semibold">New money only is different.</strong> New money can
                only be added, so it can move a mix toward the target but cannot lower a category
                that is already above it. That is why something may remain above target. It is not
                the same as reducing some holdings and adding to others.
              </li>
              <li>
                <strong className="font-semibold">Real life adds costs and limits.</strong> Taxes,
                trading fees, minimum trade sizes, trading restrictions, price moves before an order
                is filled, how easily something can be turned into cash, whether fractional shares
                are available, and currency conversion costs are all left out. None of them are
                assumed to be zero. They are simply not modelled, so real results would differ.
              </li>
              <li>
                <strong className="font-semibold">Your target is your own choice.</strong> Scope
                does not suggest a target, and moving toward one does not guarantee a better result.
                Amounts use your display currency ({currency}) without conversion.
              </li>
            </ul>
          </Card>
        </>
      )}
    </PlSection>
  );
}
