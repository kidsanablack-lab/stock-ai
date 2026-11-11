// components/company-next/Spotlight.tsx
//
// "Spotlight": the one thing that decides this company, told in one place.
// Same six parts for every company; only the proof chart changes (chart.kind).
//
// Chart kinds so far:
//   "capex-vs-cash"   money spent on equipment vs cash coming in (Microsoft)
//   "profit-vs-sales" share of sales vs share of gross profit, two groups (Apple)
//   "stacked-share"   bars split into any number of parts that add up to 100% (NVIDIA: customers)
// To add a kind: add a type below, add it to SpotlightChartData, add a component,
// and add a case in <SpotlightChart />.
//
// Styling note: colors, padding and layout are inline on purpose, using the exact
// values from the approved design. They do not depend on which Tailwind classes
// the project happens to generate. Only the page container (max-w-6xl, px-6,
// sm:px-10) and font-serif are classes, because the other sections use them.

import type { CSSProperties } from "react";

export type SpotlightTone = "positive" | "negative" | "neutral";

export type CapexVsCashChart = {
  kind: "capex-vs-cash";
  title: string;
  howToRead: string;
  years: string[]; // e.g. ["FY22", ..., "FY26"]
  ocf: (number | null)[]; // operating cash flow, $B, one per year
  capex: (number | null)[]; // capital spending, $B, one per year
  callout: string;
};

export type ProfitVsSalesChart = {
  kind: "profit-vs-sales";
  title: string;
  howToRead: string;
  aName: string; // the larger, lower-margin group, e.g. "Products"
  bName: string; // the highlighted group, e.g. "Services"
  // Each row is one bar. a + b should add up to 100.
  rows: { label: string; a: number; b: number }[];
  // Gross margin of each group, in percent: how many dollars kept per $100 sold.
  marginA: number;
  marginB: number;
  // Optional bar colors (hex). Default: grey for the first group, blue for the second.
  aColor?: string;
  bColor?: string;
  callout: string;
};

export type StackedShareChart = {
  kind: "stacked-share";
  title: string;
  howToRead: string;
  // One entry per part of a bar, in the same order as each row's values.
  legend: { name: string; color: string }[];
  // Each row is one bar. values should add up to 100. tag is a short note on the right of the row label.
  rows: { label: string; tag?: string; values: number[] }[];
  callout: string;
};

export type SpotlightChartData = CapexVsCashChart | ProfitVsSalesChart | StackedShareChart;

export type SpotlightData = {
  title: string; // 1. conclusion headline
  lead: string; // 2. the business story, 2 to 3 sentences
  labels: string[]; // optional small chips under the headline (use [] for none)
  chart: SpotlightChartData; // 3. main proof chart
  numbers: { value: string; label: string; tone?: SpotlightTone }[]; // 4. supporting numbers (3 to 4)
  wins: { title: string; detail: string }[]; // 5a. what has to go right
  breaks: { title: string; detail: string }[]; // 5b. what could go wrong
  watch: { title: string; text: string; href?: string; hrefLabel?: string }; // 6. what to watch next
  source: string;
};

// Colors from the approved design
const C = {
  ink: "#0f1b3d",
  text: "#334155",
  muted: "#475569",
  faint: "#64748b",
  line: "#dbe4f3",
  blue: "#2563eb",
  blueDeep: "#1e3a8a",
  blueBg: "#eef4ff",
  grey: "#cbd5e1",
  red: "#dc2626",
  redText: "#b91c1c",
  redDeep: "#991b1b",
  redBg: "#fef2f2",
  redLine: "#fecaca",
  green: "#047857",
  greenDeep: "#065f46",
  greenBg: "#ecfdf5",
  greenLine: "#a7f3d0",
};

const toneStyle: Record<SpotlightTone, { bg: string; fg: string }> = {
  negative: { bg: C.redBg, fg: C.redText },
  positive: { bg: C.greenBg, fg: C.green },
  neutral: { bg: C.blueBg, fg: C.blueDeep },
};

const card: CSSProperties = {
  background: "#ffffff",
  border: `1px solid ${C.line}`,
  borderRadius: 20,
};

function fmt(v: number) {
  return v >= 100 ? v.toFixed(0) : v.toFixed(1);
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 14, color: C.text }}>
      {items.map((it) => (
        <span key={it.label} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: it.color }} aria-hidden />
          {it.label}
        </span>
      ))}
    </div>
  );
}

/* ---------- chart: capex vs cash coming in ---------- */

function CapexVsCash({ chart }: { chart: CapexVsCashChart }) {
  const { years, ocf, capex } = chart;
  const complete =
    years.length > 0 &&
    ocf.length === years.length &&
    capex.length === years.length &&
    ocf.every((v) => v !== null) &&
    capex.every((v) => v !== null);

  const legend = (
    <Legend
      items={[
        { color: C.blue, label: "Cash from operations" },
        { color: C.red, label: "Capital spending" },
      ]}
    />
  );

  if (!complete) {
    return (
      <>
        {legend}
        <div
          style={{
            border: "1px dashed #cbd5e1",
            background: "#f8fafc",
            borderRadius: 12,
            padding: 24,
            fontSize: 14,
            color: C.muted,
          }}
        >
          Chart data is incomplete. Fill in operating cash flow and capital spending for every year.
        </div>
      </>
    );
  }

  const ocfV = ocf as number[];
  const capexV = capex as number[];

  const W = 680;
  const H = 320;
  const padL = 44;
  const padR = 8;
  const padT = 28;
  const padB = 56;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const max = Math.ceil(Math.max(...ocfV, ...capexV) / 50) * 50;
  const y = (v: number) => padT + plotH - (v / max) * plotH;
  const groupW = plotW / years.length;
  const barW = Math.min(groupW * 0.32, 44);
  const ticks = [0, max / 2, max];

  return (
    <>
      {legend}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${chart.title}. ${chart.callout}`}
        style={{ width: "100%", height: "auto" }}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#e2e8f0" strokeWidth={1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fill={C.faint} fontSize={11}>
              {t}
            </text>
          </g>
        ))}

        {years.map((yr, i) => {
          const cx = padL + groupW * i + groupW / 2;
          const gap = ocfV[i] - capexV[i];
          const isLast = i === years.length - 1;
          const w = isLast ? 600 : 400;
          return (
            <g key={yr}>
              <rect x={cx - barW - 2} y={y(ocfV[i])} width={barW} height={y(0) - y(ocfV[i])} rx={3} fill={C.blue} />
              <rect x={cx + 2} y={y(capexV[i])} width={barW} height={y(0) - y(capexV[i])} rx={3} fill={C.red} />
              <text x={cx - barW / 2 - 2} y={y(ocfV[i]) - 6} textAnchor="middle" fill={C.text} fontSize={11} fontWeight={w}>
                {fmt(ocfV[i])}
              </text>
              <text x={cx + barW / 2 + 2} y={y(capexV[i]) - 6} textAnchor="middle" fill={C.text} fontSize={11} fontWeight={w}>
                {fmt(capexV[i])}
              </text>
              <text x={cx} y={H - 32} textAnchor="middle" fill={isLast ? C.ink : C.muted} fontSize={12} fontWeight={w}>
                {yr}
              </text>
              <text x={cx} y={H - 14} textAnchor="middle" fill={isLast ? C.ink : C.faint} fontSize={11} fontWeight={w}>
                {`left: ${fmt(gap)}`}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
}

/* ---------- chart: share of sales vs share of gross profit ---------- */

// Picks ink or white text so the label stays readable on any bar color.
function readableText(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.18 ? C.ink : "#ffffff";
}

function ProfitVsSales({ chart }: { chart: ProfitVsSalesChart }) {
  const aColor = chart.aColor ?? C.grey;
  const bColor = chart.bColor ?? C.blue;
  const aText = readableText(aColor);
  const bText = readableText(bColor);
  const seg = (width: number, bg: string, fg: string, label: string): CSSProperties => ({
    width: `${width}%`,
    background: bg,
    color: fg,
    display: "flex",
    alignItems: "center",
    paddingLeft: 16,
    fontSize: 15,
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
  });

  return (
    <>
      <Legend
        items={[
          { color: aColor, label: chart.aName },
          { color: bColor, label: chart.bName },
        ]}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "6px 0" }}>
        {chart.rows.map((r) => (
          <div key={r.label}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 8 }}>{r.label}</div>
            <div
              role="img"
              aria-label={`${r.label}: ${chart.aName} ${r.a.toFixed(1)}%, ${chart.bName} ${r.b.toFixed(1)}%`}
              style={{ display: "flex", height: 52, borderRadius: 12, overflow: "hidden" }}
            >
              <div style={seg(r.a, aColor, aText, "a")}>{r.a.toFixed(1)}%</div>
              <div style={seg(r.b, bColor, bText, "b")}>{r.b.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { name: chart.aName, value: chart.marginA, color: aColor },
          { name: chart.bName, value: chart.marginB, color: bColor },
        ].map((m) => (
          <div
            key={m.name}
            style={{
              flex: "1 1 200px",
              background: C.blueBg,
              borderRadius: 12,
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              lineHeight: 1.45,
              color: C.text,
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: 3, background: m.color, flex: "none" }} aria-hidden />
            <span>
              {m.name} keeps <strong style={{ color: C.ink }}>${m.value.toFixed(2)}</strong> of every $100 sold
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- chart: stacked bars of any number of parts ---------- */

function StackedShare({ chart }: { chart: StackedShareChart }) {
  const pct = (v: number) => (Number.isInteger(v) ? `${v}%` : `${v.toFixed(1)}%`);
  return (
    <>
      <Legend items={chart.legend.map((l) => ({ color: l.color, label: l.name }))} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "6px 0" }}>
        {chart.rows.map((r) => (
          <div key={r.label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{r.label}</span>
              {r.tag ? <span style={{ fontSize: 13, color: C.muted }}>{r.tag}</span> : null}
            </div>
            <div
              role="img"
              aria-label={`${r.label}: ${r.values.map((v, i) => `${chart.legend[i]?.name ?? ""} ${pct(v)}`).join(", ")}`}
              style={{ display: "flex", height: 52, borderRadius: 12, overflow: "hidden" }}
            >
              {r.values.map((v, i) => {
                const color = chart.legend[i]?.color ?? C.grey;
                return (
                  <div
                    key={i}
                    style={{
                      width: `${v}%`,
                      background: color,
                      color: readableText(color),
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 14,
                      fontSize: 15,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {pct(v)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SpotlightChart({ chart }: { chart: SpotlightChartData }) {
  switch (chart.kind) {
    case "capex-vs-cash":
      return <CapexVsCash chart={chart} />;
    case "profit-vs-sales":
      return <ProfitVsSales chart={chart} />;
    case "stacked-share":
      return <StackedShare chart={chart} />;
    default:
      return null;
  }
}

export default function Spotlight({ data }: { data: SpotlightData }) {
  const { chart } = data;

  return (
    <section id="spotlight" style={{ scrollMarginTop: 96, padding: "64px 0" }}>
      {/* Same width and side padding as the other sections */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* 1 + 2: headline and business story */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data.labels.length > 0 ? (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {data.labels.map((l) => (
                  <span
                    key={l}
                    style={{
                      background: C.blueBg,
                      color: C.blueDeep,
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "5px 12px",
                      borderRadius: 999,
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            ) : null}
            <h2
              className="font-serif"
              style={{
                margin: 0,
                maxWidth: 760,
                fontSize: "clamp(24px, 2.6vw, 30px)",
                lineHeight: 1.25,
                fontWeight: 600,
                letterSpacing: "-0.005em",
                color: C.ink,
              }}
            >
              {data.title}
            </h2>
            <p style={{ margin: 0, maxWidth: 680, fontSize: 17, lineHeight: 1.6, color: C.text }}>{data.lead}</p>
          </div>

          {/* 3 + 4: proof chart on the left, supporting numbers on the right */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "stretch" }}>
            <div
              style={{
                ...card,
                flex: "1.7 1 520px",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: C.ink }}>{chart.title}</h3>
              <SpotlightChart chart={chart} />
              <p style={{ margin: 0, fontSize: 16, fontWeight: 500, lineHeight: 1.5, color: C.ink }}>{chart.callout}</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: C.muted }}>{chart.howToRead}</p>
            </div>

            <div
              style={{
                flex: "1 1 320px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                alignContent: "stretch",
              }}
            >
              {data.numbers.map((n) => {
                const t = toneStyle[n.tone ?? "neutral"];
                return (
                  <div
                    key={n.label}
                    style={{
                      background: t.bg,
                      borderRadius: 16,
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div className="font-serif" style={{ fontSize: 30, fontWeight: 600, color: t.fg }}>
                      {n.value}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: C.text }}>{n.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5: what has to go right, what could go wrong */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { head: "What has to go right", items: data.wins, line: C.greenLine, color: C.greenDeep },
              { head: "What could go wrong", items: data.breaks, line: C.redLine, color: C.redDeep },
            ].map((col) => (
              <div
                key={col.head}
                style={{
                  flex: "1 1 400px",
                  background: "#ffffff",
                  border: `1px solid ${col.line}`,
                  borderRadius: 20,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: col.color }}>{col.head}</h3>
                {col.items.map((it) => (
                  <div key={it.title}>
                    <div style={{ fontWeight: 600, color: C.ink }}>{it.title}</div>
                    <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.55, color: C.text }}>{it.detail}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 6: what to watch next */}
          <div
            style={{
              background: C.blueBg,
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: C.ink }}>{data.watch.title}</h3>
            <p style={{ margin: 0, maxWidth: 760, fontSize: 15, lineHeight: 1.6, color: C.text }}>{data.watch.text}</p>
            {data.watch.href ? (
              <a
                href={data.watch.href}
                style={{ fontSize: 14, fontWeight: 500, color: "#1d4ed8", textDecoration: "underline", textUnderlineOffset: 4 }}
              >
                {data.watch.hrefLabel ?? "See the signals"}
              </a>
            ) : null}
          </div>

          <p style={{ margin: 0, maxWidth: 760, fontSize: 12, lineHeight: 1.6, color: C.faint }}>{data.source}</p>
        </div>
      </div>
    </section>
  );
}