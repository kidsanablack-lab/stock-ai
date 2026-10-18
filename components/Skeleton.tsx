import type { CSSProperties } from "react";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  style?: CSSProperties;
};

export default function Skeleton({
  width = "100%",
  height = 12,
  radius,
  style,
}: SkeletonProps) {
  return (
    <div
      className="rounded-md bg-border/70 motion-safe:animate-pulse"
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: radius,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}