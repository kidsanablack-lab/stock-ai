import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { buildCompareRows, getComparePair, type HomeProfile } from "@/lib/home-data";

export default function CompareFeature({ profiles }: { profiles: HomeProfile[] }) {
  const pair = getComparePair(profiles);
  if (!pair) return null;

  const rows = buildCompareRows(pair);

  const sides = [
    { profile: pair[0], bar: "bg-ink", top: "border-ink", extra: "" },
    { profile: pair[1], bar: "bg-primary", top: "border-primary", extra: "md:border-l md:border-border" },
  ];

  return (
    <section className="py-16 lg:py-[72px]">
      <Container>
        <SectionHeading
          title="Put two companies side by side."
          description="See how businesses differ in scale, growth, profitability and cash generation, using the same numbers from each company profile."
        />

        <div className="overflow-hidden rounded-[22px] border border-border bg-white shadow-card">
          <div className="relative grid md:grid-cols-2">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-white font-serif text-[13px] italic text-ink-muted md:grid"
            >
              vs
            </span>

            {sides.map(({ profile, bar, top, extra }, sideIndex) => {
              const { identity } = profile.company;

              return (
                <div
                  key={profile.slug}
                  className={`border-t-[3px] ${top} ${extra} px-6 pb-8 pt-8 sm:px-9`}
                >
                  <div className="mb-7 flex items-center gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-border bg-white">
                      <Image
                        src={identity.logo}
                        alt=""
                        width={28}
                        height={28}
                        style={{ width: 28, height: 28, objectFit: "contain" }}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-[22px] font-normal leading-tight tracking-[-0.02em] text-ink">
                        {identity.brandName ?? identity.name}
                      </h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                        <span className="rounded-md bg-surface px-2 py-0.5 text-[10px] font-bold tracking-wider text-ink">
                          {identity.ticker}
                        </span>
                        {identity.industry}
                      </p>
                    </div>
                  </div>

                  {rows.map((row) => {
                    const value = sideIndex === 0 ? row.a : row.b;

                    return (
                      <div key={row.label} className="border-t border-border py-[18px]">
                        <span className="block text-[12.5px] text-ink-muted">{row.label}</span>
                        <span className="mt-1 block font-serif text-[clamp(28px,3.2vw,36px)] font-medium leading-tight tracking-[-0.03em] tabular-nums text-ink">
                          {value.text}
                        </span>
                        <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
                          <span
                            className={`block h-full min-w-[3px] rounded-full ${bar}`}
                            style={{ width: `${value.width}%` }}
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 border-t border-border bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <p className="max-w-[460px] text-sm text-ink-muted">
              Pick any two companies and compare revenue, growth, net income and
              free cash flow.
            </p>
            <Link
              href="/compare"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Start comparing
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
