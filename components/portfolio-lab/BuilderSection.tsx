"use client";

import { useEffect, useRef, useState, type Dispatch } from "react";
import Button, { buttonClass } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import NoteBox from "@/components/ui/NoteBox";
import { CATEGORIES } from "@/lib/portfolio-lab/categories";
import { CURRENCIES, formatMoney, formatPercent } from "@/lib/portfolio-lab/currency";
import { createBlankHolding, type LabAction, type LabState } from "@/lib/portfolio-lab/state";
import type {
  CategoryId,
  HoldingDraft,
  PortfolioSummary,
  PortfolioTemplate,
} from "@/lib/portfolio-lab/types";
import DonutChart from "./DonutChart";
import LeadPanel from "./LeadPanel";
import NumberField from "./NumberField";
import PlSection from "./PlSection";
import Segmented from "./Segmented";
import SelectField from "./SelectField";
import TextField from "./TextField";

type BuilderSectionProps = {
  state: LabState;
  dispatch: Dispatch<LabAction>;
  investmentError: string | null;
  holdingErrors: Record<string, string | null>;
  summary: PortfolioSummary;
  loadedTemplate: PortfolioTemplate | null;
  templateModified: boolean;
  focusId: string | null;
  onFocused: () => void;
  onRequestFocus: (id: string) => void;
  onAnnounce: (message: string) => void;
};

/* ---------- Allocation status (one message, one meter) ---------- */

function statusContent(summary: PortfolioSummary, currency: LabState["currency"]) {
  switch (summary.status) {
    case "empty":
      return {
        tone: "note" as const,
        icon: "ti-info-circle",
        title: "No holdings yet",
        text: "Add a holding or load a template to start.",
      };
    case "incomplete":
      return {
        tone: "note" as const,
        icon: "ti-info-circle",
        title: "Not fully allocated",
        text: `${formatPercent(summary.totalPercent)} is allocated. ${formatPercent(summary.unallocatedPercent)} (${formatMoney(summary.unallocatedAmount, currency)}) is unallocated.`,
      };
    case "over":
      return {
        tone: "problem" as const,
        icon: "ti-alert-triangle",
        title: "Over-allocated",
        text: `The total is ${formatPercent(summary.totalPercent)}, which is ${formatPercent(summary.overPercent)} (${formatMoney(summary.overAmount, currency)}) more than your investment. Lower an allocation to fix this.`,
      };
    default:
      return {
        tone: "note" as const,
        icon: "ti-circle-check",
        title: "Fully allocated",
        text: `The holdings add up to 100% of ${formatMoney(summary.investment, currency)}.`,
      };
  }
}

/* ---------- One holding row ---------- */

type HoldingRowProps = {
  holding: HoldingDraft;
  error: string | null;
  amount: number;
  currency: LabState["currency"];
  dispatch: Dispatch<LabAction>;
  focusId: string | null;
  onFocused: () => void;
  onRemove: (holding: HoldingDraft) => void;
};

function HoldingRow({
  holding,
  error,
  amount,
  currency,
  dispatch,
  focusId,
  onFocused,
  onRemove,
}: HoldingRowProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const label = holding.name.trim() || "Unnamed holding";

  useEffect(() => {
    if (focusId === holding.id) {
      nameRef.current?.focus();
      nameRef.current?.select();
      onFocused();
    }
  }, [focusId, holding.id, onFocused]);

  const update = (patch: Partial<HoldingDraft>) =>
    dispatch({ type: "updateHolding", id: holding.id, patch });

  return (
    <Card as="li" inner className="grid gap-4 sm:grid-cols-2">
      <TextField
        id={`name-${holding.id}`}
        label="Name"
        value={holding.name}
        maxLength={60}
        inputRef={nameRef}
        hint={holding.name.trim() === "" ? "Add a name so this holding is easy to spot." : undefined}
        onChange={(name) => update({ name })}
      />

      <SelectField
        id={`category-${holding.id}`}
        label="Category"
        value={holding.category}
        options={CATEGORIES.map((category) => ({ value: category.id, label: category.label }))}
        onChange={(value) => update({ category: value as CategoryId })}
      />

      <NumberField
        id={`percent-${holding.id}`}
        label="Allocation"
        value={holding.percentInput}
        error={error}
        suffix="%"
        onChange={(percentInput) => update({ percentInput })}
      />

      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-small font-semibold text-ink">Amount</span>
        <p className="flex min-h-10 items-center break-words text-body font-semibold tabular-nums text-ink">
          {formatMoney(amount, currency)}
        </p>
      </div>

      <div className="flex justify-end sm:col-span-2">
        <Button variant="quiet" onClick={() => onRemove(holding)} aria-label={`Remove ${label}`}>
          <i className="ti ti-trash" aria-hidden="true" />
          Remove
        </Button>
      </div>
    </Card>
  );
}

/* ---------- Section ---------- */

export default function BuilderSection({
  state,
  dispatch,
  investmentError,
  holdingErrors,
  summary,
  loadedTemplate,
  templateModified,
  focusId,
  onFocused,
  onRequestFocus,
  onAnnounce,
}: BuilderSectionProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const status = statusContent(summary, state.currency);
  const meterWidth = Math.min(100, Math.max(0, summary.totalPercent));
  const amountById = new Map(summary.rows.map((row) => [row.id, row.amount]));
  const symbol = CURRENCIES.find((currency) => currency.code === state.currency)?.symbol;

  function handleAdd() {
    const holding = createBlankHolding();
    dispatch({ type: "addHolding", holding });
    onRequestFocus(holding.id);
    onAnnounce("Added a new holding.");
  }

  function handleRemove(holding: HoldingDraft) {
    dispatch({ type: "removeHolding", id: holding.id });
    onAnnounce(`Removed ${holding.name.trim() || "holding"}.`);
  }

  function handleReset() {
    dispatch({ type: "reset" });
    setConfirmReset(false);
    onAnnounce("Portfolio reset to the defaults.");
  }

  return (
    <PlSection
      id="portfolio-builder"
      titleId="pl-builder-title"
      title="Build a hypothetical portfolio"
      lead="Choose an amount, add holdings, and set how much of the amount goes to each one. Everything updates as you type. Nothing here is a real holding or price."
      labels={["hypothetical"]}
      source="Source: the amount, holdings, categories and percentages you enter. No prices or market data are used. Hypothetical example, not investment advice."
    >
      <div className="space-y-4">
        <LeadPanel label="Initial investment" value={formatMoney(summary.investment, state.currency)}>
          <div>
            <div className="h-2 rounded-full bg-white/25" aria-hidden="true">
              <div className="h-full rounded-full bg-white" style={{ width: `${meterWidth}%` }} />
            </div>
            <p className="mt-2">{formatPercent(summary.totalPercent)} of 100% allocated</p>
          </div>
        </LeadPanel>

        <NoteBox tone={status.tone} icon={status.icon} title={status.title} role="status">
          <p>{status.text}</p>
        </NoteBox>
      </div>

      <div className="grid gap-4 lg:grid-cols-5 lg:items-start">
        {/* Editor */}
        <div className="space-y-4 lg:col-span-3">
          {loadedTemplate && (
            <NoteBox icon="ti-template">
              <p>
                Started from the <strong className="font-semibold">{loadedTemplate.name}</strong>{" "}
                example{templateModified ? " (edited)" : ""}. It is only a starting point, so
                change anything you like.
              </p>
            </NoteBox>
          )}

          <Card>
            <NumberField
              id="pl-investment"
              label="Initial investment"
              value={state.investmentInput}
              onChange={(value) => dispatch({ type: "setInvestment", value })}
              error={investmentError}
              hint="A hypothetical amount to allocate. You do not need a real account."
              prefix={symbol}
            />

            <div className="mt-5">
              <Segmented
                legend="Display currency"
                name="pl-currency"
                value={state.currency}
                options={CURRENCIES.map((currency) => ({
                  value: currency.code,
                  title: currency.code,
                  note: currency.label,
                }))}
                onChange={(code) => dispatch({ type: "setCurrency", currency: code })}
                hint="Display setting only. Amounts are not converted between currencies and no exchange rate is used."
              />
            </div>
          </Card>

          <Card>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-h4 font-normal text-ink">Holdings</h3>
              <p className="text-small text-ink-muted">
                Total allocation{" "}
                <strong className="text-note font-semibold tabular-nums text-ink">
                  {formatPercent(summary.totalPercent)}
                </strong>
              </p>
            </div>

            {state.holdings.length === 0 ? (
              <div className="mt-5 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-8 text-center">
                <i className="ti ti-chart-donut-3 text-3xl text-ink-muted" aria-hidden="true" />
                <p className="text-body font-semibold text-ink">Your portfolio is empty</p>
                <p className="max-w-sm text-note text-ink-muted">
                  Add a holding to start, or load one of the educational templates above and adjust
                  it.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  <Button onClick={handleAdd}>
                    <i className="ti ti-plus" aria-hidden="true" />
                    Add a holding
                  </Button>
                  <a href="#portfolio-templates" className={buttonClass("secondary")}>
                    Browse templates
                  </a>
                </div>
              </div>
            ) : (
              <>
                <ul className="mt-5 space-y-4">
                  {state.holdings.map((holding) => (
                    <HoldingRow
                      key={holding.id}
                      holding={holding}
                      error={holdingErrors[holding.id] ?? null}
                      amount={amountById.get(holding.id) ?? 0}
                      currency={state.currency}
                      dispatch={dispatch}
                      focusId={focusId}
                      onFocused={onFocused}
                      onRemove={handleRemove}
                    />
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                  <Button onClick={handleAdd}>
                    <i className="ti ti-plus" aria-hidden="true" />
                    Add a holding
                  </Button>

                  {confirmReset ? (
                    <span
                      className="flex flex-wrap items-center gap-2 text-note text-ink"
                      role="group"
                      aria-label="Confirm reset"
                    >
                      Reset everything, including the amount and currency?
                      <Button onClick={handleReset}>Yes, reset</Button>
                      <Button variant="secondary" onClick={() => setConfirmReset(false)}>
                        Cancel
                      </Button>
                    </span>
                  ) : (
                    <Button variant="quiet" onClick={() => setConfirmReset(true)}>
                      <i className="ti ti-restore" aria-hidden="true" />
                      Reset portfolio
                    </Button>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>

        {/* Live chart */}
        <Card className="lg:sticky lg:top-24 lg:col-span-2">
          <DonutChart summary={summary} />
        </Card>
      </div>
    </PlSection>
  );
}
