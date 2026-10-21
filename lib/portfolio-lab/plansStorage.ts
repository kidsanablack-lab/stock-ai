/* =====================================================================
   Portfolio Lab — Saved Plans: browser storage (Phase 6A).

   Plans live ONLY in this browser's localStorage. No server, no accounts,
   no analytics, nothing in the URL.

   Rules this file keeps:
   • The storage object is passed in, so tests can use a fake one.
   • Every read validates. A bad entry is set aside, never deleted.
   • Every change re-reads first, then writes, then reads back to check.
     That way a second browser tab cannot be overwritten by a stale list.
   • If storage is missing, full, unreadable, or from a newer version,
     nothing is written and the caller gets a plain-language reason.
   • Saved data is never replaced because parsing failed.
   ===================================================================== */

import { SCHEMA_VERSION, validatePlan, type SavedPlan } from "./plans";

export const STORAGE_KEY = "scope-portfolio-lab-plans";
export const MAX_IMPORT_CHARS = 2_000_000;

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** `unreadable` keeps the raw entries we could not use, untouched. */
export type PlansStore = { plans: SavedPlan[]; unreadable: unknown[] };

export type ParseResult =
  | { status: "ok"; store: PlansStore }
  | { status: "corrupt"; reason: string }
  | { status: "newer"; version: number };

export type ReadResult = ParseResult | { status: "unavailable" };

/* ---------- Parsing text ---------- */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Brings an older saved shape up to the current one.
 * Only version 1 exists so far, so there is nothing to convert yet. When
 * SCHEMA_VERSION goes up, add a step here for each older version.
 */
function migrateEnvelope(
  version: number,
  envelope: Record<string, unknown>,
): Record<string, unknown> | null {
  if (version === 1) return envelope;
  return null;
}

/** Reads the whole saved text. Never throws. */
export function parseStoreText(text: string): ParseResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    return { status: "corrupt", reason: "The saved data is not valid JSON." };
  }

  if (!isRecord(parsed)) {
    return { status: "corrupt", reason: "The saved data is not in the expected format." };
  }

  const version = parsed.schemaVersion;

  if (typeof version !== "number" || !Number.isInteger(version) || version < 1) {
    return { status: "corrupt", reason: "The saved data has no recognised version." };
  }

  if (version > SCHEMA_VERSION) return { status: "newer", version };

  const envelope = migrateEnvelope(version, parsed);
  if (!envelope) {
    return { status: "corrupt", reason: "The saved data is from a version this page cannot read." };
  }

  if (!Array.isArray(envelope.plans)) {
    return { status: "corrupt", reason: "The saved data has no list of plans." };
  }

  const plans: SavedPlan[] = [];
  const unreadable: unknown[] = [];
  const seen = new Set<string>();

  for (const item of envelope.plans) {
    const checked = validatePlan(item);

    // A duplicate id is set aside too, so the first plan with that id stays.
    if (checked.ok && !seen.has(checked.plan.id)) {
      seen.add(checked.plan.id);
      plans.push(checked.plan);
    } else {
      unreadable.push(item);
    }
  }

  return { status: "ok", store: { plans, unreadable } };
}

/* ---------- Reading and writing ---------- */

/** The browser's localStorage, or null when it cannot be used at all. */
export function getBrowserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;

  try {
    const storage = window.localStorage;
    storage.getItem(STORAGE_KEY); // some browsers throw only when it is touched
    return storage;
  } catch {
    return null;
  }
}

export function readStore(storage: StorageLike | null): ReadResult {
  if (!storage) return { status: "unavailable" };

  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return { status: "unavailable" };
  }

  if (raw === null) return { status: "ok", store: { plans: [], unreadable: [] } };

  return parseStoreText(raw);
}

export function serializeStore(store: PlansStore): string {
  return JSON.stringify({
    schemaVersion: SCHEMA_VERSION,
    plans: [...store.plans, ...store.unreadable],
  });
}

export type WriteResult =
  | { ok: true }
  | { ok: false; reason: "unavailable" | "quota" | "failed" };

function isQuotaError(error: unknown): boolean {
  if (!(error instanceof Error) && !isRecord(error)) return false;
  const e = error as { name?: string; code?: number };

  return (
    e.name === "QuotaExceededError" ||
    e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
    e.code === 22 ||
    e.code === 1014
  );
}

export function writeStore(storage: StorageLike | null, store: PlansStore): WriteResult {
  if (!storage) return { ok: false, reason: "unavailable" };

  const text = serializeStore(store);

  try {
    storage.setItem(STORAGE_KEY, text);
  } catch (error) {
    return { ok: false, reason: isQuotaError(error) ? "quota" : "failed" };
  }

  // Read it back. If the browser quietly did not keep it, say so.
  try {
    if (storage.getItem(STORAGE_KEY) !== text) return { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }

  return { ok: true };
}

const WRITE_MESSAGES = {
  unavailable: "Saving is not available in this browser, so nothing was saved.",
  quota:
    "The browser has no room left to save this. Nothing was saved. Delete a plan or export your plans, then try again.",
  failed: "The browser did not save the change, so nothing was saved.",
} as const;

function blockedMessage(read: Exclude<ReadResult, { status: "ok" }>): string {
  switch (read.status) {
    case "unavailable":
      return WRITE_MESSAGES.unavailable;
    case "newer":
      return "These plans were saved by a newer version of Scope, so nothing was changed.";
    default:
      return "The saved plans cannot be read, so nothing was changed.";
  }
}

type PlanOp<R> = (plans: readonly SavedPlan[]) => ({ ok: true; plans: SavedPlan[] } & R) | { ok: false; error: string };

/**
 * The one way to change saved plans: read fresh, apply the change in memory,
 * write, check. If any step fails, saved data is left exactly as it was.
 */
export function updateStore<R extends object>(
  storage: StorageLike | null,
  op: PlanOp<R>,
): { ok: true; result: { plans: SavedPlan[] } & R } | { ok: false; error: string } {
  const read = readStore(storage);
  if (read.status !== "ok") return { ok: false, error: blockedMessage(read) };

  const outcome = op(read.store.plans);
  if (!outcome.ok) return { ok: false, error: outcome.error };

  const written = writeStore(storage, {
    plans: outcome.plans,
    unreadable: read.store.unreadable,
  });
  if (!written.ok) return { ok: false, error: WRITE_MESSAGES[written.reason] };

  notifyPlansChanged();
  return { ok: true, result: outcome };
}

/** Drops the entries that could not be read. Valid plans stay. */
export function removeUnreadableEntries(
  storage: StorageLike | null,
): { ok: true } | { ok: false; error: string } {
  const read = readStore(storage);
  if (read.status !== "ok") return { ok: false, error: blockedMessage(read) };

  const written = writeStore(storage, { plans: read.store.plans, unreadable: [] });
  if (!written.ok) return { ok: false, error: WRITE_MESSAGES[written.reason] };

  notifyPlansChanged();
  return { ok: true };
}

/** Deletes everything saved here. Only for the explicit "start over" button. */
export function clearAllPlans(
  storage: StorageLike | null,
): { ok: true } | { ok: false; error: string } {
  if (!storage) return { ok: false, error: WRITE_MESSAGES.unavailable };

  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    return { ok: false, error: WRITE_MESSAGES.failed };
  }

  notifyPlansChanged();
  return { ok: true };
}

/* ---------- Keeping the page in step with storage ---------- */

// The page reads storage through useSyncExternalStore: the raw text is the
// snapshot, so there is one source of truth and other tabs show up too.

export const SNAPSHOT_LOADING = "\u0000loading";
export const SNAPSHOT_UNAVAILABLE = "\u0000unavailable";

export function readSnapshot(): string | null {
  const storage = getBrowserStorage();
  if (!storage) return SNAPSHOT_UNAVAILABLE;

  try {
    return storage.getItem(STORAGE_KEY);
  } catch {
    return SNAPSHOT_UNAVAILABLE;
  }
}

export function parseSnapshot(raw: string | null): ReadResult | { status: "loading" } {
  if (raw === SNAPSHOT_LOADING) return { status: "loading" };
  if (raw === SNAPSHOT_UNAVAILABLE) return { status: "unavailable" };
  if (raw === null) return { status: "ok", store: { plans: [], unreadable: [] } };

  return parseStoreText(raw);
}

const listeners = new Set<() => void>();

function notifyPlansChanged() {
  listeners.forEach((listener) => listener());
}

export function subscribeToPlans(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/* ---------- Export and import ---------- */

export function serializeExport(plans: readonly SavedPlan[], now: Date): string {
  return JSON.stringify(
    { schemaVersion: SCHEMA_VERSION, exportedAt: now.toISOString(), plans },
    null,
    2,
  );
}

/**
 * Checks an imported file before anything is saved. Malformed files give an
 * error message; they never throw and never touch saved plans.
 */
export function parseImportFile(
  text: string,
): { ok: true; plans: SavedPlan[]; skipped: number } | { ok: false; error: string } {
  if (text.length > MAX_IMPORT_CHARS) {
    return { ok: false, error: "That file is too large to be a Portfolio Lab export." };
  }

  const parsed = parseStoreText(text);

  if (parsed.status === "corrupt") {
    return { ok: false, error: `This is not a usable Portfolio Lab export. ${parsed.reason}` };
  }

  if (parsed.status === "newer") {
    return { ok: false, error: "This file was made by a newer version of Scope and cannot be imported here." };
  }

  if (parsed.store.plans.length === 0) {
    return {
      ok: false,
      error:
        parsed.store.unreadable.length > 0
          ? "None of the plans in this file could be read."
          : "This file has no plans in it.",
    };
  }

  return { ok: true, plans: parsed.store.plans, skipped: parsed.store.unreadable.length };
}
