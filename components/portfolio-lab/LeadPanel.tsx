import type { ReactNode } from "react";

type LeadPanelProps = {
  label: string;
  value: string;
  children?: ReactNode;
};

/** The one lead metric of a section, on a solid blue panel (DESIGN.md section 3). */
export default function LeadPanel({ label, value, children }: LeadPanelProps) {
  return (
    <div className="on-primary rounded-panel bg-primary p-6 text-white sm:rounded-panel-lg sm:p-8">
      <p className="text-small font-semibold">{label}</p>
      <p className="mt-2 break-words font-serif text-num-xl font-semibold tracking-title">
        {value}
      </p>
      {children && <div className="mt-4 space-y-3 text-small">{children}</div>}
    </div>
  );
}
