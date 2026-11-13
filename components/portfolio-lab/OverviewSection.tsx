"use client";

import Button, { buttonClass } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import { categoryColor } from "@/lib/portfolio-lab/categoryColor";
import { formatMoney, formatPercent } from "@/lib/portfolio-lab/currency";
import type { CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";
import DataTable from "./DataTable";
import PlSection from "./PlSection";

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

  const title =
    summary.holdingCount === 0
      ? "Your portfolio overview"
      : `${formatPercent(summary.totalPercent)} of ${formatMoney(summary.investment, currency)} is allocated across ${summary.holdingCount} ${summary.holdingCount === 1 ? "holding" : "holdings"} in ${summary.allocatedCategoryCount} ${summary.allocatedCategoryCount === 1 ? "category" : "categories"}`;

  const allocatedNote = isOver
    ? `${formatPercent(summary.totalPercent)} of your investment. This is above 100%.`
    : `${formatPercent(summary.totalPercent)} of ${formatMoney(summary.investment, currency)}`;

  const unallocatedNote = isOver
    ? `Over-allocated by ${formatPercent(summary.overPercent)}`
    : summary.status === "empty"
      ? "Nothing allocated yet"
      : `${formatPercent(summary.unallocatedPercent)} of your investment`;

  const kpis = [
    {
      label: "Total allocated investment",
      value: formatMoney(summary.allocatedAmount, currency),
      note: allocatedNote,
    },
    {
      label: "Number of holdings",
      value: String(summary.holdingCount),
      note: `${withAllocation} with an allocation above 0%`,
    },
    {
      label: "Asset categories",
      value: String(summary.allocatedCategoryCount),
      note: "Categories with an allocation above 0%",
    },
    {
      label: "Unallocated amount",
      value: formatMoney(summary.unallocatedAmount, currency),
      note: unallocatedNote,
    },
  ];

  return (
    <PlSection
      id="portfolio-overview"
      titleId="pl-overview-title"
      title={title}
      lead="These numbers come from the same data as the chart above, so they always agree."
      labels={["hypothetical"]}
      source="Source: the holdings, categories and percentages you entered. Amounts are rounded for display, so rounded rows can differ slightly from the rounded total."
    >
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <dt className="text-small text-ink-muted">{kpi.label}</dt>
            <dd className="mt-2 break-words font-serif text-num-m font-semibold text-ink">
              {kpi.value}
            </dd>
            <dd className="mt-2 text-caption text-ink-muted">{kpi.note}</dd>
          </Card>
        ))}
      </dl>

      <Card>
        <h3 className="font-serif text-h3 font-normal text-ink">Holdings</h3>

        {summary.rows.length === 0 ? (
          <div className="mt-5 flex flex-col items-start gap-3">
            <p className="text-note text-ink-muted">
              Not available. Add holdings in the builder and they will appear here.
            </p>
            <a href="#portfolio-builder" className={buttonClass("primary")}>
              Go to the builder
            </a>
          </div>
        ) : (
          <div className="mt-5">
            <DataTable
              caption="Holdings in the hypothetical portfolio, with category, allocation, and amount"
              regionLabel="Holdings table"
              firstColumn="Holding"
              columns={[
                { label: "Category" },
                { label: "Allocation", numeric: true },
                { label: "Amount", numeric: true },
                { label: "Actions", srOnly: true },
              ]}
              rows={summary.rows.map((row) => ({
                id: row.id,
                header: row.displayName,
                cells: [
                  <span key="category" className="inline-flex items-center gap-2">
                    <span
                      className="size-3 shrink-0 rounded-full"
                      style={{ background: categoryColor(row.category) }}
                      aria-hidden="true"
                    />
                    {CATEGORY_BY_ID[row.category].label}
                  </span>,
                  formatPercent(row.percent),
                  formatMoney(row.amount, currency),
                  <span key="actions" className="inline-flex gap-1">
                    <Button
                      variant="quiet"
                      onClick={() => onEdit(row.id)}
                      aria-label={`Edit ${row.displayName}`}
                    >
                      <i className="ti ti-pencil" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      variant="quiet"
                      onClick={() => onRemove(row.id, row.displayName)}
                      aria-label={`Remove ${row.displayName}`}
                    >
                      <i className="ti ti-trash" aria-hidden="true" />
                      Remove
                    </Button>
                  </span>,
                ],
              }))}
              footer={{
                header: "Total",
                cells: [
                  "",
                  formatPercent(summary.totalPercent),
                  formatMoney(summary.allocatedAmount, currency),
                  "",
                ],
              }}
            />
          </div>
        )}
      </Card>

      {summary.categories.length > 0 && (
        <Card>
          <h3 className="font-serif text-h3 font-normal text-ink">By asset category</h3>

          <ul className="mt-5 space-y-4">
            {summary.categories.map((category) => {
              const info = CATEGORY_BY_ID[category.category];

              return (
                <li key={category.category}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-note">
                    <span className="flex items-center gap-2 text-ink">
                      <span
                        className="size-3 shrink-0 rounded-full"
                        style={{ background: categoryColor(category.category) }}
                        aria-hidden="true"
                      />
                      {info.label}
                      <span className="text-caption text-ink-muted">
                        {category.holdingCount}{" "}
                        {category.holdingCount === 1 ? "holding" : "holdings"}
                      </span>
                    </span>
                    <span className="tabular-nums text-ink-muted">
                      <strong className="font-semibold text-ink">
                        {formatPercent(category.percent)}
                      </strong>{" "}
                      {formatMoney(category.amount, currency)}
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-border" aria-hidden="true">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, category.percent)}%`,
                        background: categoryColor(category.category),
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </PlSection>
  );
}
