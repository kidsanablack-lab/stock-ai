import type { ReactNode } from "react";

export type DataColumn = {
  label: string;
  numeric?: boolean;
  /** Keep the header for screen readers only (an actions column). */
  srOnly?: boolean;
};

export type DataRow = {
  id: string | number;
  header: ReactNode;
  cells: ReactNode[];
};

type DataTableProps = {
  caption: string;
  regionLabel: string;
  firstColumn: string;
  columns: DataColumn[];
  rows: DataRow[];
  footer?: { header: ReactNode; cells: ReactNode[] };
};

/**
 * A native table that scrolls sideways inside its own box (DESIGN.md section 3):
 * focusable region, sticky first column, numbers right-aligned and tabular.
 */
export default function DataTable({
  caption,
  regionLabel,
  firstColumn,
  columns,
  rows,
  footer,
}: DataTableProps) {
  const cell = (column: DataColumn) =>
    `px-4 py-3 text-note text-ink ${column.numeric ? "text-right tabular-nums" : "text-left"}`;

  return (
    <div>
      <div
        role="region"
        aria-label={regionLabel}
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-border"
      >
        <table className="w-full whitespace-nowrap">
          <caption className="sr-only">{caption}</caption>

          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 bg-white px-4 py-3 text-left text-caption font-semibold text-ink-muted"
              >
                {firstColumn}
              </th>
              {columns.map((column) => (
                <th
                  key={column.label}
                  scope="col"
                  className={`px-4 py-3 text-caption font-semibold text-ink-muted ${
                    column.numeric ? "text-right" : "text-left"
                  }`}
                >
                  {column.srOnly ? <span className="sr-only">{column.label}</span> : column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <th
                  scope="row"
                  className="sticky left-0 bg-white px-4 py-3 text-left text-note font-semibold text-ink"
                >
                  {row.header}
                </th>
                {row.cells.map((content, index) => (
                  <td key={index} className={cell(columns[index])}>
                    {content}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          {footer && (
            <tfoot>
              <tr className="border-t border-ink">
                <th
                  scope="row"
                  className="sticky left-0 bg-white px-4 py-3 text-left text-note font-semibold text-ink"
                >
                  {footer.header}
                </th>
                {footer.cells.map((content, index) => (
                  <td key={index} className={`${cell(columns[index])} font-semibold`}>
                    {content}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <p className="mt-2 text-caption text-ink-muted sm:hidden">
        Swipe sideways to see every column.
      </p>
    </div>
  );
}
