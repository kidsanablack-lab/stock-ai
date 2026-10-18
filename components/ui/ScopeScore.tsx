type ScopeScoreProps = {
  score: number;
  label: string;
  className?: string;
};

/** Score tiers stay in the blue family: 9+ solid, 7.5+ soft, below that neutral. */
function tone(score: number) {
  if (score >= 9) return "bg-primary text-white";
  if (score >= 7.5) return "bg-primary-soft text-primary-ink";
  return "border border-border bg-surface text-ink-muted";
}

/** Scope Score: a round badge with the score and its label next to it. */
export default function ScopeScore({
  score,
  label,
  className = "",
}: ScopeScoreProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink ${className}`}
    >
      <span
        className={`inline-grid h-7 min-w-7 place-items-center rounded-full px-1 text-[12.5px] tabular-nums ${tone(score)}`}
      >
        {score.toFixed(1)}
      </span>
      {label}
    </span>
  );
}