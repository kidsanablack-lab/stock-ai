"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Container from "@/components/ui/Container";
import ScopeScore from "@/components/ui/ScopeScore";
import SectionHeading from "@/components/ui/SectionHeading";
import { removeFromWatchlist, useWatchlist } from "@/lib/watchlist";
import { formatGrowth, formatMoney } from "@/lib/home-format";
import type { FinancialValue } from "@/types/company";

/** Only the fields the table shows, so the page sends less data to the browser. */
export type WatchlistRow = {
  slug: string;
  name: string;
  ticker: string;
  logo: string;
  logoInitial: string;
  industry: string;
  marketCap: FinancialValue;
  revenue: FinancialValue;
  growth: number;
  score: number;
  scoreLabel: string;
};

const DESKTOP_COLUMNS =
  "md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.2fr)_1fr_1fr_0.9fr_1.4fr]";

const ROW = `grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 md:gap-3 ${DESKTOP_COLUMNS}`;

function growthTone(growth: number) {
  if (!Number.isFinite(growth)) return "text-ink-muted";
  return growth >= 0 ? "text-success" : "text-danger";
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

export default function WatchlistContent({ rows }: { rows: WatchlistRow[] }) {
  const slugs = useWatchlist();

  const saved = useMemo(() => {
    if (!slugs) return [];

    const bySlug = new Map<string, WatchlistRow>(
      rows.map((row) => [row.slug, row]),
    );

    // Newest first. Slugs that no longer exist are skipped.
    return [...slugs]
      .reverse()
      .map((slug) => bySlug.get(slug))
      .filter((row): row is WatchlistRow => Boolean(row));
  }, [slugs, rows]);

  return (
    <section className="pb-16 pt-10 lg:pb-[72px]">
      <Container>
        <p
          className="mb-3 text-[13px] tabular-nums text-ink-muted"
          aria-live="polite"
        >
          {slugs === null
            ? " "
            : `${saved.length} ${saved.length === 1 ? "company" : "companies"} saved`}
        </p>

        <SectionHeading
          as="h1"
          title={
            <>
              Your <em className="italic text-primary">watchlist</em>
            </>
          }
          description="Companies you saved to follow. Tap the star on any company page to add it here."
        />

        {slugs === null ? (
          <div className="min-h-[240px]" aria-busy="true" />
        ) : saved.length === 0 ? (
          <div className="rounded-[20px] border border-border bg-white px-6 py-14 text-center">
            <i
              className="ti ti-star mb-3 block text-3xl text-ink-muted"
              aria-hidden="true"
            />
            <p className="text-[17px] font-semibold text-ink">
              Your watchlist is empty
            </p>
            <p className="mx-auto mt-1 max-w-[420px] text-[15px] text-ink-muted">
              Open a company and press Watchlist to keep it here.
            </p>
            <Link
              href="/trending"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Browse companies
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="hidden border-t border-ink px-1 py-2.5 text-[12.5px] text-ink-muted md:flex"
            >
              <div className={`${ROW} min-w-0 flex-1`}>
                <span>Company</span>
                <span>Industry</span>
                <span className="text-right">Market cap</span>
                <span className="text-right">Revenue</span>
                <span className="text-right">Growth</span>
                <span className="text-right">Scope Score</span>
              </div>
              <span className="w-11 shrink-0" />
            </div>

            <ul className="border-t border-border">
              {saved.map((row) => {
                const tone = growthTone(row.growth);

                return (
                  <li
                    key={row.slug}
                    className="flex items-stretch border-b border-border transition-colors hover:bg-surface"
                  >
                    <Link
                      href={`/company/${row.slug}?from=watchlist`}
                      className={`${ROW} min-w-0 flex-1 px-1 py-4 text-[15px] text-ink`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-border bg-white">
                          {row.logo ? (
                            <Image
                              src={row.logo}
                              alt=""
                              width={22}
                              height={22}
                              style={{ width: 22, height: 22, objectFit: "contain" }}
                            />
                          ) : (
                            <span className="text-[13px] font-semibold text-ink">
                              {row.logoInitial}
                            </span>
                          )}
                        </span>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <b className="min-w-0 truncate font-semibold leading-tight">
                            {row.name}
                          </b>
                          <small className="shrink-0 text-[12.5px] text-ink-muted">
                            {row.ticker}
                          </small>
                        </span>
                      </span>

                      <span className="hidden md:block">{row.industry}</span>

                      <span className="hidden text-right tabular-nums md:block">
                        <span className="sr-only">Market cap </span>
                        {formatMoney(row.marketCap)}
                      </span>

                      <span className="hidden text-right tabular-nums md:block">
                        <span className="sr-only">Revenue </span>
                        {formatMoney(row.revenue)}
                      </span>

                      <span
                        className={`hidden text-right font-semibold tabular-nums md:block ${tone}`}
                      >
                        <span className="sr-only">Growth </span>
                        {formatGrowth(row.growth)}
                      </span>

                      <span className="flex justify-end">
                        <ScopeScore
                          score={row.score}
                          label={row.scoreLabel}
                          className="shrink-0"
                        />
                      </span>

                      {/* Mobile details */}
                      <span className="col-span-2 md:hidden">
                        <span className="block text-[13px] text-ink-muted">
                          {row.industry}
                        </span>
                        <span className="mt-2.5 grid grid-cols-3 gap-3">
                          <MobileStat label="Market cap">
                            {formatMoney(row.marketCap)}
                          </MobileStat>
                          <MobileStat label="Revenue">
                            {formatMoney(row.revenue)}
                          </MobileStat>
                          <MobileStat label="Growth" className={tone}>
                            {formatGrowth(row.growth)}
                          </MobileStat>
                        </span>
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeFromWatchlist(row.slug)}
                      aria-label={`Remove ${row.name} from watchlist`}
                      className="grid w-11 shrink-0 place-items-center text-ink-muted transition-colors hover:text-primary"
                    >
                      <i className="ti ti-x text-lg" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-[13px] text-ink-muted">
              Your watchlist is saved in this browser only. It will not appear on
              other devices.
            </p>
          </>
        )}
      </Container>
    </section>
  );
}