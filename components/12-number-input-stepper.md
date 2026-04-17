# 12 · Number Input (stepper) — precise integer/decimal picker

**21st.dev URL:** https://21st.dev/community/components/anubra266/number-input/price-percentage
**Author:** anubra266
**Category:** Input / stepper
**Priority:** LOW — specialist.

## What it is

A number input with clear `+` / `−` buttons, keyboard arrow support, scroll-wheel step, typed input, and built-in min/max/step validation.

## Why Lucent Lab needs it

Most sliders are great for intuition. But a few values in the site are genuinely discrete small integers where a slider is overkill and harder to land precisely:

- Stoichiometric coefficients ("2 H₂ + O₂ → 2 H₂O" — 1 to 6)
- Number of electrons (n = 1, 2, 3, 4)
- Moles of solute (1 to 10 with 0.1 steps)
- Number of particles (20, 40, 60, … 200)

For those, a stepper is more honest than a slider that snaps to integer values.

## Where to drop it in

| Animation | Uses |
|---|---|
| `Stoichiometry.tsx` | Coefficient inputs for H₂, O₂, H₂O |
| `RateLaw.tsx` | Order in A, order in B (usually 0, 1, or 2) |
| `Collision.tsx` | Particle count |
| `Galvanic.tsx` | n (electrons transferred — 1, 2, or 3) |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/anubra266/number-input
```

## Usage

```tsx
import { NumberInput } from "@/components/ui/number-input";

<NumberInput
  value={coeff}
  onChange={setCoeff}
  min={1}
  max={6}
  step={1}
/>
```

## Caveat

Don't replace sliders where the intuitive feel of dragging matters (temperature, volume). Steppers are for values users **think about** in integer increments. Sliders are for values users **feel** continuously.
