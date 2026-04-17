# 01 · Feedback Slider — replace every `<input type="range">`

**21st.dev URL:** https://21st.dev/community/components/ln-dev7/feedback-slider/default
**Author:** ln-dev7
**Category:** Slider / range input
**Priority:** HIGHEST — this is the single biggest UX win in the site.

## What it is

A single-handle slider that shows a "bubble" readout above the thumb while dragging. The bubble holds the current numeric value so you don't have to look away from the thumb to see the value.

## Why Lucent Lab needs it

Every animation in the site uses a plain `<input type="range">`. They are:

- Unstyled (flat, gray, platform-default)
- Tiny thumb that's hard to drag on trackpads
- No live readout next to the thumb — you have to look at a separate number somewhere

There are **roughly 25+ sliders** across the site — this one change, applied project-wide, transforms the feel of every animation.

## Where to drop it in (high-impact first)

| Animation file | Sliders currently used |
|---|---|
| `src/animations/PhaseChange.tsx` | speed (0.25–3×), temperature scrub |
| `src/animations/Collision.tsx` | temperature, particle count |
| `src/animations/GasLaw.tsx` | P, V, T, n — four sliders |
| `src/animations/RateLaw.tsx` | [A], [B], k |
| `src/animations/Calorimetry.tsx` | mass Cu, T_Cu, mass H₂O, T_water, fuel mass, Ccal, ΔT_bomb |
| `src/animations/Titration.tsx` | volume NaOH, speed |
| `src/animations/Buffer.tsx` | [HA], [A⁻], dose |
| `src/animations/Gibbs.tsx` | ΔH, ΔS, T |
| `src/animations/Galvanic.tsx` | [anode ion], [cathode ion], T, speed |
| `src/animations/AcidBase.tsx` | [HCl], [NaOH], stoich fraction, speed |
| `src/animations/BeerLambert.tsx` | concentration, path length, wavelength |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/ln-dev7/feedback-slider
```

## Usage

```tsx
import { FeedbackSlider } from "@/components/ui/feedback-slider";

<FeedbackSlider
  min={0.25}
  max={3}
  step={0.05}
  value={[speed]}
  onValueChange={([v]) => setSpeed(v)}
  formatValue={(v) => `${v.toFixed(2)}×`}
/>
```

## Migration tip

Build a tiny wrapper `src/components/ui/Slider.tsx` that:

1. Takes Lucent Lab's typical props: `label`, `value`, `onChange`, `min`, `max`, `step`, `format`.
2. Renders `<FeedbackSlider>` with your CSS-var colors threaded through.

Then swap every `<input type="range">` in one PR. Grep:

```
grep -rn 'type="range"' src/animations
```
