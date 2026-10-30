"use client";

import { useState } from "react";

// Where Apple makes its money: by product line, by profit, and by region.

type Product = {
  name: string;
  share: number;
  value: number;
  yoy: number;
  note: string;
};

type Region = {
  name: string;
  share: number;
  value: number;
  yoy: number;
};

export type WhereMoneyComesData = {
  title: string;
  lead: string;
  labels: string[];
  products: Product[];
  donutHowToRead: string;

  profit: {
    title: string;
    explain: string;
    revenueTotal: string;
    profitTotal: string;
    productsRevenue: number;
    servicesRevenue: number;
    productsProfit: number;
    servicesProfit: number;
    productsMargin: string;
    servicesMargin: string;
    servicesHistoryTitle: string;
    servicesHistory: { year: string; share: number }[];
  };

  regions: {
    title: string;
    lead: string;
    items: Region[];
    focus: {
      name: string;
      value: number;
      yoy: number;
      historyTitle: string;
      history: { year: string; share: number }[];
      note: string;
    };
    howToRead: string;
  };

  source: string;
};

// One fixed color per product line, by position (share-1 … share-5).
// Used for products only, never for regions.
const STROKE = [
  "stroke-share-1",
  "stroke-share-2",
  "stroke-share-3",
  "stroke-share-4",
  "stroke-share-5",
];
const FILL = [
  "bg-share-1",
  "bg-share-2",
  "bg-share-3",
  "bg-share-4",
  "bg-share-5",
];

// One vivid green for every region that grew. No gradient.
const GROWTH_GREEN = "bg-[#129a48]";

// Rounds to one decimal and drops a trailing .0 (50 -> "50%", 50.4 -> "50.4%").
const pct = (v: number) => `${Math.round(v * 10) / 10}%`;

const fmtYoy = (v: number) =>
  v === 0 ? "0%" : `${v > 0 ? "▲ +" : "▼ −"}${Math.abs(v).toFixed(1)}%`;

const money = (v: number) => `$${v.toFixed(1)}B`;

const clamp = (v: number) => Math.min(100, Math.max(0, v));

// The arrow means the pill never relies on color alone.
function Yoy({ v }: { v: number }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
        v < 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success"
      }`}
    >
      {fmtYoy(v)}
    </span>
  );
}

// With `fill`, the chart stretches to the bottom of its card, so the bars get taller.
function HistoryBars({
  items,
  title,
  highlight = "bg-primary",
  fill = false,
}: {
  items: { year: string; share: number }[];
  title: string;
  highlight?: string;
  fill?: boolean;
}) {
  if (items.length === 0) return null;
  const max = Math.max(1, ...items.map((i) => i.share));

  return (
    <div className={fill ? "flex min-h-0 flex-1 flex-col" : undefined}>
      <div className="text-sm font-medium text-ink-muted">{title}</div>
      <div className={`mt-3 flex gap-3 ${fill ? "flex-1 items-stretch" : "items-end"}`}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          const height = `${Math.max(4, (item.share / max) * 100)}%`;
          return (
            <div
              key={item.year}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <span className="text-xs font-semibold tabular-nums text-ink">
                {pct(item.share)}
              </span>
              {fill ? (
                <div className="relative min-h-[96px] w-full flex-1 overflow-hidden rounded-t-md bg-surface">
                  <div
                    className={`absolute inset-x-0 bottom-0 rounded-t-md transition-all duration-300 ${
                      last ? highlight : "bg-border"
                    }`}
                    style={{ height }}
                    title={`${item.year}: ${pct(item.share)}`}
                  />
                </div>
              ) : (
                <div className="flex h-16 w-full items-end overflow-hidden rounded-t-md bg-surface">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      last ? highlight : "bg-border"
                    }`}
                    style={{ height }}
                    title={`${item.year}: ${pct(item.share)}`}
                  />
                </div>
              )}
              <span className="text-xs tabular-nums text-ink-muted">
                {item.year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Revenue donut + legend ---------- */

function RevenueDonut({
  products,
  total,
  howToRead,
}: {
  products: Product[];
  total: string;
  howToRead: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  // Arcs are sized from the dollar values, not the rounded percentages.
  const sum = products.reduce((s, p) => s + Math.max(p.value, 0), 0) || 1;
  const r = 80;
  const C = 2 * Math.PI * r;
  let offset = 0;

  const segments = products.map((p, i) => {
    const len = (C * Math.max(p.value, 0)) / sum;
    const seg = { len, offset, i };
    offset += len;
    return seg;
  });

  const current = active !== null ? products[active] : null;
  const summary = products.map((p) => `${p.name} ${pct(p.share)}`).join(", ");

  return (
    <div className="mt-4 grid items-center gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
      <div
        className="relative mx-auto w-full max-w-[220px]"
        onMouseLeave={() => setActive(null)}
      >
        <svg
          viewBox="0 0 200 200"
          className="block h-auto w-full -rotate-90"
          role="img"
          aria-label={`Revenue by product line: ${summary}`}
        >
          {segments.map(({ len, offset: off, i }) => (
            <circle
              key={products[i].name}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              strokeWidth={active === i ? 26 : 22}
              strokeDasharray={`${Math.max(len - 2, 0)} ${C - len + 2}`}
              strokeDashoffset={-off}
              tabIndex={0}
              className={`cursor-pointer outline-none transition-all duration-200 ${
                STROKE[i % STROKE.length]
              } ${active !== null && active !== i ? "opacity-25" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
            >
              <title>{`${products[i].name}: ${pct(products[i].share)}`}</title>
            </circle>
          ))}
        </svg>

        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center"
          aria-live="polite"
        >
          <div className="font-serif text-3xl leading-none tracking-tight tabular-nums text-ink">
            {current ? pct(current.share) : total}
          </div>
          <div className="mt-1 text-xs text-ink-muted">
            {current
              ? `${current.name} · ${money(current.value)}`
              : "Total revenue"}
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <ul className="border-t border-border" onMouseLeave={() => setActive(null)}>
          {products.map((p, i) => (
            <li
              key={p.name}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
              className={`grid cursor-pointer grid-cols-[12px_1fr_auto] items-center gap-x-3 gap-y-0.5 rounded-lg border-b border-border px-2 py-2.5 text-sm outline-none transition-colors hover:bg-surface focus-visible:bg-surface ${
                active === i ? "bg-surface" : ""
              }`}
            >
              <span
                className={`h-3 w-3 rounded ${FILL[i % FILL.length]}`}
                aria-hidden
              />
              <span className="font-semibold text-ink">{p.name}</span>
              <span className="text-right font-semibold tabular-nums text-ink">
                {pct(p.share)}
              </span>
              <span className="col-start-2 text-sm text-ink-muted">{p.note}</span>
              <span className="flex items-center justify-end gap-2 text-sm text-ink-muted">
                <span className="tabular-nums">{money(p.value)}</span>
                <Yoy v={p.yoy} />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          {howToRead}
        </p>
      </div>
    </div>
  );
}

/* ---------- Profit split: two small donuts ---------- */

// Products fill the ring from the top, clockwise. Services takes the rest.
function MiniDonut({
  servicesShare,
  label,
  total,
}: {
  servicesShare: number;
  label: string;
  total: string;
}) {
  const r = 80;
  const C = 2 * Math.PI * r;
  const svLen = (C * clamp(servicesShare)) / 100;
  const pLen = C - svLen;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full max-w-[190px]">
        <svg
          viewBox="0 0 200 200"
          className="block h-auto w-full -rotate-90"
          role="img"
          aria-label={`${label}: Services ${pct(servicesShare)}, Products ${pct(100 - servicesShare)}`}
        >
          <circle
            cx="100"
            cy="100"
            r={r}
            fill="none"
            strokeWidth={26}
            strokeDasharray={`${Math.max(pLen - 2, 0)} ${C - pLen + 2}`}
            strokeDashoffset={0}
            className="stroke-primary"
          />
          <circle
            cx="100"
            cy="100"
            r={r}
            fill="none"
            strokeWidth={26}
            strokeDasharray={`${Math.max(svLen - 2, 0)} ${C - svLen + 2}`}
            strokeDashoffset={-pLen}
            className="stroke-share-2"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-[clamp(22px,2.6vw,28px)] font-semibold leading-none tracking-tight tabular-nums text-ink">
            {pct(servicesShare)}
          </span>
          <span className="mt-1 text-sm text-ink-muted">Services</span>
        </div>
      </div>
      <p className="mt-3 text-base font-semibold leading-tight text-ink">{label}</p>
      <p className="mt-0.5 text-sm tabular-nums text-ink-muted">{total}</p>
    </div>
  );
}

function MarginRow({
  label,
  margin,
  color,
}: {
  label: string;
  margin: string;
  color: string;
}) {
  const n = parseFloat(margin);
  if (Number.isNaN(n)) return null;
  return (
    <div className="mt-3">
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-ink">{label}</span>
        <b className="tabular-nums text-ink">${n.toFixed(2)}</b>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${clamp(n)}%` }}
        />
      </div>
    </div>
  );
}

/* ---------- Region treemap ---------- */

// Width divided by height of the treemap box. The layout and the CSS aspect ratio use the same number.
const TREEMAP_ASPECT = 1.25;

type Rect = { x: number; y: number; w: number; h: number };

// Splits the list into two groups of about equal total share, then cuts the box
// along its longer side. Repeats inside each half until one region is left per box.
function layoutTreemap(items: Region[], rect: Rect): { region: Region; rect: Rect }[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ region: items[0], rect }];

  const total = items.reduce((s, r) => s + r.share, 0) || 1;
  let k = 1;
  let best = Infinity;
  let running = 0;
  for (let i = 1; i < items.length; i++) {
    running += items[i - 1].share;
    const diff = Math.abs(running - (total - running));
    if (diff < best) {
      best = diff;
      k = i;
    }
  }

  const first = items.slice(0, k);
  const second = items.slice(k);
  const frac = first.reduce((s, r) => s + r.share, 0) / total;

  const realW = rect.w * TREEMAP_ASPECT;
  const realH = rect.h;

  if (realW >= realH) {
    const w1 = rect.w * frac;
    return [
      ...layoutTreemap(first, { x: rect.x, y: rect.y, w: w1, h: rect.h }),
      ...layoutTreemap(second, { x: rect.x + w1, y: rect.y, w: rect.w - w1, h: rect.h }),
    ];
  }
  const h1 = rect.h * frac;
  return [
    ...layoutTreemap(first, { x: rect.x, y: rect.y, w: rect.w, h: h1 }),
    ...layoutTreemap(second, { x: rect.x, y: rect.y + h1, w: rect.w, h: rect.h - h1 }),
  ];
}

function RegionTreemap({ items, className = "" }: { items: Region[]; className?: string }) {
  const sorted = [...items].sort((a, b) => b.share - a.share);
  const tiles = layoutTreemap(sorted, { x: 0, y: 0, w: 100, h: 100 });

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: String(TREEMAP_ASPECT) }}
      role="img"
      aria-label={`Sales by region: ${sorted.map((r) => `${r.name} ${pct(r.share)}`).join(", ")}`}
    >
      {tiles.map(({ region, rect }) => {
        const shrinking = region.yoy < 0;
        // Red if the region shrank, the same vivid green if it grew.
        const bg = shrinking ? "bg-danger" : GROWTH_GREEN;
        const big = region.share >= 12;

        return (
          <div
            key={region.name}
            className="absolute p-[3px]"
            style={{
              left: `${rect.x}%`,
              top: `${rect.y}%`,
              width: `${rect.w}%`,
              height: `${rect.h}%`,
            }}
          >
            <div
              className={`flex h-full w-full flex-col overflow-hidden rounded-2xl text-white ${
                big ? "p-4 sm:p-5" : "p-3 sm:p-4"
              } ${bg}`}
              title={`${region.name}: ${pct(region.share)} of FY25 sales, ${money(region.value)}`}
            >
              <span className="text-sm font-semibold leading-tight">{region.name}</span>
              <span
                className={`font-serif font-semibold leading-none tracking-tight tabular-nums ${
                  big ? "mt-2 text-[clamp(30px,4vw,44px)]" : "mt-1 text-[clamp(20px,2.4vw,26px)]"
                }`}
              >
                {pct(region.share)}
              </span>
              <span className="mt-1 text-sm tabular-nums">{money(region.value)}</span>
              <span
                className={`inline-flex w-fit rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold tabular-nums ${
                  shrinking ? "text-danger" : "text-success"
                } ${big ? "mt-auto" : "mt-2"}`}
              >
                {fmtYoy(region.yoy)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Section ---------- */

export default function WhereMoneyComes({
  data,
}: {
  data: WhereMoneyComesData;
}) {
  const { products, profit, regions } = data;
  const maxRegion = Math.max(1, ...regions.items.map((r) => r.share));
  const focusDown = regions.focus.yoy < 0;

  return (
    <section id="revenue" className="scroll-mt-20 bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Heading */}
        <header className="max-w-3xl">
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            {data.lead}
          </p>
          {data.labels.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {data.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Revenue donut */}
        {products.length > 0 && (
          <div className="mt-8">
            <h3 className="font-serif text-xl tracking-tight text-ink">
              Revenue by product line
            </h3>
            <RevenueDonut
              products={products}
              total={profit.revenueTotal}
              howToRead={data.donutHowToRead}
            />
          </div>
        )}

        {/* Profitability */}
        <div className="mt-10">
          <h3 className="max-w-3xl font-serif text-xl font-normal leading-tight tracking-tight text-ink">
            {profit.title}
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {profit.explain}
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Revenue vs. gross profit: two donuts */}
            <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
              <h4 className="font-serif text-xl leading-tight tracking-tight text-ink">
                Revenue vs. gross profit
              </h4>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <MiniDonut
                  servicesShare={profit.servicesRevenue}
                  label="Share of revenue"
                  total={profit.revenueTotal}
                />
                <MiniDonut
                  servicesShare={profit.servicesProfit}
                  label="Share of gross profit"
                  total={profit.profitTotal}
                />
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
                <li className="flex items-center gap-2">
                  <i className="size-3 rounded-full bg-primary" aria-hidden="true" />
                  Products
                </li>
                <li className="flex items-center gap-2">
                  <i className="size-3 rounded-full bg-share-2" aria-hidden="true" />
                  Services
                </li>
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Services is {pct(profit.servicesRevenue)} of revenue but{" "}
                {pct(profit.servicesProfit)} of gross profit. That jump is the
                margin gap.
              </p>
            </div>

            <div className="flex flex-col rounded-2xl border border-border bg-white p-5">
              <h4 className="font-serif text-lg leading-tight tracking-tight text-ink">
                What Apple keeps from $100 of sales
              </h4>
              <MarginRow
                label="Services gross margin"
                margin={profit.servicesMargin}
                color="bg-share-2"
              />
              <MarginRow
                label="Products gross margin"
                margin={profit.productsMargin}
                color="bg-primary"
              />

              {profit.servicesHistory.length > 0 && (
                <div className="mt-5 flex flex-1 flex-col border-t border-border pt-4">
                  <HistoryBars
                    items={profit.servicesHistory}
                    title={profit.servicesHistoryTitle}
                    highlight="bg-share-2"
                    fill
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Regions */}
        <div className="mt-10">
          <h3 className="max-w-3xl font-serif text-xl font-normal leading-tight tracking-tight text-ink">
            {regions.title}
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {regions.lead}
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
            <div className="min-w-0">
              <p className="mb-3 max-w-xl text-xs leading-relaxed text-ink-muted">
                {regions.howToRead}
              </p>

              {/* Treemap on tablets and up */}
              <RegionTreemap items={regions.items} className="hidden sm:block" />

              {/* Simple list on phones, where small boxes would be too tight */}
              <ul className="border-t border-border sm:hidden">
                {regions.items.map((region) => {
                  const shrinking = region.yoy < 0;
                  return (
                    <li
                      key={region.name}
                      className="border-b border-border py-2.5 text-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-ink">
                          {region.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-sm tabular-nums">
                          <span className="font-semibold text-ink">
                            {pct(region.share)} · {money(region.value)}
                          </span>
                          <Yoy v={region.yoy} />
                        </div>
                      </div>
                      <div
                        className="mt-2 h-2 overflow-hidden rounded-full bg-surface"
                        role="img"
                        aria-label={`${region.name}: ${pct(region.share)} of revenue`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            shrinking ? "bg-danger" : GROWTH_GREEN
                          }`}
                          style={{
                            width: `${clamp((region.share / maxRegion) * 100)}%`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Spotlight */}
            <aside
              className={`flex min-w-0 flex-col rounded-3xl border-2 bg-white p-5 sm:p-6 ${
                focusDown ? "border-danger" : "border-border"
              }`}
              aria-label={`${regions.focus.name} spotlight`}
            >
              <span className="inline-flex w-fit rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                Region to watch
              </span>
              <h4 className="mt-2 font-serif text-lg tracking-tight text-ink">
                {regions.focus.name}
              </h4>
              <div
                className={`mt-2 font-serif text-4xl leading-none tracking-tight tabular-nums ${
                  focusDown ? "text-danger" : "text-success"
                }`}
              >
                {regions.focus.yoy === 0
                  ? "0%"
                  : `${regions.focus.yoy > 0 ? "+" : "−"}${Math.abs(regions.focus.yoy).toFixed(1)}%`}
              </div>
              <p className="mt-1.5 text-xs tabular-nums text-ink-muted">
                Versus FY24, on {money(regions.focus.value)} of revenue
              </p>

              {regions.focus.history.length > 0 && (
                <div className="mt-4 flex flex-1 flex-col border-t border-border pt-4">
                  <HistoryBars
                    items={regions.focus.history}
                    title={regions.focus.historyTitle}
                    highlight={focusDown ? "bg-danger" : "bg-share-2"}
                    fill
                  />
                </div>
              )}

              <p className="mt-4 border-t border-border pt-3 text-sm leading-relaxed text-ink">
                {regions.focus.note}
              </p>
            </aside>
          </div>
        </div>

        <footer className="mt-8 border-t border-border pt-4">
          <p className="text-xs leading-relaxed text-ink-muted">{data.source}</p>
        </footer>
      </div>
    </section>
  );
}