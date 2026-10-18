"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import ScopeScore from "@/components/ui/ScopeScore";
import SectionHeading from "@/components/ui/SectionHeading";
import { HOME_CATEGORIES, getCategoryKey } from "@/lib/home-categories";
import { formatGrowth, formatMoney, toBillions } from "@/lib/home-format";
import type { CompanyProfile } from "@/types/company";

type CompanyListItem = {
  slug: string;
  company: CompanyProfile;
  category: string;
};

type TrendingContentProps = {
  profiles: Array<{
    slug: string;
    company: CompanyProfile;
  }>;
};

const PAGE_SIZE = 8;

const DESKTOP_COLUMNS =
  "md:grid-cols-[28px_minmax(0,2.4fr)_minmax(0,1.2fr)_1fr_1fr_0.9fr_1.4fr]";

const ROW = `grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 md:gap-3 ${DESKTOP_COLUMNS}`;

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-sm font-medium transition-colors";
const CHIP_IDLE =
  "border-border bg-white text-ink hover:border-primary hover:text-primary";
const CHIP_ACTIVE = "border-primary bg-primary-soft text-primary-ink";

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function growthTone(growth: number) {
  if (!Number.isFinite(growth)) return "text-ink-muted";
  return growth >= 0 ? "text-success" : "text-danger";
}

function CompanyLogo({ company }: { company: CompanyProfile }) {
  const { logo, logoInitial } = company.identity;

  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-border bg-white">
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={22}
          height={22}
          style={{ width: 22, height: 22, objectFit: "contain" }}
        />
      ) : (
        <span className="text-[13px] font-semibold text-ink">
          {logoInitial}
        </span>
      )}
    </span>
  );
}

function MobileStat({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="min-w-0">
      <span className="block text-[12.5px] text-ink-muted">{label}</span>
      <span className={`block text-[15px] font-semibold tabular-nums ${className}`}>
        {children}
      </span>
    </span>
  );
}

export default function TrendingContent({ profiles }: TrendingContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const companies = useMemo<CompanyListItem[]>(() => {
    return profiles
      .map(({ slug, company }) => ({
        slug,
        company,
        category: getCategoryKey(company.identity.industry),
      }))
      .sort(
        (a, b) =>
          toBillions(b.company.overview.marketCap) -
          toBillions(a.company.overview.marketCap),
      );
  }, [profiles]);

  const categoryParam = searchParams.get("category");
  const activeCategory =
    HOME_CATEGORIES.find((category) => category.key === categoryParam)?.key ??
    "all";

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query);

    return companies.filter(({ company, category }) => {
      if (activeCategory !== "all" && category !== activeCategory) {
        return false;
      }

      if (!normalizedQuery) return true;

      return [
        company.identity.name,
        company.identity.brandName,
        company.identity.ticker,
        company.identity.industry,
        company.identity.tagline,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
    });
  }, [companies, activeCategory, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const categoryCounts = useMemo(() => {
    return companies.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [companies]);

  const categoryTotal = HOME_CATEGORIES.filter(
    (category) => (categoryCounts[category.key] ?? 0) > 0,
  ).length;

  const buildCategoryHref = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const queryString = params.toString();
    return queryString ? `/trending?${queryString}` : "/trending";
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleScopeItOut = () => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return;

    const exactMatch = companies.find((item) =>
      [
        item.company.identity.name,
        item.company.identity.brandName,
        item.company.identity.ticker,
        item.slug,
      ]
        .filter((value): value is string => Boolean(value))
        .map((value) => value.toLowerCase())
        .includes(normalizedQuery),
    );

    if (exactMatch) {
      router.push(`/company/${exactMatch.slug}`);
    }
  };

  const fromParam = activeCategory === "all" ? "all-companies" : activeCategory;

  return (
    <section className="pb-16 pt-10 lg:pb-[72px]">
      <Container>
        <p className="mb-3 text-[13px] tabular-nums text-ink-muted">
          {companies.length} companies · {categoryTotal} categories
        </p>

        <SectionHeading
          as="h1"
          title="Explore companies"
          description="Understand what companies do, how they make money, and how their businesses are structured."
        />

        {/* Search */}
        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex-1">
            <i
              className="ti ti-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search company, ticker, or sector..."
              aria-label="Search companies"
              className="h-12 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="button"
            onClick={handleScopeItOut}
            className="hidden h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover md:inline-flex"
          >
            Scope it out
          </button>
        </div>

        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href={buildCategoryHref("all")}
            scroll={false}
            onClick={() => setVisibleCount(PAGE_SIZE)}
            aria-current={activeCategory === "all" ? "true" : undefined}
            className={`${CHIP} ${activeCategory === "all" ? CHIP_ACTIVE : CHIP_IDLE}`}
          >
            All
            <span className="tabular-nums opacity-70">{companies.length}</span>
          </Link>

          {HOME_CATEGORIES.map(({ key, label }) => (
            <Link
              key={key}
              href={buildCategoryHref(key)}
              scroll={false}
              onClick={() => setVisibleCount(PAGE_SIZE)}
              aria-current={activeCategory === key ? "true" : undefined}
              className={`${CHIP} ${activeCategory === key ? CHIP_ACTIVE : CHIP_IDLE}`}
            >
              {label}
              <span className="tabular-nums opacity-70">
                {categoryCounts[key] ?? 0}
              </span>
            </Link>
          ))}
        </div>

        <p
          className="mb-3 text-[13px] tabular-nums text-ink-muted"
          aria-live="polite"
        >
          {filtered.length} {filtered.length === 1 ? "company" : "companies"}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-[20px] border border-border bg-white px-6 py-14 text-center">
            <i
              className="ti ti-search-off mb-3 block text-3xl text-ink-muted"
              aria-hidden="true"
            />
            <p className="text-[17px] font-semibold text-ink">
              No companies found
            </p>
            <p className="mt-1 text-[15px] text-ink-muted">
              Try another company name, ticker, or sector.
            </p>
          </div>
        ) : (
          <>
            <div
              aria-hidden="true"
              className={`hidden ${DESKTOP_COLUMNS} border-t border-ink px-1 py-2.5 text-[12.5px] text-ink-muted md:grid md:items-center md:gap-3`}
            >
              <span>#</span>
              <span>Company</span>
              <span>Industry</span>
              <span className="text-right">Market cap</span>
              <span className="text-right">Revenue</span>
              <span className="text-right">Growth</span>
              <span className="text-right">Scope Score</span>
            </div>

            <ul className="border-t border-border">
              {visible.map(({ slug, company }, index) => {
                const growth = company.overview.revenueYoY.value;
                const tone = growthTone(growth);

                return (
                  <li key={slug}>
                    <Link
                      href={`/company/${slug}?from=${fromParam}`}
                      className={`${ROW} border-b border-border px-1 py-4 text-[15px] text-ink transition-colors hover:bg-surface`}
                    >
                      <span className="hidden text-[13px] tabular-nums text-ink-muted md:block">
                        {index + 1}
                      </span>

                      <span className="flex min-w-0 items-center gap-3">
                        <CompanyLogo company={company} />
                        <span className="min-w-0">
                          <span className="flex min-w-0 items-baseline gap-2">
                            <b className="min-w-0 truncate font-semibold leading-tight">
                              {company.identity.name}
                            </b>
                            <small className="shrink-0 text-[12.5px] text-ink-muted">
                              {company.identity.ticker}
                            </small>
                          </span>
                          {company.identity.tagline && (
                            <span className="mt-0.5 hidden truncate text-[12.5px] text-ink-muted md:block">
                              {company.identity.tagline}
                            </span>
                          )}
                        </span>
                      </span>

                      <span className="hidden md:block">
                        {company.identity.industry}
                      </span>

                      <span className="hidden text-right tabular-nums md:block">
                        <span className="sr-only">Market cap </span>
                        {formatMoney(company.overview.marketCap)}
                      </span>

                      <span className="hidden text-right tabular-nums md:block">
                        <span className="sr-only">Revenue </span>
                        {formatMoney(company.overview.revenue)}
                      </span>

                      <span
                        className={`hidden text-right font-semibold tabular-nums md:block ${tone}`}
                      >
                        <span className="sr-only">Growth </span>
                        {formatGrowth(growth)}
                      </span>

                      <span className="flex justify-end">
                        <ScopeScore
                          score={company.scopeScore.score}
                          label={company.scopeScore.label}
                          className="shrink-0"
                        />
                      </span>

                      {/* Mobile details */}
                      <span className="col-span-2 md:hidden">
                        <span className="block text-[13px] text-ink-muted">
                          {company.identity.industry}
                        </span>
                        <span className="mt-2.5 grid grid-cols-3 gap-3">
                          <MobileStat label="Market cap">
                            {formatMoney(company.overview.marketCap)}
                          </MobileStat>
                          <MobileStat label="Revenue">
                            {formatMoney(company.overview.revenue)}
                          </MobileStat>
                          <MobileStat label="Growth" className={tone}>
                            {formatGrowth(growth)}
                          </MobileStat>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((value) => value + PAGE_SIZE)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Load more
              <i className="ti ti-chevron-down" aria-hidden="true" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}