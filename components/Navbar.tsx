"use client";

import { useState, useMemo, useRef, useEffect, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CompanySearchItem = {
  slug: string;
  name: string;
  ticker: string;
  aliases: string[];
};

type NavbarProps = {
  companies: CompanySearchItem[];
};

export default function Navbar({ companies }: NavbarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownRect, setDropdownRect] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return companies
      .filter((c) =>
        c.aliases.some((alias) => alias.includes(q))
      )
      .slice(0, 6);
  }, [query, companies]);

  // คำนวณตำแหน่งของกล่อง search จริงบนหน้าจอ
  // ทุกครั้งที่เปิด dropdown / resize / scroll
  useEffect(() => {
    const updatePosition = () => {
      if (searchBoxRef.current) {
        const rect = searchBoxRef.current.getBoundingClientRect();

        setDropdownRect({
          top: rect.bottom + 6,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    if (showDropdown) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [showDropdown, suggestions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
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
    setQuery("");
    router.push(`/company/${slug}`);
  };

  const handleSearch = (value?: string) => {
    const normalizedQuery = (value ?? query)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (!normalizedQuery) return;

    if (
      highlightedIndex >= 0 &&
      suggestions[highlightedIndex]
    ) {
      goToCompany(suggestions[highlightedIndex].slug);
      return;
    }

    const exactMatch = companies.find((c) =>
      c.aliases.includes(normalizedQuery)
    );

    if (exactMatch) {
      goToCompany(exactMatch.slug);
      return;
    }

    if (suggestions.length > 0) {
      goToCompany(suggestions[0].slug);
      return;
    }

    alert("Company not found");
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((prev) =>
        Math.min(prev + 1, suggestions.length - 1)
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((prev) =>
        Math.max(prev - 1, -1)
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
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 16px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e5e2",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 40 40">
          <circle
            cx="17"
            cy="17"
            r="13"
            fill="none"
            stroke="#1a1a18"
            strokeWidth="3"
          />
          <line
            x1="26.5"
            y1="26.5"
            x2="37"
            y2="37"
            stroke="#1a1a18"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M11 17a6 6 0 0 1 6-6"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a18",
          }}
        >
          Scope
        </span>
      </Link>

      {/* Search */}
      <div
        ref={searchBoxRef}
        className="card-surface"
        style={{
          flex: 1,
          minWidth: 0,
          maxWidth: 480,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#f7f7f5",
          borderRadius: 20,
          padding: "8px 12px",
          marginLeft: "auto",
          marginRight: 8,
          transition:
            "border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
        }}
      >
        <i
          className="ti ti-search"
          style={{
            fontSize: 16,
            color: "#9a9a96",
            flexShrink: 0,
          }}
        ></i>

        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setShowDropdown(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search companies or ticker..."
          style={{
            border: "none",
            outline: "none",
            fontSize: 13,
            color: "#1a1a18",
            width: "100%",
            minWidth: 0,
            background: "transparent",
            padding: "2px 0",
          }}
        />
      </div>

      {/* Nav links */}
      <div
  className="navbar-nav-links"
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginLeft: "auto",
    flexShrink: 0,
  }}
>
        <Link
          href="/trending"
          className="interactive-link"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#1a1a18",
            display: "flex",
            alignItems: "center",
            gap: 5,
            textDecoration: "none",
            padding: "6px 4px",
            transition: "color 180ms ease, transform 180ms ease",
          }}
        >
          <i
            className="ti ti-flame"
            style={{
              fontSize: 15,
              color: "#e76f51",
            }}
          ></i>
          Trending
        </Link>

      </div>

      {/* Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          className="autocomplete-dropdown"
          style={{
            position: "fixed",
            top: dropdownRect.top,
            left: dropdownRect.left,
            width: dropdownRect.width,
          }}
        >
          {suggestions.map((company, index) => (
            <div
              key={company.slug}
              className={`autocomplete-item ${
                index === highlightedIndex
                  ? "is-highlighted"
                  : ""
              }`}
              onMouseDown={() => goToCompany(company.slug)}
              onMouseEnter={() =>
                setHighlightedIndex(index)
              }
            >
              <span className="autocomplete-name">
                {company.name}
              </span>

              <span className="autocomplete-ticker">
                {company.ticker}
              </span>
            </div>
          ))}
        </div>
      )}

      {showDropdown &&
        query.trim() &&
        suggestions.length === 0 && (
          <div
            className="autocomplete-dropdown"
            style={{
              position: "fixed",
              top: dropdownRect.top,
              left: dropdownRect.left,
              width: dropdownRect.width,
            }}
          >
            <div className="autocomplete-empty">
              No companies found
            </div>
          </div>
        )}

      <style jsx global>{`
        .autocomplete-dropdown {
          background: #ffffff;
          border: 1px solid #e5e5e2;
          border-radius: 12px;
          box-shadow: 0 12px 28px rgba(17, 24, 39, 0.1);
          overflow: hidden;
          z-index: 9999;
        }

        .autocomplete-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 14px;
        }

        .autocomplete-item.is-highlighted,
        .autocomplete-item:hover {
          background: #f4f6f4;
        }

        .autocomplete-name {
          font-weight: 600;
          color: #1a1a18;
        }

        .autocomplete-ticker {
          font-size: 11px;
          color: #9a9a96;
          font-weight: 500;
        }

        .autocomplete-empty {
          padding: 12px 16px;
          font-size: 13px;
          color: #9a9a96;
          text-align: center;
        }
      `}</style>
    </div>
  );
}