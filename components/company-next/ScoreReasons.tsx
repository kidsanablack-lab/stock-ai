import Link from "next/link";

// Server Component.

export type ScoreReason = {
  name: string;
  grade: string; // e.g. "A+", "C", "D"
  value: string; // the key number or short phrase
  label: string; // one sentence of meaning
  href: string; // where the data lives further down the page
  score?: number; // 0 to 10, the category score behind the grade (drives the radar chart)
  weight?: number; // % of the overall score
};

export type ScoreReasonsData = {
  title: string;
  takeaway: string;
  reasons: ScoreReason[];
  howToRead: string;
};

type Tier = "strong" | "mixed" | "weak";

function tierOf(grade: string): Tier {
  const letter = grade.charAt(0).toUpperCase();
  if (letter === "A" || letter === "B") return "strong";
  if (letter === "C") return "mixed";
  return "weak";
}

// If a category has no numeric score, estimate one from its grade so the chart still draws.
const GRADE_SCORE: Record<string, number> = {
  "A+": 9.5, A: 8.5, "B+": 7.7, B: 7.2, "C+": 6.5, C: 5.5, D: 4, F: 1.5,
};
const scoreOf = (r: ScoreReason) => r.score ?? GRADE_SCORE[r.grade.toUpperCase()] ?? 5;

// Grade tile and radar dot share the same tier color.
const TIER = {
  strong: { tile: "bg-success-soft text-success", dot: "fill-success" },
  mixed: { tile: "bg-warning-soft text-warning", dot: "fill-warning" },
  weak: { tile: "bg-danger-soft text-danger", dot: "fill-danger" },
} as const;

/* ---------- Radar chart ---------- */

const W = 560;
const H = 460;
const CX = W / 2;
const CY = H / 2;
const R = 150;
const RINGS = [0.25, 0.5, 0.75, 1];

function ScoreRadar({ reasons }: { reasons: ScoreReason[] }) {
  const n = reasons.length;
  if (n < 3) return null;

  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i: number, radius: number) => ({
    x: CX + radius * Math.cos(angle(i)),
    y: CY + radius * Math.sin(angle(i)),
  });
  const polygon = (radius: number) =>
    reasons.map((_, i) => pt(i, radius)).map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const dataPoints = reasons.map((r, i) => pt(i, (Math.min(Math.max(scoreOf(r), 0), 10) / 10) * R));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full max-w-[520px]"
      role="img"
      aria-label={`Radar chart of category scores: ${reasons
        .map((r) => `${r.name} ${r.grade}, ${scoreOf(r).toFixed(1)}`)
        .join("; ")}`}
    >
      {/* rings */}
      {RINGS.map((k) => (
        <polygon
          key={k}
          points={polygon(R * k)}
          className="fill-none stroke-border"
          strokeWidth={1}
        />
      ))}

      {/* axes */}
      {reasons.map((_, i) => {
        const p = pt(i, R);
        return (
          <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} className="stroke-border" strokeWidth={1} />
        );
      })}

      {/* score area */}
      <polygon
        points={dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
        className="fill-primary stroke-primary"
        fillOpacity={0.14}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* dots, colored by tier */}
      {dataPoints.map((p, i) => (
        <circle
          key={reasons[i].name}
          cx={p.x}
          cy={p.y}
          r={6}
          className={`${TIER[tierOf(reasons[i].grade)].dot} stroke-white`}
          strokeWidth={2}
        />
      ))}

      {/* labels */}
      {reasons.map((r, i) => {
        const cos = Math.cos(angle(i));
        const sin = Math.sin(angle(i));
        const lx = CX + (R + 22) * cos;
        const ly = CY + (R + 22) * sin;
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        const nameY = ly + sin * 8 - 2;
        return (
          <g key={r.name}>
            <text x={lx} y={nameY} textAnchor={anchor} className="fill-ink text-[15px] font-semibold">
              {r.name}
            </text>
            <text x={lx} y={nameY + 18} textAnchor={anchor} className="fill-ink-muted text-[13px] tabular-nums">
              {r.grade} · {scoreOf(r).toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Overall summary card ---------- */

// Same label cut-offs as Sources and method.
function labelOf(score: number) {
  if (score >= 9) return "Excellent";
  if (score >= 7.5) return "Strong";
  if (score >= 6) return "Good";
  if (score >= 5) return "Fair";
  return "Weak";
}

function OverallCard({ reasons }: { reasons: ScoreReason[] }) {
  const weighted = reasons.filter((r) => typeof r.weight === "number");
  const totalWeight = weighted.reduce((sum, r) => sum + (r.weight ?? 0), 0);
  const overall =
    totalWeight > 0
      ? weighted.reduce((sum, r) => sum + scoreOf(r) * (r.weight ?? 0), 0) / totalWeight
      : reasons.reduce((sum, r) => sum + scoreOf(r), 0) / reasons.length;

  const sorted = [...reasons].sort((a, b) => scoreOf(b) - scoreOf(a));
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const byWeight = [...weighted].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
  const maxWeight = byWeight[0]?.weight ?? 1;

  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] border border-border bg-white">
      {/* Blue header: name, big score, label */}
      <div className="bg-primary px-5 py-5 text-white sm:px-6 sm:py-6">
        <p className="text-sm font-semibold text-primary-soft">Overall Scope Score</p>
        <div className="mt-2 flex items-end gap-3">
          <span className="font-serif text-[64px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
            {overall.toFixed(1)}
          </span>
          <span className="pb-2 text-sm text-primary-soft">out of 10</span>
          <span className="mb-2 ml-auto rounded-full bg-white px-3 py-0.5 text-[13px] font-semibold text-primary-ink">
            {labelOf(overall)}
          </span>
        </div>
      </div>

      {/* White body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div
          className="h-1.5 overflow-hidden rounded-full bg-primary-soft"
          role="meter"
          aria-label="Overall Scope Score"
          aria-valuemin={0}
          aria-valuemax={10}
          aria-valuenow={Number(overall.toFixed(1))}
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${overall * 10}%` }} />
        </div>

        {byWeight.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">How much each category counts</p>
            <ul className="mt-3 grid gap-2.5">
              {byWeight.map((r) => (
                <li key={r.name} className="grid grid-cols-[104px_minmax(0,1fr)_36px] items-center gap-3 text-sm">
                  <span className="truncate text-ink-muted">{r.name}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-primary-soft">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${((r.weight ?? 0) / maxWeight) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-semibold tabular-nums text-ink">{r.weight}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 lg:mt-auto lg:pt-6">
          <div className="rounded-2xl bg-success-soft px-4 py-3">
            <p className="text-[13px] font-medium text-success">Strongest</p>
            <p className="mt-0.5 text-[15px] font-semibold text-ink">{best.name}</p>
            <p className="font-serif text-lg font-semibold tabular-nums text-success">{scoreOf(best).toFixed(1)}</p>
          </div>
          <div className="rounded-2xl bg-danger-soft px-4 py-3">
            <p className="text-[13px] font-medium text-danger">Weakest</p>
            <p className="mt-0.5 text-[15px] font-semibold text-ink">{worst.name}</p>
            <p className="font-serif text-lg font-semibold tabular-nums text-danger">{scoreOf(worst).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function ScoreReasons({ data }: { data: ScoreReasonsData }) {
  return (
    <section id="score" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6">
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[660px] text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {data.takeaway}
          </p>
        </header>

        {data.reasons.length > 0 && (
          <div className="mt-8">
            {/* Top: overall summary card on the left, radar card on the right */}
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <OverallCard reasons={data.reasons} />
              {/* Radar hidden on small phones, the cards below carry the same info */}
              <div className="hidden items-center justify-center rounded-[28px] border border-border bg-white p-4 sm:flex sm:p-6">
                <ScoreRadar reasons={data.reasons} />
              </div>
            </div>

            {/* Below: one compact card per category, laid out in a row grid */}
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.reasons.map((reason) => {
                const s = TIER[tierOf(reason.grade)];
                return (
                  <li key={reason.name}>
                    <Link
                      href={reason.href}
                      className="group flex h-full items-start gap-3.5 rounded-2xl border border-border bg-white px-4 py-4 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-xl font-serif text-[20px] font-semibold leading-none tabular-nums ${s.tile}`}
                        aria-label={`Grade ${reason.grade}`}
                      >
                        {reason.grade}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[15px] font-semibold leading-tight text-ink">{reason.name}</span>
                          <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary transition-colors group-hover:text-primary-hover">
                            See data
                            <i
                              className="ti ti-arrow-right transition-transform group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="mt-0.5 font-serif text-2xl font-semibold leading-tight tracking-tight tabular-nums text-ink">
                          {reason.value}
                        </div>
                        <p className="mt-0.5 text-sm leading-snug text-ink-muted">{reason.label}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <p className="mt-6 max-w-[760px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
          {data.howToRead}
        </p>
      </div>
    </section>
  );
}