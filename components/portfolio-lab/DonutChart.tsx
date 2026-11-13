"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { formatPercent } from "@/lib/portfolio-lab/currency";
import { toChartRows, type ChartRow } from "@/lib/portfolio-lab/categoryColor";
import type { PortfolioSummary } from "@/lib/portfolio-lab/types";
import { HowToRead } from "@/components/ui/Notes";
import Swatch from "./Swatch";

type DonutChartProps = {
  summary: PortfolioSummary;
};

const RADIUS = 15.9155; // circumference = 100, so lengths are in percent
const GAP = 0.8;

function rowDetail(row: ChartRow) {
  return row.members ? row.members.join(", ") : null;
}

/**
 * Allocation by category (DESIGN.md sections 2 and 5). Up to four parts: an
 * interactive donut whose legend rows are real buttons. More than four parts:
 * a plain list with a bar for each row, because a donut is not used past four.
 */
export default function DonutChart({ summary }: DonutChartProps) {
  const titleId = useId();
  const noteId = useId();
  const patternId = `pl-hatch-${useId().replace(/:/g, "")}`;
  const [selected, setSelected] = useState<string | null>(null);

  const total = summary.totalPercent;
  const isOver = summary.status === "over";

  const rows = toChartRows(
    summary.categories,
    summary.status === "incomplete"
      ? { percent: summary.unallocatedPercent, amount: summary.unallocatedAmount }
      : null,
  );

  const base = Math.max(100, total);
  const categoryCount = rows.filter((row) => row.kind !== "unallocated").length;

  const heading =
    rows.length === 0
      ? "Allocation by category"
      : `${formatPercent(total)} is allocated across ${categoryCount} ${categoryCount === 1 ? "category" : "categories"}`;

  const summaryText = rows
    .map((row) => `${row.label} ${formatPercent(row.percent)}`)
    .join(", ");

  if (rows.length === 0) {
    return (
      <div>
        <h3 className="font-serif text-h4 font-normal text-ink">{heading}</h3>
        <p className="mt-3 text-note text-ink-muted">
          Not available. The chart appears as soon as a holding has an allocation above 0%.
        </p>
      </div>
    );
  }

  // ----- More than four parts: a list with bars (static) -----
  if (rows.length > 4) {
    return (
      <div>
        <h3 id={titleId} className="font-serif text-h4 font-normal text-ink">
          {heading}
        </h3>

        <ul className="mt-5 space-y-4" aria-labelledby={titleId}>
          {rows.map((row) => (
            <li key={row.key}>
              <div className="flex items-baseline justify-between gap-3 text-note">
                <span className="flex min-w-0 items-center gap-2 text-ink">
                  <Swatch row={row} />
                  <span className="min-w-0">
                    {row.label}
                    {rowDetail(row) && (
                      <span className="block text-caption text-ink-muted">{rowDetail(row)}</span>
                    )}
                  </span>
                </span>
                <span className="font-semibold tabular-nums text-ink">
                  {formatPercent(row.percent)}
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-border" aria-hidden="true">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (row.percent / base) * 100)}%`,
                    background: row.kind === "unallocated" ? "var(--color-ink-muted)" : row.color,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        <HowToRead>
          Each bar is one category’s share of the total.{" "}
          {isOver &&
            `The total is ${formatPercent(total)}, so each bar is drawn as its share of that total.`}
        </HowToRead>
      </div>
    );
  }

  // ----- Four parts or fewer: an interactive donut -----
  let cumulative = 0;
  const arcs = rows.map((row) => {
    const share = (row.percent / base) * 100;
    const gap = rows.length > 1 ? Math.min(GAP, share * 0.4) : 0;
    const dash = Math.max(share - gap, 0.2);
    const start = cumulative + gap / 2;
    cumulative += share;

    return { row, dash, offset: (((25 - start) % 100) + 100) % 100 };
  });

  const active = rows.find((row) => row.key === selected) ?? null;

  function toggle(key: string) {
    setSelected((current) => (current === key ? null : key));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") setSelected(null);
  }

  return (
    <div
      role="group"
      aria-labelledby={titleId}
      aria-describedby={noteId}
      onKeyDown={handleKeyDown}
    >
      <h3 id={titleId} className="font-serif text-h4 font-normal text-ink">
        {heading}
      </h3>

      <div className="mt-5 flex flex-col items-center gap-5">
        <div className="relative w-full max-w-56">
          <svg viewBox="0 0 42 42" className="block h-auto w-full" aria-hidden="true">
            <defs>
              <pattern
                id={patternId}
                width="3"
                height="3"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="3" height="3" className="fill-white" />
                <line x1="0" y1="0" x2="0" y2="3" className="stroke-ink-muted" strokeWidth="1.2" />
              </pattern>
            </defs>

            <circle cx="21" cy="21" r={RADIUS} fill="none" className="stroke-border" strokeWidth="5.5" />

            {arcs.map(({ row, dash, offset }) => (
              <circle
                key={row.key}
                cx="21"
                cy="21"
                r={RADIUS}
                fill="none"
                style={{
                  stroke: row.kind === "unallocated" ? `url(#${patternId})` : row.color,
                  strokeOpacity: active && active.key !== row.key ? 0.3 : 1,
                }}
                strokeWidth="5.5"
                pathLength={100}
                strokeDasharray={`${dash} ${100 - dash}`}
                strokeDashoffset={offset}
              />
            ))}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-serif text-num-m font-semibold text-ink">
              {formatPercent(active ? active.percent : total)}
            </span>
            <span className="max-w-24 text-caption text-ink-muted">
              {active ? active.label : isOver ? "over 100%" : "allocated"}
            </span>
          </div>
        </div>

        <ul className="grid w-full gap-1" aria-label="Chart legend">
          {rows.map((row) => {
            const pressed = selected === row.key;

            return (
              <li key={row.key}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => toggle(row.key)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-note ${
                    pressed
                      ? "border-primary bg-primary-soft text-primary-ink"
                      : "border-transparent bg-white text-ink hover:border-primary"
                  }`}
                >
                  <Swatch row={row} />
                  <span className="min-w-0 flex-1">
                    {row.label}
                    {rowDetail(row) && (
                      <span className="block text-caption text-ink-muted">{rowDetail(row)}</span>
                    )}
                  </span>
                  <span className="font-semibold tabular-nums">{formatPercent(row.percent)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {active ? `${active.label}, ${formatPercent(active.percent)}, highlighted.` : ""}
      </p>

      <p id={noteId} className="sr-only">
        Allocation donut chart. {summaryText}.
      </p>

      <HowToRead>
        Each slice is one category’s share of the total. Select a row to highlight its slice, and
        press Esc to clear.{" "}
        {isOver &&
          `The ring can only show 100%, so each slice is its share of the ${formatPercent(total)} total. The percentages are the real values.`}
      </HowToRead>
    </div>
  );
}
