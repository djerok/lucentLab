# Lucent Lab — Testing

Two layers:

1. **`TEST_PLAN.md`** — manual checklist. Walks every animation and the cross-cutting UI. Run before any release.
2. **`unit/chemistry.test.ts`** — automated math regression. Pure functions only — no React, no DOM.

## Run automated tests

```
npm i -D vitest
npx vitest run testing/unit
```

## Reporting bugs

Append a row to the **Bug log** table at the bottom of `TEST_PLAN.md` with date, animation, symptom, and status.

## What's covered

- Titration proton-balance continuity (regression for the NH₄⁺ early-curve jump).
- Calorimetry T_f mixing identity.
- Stoichiometry limiting-reagent picker.
- Henderson-Hasselbalch buffer identity.

## What's not covered (intentionally manual)

- SVG / Canvas rendering — eyeball check via `TEST_PLAN.md`.
- Animation timing & rAF scheduling.
- Drag-rotate, slider feel, focus order — pure UX.
- **Study-mode content correctness** — overview wording, MCQ distractors, worked-example arithmetic, KaTeX rendering. Manual review via `TEST_PLAN.md § 1a`, guided by the authoring rules in `../STUDY_GUIDE_FORMAT.md`.
- **SVG label collisions in study diagrams** — inline SVG is dense with `<text>` elements. Skim every unit in Study mode and verify no labels overlap, no text extends past the viewBox, and no label collides with the top-left `.tag` title row.
