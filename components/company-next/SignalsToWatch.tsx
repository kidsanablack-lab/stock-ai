// components/company-next/SignalsToWatch.tsx
// Section 17: "Signals to watch".
// The one question it answers: what should I watch in the next report,
// and what would count as good or bad?
// Design A (Portfolio Lab look): a blue next-report card, a short how-to-read notice,
// then one card per signal with a blue band on top, the question and thresholds on the left,
// and the range track with its numbers on the right.
// Company-neutral: no company name is written in this file. Everything specific comes from `data`.
// Look only: the data types, props, date reading and zone logic are unchanged. `labels` stays in the data but is not shown.
// Server Component.
import type { SignalItem, SignalsToWatchData, SignalValueFormat as ValueFormat } from "@/lib/company-next/types";

// The data types live in lib/company-next/types.ts. They are re-exported here so older imports keep working.
export type { SignalItem, SignalsToWatchData } from "@/lib/company-next/types";

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
// The pale track and the middle zone use #f1f5fa: the old bg-surface is not a token in design-tokens.css.
const ZONE = {
  strong: { label: "Strong zone", icon: "ti-arrow-up-right", cls: "bg-[#c6ecd3] text-[#157a3c]" },
  middle: { label: "Middle zone", icon: "ti-minus", cls: "bg-[#f1f5fa] text-ink-muted" },
  weak: { label: "Weak zone", icon: "ti-arrow-down-right", cls: "bg-[#f8c9c4] text-[#b42318]" },
} as const;

function ZonePill({ zone }: { zone: Zone }) {
  const z = ZONE[zone];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${z.cls}`}>
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
        <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 overflow-hidden rounded-full bg-[#f1f5fa]">
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

      <div className="mt-0.5 flex justify-between text-xs tabular-nums text-ink-muted">
        <span>Weak · {formatValue(range[0], item.format)}</span>
        <span>{formatValue(range[1], item.format)} · Strong</span>
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

// Full-width blue card: a small calendar tile on the left, the date and the note on the right.
// The "in N days" hint is only shown for an exact day that is not marked approximate.
// A tentative or month-only date never gets a countdown, because it would be a guess.
function NextReportCard({ next }: { next: SignalsToWatchData["next"] }) {
  const parsed = parseNextDate(next.date);
  const hint = parsed && parsed.kind === "day" && !parsed.approx ? inDays(parsed.daysLeft) : null;

  return (
    <div className="flex items-center gap-4 rounded-[28px] bg-primary px-5 py-5 text-white sm:gap-5 sm:px-6">
      {parsed && (
        <div className="w-[96px] shrink-0 overflow-hidden rounded-2xl bg-white text-center sm:w-[104px]" aria-hidden="true">
          <div className="bg-primary-ink px-2 py-1.5 text-xs font-semibold text-white">
            {parsed.kind === "day" ? `${parsed.month} ${parsed.year}` : parsed.year}
          </div>
          <div className="pb-2.5 pt-1">
            <div className="font-serif text-[48px] font-medium leading-none tabular-nums text-ink">
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
        <div className="mt-1 font-serif text-[22px] font-medium leading-[1.15] sm:text-2xl">{next.date}</div>
        <p className="mt-2 text-sm leading-snug text-white/90">{next.note}</p>
      </div>
    </div>
  );
}

export default function SignalsToWatch({ data }: { data: SignalsToWatchData }) {
  return (
    <section id="signals" className="scroll-mt-24 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        {/* Header */}
        <header>
          <h2 className="max-w-[900px] font-serif text-[clamp(30px,3.8vw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">
            {data.title}
          </h2>
          <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-ink-muted sm:text-base">{data.lead}</p>
        </header>

        <div className="mt-6">
          <NextReportCard next={data.next} />
        </div>

        {/* How to read: a pale blue notice, with the three markers as a legend */}
        <div className="mt-4 rounded-2xl border border-[#c9d8f7] bg-[#eef4ff] px-[18px] py-3.5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3.5 rounded-full bg-primary" />
              Last quarter
            </span>
            {data.signals.some((s) => s.estimate !== undefined) && (
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-3.5 rounded-full border-2 border-primary bg-white" />
                Analysts expect
              </span>
            )}
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-3.5 w-[3px] rounded-sm bg-ink-muted" />
              Same quarter a year ago
            </span>
          </div>
          <p className="mt-2 max-w-[820px] text-sm leading-relaxed text-ink">{data.howToRead}</p>
        </div>

        {/* One card per signal */}
        {data.signals.length > 0 && (
          <ul className="mt-6 grid gap-4">
            {data.signals.map((item) => {
              const lastZone = zoneOf(item, item.lastQuarter);
              return (
                <li key={item.name} className="overflow-hidden rounded-[28px] border border-border bg-white">
                  <div className="bg-primary px-[22px] py-3.5 text-white">
                    <h3 className="font-serif text-[22px] font-normal leading-tight">{item.name}</h3>
                  </div>

                  <div className="flex flex-wrap gap-6 p-[22px]">
                    <div className="min-w-0 flex-[1_1_250px]">
                      <p className="text-[15px] leading-relaxed text-ink">{item.question}</p>

                      <div className="mt-3.5 flex flex-wrap gap-2 text-[12.5px] font-semibold tabular-nums">
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
                        <p className="mt-3 border-t border-border pt-2.5 text-[13px] leading-relaxed text-ink-muted">
                          <span className="font-semibold text-ink">Company guidance:</span> {item.guidance}
                        </p>
                      )}
                    </div>

                    <div className="min-w-0 flex-[1.3_1_330px] rounded-2xl border border-border bg-white p-4">
                      <Track item={item} />
                      <div
                        className={`mt-3.5 grid gap-4 border-t border-border pt-3.5 ${
                          item.estimate !== undefined ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"
                        }`}
                      >
                        <Stat
                          glyph="tick"
                          label="Same quarter a year ago"
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
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-8 border-t border-border pt-4 text-[13px] leading-relaxed text-ink-muted">{data.source}</p>
      </div>
    </section>
  );
}