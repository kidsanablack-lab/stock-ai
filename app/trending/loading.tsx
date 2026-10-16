import Skeleton from "@/components/Skeleton";

const TABLE_COLUMNS =
  "44px minmax(260px, 2fr) minmax(130px, 1fr) 96px 100px 100px";

const CHIP_WIDTHS = [58, 96, 86, 76, 96, 76];
const NAME_WIDTHS = [110, 90, 120, 100, 96, 112];
const TAGLINE_WIDTHS = ["70%", "60%", "75%", "65%", "72%", "58%"];
const SECTOR_WIDTHS = [80, 70, 76, 84, 72, 78];

export default function TrendingLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading companies"
      style={{
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        padding: "40px 20px 72px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Skeleton width={210} height={28} style={{ marginBottom: 12 }} />
        <Skeleton width="55%" height={13} style={{ marginBottom: 8 }} />
        <Skeleton width={130} height={11} />
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <Skeleton height={46} radius={12} style={{ flex: 1, width: "auto" }} />
        <div className="sk-search-button">
          <Skeleton width={116} height={46} radius={12} />
        </div>
      </div>

      {/* Category chips */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {CHIP_WIDTHS.map((w, i) => (
          <Skeleton key={i} width={w} height={32} radius={20} />
        ))}
      </div>

      {/* Result count */}
      <Skeleton width={90} height={11} style={{ marginBottom: 12 }} />

      {/* Results */}
      <div
        className="sk-results"
        style={{
          background: "#ffffff",
          border: "1px solid #e5e5e2",
          borderRadius: 12,
          padding: "8px 24px",
          marginBottom: 24,
        }}
      >
        {/* Mobile cards */}
        <div className="sk-mobile-cards">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e5e2",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <Skeleton width={40} height={40} radius={10} />
                  <Skeleton width={NAME_WIDTHS[i]} height={13} />
                </div>
                <Skeleton width={48} height={24} radius={20} />
              </div>

              <Skeleton width={SECTOR_WIDTHS[i]} height={11} style={{ margin: "14px 0" }} />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  paddingTop: 14,
                  borderTop: "1px solid #f0f0ed",
                }}
              >
                <Skeleton height={28} />
                <Skeleton height={28} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="sk-desktop-table" style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 720 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: TABLE_COLUMNS,
                alignItems: "center",
                gap: 16,
                padding: "14px 0",
                borderBottom: "1px solid #e5e5e2",
              }}
            >
              <Skeleton width={10} height={10} />
              <Skeleton width={60} height={10} />
              <Skeleton width={44} height={10} />
              <Skeleton width={36} height={10} />
              <Skeleton width={64} height={10} />
              <Skeleton width={52} height={10} />
            </div>

            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: TABLE_COLUMNS,
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: i === 5 ? "none" : "1px solid #f0f0ed",
                }}
              >
                <Skeleton width={12} height={11} />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 0,
                  }}
                >
                  <Skeleton width={36} height={36} radius={9} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Skeleton width={NAME_WIDTHS[i]} height={13} style={{ marginBottom: 7 }} />
                    <Skeleton width={TAGLINE_WIDTHS[i]} height={10} />
                  </div>
                </div>

                <Skeleton width={SECTOR_WIDTHS[i]} height={12} />
                <Skeleton width={52} height={24} radius={20} />
                <Skeleton width={52} height={12} />
                <Skeleton width={46} height={12} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}