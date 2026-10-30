import { type ReactNode } from "react";

// How much cash Apple makes, how much it pays back, and whether the cash cushion is still safe.
// Main visuals: paired yearly bars (free cash flow vs cash paid out), buybacks vs dividends bar,
// ownership donuts, and five-year net cash.
// Server Component.

type Stat = { label: string; value: string; note: string };

export type CashAndReturnsData = {
  title: string;
  lead: string;
  labels: string[];
  years: string[]; // FY21..FY25
  fcf: number[];
  dividends: number[];
  buybacks: number[];
  returned: { title: string; howToRead: string; fcfNote: string };
  how: {
    title: string;
    shares: number[];
    sharesTitle: string;
    stats: Stat[];
    // Optional: only shown when real price history is available.
    tsr?: {
      title: string;
      rows: { name: string; value: number; gain: string }[];
      note: string;
    };
  };
  cushion: {
    title: string;
    cash: number[];
    debt: number[];
    equity: number[];
    currentAssets: number;
    currentLiabilities: number;
    currentRatioNote: string;
    howToRead: string;
  };
  source: string;
};

const usd0 = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const f1 = (v: number) => v.toFixed(1);
const sum = (a: number[]) => a.reduce((s, v) => s + v, 0);
const safeDiv = (a: number, b: number) => (b ? a / b : 0);

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="max-w-[820px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
      {children}
    </h3>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-[780px] border-l-2 border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
      {children}
    </p>
  );
}

function ValueBar({
  v,
  max,
  tone,
  text,
  strong,
}: {
  v: number;
  max: number;
  tone: string;
  text: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 shrink-0 rounded-full ${tone}`} style={{ width: `${Math.max(2, safeDiv(v, max) * 70)}%` }} />
      <span className={`text-[13px] tabular-nums ${strong ? "font-semibold text-ink" : "text-ink-muted"}`}>
        {text}
      </span>
    </div>
  );
}

/* A ring that shows one share of the whole, starting at the top. */
function OwnRing({ pct, label }: { pct: number; label: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const filled = Math.min(100, Math.max(0, pct));
  return (
    <div className="relative w-[clamp(120px,15vw,168px)]">
      <svg viewBox="0 0 120 120" className="block h-auto w-full" role="img" aria-label={`${label}: ${pct}% of Apple`}>
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="14" className="stroke-ink/10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="14"
          className="stroke-primary"
          strokeDasharray={`${(c * filled) / 100} ${c}`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(22px,2.6vw,30px)] font-medium tabular-nums text-ink">
        {pct}%
      </span>
    </div>
  );
}

export default function CashAndReturns({ data }: { data: CashAndReturnsData }) {
  const { years, fcf, dividends, buybacks, how, cushion } = data;
  const last = years.length - 1;
  if (last < 1) return null;

  const returned = dividends.map((d, i) => d + buybacks[i]);
  const maxA = Math.max(1, ...fcf, ...returned);
  const totalFcf = sum(fcf);
  const totalReturned = sum(returned);

  // Latest-year split between buybacks and dividends
  const buyShare = Math.round(safeDiv(buybacks[last], returned[last]) * 100);
  const divShare = 100 - buyShare;

  // Share count: own 10% at the start, how much of Apple that slice is today
  const sh = how.shares;
  const shChange = sh.length > 1 ? Math.round((sh[sh.length - 1] / sh[0] - 1) * 100) : 0;
  const ownNow = sh.length > 1 ? Math.round((sh[0] / sh[sh.length - 1]) * 100) / 10 : null;

  // Total shareholder return (optional)
  const tsr = how.tsr;
  const maxTsr = tsr ? Math.max(1, ...tsr.rows.map((r) => r.value)) : 1;

  // Net cash
  const net = cushion.cash.map((c, i) => c - cushion.debt[i]);
  const maxNet = Math.max(1, ...net);
  const netChange = Math.round((safeDiv(net[last], net[0]) - 1) * 100);
  const de = cushion.debt.map((d, i) => safeDiv(d, cushion.equity[i]));
  const currentRatio = safeDiv(cushion.currentAssets, cushion.currentLiabilities);

  return (
    <section id="cash" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
          {/* data.labels is no longer shown (the source line at the bottom says the same); it stays in the data type */}
        </header>

        {/* Main panel: cash earned vs cash paid out */}
        <div className="mt-8 rounded-2xl border border-border bg-white p-5 sm:p-6">
          <Heading>{data.returned.title}</Heading>

          {/* five-year totals */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface p-4">
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="size-3 rounded bg-chart-5" aria-hidden="true" />
                Free cash flow earned, {years.length} years
              </div>
              <div className="mt-2 font-serif text-[clamp(34px,4.5vw,44px)] font-medium leading-none tracking-tight tabular-nums text-ink">
                {usd0(totalFcf)}B
              </div>
            </div>
            <div className="rounded-xl bg-primary-soft p-4">
              <div className="flex items-center gap-2 text-sm text-primary-ink">
                <span className="size-3 rounded bg-primary" aria-hidden="true" />
                Dividends and buybacks paid
              </div>
              <div className="mt-2 font-serif text-[clamp(34px,4.5vw,44px)] font-medium leading-none tracking-tight tabular-nums text-primary-ink">
                {usd0(totalReturned)}B
              </div>
            </div>
          </div>

          {/* grouped columns by year */}
          <div
            className="mt-6 overflow-x-auto"
            role="img"
            aria-label={years
              .map((y, i) => `${y}: earned $${Math.round(fcf[i])}B, paid out $${Math.round(returned[i])}B`)
              .join("; ")}
          >
            <div className="grid min-w-[460px] gap-3" style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}>
              {years.map((y, i) => {
                const pct = Math.round(safeDiv(returned[i], fcf[i]) * 100);
                const isLast = i === last;
                return (
                  <div key={y} className="flex flex-col items-center">
                    <div className="flex h-[170px] w-full items-end justify-center gap-1.5">
                      {[
                        { v: fcf[i], c: "bg-chart-5" },
                        { v: returned[i], c: "bg-primary" },
                      ].map((b, k) => (
                        <div key={k} className="flex h-full w-[38%] max-w-[44px] flex-col items-center justify-end">
                          <span className={`mb-1 text-xs tabular-nums ${isLast ? "font-semibold text-ink" : "text-ink-muted"}`}>
                            {Math.round(b.v)}
                          </span>
                          <div
                            className={`w-full rounded-t-lg transition-[filter] duration-200 hover:brightness-110 ${b.c}`}
                            style={{ height: `${Math.max(3, (b.v / maxA) * 88)}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <span className={`mt-2 text-[13px] tabular-nums ${isLast ? "font-semibold text-ink" : "text-ink-muted"}`}>
                      {y}
                    </span>
                    <span
                      className={`mt-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${
                        pct > 100 ? "bg-primary text-white" : "bg-primary-soft text-primary-ink"
                      }`}
                    >
                      {pct > 100 ? "▲ " : ""}
                      {pct}% paid out
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Note>{data.returned.howToRead}</Note>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{data.returned.fcfNote}</p>
        </div>

        {/* How it is paid back */}
        <div className="pt-12">
          <Heading>{how.title}</Heading>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {/* Left: buybacks vs dividends, then four numbers */}
            <div className="min-w-0 rounded-2xl border border-border bg-white p-6 sm:p-8">
              <div className="text-[15px] text-ink-muted">Paid to shareholders in {years[last]}</div>

              <div
                className="mt-4 flex h-[72px] gap-2 overflow-hidden rounded-2xl"
                role="img"
                aria-label={`Buybacks ${buyShare}%, dividends ${divShare}%`}
              >
                <div
                  className="flex min-w-0 flex-col justify-center bg-primary px-4 text-white"
                  style={{ flex: `${Math.max(buyShare, 1)} 1 0` }}
                >
                  <span className="truncate text-[15px]">Buybacks</span>
                  <span className="text-[clamp(18px,2.2vw,24px)] font-semibold leading-tight tabular-nums">
                    {buyShare}% · ${f1(buybacks[last])}B
                  </span>
                </div>
                <div
                  className="flex min-w-[88px] flex-col justify-center bg-share-2 px-4 text-white"
                  style={{ flex: `${Math.max(divShare, 1)} 1 0` }}
                >
                  <span className="truncate text-[15px]">Dividends</span>
                  <span className="text-[clamp(18px,2.2vw,24px)] font-semibold leading-tight tabular-nums">
                    {divShare}%
                  </span>
                </div>
              </div>
              <p className="mt-2 text-right text-[14px] tabular-nums text-ink-muted">Dividends ${f1(dividends[last])}B</p>

              <ul className="mt-5 grid gap-x-8 gap-y-7 border-t border-border pt-6 sm:grid-cols-2">
                {how.stats.map((s) => (
                  <li key={s.label} className="min-w-0">
                    <span className="block text-[15px] font-semibold text-ink">{s.label}</span>
                    <span className="mt-1 block font-serif text-[clamp(32px,3.6vw,42px)] font-medium leading-none tracking-tight tabular-nums text-ink">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-snug text-ink-muted">{s.note}</span>
                  </li>
                ))}
              </ul>

              {tsr && tsr.rows.length > 0 && (
                <>
                  <div className="mt-6 border-t border-border pt-4 text-sm font-semibold text-ink">{tsr.title}</div>
                  <ul className="mt-1">
                    {tsr.rows.map((r, i) => (
                      <li key={r.name} className="grid grid-cols-[72px_1fr] items-center gap-3 border-b border-border py-2.5 last:border-b-0">
                        <span className="text-sm font-semibold text-ink">{r.name}</span>
                        <div>
                          <ValueBar
                            v={r.value}
                            max={maxTsr}
                            tone={i === 0 ? "bg-primary" : "bg-border"}
                            text={usd0(r.value)}
                            strong={i === 0}
                          />
                          <div className="mt-1 text-[13px] tabular-nums text-ink-muted">{r.gain}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{tsr.note}</p>
                </>
              )}
            </div>

            {/* Right: your slice of Apple, then vs now */}
            {sh.length > 1 && ownNow !== null && (
              <div className="flex min-w-0 flex-col rounded-2xl border border-border bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[15px] text-ink-muted">Your slice of Apple</span>
                  <span className="rounded-full bg-success-soft px-3 py-1 text-[14px] font-semibold tabular-nums text-success">
                    ▼ {Math.abs(shChange)}% fewer shares
                  </span>
                </div>

                <div className="my-8 flex items-start justify-center gap-[clamp(16px,4vw,48px)]">
                  <div className="flex flex-col items-center text-center">
                    <OwnRing pct={10} label={years[0]} />
                    <span className="mt-4 text-[17px] font-semibold text-ink">{years[0]}</span>
                    <span className="text-[14px] tabular-nums text-ink-muted">{f1(sh[0])}B diluted shares</span>
                  </div>
                  <span className="mt-[clamp(52px,7vw,76px)] text-2xl text-ink-muted" aria-hidden="true">
                    →
                  </span>
                  <div className="flex flex-col items-center text-center">
                    <OwnRing pct={ownNow} label="Today" />
                    <span className="mt-4 text-[17px] font-semibold text-ink">Today</span>
                    <span className="text-[14px] tabular-nums text-ink-muted">
                      {f1(sh[sh.length - 1])}B diluted shares
                    </span>
                  </div>
                </div>

                <p className="mt-auto text-[17px] leading-relaxed text-ink">
                  Own 10% of Apple in {years[0]} and buy nothing more, and you own {ownNow}% today.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cash cushion */}
        <div className="pt-12">
          <Heading>{cushion.title}</Heading>

          {/* Net cash: bars on the left, plain-words reading on the right */}
          <div className="mt-5 grid gap-6 rounded-2xl border border-border bg-white p-5 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[14px] text-ink-muted">Net cash ($B)</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold tabular-nums ${
                    netChange < 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success"
                  }`}
                >
                  {netChange < 0 ? "▼ −" : "▲ +"}
                  {Math.abs(netChange)}% since {years[0]}
                </span>
              </div>
              <div
                className="mt-4 flex items-end gap-2.5"
                role="img"
                aria-label={`Net cash: ${net.map((v, i) => `${years[i]} $${Math.round(v)}B`).join(", ")}`}
              >
                {net.map((v, i) => {
                  const isLast = i === net.length - 1;
                  return (
                    <div key={years[i]} className="flex min-w-0 flex-1 flex-col items-center gap-1 text-[13px] text-ink-muted">
                      <span className={`tabular-nums ${isLast ? "font-semibold text-ink" : ""}`}>
                        {v >= 0 ? "+" : "−"}
                        {Math.abs(Math.round(v))}
                      </span>
                      <div className="flex h-[130px] w-full items-end">
                        <div
                          className={`w-full rounded-t-lg ${isLast ? "bg-primary" : "bg-ink/10"}`}
                          style={{ height: `${Math.max(3, (Math.max(v, 0) / maxNet) * 100)}%` }}
                        />
                      </div>
                      <span className="mt-0.5 tabular-nums">{years[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0 lg:pt-8">
              <p className="text-[clamp(17px,1.8vw,20px)] leading-snug text-ink">
                Cash and securities ${f1(cushion.cash[last])}B minus debt ${f1(cushion.debt[last])}B leaves net cash of{" "}
                {net[last] >= 0 ? "+" : "−"}${f1(Math.abs(net[last]))}B.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{cushion.howToRead}</p>
            </div>
          </div>

          {/* Three supporting numbers */}
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            <li className="flex flex-col justify-center rounded-2xl border border-border bg-white p-5">
              <div className="flex items-end justify-between gap-3">
                <span className="text-[16px] font-semibold text-ink">Total debt</span>
                <span className="font-serif text-[clamp(28px,3.2vw,36px)] font-medium leading-none tabular-nums text-ink">
                  {usd0(cushion.debt[last])}B
                </span>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">
                {cushion.debt[last] <= cushion.debt[0] ? "Down" : "Up"} from {usd0(cushion.debt[0])}B in {years[0]}.
              </p>
            </li>
            <li className="flex flex-col justify-center rounded-2xl border border-border bg-white p-5">
              <div className="flex items-end justify-between gap-3">
                <span className="text-[16px] font-semibold text-ink">Debt to equity</span>
                <span className="font-serif text-[clamp(28px,3.2vw,36px)] font-medium leading-none tabular-nums text-ink">
                  {de[last].toFixed(2)}×
                </span>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">
                Owes ${de[last].toFixed(2)} for every $1 of its own money, {de[last] <= de[0] ? "down" : "up"} from{" "}
                {de[0].toFixed(2)}× in {years[0]}.
              </p>
            </li>
            <li className="flex flex-col justify-center rounded-2xl border border-border bg-white p-5">
              <div className="flex items-end justify-between gap-3">
                <span className="text-[16px] font-semibold text-ink">Current ratio</span>
                <span className="font-serif text-[clamp(28px,3.2vw,36px)] font-medium leading-none tabular-nums text-ink">
                  {currentRatio.toFixed(2)}
                </span>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">{cushion.currentRatioNote}</p>
            </li>
          </ul>
        </div>

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}