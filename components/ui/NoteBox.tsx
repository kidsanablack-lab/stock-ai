import type { ReactNode } from "react";

type NoteBoxProps = {
  children: ReactNode;
  tone?: "note" | "problem";
  title?: string;
  icon?: string;
  role?: "status" | "alert";
  className?: string;
};

const TONE = {
  note: {
    box: "border-primary bg-primary-soft/45",
    icon: "ti-info-circle text-primary",
  },
  // System errors only (DESIGN.md section 3).
  problem: {
    box: "border-danger bg-danger-soft/60",
    icon: "ti-alert-circle text-danger",
  },
};

/** Note box (DESIGN.md section 3). Cautions use the blue note, not the warning color. */
export default function NoteBox({
  children,
  tone = "note",
  title,
  icon,
  role,
  className = "",
}: NoteBoxProps) {
  const style = TONE[tone];
  const iconClass = icon ? `${icon} ${style.icon.split(" ")[1]}` : style.icon;

  return (
    <div
      role={role}
      className={`flex items-start gap-3.5 rounded-r-2xl border-l-4 px-5 py-4 text-note text-ink ${style.box} ${className}`}
    >
      <i className={`ti ${iconClass} mt-0.5 text-xl`} aria-hidden="true" />
      <div className="min-w-0 space-y-1.5">
        {title && <p className="font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
