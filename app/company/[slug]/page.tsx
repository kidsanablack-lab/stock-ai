import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatFinancialValue,
  formatHistoricalValue,
  formatYoY,
  getPercentageTrend,
} from "@/lib/format-financial";
import {
  getCompanySlugs,
  getCompany,
  getOtherCompanyProfiles,
} from "@/lib/company-data";
import type { SnapshotMetric } from "@/types/company";


type CompanyPageParams = { slug: string };
type CompanyBackLink = {
  href: string;
  label: string;
};

export async function generateStaticParams(): Promise<CompanyPageParams[]> {
  const slugs = await getCompanySlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CompanyPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) {
    return { title: "Company not found — Stock AI" };
  }

  return {
    title: `${company.identity.name} (${company.identity.ticker}) — Stock AI`,
    description: `AI-powered company profile for ${company.identity.name}. Key metrics, financial highlights, and investment analysis.`,
  };
}

// Tone → color mapping for the Snapshot bar. This is presentation logic
// (how a "good/neutral/risk" tone is drawn), not company data.
const TONE_COLOR: Record<SnapshotMetric["tone"], string> = {
  good: "#2f9e44",
  neutral: "#a15c00",
  risk: "#b45309",
};

const TONE_BADGE: Record<SnapshotMetric["tone"], { bg: string; color: string }> = {
  good: { bg: "#dcf5e3", color: "#1f6b3a" },
  neutral: { bg: "#fff3d6", color: "#a15c00" },
  risk: { bg: "#ffedd5", color: "#b45309" },
};

function SnapshotRatingDisplay({ metric }: { metric: SnapshotMetric }) {
  const { rating, tone } = metric;

  if (rating.kind === "stars") {
    const stars = "★".repeat(rating.value) + "☆".repeat(rating.outOf - rating.value);
    return (
      <p style={{ margin: "8px 0 0", fontSize: 15, letterSpacing: 1, color: TONE_COLOR[tone] }}>
        {stars}
      </p>
    );
  }

  if (rating.kind === "bars") {
    return (
      <div style={{ display: "flex", gap: 3, marginTop: 10 }}>
        {Array.from({ length: rating.outOf }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 18,
              height: 6,
              borderRadius: 3,
              background: i < rating.value ? TONE_COLOR[tone] : "#e5e5e2",
            }}
          />
        ))}
      </div>
    );
  }

  if (rating.kind === "arrow") {
    return (
      <p style={{ margin: "8px 0 0", fontSize: 15, color: TONE_COLOR[tone] }}>
        <i className="ti ti-arrow-up" style={{ fontSize: 16, verticalAlign: -2 }}></i> {rating.label}
      </p>
    );
  }

  // badge
  const badge = TONE_BADGE[tone];
  return (
    <span
      style={{
        display: "inline-block",
        marginTop: 8,
        fontSize: 12,
        fontWeight: 600,
        color: badge.color,
        background: badge.bg,
        borderRadius: 8,
        padding: "3px 10px",
      }}
    >
      {rating.label}
    </span>
  );
}

export default async function CompanyPage({
  params,
  searchParams,
}: {
  params: Promise<CompanyPageParams>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const company = await getCompany(slug);

  if (!company) {
    notFound();
  }

  const otherCompanies = await getOtherCompanyProfiles(slug);
    const backLinks: Record<string, CompanyBackLink> = {
    home: {
      href: "/",
      label: "Back to home",
    },
    "all-companies": {
  href: "/trending",
  label: "Back to all companies",
},
    trending: {
      href: "/trending",
      label: "Back to trending",
    },
    technology: {
  href: "/trending?category=technology",
  label: "Back to Technology",
},
consumer: {
  href: "/trending?category=consumer",
  label: "Back to Consumer",
},
finance: {
  href: "/trending?category=finance",
  label: "Back to Finance",
},
healthcare: {
  href: "/trending?category=healthcare",
  label: "Back to Healthcare",
},
energy: {
  href: "/trending?category=energy",
  label: "Back to Energy",
},
  };

  const backLink: CompanyBackLink =
    backLinks[from ?? ""] ?? backLinks.home;

  const {
    identity,
    scopeScore,
    overview,
    snapshot,
    thirtySecondSummary,
    businessSegments,
    businessModel,
    strengthsAndRisks,
    financialOverview,
    financialHistory,
    ecosystem,
    competitors,
  } = company;
  const scoreValue = scopeScore.score;

const scoreColor =
  scoreValue >= 9
    ? "#EA8C00"
    : scoreValue >= 7.5
      ? "#3B82F6"
      : "#6B7280";

  // Conic-gradient stops for the segments donut, built from segment percentages.
  let cumulativePercent = 0;
  const donutStops = businessSegments.segments
    .map((seg) => {
      const start = cumulativePercent;
      cumulativePercent += seg.percentage;
      return `${seg.color} ${start}% ${cumulativePercent}%`;
    })
    .join(", ");

  return (
    <div className="min-h-full bg-white text-zinc-900">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:px-10 sm:pt-12">
        <Link
          href={backLink.href}
          className="interactive-link inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.78 4.22a.75.75 0 0 1 0 1.06L8.06 9h7.19a.75.75 0 0 1 0 1.5H8.06l3.72 3.72a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
           {backLink.label}
        </Link>

        {/* ===== COMPANY OVERVIEW CARD ===== */}
        <div className="overview-card">
          <div className="overview-header">
            <div className="overview-company">
              <div
  style={{
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "#ffffff",
    border: "0.5px solid #e5e5e2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}
>
  <img
    src={identity.logo}
    alt={`${identity.name} logo`}
    style={{
      width: 28,
      height: 28,
      objectFit: "contain",
    }}
  />
</div>
              <div style={{ flex: 1, minWidth: 0 }}>
               <div className="overview-title-row">
  <div className="overview-name-pills">
    <span className="overview-company-name">
      {identity.name}
    </span>
    <span className="pill">{identity.ticker}</span>
    <span className="pill">{identity.industry}</span>
  </div>
  {/* Scope Score — compact badge */}
<div
  className="scope-score-badge"
  style={
    {
      "--score-color": scoreColor,
    } as React.CSSProperties
  }
>
  <div
    className="scope-score-badge-circle"
    style={{ background: scoreColor }}
  >
    {scopeScore.score}
  </div>

  <span
    className="scope-score-badge-label"
    style={{ color: scoreColor }}
  >
    {scopeScore.label}
  </span>
</div>
</div>
                <p style={{ fontSize: 14, color: "#6b6b68", margin: "6px 0 0", maxWidth: 420, lineHeight: 1.6 }}>
                  {identity.tagline}
                </p>
              </div>
            </div>

            {/* Full Scope Score card — wide screens only */}
            <div className="scope-score-card">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className="scope-score-title"
                  style={{ fontSize: 20, fontWeight: 700, color: "#1a1a18", lineHeight: 1.2 }}
                >
                  Scope Score
                </div>
                <div className="scope-score-rating" style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 6 }}>
                  <span
  style={{
    color: scoreColor,
    fontWeight: 600,
    fontSize: 14,
  }}
>
  {scopeScore.label}
</span>
                  <span style={{ color: "#d6d6d2", fontSize: 20 }}>|</span>
                  <span style={{ color: "#8b8b88", fontSize: 16 }}>/10</span>
                </div>
              </div>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: scoreColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#fff", fontSize: 24, fontWeight: 700, lineHeight: 1 }}>{scopeScore.score}</span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Snapshot bar */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {snapshot.map((metric) => (
              <div className="snap-box" key={metric.label}>
                <div className="snap-label">
                  <i className={`ti ti-${metric.icon}`} style={{ fontSize: 16 }}></i>
                  {metric.label}
                </div>
                <SnapshotRatingDisplay metric={metric} />
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 10 }}>
            <div className="stat-box" style={{ gridRow: "span 2" }}>
              <p className="stat-label">
                <i className="ti ti-building-store" style={{ fontSize: 16 }}></i>What {identity.name.split(" ")[0]} does
              </p>
              <p style={{ fontSize: 14, color: "#1a1a18", lineHeight: 1.7, margin: 0 }}>{overview.whatItDoes}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">
                <i className="ti ti-calendar" style={{ fontSize: 16 }}></i>Founded
              </p>
              <p className="stat-value">{overview.founded}</p>
              <p className="stat-sub">{overview.headquarters}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">
                <i className="ti ti-user" style={{ fontSize: 16 }}></i>CEO
              </p>
              <p className="stat-value">{overview.ceo}</p>
              <p className="stat-sub">Since {overview.ceoSince}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">
                <i className="ti ti-chart-bar" style={{ fontSize: 16 }}></i>Market cap
              </p>
              <p className="stat-value">{formatFinancialValue(overview.marketCap)}</p>
              <p className="stat-sub">{overview.marketCapRank}</p>
            </div>
            <div className="stat-box">
              <p className="stat-label">
                <i className="ti ti-report-money" style={{ fontSize: 16 }}></i>Revenue ({overview.revenueFiscalYear})
              </p>
              <p className="stat-value">{formatFinancialValue(overview.revenue)}</p>
              <p className="stat-sub" style={{ color: "#2f9e44" }}>{formatYoY(overview.revenueYoY)}</p>
            </div>
          </div>
        </div>

        {/* ===== 30-SECOND SUMMARY CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>30-Second Summary</h2>
            <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>{thirtySecondSummary.subtitle}</p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)",
              borderRadius: 12,
              padding: "28px 32px",
              display: "flex",
              gap: 18,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <i className="ti ti-bulb" style={{ fontSize: 22, color: "#f59e0b" }}></i>
            </div>
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#0f766e",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  margin: "0 0 8px",
                }}
              >
                If you only remember one thing
              </p>
              <p style={{ fontSize: 16, color: "#1a1a18", margin: 0, lineHeight: 1.7 }}>{thirtySecondSummary.content}</p>
            </div>
          </div>
        </div>

        {/* ===== BUSINESS SEGMENTS CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Business Segments</h2>
            <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>
              Where {identity.name.split(" ")[0]}&apos;s {formatFinancialValue(businessSegments.totalRevenue)} {businessSegments.fiscalYearLabel} comes from
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: 280, height: 280, flexShrink: 0 }}>
              <div
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: `conic-gradient(${donutStops})`,
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18", margin: 0 }}>{formatFinancialValue(businessSegments.totalRevenue)}</p>
                <p style={{ fontSize: 13, color: "#6b6b68", margin: "2px 0 0" }}>{businessSegments.fiscalYearLabel}</p>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column" }}>
              {businessSegments.segments.map((seg, i) => (
                <div key={seg.name}>
                  <div style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: seg.color, display: "inline-block" }}></span>
                        {seg.name}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>{formatFinancialValue(seg.amount)}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0 18px" }}>
                      {seg.percentage}% of revenue · 
                      <span
                        style={{
                          color:
                           getPercentageTrend(seg.yoyChange) === "up"
                              ? "#2f9e44"
                               : "#dc2626",
                        }}
                        >
                      {formatYoY(seg.yoyChange)}
                     </span>
                    </p>
                  </div>
                  {i < businessSegments.segments.length - 1 && <div style={{ borderTop: "0.5px solid #e5e5e2" }}></div>}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#f7f7f5",
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
            </div>
            <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>{businessSegments.insight}</p>
          </div>

          <p style={{ fontSize: 11, color: "#9a9a96", margin: "12px 0 0" }}>{businessSegments.footnote}</p>
        </div>

        {/* ===== BUSINESS MODEL CARD ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>
  <div style={{ marginBottom: 20 }}>
    <h2
      style={{
        fontSize: 18,
        fontWeight: 600,
        color: "#1a1a18",
        margin: "0 0 4px",
      }}
    >
      Business Model
    </h2>

    <p
      style={{
        fontSize: 13,
        color: "#6b6b68",
        margin: 0,
      }}
    >
      How {identity.name.split(" ")[0]} makes money — the ecosystem flywheel
    </p>
  </div>

  {/* Business Model Flow */}
  <div
    className={
      businessModel.stages.length > 3
        ? "business-model-flow business-model-many"
        : "business-model-flow"
    }
    style={{
      display: "grid",
      gridTemplateColumns: Array(
        businessModel.stages.length * 2 - 1
      )
        .fill(null)
        .map((_, i) => (i % 2 === 0 ? "1fr" : "44px"))
        .join(" "),
      alignItems: "stretch",
    }}
  >
    {businessModel.stages.map((stage, i) => (
      <Fragment key={stage.title}>

        {/* ===== STAGE CARD ===== */}
        <div
          className="business-model-stage"
          style={{
            background: "#ffffff",
            border: "0.5px solid #e5e5e2",
            borderTop: `3px solid ${stage.color}`,
            borderRadius: 12,
            padding: "22px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            className="business-model-stage-icon"
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: stage.backgroundTint,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <i
              className={`ti ti-${stage.icon}`}
              style={{
                fontSize: 24,
                color: stage.color,
              }}
            />
          </div>

          {/* Title */}
          <p
            className="business-model-stage-title"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#1a1a18",
              margin: "14px 0 12px",
            }}
          >
            {stage.title}
          </p>

          {/* Tags */}
          <div
            className="business-model-stage-tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "center",
            }}
          >
            {stage.tags.map((tag) => (
              <span
                key={tag.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: stage.backgroundTint,
                  color: stage.tagTextColor,
                  fontSize: 11,
                  fontWeight: 500,
                  borderRadius: 20,
                  padding: "5px 10px",
                }}
              >
                <i
                  className={`ti ti-${tag.icon}`}
                  style={{ fontSize: 13 }}
                />
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* ===== ARROW ===== */}
        {i < businessModel.stages.length - 1 && (
          <div
            className="business-model-arrow"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#ffffff",
                border: "2px solid #e5e5e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <i
                className="ti ti-arrow-right business-model-arrow-icon"
                style={{
                  fontSize: 18,
                  color: "#6b6b68",
                }}
              />
            </div>
          </div>
        )}
      </Fragment>
    ))}
  </div>

  {/* ===== REPEAT NOTE ===== */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 18,
      color: "#9a9a96",
      fontSize: 12,
    }}
  >
    <i
      className="ti ti-repeat"
      style={{ fontSize: 15 }}
    />
    {businessModel.repeatNote}
  </div>

  {/* ===== INSIGHT ===== */}
  <div
    style={{
      background: "#f7f7f5",
      borderRadius: 12,
      padding: "16px 20px",
      marginTop: 16,
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
    }}
  >
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "#fef3c7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <i
        className="ti ti-bulb"
        style={{
          fontSize: 16,
          color: "#b45309",
        }}
      />
    </div>

    <p
      style={{
        fontSize: 13,
        color: "#1a1a18",
        margin: 0,
        lineHeight: 1.6,
        paddingTop: 4,
      }}
    >
      {businessModel.insight}
    </p>
  </div>
</div>

        {/* ===== STRENGTHS & RISKS CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Strengths &amp; Risks</h2>
            <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>
              What makes {identity.name.split(" ")[0]} strong — and what could go wrong
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Competitive Advantages */}
            <div style={{ background: "#f0faf3", border: "0.5px solid #cdebd6", borderRadius: 12, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#dcf5e3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-shield-check" style={{ fontSize: 16, color: "#2f9e44" }}></i>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#1f6b3a" }}>Competitive Advantages</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {strengthsAndRisks.strengths.map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <i className={`ti ti-${item.icon}`} style={{ fontSize: 16, color: "#2f9e44", marginTop: 2, flexShrink: 0 }}></i>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>{item.title}</p>
                      <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div style={{ background: "#fdf3f2", border: "0.5px solid #f3d4d1", borderRadius: 12, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fbe2df", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-alert-triangle" style={{ fontSize: 16, color: "#c0392b" }}></i>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#a13327" }}>Risks</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {strengthsAndRisks.risks.map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <i className={`ti ti-${item.icon}`} style={{ fontSize: 16, color: "#c0392b", marginTop: 2, flexShrink: 0 }}></i>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>{item.title}</p>
                      <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== FINANCIAL OVERVIEW CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Financial Overview</h2>
            <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>{financialOverview.fiscalYearLabel}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {financialOverview.metrics.map((metric) => (
              <div key={metric.label} style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b6b68", fontSize: 13 }}>
                  <i className={`ti ti-${metric.icon}`} style={{ fontSize: 18 }}></i>
                  {metric.label}
                </div>
                <p style={{ fontSize: 28, fontWeight: 600, color: "#1a1a18", margin: "10px 0 4px" }}>{formatFinancialValue(metric.value)}</p>
                <p
                  style={{
                    fontSize: 13,
                    color:
                      getPercentageTrend(metric.change) === "up"
                      ? "#2f9e44"
                      : "#dc2626",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <i
                  className={`ti ti-arrow-${getPercentageTrend(metric.change)}`}
                     style={{ fontSize: 14 }}></i>
                  {formatYoY(metric.change)}
                </p>
                <p style={{ fontSize: 11, color: "#9a9a96", margin: "6px 0 0" }}>{metric.sublabel}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#fffbeb", borderRadius: 12, padding: "14px 18px", marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <i className="ti ti-info-circle" style={{ fontSize: 18, color: "#b45309", flexShrink: 0 }}></i>
            <p style={{ fontSize: 13, color: "#78350f", margin: 0, lineHeight: 1.5 }}>{financialOverview.insight}</p>
          </div>
        </div>

        {/* ===== FINANCIAL HISTORY CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Financial History</h2>
            <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>{financialHistory.rangeLabel}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {financialHistory.panels.map((panel) => {
              const maxValue = Math.max(...panel.values);
              return (
                <div key={panel.label} style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b6b68", fontSize: 12, marginBottom: 14 }}>
                    <i className={`ti ti-${panel.icon}`} style={{ fontSize: 15, color: panel.color }}></i>
                    {panel.label}
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 100, gap: 6 }}>
                    {panel.values.map((value, i) => {
                      const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
                      return (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
                          <div
                            style={{
                              background: i === panel.values.length - 1 ? panel.highlightColor : panel.color,
                              width: "100%",
                              borderRadius: "3px 3px 0 0",
                              height: `${heightPercent}%`,
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    {panel.years.map((year) => (
                      <span key={year} style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>{year}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18", margin: "12px 0 0" }}>{formatHistoricalValue(panel.values[panel.values.length - 1],panel.unit,)}</p>
                  <p style={{fontSize: 11, color: panel.values[panel.values.length - 1] >= panel.values[panel.values.length - 2]? "#2f9e44": "#dc2626", margin: "2px 0 0", }}> {panel.changeNote} </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== BUSINESS ECOSYSTEM CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Business Ecosystem</h2>
            <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>
              Who {identity.name.split(" ")[0]} depends on — and who depends on {identity.name.split(" ")[0]}
            </p>
          </div>

          <div className="ecosystem-flow" style={{ display: "grid", alignItems: "center" }}>
            {/* Partners column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ecosystem.partners.map((partner) => (
                <div
                  key={partner.name}
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #e5e5e2",
                    borderTop: `3px solid ${partner.color}`,
                    borderRadius: 12,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: partner.backgroundTint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`ti ti-${partner.icon}`} style={{ fontSize: 18, color: partner.color }}></i>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>{partner.name}</p>
                    <p style={{ fontSize: 11, color: "#6b6b68", margin: "2px 0 0" }}>{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow in */}
            <div className="ecosystem-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffffff", border: "2px solid #e5e5e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ti ti-arrow-right" style={{ fontSize: 16, color: "#6b6b68" }}></i>
              </div>
            </div>

            {/* Company center */}
            <div
              className="ecosystem-apple"
              style={{
                background: "#1a1a18",
                borderRadius: 16,
                padding: "28px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#1a1a18" }}>{identity.logoInitial}</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", margin: "14px 0 2px" }}>{ecosystem.centerLabel}</p>
              <p style={{ fontSize: 11, color: "#ffffff", opacity: 0.6, margin: 0 }}>{ecosystem.centerSublabel}</p>
            </div>

            {/* Arrow out */}
            <div className="ecosystem-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffffff", border: "2px solid #e5e5e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ti ti-arrow-right" style={{ fontSize: 16, color: "#6b6b68" }}></i>
              </div>
            </div>

            {/* Output */}
            <div
              className="ecosystem-developers"
              style={{
                background: "#ffffff",
                border: "0.5px solid #e5e5e2",
                borderTop: `3px solid ${ecosystem.output.color}`,
                borderRadius: 12,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: ecosystem.output.backgroundTint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className={`ti ti-${ecosystem.output.icon}`} style={{ fontSize: 20, color: ecosystem.output.color }}></i>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: "10px 0 4px" }}>{ecosystem.output.name}</p>
              <p style={{ fontSize: 11, color: "#6b6b68", margin: 0, lineHeight: 1.5 }}>{ecosystem.output.description}</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 4px" }}>
            <span style={{ fontSize: 11, color: "#9a9a96" }}>{ecosystem.flowInLabel}</span>
            <span style={{ fontSize: 11, color: "#9a9a96" }}>{ecosystem.flowOutLabel}</span>
          </div>

          <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "14px 18px", marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
            </div>
            <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>{ecosystem.insight}</p>
          </div>
        </div>

        {/* ===== COMPETITORS CARD ===== */}
        <div className="overview-card" style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Competitors</h2>
            <p style={{ fontSize: 14, color: "#6b6b68", margin: "6px 0 18px" }}>{competitors.contextNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {competitors.competitors.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "#ffffff",
                  border: "0.5px solid #e5e5e2",
                  borderTop: `3px solid ${c.color}`,
                  borderRadius: 12,
                  padding: 18,
                }}
              >
              <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  }}
>
  {/* Logo */}
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: c.backgroundTint,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <i
      className={`ti ti-${c.icon}`}
      style={{ fontSize: 18, color: c.color }}
    ></i>
  </div>

  {/* Company Name */}
  <p
    style={{
      fontSize: 14,
      fontWeight: 600,
      color: "#1a1a18",
      margin: 0,
    }}
  >
    {c.name}
  </p>
</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: 0 }}>
                         {formatFinancialValue(c.marketCap)}
                </p>
                <div style={{ background: "#f7f7f5", borderRadius: 4, height: 6, width: "100%", margin: "6px 0 12px" }}>
                  <div style={{ background: c.color, height: 6, borderRadius: 4, width: `${c.relativeSize}%` }}></div>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    background: c.backgroundTint,
                    color: c.tagTextColor,
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: 20,
                    padding: "4px 10px",
                  }}
                >
                  {c.tag}
                </span>
                <p style={{ fontSize: 11, color: "#6b6b68", margin: "8px 0 0", lineHeight: 1.5 }}>{c.relationship}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "14px 18px", marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
            </div>
            <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>{competitors.insight}</p>
          </div>
        </div>

        {/* ===== EXPLORE COMPANIES ===== */}
{otherCompanies.length > 0 && (
  <div style={{ marginTop: 32 }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#3b82f6",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1a1a18",
          }}
        >
          Explore Companies
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#9a9a96",
          }}
        >
          {otherCompanies.length} companies
        </span>
      </div>

    </div>

    <div
      className="section-grid"
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      {otherCompanies.slice(0, 4).map(({ slug: otherSlug, company: otherCompany }) => (
        <Link
          key={otherSlug}
          href={`/company/${otherSlug}`}
          className="interactive-link"
          style={{
            display: "block",
            background: "#ffffff",
            border: "0.5px solid #e5e5e2",
            borderTop: "3px solid #1d3557",
            borderRadius: 12,
            padding: 16,
            textDecoration: "none",
          }}
        >
          {/* Company Logo + Name + Score */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  }}
>
  {/* Logo + Company Name */}
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
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#ffffff",
        border: "0.5px solid #e5e5e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <img
        src={otherCompany.identity.logo}
        alt={`${otherCompany.identity.name} logo`}
        style={{
          width: 24,
          height: 24,
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
      {otherCompany.identity.name}
    </p>
  </div>

  {/* Score */}
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      fontSize: 11,
      fontWeight: 600,
      color: "#c2410c",
      background: "#fff3e0",
      borderRadius: 8,
      padding: "2px 7px",
      flexShrink: 0,
    }}
  >
    <i
      className="ti ti-star-filled"
      style={{ fontSize: 11 }}
    />
    {otherCompany.scopeScore.score}
  </span>
</div>

          {/* Description */}
          <p
            style={{
              fontSize: 11,
              color: "#6b6b68",
              lineHeight: 1.5,
              margin: "0 0 10px",
            }}
          >
            {otherCompany.identity.tagline}
          </p>
        </Link>
      ))}
    </div>
  </div>
)}

      </main>
    </div>
  );
}