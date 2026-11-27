import type { ReactNode } from "react";
import type { MoatEcosystemData } from "@/lib/company-next/types";
import SectionNote from "./SectionNote";

// Sections 16 + 18: Moat and ecosystem (category: Business).
// One question: what protects the company's customers, what could wear it down, and who does it rely on?
// Design A (Portfolio Lab look): a blue score card beside the weight tiles, a yellow "what could narrow it" notice,
// then one card per part. Each moat source and each group the company relies on is a row with a coloured block on the left
// (rating colour for sources, level colour for reliance). The loop is five numbered steps in one blue-band card.
// Look only: the data types, props, scoring and sorting are unchanged. `labels` stays in the data but is not shown.
// Company-neutral: the company name in "Gives ..." and "Gets from ..." comes from `data.reliance.companyName`.
// The number of moat sources is not fixed: the card title counts `data.sources`.
// Server Component. No client JS needed.

// The data types live in lib/company-next/types.ts. They are re-exported here so older imports keep working.
export type {
  Evidence,
  MoatSource,
  LoopStep,
  SwitchItem,
  RelianceRow,
  MoatEcosystemData,
} from "@/lib/company-next/types";

const LEVEL_NAME = { 1: "Low", 2: "Medium", 3: "High" } as const;

function ratingOf(score: number) {
  return score >= 8 ? "Strong" : score >= 5 ? "Moderate" : "Weak";
}

// Left block of a moat source row: a deeper green, gold or red, matched to the rating. White text sits on all three.
const RATING_HEAD = { Strong: "bg-[#157a3c]", Moderate: "bg-[#b7791f]", Weak: "bg-[#b42318]" } as const;

// The pale chip uses #f1f5fa: the old bg-surface is not a token in design-tokens.css.
const TREND = {
  stable: { label: "Stable", icon: "ti-arrow-narrow-right", cls: "bg-[#f1f5fa] text-ink-muted" },
  eroding: { label: "Slowly eroding", icon: "ti-trending-down", cls: "bg-warning-soft text-warning" },
  strengthening: { label: "Strengthening", icon: "ti-trending-up", cls: "bg-success-soft text-success" },
} as const;

// Weight tile colours by position, biggest weight first. The third colour is light, so its text is dark.
const WEIGHT_BG = ["bg-share-1", "bg-share-2", "bg-share-3", "bg-share-4", "bg-share-5"];
const WEIGHT_DARK_TEXT = [false, false, true, false, false];

// Reliance level: a word, three bars and a block colour, so the level never depends on colour alone.
const LEVEL_STYLE = {
  3: { block: "bg-danger text-white", bar: "bg-white", empty: "bg-white/35" },
  2: { block: "bg-[#facc15] text-[#3b2f00]", bar: "bg-[#3b2f00]", empty: "bg-black/15" },
  1: { block: "bg-success text-white", bar: "bg-white", empty: "bg-white/35" },
} as const;

function SubHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="mb-5">
      <h3 className="max-w-[780px] font-serif text-h3 font-medium tracking-title text-ink">{title}</h3>
      {intro && <p className="mt-1.5 max-w-[680px] text-[15px] leading-relaxed text-ink-muted">{intro}</p>}
    </div>
  );
}

/* Card with a blue header band and a white body. */
function BandCard({ title, aside, children }: { title: ReactNode; aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-primary px-5 py-3.5 text-white sm:px-7">
        <div className="font-serif text-xl font-medium leading-tight sm:text-[22px]">{title}</div>
        {aside}
      </div>
      {children}
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

export default function MoatEcosystem({ data }: { data: MoatEcosystemData }) {
  const sources = [...data.sources].sort((a, b) => b.score - a.score);
  const byWeight = [...data.sources].sort((a, b) => b.weight - a.weight);
  const totalWeight = sources.reduce((a, s) => a + s.weight, 0) || 1;
  const moatScore = sources.reduce((a, s) => a + s.score * s.weight, 0) / totalWeight;
  const moatWord = moatScore >= 8 ? "Wide" : moatScore >= 5 ? "Narrow" : "Weak";
  const rows = [...data.reliance.rows].sort((a, b) => b.level - a.level);
  const steps = data.loop.steps;
  const who = data.reliance.companyName ?? "the company";
  // The number in the card title follows the data, so a company with 4 or 6 sources is still described correctly.
  const sourcesTitle = `${sources.length} ${sources.length === 1 ? "source" : "sources"}, strongest first`;

  return (
    <section id="moat" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(30px,3.8vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">{data.title}</h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* Part 1: moat */}
        {sources.length > 0 && (
          <div className="pt-11">
            <SubHeading title={data.moatTitle} intro={data.moatIntro} />

            {/* score beside the weights */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <div className="flex flex-col justify-center rounded-[28px] bg-primary px-6 py-6 text-white sm:px-7">
                <div className="text-[15px] font-semibold">Moat score</div>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5">
                  <span className="font-serif text-[clamp(60px,8vw,84px)] font-semibold leading-none tracking-title tabular-nums">
                    {moatScore.toFixed(1)}
                  </span>
                  <span className="text-[17px] opacity-90">out of 10</span>
                </div>
                <div className="mt-3.5 self-start rounded-full bg-white px-4 py-1.5 text-[15px] font-semibold text-primary-ink">
                  {moatWord} moat
                </div>
              </div>

              <div className="min-w-0 rounded-[28px] border border-border bg-white px-5 py-5 sm:px-7">
                <div className="mb-3 text-sm text-ink-muted">How much each source counts toward the score</div>
                <div
                  className="flex h-[120px] gap-1.5"
                  role="img"
                  aria-label={`Weights: ${byWeight.map((s) => `${s.name} ${s.weight}%`).join(", ")}`}
                >
                  {byWeight.map((s, i) => (
                    <div
                      key={s.name}
                      className={`flex min-w-0 flex-col justify-between rounded-xl p-2.5 sm:p-3.5 ${WEIGHT_BG[i % WEIGHT_BG.length]} ${
                        WEIGHT_DARK_TEXT[i % WEIGHT_DARK_TEXT.length] ? "text-ink" : "text-white"
                      }`}
                      style={{ flex: `${Math.max(s.weight, 1)} 1 0` }}
                    >
                      <span className="break-words text-[12px] font-medium leading-tight sm:text-[14px]">{s.name}</span>
                      <span className="font-serif text-[clamp(18px,2.4vw,28px)] font-semibold leading-none tabular-nums">
                        {s.weight}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* what could narrow it: a yellow notice, yellow means caution */}
            <div className="mt-4 rounded-[18px] bg-warning-soft px-5 py-3.5 text-[15px] leading-normal text-ink">
              <p className="flex items-center gap-2 font-semibold text-warning">
                <i className="ti ti-alert-triangle" aria-hidden="true" />
                What could narrow it
              </p>
              <p className="mt-0.5">{data.narrowing}</p>
            </div>

            {/* sources, ranked by score: one card, one row each, left block coloured by rating */}
            <div className="mt-4">
              <BandCard
                title={sourcesTitle}
                aside={<span className="text-[13px] text-white/90">Left block = rating</span>}
              >
                <ol>
                  {sources.map((s) => {
                    const t = TREND[s.trend];
                    const rating = ratingOf(s.score);
                    return (
                      <li
                        key={s.name}
                        className="grid border-t border-border first:border-t-0 md:grid-cols-[150px_minmax(0,1fr)_300px]"
                      >
                        <div
                          className={`flex items-center gap-3 px-5 py-4 text-white md:flex-col md:justify-center md:gap-1.5 md:px-3 md:py-5 md:text-center ${RATING_HEAD[rating]}`}
                        >
                          <span className="font-serif text-[44px] font-semibold leading-none tabular-nums">
                            {s.score}
                            <span className="text-lg opacity-85"> / 10</span>
                          </span>
                          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">{rating}</span>
                        </div>

                        <div className="min-w-0 px-5 py-5 sm:px-7 md:py-6">
                          <h4 className="font-serif text-[22px] font-medium leading-tight text-ink">{s.name}</h4>
                          <p className="mt-1 text-[13px] text-ink-muted">{s.test}</p>
                          <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-ink">{s.answer}</p>
                          <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                            <span className="font-semibold text-ink">What could wear it down:</span> {s.wear}
                          </p>
                        </div>

                        <div className="flex flex-col justify-center gap-3 border-t border-border px-5 py-5 sm:px-6 md:border-l md:border-t-0">
                          <div>
                            <div className="font-serif text-[30px] font-medium leading-[1.1] tabular-nums text-ink">
                              {s.evidence.value}
                            </div>
                            <div className="mt-1 text-[13px] leading-snug text-ink-muted">{s.evidence.label}</div>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] ${t.cls}`}>
                              <i className={`ti ${t.icon}`} aria-hidden="true" />
                              {t.label}
                            </span>
                            <span className="tabular-nums text-ink-muted">Weight {s.weight}%</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </BandCard>
            </div>

            <p className="mt-4 max-w-[780px] text-[13px] leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">{data.notCounted.name}: </span>
              {data.notCounted.text}
            </p>
            <Note>{data.moatHowToRead}</Note>
          </div>
        )}

        {/* Part 2: the loop and what customers give up */}
        <div className="pt-12">
          <SubHeading title={data.loop.title} />
          <BandCard
            title={`${data.loop.center} · ${data.loop.centerSub}`}
            aside={<span className="text-[13px] text-white/90">{data.loop.intro}</span>}
          >
            {/* five steps: a numbered circle with a line running to the next step */}
            {steps.length > 0 && (
              <ol className="grid gap-x-4 gap-y-6 px-5 pb-2 pt-6 sm:grid-cols-2 sm:px-7 lg:grid-cols-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-semibold tabular-nums text-primary-ink">
                        {i + 1}
                      </span>
                      <span className="h-0.5 flex-1 bg-border" aria-hidden="true" />
                    </div>
                    <div className="mt-2.5 text-[15px] font-semibold leading-snug text-ink">{s.title}</div>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{s.text}</p>
                  </li>
                ))}
              </ol>
            )}
            <p className="px-5 pb-5 pt-4 text-[13px] text-ink-muted sm:px-7">{data.loop.note}</p>
          </BandCard>

          {data.switching && data.switching.items.length > 0 && (
            <div className="mt-4">
              <BandCard title={data.switching.title}>
                <div className="p-5 sm:px-7">
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {data.switching.items.map((it) => (
                      <li key={it.name} className="rounded-2xl bg-[#f1f5fa] p-4">
                        <span className="grid size-9 place-items-center rounded-lg bg-white text-primary-ink">
                          <i className={`ti ${it.icon} text-xl`} aria-hidden="true" />
                        </span>
                        <div className="mt-2.5 text-[15px] font-semibold text-ink">{it.name}</div>
                        <div className="mt-0.5 text-[13px] leading-snug text-ink-muted">{it.text}</div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-serif text-xl leading-snug tracking-tight text-ink">{data.switching.closing}</p>
                </div>
              </BandCard>
            </div>
          )}
        </div>

        {/* Part 3: who the company relies on: one card, left block coloured by level */}
        {rows.length > 0 && (
          <div className="pt-12">
            <SubHeading title={data.reliance.title} intro={data.reliance.intro} />
            <BandCard title={`${rows.length} groups, most to least reliance`}>
              <ul>
                {rows.map((r) => {
                  const s = LEVEL_STYLE[r.level];
                  return (
                    <li
                      key={r.group}
                      className="grid border-t border-border first:border-t-0 md:grid-cols-[150px_minmax(0,1.1fr)_minmax(0,1fr)]"
                    >
                      <div
                        className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 md:flex-col md:justify-center md:gap-2 md:px-3 md:py-5 md:text-center ${s.block}`}
                      >
                        <h4 className="font-serif text-[22px] font-medium leading-tight">{r.group}</h4>
                        <span className="text-[13px] font-semibold">
                          <span className="sr-only">Reliance: </span>
                          Reliance: {LEVEL_NAME[r.level]}
                        </span>
                        <span className="flex gap-[3px]" aria-hidden="true">
                          {[1, 2, 3].map((i) => (
                            <span key={i} className={`h-1.5 w-6 rounded-full ${i <= r.level ? s.bar : s.empty}`} />
                          ))}
                        </span>
                      </div>

                      <div className="min-w-0 px-5 py-5 sm:px-7">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[15px] leading-snug text-ink">{r.who}</p>
                          {r.rival && (
                            <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-ink-muted">
                              Also a rival
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{r.note}</p>
                      </div>

                      <dl className="grid content-center gap-3 border-t border-border px-5 py-5 sm:px-6 md:border-l md:border-t-0">
                        <div>
                          <dt className="text-[12.5px] text-ink-muted">Gives {who}</dt>
                          <dd className="mt-0.5 text-sm leading-snug text-ink">{r.gives}</dd>
                        </div>
                        <div>
                          <dt className="text-[12.5px] text-ink-muted">Gets from {who}</dt>
                          <dd className="mt-0.5 text-sm leading-snug text-ink">{r.gets}</dd>
                        </div>
                      </dl>
                    </li>
                  );
                })}
              </ul>
            </BandCard>
            <Note>{data.reliance.howToRead}</Note>
          </div>
        )}

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}