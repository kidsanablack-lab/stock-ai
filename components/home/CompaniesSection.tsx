import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { HOME_CATEGORIES, getCategoryKey } from "@/lib/home-categories";
import { pickProfiles, type HomeProfile } from "@/lib/home-data";
import { formatGrowth, formatMoney, toBillions } from "@/lib/home-format";

// Same companies the old Trending section featured, sorted by market cap.
const FEATURED_SLUGS = ["nvidia", "apple", "microsoft", "amazon", "google", "meta"];

const COLUMNS =
  "grid grid-cols-[2fr_1fr_1fr] items-center gap-3 md:grid-cols-[2.2fr_1fr_1fr_1fr_1fr_1.1fr]";

export default function CompaniesSection({
  profiles,
}: {
  profiles: HomeProfile[];
}) {
  const rows = pickProfiles(profiles, FEATURED_SLUGS).sort(
    (a, b) =>
      toBillions(b.company.overview.marketCap) -
      toBillions(a.company.overview.marketCap),
  );

  const counts = profiles.reduce<Record<string, number>>((acc, profile) => {
    const key = getCategoryKey(profile.company.identity.industry);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section id="companies" className="pb-16 pt-6 lg:pb-[72px]">
      <Container>
        <SectionHeading
          title="Start with companies you already know"
          description="See what they do, how they make money, and what matters, explained in minutes."
        />

        <div
          aria-hidden="true"
          className={`${COLUMNS} border-t border-ink px-1 py-2.5 text-[12.5px] text-ink-muted`}
        >
          <span>Company</span>
          <span className="hidden md:block">Industry</span>
          <span className="text-right">Market cap</span>
          <span className="hidden text-right md:block">Revenue</span>
          <span className="text-right">Growth</span>
          <span className="hidden text-right md:block">Scope Score</span>
        </div>

        <ul className="border-t border-border">
          {rows.map(({ slug, company }) => {
            const growth = company.overview.revenueYoY.value;
            const positive = growth >= 0;

            return (
              <li key={slug}>
                <Link
                  href={`/company/${slug}?from=home`}
                  className={`${COLUMNS} border-b border-border px-1 py-4 text-[15px] text-ink transition-colors hover:bg-surface`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-border bg-white">
                      <Image
                        src={company.identity.logo}
                        alt=""
                        width={22}
                        height={22}
                        style={{ width: 22, height: 22, objectFit: "contain" }}
                      />
                    </span>
                    <span className="min-w-0">
                      <b className="block truncate font-semibold leading-tight">
                        {company.identity.name}
                      </b>
                      <small className="text-[12.5px] text-ink-muted">
                        {company.identity.ticker}
                      </small>
                    </span>
                  </span>

                  <span className="hidden md:block">{company.identity.industry}</span>

                  <span className="text-right tabular-nums">
                    <span className="sr-only">Market cap </span>
                    {formatMoney(company.overview.marketCap)}
                  </span>

                  <span className="hidden text-right tabular-nums md:block">
                    <span className="sr-only">Revenue </span>
                    {formatMoney(company.overview.revenue)}
                  </span>

                  <span
                    className={`text-right font-semibold tabular-nums ${
                      positive ? "text-success" : "text-danger"
                    }`}
                  >
                    <span className="sr-only">Growth </span>
                    {formatGrowth(growth)}
                  </span>

                  <span className="hidden justify-end md:flex">
                    <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold">
                      <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-primary text-[11.5px] text-white">
                        {company.scopeScore.score.toFixed(1)}
                      </span>
                      {company.scopeScore.label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px]">
          <b className="font-semibold text-ink">Browse by industry</b>
          {HOME_CATEGORIES.map((category) => (
            <Link
              key={category.key}
              href={`/trending?category=${category.key}`}
              className="text-ink-muted transition-colors hover:text-primary"
            >
              {category.label} ({counts[category.key] ?? 0})
            </Link>
          ))}
          <Link
            href="/trending"
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline hover:underline-offset-4 md:ml-auto"
          >
            View all companies
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
