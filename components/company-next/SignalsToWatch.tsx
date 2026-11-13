// components/company-next/SignalsToWatch.tsx
// Section 17: "Signals to watch".
// The one question it answers: what should I watch in the next report,
// and what would count as good or bad?
// Visual: one range track per signal (weak zone, strong zone, three markers).
// Company-neutral: no company name is written in this file. Everything specific comes from `data`.
// Server Component. Data types unchanged.

type ValueFormat = "percent" | "signedPercent" | "billions";

export type SignalItem = {
  name: string;
  /** One sentence: what to look for in the next report. */
  question: string;
  /** What the company itself said to expect, if it gave a number. */
  guidance?: string;
  format: ValueFormat;
  /** Left and right end of the track. */
  range: [number, number];
  /** Below this value the signal counts as weak. */
  weakBelow: number;
  /** At or above this value the signal counts as strong. */
  strongFrom: number;
  yearAgo: number;
  lastQuarter: number;
  /** Analyst estimate for the next report. Leave out if there is none. */
  estimate?: number;
};

export type SignalsToWatchData = {
  title: string;
  lead: string;
  /** Section-level labels, shown once (for example "Example data"). */
  labels: string[];
  /**
   * The calendar tile is built from `date`. These forms are understood:
   *   "Monday, Nov 2, 2026"                       exact day
   *   "Around Thursday, Feb 4, 2027 (tentative)"  day, marked as approximate
   *   "Early February 2027 (tentative)"           month only
   *   "Late January 2027"                         month only
   * Anything else is shown as plain text.
   */
  next: { date: string; note: string };
  howToRead: string;
  signals: SignalItem[];
  source: string;
};

type Zone = "strong" | "middle" | "weak";

function formatValue(value: number, format: ValueFormat): string {
  if (format === "billions") return `${value < 0 ? "−" : ""}$${Math.abs(value).toFixed(1)}B`;
  const text = `${Math.abs(value).toFixed(1)}%`;
  if (format === "signedPercent") {
    if (value > 0) return `+${text}`;
    if (value < 0) return `−${text}`;
  }
  return value < 0 ? `−${text}` : text;
}

function position(value: number, range: [number, number]): number {
  const [min, max] = range;
  const pct = ((value - min) / (max - min || 1)) * 100;
  return Math.min(100, Math.max(0, pct));
}

function zoneOf(item: SignalItem, v: number): Zone {
  if (v >= item.strongFrom) return "strong";
  if (v < item.weakBelow) return "weak";
  return "middle";
}

// Reads the date text of the next report. Returns null if it does not look like any of the forms above,
// and the card then shows plain text.
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const QUALIFIER = /^(around|about|early|mid|late)\s+/i;

type ParsedDate =
  | { kind: "day"; month: string; year: number; day: number; weekday: string; approx: boolean; daysLeft: number }
  | { kind: "month"; month: string; year: number; qualifier: string | null; approx: true };

function parseNextDate(text: string): ParsedDate | null {
  const raw = text.trim();
  const qualifier = raw.match(QUALIFIER)?.[1]?.toLowerCase() ?? null;
  const tentative = /\(\s*tentative\s*\)/i.test(raw);
  const approx = tentative || qualifier !== null;
  // Remove "(tentative)" and a leading "Around", "Early", "Late" and so on.
  const clean = raw.replace(/\([^)]*\)/g, "").replace(QUALIFIER, "").trim();

  const full = clean.match(/^(?:([A-Za-z]+),\s*)?([A-Za-z]{3,9})\.?\s+(\d{1,2}),\s*(\d{4})$/);
  if (full) {
    const month = MONTHS.indexOf(full[2].slice(0, 3).toLowerCase());
    if (month < 0) return null;
    const day = Number(full[3]);
    const year = Number(full[4]);
    const target = Date.UTC(year, month, day);
    const weekday = full[1] ?? new Date(target).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      kind: "day",
      month: full[2].slice(0, 3).toUpperCase(),
      year,
      day,
      weekday,
      approx,
      daysLeft: Math.round((target - today) / 86_400_000),
    };
  }

  const monthOnly = clean.match(/^([A-Za-z]{3,9})\.?\s+(\d{4})$/);
  if (monthOnly) {
    const month = MONTHS.indexOf(monthOnly[1].slice(0, 3).toLowerCase());
    if (month < 0) return null;
    return { kind: "month", month: monthOnly[1].slice(0, 3).toUpperCase(), year: Number(monthOnly[2]), qualifier, approx: true };
  }

  return null;
}

function inDays(n: number): string | null {
  if (n < 0) return null;
  if (n === 0) return "today";
  if (n === 1) return "tomorrow";
  return `in ${n} days`;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Each zone has a word and an icon as well as a color.
const ZONE = {
  strong: { label: "Strong zone", icon: "ti-arrow-up-right", cls: "bg-[#c6ecd3] text-[#157a3c]" },
  middle: { label: "Middle zone", icon: "ti-minus", cls: "bg-surface text-ink-muted" },
  weak: { label: "Weak zone", icon: "ti-arrow-down-right", cls: "bg-[#f8c9c4] text-[#b42318]" },
} as const;

function ZonePill({ zone }: { zone: Zone }) {
  const z = ZONE[zone];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ${z.cls}`}>
      <i className={`ti ${z.icon}`} aria-hidden="true" />
      {z.label}
    </span>
  );
}

function Track({ item }: { item: SignalItem }) {
  const { range, weakBelow, strongFrom, yearAgo, lastQuarter, estimate } = item;
  const weakWidth = position(weakBelow, range);
  const strongStart = position(strongFrom, range);

  return (
    <div>
      <div
        role="img"
        aria-label={`${item.name}: last quarter ${formatValue(lastQuarter, item.format)}, a year ago ${formatValue(yearAgo, item.format)}${
          estimate !== undefined ? `, analysts expect ${formatValue(estimate, item.format)}` : ""
        }. Weak below ${formatValue(weakBelow, item.format)}, strong from ${formatValue(strongFrom, item.format)}.`}
        className="relative h-8"
      >
        {/* the track with its weak and strong zones */}
        <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 overflow-hidden rounded-full bg-surface">
          <div className="absolute inset-y-0 left-0 bg-[#f8c9c4]" style={{ width: `${weakWidth}%` }} />
          <div className="absolute inset-y-0 right-0 bg-[#c6ecd3]" style={{ width: `${100 - strongStart}%` }} />
        </div>

        {/* year ago: a tick */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 h-8 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-ink-muted"
          style={{ left: `${position(yearAgo, range)}%` }}
        />

        {/* analyst estimate: a ring */}
        {estimate !== undefined && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary bg-white"
            style={{ left: `${position(estimate, range)}%` }}
          />
        )}

        {/* last quarter: a solid dot, drawn on top */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-primary shadow-sm"
          style={{ left: `${position(lastQuarter, range)}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-[12px] tabular-nums text-ink-muted">
        <span>◀ Weak · {formatValue(range[0], item.format)}</span>
        <span>{formatValue(range[1], item.format)} · Strong ▶</span>
      </div>
    </div>
  );
}

function Stat({
  glyph,
  label,
  value,
  zone,
  strong,
}: {
  glyph: "tick" | "dot" | "ring";
  label: string;
  value: string;
  zone: Zone;
  strong?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[12.5px] text-ink-muted">
        {glyph === "tick" && <span aria-hidden="true" className="h-3 w-[3px] rounded-sm bg-ink-muted" />}
        {glyph === "dot" && <span aria-hidden="true" className="size-2.5 rounded-full bg-primary" />}
        {glyph === "ring" && (
          <span aria-hidden="true" className="size-2.5 rounded-full border-2 border-primary bg-white" />
        )}
        {label}
      </div>
      <div
        className={`mt-0.5 font-serif font-medium leading-tight tabular-nums ${
          strong ? "text-[30px] text-ink" : "text-[22px] text-ink-muted"
        }`}
      >
        {value}
      </div>
      <div className="mt-1">
        <ZonePill zone={zone} />
      </div>
    </div>
  );
}

// Vivid blue card: a small calendar tile on the left, the date and the note on the right.
// The "in N days" hint is only shown for an exact day that is not marked approximate.
// A tentative or month-only date never gets a countdown, because it would be a guess.
function NextReportCard({ next }: { next: SignalsToWatchData["next"] }) {
  const parsed = parseNextDate(next.date);
  const hint = parsed && parsed.kind === "day" && !parsed.approx ? inDays(parsed.daysLeft) : null;

  return (
    <div className="flex items-center gap-4 rounded-[28px] bg-primary p-5 text-white sm:gap-5 sm:p-6">
      {parsed && (
        <div
          className="w-[96px] shrink-0 overflow-hidden rounded-2xl bg-white text-center shadow-sm sm:w-[108px]"
          aria-hidden="true"
        >
          <div className="bg-primary-ink px-2 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
            {parsed.kind === "day" ? `${parsed.month} ${parsed.year}` : parsed.year}
          </div>
          <div className="pb-2.5 pt-1">
            <div className="font-serif text-[48px] font-semibold leading-none tabular-nums text-ink sm:text-[54px]">
              {parsed.kind === "day" ? parsed.day : parsed.month}
            </div>
            <div className="mt-1 text-sm text-ink-muted">
              {parsed.kind === "day" ? parsed.weekday : parsed.qualifier ? capitalize(parsed.qualifier) : "Expected"}
            </div>
          </div>
        </div>
      )}

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white/90">
          {!parsed && <i className="ti ti-calendar-event text-[17px]" aria-hidden="true" />}
          Next report{hint ? ` · ${hint}` : ""}
        </div>
        <div className="mt-1 font-serif text-[22px] font-semibold leading-[1.15] tracking-tight sm:text-[24px]">
          {next.date}
        </div>
        <p className="mt-2 text-sm leading-snug text-white/90">{next.note}</p>
      </div>
    </div>
  );
}

export default function SignalsToWatch({ data }: { data: SignalsToWatchData }) {
  return (
    <section id="signals" className="scroll-mt-24 bg-white py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Title runs the full width */}
        <h2 className="max-w-[900px] font-serif text-[clamp(26px,3.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
          {data.title}
        </h2>

        {/* Lead and labels on the left, next report card level with them on the right */}
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:gap-12">
          <div>
            <p className="max-w-[660px] text-base leading-relaxed text-ink-muted sm:text-[17px]">{data.lead}</p>
            {data.labels.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.labels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-border px-3 py-1 text-[12.5px] font-medium text-ink-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <NextReportCard next={data.next} />
        </div>

        {/* how to read, with the three markers shown as a legend */}
        <div className="mt-8 rounded-2xl bg-surface px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3.5 rounded-full bg-primary" />
              Last quarter
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3.5 rounded-full border-2 border-primary bg-white" />
              Analysts expect
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-3.5 w-[3px] rounded-sm bg-ink-muted" />
              Same quarter a year ago
            </span>
          </div>
          <p className="mt-2 max-w-[820px] text-[13px] leading-relaxed text-ink-muted">{data.howToRead}</p>
        </div>

        {/* signals */}
        {data.signals.length > 0 && (
          <ul className="mt-6 grid gap-5">
            {data.signals.map((item) => {
              const lastZone = zoneOf(item, item.lastQuarter);
              return (
                <li
                  key={item.name}
                  className="grid gap-6 rounded-3xl border border-border bg-white p-5 sm:p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
                >
                  <div>
                    <h3 className="font-serif text-[26px] font-bold leading-tight tracking-tight text-[#0b1220]">{item.name}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">{item.question}</p>

                    <div className="mt-4 flex flex-wrap gap-2 text-[12.5px] font-semibold tabular-nums">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#c6ecd3] px-2.5 py-1 text-[#157a3c]">
                        <i className="ti ti-arrow-up-right" aria-hidden="true" />
                        Strong: {formatValue(item.strongFrom, item.format)} or more
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f8c9c4] px-2.5 py-1 text-[#b42318]">
                        <i className="ti ti-arrow-down-right" aria-hidden="true" />
                        Weak: below {formatValue(item.weakBelow, item.format)}
                      </span>
                    </div>
                    {item.guidance && (
                      <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
                        Company guidance: <span className="font-semibold text-ink">{item.guidance}</span>.
                      </p>
                    )}
                  </div>

                  <div className="min-w-0 rounded-2xl border border-border bg-white p-4 sm:p-5">
                    <Track item={item} />
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4 sm:grid-cols-3">
                      <Stat
                        glyph="tick"
                        label="Year ago"
                        value={formatValue(item.yearAgo, item.format)}
                        zone={zoneOf(item, item.yearAgo)}
                      />
                      <Stat
                        glyph="dot"
                        label="Last quarter"
                        value={formatValue(item.lastQuarter, item.format)}
                        zone={lastZone}
                        strong
                      />
                      {item.estimate !== undefined && (
                        <Stat
                          glyph="ring"
                          label="Analysts expect"
                          value={formatValue(item.estimate, item.format)}
                          zone={zoneOf(item, item.estimate)}
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-8 border-t border-border pt-5 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}