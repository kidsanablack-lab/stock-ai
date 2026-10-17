"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PreviewItem } from "@/lib/home-data";
import { formatShare } from "@/lib/home-format";

const CHART_VARS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
];

const segmentColor = (index: number) =>
  CHART_VARS[Math.min(index, CHART_VARS.length - 1)];

/**
 * Product preview: a miniature company report built from real profile data.
 * Tabs switch between companies.
 */
export default function HeroPreview({ items }: { items: PreviewItem[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (items.length === 0) return null;

  const item = items[active] ?? items[0];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className="rounded-[28px] bg-surface p-3 sm:p-6"
      style={{
        backgroundImage:
          "radial-gradient(var(--color-border) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_18px_40px_-18px_rgba(23,43,77,0.28)]">
        <div
          role="tablist"
          aria-label="Example companies"
          onKeyDown={handleKeyDown}
          className="flex border-b border-border px-2"
        >
          {items.map((entry, index) => {
            const selected = index === active;

            return (
              <button
                key={entry.slug}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`preview-tab-${entry.slug}`}
                aria-selected={selected}
                aria-controls="preview-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={`-mb-px border-b-2 px-3.5 pb-3 pt-3.5 text-[13.5px] font-semibold transition-colors ${
                  selected
                    ? "border-primary text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {entry.ticker}
              </button>
            );
          })}
        </div>

        <div
          id="preview-panel"
          role="tabpanel"
          aria-labelledby={`preview-tab-${item.slug}`}
        >
          <div className="p-[18px] sm:p-6">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-white">
                <Image
                  src={item.logo}
                  alt=""
                  width={28}
                  height={28}
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
              </span>

              <div className="min-w-0">
                <h3 className="truncate text-[17px] font-semibold leading-tight text-ink">
                  {item.name}
                </h3>
                <p className="text-[13px] text-ink-muted">
                  {item.ticker} · {item.industry}
                </p>
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-2 text-[13px] font-semibold text-ink">
                <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-primary text-[13px] text-white">
                  {item.score.toFixed(1)}
                </span>
                <span className="hidden sm:inline">{item.scoreLabel}</span>
              </div>
            </div>

            <dl className="my-5 grid grid-cols-3 border-y border-border">
              <div className="py-3.5 pr-2">
                <dt className="text-[12.5px] text-ink-muted">Market cap</dt>
                <dd className="mt-0.5 font-serif text-xl font-medium tracking-[-0.02em] tabular-nums text-ink sm:text-2xl">
                  {item.marketCap}
                </dd>
              </div>
              <div className="border-l border-border py-3.5 pl-3 sm:pl-4">
                <dt className="text-[12.5px] text-ink-muted">Revenue</dt>
                <dd className="mt-0.5 font-serif text-xl font-medium tracking-[-0.02em] tabular-nums text-ink sm:text-2xl">
                  {item.revenue}
                </dd>
              </div>
              <div className="border-l border-border py-3.5 pl-3 sm:pl-4">
                <dt className="text-[12.5px] text-ink-muted">Growth</dt>
                <dd
                  className={`mt-0.5 flex items-center gap-1 font-serif text-xl font-medium tracking-[-0.02em] tabular-nums sm:text-2xl ${
                    item.growthPositive ? "text-success" : "text-danger"
                  }`}
                >
                  <i
                    className={`ti ${
                      item.growthPositive
                        ? "ti-arrow-up-right"
                        : "ti-arrow-down-right"
                    } text-lg`}
                    aria-hidden="true"
                  />
                  {item.growth}
                </dd>
              </div>
            </dl>

            <p className="mb-2.5 text-[13px] font-semibold text-ink">
              Where revenue comes from
            </p>

            <div
              className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-border"
              role="img"
              aria-label={`Revenue mix for ${item.name}`}
            >
              {item.segments.map((segment, index) => (
                <span
                  key={segment.name}
                  className="block h-full min-w-[3px]"
                  style={{
                    width: `${segment.percentage}%`,
                    background: segmentColor(index),
                  }}
                />
              ))}
            </div>

            <ul className="mt-3.5 grid gap-1.5 text-[13.5px] text-ink">
              {item.segments.map((segment, index) => (
                <li key={segment.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: segmentColor(index) }}
                  />
                  <span className="min-w-0">{segment.name}</span>
                  <span className="ml-auto font-semibold tabular-nums">
                    {formatShare(segment.percentage)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-2.5 border-t border-border pt-4 text-sm text-ink-muted">
              <i
                className="ti ti-bulb mt-0.5 shrink-0 text-lg text-primary"
                aria-hidden="true"
              />
              <p className="line-clamp-3">{item.insight}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border bg-surface px-[18px] py-3 text-[12.5px] text-ink-muted sm:px-6">
            <span>
              Data from Scope company profiles
              {item.fiscalYear ? `, revenue ${item.fiscalYear}` : ""}
            </span>
            <Link
              href={`/company/${item.slug}?from=home`}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline hover:underline-offset-4"
            >
              Open full profile
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
