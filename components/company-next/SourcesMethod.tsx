import { type ReactNode } from "react";
import type { DataStatus, SourcesMethodData } from "@/lib/company-next/types";
import { scoreLabel } from "@/lib/company-next/scoreLabel";
import SectionNote from "./SectionNote";

// Section 20: Sources and method (page footer, outside the tabs).
// One question: where does each number come from, how is it calculated, and how far can it be trusted?
// Company-neutral: no industry wording is guessed in this file. Every source gives its own `topic` in the data,
// and every document names the `source` (by its title) that it belongs to. Nothing is worked out from patterns.
// Look only: the data types, props, score maths, timeline scale and source/document matching are unchanged.
// Layout: Trace a number and Data sources are blue-band cards. Formulas is one table card. Scope Score, Fair value and
// Freshness are one card each, with the score categories as rows. `labels` stays in the data but is not shown.
// The timeline can hold any number of dates: the card title and the column count follow `data.timeline`.
// Server Component. No client JS needed.

// The data types live in lib/company-next/types.ts. They are re-exported here so older imports keep working.
export type { TraceData, DataStatus, SourcesMethodData } from "@/lib/company-next/types";

const STEP_LABELS = ["Source", "Reported figures", "Scope formula", "Result", "Used in"];

// Each status has an icon and a word, so meaning never depends on color alone.
// pill = the chip on a white card, text = the same color for use on a white chip inside a blue band.
const STATUS: Record<DataStatus, { cls: string; text: string; icon: string }> = {
  Verified: { cls: "bg-success-soft text-success", text: "text-success", icon: "ti-circle-check" },
  Pending: { cls: "bg-warning-soft text-warning", text: "text-warning", icon: "ti-clock" },
  Unavailable: { cls: "bg-[#f1f5fa] text-ink-muted", text: "text-ink-muted", icon: "ti-minus" },
};

// Category colors are fixed by position so the weight tiles and the category rows match.
// The third color is light, so its label is dark.
const CAT_BG = ["bg-share-1", "bg-share-2", "bg-share-3", "bg-share-4", "bg-share-5", "bg-primary"];
const CAT_DARK_TEXT = [false, false, true, false, false, false];

// The score label cut-offs (Excellent, Strong, Good, Fair, Weak) live in lib/company-next/scoreLabel.ts,
// shared with the Score section.

// A document whose `source` matches no source title (a typo in the data) is not dropped. It is shown in this last row,
// so the mistake is visible on the page instead of the document vanishing.
const UNMATCHED_ROW_TOPIC = "Other documents";

const NAV = [
  { id: "trace", label: "Trace a number" },
  { id: "data-sources", label: "Data sources" },
  { id: "formulas", label: "Formulas" },
  { id: "scoring", label: "Scope Score" },
  { id: "fair-value", label: "Fair value" },
  { id: "freshness", label: "Freshness" },
];

// Timeline: color of each stretch between two dates.
const SEG = [
  { line: "bg-warning-soft", text: "text-warning" },
  { line: "bg-primary/25", text: "text-primary-ink" },
];

// Tailwind needs whole class names, so the column count of the date list is looked up, not built.
// More than 4 dates wrap onto a new row of 4.
const TIMELINE_COLS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function StatusPill({ status }: { status: DataStatus }) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[13px] font-semibold ${s.cls}`}
    >
      <i className={`ti ${s.icon}`} aria-hidden="true" />
      {status}
    </span>
  );
}

function Block({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 pt-12">
      <h3 className="max-w-[820px] font-serif text-h3 font-medium tracking-title text-ink">{title}</h3>
      <p className="mt-1.5 max-w-[680px] text-[15px] leading-relaxed text-ink-muted">{intro}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <SectionNote className="mt-6">
      {children}
    </SectionNote>
  );
}

/* Card with a blue header band and a white body, the same card language as the other pages. */
function BandCard({
  title,
  aside,
  children,
  className = "",
}: {
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[28px] border border-border bg-white ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-primary px-5 py-3.5 text-white sm:px-7">
        <div className="font-serif text-xl font-medium leading-tight sm:text-[22px]">{title}</div>
        {aside}
      </div>
      {children}
    </div>
  );
}

function DocRow({ d }: { d: { name: string; type: string; date: string; use: string } }) {
  return (
    <li className="border-t border-border py-3 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-semibold text-ink">{d.name}</span>
          <span className="rounded-lg bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary-ink">{d.type}</span>
        </div>
        <span className="text-[13px] tabular-nums text-ink-muted">{d.date}</span>
      </div>
      <p className="mt-1 text-sm leading-snug text-ink-muted">{d.use}</p>
    </li>
  );
}

export default function SourcesMethod({ data }: { data: SourcesMethodData }) {
  const totalWeight = data.categories.reduce((s, c) => s + c.weight, 0) || 1;
  const weightsOk = Math.round(totalWeight) === 100;
  const counts = (["Verified", "Pending", "Unavailable"] as DataStatus[])
    .map((s) => ({ s, n: data.freshness.filter((r) => r.status === s).length }))
    .filter((x) => x.n > 0);

  // The overall score is worked out here from the category scores, so the two can never disagree.
  const allScored = data.categories.length > 0 && data.categories.every((c) => c.score !== undefined);
  const overall = allScored
    ? data.categories.reduce((s, c) => s + c.weight * (c.score as number), 0) / totalWeight
    : null;

  // Score tiles: biggest weights on top, the rest below. Colors still follow the original order.
  const tiles = data.categories.map((c, i) => ({ c, i })).sort((a, b) => b.c.weight - a.c.weight);
  const split = Math.ceil(tiles.length / 2);
  const tileRows = [tiles.slice(0, split), tiles.slice(split)].filter((r) => r.length > 0);

  // Data sources: each source with the documents that name it.
  const sourceRows = data.sources.map((s) => ({
    title: s.title,
    text: s.text,
    topic: s.topic,
    docs: data.documents.filter((d) => d.source === s.title),
  }));
  const knownSources = new Set(data.sources.map((s) => s.title));
  const otherDocs = data.documents.filter((d) => !knownSources.has(d.source));
  const allRows = [
    ...sourceRows,
    ...(otherDocs.length > 0
      ? [{ title: UNMATCHED_ROW_TOPIC, text: "", topic: UNMATCHED_ROW_TOPIC, docs: otherDocs }]
      : []),
  ];

  // Timeline drawn to scale. Falls back to even spacing if a date cannot be read.
  const times = data.timeline.map((t) => Date.parse(t.date));
  const count = data.timeline.length;
  const toScale = count > 1 && times.every((n) => !Number.isNaN(n)) && times[count - 1] > times[0];
  const pcts = data.timeline.map((_, i) =>
    toScale ? ((times[i] - times[0]) / (times[count - 1] - times[0])) * 100 : count > 1 ? (i * 100) / (count - 1) : 0,
  );
  const gaps = pcts.slice(1).map((_, i) => (toScale ? Math.round((times[i + 1] - times[i]) / 86400000) : null));
  // The card title counts the dates in the data, so it stays correct if a company has 2 or 4 dates.
  const timelineTitle = `${count} ${count === 1 ? "date" : "dates"}${toScale ? ", drawn to scale" : ""}`;
  const timelineCols = TIMELINE_COLS[Math.min(Math.max(count, 1), 4)];

  return (
    <section id="sources" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(30px,3.8vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">{data.title}</h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
          <nav aria-label="On this section" className="mt-5 flex flex-wrap gap-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </header>

        {/* Trace a number: one blue-band card per number. A vertical path on mobile, a horizontal path on desktop. */}
        <Block id="trace" title={data.traceTitle} intro={data.traceIntro}>
          <div className="grid gap-4">
            {data.traces.map((t) => (
              <article key={t.metric} className="overflow-hidden rounded-[28px] border border-border bg-white">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-primary px-5 py-3.5 text-white sm:px-7">
                  <h4 className="text-base font-semibold">{t.metric}</h4>
                  <span className="font-serif text-[clamp(32px,4vw,40px)] font-semibold leading-none tracking-title tabular-nums">
                    {t.value}
                  </span>
                </div>

                <ol className="grid gap-0 px-5 py-6 sm:px-7 lg:grid-cols-5 lg:gap-3">
                  {t.steps.map((s, i) => {
                    const result = i === 3;
                    const last = i === t.steps.length - 1;
                    return (
                      <li key={i} className="relative flex gap-4 pb-5 last:pb-0 lg:block lg:pb-0 lg:pr-3">
                        {/* connector */}
                        {!last && (
                          <span
                            aria-hidden="true"
                            className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-border lg:left-10 lg:right-0 lg:top-[15px] lg:h-px lg:w-auto"
                          />
                        )}
                        <span
                          className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold tabular-nums ${
                            result ? "bg-primary text-white" : "border border-border bg-white text-ink"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="lg:mt-3">
                          <div
                            className={`text-[13px] font-semibold ${result ? "text-primary-ink" : "text-ink-muted"}`}
                          >
                            {STEP_LABELS[i]}
                          </div>
                          <div
                            className={`mt-1 text-sm leading-snug text-ink ${
                              result ? "font-semibold" : ""
                            } ${i === 2 ? "font-medium tabular-nums" : ""}`}
                          >
                            {s}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </article>
            ))}
          </div>
        </Block>

        {/* Data sources: one blue-band card per source, what it is on the left and its documents on the right */}
        <Block id="data-sources" title={data.sourcesTitle} intro={data.sourcesIntro}>
          <ul className="grid gap-4">
            {allRows.map((row) => (
              <li key={row.title}>
                <BandCard
                  title={row.topic}
                  aside={
                    <span className="text-sm text-white/90">
                      {row.title === UNMATCHED_ROW_TOPIC ? "" : `${row.title} · `}
                      {row.docs.length} {row.docs.length === 1 ? "document" : "documents"}
                    </span>
                  }
                >
                  <div className="grid gap-5 px-5 py-5 sm:px-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
                    <div>
                      {row.text && (
                        <>
                          <div className="text-[13px] font-semibold text-ink-muted">What it is</div>
                          <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{row.text}</p>
                        </>
                      )}
                    </div>
                    <div>
                      <div className="pb-2 text-[13px] font-semibold text-ink-muted">Documents Scope reads</div>
                      <ul>
                        {row.docs.length === 0 && <li className="text-sm text-ink-muted">No documents listed.</li>}
                        {row.docs.map((d) => (
                          <DocRow key={d.name} d={d} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </BandCard>
              </li>
            ))}
          </ul>
        </Block>

        {/* Formulas: one card, one row per formula */}
        <Block id="formulas" title={data.formulasTitle} intro={data.formulasIntro}>
          <BandCard title={`${data.formulas.length} ${data.formulas.length === 1 ? "formula" : "formulas"}`}>
            <ul>
              {data.formulas.map((f) => (
                <li
                  key={f.name}
                  className="grid gap-x-6 gap-y-2 border-t border-border px-5 py-4 first:border-t-0 sm:px-7 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1.2fr)]"
                >
                  <div className="text-base font-semibold text-ink">{f.name}</div>
                  <code className="block self-start rounded-[10px] bg-primary-soft px-3 py-2 font-sans text-sm font-medium leading-snug text-primary-ink">
                    {f.formula}
                  </code>
                  <p className="text-sm leading-relaxed text-ink-muted">{f.note}</p>
                </li>
              ))}
            </ul>
          </BandCard>
          <Note>{data.formulasNote}</Note>
        </Block>

        {/* Scoring: one card. Overall score and weight tiles on top, one row per category below. */}
        <Block id="scoring" title={data.scoringTitle} intro={data.scoringIntro}>
          <div className="overflow-hidden rounded-[28px] border border-border bg-white">
            <div className={`grid ${overall !== null ? "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]" : ""}`}>
              {overall !== null && (
                <div className="flex flex-col justify-center bg-primary px-6 py-7 text-white sm:px-8">
                  <div className="text-[15px] font-semibold">Overall score</div>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif text-[clamp(60px,8vw,84px)] font-semibold leading-none tracking-title tabular-nums">
                      {overall.toFixed(1)}
                    </span>
                    <span className="text-[17px]">out of 10</span>
                  </div>
                  <div className="mt-3 self-start rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-primary-ink">
                    {scoreLabel(overall)}
                  </div>
                </div>
              )}

              <div className="min-w-0 px-5 py-5 sm:px-7">
                <div
                  className="flex h-[210px] flex-col gap-1.5 sm:h-[250px]"
                  role="img"
                  aria-label={`Score weights: ${data.categories.map((c) => `${c.name} ${c.weight}%`).join(", ")}`}
                >
                  {tileRows.map((row, ri) => (
                    <div
                      key={ri}
                      className="flex min-h-0 gap-1.5"
                      style={{ flex: `${row.reduce((s, t) => s + t.c.weight, 0)} 1 0` }}
                    >
                      {row.map(({ c, i }) => (
                        <div
                          key={c.name}
                          className={`flex min-w-0 flex-col justify-between rounded-xl p-2.5 sm:p-3.5 ${CAT_BG[i % CAT_BG.length]} ${
                            CAT_DARK_TEXT[i % CAT_DARK_TEXT.length] ? "text-ink" : "text-white"
                          }`}
                          style={{ flex: `${c.weight} 1 0` }}
                          title={`${c.name}: ${c.weight}%`}
                        >
                          <span className="break-words text-[12px] font-medium leading-tight sm:text-[14px]">{c.name}</span>
                          <span className="font-serif text-[clamp(20px,2.6vw,28px)] font-semibold leading-none tabular-nums">
                            {c.weight}%
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <p className={`mt-2.5 text-[13px] ${weightsOk ? "text-ink-muted" : "font-semibold text-danger"}`}>
                  {weightsOk
                    ? `Weights add up to ${totalWeight}%. Each row below uses the same color.`
                    : `Check the weights: they add up to ${totalWeight}%, not 100%.`}
                </p>
              </div>
            </div>

            <ul>
              {data.categories.map((c, i) => {
                const partial = c.coverage < 90;
                const dark = CAT_DARK_TEXT[i % CAT_DARK_TEXT.length];
                // The light category color would vanish on the pale input card, so its bars use the primary blue.
                const barColor = dark ? "bg-primary" : CAT_BG[i % CAT_BG.length];
                return (
                  <li
                    key={c.name}
                    className="grid border-t border-border md:grid-cols-[150px_minmax(0,1fr)] lg:grid-cols-[150px_minmax(0,1fr)_340px]"
                  >
                    {/* Left block: category color, name, score, level and weight */}
                    <div
                      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-4 text-center md:flex-col md:py-6 ${
                        CAT_BG[i % CAT_BG.length]
                      } ${dark ? "text-ink" : "text-white"}`}
                    >
                      <h4 className="text-[15px] font-semibold leading-tight">{c.name}</h4>
                      {c.score !== undefined && (
                        <>
                          <span className="font-serif text-[40px] font-semibold leading-none tabular-nums">
                            {c.score.toFixed(1)}
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-ink">
                            {scoreLabel(c.score)}
                          </span>
                        </>
                      )}
                      <span className="text-xs tabular-nums opacity-90">Weight {c.weight}%</span>
                    </div>

                    {/* Middle: inputs, weights and this company's figure */}
                    <div className="grid content-center gap-2 px-5 py-5 sm:px-6">
                      {c.inputs.map((inp) => (
                        <div key={inp.name} className="rounded-2xl bg-[#f1f5fa] px-3.5 py-3">
                          <div className="flex items-baseline justify-between gap-3 text-sm text-ink">
                            <span>
                              {inp.name}
                              {inp.analyst && (
                                <span className="ml-2 rounded-full border border-dashed border-primary-ink px-2 text-xs font-medium text-primary-ink">
                                  Analyst view
                                </span>
                              )}
                            </span>
                            <span className="shrink-0 font-semibold tabular-nums text-ink-muted">{inp.weight}%</span>
                          </div>
                          {inp.value !== undefined && (
                            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                              <span className="font-serif text-[22px] font-medium leading-none tabular-nums text-ink">
                                {inp.value}
                              </span>
                              {inp.score !== undefined && (
                                <span className="text-[13px] tabular-nums text-ink-muted">
                                  scores {inp.score.toFixed(1)} of 10
                                </span>
                              )}
                            </div>
                          )}
                          {inp.score !== undefined && (
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                              <div
                                className={`h-full rounded-full ${barColor}`}
                                style={{ width: `${Math.min(100, Math.max(0, inp.score * 10))}%` }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right: how data becomes a score, and what happens when data is missing */}
                    <div className="border-t border-border px-5 py-5 sm:px-6 md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0">
                      <p className="text-sm leading-relaxed text-ink">{c.rule}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                        <span className="font-semibold text-ink">If data is missing:</span> {c.missing}
                      </p>
                      <span
                        className={`mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                          partial ? "bg-warning-soft text-warning" : "bg-success-soft text-success"
                        }`}
                      >
                        <i className={`ti ${partial ? "ti-alert-triangle" : "ti-circle-check"}`} aria-hidden="true" />
                        {partial ? "Partial" : "Full"} data coverage · {c.coverage}%
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Note>{data.scoringNote}</Note>
        </Block>

        {/* Valuation: one card, one column per reference point */}
        <Block id="fair-value" title={data.valuationTitle} intro={data.valuationIntro}>
          <BandCard title="Reference points">
            <ul className="grid md:grid-cols-3 md:divide-x md:divide-border">
              {data.methods.map((m) => (
                <li key={m.name} className="flex flex-col border-t border-border px-5 py-5 first:border-t-0 sm:px-7 md:border-t-0">
                  <div className="font-serif text-[22px] font-medium leading-tight text-ink">{m.name}</div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{m.what}</p>
                  <div className="mt-auto pt-4">
                    <div className="rounded-[14px] bg-warning-soft px-3.5 py-3 text-[13.5px] leading-snug text-ink">
                      <span className="flex items-center gap-1.5 font-semibold text-warning">
                        <i className="ti ti-alert-triangle" aria-hidden="true" />
                        Limit
                      </span>
                      <span className="mt-0.5 block">{m.limit}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </BandCard>
          <Note>{data.valuationNote}</Note>
        </Block>

        {/* Freshness: the timeline in one card, every dataset in one table */}
        <Block id="freshness" title={data.freshnessTitle} intro={data.freshnessIntro}>
          {/* The dates, drawn to scale. Labels sit in their own row so they never overlap. */}
          <BandCard title={timelineTitle}>
            <div className="px-5 pb-7 pt-2 sm:px-8">
              <div className="relative mx-4 mb-2 mt-12 h-8" aria-hidden="true">
                {pcts.slice(1).map((p, i) => {
                  const seg = SEG[i % SEG.length];
                  return (
                    <div key={i}>
                      <span
                        className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full ${seg.line}`}
                        style={{ left: `${pcts[i]}%`, width: `${p - pcts[i]}%` }}
                      />
                      {gaps[i] !== null && (
                        <span
                          className={`absolute bottom-full mb-1.5 -translate-x-1/2 whitespace-nowrap text-[14px] font-semibold tabular-nums ${seg.text}`}
                          style={{ left: `${(pcts[i] + p) / 2}%` }}
                        >
                          {gaps[i]} days
                        </span>
                      )}
                    </div>
                  );
                })}
                {data.timeline.map((t, i) => (
                  <span
                    key={t.label}
                    className={`absolute top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[14px] font-semibold tabular-nums ${
                      i === count - 1 ? "bg-primary text-white" : "border border-border bg-white text-ink"
                    }`}
                    style={{ left: `${pcts[i]}%` }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>

              <ol className={`mt-6 grid gap-5 sm:gap-6 ${timelineCols}`}>
                {data.timeline.map((t, i) => (
                  <li key={t.label} className="flex gap-3">
                    <span
                      className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold tabular-nums ${
                        i === count - 1 ? "bg-primary text-white" : "border border-border bg-white text-ink"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-serif text-[clamp(20px,2.2vw,24px)] font-medium leading-tight tracking-tight tabular-nums text-ink">
                        {t.date}
                      </div>
                      <div className="mt-1 text-[14px] leading-snug text-ink-muted">{t.label}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </BandCard>

          <BandCard
            className="mt-5"
            title="Every dataset"
            aside={
              <div className="flex flex-wrap gap-2">
                {counts.map(({ s, n }) => (
                  <span
                    key={s}
                    className={`inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-0.5 text-[13px] font-semibold ${STATUS[s].text}`}
                  >
                    <i className={`ti ${STATUS[s].icon}`} aria-hidden="true" />
                    {n} {s.toLowerCase()}
                  </span>
                ))}
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-sm">
                <caption className="sr-only">{data.freshnessTitle}</caption>
                <thead>
                  <tr className="text-left text-[13px] text-ink-muted">
                    <th scope="col" className="px-5 py-3 font-semibold sm:pl-7">Dataset</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Period</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Source date</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Updated</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-3 py-3 font-semibold sm:pr-7">Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.freshness.map((r) => (
                    <tr key={r.dataset} className="border-t border-border align-top leading-snug">
                      <th scope="row" className="px-5 py-3.5 text-left font-semibold text-ink sm:pl-7">{r.dataset}</th>
                      <td className="px-3 py-3.5 text-ink">{r.period}</td>
                      <td className="px-3 py-3.5 tabular-nums text-ink-muted">{r.sourceDate}</td>
                      <td className="px-3 py-3.5 tabular-nums text-ink-muted">{r.updated}</td>
                      <td className="px-3 py-3.5">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-3 py-3.5 text-ink-muted sm:pr-7">{r.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BandCard>
        </Block>

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}