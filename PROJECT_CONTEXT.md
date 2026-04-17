# Project Context — Lucent Lab

> Read this first if you are an AI assistant joining this project. It captures the *intent* behind the codebase, decisions that aren't obvious from the code, and the conventions to keep when extending it.

## What it is

**Lucent Lab** is a single-page React app that hosts an interactive visual atlas for AP Chemistry. It is structured 1:1 against the CollegeBoard *AP Chemistry Course & Exam Description* (CED) — 9 units, ~70 topics — and binds an SVG-based animation to each topic where one would help a student build intuition.

The bar we are aiming for is **PhET-quality**: every animation is a real model (the math is correct), interactive (sliders/tabs change parameters live), and pedagogically framed (labels, equations, units shown alongside).

Every unit page has two modes: **Interact** (just the widgets) and **Study** (full written guide + animations inline + quick-check MCQs + a 15-question unit test). Study content lives in `src/data/study/unitNN.ts` and is rendered by `src/components/study/StudyGuide.tsx`. Authoring rules are in `STUDY_GUIDE_FORMAT.md` — read that before editing a unit file.

## Who it is for

High-school AP Chemistry students and their teachers. Assume the reader is encountering each concept for the first time. Equations should display canonically (the form they'll see on the exam), units should always be visible, and notation should match the CED.

## Tech stack — and what it is NOT

- React 19 + TypeScript (strict) + Vite + React Router.
- **Pure CSS variables** (`src/index.css`) — no Tailwind, no shadcn, no design-system library. Components consume tokens like `var(--paper)`, `var(--ink-1)`, `var(--phos)`, `var(--hot)`, etc.
- SVG + `requestAnimationFrame` for animation. No three.js, no canvas, no WebGL. SVG is enough for everything currently on the roadmap and keeps bundle small + accessible.
- KaTeX for study-mode math (`src/components/study/Math.tsx`). `$…$` inline parser; `formula` fields carry raw TeX. Don't introduce MathJax or a second math renderer.
- Vitest for math regression (`testing/unit/chemistry.test.ts`), no React Testing Library yet.

**Do not** add Tailwind, shadcn, framer-motion, three.js, or a styled-components-style runtime CSS solution without a strong reason. The earlier audit (see `testing/IMPROVEMENT_REPORT.md`) considered Tailwind+shadcn for the UI primitives upgrade and the maintainer chose to build pure-CSS-var equivalents instead. Stick with that.

## Repo map

```
src/
  animations/         One .tsx per simulation. Self-contained: state, math, SVG, controls all in one file.
  components/ui/      Shared interaction primitives (Slider, SlideTabs, SpotlightCard, AnimatedCounter, DefinedTerm).
  components/study/   StudyGuide.tsx (Lead/Interact/Body/UnitTest), MCQCard.tsx, Math.tsx (KaTeX + $…$ parser).
  pages/
    LandingPage.tsx   The "Nine units. One atlas." grid.
    UnitPage.tsx      Renders all topics for a unit; toggles Interact ↔ Study mode.
  data/
    curriculum.ts     Source of truth: units, topic IDs, weights — mirrors CED.
    study/
      types.ts        UnitStudyGuide / TopicStudy / Note / MCQ / InteractionGuide types.
      index.ts        slug → guide registry (getStudyGuide).
      unit01.ts…09.ts Per-unit content (overview, lead, interact, notes, MCQs, unit test).
  registry.tsx        Topic → animationKey binding + a shared keyTerms map.
  index.css           Theme tokens (paper/ink/line/hot/phos/acid/base/plasma/cool/...).
  main.tsx            Router setup.
testing/
  TEST_PLAN.md            Manual smoke + regression checklist.
  IMPROVEMENT_REPORT.md   Audit of what was wrong + status (look for **FIXED** markers).
  unit/chemistry.test.ts  Vitest math regressions (e.g. NH4+ pH continuity at V=0).
STUDY_GUIDE_FORMAT.md     Authoring spec for study-mode content — read before editing data/study/unitNN.ts.
public/                   Static assets copied verbatim into dist/.
```

## Architecture conventions

### Animations
- One `.tsx` per animation, kept self-contained (no shared state across animations). State lives in `useState`; expensive recomputations use `useMemo`; rAF loops always have cleanup.
- The component exports a default React component that takes no props (its parent just renders `<Anim />`).
- Always show **units** on every numeric readout. Always show the **equation** that produced the number, in canonical AP form.
- Where a piecewise approximation would create a discontinuity at a domain boundary, prefer the exact equation (e.g. weak-acid titration uses the proton-balance cubic, not Henderson-Hasselbalch + autoionization-only fallback).
- Color and styling come from CSS vars — never hard-code hex except for chemistry-meaningful colors (e.g. flame test colors, the pH→indicator color scale).

### Topic ↔ animation binding
- `src/registry.tsx` maps `animationKey` strings to `{ component, title }`.
- A single animation can be referenced by many topics. `UnitPage.tsx` uses a `Map<animationKey, firstSeenTopicId>` to deduplicate **per unit**: the animation renders once at its first topic, and subsequent topics in the same unit show a small "↑ See {anim.title} (Topic X.Y)" pointer instead of re-rendering. Different units that share a key still each render once.
- When adding a new animation: create the `.tsx` in `src/animations/`, add it to `src/registry.tsx`, then set `animationKey` on the relevant topic(s) in `src/curriculum.ts`.

### Shared UI primitives (`src/components/ui/`)
Always prefer these over hand-rolling, to keep the visual language consistent:

- `Slider.tsx` — replacement for `<input type="range">`. Floating value bubble above the thumb, hidden native input overlay (so keyboard + a11y still work), accent color from `accent` prop.
- `SlideTabs.tsx` — generic `<SlideTabs<T>>` with a sliding pill indicator (FLIP via `useLayoutEffect` + `getBoundingClientRect`, no framer dep).
- `SpotlightCard.tsx` — cursor-tracking radial gradient overlay. Used on the LandingPage units grid; pipe each unit's `hue` as `spotlightColor`.
- `AnimatedCounter.tsx` — rAF cubic-ease tween between numeric values. Wrap `{pH.toFixed(2)}` etc. with `<AnimatedCounter value={pH} decimals={2} />`.
- `DefinedTerm.tsx` — hover/focus tooltip with a dotted underline. Use for jargon (Ka, Ksp, ε, ΔH, etc.) so students can self-serve a definition.

When migrating an existing animation that has a local `Slider` wrapper, **keep the wrapper** — just have its body forward to `UISlider`. Zero call-site churn.

### Study-mode content (`src/data/study/`)

- One `unitNN.ts` per unit. Exports `UNIT_NN: UnitStudyGuide`. Registered by slug in `src/data/study/index.ts`.
- Each topic has: `overview` (1–2 sentences), `lead[]` (notes above the animation, first one carries the primary SVG), optional `interact` (tryThis / observe lists — only when the topic has an animationKey), `notes[]` (formal body notes including at least one `Worked example · …`), `mcqs[]` (4–5 quick checks).
- Each unit closes with a 15-question `unitTest` (ids `utX.1`–`utX.15`).
- Math: inline `$…$` in prose; `formula` fields hold raw TeX without `$`. Never hand-roll unicode math when KaTeX can render it (`Zeff` → `$Z_{\text{eff}}$`, `ΔH` in equations → `$\Delta H$`).
- Inline SVG diagrams theme via the shared CSS-var palette (`FG`/`DIM`/`FAINT`/`INK`/`LINE`) and the unit's curriculum `hue` as the accent. Every diagram includes a concrete `EXAMPLE · …` strip.
- Full authoring rules, KaTeX conventions, and SVG style checklist are in `STUDY_GUIDE_FORMAT.md`.

## Things that are deliberately not done (don't "fix" them)

- **No Tailwind / shadcn.** Considered and rejected. CSS vars are the design system.
- **No framer-motion.** SlideTabs uses native FLIP; if you need more, use the Web Animations API or rAF.
- **No backend, no auth, no analytics, no telemetry.** Static SPA on purpose.
- **No mobile-first refinement yet.** Layout assumes desktop ≥ 700 px. A mobile pass is in the backlog.
- **Animations don't share state.** Each is independently mountable/unmountable. Don't introduce a global animation context or "play all" controller.

## Common pitfalls when extending

- **Don't restyle the native `<input type="range">`.** Use `Slider.tsx` instead.
- **Don't introduce a piecewise pH formula** that branches on `Vb > 0` vs `Vb == 0` — that produced a real discontinuity bug that took a session to track down. Use the exact proton-balance cubic (see `Titration.tsx`'s `solveCubicPositive`).
- **Don't use `preserveAspectRatio="none"` on charts** — it stretches them on wide viewports. Use `xMidYMid meet` plus a `maxHeight` cap.
- **Don't reuse the same `animationKey` across multiple topics in one unit and expect both to render** — the dedup logic shows a pointer for the second one. If you genuinely want both rendered, use distinct keys.
- **Don't hardcode `EoxAnode`/`EredCathode` math without showing the canonical AP form** to the student. Internal math can stay; the on-screen equation must read `E°cell = E°cathode − E°anode`.
- **Don't treat H₂O as a generic material** in calorimetry pickers — water is the *calorimeter contents*, not a sample to drop in.
- **Don't hardcode text colors on theme-flipping backgrounds.** `var(--paper)` inverts between light and dark, so `color: '#0a0908'` on a `var(--paper)` pill reads fine in dark mode and becomes dark-on-dark in light mode. Use `var(--ink-0)` for "text that should always contrast with `--paper`."
- **Don't place SVG labels above the top edge of the viewBox or overlapping the title-row `.tag`** (typically at y≈22). Text at y < 18 is clipped; text crossing the title tag collides visually. Budget bottom padding for axis arrows (`r →` etc.).

## Workflow

```bash
npm run dev      # dev with HMR
npm run build    # production build
npm test         # math regressions
```

Manual verification checklist lives in `testing/TEST_PLAN.md`. After changing an animation's math, re-run the relevant Vitest case; after changing UI, re-run the corresponding TEST_PLAN section.

When fixing items from `testing/IMPROVEMENT_REPORT.md`, append `**FIXED**` to the end of the relevant section (and a short note describing how) so future readers — human or AI — can tell what's still open.

## When in doubt

The two questions to ask:
1. **Is the chemistry right?** (Match the CED. Use canonical equations. Show units.)
2. **Will a first-time AP student understand what they're looking at?** (Label everything. Animate the *change*, don't just snap to a new state. Use the shared primitives so the visual language stays consistent.)

If the answer to either is "no", iterate before merging.
