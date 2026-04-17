# 05 · Animated Tooltip — hoverable variable / element explanations

**21st.dev URL:** https://21st.dev/community/components/shadcnspace/animated-tooltip/default
**Author:** shadcnspace
**Category:** Tooltip
**Priority:** MEDIUM — unlocks pedagogy, not just aesthetic.

## What it is

A soft spring-animated tooltip that appears on hover/focus. Supports positioning (top/bottom/left/right) and a small arrow.

## Why Lucent Lab needs it

The site has **zero tooltips today** outside the periodic table element panel. For a teaching tool that's a missed opportunity — every equation has terms students don't know, every graph has axes that need labels they can read without squinting.

## Where to drop it in (chemistry-specific)

| Location | Tooltip content |
|---|---|
| `PeriodicTablePage.tsx` | Hover element symbol → electron config, melting point, category |
| `Gibbs.tsx` around "ΔG = ΔH − TΔS" | Hover each symbol → "ΔH: enthalpy change, kJ/mol" / "ΔS: entropy change, J/(mol·K)" / "T: kelvin" |
| `Buffer.tsx` around "pH = pKa + log([A⁻]/[HA])" | Hover each symbol → Henderson-Hasselbalch term definitions |
| `GasLaw.tsx` around "PV = nRT" | Hover each symbol → P (atm), V (L), n (mol), R = 0.08206, T (K) |
| `RateLaw.tsx` around "rate = k[A]ᵐ[B]ⁿ" | Hover m, n → "reaction order in A/B" |
| `EnergyProfile.tsx` above the Ea arrow | "Activation energy: minimum energy needed for the reaction to proceed" |
| `PES.tsx` above each peak label | "Peak position = binding energy of that subshell" |
| `VSEPR.tsx` axis of AXE chart | "A = atom, X = bonded atom, E = lone pair" |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/shadcnspace/animated-tooltip
```

## Usage

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/animated-tooltip";

<Tooltip>
  <TooltipTrigger asChild>
    <span className="underline decoration-dotted cursor-help">ΔH</span>
  </TooltipTrigger>
  <TooltipContent>
    <b>Enthalpy change</b><br/>
    Total heat absorbed or released at constant pressure. Units: kJ/mol.
  </TooltipContent>
</Tooltip>
```

## Pedagogy pattern

Make a small helper `<DefinedTerm term="..." def="..." />` so every animation can sprinkle hoverable glossary terms without boilerplate. This single pattern massively increases the teaching surface area of the site.
