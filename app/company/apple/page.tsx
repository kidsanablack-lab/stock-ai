import type { Metadata } from "next";
import Link from "next/link";
import { AnalysisGrid } from "@/components/company/analysis-grid";
import { ItemCard } from "@/components/company/item-card";
import { MetricCard } from "@/components/company/metric-card";
import { ProgressBar } from "@/components/company/progress-bar";
import { SectionHeading } from "@/components/company/section-heading";
import { appleProfile } from "./data";

export const metadata: Metadata = {
  title: "Apple Inc. (AAPL) — Stock AI",
  description:
    "AI-powered company profile for Apple Inc. Key metrics, financial highlights, and investment analysis.",
};

export default function AppleCompanyPage() {
  const { hero } = appleProfile;
  const companyTagline = `${hero.businessDescription.split(".")[0].trim()}.`;

  const snapshotItems = [
    {
      label: "Quality",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 4v5c0 4.2-2.8 7.7-7 9-4.2-1.3-7-4.8-7-9V7l7-4Z" />
          <path d="m9.5 12.5 1.7 1.8 3.3-3.4" />
        </svg>
      ),
      rating: "★★★★★",
      tone: "good",
      type: "stars",
    },
    {
      label: "Revenue Growth",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16l5-5 3 3 8-8" />
          <path d="M14 6h6v6" />
        </svg>
      ),
      rating: "↑",
      tone: "good",
      type: "arrow",
    },
    {
      label: "Profitability",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M7 8h5a3 3 0 1 1 0 6H7" />
        </svg>
      ),
      rating: "█████",
      tone: "good",
      type: "bars",
    },
    {
      label: "Moat",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 7h14" />
          <path d="M7 7v10" />
          <path d="M17 7v10" />
          <path d="M9 17v-3h6v3" />
          <path d="M10 7V5h4v2" />
        </svg>
      ),
      rating: "★★★★★",
      tone: "good",
      type: "stars",
    },
    {
      label: "Risk",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h14.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
      rating: "●●○○○",
      tone: "risk",
      type: "dots",
    },
    {
      label: "Valuation",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16" />
          <path d="M7 7v10" />
          <path d="M17 7v10" />
          <path d="M4 17h16" />
        </svg>
      ),
      rating: "Fair",
      tone: "neutral",
      type: "text",
    },
  ];

  const toneClasses: Record<string, string> = {
    good: "text-emerald-600",
    neutral: "text-amber-600",
    risk: "text-orange-600",
  };

  return (
    <div className="min-h-full bg-white text-zinc-900">
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:px-10 sm:pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
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
          Back to search
        </Link>

        {/* ===== COMPANY OVERVIEW CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card">

  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1a1a18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 600, color: "#fff", flexShrink: 0 }}>A</div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18" }}>Apple Inc.</span>
          <span className="pill">AAPL</span>
          <span className="pill">Technology</span>
        </div>
        <p style={{ fontSize: 14, color: "#6b6b68", margin: "6px 0 0", maxWidth: 420, lineHeight: 1.6 }}>Designs premium hardware, software and services that work together as one of the world&apos;s most loyal technology ecosystems.</p>
      </div>
    </div>
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    background: "#ffffff",
    border: "1px solid #ecece8",
    borderRadius: 18,
    padding: "12px 16px",
    minWidth: 220,
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  }}
>
  {/* Left */}
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        fontSize: 22,
        fontWeight: 700,
        color: "#1a1a18",
        lineHeight: 1.2,
      }}
    >
      Scope Score
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 8,
      }}
    >
      <span
        style={{
          color: "#F59E0B",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Excellent
      </span>

      <span
        style={{
          color: "#d6d6d2",
          fontSize: 24,
        }}
      >
        |
      </span>

      <span
        style={{
          color: "#8b8b88",
          fontSize: 18,
        }}
      >
        /10
      </span>
    </div>
  </div>

{/* Right Circle */}
<div
  style={{
    width: 60,
    height: 60,
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
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1,
    }}
  >
    9.5
  </span>
</div>
</div>
  </div>

  <div className="divider"></div>

  {/* Snapshot bar — reordered into 3 meaning-based pairs: [Quality, Moat] [Profitability, Revenue growth] [Risk, Valuation] */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">

    {/* Pair 1: Quality assessment — stars */}
    <div className="snap-box">
      <div className="snap-label"><i className="ti ti-shield-check" style={{ fontSize: 16 }}></i>Quality</div>
      <p style={{ margin: "8px 0 0", fontSize: 15, letterSpacing: 1, color: "#2f9e44" }}>★★★★★</p>
    </div>
    <div className="snap-box">
      <div className="snap-label"><i className="ti ti-shield-lock" style={{ fontSize: 16 }}></i>Moat</div>
      <p style={{ margin: "8px 0 0", fontSize: 15, letterSpacing: 1, color: "#2f9e44" }}>★★★★★</p>
    </div>

    {/* Pair 2: Financial performance — bar / arrow */}
    <div className="snap-box">
      <div className="snap-label"><i className="ti ti-coin" style={{ fontSize: 16 }}></i>Profitability</div>
      <div style={{ display: "flex", gap: 3, marginTop: 10 }}>
        <span style={{ width: 18, height: 6, borderRadius: 3, background: "#2f9e44" }}></span>
        <span style={{ width: 18, height: 6, borderRadius: 3, background: "#2f9e44" }}></span>
        <span style={{ width: 18, height: 6, borderRadius: 3, background: "#2f9e44" }}></span>
        <span style={{ width: 18, height: 6, borderRadius: 3, background: "#2f9e44" }}></span>
        <span style={{ width: 18, height: 6, borderRadius: 3, background: "#2f9e44" }}></span>
      </div>
    </div>
    <div className="snap-box">
      <div className="snap-label"><i className="ti ti-trending-up" style={{ fontSize: 16 }}></i>Revenue growth</div>
      <p style={{ margin: "8px 0 0", fontSize: 15, color: "#2f9e44" }}><i className="ti ti-arrow-up" style={{ fontSize: 16, verticalAlign: -2 }}></i> Growing</p>
    </div>

    {/* Pair 3: Investment verdict — badges */}
    <div className="snap-box">
      <div className="snap-label"><i className="ti ti-alert-triangle" style={{ fontSize: 16 }}></i>Risk</div>
      <span style={{ display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 600, color: "#b45309", background: "#ffedd5", borderRadius: 8, padding: "3px 10px" }}>Moderate</span>
    </div>
    <div className="snap-box">
      <div className="snap-label"><i className="ti ti-scale" style={{ fontSize: 16 }}></i>Valuation</div>
      <span style={{ display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 600, color: "#a15c00", background: "#fff3d6", borderRadius: 8, padding: "3px 10px" }}>Fair</span>
    </div>

  </div>

  <div className="divider"></div>

  <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 10 }}>
    <div className="stat-box" style={{ gridRow: "span 2" }}>
      <p className="stat-label"><i className="ti ti-building-store" style={{ fontSize: 16 }}></i>What Apple does</p>
      <p style={{ fontSize: 14, color: "#1a1a18", lineHeight: 1.7, margin: 0 }}>Apple designs premium hardware, software and services that work together as one of the world&apos;s most loyal technology ecosystems.</p>
    </div>
    <div className="stat-box">
      <p className="stat-label"><i className="ti ti-calendar" style={{ fontSize: 16 }}></i>Founded</p>
      <p className="stat-value">1976</p>
      <p className="stat-sub">Cupertino, California</p>
    </div>
    <div className="stat-box">
      <p className="stat-label"><i className="ti ti-user" style={{ fontSize: 16 }}></i>CEO</p>
      <p className="stat-value">Tim Cook</p>
      <p className="stat-sub">Since 2011</p>
    </div>
    <div className="stat-box">
      <p className="stat-label"><i className="ti ti-chart-bar" style={{ fontSize: 16 }}></i>Market cap</p>
      <p className="stat-value">$4.75T</p>
      <p className="stat-sub">#2 in the world</p>
    </div>
    <div className="stat-box">
      <p className="stat-label"><i className="ti ti-report-money" style={{ fontSize: 16 }}></i>Revenue (FY25)</p>
      <p className="stat-value">$416.2B</p>
      <p className="stat-sub" style={{ color: "#2f9e44" }}>+6.4% YoY</p>
    </div>
  </div>

</div>

    {/* ===== BUSINESS SEGMENTS CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Business Segments</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>Where Apple&apos;s $416.2B FY25 revenue comes from</p>
  </div>

  <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>

    <div style={{ position: "relative", width: 280, height: 280, flexShrink: 0 }}>
      <div style={{ width: 280, height: 280, borderRadius: "50%", background: "conic-gradient(#1d3557 0% 50.4%, #2a9d8f 50.4% 76.6%, #e76f51 76.6% 85.2%, #f4a261 85.2% 93.3%, #8d99ae 93.3% 100%)" }}></div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 180, height: 180, borderRadius: "50%", background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18", margin: 0 }}>$416.2B</p>
        <p style={{ fontSize: 13, color: "#6b6b68", margin: "2px 0 0" }}>FY25 revenue</p>
      </div>
    </div>

    <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1a1a18" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#1d3557", display: "inline-block" }}></span>iPhone</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>$209.6B</span>
        </div>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0 18px" }}>50.4% of revenue · +4% YoY</p>
      </div>
      <div style={{ borderTop: "0.5px solid #e5e5e2" }}></div>

      <div style={{ padding: "10px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1a1a18" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2a9d8f", display: "inline-block" }}></span>Services</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>$109.2B</span>
        </div>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0 18px" }}>26.2% of revenue · +14% YoY</p>
      </div>
      <div style={{ borderTop: "0.5px solid #e5e5e2" }}></div>

      <div style={{ padding: "10px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1a1a18" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e76f51", display: "inline-block" }}></span>Wearables, Home &amp; Accessories</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>$35.7B</span>
        </div>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0 18px" }}>8.6% of revenue · -4% YoY</p>
      </div>
      <div style={{ borderTop: "0.5px solid #e5e5e2" }}></div>

      <div style={{ padding: "10px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1a1a18" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f4a261", display: "inline-block" }}></span>Mac</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>$33.7B</span>
        </div>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0 18px" }}>8.1% of revenue · +12% YoY</p>
      </div>
      <div style={{ borderTop: "0.5px solid #e5e5e2" }}></div>

      <div style={{ padding: "10px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1a1a18" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#8d99ae", display: "inline-block" }}></span>iPad</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18" }}>$28.0B</span>
        </div>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0 18px" }}>6.7% of revenue · +5% YoY</p>
      </div>
    </div>

  </div>

  {/* Takeaway insight line */}
  <div style={{ background: "#f7f7f5", borderRadius: 8, padding: "14px 18px", marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
    </div>
    <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>
      iPhone still drives half of Apple&apos;s revenue — but Services is now growing over 3x faster, and has become the company&apos;s second-largest segment.
    </p>
  </div>

  <p style={{ fontSize: 11, color: "#9a9a96", margin: "12px 0 0" }}>
    Fiscal year 2025 (ended Sept 27, 2025). Services includes App Store, iCloud, Apple Music, AppleCare, Apple Pay, and advertising revenue — Apple does not break these out individually.
  </p>

</div>

{/* ===== BUSINESS MODEL CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Business Model</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>How Apple makes money — the ecosystem flywheel</p>
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 44px 1fr 44px 1fr", alignItems: "stretch" }}>

    {/* Stage 1: Buy hardware */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #3b82f6", borderRadius: 12, padding: "22px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ti ti-device-mobile" style={{ fontSize: 24, color: "#3b82f6" }}></i>
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "14px 0 12px" }}>Buy hardware</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-device-mobile" style={{ fontSize: 13 }}></i>iPhone</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-device-laptop" style={{ fontSize: 13 }}></i>Mac</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-device-tablet" style={{ fontSize: 13 }}></i>iPad</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-device-watch" style={{ fontSize: 13 }}></i>Watch</span>
      </div>
    </div>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ffffff", border: "2px solid #e5e5e2", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <i className="ti ti-arrow-right" style={{ fontSize: 18, color: "#6b6b68" }}></i>
      </div>
    </div>

    {/* Stage 2: Use ecosystem services */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #14b8a6", borderRadius: 12, padding: "22px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ti ti-apps" style={{ fontSize: 24, color: "#14b8a6" }}></i>
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "14px 0 12px" }}>Use ecosystem services</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdfa", color: "#0f766e", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-download" style={{ fontSize: 13 }}></i>App Store</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdfa", color: "#0f766e", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-cloud" style={{ fontSize: 13 }}></i>iCloud</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdfa", color: "#0f766e", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-music" style={{ fontSize: 13 }}></i>Music</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdfa", color: "#0f766e", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-wallet" style={{ fontSize: 13 }}></i>Pay</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdfa", color: "#0f766e", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-sparkles" style={{ fontSize: 13 }}></i>Intelligence</span>
      </div>
    </div>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ffffff", border: "2px solid #e5e5e2", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <i className="ti ti-arrow-right" style={{ fontSize: 18, color: "#6b6b68" }}></i>
      </div>
    </div>

    {/* Stage 3: Locked into ecosystem */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f59e0b", borderRadius: 12, padding: "22px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ti ti-lock" style={{ fontSize: 24, color: "#f59e0b" }}></i>
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18", margin: "14px 0 12px" }}>Locked into ecosystem</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#fffbeb", color: "#b45309", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-database" style={{ fontSize: 13 }}></i>Data</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#fffbeb", color: "#b45309", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-calendar-repeat" style={{ fontSize: 13 }}></i>Subscriptions</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, background: "#fffbeb", color: "#b45309", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "5px 10px" }}><i className="ti ti-heart" style={{ fontSize: 13 }}></i>Habits</span>
      </div>
    </div>

  </div>

  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18, color: "#9a9a96", fontSize: 12 }}>
    <i className="ti ti-repeat" style={{ fontSize: 15 }}></i>
    Repeats with every new device cycle
  </div>

  <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "16px 20px", marginTop: 16, display: "flex", alignItems: "flex-start", gap: 12 }}>
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
    </div>
    <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.6, paddingTop: 4 }}>
      The services stage isn&apos;t sequential — App Store, iCloud, Music, Pay, and Apple Intelligence all run in parallel once you own an Apple device, and each one makes switching brands a little harder.
    </p>
  </div>
</div>
{/* ===== STRENGTHS & RISKS CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Strengths &amp; Risks</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>What makes Apple strong — and what could go wrong</p>
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
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-award" style={{ fontSize: 16, color: "#2f9e44", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Brand</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>One of the strongest premium brands in the world</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-apps" style={{ fontSize: 16, color: "#2f9e44", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Ecosystem</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Devices and services locked tightly together</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-tag" style={{ fontSize: 16, color: "#2f9e44", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Pricing power</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Can charge more than rivals without losing customers</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-heart" style={{ fontSize: 16, color: "#2f9e44", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Loyalty</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>High repeat-purchase and satisfaction rates</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-cash" style={{ fontSize: 16, color: "#2f9e44", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Cash &amp; balance sheet</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Massive cash reserves fund buybacks and dividends</p></div>
        </div>
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
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-map-pin" style={{ fontSize: 16, color: "#c0392b", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>China</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Heavy reliance on Chinese market and supply chain</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-device-mobile" style={{ fontSize: 16, color: "#c0392b", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>iPhone concentration</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Half of revenue tied to a single product</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-gavel" style={{ fontSize: 16, color: "#c0392b", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Regulation</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Antitrust and App Store scrutiny worldwide</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-bulb-off" style={{ fontSize: 16, color: "#c0392b", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Innovation slowdown</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>No major new category since Apple Watch (2015)</p></div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <i className="ti ti-swords" style={{ fontSize: 16, color: "#c0392b", marginTop: 2, flexShrink: 0 }}></i>
          <div><p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Competition</p><p style={{ fontSize: 12, color: "#6b6b68", margin: "2px 0 0" }}>Android and AI-native devices closing the gap</p></div>
        </div>
      </div>
    </div>

  </div>

</div>
{/* ===== FINANCIAL OVERVIEW CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Financial Overview</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>Fiscal year 2025 (ended Sept 27, 2025)</p>
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

    <div style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b6b68", fontSize: 13 }}>
        <i className="ti ti-report-money" style={{ fontSize: 18 }}></i>Revenue
      </div>
      <p style={{ fontSize: 28, fontWeight: 600, color: "#1a1a18", margin: "10px 0 4px" }}>$416.2B</p>
      <p style={{ fontSize: 13, color: "#2f9e44", margin: 0, display: "flex", alignItems: "center", gap: 4 }}><i className="ti ti-arrow-up" style={{ fontSize: 14 }}></i>+6.4% YoY</p>
      <p style={{ fontSize: 11, color: "#9a9a96", margin: "6px 0 0" }}>vs. $391.0B in FY24</p>
    </div>

    <div style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b6b68", fontSize: 13 }}>
        <i className="ti ti-coin" style={{ fontSize: 18 }}></i>Net Income
      </div>
      <p style={{ fontSize: 28, fontWeight: 600, color: "#1a1a18", margin: "10px 0 4px" }}>$112.0B</p>
      <p style={{ fontSize: 13, color: "#2f9e44", margin: 0, display: "flex", alignItems: "center", gap: 4 }}><i className="ti ti-arrow-up" style={{ fontSize: 14 }}></i>+19.5% YoY</p>
      <p style={{ fontSize: 11, color: "#9a9a96", margin: "6px 0 0" }}>26.9% margin</p>
    </div>

    <div style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b6b68", fontSize: 13 }}>
        <i className="ti ti-droplet" style={{ fontSize: 18 }}></i>Free Cash Flow
      </div>
      <p style={{ fontSize: 28, fontWeight: 600, color: "#1a1a18", margin: "10px 0 4px" }}>$98.8B</p>
      <p style={{ fontSize: 13, color: "#dc2626", margin: 0, display: "flex", alignItems: "center", gap: 4 }}><i className="ti ti-arrow-down" style={{ fontSize: 14 }}></i>-9.2% YoY</p>
      <p style={{ fontSize: 11, color: "#9a9a96", margin: "6px 0 0" }}>23.7% margin</p>
    </div>

  </div>

  <div style={{ background: "#fffbeb", borderRadius: 12, padding: "14px 18px", marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
    <i className="ti ti-info-circle" style={{ fontSize: 18, color: "#b45309", flexShrink: 0 }}></i>
    <p style={{ fontSize: 13, color: "#78350f", margin: 0, lineHeight: 1.5 }}>
      FCF fell even as revenue and net income grew — a gap worth watching, since it&apos;s the cash Apple actually has on hand for buybacks and dividends.
    </p>
  </div>
</div>
{/* ===== FINANCIAL HISTORY CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Financial History</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>5-year trend, fiscal years 2021–2025</p>
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

    {/* Revenue panel */}
    <div style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b6b68", fontSize: 12, marginBottom: 14 }}>
        <i className="ti ti-report-money" style={{ fontSize: 15, color: "#1d4ed8" }}></i>Revenue
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 100, gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#93c5fd", width: "100%", borderRadius: "3px 3px 0 0", height: "88%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#93c5fd", width: "100%", borderRadius: "3px 3px 0 0", height: "95%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#93c5fd", width: "100%", borderRadius: "3px 3px 0 0", height: "92%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#93c5fd", width: "100%", borderRadius: "3px 3px 0 0", height: "94%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#1d4ed8", width: "100%", borderRadius: "3px 3px 0 0", height: "100%" }}></div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;21</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;22</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;23</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;24</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;25</span>
      </div>
      <p style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18", margin: "12px 0 0" }}>$416.2B</p>
      <p style={{ fontSize: 11, color: "#2f9e44", margin: "2px 0 0" }}>+13.9% since FY21</p>
    </div>

    {/* Net Income panel */}
    <div style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b6b68", fontSize: 12, marginBottom: 14 }}>
        <i className="ti ti-coin" style={{ fontSize: 15, color: "#0f766e" }}></i>Net Income
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 100, gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#5eead4", width: "100%", borderRadius: "3px 3px 0 0", height: "85%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#5eead4", width: "100%", borderRadius: "3px 3px 0 0", height: "89%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#5eead4", width: "100%", borderRadius: "3px 3px 0 0", height: "87%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#5eead4", width: "100%", borderRadius: "3px 3px 0 0", height: "84%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#0f766e", width: "100%", borderRadius: "3px 3px 0 0", height: "100%" }}></div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;21</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;22</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;23</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;24</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;25</span>
      </div>
      <p style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18", margin: "12px 0 0" }}>$112.0B</p>
      <p style={{ fontSize: 11, color: "#2f9e44", margin: "2px 0 0" }}>+18.3% since FY21</p>
    </div>

    {/* FCF panel */}
    <div style={{ background: "#f7f7f5", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b6b68", fontSize: 12, marginBottom: 14 }}>
        <i className="ti ti-droplet" style={{ fontSize: 15, color: "#b45309" }}></i>Free Cash Flow
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 100, gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#fcd34d", width: "100%", borderRadius: "3px 3px 0 0", height: "83%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#fcd34d", width: "100%", borderRadius: "3px 3px 0 0", height: "100%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#fcd34d", width: "100%", borderRadius: "3px 3px 0 0", height: "89%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#fcd34d", width: "100%", borderRadius: "3px 3px 0 0", height: "98%" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ background: "#b45309", width: "100%", borderRadius: "3px 3px 0 0", height: "89%" }}></div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;21</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;22</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;23</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;24</span>
        <span style={{ fontSize: 10, color: "#9a9a96", flex: 1, textAlign: "center" }}>&apos;25</span>
      </div>
      <p style={{ fontSize: 20, fontWeight: 600, color: "#1a1a18", margin: "12px 0 0" }}>$98.8B</p>
      <p style={{ fontSize: 11, color: "#dc2626", margin: "2px 0 0" }}>+6.2% since FY21, down from FY22 peak</p>
    </div>

  </div>

  <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "14px 18px", marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
    </div>
    <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>
      Revenue and net income both hit new highs in FY25 — but free cash flow is still below its FY22 peak of $111.4B, showing growth hasn&apos;t fully translated into cash generation.
    </p>
  </div>
</div>
{/* ===== BUSINESS ECOSYSTEM CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Business Ecosystem</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>Who Apple depends on — and who depends on Apple</p>
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 44px 200px 44px 1fr", alignItems: "center" }}>

    {/* Suppliers column */}
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #1d3557", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e7edf5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <i className="ti ti-cpu" style={{ fontSize: 18, color: "#1d3557" }}></i>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>TSMC</p>
          <p style={{ fontSize: 11, color: "#6b6b68", margin: "2px 0 0" }}>Manufactures all A-series and M-series chips</p>
        </div>
      </div>
      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #e76f51", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fbe9e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <i className="ti ti-tools" style={{ fontSize: 18, color: "#e76f51" }}></i>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Foxconn</p>
          <p style={{ fontSize: 11, color: "#6b6b68", margin: "2px 0 0" }}>Assembles most iPhones worldwide</p>
        </div>
      </div>
      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f4a261", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fdf1e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <i className="ti ti-device-mobile" style={{ fontSize: 18, color: "#f4a261" }}></i>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Samsung Display</p>
          <p style={{ fontSize: 11, color: "#6b6b68", margin: "2px 0 0" }}>Key supplier of OLED screens</p>
        </div>
      </div>
    </div>

    {/* Arrow in */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffffff", border: "2px solid #e5e5e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ti ti-arrow-right" style={{ fontSize: 16, color: "#6b6b68" }}></i>
      </div>
    </div>

    {/* Apple center */}
    <div style={{ background: "#1a1a18", borderRadius: 16, padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#1a1a18" }}>A</span>
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#ffffff", margin: "14px 0 2px" }}>Apple</p>
      <p style={{ fontSize: 11, color: "#ffffff", opacity: 0.6, margin: 0 }}>The hub</p>
    </div>

    {/* Arrow out */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffffff", border: "2px solid #e5e5e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ti ti-arrow-right" style={{ fontSize: 16, color: "#6b6b68" }}></i>
      </div>
    </div>

    {/* Developers */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #2a9d8f", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e6f5f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ti ti-code" style={{ fontSize: 20, color: "#2a9d8f" }}></i>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", margin: "10px 0 4px" }}>App Developers</p>
      <p style={{ fontSize: 11, color: "#6b6b68", margin: 0, lineHeight: 1.5 }}>60M+ developers build on Apple&apos;s platforms</p>
    </div>

  </div>

  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 4px" }}>
    <span style={{ fontSize: 11, color: "#9a9a96" }}>← Hardware flows in</span>
    <span style={{ fontSize: 11, color: "#9a9a96" }}>Software value flows out →</span>
  </div>

  <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "14px 18px", marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
    </div>
    <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>
      The App Store ecosystem generated $1.4 trillion in developer billings in 2025 — over 90% of it kept by developers, with no Apple commission at all.
    </p>
  </div>
</div>
{/* ===== COMPETITORS CARD — paste this whole block inside your return(...) ===== */}
<div className="overview-card" style={{ marginTop: 24 }}>

  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Competitors</h2>
    <p style={{ fontSize: 13, color: "#6b6b68", margin: 0 }}>Who Apple competes with, and where — sized relative to Apple&apos;s $4.75T market cap</p>
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>

    {/* Samsung */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #1d3557", borderRadius: 12, padding: 18 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e7edf5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <i className="ti ti-device-mobile" style={{ fontSize: 18, color: "#1d3557" }}></i>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Samsung</p>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: 0 }}>$1.14T</p>
      <div style={{ background: "#f7f7f5", borderRadius: 4, height: 6, width: "100%", margin: "6px 0 12px" }}><div style={{ background: "#1d3557", height: 6, borderRadius: 4, width: "24%" }}></div></div>
      <span style={{ display: "inline-block", background: "#e7edf5", color: "#1d3557", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "4px 10px" }}>Smartphones &amp; Displays</span>
      <p style={{ fontSize: 11, color: "#6b6b68", margin: "8px 0 0", lineHeight: 1.5 }}>Direct rival — sells competing phones to the same customers</p>
    </div>

    {/* Google */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #2a9d8f", borderRadius: 12, padding: 18 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e6f5f3", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <i className="ti ti-brand-google" style={{ fontSize: 18, color: "#2a9d8f" }}></i>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Google</p>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: 0 }}>$4.0T</p>
      <div style={{ background: "#f7f7f5", borderRadius: 4, height: 6, width: "100%", margin: "6px 0 12px" }}><div style={{ background: "#2a9d8f", height: 6, borderRadius: 4, width: "84%" }}></div></div>
      <span style={{ display: "inline-block", background: "#e6f5f3", color: "#0f766e", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "4px 10px" }}>AI, Search &amp; Android</span>
      <p style={{ fontSize: 11, color: "#6b6b68", margin: "8px 0 0", lineHeight: 1.5 }}>Frenemy — rival in AI/Android, but also pays Apple billions to stay Safari&apos;s default search</p>
    </div>

    {/* Microsoft */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #e76f51", borderRadius: 12, padding: 18 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fbe9e5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <i className="ti ti-brand-windows" style={{ fontSize: 18, color: "#e76f51" }}></i>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Microsoft</p>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: 0 }}>$2.89T</p>
      <div style={{ background: "#f7f7f5", borderRadius: 4, height: 6, width: "100%", margin: "6px 0 12px" }}><div style={{ background: "#e76f51", height: 6, borderRadius: 4, width: "61%" }}></div></div>
      <span style={{ display: "inline-block", background: "#fbe9e5", color: "#c1502f", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "4px 10px" }}>Cloud, AI &amp; Enterprise</span>
      <p style={{ fontSize: 11, color: "#6b6b68", margin: "8px 0 0", lineHeight: 1.5 }}>Different arena — barely overlaps, since Apple has almost no cloud/enterprise business</p>
    </div>

    {/* Huawei */}
    <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f4a261", borderRadius: 12, padding: 18 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fdf1e5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        <i className="ti ti-antenna" style={{ fontSize: 18, color: "#f4a261" }}></i>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>Huawei</p>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a18", margin: 0 }}>$126B</p>
      <p style={{ fontSize: 10, color: "#9a9a96", margin: "6px 0 12px" }}>Revenue — private, no market cap</p>
      <span style={{ display: "inline-block", background: "#fdf1e5", color: "#b3611f", fontSize: 11, fontWeight: 500, borderRadius: 20, padding: "4px 10px" }}>Smartphones (China)</span>
      <p style={{ fontSize: 11, color: "#6b6b68", margin: "8px 0 0", lineHeight: 1.5 }}>Regional rival — fierce competitor in China, barely present in the US/Europe</p>
    </div>

  </div>

  <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "14px 18px", marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <i className="ti ti-bulb" style={{ fontSize: 16, color: "#b45309" }}></i>
    </div>
    <p style={{ fontSize: 13, color: "#1a1a18", margin: 0, lineHeight: 1.5 }}>
      Google is Apple&apos;s closest rival by size — but the two rarely compete head-on for the same customer, since Google&apos;s business is ads and AI, not hardware.
    </p>
  </div>
</div>
{/* ===== END COMPETITORS CARD ===== */}
{/* ===== END BUSINESS ECOSYSTEM CARD ===== */}
{/* ===== END FINANCIAL HISTORY CARD ===== */}
{/* ===== END FINANCIAL OVERVIEW CARD ===== */}
{/* ===== END STRENGTHS & RISKS CARD ===== */}
{/* ===== END BUSINESS MODEL CARD ===== */}
{/* ===== END BUSINESS SEGMENTS CARD ===== */}
{/* ===== END COMPANY OVERVIEW CARD ===== */}


        {/* 30-second Summary */}
        <section className="mt-16 sm:mt-20">
          <SectionHeading
            title="30-second Summary"
            description="A plain-English explanation of Apple’s business model."
          />
          <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                <span className="text-base">🧠</span>
                {appleProfile.thirtySecondSummary.title}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-zinc-900 sm:text-3xl">
                {appleProfile.thirtySecondSummary.subtitle}
              </h3>
              <p className="mt-5 text-lg leading-8 text-zinc-600 sm:text-xl">
                {appleProfile.thirtySecondSummary.content}
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
