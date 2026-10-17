import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import {
  DATA_REFRESH_NOTE,
  DATA_SOURCES,
  SCORE_DISCLAIMER,
  SCORE_FACTORS,
} from "@/lib/about-content";
import type { HomeProfile } from "@/lib/home-data";

// One blue ramp, dark to light. Full class names so Tailwind can see them.
const BAR_COLORS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4"];

export default function TrustSection({ profiles }: { profiles: HomeProfile[] }) {
  const sample = profiles.find((p) => p.slug === "nvidia") ?? profiles[0];

  return (
    <section className="py-16 lg:py-[72px]">
      <Container>
        <SectionHeading
          title="Clear about where the numbers come from."
          description="Every company gets a Scope Score built from four weighted factors, using public filings, earnings reports and market data."
        />

        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {sample && (
            <div className="flex flex-col items-start gap-5">
              <span className="grid h-[132px] w-[132px] place-items-center rounded-full bg-primary font-serif text-[52px] font-medium tracking-[-0.03em] tabular-nums text-white">
                {sample.company.scopeScore.score.toFixed(1)}
              </span>
              <div>
                <p className="text-lg font-semibold text-ink">
                  {sample.company.scopeScore.label}
                </p>
                <p className="mt-1 max-w-[18em] text-[15px] text-ink-muted">
                  The Scope Score of {sample.company.identity.name}, shown as an
                  example.
                </p>
              </div>
            </div>
          )}

          <ul className="border-t border-border">
            {SCORE_FACTORS.map((factor, index) => (
              <li key={factor.key} className="border-b border-border py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[17px] font-semibold text-ink">
                    {factor.label}
                  </h3>
                  <span className="font-serif text-2xl font-medium tabular-nums text-ink">
                    {factor.weightPct}%
                  </span>
                </div>
                <p className="mt-1 text-[15px] text-ink-muted">
                  {factor.description}
                </p>
                <span
                  className="mt-3 block h-1.5 overflow-hidden rounded-full bg-border"
                  aria-hidden="true"
                >
                  <span
                    className={`block h-full rounded-full ${BAR_COLORS[index] ?? "bg-chart-4"}`}
                    style={{ width: `${factor.weightPct}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <h3 className="text-lg font-semibold text-ink">
            Where the data comes from
          </h3>
          <p className="mt-1 text-[15px] text-ink-muted">{DATA_REFRESH_NOTE}</p>

          <ul className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {DATA_SOURCES.map((source) => (
              <li key={source.key} className="flex gap-3.5">
                <i
                  className={`ti ${source.icon} mt-0.5 shrink-0 text-[22px] text-primary`}
                  aria-hidden="true"
                />
                <div>
                  <b className="block text-[15px] font-semibold text-ink">
                    {source.label}
                  </b>
                  <span className="mt-0.5 block text-sm text-ink-muted">
                    {source.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="max-w-[640px] text-[13px] leading-relaxed text-ink-muted">
              {SCORE_DISCLAIMER}
            </p>
            <TextLink href="/about#ai-score">How the score works</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
