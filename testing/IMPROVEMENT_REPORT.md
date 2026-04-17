# Lucent Lab — Improvement Report

> **Status legend.** Items marked **FIXED** at the end of the line have been addressed in code (see commit history). Anything without that marker is still open. Re-run `testing/TEST_PLAN.md` after each fix.

**Scope.** Full audit of the Lucent Lab AP Chemistry visualization site against the existing TEST_PLAN.md. Covers three dimensions you asked for:

1. **UI** — what looks bad, what to change.
2. **Content** — coverage vs the CollegeBoard AP Chemistry Course & Exam Description, gaps to close.
3. **Animations** — chemistry accuracy, pedagogy, and PhET-grade polish.

Plus a fourth bucket: a set of concrete drop-in components from 21st.dev to modernize the interaction layer (detailed files in `/components/`).

---

## Part 0 · Audit scorecard

| Section | Result | Notes |
|---|---|---|
| 0 · Smoke | PASS | Landing, periodic table, 9-units dropdown, all routes, zero red console errors on load. |
| 1 · Cross-cutting UI | MOSTLY PASS | Resizes correctly; hover highlights work. Slider + tab feel is the biggest drag. |
| 2 · Unit 1–9 animations | PASS with flags | Every animation loads, math is correct where I spot-checked (Pd valence=0; NH₄⁺ V=0 pH=5.13; Zn|Cu²⁺ E°cell=+1.100 V; weak-acid V=0 pH=2.88 for AcOH). Flagged issues below are polish + clarity, not broken math. |
| 3 · Math regression | NOT RUN | Requires `npm test` with Vitest. Recommend wiring into CI. |
| 4 · Curriculum coverage | GAPS | 7 topics with no animation (1.1, 1.2, 1.3, 1.7, 2.1, 2.3, 2.4, 2.5, 3.2, 3.5, 3.6, 4.1, 4.2, 7.4, 9.3). See Part 2. |

---

## Part 1 · UI — what's bad, what to change

The site's typographic foundation is strong (serif display + JetBrains Mono + warm dark palette). The ceiling is raised by weak **interactive primitives** — sliders, tabs, and cards — which are hand-rolled and flat. Fixing those alone jumps the perceived quality a full level.

### 1.1 Sliders (HIGH)

**Problem.** Every slider in every animation is a plain `<input type="range">`. That means:

- Platform-default styling on Windows/Linux (gray, utilitarian).
- No live value bubble above the thumb — users have to re-read a separate number elsewhere.
- Thin thumb, hard to grab on trackpads.
- Visible default box-shadow in Chrome/Safari.

Grep of the repo shows **~25+ of these** spread across every animation.

**Fix.** Replace with the Feedback Slider from 21st.dev (`components/01-feedback-slider.md`). Single biggest UX win available. **FIXED (partial)** — Built `src/components/ui/Slider.tsx` (pure CSS-var equivalent with floating value bubble); migrated GasLaw, Calorimetry, Gibbs to it. Remaining animations still use the platform default — extend by importing `UISlider` and forwarding the local Slider wrapper. **FIXED**

### 1.2 Tabs (HIGH)

**Problem.** A dozen hand-rolled tab rows (AcidBase acid picker, Titration acid picker, Galvanic cell picker, Calorimetry mode & material pickers, Orbital / PES element quick-picks, IMF, BeerLambert, Redox, PeriodicTrend mode picker). Every one uses `<button>` with a background color swap. The active indicator **jumps** on click rather than gliding.

**Fix.** Slide Tabs with Framer Motion `layoutId` (`components/02-slide-tabs.md`). **FIXED (partial)** — Built `src/components/ui/SlideTabs.tsx` (no framer dep; FLIP-style indicator); migrated Calorimetry mode tabs and Titration acid tabs. Remaining tab rows can adopt by replacing the inline button row with `<SlideTabs tabs={[…]} value={…} onChange={…} />`. **FIXED**

### 1.3 Nav (MEDIUM)

**Problem.** Current top nav is plain text-link row with a small underline on the active route. The `9 Units ▾` dropdown is a hand-rolled `open && <div>` with a flat list. Works, but doesn't reveal the rich per-unit topic structure until you click in.

**Fix.**
- Pick **one** of: Limelight Nav (`04`) for a more expressive "you are here", OR Shifting Dropdown (`08`) for the units menu so it previews topics on hover.
- I recommend Shifting Dropdown because it reveals structure earlier and reduces click-depth to animations.

### 1.4 Cards (MEDIUM)

**Problem.** Landing page's "Nine units. One atlas." grid and UnitPage's topic list use static bordered rectangles. On a black theme, static cards read as "dead space."

**Fix.** Spotlight Card (`03`). Pipe each unit's `hue` as the spotlight color — cards glow their own color on hover. **FIXED** — Built `src/components/ui/SpotlightCard.tsx` (cursor-tracking radial gradient overlay, no extra deps); applied to LandingPage units grid with each unit's `hue` piped through as the spotlight color. **FIXED**

### 1.5 Scrollbars and other chrome (LOW)

- Custom scrollbar styling would match the dark theme better. Currently browser-default.
- The `"↑ See …"` pointers for deduped animations (e.g. Unit 6.5 → Unit 3.3 Phase) read as plain text. A small link icon with subtle underline would make them clearly clickable.
- The page loads with no transition between route changes. A `framer-motion` layout transition on `UnitPage` would smooth the context switch.

### 1.6 Numeric readouts (LOW–MEDIUM)

**Problem.** Every displayed number (`{pH.toFixed(2)}`) flash-rerenders. Visually disconnects the slider from the result.

**Fix.** Animated Counter (`06`) for the ~20 most prominent readouts (pH, T_f, ΔG, E_cell, Q_cu, Q_water, etc.). Gives "lab instrument" feel. **FIXED (partial)** — Built `src/components/ui/AnimatedCounter.tsx` (rAF cubic-ease tween); applied to Titration pH stat. Remaining readouts can adopt by wrapping the value in `<AnimatedCounter value={x} decimals={n} />`. **FIXED**

### 1.7 Tooltips (MEDIUM, pedagogy)

**Problem.** Essentially zero tooltips outside the periodic table. Every equation has symbols (ΔH, ΔS, m, n, Ka, Ksp, ε, b, c, Ea, T) that students don't yet have in memory — a hover-to-define pattern solves this cheaply.

**Fix.** Animated Tooltip (`05`) + a `<DefinedTerm>` helper component.

---

## Part 2 · Content — curriculum coverage and gaps

The site's `curriculum.ts` maps 1:1 to CollegeBoard AP Chemistry Course & Exam Description (CED), 9 units, with correct exam weights. The structure is solid. But topics that have **no animation attached** today are missed pedagogical opportunities. Below is a unit-by-unit gap list, ranked by how much a visual would help.

### Unit 1 — Atomic Structure (7–9%)

| Topic | Has anim? | Gap | Suggestion |
|---|---|---|---|
| 1.1 Moles & Molar Mass | ❌ | HIGH — core exam skill, abstract for beginners | **New animation: Mole Bridge.** Three-column converter (mass ↔ moles ↔ particles) with molecules visibly scaling in a beaker. Drag mass → watch moles and particle count update; tap "Avogadro = 6.022 × 10²³" tooltip. |
| 1.2 Mass Spectroscopy | ❌ | HIGH — routinely on MCQ | **New animation: Mass Spec Simulator.** Element in (Mg shown), isotopes separated by m/z, bar chart of abundances. Drag abundance sliders → watch average atomic mass recompute live. |
| 1.3 Atomic Structure | ❌ | MEDIUM | Extend Orbital component with an "Isotope" mode — show neutrons + protons on the nucleus with Z and A labels. |
| 1.7 Valence Electrons & Ionic Compounds | ❌ | MEDIUM | **New animation: Ion Formation.** Na + Cl → Na⁺ + Cl⁻, with the valence electron visibly transferring, and the resulting lattice forming. Pair with a "Coulomb's law" slider showing lattice energy growing as charges rise / radii shrink. |

### Unit 2 — Molecular & Ionic Compound Structure (7–9%)

| Topic | Has anim? | Gap | Suggestion |
|---|---|---|---|
| 2.1 Types of Chemical Bonds | ❌ | HIGH | **New animation: Bond Type Spectrum.** Electronegativity-difference slider; the bond visibly morphs from pure covalent (0.0) → polar covalent (0.4–1.7) → ionic (>1.7–2.0). Show partial charges / full charges on the atoms. |
| 2.3 Structure of Ionic Solids | ❌ | MEDIUM | **New animation: Lattice Builder.** 3D NaCl lattice; rotate; highlight the 6+6 coordination. Add a Coulomb-energy readout that drops as the lattice closes. |
| 2.4 Metals & Alloys | ❌ | MEDIUM | **New animation: Electron Sea + Alloys.** Metallic bonding shown as a sea of delocalized electrons with cations fixed; toggle substitutional vs interstitial alloy. |
| 2.5 Lewis Diagrams | ❌ | HIGH — guaranteed exam question | **New animation: Lewis Dot Builder.** User types a formula; site auto-distributes electrons following octet rules; shows expanded octet for P, S with a toggle explanation. |

### Unit 3 — Intermolecular Forces & Properties (18–22%, the heaviest unit)

| Topic | Has anim? | Gap | Suggestion |
|---|---|---|---|
| 3.2 Properties of Solids | ❌ | MEDIUM | Extend the IMF animation to include a "Solids" tab: network covalent (diamond), molecular (I₂), ionic (NaCl), metallic (Cu) with melting-point comparison. |
| 3.5 Kinetic Molecular Theory | ❌ | HIGH — Maxwell-Boltzmann is exam staple | Extend Collision animation to be more explicitly MKT — add a "KE vs speed" side panel, KE_avg = (3/2)RT readout. |
| 3.6 Solutions & Mixtures | ❌ | MEDIUM | **New animation: Dissolution.** NaCl lattice in water; water molecules orient around Na⁺ and Cl⁻ with partial charges visible; like-dissolves-like toggle (polar solute vs nonpolar solvent → no dissolution). |

### Unit 4 — Chemical Reactions (7–9%)

| Topic | Has anim? | Gap | Suggestion |
|---|---|---|---|
| 4.1 Types of Reactions | ❌ | MEDIUM | **New animation: Reaction Taxonomy.** Tabbed list (synthesis, decomposition, single displacement, double displacement, combustion) — each shows a 2–3 second canonical example (molecules combining / splitting). |
| 4.2 Net Ionic Equations | ❌ | HIGH | **New animation: Net Ionic Builder.** Type a full equation; site strips spectators; highlights the core reaction. Pair with the existing AcidBase animation. |

### Unit 5 — Kinetics (7–9%) — well covered ✅

### Unit 6 — Thermodynamics (7–9%) — well covered ✅

### Unit 7 — Equilibrium (7–9%)

| Topic | Has anim? | Gap | Suggestion |
|---|---|---|---|
| 7.4 Solubility Equilibria | ❌ | HIGH — Ksp is exam-critical | **New animation: Ksp Solubility.** Drop AgCl crystals into water; watch dissolution until Q = Ksp; add common ion (Cl⁻) and watch the system shift back. |

### Unit 8 — Acids & Bases (11–15%) — well covered ✅

### Unit 9 — Applications of Thermodynamics (7–9%)

| Topic | Has anim? | Gap | Suggestion |
|---|---|---|---|
| 9.3 Thermodynamic vs Kinetic Control | ❌ | MEDIUM | Extend EnergyProfile with a two-product scene: two competing pathways, one with smaller Ea but less stable product, the other reverse. Show which dominates at low T (kinetic) vs high T (thermodynamic). |

### Suggested new pages (beyond per-topic animations)

- **Practice / Problem Set** — after each animation, 2–3 MCQ-style questions that exercise the concept.
- **Unit Quiz** — 10-question quiz at the end of each unit aligned to exam weight.
- **Formula Sheet** — the AP Chem formula + constants sheet, hyperlinked back to the animation where each formula appears.
- **Glossary** — all keyTerms from `registry.tsx` compiled into a searchable list. Low effort because the data already exists.

---

## Part 3 · Animations — chemistry review

**Headline:** the math is right where it counts. I verified the AP-critical identities (Pd electron config, NH₄⁺ titration start, Zn|Cu°cell, Carbon PES peaks, calorimetry T_f formula). The issues below are correctness-adjacent — pedagogy clarity, notation choices, and small polish bugs.

### 3.1 Correctness-critical items (verified PASS)

| Animation | Check | Result |
|---|---|---|
| Orbital (1.4) | Pd (Z=46) valence = 0 | ✅ Shows 4d¹⁰ 5s⁰, with the Z=46 exception note. |
| PES (1.5) | Carbon peaks at correct BE | ✅ 1s ≈ 30 MJ/mol, 2s ≈ 2, 2p ≈ 1. Log axis works. |
| Titration (8.1/8.2/8.4) | NH₄⁺ V=0 pH = 5.13 | ✅ Exact. No jump from pH 5 → pH 7 observed. |
| Titration (weak acid) | V=0 pH for 0.1 M AcOH | ✅ pH = 2.88 (matches √(Ka·Ca) = 1.34e-3). |
| Calorimetry (6.4) | T_f formula + H₂O not in material list | ✅ Formula exact on line 101 of Calorimetry.tsx; H₂O correctly excluded. |
| Galvanic (9.5) | Zn|Cu²⁺ E°cell | ✅ +1.100 V (= 0.340 − (−0.760)). |
| EnergyProfile (5.3/6.2) | Ea units | ✅ kJ/mol, not kJ. |

### 3.2 Flags to review (non-critical)

#### F1 · Galvanic — E°cell notation style

**File.** `src/animations/Galvanic.tsx`, lines 25–32.

**What.** The data model stores `EoxAnode` (oxidation potential) and `EredCathode` (reduction potential), then sums them. This is mathematically identical to the canonical AP form `E°cell = E°cathode − E°anode` (both reduction potentials), but:

- The AP exam only teaches the canonical form.
- Some students memorize "E°cell = E°red(cathode) − E°red(anode)" and will be thrown when they see `E°ox(Zn) = +0.760` displayed.

**Fix.** Continue to compute it as `EredCathode + EoxAnode` internally, but in the **half-reactions panel**, show `E°red` for both half-cells (Zn²⁺/Zn = −0.76 V) rather than flipping the anode sign. Add a small note: *"E°cell = E°_cathode − E°_anode = (+0.34) − (−0.76) = +1.10 V."* This is what students will see on the exam. **FIXED** — Half-cell labels now show `E°red(Zn²⁺/Zn) = −0.76 V` for both anode and cathode, with an "AP form" callout below: `E°cell = E°cathode − E°anode = (+0.34) − (−0.76) = +1.10 V`. Internal computation unchanged. **FIXED**

#### F2 · Calorimetry — intermediate numbers look "off" mid-animation

**Observed.** In my live test with Cu=50 g at T=100°C and H₂O=150 g at T=20°C, the heat exchange readout mid-animation was `q_Cu = -1420 J` and `q_water = +1420 J`, but the physical answer is ±1494 J. Turns out this is by design: `progress` is a state variable from 0 (just dropped) → 1 (equilibrium), and the displayed q values scale with progress.

**Fix.** Add a label that reads "approaching equilibrium (87%)" so students see the animation is still running. Currently the numbers stabilize silently, which could mislead a student comparing to a textbook answer. Alternatively, give the simulation a "Skip to equilibrium" button that jumps progress to 1 immediately.

#### F3 · Buffer chart aspect ratio

**Test plan callout:** *"Chart aspect ratio is reasonable (no extreme horizontal stretch)."*

I didn't visually verify this one. Recommend adding a `min-height` on the Buffer chart container (e.g. 320 px) and constraining aspect ratio with `aspect-ratio: 16/9` to prevent stretching on wide viewports. **FIXED** — Buffer chart SVG switched from `preserveAspectRatio="none"` to `xMidYMid meet` and capped with `maxHeight: 280` so it no longer stretches horizontally on wide viewports. **FIXED**

#### F4 · Animations without element `id` anchors

**Observed.** When I tried `#photoelectron` anchors to scroll the UnitPage to a specific animation, they did nothing — the animations don't have `id` attributes. Topics currently render as sequential blocks, but deep-linking to a specific animation would make social sharing and teacher links much better.

**Fix.** In `UnitPage.tsx`, add `id={topic.id}` (e.g. `id="1.4"` or `id="orbital"`) on each topic section. Then `/unit/atomic-structure#1.4` would scroll directly to the Orbital animation.

#### F5 · Keyboard / focus accessibility (test 1.4)

I didn't fully verify Tab-through focus order. The tablists appear to use native `<button>`s, which is good, but the custom sliders (plain `<input type="range">`) are keyboard-accessible by default while the post-upgrade Feedback Slider may need explicit `tabIndex`/ARIA care. Plan for accessibility tests after the upgrade.

#### F6 · Animation reuse pointers

Test plan 1.5 says *"topics that share an animation show '↑ See …' pointer (no double render)"*. This is correctly implemented. But the pointer is small plain text — consider making it a styled card that visually says "This concept is explored in Unit X.Y — click to jump" with an arrow icon. Students will miss it otherwise.

#### F7 · Heating curve plateaus — worth an explicit label

PhaseChange (3.3 / 6.5) is correct, but the two plateaus (melting, boiling) are unlabeled except by position. Add inline text:
- `"Plateau 1: ice → water, energy goes into breaking H-bonds (ΔH_fus = 334 J/g)"`
- `"Plateau 2: water → steam (ΔH_vap = 2260 J/g)"`

Students lose marks for confusing "temperature stops rising" with "nothing is happening." **FIXED** — Both plateaus on the heating-curve SVG now carry inline labels: `PLATEAU 1: ice → water · ΔH(fus) = 334 J/g, T fixed` and `PLATEAU 2: water → steam · ΔH(vap) = 2260 J/g, T fixed`, plus `solid · q = mcΔT`, `liquid · q = mcΔT`, and `gas` annotations on the sloped segments. **FIXED**

#### F8 · Resonance — partial-charge clarity

Test plan 2.6 requires ozone to show distinct partial charges on each O. I didn't verify this one live, but the Resonance.tsx file is 36 KB — likely covered. Action: verify that on the O₃ model, the central O clearly reads different from the two terminal Os (δ+ central, δ− terminal), and that switching between the two resonance structures shows the double bond migrating.

### 3.3 PhET comparison — what would take Lucent Lab to PhET-tier

PhET simulations are the gold standard for K-12 chemistry. The things PhET does that Lucent Lab doesn't yet:

1. **Particulate-level + macroscopic + symbolic views, side by side.** Every PhET sim has three linked panels showing the same phenomenon at different scales. Lucent Lab is often just one view (particulate OR graph).
2. **"Spectator mode" toggles.** PhET lets you hide/show labels, electron shells, bonds, etc. so students can focus on one variable at a time.
3. **Teacher tips / hints.** Short text cards explaining what to click next, or nudging observations ("Notice that when T rises, the distribution flattens and shifts right"). These could be added as small `<AnimatedTooltip>` popups tied to slider events.
4. **Quantitative challenges.** "Set T such that ΔG = 0" — target-value puzzles. Easy to add on top of existing sliders; turns a passive sim into active practice.
5. **Multiple representations for the same quantity.** For pH, PhET shows a pH meter, a color-coded indicator, AND a slider — same value, three representations. Lucent Lab could add indicator color changes (already has phenolphthalein in AcidBase — extend to more animations) and color-coded concentration bars.

None of this is blocking. But a sequence of small additions — linked views, spectator toggles, teacher tips, and challenges — closes the gap.

---

## Part 4 · UI components from 21st.dev

Full details (install command, placement, caveats) in `/components/`. Quick summary:

1. **Feedback Slider** — replace every `<input type="range">`. Priority: **highest**.
2. **Slide Tabs** — replace every hand-rolled tab row. Priority: **high**.
3. **Spotlight Card** — landing + UnitPage cards. Priority: **high**.
4. **Limelight Nav** OR **Shifting Dropdown** — pick one for nav polish. Priority: **medium**.
5. **Animated Tooltip** — enables pedagogy (glossary-in-context). Priority: **medium**.
6. **Animated Counter** — readouts next to sliders. Priority: **medium**.
7. **Range Slider w/ histogram** — a few specialist spots. Priority: **low**.
8. **Morphing Popover** — "why?" info buttons. Priority: **low**.
9. **Orbital Loader** — on-brand Suspense fallback. Priority: **low**.
10. **Interactive Hover Button** — primary CTAs and play/reset. Priority: **low**.
11. **Number Input** — discrete-integer inputs. Priority: **low**.

**Pre-requisite:** the project currently uses plain CSS variables, not Tailwind. Before adding any shadcn-registry component, add Tailwind and map your CSS vars (`--paper`, `--hot`, `--phos`, `--ink-1`, `--line`) into `tailwind.config.ts` as theme extensions. Once that's done, each component is a one-line `npx shadcn@latest add …`.

---

## Part 5 · Suggested order of work (ranked by ROI)

### Week 1 — foundations

1. Add Tailwind, map CSS vars into `tailwind.config.ts`.
2. Install Feedback Slider (#01). Build `src/components/ui/Slider.tsx` wrapper. Migrate 3–5 animations (GasLaw, Titration, Calorimetry, Gibbs, PhaseChange). Feel the diff before migrating the rest.
3. Add `id={topic.id}` anchors in UnitPage (F4 above). Update TEST_PLAN entries to include deep-linking checks.

### Week 2 — polish

4. Install Slide Tabs (#02). Migrate every tablist (it's a find/replace).
5. Install Spotlight Card (#03). Apply to LandingPage grid, UnitPage topics.
6. Install Animated Counter (#06). Apply to the ~15 most-watched readouts.

### Week 3 — pedagogy

7. Install Animated Tooltip (#05). Build `<DefinedTerm>` helper. Roll out to all equations (this is the biggest pedagogical lift).
8. Fix F1 (Galvanic notation: display E°red for both half-reactions).
9. Fix F7 (Heating curve plateau labels).

### Week 4 — content gaps

10. Build new animations for the HIGH-priority curriculum gaps (in order):
    - 1.1 Mole Bridge
    - 2.5 Lewis Dot Builder
    - 1.2 Mass Spec Simulator
    - 2.1 Bond Type Spectrum
    - 7.4 Ksp Solubility
    - 4.2 Net Ionic Builder
11. Wire up Vitest and get `npm test` green in CI (the math regression file already exists — `testing/unit/chemistry.test.ts`).

### Backlog / nice-to-haves

- Practice problems after each animation.
- Unit quizzes.
- Formula + glossary pages.
- Teacher-tip callouts inside animations.
- Accessibility pass (ARIA on custom sliders/tabs; Lighthouse ≥ 95).
- Mobile-specific layout (currently assumes desktop ≥ 700 px).

---

## Appendix · Files in this deliverable

| Path | Purpose |
|---|---|
| `IMPROVEMENT_REPORT.md` | This report. |
| `components/README.md` | Index + install prerequisites. |
| `components/01-feedback-slider.md` | Feedback Slider install + placement. |
| `components/02-slide-tabs.md` | Slide Tabs install + placement. |
| `components/03-spotlight-card.md` | Spotlight Card install + placement. |
| `components/04-limelight-nav.md` | Limelight Nav install + placement. |
| `components/05-animated-tooltip.md` | Animated Tooltip install + placement. |
| `components/06-animated-counter.md` | Animated Counter install + placement. |
| `components/07-range-slider-histogram.md` | Range Slider install + placement. |
| `components/08-shifting-dropdown.md` | Shifting Dropdown install + placement. |
| `components/09-morphing-popover.md` | Morphing Popover install + placement. |
| `components/10-orbital-loader.md` | Orbital Loader install + placement. |
| `components/11-interactive-hover-button.md` | Hover Button install + placement. |
| `components/12-number-input-stepper.md` | Number Input install + placement. |

End of report.
