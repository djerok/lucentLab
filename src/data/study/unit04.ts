import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 4 · Chemical Reactions  (AP CED weighting: 7–9%)
//
// Topics follow the same lead → interact → body → mcqs rhythm as Unit 1.
// Topics with no animation (4.1, 4.2) skip the interact guide.
// ──────────────────────────────────────────────────────────────────────

// Shared palette — same CSS vars used in Unit 1 for theme-flip safety.
const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#69e36b'; // Unit 4 hue

// Four reaction archetypes (Topic 4.1)
const reactionTypesSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="rt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .box { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .ttl { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .eq  { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${ACCENT}; }
      .sub { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .arrow { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; }
    </style>
  </defs>
  <text class="tag" x="24" y="20">FOUR ARCHETYPES</text>
  <rect class="box" x="20"  y="34" width="250" height="76" rx="6"/>
  <text class="tag" x="32" y="52">SYNTHESIS · A + B → AB</text>
  <text class="eq"  x="32" y="74">2 H₂ + O₂ → 2 H₂O</text>
  <text class="sub" x="32" y="96">two reactants, one product</text>
  <rect class="box" x="290" y="34" width="250" height="76" rx="6"/>
  <text class="tag" x="302" y="52">DECOMP · AB → A + B</text>
  <text class="eq"  x="302" y="74">2 KClO₃ → 2 KCl + 3 O₂</text>
  <text class="sub" x="302" y="96">one reactant, many products</text>
  <rect class="box" x="20"  y="124" width="250" height="76" rx="6"/>
  <text class="tag" x="32" y="142">COMBUSTION · CₓHᵧ + O₂</text>
  <text class="eq"  x="32" y="164">CH₄ + 2 O₂ → CO₂ + 2 H₂O</text>
  <text class="sub" x="32" y="186">hydrocarbon + O₂ → CO₂ + H₂O</text>
  <rect class="box" x="290" y="124" width="250" height="76" rx="6"/>
  <text class="tag" x="302" y="142">DISPLACEMENT · A + BC → AC + B</text>
  <text class="eq"  x="302" y="164">Zn + 2 HCl → ZnCl₂ + H₂</text>
  <text class="sub" x="302" y="186">more-active element kicks out less-active</text>
</svg>`;

// Net-ionic equation derivation (Topic 4.2)
const netIonicSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .row { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${FG}; }
      .tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .dim { fill: ${FAINT}; text-decoration: line-through; }
      .acc { fill: ${ACCENT}; }
      .sub { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .box { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)</text>

  <text class="tag" x="24" y="52">MOLECULAR</text>
  <text class="row" x="24" y="72">AgNO₃ + NaCl → AgCl↓ + NaNO₃</text>

  <text class="tag" x="24" y="102">COMPLETE IONIC · split every soluble salt</text>
  <text class="row" x="24" y="122">
    <tspan class="acc">Ag⁺</tspan> +
    <tspan class="dim">NO₃⁻</tspan> +
    <tspan class="dim">Na⁺</tspan> +
    <tspan class="acc">Cl⁻</tspan> →
    <tspan class="acc">AgCl(s)</tspan> +
    <tspan class="dim">Na⁺</tspan> +
    <tspan class="dim">NO₃⁻</tspan>
  </text>
  <text class="sub" x="24" y="140">strike through the spectators (same on both sides)</text>

  <text class="tag" x="24" y="172">NET IONIC · what actually changed</text>
  <rect class="box" x="20" y="182" width="520" height="36" rx="4"/>
  <text class="row" x="32" y="206">
    <tspan class="acc">Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</tspan>
  </text>
</svg>`;

// Stoichiometry mole-ratio bridge (Topic 4.3)
const stoichBridgeSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="st-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .box { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .ttl { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .op  { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${ACCENT}; }
      .ex  { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .arr { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; }
      .sub { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
    </style>
  </defs>
  <text class="tag" x="24" y="20">MASS A  →  MOLES A  →  MOLES B  →  MASS B</text>
  <rect class="box" x="14"  y="36" width="118" height="56" rx="6"/>
  <rect class="box" x="162" y="36" width="118" height="56" rx="6"/>
  <rect class="box" x="310" y="36" width="118" height="56" rx="6"/>
  <rect class="box" x="458" y="36" width="88"  height="56" rx="6"/>
  <text class="tag" x="73"  y="54" text-anchor="middle">GRAMS A</text>
  <text class="ttl" x="73"  y="78" text-anchor="middle">m_A</text>
  <text class="tag" x="221" y="54" text-anchor="middle">MOLES A</text>
  <text class="ttl" x="221" y="78" text-anchor="middle">n_A</text>
  <text class="tag" x="369" y="54" text-anchor="middle">MOLES B</text>
  <text class="ttl" x="369" y="78" text-anchor="middle">n_B</text>
  <text class="tag" x="502" y="54" text-anchor="middle">GRAMS B</text>
  <text class="ttl" x="502" y="78" text-anchor="middle">m_B</text>
  <path class="arr" d="M132 64 L162 64" marker-end="url(#st-arr)"/>
  <path class="arr" d="M280 64 L310 64" marker-end="url(#st-arr)"/>
  <path class="arr" d="M428 64 L458 64" marker-end="url(#st-arr)"/>
  <text class="op" x="147" y="58" text-anchor="middle">÷ M_A</text>
  <text class="op" x="295" y="58" text-anchor="middle">× (b/a)</text>
  <text class="op" x="443" y="58" text-anchor="middle">× M_B</text>
  <text class="sub" x="295" y="108" text-anchor="middle">mole-ratio from balanced equation · a A + … → b B + …</text>

  <text class="tag" x="24" y="140">EXAMPLE · 4.0 g H₂ + excess O₂ → ? g H₂O  (2 H₂ + O₂ → 2 H₂O)</text>
  <text class="ex" x="73"  y="170" text-anchor="middle">4.0 g H₂</text>
  <text class="ex" x="221" y="170" text-anchor="middle">2.0 mol H₂</text>
  <text class="ex" x="369" y="170" text-anchor="middle">2.0 mol H₂O</text>
  <text class="ex" x="502" y="170" text-anchor="middle">36 g H₂O</text>
  <text class="sub" x="280" y="196" text-anchor="middle">÷ 2.0   ·   × (2/2)   ·   × 18.0</text>
</svg>`;

// Acid-base neutralization (Topic 4.4)
const neutralizationSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="ab-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .h    { fill: #ff5b3c; }
      .oh   { fill: ${ACCENT}; }
      .water{ fill: ${ACCENT}; opacity: 0.18; stroke: ${ACCENT}; stroke-width: 1; }
      .sym  { font-family: Fraunces, serif; font-size: 18px; fill: ${FG}; }
      .tag  { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
      .eq   { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${ACCENT}; }
      .arr  { stroke: ${ACCENT}; stroke-width: 1.6; fill: none; }
      .box  { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
    </style>
  </defs>
  <text class="tag" x="70"  y="26" text-anchor="middle">ACID</text>
  <text class="tag" x="260" y="26" text-anchor="middle">BASE</text>
  <text class="tag" x="490" y="26" text-anchor="middle">WATER + SALT</text>
  <circle class="h"  cx="70"  cy="80" r="30"/>
  <text class="sym"  x="70"  y="86" text-anchor="middle">H⁺</text>
  <text class="lbl"  x="70"  y="128" text-anchor="middle">proton donor</text>
  <circle class="oh" cx="260" cy="80" r="34"/>
  <text class="sym"  x="260" y="86" text-anchor="middle">OH⁻</text>
  <text class="lbl"  x="260" y="128" text-anchor="middle">proton acceptor</text>
  <path class="arr" d="M305 80 L410 80" marker-end="url(#ab-arr)"/>
  <text class="eq" x="357" y="68" text-anchor="middle">proton transfer</text>
  <circle class="water" cx="490" cy="80" r="38"/>
  <text class="sym" x="490" y="86" text-anchor="middle">H₂O</text>
  <text class="lbl" x="490" y="128" text-anchor="middle">+ spectator salt</text>

  <rect class="box" x="20" y="156" width="520" height="48" rx="4"/>
  <text class="tag" x="32" y="174">EXAMPLE · HCl + NaOH</text>
  <text class="eq"  x="32" y="194">H⁺(aq) + OH⁻(aq) → H₂O(l)    · net ionic equation</text>
</svg>`;

// Redox — electron transfer & oxidation numbers (Topic 4.5)
const redoxSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="rx-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .cu  { fill: #e0905a; }
      .ag  { fill: #cfd4dc; }
      .sym { font-family: Fraunces, serif; font-size: 16px; fill: #1a1611; }
      .tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .num { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${ACCENT}; }
      .sub { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ared { stroke: #ff5b3c; stroke-width: 1.5; fill: none; }
      .aacc { stroke: ${ACCENT};  stroke-width: 1.5; fill: none; }
      .box { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">Cu(s) + 2 Ag⁺(aq) → Cu²⁺(aq) + 2 Ag(s)</text>

  <circle class="cu" cx="80" cy="90" r="30"/>
  <text class="sym" x="80" y="95" text-anchor="middle">Cu</text>
  <text class="num" x="80" y="138" text-anchor="middle">ox # : 0</text>
  <text class="sub" x="80" y="154" text-anchor="middle">loses 2 e⁻</text>

  <circle class="ag" cx="260" cy="90" r="26"/>
  <text class="sym" x="260" y="95" text-anchor="middle">Ag⁺</text>
  <text class="num" x="260" y="138" text-anchor="middle">ox # : +1</text>
  <text class="sub" x="260" y="154" text-anchor="middle">gains 1 e⁻</text>

  <circle class="cu" cx="420" cy="90" r="28"/>
  <text class="sym" x="420" y="95" text-anchor="middle">Cu²⁺</text>
  <text class="num" x="420" y="138" text-anchor="middle">ox # : +2</text>
  <text class="sub" x="420" y="154" text-anchor="middle">oxidised</text>

  <circle class="ag" cx="520" cy="90" r="26"/>
  <text class="sym" x="520" y="95" text-anchor="middle">Ag</text>
  <text class="num" x="520" y="138" text-anchor="middle">ox # : 0</text>
  <text class="sub" x="520" y="154" text-anchor="middle">reduced</text>

  <path class="ared" d="M110 76 Q 185 40 230 76" marker-end="url(#rx-arr)"/>
  <text class="num"  x="175" y="38" text-anchor="middle" style="fill:#ff5b3c">2 e⁻ transfer</text>

  <rect class="box" x="20" y="184" width="520" height="44" rx="4"/>
  <text class="tag" x="32" y="202">MNEMONIC</text>
  <text class="lbl" x="140" y="202">OIL RIG · Oxidation Is Loss · Reduction Is Gain (of electrons)</text>
  <text class="sub" x="140" y="220">the reductant is what gets oxidised; the oxidant is what gets reduced</text>
</svg>`;

export const UNIT_04: UnitStudyGuide = {
  unitSlug: 'chemical-reactions',

  topics: [
    // ────────────────── 4.1  Types of Reactions ──────────────────
    {
      topicId: '4.1',
      overview:
        'Almost every reaction in this course fits one of four archetypes. Knowing the archetype tells you what the products should look like before you touch stoichiometry.',
      lead: [
        {
          heading: 'Four patterns, one conservation law',
          body:
            'Atoms are never created or destroyed — only rearranged. That is the one rule all four archetypes obey. Recognising the pattern tells you what products to predict and gets you past the hardest step: writing a plausible equation.',
          svg: reactionTypesSVG,
        },
        {
          heading: 'Balancing, in one pass',
          body:
            'Once you know the skeleton, balance by atom count. Do metals first, then non-metals, then H, then O. Fractional coefficients are fine mid-pass — clear them by multiplying through at the end. A balanced equation has the same atom count of every element on both sides AND the same total charge.',
          formula: 'a\\,\\text{A} + b\\,\\text{B} \\;\\longrightarrow\\; c\\,\\text{C} + d\\,\\text{D}',
        },
      ],
      notes: [
        {
          heading: 'Combustion — the exam favourite',
          body:
            'A hydrocarbon $\\text{C}_x\\text{H}_y$ burned in excess $\\text{O}_2$ always gives $\\text{CO}_2$ and $\\text{H}_2\\text{O}$. Balance C first (set CO₂ coefficient = x), then H (set H₂O coefficient = y/2), then O last. If oxygen lands on a half, double everything.',
          callout:
            'Incomplete combustion (limited O₂) also gives CO or soot (C). If a question says "not enough air," expect CO in the products.',
        },
        {
          heading: 'Single vs double displacement',
          body:
            'Single displacement: an element kicks out another element ($\\text{Zn} + \\text{CuSO}_4 \\rightarrow \\text{ZnSO}_4 + \\text{Cu}$). Requires the incoming element to be more reactive. Double displacement: two ionic compounds swap partners in solution ($\\text{AgNO}_3 + \\text{NaCl} \\rightarrow \\text{AgCl} + \\text{NaNO}_3$). Drives forward when one product is an insoluble solid, a gas, or water.',
        },
        {
          heading: 'Worked example · balance propane combustion',
          body:
            'Skeleton: $\\text{C}_3\\text{H}_8 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$. C: set 3 CO₂. H: 8 H on left → 4 H₂O. O on right: 3(2) + 4(1) = 10 → 5 O₂ on left. Final: $\\text{C}_3\\text{H}_8 + 5\\,\\text{O}_2 \\rightarrow 3\\,\\text{CO}_2 + 4\\,\\text{H}_2\\text{O}$.',
          formula: '\\text{C}_3\\text{H}_8 + 5\\,\\text{O}_2 \\longrightarrow 3\\,\\text{CO}_2 + 4\\,\\text{H}_2\\text{O}',
        },
        {
          heading: 'Worked example · predict the products',
          body:
            'Classify and predict: $\\text{CaCO}_3 \\xrightarrow{\\Delta} ?$. One reactant, heat — decomposition. Carbonates lose $\\text{CO}_2$ to leave the oxide: $\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2$. Already balanced. Classify and predict: $\\text{Mg} + \\text{HCl} \\rightarrow ?$. Active metal in strong acid → single displacement, gives H₂: $\\text{Mg} + 2\\,\\text{HCl} \\rightarrow \\text{MgCl}_2 + \\text{H}_2$.',
        },
      ],
      mcqs: [
        {
          id: 'q4.1.1',
          question: 'Classify: $2\\,\\text{H}_2\\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O} + \\text{O}_2$',
          choices: ['Synthesis', 'Decomposition', 'Single displacement', 'Combustion'],
          correctIndex: 1,
          explanation:
            'One reactant becomes two products — classic decomposition. Catalase in the body runs this reaction.',
        },
        {
          id: 'q4.1.2',
          question: 'Balance: $\\text{C}_2\\text{H}_6 + \\text{O}_2 \\rightarrow \\text{CO}_2 + \\text{H}_2\\text{O}$. The coefficient of $\\text{O}_2$ is:',
          choices: ['5/2', '7/2', '3', '7'],
          correctIndex: 1,
          explanation:
            'Balance C: 2 CO₂. Balance H: 3 H₂O. O on right = 2(2) + 3(1) = 7 → 7/2 O₂. Multiply all by 2 to clear the half → 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O. In the unscaled form, 7/2 is the O₂ coefficient.',
        },
        {
          id: 'q4.1.3',
          question: 'Which reaction is a single-displacement reaction?',
          choices: [
            '$\\text{NaOH} + \\text{HCl} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$',
            '$\\text{Zn} + 2\\,\\text{HCl} \\rightarrow \\text{ZnCl}_2 + \\text{H}_2$',
            '$2\\,\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O}$',
            '$\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2$',
          ],
          correctIndex: 1,
          explanation:
            'A pure element (Zn) replaces another element in a compound (H in HCl). The others are neutralisation, synthesis, and decomposition.',
        },
        {
          id: 'q4.1.4',
          question: 'Predict the products of complete combustion of methanol, $\\text{CH}_3\\text{OH}$:',
          choices: [
            '$\\text{CO}_2 + \\text{H}_2$',
            '$\\text{CO}_2 + \\text{H}_2\\text{O}$',
            '$\\text{C} + \\text{H}_2\\text{O}$',
            '$\\text{CO} + \\text{O}_2$',
          ],
          correctIndex: 1,
          explanation:
            'Complete combustion of any C/H/O fuel in excess O₂ always yields CO₂ and H₂O.',
        },
        {
          id: 'q4.1.5',
          question:
            'A balanced equation must have equal on both sides:',
          choices: [
            'Coefficients only.',
            'Number of molecules.',
            'Atoms of each element AND total charge.',
            'Number of moles of reactants and products.',
          ],
          correctIndex: 2,
          explanation:
            'Conservation of mass demands equal atoms of every element; conservation of charge demands the total charge match. Moles of reactants need NOT equal moles of products.',
        },
      ],
    },

    // ────────────────── 4.2  Net Ionic Equations ──────────────────
    {
      topicId: '4.2',
      overview:
        'In aqueous reactions, most of what you write on paper is just watching ions. A net ionic equation throws away the spectators and keeps the chemistry.',
      lead: [
        {
          heading: 'Spectator ions do nothing',
          body:
            'When two soluble ionic compounds mix in water, they shatter into their ions. A spectator ion is one that appears unchanged on both sides — same species, same state. Remove them and you are left with the net ionic equation: the atoms that actually rearranged.',
          svg: netIonicSVG,
        },
        {
          heading: 'Three-step recipe',
          body:
            'Write the balanced molecular equation. Split every (aq) strong electrolyte into ions (strong acids, strong bases, soluble ionic salts). Leave solids, liquids, gases, and weak electrolytes as whole molecules. Cancel anything that appears identically on both sides — those are your spectators.',
          formula: '\\text{molecular} \\;\\longrightarrow\\; \\text{complete ionic} \\;\\longrightarrow\\; \\text{net ionic}',
        },
      ],
      notes: [
        {
          heading: 'When does a reaction even happen?',
          body:
            'Double-displacement only proceeds if a driving force removes ions from solution: (1) a precipitate forms, (2) a gas evolves, (3) a weak electrolyte (like water) forms. If every possible product is soluble and strong, nothing net happens — the net ionic equation is "no reaction."',
          callout:
            'Solubility rules to memorise: Group 1 and NH₄⁺ salts — always soluble. Nitrates (NO₃⁻), acetates, most halides — soluble (except Ag⁺, Pb²⁺, Hg₂²⁺ halides). Sulfates — soluble (except Ba, Sr, Pb, Ca). Carbonates, phosphates, sulfides, hydroxides — mostly insoluble.',
        },
        {
          heading: 'What stays intact',
          body:
            'Do not split: (1) solids (s), liquids (l), gases (g); (2) weak acids ($\\text{HF}$, $\\text{CH}_3\\text{COOH}$) and weak bases ($\\text{NH}_3$); (3) water; (4) insoluble salts even if listed as (aq) in a shorthand. Everything else that is (aq) and strong splits fully.',
        },
        {
          heading: 'Worked example · silver nitrate + sodium chloride',
          body:
            'Molecular: $\\text{AgNO}_3(aq) + \\text{NaCl}(aq) \\rightarrow \\text{AgCl}(s) + \\text{NaNO}_3(aq)$. Complete ionic: $\\text{Ag}^+ + \\text{NO}_3^- + \\text{Na}^+ + \\text{Cl}^- \\rightarrow \\text{AgCl}(s) + \\text{Na}^+ + \\text{NO}_3^-$. Spectators: $\\text{Na}^+$ and $\\text{NO}_3^-$ on both sides — cancel. Net ionic: $\\text{Ag}^+(aq) + \\text{Cl}^-(aq) \\rightarrow \\text{AgCl}(s)$.',
          formula: '\\text{Ag}^{+}(aq) + \\text{Cl}^{-}(aq) \\longrightarrow \\text{AgCl}(s)',
        },
        {
          heading: 'Worked example · acetic acid + sodium hydroxide',
          body:
            'Acetic acid is a WEAK acid — do not split it. NaOH is a strong base — split it. Molecular: $\\text{CH}_3\\text{COOH}(aq) + \\text{NaOH}(aq) \\rightarrow \\text{CH}_3\\text{COONa}(aq) + \\text{H}_2\\text{O}(l)$. Net ionic: $\\text{CH}_3\\text{COOH}(aq) + \\text{OH}^-(aq) \\rightarrow \\text{CH}_3\\text{COO}^-(aq) + \\text{H}_2\\text{O}(l)$. The acid stays whole because it barely ionises on its own.',
        },
      ],
      mcqs: [
        {
          id: 'q4.2.1',
          question:
            'A spectator ion is best described as:',
          choices: [
            'An ion with zero charge.',
            'An ion that appears unchanged on both sides of the equation.',
            'An ion that forms a precipitate.',
            'A weak electrolyte that stays molecular.',
          ],
          correctIndex: 1,
          explanation:
            'Spectators are ions that came to the party but did not react — identical on reactant and product sides. Cancelling them leaves the net ionic equation.',
        },
        {
          id: 'q4.2.2',
          question:
            'The net ionic equation for $\\text{Ba(NO}_3\\text{)}_2(aq) + \\text{Na}_2\\text{SO}_4(aq) \\rightarrow$ ? is:',
          choices: [
            '$\\text{Ba}^{2+} + 2\\,\\text{NO}_3^- \\rightarrow \\text{Ba(NO}_3\\text{)}_2(s)$',
            '$\\text{Ba}^{2+}(aq) + \\text{SO}_4^{2-}(aq) \\rightarrow \\text{BaSO}_4(s)$',
            '$2\\,\\text{Na}^+ + 2\\,\\text{NO}_3^- \\rightarrow 2\\,\\text{NaNO}_3$',
            'No reaction occurs.',
          ],
          correctIndex: 1,
          explanation:
            'BaSO₄ is insoluble — it precipitates. Na⁺ and NO₃⁻ are spectators. The net ionic shows only Ba²⁺ joining SO₄²⁻ to form the solid.',
        },
        {
          id: 'q4.2.3',
          question:
            'Which pair of aqueous solutions will have NO net reaction when mixed?',
          choices: [
            '$\\text{AgNO}_3$ + $\\text{NaCl}$',
            '$\\text{KNO}_3$ + $\\text{NaCl}$',
            '$\\text{Pb(NO}_3\\text{)}_2$ + $\\text{KI}$',
            '$\\text{HCl}$ + $\\text{NaOH}$',
          ],
          correctIndex: 1,
          explanation:
            'All four possible products (KNO₃, NaCl, KCl, NaNO₃) are soluble and none is a weak electrolyte or gas. No driving force → no reaction.',
        },
        {
          id: 'q4.2.4',
          question:
            'In the reaction $\\text{HF}(aq) + \\text{KOH}(aq) \\rightarrow \\text{KF}(aq) + \\text{H}_2\\text{O}(l)$, what is the correct net ionic form?',
          choices: [
            '$\\text{H}^+ + \\text{OH}^- \\rightarrow \\text{H}_2\\text{O}$',
            '$\\text{HF} + \\text{OH}^- \\rightarrow \\text{F}^- + \\text{H}_2\\text{O}$',
            '$\\text{HF} + \\text{KOH} \\rightarrow \\text{KF} + \\text{H}_2\\text{O}$',
            '$\\text{K}^+ + \\text{F}^- \\rightarrow \\text{KF}$',
          ],
          correctIndex: 1,
          explanation:
            'HF is a WEAK acid — it stays molecular. KOH is strong, so it splits. K⁺ is the only spectator. The acid donates its proton to the hydroxide.',
        },
        {
          id: 'q4.2.5',
          question:
            'Which species would you split into ions when writing a complete-ionic equation?',
          choices: [
            '$\\text{H}_2\\text{O}(l)$',
            '$\\text{AgCl}(s)$',
            '$\\text{Na}_2\\text{SO}_4(aq)$',
            '$\\text{NH}_3(aq)$',
          ],
          correctIndex: 2,
          explanation:
            'Strong soluble salts split fully. Water, solids, and weak electrolytes (NH₃) stay whole.',
        },
      ],
    },

    // ────────────────── 4.3  Stoichiometry ──────────────────
    {
      topicId: '4.3',
      overview:
        'A balanced equation is a recipe — the coefficients are mole ratios. Stoichiometry is the arithmetic of following that recipe from one substance to another.',
      lead: [
        {
          heading: 'Grams are a lie; moles are the truth',
          body:
            'You can never cross a reaction in mass units. The bridge goes through moles: convert your known mass to moles, use the coefficients to hop to moles of the target, then convert back to mass if needed. Units do the work for you if you keep them visible.',
          svg: stoichBridgeSVG,
        },
        {
          heading: 'The mole-ratio is the coefficient ratio',
          body:
            'For a balanced equation $a\\,\\text{A} + b\\,\\text{B} \\rightarrow c\\,\\text{C} + d\\,\\text{D}$, the ratio of moles consumed or produced is exactly the ratio of the coefficients. You multiply moles of the known substance by (coefficient of target) / (coefficient of known).',
          formula: '\\dfrac{n_B}{n_A} = \\dfrac{b}{a}',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The stoichiometry widget lets you pick a reaction, set the starting moles of one reactant, and watch the other quantities track.',
        tryThis: [
          'Load $2\\,\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O}$ and vary $\\text{H}_2$ between 1 and 6 mol. Keep $\\text{O}_2$ fixed.',
          'Switch to limiting-reagent mode: give a small amount of one reactant and plenty of the other.',
          'Change the reaction to $\\text{N}_2 + 3\\,\\text{H}_2 \\rightarrow 2\\,\\text{NH}_3$ and predict moles of $\\text{NH}_3$ before you look.',
        ],
        observe: [
          'When one reactant runs out, the reaction stops no matter how much of the other is left — that leftover is the excess reagent.',
          'Moles of product track the limiting reagent, scaled by the coefficient ratio.',
          'Percent yield never exceeds 100% in a real experiment. Values above 100% signal impure product or weighing error.',
        ],
      },
      notes: [
        {
          heading: 'Limiting reagent — the one that runs out first',
          body:
            'To find it: compute moles of each reactant, then divide each by its coefficient. The reactant with the smaller quotient is limiting. Use ONLY that one for product calculations. Everything else is "excess" and some is left over.',
          callout:
            'A common trap: students compare the raw mole amounts and pick the smaller. That is wrong when coefficients differ. Always divide by the coefficient before comparing.',
        },
        {
          heading: 'Percent yield',
          body:
            'Theoretical yield = what the stoichiometry says you should make. Actual yield = what you measured on the balance. Percent yield = actual / theoretical × 100%. Real reactions lose product to side reactions, incomplete conversion, transfers — expect 70–95% in the lab.',
          formula: '\\%\\,\\text{yield} \\;=\\; \\dfrac{\\text{actual}}{\\text{theoretical}} \\times 100\\%',
        },
        {
          heading: 'Worked example · grams → grams',
          body:
            'How many grams of $\\text{H}_2\\text{O}$ form from 4.0 g of $\\text{H}_2$ in excess $\\text{O}_2$?  (1) $n(\\text{H}_2) = 4.0 / 2.0 = 2.0$ mol.  (2) Ratio is 2 : 2 → $n(\\text{H}_2\\text{O}) = 2.0$ mol.  (3) $m(\\text{H}_2\\text{O}) = 2.0 \\times 18.0 = 36$ g.  Check: 4 g H + 32 g O = 36 g H₂O, mass conserved.',
          formula: '4.0\\,\\text{g H}_2 \\div 2.0\\,\\tfrac{\\text{g}}{\\text{mol}} \\times \\tfrac{2}{2} \\times 18.0 = 36\\,\\text{g H}_2\\text{O}',
        },
        {
          heading: 'Worked example · limiting reagent',
          body:
            '10.0 g of $\\text{N}_2$ reacts with 3.00 g of $\\text{H}_2$ to make $\\text{NH}_3$ ($\\text{N}_2 + 3\\,\\text{H}_2 \\rightarrow 2\\,\\text{NH}_3$). Moles: N₂ = 10.0/28.0 = 0.357; H₂ = 3.00/2.02 = 1.49. Divide by coefficients: 0.357/1 = 0.357; 1.49/3 = 0.495. N₂ is smaller → limiting. Moles NH₃ = 0.357 × (2/1) = 0.714 mol → 12.2 g NH₃. H₂ left over: 1.49 − 3(0.357) = 0.42 mol.',
        },
      ],
      mcqs: [
        {
          id: 'q4.3.1',
          question:
            'For $\\text{N}_2 + 3\\,\\text{H}_2 \\rightarrow 2\\,\\text{NH}_3$, how many moles of $\\text{NH}_3$ form from 6.0 mol $\\text{H}_2$ in excess $\\text{N}_2$?',
          choices: ['2.0 mol', '3.0 mol', '4.0 mol', '6.0 mol'],
          correctIndex: 2,
          explanation:
            'Ratio H₂ : NH₃ = 3 : 2. So n(NH₃) = 6.0 × (2/3) = 4.0 mol.',
        },
        {
          id: 'q4.3.2',
          question:
            '32 g of $\\text{CH}_4$ (M = 16.0 g/mol) burns in excess $\\text{O}_2$. How many grams of $\\text{CO}_2$ form?  ($\\text{CH}_4 + 2\\,\\text{O}_2 \\rightarrow \\text{CO}_2 + 2\\,\\text{H}_2\\text{O}$)',
          choices: ['44 g', '88 g', '176 g', '22 g'],
          correctIndex: 1,
          explanation:
            'n(CH₄) = 32/16 = 2.0 mol. Ratio 1:1 → 2.0 mol CO₂. Mass = 2.0 × 44 = 88 g.',
        },
        {
          id: 'q4.3.3',
          question:
            'For $2\\,\\text{A} + \\text{B} \\rightarrow \\text{C}$, you have 4.0 mol A and 3.0 mol B. The limiting reagent is:',
          choices: ['A', 'B', 'Neither — stoichiometric', 'Cannot determine'],
          correctIndex: 0,
          explanation:
            'Divide by coefficient: A → 4.0/2 = 2.0; B → 3.0/1 = 3.0. A has the smaller quotient, so A is limiting. (Raw moles would have misled you.)',
        },
        {
          id: 'q4.3.4',
          question:
            'A reaction has a theoretical yield of 50.0 g. The student isolates 42.5 g. The percent yield is:',
          choices: ['85.0%', '75.0%', '95.0%', '117.6%'],
          correctIndex: 0,
          explanation:
            '42.5/50.0 × 100 = 85.0%. The other values would imply different actual masses.',
        },
        {
          id: 'q4.3.5',
          question:
            '5.00 mol $\\text{H}_2$ reacts with 3.00 mol $\\text{O}_2$ via $2\\,\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O}$. How many moles of $\\text{O}_2$ are LEFT OVER?',
          choices: ['0.00 mol', '0.50 mol', '1.00 mol', '2.00 mol'],
          correctIndex: 1,
          explanation:
            '5.00/2 = 2.50 for H₂; 3.00/1 = 3.00 for O₂ — H₂ is limiting. O₂ used = 5.00 × (1/2) = 2.50 mol. Left = 3.00 − 2.50 = 0.50 mol.',
        },
      ],
    },

    // ────────────────── 4.4  Acid-Base Reactions ──────────────────
    {
      topicId: '4.4',
      overview:
        'Acid-base reactions are proton transfers. One species hands an $\\text{H}^+$ to another, forming water (most often) and a salt.',
      lead: [
        {
          heading: 'Brønsted-Lowry in one sentence',
          body:
            'An acid is a proton ($\\text{H}^+$) donor; a base is a proton acceptor. Neutralisation is the handoff. Strong acids (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄) ionise completely in water; strong bases (Group 1 hydroxides, Ca/Sr/Ba hydroxides) dissociate completely. Everything else is weak.',
          svg: neutralizationSVG,
        },
        {
          heading: 'The universal strong-acid–strong-base net ionic',
          body:
            'Whenever you neutralise a strong acid with a strong base, the net ionic equation is the same — the spectators differ, the chemistry does not. Proton plus hydroxide makes water.',
          formula: '\\text{H}^{+}(aq) + \\text{OH}^{-}(aq) \\;\\longrightarrow\\; \\text{H}_2\\text{O}(l)',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The neutralisation widget lets you add base to acid drop-by-drop and watch the proton count fall.',
        tryThis: [
          'Add NaOH to HCl in 1 mL steps until the pH hits 7. Note the equivalence volume.',
          'Restart with HCl that is twice as concentrated — predict the new equivalence volume before you add.',
          'Switch the acid to weak acetic acid and watch how the curve changes shape.',
        ],
        observe: [
          'At the equivalence point, moles of $\\text{H}^+$ added equal moles of $\\text{OH}^-$ added. For strong + strong, this is exactly pH 7.',
          'Doubling acid concentration doubles the base volume needed — it is a mole-to-mole count.',
          'A weak-acid titration has a buffer plateau before equivalence; the endpoint pH is above 7, not at 7.',
        ],
      },
      notes: [
        {
          heading: 'Titration — the stoichiometry of neutralisation',
          body:
            'In a titration, you add a solution of known concentration (titrant) until the moles of $\\text{H}^+$ and $\\text{OH}^-$ match. At the equivalence point: $M_a V_a = M_b V_b$ for monoprotic acid + monobasic base. For $\\text{H}_2\\text{SO}_4$ (diprotic), multiply its moles by 2.',
          formula: 'M_a V_a \\cdot n_{\\text{H}} \\;=\\; M_b V_b \\cdot n_{\\text{OH}}',
          callout:
            'The equivalence point is a stoichiometric idea ("moles matched"). The endpoint is what you see on the indicator. Good indicators pick them close; they are not identical by definition.',
        },
        {
          heading: 'Conjugate pairs',
          body:
            'When an acid donates a proton it becomes its conjugate base; when a base accepts one it becomes its conjugate acid. $\\text{HF}/\\text{F}^-$ is a conjugate pair. Strong acids have very weak conjugate bases (so $\\text{Cl}^-$ does nothing in water). Weak acids have conjugate bases that matter — that is why $\\text{NaCH}_3\\text{COO}$ solutions are basic.',
        },
        {
          heading: 'Worked example · titration math',
          body:
            'What volume of 0.100 M NaOH neutralises 25.0 mL of 0.150 M HCl? Moles HCl = 0.0250 × 0.150 = 3.75 × 10⁻³ mol. Ratio 1:1 → need 3.75 × 10⁻³ mol NaOH. Volume = n/M = 3.75 × 10⁻³ / 0.100 = 0.0375 L = 37.5 mL.',
          formula: 'V_b = \\dfrac{M_a V_a}{M_b} = \\dfrac{(0.150)(25.0)}{0.100} = 37.5\\,\\text{mL}',
        },
        {
          heading: 'Worked example · diprotic acid',
          body:
            'What volume of 0.200 M NaOH neutralises 50.0 mL of 0.100 M $\\text{H}_2\\text{SO}_4$? Each sulfuric donates TWO protons. Moles H⁺ = 2 × (0.0500)(0.100) = 0.0100 mol. Moles NaOH needed = 0.0100 mol. Volume = 0.0100/0.200 = 0.0500 L = 50.0 mL.',
        },
      ],
      mcqs: [
        {
          id: 'q4.4.1',
          question:
            'The net ionic equation for the neutralisation of any strong acid by any strong base is:',
          choices: [
            '$\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$',
            '$\\text{H}^+(aq) + \\text{OH}^-(aq) \\rightarrow \\text{H}_2\\text{O}(l)$',
            '$\\text{H}_3\\text{O}^+ + \\text{OH}^- \\rightarrow 2\\,\\text{H}_2\\text{O}$',
            '$\\text{H}^+ + \\text{Cl}^- \\rightarrow \\text{HCl}$',
          ],
          correctIndex: 1,
          explanation:
            'All the spectators (Na⁺, Cl⁻, whatever) cancel. Only the proton + hydroxide combination is the actual chemistry. (The H₃O⁺ version is fine but not the shortest AP form.)',
        },
        {
          id: 'q4.4.2',
          question:
            'What volume of 0.250 M KOH neutralises 40.0 mL of 0.100 M HNO₃?',
          choices: ['10.0 mL', '16.0 mL', '20.0 mL', '100 mL'],
          correctIndex: 1,
          explanation:
            'Moles HNO₃ = 0.0400 × 0.100 = 4.00 × 10⁻³ mol. 1:1 → need same moles KOH. V = 4.00 × 10⁻³ / 0.250 = 0.0160 L = 16.0 mL.',
        },
        {
          id: 'q4.4.3',
          question:
            'Which species is a WEAK acid?',
          choices: ['HCl', 'HNO₃', 'HF', 'HClO₄'],
          correctIndex: 2,
          explanation:
            'HF is the one weak acid among these. The other three ionise completely in water.',
        },
        {
          id: 'q4.4.4',
          question:
            'The conjugate base of $\\text{HSO}_4^-$ is:',
          choices: ['$\\text{H}_2\\text{SO}_4$', '$\\text{SO}_4^{2-}$', '$\\text{H}_2\\text{O}$', '$\\text{OH}^-$'],
          correctIndex: 1,
          explanation:
            'Conjugate base = the species after it donates a proton. $\\text{HSO}_4^- - \\text{H}^+ = \\text{SO}_4^{2-}$.',
        },
        {
          id: 'q4.4.5',
          question:
            'How many mL of 0.100 M NaOH are required to neutralise 25.0 mL of 0.100 M $\\text{H}_2\\text{SO}_4$ (diprotic)?',
          choices: ['12.5 mL', '25.0 mL', '37.5 mL', '50.0 mL'],
          correctIndex: 3,
          explanation:
            'Each H₂SO₄ delivers 2 protons. Moles H⁺ = 2 × 0.0250 × 0.100 = 5.00 × 10⁻³. Divide by 0.100 M → 50.0 mL.',
        },
      ],
    },

    // ────────────────── 4.5  Oxidation-Reduction ──────────────────
    {
      topicId: '4.5',
      overview:
        'Redox reactions transfer electrons. One species loses them (gets oxidised); another gains them (gets reduced). The bookkeeping tool is the oxidation number.',
      lead: [
        {
          heading: 'Oxidation numbers — an accounting tool',
          body:
            'The oxidation number (or oxidation state) is the hypothetical charge an atom would have if every bond were fully ionic. It is a bookkeeping number, not a real charge. If an atom\'s oxidation number rises during a reaction, it lost electrons — it was oxidised. If it falls, it gained electrons — it was reduced.',
          svg: redoxSVG,
        },
        {
          heading: 'Rules for assigning oxidation numbers',
          body:
            'Walk the rules in order, stopping at the first that applies. (1) Free element = 0 (Na metal, O₂, Cl₂ are all 0). (2) Monatomic ion = its charge. (3) Group 1 = +1; Group 2 = +2; F always −1. (4) H is +1 (except −1 when bonded to metal in hydrides). (5) O is −2 (except −1 in peroxides, +2 in $\\text{OF}_2$). (6) Everything else is solved for so the sum matches the species charge.',
          formula: '\\sum_i (\\text{ox \\#})_i \\;=\\; \\text{charge on species}',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The redox widget highlights oxidation-number changes as you step through a reaction.',
        tryThis: [
          'Load $\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}$ and identify the oxidation-number changes.',
          'Switch to $\\text{MnO}_4^- + \\text{Fe}^{2+}$ in acid and find which atom is reduced.',
          'Try a reaction that is NOT redox (acid-base) and note every oxidation number stays the same.',
        ],
        observe: [
          'The element whose number goes UP is oxidised; the element whose number goes DOWN is reduced.',
          'Electrons lost by the reductant equal electrons gained by the oxidant — always balanced.',
          'Spectator ions (Na⁺, $\\text{NO}_3^-$) keep the same oxidation number across the arrow.',
        ],
      },
      notes: [
        {
          heading: 'Oxidant vs reductant (yes, it is backwards)',
          body:
            'The oxidising agent is the species that causes oxidation in something else — so it itself is REDUCED. The reducing agent is the species that causes reduction in something else — so it itself is OXIDISED. Students mix this up every year; re-read it.',
          callout:
            'Mnemonic: OIL RIG — Oxidation Is Loss, Reduction Is Gain (of electrons). LEO GER (Loses Electrons = Oxidation; Gains Electrons = Reduction) works too.',
        },
        {
          heading: 'Activity series — who oxidises whom',
          body:
            'In single-displacement, a more reactive metal displaces a less reactive one. K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au. $\\text{Zn}$ in $\\text{CuSO}_4$ works (Zn higher); $\\text{Cu}$ in $\\text{ZnSO}_4$ does not. The same logic governs whether a metal reacts with acid to liberate $\\text{H}_2$: anything above hydrogen in the series does; Cu, Ag, Au do not.',
        },
        {
          heading: 'Worked example · oxidation numbers in $\\text{KMnO}_4$',
          body:
            'K is +1 (Group 1). Four O atoms at −2 each contribute −8. The whole formula is neutral, so Mn + 1 + (−8) = 0, giving Mn = +7. If this $\\text{KMnO}_4$ reacts and ends up as $\\text{Mn}^{2+}$, manganese went from +7 to +2 — a gain of 5 electrons per Mn. Mn was reduced; $\\text{MnO}_4^-$ is the oxidising agent.',
          formula: '\\text{Mn in KMnO}_4 = +7 \\;\\longrightarrow\\; \\text{Mn}^{2+}:\\;\\Delta = -5\\;(\\text{reduced})',
        },
        {
          heading: 'Worked example · identifying the redox pair',
          body:
            'For $\\text{Cu}(s) + 2\\,\\text{AgNO}_3(aq) \\rightarrow \\text{Cu(NO}_3\\text{)}_2(aq) + 2\\,\\text{Ag}(s)$: Cu goes from 0 to +2 (lost 2 e⁻, oxidised). Ag goes from +1 to 0 (gained 1 e⁻ per atom, reduced). Cu is the reductant; Ag⁺ is the oxidant. $\\text{NO}_3^-$ is a spectator — its N stays +5, its O stays −2 throughout.',
        },
      ],
      mcqs: [
        {
          id: 'q4.5.1',
          question:
            'What is the oxidation number of S in $\\text{SO}_4^{2-}$?',
          choices: ['−2', '0', '+4', '+6'],
          correctIndex: 3,
          explanation:
            '4 O at −2 = −8. Total charge = −2. So S + (−8) = −2 → S = +6.',
        },
        {
          id: 'q4.5.2',
          question:
            'In $\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$, which species is the oxidising agent?',
          choices: ['Zn(s)', 'Cu²⁺(aq)', 'Zn²⁺(aq)', 'Cu(s)'],
          correctIndex: 1,
          explanation:
            'Cu²⁺ is reduced (+2 → 0), so it CAUSED oxidation in Zn — Cu²⁺ is the oxidising agent. Zn is the reducing agent.',
        },
        {
          id: 'q4.5.3',
          question:
            'Which of the following is NOT a redox reaction?',
          choices: [
            '$2\\,\\text{Na} + \\text{Cl}_2 \\rightarrow 2\\,\\text{NaCl}$',
            '$\\text{HCl} + \\text{NaOH} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O}$',
            '$\\text{Zn} + 2\\,\\text{HCl} \\rightarrow \\text{ZnCl}_2 + \\text{H}_2$',
            '$4\\,\\text{Fe} + 3\\,\\text{O}_2 \\rightarrow 2\\,\\text{Fe}_2\\text{O}_3$',
          ],
          correctIndex: 1,
          explanation:
            'Acid-base neutralisation: every oxidation number stays the same (H is +1, Cl is −1, Na is +1, O is −2 on both sides). The other three involve elements going from 0 to charged, or vice versa.',
        },
        {
          id: 'q4.5.4',
          question:
            'The oxidation number of H in $\\text{NaH}$ is:',
          choices: ['+1', '0', '−1', '+2'],
          correctIndex: 2,
          explanation:
            'In metal hydrides, H takes the −1 state. Na is +1 (Group 1), so H must be −1 to make the compound neutral.',
        },
        {
          id: 'q4.5.5',
          question:
            'A species is OXIDISED. Therefore, it:',
          choices: [
            'Gains electrons and its oxidation number falls.',
            'Loses electrons and its oxidation number rises.',
            'Gains protons and its oxidation number rises.',
            'Loses electrons and its oxidation number falls.',
          ],
          correctIndex: 1,
          explanation:
            'OIL: Oxidation Is Loss of electrons. Fewer electrons around the atom → a more positive (higher) oxidation number.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  // 15 questions: ~3 per topic. Mixes computation, classification, and conceptual.
  unitTest: [
    {
      id: 'ut4.1',
      question:
        'Classify: $\\text{Mg}(s) + 2\\,\\text{HCl}(aq) \\rightarrow \\text{MgCl}_2(aq) + \\text{H}_2(g)$',
      choices: ['Synthesis', 'Decomposition', 'Single displacement', 'Double displacement'],
      correctIndex: 2,
      explanation:
        'A pure element (Mg) replaces H in HCl. Classic single displacement. Bonus: it is also redox — Mg goes 0 → +2; H goes +1 → 0.',
    },
    {
      id: 'ut4.2',
      question:
        'Balance: $\\text{Fe} + \\text{O}_2 \\rightarrow \\text{Fe}_2\\text{O}_3$. The smallest whole-number coefficients are:',
      choices: ['1, 1, 1', '2, 3, 1', '4, 3, 2', '2, 1, 2'],
      correctIndex: 2,
      explanation:
        'Balance Fe: 2 Fe₂O₃ needs 4 Fe. Balance O: 2(3) = 6 on right → 3 O₂ on left. Coefficients: 4, 3, 2.',
    },
    {
      id: 'ut4.3',
      question:
        'Which species stays molecular (does NOT split) when writing a complete-ionic equation?',
      choices: ['$\\text{KNO}_3(aq)$', '$\\text{HCl}(aq)$', '$\\text{H}_2\\text{O}(l)$', '$\\text{NaOH}(aq)$'],
      correctIndex: 2,
      explanation:
        'Liquids, solids, gases, and weak electrolytes stay whole. Water is a liquid and only weakly ionises.',
    },
    {
      id: 'ut4.4',
      question:
        'When aqueous $\\text{Pb(NO}_3\\text{)}_2$ is mixed with aqueous KI, the net ionic equation is:',
      choices: [
        '$\\text{K}^+ + \\text{NO}_3^- \\rightarrow \\text{KNO}_3$',
        '$\\text{Pb}^{2+}(aq) + 2\\,\\text{I}^-(aq) \\rightarrow \\text{PbI}_2(s)$',
        '$\\text{Pb}^{2+} + \\text{I}^- \\rightarrow \\text{PbI}$',
        'No reaction.',
      ],
      correctIndex: 1,
      explanation:
        'PbI₂ is insoluble (bright yellow precipitate). K⁺ and NO₃⁻ are spectators. Ratios come from the neutral formula PbI₂.',
    },
    {
      id: 'ut4.5',
      question:
        'For $2\\,\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O}$, how many grams of $\\text{H}_2\\text{O}$ form from 8.0 g of $\\text{H}_2$ in excess $\\text{O}_2$?',
      choices: ['18 g', '36 g', '72 g', '144 g'],
      correctIndex: 2,
      explanation:
        'n(H₂) = 8.0/2.0 = 4.0 mol. Ratio 2:2 → 4.0 mol H₂O. Mass = 4.0 × 18.0 = 72 g.',
    },
    {
      id: 'ut4.6',
      question:
        'For $\\text{N}_2 + 3\\,\\text{H}_2 \\rightarrow 2\\,\\text{NH}_3$, you mix 2.0 mol $\\text{N}_2$ with 3.0 mol $\\text{H}_2$. The limiting reagent is:',
      choices: ['$\\text{N}_2$', '$\\text{H}_2$', 'Neither', '$\\text{NH}_3$'],
      correctIndex: 1,
      explanation:
        'Divide by coefficient: N₂ → 2.0/1 = 2.0; H₂ → 3.0/3 = 1.0. H₂ has the smaller quotient, so H₂ runs out first.',
    },
    {
      id: 'ut4.7',
      question:
        'A reaction has a theoretical yield of 12.0 g. The student collects 9.00 g. The percent yield is:',
      choices: ['75.0%', '80.0%', '125%', '33.3%'],
      correctIndex: 0,
      explanation:
        '9.00 / 12.0 × 100 = 75.0%. Below 100%, as real yields always are.',
    },
    {
      id: 'ut4.8',
      question:
        'The net ionic equation for $\\text{HNO}_3(aq) + \\text{KOH}(aq) \\rightarrow \\text{KNO}_3(aq) + \\text{H}_2\\text{O}(l)$ is:',
      choices: [
        '$\\text{HNO}_3 + \\text{KOH} \\rightarrow \\text{KNO}_3 + \\text{H}_2\\text{O}$',
        '$\\text{K}^+ + \\text{NO}_3^- \\rightarrow \\text{KNO}_3$',
        '$\\text{H}^+(aq) + \\text{OH}^-(aq) \\rightarrow \\text{H}_2\\text{O}(l)$',
        '$\\text{H}^+ + \\text{K}^+ \\rightarrow \\text{KH}$',
      ],
      correctIndex: 2,
      explanation:
        'Strong acid + strong base. All spectators cancel, leaving the universal proton + hydroxide → water equation.',
    },
    {
      id: 'ut4.9',
      question:
        'What volume of 0.200 M NaOH neutralises 25.0 mL of 0.400 M HCl?',
      choices: ['12.5 mL', '25.0 mL', '50.0 mL', '100 mL'],
      correctIndex: 2,
      explanation:
        'Moles HCl = 0.0250 × 0.400 = 0.0100. 1:1 → need 0.0100 mol NaOH. V = 0.0100 / 0.200 = 0.0500 L = 50.0 mL.',
    },
    {
      id: 'ut4.10',
      question:
        'Which is a weak acid?',
      choices: ['HBr', 'HI', 'H$_2$SO$_4$', 'CH$_3$COOH'],
      correctIndex: 3,
      explanation:
        'Acetic acid (CH₃COOH) is the weak one — it only partially ionises. HBr, HI, and H₂SO₄ are on the strong-acid list.',
    },
    {
      id: 'ut4.11',
      question:
        'The conjugate acid of $\\text{NH}_3$ is:',
      choices: ['$\\text{NH}_4^+$', '$\\text{NH}_2^-$', '$\\text{N}^{3-}$', '$\\text{NH}_3$'],
      correctIndex: 0,
      explanation:
        'Conjugate acid = species plus a proton. NH₃ + H⁺ → NH₄⁺.',
    },
    {
      id: 'ut4.12',
      question:
        'The oxidation number of Cr in $\\text{Cr}_2\\text{O}_7^{2-}$ (dichromate) is:',
      choices: ['+2', '+3', '+6', '+7'],
      correctIndex: 2,
      explanation:
        '7 O at −2 = −14. Total charge = −2. So 2 Cr + (−14) = −2 → 2 Cr = +12 → Cr = +6.',
    },
    {
      id: 'ut4.13',
      question:
        'In the reaction $\\text{Cu}(s) + 2\\,\\text{Ag}^+(aq) \\rightarrow \\text{Cu}^{2+}(aq) + 2\\,\\text{Ag}(s)$, the species oxidised is:',
      choices: ['Cu(s)', 'Ag⁺(aq)', 'Cu²⁺(aq)', 'Ag(s)'],
      correctIndex: 0,
      explanation:
        'Cu goes 0 → +2 — it lost electrons, so it is oxidised. Ag⁺ is reduced (+1 → 0).',
    },
    {
      id: 'ut4.14',
      question:
        'Which reaction is NOT a redox reaction?',
      choices: [
        '$2\\,\\text{Mg} + \\text{O}_2 \\rightarrow 2\\,\\text{MgO}$',
        '$\\text{AgNO}_3 + \\text{NaCl} \\rightarrow \\text{AgCl} + \\text{NaNO}_3$',
        '$\\text{Zn} + \\text{CuSO}_4 \\rightarrow \\text{ZnSO}_4 + \\text{Cu}$',
        '$2\\,\\text{H}_2\\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O} + \\text{O}_2$',
      ],
      correctIndex: 1,
      explanation:
        'The precipitation of AgCl is a double-displacement with no change in oxidation numbers — Ag stays +1, Cl stays −1, Na stays +1, N stays +5. The others all have clean 0 ↔ charged transitions.',
    },
    {
      id: 'ut4.15',
      question:
        'A 5.00 g sample of $\\text{CaCO}_3$ (M = 100. g/mol) decomposes completely: $\\text{CaCO}_3 \\rightarrow \\text{CaO} + \\text{CO}_2$. What mass of $\\text{CO}_2$ (M = 44.0 g/mol) is released?',
      choices: ['1.10 g', '2.20 g', '4.40 g', '22.0 g'],
      correctIndex: 1,
      explanation:
        'n(CaCO₃) = 5.00/100 = 0.0500 mol. Ratio 1:1 → 0.0500 mol CO₂. Mass = 0.0500 × 44.0 = 2.20 g.',
    },
  ],
};
