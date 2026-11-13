import { formatCompactMoney, formatMoney } from "@/lib/portfolio-lab/currency";
import type { CurrencyCode } from "@/lib/portfolio-lab/types";

/**
 * Lines are told apart by color, dash pattern and an end marker, so color is
 * never the only cue (DESIGN.md section 2, rule 6). Classes are written in full for Tailwind.
 */
export const LINE_STYLES = {
  principal: { stroke: "stroke-ink-muted", dash: "6 5", width: 2 },
  balance: { stroke: "stroke-primary", dash: undefined, width: 3 },
  s1: { stroke: "stroke-chart-1", dash: undefined, width: 3 },
  s2: { stroke: "stroke-chart-2", dash: "10 5", width: 3 },
  s3: { stroke: "stroke-chart-outline", dash: "1 7", width: 3 },
} as const;

export type LineTone = keyof typeof LINE_STYLES;

export type ChartSeries = {
  id: string;
  label: string;
  tone: LineTone;
  /** A short text drawn next to the last point, such as the scenario number. */
  marker?: string;
  /** One value per month, from month 0 to the last month. */
  values: number[];
};

type ProjectionChartProps = {
  series: ChartSeries[];
  currency: CurrencyCode;
  summary: string;
};

const WIDTH = 576;
const HEIGHT = 300;
const MARGIN = { left: 64, right: 30, top: 16, bottom: 34 };

/** Legend sample that matches a line on the chart. */
export function LineSample({ tone }: { tone: LineTone }) {
  const style = LINE_STYLES[tone];

  return (
    <svg className="h-3 w-7 shrink-0" viewBox="0 0 28 12" aria-hidden="true">
      <line
        x1="3"
        x2="25"
        y1="6"
        y2="6"
        className={style.stroke}
        strokeWidth={style.width}
        strokeDasharray={style.dash}
        strokeLinecap="round"
      />
    </svg>
  );
}

function niceCeil(value: number): number {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;
  const step = [1, 2, 2.5, 5, 10].find((candidate) => normalized <= candidate) ?? 10;
  return step * magnitude;
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

export default function ProjectionChart({ series, currency, summary }: ProjectionChartProps) {
  const months = series[0]?.values.length ? series[0].values.length - 1 : 0;
  const maxValue = Math.max(0, ...series.flatMap((item) => item.values));

  if (months < 1 || !(maxValue > 0) || !Number.isFinite(maxValue)) {
    return (
      <p className="text-note text-ink-muted">
        Not available. Add an initial investment or a contribution to see the projection.
      </p>
    );
  }

  const top = niceCeil(maxValue);
  const plotWidth = WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const x = (month: number) => MARGIN.left + (month / months) * plotWidth;
  const y = (value: number) => MARGIN.top + (1 - Math.min(value, top) / top) * plotHeight;

  const yTicks = [0, 1, 2, 3, 4].map((index) => (top / 4) * index);

  // X ticks in months for short plans, in years for longer ones.
  const useMonths = months <= 24;
  const stepMonths = useMonths
    ? 3
    : (months / 12 <= 6 ? 1 : months / 12 <= 15 ? 2 : months / 12 <= 30 ? 5 : 10) * 12;
  const xTicks: number[] = [];
  for (let month = 0; month <= months; month += stepMonths) xTicks.push(month);

  const sampleStep = months > 240 ? 2 : 1;

  function pathFor(values: number[]) {
    const parts: string[] = [];

    for (let month = 0; month <= months; month += sampleStep) {
      parts.push(`${parts.length === 0 ? "M" : "L"}${round1(x(month))} ${round1(y(values[month]))}`);
    }

    if (months % sampleStep !== 0) {
      parts.push(`L${round1(x(months))} ${round1(y(values[months]))}`);
    }

    return parts.join(" ");
  }

  const description = `${summary} ${series
    .map((item) => `${item.label} ends at ${formatMoney(item.values[months], currency)}.`)
    .join(" ")}`;

  return (
    <div>
      {/* A wide chart scrolls inside its own box on a phone so text stays 12px or more. */}
      <div
        role="region"
        aria-label="Projection chart. Scrolls sideways on small screens."
        tabIndex={0}
        className="overflow-x-auto"
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto block h-auto w-full min-w-xl max-w-3xl"
          role="img"
          aria-label={description}
        >
          {yTicks.map((tick, index) => (
            <g key={tick}>
              <line
                x1={MARGIN.left}
                x2={WIDTH - MARGIN.right}
                y1={round1(y(tick))}
                y2={round1(y(tick))}
                className={index === 0 ? "stroke-ink" : "stroke-border"}
                strokeWidth={index === 0 ? 1.5 : 1}
              />
              <text
                x={MARGIN.left - 8}
                y={round1(y(tick)) + 4}
                textAnchor="end"
                fontSize="12"
                className="fill-ink-muted"
              >
                {formatCompactMoney(tick, currency)}
              </text>
            </g>
          ))}

          {xTicks.map((month) => (
            <text
              key={month}
              x={round1(x(month))}
              y={HEIGHT - 10}
              textAnchor="middle"
              fontSize="12"
              className="fill-ink-muted"
            >
              {month === 0 ? "Start" : useMonths ? `${month} mo` : `Yr ${month / 12}`}
            </text>
          ))}

          {series.map((item) => {
            const style = LINE_STYLES[item.tone];

            return (
              <g key={item.id}>
                <path
                  d={pathFor(item.values)}
                  fill="none"
                  className={style.stroke}
                  strokeWidth={style.width}
                  strokeDasharray={style.dash}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle
                  cx={round1(x(months))}
                  cy={round1(y(item.values[months]))}
                  r="5"
                  className={`fill-white ${style.stroke}`}
                  strokeWidth="2.5"
                />
                {item.marker && (
                  <text
                    x={round1(x(months)) + 9}
                    y={round1(y(item.values[months])) + 4}
                    fontSize="12"
                    fontWeight="600"
                    className="fill-ink"
                  >
                    {item.marker}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-2 text-caption text-ink-muted sm:hidden">
        Swipe sideways to see the whole chart.
      </p>
    </div>
  );
}
