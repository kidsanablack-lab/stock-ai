"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import NoteBox from "@/components/ui/NoteBox";
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
import PlSection from "./PlSection";
import TextField from "./TextField";

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

/** Confirmation for an action that replaces or removes something. */
function ConfirmBox({
  text,
  action,
  onConfirm,
  onCancel,
}: {
  text: string;
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <NoteBox className="mt-3">
      <div role="group" aria-label="Please confirm" className="space-y-3">
        <p>{text}</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={onConfirm}>{action}</Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </NoteBox>
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

  const plans = useMemo(() => (read.status === "ok" ? read.store.plans : []), [read]);
  const unreadableCount = read.status === "ok" ? read.store.unreadable.length : 0;

  const sortedPlans = useMemo(
    () => [...plans].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)),
    [plans],
  );

  const activePlan = plans.find((plan) => plan.id === activeId) ?? null;

  const build = useMemo(() => buildPlanData(labState, tools), [labState, tools]);

  const dirty = activePlan ? !(build.ok && plansDataEqual(build.data, activePlan.data)) : false;

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

  /* ---------- Body ---------- */

  let body;

  if (read.status === "loading") {
    body = <p className="text-note text-ink-muted">Looking for plans saved in this browser…</p>;
  } else if (read.status === "unavailable") {
    body = (
      <NoteBox tone="problem" role="alert" title="Saving is not available in this browser">
        <p>
          This browser is blocking storage for this page, which can happen in private browsing or
          when site data is turned off. Everything else on this page still works, but plans cannot
          be saved or loaded here. Nothing is being saved.
        </p>
      </NoteBox>
    );
  } else if (read.status === "corrupt" || read.status === "newer") {
    body = (
      <Card>
        <NoteBox
          tone="problem"
          role="alert"
          title={
            read.status === "newer"
              ? "These plans were saved by a newer version of Scope"
              : "The saved plans cannot be read"
          }
        >
          <p>
            {read.status === "newer"
              ? "This page does not know that newer format, so it will not open or change them."
              : `${read.reason} `}
            The saved data has not been changed, and your current portfolio is untouched. Saving is
            turned off until this is resolved.
          </p>
        </NoteBox>

        <div className="mt-5 flex flex-wrap gap-2">
          {rawText !== null && (
            <Button
              variant="secondary"
              onClick={() => downloadText(`scope-portfolio-plans-unreadable-${today()}.json`, rawText)}
            >
              <i className="ti ti-download" aria-hidden="true" />
              Download the saved data
            </Button>
          )}

          {read.status === "corrupt" && (
            <Button variant="quiet" onClick={() => setPending({ kind: "clear" })}>
              Clear saved plans…
            </Button>
          )}
        </div>

        {pending?.kind === "clear" && (
          <ConfirmBox
            onCancel={() => setPending(null)}
            text="Delete everything saved in this browser for Portfolio Lab? This cannot be undone. Download the data first if you want to keep a copy."
            action="Delete all saved plans"
            onConfirm={handleClearAll}
          />
        )}
      </Card>
    );
  } else {
    body = (
      <>
        <Card>
          <h3 className="font-serif text-h3 font-normal text-ink">Save what is on screen</h3>

          <p className="mt-3 max-w-prose text-note text-ink-muted">
            A plan keeps your holdings, investment amount, currency, DCA and calculator inputs, and
            rebalancing target. It does not keep results, which are always recalculated.
          </p>

          {!build.ok && (
            <NoteBox className="mt-5" role="status" title="Fix these before saving">
              <ul className="list-disc space-y-1 pl-5">
                {build.problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </NoteBox>
          )}

          <form
            className="mt-5 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (canSave) handleSaveNew();
            }}
          >
            <TextField
              id="pl-plan-name"
              label="Plan name"
              value={name}
              maxLength={MAX_PLAN_NAME_LENGTH}
              placeholder="For example: Balanced plan, version 1"
              onChange={setName}
            />

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={!canSave}>
                <i className="ti ti-device-floppy" aria-hidden="true" />
                Save as new plan
              </Button>

              {activePlan && (
                <Button
                  variant="secondary"
                  disabled={!build.ok || !dirty}
                  onClick={() => setPending({ kind: "update", id: activePlan.id })}
                >
                  Update “{activePlan.name}”
                </Button>
              )}
            </div>
          </form>

          {plans.length >= MAX_PLANS && (
            <p className="mt-3 text-small text-ink-muted">
              You have {MAX_PLANS} plans, the most this page keeps. Delete one to save another.
            </p>
          )}

          {activePlan && (
            <p className="mt-4 flex items-start gap-2 text-note text-ink" role="status">
              <i
                className={`ti ${dirty ? "ti-pencil" : "ti-circle-check"} mt-0.5 text-primary`}
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">{activePlan.name}</strong> is loaded.{" "}
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
        </Card>

        {unreadableCount > 0 && (
          <NoteBox
            role="status"
            title={`${unreadableCount} saved ${unreadableCount === 1 ? "entry" : "entries"} could not be read`}
          >
            <p>They are left untouched in this browser and are not shown below.</p>

            {pending?.kind === "removeUnreadable" ? (
              <ConfirmBox
                onCancel={() => setPending(null)}
                text="Remove the entries that cannot be read? Your readable plans stay. This cannot be undone."
                action="Remove them"
                onConfirm={handleRemoveUnreadable}
              />
            ) : (
              <Button variant="quiet" onClick={() => setPending({ kind: "removeUnreadable" })}>
                Remove unreadable entries…
              </Button>
            )}
          </NoteBox>
        )}

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-h3 font-normal text-ink">
              Saved plans <span className="text-ink-muted">({plans.length})</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" disabled={plans.length === 0} onClick={handleExport}>
                <i className="ti ti-download" aria-hidden="true" />
                Export backup
              </Button>

              <Button variant="secondary" onClick={() => fileInput.current?.click()}>
                <i className="ti ti-upload" aria-hidden="true" />
                Import from file
              </Button>

              <input
                ref={fileInput}
                type="file"
                accept="application/json,.json"
                className="sr-only"
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
            <div className="mt-5 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-10 text-center">
              <i className="ti ti-folder-open text-3xl text-ink-muted" aria-hidden="true" />
              <p className="text-body font-semibold text-ink">No saved plans yet</p>
              <p className="max-w-sm text-note text-ink-muted">
                Build a portfolio above, give it a name, and choose “Save as new plan”. It will be
                listed here.
              </p>
            </div>
          ) : (
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {sortedPlans.map((plan) => {
                const isActive = plan.id === activeId;
                const isRenaming = renaming?.id === plan.id;
                const count = plan.data.holdings.length;
                const pendingHere = pending && "id" in pending && pending.id === plan.id ? pending : null;

                return (
                  <li
                    key={plan.id}
                    className={`min-w-0 rounded-3xl border bg-white p-5 hover:border-primary ${
                      isActive ? "border-primary" : "border-border"
                    }`}
                  >
                    {isRenaming ? (
                      <form
                        className="grid gap-4"
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleRename();
                        }}
                      >
                        <TextField
                          id={`pl-rename-${plan.id}`}
                          label="New name"
                          value={renaming.text}
                          maxLength={MAX_PLAN_NAME_LENGTH}
                          onChange={(text) => setRenaming({ id: plan.id, text })}
                        />
                        <div className="flex flex-wrap gap-2">
                          <Button type="submit">Save name</Button>
                          <Button variant="secondary" onClick={() => setRenaming(null)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="break-words text-body font-semibold text-ink">{plan.name}</h4>

                          {isActive && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-0.5 text-caption font-semibold text-primary-ink">
                              <i
                                className={`ti ${dirty ? "ti-pencil" : "ti-circle-check"}`}
                                aria-hidden="true"
                              />
                              {dirty ? "Loaded, unsaved changes" : "Loaded"}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-note text-ink">
                          {count} {count === 1 ? "holding" : "holdings"} ·{" "}
                          {formatMoney(plan.data.investment, plan.data.currency)}
                        </p>

                        <p className="mt-1 text-caption text-ink-muted">
                          Created {formatDate(plan.createdAt)} · Updated {formatDate(plan.updatedAt)}
                        </p>

                        {pendingHere?.kind === "load" ? (
                          <ConfirmBox
                            onCancel={() => setPending(null)}
                            text={`Load “${plan.name}”? This replaces what is in the builder and the planning tools now. Changes you have not saved will be lost.`}
                            action="Load plan"
                            onConfirm={() => doLoad(plan)}
                          />
                        ) : pendingHere?.kind === "delete" ? (
                          <ConfirmBox
                            onCancel={() => setPending(null)}
                            text={`Delete “${plan.name}”? This cannot be undone. The portfolio on screen is not affected.`}
                            action="Delete plan"
                            onConfirm={() => handleDelete(plan)}
                          />
                        ) : (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button onClick={() => handleLoad(plan)} aria-label={`Load ${plan.name}`}>
                              Load
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => setRenaming({ id: plan.id, text: plan.name })}
                              aria-label={`Rename ${plan.name}`}
                            >
                              Rename
                            </Button>
                            <Button
                              variant="secondary"
                              disabled={plans.length >= MAX_PLANS}
                              onClick={() => handleDuplicate(plan)}
                              aria-label={`Duplicate ${plan.name}`}
                            >
                              Duplicate
                            </Button>
                            <Button
                              variant="quiet"
                              onClick={() => setPending({ kind: "delete", id: plan.id })}
                              aria-label={`Delete ${plan.name}`}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </>
    );
  }

  return (
    <PlSection
      id="portfolio-plans"
      titleId="pl-plans-title"
      title="Save and reopen your plans"
      lead="Keep versions of a hypothetical portfolio, come back to them later, and compare ideas without starting over. Nothing is saved until you choose to save it, and loading a plan never changes a saved one."
    >
      <NoteBox icon="ti-lock">
        <p>
          <strong className="font-semibold">Stored only in this browser.</strong> Plans stay on this
          device. They are not sent to Scope or anyone else, they do not sync to your other devices,
          and they can be lost if you clear your browser data or use private browsing. Use “Export
          backup” to keep a copy.
        </p>
      </NoteBox>

      {message && (
        <NoteBox
          tone={message.tone === "error" ? "problem" : "note"}
          icon={message.tone === "error" ? "ti-alert-circle" : "ti-circle-check"}
          role={message.tone === "error" ? "alert" : "status"}
        >
          <p>{message.text}</p>
        </NoteBox>
      )}

      {body}
    </PlSection>
  );
}
