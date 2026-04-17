import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 7 · Equilibrium  (AP CED weighting: 7–9%)
//
// Dynamic balance of forward and reverse reactions. Topics:
//   7.1 Reaction Quotient & Equilibrium Constant (Q vs K)
//   7.2 ICE Tables
//   7.3 Le Châtelier's Principle
//   7.4 Solubility Equilibria (Ksp)
//   7.5 Common-Ion Effect
// ──────────────────────────────────────────────────────────────────────

const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#f0abfc'; // Unit 7 hue

// Q vs K direction-of-shift diagram (Topic 7.1)
const qVsKSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="qk-l" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <marker id="qk-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .tick  { stroke: ${LINE}; stroke-width: 1; }
      .k     { stroke: ${ACCENT}; stroke-width: 2; stroke-dasharray: 2 3; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .val   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .arrow { stroke: ${ACCENT}; stroke-width: 1.6; fill: none; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">REACTION QUOTIENT · DIRECTION OF SHIFT</text>
  <line class="ax" x1="60" y1="90" x2="520" y2="90"/>
  <line class="tick" x1="60"  y1="84" x2="60"  y2="96"/>
  <line class="tick" x1="520" y1="84" x2="520" y2="96"/>
  <line class="k"    x1="290" y1="60" x2="290" y2="130"/>
  <text class="tag" x="60"  y="112" text-anchor="middle">Q = 0</text>
  <text class="tag" x="520" y="112" text-anchor="middle">Q = ∞</text>
  <text class="val" x="290" y="54"  text-anchor="middle">Q = K</text>
  <text class="sub" x="290" y="148" text-anchor="middle">equilibrium</text>
  <path class="arrow" d="M180 74 L240 74" marker-end="url(#qk-r)"/>
  <text class="lbl" x="170" y="78" text-anchor="end">Q &lt; K</text>
  <text class="sub" x="210" y="64" text-anchor="middle">shifts →</text>
  <text class="ex"  x="210" y="44" text-anchor="middle">make more products</text>
  <path class="arrow" d="M400 74 L340 74" marker-end="url(#qk-l)"/>
  <text class="lbl" x="410" y="78">Q &gt; K</text>
  <text class="sub" x="370" y="64" text-anchor="middle">shifts ←</text>
  <text class="ex"  x="370" y="44" text-anchor="middle">make more reactants</text>
  <rect x="24" y="168" width="520" height="36" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="184">EXAMPLE</text>
  <text class="ex"  x="40" y="200">N₂ + 3H₂ ⇌ 2NH₃ · K = 4.0 · Q = 1.2 &lt; K · net forward until Q climbs to 4.0</text>
</svg>`;

// ICE table diagram (Topic 7.2)
const iceTableSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .row   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .hdr   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; opacity: 0.6; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ini   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${FG}; }
      .chg   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .eq    { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${FG}; font-weight: 600; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .rxn   { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
    </style>
  </defs>
  <text class="tag" x="24" y="20">ICE TABLE · INITIAL · CHANGE · EQUILIBRIUM</text>
  <text class="rxn" x="280" y="44" text-anchor="middle">H₂ (g) + I₂ (g) ⇌ 2 HI (g)</text>
  <rect class="hdr" x="40"  y="60" width="120" height="30"/>
  <rect class="hdr" x="160" y="60" width="120" height="30"/>
  <rect class="hdr" x="280" y="60" width="120" height="30"/>
  <rect class="hdr" x="400" y="60" width="120" height="30"/>
  <text class="lbl" x="100" y="80" text-anchor="middle"> </text>
  <text class="lbl" x="220" y="80" text-anchor="middle">[H₂]</text>
  <text class="lbl" x="340" y="80" text-anchor="middle">[I₂]</text>
  <text class="lbl" x="460" y="80" text-anchor="middle">[HI]</text>
  <rect class="row" x="40"  y="90"  width="120" height="30"/>
  <rect class="row" x="160" y="90"  width="120" height="30"/>
  <rect class="row" x="280" y="90"  width="120" height="30"/>
  <rect class="row" x="400" y="90"  width="120" height="30"/>
  <text class="tag" x="100" y="110" text-anchor="middle">I · INITIAL</text>
  <text class="ini" x="220" y="110" text-anchor="middle">1.00</text>
  <text class="ini" x="340" y="110" text-anchor="middle">1.00</text>
  <text class="ini" x="460" y="110" text-anchor="middle">0</text>
  <rect class="row" x="40"  y="120" width="120" height="30"/>
  <rect class="row" x="160" y="120" width="120" height="30"/>
  <rect class="row" x="280" y="120" width="120" height="30"/>
  <rect class="row" x="400" y="120" width="120" height="30"/>
  <text class="tag" x="100" y="140" text-anchor="middle">C · CHANGE</text>
  <text class="chg" x="220" y="140" text-anchor="middle">− x</text>
  <text class="chg" x="340" y="140" text-anchor="middle">− x</text>
  <text class="chg" x="460" y="140" text-anchor="middle">+ 2x</text>
  <rect class="row" x="40"  y="150" width="120" height="30"/>
  <rect class="row" x="160" y="150" width="120" height="30"/>
  <rect class="row" x="280" y="150" width="120" height="30"/>
  <rect class="row" x="400" y="150" width="120" height="30"/>
  <text class="tag" x="100" y="170" text-anchor="middle">E · EQUIL</text>
  <text class="eq"  x="220" y="170" text-anchor="middle">1.00 − x</text>
  <text class="eq"  x="340" y="170" text-anchor="middle">1.00 − x</text>
  <text class="eq"  x="460" y="170" text-anchor="middle">2x</text>
  <rect x="24" y="192" width="520" height="36" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="208">EXAMPLE · K = 50</text>
  <text class="ex"  x="40" y="222">Kc = (2x)² / [(1−x)(1−x)] = 50 → 2x/(1−x) = √50 → x ≈ 0.780 → [HI] ≈ 1.56 M</text>
</svg>`;

// Le Chatelier stress/response (Topic 7.3)
const leChatelierSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="lc-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .bar-l { fill: ${ACCENT}; opacity: 0.55; }
      .bar-r { fill: ${ACCENT}; }
      .base  { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .hdr   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .arr   { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; }
    </style>
  </defs>
  <text class="tag" x="24" y="20">LE CHÂTELIER · STRESS →  OPPOSITE SHIFT</text>
  <text class="hdr" x="280" y="44" text-anchor="middle">N₂ + 3 H₂ ⇌ 2 NH₃   (ΔH &lt; 0)</text>
  <g transform="translate(30,60)">
    <text class="tag" x="0" y="0">STRESS</text>
    <text class="tag" x="180" y="0" text-anchor="middle">SHIFT</text>
    <text class="tag" x="360" y="0" text-anchor="end">RESULT</text>
  </g>
  <g transform="translate(30,80)">
    <text class="lbl" x="0" y="14">+ N₂ (add reactant)</text>
    <path class="arr" d="M160 10 L220 10" marker-end="url(#lc-r)"/>
    <text class="ex"  x="360" y="14" text-anchor="end">more NH₃, less H₂</text>
  </g>
  <g transform="translate(30,110)">
    <text class="lbl" x="0" y="14">↑ pressure (compress)</text>
    <path class="arr" d="M160 10 L220 10" marker-end="url(#lc-r)"/>
    <text class="ex"  x="360" y="14" text-anchor="end">toward fewer mol gas (→)</text>
  </g>
  <g transform="translate(30,140)">
    <text class="lbl" x="0" y="14">↑ T (heat exo rxn)</text>
    <path class="arr" d="M220 10 L160 10" marker-end="url(#lc-r)"/>
    <text class="ex"  x="360" y="14" text-anchor="end">reverse shift, K drops</text>
  </g>
  <g transform="translate(30,170)">
    <text class="lbl" x="0" y="14">add inert gas (V const)</text>
    <text class="ex"  x="180" y="14" text-anchor="middle">— no shift —</text>
    <text class="ex"  x="360" y="14" text-anchor="end">partial P unchanged</text>
  </g>
  <rect x="24" y="198" width="520" height="30" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="216">EXAMPLE</text>
  <text class="ex"  x="125" y="216">Haber process · high P, moderate T, remove NH₃ → push toward products</text>
</svg>`;

// Ksp solubility diagram (Topic 7.4)
const kspSVG = `
<svg viewBox="0 0 560 260" width="100%" style="max-width:560px">
  <defs>
    <marker id="ksp-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .beaker { fill: none; stroke: ${LINE}; stroke-width: 1.4; }
      .liquid { fill: ${ACCENT}; opacity: 0.1; }
      .solid  { fill: ${FG}; opacity: 0.6; }
      .ion-p  { fill: ${ACCENT}; }
      .ion-n  { fill: #4ea8ff; }
      .tag    { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl    { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub    { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex     { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .val    { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .arr    { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; }
    </style>
  </defs>
  <text class="tag" x="24" y="20">SOLUBILITY PRODUCT · Ksp</text>
  <path class="beaker" d="M60 50 L60 170 L180 170 L180 50"/>
  <path class="liquid" d="M62 70 L62 168 L178 168 L178 70 Z"/>
  <rect class="solid" x="90" y="150" width="60" height="18" rx="2"/>
  <text class="sub" x="120" y="188" text-anchor="middle">AgCl(s)</text>
  <circle class="ion-p" cx="80"  cy="100" r="4"/>
  <circle class="ion-n" cx="105" cy="115" r="4"/>
  <circle class="ion-p" cx="135" cy="95"  r="4"/>
  <circle class="ion-n" cx="160" cy="120" r="4"/>
  <circle class="ion-p" cx="95"  cy="135" r="4"/>
  <circle class="ion-n" cx="150" cy="135" r="4"/>
  <path class="arr" d="M200 110 L260 110" marker-end="url(#ksp-a)"/>
  <text class="lbl" x="280" y="90"  text-anchor="middle">AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)</text>
  <text class="val" x="280" y="118" text-anchor="middle">Ksp = [Ag⁺][Cl⁻]</text>
  <text class="sub" x="280" y="140" text-anchor="middle">solid omitted from expression</text>
  <g transform="translate(380,60)">
    <text class="tag" x="0" y="0">MOLAR SOLUBILITY s</text>
    <text class="lbl" x="0" y="22">AgCl: s = [Ag⁺] = [Cl⁻]</text>
    <text class="val" x="0" y="44">Ksp = s²</text>
    <text class="lbl" x="0" y="70">CaF₂: s, 2s</text>
    <text class="val" x="0" y="92">Ksp = 4s³</text>
    <text class="lbl" x="0" y="118">Ag₂CrO₄: 2s, s</text>
    <text class="val" x="0" y="140">Ksp = 4s³</text>
  </g>
  <rect x="24" y="220" width="520" height="30" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="238">EXAMPLE</text>
  <text class="ex"  x="130" y="238">Ksp(AgCl) = 1.8 × 10⁻¹⁰ → s = √(1.8×10⁻¹⁰) ≈ 1.3 × 10⁻⁵ M</text>
</svg>`;

// Common-ion effect diagram (Topic 7.5)
const commonIonSVG = `
<svg viewBox="0 0 600 250" width="100%" style="max-width:600px">
  <defs>
    <style>
      .bar-pure   { fill: ${ACCENT}; opacity: 0.9; }
      .bar-common { fill: ${ACCENT}; opacity: 0.3; }
      .ax     { stroke: ${LINE}; stroke-width: 1; }
      .tag    { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl    { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .num    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${ACCENT}; }
      .sub    { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex     { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .hdr    { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
    </style>
  </defs>
  <text class="tag" x="24" y="20">COMMON-ION EFFECT · SOLUBILITY SUPPRESSED</text>
  <text class="hdr" x="280" y="44" text-anchor="middle">AgCl(s) ⇌ Ag⁺ + Cl⁻   ·   Ksp = 1.8 × 10⁻¹⁰</text>
  <line class="ax" x1="60" y1="200" x2="520" y2="200"/>
  <rect class="bar-pure"   x="120" y="70"  width="60" height="130"/>
  <rect class="bar-common" x="320" y="190" width="60" height="10"/>
  <text class="num" x="150" y="62"  text-anchor="middle">1.3 × 10⁻⁵ M</text>
  <text class="num" x="350" y="184" text-anchor="middle">1.8 × 10⁻⁹ M</text>
  <text class="lbl" x="150" y="220" text-anchor="middle">in pure H₂O</text>
  <text class="lbl" x="350" y="220" text-anchor="middle">in 0.10 M NaCl</text>
  <text class="sub" x="150" y="234" text-anchor="middle">s = √Ksp</text>
  <text class="sub" x="350" y="234" text-anchor="middle">s = Ksp / [Cl⁻]</text>
  <text class="tag" x="20" y="140" transform="rotate(-90 20 140)" text-anchor="middle">[Ag⁺] SOLUBILITY</text>
  <g transform="translate(420,70)">
    <text class="tag" x="0" y="0">SHIFT</text>
    <text class="ex"  x="0" y="18">add Cl⁻ (spectator)</text>
    <text class="ex"  x="0" y="34">Q &gt; Ksp momentarily</text>
    <text class="ex"  x="0" y="50">← reverse: AgCl falls out</text>
    <text class="ex"  x="0" y="66">[Ag⁺] drops 7000×</text>
  </g>
</svg>`;

export const UNIT_07: UnitStudyGuide = {
  unitSlug: 'equilibrium',

  topics: [
    // ────────────────── 7.1  Reaction Quotient & Equilibrium Constant ──────────────────
    {
      topicId: '7.1',
      overview:
        'Every reversible reaction settles at a point where forward and reverse rates match. The equilibrium constant describes where that point is; the reaction quotient tells you which way you still have to go.',
      lead: [
        {
          heading: 'Equilibrium is dynamic, not static',
          body:
            'At equilibrium, molecules still react — but products form and break down at the same rate, so the bulk concentrations stop changing. For a general reaction $a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D}$, the equilibrium constant $K_c$ locks in the ratio of product to reactant concentrations at that balance point.',
          svg: qVsKSVG,
          formula: 'K_c \\;=\\; \\dfrac{[\\text{C}]^{c}\\,[\\text{D}]^{d}}{[\\text{A}]^{a}\\,[\\text{B}]^{b}}',
        },
        {
          heading: 'Reaction quotient $Q$ — the "where am I?" number',
          body:
            'The reaction quotient $Q$ has the same algebraic form as $K$ but uses whatever concentrations you have right now, not equilibrium ones. Comparing $Q$ to $K$ tells you which way the reaction will shift: if $Q < K$ there is not enough product yet, so net forward; if $Q > K$ there is too much product, so net reverse; if $Q = K$ you are already at equilibrium.',
          callout:
            'Pure solids and pure liquids are LEFT OUT of both $Q$ and $K$ — their "concentration" does not change. Gases can use partial pressures ($K_p$) or concentrations ($K_c$); pick one and stay consistent.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget lets you dial concentrations of reactants and products and watch $Q$ move toward $K$. Watch the needle, not just the bars.',
        tryThis: [
          'Set $K = 10$. Start with all reactants, no product. Watch $Q$ climb from 0 toward 10.',
          'Dump in excess product so $Q > K$. Watch the reverse shift eat the product back down.',
          'Try a case where $K$ is very small (~$10^{-3}$). See how little product forms.',
        ],
        observe: [
          'At equilibrium, both forward and reverse arrows keep moving — the bars just stop changing net.',
          'Big $K$ → products dominate at equilibrium. Small $K$ → reactants dominate.',
          'Changing only concentrations moves $Q$, not $K$. $K$ only changes with temperature.',
        ],
      },
      notes: [
        {
          heading: '$K_c$ vs $K_p$',
          body:
            'For gas-phase reactions you can write $K$ using molarities ($K_c$) or partial pressures ($K_p$). They relate by $K_p = K_c (RT)^{\\Delta n}$, where $\\Delta n$ is the change in moles of gas (products − reactants). If $\\Delta n = 0$, the two are numerically equal.',
          formula: 'K_p \\;=\\; K_c\\,(RT)^{\\Delta n_{\\text{gas}}}',
        },
        {
          heading: 'Magnitude of $K$ is a story',
          body:
            'A $K$ of $10^{10}$ means the reaction essentially goes to completion — look for negligible reactant at equilibrium. A $K$ of $10^{-10}$ means barely anything happens — almost all starting material remains. A $K$ near 1 means reactants and products coexist in similar amounts.',
          callout:
            '$K$ depends on temperature only. Catalysts, pressure tricks, and concentration changes never change $K$ — they only change how fast you get there or where $Q$ sits.',
        },
        {
          heading: 'Worked example · predicting the shift',
          body:
            'For $\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3$, $K_c = 4.0$ at a given T. A mixture has $[\\text{N}_2] = 2.0$ M, $[\\text{H}_2] = 1.0$ M, $[\\text{NH}_3] = 2.0$ M. Compute $Q = (2.0)^2 / [(2.0)(1.0)^3] = 4.0 / 2.0 = 2.0$. Since $Q = 2.0 < K = 4.0$, the reaction shifts forward: $[\\text{NH}_3]$ rises, $[\\text{N}_2]$ and $[\\text{H}_2]$ fall until $Q$ reaches 4.0.',
          formula: 'Q \\;=\\; \\dfrac{(2.0)^{2}}{(2.0)(1.0)^{3}} \\;=\\; 2.0 \\;<\\; K \\;\\Rightarrow\\; \\text{shift} \\rightarrow',
        },
        {
          heading: 'Worked example · writing $K$ for a heterogeneous equilibrium',
          body:
            'For $\\text{CaCO}_3(\\text{s}) \\rightleftharpoons \\text{CaO}(\\text{s}) + \\text{CO}_2(\\text{g})$, drop the two solids. $K_p = P_{\\text{CO}_2}$ — just the partial pressure of CO₂ at equilibrium. The decomposition proceeds until CO₂ reaches that fixed pressure, regardless of how much solid is present.',
        },
      ],
      mcqs: [
        {
          id: 'q7.1.1',
          question: 'For $\\text{A}(\\text{g}) + \\text{B}(\\text{g}) \\rightleftharpoons \\text{C}(\\text{g})$, $K_c = 5.0$. If $Q = 2.5$, which way does the system shift?',
          choices: ['Net forward (toward products)', 'Net reverse (toward reactants)', 'No shift', 'Cannot determine'],
          correctIndex: 0,
          explanation:
            '$Q < K$ means there is not enough product yet. The net reaction runs forward, producing more C, until $Q$ climbs to 5.0.',
        },
        {
          id: 'q7.1.2',
          question: 'Which change alters the numerical value of $K$?',
          choices: ['Adding more reactant', 'Adding a catalyst', 'Changing temperature', 'Compressing the container'],
          correctIndex: 2,
          explanation:
            '$K$ depends only on temperature. Concentration changes move $Q$ but not $K$; a catalyst speeds both directions equally; compression changes $Q$ for gas-mole-changing reactions but not $K$.',
        },
        {
          id: 'q7.1.3',
          question: 'For $2\\text{NO}_2(\\text{g}) \\rightleftharpoons \\text{N}_2\\text{O}_4(\\text{g})$, what is the correct form of $K_c$?',
          choices: [
            '$[\\text{NO}_2]^2 / [\\text{N}_2\\text{O}_4]$',
            '$[\\text{N}_2\\text{O}_4] / [\\text{NO}_2]^2$',
            '$[\\text{N}_2\\text{O}_4] / [\\text{NO}_2]$',
            '$[\\text{N}_2\\text{O}_4]^2 / [\\text{NO}_2]$',
          ],
          correctIndex: 1,
          explanation:
            'Products over reactants, each raised to its coefficient. N₂O₄ is product (coefficient 1), NO₂ is reactant (coefficient 2).',
        },
        {
          id: 'q7.1.4',
          question: 'For $\\text{CaCO}_3(\\text{s}) \\rightleftharpoons \\text{CaO}(\\text{s}) + \\text{CO}_2(\\text{g})$, $K_p$ equals:',
          choices: [
            '$P_{\\text{CO}_2} \\cdot P_{\\text{CaO}} / P_{\\text{CaCO}_3}$',
            '$P_{\\text{CO}_2}$',
            '$1 / P_{\\text{CO}_2}$',
            '$P_{\\text{CaCO}_3} / P_{\\text{CO}_2}$',
          ],
          correctIndex: 1,
          explanation:
            'Pure solids are omitted from $K$. Only the gas CO₂ appears, so $K_p = P_{\\text{CO}_2}$.',
        },
        {
          id: 'q7.1.5',
          question: 'A reaction has $K = 1 \\times 10^{-8}$. At equilibrium you expect:',
          choices: [
            'Mostly products, barely any reactant left.',
            'Roughly equal amounts of reactants and products.',
            'Mostly reactants, very little product formed.',
            'Nothing — the reaction does not proceed at all.',
          ],
          correctIndex: 2,
          explanation:
            '$K \\ll 1$ means the equilibrium strongly favors reactants. Some product forms, but it is a tiny fraction of the starting material.',
        },
      ],
    },

    // ────────────────── 7.2  ICE Tables ──────────────────
    {
      topicId: '7.2',
      overview:
        'An ICE table is the bookkeeping method for equilibrium problems: Initial, Change, Equilibrium. It turns a word problem into one algebraic equation in one unknown.',
      lead: [
        {
          heading: 'What an ICE table is',
          body:
            'An ICE table is a three-row grid: row I is the initial concentration of every species, row C is the change (in terms of a single variable $x$ scaled by the stoichiometric coefficients), and row E is what is left at equilibrium. Plug row E into the $K$ expression and solve for $x$.',
          svg: iceTableSVG,
        },
        {
          heading: 'Setting up the Change row',
          body:
            'Pick a direction (usually forward if only reactants are present). Give each reactant $-$ coefficient$\\cdot x$ and each product $+$ coefficient$\\cdot x$. If you started with product, check $Q$ first — if $Q > K$ the change row flips signs. The single variable $x$ is the "extent of reaction" in mol/L.',
          formula: '\\text{reactant row: } -a x, -b x \\qquad \\text{product row: } +c x, +d x',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The animation steps through an ICE table live — set the initial concentrations, then watch each row fill in as the system moves to equilibrium.',
        tryThis: [
          'Start with all reactant and no product. Check that the Change row is negative for reactants, positive for products.',
          'Start with all product and no reactant. Watch the Change row flip sign.',
          'Vary the initial concentration and see how $x$ scales.',
        ],
        observe: [
          'The stoichiometric coefficients multiply $x$ — a $2\\text{HI}$ product row shows $+2x$, not $+x$.',
          'At equilibrium, plugging the E row into $K$ must give back exactly your $K$ value.',
          'The "5% rule" fails visibly when $x$ is not small compared to initial concentrations.',
        ],
      },
      notes: [
        {
          heading: 'The 5% approximation',
          body:
            'If $K$ is very small (say $< 10^{-4}$) and the initial reactant is much larger than the expected $x$, you can approximate $(1 - x) \\approx 1$ in the denominator. After solving, check that $x / [\\text{initial}] < 0.05$. If the ratio is larger, redo without the approximation (quadratic formula).',
          callout:
            'Always check the 5% condition AFTER solving. "I assumed $x$ was small" is not a proof — plug it back in and compare.',
        },
        {
          heading: 'Perfect squares and square roots',
          body:
            'When both sides of the $K$ expression are perfect squares (e.g. $K_c = x^2 / (a - x)^2$), take the square root of both sides first. $\\sqrt{K} = x / (a - x)$ is linear in $x$ and solves in one line — no quadratic needed.',
        },
        {
          heading: 'Worked example · H₂ + I₂ ⇌ 2 HI',
          body:
            'Put 1.00 M H₂ and 1.00 M I₂ in a flask; $K_c = 50$ at 448 °C. Change row: $-x, -x, +2x$. Equilibrium: $[H_2] = 1.00 - x$, $[I_2] = 1.00 - x$, $[HI] = 2x$. Expression: $(2x)^2 / [(1-x)(1-x)] = 50$. Take the square root: $2x / (1 - x) = \\sqrt{50} = 7.07$. Solve: $2x = 7.07 - 7.07x \\Rightarrow 9.07x = 7.07 \\Rightarrow x = 0.780$. So $[HI] = 1.56$ M, $[H_2] = [I_2] = 0.22$ M. Check: $(1.56)^2 / (0.22)^2 = 50.3 \\approx K$ ✓.',
          formula: '\\dfrac{(2x)^{2}}{(1-x)^{2}} = 50 \\;\\Rightarrow\\; \\dfrac{2x}{1-x} = \\sqrt{50} \\;\\Rightarrow\\; x = 0.780',
        },
        {
          heading: 'Worked example · small-$K$ approximation',
          body:
            'For $\\text{N}_2\\text{O}_4 \\rightleftharpoons 2\\text{NO}_2$ with $K_c = 4.0 \\times 10^{-3}$ and $[\\text{N}_2\\text{O}_4]_0 = 0.50$ M. ICE: $0.50 - x, 2x$. Expression: $(2x)^2 / (0.50 - x) = 4.0 \\times 10^{-3}$. Because $K$ is tiny, assume $0.50 - x \\approx 0.50$: $4x^2 = 2.0 \\times 10^{-3} \\Rightarrow x = 0.022$ M. Check: $x / 0.50 = 4.4\\% < 5\\%$ ✓. So $[\\text{NO}_2] = 0.045$ M.',
        },
      ],
      mcqs: [
        {
          id: 'q7.2.1',
          question: 'For $2\\text{SO}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{SO}_3$, the Change row for an extent-of-reaction $x$ (forward) is:',
          choices: [
            '$-x, -x, +x$',
            '$-2x, -x, +2x$',
            '$-2x, -2x, +2x$',
            '$+2x, +x, -2x$',
          ],
          correctIndex: 1,
          explanation:
            'Scale each species by its stoichiometric coefficient. SO₂ loses 2x, O₂ loses x, SO₃ gains 2x.',
        },
        {
          id: 'q7.2.2',
          question: 'If $K_c = 0.040$ for $\\text{A} \\rightleftharpoons \\text{B}$ with $[\\text{A}]_0 = 0.20$ M, the small-$x$ approximation gives $x \\approx$:',
          choices: ['0.0080 M', '0.040 M', '0.16 M', '0.20 M'],
          correctIndex: 0,
          explanation:
            '$K = x / (0.20 - x) \\approx x / 0.20$, so $x \\approx 0.040 \\times 0.20 = 0.0080$ M. Check: $0.0080/0.20 = 4\\% < 5\\%$ ✓.',
        },
        {
          id: 'q7.2.3',
          question: 'After solving an ICE problem you get $x = 0.12$ M with an initial reactant of 0.50 M. The 5% approximation is:',
          choices: [
            'Valid — use the simplified answer.',
            'Invalid — the ratio is 24%, too large.',
            'Valid because $K$ was small.',
            'Only valid if $x$ is negative.',
          ],
          correctIndex: 1,
          explanation:
            '$0.12 / 0.50 = 24\\%$, far above the 5% threshold. Redo with the full quadratic.',
        },
        {
          id: 'q7.2.4',
          question: 'For $\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}$ starting with $[\\text{HI}] = 2.0$ M and no H₂ or I₂, the Change row is:',
          choices: [
            '$-x, -x, +2x$',
            '$+x, +x, -2x$',
            '$-2x, -2x, +x$',
            '$0, 0, -2x$',
          ],
          correctIndex: 1,
          explanation:
            'Starting with only product, the reaction runs in reverse. Reactants gain $+x$ each; product loses $-2x$.',
        },
        {
          id: 'q7.2.5',
          question: 'In an ICE calculation you get $x = -0.05$ M. This means:',
          choices: [
            'The math is wrong; $x$ cannot be negative.',
            'The reaction shifts opposite to the direction you assumed.',
            'Equilibrium was already reached at $t = 0$.',
            'The temperature is too low.',
          ],
          correctIndex: 1,
          explanation:
            'A negative $x$ just tells you that you picked the wrong direction — the net shift is reverse relative to your assumption. Magnitude is still correct.',
        },
      ],
    },

    // ────────────────── 7.3  Le Châtelier's Principle ──────────────────
    {
      topicId: '7.3',
      overview:
        'Stress an equilibrium and it shifts to partially undo the stress. Le Châtelier\'s principle turns every "what if I add X" question into a one-line prediction.',
      lead: [
        {
          heading: 'The rule in one sentence',
          body:
            'If you disturb a system at equilibrium — by changing concentration, pressure/volume, or temperature — the reaction shifts in the direction that counteracts the disturbance. Add reactant → shift toward products. Remove product → shift toward products. Heat an exothermic reaction → shift back toward reactants.',
          svg: leChatelierSVG,
        },
        {
          heading: 'Temperature is the only knob that moves $K$',
          body:
            'Concentration and pressure changes move $Q$ away from $K$ and the system returns to the same $K$. Temperature is different: it literally changes $K$. Treat heat as a reactant or product using the sign of $\\Delta H$, then apply Le Châtelier.',
          callout:
            'Exothermic ($\\Delta H < 0$) means heat is a product — raising T shifts REVERSE, so $K$ decreases. Endothermic ($\\Delta H > 0$) means heat is a reactant — raising T shifts FORWARD, so $K$ increases.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget lets you apply stresses (add/remove species, compress, heat) to a reaction at equilibrium and watch the rebound.',
        tryThis: [
          'Start at equilibrium. Double the reactant concentration. Watch $Q$ drop and the shift go forward.',
          'Halve the container volume. For reactions with $\\Delta n_{\\text{gas}} \\ne 0$, note which side is favored.',
          'Add an inert gas at constant volume. See that nothing shifts.',
          'Raise the temperature on an exothermic reaction and watch $K$ fall.',
        ],
        observe: [
          'Compression favors the side with fewer moles of gas; expansion favors the side with more.',
          'Adding inert gas at constant V changes total pressure but not partial pressures — no shift.',
          'A catalyst speeds both directions equally; equilibrium composition does not change.',
        ],
      },
      notes: [
        {
          heading: 'Pressure and volume rules for gases',
          body:
            'If you change the volume of a gas-phase equilibrium, compare moles of gas on each side. Compression (smaller V, higher P) shifts toward the side with FEWER moles. Expansion shifts toward MORE moles. If $\\Delta n_{\\text{gas}} = 0$ (e.g. $\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}$, both sides have 2 mol), volume changes do nothing.',
        },
        {
          heading: 'Catalysts and inert gases',
          body:
            'A catalyst lowers the activation barrier for forward AND reverse, so both rates speed up equally. The system reaches equilibrium faster but lands in the same place. Inert gas at constant V does not collide reactively — partial pressures are unchanged, so no shift.',
          callout:
            'Adding inert gas at constant PRESSURE (not constant V) expands the mixture — partial pressures DO drop, and the reaction shifts toward more gas moles. Read the problem carefully.',
        },
        {
          heading: 'Worked example · Haber process',
          body:
            '$\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3$, $\\Delta H < 0$. To maximize NH₃ yield: (1) high pressure — the forward side has 2 mol gas vs 4 mol on the reactant side, so compression favors product; (2) continuously remove NH₃ — drives the shift forward; (3) moderate temperature — lower T increases $K$ (exothermic), but too low makes the rate too slow. Industrial compromise: ~450 °C, ~200 atm, with an iron catalyst.',
        },
        {
          heading: 'Worked example · shifting an endothermic equilibrium',
          body:
            '$\\text{N}_2\\text{O}_4(\\text{g}) \\rightleftharpoons 2\\text{NO}_2(\\text{g})$, $\\Delta H = +58$ kJ (endothermic, colorless → brown). Heating the sealed tube: shift forward, mixture darkens, $K$ increases. Cooling: reverse shift, mixture lightens, $K$ decreases. Classroom demo uses hot and ice-water baths to flip the color back and forth.',
        },
      ],
      mcqs: [
        {
          id: 'q7.3.1',
          question: 'For $\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3$ at equilibrium, compressing the container (lower V) causes:',
          choices: [
            'Shift forward (fewer moles of gas on product side).',
            'Shift reverse (more moles of gas on reactant side).',
            'No shift — pressure does not affect this equilibrium.',
            'The equilibrium constant to increase.',
          ],
          correctIndex: 0,
          explanation:
            'Reactant side has 1 + 3 = 4 mol gas; product side has 2. Compression shifts toward the smaller-moles side → forward.',
        },
        {
          id: 'q7.3.2',
          question: 'For an exothermic reaction at equilibrium, raising the temperature:',
          choices: [
            'Increases $K$ and shifts forward.',
            'Decreases $K$ and shifts reverse.',
            'Leaves $K$ unchanged.',
            'Shifts forward but $K$ stays the same.',
          ],
          correctIndex: 1,
          explanation:
            'Heat is a product of an exothermic reaction. Adding heat pushes the system backward; $K$ itself drops because $K$ depends on T.',
        },
        {
          id: 'q7.3.3',
          question: 'Adding a catalyst to a system at equilibrium:',
          choices: [
            'Shifts equilibrium toward products.',
            'Shifts equilibrium toward reactants.',
            'Changes $K$ upward.',
            'Does not shift equilibrium — only speeds the approach.',
          ],
          correctIndex: 3,
          explanation:
            'A catalyst lowers the activation barrier in both directions by equal amounts. Same equilibrium composition, faster.',
        },
        {
          id: 'q7.3.4',
          question: 'For $\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightleftharpoons 2\\text{HI}(\\text{g})$, halving the volume:',
          choices: [
            'Shifts forward.',
            'Shifts reverse.',
            'Does not shift — equal moles of gas on both sides.',
            'Changes $K$.',
          ],
          correctIndex: 2,
          explanation:
            '2 mol gas on each side ($\\Delta n_{\\text{gas}} = 0$). Volume changes do not favor either direction.',
        },
        {
          id: 'q7.3.5',
          question: 'Adding argon (inert) at CONSTANT VOLUME to $\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3$:',
          choices: [
            'Shifts forward (more total pressure).',
            'Shifts reverse.',
            'Does not shift — partial pressures of N₂, H₂, NH₃ unchanged.',
            'Increases $K$.',
          ],
          correctIndex: 2,
          explanation:
            'At constant V, adding inert gas raises total P but does not change the partial pressure or concentration of any reacting species. $Q$ stays at $K$.',
        },
      ],
    },

    // ────────────────── 7.4  Solubility Equilibria ──────────────────
    {
      topicId: '7.4',
      overview:
        'An "insoluble" salt is really just barely soluble. $K_{sp}$ — the solubility product — quantifies exactly how much dissolves before equilibrium is reached.',
      lead: [
        {
          heading: 'What $K_{sp}$ is',
          body:
            'When a sparingly soluble ionic compound sits in water, a tiny fraction dissolves into ions. The solid and dissolved ions reach an equilibrium: $\\text{AgCl}(\\text{s}) \\rightleftharpoons \\text{Ag}^{+}(\\text{aq}) + \\text{Cl}^{-}(\\text{aq})$. The solubility product $K_{sp}$ is the equilibrium constant for that dissolution — solid is omitted, so $K_{sp} = [\\text{Ag}^{+}][\\text{Cl}^{-}]$.',
          svg: kspSVG,
          formula: 'K_{sp} \\;=\\; [\\text{M}^{n+}]^{a}\\,[\\text{X}^{m-}]^{b}',
        },
        {
          heading: 'Molar solubility $s$',
          body:
            'Molar solubility $s$ is the moles of salt that dissolve per liter of solution at equilibrium. For a 1:1 salt like AgCl, $[\\text{Ag}^{+}] = [\\text{Cl}^{-}] = s$, so $K_{sp} = s^{2}$. For a 1:2 salt like $\\text{CaF}_2$, $[\\text{Ca}^{2+}] = s$ and $[\\text{F}^{-}] = 2s$, so $K_{sp} = s(2s)^{2} = 4s^{3}$. The stoichiometry always matters.',
          callout:
            'Do NOT confuse $K_{sp}$ with $s$. Two salts with the same $K_{sp}$ can have different $s$ if their stoichiometries differ. Always rebuild the expression from scratch for each salt.',
        },
      ],
      notes: [
        {
          heading: 'Predicting whether a precipitate forms — $Q$ vs $K_{sp}$',
          body:
            'Mix two solutions that might produce an insoluble salt. Compute $Q$ from the ion concentrations after mixing (use the DILUTED values). If $Q > K_{sp}$, a precipitate forms until $[\\text{ions}]$ drop back to satisfy $K_{sp}$. If $Q < K_{sp}$, no precipitate. If $Q = K_{sp}$, the solution is saturated.',
        },
        {
          heading: 'Effect of pH on solubility',
          body:
            'Salts of weak-acid anions (hydroxides, carbonates, sulfides) dissolve more in acidic solution: the $\\text{H}^{+}$ ties up the anion ($\\text{F}^{-} + \\text{H}^{+} \\to \\text{HF}$), pulling the dissolution equilibrium forward. Salts of strong-acid anions (nitrates, chlorides — except AgCl/PbCl₂/Hg₂Cl₂) are pH-indifferent.',
          callout:
            'CaCO₃ dissolves in acidic rain but NaCl does not — the carbonate gets protonated, the chloride does not.',
        },
        {
          heading: 'Worked example · $K_{sp}$ → molar solubility',
          body:
            '$K_{sp}(\\text{CaF}_2) = 3.2 \\times 10^{-11}$. Write ICE: $[\\text{Ca}^{2+}] = s$, $[\\text{F}^{-}] = 2s$. Substitute: $K_{sp} = s(2s)^{2} = 4s^{3}$. Solve: $s^{3} = 3.2 \\times 10^{-11} / 4 = 8.0 \\times 10^{-12} \\Rightarrow s = 2.0 \\times 10^{-4}$ M. So 0.00020 mol CaF₂ dissolves per liter.',
          formula: 'K_{sp} = 4s^{3} \\;\\Rightarrow\\; s = \\sqrt[3]{K_{sp}/4} = 2.0 \\times 10^{-4}\\,\\text{M}',
        },
        {
          heading: 'Worked example · will it precipitate?',
          body:
            'Mix 50.0 mL of 0.010 M $\\text{Pb(NO}_3)_2$ with 50.0 mL of 0.0010 M KI. After mixing (total 100 mL): $[\\text{Pb}^{2+}] = 0.0050$ M, $[\\text{I}^{-}] = 0.00050$ M. $Q = (0.0050)(0.00050)^{2} = 1.25 \\times 10^{-9}$. Compare to $K_{sp}(\\text{PbI}_2) = 7.1 \\times 10^{-9}$. Since $Q < K_{sp}$, no precipitate forms — the solution is undersaturated.',
        },
      ],
      mcqs: [
        {
          id: 'q7.4.1',
          question: 'The $K_{sp}$ expression for $\\text{Mg(OH)}_2(\\text{s}) \\rightleftharpoons \\text{Mg}^{2+} + 2\\text{OH}^{-}$ is:',
          choices: [
            '$[\\text{Mg}^{2+}][\\text{OH}^{-}]$',
            '$[\\text{Mg}^{2+}][\\text{OH}^{-}]^{2}$',
            '$[\\text{Mg}^{2+}]^{2}[\\text{OH}^{-}]$',
            '$[\\text{Mg(OH)}_2]/[\\text{Mg}^{2+}][\\text{OH}^{-}]^{2}$',
          ],
          correctIndex: 1,
          explanation:
            'Solid is omitted. Each ion is raised to its coefficient: $[\\text{Mg}^{2+}]^1 [\\text{OH}^{-}]^2$.',
        },
        {
          id: 'q7.4.2',
          question: 'For a salt $\\text{MX}_2$, $K_{sp}$ in terms of molar solubility $s$ is:',
          choices: ['$s^2$', '$s^3$', '$4s^3$', '$27s^4$'],
          correctIndex: 2,
          explanation:
            '$[\\text{M}] = s$, $[\\text{X}] = 2s$. $K_{sp} = s(2s)^2 = 4s^3$.',
        },
        {
          id: 'q7.4.3',
          question: '$K_{sp}(\\text{AgBr}) = 5.0 \\times 10^{-13}$. Its molar solubility in pure water is closest to:',
          choices: ['$5.0 \\times 10^{-13}$ M', '$7.1 \\times 10^{-7}$ M', '$2.5 \\times 10^{-6}$ M', '$5.0 \\times 10^{-7}$ M'],
          correctIndex: 1,
          explanation:
            '1:1 salt → $K_{sp} = s^2$ → $s = \\sqrt{5.0 \\times 10^{-13}} \\approx 7.1 \\times 10^{-7}$ M.',
        },
        {
          id: 'q7.4.4',
          question: 'Two solutions are mixed and $Q > K_{sp}$. What happens?',
          choices: [
            'The solution stays unsaturated.',
            'A precipitate forms until $Q$ falls to $K_{sp}$.',
            'The $K_{sp}$ increases.',
            'Nothing observable occurs.',
          ],
          correctIndex: 1,
          explanation:
            '$Q > K_{sp}$ means too many ions in solution. Excess ions combine into solid until the remaining $[\\text{ions}]$ satisfy $K_{sp}$.',
        },
        {
          id: 'q7.4.5',
          question: 'Which salt becomes MORE soluble when the solution is acidified?',
          choices: ['NaCl', 'KNO₃', 'CaCO₃', 'NaBr'],
          correctIndex: 2,
          explanation:
            'Carbonate ($\\text{CO}_3^{2-}$) is a weak-acid anion. $\\text{H}^{+}$ converts it to $\\text{HCO}_3^{-}$ and $\\text{H}_2\\text{CO}_3$, draining the ion pool and pulling more CaCO₃ into solution.',
        },
      ],
    },

    // ────────────────── 7.5  Common-Ion Effect ──────────────────
    {
      topicId: '7.5',
      overview:
        'Adding an ion that already appears in the equilibrium suppresses the original dissolution — the common-ion effect. It\'s just Le Châtelier on a solubility equilibrium, and it powers buffers.',
      lead: [
        {
          heading: 'What the common-ion effect is',
          body:
            'A common ion is an ion shared between a sparingly soluble salt and another soluble source. If AgCl is sitting in water and you add NaCl, the chloride from NaCl pushes the $\\text{AgCl} \\rightleftharpoons \\text{Ag}^{+} + \\text{Cl}^{-}$ equilibrium backward — more AgCl stays solid, $[\\text{Ag}^{+}]$ drops. $K_{sp}$ itself has not changed; the equilibrium has just shifted to satisfy it with the new $[\\text{Cl}^{-}]$.',
          svg: commonIonSVG,
        },
        {
          heading: 'Buffers are the canonical example',
          body:
            'A buffer is a weak acid plus its conjugate base (or weak base plus its conjugate acid). The conjugate base supplies a common ion ($\\text{A}^{-}$) that suppresses the weak acid\'s dissociation $\\text{HA} \\rightleftharpoons \\text{H}^{+} + \\text{A}^{-}$. Same machinery — common ion pushing an equilibrium backward — applied to acid-base chemistry instead of salt solubility.',
          callout:
            'Common-ion problems are solved with an ICE table where row I already contains the "extra" common-ion concentration from the other salt or acid. Everything else is identical to §7.2.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The buffer widget lets you dial the ratio of weak acid to conjugate base and watch how small additions of strong acid or base barely move the pH.',
        tryThis: [
          'Set up a 1:1 acid/conjugate base ratio. Note the starting pH ≈ $pK_a$.',
          'Add a small amount of strong acid. The conjugate base mops up the $\\text{H}^{+}$.',
          'Add a small amount of strong base. The weak acid donates its $\\text{H}^{+}$.',
          'Stretch the ratio to 10:1 or 1:10 and watch pH drift by ±1 unit.',
        ],
        observe: [
          'Inside the buffer region (roughly $pK_a \\pm 1$), large additions of strong acid or base cause tiny pH swings.',
          'Outside that region, buffering capacity collapses quickly.',
          'The Henderson–Hasselbalch line: $\\text{pH} = pK_a + \\log([\\text{A}^{-}]/[\\text{HA}])$.',
        ],
      },
      notes: [
        {
          heading: 'Common-ion in solubility: fast estimate',
          body:
            'For AgCl in 0.10 M NaCl, assume the added $[\\text{Cl}^{-}]$ is so much larger than what AgCl contributes that we can treat $[\\text{Cl}^{-}] \\approx 0.10$ M. Then $[\\text{Ag}^{+}] = K_{sp} / 0.10 = 1.8 \\times 10^{-9}$ M — compared to $1.3 \\times 10^{-5}$ M in pure water, solubility drops by a factor of ~7000.',
          formula: 's_{\\text{new}} \\;=\\; \\dfrac{K_{sp}}{[\\text{common ion}]}',
        },
        {
          heading: 'Henderson–Hasselbalch for buffers',
          body:
            'For a weak-acid buffer with acid HA and conjugate base $\\text{A}^{-}$, the pH comes straight out of the $K_a$ expression: $\\text{pH} = pK_a + \\log\\!\\big([\\text{A}^{-}]/[\\text{HA}]\\big)$. When the ratio is 1:1, pH = $pK_a$. Every factor of 10 change in the ratio moves pH by 1 unit.',
          formula: '\\text{pH} \\;=\\; pK_a + \\log\\!\\dfrac{[\\text{A}^{-}]}{[\\text{HA}]}',
        },
        {
          heading: 'Worked example · solubility of PbI₂ in 0.10 M NaI',
          body:
            '$K_{sp}(\\text{PbI}_2) = 7.1 \\times 10^{-9}$. ICE: $[\\text{Pb}^{2+}] = s$, $[\\text{I}^{-}] = 0.10 + 2s \\approx 0.10$. Then $K_{sp} = s(0.10)^{2} \\Rightarrow s = 7.1 \\times 10^{-9} / 0.010 = 7.1 \\times 10^{-7}$ M. In pure water, $s = \\sqrt[3]{K_{sp}/4} \\approx 1.2 \\times 10^{-3}$ M — the common ion reduces solubility by over 1000×.',
          formula: 's \\;=\\; \\dfrac{K_{sp}}{[\\text{I}^{-}]^{2}} \\;=\\; \\dfrac{7.1 \\times 10^{-9}}{(0.10)^{2}} \\;=\\; 7.1 \\times 10^{-7}\\,\\text{M}',
        },
        {
          heading: 'Worked example · buffer pH',
          body:
            'A buffer is 0.20 M acetic acid ($pK_a = 4.74$) and 0.40 M sodium acetate. The acetate is the conjugate base and provides the common ion. Plug into Henderson–Hasselbalch: $\\text{pH} = 4.74 + \\log(0.40 / 0.20) = 4.74 + \\log 2 = 4.74 + 0.30 = 5.04$. Double the acetate → add 0.30 to the pH.',
        },
      ],
      mcqs: [
        {
          id: 'q7.5.1',
          question: 'The molar solubility of AgCl in 0.10 M NaCl, compared to pure water:',
          choices: [
            'Is greater (Cl⁻ helps dissolve more AgCl).',
            'Is the same ($K_{sp}$ does not change).',
            'Is smaller (common-ion effect suppresses dissolution).',
            'Goes to zero.',
          ],
          correctIndex: 2,
          explanation:
            'Added Cl⁻ is a common ion — it pushes the $\\text{AgCl} \\rightleftharpoons \\text{Ag}^{+} + \\text{Cl}^{-}$ equilibrium backward. Less AgCl dissolves. $K_{sp}$ itself is unchanged.',
        },
        {
          id: 'q7.5.2',
          question: 'A buffer contains 0.10 M HA and 0.10 M $\\text{A}^{-}$ where $pK_a = 5.00$. The pH is:',
          choices: ['4.00', '5.00', '6.00', '7.00'],
          correctIndex: 1,
          explanation:
            '$\\text{pH} = pK_a + \\log(1) = pK_a = 5.00$. Equal acid and conjugate base → pH equals $pK_a$.',
        },
        {
          id: 'q7.5.3',
          question: 'For $K_{sp}(\\text{CaF}_2) = 3.2 \\times 10^{-11}$, the molar solubility in 0.10 M NaF is approximately:',
          choices: ['$2.0 \\times 10^{-4}$ M', '$3.2 \\times 10^{-9}$ M', '$3.2 \\times 10^{-11}$ M', '$5.7 \\times 10^{-6}$ M'],
          correctIndex: 1,
          explanation:
            '$[\\text{F}^{-}] \\approx 0.10$ M from NaF. $s = K_{sp} / [\\text{F}^{-}]^{2} = 3.2 \\times 10^{-11} / 0.010 = 3.2 \\times 10^{-9}$ M.',
        },
        {
          id: 'q7.5.4',
          question: 'A buffer has $[\\text{HA}] = 0.10$ M, $[\\text{A}^{-}] = 1.0$ M, $pK_a = 4.0$. The pH is:',
          choices: ['3.0', '4.0', '5.0', '6.0'],
          correctIndex: 2,
          explanation:
            '$\\text{pH} = 4.0 + \\log(1.0/0.10) = 4.0 + 1 = 5.0$. Ten-fold more base than acid → pH sits one unit above $pK_a$.',
        },
        {
          id: 'q7.5.5',
          question: 'Adding $\\text{CH}_3\\text{COONa}$ (sodium acetate) to a solution of acetic acid will:',
          choices: [
            'Increase the $\\text{H}^{+}$ concentration.',
            'Decrease the $\\text{H}^{+}$ concentration (common-ion effect).',
            'Leave the pH unchanged.',
            'Raise the $K_a$ of acetic acid.',
          ],
          correctIndex: 1,
          explanation:
            'Acetate is the conjugate base of acetic acid. Adding it pushes $\\text{HA} \\rightleftharpoons \\text{H}^{+} + \\text{A}^{-}$ backward, lowering $[\\text{H}^{+}]$ and raising pH.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  unitTest: [
    {
      id: 'ut7.1',
      question: 'For $\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}$, $K_c = 50$. At a moment when $[\\text{H}_2] = 0.50$, $[\\text{I}_2] = 0.50$, $[\\text{HI}] = 5.0$ M, the reaction shifts:',
      choices: ['Forward', 'Reverse', 'Not at all — already at equilibrium', 'Cannot determine'],
      correctIndex: 1,
      explanation:
        '$Q = (5.0)^2 / [(0.50)(0.50)] = 25 / 0.25 = 100$. $Q > K$ (100 > 50) → reverse shift to reduce product.',
    },
    {
      id: 'ut7.2',
      question: 'Which alters $K$?',
      choices: ['Adding reactant', 'Changing temperature', 'Adding catalyst', 'Compressing at constant T'],
      correctIndex: 1,
      explanation:
        'Only temperature changes $K$. The other stresses move $Q$ and cause the system to re-equilibrate at the same $K$.',
    },
    {
      id: 'ut7.3',
      question: 'For $2\\text{NO}_2 \\rightleftharpoons \\text{N}_2\\text{O}_4$, $K_c$ is:',
      choices: [
        '$[\\text{NO}_2]^2 / [\\text{N}_2\\text{O}_4]$',
        '$[\\text{N}_2\\text{O}_4] / [\\text{NO}_2]^2$',
        '$[\\text{N}_2\\text{O}_4] / [\\text{NO}_2]$',
        '$[\\text{NO}_2] / [\\text{N}_2\\text{O}_4]^2$',
      ],
      correctIndex: 1,
      explanation:
        'Products over reactants, coefficients as exponents. $K_c = [\\text{N}_2\\text{O}_4] / [\\text{NO}_2]^2$.',
    },
    {
      id: 'ut7.4',
      question: 'Starting with 2.0 M A and no B, $\\text{A} \\rightleftharpoons \\text{B}$ reaches equilibrium with $[\\text{B}] = 0.40$ M. $K_c$ is:',
      choices: ['0.20', '0.25', '4.0', '5.0'],
      correctIndex: 1,
      explanation:
        '$[\\text{A}]_{eq} = 2.0 - 0.40 = 1.60$ M. $K_c = 0.40 / 1.60 = 0.25$.',
    },
    {
      id: 'ut7.5',
      question: 'For $\\text{N}_2\\text{O}_4 \\rightleftharpoons 2\\text{NO}_2$, $K_c = 4.0 \\times 10^{-3}$; start at $[\\text{N}_2\\text{O}_4]_0 = 0.50$ M. Using the 5% approximation, $[\\text{NO}_2]_{eq}$ is approximately:',
      choices: ['$4.0 \\times 10^{-3}$ M', '$0.022$ M', '$0.045$ M', '$0.10$ M'],
      correctIndex: 2,
      explanation:
        '$4x^2 / 0.50 = 4.0 \\times 10^{-3} \\Rightarrow x^2 = 5.0 \\times 10^{-4} \\Rightarrow x = 0.022$ M. $[\\text{NO}_2] = 2x = 0.045$ M.',
    },
    {
      id: 'ut7.6',
      question: 'The 5% approximation fails when:',
      choices: [
        '$K$ is very small.',
        '$K$ is large enough that $x$ is not tiny compared to the initial concentration.',
        'The initial concentration is very large.',
        'The reaction has only one product.',
      ],
      correctIndex: 1,
      explanation:
        'The approximation relies on $x \\ll [\\text{initial}]$. If $x / [\\text{initial}] > 5\\%$, the approximation breaks down — do the quadratic.',
    },
    {
      id: 'ut7.7',
      question: 'For $2\\text{SO}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{SO}_3$ (exothermic) at equilibrium, which raises the yield of SO₃?',
      choices: [
        'Raise temperature.',
        'Add inert gas at constant volume.',
        'Remove SO₃ as it forms.',
        'Add a catalyst.',
      ],
      correctIndex: 2,
      explanation:
        'Removing product drops $Q$ below $K$, driving the reaction forward to produce more SO₃. Higher T shifts reverse (exothermic); inert gas and catalyst do not shift the equilibrium.',
    },
    {
      id: 'ut7.8',
      question: 'For $\\text{PCl}_5(\\text{g}) \\rightleftharpoons \\text{PCl}_3(\\text{g}) + \\text{Cl}_2(\\text{g})$, doubling the container volume:',
      choices: [
        'Shifts forward (more moles of gas on product side).',
        'Shifts reverse.',
        'Does not shift.',
        'Changes $K$.',
      ],
      correctIndex: 0,
      explanation:
        'Reactant: 1 mol gas; product: 2 mol gas. Expansion favors the side with MORE gas moles → forward.',
    },
    {
      id: 'ut7.9',
      question: 'For an endothermic reaction, increasing temperature:',
      choices: [
        'Decreases $K$ and shifts reverse.',
        'Increases $K$ and shifts forward.',
        'Does not affect $K$.',
        'Shifts reverse but $K$ stays the same.',
      ],
      correctIndex: 1,
      explanation:
        'Heat is a reactant for endothermic reactions. Adding heat pushes the system forward; $K$ grows with T.',
    },
    {
      id: 'ut7.10',
      question: 'For $\\text{Ag}_2\\text{CrO}_4$, $K_{sp}$ in terms of molar solubility $s$ is:',
      choices: ['$s^2$', '$s^3$', '$4s^3$', '$27s^4$'],
      correctIndex: 2,
      explanation:
        'Dissolves to $2s\\,[\\text{Ag}^+]$ and $s\\,[\\text{CrO}_4^{2-}]$. $K_{sp} = (2s)^2 (s) = 4s^3$.',
    },
    {
      id: 'ut7.11',
      question: '$K_{sp}(\\text{BaSO}_4) = 1.1 \\times 10^{-10}$. Molar solubility in pure water is closest to:',
      choices: ['$1.1 \\times 10^{-10}$ M', '$1.0 \\times 10^{-5}$ M', '$3.3 \\times 10^{-4}$ M', '$1.0 \\times 10^{-3}$ M'],
      correctIndex: 1,
      explanation:
        '1:1 salt → $s = \\sqrt{K_{sp}} = \\sqrt{1.1 \\times 10^{-10}} \\approx 1.0 \\times 10^{-5}$ M.',
    },
    {
      id: 'ut7.12',
      question: 'Mixing gives $[\\text{Ag}^{+}] = 1 \\times 10^{-4}$ M and $[\\text{Cl}^{-}] = 1 \\times 10^{-4}$ M. $K_{sp}(\\text{AgCl}) = 1.8 \\times 10^{-10}$. Does AgCl precipitate?',
      choices: [
        'No — $Q < K_{sp}$.',
        'Yes — $Q > K_{sp}$.',
        'Exactly at saturation — $Q = K_{sp}$.',
        'Depends on pH.',
      ],
      correctIndex: 1,
      explanation:
        '$Q = (10^{-4})(10^{-4}) = 10^{-8}$, which is larger than $K_{sp} = 1.8 \\times 10^{-10}$. Precipitate forms.',
    },
    {
      id: 'ut7.13',
      question: 'Adding 0.10 M NaF to a saturated solution of CaF₂:',
      choices: [
        'Dissolves more CaF₂.',
        'Precipitates some CaF₂ (common-ion effect).',
        'Does not change the solubility.',
        'Raises $K_{sp}$.',
      ],
      correctIndex: 1,
      explanation:
        'Added F⁻ is a common ion. $Q$ becomes greater than $K_{sp}$, and CaF₂ precipitates until $Q$ returns to $K_{sp}$.',
    },
    {
      id: 'ut7.14',
      question: 'An acetic acid / acetate buffer has $[\\text{HA}] = [\\text{A}^{-}] = 0.15$ M, $pK_a = 4.74$. pH is:',
      choices: ['3.74', '4.74', '5.74', '7.00'],
      correctIndex: 1,
      explanation:
        'Henderson–Hasselbalch: $\\text{pH} = pK_a + \\log(1) = 4.74$. Equal acid and conjugate base → pH equals $pK_a$.',
    },
    {
      id: 'ut7.15',
      question: 'Which scenario best demonstrates the common-ion effect?',
      choices: [
        'Heating an endothermic reaction.',
        'Dissolving AgCl in 0.1 M NaCl rather than pure water.',
        'Adding argon gas at constant volume.',
        'Using a platinum catalyst.',
      ],
      correctIndex: 1,
      explanation:
        'Cl⁻ from NaCl is a common ion with the AgCl equilibrium. Its presence suppresses AgCl dissolution — the textbook case of the common-ion effect.',
    },
  ],
};
