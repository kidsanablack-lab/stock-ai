export default function WhyScope() {
  return (
    <>
 {/* Why Scope */}
  <div style={{ marginTop: 48, marginBottom: 36 }}>
    <p style={{ fontSize: 13, fontWeight: 600, color: "#6b6b68", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: 0.5 }}>Why Scope</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <i className="ti ti-chart-donut-2" style={{ fontSize: 20, color: "#3b82f6" }}></i>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 6px" }}>Visual, not just numbers</p>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: 0, lineHeight: 1.6 }}>Business models and financials explained through diagrams, not spreadsheets.</p>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <i className="ti ti-users" style={{ fontSize: 20, color: "#14b8a6" }}></i>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 6px" }}>Built for beginners</p>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: 0, lineHeight: 1.6 }}>No jargon required — plain language explanations anyone can follow.</p>
      </div>

      <div style={{ background: "#ffffff", border: "0.5px solid #e5e5e2", borderRadius: 12, padding: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <i className="ti ti-puzzle" style={{ fontSize: 20, color: "#f59e0b" }}></i>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a18", margin: "0 0 6px" }}>The full picture</p>
        <p style={{ fontSize: 12, color: "#6b6b68", margin: 0, lineHeight: 1.6 }}>Business model, risks, competitors, and growth — not just the stock price.</p>
      </div>

    </div>
  </div>
    </>
  );
}