# 09 · Morphing Popover — "why?" button that morphs into a full explanation

**21st.dev URL:** https://21st.dev/community/components/motion-primitives/morphing-popover/default
**Author:** motion-primitives (ibelick)
**Category:** Popover
**Priority:** LOW — polish, not foundational.

## What it is

A small trigger button (icon or `?`) that, when clicked, morphs via a shared-element Framer Motion transition into a full popover surface. The trigger appears to "unfold" rather than a separate panel popping in next to it.

## Why Lucent Lab needs it

Tooltips (#05) work for hover-and-read. But some terms deserve a paragraph — a pop-over that you can click, read, and close. Morphing popover is a nicer affordance for that than a standard popover.

## Where to drop it in

| Location | Popover content |
|---|---|
| `Buffer.tsx` near HH equation | Full derivation of Henderson-Hasselbalch with a worked example |
| `Gibbs.tsx` on the quadrant chart | Explanation of each of the 4 quadrants |
| `EnergyProfile.tsx` on catalyst toggle | Why catalysts don't change ΔH, only Ea |
| `Titration.tsx` on curve | Half-equivalence trick: "At V = V_eq/2, pH = pKa" |
| `PES.tsx` on the photoionization circle | Connection from binding energy to orbital depth |
| `Galvanic.tsx` on E_cell display | Why E_cell = E°_cathode − E°_anode (both as reduction potentials) |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/ibelick/morphing-popover
```

## Usage

```tsx
import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "@/components/ui/morphing-popover";

<MorphingPopover>
  <MorphingPopoverTrigger>
    <button className="rounded-full w-6 h-6 border border-line">?</button>
  </MorphingPopoverTrigger>
  <MorphingPopoverContent className="w-80 p-4">
    <h4>Why half-equivalence?</h4>
    <p>At V = V_eq / 2, exactly half of the weak acid has been neutralized, so [HA] = [A⁻]…</p>
  </MorphingPopoverContent>
</MorphingPopover>
```

## Pattern

Build a `<WhyPopover term="Half-equivalence"><p>...</p></WhyPopover>` helper so the content pattern is consistent site-wide.
