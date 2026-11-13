import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "quiet"
  | "on-primary"
  | "on-primary-outline";

export type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border text-note font-semibold transition-colors disabled:cursor-not-allowed";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover disabled:border-border disabled:bg-white disabled:text-ink-muted",
  secondary:
    "border-border bg-white text-ink hover:border-primary hover:text-primary disabled:text-ink-muted",
  quiet:
    "border-transparent bg-white text-ink-muted hover:text-primary disabled:text-ink-muted",
  // For use on a solid blue panel (.on-primary). A blue button would vanish there.
  "on-primary":
    "border-white bg-white text-primary-ink hover:bg-primary-soft",
  "on-primary-outline":
    "border-white/60 bg-transparent text-white hover:border-white",
};

const SIZE: Record<ButtonSize, string> = {
  md: "h-10 px-4",
  lg: "h-11 px-5",
};

/** Class string for a button. Use it on an <a> when the control navigates. */
export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth = false,
  extra = "",
): string {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? "w-full" : ""} ${extra}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass(variant, size, fullWidth, className)}
      {...rest}
    />
  );
}
