"use client";

import { useEffect, useRef, useState, type Dispatch } from "react";
import { CATEGORIES } from "@/lib/portfolio-lab/categories";
import {
  CURRENCIES,
  formatMoney,
  formatPercent,
} from "@/lib/portfolio-lab/currency";
import {
  createBlankHolding,
  type LabAction,
  type LabState,
} from "@/lib/portfolio-lab/state";
import type {
  CategoryId,
  ChartSegment,
  HoldingDraft,
  PortfolioSummary,
  PortfolioTemplate,
} from "@/lib/portfolio-lab/types";
import DonutChart from "./DonutChart";

type BuilderSectionProps = {
  state: LabState;
  dispatch: Dispatch<LabAction>;
  investmentError: string | null;
  holdingErrors: Record<string, string | null>;
  summary: PortfolioSummary;
  segments: ChartSegment[];
  loadedTemplate: PortfolioTemplate | null;
  templateModified: boolean;
  focusId: string | null;
  onFocused: () => void;
  onRequestFocus: (id: string) => void;
  onAnnounce: (message: string) => void;
};

/* ---------- Allocation status text (shared by the meter and the message) ---------- */

function statusContent(
  summary: PortfolioSummary,
  currency: LabState["currency"],
) {
  switch (summary.status) {
    case "empty":
      return {
        icon: "ti-info-circle",
        title: "No holdings yet",
        text: "Add a holding or load a template to start.",
      };
    case "incomplete":
      return {
        icon: "ti-alert-circle",
        title: "Not fully allocated",
        text: `${formatPercent(summary.totalPercent)} is allocated. ${formatPercent(summary.unallocatedPercent)} (${formatMoney(summary.unallocatedAmount, currency)}) is unallocated.`,
      };
    case "over":
      return {
        icon: "ti-alert-triangle",
        title: "Over-allocated",
        text: `The total is ${formatPercent(summary.totalPercent)}, which is ${formatPercent(summary.overPercent)} (${formatMoney(summary.overAmount, currency)}) more than your investment. Lower an allocation to fix this.`,
      };
    default:
      return {
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

  const nameId = `name-${holding.id}`;
  const categoryId = `category-${holding.id}`;
  const percentId = `percent-${holding.id}`;
  const errorId = `percent-error-${holding.id}`;

  return (
    <li className="pl-holding">
      <div className="pl-field pl-field-name">
        <label htmlFor={nameId}>Name</label>
        <input
          ref={nameRef}
          id={nameId}
          type="text"
          value={holding.name}
          maxLength={60}
          autoComplete="off"
          onChange={(event) =>
            dispatch({
              type: "updateHolding",
              id: holding.id,
              patch: { name: event.target.value },
            })
          }
        />
        {holding.name.trim() === "" && (
          <p className="pl-hint">Add a name so this holding is easy to spot.</p>
        )}
      </div>

      <div className="pl-field pl-field-category">
        <label htmlFor={categoryId}>Category</label>
        <select
          id={categoryId}
          value={holding.category}
          onChange={(event) =>
            dispatch({
              type: "updateHolding",
              id: holding.id,
              patch: { category: event.target.value as CategoryId },
            })
          }
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pl-field pl-field-percent">
        <label htmlFor={percentId}>Allocation</label>
        <div className="pl-input-suffix">
          <input
            id={percentId}
            type="text"
            inputMode="decimal"
            value={holding.percentInput}
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) =>
              dispatch({
                type: "updateHolding",
                id: holding.id,
                patch: { percentInput: event.target.value },
              })
            }
          />
          <span aria-hidden="true">%</span>
        </div>
        {error && (
          <p id={errorId} className="pl-error">
            {error}
          </p>
        )}
      </div>

      <div className="pl-field pl-field-amount">
        <span className="pl-field-label">Amount</span>
        <p className="pl-amount">{formatMoney(amount, currency)}</p>
      </div>

      <div className="pl-field pl-field-remove">
        <button
          type="button"
          className="pl-btn pl-btn-quiet"
          onClick={() => onRemove(holding)}
          aria-label={`Remove ${label}`}
        >
          <i className="ti ti-trash" aria-hidden="true" />
          <span>Remove</span>
        </button>
      </div>
    </li>
  );
}

/* ---------- Section ---------- */

export default function BuilderSection({
  state,
  dispatch,
  investmentError,
  holdingErrors,
  summary,
  segments,
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
    <section
      id="portfolio-builder"
      className="pl-section"
      aria-labelledby="pl-builder-title"
    >
      <p className="pl-eyebrow">Portfolio Builder</p>
      <h2 id="pl-builder-title" className="pl-h2" tabIndex={-1}>
        Build a hypothetical portfolio
      </h2>
      <p className="pl-lead">
        Choose an amount, add holdings, and set how much of the amount goes to
        each one. Everything updates as you type.
      </p>

      <p className="pl-hypo">
        <i className="ti ti-flask" aria-hidden="true" />
        Hypothetical only. This is an educational planning tool, not investment
        advice, and nothing here is a real holding or price.
      </p>

      <div className="pl-builder-grid">
        {/* Live snapshot */}
        <aside className="pl-snapshot" aria-label="Live portfolio snapshot">
          <p className="pl-snapshot-label">Initial investment</p>
          <p className="pl-snapshot-value">
            {formatMoney(summary.investment, state.currency)}
          </p>

          <div
            className={`pl-status is-${summary.status}`}
            role="status"
            aria-live="polite"
          >
            <i className={`ti ${status.icon}`} aria-hidden="true" />
            <div>
              <p className="pl-status-title">{status.title}</p>
              <p className="pl-status-text">{status.text}</p>
            </div>
          </div>

          <div className={`pl-meter is-${summary.status}`} aria-hidden="true">
            <div className="pl-meter-fill" style={{ width: `${meterWidth}%` }} />
          </div>

          <DonutChart
            segments={segments}
            status={summary.status}
            totalPercent={summary.totalPercent}
          />
        </aside>

        {/* Editor */}
        <div className="pl-editor">
          {loadedTemplate && (
            <p className="pl-loaded">
              <i className="ti ti-template" aria-hidden="true" />
              <span>
                Started from the <strong>{loadedTemplate.name}</strong> example
                {templateModified ? " (edited)" : ""}. It is only a starting
                point, so change anything you like.
              </span>
            </p>
          )}

          <div className="pl-panel">
            <div className="pl-field">
              <label htmlFor="pl-investment">Initial investment</label>
              <div className="pl-input-prefix">
                <span aria-hidden="true">
                  {CURRENCIES.find((c) => c.code === state.currency)?.symbol}
                </span>
                <input
                  id="pl-investment"
                  type="text"
                  inputMode="decimal"
                  value={state.investmentInput}
                  autoComplete="off"
                  aria-invalid={investmentError ? true : undefined}
                  aria-describedby={
                    investmentError ? "pl-investment-error" : "pl-investment-help"
                  }
                  onChange={(event) =>
                    dispatch({ type: "setInvestment", value: event.target.value })
                  }
                />
              </div>

              {investmentError ? (
                <p id="pl-investment-error" className="pl-error">
                  {investmentError}
                </p>
              ) : (
                <p id="pl-investment-help" className="pl-hint">
                  A hypothetical amount to allocate. You do not need a real
                  account.
                </p>
              )}
            </div>

            <fieldset className="pl-currency">
              <legend>Display currency</legend>

              <div className="pl-segmented">
                {CURRENCIES.map((currency) => (
                  <label key={currency.code} className="pl-segment">
                    <input
                      type="radio"
                      name="pl-currency"
                      value={currency.code}
                      checked={state.currency === currency.code}
                      onChange={() =>
                        dispatch({ type: "setCurrency", currency: currency.code })
                      }
                    />
                    <span>
                      {currency.code}
                      <small>{currency.label}</small>
                    </span>
                  </label>
                ))}
              </div>

              <p className="pl-hint">
                Display setting only. Amounts are not converted between
                currencies and no exchange rate is used.
              </p>
            </fieldset>
          </div>

          <div className="pl-panel">
            <div className="pl-panel-head">
              <h3 className="pl-h3">Holdings</h3>
              <p className="pl-total">
                Total allocation <strong>{formatPercent(summary.totalPercent)}</strong>
              </p>
            </div>

            {state.holdings.length === 0 ? (
              <div className="pl-empty">
                <i className="ti ti-chart-donut-3" aria-hidden="true" />
                <p className="pl-empty-title">Your portfolio is empty</p>
                <p className="pl-empty-text">
                  Add a holding to start, or load one of the educational
                  templates above and adjust it.
                </p>
                <div className="pl-empty-actions">
                  <button
                    type="button"
                    className="pl-btn pl-btn-primary"
                    onClick={handleAdd}
                  >
                    <i className="ti ti-plus" aria-hidden="true" />
                    Add a holding
                  </button>
                  <a href="#portfolio-templates" className="pl-btn pl-btn-ghost">
                    Browse templates
                  </a>
                </div>
              </div>
            ) : (
              <>
                <ul className="pl-holdings">
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

                <div className="pl-actions">
                  <button
                    type="button"
                    className="pl-btn pl-btn-primary"
                    onClick={handleAdd}
                  >
                    <i className="ti ti-plus" aria-hidden="true" />
                    Add a holding
                  </button>

                  {confirmReset ? (
                    <span className="pl-confirm" role="group" aria-label="Confirm reset">
                      <span>
                        Reset everything, including the amount and currency?
                      </span>
                      <button
                        type="button"
                        className="pl-btn pl-btn-danger"
                        onClick={handleReset}
                      >
                        Yes, reset
                      </button>
                      <button
                        type="button"
                        className="pl-btn pl-btn-ghost"
                        onClick={() => setConfirmReset(false)}
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="pl-btn pl-btn-quiet"
                      onClick={() => setConfirmReset(true)}
                    >
                      <i className="ti ti-restore" aria-hidden="true" />
                      Reset portfolio
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
