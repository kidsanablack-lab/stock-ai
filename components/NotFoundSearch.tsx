"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import type { CompanySearchItem } from "@/lib/company-search";

type NotFoundSearchProps = {
  companies: CompanySearchItem[];
};

export default function NotFoundSearch({
  companies,
}: NotFoundSearchProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return companies
      .filter((company) =>
        company.aliases.some((alias) => alias.includes(q)),
      )
      .slice(0, 6);
  }, [query, companies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToCompany = (slug: string) => {
    setShowDropdown(false);
    setHighlightedIndex(-1);
    setQuery("");

    router.push(`/company/${slug}`);
  };

  const handleSearch = () => {
    const normalizedQuery = query
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (!normalizedQuery) return;

    // Selected suggestion
    if (
      highlightedIndex >= 0 &&
      suggestions[highlightedIndex]
    ) {
      goToCompany(suggestions[highlightedIndex].slug);
      return;
    }

    // Exact match
    const exactMatch = companies.find((company) =>
      company.aliases.includes(normalizedQuery),
    );

    if (exactMatch) {
      goToCompany(exactMatch.slug);
      return;
    }

    // First suggestion
    if (suggestions.length > 0) {
      goToCompany(suggestions[0].slug);
      return;
    }

    // Nothing found
    alert("Company not found");
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (suggestions.length === 0) return;

      setShowDropdown(true);

      setHighlightedIndex((previous) =>
        Math.min(
          previous + 1,
          suggestions.length - 1,
        ),
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((previous) =>
        Math.max(previous - 1, -1),
      );

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
      return;
    }

    if (event.key === "Escape") {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div
      ref={searchBoxRef}
      style={{
        display: "flex",
        gap: 10,
        maxWidth: 420,
        margin: "0 auto 28px",
      }}
    >
      {/* Search input + dropdown */}
      <div
        style={{
          position: "relative",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#ffffff",
            border: "0.5px solid #e5e5e2",
            borderRadius: 10,
            padding: "0 14px",
            height: 46,
          }}
        >
          <i
            className="ti ti-search"
            style={{
              fontSize: 16,
              color: "#9a9a96",
              flexShrink: 0,
            }}
          />

          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowDropdown(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => {
              if (query.trim()) {
                setShowDropdown(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search a company or ticker"
            autoComplete="off"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 13,
              color: "#1a1a18",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Suggestions dropdown */}
        {showDropdown && query.trim() && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              background: "#ffffff",
              border: "0.5px solid #e5e5e2",
              borderRadius: 10,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              zIndex: 20,
              textAlign: "left",
            }}
          >
            {suggestions.length > 0 ? (
              suggestions.map((company, index) => (
                <button
                  key={company.slug}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    goToCompany(company.slug);
                  }}
                  onMouseEnter={() =>
                    setHighlightedIndex(index)
                  }
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "10px 12px",
                    border: "none",
                    background:
                      highlightedIndex === index
                        ? "#f7f7f5"
                        : "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1a1a18",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {company.name}
                    </span>

                    <span
                      style={{
                        fontSize: 11,
                        color: "#9a9a96",
                        marginTop: 2,
                      }}
                    >
                      {company.ticker}
                    </span>
                  </span>

                  <i
                    className="ti ti-arrow-up-right"
                    style={{
                      fontSize: 14,
                      color: "#9a9a96",
                      flexShrink: 0,
                    }}
                  />
                </button>
              ))
            ) : (
              <div
                style={{
                  padding: "12px 14px",
                  fontSize: 12,
                  color: "#9a9a96",
                }}
              >
                No companies found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search button */}
      <button
        type="button"
        onClick={handleSearch}
        style={{
          background: "#2F4A32",
          color: "#ffffff",
          border: "none",
          borderRadius: 10,
          padding: "0 20px",
          height: 46,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Search
      </button>
    </div>
  );
}