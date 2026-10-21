// Run with:  npx tsx --test lib/portfolio-lab/plansStorage.test.ts

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  addImportedPlans,
  buildPlanData,
  createPlan,
  deletePlan,
  duplicatePlan,
  renamePlan,
  updatePlanData,
  type SavedPlan,
} from "./plans";
import {
  MAX_IMPORT_CHARS,
  SNAPSHOT_LOADING,
  SNAPSHOT_UNAVAILABLE,
  STORAGE_KEY,
  clearAllPlans,
  parseImportFile,
  parseSnapshot,
  parseStoreText,
  readStore,
  removeUnreadableEntries,
  serializeExport,
  serializeStore,
  updateStore,
  writeStore,
  type StorageLike,
} from "./plansStorage";
import { draftsFromTemplate, initialState } from "./state";
import { TEMPLATES } from "./templates";
import { defaultToolInputs } from "./toolInputs";

const NOW = new Date("2026-10-20T10:00:00.000Z");
const LATER = new Date("2026-10-21T10:00:00.000Z");

/* A small stand-in for localStorage that can misbehave on purpose. */
type Options = {
  failSet?: "quota" | "other";
  failGet?: boolean;
  forgetWrites?: boolean;
};

function fakeStorage(initial?: string, options: Options = {}) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(STORAGE_KEY, initial);

  const storage: StorageLike & { data: Map<string, string>; options: Options } = {
    data,
    options,
    getItem(key) {
      if (storage.options.failGet) throw new Error("SecurityError");
      return data.has(key) ? (data.get(key) as string) : null;
    },
    setItem(key, value) {
      if (storage.options.failSet === "quota") {
        const error = new Error("full");
        error.name = "QuotaExceededError";
        throw error;
      }
      if (storage.options.failSet === "other") throw new Error("nope");
      if (storage.options.forgetWrites) return;
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
  };

  return storage;
}

function plan(overrides: Partial<SavedPlan> = {}): SavedPlan {
  const state = { ...initialState, holdings: draftsFromTemplate(TEMPLATES[0]) };
  const result = buildPlanData(state, defaultToolInputs());
  assert.ok(result.ok);

  return {
    id: "plan-a",
    name: "Conservative idea",
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
    data: result.ok ? result.data : (undefined as never),
    ...overrides,
  };
}

function stored(plans: unknown[], schemaVersion: unknown = 1) {
  return JSON.stringify({ schemaVersion, plans });
}

function okStore(storage: StorageLike) {
  const read = readStore(storage);
  assert.equal(read.status, "ok");
  return read.status === "ok" ? read.store : { plans: [], unreadable: [] };
}

describe("reading", () => {
  it("no saved plans is a normal, empty state", () => {
    const read = readStore(fakeStorage());
    assert.equal(read.status, "ok");
    assert.deepEqual(read.status === "ok" && read.store, { plans: [], unreadable: [] });
  });

  it("reads valid plans", () => {
    const read = readStore(fakeStorage(stored([plan({ id: "a" }), plan({ id: "b" })])));
    assert.ok(read.status === "ok");
    assert.equal(read.status === "ok" && read.store.plans.length, 2);
  });

  it("storage that is missing reports 'unavailable'", () => {
    assert.equal(readStore(null).status, "unavailable");
  });

  it("storage that throws on access reports 'unavailable'", () => {
    assert.equal(readStore(fakeStorage(undefined, { failGet: true })).status, "unavailable");
  });
});

describe("malformed saved data", () => {
  it("invalid JSON is 'corrupt' and does not throw", () => {
    for (const text of ["{not json", "", "undefined", "[1,2", "\u0000"]) {
      assert.equal(parseStoreText(text).status, "corrupt", JSON.stringify(text));
    }
  });

  it("valid JSON of the wrong shape is 'corrupt'", () => {
    for (const text of ["null", "42", '"text"', "[]", "{}", '{"plans":[]}']) {
      assert.equal(parseStoreText(text).status, "corrupt", text);
    }
  });

  it("plans that is not a list is 'corrupt'", () => {
    assert.equal(parseStoreText(JSON.stringify({ schemaVersion: 1, plans: {} })).status, "corrupt");
    assert.equal(parseStoreText(JSON.stringify({ schemaVersion: 1 })).status, "corrupt");
  });

  it("a bad version number is 'corrupt'", () => {
    for (const version of [0, -1, 1.5, "1", null]) {
      assert.equal(parseStoreText(stored([], version)).status, "corrupt", String(version));
    }
  });

  it("a newer version is reported, not read", () => {
    const result = parseStoreText(stored([plan()], 2));
    assert.deepEqual(result, { status: "newer", version: 2 });
  });

  it("a bad entry is set aside while good ones still load", () => {
    const broken = { id: "bad", name: "No data" };
    const read = parseStoreText(stored([plan({ id: "good" }), broken, 5, null]));

    assert.ok(read.status === "ok");
    if (read.status === "ok") {
      assert.deepEqual(read.store.plans.map((p) => p.id), ["good"]);
      assert.equal(read.store.unreadable.length, 3);
      assert.deepEqual(read.store.unreadable[0], broken);
    }
  });

  it("a duplicate plan id keeps the first and sets the second aside", () => {
    const read = parseStoreText(
      stored([plan({ id: "dup", name: "First" }), plan({ id: "dup", name: "Second" })]),
    );

    assert.ok(read.status === "ok");
    if (read.status === "ok") {
      assert.equal(read.store.plans.length, 1);
      assert.equal(read.store.plans[0].name, "First");
      assert.equal(read.store.unreadable.length, 1);
    }
  });

  it("a plan with a missing field is set aside, not crashed on", () => {
    const missing = JSON.parse(JSON.stringify(plan({ id: "m" })));
    delete missing.data.target;
    const read = parseStoreText(stored([missing]));

    assert.ok(read.status === "ok");
    if (read.status === "ok") assert.equal(read.store.plans.length, 0);
  });

  it("a plan with an invalid number is set aside", () => {
    const bad = JSON.parse(JSON.stringify(plan({ id: "n" })));
    bad.data.investment = "lots";
    const read = parseStoreText(stored([bad]));

    assert.ok(read.status === "ok");
    if (read.status === "ok") assert.equal(read.store.unreadable.length, 1);
  });
});

describe("saved data is never overwritten when it cannot be read", () => {
  it("corrupt JSON: a save is refused and the stored text is unchanged", () => {
    const storage = fakeStorage("{definitely not json");
    const result = updateStore(storage, (plans) => {
      const created = createPlan(plans, { name: "New", data: plan().data, now: NOW });
      return created;
    });

    assert.equal(result.ok, false);
    assert.equal(storage.data.get(STORAGE_KEY), "{definitely not json");
  });

  it("newer version: a save is refused and the stored text is unchanged", () => {
    const text = stored([plan()], 9);
    const storage = fakeStorage(text);
    const result = updateStore(storage, (plans) =>
      createPlan(plans, { name: "New", data: plan().data, now: NOW }),
    );

    assert.equal(result.ok, false);
    assert.equal(storage.data.get(STORAGE_KEY), text);
  });

  it("unreadable entries survive a normal save, untouched", () => {
    const broken = { id: "bad", something: "else" };
    const storage = fakeStorage(stored([plan({ id: "good" }), broken]));

    const result = updateStore(storage, (plans) =>
      createPlan(plans, { name: "Added", data: plan().data, now: NOW }),
    );
    assert.equal(result.ok, true);

    const after = JSON.parse(storage.data.get(STORAGE_KEY) as string);
    assert.equal(after.plans.length, 3);
    assert.deepEqual(after.plans[2], broken);
  });

  it("removing unreadable entries keeps the valid plans", () => {
    const storage = fakeStorage(stored([plan({ id: "good" }), { id: "bad" }]));

    assert.equal(removeUnreadableEntries(storage).ok, true);

    const store = okStore(storage);
    assert.equal(store.plans.length, 1);
    assert.equal(store.unreadable.length, 0);
  });

  it("clearing is explicit and works even when the data is corrupt", () => {
    const storage = fakeStorage("garbage");
    assert.equal(clearAllPlans(storage).ok, true);
    assert.equal(storage.data.has(STORAGE_KEY), false);
  });

  it("an operation that fails leaves storage exactly as it was", () => {
    const text = stored([plan({ id: "a" })]);
    const storage = fakeStorage(text);
    const result = updateStore(storage, (plans) => renamePlan(plans, "missing", "x", NOW));

    assert.equal(result.ok, false);
    assert.equal(storage.data.get(STORAGE_KEY), text);
  });
});

describe("storage that cannot save", () => {
  it("unavailable storage: says so and saves nothing", () => {
    const result = updateStore(null, (plans) =>
      createPlan(plans, { name: "New", data: plan().data, now: NOW }),
    );

    assert.equal(result.ok, false);
    assert.match(!result.ok ? result.error : "", /not available/i);
  });

  it("a full browser (quota): reports it and keeps the old data", () => {
    const text = stored([plan({ id: "a" })]);
    const storage = fakeStorage(text, { failSet: "quota" });
    const result = updateStore(storage, (plans) =>
      createPlan(plans, { name: "New", data: plan().data, now: NOW }),
    );

    assert.equal(result.ok, false);
    assert.match(!result.ok ? result.error : "", /no room/i);
    assert.equal(storage.data.get(STORAGE_KEY), text);
  });

  it("any other write error is reported, not hidden", () => {
    const storage = fakeStorage(undefined, { failSet: "other" });
    const result = updateStore(storage, (plans) =>
      createPlan(plans, { name: "New", data: plan().data, now: NOW }),
    );

    assert.equal(result.ok, false);
    assert.equal(storage.data.has(STORAGE_KEY), false);
  });

  it("a browser that quietly drops the write is caught by the read-back", () => {
    const storage = fakeStorage(undefined, { forgetWrites: true });
    const result = updateStore(storage, (plans) =>
      createPlan(plans, { name: "New", data: plan().data, now: NOW }),
    );

    assert.equal(result.ok, false);
  });

  it("writeStore reports each reason", () => {
    const empty = { plans: [], unreadable: [] };

    assert.deepEqual(writeStore(null, empty), { ok: false, reason: "unavailable" });
    assert.deepEqual(writeStore(fakeStorage(undefined, { failSet: "quota" }), empty), {
      ok: false,
      reason: "quota",
    });
    assert.deepEqual(writeStore(fakeStorage(undefined, { failSet: "other" }), empty), {
      ok: false,
      reason: "failed",
    });
  });
});

describe("save, load, rename, duplicate, delete through storage", () => {
  it("save then load returns the same plan", () => {
    const storage = fakeStorage();
    const data = plan().data;

    const saved = updateStore(storage, (plans) =>
      createPlan(plans, { name: "Saved one", data, now: NOW, id: "plan-x" }),
    );
    assert.equal(saved.ok, true);

    const store = okStore(storage);
    assert.equal(store.plans.length, 1);
    assert.equal(store.plans[0].id, "plan-x");
    assert.equal(store.plans[0].name, "Saved one");
    assert.deepEqual(store.plans[0].data, data);
  });

  it("update keeps one plan and changes its data and date", () => {
    const storage = fakeStorage(stored([plan({ id: "a" })]));
    const changed = JSON.parse(JSON.stringify(plan().data));
    changed.investment = 777;

    const result = updateStore(storage, (plans) => updatePlanData(plans, "a", changed, LATER));
    assert.equal(result.ok, true);

    const store = okStore(storage);
    assert.equal(store.plans.length, 1);
    assert.equal(store.plans[0].data.investment, 777);
    assert.equal(store.plans[0].updatedAt, LATER.toISOString());
    assert.equal(store.plans[0].createdAt, NOW.toISOString());
  });

  it("rename, duplicate, delete all persist", () => {
    const storage = fakeStorage(stored([plan({ id: "a" })]));

    updateStore(storage, (plans) => renamePlan(plans, "a", "Renamed", LATER));
    assert.equal(okStore(storage).plans[0].name, "Renamed");

    updateStore(storage, (plans) => duplicatePlan(plans, "a", LATER));
    const afterCopy = okStore(storage);
    assert.equal(afterCopy.plans.length, 2);
    assert.equal(afterCopy.plans[1].name, "Renamed (copy)");

    updateStore(storage, (plans) => deletePlan(plans, "a"));
    const afterDelete = okStore(storage);
    assert.deepEqual(afterDelete.plans.map((p) => p.name), ["Renamed (copy)"]);
  });

  it("a change re-reads storage first, so another tab's plan is not lost", () => {
    const storage = fakeStorage(stored([plan({ id: "a" })]));

    // Another tab saves "b" after this page last looked.
    storage.data.set(STORAGE_KEY, stored([plan({ id: "a" }), plan({ id: "b", name: "From tab 2" })]));

    updateStore(storage, (plans) => renamePlan(plans, "a", "Renamed here", LATER));

    const store = okStore(storage);
    assert.deepEqual(store.plans.map((p) => p.id), ["a", "b"]);
    assert.equal(store.plans[0].name, "Renamed here");
  });
});

describe("what is written to storage", () => {
  it("contains a schema version and no formatted money", () => {
    const text = serializeStore({ plans: [plan()], unreadable: [] });
    const parsed = JSON.parse(text);

    assert.equal(parsed.schemaVersion, 1);
    assert.doesNotMatch(text, /\$|฿|₭/);
  });

  it("is a round trip: write then read gives the same plans", () => {
    const original = [plan({ id: "a" }), plan({ id: "b", name: "Second" })];
    const storage = fakeStorage();

    assert.equal(writeStore(storage, { plans: original, unreadable: [] }).ok, true);
    assert.deepEqual(okStore(storage).plans, original);
  });
});

describe("page snapshot", () => {
  it("maps the sentinels and raw text to a status", () => {
    assert.equal(parseSnapshot(SNAPSHOT_LOADING).status, "loading");
    assert.equal(parseSnapshot(SNAPSHOT_UNAVAILABLE).status, "unavailable");
    assert.equal(parseSnapshot(null).status, "ok");
    assert.equal(parseSnapshot("{bad").status, "corrupt");
    assert.equal(parseSnapshot(stored([plan()])).status, "ok");
  });
});

describe("export and import", () => {
  it("an export can be imported again", () => {
    const original = [plan({ id: "a" }), plan({ id: "b", name: "Second" })];
    const file = serializeExport(original, NOW);
    const result = parseImportFile(file);

    assert.ok(result.ok);
    if (result.ok) {
      assert.deepEqual(result.plans, original);
      assert.equal(result.skipped, 0);
    }
  });

  it("malformed files give a message and no plans", () => {
    for (const text of ["", "not json", "[]", "{}", '{"schemaVersion":1,"plans":"x"}']) {
      const result = parseImportFile(text);
      assert.equal(result.ok, false, JSON.stringify(text));
      assert.ok(!result.ok && result.error.length > 10);
    }
  });

  it("a file from a newer version is refused", () => {
    assert.equal(parseImportFile(stored([plan()], 5)).ok, false);
  });

  it("an oversized file is refused before parsing", () => {
    const result = parseImportFile("x".repeat(MAX_IMPORT_CHARS + 1));
    assert.equal(result.ok, false);
  });

  it("good plans are imported and bad ones counted", () => {
    const result = parseImportFile(stored([plan({ id: "ok" }), { id: "bad" }]));

    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.plans.length, 1);
      assert.equal(result.skipped, 1);
    }
  });

  it("a file where nothing is readable is refused", () => {
    assert.equal(parseImportFile(stored([{ id: "bad" }])).ok, false);
    assert.equal(parseImportFile(stored([])).ok, false);
  });

  it("importing adds copies and never overwrites saved plans", () => {
    const storage = fakeStorage(stored([plan({ id: "same", name: "Mine" })]));
    const file = parseImportFile(stored([plan({ id: "same", name: "Theirs" })]));
    assert.ok(file.ok);

    const result = updateStore(storage, (plans) =>
      addImportedPlans(plans, file.ok ? file.plans : []),
    );
    assert.equal(result.ok, true);

    const store = okStore(storage);
    assert.deepEqual(store.plans.map((p) => p.name), ["Mine", "Theirs"]);
    assert.equal(new Set(store.plans.map((p) => p.id)).size, 2);
  });

  it("a failed import leaves saved plans exactly as they were", () => {
    const text = stored([plan({ id: "a" })]);
    const storage = fakeStorage(text, { failSet: "quota" });
    const file = parseImportFile(stored([plan({ id: "b" })]));

    const result = updateStore(storage, (plans) =>
      addImportedPlans(plans, file.ok ? file.plans : []),
    );

    assert.equal(result.ok, false);
    assert.equal(storage.data.get(STORAGE_KEY), text);
  });
});
