import Link from "next/link";
import Image from "next/image";

export type CompanyHeroData = {
  name: string;
  ticker: string;
  sector: string;
  /** Optional. If missing, a dashed "LOGO" placeholder is shown. */
  logo?: string;
  description: string;
  score: number;
  scoreLabel: string;
  scoreHref?: string;
  dataStatus?: "example" | "partial" | "live";
  facts: {
    label: string;
    value: string;
    note?: string;
    noteTone?: "positive" | "negative" | "neutral";
  }[];
  source: string;
};

const noteColor = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-ink-muted",
} as const;

const statusLabel = {
  example: "Example data",
  partial: "Real data · score is example",
  live: "Verified data",
} as const;

export default function CompanyHero({ data }: { data: CompanyHeroData }) {
  const scorePct = Math.min(Math.max(data.score, 0), 10) * 10;
  const status = statusLabel[data.dataStatus ?? "example"];

  return (
    <section className="bg-[#ffffff] py-6 lg:py-8">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6">
        {/* Blue panel */}
        <div className="rounded-[28px] bg-primary px-5 py-7 sm:rounded-[36px] sm:px-8 sm:py-9 lg:px-12">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            {/* Left: who the company is */}
            <div>
              <div className="flex items-center gap-4">
                {data.logo ? (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]">
                    <Image
                      src={data.logo}
                      alt=""
                      width={64}
                      height={64}
                      unoptimized
                      className="h-[56%] w-[56%] object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-white/60 bg-white/10 text-xs font-semibold tracking-wider text-white sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]"
                    aria-hidden="true"
                  >
                    LOGO
                  </div>
                )}

                <div className="min-w-0">
                  <h1 className="font-serif text-[clamp(28px,3.6vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                    {data.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-0.5 text-[13px] font-semibold text-primary">
                      {data.ticker}
                    </span>
                    <span className="rounded-full border border-white/50 px-3 py-0.5 text-[13px] font-semibold text-white">
                      {data.sector}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-[560px] text-base font-medium leading-relaxed text-white sm:text-[17px]">
                {data.description}
              </p>
            </div>

            {/* Right: the Scope Score */}
            <div className="rounded-3xl bg-white p-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-[22px] font-semibold tabular-nums text-white">
                  {data.score.toFixed(1)}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-tight text-ink">Scope Score</p>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    <span className="font-semibold text-primary">{data.scoreLabel}</span>
                    {" "}· out of 10
                  </p>
                </div>
              </div>

              <div
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary-soft"
                role="meter"
                aria-label="Scope Score"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={data.score}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${scorePct}%` }}
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Sums up financial strength, growth and business quality in one number.
              </p>
              <Link
                href={data.scoreHref ?? "#score"}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                How it&rsquo;s built
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Key facts: separate card below the blue panel, no overlap */}
        <dl className="mt-4 grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-white shadow-card lg:grid-cols-4">
          {data.facts.map((fact) => (
            <div
              key={fact.label}
              className="border-border px-5 py-4 max-lg:odd:border-l-0 max-lg:even:border-l max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0"
            >
              <dt className="text-sm font-medium text-ink-muted">{fact.label}</dt>
              <dd className="mt-1 font-serif text-xl font-semibold leading-[1.1] tabular-nums text-ink sm:text-[26px]">
                {fact.value}
              </dd>
              {fact.note && (
                <dd className={`mt-1 text-[13px] leading-snug ${noteColor[fact.noteTone ?? "neutral"]}`}>
                  {fact.note}
                </dd>
              )}
            </div>
          ))}
        </dl>

        {/* One source line */}
        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-[13px] leading-relaxed text-ink-muted sm:px-2">
          <span className="rounded-full bg-primary-soft px-3.5 py-1 font-semibold text-primary-ink">
            {status}
          </span>
          <span className="min-w-0 flex-1 basis-[280px]">{data.source}</span>
        </p>
      </div>
    </section>
  );
}