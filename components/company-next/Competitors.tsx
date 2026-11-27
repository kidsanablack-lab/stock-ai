// Section 19: Competitors (category: Business).
// One question: who does the company compete with, and how does it compare on results?
// Company-neutral: the company name comes from `data` (the company marked kind "self").
// The wording of the market share card also comes from `data.shares` (memberNoun, measureLabel), so no hardware wording
// is written in this file. `data.shares` is optional: without it the card is hidden and the orbit map uses the full width.
// The third small card ("held by the N named ...") only makes sense next to an "Others" row (an item with muted: true).
// Without one, the named players add up to 100%, so the card is hidden and the other two share the row.
// Negative values (for example negative free cash flow) and net debt are shown with a minus sign and red bars.
// Server Component. No client JS needed.
//
// Redesign (looks only): header answer card, Part 1 "orbit map + result card", Part 2 "scoreboard table".
// Part 3 keeps its old layout; only the Growth rank box is now light blue.
// The three rival groups in "What each rival does" show an icon in front of the title.
// Styling is Tailwind utilities with Scope tokens, like the old file, so there is no separate CSS file.

import type {
  CompetitorCompany,
  CompetitorMetricKey as MetricKey,
  CompetitorsData,
} from "@/lib/company-next/types";
import SectionNote from "./SectionNote";

// The data types live in lib/company-next/types.ts. They are re-exported here so older imports keep working.
// (MetricKey was the old name of CompetitorMetricKey.)
export type { CompetitorCompany, CompetitorsData } from "@/lib/company-next/types";
export type { CompetitorMetricKey as MetricKey } from "@/lib/company-next/types";

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

// icon = a Tabler icon class, shown in the tile in front of each group title.
const GROUPS: { kind: CompetitorCompany["kind"]; title: string; sub: string; icon: string }[] = [
  { kind: "direct", title: "Direct rivals", sub: "Sell similar products to the same customers", icon: "ti-swords" },
  { kind: "indirect", title: "Indirect rivals", sub: "Compete for the same time and spending", icon: "ti-arrows-split" },
  { kind: "future", title: "Possible future entrants", sub: "Not yet comparable", icon: "ti-hourglass" },
];

// Rings for the orbit diagram. size = ring width as % of the diagram. radius = distance of the names from the centre, as % of the diagram width.
// tint = how much primary blue is mixed into white for the ring fill.
const RINGS: { kind: CompetitorCompany["kind"]; label: string; size: number; radius: number; tint: number }[] = [
  { kind: "future", label: "Possible future entrants", size: 100, radius: 45, tint: 4 },
  { kind: "indirect", label: "Indirect rivals", size: 76, radius: 38, tint: 8 },
  { kind: "direct", label: "Direct rivals", size: 52, radius: 26, tint: 14 },
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
// Blue header band used on every white card in this section.
const HEAD = "bg-primary px-6 py-5 text-white sm:px-7";
const HEAD_TITLE = "font-serif text-[22px] font-semibold leading-tight";
// Purple-tinted note (no yellow in Scope). Used for "not in the charts" notes.
const NOTE =
  "rounded-xl bg-[color-mix(in_srgb,var(--cat-2)_8%,#ffffff)] px-3 py-2.5 text-[13px] leading-relaxed text-ink";

function median(values: number[]) {
  const s = [...values].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  const suffix = n % 10 === 1 ? "st" : n % 10 === 2 ? "nd" : n % 10 === 3 ? "rd" : "th";
  return `${n}${suffix}`;
}

function joinNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
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

  // Market share card. `shares` is optional: without it the card is hidden and the orbit map takes the full width.
  const shares = data.shares;
  // Wording comes from the data. Neutral words are used when the data does not give any.
  const noun = shares?.memberNoun ?? "companies";
  const measure = shares?.measureLabel ?? "market share";

  // Where the company ranks in the market-share bar (named players only, not "Others").
  const named = shares ? [...shares.items].filter((i) => !i.muted).sort((a, b) => b.value - a.value) : [];
  const mineShare = named.find((i) => i.self);
  const shareMax = shares ? Math.max(...shares.items.map((i) => i.value), 1e-9) : 1;
  const shareRank = mineShare ? named.indexOf(mineShare) + 1 : 0;
  const shareLeader = named[0];
  const shareNext = named[1];
  const shareGap =
    mineShare && shareLeader
      ? shareRank === 1
        ? shareNext
          ? mineShare.value - shareNext.value
          : 0
        : shareLeader.value - mineShare.value
      : 0;
  const shareGapLabel = shareRank === 1 ? (shareNext ? `ahead of ${shareNext.name}` : "") : `behind ${shareLeader?.name ?? ""}`;
  const namedTotal = named.reduce((s, i) => s + i.value, 0);
  // "Held by the N named ..." only means something when an "Others" row shows the rest of the market.
  // Without one, the named players add up to 100% by definition, so the card is left out.
  const hasOthers = shares ? shares.items.some((i) => i.muted) : false;

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

  // Table columns for Part 2: the company first, then its peers.
  const cols = hasCompare ? [self, ...peers] : [];
  const tableCols = `300px repeat(${cols.length}, minmax(0, 1fr)) 150px`;

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

  return (
    <section id="competitors" className="scroll-mt-24 bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(30px,3.8vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">
            {data.title}
          </h2>
          <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-ink-muted sm:text-[15px]">{data.lead}</p>
        </header>

        {/* The answer first: how many measures the company leads on */}
        {hasCompare && measured > 0 && (
          <div className="mt-6 overflow-hidden rounded-panel border border-border bg-white">
            <div className="bg-primary px-6 py-6 text-white sm:px-8">
              <div className="text-base font-medium text-white">Against the median rival, {self.name} is ahead on</div>
              <div className="mt-3 flex items-baseline gap-[0.25em] font-serif text-[clamp(52px,7vw,76px)] font-semibold leading-none tracking-[-0.02em] text-white">
                <span>{ahead.length}</span>
                <span className="text-[0.4em] tracking-normal">of {measured} measures</span>
              </div>
            </div>
            <div className="grid gap-6 px-6 pb-7 pt-6 sm:grid-cols-2 sm:gap-8 sm:px-8">
              <div className="border-t border-border pt-5">
                <div className="text-sm font-semibold text-success">Ahead</div>
                <p className="mt-2 text-[17px] leading-snug text-ink">{ahead.length ? ahead.join(", ") : "None"}</p>
              </div>
              <div className="border-t border-border pt-5">
                <div className="text-sm font-semibold text-danger">Behind</div>
                <p className="mt-2 text-[17px] leading-snug text-ink">{behind.length ? behind.join(", ") : "None"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Part 1: who the rivals are */}
        <div className="pt-12">
          <SubHeading title={data.overviewTitle} intro={data.overviewIntro} />
          <div
            className={`grid gap-5 ${
              shares ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch" : ""
            }`}
          >
            {/* Left: orbit map */}
            <div className={`${CARD} overflow-hidden`}>
              <div className={HEAD}>
                <div className={HEAD_TITLE}>How close each rival is</div>
                <div className="mt-1 text-sm leading-snug">
                  Closer to {self.name} means a closer fight for the same customers.
                </div>
              </div>
              <div className="px-4 pb-8 pt-8 sm:px-6">
                <div className="relative mx-auto aspect-square w-full max-w-[540px]">
                  {RINGS.map((r) => (
                    <div
                      key={r.kind}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
                      style={{
                        width: `${r.size}%`,
                        height: `${r.size}%`,
                        background: `color-mix(in srgb, var(--color-primary) ${r.tint}%, #ffffff)`,
                      }}
                    >
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                        {r.label}
                      </span>
                    </div>
                  ))}

                  <div className="absolute left-1/2 top-1/2 grid aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary">
                    <span className="font-serif text-[clamp(15px,2.6vw,22px)] font-semibold text-white">{self.name}</span>
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
                          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink sm:px-4 sm:text-sm"
                          style={{ left: `${left}%`, top: `${top}%` }}
                        >
                          {c.name}
                        </span>
                      );
                    });
                  })}
                </div>
              </div>
            </div>

            {/* Right: result card with the market share ranking. Hidden when the data has no shares. */}
            {shares && (
              <div className="flex flex-col gap-6 rounded-panel bg-primary p-6 text-white sm:p-7">
                {mineShare && shareRank > 0 && (
                  <div>
                    <div className="text-base font-medium text-white">{self.name} ranks</div>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 font-serif">
                      <span className="text-[clamp(56px,7vw,76px)] font-semibold leading-none tracking-[-0.03em]">
                        {ordinal(shareRank)}
                      </span>
                      <span className="font-sans text-base font-medium">
                        of the {named.length} {noun} named
                      </span>
                    </div>
                  </div>
                )}

                {mineShare && (
                  <div className={`grid gap-2.5 ${hasOthers ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                    <div className="rounded-2xl bg-white px-4 py-3.5 text-ink">
                      <div className="font-serif text-2xl font-semibold leading-tight">{mineShare.value.toFixed(1)}%</div>
                      <div className="mt-1.5 text-[13px] leading-snug text-ink-muted">
                        {self.name}’s {measure}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3.5 text-ink">
                      <div className="font-serif text-2xl font-semibold leading-tight">{shareGap.toFixed(1)} pts</div>
                      <div className="mt-1.5 text-[13px] leading-snug text-ink-muted">{shareGapLabel}</div>
                    </div>
                    {hasOthers && (
                      <div className="rounded-2xl bg-white px-4 py-3.5 text-ink">
                        <div className="font-serif text-2xl font-semibold leading-tight">{namedTotal.toFixed(1)}%</div>
                        <div className="mt-1.5 text-[13px] leading-snug text-ink-muted">
                          held by the {named.length} named {noun}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="text-[17px] font-semibold leading-snug text-white">{shares.title}</h4>
                  <ul className="mt-4 grid gap-3.5">
                    {shares.items.map((it) => (
                      <li key={it.name} className="grid grid-cols-[4.75rem_minmax(0,1fr)_4rem] items-center gap-3">
                        <span className="truncate text-[15px] font-medium text-white">{it.name}</span>
                        <div className="h-3.5 overflow-hidden rounded-full bg-primary-ink">
                          <div
                            className={`h-full rounded-full ${it.self ? "bg-white" : it.muted ? "bg-primary-soft" : "bg-chart-4"}`}
                            style={{ width: `${(it.value / shareMax) * 100}%` }}
                          />
                        </div>
                        <span className="text-right font-serif text-xl font-semibold leading-none tabular-nums text-white">
                          {it.value.toFixed(1)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm leading-relaxed text-white">{shares.note}</p>
              </div>
            )}
          </div>

          {/* Below: what each rival does, one column per group */}
          <div className={`${CARD} mt-5 overflow-hidden`}>
            <div className={HEAD}>
              <div className={HEAD_TITLE}>What each rival does</div>
            </div>
            <div className="grid divide-y divide-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {GROUPS.map((g) => {
                const list = data.companies.filter((c) => c.kind === g.kind);
                if (!list.length) return null;
                return (
                  <div key={g.kind} className="p-6 sm:p-7">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-2xl text-primary">
                        <i className={`ti ${g.icon}`} aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-xl font-semibold leading-tight text-ink">{g.title}</div>
                        <div className="mt-0.5 text-sm text-ink-muted">{g.sub}</div>
                      </div>
                    </div>
                    <ul className="mt-5 grid gap-5">
                      {list.map((c) => (
                        <li key={c.id}>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-lg font-semibold text-ink">{c.name}</span>
                            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium tabular-nums text-ink-muted">
                              {c.ticker}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[15px] leading-snug text-ink">{c.desc}</p>
                          {c.chartNote && <p className={`${NOTE} mt-2.5`}>{c.chartNote}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 2: financial comparison as one scoreboard table */}
        {hasCompare && compare.length > 0 && (
          <div className="pt-12">
            <SubHeading title={data.compareTitle} intro={data.compareIntro} />
            <div className={`${CARD} overflow-hidden`}>
              <div className={HEAD}>
                <div className={HEAD_TITLE}>
                  {self.name} against {joinNames(peers.map((p) => p.name))}
                </div>
                <div className="mt-1 text-sm leading-snug">
                  Bars are drawn within each row, so compare across a row, not down a column.
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[860px]">
                  <div
                    className="grid border-b border-border text-sm font-semibold text-ink-muted"
                    style={{ gridTemplateColumns: tableCols }}
                  >
                    <span className="py-4 pl-7">Measure</span>
                    {cols.map((c) => (
                      <span
                        key={c.id}
                        className={`p-4 ${c.id === self.id ? "bg-primary/5 text-primary-ink" : ""}`}
                      >
                        {c.name}
                      </span>
                    ))}
                    <span className="py-4 pl-4 pr-7 text-right">{self.name}’s rank</span>
                  </div>

                  {compare.map(({ m, ordered, rank, vals }) => {
                    const maxAbs = Math.max(...ordered.map((o) => Math.abs(o.v)), 1e-9);
                    return (
                      <div
                        key={m.key}
                        className="grid border-t border-border first:border-t-0"
                        style={{ gridTemplateColumns: tableCols }}
                      >
                        <div className="py-5 pl-7 pr-5">
                          <div className="text-[17px] font-semibold leading-snug text-ink">{m.label}</div>
                          <div className="mt-1 text-[13px] leading-relaxed text-ink-muted">{m.hint}</div>
                        </div>
                        {cols.map((c) => {
                          const isSelf = c.id === self.id;
                          const cellBg = isSelf ? "bg-primary/5" : "";
                          const o = ordered.find((x) => x.c.id === c.id);
                          if (!o) {
                            return (
                              <div key={c.id} className={`flex items-center p-4 ${cellBg}`}>
                                <span className="font-serif text-2xl font-semibold text-ink-muted">—</span>
                              </div>
                            );
                          }
                          // A "bad" value is a loss on a higher-is-better measure, or net debt on the net debt measure.
                          // It gets a red bar and a red number, so a negative value is never drawn like a positive one.
                          const bad = m.better === "higher" ? o.v < 0 : o.v > 0;
                          const w = Math.max(4, (Math.abs(o.v) / maxAbs) * 100);
                          const barColor = bad ? "bg-danger" : isSelf ? "bg-primary" : "bg-chart-compare";
                          const numColor = bad ? "text-danger" : isSelf ? "text-primary-ink" : "text-ink";
                          return (
                            <div key={c.id} className={`flex flex-col justify-center gap-2.5 p-4 ${cellBg}`}>
                              <span className={`font-serif text-2xl font-semibold leading-none tabular-nums ${numColor}`}>
                                {m.fmt(o.v)}
                              </span>
                              <div className="h-2 overflow-hidden rounded-full bg-border">
                                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${w}%` }} />
                              </div>
                              <span className="text-[13px] font-medium tabular-nums text-ink-muted">
                                #{ordered.findIndex((x) => x.c.id === c.id) + 1} of {vals.length}
                              </span>
                            </div>
                          );
                        })}
                        <div className="flex flex-col items-end justify-center py-5 pl-4 pr-7">
                          <span className="font-serif text-[40px] font-semibold leading-none tabular-nums text-primary-ink">
                            #{rank}
                          </span>
                          <span className="mt-1 text-sm text-ink-muted">of {vals.length}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <SectionNote className="mt-6">
              {data.caveat}
            </SectionNote>
          </div>
        )}

        {/* Part 3: growth against profitability (old layout; Growth rank box is now light blue) */}
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
                  <div className="rounded-2xl bg-primary-soft p-5">
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

                <SectionNote className="mt-6">
                  {data.valuationHowToRead}
                </SectionNote>
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