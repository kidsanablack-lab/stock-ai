// Section 21: Closing panel, the last block of a company page.
// One job: point the reader to the next place to go on Scope.
// The verdict itself lives in BottomLine. Server Component.
//
// The one big solid-blue panel on the page. Flat colors only, no gradients.
// Top: up to 3 related companies, each with a one-line reason.
// Bottom: a row of small links to the tools, and a link to all companies.
import Link from "next/link";

export type ClosingCompany = {
  name: string; // e.g. "Alphabet"
  ticker: string; // e.g. "GOOGL", shown as a tile
  reason: string; // one line: why this company, tied to the page's company
  href: string; // must be a real route
};

export type ClosingLink = {
  icon: string; // Tabler icon name, e.g. "ti-git-compare"
  title: string;
  href: string; // must be a real route
};

export type ClosingPanelData = {
  title: string[]; // one entry per line of the headline
  lead?: string; // one sentence under the headline
  companies: ClosingCompany[]; // 1 to 3
  links: ClosingLink[]; // small tool links, 2 to 4
  allLabel: string; // e.g. "See all companies"
  allHref: string;
  note: string;
};

// Tailwind needs whole class names, so the column count is looked up, not built.
const COLS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export default function ClosingPanel({ data }: { data: ClosingPanelData }) {
  const cols = COLS[Math.min(Math.max(data.companies.length, 1), 3)];

  return (
    <section className="bg-white py-16 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="rounded-[28px] bg-primary px-6 py-12 text-white sm:px-10 sm:py-16">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-[13px] font-semibold">
              <i className="ti ti-compass" aria-hidden="true" />
              Keep exploring
            </div>
            <h2 className="mt-5 font-serif text-[clamp(34px,5vw,56px)] font-normal leading-[1.08] tracking-[-0.02em]">
              {data.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {data.lead && (
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-white/85">{data.lead}</p>
            )}
          </div>

          {/* related companies */}
          <ul className={`mt-10 grid gap-3 ${cols}`}>
            {data.companies.map((c) => (
              <li key={c.name}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl bg-white p-5 text-ink transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-primary-soft px-2 text-[13px] font-bold tracking-tight text-primary-ink group-hover:bg-white">
                      {c.ticker}
                    </span>
                    <span className="text-[19px] font-semibold leading-tight">{c.name}</span>
                  </span>
                  <span className="mt-4 flex-1 text-[15px] leading-snug text-ink-muted">{c.reason}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-ink">
                    View {c.name}
                    <i
                      className="ti ti-arrow-right transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* tools and the full list */}
          <div className="mt-8 flex flex-col gap-4 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {data.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <i className={`ti ${l.icon} text-lg`} aria-hidden="true" />
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={data.allHref}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/40 px-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:self-auto"
            >
              {data.allLabel}
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-8 max-w-[760px] text-[13px] leading-relaxed text-white/80">{data.note}</p>
        </div>
      </div>
    </section>
  );
}