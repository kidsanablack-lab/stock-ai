"use client";

import { useRouter } from "next/navigation";

type Segment = { label: string; pct: number; color: string };

type ShowcaseCompany = {
  slug: string;
  name: string;
  ticker: string;
  logoSrc: string;
  sector: string;
  marketCap: string;
  revenue: string;
  growthPct: string;
  aiScore: number;
  segments: Segment[];
  insight: string;
};

const COMPANIES: ShowcaseCompany[] = [
  {
    slug: "nvidia",
    name: "Nvidia",
    ticker: "NVDA",
    logoSrc: "/logos/nvidia-svgrepo-com.svg",
    sector: "Semiconductors",
    marketCap: "$4.6T",
    revenue: "$253.5B",
    growthPct: "+65.5%",
    aiScore: 91,
    segments: [
      { label: "Data center", pct: 92, color: "#1d3557" },
      { label: "Gaming", pct: 6, color: "#2a9d8f" },
      { label: "Pro viz & auto", pct: 2, color: "#e76f51" },
    ],
    insight:
      "Data centers made up 39% of Nvidia's revenue three years ago. Today it's 92% — the whole business has flipped around AI.",
  },
  {
    slug: "apple",
    name: "Apple",
    ticker: "AAPL",
    logoSrc: "/logos/apple-logo-svgrepo-com.svg",
    sector: "Consumer Electronics",
    marketCap: "$4.7T",
    revenue: "$416B",
    growthPct: "+8.0%",
    aiScore: 88,
    segments: [
      { label: "iPhone", pct: 50, color: "#1d3557" },
      { label: "Services", pct: 26, color: "#2a9d8f" },
      { label: "Mac", pct: 8, color: "#e76f51" },
      { label: "Other", pct: 16, color: "#f4a261" },
    ],
    insight:
      "Services now make up over a quarter of Apple's revenue and carry far fatter margins than any device it sells.",
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    ticker: "MSFT",
    logoSrc: "/logos/microsoft-svgrepo-com.svg",
    sector: "Software & Cloud",
    marketCap: "$3.65T",
    revenue: "$281.7B",
    growthPct: "+15.0%",
    aiScore: 89,
    segments: [
      { label: "Productivity", pct: 43, color: "#1d3557" },
      { label: "Intelligent cloud", pct: 38, color: "#2a9d8f" },
      { label: "More personal computing", pct: 19, color: "#e76f51" },
    ],
    insight:
      "Azure and other cloud services now bring in more revenue than Windows and Xbox combined.",
  },
    {
    slug: "amazon",
    name: "Amazon",
    ticker: "AMZN",
    logoSrc: "/logos/amazon-color-svgrepo-com.svg",
    sector: "E-commerce & Cloud",
    marketCap: "$2.4T",
    revenue: "$716.9B",
    growthPct: "+12.4%",
    aiScore: 90,
    segments: [
      { label: "North America", pct: 61, color: "#1d3557" },
      { label: "International", pct: 23, color: "#2a9d8f" },
      { label: "AWS", pct: 16, color: "#e76f51" },
    ],
    insight:
      "Amazon's retail business drives most of its revenue, while AWS generates a much larger share of its operating profit.",
  },
];

function buildDashArray(segments: Segment[]) {
  let offset = 0;
  return segments.map((seg) => {
    const entry = { ...seg, dasharray: `${seg.pct} 100`, dashoffset: -offset };
    offset += seg.pct;
    return entry;
  });
}

export default function CompanyShowcase() {
  const router = useRouter();

  return (
    <div className="section-block">
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>
        See it for yourself
      </h2>
      <p style={{ fontSize: 13, color: "#6b6b68", margin: "0 0 16px" }}>
        Four companies. One simple way to understand how they make money.
      </p>

      <div className="showcase-grid">
        {COMPANIES.map((company) => {
          const arcs = buildDashArray(company.segments);
          return (
            <div
              key={company.slug}
              className="showcase-card"
              onClick={() => router.push(`/company/${company.slug}`)}
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
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
                    src={company.logoSrc}
                    alt={company.name}
                    style={{ width: 28, height: 28, objectFit: "contain" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>
                      {company.name}
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
                      {company.ticker}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9a9a96", marginTop: 1 }}>{company.sector}</div>
                </div>
                {/* Score badge */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#fff1df",
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
      background: "#EA8C00",
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
      {(company.aiScore / 10).toFixed(1)}
    </span>
  </div>

  <span
    style={{
      fontSize: 11,
      fontWeight: 600,
      color: "#b85c00",
      whiteSpace: "nowrap",
    }}
  >
    Excellent
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
                <div style={{ background: "#f7f7f5", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#6b6b68", marginBottom: 2 }}>Mkt cap</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>
                    {company.marketCap}
                  </div>
                </div>
                <div style={{ background: "#f7f7f5", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#6b6b68", marginBottom: 2 }}>Revenue</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>
                    {company.revenue}
                  </div>
                </div>
                <div style={{ background: "#f7f7f5", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#6b6b68", marginBottom: 2 }}>Growth</div>
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
                    <i className="ti ti-arrow-up-right" style={{ fontSize: 12 }} />
                    {company.growthPct}
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
                <svg width="64" height="64" viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                  {arcs.map((arc) => (
                    <circle
                      key={arc.label}
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
                <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
                  {company.segments.map((seg) => (
                    <div
                      key={seg.label}
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
                          background: seg.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {seg.label} — {seg.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insight */}
              <div style={{ display: "flex", gap: 9 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#EEEDFE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className="ti ti-bulb" style={{ fontSize: 12, color: "#534AB7" }} />
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: "#3a3a36" }}>{company.insight}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}