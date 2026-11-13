import { CATEGORY_BY_ID, UNALLOCATED_COLOR } from "@/lib/portfolio-lab/categories";
import { formatPercent } from "@/lib/portfolio-lab/currency";
import type {
  AllocationStatus,
  ChartSegment,
} from "@/lib/portfolio-lab/types";

type DonutChartProps = {
  segments: ChartSegment[];
  status: AllocationStatus;
  totalPercent: number;
};

const RADIUS = 15.9155; // circumference = 100, so lengths are in percent
const GAP = 0.8;

function segmentColor(segment: ChartSegment) {
  return segment.categoryId === "unallocated"
    ? UNALLOCATED_COLOR
    : CATEGORY_BY_ID[segment.categoryId].color;
}

function segmentOpacity(segment: ChartSegment) {
  if (segment.categoryId === "unallocated") return 1;
  return Math.max(0.45, 1 - segment.shade * 0.22);
}

function describe(
  segments: ChartSegment[],
  status: AllocationStatus,
  totalPercent: number,
) {
  if (segments.length === 0) {
    return "Allocation chart. No holding has an allocation above 0% yet.";
  }

  const parts = segments.map(
    (segment) => `${segment.label} ${formatPercent(segment.percent)}`,
  );

  const summary =
    status === "over"
      ? `Over-allocated: the total is ${formatPercent(totalPercent)}, above 100%. The ring shows each holding's share of that total.`
      : status === "incomplete"
        ? `The total allocated is ${formatPercent(totalPercent)}.`
        : `The total allocated is ${formatPercent(totalPercent)}.`;

  return `Allocation donut chart. ${parts.join(", ")}. ${summary}`;
}

export default function DonutChart({
  segments,
  status,
  totalPercent,
}: DonutChartProps) {
  
    const arcs = segments.map((segment, index) => {
    const cumulative = segments
      .slice(0, index)
      .reduce((sum, s) => sum + s.share, 0);
    const multiple = segments.length > 1;
    const gap = multiple ? Math.min(GAP, segment.share * 0.4) : 0;
    const dash = Math.max(segment.share - gap, 0.2);
    const start = cumulative + gap / 2;

    return {
      segment,
      dash,
      offset: (((25 - start) % 100) + 100) % 100,
    };
  });

  const isOver = status === "over";

  return (
    <div className="pl-donut">
      <div className="pl-donut-ring">
        <svg
          viewBox="0 0 42 42"
          role="img"
          aria-label={describe(segments, status, totalPercent)}
        >
          <circle
            cx="21"
            cy="21"
            r={RADIUS}
            fill="none"
            stroke="#eeeeea"
            strokeWidth="5.5"
          />

          {arcs.map(({ segment, dash, offset }) => (
            <circle
              key={segment.id}
              cx="21"
              cy="21"
              r={RADIUS}
              fill="none"
              stroke={segmentColor(segment)}
              strokeOpacity={segmentOpacity(segment)}
              strokeWidth="5.5"
              pathLength={100}
              strokeDasharray={`${dash} ${100 - dash}`}
              strokeDashoffset={offset}
            />
          ))}
        </svg>

        <div className={`pl-donut-center${isOver ? " is-over" : ""}`}>
          <span className="pl-donut-value">{formatPercent(totalPercent)}</span>
          <span className="pl-donut-label">
            {isOver ? "over 100%" : "allocated"}
          </span>
        </div>
      </div>

      {segments.length === 0 ? (
        <p className="pl-donut-empty">
          The chart appears as soon as a holding has an allocation above 0%.
        </p>
      ) : (
        <>
          <ul className="pl-legend" aria-label="Chart legend">
            {segments.map((segment) => (
              <li key={segment.id} className="pl-legend-item">
                <span
                  className="pl-swatch"
                  style={{
                    background: segmentColor(segment),
                    opacity: segmentOpacity(segment),
                  }}
                  aria-hidden="true"
                />

                <span className="pl-legend-name">
                  {segment.label}
                  {segment.categoryId !== "unallocated" && (
                    <small>{CATEGORY_BY_ID[segment.categoryId].short}</small>
                  )}
                </span>

                <span className="pl-legend-value">
                  {formatPercent(segment.percent)}
                </span>
              </li>
            ))}
          </ul>

          {isOver && (
            <p className="pl-donut-note">
              The ring can only show 100%, so each holding is drawn as its share
              of the {formatPercent(totalPercent)} total. The percentages above
              are the real values.
            </p>
          )}
        </>
      )}
    </div>
  );
}
