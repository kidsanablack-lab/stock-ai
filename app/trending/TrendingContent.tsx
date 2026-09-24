"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CompanyProfile } from "@/types/company";

type Category =
  | "technology"
  | "consumer"
  | "finance"
  | "healthcare"
  | "energy";

type CompanyListItem = {
  slug: string;
  company: CompanyProfile;
  category: Category;
};

type TrendingContentProps = {
  profiles: Array<{
    slug: string;
    company: CompanyProfile;
  }>;
};

const CATEGORY_META: Record<
  Category,
  {
    label: string;
    bg: string;
    color: string;
    border: string;
  }
> = {
  technology: {
    label: "Technology",
    bg: "#EAF2FA",
    color: "#245B87",
    border: "#D5E5F2",
  },
  consumer: {
    label: "Consumer",
    bg: "#FDF0EA",
    color: "#A44B2C",
    border: "#F3D8CA",
  },
  finance: {
    label: "Finance",
    bg: "#F1EFF7",
    color: "#665A86",
    border: "#E1DDED",
  },
  healthcare: {
    label: "Healthcare",
    bg: "#FBECEF",
    color: "#A04A62",
    border: "#F0D6DE",
  },
  energy: {
    label: "Energy",
    bg: "#FBF3E3",
    color: "#8A641E",
    border: "#EEDDB8",
  },
};

const PAGE_SIZE = 8;

function getCategory(industry: string): Category {
  const value = industry.toLowerCase();

  if (
    value.includes("bank") ||
    value.includes("payment") ||
    value.includes("financial")
  ) {
    return "finance";
  }

  if (
    value.includes("pharma") ||
    value.includes("health") ||
    value.includes("medical")
  ) {
    return "healthcare";
  }

  if (
    value.includes("energy") ||
    value.includes("oil") ||
    value.includes("gas") ||
    value.includes("utility")
  ) {
    return "energy";
  }

  if (
    value.includes("consumer") ||
    value.includes("restaurant") ||
    value.includes("apparel") ||
    value.includes("automotive")
  ) {
    return "consumer";
  }

  return "technology";
}

function formatFinancialValue(
  value: number,
  unit: "B" | "M" | "T",
) {
  return `$${value}${unit}`;
}

export default function TrendingContent({
  profiles,
}: TrendingContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] =
    useState<Category | "all">("all");

  const [query, setQuery] = useState("");

  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const companies = useMemo<CompanyListItem[]>(() => {
    return profiles
      .map(({ slug, company }) => ({
        slug,
        company,
        category: getCategory(
          company.identity.industry,
        ),
      }))
      .sort(
        (a, b) =>
          b.company.overview.marketCap.value -
          a.company.overview.marketCap.value,
      );
  }, [profiles]);

  useEffect(() => {
    const category = searchParams.get("category");

    if (
      category === "technology" ||
      category === "consumer" ||
      category === "finance" ||
      category === "healthcare" ||
      category === "energy"
    ) {
      setActiveCategory(category);
    } else {
      setActiveCategory("all");
    }

    setVisibleCount(PAGE_SIZE);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    return companies.filter(({ company, category }) => {
      const matchesCategory =
        activeCategory === "all" ||
        category === activeCategory;

      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      return [
        company.identity.name,
        company.identity.brandName,
        company.identity.ticker,
        company.identity.industry,
        company.identity.tagline,
      ]
        .filter(Boolean)
        .some((value) =>
          value!.toLowerCase().includes(normalizedQuery),
        );
    });
  }, [companies, activeCategory, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const categoryCounts = useMemo(() => {
    return {
      technology: companies.filter(
        (item) => item.category === "technology",
      ).length,

      consumer: companies.filter(
        (item) => item.category === "consumer",
      ).length,

      finance: companies.filter(
        (item) => item.category === "finance",
      ).length,

      healthcare: companies.filter(
        (item) => item.category === "healthcare",
      ).length,

      energy: companies.filter(
        (item) => item.category === "energy",
      ).length,
    };
  }, [companies]);

  const handleCategoryClick = (
    category: Category | "all",
  ) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        padding: "40px 20px 72px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontSize: 30,
            lineHeight: 1.2,
            fontWeight: 700,
            color: "#1a1a18",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          Explore companies
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#777773",
            margin: "0 0 6px",
            maxWidth: 620,
          }}
        >
          Understand what companies do, how they make money,
          and how their businesses are structured.
        </p>

        <p
          style={{
            fontSize: 12,
            color: "#9a9a96",
            margin: 0,
          }}
        >
          {companies.length} companies ·{" "}
          {
            Object.values(categoryCounts).filter(
              (count) => count > 0,
            ).length
          }{" "}
          categories
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          position: "relative",
          marginBottom: 20,
        }}
      >
        <i
          className="ti ti-search"
          style={{
            position: "absolute",
            left: 15,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 18,
            color: "#9a9a96",
            pointerEvents: "none",
          }}
        />

        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search company, ticker, or sector..."
          aria-label="Search companies"
          style={{
            width: "100%",
            height: 46,
            boxSizing: "border-box",
            padding: "0 16px 0 44px",
            border: "1px solid #e5e5e2",
            borderRadius: 12,
            background: "#ffffff",
            color: "#1a1a18",
            fontSize: 14,
            outline: "none",
          }}
        />
      </div>

      {/* Category filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <button
          type="button"
          onClick={() => handleCategoryClick("all")}
          style={{
            cursor: "pointer",
            fontSize: 12,
            fontWeight:
              activeCategory === "all" ? 600 : 500,
            padding: "7px 14px",
            borderRadius: 20,
            border:
              activeCategory === "all"
                ? "1px solid #1a1a18"
                : "1px solid #e5e5e2",
            background:
              activeCategory === "all"
                ? "#1a1a18"
                : "#ffffff",
            color:
              activeCategory === "all"
                ? "#ffffff"
                : "#6b6b68",
          }}
        >
          All{" "}
          <span
            style={{
              opacity: 0.7,
              marginLeft: 3,
            }}
          >
            {companies.length}
          </span>
        </button>

        {(Object.keys(CATEGORY_META) as Category[]).map(
          (category) => {
            const isActive =
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  handleCategoryClick(category)
                }
                style={{
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 500,
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: `1px solid ${
                    isActive
                      ? CATEGORY_META[category].color
                      : CATEGORY_META[category].border
                  }`,
                  background:
                    CATEGORY_META[category].bg,
                  color:
                    CATEGORY_META[category].color,
                  transition:
                    "border-color 160ms ease, box-shadow 160ms ease",
                  boxShadow: isActive
                    ? `inset 0 0 0 1px ${CATEGORY_META[category].color}`
                    : "none",
                }}
              >
                {CATEGORY_META[category].label}

                <span
                  style={{
                    opacity: 0.65,
                    marginLeft: 4,
                  }}
                >
                  {categoryCounts[category]}
                </span>
              </button>
            );
          },
        )}
      </div>

      {/* Result count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#9a9a96",
          }}
        >
          {filtered.length}{" "}
          {filtered.length === 1
            ? "company"
            : "companies"}
        </span>
      </div>

      {visible.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e2",
            borderRadius: 12,
            padding: "52px 24px",
            textAlign: "center",
          }}
        >
          <i
            className="ti ti-search-off"
            style={{
              display: "block",
              fontSize: 28,
              color: "#b0b0ac",
              marginBottom: 10,
            }}
          />

          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1a1a18",
              margin: "0 0 5px",
            }}
          >
            No companies found
          </p>

          <p
            style={{
              fontSize: 12,
              color: "#9a9a96",
              margin: 0,
            }}
          >
            Try another company name, ticker, or sector.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e2",
            borderRadius: 12,
            padding: "8px 24px",
            marginBottom: 24,
          }}
        >
          {/* Desktop table */}
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <div
              style={{
                minWidth: 720,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "44px minmax(260px, 2fr) minmax(130px, 1fr) 96px 100px 100px",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 0",
                  borderBottom:
                    "1px solid #e5e5e2",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9a96",
                  }}
                >
                  #
                </span>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9a96",
                  }}
                >
                  Company
                </span>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9a96",
                  }}
                >
                  Sector
                </span>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9a96",
                  }}
                >
                  Score
                </span>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9a96",
                  }}
                >
                  Market Cap
                </span>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9a9a96",
                  }}
                >
                  Revenue
                </span>
              </div>

              {/* Rows */}
              {visible.map(
                ({ slug, company }, index) => (
                  <div
                    key={slug}
                    onClick={() =>
                      router.push(
                        `/company/${slug}?from=${
                          activeCategory === "all"
                            ? "all-companies"
                            : activeCategory
                        }`,
                      )
                    }
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "44px minmax(260px, 2fr) minmax(130px, 1fr) 96px 100px 100px",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 0",
                      borderBottom:
                        index === visible.length - 1
                          ? "none"
                          : "1px solid #f0f0ed",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: "#9a9a96",
                      }}
                    >
                      {index + 1}
                    </span>

                    {/* Company */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          flex: "0 0 36px",
                          borderRadius: 9,
                          border: "1px solid #eeeeeb",
                          background: "#fafaf8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {company.identity.logo ? (
                          <img
                            src={company.identity.logo}
                            alt=""
                            style={{
                              width: 23,
                              height: 23,
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#1a1a18",
                            }}
                          >
                            {company.identity.logoInitial}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 7,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 650,
                              color: "#1a1a18",
                            }}
                          >
                            {company.identity.name}
                          </span>

                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#9a9a96",
                            }}
                          >
                            {company.identity.ticker}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                            color: "#777773",
                            marginTop: 3,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {company.identity.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Sector */}
                    <span
                      style={{
                        fontSize: 12,
                        color: "#6b6b68",
                      }}
                    >
                      {company.identity.industry}
                    </span>

                    {/* Score */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        background:
                          "linear-gradient(135deg, #EA8C00, #f59e0b)",
                        color: "#ffffff",
                        borderRadius: 20,
                        padding: "4px 10px 4px 7px",
                        fontSize: 12,
                        fontWeight: 600,
                        width: "fit-content",
                      }}
                    >
                      <i
                        className="ti ti-star-filled"
                        style={{
                          fontSize: 11,
                          color: "#ffffff",
                        }}
                      />
                      {company.scopeScore.score.toFixed(1)}
                    </div>

                    {/* Market cap */}
                    <span
                      style={{
                        fontSize: 13,
                        color: "#1a1a18",
                      }}
                    >
                      {formatFinancialValue(
                        company.overview.marketCap.value,
                        company.overview.marketCap.unit,
                      )}
                    </span>

                    {/* Revenue */}
                    <span
                      style={{
                        fontSize: 13,
                        color: "#1a1a18",
                      }}
                    >
                      {formatFinancialValue(
                        company.overview.revenue.value,
                        company.overview.revenue.unit,
                      )}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setVisibleCount(
                (value) => value + PAGE_SIZE,
              )
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#ffffff",
              border: "1px solid #e5e5e2",
              borderRadius: 10,
              padding: "10px 22px",
              fontSize: 13,
              fontWeight: 600,
              color: "#1a1a18",
              cursor: "pointer",
            }}
          >
            Load more

            <i
              className="ti ti-chevron-down"
              style={{
                fontSize: 14,
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
}