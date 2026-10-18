import Link from "next/link";
import Container from "@/components/ui/Container";
import ScopeScore from "@/components/ui/ScopeScore";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/about/FaqList";

type ScoreFactor = {
  key: string;
  label: string;
  weightPct: number;
  dot: string;
  description: string;
};

// One blue ramp, dark to light (chart tokens).
const SCORE_FACTORS: ScoreFactor[] = [
  {
    key: "business",
    label: "Business Quality",
    weightPct: 30,
    dot: "bg-chart-1",
    description: "Market position, brand strength, and pricing power.",
  },
  {
    key: "growth",
    label: "Growth",
    weightPct: 25,
    dot: "bg-chart-2",
    description: "Revenue and earnings trajectory, and how sustainable it looks.",
  },
  {
    key: "financial",
    label: "Financial Health",
    weightPct: 25,
    dot: "bg-chart-3",
    description: "Balance sheet strength, cash flow, and debt levels.",
  },
  {
    key: "risk",
    label: "Risk",
    weightPct: 20,
    dot: "bg-chart-4",
    description: "Regulatory, competitive, and market threats to the business.",
  },
];

type DataSource = {
  key: string;
  icon: string;
  label: string;
  description: string;
};

const DATA_SOURCES: DataSource[] = [
  {
    key: "sec",
    icon: "ti-file-certificate",
    label: "SEC filings",
    description: "10-Ks, 10-Qs, and other public disclosures.",
  },
  {
    key: "earnings",
    icon: "ti-microphone-2",
    label: "Earnings reports & calls",
    description: "Quarterly results and management commentary.",
  },
  {
    key: "market",
    icon: "ti-chart-candle",
    label: "Market data",
    description: "Prices, volume, and valuation multiples.",
  },
];

const DISCLAIMERS: string[] = [
  "The Scope Score is not investment advice or a recommendation to buy or sell.",
  "It doesn't predict short-term stock price movements.",
  "It's Scope's own opinion of a business, not a guarantee of future performance.",
  "It doesn't replace advice from a licensed financial professional.",
];

const FAQ_ITEMS = [
  {
    question: 'Is a high Scope Score a "buy" recommendation?',
    answer:
      "No. It's Scope's summary of how strong we think the underlying business is — not a signal about where the stock price is headed. A great business can still be an expensive stock.",
  },
  {
    question: "How often is the score updated?",
    answer:
      "Quarterly for most companies, or right after they report earnings — whichever comes first.",
  },
  {
    question: "Can the score change over time?",
    answer:
      "Yes. As a company's financials, growth, and risk profile evolve, its score is recalculated to reflect that.",
  },
  {
    question: "Do humans review the AI's output?",
    answer:
      "Scope's scoring methodology is designed and reviewed by our team. The underlying calculations are automated, but the framework itself is human-defined and periodically audited.",
  },
];

const BAR_LABEL = `Score weights: ${SCORE_FACTORS.map(
  (factor) => `${factor.label} ${factor.weightPct}%`,
).join(", ")}`;

export default function AboutPage() {
  return (
    <>
      {/* Header + Scope Score breakdown */}
      <section className="pb-16 pt-10 lg:pb-[72px]">
        <Container>
          <SectionHeading
            as="h1"
            title="How Scope works"
            description="The Scope Score, the data behind it, and — just as important — what it isn't."
          />

          <div
            id="ai-score"
            className="scroll-mt-24 rounded-[24px] border border-border bg-white p-6 shadow-card sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h2 className="font-serif text-[26px] font-normal leading-tight text-ink">
                The Scope Score
              </h2>
              <ScopeScore score={9.1} label="Example score" />
            </div>

            <p className="mt-3 max-w-[620px] text-[17px] leading-relaxed text-ink-muted">
              A single 0–10 number blending four weighted factors, recalculated
              every time a company reports.
            </p>

            <div
              role="img"
              aria-label={BAR_LABEL}
              className="mt-7 flex h-2.5 gap-0.5 overflow-hidden rounded-full"
            >
              {SCORE_FACTORS.map((factor) => (
                <div
                  key={factor.key}
                  className={factor.dot}
                  style={{ flex: factor.weightPct }}
                />
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SCORE_FACTORS.map((factor) => (
                <div key={factor.key} className="border-t border-border pt-4">
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${factor.dot}`}
                      aria-hidden="true"
                    />
                    {factor.label}
                  </h3>
                  <p className="mt-2 font-serif text-[32px] font-medium leading-none tabular-nums text-ink">
                    {factor.weightPct}%
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Data sources */}
      <section id="data" className="scroll-mt-24 bg-surface py-16 lg:py-[72px]">
        <Container>
          <SectionHeading
            title="Where the data comes from"
            description="Refreshed quarterly, or sooner when a company reports earnings."
          />

          <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
            {DATA_SOURCES.map((source) => (
              <li
                key={source.key}
                className="flex items-start gap-4 border-t border-border pt-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
                  <i className={`ti ${source.icon} text-xl`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {source.label}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">
                    {source.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What Scope doesn't do */}
      <section className="py-16 lg:py-[72px]">
        <Container>
          <SectionHeading title="What Scope doesn't do" />

          <ul className="max-w-[760px] border-t border-border">
            {DISCLAIMERS.map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 border-b border-border px-1 py-4"
              >
                <i
                  className="ti ti-point mt-0.5 shrink-0 text-lg text-ink-muted"
                  aria-hidden="true"
                />
                <span className="text-[16px] leading-relaxed text-ink">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 lg:py-[72px]">
        <Container>
          <SectionHeading title="Frequently asked questions" />
          <div className="max-w-[760px]">
            <FaqList items={FAQ_ITEMS} defaultOpen={1} />
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="py-16 lg:py-[72px]">
        <Container>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-[26px] font-normal leading-tight text-ink">
              Ready to see it in action?
            </p>
            <Link
              href="/trending"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Look up a company
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}