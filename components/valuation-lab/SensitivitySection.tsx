import {
  formatCurrency,
  formatPercent,
} from "@/lib/valuation-lab";
import type {
  SensitivityBuild,
  SensitivitySettings,
} from "@/lib/valuation-lab/analysis-form";
import { NumberField, SelectField } from "./Fields";

const SIZE_OPTIONS = [
  { value: "3", label: "3 × 3" },
  { value: "5", label: "5 × 5" },
  { value: "7", label: "7 × 7" },
];

export interface SelectedCell {
  row: number;
  col: number;
}

interface Props {
  currency: string;
  settings: SensitivitySettings;
  build: SensitivityBuild;
  selected: SelectedCell | null;
  onSettings: (key: keyof SensitivitySettings, value: string) => void;
  onSelect: (cell: SelectedCell | null) => void;
}

export default function SensitivitySection({
  currency,
  settings,
  build,
  selected,
  onSettings,
  onSelect,
}: Props) {
  const money = (value: number | null) => formatCurrency(value, currency);

  return (
    <div className="vl-panel">
      <div className="vl-note vl-note-soft" role="note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <p>
          Each cell reruns the main DCF with a different discount rate and
          terminal growth rate. Everything else stays as entered in the DCF
          inputs, and exploring this table never changes them. The center cell
          is the main model.
        </p>
      </div>

      <div className="vl-fields vl-fields-three">
        <NumberField
          label="Discount rate step"
          suffix="pts"
          value={settings.discountStep}
          onChange={(v) => onSettings("discountStep", v)}
          hint="Percentage points between rows (up to 5)."
        />
        <NumberField
          label="Terminal growth step"
          suffix="pts"
          value={settings.growthStep}
          onChange={(v) => onSettings("growthStep", v)}
          hint="Percentage points between columns (up to 5)."
        />
        <SelectField
          label="Table size"
          value={settings.points}
          options={SIZE_OPTIONS}
          onChange={(v) => onSettings("points", v)}
        />
      </div>

      {build.status === "unavailable" ? (
        <ul className="vl-issues">
          {build.reasons.map((reason) => (
            <li key={reason} className="vl-issue is-warning">
              <span className="vl-issue-tag">Needs attention</span> {reason}
            </li>
          ))}
        </ul>
      ) : (
        <SensitivityTable
          build={build}
          currency={currency}
          selected={selected}
          onSelect={onSelect}
          money={money}
        />
      )}
    </div>
  );
}

function SensitivityTable({
  build,
  selected,
  onSelect,
  money,
}: {
  build: Extract<SensitivityBuild, { status: "ok" }>;
  currency: string;
  selected: SelectedCell | null;
  onSelect: (cell: SelectedCell | null) => void;
  money: (value: number | null) => string;
}) {
  const { table, centerIndex } = build;
  const anyOk = table.cells.some((row) =>
    row.some((cell) => cell.status === "ok"),
  );

  const inRange =
    selected !== null &&
    selected.row < table.cells.length &&
    selected.col < table.terminalGrowthRates.length;
  const cell = inRange && selected ? table.cells[selected.row][selected.col] : null;
  const detail = cell && cell.result && cell.result.status === "ok" ? cell.result : null;

  return (
    <>
      {!anyOk && (
        <p className="vl-issue is-warning">
          <span className="vl-issue-tag">Note</span> No cell could be
          calculated yet. Complete the DCF inputs above and check that the
          discount rate is higher than the terminal growth rate.
        </p>
      )}

      <p className="vl-hint">
        Estimated value per share. Rows are discount rates. Columns are
        terminal growth rates. Select a cell to see what is behind it.
      </p>

      <div className="vl-table-wrap">
        <table className="vl-table vl-table-compare vl-sens">
          <caption className="vl-sr-only">
            Estimated value per share for different discount rates (rows) and
            terminal growth rates (columns)
          </caption>
          <thead>
            <tr>
              <th scope="col">Discount ↓ / Terminal growth →</th>
              {table.terminalGrowthRates.map((g, col) => (
                <th key={col} scope="col">
                  {formatPercent(g)}
                  {col === centerIndex && (
                    <span className="vl-sr-only"> (main model)</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.cells.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope="row">
                  {formatPercent(table.discountRates[rowIndex])}
                  {rowIndex === centerIndex && (
                    <span className="vl-sr-only"> (main model)</span>
                  )}
                </th>
                {row.map((c, colIndex) => {
                  const isSelected =
                    selected?.row === rowIndex && selected?.col === colIndex;
                  const isCenter =
                    rowIndex === centerIndex && colIndex === centerIndex;
                  return (
                    <td key={colIndex}>
                      <button
                        type="button"
                        className={`vl-cell-btn${isSelected ? " is-selected" : ""}${
                          isCenter ? " is-center" : ""
                        }${c.status === "unavailable" ? " is-na" : ""}`}
                        aria-pressed={isSelected}
                        aria-label={`Discount rate ${formatPercent(
                          c.discountRate,
                        )}, terminal growth ${formatPercent(
                          c.terminalGrowthRate,
                        )}: ${
                          c.status === "ok"
                            ? money(c.valuePerShare)
                            : "not available"
                        }`}
                        onClick={() =>
                          onSelect(
                            isSelected ? null : { row: rowIndex, col: colIndex },
                          )
                        }
                      >
                        {c.status === "ok" ? money(c.valuePerShare) : "N/A"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="vl-hint">
        The cell with the heavier outline is the main model. N/A means the
        value was not calculated.
      </p>

      <div className="vl-selected" aria-live="polite">
        {cell ? (
          <>
            <h4 className="vl-h4">Selected cell</h4>
            <dl className="vl-dl">
              <div>
                <dt>Discount rate</dt>
                <dd>{formatPercent(cell.discountRate)}</dd>
              </div>
              <div>
                <dt>Terminal growth rate</dt>
                <dd>{formatPercent(cell.terminalGrowthRate)}</dd>
              </div>
              {detail ? (
                <>
                  <div>
                    <dt>Enterprise value</dt>
                    <dd>{money(detail.enterpriseValue)}</dd>
                  </div>
                  <div>
                    <dt>Equity value</dt>
                    <dd>{money(detail.equityValue)}</dd>
                  </div>
                  <div>
                    <dt>Terminal value share of EV</dt>
                    <dd>{formatPercent(detail.terminalValueShareOfEv)}</dd>
                  </div>
                  <div>
                    <dt>Estimated value per share</dt>
                    <dd>{money(detail.valuePerShare)}</dd>
                  </div>
                </>
              ) : (
                <div>
                  <dt>Why it is N/A</dt>
                  <dd>{cell.reason ?? "Calculation unavailable."}</dd>
                </div>
              )}
            </dl>
          </>
        ) : (
          <p className="vl-hint">No cell selected.</p>
        )}
      </div>
    </>
  );
}