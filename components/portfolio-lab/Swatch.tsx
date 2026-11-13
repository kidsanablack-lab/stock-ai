import type { ChartRow } from "@/lib/portfolio-lab/categoryColor";

/** Color dot for a chart row. Unallocated money is a dashed outline, not a color. */
export default function Swatch({ row }: { row: Pick<ChartRow, "kind" | "color"> }) {
  if (row.kind === "unallocated") {
    return (
      <span
        className="size-3 shrink-0 rounded-full border border-dashed border-ink-muted bg-white"
        aria-hidden="true"
      />
    );
  }

  return (
    <span className="size-3 shrink-0 rounded-full" style={{ background: row.color }} aria-hidden="true" />
  );
}
