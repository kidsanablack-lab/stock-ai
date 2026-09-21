"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ScoreFactor = {
  key: string;
  label: string;
  weightPct: number;
  color: string;
  description: string;
};

const SCORE_FACTORS: ScoreFactor[] = [
  {
    key: "business",
    label: "Business Quality",
    weightPct: 30,
    color: "#1d3557",
    description: "Market position, brand strength, and pricing power.",
  },
  {
    key: "growth",
    label: "Growth",
    weightPct: 25,
    color: "#2a9d8f",
    description: "Revenue and earnings trajectory, and how sustainable it looks.",
  },
  {
    key: "financial",
    label: "Financial Health",
    weightPct: 25,
    color: "#e76f51",
    description: "Balance sheet strength, cash flow, and debt levels.",
  },
  {
    key: "risk",
    label: "Risk",
    weightPct: 20,
    color: "#8d99ae",
    description: "Regulatory, competitive, and market threats to the business.",
  },
];

type DataSource = {
  key: string;
  icon: string;
  color: string;
  label: string;
  description: string;
};

const DATA_SOURCES: DataSource[] = [
  {
    key: "sec",
    icon: "ti-file-certificate",
    color: "#185FA5",
    label: "SEC filings",
    description: "10-Ks, 10-Qs, and other public disclosures.",
  },
  {
    key: "earnings",
    icon: "ti-microphone-2",
    color: "#993C1D",
    label: "Earnings reports & calls",
    description: "Quarterly results and management commentary.",
  },
  {
    key: "market",
    icon: "ti-chart-candle",
    color: "#854F0B",
    label: "Market data",
    description: "Prices, volume, and valuation multiples.",
  },
];

const DISCLAIMERS: string[] = [
  "The AI Score is not investment advice or a recommendation to buy or sell.",
  "It doesn't predict short-term stock price movements.",
  "It's Scope's own opinion of a business, not a guarantee of future performance.",
  "It doesn't replace advice from a licensed financial professional.",
];

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is a high AI Score a "buy" recommendation?',
    answer:
      "No. It's Scope's summary of how strong we think the underlying business is — not a signal about where the stock price is headed. A great business can still be an expensive stock.",
  },
  {
    question: "How often is the score updated?",
    answer:
      "Quarterly for most companies, or right after they report earnings — whichever comes first.",
  },
  {
    question: "Can the score change over time?",
    answer:
      "Yes. As a company's financials, growth, and risk profile evolve, its score is recalculated to reflect that.",
  },
  {
    question: "Do humans review the AI's output?",
    answer:
      "Scope's scoring methodology is designed and reviewed by our team. The underlying calculations are automated, but the framework itself is human-defined and periodically audited.",
  },
];

export default function AboutPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: "32px 12px 64px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 40px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a18", margin: "0 0 8px" }}>
          How Scope works
        </h1>
        <p style={{ fontSize: 14, color: "#6b6b68", lineHeight: 1.6, margin: 0 }}>
          The AI Score, the data behind it, and — just as important — what it isn&apos;t.
        </p>
      </div>

      {/* AI Score breakdown */}
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #e5e5e2",
          borderRadius: 16,
          padding: 28,
          marginBottom: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "linear-gradient(135deg, #EA8C00, #f59e0b)",
              color: "#ffffff",
              borderRadius: 20,
              padding: "4px 10px 4px 7px",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <i className="ti ti-star-filled" style={{ fontSize: 11, color: "#fffff" }} />
            9.1
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: 0 }}>The AI Score</h2>
        </div>
        <p style={{ fontSize: 13, color: "#6b6b68", margin: "0 0 22px", lineHeight: 1.6 }}>
          A single 0–100 number blending four weighted factors, recalculated every time a company
          reports.
        </p>

        <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", marginBottom: 20 }}>
          {SCORE_FACTORS.map((factor) => (
            <div key={factor.key} style={{ width: `${factor.weightPct}%`, background: factor.color }} />
          ))}
        </div>

        <div className="score-factor-grid">
          {SCORE_FACTORS.map((factor) => (
            <div key={factor.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: factor.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a18" }}>{factor.label}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: factor.color, marginBottom: 4 }}>
                {factor.weightPct}%
              </div>
              <p style={{ fontSize: 11, color: "#6b6b68", lineHeight: 1.5, margin: 0 }}>
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Data sources */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 4px" }}>
          Where the data comes from
        </h2>
        <p style={{ fontSize: 13, color: "#6b6b68", margin: "0 0 16px" }}>
          Refreshed quarterly, or sooner when a company reports earnings.
        </p>
        <div className="data-source-grid">
          {DATA_SOURCES.map((source) => (
            <div
              key={source.key}
              style={{
                background: "#ffffff",
                border: "0.5px solid #e5e5e2",
                borderRadius: 12,
                padding: 16,
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <i className={`ti ${source.icon}`} style={{ fontSize: 18, color: source.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18", marginBottom: 3 }}>
                  {source.label}
                </div>
                <div style={{ fontSize: 11, color: "#9a9a96", lineHeight: 1.5 }}>{source.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What Scope doesn't do */}
      <div style={{ background: "#FAFAF7", borderRadius: 16, padding: "24px 28px", marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 14px" }}>
          What Scope doesn&apos;t do
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DISCLAIMERS.map((text) => (
            <div key={text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <i className="ti ti-point" style={{ fontSize: 8, color: "#9a9a96", marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#3a3a36", lineHeight: 1.6 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a18", margin: "0 0 16px" }}>
          Frequently asked questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={item.question}
                style={{
                  background: "#ffffff",
                  border: "0.5px solid #e5e5e2",
                  borderRadius: 12,
                  padding: "16px 18px",
                  cursor: "pointer",
                }}
                onClick={() => toggleFaq(index)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: isOpen ? 10 : 0,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a18" }}>{item.question}</span>
                  <i
                    className={`ti ${isOpen ? "ti-chevron-up" : "ti-chevron-down"}`}
                    style={{ fontSize: 15, color: "#9a9a96", flexShrink: 0, marginLeft: 12 }}
                  />
                </div>
                {isOpen && (
                  <p style={{ fontSize: 12, color: "#6b6b68", lineHeight: 1.6, margin: 0 }}>{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Closing */}
      <div style={{ textAlign: "center", paddingTop: 8 }}>
        <p style={{ fontSize: 15, color: "#1a1a18", fontWeight: 600, margin: "0 0 14px" }}>
          Ready to see it in action?
        </p>
        <button
          onClick={() => router.push("/trending")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#2F4A32",
            color: "#ffffff",
            border: "none",
            borderRadius: 10,
            padding: "11px 22px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Look up a company
          <i className="ti ti-arrow-right" style={{ fontSize: 14 }} />
        </button>
      </div>
    </div>
  );
}