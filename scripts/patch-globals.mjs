// Usage (from the project root): node scripts/patch-globals.mjs
// Applies 5 small edits to app/globals.css. Writes a .bak copy first.
// Nothing is written unless all 5 edits match.
import fs from "node:fs";

const file = process.argv[2] ?? "app/globals.css";
const css = fs.readFileSync(file, "utf8");

if (css.includes("./design-tokens.css")) {
  console.log("globals.css already patched. Nothing to do.");
  process.exit(0);
}

const TOP = `@import "tailwindcss";
@import "./design-tokens.css";

:root {
  --background: #ffffff;
  --foreground: #172b4d;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-fraunces), Georgia, "Times New Roman", serif;
}`;

const SELECTION = `::selection {
  background: rgb(37 99 235 / 0.18);
  color: var(--color-ink);
}`;

const HOVER_NOTE = `/* Global hover lift removed (Scope design system). */`;

const FOCUS = `/* Focus ring (in @layer base so Tailwind utilities can override it) */
@layer base {
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}`;

const steps = [
  {
    name: "top block (tokens import, remove broken dark mode)",
    re: /@import "tailwindcss";[\s\S]*?@media \(prefers-color-scheme: dark\) \{\s*:root \{[^}]*\}\s*\}/,
    out: () => TOP,
  },
  { name: "selection color", re: /::selection \{[^}]*\}/, out: () => SELECTION },
  {
    name: "global hover lift",
    re: /a:hover,\s*button:hover \{\s*transform: translateY\(-1px\);\s*\}/,
    out: () => HOVER_NOTE,
  },
  {
    name: "focus ring",
    re: /a:focus-visible,\s*button:focus-visible,\s*input:focus-visible,\s*textarea:focus-visible,\s*select:focus-visible \{[^}]*\}/,
    out: () => FOCUS,
  },
  {
    name: "body overflow-x",
    re: /(body \{[^}]*?)overflow-x: hidden;/,
    out: (_m, head) => `${head}overflow-x: clip;`,
  },
];

let next = css;
const failed = [];

for (const step of steps) {
  if (step.re.test(next)) {
    next = next.replace(step.re, step.out);
    console.log(`OK        ${step.name}`);
  } else {
    failed.push(step.name);
    console.log(`NOT FOUND ${step.name}`);
  }
}

if (failed.length > 0) {
  console.log("\nNothing written. Send me the NOT FOUND parts of globals.css.");
  process.exit(1);
}

fs.writeFileSync(`${file}.bak`, css);
fs.writeFileSync(file, next);
console.log(`\nPatched ${file} (backup: ${file}.bak)`);
