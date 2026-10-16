import type { ReactNode } from "react";
import Skeleton from "@/components/Skeleton";

function SectionCard({
  titleWidth,
  subtitleWidth,
  children,
}: {
  titleWidth: number;
  subtitleWidth: number | string;
  children: ReactNode;
}) {
  return (
    <div className="sk-card">
      <div style={{ marginBottom: 20 }}>
        <Skeleton width={titleWidth} height={18} style={{ marginBottom: 8 }} />
        <Skeleton width={subtitleWidth} height={12} />
      </div>
      {children}
    </div>
  );
}

function StatBox({ wide }: { wide?: boolean }) {
  return (
    <div
      className={wide ? "sk-stats-wide" : undefined}
      style={{ background: "#f7f7f5", borderRadius: 8, padding: "14px 16px" }}
    >
      <Skeleton
        width={wide ? 110 : 70}
        height={11}
        style={{ marginBottom: 10, background: "#e8e8e4" }}
      />
      {wide ? (
        <>
          <Skeleton height={12} style={{ marginBottom: 9, background: "#e8e8e4" }} />
          <Skeleton width="92%" height={12} style={{ marginBottom: 9, background: "#e8e8e4" }} />
          <Skeleton width="70%" height={12} style={{ background: "#e8e8e4" }} />
        </>
      ) : (
        <>
          <Skeleton width={80} height={16} style={{ marginBottom: 8, background: "#e8e8e4" }} />
          <Skeleton width={56} height={10} style={{ background: "#e8e8e4" }} />
        </>
      )}
    </div>
  );
}

function PanelCard({ chart }: { chart?: boolean }) {
  return (
    <div
      style={{
        background: "#f7f7f5",
        border: "0.5px solid #e5e5e2",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <Skeleton width={90} height={11} style={{ marginBottom: 16, background: "#e8e8e4" }} />
      {chart ? (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: 100,
          }}
        >
          {[45, 60, 52, 75, 90].map((h, i) => (
            <Skeleton
              key={i}
              height={`${h}%`}
              style={{ flex: 1, width: "auto", background: "#e8e8e4" }}
            />
          ))}
        </div>
      ) : (
        <>
          <Skeleton width={96} height={24} style={{ marginBottom: 10, background: "#e8e8e4" }} />
          <Skeleton width={70} height={11} style={{ background: "#e8e8e4" }} />
        </>
      )}
    </div>
  );
}

export default function CompanyLoading() {
  return (
    <div className="min-h-full bg-white">
      <main
        role="status"
        aria-busy="true"
        aria-label="Loading company"
        className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:px-10 sm:pt-12"
      >
        {/* Back link */}
        <Skeleton width={130} height={14} />

        {/* ===== Overview card ===== */}
        <div className="sk-card">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
              <Skeleton width={48} height={48} radius="50%" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <Skeleton width={110} height={20} />
                  <Skeleton width={46} height={20} radius={8} />
                  <Skeleton width={96} height={20} radius={8} />
                </div>
                <Skeleton width="60%" height={13} style={{ marginTop: 12, maxWidth: 380 }} />
              </div>
            </div>

            <div
              className="sk-score-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 18,
                padding: "14px 16px",
                border: "0.5px solid #e5e5e2",
                borderRadius: 16,
                boxSizing: "border-box",
              }}
            >
              <div>
                <Skeleton width={100} height={20} style={{ marginBottom: 10 }} />
                <Skeleton width={80} height={12} />
              </div>
              <Skeleton width={54} height={54} radius="50%" />
            </div>
          </div>

          <div className="divider" />

          {/* Snapshot bar */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{ background: "#f7f7f5", borderRadius: 8, padding: "16px 18px" }}
              >
                <Skeleton width={72} height={12} style={{ marginBottom: 14, background: "#e8e8e4" }} />
                <Skeleton width={64} height={8} style={{ background: "#e8e8e4" }} />
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* Stats */}
          <div className="sk-stats">
            <StatBox wide />
            <StatBox />
            <StatBox />
            <StatBox />
            <StatBox />
          </div>
        </div>

        {/* ===== 30-second summary ===== */}
        <SectionCard titleWidth={170} subtitleWidth="45%">
          <div
            style={{
              background: "#f7f7f5",
              borderRadius: 12,
              padding: "28px 32px",
              display: "flex",
              gap: 18,
              alignItems: "flex-start",
            }}
          >
            <Skeleton width={44} height={44} radius="50%" style={{ background: "#e8e8e4" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <Skeleton width={190} height={11} style={{ marginBottom: 14, background: "#e8e8e4" }} />
              <Skeleton height={14} style={{ marginBottom: 10, background: "#e8e8e4" }} />
              <Skeleton width="90%" height={14} style={{ marginBottom: 10, background: "#e8e8e4" }} />
              <Skeleton width="60%" height={14} style={{ background: "#e8e8e4" }} />
            </div>
          </div>
        </SectionCard>

        {/* ===== Business segments ===== */}
        <SectionCard titleWidth={150} subtitleWidth="50%">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            <div className="sk-donut" style={{ width: 280, height: 280, flexShrink: 0, margin: "0 auto" }}>
              <Skeleton width="100%" height="100%" radius="50%" />
            </div>

            <div style={{ flex: 1, minWidth: 280 }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderTop: i === 0 ? "none" : "0.5px solid #e5e5e2",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Skeleton width={120 - i * 8} height={14} />
                    <Skeleton width={50} height={14} />
                  </div>
                  <Skeleton width={150} height={11} style={{ marginTop: 8 }} />
                </div>
              ))}
            </div>
          </div>

          <Skeleton height={48} radius={8} style={{ marginTop: 20 }} />
        </SectionCard>

        {/* ===== Business model ===== */}
        <SectionCard titleWidth={130} subtitleWidth="48%">
          <div className="sk-three">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  border: "0.5px solid #e5e5e2",
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <Skeleton width={36} height={36} radius="50%" style={{ marginBottom: 14 }} />
                <Skeleton width={100} height={14} style={{ marginBottom: 10 }} />
                <Skeleton height={11} style={{ marginBottom: 8 }} />
                <Skeleton width="75%" height={11} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ===== Strengths & risks ===== */}
        <SectionCard titleWidth={150} subtitleWidth="55%">
          <div className="sk-two">
            {[0, 1].map((col) => (
              <div
                key={col}
                style={{
                  background: "#f7f7f5",
                  border: "0.5px solid #e5e5e2",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <Skeleton width={28} height={28} radius="50%" style={{ background: "#e8e8e4" }} />
                  <Skeleton width={140} height={15} style={{ background: "#e8e8e4" }} />
                </div>
                {[0, 1, 2].map((row) => (
                  <div key={row} style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    <Skeleton width={16} height={16} style={{ background: "#e8e8e4" }} />
                    <div style={{ flex: 1 }}>
                      <Skeleton width="55%" height={13} style={{ marginBottom: 8, background: "#e8e8e4" }} />
                      <Skeleton width="85%" height={11} style={{ background: "#e8e8e4" }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ===== Financial overview ===== */}
        <SectionCard titleWidth={150} subtitleWidth={120}>
          <div className="sk-three">
            <PanelCard />
            <PanelCard />
            <PanelCard />
          </div>
        </SectionCard>

        {/* ===== Financial history ===== */}
        <SectionCard titleWidth={140} subtitleWidth={150}>
          <div className="sk-three">
            <PanelCard chart />
            <PanelCard chart />
            <PanelCard chart />
          </div>
        </SectionCard>

        {/* ===== Ecosystem ===== */}
        <SectionCard titleWidth={160} subtitleWidth="42%">
          <div className="sk-three">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  border: "0.5px solid #e5e5e2",
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <Skeleton width={90} height={14} style={{ marginBottom: 12 }} />
                <Skeleton height={11} style={{ marginBottom: 8 }} />
                <Skeleton width="70%" height={11} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ===== Competitors ===== */}
        <SectionCard titleWidth={110} subtitleWidth="60%">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  border: "0.5px solid #e5e5e2",
                  borderTop: "3px solid #e8e8e4",
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <Skeleton width={36} height={36} radius="50%" />
                  <Skeleton width={90} height={13} />
                </div>
                <Skeleton height={11} style={{ marginBottom: 8 }} />
                <Skeleton width="80%" height={11} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ===== Explore companies ===== */}
        <div style={{ marginTop: 32 }}>
          <Skeleton width={170} height={15} style={{ marginBottom: 14 }} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  border: "0.5px solid #e5e5e2",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Skeleton width={28} height={28} radius={8} />
                  <Skeleton width={90} height={13} />
                </div>
                <Skeleton height={10} style={{ marginBottom: 7 }} />
                <Skeleton width="70%" height={10} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}