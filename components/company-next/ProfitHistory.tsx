import type { ReactNode } from "react";
import type { ProfitHistoryData } from "@/lib/company-next/types";
import SectionNote from "./SectionNote";

// How steadily the company grew, and whether it keeps more profit from each sale.
// Main visuals: $100 waterfall, five-year margin lines, growth (three summary rows + grouped bars with years), ROIC vs cost of capital.
// Company-neutral: no company name, fixed fiscal years or product words are written in this file. Everything specific comes from `data`.
// Growth rates are only calculated when the starting value is above zero. Otherwise the chart shows nothing for that
// year and the table shows "n/m" (not meaningful), so a loss year can no longer produce a huge or false percentage.
// Server Component.

// The data type lives in lib/company-next/types.ts. It is re-exported here so older imports keep working.
export type { ProfitHistoryData } from "@/lib/company-next/types";

const sgn = (v: number) => (v < 0 ? "−" : "");
const f1 = (v: number) => `${sgn(v)}${Math.abs(v).toFixed(1)}`;
const money = (v: number) => `${sgn(v)}$${Math.abs(v).toFixed(2)}`;

// Change from the year before, in percent. null when the year before was zero or negative.
const yoy = (s: number[]): (number | null)[] => s.slice(1).map((v, i) => (s[i] > 0 ? (v / s[i] - 1) * 100 : null));

// Average growth per year. null when the first or last value is zero or negative.
const cagr = (s: number[]): number | null =>
  s.length > 1 && s[0] > 0 && s[s.length - 1] > 0
    ? (Math.pow(s[s.length - 1] / s[0], 1 / (s.length - 1)) - 1) * 100
    : null;

const ratio = (n: number[], d: number[]) => n.map((v, i) => (v / (d[i] || 1)) * 100);

/* Five-year line for one margin: dots on every year, a ring on the latest. */
const W = 260;
const H = 84;
const P = 10;

function MarginLine({ series, years, stroke }: { series: number[]; years: string[]; stroke: string }) {
  if (series.length < 2) return null;
  const min = Math.min(...series);
  const span = Math.max(...series) - min || 1;
  const pts = series.map((v, i) => [
    P + (i * (W - 2 * P)) / (series.length - 1),
    H - P - ((v - min) / span) * (H - 2 * P),
  ]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`${years[0]} ${f1(series[0])}%, then ${series.slice(1).map((v, i) => `${years[i + 1]} ${f1(v)}%`).join(", ")}`}
    >
      <path d={d} fill="none" className={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.slice(0, -1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className={`fill-white ${stroke}`} strokeWidth="2" />
      ))}
      <circle cx={lx} cy={ly} r="5.5" className={`fill-white ${stroke}`} strokeWidth="3" />
    </svg>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="max-w-[820px] font-serif text-h3 font-medium tracking-title text-ink">{children}</h3>
  );
}

/* Card with a blue header band and a white body, the same card language as the other pages. */
function BandCard({
  title,
  children,
  className = "",
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-white ${className}`}>
      <div className="bg-primary px-5 py-4 font-serif text-xl font-medium text-white sm:px-7 sm:text-[22px]">
        {title}
      </div>
      {children}
    </div>
  );
}

export default function ProfitHistory({ data }: { data: ProfitHistoryData }) {
  const { years, growth, margins, returns } = data;
  const last = years.length - 1;
  if (last < 1) return null;

  const growthYears = years.slice(1); // every year except the first one

  const growthRows = [
    { label: "Revenue", s: data.revenue, tone: "bg-ink" },
    { label: "Net income", s: data.netIncome, tone: "bg-primary" },
    { label: "Free cash flow", s: data.fcf, tone: "bg-share-2" },
  ];
  const growthSeries = growthRows.map((r) => ({ ...r, g: cagr(r.s), ch: yoy(r.s) }));
  const maxCagr = Math.max(0.1, ...growthSeries.map((r) => r.g ?? 0));
  // A column is a "dip" when revenue fell that year.
  const dipCols = yoy(data.revenue).map((v) => v !== null && v < 0);

  /* Growth chart: scale comes from the real data, rounded up to steps of 5% */
  const allChanges = growthSeries.flatMap((r) => r.ch).filter((v): v is number => v !== null);
  const top = allChanges.length ? Math.max(...allChanges) : 0;
  const bottom = allChanges.length ? Math.min(...allChanges) : 0;
  const up = Math.max(5, Math.ceil(top / 5) * 5);
  const down = Math.max(5, Math.ceil(Math.abs(bottom) / 5) * 5);
  const chartSpan = up + down;
  const pct = (v: number) => `${((v / chartSpan) * 100).toFixed(2)}%`;
  const gridLevels = [up, up / 2, 0, -down];
  const PLOT = 240; // px height of the bars area

  // One flow (sales → gross → operating → net) uses the navy-to-blue stage tokens.
  const marginRows = [
    { label: "Gross margin", s: ratio(data.grossProfit, data.revenue), stroke: "stroke-stage-2", after: "after the direct cost of delivering what it sells" },
    { label: "Operating margin", s: ratio(data.operatingIncome, data.revenue), stroke: "stroke-stage-3", after: "after also paying for R&D, sales and running the business" },
    { label: "Net margin", s: ratio(data.netIncome, data.revenue), stroke: "stroke-stage-4", after: "after tax and everything else" },
  ];

  /* What happens to $100 of sales in the latest year. Values never go below zero, so bad input cannot draw a negative bar. */
  const gm = marginRows[0].s[last];
  const om = marginRows[1].s[last];
  const nm = marginRows[2].s[last];
  const waterfall = [
    { label: "Sales", value: 100, from: 0, total: true, bar: "bg-stage-1" },
    { label: "Direct costs", value: Math.max(0, 100 - gm), from: Math.max(0, gm), total: false, bar: "bg-border" },
    { label: "Gross profit", value: Math.max(0, gm), from: 0, total: true, bar: "bg-stage-2" },
    { label: "R&D, sales and other costs", value: Math.max(0, gm - om), from: Math.max(0, om), total: false, bar: "bg-border" },
    { label: "Operating profit", value: Math.max(0, om), from: 0, total: true, bar: "bg-stage-3" },
    { label: "Tax and other", value: Math.max(0, om - nm), from: Math.max(0, nm), total: false, bar: "bg-border" },
    { label: "Net profit", value: Math.max(0, nm), from: 0, total: true, bar: "bg-stage-4" },
  ];

  const tableRows = [
    { label: "Revenue", s: data.revenue, key: true, pct: false, sep: false },
    { label: "Gross profit", s: data.grossProfit, key: false, pct: false, sep: false },
    { label: "Operating income", s: data.operatingIncome, key: false, pct: false, sep: false },
    { label: "Net income", s: data.netIncome, key: true, pct: false, sep: false },
    { label: "Free cash flow", s: data.fcf, key: true, pct: false, sep: false },
    ...marginRows.map((m, i) => ({ label: m.label, s: m.s, key: false, pct: true, sep: i === 0 })),
  ].map((r) => ({ ...r, avg: r.pct ? null : cagr(r.s) }));

  const times = returns.wacc ? Math.round(returns.roic / returns.wacc) : 0;
  const maxReturn = Math.max(returns.roic, returns.wacc, 1) * 1.2;
  const pos = (v: number) => `${Math.min(100, Math.max(0, (v / maxReturn) * 100)).toFixed(1)}%`;
  const roicUp = returns.roic >= returns.roicFrom;

  return (
    <section id="history" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(30px,3.8vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">{data.title}</h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
          {/* data.labels is no longer shown (the source line at the bottom says the same); it stays in the data type */}
        </header>

        {/* Top row: tall blue ROIC card next to the $100 waterfall */}
        <div className="pt-10">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div className="flex min-w-0 flex-col rounded-3xl bg-primary p-6 text-white sm:p-8">
              <div className="text-base font-semibold">ROIC · return on invested capital</div>
              <div className="mt-3 font-serif text-[clamp(56px,7vw,88px)] font-semibold leading-none tracking-title tabular-nums">
                {returns.roic}%
              </div>
              <div
                className={`mt-4 self-start rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold tabular-nums ${
                  roicUp ? "text-success" : "text-danger"
                }`}
              >
                {/* roicFromYear is the first year that has an ROIC. Without it, the first year of the series is used. */}
                {roicUp ? "▲" : "▼"} from {returns.roicFrom}% in {returns.roicFromYear ?? years[0]}
              </div>
              <p className="mt-5 text-base font-medium leading-relaxed">{returns.text}</p>
              <div className="mt-auto pt-7">
                <div className="rounded-2xl bg-white px-4 py-4 text-ink">
                  <div className="text-[13px] text-ink-muted">Cost of capital</div>
                  <div className="mt-0.5 font-serif text-[32px] font-semibold leading-tight tabular-nums">
                    {returns.wacc}%
                  </div>
                  {times > 0 && (
                    <div className="mt-1 text-sm">
                      ROIC is about <b className="font-semibold tabular-nums">{times} times</b> that.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <BandCard title={`What happens to $100 of sales in ${years[last]}`}>
              <div className="flex flex-1 flex-col justify-end overflow-x-auto px-4 pb-5 sm:px-6 sm:pb-6">
                <div
                  className="min-w-[560px] pt-14"
                  role="img"
                  aria-label={`Of every $100 of sales in ${years[last]}, the company keeps ${money(gm)} as gross profit, ${money(om)} as operating profit and ${money(nm)} as net profit`}
                >
                  <div className="grid h-[280px] grid-cols-7 border-b-2 border-ink">
                    {waterfall.map((w) => (
                      <div key={w.label} className="relative h-full">
                        <div
                          className={`absolute inset-x-[10%] rounded-t-lg ${w.bar}`}
                          style={{ bottom: `${w.from}%`, height: `${w.value}%` }}
                        >
                          <span
                            className={`absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap text-sm tabular-nums ${
                              w.total ? "font-bold text-ink" : "font-semibold text-ink-muted"
                            }`}
                          >
                            {w.total ? money(w.value) : `−${money(w.value)}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-7">
                    {waterfall.map((w) => (
                      <span
                        key={w.label}
                        className={`px-1 text-center text-xs leading-snug ${
                          w.total ? "font-semibold text-ink" : "text-ink-muted"
                        }`}
                      >
                        {w.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BandCard>
          </div>
        </div>

        {/* Margins: one band card per margin with a five-year line */}
        <div className="pt-12">
          <Heading>{margins.title}</Heading>

          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {marginRows.map((m) => {
              const diff = m.s[last] - m.s[0];
              return (
                <li key={m.label} className="min-w-0">
                  <BandCard title={m.label} className="h-full">
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="font-serif text-[clamp(40px,5vw,52px)] font-semibold leading-none tracking-title tabular-nums text-ink">
                          {f1(m.s[last])}%
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold tabular-nums ${
                            diff >= 0 ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
                          }`}
                        >
                          {diff >= 0 ? "▲ +" : "▼ −"}
                          {Math.abs(diff).toFixed(1)} pts
                        </span>
                      </div>
                      <div className="mt-4">
                        <MarginLine series={m.s} years={years} stroke={m.stroke} />
                        <div className="mt-1 flex justify-between text-xs tabular-nums text-ink-muted">
                          <span>
                            {years[0]} · {f1(m.s[0])}%
                          </span>
                          <span className="font-semibold text-ink">{years[last]}</span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        Keeps {money(m.s[last])} of every $100 sold, {m.after}.
                      </p>
                    </div>
                  </BandCard>
                </li>
              );
            })}
          </ul>
          <SectionNote className="mt-6">
  {margins.howToRead}
</SectionNote>
        </div>

        {/* Growth: average per year on the left, change from the year before on the right */}
        <div className="pt-12">
          <Heading>{growth.title}</Heading>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <BandCard title="Average growth per year">
              <ul className="flex flex-1 flex-col">
                {growthSeries.map((r) => (
                  <li
                    key={r.label}
                    className="flex-1 border-b border-border px-5 py-5 last:border-b-0 sm:px-7"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`size-3 shrink-0 rounded-full ${r.tone}`} aria-hidden="true" />
                      <span className="text-[15px] font-semibold text-ink">{r.label}</span>
                    </div>
                    {r.g === null ? (
                      <div className="mt-2">
                        <span className="font-serif text-[clamp(36px,4vw,46px)] font-semibold leading-none tracking-title text-ink-muted">
                          n/a
                        </span>
                        <p className="mt-2 text-sm leading-snug text-ink-muted">
                          Not meaningful: the value in {years[0]} or {years[last]} was zero or negative.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-serif text-[clamp(36px,4vw,46px)] font-semibold leading-none tracking-title tabular-nums text-ink">
                          {f1(r.g)}%
                        </span>
                        <span className="text-sm text-ink-muted">
                          a year, {years[0]} to {years[last]}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 h-2 rounded-full bg-border">
                      <div
                        className={`h-full rounded-full ${r.tone}`}
                        style={{ width: `${r.g === null ? 0 : Math.min(100, Math.max(0, (r.g / maxCagr) * 100))}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </BandCard>

            <BandCard title="Change from the year before">
              <div className="px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-semibold text-ink">
                  {growthSeries.map((r) => (
                    <span key={r.label} className="inline-flex items-center gap-2">
                      <span className={`size-3.5 rounded-[4px] ${r.tone}`} aria-hidden="true" />
                      {r.label}
                    </span>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <div
                    className="relative mt-3 min-w-[480px]"
                    role="img"
                    aria-label={`Change from the year before. ${growthYears
                      .map(
                        (y, i) =>
                          `${y}: ${growthSeries
                            .map((r) => {
                              const v = r.ch[i];
                              return `${r.label} ${v === null ? "not meaningful" : `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`}`;
                            })
                            .join(", ")}`,
                      )
                      .join(". ")}`}
                  >
                    {/* one column per year, with the dip band behind the bars and the year label underneath */}
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${growthYears.length}, minmax(0, 1fr))` }}>
                      {growthYears.map((y, i) => (
                        <div key={y} className="relative px-1.5">
                          {dipCols[i] && (
                            <div className="absolute inset-0 rounded-3xl bg-danger-soft" aria-hidden="true" />
                          )}
                          <div className="relative flex h-9 items-center justify-center">
                            {dipCols[i] && (
                              <span className="text-[13px] font-bold uppercase tracking-wider text-danger">The dip</span>
                            )}
                          </div>
                          <div className="relative z-[2] flex justify-center gap-1.5 sm:gap-2" style={{ height: PLOT }}>
                            {growthSeries.map((r) => {
                              const v = r.ch[i];
                              // No bar when the growth rate is not meaningful (the year before was zero or negative).
                              if (v === null) return <div key={r.label} className="relative h-full w-6 sm:w-8" />;
                              return (
                                <div key={r.label} className="relative h-full w-6 sm:w-8">
                                  <div
                                    className={`absolute inset-x-0 ${r.tone} ${v >= 0 ? "rounded-t-md" : "rounded-b-md"}`}
                                    style={{ top: v >= 0 ? pct(up - v) : pct(up), height: pct(Math.abs(v)) }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="relative flex h-10 items-center justify-center text-[15px] font-semibold text-ink">
                            {y}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* grid lines over the bars area; the zero line is the dark one */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-9 z-[1]"
                      style={{ height: PLOT }}
                      aria-hidden="true"
                    >
                      {gridLevels.map((lv) => (
                        <div
                          key={lv}
                          className={`absolute inset-x-0 ${lv === 0 ? "h-[2px] bg-ink" : "h-px bg-border"}`}
                          style={{ top: pct(up - lv) }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {growthSeries.some((r) => r.ch.some((v) => v === null)) && (
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
                    A year with no bar means the year before was zero or negative, so a percentage change has no meaning.
                  </p>
                )}
              </div>
            </BandCard>
          </div>

          <p className="mt-4 max-w-[760px] text-[15px] leading-relaxed text-ink">{growth.note}</p>
          <SectionNote className="mt-6">
            {growth.howToRead}
          </SectionNote>
        </div>

        {/* Returns on capital: ROIC itself is in the blue card at the top, this is the comparison with the cost of capital */}
        <div className="pt-12">
          <Heading>{returns.title}</Heading>
          <div className="mt-5 grid items-center gap-x-10 gap-y-2 rounded-3xl border border-border bg-white px-5 py-6 sm:px-9 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <div className="font-serif text-[22px] font-medium leading-tight text-ink">
                What it earns vs what its money costs
              </div>
              {times > 0 && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  About <b className="font-semibold tabular-nums text-ink">{times} times</b> its cost of capital.
                  Anything above 1 time creates value.
                </p>
              )}
            </div>
            <div
              className="relative mb-14 mt-12 h-4 rounded-full bg-border"
              role="img"
              aria-label={`ROIC ${returns.roic} percent against a cost of capital of ${returns.wacc} percent`}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-chart-5"
                style={{ width: pos(returns.roic) }}
              />
              <div
                className="absolute top-1/2 h-8 w-[3px] -translate-y-1/2 rounded bg-ink"
                style={{ left: pos(returns.wacc) }}
              >
                <span className="absolute left-2 top-full mt-2 whitespace-nowrap text-[13px] font-semibold tabular-nums text-ink">
                  Cost of capital {returns.wacc}%
                </span>
              </div>
              <div
                className="absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-primary shadow-sm"
                style={{ left: pos(returns.roic) }}
              >
                <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap text-[13px] font-semibold tabular-nums text-ink">
                  ROIC {returns.roic}%
                </span>
              </div>
            </div>
          </div>
          <SectionNote className="mt-6">
            {returns.note}
          </SectionNote>
        </div>

        {/* Table */}
        <div className="pt-12">
          <BandCard title={data.tableTitle}>
            <div className="overflow-x-auto px-2 pb-3 pt-2 sm:px-3">
              <table className="w-full min-w-[600px] border-collapse text-sm tabular-nums">
                <caption className="sr-only">{data.tableTitle}, in $ billions unless shown as a percent</caption>
                <thead>
                  <tr className="text-[13px] text-ink-muted">
                    <th scope="col" className="sticky left-0 bg-white px-4 py-3 text-left font-medium">
                      $ billions
                    </th>
                    {years.map((y, i) => (
                      <th
                        key={y}
                        scope="col"
                        className={`px-4 py-3 text-right font-semibold ${
                          i === last ? "bg-primary-soft text-primary-ink" : "text-ink"
                        }`}
                      >
                        {y}
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Avg growth / yr
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r) => (
                    <tr key={r.label} className={`border-t ${r.sep ? "border-t-2 border-border" : "border-border"}`}>
                      <th
                        scope="row"
                        className={`sticky left-0 bg-white px-4 py-2.5 text-left text-ink ${
                          r.key ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {r.label}
                      </th>
                      {r.s.map((v, i) => (
                        <td
                          key={i}
                          className={`px-4 py-2.5 text-right ${
                            i === last ? "bg-primary-soft font-semibold text-primary-ink" : "text-ink"
                          }`}
                        >
                          {f1(v)}
                          {r.pct ? "%" : ""}
                        </td>
                      ))}
                      <td className="px-4 py-2.5 text-right text-ink-muted">
                        {r.pct ? "–" : r.avg === null ? "n/m" : `${f1(r.avg)}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BandCard>
          {tableRows.some((r) => !r.pct && r.avg === null) && (
            <p className="mt-2 text-[13px] text-ink-muted">n/m: not meaningful, because the first or last value is zero or negative.</p>
          )}
        </div>

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}