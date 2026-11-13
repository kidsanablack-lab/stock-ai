import { CATEGORIES, CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import type { CategoryId } from "@/lib/portfolio-lab/types";

/**
 * Chart colors (DESIGN.md section 3): at most six colored categories plus Other.
 * A category's color is fixed by its position in CATEGORIES, so it never
 * changes with size, rank or growth, and the palette is never cycled.
 * Categories after the sixth are drawn as one grey group in charts.
 */
const ORDER: string[] = CATEGORIES.map((category) => category.id);
const COLORED = 6;

export const OTHER_GROUP_LABEL = "Other categories";

export function isOverflowCategory(id: CategoryId): boolean {
  const index = ORDER.indexOf(id);
  return index < 0 || index >= COLORED;
}

export function categoryColor(id: CategoryId): string {
  return isOverflowCategory(id) ? "var(--cat-other)" : `var(--cat-${ORDER.indexOf(id) + 1})`;
}

export type ChartRow = {
  key: string;
  label: string;
  percent: number;
  amount: number;
  holdingCount: number;
  /** A CSS color. Unallocated rows use a hatch pattern instead (see DonutChart). */
  color: string;
  kind: "category" | "overflow" | "unallocated";
  /** For the grouped row: the names of the categories inside it. */
  members?: string[];
};

type CategoryInput = {
  category: CategoryId;
  percent: number;
  amount: number;
  holdingCount?: number;
};

/**
 * Turns category rows into chart rows: the first six categories keep their
 * own color, the others merge into one "Other categories" row, and unallocated
 * money (when the portfolio is below 100%) is its own row.
 */
export function toChartRows(
  categories: CategoryInput[],
  unallocated?: { percent: number; amount: number } | null,
): ChartRow[] {
  const rows: ChartRow[] = [];
  const overflow: CategoryInput[] = [];

  for (const row of categories) {
    if (row.percent <= 0) continue;

    if (isOverflowCategory(row.category)) {
      overflow.push(row);
      continue;
    }

    rows.push({
      key: row.category,
      label: CATEGORY_BY_ID[row.category].label,
      percent: row.percent,
      amount: row.amount,
      holdingCount: row.holdingCount ?? 0,
      color: categoryColor(row.category),
      kind: "category",
    });
  }

  if (overflow.length > 0) {
    rows.push({
      key: "other-categories",
      label: OTHER_GROUP_LABEL,
      percent: overflow.reduce((sum, row) => sum + row.percent, 0),
      amount: overflow.reduce((sum, row) => sum + row.amount, 0),
      holdingCount: overflow.reduce((sum, row) => sum + (row.holdingCount ?? 0), 0),
      color: "var(--cat-other)",
      kind: "overflow",
      members: overflow.map((row) => CATEGORY_BY_ID[row.category].short),
    });
  }

  if (unallocated && unallocated.percent > 0) {
    rows.push({
      key: "unallocated",
      label: "Unallocated",
      percent: unallocated.percent,
      amount: unallocated.amount,
      holdingCount: 0,
      color: "var(--color-border)",
      kind: "unallocated",
    });
  }

  return rows;
}
