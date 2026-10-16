import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading"
      style={{
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        padding: "40px 20px 72px",
      }}
    >
      {/* Page title + intro */}
      <Skeleton width={240} height={28} style={{ marginBottom: 14 }} />
      <Skeleton width="60%" height={13} style={{ marginBottom: 8 }} />
      <Skeleton width="45%" height={13} style={{ marginBottom: 32 }} />

      {/* Main card */}
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #e5e5e2",
          borderRadius: 12,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <Skeleton width={44} height={44} radius={12} />
          <div style={{ flex: 1 }}>
            <Skeleton width={160} height={14} style={{ marginBottom: 8 }} />
            <Skeleton width={110} height={11} />
          </div>
        </div>

        <Skeleton height={11} style={{ marginBottom: 10 }} />
        <Skeleton width="92%" height={11} style={{ marginBottom: 10 }} />
        <Skeleton width="78%" height={11} />
      </div>

      {/* Second card */}
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #e5e5e2",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <Skeleton width={180} height={16} style={{ marginBottom: 18 }} />
        <Skeleton height={11} style={{ marginBottom: 10 }} />
        <Skeleton width="85%" height={11} style={{ marginBottom: 10 }} />
        <Skeleton width="65%" height={11} />
      </div>
    </div>
  );
}