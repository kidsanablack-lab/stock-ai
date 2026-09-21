import type { CSSProperties } from "react";

export default function WhyScope() {
  return (
    <div style={{ padding: "48px 24px" }} className="whyscope-wrap">
      <div
        style={{
          textAlign: "center",
          maxWidth: 620,
          margin: "0 auto 48px",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.08 * 12,
            color: "#6b6b68",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Why Scope
        </div>

        <h2
          className="whyscope-title"
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#1a1a18",
            margin: "0 0 10px",
            lineHeight: 1.25,
          }}
        >
          Understand the business, not just the stock.
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "#6b6b68",
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          Scope brings company filings, financial data, and business analysis
          together to make complex companies easier to understand.
        </p>
      </div>

      <div className="whyscope-grid">
        <WhyScopeTile
          bg="#E6F1FB"
          accent="#185FA5"
          icon="ti-building"
          title="Understand the business"
          body="Start with the fundamentals. Scope explains what a company does, how it makes money, where its revenue comes from, and how its different businesses fit together."
        />

        <WhyScopeTile
          bg="#E6F5F1"
          accent="#0F6E56"
          icon="ti-chart-donut"
          title="Go beyond the stock price"
          body="A stock price only shows one number. Scope looks deeper into revenue, growth, profitability, business segments, and the factors that shape the company."
        />

        <WhyScopeTile
          bg="#F5F1E8"
          accent="#9A6700"
          icon="ti-file-text"
          title="Make complex information simple"
          body="Company filings contain a huge amount of information. Scope organizes the important parts into clear sections so you can understand the business without reading everything yourself."
        />

        <WhyScopeTile
          bg="#F1EFFB"
          accent="#7c3aed"
          icon="ti-sparkles"
          title="AI-powered analysis"
          body="Scope uses AI to help identify important strengths, risks, changes, and patterns across the business, turning large amounts of information into insights that are easier to follow."
        />
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#8a8a86",
          margin: "28px auto 0",
          lineHeight: 1.5,
        }}
      >
        Built for understanding, not investment advice.
      </p>
    </div>
  );
}

function WhyScopeTile({
  bg,
  accent,
  icon,
  title,
  body,
}: {
  bg: string;
  accent: string;
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div style={{ ...tileStyle, background: bg }}>
      <div style={{ ...iconBadgeStyle, background: accent }}>
        <i
          className={`ti ${icon}`}
          style={{ fontSize: 24, color: "#ffffff" }}
        />
      </div>

      <h3 style={{ ...tileTitleStyle, color: accent }}>{title}</h3>

      <p style={{ ...tileBodyStyle, color: accent }}>{body}</p>

      <i
        className={`ti ${icon}`}
        style={{ ...watermarkIconStyle, color: accent }}
        aria-hidden="true"
      />
    </div>
  );
}

const tileStyle: CSSProperties = {
  position: "relative",
  borderRadius: 18,
  padding: 26,
  overflow: "hidden",
  minHeight: 300,
  minWidth: 0,
};

const iconBadgeStyle: CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 38,
};

const tileTitleStyle: CSSProperties = {
  fontSize: 19,
  fontWeight: 700,
  margin: "0 0 10px",
  lineHeight: 1.35,
  position: "relative",
  zIndex: 1,
};

const tileBodyStyle: CSSProperties = {
  fontSize: 13.5,
  opacity: 0.85,
  lineHeight: 1.65,
  margin: 0,
  position: "relative",
  zIndex: 1,
};

const watermarkIconStyle: CSSProperties = {
  position: "absolute",
  bottom: -22,
  right: -22,
  fontSize: 150,
  opacity: 0.12,
};