"use client";

import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import {
  formatMoney,
  formatPercent,
} from "@/lib/portfolio-lab/currency";
import type { CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";

type OverviewSectionProps = {
  summary: PortfolioSummary;
  currency: CurrencyCode;
  onEdit: (id: string) => void;
  onRemove: (id: string, name: string) => void;
};

export default function OverviewSection({
  summary,
  currency,
  onEdit,
  onRemove,
}: OverviewSectionProps) {
  const isOver = summary.status === "over";
  const withAllocation = summary.rows.filter((row) => row.percent > 0).length;

  const allocatedNote = isOver
    ? `${formatPercent(summary.totalPercent)} of your investment. This is above 100%.`
    : `${formatPercent(summary.totalPercent)} of ${formatMoney(summary.investment, currency)}`;

  const unallocatedNote = isOver
    ? `Over-allocated by ${formatPercent(summary.overPercent)}`
    : summary.status === "empty"
      ? "Nothing allocated yet"
      : `${formatPercent(summary.unallocatedPercent)} of your investment`;

  return (
    <section
      id="portfolio-overview"
      className="pl-section pl-ov2"
      aria-labelledby="pl-overview-title"
    >
      <h2 id="pl-overview-title" className="pl-ov2-title">
        See how your money is distributed
      </h2>
      <p className="pl-ov2-lead">
        These numbers and the chart above come from the same data, so they
        always agree.
      </p>

      <div className="pl-ov2-cards">
        <div className={`pl-ov2-card${isOver ? " is-warning" : ""}`}>
          <p className="pl-ov2-card-label">Total allocated investment</p>
          <div className="pl-ov2-card-body">
          <p className="pl-ov2-card-value">
            {formatMoney(summary.allocatedAmount, currency)}
          </p>
          <p className="pl-ov2-card-note">{allocatedNote}</p></div>
        </div>

        <div className="pl-ov2-card">
          <p className="pl-ov2-card-label">Number of holdings</p>
          <div className="pl-ov2-card-body">
          <p className="pl-ov2-card-value">{summary.holdingCount}</p>
          <p className="pl-ov2-card-note">
            {withAllocation} with an allocation above 0%
          </p></div>
        </div>

        <div className="pl-ov2-card">
          <p className="pl-ov2-card-label">Asset categories</p>
          <div className="pl-ov2-card-body">
          <p className="pl-ov2-card-value">{summary.allocatedCategoryCount}</p>
          <p className="pl-ov2-card-note">Categories with an allocation above 0%</p></div>
        </div>

        <div className={`pl-ov2-card${isOver ? " is-warning" : ""}`}>
          <p className="pl-ov2-card-label">Unallocated amount</p>
          <div className="pl-ov2-card-body">
          <p className="pl-ov2-card-value">
            {formatMoney(summary.unallocatedAmount, currency)}
          </p>
          <p className="pl-ov2-card-note">{unallocatedNote}</p></div>
        </div>
      </div>

      {/* Holdings table */}
      <div className="pl-ov2-stack">
      <div className="pl-ov2-panel">
        <h3 className="pl-ov2-h3">Holdings</h3>

        {summary.rows.length === 0 ? (
          <div className="pl-ov2-empty">
            <i className="ti ti-table" aria-hidden="true" />
            <p className="pl-ov2-empty-title">No holdings to show</p>
            <p className="pl-ov2-empty-text">
              Add holdings in the builder and they will appear here.
            </p>
            <a href="#portfolio-builder" className="pl-ov2-btn pl-ov2-btn-primary">
              Go to the builder
            </a>
          </div>
        ) : (
          <>
            <table className="pl-ov2-table">
              <caption className="pl-sr-only">
                Holdings in the hypothetical portfolio, with category,
                allocation, and amount
              </caption>
              <thead>
                <tr>
                  <th scope="col">Holding</th>
                  <th scope="col">Category</th>
                  <th scope="col" className="pl-ov2-num">
                    Allocation
                  </th>
                  <th scope="col" className="pl-ov2-num">
                    Amount
                  </th>
                  <th scope="col">
                    <span className="pl-sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {summary.rows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row" data-label="Holding">
                      {row.displayName}
                    </th>
                    <td data-label="Category">
                      <span className="pl-ov2-cat">
                        <span
                          className="pl-ov2-swatch"
                          style={{ background: CATEGORY_BY_ID[row.category].color }}
                          aria-hidden="true"
                        />
                        {CATEGORY_BY_ID[row.category].label}
                      </span>
                    </td>
                    <td data-label="Allocation" className="pl-ov2-num">
                      {formatPercent(row.percent)}
                    </td>
                    <td data-label="Amount" className="pl-ov2-num">
                      {formatMoney(row.amount, currency)}
                    </td>
                    <td data-label="Actions" className="pl-ov2-row-actions">
                      <button
                        type="button"
                        className="pl-ov2-btn"
                        onClick={() => onEdit(row.id)}
                        aria-label={`Edit ${row.displayName}`}
                      >
                        <i className="ti ti-pencil" aria-hidden="true" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="pl-ov2-btn"
                        onClick={() => onRemove(row.id, row.displayName)}
                        aria-label={`Remove ${row.displayName}`}
                      >
                        <i className="ti ti-trash" aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th scope="row" data-label="Total">
                    Total
                  </th>
                  <td data-label="Category" />
                  <td data-label="Allocation" className="pl-ov2-num">
                    {formatPercent(summary.totalPercent)}
                  </td>
                  <td data-label="Amount" className="pl-ov2-num">
                    {formatMoney(summary.allocatedAmount, currency)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>

            <p className="pl-ov2-footnote">
              Amounts are rounded for display, so rounded rows can differ
              slightly from the rounded total.
            </p>
          </>
        )}
      </div>

      {/* Category breakdown */}
      {summary.categories.length > 0 && (
        <div className="pl-ov2-panel">
          <h3 className="pl-ov2-h3">By asset category</h3>

          <ul className="pl-ov2-cats">
            {summary.categories.map((category) => {
              const info = CATEGORY_BY_ID[category.category];

              return (
                <li key={category.category} className="pl-ov2-cats-item">
                  <div className="pl-ov2-cat-top">
                    <span>
                      <span className="pl-ov2-cat">
                        <span
                          className="pl-ov2-swatch"
                          style={{ background: info.color }}
                          aria-hidden="true"
                        />
                        {info.label}
                      </span>
                      <small>
                        {category.holdingCount}{" "}
                        {category.holdingCount === 1 ? "holding" : "holdings"}
                      </small>
                    </span>
                    <span className="pl-ov2-cat-values">
                      <strong>{formatPercent(category.percent)}</strong>
                      {formatMoney(category.amount, currency)}
                    </span>
                  </div>

                  <div className="pl-ov2-cat-bar" aria-hidden="true">
                    <span
                      style={{
                        width: `${Math.min(100, category.percent)}%`,
                        background: info.color,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      </div>
    </section>
  );
}