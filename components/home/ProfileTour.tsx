import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import type { HomeProfile } from "@/lib/home-data";

// The eight parts of every company profile (see types/company.ts).
const PARTS = [
  { icon: "ti-bolt", title: "30-second summary", body: "How the company works, in plain English." },
  { icon: "ti-chart-donut", title: "Business segments", body: "Where the revenue comes from." },
  { icon: "ti-refresh", title: "Business model", body: "How what it does turns into money." },
  { icon: "ti-scale", title: "Strengths and risks", body: "What is working, and what could go wrong." },
  { icon: "ti-chart-bar", title: "Financial overview", body: "The latest year's key numbers." },
  { icon: "ti-timeline", title: "Financial history", body: "How the key numbers have moved over the years." },
  { icon: "ti-affiliate", title: "Ecosystem", body: "The partners and technology around the business." },
  { icon: "ti-users-group", title: "Competitors", body: "Who it competes with, and how big they are." },
];

const SAMPLE_SLUG = "apple";

export default function ProfileTour({ profiles }: { profiles: HomeProfile[] }) {
  const sample = profiles.find((p) => p.slug === SAMPLE_SLUG) ?? profiles[0];
  if (!sample) return null;

  const { company } = sample;
  const stages = (company.businessModel?.stages ?? []).map((s) => s.title);
  const strengths = (company.strengthsAndRisks?.strengths ?? []).slice(0, 3);
  const risks = (company.strengthsAndRisks?.risks ?? []).slice(0, 3);
  const rivals = (company.competitors?.competitors ?? []).slice(0, 5);

  return (
    <section className="bg-surface py-16 lg:py-[72px]">
      <Container>
        <SectionHeading
          title="Inside every company profile"
          description="Eight clear parts, from a 30-second summary to competitors, so you can understand a business without reading the filings."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <ul className="border-t border-border">
              {PARTS.map((part) => (
                <li
                  key={part.title}
                  className="grid grid-cols-[40px_1fr] items-center gap-4 border-b border-border py-3.5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white text-xl text-primary">
                    <i className={`ti ${part.icon}`} aria-hidden="true" />
                  </span>
                  <span>
                    <b className="block text-base font-semibold leading-tight text-ink">
                      {part.title}
                    </b>
                    <span className="mt-0.5 block text-sm text-ink-muted">
                      {part.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <TextLink href={`/company/${sample.slug}?from=home`} className="mt-6">
              See a full company profile
            </TextLink>
          </div>

          <div className="rounded-[20px] border border-border bg-white p-6 shadow-card sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-white">
                <Image
                  src={company.identity.logo}
                  alt=""
                  width={24}
                  height={24}
                  style={{ width: 24, height: 24, objectFit: "contain" }}
                />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-ink-muted">Example</p>
                <h3 className="truncate text-base font-semibold leading-tight text-ink">
                  {company.identity.name}
                </h3>
              </div>
              <Link
                href={`/company/${sample.slug}?from=home`}
                className="ml-auto inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-primary hover:underline hover:underline-offset-4"
              >
                Open
                <i className="ti ti-arrow-up-right" aria-hidden="true" />
              </Link>
            </div>

            {stages.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-[13px] font-semibold text-ink">Business model</p>
                <ol className="flex flex-wrap items-center gap-2">
                  {stages.map((title, index) => (
                    <li key={title} className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-[13.5px] font-medium text-primary-ink">
                        {title}
                      </span>
                      {index < stages.length - 1 && (
                        <i className="ti ti-arrow-right text-ink-muted" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {(strengths.length > 0 || risks.length > 0) && (
              <div className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2.5 text-[13px] font-semibold text-ink">Strengths</p>
                  <ul className="grid gap-2 text-[14.5px] text-ink">
                    {strengths.map((item) => (
                      <li key={item.title} className="flex gap-2">
                        <i className="ti ti-circle-check mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2.5 text-[13px] font-semibold text-ink">Risks</p>
                  <ul className="grid gap-2 text-[14.5px] text-ink">
                    {risks.map((item) => (
                      <li key={item.title} className="flex gap-2">
                        <i className="ti ti-alert-triangle mt-0.5 shrink-0 text-warning" aria-hidden="true" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {rivals.length > 0 && (
              <div className="mt-5 border-t border-border pt-5">
                <p className="mb-2.5 text-[13px] font-semibold text-ink">Competitors</p>
                <ul className="flex flex-wrap gap-2">
                  {rivals.map((rival) => (
                    <li
                      key={rival.name}
                      className="rounded-full border border-border px-3 py-1 text-[13.5px] font-medium text-ink"
                    >
                      {rival.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
