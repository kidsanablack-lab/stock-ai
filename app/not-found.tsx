import Link from "next/link";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";
import NotFoundSearch from "@/components/NotFoundSearch";

const POPULAR = [
  {
    slug: "apple",
    name: "Apple",
    logoSrc: "/logos/apple-logo-svgrepo-com.svg",
  },
  {
    slug: "nvidia",
    name: "Nvidia",
    logoSrc: "/logos/nvidia-svgrepo-com.svg",
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    logoSrc: "/logos/microsoft-svgrepo-com.svg",
  },
  {
    slug: "google",
    name: "Google",
    logoSrc: "/logos/google-svgrepo-com.svg",
  },
];

export default async function NotFound() {
  const companies = createCompanySearchItems(
    await getAllCompanyProfiles(),
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        padding: "40px 12px 64px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #e5e5e2",
          borderRadius: 16,
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#F1EFE8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <i
            className="ti ti-zoom-question"
            style={{
              fontSize: 26,
              color: "#8A9078",
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1a1a18",
            margin: "0 0 8px",
          }}
        >
          We haven&apos;t scoped that one yet
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "#6b6b68",
            lineHeight: 1.6,
            margin: "0 auto 26px",
            maxWidth: 400,
          }}
        >
          That company isn&apos;t in our database — or the link might be
          broken. Try searching again, or start with one of these.
        </p>

        {/* Search */}
        <NotFoundSearch companies={companies} />

        {/* Popular */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#9a9a96",
            letterSpacing: 0.5,
            marginBottom: 12,
          }}
        >
          POPULAR RIGHT NOW
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {POPULAR.map((company) => (
            <Link
              key={company.slug}
              href={`/company/${company.slug}`}
              className="notfound-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "#f7f7f5",
                borderRadius: 20,
                padding: "7px 14px 7px 8px",
                fontSize: 12,
                fontWeight: 500,
                color: "#1a1a18",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={company.logoSrc}
                  alt={company.name}
                  style={{
                    width: 16,
                    height: 16,
                    objectFit: "contain",
                  }}
                />
              </span>

              {company.name}
            </Link>
          ))}

          {/* Browse all */}
          <Link
            href="/trending"
            className="notfound-chip"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#ffffff",
              border: "0.5px solid #e5e5e2",
              borderRadius: 20,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              color: "#2F4A32",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Browse all

            <i
              className="ti ti-arrow-right"
              style={{
                fontSize: 13,
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}