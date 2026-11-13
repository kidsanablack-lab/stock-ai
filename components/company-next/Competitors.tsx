// Section 19: Competitors (category: Business).
// One question: who does the company compete with, and how does it compare on results?
// Company-neutral: the company name comes from `data` (the company marked kind "self").
// Negative values (for example negative free cash flow) and net debt are shown with a minus sign and red bars.
// Server Component. No client JS needed.

import { Plus_Jakarta_Sans } from "next/font/google";

// Display font for the big "4 of 6" number. Swap for another Google font if you like
// (e.g. Bricolage_Grotesque, Sora, Instrument_Serif, Fraunces).
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export type MetricKey = "revenue" | "growth" | "opMargin" | "fcf" | "fcfMargin" | "netDebt";

export type CompetitorCompany = {
  id: string;
  name: string;
  ticker: string;
  kind: "self" | "direct" | "indirect" | "future";
  desc: string;
  // Leave out (or leave a measure out) when there is no comparable figure.
  // Companies without metrics stay in the list but not in the charts.
  metrics?: Partial<Record<MetricKey, number>>;
  // Why this company is not in the charts, shown under its description.
  chartNote?: string;
};

export type CompetitorsData = {
  title: string;
  lead: string;
  labels: string[]; // shown once at section level
  overviewTitle: string;
  overviewIntro: string;
  shares: {
    title: string;
    items: { name: string; value: number; self?: boolean; muted?: boolean }[];
    note: string;
  };
  companies: CompetitorCompany[]; // the viewed company first
  compareTitle: string;
  compareIntro: string;
  compareHowToRead: string;
  caveat: string;
  valuationTitle: string; // title of the growth vs profitability chart
  valuationIntro: string;
  valuationHowToRead: string;
  source: string;
};

type MetricDef = {
  key: MetricKey;
  label: string;
  hint: string;
  better: "higher" | "lower";
  fmt: (v: number) => string;
};

const sgn = (v: number) => (v < 0 ? "−" : "");
const money = (v: number) => `${sgn(v)}$${Math.abs(v)}B`;
const pct = (v: number) => `${sgn(v)}${Math.abs(v).toFixed(1)}%`;

const METRICS: MetricDef[] = [
  { key: "revenue", label: "Revenue", hint: "Higher means a bigger business.", better: "higher", fmt: money },
  {
    key: "growth",
    label: "Revenue growth",
    hint: "Higher means faster growth.",
    better: "higher",
    fmt: (v) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(1)}%`,
  },
  { key: "opMargin", label: "Operating margin", hint: "Higher means more profit from the core business.", better: "higher", fmt: pct },
  { key: "fcf", label: "Free cash flow", hint: "Higher means more cash left after investing. A minus sign means more cash went out than came in.", better: "higher", fmt: money },
  { key: "fcfMargin", label: "Free cash flow margin", hint: "Higher means more cash from each $100 of sales.", better: "higher", fmt: pct },
  {
    key: "netDebt",
    label: "Net debt",
    hint: "Lower is better. A minus sign means net cash, and a plain number means net debt.",
    better: "lower",
    fmt: money,
  },
];

const GROUPS: { kind: CompetitorCompany["kind"]; title: string; sub: string; icon: string }[] = [
  { kind: "direct", title: "Direct rivals", sub: "Sell similar products to the same customers", icon: "ti-swords" },
  { kind: "indirect", title: "Indirect rivals", sub: "Compete for the same time and spending", icon: "ti-arrows-split" },
  { kind: "future", title: "Possible future entrants", sub: "Not yet comparable", icon: "ti-hourglass" },
];

// Rings for the orbit diagram. radius = distance from the centre as % of the diagram width.
const RINGS: { kind: CompetitorCompany["kind"]; label: string; size: number; radius: number; fill: string }[] = [
  { kind: "future", label: "Possible future entrants", size: 100, radius: 44, fill: "#F3F4FA" },
  { kind: "indirect", label: "Indirect rivals", size: 76.5, radius: 32, fill: "#ECEEF9" },
  { kind: "direct", label: "Direct rivals", size: 52, radius: 18, fill: "#E2E8FC" },
];

// Angles in degrees (0 = right, 90 = down) for each company on its ring.
const ANGLES: Partial<Record<CompetitorCompany["kind"], Record<number, number[]>>> = {
  direct: { 1: [160], 2: [160, 25], 3: [160, 280, 40] },
  indirect: { 1: [200], 2: [200, 340], 3: [200, 340, 90] },
  future: { 1: [125], 2: [125, 55] },
};
const START: Record<string, number> = { direct: 160, indirect: 200, future: 125 };

function angleFor(kind: CompetitorCompany["kind"], i: number, n: number) {
  const preset = ANGLES[kind]?.[n];
  if (preset) return preset[i];
  return (START[kind] ?? 0) + (i * 360) / n;
}

const CARD = "rounded-3xl border border-border bg-white";

function median(values: number[]) {
  const s = [...values].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function SubHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-6">
      <h3 className="max-w-[780px] font-serif text-[clamp(26px,3vw,32px)] font-semibold leading-tight tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2 max-w-[680px] text-[15px] leading-relaxed text-ink-muted">{intro}</p>
    </div>
  );
}

// Zoom the axes to where the companies sit.
function niceAxis(min: number, max: number, padLo: number, padHi: number, minStep: number) {
  // Pick a round step so the axis shows about 8 labels at most, however wide the range is.
  const span = max + padHi - (min - padLo);
  const step = [1, 2, 5, 10, 20, 25, 50, 100].find((s) => s >= minStep && span / s <= 7) ?? 100;
  const lo = Math.floor((min - padLo) / step) * step;
  let hi = Math.ceil((max + padHi) / step) * step;
  if (hi <= lo) hi = lo + step;
  const ticks = Array.from({ length: Math.round((hi - lo) / step) + 1 }, (_, i) => lo + i * step);
  return { lo, hi, ticks };
}

function scatterAxes(rows: { x: number; y: number }[]) {
  const xs = rows.map((r) => r.x);
  const ys = rows.map((r) => r.y);
  return {
    x: niceAxis(Math.min(...xs), Math.max(...xs), 4, 1, 2),
    y: niceAxis(Math.min(...ys), Math.max(...ys), 10, 3, 10),
  };
}

// Growth (x) against operating margin (y). The top right is fast and profitable.
function Scatter({ rows }: { rows: { name: string; x: number; y: number; self: boolean }[] }) {
  const W = 680;
  const H = 440;
  const pl = 64;
  const pr = 84;
  const pt = 16;
  const pb = 58;
  const { x: xa, y: ya } = scatterAxes(rows);
  const X = (v: number) => pl + ((W - pl - pr) * (v - xa.lo)) / (xa.hi - xa.lo);
  const Y = (v: number) => H - pb - ((H - pb - pt) * (v - ya.lo)) / (ya.hi - ya.lo);
  const f = (v: number) => Number(v.toFixed(1));

  // The "fast and profitable" zone is the top-right quarter of the chart.
  const zx = X((xa.lo + xa.hi) / 2);
  const zy = Y(ya.hi);
  const zw = X(xa.hi) - zx;
  const zh = Y((ya.lo + ya.hi) / 2) - zy;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Operating margin against revenue growth: ${rows
        .map((r) => `${r.name} ${r.y.toFixed(1)}% margin at ${r.x.toFixed(1)}% growth`)
        .join("; ")}`}
      className="block h-auto w-full min-w-[520px]"
    >
      <rect x={f(zx)} y={f(zy)} width={f(zw)} height={f(zh)} rx={18} className="fill-success" fillOpacity={0.12} />
      <text x={f(zx + 14)} y={f(zy + zh - 12)} textAnchor="start" fontSize={12} fontWeight={600} className="fill-success">
        Fast and profitable
      </text>

      {ya.ticks.map((v) => (
        <g key={`y${v}`}>
          <line x1={pl} x2={X(xa.hi)} y1={f(Y(v))} y2={f(Y(v))} className="stroke-border" />
          <text x={pl - 10} y={f(Y(v) + 4)} textAnchor="end" fontSize={12} className="fill-ink-muted">
            {v}%
          </text>
        </g>
      ))}
      {xa.ticks.map((v) => (
        <text key={`x${v}`} x={f(X(v))} y={H - pb + 20} textAnchor="middle" fontSize={12} className="fill-ink-muted">
          {v}%
        </text>
      ))}
      <text x={f((pl + X(xa.hi)) / 2)} y={H - 8} textAnchor="middle" fontSize={13} className="fill-ink-muted">
        Revenue growth (higher is faster)
      </text>
      <text
        transform={`translate(14 ${f((pt + H - pb) / 2)}) rotate(-90)`}
        textAnchor="middle"
        fontSize={13}
        className="fill-ink-muted"
      >
        Operating margin (higher is more profitable)
      </text>

      {rows.map((r) => {
        const x = f(X(r.x));
        const y = f(Y(r.y));
        // The company's own label goes left; others go right unless they would run off the edge.
        const estWidth = r.name.length * 8.5 + 14;
        const left = r.self || x + 14 + estWidth > W - 4;
        return (
          <g key={r.name}>
            <circle
              cx={x}
              cy={y}
              r={r.self ? 12 : 9}
              className={r.self ? "fill-primary stroke-white" : "fill-ink-muted stroke-white"}
              fillOpacity={r.self ? 1 : 0.6}
              strokeWidth={3}
            />
            <text
              x={left ? x - 18 : x + 18}
              y={y + 5}
              textAnchor={left ? "end" : "start"}
              fontSize={r.self ? 15 : 14}
              fontWeight={600}
              className={r.self ? "fill-primary-ink" : "fill-ink"}
            >
              {r.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Competitors({ data }: { data: CompetitorsData }) {
  const self = data.companies.find((c) => c.kind === "self") ?? data.companies[0];
  const plotted = data.companies.filter((c) => c.metrics && Object.keys(c.metrics).length > 0);
  const peers = self ? plotted.filter((c) => c.id !== self.id) : [];
  const hasCompare = !!self?.metrics && peers.length > 0;
  const totalShare = data.shares.items.reduce((s, i) => s + i.value, 0) || 1;

  // Per-measure ranks, using only the companies that have a value for that measure.
  const compare = hasCompare
    ? METRICS.flatMap((m) => {
        const mine = self.metrics![m.key];
        if (mine === undefined) return [];
        const vals = plotted.flatMap((c) => {
          const v = c.metrics![m.key];
          return v === undefined ? [] : [{ c, v }];
        });
        const rivals = vals.filter((x) => x.c.id !== self.id);
        if (rivals.length === 0) return [];
        const ordered = [...vals].sort((a, b) => (m.better === "lower" ? a.v - b.v : b.v - a.v));
        const rank = ordered.findIndex((x) => x.c.id === self.id) + 1;
        const med = median(rivals.map((x) => x.v));
        return [{ m, vals, ordered, rank, med, mine }];
      })
    : [];

  // Ahead or behind the median rival.
  const ahead: string[] = [];
  const behind: string[] = [];
  compare.forEach(({ m, med, mine }) => {
    const isAhead = m.better === "higher" ? mine > med : mine < med;
    (isAhead ? ahead : behind).push(m.label.toLowerCase());
  });
  const measured = ahead.length + behind.length;

  const scatterRows = plotted.flatMap((c) =>
    c.metrics!.growth !== undefined && c.metrics!.opMargin !== undefined
      ? [{ name: c.name, x: c.metrics!.growth, y: c.metrics!.opMargin, self: c.id === self.id }]
      : [],
  );
  const growthCompare = compare.find((c) => c.m.key === "growth");
  const growthRank = growthCompare?.rank ?? 0;
  const growthCount = growthCompare?.vals.length ?? 0;
  const marginCompare = compare.find((c) => c.m.key === "opMargin");
  const marginRank = marginCompare?.rank ?? 0;
  const marginCount = marginCompare?.vals.length ?? 0;
  const hasScatter = hasCompare && scatterRows.length >= 3 && marginRank > 0 && growthRank > 0;
  const axes = hasScatter ? scatterAxes(scatterRows) : null;

  const GREY_SHADES = ["#AEB2C6", "#C7CADB", "#D6D9E6"];
  let greyIdx = 0;

  return (
    <section id="competitors" className="scroll-mt-24 bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-ink-muted sm:text-[15px]">{data.lead}</p>
        </header>

        {/* The answer first: how many measures the company leads on */}
        {hasCompare && measured > 0 && (
          <div className="mt-6 grid gap-5 rounded-3xl border border-primary bg-primary p-6 text-white lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
            <div>
              <div className="text-sm font-medium text-white/90">Against the median rival, {self.name} is ahead on</div>
              <div
                className={`${display.className} mt-2 flex items-baseline gap-[0.2em] text-[clamp(52px,7vw,76px)] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-white`}
              >
                <span>{ahead.length}</span>
                <span className="text-[0.5em] font-bold tracking-normal text-white/70">of</span>
                <span>{measured}</span>
              </div>
              <div className="mt-2 text-sm font-medium text-white/90">measures</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-success">
                  <i className="ti ti-arrow-up-right" aria-hidden="true" />
                  Ahead
                </div>
                <p className="mt-1.5 text-base leading-snug text-ink">{ahead.length ? ahead.join(", ") : "None"}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-danger">
                  <i className="ti ti-arrow-down-right" aria-hidden="true" />
                  Behind
                </div>
                <p className="mt-1.5 text-base leading-snug text-ink">{behind.length ? behind.join(", ") : "None"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Part 1: who the rivals are */}
        <div className="pt-12">
          <SubHeading title={data.overviewTitle} intro={data.overviewIntro} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,11fr)_minmax(0,10fr)] lg:items-start lg:gap-6">
            {/* Left: orbit diagram + shares */}
            <div className="grid gap-5">
              <div className={`${CARD} px-5 pb-8 pt-6`}>
                <p className="text-center text-sm text-ink-muted">
                  Closer to {self.name} means a closer fight for the same customers
                </p>
                <div className="relative mx-auto mt-5 aspect-square w-full max-w-[540px]">
                  {RINGS.map((r) => (
                    <div
                      key={r.kind}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
                      style={{ width: `${r.size}%`, height: `${r.size}%`, background: r.fill }}
                    >
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-ink-muted">
                        {r.label}
                      </span>
                    </div>
                  ))}

                  <div className="absolute left-1/2 top-1/2 grid aspect-square w-[19.5%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary shadow-[0_8px_24px_-8px_rgba(40,70,220,0.6)]">
                    <span className="font-serif text-[clamp(15px,2.6vw,24px)] font-semibold text-white">{self.name}</span>
                  </div>

                  {RINGS.map((r) => {
                    const list = data.companies.filter((c) => c.kind === r.kind);
                    return list.map((c, i) => {
                      const a = (angleFor(r.kind, i, list.length) * Math.PI) / 180;
                      const left = 50 + r.radius * Math.cos(a);
                      const top = 50 + r.radius * Math.sin(a);
                      return (
                        <span
                          key={c.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm sm:px-4 sm:text-sm"
                          style={{ left: `${left}%`, top: `${top}%` }}
                        >
                          {c.name}
                        </span>
                      );
                    });
                  })}
                </div>
              </div>

              <div className={`${CARD} p-6`}>
                <h4 className="text-lg font-semibold leading-snug text-ink">{data.shares.title}</h4>
                <ul className="mt-4 flex h-[72px] gap-1.5 overflow-hidden rounded-2xl">
                  {data.shares.items.map((it) => {
                    const shade = it.self || it.muted ? undefined : GREY_SHADES[Math.min(greyIdx++, GREY_SHADES.length - 1)];
                    return (
                      <li
                        key={it.name}
                        className={`flex min-w-0 flex-col justify-center px-3 ${
                          it.self ? "bg-primary text-white" : it.muted ? "bg-border text-ink" : "text-ink"
                        }`}
                        style={{ width: `${(it.value / totalShare) * 100}%`, background: shade }}
                      >
                        <span className="truncate text-xs opacity-90">{it.name}</span>
                        <span className="font-serif text-[clamp(16px,2.4vw,26px)] font-semibold leading-none tabular-nums">
                          {it.value}%
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{data.shares.note}</p>
              </div>
            </div>

            {/* Right: one card, three groups */}
            <div className={`${CARD} divide-y divide-border p-6 sm:p-7`}>
              {GROUPS.map((g) => {
                const list = data.companies.filter((c) => c.kind === g.kind);
                if (!list.length) return null;
                return (
                  <div key={g.kind} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-2xl text-primary">
                        <i className={`ti ${g.icon}`} aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-xl font-semibold leading-tight text-ink">{g.title}</div>
                        <div className="mt-0.5 text-sm text-ink-muted">{g.sub}</div>
                      </div>
                    </div>
                    <ul className="mt-5 grid gap-5 sm:pl-16">
                      {list.map((c) => (
                        <li key={c.id}>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-lg font-semibold text-ink">{c.name}</span>
                            <span className="rounded-full border border-border px-3 py-0.5 text-xs font-medium tabular-nums text-ink-muted">
                              {c.ticker}
                            </span>
                          </div>
                          <p className="mt-1 text-[15px] leading-snug text-ink">{c.desc}</p>
                          {c.chartNote && (
                            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{c.chartNote}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 2: financial comparison as bar cards */}
        {hasCompare && compare.length > 0 && (
          <div className="pt-12">
            <SubHeading title={data.compareTitle} intro={data.compareIntro} />
            <ol className="grid gap-5 lg:grid-cols-2">
              {compare.map(({ m, vals, ordered, rank }) => {
                const maxAbs = Math.max(...ordered.map((o) => Math.abs(o.v)), 1e-9);
                return (
                  <li key={m.key} className={`${CARD} p-6`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-bold leading-tight text-[#0b1220]">{m.label}</h4>
                        <p className="mt-1.5 text-sm text-ink-muted">{m.hint}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold tabular-nums text-primary-ink">
                        {self.name} #{rank} of {vals.length}
                      </span>
                    </div>
                    <ul className="mt-5 grid gap-3">
                      {ordered.map((o, i) => {
                        const isSelf = o.c.id === self.id;
                        const w = Math.max(4, (Math.abs(o.v) / maxAbs) * 100);
                        // A "bad" value is a loss on a higher-is-better measure, or net debt on the net debt measure.
                        // It gets a red bar and a red number, so a negative value is never drawn like a positive one.
                        const bad = m.better === "higher" ? o.v < 0 : o.v > 0;
                        const barColor = bad
                          ? isSelf
                            ? "bg-danger"
                            : "bg-danger opacity-60"
                          : isSelf
                            ? "bg-primary"
                            : "bg-ink-muted opacity-60";
                        return (
                          <li
                            key={o.c.id}
                            className="grid grid-cols-[6.5rem_minmax(0,1fr)_6rem] items-center gap-3 sm:grid-cols-[8rem_minmax(0,1fr)_8.5rem] sm:gap-4"
                          >
                            <span className={`text-[15px] ${isSelf ? "font-semibold text-primary-ink" : "text-ink"}`}>
                              {i + 1}. {o.c.name}
                            </span>
                            <div className={`overflow-hidden rounded-full bg-surface ${isSelf ? "h-5" : "h-3.5"}`}>
                              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${w}%` }} />
                            </div>
                            <span
                              className={`text-right font-serif text-lg font-semibold leading-none tabular-nums sm:text-[22px] ${
                                bad ? "text-danger" : isSelf ? "text-primary-ink" : "text-ink"
                              }`}
                            >
                              {m.fmt(o.v)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 max-w-[780px] border-l-[3px] border-primary pl-3 text-xs leading-relaxed text-ink-muted">
              {data.caveat}
            </p>
          </div>
        )}

        {/* Part 3: growth against profitability */}
        {hasScatter && axes && (
          <div className="pt-12">
            <SubHeading title={data.valuationTitle} intro={data.valuationIntro} />
            <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-stretch">
              <div className={`${CARD} flex flex-col p-6 sm:p-7`}>
                <p className="font-serif text-[clamp(26px,3vw,34px)] font-semibold leading-[1.15] tracking-tight text-ink">
                  <span className="text-primary-ink">
                    {self.name}’s operating margin ranks {marginRank} of {marginCount}
                  </span>{" "}
                  while its growth ranks {growthRank}.{" "}
                  {marginRank < growthRank
                    ? "It turns more of each sale into profit than its growth rank would suggest."
                    : "Its growth rank is at least as good as its profit rank."}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-surface p-5">
                    <div className="text-sm text-ink">Growth rank</div>
                    <div className="mt-1 font-serif text-5xl font-semibold leading-none tabular-nums text-ink">
                      {growthRank}
                      <span className="ml-1.5 font-sans text-xl font-medium">of {growthCount}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-primary p-5 text-white">
                    <div className="text-sm">Margin rank</div>
                    <div className="mt-1 font-serif text-5xl font-semibold leading-none tabular-nums">
                      {marginRank}
                      <span className="ml-1.5 font-sans text-xl font-medium">of {marginCount}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 border-l-2 border-border pl-3 text-sm leading-relaxed text-ink-muted">
                  {data.valuationHowToRead}
                </p>
              </div>

              <div className={`${CARD} p-4 sm:p-6`}>
                <div className="overflow-x-auto">
                  <Scatter rows={scatterRows} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                  Axes are zoomed to the area where the {scatterRows.length} companies sit: growth {axes.x.lo}% to{" "}
                  {axes.x.hi}%, margin {axes.y.lo}% to {axes.y.hi}%.
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="mt-10 border-t border-border pt-4 text-xs leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}