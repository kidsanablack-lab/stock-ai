import { fieldState } from "./numbers";
import type { CalcStatus, IssueKind, ValidationIssue } from "./types";

export function issue(
  field: string,
  kind: IssueKind,
  code: string,
  message: string,
): ValidationIssue {
  return {
    code,
    field,
    kind,
    severity: kind === "questionable" ? "warning" : "error",
    message,
  };
}

/** Pushes an issue and returns false unless the value is a finite number. */
export function requireNumber(
  issues: ValidationIssue[],
  value: number | null | undefined,
  field: string,
  label: string,
): value is number {
  const state = fieldState(value);
  if (state === "missing") {
    issues.push(issue(field, "missing", `${field}_missing`, `${label} is required.`));
    return false;
  }
  if (state === "invalid") {
    issues.push(
      issue(field, "invalid", `${field}_not_finite`, `${label} must be a finite number.`),
    );
    return false;
  }
  return true;
}

export function requirePositive(
  issues: ValidationIssue[],
  value: number | null | undefined,
  field: string,
  label: string,
): value is number {
  if (!requireNumber(issues, value, field, label)) return false;
  if (value <= 0) {
    issues.push(
      issue(field, "invalid", `${field}_not_positive`, `${label} must be greater than zero.`),
    );
    return false;
  }
  return true;
}

export function requireNonNegative(
  issues: ValidationIssue[],
  value: number | null | undefined,
  field: string,
  label: string,
): value is number {
  if (!requireNumber(issues, value, field, label)) return false;
  if (value < 0) {
    issues.push(
      issue(field, "invalid", `${field}_negative`, `${label} cannot be negative.`),
    );
    return false;
  }
  return true;
}

export function hasErrors(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.severity === "error");
}

/** Missing outranks invalid, invalid outranks undefined. */
export function statusFromIssues(issues: ValidationIssue[]): CalcStatus {
  const errors = issues.filter((i) => i.severity === "error");
  if (errors.some((i) => i.kind === "missing")) return "missing_input";
  if (errors.some((i) => i.kind === "invalid")) return "invalid_input";
  if (errors.some((i) => i.kind === "undefined")) return "undefined_result";
  return "ok";
}