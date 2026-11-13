/** Provenance label chip (DESIGN.md section 2, rule 2). */
export function LabelChip({ kind }: { kind: "real" | "analysis" }) {
  return (
    <span className="inline-flex rounded-full border border-border px-3 py-1 text-caption text-ink-muted">
      {kind === "real" ? "Real data" : "Scope analysis"}
    </span>
  );
}

/** Required on every made-up illustration (DESIGN.md section 2, rule 2). */
export function HypotheticalTag() {
  return (
    <span className="inline-flex rounded-full bg-warning-soft px-2.5 py-0.5 text-caption font-semibold uppercase tracking-eyebrow text-warning">
      Hypothetical example
    </span>
  );
}
