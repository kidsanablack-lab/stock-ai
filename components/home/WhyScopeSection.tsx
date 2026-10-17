import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const REASONS = [
  {
    icon: "ti-building",
    title: "Understand the business",
    body: "Scope explains what a company does, how it makes money, where its revenue comes from, and how its different businesses fit together.",
  },
  {
    icon: "ti-chart-donut",
    title: "Go beyond the stock price",
    body: "A stock price shows one number. Scope looks at revenue, growth, profitability and business segments.",
  },
  {
    icon: "ti-file-text",
    title: "Make complex information simple",
    body: "Filings are organized into clear sections, so you can understand the business without reading everything yourself.",
  },
  {
    icon: "ti-sparkles",
    title: "AI-powered analysis",
    body: "AI helps surface strengths, risks, changes and patterns, turning large amounts of information into insights that are easier to follow.",
  },
];

export default function WhyScopeSection() {
  return (
    <section className="py-16 lg:py-[72px]">
      <Container className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-[72px]">
        <SectionHeading
          title="Understand the business, not just the stock."
          description="Scope brings company filings, financial data and business analysis together, so complex companies are easier to follow."
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
        />

        <div>
          <ul>
            {REASONS.map((reason) => (
              <li
                key={reason.title}
                className="grid grid-cols-[44px_1fr] gap-4 border-t border-border py-[26px] last:border-b"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-[22px] text-primary">
                  <i className={`ti ${reason.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 max-w-[34em] text-[15.5px] leading-relaxed text-ink-muted">
                    {reason.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[13px] text-ink-muted">
            Built for understanding, not investment advice.
          </p>
        </div>
      </Container>
    </section>
  );
}
