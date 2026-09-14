"use client";

import { useRouter } from "next/navigation";

type WallCompany = {
  slug: string;
  label: string;
  logoSrc?: string;
};

const WALL_COMPANIES: WallCompany[] = [
  { slug: "apple", label: "A", logoSrc: "/logos/apple-logo-svgrepo-com.svg" },
  { slug: "microsoft", label: "M", logoSrc: "/logos/microsoft-svgrepo-com.svg" },
  { slug: "google", label: "G", logoSrc: "/logos/google-svgrepo-com.svg" },
  { slug: "nvidia", label: "N", logoSrc: "/logos/nvidia-svgrepo-com.svg" },
  { slug: "meta", label: "FB", logoSrc: "/logos/meta-svgrepo-com.svg" },
  { slug: "amazon", label: "AM", logoSrc: "/logos/amazon-svgrepo-com.svg" },
  { slug: "tesla", label: "T" },
  { slug: "jpmorgan", label: "J" },
  { slug: "netflix", label: "NF" },
  { slug: "visa", label: "V" },
  { slug: "disney", label: "D" },
  { slug: "coca-cola", label: "KO" },
  { slug: "nike", label: "NK" },
  { slug: "pfizer", label: "PF" },
  { slug: "exxonmobil", label: "XOM" },
  { slug: "boeing", label: "BA" },
  { slug: "starbucks", label: "SB" },
];

export default function ClosingSection() {
  const router = useRouter();

  return (
    <div style={{ background: "#FAFAF7", borderRadius: 20, padding: "56px 32px" }}>
      <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
        <p
          style={{
            fontSize: 21,
            fontStyle: "italic",
            lineHeight: 1.55,
            color: "#2A2E24",
            margin: "0 0 14px",
            fontWeight: 400,
          }}
        >
          &ldquo;The stock price is the least interesting thing about a company. How it makes
          money, why it&apos;s growing, what could go wrong — that&apos;s where the real story
          lives.&rdquo;
        </p>
        <div style={{ fontSize: 12, color: "#9a9a96", letterSpacing: 0.5 }}>— THE SCOPE TEAM</div>
      </div>

      <div className="logo-wall-grid" style={{ maxWidth: 620, margin: "0 auto" }}>
        {WALL_COMPANIES.map((company) => (
          <div
            key={company.slug}
            className="logo-badge"
            onClick={() => router.push(`/company/${company.slug}`)}
            style={{
              aspectRatio: "1",
              borderRadius: 10,
              background: "#1a1a18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {company.logoSrc ? (
              <img
                src={company.logoSrc}
                alt={company.slug}
                style={{ width: "55%", height: "55%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            ) : (
              <span style={{ color: "#ffffff", fontSize: 13, fontWeight: 600 }}>{company.label}</span>
            )}
          </div>
        ))}

        <div
          onClick={() => router.push("/trending")}
          style={{
            aspectRatio: "1",
            borderRadius: 10,
            background: "#f7f7f5",
            border: "1px dashed #d7d7d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#9a9a96", fontSize: 11, fontWeight: 600 }}>+500</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 22, fontSize: 12, color: "#9a9a96" }}>
        Click any company to start exploring
      </div>
    </div>
  );
}