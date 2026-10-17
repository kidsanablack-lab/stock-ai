type LogoProps = {
  size?: number;
  showWordmark?: boolean;
};

export default function Logo({ size = 28, showWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="17"
          cy="17"
          r="13"
          fill="none"
          strokeWidth="3"
          className="stroke-ink"
        />
        <line
          x1="26.5"
          y1="26.5"
          x2="37"
          y2="37"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-ink"
        />
        <path
          d="M11 17a6 6 0 0 1 6-6"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-primary"
        />
      </svg>

      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-ink">
          Scope
        </span>
      )}
    </span>
  );
}
