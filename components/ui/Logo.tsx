import LogoMark from "@/components/ui/LogoMark";

type LogoProps = {
  /** Height of the mark in pixels. */
  size?: number;
  showWordmark?: boolean;
};

export default function Logo({ size = 26, showWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark height={size} />

      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-ink">
          Scope
        </span>
      )}
    </span>
  );
}