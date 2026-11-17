import { type ReactNode } from "react";

// How much cash the company makes, how much it pays back, and whether the cash cushion is still safe.
// Main visuals: paired yearly bars (free cash flow vs cash paid out), buybacks vs dividends bar,
// ownership donuts, and five-year net cash.
// Layout: each block is a stack of white cards, and every card has a blue header band with its key number.
// Company-neutral: the company name and the fiscal years come from `data`. Without a name, "the company" is used.
// Handles zero payouts, negative free cash flow, negative net cash and a rising share count.
// Server Component.

type Stat = { label: string; value: string; note: string };

export type CashAndReturnsData = {
  /** Used in "Your slice of Apple". Optional: without it the text says "the company". */
  companyName?: string;
  title: string;
  lead: string;
  labels: string[];
  years: string[]; // fiscal year labels, oldest first (for example FY22..FY26)
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

const sgn = (v: number) => (v < 0 ? "−" : "");
const usd0 = (v: number) => `${sgn(v)}$${Math.round(Math.abs(v)).toLocaleString("en-US")}`;
const int0 = (v: number) => `${sgn(Math.round(v))}${Math.abs(Math.round(v))}`;
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

/* Stack of white cards (no background). */
function Panel({ children }: { children: ReactNode }) {
  return <div className="mt-5 flex flex-col gap-4">{children}</div>;
}

/* White card with a blue header band: small label, then the key number at a moderate size. */
function BandCard({
  label,
  big,
  sub,
  children,
  className = "",
}: {
  label: string;
  big: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-border bg-white ${className}`}>
      <div className="bg-primary px-5 py-4 text-white sm:px-6">
        <p className="text-sm font-semibold text-primary-soft">{label}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-[clamp(26px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em] tabular-nums">
            {big}
          </span>
          {sub && <span className="text-sm text-primary-soft">{sub}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">{children}</div>
    </div>
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
function OwnRing({ pct, label, who }: { pct: number; label: string; who: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const filled = Math.min(100, Math.max(0, pct));
  return (
    <div className="relative w-[clamp(120px,15vw,168px)]">
      <svg viewBox="0 0 120 120" className="block h-auto w-full" role="img" aria-label={`${label}: ${pct}% of ${who}`}>
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

  const who = data.companyName ?? "the company";

  const returned = dividends.map((d, i) => d + buybacks[i]);
  const maxA = Math.max(1, ...fcf, ...returned);
  const totalFcf = sum(fcf);
  const totalReturned = sum(returned);

  // Latest-year split between buybacks and dividends. When nothing was paid, there is no split to show.
  const paidLast = returned[last];
  const buyShare = paidLast > 0 ? Math.round(safeDiv(buybacks[last], paidLast) * 100) : 0;
  const divShare = paidLast > 0 ? 100 - buyShare : 0;
  const paidOfFcf = fcf[last] > 0 ? `${Math.round(safeDiv(paidLast, fcf[last]) * 100)}% of free cash flow` : undefined;

  // Share count: own 10% at the start, how much of the company that slice is today.
  // The count can fall (buybacks) or rise (new shares), and the wording follows.
  const sh = how.shares;
  const shChange = sh.length > 1 ? Math.round((sh[sh.length - 1] / sh[0] - 1) * 100) : 0;
  const ownNow = sh.length > 1 ? Math.round((sh[0] / sh[sh.length - 1]) * 100) / 10 : null;
  const shChip =
    shChange < 0
      ? `▼ ${Math.abs(shChange)}% fewer shares`
      : shChange > 0
        ? `▲ ${shChange}% more shares`
        : "Share count unchanged";

  // Total shareholder return (optional)
  const tsr = how.tsr;
  const maxTsr = tsr ? Math.max(1, ...tsr.rows.map((r) => r.value)) : 1;

  // Net cash (negative means net debt)
  const net = cushion.cash.map((c, i) => c - cushion.debt[i]);
  const maxNet = Math.max(1, ...net);
  const netDelta = net[last] - net[0];
  const netPill =
    net[0] > 0
      ? `${netDelta >= 0 ? "▲ +" : "▼ −"}${Math.abs(Math.round((net[last] / net[0] - 1) * 100))}% since ${years[0]}`
      : `${netDelta >= 0 ? "▲ +" : "▼ −"}$${Math.abs(Math.round(netDelta))}B since ${years[0]}`;
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

        {/* Block 1: cash earned vs cash paid out */}
        <div className="mt-8">
          <Heading>{data.returned.title}</Heading>
          <Panel>
            <div className="overflow-hidden rounded-[20px] border border-border bg-white">
              <div className="grid gap-x-12 gap-y-4 bg-primary px-5 py-4 text-white sm:grid-cols-[auto_auto_1fr] sm:px-6">
                <div>
                  <p className="text-sm font-semibold text-primary-soft">Free cash flow earned, {years.length} years</p>
                  <p className="mt-1 font-serif text-[clamp(26px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em] tabular-nums">
                    {usd0(totalFcf)}B
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-soft">Dividends and buybacks paid</p>
                  <p className="mt-1 font-serif text-[clamp(26px,3vw,34px)] font-semibold leading-tight tracking-[-0.02em] tabular-nums">
                    {usd0(totalReturned)}B
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {/* grouped columns by year */}
                <div
                  className="overflow-x-auto"
                  role="img"
                  aria-label={years
                    .map((y, i) => `${y}: earned ${usd0(fcf[i])}B, paid out ${usd0(returned[i])}B`)
                    .join("; ")}
                >
                  <div
                    className="grid min-w-[460px] gap-3"
                    style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}
                  >
                    {years.map((y, i) => {
                      const isLast = i === last;
                      const nothingPaid = returned[i] === 0;
                      const negativeFcf = fcf[i] <= 0;
                      const pct = Math.round(safeDiv(returned[i], fcf[i]) * 100);
                      const pillText = nothingPaid
                        ? "Nothing paid out"
                        : negativeFcf
                          ? "Cash flow negative"
                          : `${pct}% paid out`;
                      const pillCls = nothingPaid
                        ? "bg-surface text-ink-muted"
                        : negativeFcf
                          ? "bg-warning-soft text-warning"
                          : pct > 100
                            ? "bg-primary text-white"
                            : "bg-primary-soft text-primary-ink";
                      return (
                        <div key={y} className="flex flex-col items-center">
                          <div className="flex h-[170px] w-full items-end justify-center gap-1.5">
                            {[
                              { v: fcf[i], c: fcf[i] < 0 ? "bg-danger" : "bg-chart-5" },
                              { v: returned[i], c: "bg-primary" },
                            ].map((b, k) => (
                              <div key={k} className="flex h-full w-[38%] max-w-[44px] flex-col items-center justify-end">
                                <span
                                  className={`mb-1 text-xs tabular-nums ${isLast ? "font-semibold text-ink" : "text-ink-muted"}`}
                                >
                                  {int0(b.v)}
                                </span>
                                <div
                                  className={`w-full rounded-t-lg transition-[filter] duration-200 hover:brightness-110 ${b.c}`}
                                  style={{ height: `${Math.max(3, (Math.max(b.v, 0) / maxA) * 88)}%` }}
                                />
                              </div>
                            ))}
                          </div>
                          <span
                            className={`mt-2 text-[13px] tabular-nums ${isLast ? "font-semibold text-ink" : "text-ink-muted"}`}
                          >
                            {y}
                          </span>
                          <span
                            className={`mt-1.5 rounded-full px-2.5 py-0.5 text-center text-xs font-semibold tabular-nums ${pillCls}`}
                          >
                            {!nothingPaid && !negativeFcf && pct > 100 ? "▲ " : ""}
                            {pillText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-3 rounded bg-chart-5" aria-hidden="true" />
                    Free cash flow earned ($B)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-3 rounded bg-primary" aria-hidden="true" />
                    Paid out ($B)
                  </span>
                </div>

                <Note>{data.returned.howToRead}</Note>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{data.returned.fcfNote}</p>
              </div>
            </div>
          </Panel>
        </div>

        {/* Block 2: how it is paid back */}
        <div className="pt-12">
          <Heading>{how.title}</Heading>

          <Panel>
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Left: buybacks vs dividends, then four numbers */}
              <BandCard
                label={`Paid to shareholders in ${years[last]}`}
                big={paidLast > 0 ? `$${f1(paidLast)}B` : "Nothing paid out"}
                sub={paidOfFcf}
              >
                {paidLast > 0 ? (
                  <>
                    <div
                      className="flex h-[64px] gap-1.5 overflow-hidden rounded-2xl"
                      role="img"
                      aria-label={`Buybacks ${buyShare}%, dividends ${divShare}%`}
                    >
                      {buyShare > 0 && (
                        <div
                          className="flex min-w-0 flex-col justify-center bg-primary px-4 text-white"
                          style={{ flex: `${buyShare} 1 0` }}
                        >
                          <span className="truncate text-[13px]">Buybacks</span>
                          <span className="text-[clamp(16px,1.8vw,20px)] font-semibold leading-tight tabular-nums">
                            {buyShare}% · ${f1(buybacks[last])}B
                          </span>
                        </div>
                      )}
                      {divShare > 0 && (
                        <div
                          className="flex min-w-[88px] flex-col justify-center bg-share-2 px-4 text-white"
                          style={{ flex: `${divShare} 1 0` }}
                        >
                          <span className="truncate text-[13px]">Dividends</span>
                          <span className="text-[clamp(16px,1.8vw,20px)] font-semibold leading-tight tabular-nums">
                            {divShare}%
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-right text-[13px] tabular-nums text-ink-muted">
                      Dividends ${f1(dividends[last])}B
                    </p>
                  </>
                ) : (
                  <div className="flex h-[64px] items-center rounded-2xl bg-surface px-5 text-[16px] font-semibold text-ink">
                    Nothing paid out in {years[last]}: no buybacks and no dividends
                  </div>
                )}

                <ul className="mt-5 grid gap-x-8 gap-y-6 border-t border-border pt-5 sm:grid-cols-2">
                  {how.stats.map((s) => (
                    <li key={s.label} className="min-w-0">
                      <span className="block text-[14px] font-semibold text-ink">{s.label}</span>
                      <span className="mt-1 block font-serif text-[clamp(26px,3vw,32px)] font-semibold leading-none tracking-tight tabular-nums text-ink">
                        {s.value}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-snug text-ink-muted">{s.note}</span>
                    </li>
                  ))}
                </ul>

                {tsr && tsr.rows.length > 0 && (
                  <>
                    <div className="mt-6 border-t border-border pt-4 text-sm font-semibold text-ink">{tsr.title}</div>
                    <ul className="mt-1">
                      {tsr.rows.map((r, i) => (
                        <li
                          key={r.name}
                          className="grid grid-cols-[72px_1fr] items-center gap-3 border-b border-border py-2.5 last:border-b-0"
                        >
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
              </BandCard>

              {/* Right: your slice of the company, then vs now */}
              {sh.length > 1 && ownNow !== null && (
                <BandCard label={`Your slice of ${who}`} big={shChip}>
                  <div className="my-4 flex items-start justify-center gap-[clamp(16px,4vw,48px)]">
                    <div className="flex flex-col items-center text-center">
                      <OwnRing pct={10} label={years[0]} who={who} />
                      <span className="mt-4 text-[16px] font-semibold text-ink">{years[0]}</span>
                      <span className="text-[13px] tabular-nums text-ink-muted">{f1(sh[0])}B diluted shares</span>
                    </div>
                    <span className="mt-[clamp(52px,7vw,76px)] text-2xl text-ink-muted" aria-hidden="true">
                      →
                    </span>
                    <div className="flex flex-col items-center text-center">
                      <OwnRing pct={ownNow} label="Today" who={who} />
                      <span className="mt-4 text-[16px] font-semibold text-ink">Today</span>
                      <span className="text-[13px] tabular-nums text-ink-muted">
                        {f1(sh[sh.length - 1])}B diluted shares
                      </span>
                    </div>
                  </div>

                  <p className="mt-auto pt-4 text-[16px] leading-relaxed text-ink">
                    Own 10% of {who} in {years[0]} and buy nothing more, and you own {ownNow}% today.
                  </p>
                </BandCard>
              )}
            </div>
          </Panel>
        </div>

        {/* Block 3: cash cushion */}
        <div className="pt-12">
          <Heading>{cushion.title}</Heading>

          <Panel>
            <BandCard
              label={net[last] >= 0 ? `Net cash in ${years[last]}` : `Net debt in ${years[last]}`}
              big={`${net[last] >= 0 ? "+" : "−"}$${f1(Math.abs(net[last]))}B`}
              sub={`cash $${f1(cushion.cash[last])}B minus debt $${f1(cushion.debt[last])}B`}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[14px] text-ink-muted">Net cash ($B), a minus sign means net debt</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[13px] font-semibold tabular-nums ${
                        netDelta < 0 ? "bg-danger-soft text-danger" : "bg-success-soft text-success"
                      }`}
                    >
                      {netPill}
                    </span>
                  </div>
                  <div
                    className="mt-4 flex items-end gap-2.5"
                    role="img"
                    aria-label={`Net cash: ${net.map((v, i) => `${years[i]} ${usd0(v)}B`).join(", ")}`}
                  >
                    {net.map((v, i) => {
                      const isLast = i === net.length - 1;
                      return (
                        <div
                          key={years[i]}
                          className="flex min-w-0 flex-1 flex-col items-center gap-1 text-[13px] text-ink-muted"
                        >
                          <span className={`tabular-nums ${isLast ? "font-semibold text-ink" : ""}`}>
                            {v >= 0 ? "+" : "−"}
                            {Math.abs(Math.round(v))}
                          </span>
                          <div className="flex h-[130px] w-full items-end">
                            <div
                              className={`w-full rounded-t-lg ${v < 0 ? "bg-danger" : isLast ? "bg-primary" : "bg-ink/10"}`}
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
                    Cash and securities ${f1(cushion.cash[last])}B minus debt ${f1(cushion.debt[last])}B leaves{" "}
                    {net[last] >= 0 ? "net cash" : "net debt"} of {net[last] >= 0 ? "+" : "−"}$
                    {f1(Math.abs(net[last]))}B.
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{cushion.howToRead}</p>
                </div>
              </div>
            </BandCard>

            {/* Three supporting numbers */}
            <ul className="grid gap-4 md:grid-cols-3">
              <li className="flex flex-col justify-center rounded-[20px] border border-border bg-white p-5">
                <div className="flex items-end justify-between gap-3">
                  <span className="text-[16px] font-semibold text-ink">Total debt</span>
                  <span className="font-serif text-[clamp(26px,3vw,32px)] font-semibold leading-none tabular-nums text-ink">
                    {usd0(cushion.debt[last])}B
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">
                  {cushion.debt[last] <= cushion.debt[0] ? "Down" : "Up"} from {usd0(cushion.debt[0])}B in {years[0]}.
                </p>
              </li>
              <li className="flex flex-col justify-center rounded-[20px] border border-border bg-white p-5">
                <div className="flex items-end justify-between gap-3">
                  <span className="text-[16px] font-semibold text-ink">Debt to equity</span>
                  <span className="font-serif text-[clamp(26px,3vw,32px)] font-semibold leading-none tabular-nums text-ink">
                    {de[last].toFixed(2)}×
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">
                  Owes ${de[last].toFixed(2)} for every $1 of its own money, {de[last] <= de[0] ? "down" : "up"} from{" "}
                  {de[0].toFixed(2)}× in {years[0]}.
                </p>
              </li>
              <li className="flex flex-col justify-center rounded-[20px] border border-border bg-white p-5">
                <div className="flex items-end justify-between gap-3">
                  <span className="text-[16px] font-semibold text-ink">Current ratio</span>
                  <span className="font-serif text-[clamp(26px,3vw,32px)] font-semibold leading-none tabular-nums text-ink">
                    {currentRatio.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">{cushion.currentRatioNote}</p>
              </li>
            </ul>
          </Panel>
        </div>

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}