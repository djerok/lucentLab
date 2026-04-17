# 02 · Slide Tabs — animated pill indicator for tab rows

**21st.dev URL:** https://21st.dev/community/components/thanh/slide-tabs/default
**Author:** Le Thanh
**Category:** Tabs
**Priority:** HIGH — second-biggest UX win after sliders.

## What it is

A row of tabs with a single pill/underline indicator that physically slides from the old active tab to the new one using Framer Motion's `layoutId`. The result is that clicking a tab feels like moving a physical slider instead of a jarring re-paint.

## Why Lucent Lab needs it

At least a dozen hand-rolled `role="tablist"` rows across animations. All of them use plain `<button>`s with a `background-color` change on the active one — the indicator **jumps** on click instead of gliding.

## Where to drop it in

| Animation | Current tab row |
|---|---|
| `AcidBase.tsx` | HCl/NaOH combos |
| `Titration.tsx` | HCl · HF · AcOH · NH₄⁺ |
| `Redox.tsx` | Zn+Cu²⁺ · Mg+Cu²⁺ · Cu+Ag⁺ |
| `Galvanic.tsx` | Zn|Cu²⁺ · Mg|Cu²⁺ · Zn|Ag⁺ · Cu|Ag⁺ |
| `Calorimetry.tsx` | Cu · Al · Fe · Au · Pb, and Coffee-cup / Bomb / Mixing / Phase modes |
| `Orbital.tsx` | H · C · N · O · Na · Cl · Fe · Cu |
| `PES.tsx` | Same element quick-picks |
| `PeriodicTrend.tsx` | Category / Radius / EN / IE |
| `VSEPR.tsx` | Geometry grid cells act as tabs |
| `BeerLambert.tsx` | 4 solutions |
| `IMF.tsx` | LDF · dipole-dipole · H-bond |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/minhxthanh/slide-tabs
```

Dependencies pulled in: `framer-motion`.

## Usage

```tsx
import { SlideTabs } from "@/components/ui/slide-tabs";

const acids = [
  { id: 'HCl',  label: 'Hydrochloric' },
  { id: 'HF',   label: 'Hydrofluoric' },
  { id: 'AcOH', label: 'Acetic' },
  { id: 'NH4',  label: 'Ammonium' },
];

<SlideTabs
  items={acids}
  active={acidKey}
  onChange={setAcidKey}
/>
```

## Migration tip

Because the slide animation uses `layoutId`, wrap the whole SlideTabs in a `<LayoutGroup>` if you have nested tab rows. Lucent Lab has a few of those (e.g. Calorimetry has mode tabs AND material tabs on the same page).
