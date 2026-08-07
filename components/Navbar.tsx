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
    <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 24px", background: "#ffffff", borderBottom: "1px solid #e5e5e2" }}>

      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a1a18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>S</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a18" }}>Scope</span>
      </Link>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 480, display: "flex", alignItems: "center", gap: 8, background: "#f7f7f5", borderRadius: 20, padding: "8px 16px" }}>
        <i className="ti ti-search" style={{ fontSize: 16, color: "#9a9a96" }}></i>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search companies or ticker..."
          style={{ border: "none", outline: "none", fontSize: 13, color: "#1a1a18", width: "100%", background: "transparent" }}
        />
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: "auto" }}>
        <Link href="/trending" style={{ fontSize: 13, fontWeight: 500, color: "#1a1a18", display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
          <i className="ti ti-flame" style={{ fontSize: 15, color: "#e76f51" }}></i>Trending
        </Link>
        <Link href="/categories" style={{ fontSize: 13, fontWeight: 500, color: "#6b6b68", display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
          <i className="ti ti-category" style={{ fontSize: 15 }}></i>Categories
        </Link>
      </div>

    </div>
  );
}