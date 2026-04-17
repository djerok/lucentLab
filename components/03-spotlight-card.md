# 03 · Spotlight Card — cursor-tracking glow for topic cards

**21st.dev URL:** https://21st.dev/community/components/hextaui/spotlight-card/default
**Author:** hextaui / preetsuthar17
**Category:** Card
**Priority:** HIGH — landing page glow-up.

## What it is

A card that tracks the cursor position and projects a soft radial spotlight on its surface. On a black background with warm accent colors, the effect reads as "the card is glowing under your finger".

## Why Lucent Lab needs it

The landing page `LandingPage.tsx` has:

- A "Nine units. One atlas." grid of 9 unit cards
- A "See animations" section listing featured animations

All of these are currently static rectangles with a subtle border. A spotlight card turns the grid into something you want to hover through just to see it respond.

Same applies to the topic list on `UnitPage.tsx` — each topic becomes a hover target.

## Where to drop it in

| File | Usage |
|---|---|
| `src/pages/LandingPage.tsx` | Wrap each of the 9 unit cards in `<SpotlightCard>` |
| `src/pages/UnitPage.tsx` | Wrap each topic block |
| `src/pages/LandingPage.tsx` | Wrap featured animation preview cards |

## Install

```bash
npx shadcn@latest add https://21st.dev/r/preetsuthar17/spotlight-card
```

## Usage

```tsx
import { SpotlightCard } from "@/components/ui/spotlight-card";

<SpotlightCard
  spotlightColor="rgba(255, 107, 53, 0.18)"  // --hot, low alpha
  className="rounded-lg p-6 border border-white/5"
>
  <div className="eyebrow">UNIT 03</div>
  <h3>Intermolecular Forces & Properties</h3>
  <p>How molecules touch…</p>
</SpotlightCard>
```

## Tuning

Use your existing CSS variables for the spotlight color — keyed to each unit's `hue`:

```tsx
<SpotlightCard spotlightColor={`${unit.hue}33`}>  // hue + 20% alpha
```

That way each unit glows its own color on hover.
