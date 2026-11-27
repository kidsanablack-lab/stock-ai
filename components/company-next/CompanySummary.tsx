import type { CompanySummaryData } from "@/lib/company-next/types";

// The data type lives in lib/company-next/types.ts. It is re-exported here so older imports keep working.
export type { CompanySummaryData } from "@/lib/company-next/types";

// Bar colors by position: first, second, then the rest. Full class names so Tailwind can find them.
const barColor = ["bg-chart-1", "bg-chart-2", "bg-chart-compare"];

export default function CompanySummary({ data }: { data: CompanySummaryData }) {
  const h = data.highlight;

  return (
    <section id="summary" className="bg-white py-8 lg:py-14">
      <div
        className={`mx-auto grid w-full max-w-[1120px] items-center gap-8 px-4 sm:px-6 ${
          h ? "lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-[72px]" : ""
        }`}
      >
        {/* Left: the summary */}
        <div className="flex min-w-0 flex-col gap-5">
          <h2 className="font-serif text-h2 font-semibold tracking-title text-ink">
            {data.title}
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.65] text-ink-muted sm:text-[19px]">
            {data.text}
          </p>
          {data.label && (
            <p className="mt-1 flex items-center gap-2 text-[13px] text-ink-muted">
              <i className="ti ti-sparkles" aria-hidden="true" />
              {data.label}
            </p>
          )}
        </div>

        {/* Right: one number that matters, with the split below it */}
        {h && (
          <div className="min-w-0 overflow-hidden rounded-[28px] border border-border bg-white">
            <div className="bg-primary px-7 pb-7 pt-6 text-white">
              <p className="text-base font-semibold leading-snug">{h.eyebrow}</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
                <span className="font-serif text-[clamp(56px,6.5vw,76px)] font-semibold leading-none tracking-[-0.03em]">
                  {h.value}
                </span>
                <span className="text-[17px] font-semibold">{h.caption}</span>
              </div>
            </div>

            <div
              className="flex flex-col gap-[22px] p-7"
              role="img"
              aria-label={h.segments.map((s) => `${s.label}: ${s.share}%`).join(", ")}
            >
              {h.segments.map((s, i) => {
                const color = barColor[Math.min(i, barColor.length - 1)];
                return (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between gap-3 text-base text-ink">
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className={`h-2.5 w-2.5 flex-none rounded-[3px] ${color}`} />
                        {s.label}
                      </span>
                      <span className="font-semibold">{s.share}%</span>
                    </div>
                    <div className="mt-2 h-2.5 rounded-full bg-border">
                      <div
                        className={`h-2.5 rounded-full ${color}`}
                        style={{ width: `${s.share}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}