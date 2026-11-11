// Bottom line: the verdict at the end of the story, before the reference material.
// One question: after everything above, what should the reader take away?
// Server Component. No client JS needed.
import Link from "next/link";

export type BottomLineTone = "positive" | "caution" | "negative" | "neutral";

export type BottomLineItem = {
  icon: string; // Tabler icon name, e.g. "ti-briefcase"
  label: string; // e.g. "The business"
  verdict: string; // one or two words, shown as a chip
  tone: BottomLineTone;
  text: string; // one short line with the evidence
  href?: string; // in-page anchor to the section that proves it
  hrefLabel?: string;
};

export type BottomLineData = {
  title: string;
  lead: string;
  score: number; // 0 to 10, same as the hero
  scoreLabel: string; // e.g. "Strong"
  scoreHref?: string;
  scoreSummary?: string; // one sentence under the score, e.g. "Top grades for quality and profit, held back by a price above our fair value and slowing growth."
  items: BottomLineItem[]; // 3 items
  note: string;
};

// A word is always shown with the color, so meaning never depends on color alone.
const TONE = {
  positive: { chip: "bg-success-soft text-success", icon: "ti-circle-check" },
  caution: { chip: "bg-warning-soft text-warning", icon: "ti-alert-triangle" },
  negative: { chip: "bg-danger-soft text-danger", icon: "ti-alert-circle" },
  neutral: { chip: "bg-primary-soft text-primary-ink", icon: "ti-calendar-event" },
} as const;

export default function BottomLine({ data }: { data: BottomLineData }) {
  return (
    <section id="bottom-line" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        <div className="mt-8 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* score card, split: flat blue top with the number, white bottom with the three verdicts */}
          <div className="flex flex-col overflow-hidden rounded-[28px] border border-border bg-white">
            <div className="bg-primary p-5 text-white sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold tracking-wide">Scope Score</div>
                <div className="rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-primary-ink">
                  {data.scoreLabel}
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-serif text-[clamp(72px,8vw,88px)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                  {data.score.toFixed(1)}
                </span>
                <span className="text-2xl font-medium text-white/80">/ 10</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
              {data.scoreSummary && (
                <p className="mt-3 text-base leading-relaxed text-ink">{data.scoreSummary}</p>
              )}
              <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
                Scope&apos;s summary of the evidence, not a call to buy or sell.
              </p>

              {data.scoreHref && (
                <Link
                  href={data.scoreHref}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  How it is built
                  <i className="ti ti-arrow-right" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>

          {/* three takeaways */}
          <ul className="grid gap-3">
            {data.items.map((it) => {
              const t = TONE[it.tone];
              return (
                <li
                  key={it.label}
                  className="flex flex-col gap-4 rounded-[28px] border border-border bg-white p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${t.chip}`}>
                    <i className={`ti ${it.icon} text-[26px]`} aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="text-sm font-semibold text-ink-muted">{it.label}</h3>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${t.chip}`}
                      >
                        <i className={`ti ${t.icon}`} aria-hidden="true" />
                        {it.verdict}
                      </span>
                    </div>
                    <p className="mt-2 max-w-[560px] text-base leading-relaxed text-ink">{it.text}</p>
                  </div>

                  {it.href && (
                    <Link
                      href={it.href}
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {it.hrefLabel ?? "See why"}
                      <i className="ti ti-arrow-right" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-6 max-w-[780px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
          {data.note}
        </p>
      </div>
    </section>
  );
}