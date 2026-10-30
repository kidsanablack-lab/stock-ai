// Section 15: Strengths and risks (category: Business).
// One question: what is Apple good at, what could go wrong, and how big is each risk?
// Every strength and risk is one horizontal row: name and finding, two numbers, and the reason.
// Server Component. No client JS needed.

export type Evidence = { value: string; label: string };

export type StrengthItem = {
  icon: string; // Tabler icon name, e.g. "ti-shield-check"
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

// "a", "a and b", "a, b and c"
function joinList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function LevelMeter({ level }: { level: 1 | 2 | 3 }) {
  const s = LEVEL_STYLE[level];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${s.chip}`}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-1.5 w-4 rounded-full ${i <= level ? s.bar : s.empty}`} />
        ))}
      </span>
      <span className="text-[13px] font-semibold">
        <span className="sr-only">Risk level: </span>
        {LEVEL_NAME[level]}
      </span>
    </span>
  );
}

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

// One column under the big headline: a colored line on top and a short caption.
function SummaryNote({
  color,
  number,
  numberClass,
  headline,
  text,
}: {
  color: string;
  number: number;
  numberClass: string;
  headline: string;
  text: string;
}) {
  return (
    <div>
      <p className="mb-3 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1d2b50]">
        <span className={`tabular-nums ${numberClass}`}>{number}</span> {headline}
      </p>
      <div className="h-[3px] w-full rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      <p className="mt-3 max-w-[340px] text-sm leading-snug text-ink-muted">{text}</p>
    </div>
  );
}

/* ---------- One horizontal row, used for strengths and risks ---------- */

function InfoRow({
  icon,
  name,
  finding,
  evidence,
  why,
  whyLabel,
  variant = "plain",
  iconClass = "bg-primary-soft text-primary-ink",
  ring = "border border-border",
}: {
  icon: string;
  name: string;
  finding: string;
  evidence: Evidence[];
  why: string;
  whyLabel?: string;
  variant?: "plain" | "featured"; // featured = vivid blue card
  iconClass?: string;
  ring?: string;
}) {
  const featured = variant === "featured";

  return (
    <li
      className={`grid gap-4 rounded-[28px] p-4 sm:p-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)_minmax(0,0.95fr)] lg:gap-5 ${
        featured ? "border border-primary bg-primary text-white" : `bg-white ${ring}`
      }`}
    >
      {/* Left: icon, name, finding */}
      <div className="flex min-w-0 flex-col p-1 sm:p-2">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-xl ${
              featured ? "bg-white text-primary" : iconClass
            }`}
          >
            <i className={`ti ${icon} text-[22px]`} aria-hidden="true" />
          </span>
          <h4 className={`text-lg font-semibold leading-tight ${featured ? "text-white" : "text-ink"}`}>{name}</h4>
        </div>
        <p className={`mt-3 text-[15px] leading-relaxed ${featured ? "text-white" : "text-ink"}`}>{finding}</p>
      </div>

      {/* Middle: the numbers that back it up */}
      {evidence.length > 0 && (
        <dl className="grid min-w-0 grid-cols-2 gap-3">
          {evidence.map((e) => (
            <div
              key={e.label}
              className={`flex min-w-0 flex-col-reverse justify-end rounded-2xl px-4 py-4 ${
                evidence.length === 1 ? "col-span-2" : ""
              } ${featured ? "bg-white/15" : "bg-surface"}`}
            >
              <dt className={`mt-2 text-sm leading-snug ${featured ? "text-white/85" : "text-ink-muted"}`}>
                {e.label}
              </dt>
              <dd
                className={`font-serif text-[clamp(26px,2.8vw,34px)] font-semibold leading-none tracking-tight tabular-nums ${
                  featured ? "text-white" : "text-ink"
                }`}
              >
                {e.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Right: why it matters, behind a vertical line */}
      <div
        className={`flex items-center border-t-2 pt-3 lg:border-l-2 lg:border-t-0 lg:pl-5 lg:pt-0 ${
          featured ? "border-white/30" : "border-border"
        }`}
      >
        <p className={`text-sm leading-relaxed ${featured ? "text-white/90" : "text-ink-muted"}`}>
          {whyLabel && (
            <span className={`font-semibold ${featured ? "text-white" : "text-ink"}`}>{whyLabel} </span>
          )}
          {why}
        </p>
      </div>
    </li>
  );
}

export default function StrengthsRisks({ data }: { data: StrengthsRisksData }) {
  const risks = [...data.risks].sort((a, b) => b.level - a.level);
  const high = risks.filter((r) => r.level === 3);
  const levels = ([3, 2, 1] as const)
    .map((l) => ({ level: l, items: risks.filter((r) => r.level === l) }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="strengths-risks" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        {/* At a glance: three columns, each with its phrase sitting right above its colored line */}
        <div className="mt-8 grid items-end gap-6 sm:grid-cols-3 sm:gap-8">
          <SummaryNote
            color="var(--color-primary, #2563eb)"
            number={data.strengths.length}
            numberClass="text-primary"
            headline="strengths."
            text="Strengths, each backed by numbers"
          />
          <SummaryNote
            color="#d0922f"
            number={risks.length}
            numberClass="text-[#b07a24]"
            headline="risks."
            text="Risks, each rated Low, Medium or High"
          />
          <SummaryNote
            color="#b5402f"
            number={high.length}
            numberClass="text-[#b5402f]"
            headline="rated High."
            text={
              high.length > 0
                ? capitalize(joinList(high.map((r) => r.name.toLowerCase())))
                : "No risk is rated High"
            }
          />
        </div>

        {/* Strengths: the first row is vivid blue, the rest are white with a border */}
        {data.strengths.length > 0 && (
          <div className="pt-12">
            <SubHeading title="Key strengths" intro={data.strengthsIntro} />
            <ul className="grid gap-3">
              {data.strengths.map((s, i) => (
                <InfoRow
                  key={s.name}
                  icon={s.icon}
                  name={s.name}
                  finding={s.finding}
                  evidence={s.evidence}
                  why={s.why}
                  variant={i === 0 ? "featured" : "plain"}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Risks: grouped by level so the biggest ones are read first */}
        {risks.length > 0 && (
          <div className="pt-12">
            <SubHeading title="Key risks" intro={data.risksIntro} />

            <div className="grid gap-8">
              {levels.map(({ level, items }) => {
                const s = LEVEL_STYLE[level];
                return (
                  <div key={level}>
                    <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-border pb-3">
                      <LevelMeter level={level} />
                      <span className="text-sm text-ink-muted">
                        {items.length} {items.length === 1 ? "risk" : "risks"}
                      </span>
                    </div>

                    <ul className="grid gap-3">
                      {items.map((r) => (
                        <InfoRow
                          key={r.name}
                          icon={r.icon}
                          name={r.name}
                          finding={r.finding}
                          evidence={r.evidence}
                          why={r.why}
                          whyLabel={`Why ${LEVEL_NAME[r.level]}:`}
                          iconClass={s.icon}
                          ring={s.ring}
                        />
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 max-w-[760px] border-l-[3px] border-primary pl-3 text-[13px] leading-relaxed text-ink-muted">
              {data.risksHowToRead}
            </p>
          </div>
        )}

        <p className="mt-10 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">
          {data.source}
        </p>
      </div>
    </section>
  );
}