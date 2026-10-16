import type { CalcStatus, ValidationIssue } from "@/lib/valuation-lab";

const STATUS_TEXT: Record<CalcStatus, string> = {
  ok: "Calculated",
  missing_input: "Waiting for input",
  invalid_input: "Invalid input",
  undefined_result: "Undefined",
  not_meaningful: "Not meaningful",
};

const STATUS_ICON: Record<CalcStatus, string> = {
  ok: "ti-circle-check",
  missing_input: "ti-pencil",
  invalid_input: "ti-alert-circle",
  undefined_result: "ti-ban",
  not_meaningful: "ti-info-circle",
};

// Status is always shown as an icon AND text, never by color alone.
export function StatusBadge({ status }: { status: CalcStatus }) {
  return (
    <span className={`vl-status vl-status-${status}`}>
      <i className={`ti ${STATUS_ICON[status]}`} aria-hidden="true" />
      {STATUS_TEXT[status]}
    </span>
  );
}

export function IssueList({ issues }: { issues: ValidationIssue[] }) {
  if (issues.length === 0) return null;

  return (
    <ul className="vl-issues">
      {issues.map((issue, index) => (
        <li
          key={`${issue.code}-${issue.field}-${index}`}
          className={`vl-issue ${
            issue.severity === "error" ? "is-error" : "is-warning"
          }`}
        >
          <span className="vl-issue-tag">
            {issue.severity === "error" ? "Needs attention" : "Note"}
          </span>{" "}
          {issue.message}
        </li>
      ))}
    </ul>
  );
}