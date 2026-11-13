import Card from "@/components/ui/Card";
import NoteBox from "@/components/ui/NoteBox";
import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import { categoryColor, toChartRows } from "@/lib/portfolio-lab/categoryColor";
import { CATEGORY_NOTES, NOT_AVAILABLE } from "@/lib/portfolio-lab/categoryNotes";
import { formatMoney, formatPercent } from "@/lib/portfolio-lab/currency";
import type { RiskAnalysis } from "@/lib/portfolio-lab/risk";
import type { CurrencyCode, Observation } from "@/lib/portfolio-lab/types";
import PlSection from "./PlSection";
import Swatch from "./Swatch";

type RiskSectionProps = {
  analysis: RiskAnalysis;
  notes: Observation[];
  currency: CurrencyCode;
};

// Observations are Scope analysis, so they all use the blue note. The tone
// changes the icon and the word, never to a green, amber or red color.
const TONE_ICON: Record<Observation["tone"], string> = {
  info: "ti-info-circle",
  notice: "ti-eye",
  warning: "ti-alert-triangle",
};

const TONE_LABEL: Record<Observation["tone"], string> = {
  info: "Note",
  notice: "Worth noticing",
  warning: "Stands out",
};

// What this tool can work out from names, categories, and percentages.
const CALCULATED = [
  "How completely the money is allocated",
  "How large each holding is, and how evenly the money is spread",
  "How much sits in each asset category",
  "The share in individual stocks, funds, cash, and cryptocurrency",
  "Whether several holdings share a name",
];

function statusDetails(analysis: RiskAnalysis, currency: CurrencyCode) {
  switch (analysis.status) {
    case "empty":
      return {
        tone: "note" as const,
        icon: "ti-info-circle",
        title: "There is nothing to analyze yet",
        text: "Add holdings in the builder or load a template, and this section will describe how your allocation is distributed.",
      };
    case "incomplete":
      return {
        tone: "note" as const,
        icon: "ti-info-circle",
        title: "Not fully allocated",
        text: `${formatPercent(analysis.totalPercent)} of the initial investment is allocated. ${formatPercent(analysis.unallocatedPercent)} (${formatMoney(analysis.unallocatedAmount, currency)}) is not, so everything below describes only the allocated part.`,
      };
    case "over":
      return {
        tone: "problem" as const,
        icon: "ti-alert-triangle",
        title: "Allocated above 100%",
        text: `The holdings add up to ${formatPercent(analysis.totalPercent)}, which is ${formatPercent(analysis.overPercent)} (${formatMoney(analysis.overAmount, currency)}) more than the initial investment. Lower an allocation before reading the results as a complete portfolio.`,
      };
    default:
      return {
        tone: "note" as const,
        icon: "ti-circle-check",
        title: "Fully allocated",
        text: "The holdings add up to 100% of the initial investment.",
      };
  }
}

export default function RiskSection({ analysis, notes, currency }: RiskSectionProps) {
  const status = statusDetails(analysis, currency);
  const hasHoldings = analysis.holdings.length > 0;
  const base = Math.max(analysis.totalPercent, 100);

  const rows = toChartRows(
    analysis.categories,
    analysis.status === "incomplete"
      ? { percent: analysis.unallocatedPercent, amount: analysis.unallocatedAmount }
      : null,
  );

  const stackLabel = rows.map((row) => `${row.label} ${formatPercent(row.percent)}`).join(", ");

  const title =
    hasHoldings && analysis.topHolding
      ? `${analysis.topHolding.name} is the largest holding, at ${formatPercent(analysis.topHolding.percent)} of your investment`
      : "Where your portfolio is concentrated";

  const checks: string[] = [];

  if (analysis.unnamedCount > 0) {
    checks.push(
      `${analysis.unnamedCount} ${analysis.unnamedCount === 1 ? "holding has" : "holdings have"} no name, so ${analysis.unnamedCount === 1 ? "it is" : "they are"} shown as “Unnamed holding”.`,
    );
  }

  if (analysis.zeroAllocationCount > 0) {
    checks.push(
      `${analysis.zeroAllocationCount} ${analysis.zeroAllocationCount === 1 ? "holding has" : "holdings have"} an allocation of 0%, so ${analysis.zeroAllocationCount === 1 ? "it does" : "they do"} not affect these results.`,
    );
  }

  const stats = [
    {
      label: "Largest holding",
      value: formatPercent(analysis.topHolding?.percent ?? 0),
      note: analysis.topHolding?.name,
    },
    {
      label: "Three largest",
      value: formatPercent(analysis.topThreePercent),
      note:
        analysis.holdings.length < 3
          ? `All ${analysis.holdings.length} with an allocation`
          : "Combined",
    },
    {
      label: "Effective holdings",
      value:
        analysis.effectiveHoldings === null
          ? "—"
          : (Math.round(analysis.effectiveHoldings * 10) / 10).toFixed(1),
      note: `of ${analysis.holdings.length} ${analysis.holdings.length === 1 ? "holding" : "holdings"}`,
    },
  ];

  const glance = [
    ["Individual stocks", analysis.individualStockPercent],
    ["Funds (equity and bond ETFs)", analysis.fundPercent],
    ["Cash", analysis.cashPercent],
    ["Cryptocurrency", analysis.cryptoPercent],
  ] as const;

  return (
    <PlSection
      id="risk-diversification"
      titleId="pl-risk-title"
      title={title}
      lead="This analysis uses only the names, categories, and percentages you entered. It describes how your hypothetical allocation is distributed. It is not a risk score, a forecast, or advice, and it does not judge whether the portfolio is right for anyone."
      labels={["hypothetical", "analysis"]}
      source="Source: Scope analysis of the holdings, categories and percentages you entered. No prices, returns or market data are used."
    >
      <NoteBox tone={status.tone} icon={status.icon} title={status.title} role="status">
        <p>{status.text}</p>
      </NoteBox>

      {hasHoldings && (
        <>
          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            {/* Concentration in holdings */}
            <Card>
              <h3 className="font-serif text-h4 font-normal text-ink">
                Concentration in individual holdings
              </h3>

              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <Card inner key={stat.label}>
                    <dt className="text-small text-ink-muted">{stat.label}</dt>
                    <dd className="mt-1 font-serif text-num-s font-semibold text-ink">
                      {stat.value}
                    </dd>
                    <dd className="mt-1 break-words text-caption text-ink-muted">{stat.note}</dd>
                  </Card>
                ))}
              </dl>

              <p className="mt-4 text-small text-ink-muted">
                <strong className="font-semibold text-ink">Effective holdings</strong> shows how
                evenly the money is spread. It equals the number of equal-sized holdings that would
                be about as concentrated. Four equal holdings give 4.0, and one holding gives 1.0.
                It says nothing about how the holdings behave together.
              </p>

              <ol className="mt-5 space-y-4" aria-label="Holdings ranked by size">
                {analysis.holdings.map((holding) => (
                  <li key={holding.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-note">
                      <span className="flex min-w-0 items-center gap-2 text-ink">
                        <span
                          className="size-3 shrink-0 rounded-full"
                          style={{ background: categoryColor(holding.category) }}
                          aria-hidden="true"
                        />
                        <span className="break-words">{holding.name}</span>
                        <span className="text-caption text-ink-muted">
                          {CATEGORY_BY_ID[holding.category].short}
                        </span>
                      </span>
                      <span className="tabular-nums text-ink-muted">
                        <strong className="font-semibold text-ink">
                          {formatPercent(holding.percent)}
                        </strong>{" "}
                        {formatMoney(holding.amount, currency)}
                      </span>
                    </div>

                    <div className="mt-2 h-2 rounded-full bg-border" aria-hidden="true">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, holding.percent)}%`,
                          background: categoryColor(holding.category),
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            {/* Exposure by category */}
            <Card>
              <h3 className="font-serif text-h4 font-normal text-ink">
                Exposure by asset category
              </h3>

              <div
                className="mt-5 flex h-3.5 gap-0.5 overflow-hidden rounded-full"
                role="img"
                aria-label={`Share of the initial investment by category. ${stackLabel}.`}
              >
                {rows.map((row) => (
                  <span
                    key={row.key}
                    className="block min-w-1"
                    style={{
                      width: `${(row.percent / base) * 100}%`,
                      background:
                        row.kind === "unallocated"
                          ? "repeating-linear-gradient(45deg, var(--color-ink-muted) 0 1.5px, var(--color-bg) 1.5px 4px)"
                          : row.color,
                    }}
                  />
                ))}
              </div>

              <ul className="mt-5 space-y-3">
                {rows.map((row) => (
                  <li
                    key={row.key}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-note"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-ink">
                      <Swatch row={row} />
                      <span className="min-w-0">
                        {row.label}
                        <span className="ml-2 text-caption text-ink-muted">
                          {row.members
                            ? row.members.join(", ")
                            : row.kind === "category"
                              ? `${row.holdingCount} ${row.holdingCount === 1 ? "holding" : "holdings"}`
                              : ""}
                        </span>
                      </span>
                    </span>
                    <span className="tabular-nums text-ink-muted">
                      <strong className="font-semibold text-ink">{formatPercent(row.percent)}</strong>{" "}
                      {formatMoney(row.amount, currency)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 grid grid-cols-2 gap-4">
                {glance.map(([label, value]) => (
                  <Card inner key={label}>
                    <dt className="text-small text-ink-muted">{label}</dt>
                    <dd className="mt-1 text-lead font-semibold tabular-nums text-ink">
                      {formatPercent(value)}
                    </dd>
                  </Card>
                ))}
              </dl>

              {analysis.absentCategories.length > 0 && (
                <p className="mt-4 text-small text-ink-muted">
                  No allocation in:{" "}
                  {analysis.absentCategories.map((id) => CATEGORY_BY_ID[id].label).join(", ")}. This
                  is only a description, not a suggestion to add them.
                </p>
              )}
            </Card>
          </div>

          {/* Observations */}
          {notes.length > 0 && (
            <div>
              <h3 className="font-serif text-h3 font-normal text-ink">What stands out</h3>

              <ul className="mt-5 grid gap-4">
                {notes.map((note) => (
                  <li key={note.id}>
                    <NoteBox icon={TONE_ICON[note.tone]}>
                      <p className="text-caption font-semibold uppercase tracking-eyebrow text-primary-ink">
                        {TONE_LABEL[note.tone]}
                      </p>
                      <h4 className="text-body font-semibold">{note.title}</h4>
                      <p>{note.text}</p>
                    </NoteBox>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What each category can mean */}
          <div>
            <h3 className="font-serif text-h3 font-normal text-ink">What your categories can mean</h3>
            <p className="mt-3 max-w-prose text-note text-ink-muted">
              General explanations for the categories in your portfolio. They describe what each one
              is and what can affect it, not how any real asset will perform.
            </p>

            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {analysis.categories.map((row) => {
                const note = CATEGORY_NOTES[row.category];

                return (
                  <Card as="li" key={row.category} inner className="min-w-0 space-y-2 text-note text-ink">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-3 shrink-0 rounded-full"
                        style={{ background: categoryColor(row.category) }}
                        aria-hidden="true"
                      />
                      <h4 className="min-w-0 flex-1 text-body font-semibold">
                        {CATEGORY_BY_ID[row.category].label}
                      </h4>
                      <span className="text-small font-semibold tabular-nums text-ink-muted">
                        {formatPercent(row.percent)}
                      </span>
                    </div>
                    <p>
                      <strong className="font-semibold">What it is:</strong> {note.what}
                    </p>
                    <p>
                      <strong className="font-semibold">What can affect it:</strong> {note.canAffect}
                    </p>
                  </Card>
                );
              })}
            </ul>
          </div>

          {/* Input checks */}
          {checks.length > 0 && (
            <div>
              <h3 className="font-serif text-h3 font-normal text-ink">About your entries</h3>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-note text-ink">
                {checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* What can and cannot be measured */}
      <div className="grid gap-4 lg:grid-cols-5 lg:items-start">
        <Card className="lg:col-span-2">
          <h3 className="font-serif text-h4 font-normal text-ink">What Portfolio Lab can work out</h3>
          <ul className="mt-5 space-y-3">
            {CALCULATED.map((item) => (
              <li key={item} className="flex gap-3 text-note text-ink">
                <i className="ti ti-check mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-3">
          <h3 className="font-serif text-h4 font-normal text-ink">What it cannot tell, and why</h3>
          <ul className="mt-5 space-y-3">
            {NOT_AVAILABLE.map((item) => (
              <li key={item.title} className="flex gap-3 text-note text-ink">
                <i className="ti ti-minus mt-0.5 shrink-0 text-ink-muted" aria-hidden="true" />
                <span>
                  <strong className="font-semibold">{item.title}.</strong> {item.reason}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <NoteBox>
        <p className="font-serif text-h4">
          Holding many assets does not automatically make a portfolio diversified. What matters is
          how different the holdings really are, which depends on what is inside them.
        </p>
      </NoteBox>
    </PlSection>
  );
}
