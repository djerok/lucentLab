# 11 · Interactive Hover Button — subtle ink-in arrow buttons

**21st.dev URL:** https://21st.dev/community/components/Shatlyk1011/interactive-hover-button/default
**Author:** Shatlyk1011
**Category:** Button
**Priority:** LOW — polish pass.

## What it is

A button where hovering causes the label and an arrow to swap places with a soft ink-wipe. Understated, not noisy — fits serif + dark theme sites.

## Why Lucent Lab needs it

The site's primary CTA on the landing page is `Browse 9 units →` and `See an animation`. Its secondary controls are play/pause/reset. Both are currently fine but forgettable. This button gives them a hover personality without pulling attention away from content.

## Where to drop it in

| File | Target |
|---|---|
| `src/pages/LandingPage.tsx` | `Browse 9 units`, `See an animation` CTAs |
| `src/pages/UnitPage.tsx` | `← Atlas` back link, `Next unit →` |
| Every animation | `Play`, `Pause`, `Reset`, `Auto-titrate`, `Drop block`, `Equilibrium` |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/Shatlyk1011/interactive-hover-button
```

## Usage

```tsx
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

<InteractiveHoverButton onClick={() => nav('/unit/atomic-structure')}>
  Browse 9 units
</InteractiveHoverButton>
```

## Caveat

Don't apply to all buttons — save for primary CTAs and Play-type controls. Overusing kills the effect. Tiny incremental buttons (`+ 1 mL`, `- 1 mL`) should stay as simple shadcn `Button`s.
