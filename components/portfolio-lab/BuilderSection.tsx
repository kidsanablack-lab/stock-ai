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
    <li className="pl-bs2-holding">
      <div className="pl-bs2-field pl-bs2-field-main pl-bs2-f-name">
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
          <p className="pl-bs2-hint">Add a name so this holding is easy to spot.</p>
        )}
      </div>

      <div className="pl-bs2-field pl-bs2-f-category">
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

      <div className="pl-bs2-field pl-bs2-f-percent">
        <label htmlFor={percentId}>Allocation</label>
        <div className="pl-bs2-suffix">
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
          <p id={errorId} className="pl-bs2-error">
            {error}
          </p>
        )}
      </div>

      <div className="pl-bs2-field pl-bs2-f-amount">
        <span className="pl-bs2-field-label">Amount</span>
        <p className="pl-bs2-amount">{formatMoney(amount, currency)}</p>
      </div>

      <div className="pl-bs2-field pl-bs2-f-remove">
        <button
          type="button"
          className="pl-bs2-btn pl-bs2-btn-quiet"
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
      className="pl-section pl-bs2"
      aria-labelledby="pl-builder-title"
    >
      <h2 id="pl-builder-title" className="pl-bs2-title" tabIndex={-1}>
        Build a hypothetical portfolio
      </h2>
      <p className="pl-bs2-lead">
        Choose an amount, add holdings, and set how much of the amount goes to
        each one. Everything updates as you type.
      </p>

      <p className="pl-bs2-hypo">
        <i className="ti ti-flask" aria-hidden="true" />
        Hypothetical only. This is an educational planning tool, not investment
        advice, and nothing here is a real holding or price.
      </p>

      <div className="pl-bs2-grid">
        {/* Live snapshot */}
        <aside className="pl-bs2-snapshot" aria-label="Live portfolio snapshot">
          <div className="pl-bs2-band">
            <p className="pl-bs2-band-label">Initial investment</p>
            <p className="pl-bs2-band-value">
              {formatMoney(summary.investment, state.currency)}
            </p>
          </div>

          <div className="pl-bs2-snapshot-body">
          <div
            className={`pl-bs2-status is-${summary.status}`}
            role="status"
            aria-live="polite"
          >
            <i className={`ti ${status.icon}`} aria-hidden="true" />
            <div>
              <p className="pl-bs2-status-title">{status.title}</p>
              <p className="pl-bs2-status-text">{status.text}</p>
            </div>
          </div>

          <div className={`pl-bs2-meter is-${summary.status}`} aria-hidden="true">
            <div className="pl-bs2-meter-fill" style={{ width: `${meterWidth}%` }} />
          </div>

          <DonutChart
            segments={segments}
            status={summary.status}
            totalPercent={summary.totalPercent}
          />
          </div>
        </aside>

        {/* Editor */}
        <div className="pl-bs2-editor">
          {loadedTemplate && (
            <p className="pl-bs2-loaded">
              <i className="ti ti-template" aria-hidden="true" />
              <span>
                Started from the <strong>{loadedTemplate.name}</strong> example
                {templateModified ? " (edited)" : ""}. It is only a starting
                point, so change anything you like.
              </span>
            </p>
          )}

          <div className="pl-bs2-panel">
            <div className="pl-bs2-field">
              <label htmlFor="pl-investment">Initial investment</label>
              <div className="pl-bs2-prefix">
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
                <p id="pl-investment-error" className="pl-bs2-error">
                  {investmentError}
                </p>
              ) : (
                <p id="pl-investment-help" className="pl-bs2-hint">
                  A hypothetical amount to allocate. You do not need a real
                  account.
                </p>
              )}
            </div>

            <fieldset className="pl-bs2-currency">
              <legend>Display currency</legend>

              <div className="pl-bs2-seg-group">
                {CURRENCIES.map((currency) => (
                  <label key={currency.code} className="pl-bs2-seg">
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

              <p className="pl-bs2-hint">
                Display setting only. Amounts are not converted between
                currencies and no exchange rate is used.
              </p>
            </fieldset>
          </div>

          <div className="pl-bs2-panel">
            <div className="pl-bs2-panel-head">
              <h3 className="pl-bs2-h3">Holdings</h3>
              <p className="pl-bs2-total">
                Total allocation <strong>{formatPercent(summary.totalPercent)}</strong>
              </p>
            </div>

            {state.holdings.length === 0 ? (
              <div className="pl-bs2-empty">
                <i className="ti ti-chart-donut-3" aria-hidden="true" />
                <p className="pl-bs2-empty-title">Your portfolio is empty</p>
                <p className="pl-bs2-empty-text">
                  Add a holding to start, or load one of the educational
                  templates above and adjust it.
                </p>
                <div className="pl-bs2-empty-actions">
                  <button
                    type="button"
                    className="pl-bs2-btn pl-bs2-btn-primary"
                    onClick={handleAdd}
                  >
                    <i className="ti ti-plus" aria-hidden="true" />
                    Add a holding
                  </button>
                  <a href="#portfolio-templates" className="pl-bs2-btn pl-bs2-btn-ghost">
                    Browse templates
                  </a>
                </div>
              </div>
            ) : (
              <>
                <ul className="pl-bs2-holdings">
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

                <div className="pl-bs2-actions">
                  <button
                    type="button"
                    className="pl-bs2-btn pl-bs2-btn-primary"
                    onClick={handleAdd}
                  >
                    <i className="ti ti-plus" aria-hidden="true" />
                    Add a holding
                  </button>

                  {confirmReset ? (
                    <span className="pl-bs2-confirm" role="group" aria-label="Confirm reset">
                      <span>
                        Reset everything, including the amount and currency?
                      </span>
                      <button
                        type="button"
                        className="pl-bs2-btn pl-bs2-btn-danger"
                        onClick={handleReset}
                      >
                        Yes, reset
                      </button>
                      <button
                        type="button"
                        className="pl-bs2-btn pl-bs2-btn-ghost"
                        onClick={() => setConfirmReset(false)}
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="pl-bs2-btn pl-bs2-btn-quiet"
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