"use client";

import { useRouter } from "next/navigation";
import type { CompanyProfile } from "@/types/company";

type ShowcaseProfile = {
  slug: string;
  company: CompanyProfile;
};

type CompanyShowcaseProps = {
  profiles: ShowcaseProfile[];
};

function formatFinancialValue(value: {
  value: number;
  unit: "B" | "M" | "T";
}) {
  return `$${value.value}${value.unit}`;
}

function formatGrowth(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function buildDashArray(
  segments: CompanyProfile["businessSegments"]["segments"],
) {
  let offset = 0;

  return segments.map((segment) => {
    const entry = {
      ...segment,
      dasharray: `${segment.percentage} 100`,
      dashoffset: -offset,
    };

    offset += segment.percentage;

    return entry;
  });
}

export default function CompanyShowcase({
  profiles,
}: CompanyShowcaseProps) {
  const router = useRouter();

  const showcaseSlugs = [
    "nvidia",
    "apple",
    "microsoft",
    "amazon",
  ];

  const showcaseCompanies = showcaseSlugs
    .map((slug) =>
      profiles.find((profile) => profile.slug === slug),
    )
    .filter(
      (profile): profile is ShowcaseProfile =>
        Boolean(profile),
    );

  return (
    <div className="section-block">
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#1a1a18",
          margin: "0 0 4px",
        }}
      >
        See how companies make money
      </h2>

      <p
        style={{
          fontSize: 13,
          color: "#6b6b68",
          margin: "0 0 16px",
        }}
      >
        Four companies. One simple way to understand the business behind them.
      </p>

      <div className="showcase-grid">
        {showcaseCompanies.map((profile) => {
          const company = profile.company;
          const arcs = buildDashArray(
            company.businessSegments.segments,
          );

          const score = company.scopeScore.score;

          const scoreColor =
            score >= 9
              ? "#EA8C00"
              : score >= 7.5
                ? "#3B82F6"
                : "#6B7280";

          const scoreBackground =
            score >= 9
              ? "#fff1df"
              : score >= 7.5
                ? "#eff6ff"
                : "#f3f4f6";

          return (
            <div
              key={profile.slug}
              className="showcase-card"
              onClick={() =>
                router.push(
                  `/company/${profile.slug}?from=home`,
                )
              }
              style={{
                background: "#ffffff",
                border: "0.5px solid #e5e5e2",
                borderRadius: 12,
                padding: 16,
                cursor: "pointer",
                minWidth: 0,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={company.identity.logo}
                    alt={company.identity.name}
                    style={{
                      width: 28,
                      height: 28,
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1a1a18",
                      }}
                    >
                      {company.identity.name}
                    </span>

                    <span
                      style={{
                        fontSize: 11,
                        color: "#6b6b68",
                        background: "#f7f7f5",
                        borderRadius: 6,
                        padding: "1px 6px",
                      }}
                    >
                      {company.identity.ticker}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "#9a9a96",
                      marginTop: 1,
                    }}
                  >
                    {company.identity.industry}
                  </div>
                </div>

                {/* Score badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: scoreBackground,
                    borderRadius: 999,
                    padding: "3px 8px 3px 3px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: scoreColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {score.toFixed(1)}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: scoreColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {company.scopeScore.label}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    background: "#f7f7f5",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#6b6b68",
                      marginBottom: 2,
                    }}
                  >
                    Mkt cap
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1a1a18",
                    }}
                  >
                    {formatFinancialValue(
                      company.overview.marketCap,
                    )}
                  </div>
                </div>

                <div
                  style={{
                    background: "#f7f7f5",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#6b6b68",
                      marginBottom: 2,
                    }}
                  >
                    Revenue
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1a1a18",
                    }}
                  >
                    {formatFinancialValue(
                      company.overview.revenue,
                    )}
                  </div>
                </div>

                <div
                  style={{
                    background: "#f7f7f5",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#6b6b68",
                      marginBottom: 2,
                    }}
                  >
                    Growth
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <i
                      className="ti ti-arrow-up-right"
                      style={{ fontSize: 12 }}
                    />

                    {formatGrowth(
                      company.overview.revenueYoY.value,
                    )}
                  </div>
                </div>
              </div>

              {/* Segments */}
              <div
                style={{
                  borderTop: "0.5px solid #eeeeea",
                  borderBottom: "0.5px solid #eeeeea",
                  padding: "14px 0",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 42 42"
                  style={{ flexShrink: 0 }}
                >
                  {arcs.map((arc) => (
                    <circle
                      key={arc.name}
                      r="15.9"
                      cx="21"
                      cy="21"
                      fill="transparent"
                      stroke={arc.color}
                      strokeWidth="6"
                      strokeDasharray={arc.dasharray}
                      strokeDashoffset={arc.dashoffset}
                    />
                  ))}
                </svg>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    minWidth: 0,
                  }}
                >
                  {company.businessSegments.segments.map(
                    (segment) => (
                      <div
                        key={segment.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 11,
                          color: "#4a4a46",
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: segment.color,
                            flexShrink: 0,
                          }}
                        />

                        <span
  style={{
    minWidth: 0,
    lineHeight: 1.4,
    overflowWrap: "break-word",
  }}
>
  {segment.name} — {segment.percentage}%
</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Insight */}
              <div
                style={{
                  display: "flex",
                  gap: 9,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#f7f7f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="ti ti-bulb"
                    style={{
                      fontSize: 15,
                      color: "#f59e0b",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "#3a3a36",
                  }}
                >
                  {company.businessSegments.insight}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}