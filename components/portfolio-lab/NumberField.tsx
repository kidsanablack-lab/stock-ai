type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  hint?: string;
  prefix?: string;
  suffix?: string;
};

/** A labelled text input for numbers, with an optional prefix/suffix and error. */
export default function NumberField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  prefix,
  suffix,
}: NumberFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="pl-field">
      <label htmlFor={id}>{label}</label>

      <div
        className={
          prefix ? "pl-input-prefix" : suffix ? "pl-input-suffix" : undefined
        }
      >
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </div>

      {error ? (
        <p id={`${id}-error`} className="pl-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="pl-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
