# 04 · Limelight Nav — icon dock with spotlight on active route

**21st.dev URL:** https://21st.dev/community/components/easemize/limelight-nav/default
**Author:** Hossain Jahed
**Category:** Navigation
**Priority:** MEDIUM — if you pick just one nav upgrade, pick this OR shifting-dropdown (not both).

## What it is

A horizontal icon nav where a "spotlight" (soft glow + downward cone) tracks to the active item. Good for small icon-only navs.

## Why Lucent Lab needs it

The current `src/components/Nav.tsx` is OK but a bit plain:

- `Atlas · Periodic Table · 9 Units ▾` with a small orange underline on the active route
- The underline jumps between items on click

A limelight nav visualizes the "you are here" more expressively and matches the physics/orbital theme (a beam of light tracking the active item is on-brand for a chemistry site).

## Where to drop it in

- `src/components/Nav.tsx` — replace the current 3-link row

Keep the `9 Units ▾` as a separate dropdown trigger, or move to `shifting-dropdown` for that piece.

## Install

```bash
npx shadcn@latest add https://21st.dev/r/easemize/limelight-nav
```

## Usage

```tsx
import { LimelightNav } from "@/components/ui/limelight-nav";
import { Atom, Table, Grid3x3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const nav = useNavigate();
const { pathname } = useLocation();

const items = [
  { id: 'atlas', icon: <Atom />,    label: 'Atlas',    onClick: () => nav('/') },
  { id: 'table', icon: <Table />,   label: 'Periodic', onClick: () => nav('/table') },
  { id: 'units', icon: <Grid3x3 />, label: '9 Units',  onClick: () => setUnitsOpen(o => !o) },
];

<LimelightNav
  items={items}
  defaultActiveIndex={pathname === '/' ? 0 : pathname.startsWith('/table') ? 1 : 2}
  className="bg-paper/60 border border-line"
/>
```

## Caveat

The limelight effect is most striking for icon-only navs. Lucent Lab currently uses small-caps text labels ("ATLAS", "PERIODIC TABLE"). Decide whether to:

- Keep text labels and use the underline/limelight variant (easier migration)
- Switch to icon + tooltip (bigger aesthetic shift)
