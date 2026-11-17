// ส่วน 8: บริษัททำเงินได้เท่าไรต่อปี และคุณภาพกำไรดีแค่ไหน
// ภาพหลัก: ตารางสรุปตัวเลข (หัวสีฟ้า) + กราฟเส้น "Growth since <ปีแรก>" (ปีแรก = 100) เส้นเต็มความกว้าง ตัวอธิบายเส้นอยู่ด้านล่าง
// ไม่มีชื่อบริษัทหรือปีที่ฝังไว้ในไฟล์นี้ ปีทั้งหมดมาจาก data.years (บังคับส่ง)
// Server Component.

type Tone = "positive" | "negative";

type Metric = {
  label: string;
  value: string;
  change: string;
  tone: Tone;
  series: number[]; // one value per year, oldest first, same length as `years`
  note: string;
  unit: "B" | "$" | "%"; // ใช้แสดงตัวเลขบนแท่ง
};

export type FinancialHighlightsData = {
  title: string;
  lead: string;
  labels: string[];
  metrics: Metric[];
  howToRead: string;
  source: string;
  // Year labels of the series, oldest first. Required: there is no default, so a page can never show the wrong years.
  years: string[];
};

// A round step so the y axis shows about 8 labels at most, even when a line grows 10 times over.
function niceStep(span: number, maxIntervals = 7) {
  const steps = [10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
  return steps.find((s) => span / s <= maxIntervals) ?? 10000;
}

// สีของแต่ละเส้น เรียงตามอันดับการเติบโต (เร็วสุด -> ช้าสุด) ใช้สีทึบ ไม่ไล่สี
// แก้สีตรงนี้ที่เดียว กราฟกับตัวอธิบายด้านล่างจะเปลี่ยนตามกัน
const LINE_COLORS = ["#1B5CE8", "#0E9F8E", "#E8590C", "#7C4DDB", "#D6336C", "#0E1B38"];

// The arrow repeats what the color says, so the change never relies on color alone.
function Change({ m }: { m: Metric }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-semibold tabular-nums ${
        m.tone === "positive" ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
      }`}
    >
      <span aria-hidden="true">{m.tone === "positive" ? "▲" : "▼"}</span>
      {m.change}
    </span>
  );
}

function pct(v: number) {
  return `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`;
}

function GrowthChart({ metrics, years: YEARS }: { metrics: Metric[]; years: string[] }) {
  // ทุกการ์ดมีเส้นของตัวเอง (ทำดัชนีจากค่าปีแรกของแต่ละชุด) ข้ามเฉพาะชุดที่ปีแรกเป็น 0 หรือติดลบ เพราะหารไม่ได้
  const rows = metrics
    .filter((m) => m.series.length >= 2 && m.series[0] > 0)
    .map((m) => {
      const idx = m.series.map((v) => (v / m.series[0]) * 100);
      return { m, idx, offset: YEARS.length - m.series.length, growth: idx[idx.length - 1] - 100 };
    })
    .sort((a, b) => b.growth - a.growth);

  // ชุดที่ถูกข้าม บอกผู้อ่านด้วย ไม่ปล่อยให้หายเงียบๆ
  const skipped = metrics.filter((m) => m.series.length >= 2 && m.series[0] <= 0);

  if (rows.length < 2) return null;

  const all = rows.flatMap((r) => r.idx).concat(100);
  const span = Math.max(...all) - Math.min(...all);
  const step = niceStep(span);
  const lo = Math.floor(Math.min(...all) / step) * step;
  const hi = Math.ceil(Math.max(...all) / step) * step;

  // เส้นยาวเต็มความกว้างการ์ด (ไม่เว้นที่ด้านขวาให้ตัวหนังสือแล้ว)
  const W = 1000;
  const H = 340;
  const L = 36;
  const R = 976;
  const T = 16;
  const B = 296;
  const x = (i: number) => L + (i * (R - L)) / (YEARS.length - 1);
  const y = (v: number) => T + ((hi - v) / (hi - lo)) * (B - T);

  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += step) ticks.push(v);

  const colorOf = (rank: number) => LINE_COLORS[Math.min(rank, LINE_COLORS.length - 1)];

  return (
    <div className="mt-3 rounded-3xl border border-border bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-xl font-semibold tracking-tight text-ink sm:text-2xl">Growth since {YEARS[0]}</h3>
        <span className="text-sm text-ink-muted">Index, {YEARS[0]} = 100</span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 h-auto w-full"
        role="img"
        aria-label={`Line chart indexed to ${YEARS[0]} = 100: ${rows.map((r) => `${r.m.label} ${pct(r.growth)}`).join(", ")}`}
      >
        {/* gridlines + y labels */}
        <g className="text-border">
          {ticks.map((v) => (
            <line
              key={v}
              x1={L}
              x2={R}
              y1={y(v)}
              y2={y(v)}
              stroke="currentColor"
              strokeWidth={1}
            />
          ))}
          {/* the starting level (100) is always marked, even when it is not one of the labels */}
          <line x1={L} x2={R} y1={y(100)} y2={y(100)} stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 4" />
        </g>
        <g className="text-ink-muted" fill="currentColor" fontSize="14">
          {ticks.map((v) => (
            <text key={v} x={0} y={y(v) + 5}>
              {v}
            </text>
          ))}
          {YEARS.map((yr, i) => (
            <text
              key={yr}
              x={x(i)}
              y={H - 10}
              textAnchor={i === 0 ? "start" : i === YEARS.length - 1 ? "end" : "middle"}
              fontWeight={i === YEARS.length - 1 ? 600 : 400}
            >
              {yr}
            </text>
          ))}
        </g>

        {/* lines: วาดเส้นที่โตเร็วสุดทีหลังสุดเพื่อให้อยู่ด้านบน */}
        {[...rows].reverse().map((r) => {
          const rank = rows.indexOf(r);
          const color = colorOf(rank);
          const pts = r.idx.map((v, i) => `${x(i + r.offset)},${y(v)}`).join(" ");
          return (
            <g key={r.m.label} style={{ color }}>
              <polyline
                points={pts}
                fill="none"
                stroke="currentColor"
                strokeWidth={rank === 0 ? 4 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={x(YEARS.length - 1)}
                cy={y(r.idx[r.idx.length - 1])}
                r={rank === 0 ? 7 : 5.5}
                fill="currentColor"
                stroke="#fff"
                strokeWidth={2}
              />
            </g>
          );
        })}
      </svg>

      {/* ตัวอธิบายเส้น: ชื่อ + % เติบโต เรียงจากโตเร็วสุด อยู่ด้านล่างกราฟ */}
      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r, rank) => (
          <li
            key={r.m.label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
          >
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: colorOf(rank) }}
            />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{r.m.label}</span>
            <span className={`text-sm font-semibold tabular-nums ${r.growth >= 0 ? "text-success" : "text-danger"}`}>
              {pct(r.growth)}
            </span>
          </li>
        ))}
      </ul>

      {skipped.length > 0 && (
        <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
          Not on this chart, because the value in {YEARS[0]} was zero or negative:{" "}
          {skipped.map((m) => m.label.toLowerCase()).join(", ")}.
        </p>
      )}
    </div>
  );
}

export default function FinancialHighlights({ data }: { data: FinancialHighlightsData }) {
  return (
    <section id="highlights" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <header>
          {/* data.labels ไม่แสดงแล้ว (ซ้ำกับบรรทัด Source ด้านล่าง) แต่ยังอยู่ใน data type เหมือนเดิม */}
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[620px] text-sm leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* ตารางสรุปตัวเลข: หัวสีฟ้า + หนึ่งแถวต่อหนึ่งตัวเลข (ไม่มีแท่งกราฟ) */}
        {data.metrics.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-white">
            <div className="bg-primary px-5 py-4 sm:px-6">
              <h3 className="font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {data.years[data.years.length - 1]} at a glance
              </h3>
            </div>
            <ul className="px-5 sm:px-6">
              {data.metrics.map((m) => (
                <li
                  key={m.label}
                  className="grid items-center gap-x-6 gap-y-2 border-b border-border py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_200px_190px]"
                >
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-ink">{m.label}</div>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{m.note}</p>
                  </div>
                  <div className="font-serif text-[clamp(32px,4vw,40px)] font-semibold leading-none tracking-tight tabular-nums text-ink sm:translate-y-[3px] sm:text-right">
                    {m.value}
                  </div>
                  <div className="justify-self-start sm:justify-self-end">
                    <Change m={m} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <GrowthChart metrics={data.metrics} years={data.years} />

        <p className="mt-5 max-w-[780px] border-l-2 border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
          {data.howToRead}
        </p>
        <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}