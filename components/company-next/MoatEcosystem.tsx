// Sections 16 + 18: Moat and ecosystem (category: Business).
// One question: what protects Apple's customers, what could wear it down, and who does Apple rely on?
// Server Component. No client JS needed.

export type Evidence = { value: string; label: string };

export type MoatSource = {
  name: string;
  score: number; // 0 to 10
  weight: number; // percent, all weights add up to 100
  test: string; // the question that tests this source
  answer: string; // the short answer, with the proof
  evidence: Evidence;
  wear: string; // what could wear it down
  trend: "stable" | "eroding" | "strengthening";
};

export type LoopStep = { title: string; text: string };
export type SwitchItem = { icon: string; name: string; text: string };

export type RelianceRow = {
  group: string;
  /** Tabler icon name, e.g. "ti-users". Optional: a default is chosen from the group name. */
  icon?: string;
  level: 1 | 2 | 3; // 1 Low, 2 Medium, 3 High
  who: string;
  gives: string;
  gets: string;
  note: string;
  rival?: boolean;
};

export type MoatEcosystemData = {
  title: string;
  lead: string;
  labels: string[]; // shown once at section level
  moatTitle: string;
  moatIntro: string;
  sources: MoatSource[];
  notCounted: { name: string; text: string };
  narrowing: string;
  moatHowToRead: string;
  loop: {
    title: string;
    intro: string;
    steps: LoopStep[]; // 5 steps
    center: string;
    centerSub: string;
    note: string;
  };
  switching: { title: string; items: SwitchItem[]; closing: string };
  reliance: {
    title: string;
    intro: string;
    rows: RelianceRow[];
    howToRead: string;
  };
  source: string;
};

const LEVEL_NAME = { 1: "Low", 2: "Medium", 3: "High" } as const;

function ratingOf(score: number) {
  return score >= 8 ? "Strong" : score >= 5 ? "Moderate" : "Weak";
}

// Strength of a moat source: a word and a color, never color alone.
// Card header fill: a deeper green, gold or red, matched to the rating. White text sits on all three.
const RATING_HEAD = { Strong: "bg-[#157a3c]", Moderate: "bg-[#b7791f]", Weak: "bg-[#b42318]" } as const;
const RATING_CHIP = {
  Strong: "bg-success-soft text-success",
  Moderate: "bg-warning-soft text-warning",
  Weak: "bg-danger-soft text-danger",
} as const;

const TREND = {
  stable: { label: "Stable", icon: "ti-arrow-narrow-right", cls: "bg-surface text-ink-muted" },
  eroding: { label: "Slowly eroding", icon: "ti-trending-down", cls: "bg-warning-soft text-warning" },
  strengthening: { label: "Strengthening", icon: "ti-trending-up", cls: "bg-success-soft text-success" },
} as const;

// Weight-map colors by position. The third color is light, so its label is dark.
const WEIGHT_BG = ["bg-share-1", "bg-share-2", "bg-share-3", "bg-share-4", "bg-share-5"];
const WEIGHT_DARK_TEXT = [false, false, true, false, false];

// Default icon per group, used when the data does not give one.
const RELIANCE_ICON: Record<string, string> = {
  suppliers: "ti-building-factory-2",
  partners: "ti-heart-handshake",
  distributors: "ti-truck-delivery",
  competitors: "ti-swords",
  developers: "ti-code",
  customers: "ti-users",
};

function SubHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-5">
      <h3 className="max-w-[780px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[680px] text-[15px] leading-relaxed text-ink-muted">{intro}</p>
    </div>
  );
}

// Each level has a word, a number of bars and a color, so the rating never depends on color alone.
// High is red, Medium is a clean yellow with white bars, Low is green.
// The chip is a solid color; icon tile and card border are soft tints of it.
const LEVEL_STYLE = {
  3: {
    chip: "bg-danger text-white",
    bar: "bg-white",
    empty: "bg-white/35",
    icon: "bg-danger-soft text-danger",
    ring: "border-2 border-danger",
  },
  2: {
    chip: "bg-[#facc15] text-[#3b2f00]",
    bar: "bg-white",
    empty: "bg-white/50",
    icon: "bg-[#fef9c3] text-[#a16207]",
    ring: "border border-[#f3dc7a]",
  },
  1: {
    chip: "bg-[#129a48] text-white",
    bar: "bg-white",
    empty: "bg-white/35",
    icon: "bg-[#e3f5ea] text-[#129a48]",
    ring: "border border-[#b6e2c6]",
  },
} as const;

function LevelMeter({ level }: { level: 1 | 2 | 3 }) {
  const st = LEVEL_STYLE[level];
  return (
    <span className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 ${st.chip}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-1.5 w-4 rounded-full ${i <= level ? st.bar : st.empty}`} />
        ))}
      </span>
      <span className="text-[13px] font-semibold">
        <span className="sr-only">Reliance: </span>
        {LEVEL_NAME[level]}
      </span>
    </span>
  );
}

// Weights as a treemap: box size = weight. Two boxes on top, the rest below.
function WeightMap({ sources }: { sources: MoatSource[] }) {
  const ordered = [...sources].sort((a, b) => b.weight - a.weight);
  const rows = ordered.length > 2 ? [ordered.slice(0, 2), ordered.slice(2)] : [ordered];

  return (
    <div
      className="flex h-full min-h-[230px] flex-col gap-1.5"
      role="img"
      aria-label={`Weights: ${ordered.map((s) => `${s.name} ${s.weight}%`).join(", ")}`}
    >
      {rows.map((row, ri) => {
        const rowSum = row.reduce((a, s) => a + s.weight, 0);
        return (
          <div key={ri} className="flex min-h-0 gap-1.5" style={{ flex: `${Math.max(rowSum, 1)} 1 0` }}>
            {row.map((s) => {
              const i = ordered.indexOf(s);
              const dark = WEIGHT_DARK_TEXT[i % WEIGHT_DARK_TEXT.length];
              return (
                <div
                  key={s.name}
                  className={`flex min-w-0 flex-col justify-between rounded-2xl p-3 sm:p-4 ${
                    WEIGHT_BG[i % WEIGHT_BG.length]
                  } ${dark ? "text-ink" : "text-white"}`}
                  style={{ flex: `${Math.max(s.weight, 1)} 1 0` }}
                  title={`${s.name}: ${s.weight}%`}
                >
                  <span className="text-sm font-semibold leading-tight">{s.name}</span>
                  <div>
                    <div className="font-serif text-[clamp(22px,2.6vw,32px)] font-semibold leading-none tabular-nums">
                      {s.weight}%
                    </div>
                    <div className="mt-1 text-[11px] font-medium leading-tight opacity-90">
                      {s.score} / 10 · {ratingOf(s.score)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// The five steps as cards in a row, with a dotted line that leads back from the last to the first.
function LoopFlow({ loop }: { loop: MoatEcosystemData["loop"] }) {
  const n = loop.steps.length;
  if (n === 0) return null;
  // Card centers sit at (100% − all gaps) / (2n) from each edge. The gap is 1.5rem.
  const edge = `calc((100% - ${(n - 1) * 1.5}rem) / ${n * 2})`;

  return (
    <div>
      <ol className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {loop.steps.map((s, i) => (
          <li
            key={s.title}
            className="relative rounded-3xl border border-border bg-surface p-5"
          >
            <span className="grid size-11 place-items-center rounded-full bg-primary text-lg font-semibold tabular-nums text-white">
              {i + 1}
            </span>
            <div className="mt-4 text-lg font-semibold leading-tight text-ink">{s.title}</div>
            <div className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.text}</div>
            {i < n - 1 && (
              <span
                className="absolute -right-[26px] top-[26%] z-10 hidden size-7 place-items-center rounded-full border border-border bg-white text-primary lg:grid"
                aria-hidden="true"
              >
                <i className="ti ti-chevron-right text-base" />
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* return path (wide screens only) */}
      <div className="relative mt-3 hidden h-[84px] lg:block" aria-hidden="true">
        <i
          className="ti ti-arrow-up absolute top-0 -translate-x-1/2 text-2xl text-primary"
          style={{ left: edge }}
        />
        <span
          className="absolute bottom-[22px] top-[18px] rounded-bl-3xl border-b-2 border-l-2 border-dotted border-primary"
          style={{ left: edge, right: "50%" }}
        />
        <span
          className="absolute bottom-[22px] top-0 rounded-br-3xl border-b-2 border-r-2 border-dotted border-primary"
          style={{ right: edge, left: "50%" }}
        />
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-baseline gap-3 whitespace-nowrap rounded-full border border-border bg-white px-6 py-2.5">
          <span className="font-serif text-2xl font-semibold text-ink">{loop.center}</span>
          <span className="text-sm text-ink-muted">{loop.centerSub}</span>
        </div>
      </div>

      {/* on small screens the pill sits under the cards */}
      <div className="mt-4 flex justify-center lg:hidden">
        <div className="flex items-baseline gap-3 rounded-full border border-border bg-white px-5 py-2">
          <span className="font-serif text-xl font-semibold text-ink">{loop.center}</span>
          <span className="text-sm text-ink-muted">{loop.centerSub}</span>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-ink-muted">{loop.note}</p>
    </div>
  );
}

export default function MoatEcosystem({ data }: { data: MoatEcosystemData }) {
  const sources = [...data.sources].sort((a, b) => b.score - a.score);
  const totalWeight = sources.reduce((a, s) => a + s.weight, 0) || 1;
  const moatScore = sources.reduce((a, s) => a + s.score * s.weight, 0) / totalWeight;
  const moatWord = moatScore >= 8 ? "Wide" : moatScore >= 5 ? "Narrow" : "Weak";
  const rows = [...data.reliance.rows].sort((a, b) => b.level - a.level);

  return (
    <section id="moat" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#0b1220]">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* Part 1: moat */}
        {sources.length > 0 && (
          <div className="pt-10">
            <SubHeading title={data.moatTitle} intro={data.moatIntro} />

            {/* score beside the weights */}
            <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="flex flex-col justify-between gap-6 rounded-[28px] bg-primary p-5 text-white sm:p-6">
                <div className="text-sm opacity-90">Moat score</div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[clamp(56px,7vw,68px)] font-medium leading-none tracking-tight tabular-nums">
                      {moatScore.toFixed(1)}
                    </span>
                    <span className="text-xl opacity-80">/ 10</span>
                  </div>
                  <div className="mt-3 inline-block rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-primary-ink">
                    {moatWord} moat
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-col rounded-[28px] border border-border bg-white p-5 sm:p-6">
                <div className="mb-3 text-sm text-ink-muted">
                  How much each source counts toward the score (box size = weight)
                </div>
                <div className="flex-1">
                  <WeightMap sources={data.sources} />
                </div>
              </div>
            </div>

            {/* what could narrow it, below */}
            <div className="mt-4 rounded-[28px] border border-border bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-warning">
                <i className="ti ti-alert-triangle" aria-hidden="true" />
                What could narrow it
              </div>
              <p className="mt-2 max-w-[900px] text-base leading-relaxed text-ink">{data.narrowing}</p>
            </div>

            {/* sources, ranked by score */}
            <ol className="mt-4 grid gap-3">
              {sources.map((s) => {
                const t = TREND[s.trend];
                const rating = ratingOf(s.score);
                return (
                  <li key={s.name} className="overflow-hidden rounded-[28px] border border-border bg-white">
                    {/* header: filled with the rating color, content centered */}
                    <div
                      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 py-5 text-center text-white sm:px-7 ${RATING_HEAD[rating]}`}
                    >
                      <h4 className="font-serif text-[clamp(22px,2.6vw,28px)] font-bold leading-tight tracking-tight">
                        {s.name}
                      </h4>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-[44px] font-bold leading-none tabular-nums">{s.score}</span>
                        <span className="text-sm font-medium opacity-80">/ 10</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink">{rating}</span>
                        <span className="text-sm font-medium tabular-nums opacity-90">Weight {s.weight}%</span>
                      </div>
                    </div>

                    {/* body: the test and the proof, and what could wear it down */}
                    <div className="grid md:grid-cols-2">
                      <div className="min-w-0 p-5 sm:p-7">
                        <p className="text-sm text-ink-muted">{s.test}</p>
                        <p className="mt-2 text-[17px] font-semibold leading-snug text-ink">{s.answer}</p>
                        <div className="mt-4 flex items-center gap-4 rounded-2xl bg-surface px-5 py-3.5">
                          <span className="font-serif text-[30px] font-semibold leading-none tabular-nums text-ink">
                            {s.evidence.value}
                          </span>
                          <span className="text-sm leading-snug text-ink-muted">{s.evidence.label}</span>
                        </div>
                      </div>

                      <div className="min-w-0 p-5 sm:p-7 md:border-l md:border-l-border">
                        <p className="text-sm font-semibold text-ink-muted">What could wear it down</p>
                        <p className="mt-2 text-base leading-relaxed text-ink">{s.wear}</p>
                        <p
                          className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${t.cls}`}
                        >
                          <i className={`ti ${t.icon}`} aria-hidden="true" />
                          {t.label}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 max-w-[780px] text-sm leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">{data.notCounted.name}: </span>
              {data.notCounted.text}
            </p>
            <p className="mt-3 max-w-[780px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
              {data.moatHowToRead}
            </p>
          </div>
        )}

        {/* Part 2: the loop and what customers give up */}
        <div className="pt-12">
          <SubHeading title={data.loop.title} intro={data.loop.intro} />
          <div className="rounded-[28px] border border-border bg-white p-5 sm:p-7">
            <LoopFlow loop={data.loop} />
          </div>

          {data.switching.items.length > 0 && (
            <div className="mt-4 rounded-[28px] border border-border bg-white p-5 sm:p-6">
              <h4 className="font-serif text-[22px] font-normal leading-tight tracking-tight text-ink">
                {data.switching.title}
              </h4>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {data.switching.items.map((it) => (
                  <li key={it.name} className="rounded-2xl bg-surface p-4">
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
          )}
        </div>

        {/* Part 3: who Apple relies on, one horizontal row per group */}
        {rows.length > 0 && (
          <div className="pt-12">
            <SubHeading title={data.reliance.title} intro={data.reliance.intro} />
            <ul className="grid gap-3">
              {rows.map((r) => {
                const icon = r.icon ?? RELIANCE_ICON[r.group.toLowerCase()] ?? "ti-building";
                return (
                  <li
                    key={r.group}
                    className={`rounded-[28px] bg-white p-4 sm:p-5 ${LEVEL_STYLE[r.level].ring}`}
                  >
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-4 lg:flex-nowrap">
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${LEVEL_STYLE[r.level].icon}`}>
                        <i className={`ti ${icon} text-[26px]`} aria-hidden="true" />
                      </span>

                      <div className="min-w-0 flex-1 basis-[200px] lg:max-w-[250px]">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold leading-tight text-ink">{r.group}</h4>
                          {r.rival && (
                            <span className="rounded-full border border-border px-2 py-0.5 text-[13px] font-medium text-ink-muted">
                              Also a rival
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm leading-snug text-ink-muted">{r.who}</div>
                      </div>

                      <LevelMeter level={r.level} />

                      <div className="grid w-full min-w-0 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center lg:w-auto lg:flex-1">
                        <div className="rounded-2xl border border-border p-3">
                          <div className="text-[13px] font-semibold text-ink-muted">Gives Apple</div>
                          <div className="mt-0.5 text-[15px] leading-snug text-ink">{r.gives}</div>
                        </div>
                        <span
                          className="hidden size-8 place-items-center justify-self-center rounded-full border border-border text-primary sm:grid"
                          aria-hidden="true"
                        >
                          <i className="ti ti-arrows-exchange text-lg" />
                        </span>
                        <div className="rounded-2xl border border-border p-3">
                          <div className="text-[13px] font-semibold text-ink-muted">Gets from Apple</div>
                          <div className="mt-0.5 text-[15px] leading-snug text-ink">{r.gets}</div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 border-t border-dashed border-border pt-3 text-sm leading-relaxed text-ink-muted">
                      {r.note}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 max-w-[780px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
              {data.reliance.howToRead}
            </p>
          </div>
        )}

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}