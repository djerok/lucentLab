# 08 · Shifting Dropdown — mega-menu for the 9-Units menu

**21st.dev URL:** https://21st.dev/community/components/Abuhuraira/shifting-dropdown/default
**Author:** Abuhuraira
**Category:** Dropdown / mega menu
**Priority:** MEDIUM.

## What it is

A dropdown where hovering a sibling item smoothly shifts the panel to reveal that item's content. Good for "pick a unit → see its topics" style navigation.

## Why Lucent Lab needs it

The current `9 Units ▾` dropdown in `Nav.tsx` is a flat list:

```
01 Atomic Structure & Properties
02 Molecular & Ionic…
03 Intermolecular Forces…
…
```

Students have to click in, land on a Unit page, scan the topic list, then click again. A shifting dropdown can preview each unit's topics on hover before committing to a route, cutting one click off the most common navigation path.

## Where to drop it in

- `src/components/Nav.tsx` — replace the current `UnitsDropdown` implementation

## Install

```bash
npx shadcn@latest add https://21st.dev/r/hurerag24/shifting-dropdown
```

## Usage

```tsx
import { ShiftingDropdown } from "@/components/ui/shifting-dropdown";
import { UNITS } from "@/data/curriculum";

<ShiftingDropdown
  triggers={UNITS.map(u => ({
    id: u.slug,
    label: `${u.number} · ${u.title}`,
    hue: u.hue,
  }))}
  renderPanel={(activeId) => {
    const u = UNITS.find(u => u.slug === activeId)!;
    return (
      <ul>
        {u.topics.map(t => (
          <li key={t.id}>
            <a href={`/unit/${u.slug}#${t.id}`}>
              {t.id} · {t.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }}
/>
```

## Caveat

Don't combine this with `04-limelight-nav.md` on the same nav row — pick one visual metaphor for "you are here". The cleanest setup:

- Atlas / Periodic Table: flat text links (current style, keep)
- 9 Units: shifting dropdown
- Route indicator: simple underline (current) or limelight
