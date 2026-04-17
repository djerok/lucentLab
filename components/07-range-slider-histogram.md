# 07 · Range Slider with histogram — for true min/max selection

**21st.dev URL:** https://21st.dev/community/components/ravikatiyar/range-slider/default
**Author:** Ravi Katiyar
**Category:** Slider / range input
**Priority:** LOW–MEDIUM — specialist component, niche but high-quality where it fits.

## What it is

A two-handle slider with a data histogram rendered behind the track. Drag either handle to shrink or expand the selected window; the histogram bars inside the window light up.

## Why Lucent Lab needs it

Not every slider is single-valued. A few animations expose ranges or windows, and this component is exactly right for them:

## Where to drop it in

| Animation | Range it represents | Histogram data |
|---|---|---|
| `BeerLambert.tsx` | Wavelength window (e.g. 400–700 nm) | Absorbance spectrum |
| `Buffer.tsx` | Effective buffer pH range (pKa ± 1) | Acid/base species distribution |
| `Collision.tsx` | Reactive-energy window (E ≥ Ea) | Maxwell-Boltzmann distribution bars |
| `PES.tsx` | Zoom window along binding-energy axis | Spectrum peaks |
| `PhaseChange.tsx` | Temperature inspection window | Phase occupancy |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/ravikatiyar162/range-slider
```

## Usage

```tsx
import { PriceRangeSlider as RangeSlider } from "@/components/ui/range-slider";

<RangeSlider
  data={histogramData}       // number[] of counts per bin
  min={0} max={5000} step={50}
  defaultValue={[400, 700]}
  onValueChange={([lo, hi]) => setWindow({ lo, hi })}
/>
```

## Caveat

Don't use this everywhere — it's a specialist tool. Most sliders in the site are single-valued and should use `01-feedback-slider.md` instead.
