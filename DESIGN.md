# Scope Design System

Short guide. Read it before designing or building any Scope page. Values live in `app/design-tokens.css`; if this file and the CSS disagree, the CSS wins.

Stack: Next.js, Tailwind v4, Tabler icons (`ti ti-*`). The site is in English today; Thai comes later.

## 1. What Scope is

A business-education site for beginners. It explains companies, business models, financial performance, strengths, risks and competitors. It is **education, not advice**, and nothing should feel like a stock tip or a trading tool.

Philosophy: understand before impress. Data before decoration. Simple, but with depth available.

## 2. Always (every page)

These are the rules that make a page trustworthy. They don't bend.

1. **No advice.** Describe and compare on a named metric ("a higher operating margin than Company B"), never "better", "winner", "buy", "sell", "should", "undervalued", "overvalued", "cheap", "price target". A valuation is Scope analysis: show its inputs and state position as fact ("the price is inside the range").
2. **Label what kind of content it is:** *Real data* (reported figures and simple arithmetic), *Scope analysis* (scores, ratings, estimates, valuation ranges, AI summaries), or *Hypothetical example* (invented numbers, never mixed with real data).
3. **Missing is never 0.** Show "Not available" with the reason. A real zero is shown as zero. A chart gap is a gap, not a zero line.
4. **Every number has a source** (name, period, date). An estimate says "estimate" and who made it.
5. **Changes in numbers:** the arrow shows direction (▲ up, ▼ down); color shows judgment, and only where the metric's polarity is declared (higher-is-better, lower-is-better). Otherwise the pill is neutral. Never assume up is good. Use one `DeltaPill` component for every change.
6. **Readable by everyone:** text contrast ≥ 4.5:1, meaningful graphics ≥ 3:1 (or an outline), never color alone (add an arrow, word or number), everything works by keyboard with a visible focus ring, motion respects `prefers-reduced-motion`, nothing under 12px. An interactive chart must not be wrapped in `role="img"`.

## 3. The look

- **White pages, light only.** No dark mode, no grey panels. Blue is the brand. A solid blue panel is for a hero, a lead metric or a closing panel; use it sparingly.
- **Scope colors come from tokens.** Use the class (`bg-primary`) or `var(--color-ink)`; don't type the hex. Main ones: `ink`, `ink-muted`, `border`, `primary` (+ `-hover`, `-soft`, `-ink`), `navy`, `success`/`warning`/`danger` (+ `-soft`), blue ramp `chart-1…6`, `chart-outline`, `chart-compare`, `stage-1…4`, categories `--cat-1…6` and `--cat-other`, and the 7 Powers themes (`data-theme`). Add a new Scope color to the token file first.
- **Meaning colors (green, amber, red)** say one thing: a judgment about data (system errors may use red). Never decoration, never a category color.
- **Categories:** a category keeps one color across the page and never changes with growth, size or rank (show growth with a `DeltaPill`). No repeated color inside one chart; up to 6 categories plus "Other".
- **Company colors are the exception.** A company's own brand colors may be written as hex, kept in **one place per company** (that company's data), not scattered in components. Text on them must reach 4.5:1 (white or `ink`); they never carry good/bad meaning; a `DeltaPill` on top sits on a white backing.
- **Fonts:** Fraunces (serif) for headings and big standalone numbers; Geist (sans) for everything else. Numbers in tables, legends and axes use Geist with `tabular-nums` (Fraunces has no tabular figures).
- **Shape:** a few radii used consistently: 12px (buttons, inputs), 16px (inner cards), 24px (main cards), full (pills). Shadow only on floating layers (dropdowns, tooltips, dialogs).
- **Layout:** content max width 1120px, Tailwind spacing steps, breakpoints `sm` and `lg`. Check at 360, 768 and 1280px. The page never scrolls sideways; a visual that can't be read on a phone changes form (treemap becomes a list).

## 4. Writing

- Plain words, short sentences. Explain a term the first time it appears.
- Show what a number means ("$36 of every $100 of revenue").
- Formats: `$346.4B`, `$4.13T`, `+17.9%`, `−27.5%` (real minus), `+2.2 pts` for a difference between two percentages, `Nov 4, 2026`, `FY26`, `Q1 FY27`.

## 5. Each page is free

Company pages, Business Models, 7 Powers, Portfolio Lab, Valuation Lab, Compare and tool pages can each choose their own layout and charts to fit their data. What they share is sections 2 and 3.

Useful defaults, not rules:
- A content block reads: conclusion title → short lead → visual → one "how to read" line → source line.
- Chart picks: bars for money over time, a line per ratio, donut for up to 4 parts, treemap (list on mobile) for 5 to 7, comparison bars for one metric across companies, a table when people need to check many numbers.
- Tool pages can skip the title/lead/source pattern and arrange controls and results as the task needs.

## 6. Open items

- Focus ring: a button on a white card inside a blue panel gets a white ring on white. Decide a fix (a reset on the card, or a two-layer ring) before shipping one.
- Thai (later): Noto Sans/Serif Thai fallbacks are already in the token file. Add no letter-spacing on Thai, no uppercase or italics, line height ≥ 1.65.
- Disclaimer wording and the "Verified / Pending / Unavailable" data status definitions need a final review.

## 7. Changing this file

Tell Claude what you like or dislike and it will update this file (and `design-tokens.css` if a color, font or size changes). A page may break a rule when there's a good reason; note it in one line.