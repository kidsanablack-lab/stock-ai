type Option<T extends string> = {
  value: T;
  title: string;
  note?: string;
};

type SegmentedProps<T extends string> = {
  legend: string;
  name: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  columns?: 2 | 3;
  hint?: string;
};

const COLUMNS = { 2: "grid-cols-2", 3: "grid-cols-3" };

/** Radio group drawn as buttons. The selected one also shows a check (not color alone). */
export default function Segmented<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  columns = 3,
  hint,
}: SegmentedProps<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 p-0 text-small font-semibold text-ink">{legend}</legend>

      <div className={`grid gap-2 ${COLUMNS[columns]}`}>
        {options.map((option) => {
          const checked = option.value === value;

          return (
            <label key={option.value} className="relative cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={`flex min-h-12 flex-col items-center justify-center rounded-xl border px-2 py-2 text-center text-note font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
                  checked
                    ? "border-primary bg-primary-soft text-primary-ink"
                    : "border-border bg-white text-ink hover:border-primary hover:text-primary"
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {checked && <i className="ti ti-check" aria-hidden="true" />}
                  {option.title}
                </span>
                {option.note && (
                  <span className="text-caption font-normal text-ink-muted">{option.note}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {hint && <p className="mt-2 text-small text-ink-muted">{hint}</p>}
    </fieldset>
  );
}
