import type { Ref } from "react";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  maxLength?: number;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
};

/** A labelled plain-text input (holding names). */
export default function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  maxLength,
  placeholder,
  inputRef,
}: TextFieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-border bg-white px-3 text-body text-ink hover:border-primary"
      />
      {hint && (
        <p id={`${id}-hint`} className="text-small text-ink-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
