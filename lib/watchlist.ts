import { useSyncExternalStore } from "react";

/**
 * Watchlist storage (browser only).
 *
 * The list of saved company slugs lives in localStorage, so it needs no login
 * and no database. It stays on this device and this browser. When Scope gets
 * accounts, only this file needs to change.
 */

const STORAGE_KEY = "scope-watchlist-v1";

const EMPTY: string[] = [];
const listeners = new Set<() => void>();

// useSyncExternalStore needs the same array object back until the data changes.
let cachedRaw: string | null | undefined;
let cachedList: string[] = EMPTY;

function read(): string[] {
  if (typeof window === "undefined") return EMPTY;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode, browser setting): act as empty.
    return cachedList;
  }

  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;

  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedList = Array.isArray(parsed)
      ? [...new Set(parsed.filter((v): v is string => typeof v === "string"))]
      : EMPTY;
  } catch {
    cachedList = EMPTY;
  }

  return cachedList;
}

function write(next: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Fires when another tab changes the list.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Saved slugs, oldest first. Returns `null` on the server and during the first
 * client render, so callers can avoid flashing an "empty" state.
 */
export function useWatchlist(): string[] | null {
  return useSyncExternalStore<string[] | null>(subscribe, read, () => null);
}

export function toggleWatchlist(slug: string) {
  const current = read();

  write(
    current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug],
  );
}

export function removeFromWatchlist(slug: string) {
  write(read().filter((item) => item !== slug));
}