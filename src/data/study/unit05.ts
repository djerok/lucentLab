import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 5 · Kinetics  (AP CED weighting: 7–9%)
//
// Kinetics is about the SPEED and MECHANISM of reactions — how fast
// things change, what path they take, and what knobs (temperature,
// concentration, catalysts) move the needle. Thermodynamics says
// whether a reaction WILL go; kinetics says HOW FAST and BY WHAT PATH.
// ──────────────────────────────────────────────────────────────────────

// Shared theme palette
const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#fbbf24'; // Unit 5 hue — amber

// Rate-of-reaction diagram (Topic 5.1): concentration vs time with tangent
const rateVsTimeSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="rv-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .grid  { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.4; }
      .reac  { fill: none; stroke: #ff5b3c; stroke-width: 2; }
      .prod  { fill: none; stroke: ${ACCENT}; stroke-width: 2; }
      .tan   { stroke: ${ACCENT}; stroke-width: 1.4; stroke-dasharray: 4 3; fill: none; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .dot   { fill: ${ACCENT}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">CONCENTRATION vs TIME</text>
  <line class="grid" x1="60" y1="50"  x2="520" y2="50"/>
  <line class="grid" x1="60" y1="100" x2="520" y2="100"/>
  <line class="grid" x1="60" y1="150" x2="520" y2="150"/>
  <line class="ax"   x1="60" y1="180" x2="520" y2="180"/>
  <line class="ax"   x1="60" y1="40"  x2="60"  y2="180"/>
  <path class="reac" d="M60 50 Q 180 80, 300 130 T 520 170"/>
  <path class="prod" d="M60 180 Q 180 150, 300 110 T 520 70"/>
  <path class="tan"  d="M60 50 L 220 118"/>
  <circle class="dot" cx="60" cy="50" r="3.5"/>
  <text class="lbl"  x="490" y="64"  text-anchor="end">[products]</text>
  <text class="lbl"  x="490" y="176" text-anchor="end">[reactants]</text>
  <text class="ex"   x="230" y="122" text-anchor="start">initial slope = rate₀</text>
  <text class="tag"  x="290" y="200" text-anchor="middle">time →</text>
  <text class="tag"  x="20"  y="115" transform="rotate(-90 20 115)" text-anchor="middle">CONCENTRATION</text>
</svg>`;

// Rate-law exponents (Topic 5.2): initial-rate comparison table
const rateLawSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <style>
      .box  { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .head { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.14em; fill: ${FAINT}; }
      .col  { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .num  { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${FG}; }
      .acc  { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .sub  { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">INITIAL-RATE TABLE · A + B → P</text>
  <rect class="head" x="40"  y="34" width="80"  height="28"/>
  <rect class="head" x="120" y="34" width="120" height="28"/>
  <rect class="head" x="240" y="34" width="120" height="28"/>
  <rect class="head" x="360" y="34" width="160" height="28"/>
  <text class="tag" x="80"  y="52" text-anchor="middle">TRIAL</text>
  <text class="tag" x="180" y="52" text-anchor="middle">[A]₀ (M)</text>
  <text class="tag" x="300" y="52" text-anchor="middle">[B]₀ (M)</text>
  <text class="tag" x="440" y="52" text-anchor="middle">rate (M/s)</text>
  <rect class="box" x="40"  y="62" width="80"  height="26"/>
  <rect class="box" x="120" y="62" width="120" height="26"/>
  <rect class="box" x="240" y="62" width="120" height="26"/>
  <rect class="box" x="360" y="62" width="160" height="26"/>
  <text class="col" x="80"  y="80" text-anchor="middle">1</text>
  <text class="num" x="180" y="80" text-anchor="middle">0.10</text>
  <text class="num" x="300" y="80" text-anchor="middle">0.10</text>
  <text class="num" x="440" y="80" text-anchor="middle">2.0 × 10⁻³</text>
  <rect class="box" x="40"  y="88" width="80"  height="26"/>
  <rect class="box" x="120" y="88" width="120" height="26"/>
  <rect class="box" x="240" y="88" width="120" height="26"/>
  <rect class="box" x="360" y="88" width="160" height="26"/>
  <text class="col" x="80"  y="106" text-anchor="middle">2</text>
  <text class="acc" x="180" y="106" text-anchor="middle">0.20</text>
  <text class="num" x="300" y="106" text-anchor="middle">0.10</text>
  <text class="acc" x="440" y="106" text-anchor="middle">8.0 × 10⁻³</text>
  <rect class="box" x="40"  y="114" width="80"  height="26"/>
  <rect class="box" x="120" y="114" width="120" height="26"/>
  <rect class="box" x="240" y="114" width="120" height="26"/>
  <rect class="box" x="360" y="114" width="160" height="26"/>
  <text class="col" x="80"  y="132" text-anchor="middle">3</text>
  <text class="num" x="180" y="132" text-anchor="middle">0.10</text>
  <text class="acc" x="300" y="132" text-anchor="middle">0.20</text>
  <text class="acc" x="440" y="132" text-anchor="middle">2.0 × 10⁻³</text>
  <text class="tag" x="40"  y="166">1 → 2 · [A] × 2, rate × 4</text>
  <text class="acc" x="260" y="166">order in A = 2</text>
  <text class="tag" x="40"  y="184">1 → 3 · [B] × 2, rate × 1</text>
  <text class="acc" x="260" y="184">order in B = 0</text>
  <text class="sub" x="40" y="206">rate = k [A]² [B]⁰ = k [A]²</text>
</svg>`;

// Energy profile diagram (Topic 5.3)
const energyProfileSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="ep-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .curve { fill: none; stroke: ${ACCENT}; stroke-width: 2.2; }
      .dash  { stroke: ${FAINT}; stroke-width: 0.8; stroke-dasharray: 2 3; fill: none; }
      .arr   { stroke: ${ACCENT}; stroke-width: 1.2; fill: none; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .acc   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .sub   { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">POTENTIAL ENERGY vs REACTION PROGRESS</text>
  <line class="ax" x1="40" y1="200" x2="540" y2="200"/>
  <line class="ax" x1="40" y1="30"  x2="40"  y2="200"/>
  <path class="curve" d="M40 150 Q 120 148, 180 140 Q 260 60, 340 140 Q 420 170, 540 175"/>
  <line class="dash" x1="40"  y1="150" x2="540" y2="150"/>
  <line class="dash" x1="40"  y1="175" x2="540" y2="175"/>
  <line class="dash" x1="260" y1="60"  x2="540" y2="60"/>
  <line class="dash" x1="260" y1="60"  x2="260" y2="200"/>
  <path class="arr" d="M100 150 L100 60" marker-end="url(#ep-arr)"/>
  <text class="acc" x="106" y="108">Ea (forward)</text>
  <path class="arr" d="M460 175 L460 60" marker-end="url(#ep-arr)"/>
  <text class="acc" x="466" y="125">Ea (reverse)</text>
  <path class="arr" d="M510 150 L510 175" marker-end="url(#ep-arr)"/>
  <text class="acc" x="516" y="168">ΔH</text>
  <text class="lbl" x="55"  y="144">reactants</text>
  <text class="lbl" x="470" y="170">products</text>
  <text class="lbl" x="260" y="54" text-anchor="middle">transition state ‡</text>
  <text class="tag" x="290" y="222" text-anchor="middle">reaction coordinate →</text>
  <text class="sub" x="540" y="216" text-anchor="end">exothermic · ΔH &lt; 0</text>
</svg>`;

// Collision theory diagram (Topic 5.4)
const collisionSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="co-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .ptl  { fill: #ff5b3c; }
      .ptr  { fill: ${ACCENT}; }
      .sym  { font-family: Fraunces, serif; font-size: 14px; fill: #1a1611; font-weight: 700; }
      .bad  { stroke: #ff5b3c; stroke-width: 1.5; fill: none; stroke-dasharray: 3 3; opacity: 0.7; }
      .good { stroke: ${ACCENT}; stroke-width: 1.8; fill: none; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .acc  { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .xx   { font-family: Fraunces, serif; font-size: 16px; fill: #ff5b3c; font-weight: 700; }
      .ok   { font-family: Fraunces, serif; font-size: 16px; fill: ${ACCENT}; font-weight: 700; }
      .sub  { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">INEFFECTIVE · WRONG ORIENTATION</text>
  <circle class="ptl" cx="80"  cy="80" r="18"/>
  <text class="sym" x="80"  y="85" text-anchor="middle">A</text>
  <circle class="ptr" cx="180" cy="80" r="14"/>
  <text class="sym" x="180" y="85" text-anchor="middle">B</text>
  <circle class="ptr" cx="210" cy="80" r="14"/>
  <text class="sym" x="210" y="85" text-anchor="middle">B</text>
  <path class="bad" d="M100 80 L160 80" marker-end="url(#co-arr)"/>
  <text class="xx"  x="230" y="86">✗</text>
  <text class="sub" x="145" y="120" text-anchor="middle">A hits the back of B₂ — no bond forms</text>
  <text class="tag" x="290" y="22">EFFECTIVE · GOOD GEOMETRY + ENERGY</text>
  <circle class="ptl" cx="350" cy="80" r="18"/>
  <text class="sym" x="350" y="85" text-anchor="middle">A</text>
  <circle class="ptr" cx="460" cy="70" r="14"/>
  <text class="sym" x="460" y="75" text-anchor="middle">B</text>
  <circle class="ptr" cx="460" cy="96" r="14"/>
  <text class="sym" x="460" y="101" text-anchor="middle">B</text>
  <path class="good" d="M370 80 L440 80" marker-end="url(#co-arr)"/>
  <text class="ok"  x="500" y="86">✓</text>
  <text class="sub" x="425" y="130" text-anchor="middle">A strikes the B–B axis with E ≥ Ea</text>
  <rect x="24" y="150" width="520" height="54" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="170">COLLISION RATE</text>
  <text class="acc" x="40" y="190">rate ∝ (collision frequency) × (fraction oriented) × (fraction with E ≥ Ea)</text>
</svg>`;

// Catalyst diagram (Topic 5.5)
const catalystSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="ct-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .un    { fill: none; stroke: #ff5b3c; stroke-width: 2; }
      .cat   { fill: none; stroke: ${ACCENT}; stroke-width: 2; stroke-dasharray: 5 3; }
      .dash  { stroke: ${FAINT}; stroke-width: 0.8; stroke-dasharray: 2 3; fill: none; }
      .arr   { stroke: ${ACCENT}; stroke-width: 1.2; fill: none; }
      .arrr  { stroke: #ff5b3c; stroke-width: 1.2; fill: none; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .red   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: #ff5b3c; }
      .acc   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .sub   { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">UNCATALYZED vs CATALYZED · SAME ΔH, SMALLER Ea</text>
  <line class="ax" x1="40" y1="200" x2="540" y2="200"/>
  <line class="ax" x1="40" y1="30"  x2="40"  y2="200"/>
  <path class="un"  d="M40 150 Q 180 148, 240 140 Q 280 40, 320 140 Q 420 170, 540 175"/>
  <path class="cat" d="M40 150 Q 180 150, 220 146 Q 260 100, 300 146 Q 420 170, 540 175"/>
  <line class="dash" x1="40"  y1="150" x2="540" y2="150"/>
  <line class="dash" x1="40"  y1="175" x2="540" y2="175"/>
  <path class="arrr" d="M160 150 L160 40" marker-end="url(#ct-arr)"/>
  <text class="red"  x="70"  y="96">Ea (no cat)</text>
  <path class="arr"  d="M360 150 L360 100" marker-end="url(#ct-arr)"/>
  <text class="acc"  x="370" y="124">Ea (with cat)</text>
  <text class="lbl"  x="55"  y="144">reactants</text>
  <text class="lbl"  x="470" y="170">products</text>
  <text class="tag"  x="290" y="222" text-anchor="middle">reaction coordinate →</text>
  <text class="sub"  x="540" y="216" text-anchor="end">catalyst lowers Ea; ΔH unchanged</text>
</svg>`;

// Mechanism diagram (Topic 5.6)
const mechanismSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="mc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .box  { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .hi   { fill: ${INK}; stroke: ${ACCENT}; stroke-width: 1.6; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.14em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .acc  { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .ex   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${FG}; }
      .sub  { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .arr  { stroke: ${ACCENT}; stroke-width: 1.2; fill: none; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">MECHANISM · 2 NO₂ + F₂ → 2 NO₂F</text>
  <rect class="hi"  x="40"  y="40" width="220" height="60" rx="6"/>
  <text class="tag" x="52"  y="58">STEP 1 · SLOW (RDS)</text>
  <text class="ex"  x="52"  y="82">NO₂ + F₂ → NO₂F + F</text>
  <text class="acc" x="52"  y="96">rate₁ = k₁ [NO₂][F₂]</text>
  <rect class="box" x="300" y="40" width="220" height="60" rx="6"/>
  <text class="tag" x="312" y="58">STEP 2 · FAST</text>
  <text class="ex"  x="312" y="82">NO₂ + F → NO₂F</text>
  <text class="sub" x="312" y="96">(F is an intermediate)</text>
  <rect class="box" x="40" y="120" width="480" height="40" rx="6"/>
  <text class="tag" x="52" y="140">SUM</text>
  <text class="ex"  x="90" y="142">2 NO₂ + F₂ → 2 NO₂F   (F cancels — intermediate)</text>
  <rect class="box" x="40" y="172" width="480" height="50" rx="6"/>
  <text class="tag" x="52" y="190">OVERALL RATE LAW</text>
  <text class="acc" x="52" y="212">rate = k [NO₂][F₂]   ← set by slow step</text>
</svg>`;

export const UNIT_05: UnitStudyGuide = {
  unitSlug: 'kinetics',

  topics: [
    // ────────────────── 5.1  Reaction Rates ──────────────────
    {
      topicId: '5.1',
      overview:
        'Rate is how fast a concentration changes — moles per liter per second. Every quantitative question in this unit starts with measuring one.',
      lead: [
        {
          heading: 'Rate = slope of concentration vs time',
          body:
            'If you watch a reactant\'s concentration fall (or a product\'s rise) over time, the steeper the curve, the faster the reaction. The instantaneous rate is the slope of the tangent at that instant. The initial rate — the slope at $t = 0$ — is the cleanest to measure because nothing has reversed or depleted yet.',
          svg: rateVsTimeSVG,
          formula: '\\text{rate} \\;=\\; -\\dfrac{1}{a}\\dfrac{\\Delta[\\text{A}]}{\\Delta t} \\;=\\; +\\dfrac{1}{b}\\dfrac{\\Delta[\\text{B}]}{\\Delta t}',
        },
        {
          heading: 'Signs and stoichiometric coefficients',
          body:
            'Reactants disappear, so $\\Delta[\\text{reactant}] < 0$ — we flip the sign so rate is reported as positive. Coefficients divide in: for $2\\,\\text{A} \\rightarrow \\text{B}$, A vanishes twice as fast as B appears, but the unique reaction rate is the same number regardless of which species you track.',
          callout:
            'If you forget to divide by the coefficient, you get the "rate of disappearance of A," which is a perfectly good answer — but it\'s NOT the same as "the rate of the reaction." On AP, read the wording carefully.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The rate-law widget lets you pull concentration-vs-time traces and read slopes at any point. Treat the tangent line as a physical object you can move.',
        tryThis: [
          'Pick trial 1 and drag the tangent to $t = 0$. Record the initial rate.',
          'Drag the tangent to a later time and watch the slope flatten.',
          'Switch between "track reactant" and "track product" views on the same trial.',
        ],
        observe: [
          'The reactant curve bends toward zero; the product curve bends toward a plateau. Both slopes shrink as the reaction progresses.',
          'Reactant and product tangents at the same instant have opposite signs but (after you divide by stoichiometric coefficients) the same magnitude.',
          'The initial rate is ALWAYS the fastest moment — reactants are most abundant there.',
        ],
      },
      notes: [
        {
          heading: 'Why initial rates?',
          body:
            'Rate depends on concentration. Once a reaction has run for a while, [reactants] have fallen and the rate itself is no longer a clean function of your starting concentrations. At $t = 0$, the concentrations are exactly what you set them to, so the initial rate lets you isolate the dependence on one variable at a time.',
        },
        {
          heading: 'Units of rate and of $k$',
          body:
            'Rate has units of $\\text{M}\\,\\text{s}^{-1}$ (molarity per second). The rate constant $k$ (introduced formally in 5.2) carries whatever units are needed to make $k\\,[\\text{A}]^m[\\text{B}]^n$ come out to $\\text{M}/\\text{s}$. That means $k$\'s units change with the overall order — a quick sanity check against algebra errors.',
          formula: '[k] \\;=\\; \\text{M}^{1 - \\text{order}}\\,\\text{s}^{-1}',
        },
        {
          heading: 'Worked example · stoichiometric rate',
          body:
            'For $2\\,\\text{N}_2\\text{O}_5 \\rightarrow 4\\,\\text{NO}_2 + \\text{O}_2$, suppose $[\\text{N}_2\\text{O}_5]$ falls by $0.020\\,\\text{M}$ in $10\\,\\text{s}$. Disappearance rate of N₂O₅ = $0.020/10 = 2.0\\times10^{-3}\\,\\text{M/s}$. The unique reaction rate divides by the coefficient 2: $1.0\\times10^{-3}\\,\\text{M/s}$. NO₂ appears at $4\\times$ that = $4.0\\times10^{-3}\\,\\text{M/s}$.',
          formula: '-\\tfrac{1}{2}\\tfrac{\\Delta[\\text{N}_2\\text{O}_5]}{\\Delta t} \\;=\\; +\\tfrac{1}{4}\\tfrac{\\Delta[\\text{NO}_2]}{\\Delta t} \\;=\\; +\\tfrac{\\Delta[\\text{O}_2]}{\\Delta t}',
        },
      ],
      mcqs: [
        {
          id: 'q5.1.1',
          question:
            'For $2\\,\\text{A} \\rightarrow 3\\,\\text{B}$, A disappears at $0.60\\,\\text{M/s}$. How fast does B appear?',
          choices: ['$0.40\\,\\text{M/s}$', '$0.60\\,\\text{M/s}$', '$0.90\\,\\text{M/s}$', '$1.80\\,\\text{M/s}$'],
          correctIndex: 2,
          explanation:
            'Rate = (1/2)(0.60) = 0.30 M/s. B appears at 3 × 0.30 = 0.90 M/s. The 3:2 stoichiometry scales the rates.',
        },
        {
          id: 'q5.1.2',
          question: 'Which is the best operational definition of "initial rate"?',
          choices: [
            'The average rate over the whole reaction.',
            'The slope of [reactant] vs time at $t = 0$.',
            'The slope of [product] vs time at equilibrium.',
            'The rate constant times the stoichiometric coefficient.',
          ],
          correctIndex: 1,
          explanation:
            'Initial rate is the tangent to the concentration-time curve AT t = 0 — before any complicating build-up of products or depletion of reactants.',
        },
        {
          id: 'q5.1.3',
          question: 'Why does the rate of a typical reaction slow down as time passes?',
          choices: [
            'The rate constant $k$ decreases with time.',
            'Reactants are being consumed, so concentrations drop.',
            'Temperature always falls during a reaction.',
            'Products push the reaction backwards by Le Chatelier.',
          ],
          correctIndex: 1,
          explanation:
            '$k$ depends only on T (and the catalyst). What changes is [reactant] — as it drops, rate = $k[\\text{A}]^m...$ drops too.',
        },
        {
          id: 'q5.1.4',
          question: 'The unit of rate for any reaction in solution is:',
          choices: ['mol', 'mol/L', 'M/s', 'L/(mol·s)'],
          correctIndex: 2,
          explanation:
            'Rate measures how fast concentration changes — molarity per second, M/s. The last option (L/(mol·s)) is the unit of a second-order $k$, not rate.',
        },
        {
          id: 'q5.1.5',
          question:
            'For $\\text{N}_2 + 3\\,\\text{H}_2 \\rightarrow 2\\,\\text{NH}_3$, if H₂ is consumed at $0.30\\,\\text{M/s}$, at what rate is NH₃ produced?',
          choices: ['$0.10\\,\\text{M/s}$', '$0.20\\,\\text{M/s}$', '$0.30\\,\\text{M/s}$', '$0.45\\,\\text{M/s}$'],
          correctIndex: 1,
          explanation:
            'Rxn rate = (1/3)(0.30) = 0.10 M/s. NH₃ appears at 2 × 0.10 = 0.20 M/s.',
        },
      ],
    },

    // ────────────────── 5.2  Rate Laws ──────────────────
    {
      topicId: '5.2',
      overview:
        'The rate law tells you how rate depends on concentration. You get it from experiment — not from the balanced equation — by comparing trials where one thing changes at a time.',
      lead: [
        {
          heading: 'The rate law and the rate constant $k$',
          body:
            'A rate law has the form $\\text{rate} = k\\,[\\text{A}]^m[\\text{B}]^n$. The exponents $m$ and $n$ are the reaction orders in A and B, and their sum is the overall order. The proportionality constant $k$ is the rate constant — it packages everything about the reaction that doesn\'t depend on concentration (temperature, catalysts, activation energy). Orders are almost always 0, 1, or 2, and they must be determined experimentally.',
          svg: rateLawSVG,
          formula: '\\text{rate} \\;=\\; k\\,[\\text{A}]^m\\,[\\text{B}]^n',
        },
        {
          heading: 'Reading an initial-rate table',
          body:
            'Pick two trials where one concentration changes and everything else is held fixed. If doubling $[\\text{A}]$ doubles rate → first order in A. Quadruples → second order. Leaves it unchanged → zero order. Halves → negative order (rare on AP). Repeat for each reactant.',
          callout:
            'Orders do NOT equal stoichiometric coefficients unless the reaction is a single elementary step. $2\\,\\text{A} \\rightarrow \\text{P}$ does not guarantee second order in A.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Set the widget to "isolate A": hold [B] fixed, double [A], and read the rate change.',
          'Switch to "isolate B" and do the same.',
          'Compute $k$ from any one trial using the orders you just found.',
        ],
        observe: [
          'When [A] doubles and rate × 4, the ratio $4 = 2^{\\,m}$ forces $m = 2$.',
          'When [B] doubles and rate unchanged, $1 = 2^{\\,n}$ forces $n = 0$.',
          'The $k$ you compute from any trial should be the same — within rounding. If it drifts, an order is wrong.',
        ],
      },
      notes: [
        {
          heading: 'Solving for orders by ratio',
          body:
            'The cleanest method: divide rate equations from two trials, most concentrations cancel. For trials where only [A] changes, $\\dfrac{\\text{rate}_2}{\\text{rate}_1} = \\left(\\dfrac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^m$. Take $\\log$ of both sides or recognize a power-of-2 pattern.',
          formula: 'm \\;=\\; \\dfrac{\\log(\\text{rate}_2/\\text{rate}_1)}{\\log([\\text{A}]_2/[\\text{A}]_1)}',
        },
        {
          heading: 'Integrated rate laws at a glance',
          body:
            'For zero-order: $[\\text{A}]_t = [\\text{A}]_0 - kt$ (concentration drops linearly). First-order: $\\ln[\\text{A}]_t = \\ln[\\text{A}]_0 - kt$ (log-concentration drops linearly; constant half-life $t_{1/2} = \\ln 2 / k$). Second-order: $1/[\\text{A}]_t = 1/[\\text{A}]_0 + kt$ (inverse-concentration rises linearly). The graph that comes out STRAIGHT tells you the order.',
          callout:
            'Straight-line test: plot $[\\text{A}]$, $\\ln[\\text{A}]$, and $1/[\\text{A}]$ against $t$. Whichever is linear identifies the order as 0, 1, or 2.',
        },
        {
          heading: 'Worked example · finding orders and $k$',
          body:
            'Using the diagram: Trials 1 → 2, [A] doubles, rate × 4 → $2^m = 4$ → $m = 2$. Trials 1 → 3, [B] doubles, rate × 1 → $2^n = 1$ → $n = 0$. Overall 2nd order. Plug trial 1 into rate $= k[\\text{A}]^2$: $2.0\\times10^{-3} = k(0.10)^2$ → $k = 0.20\\,\\text{M}^{-1}\\text{s}^{-1}$. Units of $k$ for a 2nd-order reaction: $\\text{M}^{-1}\\text{s}^{-1}$ (1/M·s).',
          formula: 'k \\;=\\; \\dfrac{\\text{rate}}{[\\text{A}]^2} \\;=\\; \\dfrac{2.0\\times10^{-3}}{(0.10)^2} \\;=\\; 0.20\\,\\text{M}^{-1}\\text{s}^{-1}',
        },
        {
          heading: 'Worked example · half-life of a first-order reaction',
          body:
            'For a first-order decay with $k = 0.0347\\,\\text{s}^{-1}$, half-life = $\\ln 2 / k = 0.693 / 0.0347 \\approx 20\\,\\text{s}$. First-order half-life is independent of starting concentration — a signature feature. After $n$ half-lives, $(1/2)^n$ of the original remains.',
          formula: 't_{1/2} \\;=\\; \\dfrac{\\ln 2}{k} \\quad (\\text{first order only})',
        },
      ],
      mcqs: [
        {
          id: 'q5.2.1',
          question:
            'In three trials of $\\text{A} + \\text{B} \\rightarrow \\text{P}$: (1) [A]=0.1, [B]=0.1, rate=1; (2) [A]=0.2, [B]=0.1, rate=2; (3) [A]=0.2, [B]=0.2, rate=8. The rate law is:',
          choices: ['$k[\\text{A}][\\text{B}]$', '$k[\\text{A}][\\text{B}]^2$', '$k[\\text{A}]^2[\\text{B}]$', '$k[\\text{A}]^2[\\text{B}]^2$'],
          correctIndex: 1,
          explanation:
            '1→2: [A] × 2, rate × 2 → 1st order in A. 2→3: [B] × 2, rate × 4 → 2nd order in B. Rate = k[A][B]².',
        },
        {
          id: 'q5.2.2',
          question: 'A reaction with rate law $\\text{rate} = k[\\text{A}]^2$ has $k$ in units of:',
          choices: ['$\\text{s}^{-1}$', '$\\text{M}^{-1}\\text{s}^{-1}$', '$\\text{M/s}$', '$\\text{M}^2/\\text{s}$'],
          correctIndex: 1,
          explanation:
            'For rate in M/s: [k] = (M/s)/(M²) = M⁻¹s⁻¹ = 1/(M·s). The overall order is 2, so exponent on M is $1-2 = -1$.',
        },
        {
          id: 'q5.2.3',
          question: 'A plot of $\\ln[\\text{A}]$ vs $t$ is linear with slope $-0.10\\,\\text{s}^{-1}$. The reaction is:',
          choices: ['Zero order, $k = 0.10\\,\\text{M/s}$', 'First order, $k = 0.10\\,\\text{s}^{-1}$', 'Second order, $k = 0.10$', 'First order, $k = -0.10$'],
          correctIndex: 1,
          explanation:
            'A linear $\\ln[\\text{A}]$ vs $t$ is the signature of first order. The slope is $-k$, so $k = +0.10\\,\\text{s}^{-1}$.',
        },
        {
          id: 'q5.2.4',
          question: 'If a reaction is zero order in A, doubling $[\\text{A}]$ will:',
          choices: ['Double the rate', 'Quadruple the rate', 'Leave the rate unchanged', 'Halve the rate'],
          correctIndex: 2,
          explanation:
            'rate = $k[\\text{A}]^0 = k$ — doesn\'t depend on [A]. This happens, for example, when a surface catalyst is saturated.',
        },
        {
          id: 'q5.2.5',
          question:
            'A first-order reaction has $t_{1/2} = 30\\,\\text{s}$. What fraction of reactant remains after 90 s?',
          choices: ['1/2', '1/4', '1/8', '1/9'],
          correctIndex: 2,
          explanation:
            '90 s = 3 half-lives. After each, half remains: $(1/2)^3 = 1/8$.',
        },
      ],
    },

    // ────────────────── 5.3  Energy Profile ──────────────────
    {
      topicId: '5.3',
      overview:
        'Every reaction has to climb an energy hill before it can fall into products. The height of that hill, $E_a$, controls how fast it goes.',
      lead: [
        {
          heading: 'The transition state and activation energy $E_a$',
          body:
            'An energy profile plots potential energy against reaction progress. The peak is the transition state — a high-energy, short-lived arrangement with bonds partly broken and partly formed. The climb from reactants to the peak is the activation energy $E_a$, the minimum energy a colliding pair must have to react. $\\Delta H$ is the net drop (or rise) from reactants to products; it sets whether the reaction is exo- or endothermic but NOT how fast it goes.',
          svg: energyProfileSVG,
          formula: '\\Delta H \\;=\\; E_a^{\\text{fwd}} - E_a^{\\text{rev}}',
        },
        {
          heading: 'Arrhenius: why temperature matters so much',
          body:
            'The rate constant depends exponentially on $E_a$ and temperature: $k = A\\, e^{-E_a/RT}$. Small increases in $T$ let an exponentially larger fraction of molecules clear the barrier. A rough rule: near room temperature, a 10 K rise roughly doubles $k$ for typical reactions.',
          formula: 'k \\;=\\; A\\,e^{-E_a/RT}',
          callout:
            'Catalysts change $E_a$. Temperature changes the fraction of molecules that have $\\ge E_a$. Both speed things up, but by different mechanisms — don\'t mix them up.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The energy-profile widget lets you drag the transition-state peak up and down, and the reactant/product plateau independently.',
        tryThis: [
          'Raise the peak — watch what happens to the forward and reverse $E_a$.',
          'Drop the product plateau below reactants and mark this as exothermic. Raise it above and mark it endothermic.',
          'Toggle the catalyst to see a second, lower path appear.',
        ],
        observe: [
          '$\\Delta H$ = (product level) − (reactant level). It doesn\'t care about the peak height.',
          '$E_a^{\\text{fwd}} - E_a^{\\text{rev}} = \\Delta H$ always. The forward and reverse barriers are tied together by the product plateau.',
          'For an endothermic reaction, the reverse barrier is always SMALLER than the forward barrier.',
        ],
      },
      notes: [
        {
          heading: 'Endothermic vs exothermic profiles',
          body:
            'Exothermic: products sit below reactants ($\\Delta H < 0$); forward barrier is smaller than reverse. Endothermic: products above reactants ($\\Delta H > 0$); forward barrier is larger than reverse. Both still have a peak — a negative $\\Delta H$ does NOT mean zero activation energy.',
        },
        {
          heading: 'Intermediates vs transition states',
          body:
            'A transition state is the very top of a hump — unstable, impossible to isolate. An intermediate sits in a valley BETWEEN two humps — short-lived but a real chemical species, formed in one step and consumed in the next. A two-step mechanism has two peaks and one valley between them.',
        },
        {
          heading: 'Worked example · reading a profile',
          body:
            'A profile shows reactants at 50 kJ/mol, transition state at 180 kJ/mol, products at 80 kJ/mol. Forward $E_a$ = 180 − 50 = 130 kJ/mol. Reverse $E_a$ = 180 − 80 = 100 kJ/mol. $\\Delta H$ = 80 − 50 = +30 kJ/mol (endothermic). Check: $E_a^{\\text{fwd}} - E_a^{\\text{rev}} = 130 - 100 = 30\\,\\checkmark$.',
          formula: 'E_a^{\\text{fwd}} = 130 \\quad E_a^{\\text{rev}} = 100 \\quad \\Delta H = +30\\;\\text{kJ/mol}',
        },
      ],
      mcqs: [
        {
          id: 'q5.3.1',
          question: 'On an energy profile, the activation energy is best described as:',
          choices: [
            'The energy of the products minus the reactants.',
            'The height of the peak above the reactant level.',
            'The height of the peak above the product level.',
            'The total enthalpy change of the reaction.',
          ],
          correctIndex: 1,
          explanation:
            'Forward $E_a$ measures FROM reactants UP to the transition state. $\\Delta H$ compares products to reactants instead.',
        },
        {
          id: 'q5.3.2',
          question: 'For an exothermic reaction:',
          choices: [
            '$E_a^{\\text{fwd}} > E_a^{\\text{rev}}$',
            '$E_a^{\\text{fwd}} < E_a^{\\text{rev}}$',
            '$E_a^{\\text{fwd}} = 0$',
            '$E_a^{\\text{fwd}} = \\Delta H$',
          ],
          correctIndex: 1,
          explanation:
            'Products are below reactants, so climbing back up (reverse) is a taller climb than climbing down (forward).',
        },
        {
          id: 'q5.3.3',
          question:
            'A reaction profile shows reactants at 20 kJ, TS at 95 kJ, products at 40 kJ. What is $E_a$ for the forward reaction?',
          choices: ['20 kJ', '40 kJ', '55 kJ', '75 kJ'],
          correctIndex: 3,
          explanation:
            '$E_a^{\\text{fwd}} = 95 - 20 = 75\\,\\text{kJ}$. Always measured from reactants, not from zero.',
        },
        {
          id: 'q5.3.4',
          question: 'Raising temperature increases reaction rate primarily because:',
          choices: [
            'It lowers the activation energy.',
            'It raises the enthalpy of products.',
            'A larger fraction of molecules have kinetic energy $\\ge E_a$.',
            'It changes the mechanism.',
          ],
          correctIndex: 2,
          explanation:
            'The Maxwell–Boltzmann tail shifts right at higher T, so more molecules clear the existing barrier. $E_a$ itself is unchanged.',
        },
        {
          id: 'q5.3.5',
          question: 'A transition state differs from an intermediate because the transition state:',
          choices: [
            'Can be isolated at low temperature.',
            'Is a stable species sitting in an energy valley.',
            'Sits at a peak and cannot be isolated.',
            'Has the same structure as the reactants.',
          ],
          correctIndex: 2,
          explanation:
            'TS = peak (unstable). Intermediate = valley between two peaks (briefly stable, real species).',
        },
      ],
    },

    // ────────────────── 5.4  Collision Theory ──────────────────
    {
      topicId: '5.4',
      overview:
        'Molecules react only when they collide — but not every collision works. For a reaction to happen, the hit must be hard enough AND aimed right.',
      lead: [
        {
          heading: 'Three requirements for an effective collision',
          body:
            'Collision theory says a productive collision needs (1) the molecules to actually meet — a collision frequency; (2) the right orientation so the bonds that need to break are facing each other; and (3) enough kinetic energy, $\\ge E_a$, to force the transition state. Miss any one requirement and the molecules bounce apart unchanged.',
          svg: collisionSVG,
          formula: '\\text{rate} \\;\\propto\\; Z \\cdot p \\cdot e^{-E_a/RT}',
        },
        {
          heading: 'Concentration, temperature, and surface area — what each one changes',
          body:
            'Higher concentration packs more molecules into a volume, raising the collision frequency $Z$. Higher temperature raises $Z$ a little (faster-moving molecules hit more often) but raises the energy-clearing factor $e^{-E_a/RT}$ a LOT. For a solid reactant, grinding it up raises surface area, which raises how many reactive sites are exposed.',
          callout:
            'Temperature wins because it appears inside an exponential. Doubling concentration doubles rate; raising T by 10 K can double it too, and T keeps compounding.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The collision widget tints each hit by whether it was oriented correctly and whether it had enough energy.',
        tryThis: [
          'Crank up the concentration and watch the collision frequency counter rise.',
          'Crank up the temperature. Note how the fraction of "successful" hits jumps faster than the hit-frequency.',
          'Add a catalyst (Topic 5.5 preview) and see the fraction-with-enough-energy climb.',
        ],
        observe: [
          'Wrong orientation is marked with a red X even when the molecules have plenty of energy.',
          'Cold molecules can collide forever without reacting — they don\'t clear $E_a$.',
          'Most collisions in a real reaction are non-productive. That\'s why rates are so sensitive to small changes in T.',
        ],
      },
      notes: [
        {
          heading: 'Maxwell–Boltzmann distribution',
          body:
            'At any temperature, molecules have a distribution of speeds (and therefore kinetic energies). The fraction with $\\text{KE} \\ge E_a$ is the area under the tail of the distribution past $E_a$. Raising T shifts the whole distribution toward higher energy — the tail past $E_a$ grows disproportionately, which is the Arrhenius factor $e^{-E_a/RT}$ in disguise.',
        },
        {
          heading: 'Why some reactions are fast even when $\\Delta H > 0$',
          body:
            '$\\Delta H$ is thermodynamics. Rate is kinetics. A reaction can be endothermic but fast if $E_a$ is small, and it can be highly exothermic but slow if $E_a$ is large (think: a piece of paper sitting on a desk — combustion is very exothermic but needs an ignition push past $E_a$).',
        },
        {
          heading: 'Worked example · why 10 K doubles rate',
          body:
            'Using Arrhenius at $T_1 = 300\\,\\text{K}$ vs $T_2 = 310\\,\\text{K}$, with $E_a = 50\\,\\text{kJ/mol}$: $\\ln(k_2/k_1) = (E_a/R)(1/T_1 - 1/T_2) = (50000/8.314)(1/300 - 1/310) \\approx 6015 \\times (1.075\\times10^{-4}) \\approx 0.65$, so $k_2/k_1 \\approx e^{0.65} \\approx 1.9$. The rate nearly doubles for a 10 K jump — matching the textbook rule of thumb.',
          formula: '\\ln\\dfrac{k_2}{k_1} \\;=\\; \\dfrac{E_a}{R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)',
        },
      ],
      mcqs: [
        {
          id: 'q5.4.1',
          question: 'Which factor does NOT increase the rate of a typical reaction between two gases?',
          choices: [
            'Raising the concentration of one reactant.',
            'Raising the temperature.',
            'Adding a catalyst.',
            'Increasing the container volume at fixed moles.',
          ],
          correctIndex: 3,
          explanation:
            'Increasing volume at fixed moles DROPS concentration, reducing collision frequency — it slows the reaction.',
        },
        {
          id: 'q5.4.2',
          question: 'Most collisions between reactant molecules at room temperature:',
          choices: [
            'Produce products.',
            'Produce a transition state that goes to products.',
            'Fail because orientation or energy is wrong.',
            'Produce an intermediate that slowly converts.',
          ],
          correctIndex: 2,
          explanation:
            'The Arrhenius factor $e^{-E_a/RT}$ is typically tiny at room T — the vast majority of collisions bounce off.',
        },
        {
          id: 'q5.4.3',
          question: 'Grinding a solid reactant into a powder speeds up its reaction because it:',
          choices: [
            'Lowers $E_a$ chemically.',
            'Exposes more surface area so more collisions can occur.',
            'Increases the $\\Delta H$.',
            'Raises the temperature of the solid.',
          ],
          correctIndex: 1,
          explanation:
            'Surface area = how many reactive sites face the other reactant. More sites, more effective collisions.',
        },
        {
          id: 'q5.4.4',
          question: 'A reaction is slow at 25 °C. Raising T to 35 °C typically:',
          choices: [
            'Doubles $E_a$.',
            'Roughly doubles $k$.',
            'Halves $\\Delta H$.',
            'Changes the stoichiometric coefficients.',
          ],
          correctIndex: 1,
          explanation:
            'The rule of thumb: a 10 K jump near room T roughly doubles $k$ (via the Arrhenius exponential).',
        },
        {
          id: 'q5.4.5',
          question: 'On a Maxwell–Boltzmann plot, raising T makes:',
          choices: [
            'The peak taller and more centered.',
            'The distribution narrower.',
            'The curve shift right and flatten, with a bigger fraction past $E_a$.',
            'All molecules move at the same higher speed.',
          ],
          correctIndex: 2,
          explanation:
            'Higher T spreads the distribution toward higher KE — the tail past $E_a$ grows, which is exactly the Arrhenius increase.',
        },
      ],
    },

    // ────────────────── 5.5  Catalysts ──────────────────
    {
      topicId: '5.5',
      overview:
        'A catalyst offers a lower-energy path from reactants to products without being consumed. It doesn\'t change where you end up — only how fast you get there.',
      lead: [
        {
          heading: 'What a catalyst changes, and what it doesn\'t',
          body:
            'A catalyst provides an alternate mechanism with a smaller $E_a$. That means both forward AND reverse reactions speed up equally — so equilibrium position is unchanged. $\\Delta H$ is unchanged. The identity of the products is unchanged. Only the rate (and often the selectivity for a particular product) changes.',
          svg: catalystSVG,
          callout:
            'A catalyst appears in the mechanism but NOT in the overall balanced equation — it\'s regenerated. That\'s the tell: compare step-by-step to overall. If a species starts and ends unchanged, it\'s the catalyst.',
        },
        {
          heading: 'Homogeneous vs heterogeneous',
          body:
            'Homogeneous: catalyst is in the same phase as the reactants (e.g., aqueous $\\text{Fe}^{3+}$ catalyzing an aqueous redox). Heterogeneous: different phase — classically a solid catalyst with gaseous reactants, like platinum in a catalytic converter. Heterogeneous catalysts work by adsorbing reactants onto their surface, weakening bonds and lining molecules up for reaction.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Flip the catalyst on. Compare forward $E_a$ before and after.',
          'Check that $\\Delta H$ is identical in both profiles.',
          'Confirm the reverse $E_a$ also dropped by the same amount as the forward one.',
        ],
        observe: [
          'The catalyzed curve sits under a lower hump but connects the same reactant and product plateaus.',
          'Because the same barrier drops for forward and reverse, $K_{\\text{eq}}$ (Unit 7) is untouched.',
          'For a two-step catalyzed mechanism, you\'ll see a small intermediate valley between two small humps — still much easier than the single big hump of the uncatalyzed path.',
        ],
      },
      notes: [
        {
          heading: 'Enzymes — biological catalysts',
          body:
            'Enzymes are protein catalysts. They work by binding a reactant (the substrate) in a geometrically specific active site, which simultaneously positions bonds for reaction (orientation factor) and often strains them (lowering $E_a$). A single enzyme can turn over thousands of substrate molecules per second.',
        },
        {
          heading: 'How a catalyst affects the rate law',
          body:
            'If the catalyst appears in the rate-determining step (5.6), its concentration appears in the rate law. Most practical catalysts you see on AP do appear in the rate law — that\'s how you confirm they\'re catalytic rather than spectator. A catalyst NEVER appears in the overall balanced equation.',
          formula: 'A \\xrightarrow{\\text{cat}} B \\qquad \\text{rate} = k[\\text{A}][\\text{cat}]',
        },
        {
          heading: 'Worked example · identifying the catalyst',
          body:
            'Mechanism: Step 1 (slow): $\\text{H}_2\\text{O}_2 + \\text{I}^- \\rightarrow \\text{H}_2\\text{O} + \\text{IO}^-$. Step 2 (fast): $\\text{H}_2\\text{O}_2 + \\text{IO}^- \\rightarrow \\text{H}_2\\text{O} + \\text{O}_2 + \\text{I}^-$. Overall: $2\\,\\text{H}_2\\text{O}_2 \\rightarrow 2\\,\\text{H}_2\\text{O} + \\text{O}_2$. $\\text{I}^-$ is consumed in step 1 and regenerated in step 2 — it\'s the catalyst. $\\text{IO}^-$ is formed in step 1 and consumed in step 2 — it\'s the intermediate.',
          formula: '\\text{rate} \\;=\\; k\\,[\\text{H}_2\\text{O}_2]\\,[\\text{I}^-]',
        },
      ],
      mcqs: [
        {
          id: 'q5.5.1',
          question: 'A catalyst speeds up a reaction by:',
          choices: [
            'Increasing $\\Delta H$.',
            'Providing a path with lower $E_a$.',
            'Raising the temperature of the system.',
            'Increasing the concentration of reactants.',
          ],
          correctIndex: 1,
          explanation:
            'Catalysts open an alternate mechanism with a smaller activation energy. They don\'t touch $\\Delta H$ or T.',
        },
        {
          id: 'q5.5.2',
          question: 'Adding a catalyst to a reversible reaction at equilibrium:',
          choices: [
            'Shifts the equilibrium toward products.',
            'Shifts the equilibrium toward reactants.',
            'Speeds both directions equally — position unchanged.',
            'Changes the value of $K_{\\text{eq}}$.',
          ],
          correctIndex: 2,
          explanation:
            'Forward and reverse $E_a$ drop by the same amount, so both rates rise equally. $K_{\\text{eq}}$ (which is ratios of $k$\'s) stays fixed.',
        },
        {
          id: 'q5.5.3',
          question: 'In a mechanism, a catalyst is the species that:',
          choices: [
            'Is formed in an early step and consumed in a later step.',
            'Appears in the overall balanced equation.',
            'Is consumed in an early step and regenerated in a later step.',
            'Is always a transition metal.',
          ],
          correctIndex: 2,
          explanation:
            'Opposite of an intermediate. Catalyst: reactant first, product later. Intermediate: product first, reactant later.',
        },
        {
          id: 'q5.5.4',
          question: 'Which statement about a heterogeneous catalyst is TRUE?',
          choices: [
            'It must be in the same phase as the reactants.',
            'Grinding it into a powder generally increases its catalytic effect.',
            'It changes $\\Delta H$ of the reaction.',
            'It is consumed in the balanced equation.',
          ],
          correctIndex: 1,
          explanation:
            'More surface area exposes more active sites — essential for heterogeneous catalysis. It doesn\'t touch $\\Delta H$ and is not consumed.',
        },
        {
          id: 'q5.5.5',
          question:
            'In the mechanism  $\\text{NO} + \\text{O}_3 \\rightarrow \\text{NO}_2 + \\text{O}_2$ (slow); $\\text{NO}_2 + \\text{O} \\rightarrow \\text{NO} + \\text{O}_2$ (fast). Overall: $\\text{O}_3 + \\text{O} \\rightarrow 2\\,\\text{O}_2$. Which is the catalyst?',
          choices: ['$\\text{O}_3$', '$\\text{NO}$', '$\\text{NO}_2$', '$\\text{O}_2$'],
          correctIndex: 1,
          explanation:
            'NO is consumed in step 1 and regenerated in step 2 — classic catalyst. NO₂ is formed then consumed — that\'s the intermediate.',
        },
      ],
    },

    // ────────────────── 5.6  Reaction Mechanisms ──────────────────
    {
      topicId: '5.6',
      overview:
        'Most reactions happen in a sequence of elementary steps, not a single collision. The slowest step — the rate-determining step — sets the pace for the whole reaction.',
      lead: [
        {
          heading: 'Elementary steps and the rate-determining step',
          body:
            'An elementary step is a single molecular event — a single collision or breakup. For an elementary step, the rate law IS dictated by the stoichiometry: unimolecular $\\text{A} \\rightarrow \\text{P}$ gives rate $= k[\\text{A}]$; bimolecular $\\text{A} + \\text{B} \\rightarrow \\text{P}$ gives rate $= k[\\text{A}][\\text{B}]$. A mechanism is a sequence of these steps that sums to the overall equation. The slowest step is the rate-determining step (RDS) — like a bottleneck, it controls overall throughput.',
          svg: mechanismSVG,
          formula: '\\text{overall rate} \\;=\\; \\text{rate of the RDS (slow step)}',
        },
        {
          heading: 'Two tests a proposed mechanism must pass',
          body:
            'First, the steps must sum to the overall balanced equation (intermediates cancel). Second, the rate law predicted by the RDS must match the experimental rate law. A mechanism that fails either test is wrong. A mechanism that passes both is consistent — but not uniquely proven, since other mechanisms might also work.',
          callout:
            'A rate law can RULE OUT a mechanism but never PROVE one. "Consistent with" is the strongest phrasing you\'ll see on an AP answer key.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Set the first step as slow, second as fast. Read off the predicted rate law.',
          'Flip: make step 2 the slow one. See the rate law change — and watch out for an intermediate appearing in it.',
          'Add the steps and verify intermediates cancel to give the overall equation.',
        ],
        observe: [
          'When the slow step comes first, the rate law contains only reactants from the overall equation — easy case.',
          'When the slow step comes later, an intermediate may show up. Use the fast-equilibrium approximation (next note) to rewrite it in terms of real reactants.',
          'Regardless of order, intermediates must cancel when the steps are summed. If they don\'t, the mechanism is malformed.',
        ],
      },
      notes: [
        {
          heading: 'Slow step first: read the rate law directly',
          body:
            'If step 1 is the RDS, the rate law is just $k_1$ times the concentrations of the step-1 reactants (raised to their step-1 coefficients). Example in the diagram: step 1 is $\\text{NO}_2 + \\text{F}_2 \\rightarrow \\text{NO}_2\\text{F} + \\text{F}$ (slow). Predicted rate $= k[\\text{NO}_2][\\text{F}_2]$. Overall equation is $2\\,\\text{NO}_2 + \\text{F}_2 \\rightarrow 2\\,\\text{NO}_2\\text{F}$, so the orders (1 in each) do NOT match the overall coefficients (2 and 1) — the rate law was dictated by the slow step alone.',
        },
        {
          heading: 'Slow step second: eliminate the intermediate',
          body:
            'If step 1 is a fast equilibrium and step 2 is slow, the RDS rate law contains an intermediate. Use the fast pre-equilibrium: $k_1[\\text{A}]^2 = k_{-1}[\\text{A}_2]$, so $[\\text{A}_2] = (k_1/k_{-1})[\\text{A}]^2$. Substitute into the slow-step rate law to get an expression only in real reactants. The "effective" rate constant absorbs $k_1/k_{-1}$.',
          formula: '\\text{rate} \\;=\\; k_2\\,[\\text{A}_2][\\text{B}] \\;=\\; \\tfrac{k_1 k_2}{k_{-1}}\\,[\\text{A}]^2[\\text{B}]',
        },
        {
          heading: 'Molecularity vs order — keep them separate',
          body:
            'Molecularity counts how many molecules collide in one elementary step (1 = unimolecular, 2 = bimolecular, rarely 3). Order is the sum of exponents in the experimental rate law. For an elementary step, molecularity equals order. For an overall reaction, they are different concepts — and equating them is a classic trap.',
        },
        {
          heading: 'Worked example · consistency check',
          body:
            'Proposed: step 1 $\\text{NO} + \\text{NO} \\rightarrow \\text{N}_2\\text{O}_2$ (fast eq); step 2 $\\text{N}_2\\text{O}_2 + \\text{H}_2 \\rightarrow \\text{N}_2\\text{O} + \\text{H}_2\\text{O}$ (slow). Overall: $2\\,\\text{NO} + \\text{H}_2 \\rightarrow \\text{N}_2\\text{O} + \\text{H}_2\\text{O}$. RDS rate $= k_2[\\text{N}_2\\text{O}_2][\\text{H}_2]$. Pre-equilibrium: $[\\text{N}_2\\text{O}_2] = K[\\text{NO}]^2$. So rate $= k[\\text{NO}]^2[\\text{H}_2]$ — matches experiment (2nd order in NO, 1st in H₂). Mechanism passes both tests.',
          formula: '\\text{rate} \\;=\\; k\\,[\\text{NO}]^2[\\text{H}_2]',
        },
      ],
      mcqs: [
        {
          id: 'q5.6.1',
          question:
            'Mechanism: step 1 (slow) $\\text{A} + \\text{B} \\rightarrow \\text{C}$; step 2 (fast) $\\text{C} + \\text{B} \\rightarrow \\text{D}$. Overall: $\\text{A} + 2\\,\\text{B} \\rightarrow \\text{D}$. What is the predicted rate law?',
          choices: [
            '$k[\\text{A}]$',
            '$k[\\text{A}][\\text{B}]$',
            '$k[\\text{A}][\\text{B}]^2$',
            '$k[\\text{A}]^2[\\text{B}]$',
          ],
          correctIndex: 1,
          explanation:
            'The slow step is bimolecular in A and B. Since step 1 is rate-determining and contains no intermediates, rate = $k[\\text{A}][\\text{B}]$. Note it does NOT match the overall stoichiometry (2 in B).',
        },
        {
          id: 'q5.6.2',
          question: 'In a multi-step mechanism, an intermediate is:',
          choices: [
            'A species that appears in the overall equation.',
            'A species produced in one step and consumed in a later step.',
            'The transition state of the slow step.',
            'The same thing as a catalyst.',
          ],
          correctIndex: 1,
          explanation:
            'Intermediates are born in one step and die in another — they cancel when summed and never appear in the overall equation.',
        },
        {
          id: 'q5.6.3',
          question: 'Which is TRUE about the rate-determining step?',
          choices: [
            'It is always the first step.',
            'It is the fastest step in the mechanism.',
            'Its rate sets the overall reaction rate.',
            'Its stoichiometry must match the overall equation.',
          ],
          correctIndex: 2,
          explanation:
            'The slowest step controls how fast the whole mechanism can proceed — like the slowest worker on an assembly line.',
        },
        {
          id: 'q5.6.4',
          question:
            'An elementary step $2\\,\\text{A} \\rightarrow \\text{P}$ has what rate law?',
          choices: [
            '$k$',
            '$k[\\text{A}]$',
            '$k[\\text{A}]^2$',
            'Can\'t tell without experiment.',
          ],
          correctIndex: 2,
          explanation:
            'For ELEMENTARY steps (and only those), exponents match coefficients. Bimolecular A+A → P gives rate = $k[\\text{A}]^2$.',
        },
        {
          id: 'q5.6.5',
          question:
            'A proposed mechanism predicts rate $= k[\\text{A}][\\text{B}]^2$. Experiment gives rate $= k[\\text{A}][\\text{B}]$. The mechanism is:',
          choices: [
            'Confirmed.',
            'Rejected — rate laws don\'t match.',
            'Correct if we add a catalyst.',
            'Still valid if overall equation is correct.',
          ],
          correctIndex: 1,
          explanation:
            'Matching stoichiometry isn\'t enough — the predicted rate law must match experiment. A mismatch rules the mechanism out.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  // 15 questions spanning all six topics.
  unitTest: [
    {
      id: 'ut5.1',
      question:
        'For $\\text{A} + 2\\,\\text{B} \\rightarrow 3\\,\\text{C}$, B disappears at $0.60\\,\\text{M/s}$. The unique reaction rate is:',
      choices: ['$0.20\\,\\text{M/s}$', '$0.30\\,\\text{M/s}$', '$0.60\\,\\text{M/s}$', '$1.20\\,\\text{M/s}$'],
      correctIndex: 1,
      explanation:
        'Rate = $\\tfrac{1}{2}(0.60) = 0.30\\,\\text{M/s}$. Divide the disappearance rate by B\'s coefficient.',
    },
    {
      id: 'ut5.2',
      question:
        'Trials for $\\text{A} + \\text{B} \\rightarrow \\text{P}$: (1) [A]=[B]=0.10, rate=0.020; (2) [A]=0.20, [B]=0.10, rate=0.040; (3) [A]=0.10, [B]=0.30, rate=0.020. Rate law:',
      choices: [
        '$k[\\text{A}][\\text{B}]$',
        '$k[\\text{A}]^2$',
        '$k[\\text{A}]$',
        '$k[\\text{A}][\\text{B}]^2$',
      ],
      correctIndex: 2,
      explanation:
        '1→2: [A] × 2, rate × 2 → 1st order in A. 1→3: [B] × 3, rate × 1 → 0 order in B. Rate = $k[\\text{A}]$.',
    },
    {
      id: 'ut5.3',
      question:
        'A first-order reaction has $k = 0.23\\,\\text{s}^{-1}$. Its half-life is about:',
      choices: ['$0.23\\,\\text{s}$', '$1.0\\,\\text{s}$', '$3.0\\,\\text{s}$', '$4.3\\,\\text{s}$'],
      correctIndex: 2,
      explanation:
        '$t_{1/2} = \\ln 2 / k = 0.693 / 0.23 \\approx 3.0\\,\\text{s}$. First-order half-life is independent of starting concentration.',
    },
    {
      id: 'ut5.4',
      question: 'The units of $k$ for a zero-order reaction are:',
      choices: ['$\\text{s}^{-1}$', '$\\text{M}\\,\\text{s}^{-1}$', '$\\text{M}^{-1}\\text{s}^{-1}$', 'unitless'],
      correctIndex: 1,
      explanation:
        'Rate = $k$ for zero order, and rate has units M/s — so $k$ is M/s.',
    },
    {
      id: 'ut5.5',
      question:
        'An energy profile: reactants at 10 kJ, TS at 90 kJ, products at 30 kJ. Reverse activation energy is:',
      choices: ['20 kJ', '60 kJ', '80 kJ', '90 kJ'],
      correctIndex: 1,
      explanation:
        '$E_a^{\\text{rev}} = E_{\\text{TS}} - E_{\\text{products}} = 90 - 30 = 60\\,\\text{kJ}$.',
    },
    {
      id: 'ut5.6',
      question: 'Which statement about a catalyst is FALSE?',
      choices: [
        'It lowers $E_a$.',
        'It is not consumed overall.',
        'It shifts the equilibrium toward products.',
        'It speeds both forward and reverse reactions.',
      ],
      correctIndex: 2,
      explanation:
        'Both directions speed up equally, so the equilibrium position (and $K_{\\text{eq}}$) is unchanged. The other three are true.',
    },
    {
      id: 'ut5.7',
      question:
        'For rate $= k[\\text{A}]^2[\\text{B}]$, doubling both [A] and [B] changes the rate by a factor of:',
      choices: ['2', '4', '6', '8'],
      correctIndex: 3,
      explanation:
        '[A] × 2 → rate × 4 (squared). [B] × 2 → rate × 2. Combined: 4 × 2 = 8.',
    },
    {
      id: 'ut5.8',
      question:
        'In a mechanism, step 1 produces species X; step 2 consumes X. X is:',
      choices: ['a catalyst', 'an intermediate', 'the rate-determining reactant', 'the transition state'],
      correctIndex: 1,
      explanation:
        'Produced then consumed = intermediate. A catalyst is the opposite order (consumed first, regenerated later).',
    },
    {
      id: 'ut5.9',
      question:
        'A reaction is much slower at $T = 280\\,\\text{K}$ than at $T = 310\\,\\text{K}$. The primary reason is:',
      choices: [
        '$\\Delta H$ is smaller at higher T.',
        'Fewer molecules have $\\text{KE} \\ge E_a$ at lower T.',
        'The rate law exponents change with T.',
        'Catalysts deactivate at lower T.',
      ],
      correctIndex: 1,
      explanation:
        'The Arrhenius factor $e^{-E_a/RT}$ shrinks sharply as T falls. Fewer molecules clear the barrier — same $E_a$, fewer successful collisions.',
    },
    {
      id: 'ut5.10',
      question: 'An elementary step is bimolecular. Its rate law is:',
      choices: [
        '$k$',
        'First order always.',
        'Second order overall.',
        'Cannot be determined without experiment.',
      ],
      correctIndex: 2,
      explanation:
        'For elementary steps, molecularity equals order. Bimolecular = 2 molecules collide = overall second order (exponents sum to 2).',
    },
    {
      id: 'ut5.11',
      question:
        'A plot of $1/[\\text{A}]$ vs $t$ is a straight line. The reaction is:',
      choices: ['Zero order', 'First order', 'Second order', 'Third order'],
      correctIndex: 2,
      explanation:
        'Integrated 2nd-order law: $1/[\\text{A}]_t = 1/[\\text{A}]_0 + kt$. A linear $1/[\\text{A}]$-vs-$t$ plot is the fingerprint.',
    },
    {
      id: 'ut5.12',
      question:
        'Mechanism: (1) fast eq, $\\text{A} + \\text{A} \\rightleftharpoons \\text{A}_2$; (2) slow, $\\text{A}_2 + \\text{B} \\rightarrow \\text{P}$. Predicted overall rate law:',
      choices: [
        '$k[\\text{A}][\\text{B}]$',
        '$k[\\text{A}]^2[\\text{B}]$',
        '$k[\\text{A}_2][\\text{B}]$',
        '$k[\\text{A}][\\text{B}]^2$',
      ],
      correctIndex: 1,
      explanation:
        'Slow step rate = $k_2[\\text{A}_2][\\text{B}]$. Eliminate intermediate: $[\\text{A}_2] \\propto [\\text{A}]^2$, giving rate = $k[\\text{A}]^2[\\text{B}]$.',
    },
    {
      id: 'ut5.13',
      question:
        'Which of the following does NOT change the value of the rate constant $k$?',
      choices: [
        'Raising temperature.',
        'Adding a catalyst.',
        'Increasing the concentration of A.',
        'Replacing the reaction mechanism with a different one.',
      ],
      correctIndex: 2,
      explanation:
        '$k$ depends on T and the mechanism (including any catalyst) — not on concentration. Concentration affects rate through the $[\\text{A}]^m$ factor, not through $k$.',
    },
    {
      id: 'ut5.14',
      question:
        'For the Maxwell–Boltzmann distribution at two temperatures $T_1 < T_2$ with the same $E_a$:',
      choices: [
        'The $T_1$ curve has a larger fraction past $E_a$.',
        'Both curves have the same fraction past $E_a$.',
        'The $T_2$ curve has a larger fraction past $E_a$.',
        '$E_a$ moves to a different location on each curve.',
      ],
      correctIndex: 2,
      explanation:
        'Higher T → curve shifts toward higher energy, so a bigger slice of the tail is past the (fixed) $E_a$.',
    },
    {
      id: 'ut5.15',
      question:
        'Which of these is a valid reason to reject a proposed mechanism?',
      choices: [
        'It includes an intermediate.',
        'Summing its steps does not give the overall balanced equation.',
        'It contains a fast equilibrium followed by a slow step.',
        'Its rate-determining step is bimolecular.',
      ],
      correctIndex: 1,
      explanation:
        'A mechanism must sum to the correct overall equation AND predict the correct rate law. Failing either kills the proposal. Intermediates, fast-eq/slow patterns, and bimolecular RDSs are all perfectly normal.',
    },
  ],
};
