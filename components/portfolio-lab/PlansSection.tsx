"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { formatMoney } from "@/lib/portfolio-lab/currency";
import {
  MAX_PLANS,
  MAX_PLAN_NAME_LENGTH,
  addImportedPlans,
  buildPlanData,
  createPlan,
  deletePlan,
  duplicatePlan,
  planDataToState,
  plansDataEqual,
  renamePlan,
  updatePlanData,
  type SavedPlan,
} from "@/lib/portfolio-lab/plans";
import {
  SNAPSHOT_LOADING,
  clearAllPlans,
  getBrowserStorage,
  parseImportFile,
  parseSnapshot,
  readSnapshot,
  removeUnreadableEntries,
  serializeExport,
  subscribeToPlans,
  updateStore,
} from "@/lib/portfolio-lab/plansStorage";
import type { LabState } from "@/lib/portfolio-lab/state";
import type { ToolInputs } from "@/lib/portfolio-lab/toolInputs";
import "./portfolio-lab-plans.css";

type PlansSectionProps = {
  /** Read-only here. Loading a plan goes through onLoadPlan. */
  labState: LabState;
  tools: ToolInputs;
  onLoadPlan: (state: LabState, tools: ToolInputs) => void;
};

type Pending =
  | { kind: "load" | "delete" | "update"; id: string }
  | { kind: "clear" | "removeUnreadable" };

type Message = { tone: "success" | "error"; text: string };

const MAX_IMPORT_BYTES = 2_000_000;

const getServerSnapshot = () => SNAPSHOT_LOADING;

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(iso: string): string {
  const time = Date.parse(iso);
  return Number.isNaN(time) ? "unknown date" : dateFormat.format(time);
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function ConfirmBox({
  text,
  action,
  onConfirm,
  onCancel,
  danger,
}: {
  text: string;
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}) {
  return (
    <div className="pl-confirm-box" role="group" aria-label="Please confirm">
      <p>{text}</p>
      <div className="pl-confirm-actions">
        <button
          type="button"
          className={`pl-btn ${danger ? "pl-btn-danger" : "pl-btn-primary"}`}
          onClick={onConfirm}
        >
          {action}
        </button>
        <button type="button" className="pl-btn pl-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function PlansSection({ labState, tools, onLoadPlan }: PlansSectionProps) {
  // Saved plans are read straight from localStorage. The raw text is the
  // snapshot, so this page never keeps a second copy that could go stale,
  // and a change made in another tab shows up here too.
  const raw = useSyncExternalStore(subscribeToPlans, readSnapshot, getServerSnapshot);
  const read = useMemo(() => parseSnapshot(raw), [raw]);

  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);
  const [renaming, setRenaming] = useState<{ id: string; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const plans = useMemo(
    () => (read.status === "ok" ? read.store.plans : []),
    [read],
  );
  const unreadableCount = read.status === "ok" ? read.store.unreadable.length : 0;

  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)),
    [plans],
  );

  const activePlan = plans.find((plan) => plan.id === activeId) ?? null;

  const build = useMemo(() => buildPlanData(labState, tools), [labState, tools]);

  const dirty = activePlan
    ? !(build.ok && plansDataEqual(build.data, activePlan.data))
    : false;

  const canSave = read.status === "ok" && build.ok && plans.length < MAX_PLANS;
  const rawText = raw !== null && !raw.startsWith("\u0000") ? raw : null;

  /* ---------- Actions ---------- */

  function succeed(text: string) {
    setMessage({ tone: "success", text });
  }

  function fail(text: string) {
    setMessage({ tone: "error", text });
  }

  function handleSaveNew() {
    setMessage(null);
    if (!build.ok) return;

    const result = updateStore<{ plan: SavedPlan }>(getBrowserStorage(), (current) =>
      createPlan(current, { name, data: build.data, now: new Date() }),
    );

    if (!result.ok) return fail(result.error);

    setActiveId(result.result.plan.id);
    setName("");
    succeed(`Saved “${result.result.plan.name}” in this browser.`);
  }

  function handleUpdate(plan: SavedPlan) {
    setMessage(null);
    setPending(null);
    if (!build.ok) return;

    const result = updateStore<{ plan: SavedPlan }>(getBrowserStorage(), (current) =>
      updatePlanData(current, plan.id, build.data, new Date()),
    );

    if (!result.ok) return fail(result.error);
    succeed(`Updated “${plan.name}”.`);
  }

  function doLoad(plan: SavedPlan) {
    setMessage(null);
    setPending(null);

    try {
      const next = planDataToState(plan.data);
      onLoadPlan(next.state, next.tools);
      setActiveId(plan.id);
      succeed(`Loaded “${plan.name}”. It is now in the builder and the planning tools.`);
    } catch {
      fail("That plan could not be loaded. Your current portfolio was not changed.");
    }
  }

  function handleLoad(plan: SavedPlan) {
    // Loading replaces what is on screen. Ask first if that would lose work.
    const wouldLoseWork = activePlan ? dirty : labState.holdings.length > 0;

    if (wouldLoseWork) {
      setPending({ kind: "load", id: plan.id });
      return;
    }

    doLoad(plan);
  }

  function handleRename() {
    if (!renaming) return;
    setMessage(null);

    const result = updateStore<{ plan: SavedPlan }>(getBrowserStorage(), (current) =>
      renamePlan(current, renaming.id, renaming.text, new Date()),
    );

    if (!result.ok) return fail(result.error);

    setRenaming(null);
    succeed(`Renamed to “${result.result.plan.name}”.`);
  }

  function handleDuplicate(plan: SavedPlan) {
    setMessage(null);

    const result = updateStore<{ plan: SavedPlan }>(getBrowserStorage(), (current) =>
      duplicatePlan(current, plan.id, new Date()),
    );

    if (!result.ok) return fail(result.error);
    succeed(`Created “${result.result.plan.name}”.`);
  }

  function handleDelete(plan: SavedPlan) {
    setMessage(null);
    setPending(null);

    const result = updateStore<object>(getBrowserStorage(), (current) =>
      deletePlan(current, plan.id),
    );

    if (!result.ok) return fail(result.error);

    if (activeId === plan.id) setActiveId(null);
    succeed(`Deleted “${plan.name}”. The portfolio on screen was not changed.`);
  }

  function handleExport() {
    setMessage(null);
    downloadText(`scope-portfolio-plans-${today()}.json`, serializeExport(plans, new Date()));
    succeed("Downloaded a backup file of your plans.");
  }

  function handleImportFile(file: File | undefined) {
    setMessage(null);
    if (!file) return;

    if (file.size > MAX_IMPORT_BYTES) {
      return fail("That file is too large to be a Portfolio Lab export.");
    }

    file
      .text()
      .then((text) => {
        const parsed = parseImportFile(text);
        if (!parsed.ok) return fail(parsed.error);

        const result = updateStore<{ added: number }>(getBrowserStorage(), (current) =>
          addImportedPlans(current, parsed.plans),
        );
        if (!result.ok) return fail(result.error);

        const skipped =
          parsed.skipped > 0
            ? ` ${parsed.skipped} ${parsed.skipped === 1 ? "entry was" : "entries were"} skipped because they could not be read.`
            : "";

        succeed(
          `Imported ${result.result.added} ${result.result.added === 1 ? "plan" : "plans"} as new plans. Nothing you had saved was changed.${skipped}`,
        );
      })
      .catch(() => fail("That file could not be read."));
  }

  function handleRemoveUnreadable() {
    setPending(null);
    const result = removeUnreadableEntries(getBrowserStorage());

    if (!result.ok) return fail(result.error);
    succeed("Removed the entries that could not be read.");
  }

  function handleClearAll() {
    setPending(null);
    const result = clearAllPlans(getBrowserStorage());

    if (!result.ok) return fail(result.error);

    setActiveId(null);
    succeed("Cleared the saved plans in this browser.");
  }

  /* ---------- Pieces ---------- */

  /* ---------- Body ---------- */

  let body;

  if (read.status === "loading") {
    body = (
      <div className="pl-panel pl-pn-quiet">
        <p>Looking for plans saved in this browser…</p>
      </div>
    );
  } else if (read.status === "unavailable") {
    body = (
      <div className="pl-status is-over" role="alert">
        <i className="ti ti-alert-triangle" aria-hidden="true" />
        <div>
          <p className="pl-status-title">Saving is not available in this browser</p>
          <p className="pl-status-text">
            This browser is blocking storage for this page, which can happen in
            private browsing or when site data is turned off. Everything else
            on this page still works, but plans cannot be saved or loaded here.
            Nothing is being saved.
          </p>
        </div>
      </div>
    );
  } else if (read.status === "corrupt" || read.status === "newer") {
    body = (
      <div className="pl-panel">
        <div className="pl-status is-over" role="alert">
          <i className="ti ti-alert-triangle" aria-hidden="true" />
          <div>
            <p className="pl-status-title">
              {read.status === "newer"
                ? "These plans were saved by a newer version of Scope"
                : "The saved plans cannot be read"}
            </p>
            <p className="pl-status-text">
              {read.status === "newer"
                ? "This page does not know that newer format, so it will not open or change them."
                : `${read.reason} `}
              The saved data has not been changed, and your current portfolio is
              untouched. Saving is turned off until this is resolved.
            </p>
          </div>
        </div>

        <div className="pl-pn-actions">
          {rawText !== null && (
            <button
              type="button"
              className="pl-btn pl-btn-ghost"
              onClick={() => downloadText(`scope-portfolio-plans-unreadable-${today()}.json`, rawText)}
            >
              <i className="ti ti-download" aria-hidden="true" />
              Download the saved data
            </button>
          )}

          {read.status === "corrupt" && (
            <button
              type="button"
              className="pl-btn pl-btn-quiet"
              onClick={() => setPending({ kind: "clear" })}
            >
              Clear saved plans…
            </button>
          )}
        </div>

        {pending?.kind === "clear" && (
          <ConfirmBox
            onCancel={() => setPending(null)}
            danger
            text="Delete everything saved in this browser for Portfolio Lab? This cannot be undone. Download the data first if you want to keep a copy."
            action="Delete all saved plans"
            onConfirm={handleClearAll}
          />
        )}
      </div>
    );
  } else {
    body = (
      <>
        <div className="pl-panel pl-pn-save">
          <h3 className="pl-h3">Save what is on screen</h3>

          <p className="pl-pn-help">
            A plan keeps your holdings, investment amount, currency, DCA and
            calculator inputs, and rebalancing target. It does not keep results,
            which are always recalculated.
          </p>

          {!build.ok && (
            <div className="pl-status is-incomplete" role="status">
              <i className="ti ti-info-circle" aria-hidden="true" />
              <div>
                <p className="pl-status-title">Fix these before saving</p>
                <ul className="pl-pn-problems">
                  {build.problems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <form
            className="pl-pn-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (canSave) handleSaveNew();
            }}
          >
            <div className="pl-field">
              <label htmlFor="pl-plan-name">Plan name</label>
              <input
                id="pl-plan-name"
                type="text"
                value={name}
                maxLength={MAX_PLAN_NAME_LENGTH}
                placeholder="For example: Balanced plan, version 1"
                autoComplete="off"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="pl-pn-actions">
              <button type="submit" className="pl-btn pl-btn-primary" disabled={!canSave}>
                <i className="ti ti-device-floppy" aria-hidden="true" />
                Save as new plan
              </button>

              {activePlan && (
                <button
                  type="button"
                  className="pl-btn pl-btn-ghost"
                  disabled={!build.ok || !dirty}
                  onClick={() => setPending({ kind: "update", id: activePlan.id })}
                >
                  Update “{activePlan.name}”
                </button>
              )}
            </div>
          </form>

          {plans.length >= MAX_PLANS && (
            <p className="pl-hint">
              You have {MAX_PLANS} plans, the most this page keeps. Delete one to
              save another.
            </p>
          )}

          {activePlan && (
            <p className="pl-pn-active" role="status">
              <i
                className={`ti ${dirty ? "ti-pencil" : "ti-circle-check"}`}
                aria-hidden="true"
              />
              <span>
                <strong>{activePlan.name}</strong> is loaded.{" "}
                {dirty
                  ? "You have changes that are not saved. “Save as new plan” keeps the original as it is. “Update” replaces it."
                  : "There are no unsaved changes."}
              </span>
            </p>
          )}

          {pending?.kind === "update" && activePlan && pending.id === activePlan.id && (
            <ConfirmBox
            onCancel={() => setPending(null)}
              text={`Replace the saved version of “${activePlan.name}” with what is on screen now? The earlier saved version will be overwritten.`}
              action="Update plan"
              onConfirm={() => handleUpdate(activePlan)}
            />
          )}
        </div>

        {unreadableCount > 0 && (
          <div className="pl-status is-incomplete" role="status">
            <i className="ti ti-info-circle" aria-hidden="true" />
            <div>
              <p className="pl-status-title">
                {unreadableCount} saved {unreadableCount === 1 ? "entry" : "entries"} could
                not be read
              </p>
              <p className="pl-status-text">
                They are left untouched in this browser and are not shown below.
              </p>

              {pending?.kind === "removeUnreadable" ? (
                <ConfirmBox
            onCancel={() => setPending(null)}
                  danger
                  text="Remove the entries that cannot be read? Your readable plans stay. This cannot be undone."
                  action="Remove them"
                  onConfirm={handleRemoveUnreadable}
                />
              ) : (
                <button
                  type="button"
                  className="pl-btn pl-btn-quiet"
                  onClick={() => setPending({ kind: "removeUnreadable" })}
                >
                  Remove unreadable entries…
                </button>
              )}
            </div>
          </div>
        )}

        <div className="pl-pn-list-head">
          <h3 className="pl-h3">
            Saved plans <span className="pl-pn-count">({plans.length})</span>
          </h3>

          <div className="pl-pn-actions">
            <button
              type="button"
              className="pl-btn pl-btn-ghost"
              disabled={plans.length === 0}
              onClick={handleExport}
            >
              <i className="ti ti-download" aria-hidden="true" />
              Export backup
            </button>

            <button
              type="button"
              className="pl-btn pl-btn-ghost"
              onClick={() => fileInput.current?.click()}
            >
              <i className="ti ti-upload" aria-hidden="true" />
              Import from file
            </button>

            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="pl-pn-file"
              aria-label="Import plans from a backup file"
              tabIndex={-1}
              onChange={(event) => {
                handleImportFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </div>
        </div>

        {plans.length === 0 ? (
          <div className="pl-panel pl-empty">
            <i className="ti ti-folder-open" aria-hidden="true" />
            <p className="pl-empty-title">No saved plans yet</p>
            <p className="pl-empty-text">
              Build a portfolio above, give it a name, and choose “Save as new
              plan”. It will be listed here.
            </p>
          </div>
        ) : (
          <ul className="pl-pn-list">
            {sortedPlans.map((plan) => {
              const isActive = plan.id === activeId;
              const isRenaming = renaming?.id === plan.id;
              const count = plan.data.holdings.length;

              return (
                <li key={plan.id} className={`pl-pn-card${isActive ? " is-active" : ""}`}>
                  {isRenaming ? (
                    <form
                      className="pl-pn-rename"
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleRename();
                      }}
                    >
                      <div className="pl-field">
                        <label htmlFor={`pl-rename-${plan.id}`}>New name</label>
                        <input
                          id={`pl-rename-${plan.id}`}
                          type="text"
                          autoFocus
                          value={renaming.text}
                          maxLength={MAX_PLAN_NAME_LENGTH}
                          autoComplete="off"
                          onChange={(event) =>
                            setRenaming({ id: plan.id, text: event.target.value })
                          }
                        />
                      </div>
                      <div className="pl-pn-actions">
                        <button type="submit" className="pl-btn pl-btn-primary">
                          Save name
                        </button>
                        <button
                          type="button"
                          className="pl-btn pl-btn-ghost"
                          onClick={() => setRenaming(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="pl-pn-card-top">
                        <h4 className="pl-pn-name">{plan.name}</h4>

                        {isActive && (
                          <span className="pl-pn-badge">
                            <i
                              className={`ti ${dirty ? "ti-pencil" : "ti-circle-check"}`}
                              aria-hidden="true"
                            />
                            {dirty ? "Loaded, unsaved changes" : "Loaded"}
                          </span>
                        )}
                      </div>

                      <p className="pl-pn-summary">
                        {count} {count === 1 ? "holding" : "holdings"} ·{" "}
                        {formatMoney(plan.data.investment, plan.data.currency)}
                      </p>

                      <p className="pl-pn-dates">
                        Created {formatDate(plan.createdAt)} · Updated{" "}
                        {formatDate(plan.updatedAt)}
                      </p>

                      {pending && "id" in pending && pending.id === plan.id && pending.kind === "load" ? (
                        <ConfirmBox
            onCancel={() => setPending(null)}
                          text={`Load “${plan.name}”? This replaces what is in the builder and the planning tools now. Changes you have not saved will be lost.`}
                          action="Load plan"
                          onConfirm={() => doLoad(plan)}
                        />
                      ) : pending && "id" in pending && pending.id === plan.id && pending.kind === "delete" ? (
                        <ConfirmBox
            onCancel={() => setPending(null)}
                          danger
                          text={`Delete “${plan.name}”? This cannot be undone. The portfolio on screen is not affected.`}
                          action="Delete plan"
                          onConfirm={() => handleDelete(plan)}
                        />
                      ) : (
                        <div className="pl-pn-actions">
                          <button
                            type="button"
                            className="pl-btn pl-btn-primary"
                            onClick={() => handleLoad(plan)}
                            aria-label={`Load ${plan.name}`}
                          >
                            Load
                          </button>
                          <button
                            type="button"
                            className="pl-btn pl-btn-ghost"
                            onClick={() => setRenaming({ id: plan.id, text: plan.name })}
                            aria-label={`Rename ${plan.name}`}
                          >
                            Rename
                          </button>
                          <button
                            type="button"
                            className="pl-btn pl-btn-ghost"
                            disabled={plans.length >= MAX_PLANS}
                            onClick={() => handleDuplicate(plan)}
                            aria-label={`Duplicate ${plan.name}`}
                          >
                            Duplicate
                          </button>
                          <button
                            type="button"
                            className="pl-btn pl-btn-quiet"
                            onClick={() => setPending({ kind: "delete", id: plan.id })}
                            aria-label={`Delete ${plan.name}`}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }

  return (
    <section id="portfolio-plans" className="pl-section" aria-labelledby="pl-plans-title">
      <p className="pl-eyebrow">My Portfolio Plans</p>
      <h2 id="pl-plans-title" className="pl-h2">
        Save and reopen your plans
      </h2>
      <p className="pl-lead">
        Keep versions of a hypothetical portfolio, come back to them later, and
        compare ideas without starting over. Nothing is saved until you choose
        to save it, and loading a plan never changes a saved one.
      </p>

      <div className="pl-pn-privacy">
        <i className="ti ti-lock" aria-hidden="true" />
        <p>
          <strong>Stored only in this browser.</strong> Plans stay on this
          device. They are not sent to Scope or anyone else, they do not sync to
          your other devices, and they can be lost if you clear your browser
          data or use private browsing. Use “Export backup” to keep a copy.
        </p>
      </div>

      {message && (
        <p
          className={`pl-pn-message is-${message.tone}`}
          role={message.tone === "error" ? "alert" : "status"}
        >
          <i
            className={`ti ${message.tone === "error" ? "ti-alert-circle" : "ti-circle-check"}`}
            aria-hidden="true"
          />
          <span>{message.text}</span>
        </p>
      )}

      {body}
    </section>
  );
}
