"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 16px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e5e2",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
<Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
  <svg width="28" height="28" viewBox="0 0 40 40">
    <circle cx="17" cy="17" r="13" fill="none" stroke="#1a1a18" strokeWidth="3" />
    <line x1="26.5" y1="26.5" x2="37" y2="37" stroke="#1a1a18" strokeWidth="3" strokeLinecap="round" />
    <path d="M11 17a6 6 0 0 1 6-6" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
  <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a18" }}>Scope</span>
</Link>

      {/* Search */}
      <div
        className="card-surface"
        style={{
          flex: 1,
          minWidth: 0,
          maxWidth: 480,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#f7f7f5",
          borderRadius: 20,
          padding: "8px 12px",
          marginLeft: "auto",
          marginRight: 8,
          transition: "border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
        }}
      >
        <i className="ti ti-search" style={{ fontSize: 16, color: "#9a9a96", flexShrink: 0 }}></i>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search companies or ticker..."
          style={{
            border: "none",
            outline: "none",
            fontSize: 13,
            color: "#1a1a18",
            width: "100%",
            minWidth: 0,
            background: "transparent",
            padding: "2px 0",
          }}
        />
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto", flexShrink: 0 }}>
        <Link
          href="/trending"
          className="interactive-link"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#1a1a18",
            display: "flex",
            alignItems: "center",
            gap: 5,
            textDecoration: "none",
            padding: "6px 4px",
            transition: "color 180ms ease, transform 180ms ease",
          }}
        >
          <i className="ti ti-flame" style={{ fontSize: 15, color: "#e76f51" }}></i>Trending
        </Link>
        <Link
          href="/categories"
          className="interactive-link"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#6b6b68",
            display: "flex",
            alignItems: "center",
            gap: 5,
            textDecoration: "none",
            padding: "6px 4px",
            transition: "color 180ms ease, transform 180ms ease",
          }}
        >
          <i className="ti ti-category" style={{ fontSize: 15 }}></i>Categories
        </Link>
      </div>
    </div>
  );
}