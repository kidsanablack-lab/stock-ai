import { useId } from "react";
import { PERIOD_LABELS, type FinancialPeriod } from "@/lib/valuation-lab";
import { parseNumericInput } from "@/lib/valuation-lab/numbers";

export const PERIOD_OPTIONS: { value: FinancialPeriod; label: string }[] = (
  Object.keys(PERIOD_LABELS) as FinancialPeriod[]
).map((period) => ({ value: period, label: PERIOD_LABELS[period] }));

/* ---------- Number input (kept as text while typing) ---------- */
export function NumberField({
  label,
  value,
  onChange,
  hint,
  prefix,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const invalid = parseNumericInput(value).status === "invalid";
  const describedBy =
    [hint ? hintId : null, invalid ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="vl-field">
      <label htmlFor={id} className="vl-label">
        {label}
      </label>

      <div className={`vl-input-wrap${invalid ? " is-invalid" : ""}`}>
        {prefix && (
          <span className="vl-affix" aria-hidden="true">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          className="vl-input"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />

        {suffix && (
          <span className="vl-affix" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>

      {hint && (
        <p id={hintId} className="vl-hint">
          {hint}
        </p>
      )}

      {invalid && (
        <p id={errorId} className="vl-error">
          <i className="ti ti-alert-circle" aria-hidden="true" /> Enter a plain
          number, such as 12.5.
        </p>
      )}
    </div>
  );
}

/* ---------- Text input ---------- */
export function TextField({
  label,
  value,
  onChange,
  hint,
  placeholder,
  type = "text",
  maxLength = 80,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  type?: "text" | "date";
  maxLength?: number;
}) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="vl-field">
      <label htmlFor={id} className="vl-label">
        {label}
      </label>

      <div className="vl-input-wrap">
        <input
          id={id}
          type={type}
          autoComplete="off"
          className="vl-input"
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={hint ? hintId : undefined}
        />
      </div>

      {hint && (
        <p id={hintId} className="vl-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ---------- Dropdown ---------- */
export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  hint?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="vl-field">
      <label htmlFor={id} className="vl-label">
        {label}
      </label>

      <div className="vl-input-wrap">
        <select
          id={id}
          className="vl-input vl-select"
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          aria-describedby={hint ? hintId : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {hint && (
        <p id={hintId} className="vl-hint">
          {hint}
        </p>
      )}
    </div>
  );
}