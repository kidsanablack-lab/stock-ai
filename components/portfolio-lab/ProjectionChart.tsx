import { formatCompactMoney, formatMoney } from "@/lib/portfolio-lab/currency";
import type { CurrencyCode } from "@/lib/portfolio-lab/types";

export type ChartSeries = {
  id: string;
  label: string;
  color: string;
  dashed?: boolean;
  /** One value per month, from month 0 to the last month. */
  values: number[];
};

type ProjectionChartProps = {
  series: ChartSeries[];
  currency: CurrencyCode;
  summary: string; // short description of what the chart shows
};

const WIDTH = 640;
const HEIGHT = 300;
const MARGIN = { left: 62, right: 16, top: 16, bottom: 34 };

/** Rounds a maximum up to a "nice" axis limit such as 1, 2, 2.5, 5, or 10 x 10^n. */
function niceCeil(value: number): number {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;
  const step = [1, 2, 2.5, 5, 10].find((candidate) => normalized <= candidate) ?? 10;
  return step * magnitude;
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

export default function ProjectionChart({
  series,
  currency,
  summary,
}: ProjectionChartProps) {
  const months = series[0]?.values.length ? series[0].values.length - 1 : 0;
  const maxValue = Math.max(0, ...series.flatMap((item) => item.values));

  if (months < 1 || !(maxValue > 0) || !Number.isFinite(maxValue)) {
    return (
      <p className="pl-chart-empty">
        Add an initial investment or a contribution to see the projection.
      </p>
    );
  }

  const top = niceCeil(maxValue);
  const plotWidth = WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const x = (month: number) => MARGIN.left + (month / months) * plotWidth;
  const y = (value: number) =>
    MARGIN.top + (1 - Math.min(value, top) / top) * plotHeight;

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

    if ((months % sampleStep) !== 0) {
      parts.push(`L${round1(x(months))} ${round1(y(values[months]))}`);
    }

    return parts.join(" ");
  }

  const description = `${summary} ${series
    .map((item) => `${item.label} ends at ${formatMoney(item.values[months], currency)}.`)
    .join(" ")}`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="pl-chart"
      role="img"
      aria-label={description}
    >
      {yTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={MARGIN.left}
            x2={WIDTH - MARGIN.right}
            y1={round1(y(tick))}
            y2={round1(y(tick))}
            stroke="#eeeeea"
            strokeWidth="1"
          />
          <text
            x={MARGIN.left - 8}
            y={round1(y(tick)) + 4}
            textAnchor="end"
            fontSize="11"
            fill="#8a8a86"
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
          fontSize="11"
          fill="#8a8a86"
        >
          {useMonths ? (month === 0 ? "Start" : `${month} mo`) : month === 0 ? "Start" : `Yr ${month / 12}`}
        </text>
      ))}

      {series.map((item) => (
        <path
          key={item.id}
          d={pathFor(item.values)}
          fill="none"
          stroke={item.color}
          strokeWidth={item.dashed ? 2 : 2.5}
          strokeDasharray={item.dashed ? "6 5" : undefined}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
