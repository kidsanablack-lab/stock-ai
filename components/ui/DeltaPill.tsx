export type Polarity = "higher-is-better" | "lower-is-better" | "neutral";
export type Direction = "up" | "down" | "flat";

export function directionOf(value: number): Direction {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

type DeltaPillProps = {
  direction: Direction;
  /** The formatted change with its sign, for example "+17.9%" or "−$1,200". */
  text: string;
  /** Default is neutral. Never infer a judgment from up or down (DESIGN.md section 2, rule 5). */
  polarity?: Polarity;
  word?: string;
  className?: string;
};

const ARROW: Record<Direction, string> = { up: "▲", down: "▼", flat: "●" };

function judgment(direction: Direction, polarity: Polarity) {
  if (direction === "flat" || polarity === "neutral") return null;
  const good = polarity === "higher-is-better" ? direction === "up" : direction === "down";
  return good ? "good" : "bad";
}

const STYLE = {
  good: "bg-success-soft text-success",
  bad: "bg-danger-soft text-danger",
  none: "border border-border bg-white text-ink-muted",
};

/** The one way to show a change (DESIGN.md section 2, rule 5). The arrow shows direction only. */
export default function DeltaPill({
  direction,
  text,
  polarity = "neutral",
  word,
  className = "",
}: DeltaPillProps) {
  const verdict = judgment(direction, polarity);
  const style = verdict ? STYLE[verdict] : STYLE.none;

  const amount = text.replace(/^[+−-]/, "");
  const directionWord =
    direction === "up" ? "up" : direction === "down" ? "down" : "no change";
  const spoken = [
    word,
    direction === "flat" ? directionWord : `${directionWord} ${amount}`,
    verdict ? (verdict === "good" ? ", better" : ", worse") : "",
  ]
    .filter(Boolean)
    .join(" ")
    .replace(" ,", ",");

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-caption font-semibold tabular-nums ${style} ${className}`}
    >
      <span aria-hidden="true">
        {ARROW[direction]} {word ? `${word} ` : ""}
        {text}
      </span>
      <span className="sr-only">{spoken}</span>
    </span>
  );
}
