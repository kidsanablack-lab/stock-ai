"use client";

import { toggleWatchlist, useWatchlist } from "@/lib/watchlist";

type WatchlistButtonProps = {
  slug: string;
  className?: string;
};

/** Star toggle that saves or removes a company from the watchlist. */
export default function WatchlistButton({
  slug,
  className = "",
}: WatchlistButtonProps) {
  const slugs = useWatchlist();
  const saved = slugs?.includes(slug) ?? false;

  return (
    <button
      type="button"
      onClick={() => toggleWatchlist(slug)}
      aria-pressed={saved}
      className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors ${
        saved
          ? "border-primary bg-primary-soft text-primary-ink"
          : "border-border bg-white text-ink hover:border-primary hover:text-primary"
      } ${className}`}
    >
      <i
        className={saved ? "ti ti-star-filled" : "ti ti-star"}
        aria-hidden="true"
      />
      Watchlist
    </button>
  );
}