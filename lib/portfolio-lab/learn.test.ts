// Run with:  npx tsx --test lib/portfolio-lab/learn.test.ts
// (run it from the project root: it reads the components folder)

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  JOURNEYS,
  LEARN_ANCHORS,
  LEARN_GROUPS,
  LEARN_TOPICS,
  SCOPE_PAGES,
  getTopic,
  topicsInGroup,
} from "./learn";

/** Every sentence a reader can see in the content file. */
function allText(): string {
  const topics = LEARN_TOPICS.flatMap((t) => [
    t.title,
    t.summary,
    ...t.paragraphs,
    t.keepInMind,
    t.tryIt?.text ?? "",
  ]);
  const journeys = JOURNEYS.flatMap((j) => [
    j.title,
    j.intro,
    ...j.steps.flatMap((s) => [s.text, "label" in s.action ? s.action.label : ""]),
  ]);
  const groups = LEARN_GROUPS.flatMap((g) => [g.title, g.text]);
  return [...topics, ...journeys, ...groups].join("\n");
}

describe("the fifteen topics from the spec", () => {
  const required = [
    "asset allocation",
    "diversification",
    "individual stocks vs etfs",
    "equity etfs vs bond etfs",
    "bonds and fixed income",
    "cash and equivalents",
    "bitcoin and cryptocurrency",
    "gold",
    "real estate and reits",
    "dollar-cost averaging",
    "compounding",
    "investment horizon",
    "rebalancing",
    "concentration risk",
    "currency risk",
  ];

  it("has all of them", () => {
    const titles = LEARN_TOPICS.map((t) => t.title.toLowerCase());
    for (const name of required) {
      assert.ok(
        titles.some((title) => title.startsWith(name)),
        `missing topic: ${name}`,
      );
    }
    assert.equal(LEARN_TOPICS.length, required.length);
  });

  it("ids are unique and URL-safe", () => {
    const ids = LEARN_TOPICS.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("every topic has a summary, a body, and a caution", () => {
    for (const topic of LEARN_TOPICS) {
      assert.ok(topic.summary.length > 20, topic.id);
      assert.ok(topic.summary.length <= 140, `${topic.id}: summary too long to scan`);
      assert.ok(topic.paragraphs.length >= 2, topic.id);
      assert.ok(topic.paragraphs.every((p) => p.length > 40), topic.id);
      assert.ok(topic.keepInMind.length > 20, topic.id);
    }
  });

  it("every topic belongs to a real group, and every group has topics", () => {
    const groupIds = new Set(LEARN_GROUPS.map((g) => g.id));
    for (const topic of LEARN_TOPICS) assert.ok(groupIds.has(topic.group), topic.id);
    for (const group of LEARN_GROUPS) assert.ok(topicsInGroup(group.id).length >= 3, group.id);
  });
});

describe("wording rules", () => {
  it("has no buy or sell language, no advice words, and no promises", () => {
    const banned =
      /\b(buy\w*|sell\w*|sold|should|must|best|safe|safest|guarantee\w*|will|recommend\w*|bullish|bearish|undervalued|overvalued|outperform\w*|always|certainly|definitely|risk-free)\b/i;

    const hits = allText()
      .split("\n")
      .filter((line) => banned.test(line))
      .map((line) => `${banned.exec(line)?.[0]}: ${line.slice(0, 80)}`);

    assert.deepEqual(hits, []);
  });

  it("never says that ETFs are diversified as a rule", () => {
    const text = allText();
    // "Not every ETF is diversified" is the sentence we WANT, so a leading
    // "not" is allowed.
    assert.doesNotMatch(text, /(?<!not\s)\b(every|all|any)\s+ETFs?\s+(is|are)\s+diversified/i);
    assert.doesNotMatch(text, /\bETFs\s+(are|is)\s+(always\s+)?diversified/i);
  });

  it("says plainly that not every ETF is diversified", () => {
    const etf = getTopic("stocks-vs-etfs");
    assert.ok(etf);
    assert.match(etf.keepInMind, /^Not every ETF is diversified/);
  });

  it("does not predict future prices", () => {
    assert.doesNotMatch(allText(), /\b(is going to|are going to|is expected to|will rise|will fall)\b/i);
  });
});

describe("links inside the page", () => {
  const componentsDir = path.join(process.cwd(), "components", "portfolio-lab");
  const source = readdirSync(componentsDir)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => readFileSync(path.join(componentsDir, file), "utf8"))
    .join("\n");

  it("every anchor points at a section id that exists in the components", () => {
    for (const [key, anchor] of Object.entries(LEARN_ANCHORS)) {
      assert.match(anchor.href, /^#[a-z-]+$/, key);
      const id = anchor.href.slice(1);
      assert.ok(source.includes(`id="${id}"`), `no section with id="${id}" (${key})`);
    }
  });

  it("every topic's tryIt uses a known anchor", () => {
    for (const topic of LEARN_TOPICS) {
      if (topic.tryIt) assert.ok(topic.tryIt.anchor in LEARN_ANCHORS, topic.id);
    }
  });
});

describe("journeys", () => {
  it("have steps, and every step has exactly one way to continue", () => {
    assert.ok(JOURNEYS.length >= 2);

    for (const journey of JOURNEYS) {
      assert.ok(journey.steps.length >= 4, journey.id);
      for (const step of journey.steps) {
        assert.ok(step.text.length > 15);
        assert.ok(["topic", "anchor", "page"].includes(step.action.kind));
      }
    }
  });

  it("topic steps point at topics that exist", () => {
    for (const journey of JOURNEYS) {
      for (const step of journey.steps) {
        if (step.action.kind === "topic") {
          assert.ok(getTopic(step.action.topicId), step.action.topicId);
        }
      }
    }
  });

  it("anchor steps use known anchors", () => {
    for (const journey of JOURNEYS) {
      for (const step of journey.steps) {
        if (step.action.kind === "anchor") assert.ok(step.action.anchor in LEARN_ANCHORS);
      }
    }
  });

  it("page steps use the declared Scope pages, and those are internal paths", () => {
    for (const journey of JOURNEYS) {
      for (const step of journey.steps) {
        if (step.action.kind === "page") assert.ok(step.action.page in SCOPE_PAGES);
      }
    }
    for (const page of Object.values(SCOPE_PAGES)) {
      assert.match(page.href, /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/);
    }
  });

  it("the first journey follows the example in the spec", () => {
    const steps = JOURNEYS[0].steps.map((s) =>
      s.action.kind === "topic" ? s.action.topicId : s.action.kind === "anchor" ? s.action.anchor : s.action.page,
    );
    assert.deepEqual(steps, ["nvidia", "concentration-risk", "stocks-vs-etfs", "builder", "whatIf"]);
  });

  it("the second journey goes from 7 Powers to portfolio risk", () => {
    const steps = JOURNEYS[1].steps.map((s) =>
      s.action.kind === "topic" ? s.action.topicId : s.action.kind === "anchor" ? s.action.anchor : s.action.page,
    );
    assert.equal(steps[0], "sevenPowers");
    assert.ok(steps.includes("diversification"));
    assert.ok(steps.includes("builder"));
  });

  it("say that competitive advantage does not remove investment risk", () => {
    const text = JOURNEYS[1].steps.map((s) => s.text).join(" ");
    assert.match(text, /does not remove investment risk/);
  });

  it("are framed as examples, not recommendations", () => {
    assert.match(JOURNEYS[0].intro, /example/i);
  });
});
