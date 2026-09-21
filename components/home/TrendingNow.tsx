"use client";

import { useRouter } from "next/navigation";
import type { CompanyProfile } from "@/types/company";

type TrendingProfile = {
  slug: string;
  company: CompanyProfile;
};

type TrendingNowProps = {
  profiles: TrendingProfile[];
};

export default function TrendingNow({
  profiles,
}: TrendingNowProps) {
  const router = useRouter();

  const trendingSlugs = [
    "apple",
    "microsoft",
    "google",
    "nvidia",
    "meta",
    "amazon",
  ];

  const trendingCompanies = trendingSlugs
    .map((slug) =>
      profiles.find((profile) => profile.slug === slug),
    )
    .filter(
      (profile): profile is TrendingProfile =>
        Boolean(profile),
    );

  return (
    <div
      className="section-block"
      style={{ marginTop: 32, marginBottom: 32 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 14,
        }}
      >
        <i
          className="ti ti-flame"
          style={{ fontSize: 15, color: "#c2410c" }}
        />

        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1a1a18",
          }}
        >
          Trending now
        </span>
      </div>

      <div className="trending-grid">
        {trendingCompanies.map((profile) => {
          const company = profile.company;
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
              className="trending-company-card"
              onClick={() =>
                router.push(
                  `/company/${profile.slug}?from=home`,
                )
              }
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 0,
                  }}
                >
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
                      src={company.identity.logo}
                      alt={company.identity.name}
                      style={{
                        width: 26,
                        height: 26,
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1a18",
                      margin: 0,
                    }}
                  >
                    {company.identity.name}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: scoreBackground,
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
                        fontSize: 10,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {score.toFixed(1)}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: scoreColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {company.scopeScore.label}
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
                {company.identity.industry}
              </p>

              <p
                style={{
                  fontSize: 11,
                  color: "#6b6b68",
                  lineHeight: 1.5,
                  margin: "0 0 10px",
                }}
              >
                {company.overview.whatItDoes}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}