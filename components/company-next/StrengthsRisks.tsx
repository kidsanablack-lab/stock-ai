// Section 15: Strengths and risks (category: Business).
// One question: what is the company good at, what could go wrong, and how big is each risk?
// Design B (Portfolio Lab look): strengths and risks are each one card with a blue header band.
// Every finding is a row: a coloured block on the left (icon for strengths, the level for risks), the finding in the middle,
// and up to two numbers that back it up on the right.
// Strengths use a blue block. Risks use a block coloured by level (High red, Medium yellow, Low green).
// Look only: the data types, props and sorting are unchanged. `labels` stays in the data but is not shown.
// The `icon` field (a Tabler icon class such as "ti-shield-check") is shown for strengths only; risks show the level instead.
// Names are shown exactly as written in the data (for example "AI spending risk" keeps its capital letters).
// Server Component. No client JS needed.
import type { ReactNode } from "react";
import type { Evidence, StrengthsRisksData } from "@/lib/company-next/types";
import SectionNote from "./SectionNote";

// The data types live in lib/company-next/types.ts. They are re-exported here so older imports keep working.
export type { Evidence, StrengthItem, RiskItem, StrengthsRisksData } from "@/lib/company-next/types";

const LEVEL_NAME = { 1: "Low", 2: "Medium", 3: "High" } as const;

// Each level has a word, a number of bars and a colour, so the rating never depends on colour alone.
// block = the coloured left block of the row, bar = a filled bar, empty = an unfilled bar.
const LEVEL_STYLE = {
  3: { block: "bg-danger text-white", bar: "bg-white", empty: "bg-white/35" },
  2: { block: "bg-[#facc15] text-[#3b2f00]", bar: "bg-[#3b2f00]", empty: "bg-black/15" },
  1: { block: "bg-success text-white", bar: "bg-white", empty: "bg-white/35" },
} as const;

/* Card with a blue header band (title and intro) and a white body. */
function BandCard({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-white">
      <div className="bg-primary px-5 py-4 text-white sm:px-8">
        <h3 className="font-serif text-xl font-medium leading-tight sm:text-2xl">{title}</h3>
        <p className="mt-0.5 text-sm leading-snug text-white/90">{intro}</p>
      </div>
      {children}
    </div>
  );
}

function RowIcon({ icon }: { icon?: string }) {
  if (!icon) return null;
  return <i className={`ti ${icon} text-[32px] leading-none`} aria-hidden="true" />;
}

/* ---------- One row, used for strengths and risks ---------- */

function InfoRow({
  name,
  finding,
  evidence,
  why,
  whyLabel,
  block,
  icon,
  level,
}: {
  name: string;
  finding: string;
  evidence: Evidence[];
  why: string;
  whyLabel: string;
  block: string;
  icon?: string;
  level?: 1 | 2 | 3; // only risks have a level
}) {
  return (
    <li className="grid border-t border-border first:border-t-0 md:grid-cols-[150px_minmax(0,1fr)_300px]">
      {/* Left block: icon for strengths; level word and three bars for risks */}
      <div
        className={`flex items-center gap-4 px-5 py-4 md:flex-col md:justify-center md:gap-2.5 md:px-4 md:py-6 ${block}`}
      >
        <RowIcon icon={icon} />
        {level && (
          <div className="flex items-center gap-3 md:flex-col md:gap-2.5">
            <span className="font-serif text-2xl font-semibold leading-none">
              <span className="sr-only">Risk level: </span>
              {LEVEL_NAME[level]}
            </span>
            <span className="flex gap-[3px]" aria-hidden="true">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full ${i <= level ? LEVEL_STYLE[level].bar : LEVEL_STYLE[level].empty}`}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 px-5 py-5 sm:px-7 md:py-6">
        <h4 className="font-serif text-[21px] font-medium leading-tight text-ink">{name}</h4>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{finding}</p>
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink">{whyLabel}</span> {why}
        </p>
      </div>

      {evidence.length > 0 && (
        <dl className="grid content-center gap-3 border-t border-border px-5 py-5 sm:px-7 md:border-l md:border-t-0 md:py-6">
          {evidence.map((e) => (
            <div key={e.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-0.5 text-[13px] leading-snug text-ink-muted">{e.label}</dt>
              <dd className="font-serif text-2xl font-medium leading-[1.1] tabular-nums text-ink">{e.value}</dd>
            </div>
          ))}
        </dl>
      )}
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
          <h2 className="max-w-[900px] font-serif text-[clamp(30px,3.8vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">{data.title}</h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* At a glance: blue headline card next to three counts, then one line naming the High risks */}
        <div className="mt-6">
          <div className="grid overflow-hidden rounded-[28px] border border-border bg-white md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex flex-col justify-center bg-primary px-6 py-6 text-white sm:px-8 sm:py-7">
              <div className="text-[15px] font-semibold">At a glance</div>
              <p className="mt-2 font-serif text-[clamp(26px,3vw,32px)] font-semibold leading-[1.15] tracking-title">
                {data.strengths.length} {data.strengths.length === 1 ? "strength" : "strengths"},{" "}
                {high.length > 0
                  ? `${high.length} High ${high.length === 1 ? "risk" : "risks"}`
                  : "no High risks"}
              </p>
            </div>
            <dl className="grid grid-cols-3">
              {[
                { n: data.strengths.length, label: "Strengths", tone: "text-primary" },
                { n: high.length, label: "High risks", tone: "text-danger" },
                { n: rest, label: "Medium or Low", tone: "text-ink" },
              ].map((c) => (
                <div key={c.label} className="flex flex-col-reverse justify-end border-l border-border px-4 py-5 first:border-l-0 sm:px-6 sm:py-6 md:first:border-l">
                  <dt className="mt-2 text-[13px] leading-snug text-ink-muted sm:text-sm">{c.label}</dt>
                  <dd className={`font-serif text-[clamp(36px,5vw,52px)] font-semibold leading-none tabular-nums ${c.tone}`}>
                    {c.n}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-3.5 text-[15px] leading-relaxed text-ink">
            {high.length > 0
              ? `${joinNames(high.map((r) => r.name))} ${high.length === 1 ? "is" : "are"} rated High.${
                  rest > 0 ? ` Everything else is Medium or Low.` : ""
                }`
              : "Every risk is rated Medium or Low."}
          </p>
        </div>

        {/* Strengths: one card, one row per strength, blue block on the left */}
        {data.strengths.length > 0 && (
          <div className="pt-12">
            <BandCard title="Key strengths" intro={data.strengthsIntro}>
              <ul>
                {data.strengths.map((s) => (
                  <InfoRow
                    key={s.name}
                    name={s.name}
                    finding={s.finding}
                    evidence={s.evidence}
                    why={s.why}
                    whyLabel="Why it matters:"
                    block="bg-primary text-white"
                    icon={s.icon}
                  />
                ))}
              </ul>
            </BandCard>
          </div>
        )}

        {/* Risks: highest first, left block coloured by level */}
        {risks.length > 0 && (
          <div className="pt-12">
            <BandCard title="Key risks, highest first" intro={data.risksIntro}>
              <ul>
                {risks.map((r) => (
                  <InfoRow
                    key={r.name}
                    name={r.name}
                    finding={r.finding}
                    evidence={r.evidence}
                    why={r.why}
                    whyLabel={`Why ${LEVEL_NAME[r.level]}:`}
                    block={LEVEL_STYLE[r.level].block}
                    level={r.level}
                  />
                ))}
              </ul>
            </BandCard>

            <SectionNote className="mt-6">
              {data.risksHowToRead}
            </SectionNote>
          </div>
        )}

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}