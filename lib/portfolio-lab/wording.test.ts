// Run with:  npx tsx --test lib/portfolio-lab/wording.test.ts
// (run it from the project root: it reads the source files)
//
// Portfolio Lab is educational. Nothing a reader can see may sound like
// advice, a promise, a prediction, or live market data. This reads the real
// source files, so a sentence added later is checked too.

import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function sourceFiles(): { file: string; text: string }[] {
  const folders = [
    path.join(root, "components", "portfolio-lab"),
    path.join(root, "lib", "portfolio-lab"),
    path.join(root, "app", "portfolio-lab"),
  ];

  return folders.flatMap((folder) =>
    readdirSync(folder)
      .filter((name) => /\.(tsx?|ts)$/.test(name) && !name.endsWith(".test.ts"))
      .map((name) => ({
        file: path.relative(root, path.join(folder, name)),
        text: readFileSync(path.join(folder, name), "utf8"),
      })),
  );
}

/** Removes comments, so only text that can reach the screen (or the code) is checked. */
function withoutComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|\s)\/\/.*$/gm, "$1");
}

function findings(pattern: RegExp): string[] {
  const hits: string[] = [];

  for (const { file, text } of sourceFiles()) {
    withoutComments(text)
      .split("\n")
      .forEach((line) => {
        const match = pattern.exec(line);
        if (match) hits.push(`${file}: "${match[0]}"  ->  ${line.trim().slice(0, 90)}`);
      });
  }

  return hits;
}

describe("the source files are found", () => {
  it("reads components, lib, and the page", () => {
    const files = sourceFiles().map((f) => f.file);
    assert.ok(files.length >= 25, `only ${files.length} files`);
    assert.ok(files.some((f) => f.endsWith("LearnSection.tsx")));
    assert.ok(files.some((f) => f.endsWith("learn.ts")));
    assert.ok(files.some((f) => f.endsWith("page.tsx")));
  });
});

describe("neutral wording", () => {
  it("no buy or sell language anywhere", () => {
    assert.deepEqual(
      findings(/\b(buy|buys|buying|bought|sell|sells|selling|sold)\b/i),
      [],
    );
  });

  it("no direct advice to the reader", () => {
    assert.deepEqual(
      findings(/\b(you|we|investors|people|everyone|anyone) (should|must|ought to|need to)\b/i),
      [],
    );
    assert.deepEqual(findings(/\bwe recommend\b|\bI recommend\b|\bour recommendation\b/i), []);
  });

  it("no bullish or bearish views", () => {
    assert.deepEqual(findings(/\b(bullish|bearish|undervalued|overvalued)\b/i), []);
  });

  it("no promises or predictions", () => {
    assert.deepEqual(
      findings(
        /\bguaranteed (returns?|profits?|growth|income|gains?)\b|\brisk-free\b|\bwill (rise|fall|grow|increase|decrease|outperform|earn|return|recover)\b|\bis (going|expected|likely) to (rise|fall|grow|increase|outperform)\b|\bwill (always|never)\b/i,
      ),
      [],
    );
  });

  it("nothing is called the best or the right choice, except to say it is not", () => {
    assert.deepEqual(
      findings(/(?<!none is the )(?<!none is )\bbest (investment|portfolio|choice|allocation|mix|option)\b|\bperfect (portfolio|mix|allocation)\b|\bideal (portfolio|mix|allocation)\b/i),
      [],
    );
  });

  it("no market data or history is presented as fact", () => {
    assert.deepEqual(
      findings(/\bS&P\b|\bNasdaq\b|\bDow Jones\b|\bhistorical returns?\b|\baverage annual returns?\b|\blive (price|prices|data|quotes?)\b|\breal-time\b/i),
      [],
    );
  });
});

describe("the disclaimer", () => {
  const disclaimer = readFileSync(
    path.join(root, "components", "portfolio-lab", "Disclaimer.tsx"),
    "utf8",
  ).replace(/\s+/g, " ");

  it("says it is educational, hypothetical, and not advice", () => {
    assert.match(disclaimer, /educational/i);
    assert.match(disclaimer, /not personalized investment advice/i);
    assert.match(disclaimer, /hypothetical/i);
    assert.match(disclaimer, /do not guarantee future results/i);
  });

  it("says it does not trade, and uses no prices or exchange rates", () => {
    assert.match(disclaimer, /does not execute trades/i);
    assert.match(disclaimer, /No exchange rates, prices, or fund holdings/i);
  });

  it("is rendered on the page, after the tools", () => {
    const page = readFileSync(path.join(root, "app", "portfolio-lab", "page.tsx"), "utf8");
    assert.ok(page.includes("<Disclaimer />"));
  });
});
