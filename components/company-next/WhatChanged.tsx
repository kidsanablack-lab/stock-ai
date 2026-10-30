import { type ReactNode } from "react";

export type MetricCardData = {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "negative";
  series: number[];
  note: string;
};
export type QuarterBar = { quarter: string; fy: string; value: number; yoy: number };
export type EstimateRow = { label: string; unit: "B" | "$"; actual: number; estimate: number };
export type NewsItem = { title: string; detail: string; meaning: string };

export type WhatChangedData = {
  title: string;
  lead: string;
  metrics: MetricCardData[];
  growth: {
    bars: QuarterBar[];
    verdictLabel: string;
    before: string;
    after: string;
    verdict: string;
    watch: string;
  };
  estimates: EstimateRow[];
  good: NewsItem[];
  watch: NewsItem[];
  source: string;
};

const signed = (v: number) => `${v >= 0 ? "▲ +" : "▼ −"}${Math.abs(v).toFixed(1)}%`;
const money = (v: number, unit: "B" | "$") =>
  unit === "B" ? `$${v.toFixed(1)}B` : `$${v.toFixed(2)}`;

/* ---------- Sparkline ---------- */
/* "light" = green/red line on a white card. "dark" = white line on the blue card. */

function Sparkline({
  series,
  tone,
  variant = "light",
  w = 200,
  h = 72,
  pad = 8,
  strokeW = 2.5,
  r = 5,
  className = "",
}: {
  series: number[];
  tone: "positive" | "negative";
  variant?: "light" | "dark";
  w?: number;
  h?: number;
  pad?: number;
  strokeW?: number;
  r?: number;
  className?: string;
}) {
  if (series.length < 2) return null;
  const min = Math.min(...series);
  const span = Math.max(...series) - min || 1;
  const pts = series.map((v, i) => [
    pad + (i * (w - 2 * pad)) / (series.length - 1),
    h - pad - ((v - min) / span) * (h - 2 * pad),
  ]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${pts[0][0].toFixed(1)} ${h} Z`;
  const [lx, ly] = pts[pts.length - 1];
  const pos = tone === "positive";
  const dark = variant === "dark";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`block h-auto ${className}`}
      role="img"
      aria-label={`Last ${series.length} quarters, from ${series[0]} to ${series[series.length - 1]}`}
    >
      <path
        d={area}
        className={dark ? "fill-white" : pos ? "fill-success-soft" : "fill-danger-soft"}
        fillOpacity={dark ? 0.14 : 1}
      />
      <path
        d={line}
        fill="none"
        className={dark ? "stroke-white" : pos ? "stroke-success" : "stroke-danger"}
        strokeWidth={strokeW}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={lx}
        cy={ly}
        r={r}
        className={`${dark ? "fill-primary stroke-white" : `fill-white ${pos ? "stroke-success" : "stroke-danger"}`}`}
        strokeWidth={strokeW}
      />
    </svg>
  );
}

/* ---------- Layout helpers ---------- */

function Block({
  title,
  text,
  aside,
  children,
}: {
  title: string;
  text: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="pt-12">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h3 className="max-w-[760px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
            {title}
          </h3>
          <p className="mt-1.5 max-w-[660px] text-[15px] leading-relaxed text-ink-muted">{text}</p>
        </div>
        {aside}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function NewsColumn({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "good" | "watch";
  items: NewsItem[];
}) {
  const good = tone === "good";
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-white">
      {/* colored header band */}
      <div className={`flex items-center gap-3 px-5 py-4 sm:px-6 ${good ? "bg-success" : "bg-warning"}`}>
        <span
          className={`grid size-9 place-items-center rounded-full bg-white text-[19px] ${
            good ? "text-success" : "text-warning"
          }`}
          aria-hidden="true"
        >
          <i className={`ti ${good ? "ti-circle-check" : "ti-eye"}`} />
        </span>
        <h4 className="font-serif text-[24px] leading-tight tracking-tight text-white">{title}</h4>
      </div>

      <ol className="px-5 pb-2 pt-2 sm:px-6">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="flex gap-3.5 border-t border-border py-5 first:border-t-0"
          >
            <span
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums ${
                good ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
              }`}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-base font-semibold leading-snug text-ink">{item.title}</p>
              <p
                className={`mt-1 font-serif text-[20px] font-medium leading-snug tabular-nums ${
                  good ? "text-success" : "text-warning"
                }`}
              >
                {item.detail}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-ink-muted">{item.meaning}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Section ---------- */

export default function WhatChanged({ data }: { data: WhatChangedData }) {
  const { growth } = data;
  const max = Math.max(1, ...growth.bars.map((b) => b.value));
  const [lead, ...others] = data.metrics;
  // The latest four quarters are highlighted; earlier ones are grey.
  const firstCurrent = Math.max(0, growth.bars.length - 4);

  // Beat / miss tally for the estimates block
  const diffs = data.estimates.map((r) => (r.estimate ? (r.actual / r.estimate - 1) * 100 : 0));
  const beats = diffs.filter((d) => d >= 0.5).length;
  const misses = diffs.filter((d) => d <= -0.5).length;

  return (
    <section id="latest" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[660px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* 1. Key numbers: first metric large on blue, the rest in a row */}
        {lead && (
          <Block
            title="The numbers that moved"
            text="Each line shows the last five quarters. The ring marks the latest one."
          >
            <div className="grid gap-4">
              <article className="grid items-center gap-6 rounded-[28px] bg-primary p-6 text-white sm:p-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10">
                <div>
                  <p className="text-base font-semibold text-white/75">{lead.label}</p>
                  <p className="mt-1.5 font-serif text-[clamp(48px,6vw,68px)] font-medium leading-none tracking-tight tabular-nums">
                    {lead.value}
                  </p>
                  <p
                    className={`mt-4 inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold tabular-nums ${
                      lead.tone === "positive" ? "text-success" : "text-danger"
                    }`}
                  >
                    {lead.tone === "positive" ? "▲" : "▼"} {lead.change}
                  </p>
                  <p className="mt-4 max-w-[340px] text-base font-medium leading-snug">{lead.note}</p>
                </div>
                <Sparkline
                  series={lead.series}
                  tone={lead.tone}
                  variant="dark"
                  w={440}
                  h={190}
                  pad={14}
                  strokeW={5}
                  r={9}
                  className="w-full"
                />
              </article>

              <div className="grid gap-4 md:grid-cols-3">
                {others.map((m) => (
                  <article
                    key={m.label}
                    className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink-muted">{m.label}</p>
                        <p className="mt-1 font-serif text-[clamp(28px,3vw,34px)] font-semibold leading-[1.1] tabular-nums text-ink">
                          {m.value}
                        </p>
                        <p
                          className={`mt-1 text-sm font-semibold tabular-nums ${
                            m.tone === "positive" ? "text-success" : "text-danger"
                          }`}
                        >
                          {m.tone === "positive" ? "▲" : "▼"} {m.change}
                        </p>
                      </div>
                      <Sparkline
                        series={m.series}
                        tone={m.tone}
                        w={160}
                        h={64}
                        pad={7}
                        strokeW={2.5}
                        r={5}
                        className="w-[42%] max-w-[150px] shrink-0"
                      />
                    </div>
                    <p className="text-sm leading-snug text-ink-muted">{m.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </Block>
        )}

        {/* 2. Is growth speeding up? */}
        {growth.bars.length > 0 && (
          <Block
            title="Is growth speeding up?"
            text="Compare each quarter with the same quarter a year earlier. Apple’s holiday quarter (Q1) is always the biggest, so comparing with the quarter before would mislead."
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-3xl border border-border bg-white p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-muted">
                  <span className="flex items-center gap-2">
                    <i className="size-3 rounded bg-chart-5" aria-hidden="true" />
                    Earlier quarters
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="size-3 rounded bg-primary" aria-hidden="true" />
                    Latest four quarters
                  </span>
                  <span>Bars: sales in $ billions. Below each bar: growth vs the same quarter a year earlier.</span>
                </div>
                <div className="overflow-x-auto">
                  <div
                    className="grid min-w-[520px] gap-3"
                    style={{ gridTemplateColumns: `repeat(${growth.bars.length}, minmax(0, 1fr))` }}
                    role="img"
                    aria-label={`Quarterly sales: ${growth.bars
                      .map((b) => `${b.quarter} ${b.fy} $${b.value}B, ${signed(b.yoy)}`)
                      .join("; ")}`}
                  >
                    {growth.bars.map((b, i) => {
                      const cur = i >= firstCurrent;
                      return (
                        <div key={`${b.fy}-${b.quarter}`} className="group flex flex-col items-center">
                          <div className="flex h-[180px] w-full flex-col items-center justify-end">
                            <span className="mb-1.5 text-[13px] font-semibold tabular-nums text-ink">
                              {b.value.toFixed(1)}
                            </span>
                            <div
                              className={`w-[76%] rounded-t-lg transition-[filter] duration-200 group-hover:brightness-110 ${
                                cur ? "bg-primary" : "bg-chart-5"
                              }`}
                              style={{ height: `${Math.round((b.value / max) * 140)}px` }}
                              title={`${b.quarter} ${b.fy}: $${b.value.toFixed(1)}B`}
                            />
                          </div>
                          <span className="mt-2 text-[13px] font-semibold text-ink">{b.quarter}</span>
                          <span className="text-[13px] text-ink-muted">{b.fy}</span>
                          <span
                            className={`mt-1.5 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                              b.yoy >= 0 ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
                            }`}
                          >
                            {signed(b.yoy)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-ink-muted sm:hidden">Swipe sideways to see all quarters.</p>
              </div>

              {/* Vivid blue verdict card */}
              <aside className="rounded-3xl bg-primary p-5 text-white sm:p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-success">
                  <i className="ti ti-trending-up" aria-hidden="true" />
                  {growth.verdictLabel}
                </span>
                <div className="mt-4 flex items-baseline gap-3 font-serif font-medium tabular-nums">
                  <span className="text-[26px] text-white/70">{growth.before}</span>
                  <i className="ti ti-arrow-right text-xl text-white/70" aria-hidden="true" />
                  <span className="text-[44px] leading-none">{growth.after}</span>
                </div>
                <p className="mt-2 text-[13px] text-white/75">
                  Average sales growth: the two quarters before, then the last two
                </p>
                <p className="mt-4 border-t border-white/20 pt-3 text-[15px] font-semibold leading-snug">
                  {growth.verdict}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/80">{growth.watch}</p>
              </aside>
            </div>
          </Block>
        )}

        {/* 3. Against analyst estimates */}
        {data.estimates.length > 0 && (
          <Block
            title="Did Apple beat expectations?"
            text="Actual results for the June quarter against what analysts expected."
            aside={
              <ul className="flex flex-wrap gap-2" aria-label="Beats and misses">
                {beats > 0 && (
                  <li className="rounded-full bg-success-soft px-3.5 py-1.5 text-sm font-semibold tabular-nums text-success">
                    ▲ {beats} {beats === 1 ? "beat" : "beats"}
                  </li>
                )}
                {misses > 0 && (
                  <li className="rounded-full bg-danger-soft px-3.5 py-1.5 text-sm font-semibold tabular-nums text-danger">
                    ▼ {misses} {misses === 1 ? "miss" : "misses"}
                  </li>
                )}
              </ul>
            }
          >
            <div className="rounded-[28px] border border-border bg-white px-5 py-3 sm:px-8 sm:py-4">
              {/* scale labels (desktop) */}
              <div className="hidden gap-8 pt-3 md:grid md:grid-cols-[260px_minmax(0,1fr)_132px]" aria-hidden="true">
                <span />
                <div className="relative h-5 text-[13px] text-ink-muted">
                  <span className="absolute left-0">−5% or worse</span>
                  <span className="absolute left-1/4 -translate-x-1/2">−2.5%</span>
                  <span className="absolute left-1/2 -translate-x-1/2">In line</span>
                  <span className="absolute left-3/4 -translate-x-1/2">+2.5%</span>
                  <span className="absolute right-0">+5% or better</span>
                </div>
                <span />
              </div>

              <ul>
                {data.estimates.map((r, idx) => {
                  const d = diffs[idx];
                  const clamped = Math.max(-5, Math.min(5, d));
                  const x = 50 + clamped * 10;
                  const off = Math.abs(d) > 5;
                  const kind = Math.abs(d) < 0.5 ? "flat" : d > 0 ? "beat" : "miss";
                  const dot = { beat: "bg-success", miss: "bg-danger", flat: "bg-ink-muted" }[kind];
                  const trail = { beat: "bg-success", miss: "bg-danger", flat: "bg-ink-muted" }[kind];
                  const pill = {
                    beat: "bg-success-soft text-success",
                    miss: "bg-danger-soft text-danger",
                    flat: "bg-surface text-ink-muted",
                  }[kind];
                  const word = { beat: "▲ Beat", miss: "▼ Miss", flat: "● In line" }[kind];
                  return (
                    <li
                      key={r.label}
                      className="flex flex-col gap-2.5 border-b border-border py-4 last:border-b-0 md:grid md:grid-cols-[260px_minmax(0,1fr)_132px] md:items-center md:gap-8"
                    >
                      <div>
                        <p className="text-base font-semibold text-ink">{r.label}</p>
                        <p className="mt-0.5 text-[13px] tabular-nums text-ink-muted">
                          Actual {money(r.actual, r.unit)} · Estimate {money(r.estimate, r.unit)}
                        </p>
                      </div>

                      <div
                        className="relative h-10 w-full"
                        role="img"
                        aria-label={`${r.label}: ${word.slice(2)} by ${Math.abs(d).toFixed(1)}%`}
                      >
                        <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
                        {[0, 25, 75, 100].map((t) => (
                          <span
                            key={t}
                            className="absolute top-1/2 h-3.5 w-px -translate-y-1/2 bg-border"
                            style={{ left: `${t}%` }}
                          />
                        ))}
                        {/* colored trail from the middle to the dot */}
                        <span
                          className={`absolute top-1/2 h-1.5 -translate-y-1/2 opacity-25 ${trail}`}
                          style={{ left: `${Math.min(50, x)}%`, width: `${Math.abs(x - 50)}%` }}
                        />
                        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-ink" />
                        <span
                          className={`absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-sm ${dot}`}
                          style={{ left: `${x}%` }}
                        />
                        {off && (
                          <span
                            className={`absolute top-1/2 -translate-y-1/2 text-base font-bold leading-none ${
                              d > 0 ? "text-success" : "text-danger"
                            }`}
                            style={d > 0 ? { left: `calc(${x}% + 16px)` } : { right: `calc(${100 - x}% + 16px)` }}
                            aria-hidden="true"
                          >
                            {d > 0 ? "»" : "«"}
                          </span>
                        )}
                      </div>

                      <span
                        className={`inline-flex w-fit shrink-0 rounded-full px-3 py-2 text-[13px] font-semibold tabular-nums md:w-[132px] md:justify-center ${pill}`}
                      >
                        {word} {d > 0 ? "+" : d < 0 ? "−" : ""}
                        {Math.abs(d).toFixed(1)}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Block>
        )}

        {/* 4. What drove it */}
        {(data.good.length > 0 || data.watch.length > 0) && (
          <Block title="What drove it" text="The good news and the things to watch, each with the numbers behind it.">
            <div className="grid gap-4 md:grid-cols-2 md:items-start">
              {data.good.length > 0 && <NewsColumn title="Good news" tone="good" items={data.good} />}
              {data.watch.length > 0 && <NewsColumn title="Watch list" tone="watch" items={data.watch} />}
            </div>
          </Block>
        )}

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">
          {data.source}
        </p>
      </div>
    </section>
  );
}