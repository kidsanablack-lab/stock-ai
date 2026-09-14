"use client";

import { useRouter } from "next/navigation";

type TrendingCompany = {
  slug: string;
  name: string;
  logoSrc: string;
  aiScore: string;
  scoreLabel: string; 
  sector: string;
  description: string;
  tags: string[];
};

const COMPANIES: TrendingCompany[] = [
  {
    slug: "apple",
    name: "Apple",
    logoSrc: "/logos/apple-logo-svgrepo-com.svg",
    aiScore: "9.4",
     scoreLabel: "Excellent",
    sector: "Consumer Electronics",
    description: "Sells hardware tied to a software ecosystem, with growing long-term services revenue.",
    tags: ["Hardware", "Ecosystem"],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    logoSrc: "/logos/microsoft-svgrepo-com.svg",
    aiScore: "9.2",
     scoreLabel: "Excellent",
    sector: "Software & Cloud",
    description: "Provides enterprise software, cloud services, and productivity tools, with Azure as a major growth engine.",
    tags: ["Cloud", "Enterprise"],
  },
  {
    slug: "google",
    name: "Google",
    logoSrc: "/logos/google-svgrepo-com.svg",
    aiScore: "8.9",
     scoreLabel: "Excellent",
    sector: "Internet & Advertising",
    description: "Operates Google Search, YouTube, and other digital platforms, with advertising as its primary revenue source.",
    tags: ["Advertising", "AI"],
  },
  {
    slug: "nvidia",
    name: "Nvidia",
    logoSrc: "/logos/nvidia-svgrepo-com.svg",
    aiScore: "9.6",
     scoreLabel: "Excellent",
    sector: "Semiconductors",
    description: "Designs GPUs and AI computing platforms that power data centers, artificial intelligence, and advanced computing.",
    tags: ["AI Chips", "Data Center"],
  },
  {
    slug: "meta",
    name: "Meta",
    logoSrc: "/logos/meta-color.svg",
    aiScore: "8.7",
     scoreLabel: "Excellent",
    sector: "Social Media & Advertising",
    description: "Runs Facebook, Instagram, and WhatsApp, monetizing billions of users through advertising while investing heavily in AI.",
    tags: ["Social", "AI"],
  },
  {
    slug: "amazon",
    name: "Amazon",
    logoSrc: "/logos/amazon-color-svgrepo-com.svg",
    aiScore: "9.0",
     scoreLabel: "Excellent",
    sector: "E-commerce & Cloud",
    description: "Runs the largest online retail platform globally, with AWS cloud computing driving the majority of its profit.",
    tags: ["E-commerce", "Cloud"],
  },
];

export default function TrendingNow() {
  const router = useRouter();

  return (
    <div className="section-block" style={{ marginTop: 32, marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
        <i className="ti ti-flame" style={{ fontSize: 15, color: "#c2410c" }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18" }}>Trending now</span>
      </div>

      <div className="trending-grid">
        {COMPANIES.map((company) => (
          <div
          key={company.slug}
          className="trending-company-card"
          onClick={() => router.push(`/company/${company.slug}`)}
          style={{
              background: "#ffffff",
              border: "0.5px solid #e5e5e2",
              borderTop: "3px solid #1d3557",
              borderRadius: 12,
              padding: 16,
              cursor: "pointer",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={company.logoSrc}
                    alt={company.name}
                    style={{ width: 26, height: 26, objectFit: "contain" }}
                  />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>
                  {company.name}
                </p>
              </div>

              {/* Score badge */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fff1df",
    borderRadius: 999,
    padding: "2px 6px 2px 2px",
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
        fontSize: 10,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {company.aiScore}
    </span>
  </div>

  <span
    style={{
      fontSize: 10,
      fontWeight: 600,
      color: "#b85c00",
      whiteSpace: "nowrap",
    }}
  >
    {company.scoreLabel}
  </span>
</div>
            </div>

            <p
              style={{
                fontSize: 10,
                color: "#9a9a96",
                textTransform: "uppercase",
                letterSpacing: 0.3,
                margin: "2px 0 8px",
              }}
            >
              {company.sector}
            </p>

            <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>
              {company.description}
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {company.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    background: "#f7f7f5",
                    color: "#6b6b68",
                    borderRadius: 8,
                    padding: "2px 8px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          onClick={() => router.push("/trending")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#24391F",
            border: "0.5px solid #e5e5e2",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          View all companies
          <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />
        </button>
      </div>
    </div>
  );
}