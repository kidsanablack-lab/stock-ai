"use client";

import {
  useState,
  useMemo,
  useRef,
  useEffect,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/home/Hero";
import WhyScope from "@/components/home/WhyScope";
import CompanyShowcase from "@/components/home/CompanyShowcase";
import TrendingNow from "@/components/home/TrendingNow";
import BrowseByCategory from "@/components/home/BrowseByCategory";
import ClosingSection from "@/components/home/ClosingSection";

type CompanySearchItem = {
  slug: string;
  name: string;
  ticker: string;
  aliases: string[];
};

type HomeClientProps = {
  companies: CompanySearchItem[];
};

export default function HomeClient({ companies }: HomeClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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
    <div className="min-h-full bg-white text-zinc-900">
      <main className="mx-auto flex min-h-full max-w-7xl flex-col px-4 pb-24 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div
          className="page-shell"
          style={{
            width: "100%",
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 12px",
            boxSizing: "border-box",
          }}
        >
          <div className="hero-shell">
            <Hero
              query={query}
              setQuery={(val: string) => {
                setQuery(val);
                setShowDropdown(true);
                setHighlightedIndex(-1);
              }}
              handleKeyDown={handleKeyDown}
              suggestions={suggestions}
              showDropdown={showDropdown}
              highlightedIndex={highlightedIndex}
              onSelectCompany={goToCompany}
              onHighlightIndex={setHighlightedIndex}
              onFocusInput={() => setShowDropdown(true)}
              searchBoxRef={searchBoxRef}
            />
          </div>

          <div style={{ paddingTop: 50, paddingBottom: 1 }}>
  <CompanyShowcase />
</div>

          <TrendingNow />
          <div style={{ borderTop: "0.5px solid #e5e5e2", margin: "0" }} />

          <BrowseByCategory />

          <div style={{ paddingTop: 64, paddingBottom: 64 }}>
  <WhyScope />
</div>

          <ClosingSection />
        </div>

        {/* ===== DISCLAIMER ===== */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "0.5px solid #e5e5e2",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 11,
              lineHeight: 1.6,
              color: "#9a9a96",
              margin: 0,
            }}
          >
            For educational purposes only. Not investment advice. Financial
            information is based on publicly reported company data and may
            change over time.
          </p>
        </div>
      </main>

      <style jsx global>{`
        .page-shell {
          animation: fadeUp 0.45s ease both;
        }

        .hero-shell input,
        .hero-shell button,
        .category-pill,
        .section-grid > div {
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background-color 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .hero-shell input:focus-visible {
          box-shadow: 0 0 0 2px rgba(47, 82, 51, 0.14);
          border-color: #2f5233;
        }

        .hero-shell button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(17, 24, 39, 0.08);
        }

        .section-block {
          margin-bottom: 28px;
        }

        .category-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .category-pill {
          border: 1px solid transparent;
          cursor: default;
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 999px;
          padding: 6px 14px;
        }

        .category-pill:hover,
        .category-pill:focus-visible {
          transform: translateY(-1px);
          border-color: #d7d7d2;
          box-shadow: 0 8px 16px rgba(17, 24, 39, 0.05);
        }

        .section-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          min-width: 0;
        }

        .section-grid > div {
          min-width: 0;
        }

        .section-grid > div:hover {
          transform: translateY(-2px);
          border-color: #d7d7d2;
          box-shadow: 0 10px 24px rgba(17, 24, 39, 0.05);
        }

        .section-grid > div:focus-within {
          border-color: #2f5233;
          box-shadow: 0 0 0 2px rgba(47, 82, 51, 0.12);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .section-grid {
            grid-template-columns: repeat(
              auto-fit,
              minmax(200px, 1fr)
            );
          }
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 0 8px;
          }

          .section-block {
            margin-bottom: 24px;
          }

          .section-grid {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }
        }

        @media (max-width: 390px) {
          .section-grid {
            grid-template-columns: 1fr;
          }

          .category-list {
            gap: 6px;
          }
        }

        .autocomplete-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid #e5e5e2;
          border-radius: 12px;
          box-shadow: 0 12px 28px rgba(17, 24, 39, 0.1);
          overflow: hidden;
          z-index: 30;
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