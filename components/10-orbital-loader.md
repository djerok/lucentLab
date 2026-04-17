# 10 · Orbital Loader — on-brand Bohr-orbit spinner

**21st.dev URL:** https://21st.dev/community/components/molecule-ui/orbital-loader/default
**Author:** molecule-ui
**Category:** Loader / spinner
**Priority:** LOW — flavor, not functional.

## What it is

A Bohr-model-style loader with a nucleus and orbiting electrons. Pure CSS / SVG with minimal bundle cost.

## Why Lucent Lab needs it

The site's logo is literally an orbital. A loader that extends that motif is zero-friction branding — any place you need a `Suspense` fallback or "loading…" state picks up the same visual language.

## Where to drop it in

- `src/App.tsx` — inside `<Suspense fallback={...}>` if you lazy-load animations
- `AnimationFrame.tsx` — as a fallback while an animation's heavy SVG mounts
- `PeriodicTablePage.tsx` — initial render of the element panel
- Any future fetch-based features (saved progress, leaderboard, etc.)

## Install

```bash
npx shadcn@latest add https://21st.dev/r/molecule-lab-rushil/orbital-loader
```

## Usage

```tsx
import { OrbitalLoader } from "@/components/ui/orbital-loader";

<Suspense fallback={
  <div className="flex items-center justify-center h-[400px]">
    <OrbitalLoader />
  </div>
}>
  <HeavyAnimation />
</Suspense>
```

## Tuning

Drive the color via CSS var: pass `--accent: var(--hot)` so the orbit glow matches the current unit's hue (e.g. Unit 5's kinetics yellow, Unit 8's acid orange).
