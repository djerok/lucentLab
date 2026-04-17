# 06 · Animated Counter — odometer-style readouts

**21st.dev URL:** https://21st.dev/community/components/diriktv/animated-counter/default
**Author:** diriktv
**Category:** Counter / display
**Priority:** MEDIUM — subtle but ties the whole "lab instrument" metaphor together.

## What it is

A number display where digits roll up/down like an odometer or slot machine when the value changes. Smooth, snappy, uses `framer-motion` under the hood.

## Why Lucent Lab needs it

Every numeric readout in the site is a plain `{value.toFixed(2)}` string. When you drag a slider in Gibbs, ΔG just redraws in place. When the titration curve updates the pH, the pH text flash-replaces.

Odometer digits visually link the input (slider) to the output (number) through motion. For a lab-simulator this sells the "real instrument" feel.

## Where to drop it in

| Animation | Readouts that should use AnimatedCounter |
|---|---|
| `Gibbs.tsx` | ΔG, T_cross |
| `Titration.tsx` | pH, [H⁺], [OH⁻], V_base |
| `Calorimetry.tsx` | T_f, q_metal, q_water |
| `GasLaw.tsx` | P, V, T, n |
| `Galvanic.tsx` | E°_cell, E_cell, Q |
| `Buffer.tsx` | pH, ratio |
| `Stoichiometry.tsx` | moles product |
| `RateLaw.tsx` | rate, k |
| `EnergyProfile.tsx` | Ea, ΔH |
| `Enthalpy.tsx` | running total ΔH |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/diriktv/animated-counter
```

## Usage

```tsx
import { AnimatedCounter } from "@/components/ui/animated-counter";

<AnimatedCounter value={pH} decimals={2} suffix="" />
// or with units:
<AnimatedCounter value={Tf} decimals={1} suffix=" °C" />
```

## Tuning

- For scientific notation displays (e.g. `[H⁺] = 1.34e-3`) you may need a small wrapper that splits mantissa and exponent so only the mantissa animates.
- Clamp extreme values to avoid long digit-roll animations (e.g. if pH goes from 3 → 13, don't animate through every step).
