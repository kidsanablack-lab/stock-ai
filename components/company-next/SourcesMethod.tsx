import { type ReactNode } from "react";

// Section 20: Sources and method (page footer, outside the tabs).
// One question: where does each number come from, how is it calculated, and how far can it be trusted?
// Company-neutral: no industry wording is guessed in this file. A source topic comes from the data when it is given,
// and otherwise from a short list of general topics that fit every company.
// Server Component. No client JS needed.

export type TraceData = {
  metric: string;
  value: string;
  // Exactly 5 steps: source, reported figures, formula, result, where it is used
  steps: [string, string, string, string, string];
};

export type DataStatus = "Verified" | "Pending" | "Unavailable";

export type SourcesMethodData = {
  title: string;
  lead: string;
  labels: string[]; // shown once at section level
  traceTitle: string;
  traceIntro: string;
  traces: TraceData[];
  sourcesTitle: string;
  sourcesIntro: string;
  sources: {
    title: string;
    text: string;
    topic?: string; // what this source feeds, e.g. "Outlook and guidance"
  }[];
  documents: {
    name: string;
    date: string;
    type: string;
    use: string;
    source?: string; // title of the source it belongs to; found from the type when left out
  }[];
  formulasTitle: string;
  formulasIntro: string;
  formulas: { name: string; formula: string; note: string }[];
  formulasNote: string;
  scoringTitle: string;
  scoringIntro: string;
  categories: {
    name: string;
    weight: number; // percent of the overall score
    coverage: number; // percent of inputs available
    score?: number; // 0 to 10, this company's category score
    inputs: {
      name: string;
      weight: number;
      analyst?: boolean;
      value?: string; // this company's figure for the input
      score?: number; // 0 to 10
    }[];
    rule: string;
    missing: string;
  }[];
  scoringNote: string;
  valuationTitle: string;
  valuationIntro: string;
  methods: { name: string; what: string; limit: string }[];
  valuationNote: string;
  freshnessTitle: string;
  freshnessIntro: string;
  timeline: { date: string; label: string }[]; // 3 items: period end, source date, last update
  freshness: {
    dataset: string;
    period: string;
    sourceDate: string;
    updated: string;
    status: DataStatus;
    limit: string;
  }[];
  source: string;
};

const STEP_LABELS = ["Source", "Reported figures", "Scope formula", "Result", "Used in"];

const CARD_SHADOW = "shadow-[0_8px_30px_rgba(20,30,70,0.05)]";

// Each status has an icon and a word, so meaning never depends on color alone.
const STATUS: Record<DataStatus, { cls: string; icon: string }> = {
  Verified: { cls: "bg-success-soft text-success", icon: "ti-circle-check" },
  Pending: { cls: "bg-warning-soft text-warning", icon: "ti-clock" },
  Unavailable: { cls: "bg-surface text-ink-muted", icon: "ti-minus" },
};

// Category colors are fixed by position so the weight tiles and the cards below match.
// The third color is light, so its label is dark.
const CAT_BG = ["bg-share-1", "bg-share-2", "bg-share-3", "bg-share-4", "bg-share-5", "bg-primary"];
const CAT_DARK_TEXT = [false, false, true, false, false, false];

// Score level, from the Scope Score labels.
const level = (s: number) => (s >= 9 ? "Excellent" : s >= 7.5 ? "Strong" : s >= 6 ? "Good" : s >= 5 ? "Fair" : "Weak");
const tone = (s: number) =>
  s >= 7.5
    ? { seg: "bg-success", pill: "bg-success-soft text-success", top: "border-t-success" }
    : s >= 5
      ? { seg: "bg-warning", pill: "bg-warning-soft text-warning", top: "border-t-warning" }
      : { seg: "bg-danger", pill: "bg-danger-soft text-danger", top: "border-t-danger" };

// Source rows: one color per source, in the order the sources are listed.
const SRC_STYLE = [
  { card: "bg-primary-soft", title: "text-primary-ink", dot: "bg-primary", chip: "bg-primary-soft text-primary-ink" },
  { card: "bg-[#e2f1ef]", title: "text-[#2a6d68]", dot: "bg-[#3f8a84]", chip: "bg-[#d6ece8] text-[#2a6d68]" },
  { card: "bg-share-2/10", title: "text-share-2", dot: "bg-share-2", chip: "bg-share-2/15 text-share-2" },
  { card: "bg-warning-soft", title: "text-warning", dot: "bg-warning", chip: "bg-warning-soft text-warning" },
];

// A document is matched to its source by an explicit `source`, else by its type.
// Each pair is: a pattern for the document type, and a pattern for the source title.
const DOC_TO_SOURCE: [RegExp, RegExp][] = [
  [/^(10-K|10-Q|8-K)$/i, /sec/i],
  [/transcript/i, /investor relations/i],
  [/data feed|estimates/i, /market data/i],
  [/idc|industry|press/i, /industry|news/i],
];

// Used only when a source has no `topic` in the data. These topics fit every company.
// A source that matches none of them gets a general topic instead of a guess about the industry.
const DEFAULT_TOPIC: [RegExp, string][] = [
  [/sec/i, "Reported financials"],
  [/investor relations/i, "Outlook and guidance"],
  [/market data/i, "Share price, market cap, estimates and price targets"],
  [/industry|news/i, "Industry and news context"],
];
const FALLBACK_TOPIC = "Additional context";

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
      <h3 className="max-w-[760px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[680px] text-[15px] leading-relaxed text-ink-muted">{intro}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-[760px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
      {children}
    </p>
  );
}

function FormulaCard({ f }: { f: { name: string; formula: string; note: string } }) {
  return (
    <li className="rounded-2xl border border-border bg-white p-4">
      <div className="text-[15px] font-semibold text-ink">{f.name}</div>
      <code className="mt-2.5 block rounded-lg bg-surface px-3 py-2 font-sans text-sm font-medium leading-snug text-ink">
        {f.formula}
      </code>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{f.note}</p>
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

  // Data sources: each source with the documents that come from it.
  const sourceIndexOf = (d: SourcesMethodData["documents"][number]) => {
    if (d.source) return data.sources.findIndex((s) => s.title === d.source);
    for (const [typeRe, sourceRe] of DOC_TO_SOURCE) {
      if (typeRe.test(d.type)) return data.sources.findIndex((s) => sourceRe.test(s.title));
    }
    return -1;
  };
  const docIndex = data.documents.map(sourceIndexOf);
  const sourceRows = data.sources.map((s, i) => ({
    title: s.title,
    text: s.text,
    topic: s.topic ?? DEFAULT_TOPIC.find(([re]) => re.test(s.title))?.[1] ?? FALLBACK_TOPIC,
    style: SRC_STYLE[i % SRC_STYLE.length],
    docs: data.documents.filter((_, k) => docIndex[k] === i),
  }));
  const otherDocs = data.documents.filter((_, k) => docIndex[k] === -1);

  // Timeline drawn to scale. Falls back to even spacing if a date cannot be read.
  const times = data.timeline.map((t) => Date.parse(t.date));
  const count = data.timeline.length;
  const toScale = count > 1 && times.every((n) => !Number.isNaN(n)) && times[count - 1] > times[0];
  const pcts = data.timeline.map((_, i) =>
    toScale ? ((times[i] - times[0]) / (times[count - 1] - times[0])) * 100 : count > 1 ? (i * 100) / (count - 1) : 0,
  );
  const gaps = pcts.slice(1).map((_, i) => (toScale ? Math.round((times[i + 1] - times[i]) / 86400000) : null));

  // Freshness: first three datasets as cards, the rest folded into one card.
  const featured = data.freshness.slice(0, 3);
  const rest = data.freshness.slice(3);
  const restSummary = (["Verified", "Pending", "Unavailable"] as DataStatus[])
    .map((s) => ({ s, n: rest.filter((r) => r.status === s).length }))
    .filter((x) => x.n > 0)
    .map((x) => `${x.n} ${x.s.toLowerCase()}`)
    .join(", ");

  return (
    <section id="sources" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
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

        {/* Trace a number: a vertical path on mobile, a horizontal path on desktop. */}
        <Block id="trace" title={data.traceTitle} intro={data.traceIntro}>
          <div className="grid gap-4">
            {data.traces.map((t) => (
              <article key={t.metric} className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b border-border px-5 pb-4 pt-5 sm:px-6">
                  <h4 className="text-base font-semibold text-ink">{t.metric}</h4>
                  <span className="font-serif text-[36px] font-medium leading-none tracking-tight tabular-nums text-ink sm:text-[44px]">
                    {t.value}
                  </span>
                </div>

                <ol className="grid gap-0 px-5 py-5 sm:px-6 lg:grid-cols-5 lg:gap-4">
                  {t.steps.map((s, i) => {
                    const result = i === 3;
                    const last = i === t.steps.length - 1;
                    return (
                      <li key={i} className="relative flex gap-4 pb-5 last:pb-0 lg:block lg:pb-0">
                        {/* connector */}
                        {!last && (
                          <span
                            aria-hidden="true"
                            className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-border lg:left-9 lg:top-[15px] lg:h-px lg:w-[calc(100%-1.5rem)]"
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

        {/* Data sources: what it feeds  ←  where it comes from  ←  the documents */}
        <Block id="data-sources" title={data.sourcesTitle} intro={data.sourcesIntro}>
          <ul className="border-b border-border">
            {[
              ...sourceRows,
              ...(otherDocs.length > 0
                ? [
                    {
                      title: "Other documents",
                      text: "",
                      topic: FALLBACK_TOPIC,
                      style: { card: "bg-surface", title: "text-ink", dot: "bg-ink-muted", chip: "bg-surface text-ink-muted" },
                      docs: otherDocs,
                    },
                  ]
                : []),
            ].map((row) => (
              <li
                key={row.title}
                className="grid items-center gap-4 border-t border-border py-6 lg:grid-cols-[minmax(0,0.85fr)_28px_minmax(0,1.25fr)_28px_minmax(0,1.5fr)] lg:gap-x-4"
              >
                <h4 className="font-serif text-[clamp(20px,2.2vw,26px)] font-normal leading-tight tracking-[-0.01em] text-ink">
                  {row.topic}
                </h4>
                <span aria-hidden="true" className="hidden text-center text-2xl leading-none text-ink-muted/60 lg:block">
                  ←
                </span>
                <div className={`rounded-3xl border border-border p-5 ${row.style.card}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`size-3.5 shrink-0 rounded-full ${row.style.dot}`} aria-hidden="true" />
                    <span className={`text-[18px] font-semibold leading-tight ${row.style.title}`}>{row.title}</span>
                  </div>
                  {row.text && <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{row.text}</p>}
                </div>
                <span aria-hidden="true" className="hidden text-center text-2xl leading-none text-ink-muted/60 lg:block">
                  ←
                </span>
                <ul className="grid gap-4">
                  {row.docs.length === 0 && <li className="text-sm text-ink-muted">No documents listed.</li>}
                  {row.docs.map((d) => (
                    <li key={d.name}>
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[16px] font-semibold text-ink">{d.name}</span>
                          <span className={`rounded-lg px-2.5 py-0.5 text-[13px] font-semibold ${row.style.chip}`}>
                            {d.type}
                          </span>
                        </div>
                        <span className="text-[14px] tabular-nums text-ink-muted">{d.date}</span>
                      </div>
                      <p className="mt-1 text-[15px] leading-snug text-ink-muted">{d.use}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Block>

        {/* Formulas */}
        <Block id="formulas" title={data.formulasTitle} intro={data.formulasIntro}>
          <ul className="grid gap-3 md:grid-cols-3">
            {data.formulas.slice(0, 3).map((f) => (
              <FormulaCard key={f.name} f={f} />
            ))}
          </ul>
          {data.formulas.length > 3 && (
            <details className="group mt-3 rounded-2xl border-2 border-dashed border-border bg-white p-4 sm:p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="text-[15px] text-ink-muted">
                  {data.formulas.length - 3} more formula{data.formulas.length - 3 === 1 ? "" : "s"}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-primary-ink">
                  <span className="group-open:hidden">Show all</span>
                  <span className="hidden group-open:inline">Hide</span>
                  <i className="ti ti-chevron-down transition-transform group-open:rotate-180" aria-hidden="true" />
                </span>
              </summary>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {data.formulas.slice(3).map((f) => (
                  <FormulaCard key={f.name} f={f} />
                ))}
              </ul>
            </details>
          )}
          <Note>{data.formulasNote}</Note>
        </Block>

        {/* Scoring */}
        <div id="scoring" className="scroll-mt-24 pt-12">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <h3 className="font-serif text-[clamp(28px,3.4vw,40px)] font-normal leading-[1.1] tracking-[-0.02em] text-ink">
                {data.scoringTitle}
              </h3>
              <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-ink-muted">{data.scoringIntro}</p>
              {overall !== null && (
                <div className="mt-5 inline-flex flex-wrap items-baseline gap-x-3 rounded-2xl bg-primary-soft px-5 py-3">
                  <span className="text-[15px] font-medium text-primary-ink">Overall score</span>
                  <span className="font-serif text-[clamp(44px,5vw,60px)] font-medium leading-none tracking-tight tabular-nums text-primary-ink">
                    {overall.toFixed(1)}
                  </span>
                  <span className="text-[15px] text-primary-ink">out of 10</span>
                </div>
              )}
            </div>

            <div className="min-w-0">
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
                        <span className="font-serif text-[clamp(20px,2.6vw,30px)] font-semibold leading-none tabular-nums">
                          {c.weight}%
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className={`mt-2.5 text-[13px] ${weightsOk ? "text-ink-muted" : "font-semibold text-danger"}`}>
                {weightsOk
                  ? `Weights add up to ${totalWeight}%. Each card below uses the same color.`
                  : `Check the weights: they add up to ${totalWeight}%, not 100%.`}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4">
            {data.categories.map((c, i) => {
              const t = c.score !== undefined ? tone(c.score) : null;
              const partial = c.coverage < 90;
              return (
                <li key={c.name} className={`overflow-hidden rounded-3xl border border-border bg-white ${CARD_SHADOW}`}>
                  {/* Header: filled with the category color from the weight tiles, compact, content centered */}
                  <div
                    className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-3 text-center sm:px-8 sm:py-3.5 ${
                      CAT_BG[i % CAT_BG.length]
                    } ${CAT_DARK_TEXT[i % CAT_DARK_TEXT.length] ? "text-ink" : "text-white"}`}
                  >
                    <h4 className="font-serif text-[clamp(18px,2vw,22px)] font-bold leading-tight tracking-tight">
                      {c.name}
                    </h4>
                    {c.score !== undefined && t && (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif text-[30px] font-bold leading-none tabular-nums">
                            {c.score.toFixed(1)}
                          </span>
                          <span className="text-[13px] opacity-80">/ 10</span>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-[13px] font-semibold text-ink">
                          {level(c.score)}
                        </span>
                      </>
                    )}
                    <span className="text-[13px] font-medium tabular-nums opacity-90">Weight {c.weight}%</span>
                  </div>

                  {/* Body: this company's figures, and how data becomes a score */}
                  <div className="grid md:grid-cols-2">
                    <div className="p-6 sm:p-8">
                      <div className="text-[15px] text-ink-muted">Inputs, weights and this company’s figure</div>
                      <ul className="mt-4 grid gap-3">
                        {c.inputs.map((inp) => (
                          <li key={inp.name} className="rounded-2xl bg-surface px-4 py-3.5">
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
                              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                                <span className="font-serif text-[24px] font-medium leading-none tabular-nums text-ink">
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
                              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white">
                                <div
                                  className={`h-full rounded-full ${CAT_BG[i % CAT_BG.length]}`}
                                  style={{ width: `${Math.min(100, Math.max(0, inp.score * 10))}%` }}
                                />
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 sm:p-8 md:border-l md:border-l-border">
                      <div className="text-[15px] font-semibold text-ink-muted">How data becomes a score</div>
                      <p className="mt-2 text-[16px] leading-relaxed text-ink">{c.rule}</p>
                      <div className="mt-5 text-[15px] font-semibold text-ink-muted">If data is missing</div>
                      <p className="mt-2 text-[16px] leading-relaxed text-ink">{c.missing}</p>
                      <span
                        className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold ${
                          partial ? "bg-warning-soft text-warning" : "bg-success-soft text-success"
                        }`}
                      >
                        <i className={`ti ${partial ? "ti-alert-triangle" : "ti-circle-check"}`} aria-hidden="true" />
                        {partial ? "Partial" : "Full"} data coverage · {c.coverage}%
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Note>{data.scoringNote}</Note>
        </div>

        {/* Valuation */}
        <Block id="fair-value" title={data.valuationTitle} intro={data.valuationIntro}>
          <ul className="grid gap-3 md:grid-cols-3">
            {data.methods.map((m) => (
              <li key={m.name} className="flex flex-col rounded-2xl border border-border bg-white p-5">
                <div className="font-serif text-xl leading-tight tracking-tight text-ink">{m.name}</div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink">{m.what}</p>
                <div className="mt-auto pt-4">
                  <div className="rounded-xl bg-warning-soft px-3.5 py-2.5 text-[13px] leading-snug text-ink">
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
          <Note>{data.valuationNote}</Note>
        </Block>

        {/* Freshness */}
        <Block id="freshness" title={data.freshnessTitle} intro={data.freshnessIntro}>
          {/* Three dates, drawn to scale. Labels sit in their own row so they never overlap. */}
          <div className={`rounded-3xl bg-white p-5 sm:p-8 ${CARD_SHADOW}`}>
            <div className="text-[15px] font-semibold text-ink-muted">
              {toScale ? "Three dates, drawn to scale" : "Three dates"}
            </div>

            <div className="relative mx-4 mb-2 mt-10 h-8" aria-hidden="true">
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

            <ol className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-6">
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
                    <div className="font-serif text-[clamp(20px,2.2vw,26px)] font-medium leading-tight tracking-tight tabular-nums text-ink">
                      {t.date}
                    </div>
                    <div className="mt-1 text-[14px] leading-snug text-ink-muted">{t.label}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {counts.map(({ s, n }) => (
              <span
                key={s}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold ${STATUS[s].cls}`}
              >
                <i className={`ti ${STATUS[s].icon}`} aria-hidden="true" />
                {n} {s.toLowerCase()}
              </span>
            ))}
          </div>

          {/* One card per dataset; the rest open from the dashed card */}
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {featured.map((r) => (
              <article key={r.dataset} className="flex flex-col rounded-3xl border border-border bg-white p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-serif text-[clamp(22px,2.4vw,28px)] font-medium leading-tight tracking-[-0.01em] text-ink">
                    {r.dataset}
                  </h4>
                  <StatusPill status={r.status} />
                </div>
                <div className="mt-4">
                  <div className="text-[15px] text-ink-muted">Reporting period</div>
                  <div className="text-[17px] font-semibold text-ink">{r.period}</div>
                  <div className="mt-1 text-[13px] tabular-nums text-ink-muted">
                    Source {r.sourceDate} · Updated {r.updated}
                  </div>
                </div>
                <p className="mt-4 border-t border-border pt-4 text-[15px] leading-relaxed text-ink">{r.limit}</p>
              </article>
            ))}

            {rest.length > 0 && (
              <details className="group grid content-center rounded-3xl border-2 border-dashed border-border bg-surface/50 p-6 open:bg-white sm:p-7 md:open:col-span-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-[17px] leading-relaxed text-ink-muted">
                    {rest.length} more dataset{rest.length === 1 ? "" : "s"}: {restSummary}.
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-primary-ink">
                    <span className="group-open:hidden">Show all</span>
                    <span className="hidden group-open:inline">Hide</span>
                    <i className="ti ti-chevron-down transition-transform group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <ul className="mt-5 divide-y divide-border">
                  {rest.map((r) => (
                    <li key={r.dataset} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-serif text-xl font-medium leading-tight text-ink">{r.dataset}</span>
                        <StatusPill status={r.status} />
                      </div>
                      <div className="mt-1.5 text-[13px] tabular-nums text-ink-muted">
                        Period {r.period} · Source {r.sourceDate} · Updated {r.updated}
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink">{r.limit}</p>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </Block>

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}