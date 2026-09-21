"use client";

import { useRouter } from "next/navigation";

type PopularCompany = {
  slug: string;
  name: string;
  logoSrc: string;
};

const POPULAR_COMPANIES: PopularCompany[] = [
  { slug: "apple", name: "Apple", logoSrc: "/logos/apple-logo-svgrepo-com.svg" },
  { slug: "microsoft", name: "Microsoft", logoSrc: "/logos/microsoft-svgrepo-com.svg" },
  { slug: "google", name: "Google", logoSrc: "/logos/google-svgrepo-com.svg" },
  { slug: "nvidia", name: "NVIDIA", logoSrc: "/logos/nvidia-svgrepo-com.svg" },
  { slug: "amazon", name: "Amazon", logoSrc: "/logos/amazon-color-svgrepo-com.svg" },
];

export default function ClosingSection() {
  const router = useRouter();

  return (
    <div
      style={{
        background: "#FAFAF7",
        borderRadius: 20,
        padding: "52px 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#6b6b68",
          margin: "0 0 12px",
        }}
      >
        Understand the business
      </p>

      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1.3,
          color: "#1a1a18",
          margin: "0 auto 26px",
          maxWidth: 480,
        }}
      >
        Explore companies through the things that actually matter.
      </h2>

      <button
        onClick={() => router.push("/trending")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#2F4A32",
          color: "#ffffff",
          border: "none",
          borderRadius: 10,
          padding: "12px 22px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 38,
        }}
      >
        Explore all companies
        <i className="ti ti-arrow-right" style={{ fontSize: 16 }} />
      </button>

      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: "#9a9a96",
          margin: "0 0 16px",
        }}
      >
        Popular companies
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {POPULAR_COMPANIES.map((company) => (
          <div
            key={company.slug}
            className="popular-company"
            onClick={() => router.push(`/company/${company.slug}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "#ffffff",
              border: "0.5px solid #e5e5e2",
              borderRadius: 30,
              padding: "8px 15px 8px 12px",
              cursor: "pointer",
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
            }}
          >
            <img
              src={company.logoSrc}
              alt={company.name}
              style={{
                width: 15,
                height: 15,
                objectFit: "contain",
              }}
            />

            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a18",
              }}
            >
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}