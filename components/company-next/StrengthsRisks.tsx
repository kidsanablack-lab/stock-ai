// Section 15: Strengths and risks (category: Business).
// One question: what is the company good at, what could go wrong, and how big is each risk?
// Design A (Portfolio Lab look): each strength and risk is one card with a coloured band on top,
// the finding, up to two numbers that back it up, and the reason underneath.
// Strengths use a blue band. Risks use a band coloured by level (High red, Medium yellow, Low green).
// Look only: the data types, props and sorting are unchanged. `icon` and `labels` stay in the data but are not shown.
// Names are shown exactly as written in the data (for example "AI spending risk" keeps its capital letters).
// Server Component. No client JS needed.

export type Evidence = { value: string; label: string };

export type StrengthItem = {
  icon: string; // Tabler icon name, e.g. "ti-shield-check" (not shown in design A)
  name: string;
  finding: string;
  evidence: Evidence[]; // 1 to 2 numbers that back the claim
  why: string;
};

export type RiskItem = {
  icon: string;
  name: string;
  level: 1 | 2 | 3; // 1 Low, 2 Medium, 3 High
  finding: string;
  evidence: Evidence[];
  why: string; // reason for the level and what happens if it goes wrong
};

export type StrengthsRisksData = {
  title: string;
  lead: string;
  labels: string[]; // kept in the data, but no longer shown in the header
  strengthsIntro: string;
  strengths: StrengthItem[];
  risksIntro: string;
  risks: RiskItem[];
  risksHowToRead: string;
  source: string;
};

const LEVEL_NAME = { 1: "Low", 2: "Medium", 3: "High" } as const;

// Each level has a word, a number of bars and a colour, so the rating never depends on colour alone.
// band = the coloured top of the card, pill = the chip inside it, ring = the card border.
const LEVEL_STYLE = {
  3: {
    band: "bg-danger text-white",
    pill: "bg-white/20",
    bar: "bg-white",
    empty: "bg-white/35",
    ring: "border-2 border-danger",
  },
  2: {
    band: "bg-[#facc15] text-[#3b2f00]",
    pill: "bg-black/10",
    bar: "bg-[#3b2f00]",
    empty: "bg-black/15",
    ring: "border border-[#f3dc7a]",
  },
  1: {
    band: "bg-success text-white",
    pill: "bg-white/20",
    bar: "bg-white",
    empty: "bg-white/35",
    ring: "border border-[#b6e2c6]",
  },
} as const;

function SubHeading({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="mb-5">
      <h3 className="max-w-[760px] font-serif text-[clamp(22px,2.6vw,28px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[680px] text-[15px] leading-relaxed text-ink-muted">{intro}</p>
    </div>
  );
}

function LevelPill({ level }: { level: 1 | 2 | 3 }) {
  const s = LEVEL_STYLE[level];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[3px] text-xs font-semibold ${s.pill}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-[5px] w-2.5 rounded-full ${i <= level ? s.bar : s.empty}`} />
        ))}
      </span>
      <span className="sr-only">Risk level: </span>
      {LEVEL_NAME[level]}
    </span>
  );
}

/* ---------- One card, used for strengths and risks ---------- */

function InfoCard({
  name,
  finding,
  evidence,
  why,
  whyLabel,
  band,
  ring,
  level,
}: {
  name: string;
  finding: string;
  evidence: Evidence[];
  why: string;
  whyLabel: string;
  band: string;
  ring: string;
  level?: 1 | 2 | 3; // only risks have a level
}) {
  return (
    <li className={`flex flex-col overflow-hidden rounded-[28px] bg-white ${ring}`}>
      <div className={`flex items-center justify-between gap-3 px-5 py-3.5 ${band}`}>
        <h4 className="font-serif text-xl font-normal leading-tight">{name}</h4>
        {level && <LevelPill level={level} />}
      </div>

      <div className="grid gap-4 p-5">
        <p className="text-[15px] leading-relaxed text-ink">{finding}</p>

        {evidence.length > 0 && (
          <dl className="grid grid-cols-2 gap-4">
            {evidence.map((e) => (
              <div
                key={e.label}
                className={`flex flex-col-reverse justify-end border-t border-border pt-2.5 ${
                  evidence.length === 1 ? "col-span-2" : ""
                }`}
              >
                <dt className="mt-1 text-[13px] leading-snug text-ink-muted">{e.label}</dt>
                <dd className="font-serif text-[26px] font-medium leading-[1.1] tabular-nums text-ink">{e.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="border-t border-border pt-3 text-[13px] leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink">{whyLabel}</span> {why}
        </p>
      </div>
    </li>
  );
}

// "A", "A and B", "A, B and C"
function joinNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export default function StrengthsRisks({ data }: { data: StrengthsRisksData }) {
  const risks = [...data.risks].sort((a, b) => b.level - a.level);
  const high = risks.filter((r) => r.level === 3);
  const rest = risks.length - high.length;

  return (
    <section id="strengths-risks" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(28px,4vw,36px)] font-normal leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* One-line summary, same shape as the "Fully allocated" notice in Portfolio Lab */}
        {/* Green on purpose: the headline leads with the strengths, and the High risks are named in the line below */}
        <div className="mt-6 rounded-2xl bg-success-soft px-[18px] py-3.5 text-[15px] leading-normal text-ink">
          <p className="font-semibold">
            {data.strengths.length} {data.strengths.length === 1 ? "strength" : "strengths"},{" "}
            {high.length > 0
              ? `${high.length} High ${high.length === 1 ? "risk" : "risks"}`
              : "no High risks"}
          </p>
          <p>
            {high.length > 0
              ? `${joinNames(high.map((r) => r.name))} ${high.length === 1 ? "is" : "are"} rated High.${
                  rest > 0 ? ` Everything else is Medium or Low.` : ""
                }`
              : "Every risk is rated Medium or Low."}
          </p>
        </div>

        {/* Strengths: blue band on every card */}
        {data.strengths.length > 0 && (
          <div className="pt-12">
            <SubHeading title="Key strengths" intro={data.strengthsIntro} />
            <ul className="grid items-start gap-4 md:grid-cols-2">
              {data.strengths.map((s) => (
                <InfoCard
                  key={s.name}
                  name={s.name}
                  finding={s.finding}
                  evidence={s.evidence}
                  why={s.why}
                  whyLabel="Why it matters:"
                  band="bg-primary text-white"
                  ring="border border-border"
                />
              ))}
            </ul>
          </div>
        )}

        {/* Risks: highest first, band coloured by level */}
        {risks.length > 0 && (
          <div className="pt-12">
            <SubHeading title="Key risks" intro={data.risksIntro} />
            <ul className="grid items-start gap-4 md:grid-cols-2">
              {risks.map((r) => (
                <InfoCard
                  key={r.name}
                  name={r.name}
                  finding={r.finding}
                  evidence={r.evidence}
                  why={r.why}
                  whyLabel={`Why ${LEVEL_NAME[r.level]}:`}
                  band={LEVEL_STYLE[r.level].band}
                  ring={LEVEL_STYLE[r.level].ring}
                  level={r.level}
                />
              ))}
            </ul>

            <p className="mt-5 max-w-[760px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
              {data.risksHowToRead}
            </p>
          </div>
        )}

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}