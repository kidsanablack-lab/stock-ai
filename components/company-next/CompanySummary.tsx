export type CompanySummaryData = {
  title: string;
  label?: string;
  text: string;
  /** Optional blue card on the right. Hidden if not provided. */
  highlight?: {
    eyebrow: string; // e.g. "Where the sales come from"
    value: string; // e.g. "26%"
    caption: string; // e.g. "from Services, FY25"
    /** Bar segments in order. Widths follow `share` (should add up to about 100). */
    segments: { label: string; share: number }[];
  };
};

// First segment is solid white, second is lighter, the rest are faded.
const segmentStyle = ["bg-white", "bg-white/60", "bg-white/20"];

export default function CompanySummary({ data }: { data: CompanySummaryData }) {
  const h = data.highlight;

  return (
    <section id="summary" className="bg-[#ffff] py-4 sm:py-6">
      <div
        className={`mx-auto grid w-full max-w-[1120px] gap-4 px-4 sm:px-6 lg:gap-5 ${
          h ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : ""
        }`}
      >
        {/* Left: the summary */}
        <div className="rounded-[28px] border border-border bg-white p-6 sm:rounded-[32px] sm:p-9">
          {data.label && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-[13px] font-semibold text-primary-ink">
              <i className="ti ti-sparkles" aria-hidden="true" />
              {data.label}
            </span>
          )}
          <h2 className="mt-4 font-serif text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-4 max-w-[720px] font-serif text-[17px] font-medium leading-[1.6] text-ink sm:text-lg">
            {data.text}
          </p>
        </div>

        {/* Right: one number that matters */}
        {h && (
          <div className="flex flex-col justify-between gap-8 rounded-[28px] bg-primary p-6 text-white sm:rounded-[32px] sm:p-9">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/75">
              {h.eyebrow}
            </p>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-serif text-[clamp(56px,6.5vw,80px)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                  {h.value}
                </span>
                <span className="text-base font-semibold sm:text-lg">{h.caption}</span>
              </div>

              <div
                className="mt-6 flex gap-1.5"
                role="img"
                aria-label={h.segments.map((s) => `${s.label}: ${s.share}%`).join(", ")}
              >
                {h.segments.map((s, i) => (
                  <div
                    key={s.label}
                    className={`h-3 rounded-full ${segmentStyle[Math.min(i, segmentStyle.length - 1)]}`}
                    style={{ width: `${s.share}%` }}
                  />
                ))}
              </div>
              <div className="mt-2.5 flex gap-1.5 text-sm font-medium" aria-hidden="true">
                {h.segments.map((s, i) => (
                  <div
                    key={s.label}
                    className={i === h.segments.length - 1 ? "text-right" : ""}
                    style={{ width: `${s.share}%` }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}