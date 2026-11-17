import { type ReactNode } from "react";

// Is the company's price high or low against what its cash is worth, its own history and analyst targets?
// Main visuals: a range bar per reference point (football field), required vs actual growth,
// and bars showing how far today's multiples sit from their own averages (above or below).
// Company-neutral: the length of the average ("5-year", "10-year") and everything else comes from `data`.
// Server Component.
//
// Look only: the data type, props and every calculation are unchanged.
// Tracks (the pale bar behind a range or a value) use bg-primary-soft. The old bg-surface is not a token in
// design-tokens.css, so Tailwind did not generate it and the tracks were invisible.

type FieldRow = {
  name: string;
  low: number;
  high: number;
  mark: number;
  markName: string;
};

// peers is optional: leave it out when there is no reliable same-date peer data.
type Multiple = { name: string; now: number; avg: number; peers?: number };

export type ValuationData = {
  title: string;
  lead: string;
  labels: string[];
  price: number;
  priceDate: string;
  // fair is null when Scope does not show a fair value (for example when free cash flow is negative).
  // In that case also fill noFair, and leave implied out.
  fair: number | null;
  noFair?: {
    title: string;
    text: string;
    points: { label: string; value: string; note: string }[];
  };
  field: { max: number; howToRead: string; rows: FieldRow[]; title?: string };
  implied?: {
    title: string;
    needed: number; // % per year the price needs
    actual: number; // % per year actually grown
    actualLabel: string; // e.g. "Since FY21"
    text: string;
    cases: string[];
    assumptions: { label: string; values: string[] }[];
    fairValues: number[];
    note: string;
  };
  history: {
    title: string;
    // The last item is "now"; bars before it are the fiscal year ends.
    years: { year: string; value: number }[];
    /**
     * The average P/E the dashed line shows. Give it when the average covers a different period than the bars
     * (for example a 5-year average next to ten bars). Without it, the average of the bars before "now" is used.
     */
    peAverage?: number;
    /** Length of that average, for example "5-year". Used in the wording next to the average. */
    averagePeriod?: string;
    peSubtitle: string;
    peHowToRead: string;
    multiples: Multiple[];
    multiplesHowToRead: string;
  };
  source: string;
};

const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const pos = (v: number, max: number) => `${Math.min(100, Math.max(0, (v / (max || 1)) * 100)).toFixed(2)}%`;
const signedPct = (v: number) => `${v >= 0 ? "▲ +" : "▼ −"}${Math.abs(Math.round(v))}%`;
const plainPct = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(Math.round(v))}%`;

// A full bar in the "how far from its average" chart means 50% or more away from it.
const PREMIUM_FULL = 50;
// The gap band under the hero reaches its full colour when the price is 50% or more away from fair value.
const GAP_FULL = 50;

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="max-w-[900px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
      {children}
    </h3>
  );
}

export default function Valuation({ data }: { data: ValuationData }) {
  const { field, implied, history } = data;
  const fair = data.fair;
  const hasFair = fair !== null && implied !== undefined;
  const gap = hasFair ? (data.price / (fair || 1) - 1) * 100 : 0;
  const above = gap >= 0;

  // Colour only: red when the price is above fair value, green when below.
  // The gap band goes from a pale tint to the full colour as the gap grows.
  const toneVar = above ? "var(--color-danger)" : "var(--color-success)";
  const toneSoftVar = above ? "var(--color-danger-soft)" : "var(--color-success-soft)";
  const intensity = Math.round(Math.min(1, Math.abs(gap) / GAP_FULL) * 100);
  const bandColor = `color-mix(in srgb, ${toneVar} ${intensity}%, ${toneSoftVar})`;

  // The bars before the last one are the fiscal year ends; the last bar is "now" and is left out of the average.
  const past = history.years.length > 1 ? history.years.slice(0, -1) : [];
  const barAvg = past.length ? past.reduce((s, y) => s + y.value, 0) / past.length : 0;
  // The dashed line uses the average from the data when it is given, so the line and the text always agree.
  const peAvg = history.peAverage ?? barAvg;
  const hasAvg = history.peAverage !== undefined || past.length > 0;
  const peMax = Math.max(1, ...history.years.map((y) => y.value), peAvg) * 1.05;
  const peNow = history.years.length ? history.years[history.years.length - 1].value : 0;
  const peIsHighest = past.length > 0 && peNow >= Math.max(...past.map((y) => y.value));
  const avgPeriod = history.averagePeriod ? `${history.averagePeriod} ` : "";

  // Multiples ordered from the biggest premium to the smallest.
  const multiples = [...history.multiples]
    .map((m) => ({ ...m, premium: (m.now / (m.avg || 1) - 1) * 100 }))
    .sort((a, b) => b.premium - a.premium);

  // Scale for the price vs fair value strip
  const stripMax = Math.max(data.price, fair ?? 0) * 1.15;

  return (
    <section id="valuation" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
          {/* data.labels is no longer shown (the source line at the bottom says the same); it stays in the data type */}
        </header>

        {/* Hero: price vs fair value (or, when there is no fair value, the price and why) */}
        {hasFair ? (
          <div className="mt-8 grid gap-6 rounded-[28px] border border-border bg-white p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
            <div>
              <div className="text-sm text-ink-muted">Price vs base-case fair value</div>
              <div
                className={`mt-2 font-serif text-[clamp(52px,7vw,72px)] font-medium leading-none tracking-tight tabular-nums ${
                  above ? "text-danger" : "text-success"
                }`}
              >
                {signedPct(gap)}
              </div>
              <p className="mt-3 text-[15px] text-ink-muted">
                {above ? "The price is above our fair value estimate." : "The price is below our fair value estimate."}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="bg-primary px-4 py-3.5 text-white">
                    <div className="text-[13px]">Share price</div>
                    <div className="mt-1 font-serif text-4xl font-medium leading-[1.1] tabular-nums">{usd(data.price)}</div>
                  </div>
                  <div className="px-4 py-3 text-[13px] text-ink-muted">As of {data.priceDate}</div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="bg-primary px-4 py-3.5 text-white">
                    <div className="text-[13px]">Fair value, base case</div>
                    <div className="mt-1 font-serif text-4xl font-medium leading-[1.1] tabular-nums">{usd(fair)}</div>
                  </div>
                  <div className="px-4 py-3 text-[13px] text-ink-muted">Our cash flow (DCF) estimate</div>
                </div>
              </div>

              {/* strip: fair value and price on one scale, the gap coloured by how far apart they are */}
              <div
                className="relative mt-6 h-3 rounded-full bg-border"
                role="img"
                aria-label={`Fair value ${usd(fair)}, price ${usd(data.price)}, a gap of ${Math.abs(Math.round(gap))} percent`}
              >
                <div
                  className="absolute inset-y-0"
                  style={{
                    background: bandColor,
                    left: pos(Math.min(fair, data.price), stripMax),
                    width: `${(Math.abs(data.price - fair) / stripMax) * 100}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-sm"
                  style={{ left: pos(fair, stripMax), background: toneVar }}
                />
                <div
                  className="absolute top-1/2 h-7 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded bg-ink"
                  style={{ left: pos(data.price, stripMax) }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[13px] text-ink-muted">
                <span>
                  <span style={{ color: toneVar }}>●</span> Fair value
                </span>
                <span>| Price</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 rounded-[28px] border border-border bg-white p-5 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
            <div>
              <div className="text-sm text-ink-muted">Share price</div>
              <div className="mt-2 font-serif text-[clamp(52px,7vw,72px)] font-medium leading-none tracking-tight tabular-nums text-ink">
                {usd(data.price)}
              </div>
              <p className="mt-3 text-[15px] text-ink-muted">As of {data.priceDate}</p>
              <div className="mt-5 inline-block rounded-full bg-primary-soft px-3 py-1 text-[13px] font-semibold text-primary-ink">
                No fair value shown
              </div>
            </div>
            <div className="min-w-0">
              {data.noFair && (
                <>
                  <h3 className="font-serif text-[clamp(20px,2.4vw,26px)] font-normal leading-[1.2] tracking-[-0.02em] text-ink">
                    {data.noFair.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink">{data.noFair.text}</p>
                  {data.noFair.points.length > 0 && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {data.noFair.points.map((p) => (
                        <div key={p.label} className="rounded-2xl border border-border bg-white p-4">
                          <div className="text-[13px] text-ink-muted">{p.label}</div>
                          <div className="mt-1 font-serif text-[26px] font-medium leading-none tabular-nums text-ink">{p.value}</div>
                          <div className="mt-2 text-[13px] leading-snug text-ink-muted">{p.note}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Football field */}
        {field.rows.length > 0 && (
          <div className="pt-12">
            <Heading>{field.title ?? "Where today’s price sits against each reference point"}</Heading>
            <div className="mt-5 rounded-[28px] border border-border bg-white p-5 sm:p-6">
              <div className="relative pt-8">
                {/* dashed price line across every row; it sits above the bars (z-10) and below the text (z-20) */}
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10" aria-hidden="true">
                  <div
                    className="absolute top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-0.5 text-[13px] font-semibold tabular-nums text-white"
                    style={{ left: pos(data.price, field.max) }}
                  >
                    Price {usd(data.price)}
                  </div>
                  <div
                    className="absolute bottom-0 top-6 border-l-2 border-dashed border-ink"
                    style={{ left: pos(data.price, field.max) }}
                  />
                </div>

                <ul className="relative">
                  {field.rows.map((r) => {
                    const vs = (data.price / (r.mark || 1) - 1) * 100;
                    return (
                      <li key={r.name} className="border-b border-border py-4 first:pt-3 last:border-b-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="text-[15px] font-semibold text-ink">{r.name}</span>
                          <span className="relative z-20 bg-white px-1.5 text-[13px] tabular-nums text-ink-muted">
                            Range {usd(r.low)} to {usd(r.high)} · {r.markName} {usd(r.mark)} · price is{" "}
                            <b className="font-semibold text-ink">{signedPct(vs)}</b> vs {r.markName.toLowerCase()}
                          </span>
                        </div>
                        {/* track (pale bar behind) + range bar + middle estimate dot */}
                        <div className="relative mt-4 h-3 rounded-full bg-primary-soft">
                          <div
                            className="absolute inset-y-0 rounded-full bg-chart-4"
                            style={{
                              left: pos(r.low, field.max),
                              width: `${(Math.max(0, r.high - r.low) / (field.max || 1)) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute top-1/2 z-20 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-primary shadow-sm"
                            style={{ left: pos(r.mark, field.max) }}
                            title={`${r.markName} ${usd(r.mark)}`}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-2 flex justify-between text-[13px] tabular-nums text-ink-muted">
                <span>$0</span>
                <span>{usd(field.max)}</span>
              </div>
              <p className="mt-3 max-w-[760px] text-[13px] leading-relaxed text-ink-muted">{field.howToRead}</p>
            </div>
          </div>
        )}

        {/* What the price expects (left out when there is no fair value model) */}
        {implied && (
          <div className="pt-12">
            <Heading>{implied.title}</Heading>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
              <div className="min-w-0 overflow-hidden rounded-[28px] border border-border bg-white">
                <div className="bg-primary px-6 py-6 text-white sm:px-7">
                  <div className="text-sm">Free cash flow growth per year · the price needs</div>
                  <div className="mt-1.5 font-serif text-[clamp(48px,6vw,68px)] font-medium leading-[1.1] tabular-nums">
                    {implied.needed}%
                  </div>
                  <div className="mt-2.5 h-3 rounded-full bg-primary-ink">
                    <div className="h-full w-full rounded-full bg-white" />
                  </div>
                </div>

                <div className="grid gap-4 px-6 py-6 sm:px-7">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[15px] font-semibold text-ink">{implied.actualLabel}</span>
                      <span className="font-serif text-4xl font-medium leading-none tabular-nums text-ink">
                        {implied.actual}%
                      </span>
                    </div>
                    <div className="mt-2.5 h-3 rounded-full bg-primary-soft">
                      <div
                        className="h-full rounded-full bg-ink-muted"
                        style={{ width: `${Math.min(100, (implied.actual / (implied.needed || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <p className="border-t border-border pt-4 text-[15px] leading-relaxed text-ink">{implied.text}</p>
                </div>
              </div>

              <div className="min-w-0">
                <div className="overflow-x-auto rounded-[28px] border border-border bg-white">
                  <table className="w-full min-w-[440px] border-collapse text-sm tabular-nums">
                    <caption className="sr-only">Assumptions and fair value in each case</caption>
                    <thead>
                      <tr className="text-[13px] text-ink-muted">
                        <th scope="col" className="px-4 py-3 text-left font-medium">
                          Assumption
                        </th>
                        {implied.cases.map((c, i) => (
                          <th
                            key={c}
                            scope="col"
                            className={`px-4 py-3 text-right font-semibold ${
                              i === 1 ? "bg-primary-soft text-primary-ink" : "text-ink"
                            }`}
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {implied.assumptions.map((a) => (
                        <tr key={a.label} className="border-t border-border">
                          <th scope="row" className="px-4 py-2.5 text-left font-normal text-ink">
                            {a.label}
                          </th>
                          {a.values.map((v, i) => (
                            <td
                              key={i}
                              className={`px-4 py-2.5 text-right ${
                                i === 1 ? "bg-primary-soft font-semibold text-primary-ink" : "text-ink"
                              }`}
                            >
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="border-t-2 border-border">
                        <th scope="row" className="px-4 py-3.5 text-left font-semibold text-ink">
                          Fair value per share
                        </th>
                        {implied.fairValues.map((v, i) => (
                          <td
                            key={i}
                            className={`px-4 py-3.5 text-right font-serif text-2xl font-medium ${
                              i === 1 ? "bg-primary-soft text-primary-ink" : "text-ink"
                            }`}
                          >
                            {usd(v)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 border-l-2 border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
                  {implied.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* History */}
        <div className="pt-12">
          <Heading>{history.title}</Heading>
          <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left: P/E now, big, with the bars of past years */}
            {history.years.length > 0 && (
              <div className="flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-border bg-white">
                <div className="bg-primary px-6 py-6 text-white sm:px-7">
                  <div className="text-sm">P/E now</div>
                  <div className="mt-2 flex items-baseline">
                    <span className="font-serif text-[clamp(64px,8vw,84px)] font-semibold leading-none tracking-tight tabular-nums">
                      {peNow}
                    </span>
                    <span
                      className="ml-1 font-serif text-[clamp(30px,4vw,42px)] font-light leading-none opacity-75"
                      aria-hidden="true"
                    >
                      ×
                    </span>
                    <span className="sr-only"> times</span>
                  </div>
                  {hasAvg && (
                    <p className="mt-3 max-w-[340px] text-[17px] leading-snug">
                      {peIsHighest
                        ? `Higher than at any of the last ${past.length} fiscal year ends.`
                        : history.averagePeriod
                          ? `${peNow >= peAvg ? "Above" : "Below"} its ${history.averagePeriod} average of ${peAvg.toFixed(1)}×.`
                          : `${peNow >= peAvg ? "Above" : "Below"} the average of ${peAvg.toFixed(1)}× over the last ${past.length} fiscal year ends.`}
                    </p>
                  )}
                </div>

                <div className="p-6 sm:p-7">
                  <div
                    role="img"
                    aria-label={`P/E: ${history.years.map((y) => `${y.year} ${y.value}`).join(", ")}.${hasAvg ? ` Average ${peAvg.toFixed(1)}` : ""}`}
                  >
                    <div className="relative flex h-40 items-end gap-1.5 border-b border-border">
                      {history.years.map((y, i) => {
                        const last = i === history.years.length - 1;
                        return (
                          <div key={y.year} className="flex h-full flex-1 items-end">
                            <div
                              className={`w-full rounded-t-md ${last ? "bg-primary" : "bg-chart-compare"}`}
                              style={{ height: `${(y.value / peMax) * 100}%` }}
                              title={`${y.year}: ${y.value}×`}
                            />
                          </div>
                        );
                      })}
                      {hasAvg && (
                        <>
                          <div
                            className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-ink"
                            style={{ bottom: `${(peAvg / peMax) * 100}%` }}
                          />
                          <div
                            className="pointer-events-none absolute left-0 -translate-y-full bg-white pb-0.5 pr-1.5 text-xs font-semibold tabular-nums text-ink"
                            style={{ bottom: `${(peAvg / peMax) * 100}%` }}
                          >
                            {avgPeriod}average {peAvg.toFixed(1)}×
                          </div>
                        </>
                      )}
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      {history.years.map((y, i) => (
                        <span
                          key={y.year}
                          className={`flex-1 text-center text-xs tabular-nums ${
                            i === history.years.length - 1 ? "font-semibold text-ink" : "text-ink-muted"
                          }`}
                        >
                          {y.year}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{history.peHowToRead}</p>
                </div>
              </div>
            )}

            {/* Right: how far each multiple sits from its own average, above or below */}
            {multiples.length > 0 && (
              <div className="min-w-0 rounded-[28px] border border-border bg-white p-6 sm:p-8">
                <div className="text-base text-ink-muted">How far from its own {avgPeriod}average</div>
                <ul className="mt-3">
                  {multiples.map((m) => {
                    const up = m.premium >= 0;
                    const width = Math.min(100, (Math.abs(m.premium) / PREMIUM_FULL) * 100);
                    return (
                      <li key={m.name} className="border-b border-border py-4 last:border-b-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="text-xl font-semibold leading-tight text-ink">{m.name}</span>
                          <span className="text-sm tabular-nums text-ink-muted">
                            <b className="font-semibold text-ink">{m.now}×</b> now · {m.avg}× {avgPeriod}avg
                            {m.peers !== undefined && <> · {m.peers}× peers</>}
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                          <div
                            className="h-4 overflow-hidden rounded-full bg-primary-soft"
                            role="img"
                            aria-label={`${m.name} is ${plainPct(m.premium)} versus its ${avgPeriod}average`}
                          >
                            <div
                              className={`h-full rounded-full ${up ? "bg-[#e0a64f]" : "bg-success"}`}
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <span
                            className={`min-w-[72px] text-right font-serif text-[28px] font-semibold leading-none tabular-nums ${
                              up ? "text-warning" : "text-success"
                            }`}
                          >
                            {plainPct(m.premium)}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{history.multiplesHowToRead}</p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}