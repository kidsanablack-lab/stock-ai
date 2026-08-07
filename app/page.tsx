
"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/home/Hero";
import WhyScope from "@/components/home/WhyScope";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (value?: string) => {
    const normalizedQuery = (value ?? query).trim().toLowerCase().replace(/\s+/g, " ");

    if (normalizedQuery === "apple" || normalizedQuery === "aapl") {
      router.push("/company/apple");
      return;
    }

    alert("Company not found");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-full bg-white text-zinc-900">
      <main className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-24 pt-8 sm:px-10 sm:pt-10 lg:pt-12">
        {/* ===== HOMEPAGE — paste this whole block inside your return(...) of app/page.tsx ===== */}
<div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px" }}>

  <Hero
  query={query}
  setQuery={setQuery}
  handleKeyDown={handleKeyDown}
/>

  <WhyScope />

  {/* Browse by category */}
  <div style={{ marginBottom: 48 }}>
    <p style={{ fontSize: 13, fontWeight: 600, color: "#6b6b68", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 0.5 }}>Browse by category</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#e7edf5", color: "#1d3557", fontSize: 12, fontWeight: 500, borderRadius: 20, padding: "6px 14px" }}><i className="ti ti-cpu" style={{ fontSize: 14 }}></i>Technology</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#e6f5f3", color: "#0f766e", fontSize: 12, fontWeight: 500, borderRadius: 20, padding: "6px 14px" }}><i className="ti ti-shopping-bag" style={{ fontSize: 14 }}></i>Consumer</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#fbe9e5", color: "#c1502f", fontSize: 12, fontWeight: 500, borderRadius: 20, padding: "6px 14px" }}><i className="ti ti-heartbeat" style={{ fontSize: 14 }}></i>Healthcare</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#fdf1e5", color: "#b3611f", fontSize: 12, fontWeight: 500, borderRadius: 20, padding: "6px 14px" }}><i className="ti ti-building-bank" style={{ fontSize: 14 }}></i>Finance</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#eceef1", color: "#5c6b7a", fontSize: 12, fontWeight: 500, borderRadius: 20, padding: "6px 14px" }}><i className="ti ti-bolt" style={{ fontSize: 14 }}></i>Energy</span>
    </div>
  </div>
{/* ===== TRENDING BY CATEGORY PAGE — paste inside return(...) of app/trending/page.tsx ===== */}
<div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px" }}>

  {/* Technology */}
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }}></span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18" }}>Technology</span>
        <span style={{ fontSize: 12, color: "#9a9a96" }}>4 companies</span>
      </div>
      <span style={{ fontSize: 12, color: "#6b6b68", cursor: "pointer" }}>View all →</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #1d3557", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1d3557", background: "#e7edf5", borderRadius: 8, padding: "3px 8px" }}>AAPL</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.4</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Apple</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Consumer Electronics</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Sells hardware tied to a software ecosystem, with growing long-term services revenue.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Hardware</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Ecosystem</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #1d3557", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1d3557", background: "#e7edf5", borderRadius: 8, padding: "3px 8px" }}>MSFT</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.2</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Microsoft</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Software &amp; Cloud</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Core revenue from enterprise software, with Azure cloud as the fastest-growing segment.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Cloud</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Enterprise</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #1d3557", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1d3557", background: "#e7edf5", borderRadius: 8, padding: "3px 8px" }}>GOOGL</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.9</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Alphabet</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Internet &amp; Advertising</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Owns Google Search and YouTube — most revenue comes from digital ads.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Advertising</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>AI</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #1d3557", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1d3557", background: "#e7edf5", borderRadius: 8, padding: "3px 8px" }}>NVDA</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.6</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Nvidia</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Semiconductors</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Makes chips and AI accelerators that power the world&apos;s data centers.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Chips</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Data Center</span>
        </div>
      </div>

    </div>
  </div>

  {/* Consumer */}
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f4a261", display: "inline-block" }}></span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18" }}>Consumer</span>
        <span style={{ fontSize: 12, color: "#9a9a96" }}>4 companies</span>
      </div>
      <span style={{ fontSize: 12, color: "#6b6b68", cursor: "pointer" }}>View all →</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f4a261", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#b3611f", background: "#fdf1e5", borderRadius: 8, padding: "3px 8px" }}>AMZN</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.0</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Amazon</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>E-Commerce &amp; Cloud</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>The largest online retail platform, boosted by AWS — its most profitable division.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Retail</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>AWS</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f4a261", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#b3611f", background: "#fdf1e5", borderRadius: 8, padding: "3px 8px" }}>KO</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.5</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Coca-Cola</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Beverages</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Makes concentrate, sells to bottlers worldwide — a globally dominant brand.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Brand</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Distribution</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f4a261", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#b3611f", background: "#fdf1e5", borderRadius: 8, padding: "3px 8px" }}>NKE</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.0</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Nike</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Apparel &amp; Footwear</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Designs and markets shoes, outsourcing manufacturing to focus on brand and design.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Brand</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Design</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #f4a261", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#b3611f", background: "#fdf1e5", borderRadius: 8, padding: "3px 8px" }}>MCD</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.3</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>McDonald&apos;s</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Restaurants</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Mainly a real-estate and franchise-fee business — landlord more than food seller.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Franchise</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Real Estate</span>
        </div>
      </div>

    </div>
  </div>

  {/* Finance */}
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }}></span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18" }}>Finance</span>
        <span style={{ fontSize: 12, color: "#9a9a96" }}>4 companies</span>
      </div>
      <span style={{ fontSize: 12, color: "#6b6b68", cursor: "pointer" }}>View all →</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #7c3aed", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#6d28d9", background: "#f2ebfd", borderRadius: 8, padding: "3px 8px" }}>JPM</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.8</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>JPMorgan</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Banking</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>The largest US bank by assets — earns from lending, trading, and banking fees.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Lending</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Trading</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #7c3aed", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#6d28d9", background: "#f2ebfd", borderRadius: 8, padding: "3px 8px" }}>V</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.1</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Visa</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Payments</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Runs the payment network — a small fee on nearly every card transaction, no lending risk.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Network</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Fees</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #7c3aed", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#6d28d9", background: "#f2ebfd", borderRadius: 8, padding: "3px 8px" }}>BRK.B</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.0</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Berkshire Hathaway</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Conglomerate</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Warren Buffett&apos;s holding company — insurance, railroads, and a huge stock portfolio.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Insurance</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Holdings</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #7c3aed", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#6d28d9", background: "#f2ebfd", borderRadius: 8, padding: "3px 8px" }}>GS</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.4</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Goldman Sachs</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Investment Banking</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Advises on deals and trades for institutions — revenue tied closely to markets activity.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Advisory</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Markets</span>
        </div>
      </div>

    </div>
  </div>

  {/* Healthcare */}
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e11d48", display: "inline-block" }}></span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18" }}>Healthcare</span>
        <span style={{ fontSize: 12, color: "#9a9a96" }}>4 companies</span>
      </div>
      <span style={{ fontSize: 12, color: "#6b6b68", cursor: "pointer" }}>View all →</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #e11d48", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#be123c", background: "#fde5ea", borderRadius: 8, padding: "3px 8px" }}>UNH</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>7.5</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>UnitedHealth</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Health Insurance</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>The largest US health insurer, also running Optum&apos;s pharmacy and care-delivery business.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Insurance</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Optum</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #e11d48", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#be123c", background: "#fde5ea", borderRadius: 8, padding: "3px 8px" }}>JNJ</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.6</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Johnson &amp; Johnson</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Pharma &amp; Medical Devices</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>A diversified healthcare giant spanning prescription drugs and medical devices.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Pharma</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Devices</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #e11d48", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#be123c", background: "#fde5ea", borderRadius: 8, padding: "3px 8px" }}>LLY</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>9.3</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Eli Lilly</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Pharmaceuticals</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>A drugmaker riding strong demand for its diabetes and weight-loss treatments.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Drugs</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>R&amp;D</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #e11d48", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#be123c", background: "#fde5ea", borderRadius: 8, padding: "3px 8px" }}>PFE</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>7.2</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Pfizer</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Pharmaceuticals</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>A global drugmaker rebuilding its pipeline after COVID-era vaccine revenue faded.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Vaccines</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Pipeline</span>
        </div>
      </div>

    </div>
  </div>

  {/* Energy */}
  <div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block" }}></span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a18" }}>Energy</span>
        <span style={{ fontSize: 12, color: "#9a9a96" }}>4 companies</span>
      </div>
      <span style={{ fontSize: 12, color: "#6b6b68", cursor: "pointer" }}>View all →</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #16a34a", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", background: "#e7f8ed", borderRadius: 8, padding: "3px 8px" }}>XOM</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>7.9</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>ExxonMobil</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Oil &amp; Gas</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Explores, produces, and refines oil and gas — one of the world&apos;s largest energy companies.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Oil</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Refining</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #16a34a", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", background: "#e7f8ed", borderRadius: 8, padding: "3px 8px" }}>CVX</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>7.7</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>Chevron</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Oil &amp; Gas</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>A major integrated oil producer, from drilling through to gas stations.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Drilling</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Retail</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #16a34a", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", background: "#e7f8ed", borderRadius: 8, padding: "3px 8px" }}>NEE</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>8.5</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>NextEra Energy</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Utilities &amp; Renewables</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Runs a regulated Florida utility alongside the world&apos;s largest wind and solar operator.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Utility</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Renewables</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderTop: "3px solid #16a34a", borderRadius: 12, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", background: "#e7f8ed", borderRadius: 8, padding: "3px 8px" }}>COP</span>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#c2410c", background: "#fff3e0", borderRadius: 8, padding: "2px 7px" }}><i className="ti ti-star-filled" style={{ fontSize: 11 }}></i>7.4</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: 0 }}>ConocoPhillips</p>
        <p style={{ fontSize: 10, color: "#9a9a96", textTransform: "uppercase", letterSpacing: 0.3, margin: "2px 0 8px" }}>Oil &amp; Gas Exploration</p>
        <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: "0 0 10px" }}>Focuses purely on exploration and production, without refining or retail stations.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Exploration</span>
          <span style={{ fontSize: 10, background: "#f7f7f5", color: "#6b6b68", borderRadius: 8, padding: "2px 8px" }}>Production</span>
        </div>
      </div>

    </div>
  </div>

</div>
{/* ===== END TRENDING BY CATEGORY PAGE ===== */}
</div>
{/* ===== END HOMEPAGE ===== */}
      </main>
    </div>
  );
}
