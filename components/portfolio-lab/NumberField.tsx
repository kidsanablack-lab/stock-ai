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

// Padding steps are picked by text length. Classes are written in full so
// Tailwind can see them.
function prefixPadding(text?: string) {
  if (!text) return "";
  if (text.length <= 1) return "pl-9";
  return text.length <= 3 ? "pl-14" : "pl-20";
}

function suffixPadding(text?: string) {
  if (!text) return "";
  if (text.length <= 1) return "pr-9";
  return text.length <= 5 ? "pr-16" : "pr-24";
}

/** A labelled text input for numbers, with an optional prefix or suffix and error. */
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
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-note text-ink-muted"
          >
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={`h-10 w-full rounded-xl border bg-white px-3 text-body tabular-nums text-ink hover:border-primary ${
            error ? "border-danger" : "border-border"
          } ${prefixPadding(prefix)} ${suffixPadding(suffix)}`}
        />

        {suffix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-note text-ink-muted"
          >
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-small text-danger">
          <i className="ti ti-alert-circle mt-0.5" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-small text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
