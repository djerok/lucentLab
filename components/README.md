# Components — Candidate 21st.dev Drop-ins for Lucent Lab

Each file in this folder describes **one candidate component** from [21st.dev](https://21st.dev/home) that we recommend pulling into Lucent Lab. The components are prioritized by how much UI pain they remove.

## Priority order

| # | File | Why |
|---|------|-----|
| 1 | `01-feedback-slider.md` | Every single `<input type="range">` in the site (speed, T, P, volume, moles…) looks flat and gives no readout bubble. This is the biggest single UX win. |
| 2 | `02-slide-tabs.md` | At least a dozen hand-rolled tab rows (pick acid, pick element, pick reaction, pick metal pair). Current ones jump on click — these glide. |
| 3 | `03-spotlight-card.md` | UnitPage topic grid + landing animation cards feel flat. Spotlight on hover = instant premium feel on dark theme. |
| 4 | `04-limelight-nav.md` | Replace the top Nav with an icon dock that glows under the active page. Matches the "orbital logo" aesthetic. |
| 5 | `05-animated-tooltip.md` | Enables pedagogy: hover any variable in an equation to see what it means. Site has zero tooltips today. |
| 6 | `06-animated-counter.md` | Readouts next to sliders (pH, T, ΔG, E_cell) currently flash-update. Odometer digits give a "lab instrument" feel. |
| 7 | `07-range-slider-histogram.md` | Two-handle range slider with data histogram — fits Beer-Lambert wavelength, buffer pH window, M-B distribution selection. |
| 8 | `08-shifting-dropdown.md` | Units dropdown currently opens a flat list. This morphs between items and could reveal each unit's sub-topics on hover. |
| 9 | `09-morphing-popover.md` | Richer "?" info affordance for per-variable explanations inside Henderson-Hasselbalch, ΔG = ΔH − TΔS, etc. |
| 10 | `10-orbital-loader.md` | Bohr-orbit spinner — literally on-brand. Drop into any Suspense boundary or animation switch. |
| 11 | `11-interactive-hover-button.md` | Replaces Play/Pause/Reset button row and "Open animation" CTAs. Subtle arrow-ink hover matches serif + dark aesthetic. |
| 12 | `12-number-input-stepper.md` | For discrete small integers (stoichiometric coefficients, moles). Where a slider is too coarse. |

## Global install prerequisites

Every component here is a shadcn-registry entry. Before installing any of them, make sure the project has:

```bash
npm i -D tailwindcss@latest postcss autoprefixer
npx tailwindcss init -p
npm i framer-motion lucide-react class-variance-authority clsx tailwind-merge
```

**Important** — Lucent Lab currently uses plain CSS variables (`--paper`, `--ink-1`, `--line`, `--hot`, `--phos`…) declared in `src/index.css`, **not** Tailwind. shadcn components expect Tailwind tokens (`bg-background`, `text-foreground`). You have two options:

- **Option A (clean):** add Tailwind and map your CSS vars to Tailwind's `theme.extend.colors` in `tailwind.config.ts`. This is the recommended path.
- **Option B (minimal):** install each component into `src/components/ui/` and immediately edit the className props to use your existing CSS vars via inline `style={{}}` or scoped CSS. Works but leaves you maintaining forks.

The per-component files below assume **Option A**.

## Install command pattern

Every component can be added with:

```bash
npx shadcn@latest add <registry-url>
```

This drops the source into `src/components/ui/` and installs its npm deps. Commit before and after each install so you can diff the changes.
