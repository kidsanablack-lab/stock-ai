import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import type { CompanyProfile } from "@/types/company";
import "./trending-now.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--bm-serif",
  display: "swap",
});

type TrendingProfile = {
  slug: string;
  company: CompanyProfile;
};

type TrendingNowProps = {
  profiles: TrendingProfile[];
};

// Companies shown as full cards (in this order).
const FEATURED_SLUGS = ["google", "meta", "nvidia", "apple"];

// Companies shown as small chips under the cards.
const ALSO_SLUGS = ["microsoft", "amazon"];

function pickProfiles(profiles: TrendingProfile[], slugs: string[]) {
  return slugs.flatMap((slug) => {
    const profile = profiles.find((p) => p.slug === slug);
    return profile ? [profile] : [];
  });
}

// Same score thresholds as before: >= 9, >= 7.5, everything else.
function getScoreStyle(score: number) {
  if (score >= 9) {
    return { dot: "#EA8C00", bg: "#fff1df", text: "#B96A00" };
  }

  if (score >= 7.5) {
    return { dot: "#3B82F6", bg: "#eff6ff", text: "#2563c9" };
  }

  return { dot: "#6B7280", bg: "#f3f4f6", text: "#4b5563" };
}

export default function TrendingNow({ profiles }: TrendingNowProps) {
  const featured = pickProfiles(profiles, FEATURED_SLUGS);
  const also = pickProfiles(profiles, ALSO_SLUGS);

  return (
    <section className={`tn-section ${fraunces.variable}`}>
      <div className="tn-band">
        <div className="tn-head">
          <div>
            <div className="tn-eyebrow">
              <i className="ti ti-flame" />
              Trending now
            </div>

            <h2 className="tn-title">
              Start with companies you already know
            </h2>

            <p className="tn-lead">
              See what they do, how they make money, and what matters,
              explained in minutes.
            </p>
          </div>

          <Link href="/trending" className="tn-btn tn-btn-desktop">
            All companies
            <i className="ti ti-arrow-right" />
          </Link>
        </div>

        <div className="tn-row">
          {featured.map((profile) => {
            const company = profile.company;
            const score = company.scopeScore.score;
            const scoreStyle = getScoreStyle(score);

            return (
              <Link
                key={profile.slug}
                href={`/company/${profile.slug}?from=home`}
                className="tn-card"
              >
                <div className="tn-card-top">
                  <div className="tn-card-logo">
                    <Image
                      src={company.identity.logo}
                      alt={company.identity.name}
                      width={28}
                      height={28}
                      style={{
                        width: 28,
                        height: 28,
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="tn-card-title">
                    <h3 className="tn-card-name">
                      {company.identity.name}
                    </h3>
                    <span className="tn-card-industry">
                      {company.identity.industry}
                    </span>
                  </div>

                  <div className="tn-card-go">
                    <i className="ti ti-arrow-up-right" />
                  </div>
                </div>

                <p className="tn-card-desc">
                  {company.overview.whatItDoes}
                </p>

                <div className="tn-card-foot">
                  <small>Scope Score</small>

                  <span
                    className="tn-score"
                    style={{ background: scoreStyle.bg }}
                  >
                    <span
                      className="tn-score-dot"
                      style={{ background: scoreStyle.dot }}
                    >
                      {score.toFixed(1)}
                    </span>

                    <span
                      className="tn-score-label"
                      style={{ color: scoreStyle.text }}
                    >
                      {company.scopeScore.label}
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="tn-also">
          <span className="tn-also-label">Also trending</span>

          {also.map((profile) => (
            <Link
              key={profile.slug}
              href={`/company/${profile.slug}?from=home`}
              className="tn-pill"
            >
              <span className="tn-pill-logo">
                <Image
                  src={profile.company.identity.logo}
                  alt=""
                  width={14}
                  height={14}
                  style={{
                    width: 14,
                    height: 14,
                    objectFit: "contain",
                  }}
                />
              </span>
              {profile.company.identity.name}
            </Link>
          ))}

          <Link href="/trending" className="tn-pill is-more">
            Browse all
          </Link>
        </div>

        <Link href="/trending" className="tn-btn tn-btn-mobile">
          All companies
          <i className="ti ti-arrow-right" />
        </Link>
      </div>
    </section>
  );
}