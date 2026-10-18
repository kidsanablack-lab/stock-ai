type LogoMarkProps = {
  /** Height in pixels. Width follows the mark's proportions. */
  height?: number;
  className?: string;
};

// The mark spans x 9-91 and y 20-80 of its 100x100 artboard.
const VIEW = { x: 9, y: 20, w: 82, h: 60 };

/**
 * Scope mark: two overlapping circles with the overlap left empty.
 * Decorative: the links that wrap it carry the accessible name.
 */
export default function LogoMark({ height = 28, className }: LogoMarkProps) {
  return (
    <svg
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      width={(height * VIEW.w) / VIEW.h}
      height={height}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M50 22.1A30 30 0 1 0 50 77.9A30 30 0 0 1 50 22.1Z" fill="#1D4ED8" />
      <path d="M50 22.1A30 30 0 1 1 50 77.9A30 30 0 0 0 50 22.1Z" fill="#0B1F4B" />
    </svg>
  );
}