import { type ReactNode } from "react";

// Is Apple's price high or low against what its cash is worth, its own history and analyst targets?
// Main visuals: a range bar per reference point (football field), required vs actual growth,
// and bars showing how far today's multiples sit above their own averages.
// Server Component.

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
  fair: number;
  field: { max: number; howToRead: string; rows: FieldRow[] };
  implied: {
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
    // The last item is "now"; the average is taken over the items before it.
    years: { year: string; value: number }[];
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

// A full bar in the "how far above its average" chart means +50% or more.
const PREMIUM_FULL = 50;

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="max-w-[900px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
      {children}
    </h3>
  );
}

export default function Valuation({ data }: { data: ValuationData }) {
  const { field, implied, history } = data;
  const gap = (data.price / (data.fair || 1) - 1) * 100;
  const above = gap >= 0;

  // Average of the past years only: the last bar is "now" and is left out.
  const past = history.years.length > 1 ? history.years.slice(0, -1) : history.years;
  const peAvg = past.length ? past.reduce((s, y) => s + y.value, 0) / past.length : 0;
  const peMax = Math.max(1, ...history.years.map((y) => y.value)) * 1.05;
  const peNow = history.years.length ? history.years[history.years.length - 1].value : 0;
  const peIsHighest = history.years.length > 1 && peNow >= Math.max(...past.map((y) => y.value));

  // Multiples ordered from the biggest premium to the smallest.
  const multiples = [...history.multiples]
    .map((m) => ({ ...m, premium: (m.now / (m.avg || 1) - 1) * 100 }))
    .sort((a, b) => b.premium - a.premium);

  // Scale for the price vs fair value strip
  const stripMax = Math.max(data.price, data.fair) * 1.15;

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

        {/* Hero: price vs fair value */}
        <div className="mt-8 grid gap-6 rounded-[28px] border border-border bg-white p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
          <div>
            <div className="text-sm text-ink-muted">Price vs base-case fair value</div>
            <div
              className={`mt-2 font-serif text-[clamp(52px,7vw,72px)] font-medium leading-none tracking-tight tabular-nums ${
                above ? "text-warning" : "text-success"
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
              <div className="rounded-xl bg-surface p-4">
                <div className="text-[13px] text-ink-muted">Share price</div>
                <div className="mt-1 font-serif text-[30px] font-medium leading-none tabular-nums text-ink">
                  {usd(data.price)}
                </div>
                <div className="mt-2 text-[13px] text-ink-muted">As of {data.priceDate}</div>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <div className="text-[13px] text-ink-muted">Fair value, base case</div>
                <div className="mt-1 font-serif text-[30px] font-medium leading-none tabular-nums text-ink">
                  {usd(data.fair)}
                </div>
                <div className="mt-2 text-[13px] text-ink-muted">Our cash flow (DCF) estimate</div>
              </div>
            </div>

            {/* strip: fair value and price on one scale, the gap shaded */}
            <div
              className="relative mt-6 h-3 rounded-full bg-border"
              role="img"
              aria-label={`Fair value ${usd(data.fair)}, price ${usd(data.price)}, a gap of ${Math.abs(Math.round(gap))} percent`}
            >
              <div
                className={`absolute inset-y-0 ${above ? "bg-warning-soft" : "bg-success-soft"}`}
                style={{
                  left: pos(Math.min(data.fair, data.price), stripMax),
                  width: `${(Math.abs(data.price - data.fair) / stripMax) * 100}%`,
                }}
              />
              <div
                className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-primary shadow-sm"
                style={{ left: pos(data.fair, stripMax) }}
              />
              <div
                className="absolute top-1/2 h-7 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded bg-ink"
                style={{ left: pos(data.price, stripMax) }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[13px] text-ink-muted">
              <span>● Fair value</span>
              <span>| Price</span>
            </div>
          </div>
        </div>

        {/* Football field */}
        {field.rows.length > 0 && (
          <div className="pt-12">
            <Heading>Three reference points, and where today’s price sits</Heading>
            <div className="mt-5 rounded-[28px] border border-border bg-white p-5 sm:p-6">
              <div className="relative pt-8">
                {/* dashed price line across every row */}
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0" aria-hidden="true">
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
                          <span className="text-[13px] tabular-nums text-ink-muted">
                            Range {usd(r.low)} to {usd(r.high)} · {r.markName} {usd(r.mark)} · price is{" "}
                            <b className="font-semibold text-ink">{signedPct(vs)}</b> vs {r.markName.toLowerCase()}
                          </span>
                        </div>
                        <div className="relative mt-4 h-3 rounded-full bg-surface">
                          <div
                            className="absolute inset-y-0 rounded-full bg-chart-5"
                            style={{
                              left: pos(r.low, field.max),
                              width: `${(Math.max(0, r.high - r.low) / (field.max || 1)) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-primary shadow-sm"
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

        {/* What the price expects */}
        <div className="pt-12">
          <Heading>{implied.title}</Heading>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="min-w-0 rounded-[28px] border border-border bg-white p-5 sm:p-6">
              <div className="text-sm text-ink-muted">Free cash flow growth per year</div>

              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-semibold text-ink">The price needs</span>
                  <span className="font-serif text-4xl font-medium leading-none tabular-nums text-ink">
                    {implied.needed}%
                  </span>
                </div>
                <div className="mt-2.5 h-3 rounded-full bg-surface">
                  <div className="h-full w-full rounded-full bg-primary" />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-semibold text-ink">{implied.actualLabel}</span>
                  <span className="font-serif text-4xl font-medium leading-none tabular-nums text-ink">
                    {implied.actual}%
                  </span>
                </div>
                <div className="mt-2.5 h-3 rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-ink-muted"
                    style={{ width: `${Math.min(100, (implied.actual / (implied.needed || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <p className="mt-5 border-t border-border pt-4 text-[15px] leading-relaxed text-ink">{implied.text}</p>
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

        {/* History */}
        <div className="pt-12">
          <Heading>{history.title}</Heading>
          <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left: P/E now, big, with ten years of bars */}
            {history.years.length > 0 && (
              <div className="flex min-w-0 flex-col rounded-[28px] border border-border bg-white p-6 sm:p-8">
                <div className="text-base text-ink-muted">P/E now</div>
                <div className="mt-2 flex items-baseline">
                  <span className="font-serif text-[clamp(64px,8vw,92px)] font-semibold leading-none tracking-tight tabular-nums text-primary">
                    {peNow}
                  </span>
                  <span
                    className="ml-1 font-serif text-[clamp(30px,4vw,44px)] font-light leading-none text-primary opacity-70"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span className="sr-only"> times</span>
                </div>
                <p className="mt-4 max-w-[340px] text-lg leading-snug text-ink">
                  {peIsHighest
                    ? "Higher than at any fiscal year end in the last ten years."
                    : `${peNow >= peAvg ? "Above" : "Below"} its ten-year average of ${peAvg.toFixed(1)}×.`}
                </p>

                <div
                  className="mt-8"
                  role="img"
                  aria-label={`P/E: ${history.years.map((y) => `${y.year} ${y.value}`).join(", ")}. Average ${peAvg.toFixed(1)}`}
                >
                  <div className="relative flex h-36 items-end gap-1.5 border-b border-border">
                    {history.years.map((y, i) => {
                      const last = i === history.years.length - 1;
                      return (
                        <div key={y.year} className="flex h-full flex-1 items-end">
                          <div
                            className={`w-full rounded-t-md ${last ? "bg-primary" : "bg-border"}`}
                            style={{ height: `${(y.value / peMax) * 100}%` }}
                            title={`${y.year}: ${y.value}×`}
                          />
                        </div>
                      );
                    })}
                    <div
                      className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-ink"
                      style={{ bottom: `${(peAvg / peMax) * 100}%` }}
                    />
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
            )}

            {/* Right: how far each multiple sits above its own average */}
            {multiples.length > 0 && (
              <div className="min-w-0 rounded-[28px] border border-border bg-white p-6 sm:p-8">
                <div className="text-base text-ink-muted">How far above its own 5-year average</div>
                <ul className="mt-3">
                  {multiples.map((m) => {
                    const up = m.premium >= 0;
                    const width = Math.min(100, (Math.abs(m.premium) / PREMIUM_FULL) * 100);
                    return (
                      <li key={m.name} className="border-b border-border py-4 last:border-b-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="text-xl font-semibold leading-tight text-ink">{m.name}</span>
                          <span className="text-sm tabular-nums text-ink-muted">
                            <b className="font-semibold text-ink">{m.now}×</b> now · {m.avg}× 5-year avg
                            {m.peers !== undefined && <> · {m.peers}× peers</>}
                          </span>
                        </div>
                        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                          <div
                            className="h-4 overflow-hidden rounded-full bg-surface"
                            role="img"
                            aria-label={`${m.name} is ${plainPct(m.premium)} versus its 5-year average`}
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