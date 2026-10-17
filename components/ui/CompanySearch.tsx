"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import type { CompanySearchItem } from "@/lib/company-search";

type CompanySearchProps = {
  companies: CompanySearchItem[];
  variant?: "compact" | "large";
  placeholder?: string;
  /** Adds ?from=<value> to the company URL (the home page uses "home"). */
  from?: string;
  /** Large variant only: label of the submit button. */
  submitLabel?: string;
  className?: string;
};

/**
 * Company search used by the Navbar and the Hero.
 * Matching rules are the same as before: highlighted result, then exact
 * alias match, then the first suggestion. No match shows an inline message
 * instead of alert().
 */
export default function CompanySearch({
  companies,
  variant = "compact",
  placeholder = "Search companies or ticker…",
  from,
  submitLabel,
  className = "",
}: CompanySearchProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return companies
      .filter((c) => c.aliases.some((alias) => alias.includes(q)))
      .slice(0, 6);
  }, [query, companies]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const goToCompany = (slug: string) => {
    setOpen(false);
    setQuery("");
    setActive(-1);
    router.push(
      from ? `/company/${slug}?from=${from}` : `/company/${slug}`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = query.trim().toLowerCase().replace(/\s+/g, " ");
    if (!normalized) return;

    const highlighted = active >= 0 ? suggestions[active] : undefined;
    const exact = companies.find((c) => c.aliases.includes(normalized));
    const target = highlighted ?? exact ?? suggestions[0];

    if (target) {
      goToCompany(target.slug);
    } else {
      setOpen(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((prev) => Math.max(prev - 1, -1));
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const large = variant === "large";
  const showList = open && query.trim().length > 0;
  const activeId =
    showList && active >= 0 && suggestions[active]
      ? `${listId}-option-${active}`
      : undefined;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex items-stretch gap-2"
      >
        <label
          className={`flex min-w-0 flex-1 items-center gap-2.5 border border-border bg-white text-ink transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 ${
            large ? "h-14 rounded-xl px-4" : "h-10 rounded-lg px-3"
          }`}
        >
          <i
            className="ti ti-search shrink-0 text-lg text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="text"
            role="combobox"
            aria-label="Search companies or ticker"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            autoComplete="off"
            value={query}
            placeholder={placeholder}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className={`w-full min-w-0 bg-transparent text-ink outline-none placeholder:text-ink-muted ${
              large ? "text-[15px]" : "text-sm"
            }`}
          />
        </label>

        {large && submitLabel && (
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            {submitLabel}
          </button>
        )}
      </form>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className={`absolute top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-white text-left shadow-card ${
            large
              ? "inset-x-0"
              : "right-0 w-72 max-w-[calc(100vw-2.5rem)]"
          }`}
        >
          {suggestions.length > 0 ? (
            suggestions.map((company, index) => (
              <li
                key={company.slug}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={index === active}
                onMouseDown={(event) => {
                  event.preventDefault();
                  goToCompany(company.slug);
                }}
                onMouseEnter={() => setActive(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm ${
                  index === active ? "bg-surface" : ""
                }`}
              >
                <span className="truncate font-semibold text-ink">
                  {company.name}
                </span>
                <span className="shrink-0 text-xs font-medium text-ink-muted">
                  {company.ticker}
                </span>
              </li>
            ))
          ) : (
            <li
              role="presentation"
              className="px-4 py-3 text-center text-sm text-ink-muted"
            >
              No companies found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
