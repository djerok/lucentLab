# Study Guide Authoring Format

This document describes how study-guide content is authored for Lucent Lab. It covers the data schema, rendering pipeline, typography rules, and the conventions that make a topic feel cohesive with the rest of the unit.

## 1. Where content lives

- Schema: `src/data/study/types.ts`
- Registry: `src/data/study/index.ts` — maps a unit slug to its `UnitStudyGuide`
- Per-unit content: `src/data/study/unitNN.ts` (e.g. `unit01.ts`)
- Renderer: `src/components/study/StudyGuide.tsx` (`TopicStudyLead`, `TopicStudyInteract`, `TopicStudyBody`, `UnitTest`)
- Math rendering: `src/components/study/Math.tsx` (KaTeX wrapper, `$...$` inline parser)

A unit is shown in study mode only if its slug exists in the registry. Without a guide, the study-mode toggle is hidden on that unit's page.

## 2. Data shape

```ts
type UnitStudyGuide = {
  unitSlug: string;          // must match curriculum.ts slug
  topics: TopicStudy[];      // one per curriculum topic, in order
  unitTest: MCQ[];           // 15 questions, mixed, spanning topics
}

type TopicStudy = {
  topicId: string;           // matches curriculum topic id, e.g. '3.4'
  overview: string;          // 1–2 sentences, "why this matters"
  lead?: Note[];             // rendered ABOVE the animation — set the question up
  interact?: InteractionGuide; // rendered with the animation (only for topics with animations)
  notes: Note[];             // rendered BELOW the animation — consolidate the learning
  mcqs: MCQ[];               // 4–5 quick checks
}

type Note = {
  heading: string;           // short noun phrase; may contain $...$ inline math
  body: string;              // prose; may contain $...$ inline math
  formula?: string;          // raw TeX source (no $ needed)
  callout?: string;          // key fact / warning; may contain $...$
  svg?: string;              // optional inline SVG markup
}

type InteractionGuide = {
  heading?: string;          // defaults to "With the interaction"
  intro?: string;
  tryThis: string[];         // "do this in the widget"
  observe: string[];         // "notice this while you do"
}

type MCQ = {
  id: string;                // unique within the file, e.g. 'q3.4.2' or 'ut3.5'
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;       // should TEACH, not just announce correctness
}
```

## 3. Layout around the animation

In study mode the UnitPage renders a topic like this:

```
┌─ topic header (unit hue top-border, "UNIT NN · TOPIC X.Y", serif title)
│
├─ TopicStudyLead           ← lead Note[] (set-up, context, first diagram)
├─ TopicStudyInteract       ← try / observe lists, if animation exists
├─ <AnimationFrame>         ← the animation itself
└─ TopicStudyBody           ← body Note[] (formal notes, worked examples)
    └─ MCQs                 ← quick checks
```

For topics with **no animation**, the whole thing collapses to the fallback `TopicStudyBlock` — lead → interact (if any) → body — stacked under a smaller topic header.

In interact-only mode none of this renders; the page shows just the animations.

## 4. Authoring rules

### 4.1 Overview (per topic)

- 1 sentence, max 2. The "why this matters" hook that a student reads first.
- No jargon that hasn't been introduced. If you need a term, introduce it here or in a lead note before using it.

### 4.2 Lead notes (above the animation)

- 1–2 notes, short. These are the **set-up** — they prime the student for what they'll see in the animation.
- The first lead note should carry the **primary diagram** (`svg` field) for the topic.
- If the topic introduces a new term (like $Z_{\text{eff}}$), this is where it gets defined.

### 4.3 Interact guide

- Only for topics whose curriculum entry has an `animationKey`.
- `tryThis`: concrete actions the student takes in the widget (3–4 bullets).
- `observe`: what they should notice while doing those actions (3–4 bullets).
- Do not duplicate content between `tryThis` and `observe`. One is verbs; one is nouns.

### 4.4 Body notes (below the animation)

- 2–4 notes covering the formal content.
- **At least one must be a "Worked example · <short title>"** with a step-by-step solution and a formula line. Two is better for calculation-heavy topics.
- Use `callout` for rules of thumb, common traps, or an exam-relevant shortcut.
- Every new term must have been introduced in an earlier note (this topic's lead, a prior topic, or this body note's own prose) before it's used casually.

### 4.5 MCQs

- 4–5 per topic. Mix conceptual and computational.
- Each id is `qX.Y.N` (e.g. `q3.4.1`).
- Explanations must TEACH — show the arithmetic or the reasoning, not just "A is correct."
- For the unit test, ids are `utX.N` (e.g. `ut3.12`) and there are 15 total per unit.

## 5. Math typography (KaTeX)

### 5.1 Where TeX is parsed

- **`formula`**: the entire string is treated as TeX source. No `$` delimiters. Rendered as a display-math block centered in the formula panel.
- **`heading`, `body`, `callout`, `overview`, `intro`, `tryThis`, `observe`, `question`, `choices`, `explanation`**: plain strings with inline TeX delimited by `$...$`.

### 5.2 Conventions

| Write as | Not |
|----------|-----|
| `$Z_{\text{eff}}$` | `Zeff`, `Z_eff` |
| `$N_A$` | `Nₐ`, `N_A` (outside math) |
| `$1s^{2}\,2s^{2}\,2p^{6}$` | `1s² 2s² 2p⁶` |
| `$\text{Na}^{+}$` | `Na+`, `Na⁺` (outside math) |
| `$\Delta H$` | `ΔH` (outside math) |
| `$\dfrac{a}{b}$` | `a/b` for equations you want to show as a proper fraction |
| `$\propto$`, `$\rightarrow$`, `$\Leftrightarrow$` | unicode arrows in formulas |

Use unicode arrows and symbols in prose when they are incidental ("→" in a walkthrough). Switch to `$...$` when they are part of a chemical equation or mathematical relation.

### 5.3 Chemistry shortcuts inside TeX

- Elements: `\text{Na}`, `\text{Cl}` (the upright font distinguishes element symbols from italic math variables).
- States: `\text{(aq)}`, `\text{(g)}`, etc.
- Arrows: `\rightarrow`, `\longrightarrow`, `\rightleftharpoons` (for equilibrium), `\longrightarrow[\text{cat}]`.
- Spacing: `\,` (thin), `\;` (medium), `\qquad` (double-quad separator for linked statements).
- Charges and oxidation states: `\text{Fe}^{2+}`, `\text{Fe}^{\text{III}}`.

### 5.4 Introducing a term

Before the first use of any non-trivial symbol:

1. Write out the name ("effective nuclear charge") immediately followed by the symbol in TeX ("$Z_{\text{eff}}$").
2. State in one sentence what it measures or represents.
3. If useful, give a formula that defines or approximates it.

Prefer adding the introduction to an earlier topic's lead or body if the symbol gets reused across topics. Do not introduce the same term twice.

## 6. SVG diagrams

### 6.1 Style rules

- `viewBox` sizing: `0 0 W H` where W is ~420–560 and H is ~170–280.
- `width="100%"` with `style="max-width:<W>px"` so the diagram scales down in narrow columns.
- Reference CSS variables for theming: `${FG}` = `var(--paper)`, `${DIM}` = `var(--paper-dim)`, `${FAINT}` = `var(--paper-faint)`, `${INK}` = `var(--ink-2)`, `${LINE}` = `var(--line-strong)`. The unit `ACCENT` is the curriculum `hue` for that unit.
- Define a `<style>` block inside `<defs>`. Avoid inline `style="..."` on primitives.
- Always include **one concrete worked example** in the diagram — "EXAMPLE · ..." strip at the bottom, or a second labeled instance under the abstract diagram.

### 6.2 Typography inside SVG

- Labels: `font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT};` with uppercase content (tags like "BEFORE", "HIGH BE").
- Headings: `font-family: Fraunces, serif; font-size: 13–18px; fill: ${FG};`.
- Inline values or math: mono, accent color.
- Never hardcode `#000` or `#fff` — those won't theme-flip.

### 6.3 Content

- Primary diagram per topic: in the FIRST lead note. Core concept, labelled.
- Optional second diagram: in a body note that shows a concrete instance or worked arrangement.
- Keep annotations pithy — the prose does the explaining.

## 7. Worked examples

Every topic needs at least one. Conventions:

- Heading begins with `Worked example · ` followed by a short noun phrase ("grams → molecules", "Fe and Fe²⁺").
- `body` is a numbered or arrow-chained walkthrough: state the setup, show the arithmetic, state the check.
- `formula` (optional) is a single-line TeX summary of the same computation — the student should be able to glance at just this line and remember the method.
- When the example corrects a common mistake, flag it in a `callout` ("4s electrons leave before 3d — not the order they filled in.").

## 8. Unit-wide final test

- 15 MCQs, ids `utX.1` through `utX.15`.
- Roughly proportional to topic weight. A 5-topic unit gets ~3 questions per topic; a 7-topic unit gets ~2 each with some topics getting 3.
- Mix computation, conceptual, and "identify the misconception" distractors.
- Explanations still teach.

## 9. Style voice

- Conversational but precise. Not chatty, not textbook-stilted.
- Short sentences. One idea per sentence.
- Analogies are welcome when they clarify ("like a dozen" for the mole), but don't stack them.
- Absolutely no filler like "Great question!" or "Let's dive in!" — this is a study tool, not a blog.
- American spelling for chemistry ("ionization", "sulfur") unless the writer is consistent with British; stay consistent within a unit.

## 10. Adding a new unit

1. Create `src/data/study/unitNN.ts` following the structure in `src/data/study/unit01.ts`.
2. Export the guide as `UNIT_NN`.
3. Register it in `src/data/study/index.ts`:
   ```ts
   import { UNIT_NN } from './unitNN';
   const STUDY_GUIDES = {
     [UNIT_01.unitSlug]: UNIT_01,
     [UNIT_NN.unitSlug]: UNIT_NN,
   };
   ```
4. Verify the study-mode toggle appears on the unit page, and each topic renders lead → interact → animation → body.
