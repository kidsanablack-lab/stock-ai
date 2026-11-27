// Section 21: Closing panel, the last block of a company page.
// One job: point the reader to the next place to go on Scope.
// The verdict itself lives in BottomLine. Server Component.
//
// Look: centered heading, then up to 3 related-company cards (blue band on top,
// white body), then a light-blue strip with the tool links and the full list.
// Flat colors only, no gradients. Tailwind only, no separate CSS file.
// Each company card shows its logo when `logo` is given, and the first letter of its name when it is not.
import Link from "next/link";
import Image from "next/image";
import type { ClosingPanelData } from "@/lib/company-next/types";

// The data types live in lib/company-next/types.ts. They are re-exported here so older imports keep working.
export type { ClosingCompany, ClosingLink, ClosingPanelData } from "@/lib/company-next/types";

// Tailwind needs whole class names, so the column count is looked up, not built.
const COLS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export default function ClosingPanel({ data }: { data: ClosingPanelData }) {
  const cols = COLS[Math.min(Math.max(data.companies.length, 1), 3)];
  const lastLine = data.title.length - 1;

  return (
    <section className="bg-white py-16 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-serif text-[clamp(36px,5.4vw,60px)] font-medium leading-[1.06] tracking-[-0.01em] text-ink">
            {data.title.map((line, i) => (
              <span key={line} className="block">
                {i === lastLine && lastLine > 0 ? (
                  <em className="italic text-primary-ink">{line}</em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          {data.lead && (
            <p className="max-w-[560px] text-lg leading-relaxed text-ink-muted">{data.lead}</p>
          )}
        </div>

        {/* related companies */}
        <ul className={`mt-11 grid gap-6 ${cols}`}>
          {data.companies.map((c) => (
            <li key={c.name} className="flex">
              <Link
                href={c.href}
                className="group flex w-full flex-col overflow-hidden rounded-[28px] border border-border bg-white text-ink transition-colors hover:bg-primary-soft/35 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-primary"
              >
                {/* blue band: logo slot + ticker */}
                <span className="flex items-center gap-4 bg-primary px-[26px] py-[18px] text-white">
                  {/* Logo slot: the company logo, or its first letter when there is no logo file. */}
                  <span
                    className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white font-serif text-[28px] font-medium leading-none text-primary-ink"
                    aria-hidden="true"
                  >
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      c.name.charAt(0)
                    )}
                  </span>
                  <span className="min-w-0 font-serif text-[30px] font-medium leading-[1.1] tracking-[0.01em]">
                    {c.ticker}
                  </span>
                </span>
                {/* white body */}
                <span className="flex flex-1 flex-col gap-2.5 p-[26px]">
                  <span className="text-[22px] font-semibold leading-tight">{c.name}</span>
                  <span className="flex-1 text-[15.5px] leading-relaxed text-ink-muted">{c.reason}</span>
                  <span className="mt-2.5 inline-flex items-center gap-2 text-[15px] font-semibold text-primary-ink">
                    View {c.name}
                    <i
                      className="ti ti-arrow-right transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* tools and the full list */}
        <div className="mt-11 flex flex-col items-start gap-5 rounded-[28px] bg-primary-soft/35 p-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:rounded-full min-[900px]:px-8">
          <ul className="flex flex-wrap gap-3">
            {data.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full border border-primary bg-white px-5 text-[15px] font-semibold text-primary-ink transition-colors hover:bg-primary-soft focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-primary"
                >
                  <i className={`ti ${l.icon} text-xl`} aria-hidden="true" />
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={data.allHref}
            className="inline-flex h-[52px] w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-primary px-[26px] text-base font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-primary min-[480px]:w-auto"
          >
            {data.allLabel}
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <p className="mx-auto mt-9 max-w-[760px] text-center text-[13px] leading-relaxed text-ink-muted">
          {data.note}
        </p>
      </div>
    </section>
  );
}