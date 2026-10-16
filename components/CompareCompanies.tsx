"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CompanyProfile, FinancialValue } from "@/types/company";
import "./CompareCompanies.css";

type CompareCompany = {
  slug: string;
  company: CompanyProfile;
};

type Props = {
  companies: CompareCompany[];
};

type MetricKey = "revenue" | "growth" | "netIncome" | "freeCashFlow";

const METRICS: {
  key: MetricKey;
  label: string;
  description: string;
}[] = [
  {
    key: "revenue",
    label: "Revenue",
    description: "Total revenue reported for the fiscal year.",
  },
  {
    key: "growth",
    label: "Revenue Growth",
    description: "Year-over-year change in revenue.",
  },
  {
    key: "netIncome",
    label: "Net Income",
    description: "Profit remaining after expenses and taxes.",
  },
  {
    key: "freeCashFlow",
    label: "Free Cash Flow",
    description: "Cash available after capital expenditures.",
  },
];

function formatFinancialValue(value: FinancialValue | undefined): string {
  if (!value || !Number.isFinite(value.value)) return "N/A";

  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value.value);

  return `$${formatted}${value.unit}`;
}

function formatPercentage(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "N/A";

  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    signDisplay: "always",
  }).format(value);

  return `${formatted}%`;
}

function getMetricValue(
  company: CompanyProfile,
  key: MetricKey,
): string {
  if (key === "revenue") {
    return formatFinancialValue(company.overview?.revenue);
  }

  if (key === "growth") {
    return formatPercentage(company.overview?.revenueYoY?.value);
  }

  const targetLabel =
    key === "netIncome" ? "net income" : "free cash flow";

  const metric = company.financialOverview?.metrics?.find(
    (item) => item.label.trim().toLowerCase() === targetLabel,
  );

  return formatFinancialValue(metric?.value);
}

function getFiscalYear(
  company: CompanyProfile,
  key: MetricKey,
): string {
  if (key === "revenue" || key === "growth") {
    return company.overview?.revenueFiscalYear || "Fiscal year not available";
  }

  return company.financialOverview?.fiscalYearLabel || "Fiscal year not available";
}

/* Visual-only helper: raw number + unit so the table can draw proportional bars. */
function getMetricRaw(
  company: CompanyProfile,
  key: MetricKey,
): { value: number; unit: string } | undefined {
  let raw: { value: number; unit: string } | undefined;

  if (key === "revenue") {
    const v = company.overview?.revenue;
    if (v) raw = { value: v.value, unit: v.unit };
  } else if (key === "growth") {
    const v = company.overview?.revenueYoY?.value;
    if (typeof v === "number") raw = { value: v, unit: "%" };
  } else {
    const targetLabel =
      key === "netIncome" ? "net income" : "free cash flow";
    const metric = company.financialOverview?.metrics?.find(
      (item) => item.label.trim().toLowerCase() === targetLabel,
    );
    if (metric?.value) {
      raw = { value: metric.value.value, unit: metric.value.unit };
    }
  }

  if (!raw || !Number.isFinite(raw.value)) return undefined;
  return raw;
}

function CompanySelector({
  label,
  tone,
  companies,
  selectedSlug,
  excludedSlug,
  onSelect,
}: {
  label: string;
  tone: "a" | "b";
  companies: CompareCompany[];
  selectedSlug: string;
  excludedSlug: string;
  onSelect: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");

  const selected = companies.find((item) => item.slug === selectedSlug);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return companies.filter(({ slug, company }) => {
      if (slug === excludedSlug) return false;
      if (!normalized) return true;

      return [
        company.identity.name,
        company.identity.brandName ?? "",
        company.identity.ticker,
        slug,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [companies, excludedSlug, query]);

  return (
    <div className={`compare-selector compare-tone-${tone}`}>
      <label className="compare-label">
        <span className="compare-dot" aria-hidden="true" />
        {label}
      </label>

      {selected && (
        <div className="compare-company-card">
          <span className="compare-company-monogram">
            {selected.company.identity.logoInitial}
          </span>
          <div className="compare-company-info">
            <h2>
              {selected.company.identity.brandName ??
                selected.company.identity.name}
            </h2>
            <p>
              <span className="compare-ticker-chip">
                {selected.company.identity.ticker}
              </span>
              <span>{selected.company.identity.industry}</span>
            </p>
          </div>
        </div>
      )}

      <div className="compare-search-wrap">
        <input
          className="compare-search"
          type="search"
          value={query}
          placeholder={
            selected
              ? `Change company · ${selected.company.identity.ticker}`
              : "Search company or ticker..."
          }
          aria-label={`Search ${label.toLowerCase()}`}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />

        {query.trim() && (
          <div className="compare-options">
            {filtered.length > 0 ? (
              filtered.slice(0, 8).map(({ slug, company }) => (
                <button
                  type="button"
                  className="compare-option"
                  key={slug}
                  onClick={() => {
                    onSelect(slug);
                    setQuery("");
                  }}
                >
                  <span>
                    <strong>{company.identity.brandName ?? company.identity.name}</strong>
                    <small>{company.identity.industry}</small>
                  </span>
                  <span className="compare-option-ticker">
                    {company.identity.ticker}
                  </span>
                </button>
              ))
            ) : (
              <p className="compare-no-results">No companies found.</p>
            )}
          </div>
        )}
      </div>

      {selected && (
        <Link
          href={`/company/${selected.slug}`}
          className="compare-company-link"
        >
          View profile <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}

export default function CompareCompanies({ companies }: Props) {
  const sortedCompanies = useMemo(
    () =>
      [...companies].sort((a, b) =>
        (a.company.identity.brandName ?? a.company.identity.name).localeCompare(
          b.company.identity.brandName ?? b.company.identity.name,
        ),
      ),
    [companies],
  );

  const initialLeft =
    sortedCompanies.find((item) => item.slug === "apple")?.slug ??
    sortedCompanies[0]?.slug ??
    "";

  const initialRight =
    sortedCompanies.find((item) => item.slug === "nvidia")?.slug ??
    sortedCompanies.find((item) => item.slug !== initialLeft)?.slug ??
    "";

  const [leftSlug, setLeftSlug] = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRight);

  const left = sortedCompanies.find((item) => item.slug === leftSlug);
  const right = sortedCompanies.find((item) => item.slug === rightSlug);

  const differences = useMemo(() => {
    if (!left || !right) return [];

    return [
      {
        label: "Revenue",
        left: left.company.overview?.revenue?.value,
        right: right.company.overview?.revenue?.value,
        unit: left.company.overview?.revenue?.unit,
      },
      {
        label: "Revenue Growth",
        left: left.company.overview?.revenueYoY?.value,
        right: right.company.overview?.revenueYoY?.value,
        unit: "%",
      },
    ];
  }, [left, right]);

  if (sortedCompanies.length < 2) {
    return (
      <main className="compare-page">
        <p>At least two companies are required to compare.</p>
      </main>
    );
  }

  return (
    <main className="compare-page">

      <header>
        <p className="compare-eyebrow">Scope · Company Research</p>
        <h1 className="compare-heading">
          Two companies.
          <br />
          <em>A clearer perspective.</em>
        </h1>
        <p className="compare-intro">
          Explore how two businesses differ in scale, growth, profitability,
          and cash generation. Use the numbers as a starting point for
          understanding each business—not as a verdict on which is better.
        </p>
      </header>

      <section className="compare-selectors" aria-label="Choose companies">
        <span className="compare-vs" aria-hidden="true">
          vs
        </span>
        <CompanySelector
          label="Company A"
          tone="a"
          companies={sortedCompanies}
          selectedSlug={leftSlug}
          excludedSlug={rightSlug}
          onSelect={setLeftSlug}
        />
        <CompanySelector
          label="Company B"
          tone="b"
          companies={sortedCompanies}
          selectedSlug={rightSlug}
          excludedSlug={leftSlug}
          onSelect={setRightSlug}
        />
      </section>

      {left && right && (
        <>
          <section className="compare-section">
            <div className="compare-section-heading">
              <div>
                <h2>Financial comparison</h2>
                <p>Reported figures from Scope company profiles.</p>
              </div>
            </div>

            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">Metric</th>
                    <th scope="col" className="compare-th-a">
                      <span className="compare-th-inner">
                        <span className="compare-th-dot" aria-hidden="true" />
                        {left.company.identity.brandName ?? left.company.identity.name}
                      </span>
                    </th>
                    <th scope="col" className="compare-th-b">
                      <span className="compare-th-inner">
                        <span className="compare-th-dot" aria-hidden="true" />
                        {right.company.identity.brandName ?? right.company.identity.name}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map((metric) => {
                    const leftRaw = getMetricRaw(left.company, metric.key);
                    const rightRaw = getMetricRaw(right.company, metric.key);

                    // Bars only when both values share the same unit, so widths are honest.
                    const comparable =
                      !!leftRaw && !!rightRaw && leftRaw.unit === rightRaw.unit;
                    const maxAbs = comparable
                      ? Math.max(Math.abs(leftRaw!.value), Math.abs(rightRaw!.value))
                      : 0;

                    const barWidth = (raw: { value: number } | undefined) =>
                      comparable && maxAbs > 0 && raw
                        ? `${(Math.abs(raw.value) / maxAbs) * 100}%`
                        : "0%";

                    const leader =
                      comparable && leftRaw!.value !== rightRaw!.value
                        ? leftRaw!.value > rightRaw!.value
                          ? "a"
                          : "b"
                        : null;

                    return (
                      <tr key={metric.key}>
                        <td>
                          <span className="compare-metric-name">{metric.label}</span>
                          <span className="compare-metric-description">
                            {metric.description}
                          </span>
                        </td>
                        <td>
                          <span className="compare-value">
                            {getMetricValue(left.company, metric.key)}
                            {leader === "a" && (
                              <span className="compare-leading-badge">Higher</span>
                            )}
                          </span>
                          {comparable && (
                            <span className="compare-bar" aria-hidden="true">
                              <span
                                className={`compare-bar-fill compare-bar-a${
                                  leftRaw!.value < 0 ? " compare-bar-negative" : ""
                                }`}
                                style={{ display: "block", width: barWidth(leftRaw) }}
                              />
                            </span>
                          )}
                          <span className="compare-year">
                            {getFiscalYear(left.company, metric.key)}
                          </span>
                        </td>
                        <td>
                          <span className="compare-value">
                            {getMetricValue(right.company, metric.key)}
                            {leader === "b" && (
                              <span className="compare-leading-badge">Higher</span>
                            )}
                          </span>
                          {comparable && (
                            <span className="compare-bar" aria-hidden="true">
                              <span
                                className={`compare-bar-fill compare-bar-b${
                                  rightRaw!.value < 0 ? " compare-bar-negative" : ""
                                }`}
                                style={{ display: "block", width: barWidth(rightRaw) }}
                              />
                            </span>
                          )}
                          <span className="compare-year">
                            {getFiscalYear(right.company, metric.key)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="compare-section">
            <div className="compare-section-heading">
              <div>
                <h2>Key differences</h2>
                <p>A neutral summary of selected reported figures.</p>
              </div>
            </div>

            <div className="compare-insight">
              <h3>What stands out</h3>
              {differences.some(
                (item) =>
                  typeof item.left === "number" &&
                  Number.isFinite(item.left) &&
                  typeof item.right === "number" &&
                  Number.isFinite(item.right),
              ) ? (
                <p>
                  {differences
                    .filter(
                      (item) =>
                        typeof item.left === "number" &&
                        Number.isFinite(item.left) &&
                        typeof item.right === "number" &&
                        Number.isFinite(item.right),
                    )
                    .map((item) => {
                      if (item.left === item.right) {
                        return `Both companies report the same ${item.label.toLowerCase()} figure.`;
                      }

                      const larger =
                        item.left! > item.right!
                          ? left.company.identity.brandName ?? left.company.identity.name
                          : right.company.identity.brandName ?? right.company.identity.name;

                      return `${larger} reports the higher ${item.label.toLowerCase()} figure.`;
                    })
                    .join(" ")}{" "}
                  These figures describe different aspects of each business and
                  do not, by themselves, determine which company is better.
                </p>
              ) : (
                <p>
                  There is not enough comparable numerical data to summarize
                  the differences. Review each company profile for more context.
                </p>
              )}
            </div>

            <p className="compare-footnote">
              Note: Fiscal years may differ between companies. Financial values
              use the units provided in Scope. Free cash flow may be negative,
              and its interpretation varies by business and industry. This page
              is for educational purposes only and is not investment advice.
            </p>
          </section>
        </>
      )}
    </main>
  );
}