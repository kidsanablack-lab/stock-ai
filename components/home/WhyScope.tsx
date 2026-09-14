import type { CSSProperties } from "react";

export default function WhyScope() {
  return (
    <div style={{ padding: "48px 24px" }} className="whyscope-wrap">
      <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
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
        <h2 className="whyscope-title" style={{ fontSize: 32, fontWeight: 700, color: "#1a1a18", margin: "0 0 10px", lineHeight: 1.25 }}>
          Not another stock ticker site
        </h2>
        <p style={{ fontSize: 15, color: "#6b6b68", margin: 0, lineHeight: 1.6 }}>
          Everywhere else gives you numbers. Scope gives you the business behind them.
        </p>
      </div>

      {/* Row 1 — visual left, text right */}
      <div className="whyscope-row">
        <div className="whyscope-visual" style={visualCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, background: "#F1EFE8", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <i className="ti ti-file-text" style={{ fontSize: 13, color: "#9a9a92" }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: "#9a9a92", letterSpacing: 0.5 }}>
                  10-K FILING
                </span>
              </div>
              {[95, 75, 88, 60, 92, 70].map((w, i, arr) => (
                <div
                  key={i}
                  style={{
                    height: 5,
                    background: "#d3d2c9",
                    borderRadius: 3,
                    marginBottom: i < arr.length - 1 ? 6 : 0,
                    width: `${w}%`,
                  }}
                />
              ))}
            </div>
            <i className="ti ti-arrow-right" style={{ fontSize: 20, color: "#b4b2a9", flexShrink: 0 }} />
            <div style={{ flex: 1, background: "#ffffff", border: "0.5px solid #e5e5e2", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: "#1a1a18", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>Apple</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="44" height="44" viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                  <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#1d3557" strokeWidth="6" strokeDasharray="55 100" />
                  <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#2a9d8f" strokeWidth="6" strokeDasharray="25 100" strokeDashoffset="-55" />
                  <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#e76f51" strokeWidth="6" strokeDasharray="20 100" strokeDashoffset="-80" />
                </svg>
                <div style={{ fontSize: 11, color: "#4a4a46", lineHeight: 1.6 }}>
                  <div>
                    iPhone <b style={{ color: "#1a1a18" }}>52%</b>
                  </div>
                  <div>
                    Services <b style={{ color: "#1a1a18" }}>24%</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="whyscope-text">
          <div style={stepNumberStyle}>01</div>
          <h3 className="whyscope-row-title" style={rowTitleStyle}>
            Understand it in seconds, not hours
          </h3>
          <p style={rowBodyStyle}>
            No more decoding spreadsheets or 200-page filings. Scope turns raw financial data into a
            visual snapshot anyone can read at a glance.
          </p>
        </div>
      </div>

      {/* Row 2 — text left, visual right */}
      <div className="whyscope-row">
        <div className="whyscope-text">
          <div style={stepNumberStyle}>02</div>
          <h3 className="whyscope-row-title" style={rowTitleStyle}>
            The business behind the price
          </h3>
          <p style={rowBodyStyle}>
            A stock price tells you what people paid today. Scope shows you how the company actually
            makes money — and whether that's changing.
          </p>
        </div>
        <div className="whyscope-visual" style={visualCardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 14,
              marginBottom: 16,
              borderBottom: "0.5px dashed #e5e5e2",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: "#b4b2a9", letterSpacing: 0.5 }}>
              STOCK PRICE
            </span>
            <span style={{ fontSize: 12, color: "#b4b2a9" }}>
              $252.29 <span style={{ color: "#9fb89a" }}>+1.2%</span> — that&apos;s about it
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="76" height="76" viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
              <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#1d3557" strokeWidth="6" strokeDasharray="52 100" />
              <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#2a9d8f" strokeWidth="6" strokeDasharray="24 100" strokeDashoffset="-52" />
              <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#e76f51" strokeWidth="6" strokeDasharray="14 100" strokeDashoffset="-76" />
              <circle r="15.9" cx="21" cy="21" fill="transparent" stroke="#f4a261" strokeWidth="6" strokeDasharray="10 100" strokeDashoffset="-90" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <LegendRow color="#1d3557" label="iPhone — 52%" />
              <LegendRow color="#2a9d8f" label="Services — 24%" />
              <LegendRow color="#e76f51" label="Mac — 14%" />
              <LegendRow color="#f4a261" label="Other — 10%" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 — visual left, text right */}
      <div className="whyscope-row" style={{ marginBottom: 0 }}>
        <div className="whyscope-visual" style={visualCardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            {/* Scope Score badge */}
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
      9.1
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
            <span style={{ fontSize: 12, color: "#9a9a96" }}>Scope AI Score</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#EEEDFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <i className="ti ti-bulb" style={{ fontSize: 15, color: "#534AB7" }} />
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "#3a3a36", paddingTop: 3 }}>
              Data centers made up 39% of Nvidia's revenue three years ago. Today it's 92% — the
              whole business has flipped around AI.
            </div>
          </div>
        </div>
        <div className="whyscope-text">
          <div style={stepNumberStyle}>03</div>
          <h3 className="whyscope-row-title" style={rowTitleStyle}>
            AI reads the filings, so you don't have to
          </h3>
          <p style={rowBodyStyle}>
            Instead of leaving you to interpret raw numbers, Scope's AI surfaces the one thing that
            actually matters about a company — in plain language.
          </p>
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, color: "#1a1a18" }}>
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </div>
  );
}

const visualCardStyle: CSSProperties = {
  background: "#ffffff",
  border: "0.5px solid #e5e5e2",
  borderRadius: 16,
  padding: 28,
  boxShadow: "0 12px 32px rgba(17,24,39,0.05)",
  minWidth: 0,
};

const stepNumberStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: "#2F4A32",
  marginBottom: 8,
};

const rowTitleStyle: CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  color: "#1a1a18",
  margin: "0 0 10px",
  lineHeight: 1.3,
};

const rowBodyStyle: CSSProperties = {
  fontSize: 14,
  color: "#6b6b68",
  lineHeight: 1.7,
  margin: 0,
};