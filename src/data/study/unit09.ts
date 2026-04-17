import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 9 · Applications of Thermodynamics  (AP CED weighting: 7–9%)
//
// Entropy, Gibbs free energy, thermodynamic vs kinetic control, the link
// between free energy and the equilibrium constant, and the galvanic /
// electrolytic cells that convert chemistry to electricity (and back).
// ──────────────────────────────────────────────────────────────────────

// Shared diagram palette — pulls from the CSS vars so diagrams invert cleanly
// between dark and light themes.
const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#69e36b'; // Unit 9 hue

// ────────── 9.1 · Entropy microstates ──────────
const entropySVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .div   { stroke: ${LINE}; stroke-width: 0.8; stroke-dasharray: 2 3; }
      .mol   { fill: ${ACCENT}; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .num   { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${ACCENT}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">MICROSTATES · W COUNTS ARRANGEMENTS</text>
  <rect class="box" x="30"  y="40" width="200" height="120" rx="4"/>
  <line class="div" x1="130" y1="40" x2="130" y2="160"/>
  <circle class="mol" cx="60"  cy="80"  r="5"/>
  <circle class="mol" cx="90"  cy="110" r="5"/>
  <circle class="mol" cx="70"  cy="135" r="5"/>
  <circle class="mol" cx="105" cy="60"  r="5"/>
  <text class="tag" x="130" y="180" text-anchor="middle">LOW S · ORDERED · W SMALL</text>
  <text class="sub" x="130" y="198" text-anchor="middle">4 molecules · 1 side</text>
  <rect class="box" x="320" y="40" width="200" height="120" rx="4"/>
  <line class="div" x1="420" y1="40" x2="420" y2="160"/>
  <circle class="mol" cx="350" cy="70"  r="5"/>
  <circle class="mol" cx="395" cy="120" r="5"/>
  <circle class="mol" cx="445" cy="60"  r="5"/>
  <circle class="mol" cx="480" cy="130" r="5"/>
  <circle class="mol" cx="460" cy="95"  r="5"/>
  <circle class="mol" cx="370" cy="140" r="5"/>
  <text class="tag" x="420" y="180" text-anchor="middle">HIGH S · SPREAD · W LARGE</text>
  <text class="sub" x="420" y="198" text-anchor="middle">same molecules · both sides</text>
  <rect x="24" y="214" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40"  y="229">EXAMPLE</text>
  <text class="ex"  x="125" y="229">S = k ln W  ·  W(spread) ≫ W(one side)  →  ΔS &gt; 0 on expansion</text>
</svg>`;

// ────────── 9.2 · ΔG vs T plot ──────────
const gibbsSVG = `
<svg viewBox="0 0 560 260" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .grid  { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.4; }
      .line1 { stroke: ${ACCENT}; stroke-width: 2; fill: none; }
      .line2 { stroke: #ff5b3c; stroke-width: 2; fill: none; }
      .zero  { stroke: ${FAINT}; stroke-width: 0.8; stroke-dasharray: 3 3; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .hot   { fill: #ff5b3c; font-family:'JetBrains Mono',monospace; font-size: 11px; letter-spacing:.14em; }
      .cool  { fill: ${ACCENT}; font-family:'JetBrains Mono',monospace; font-size: 11px; letter-spacing:.14em; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">ΔG vs T · SLOPE = −ΔS</text>
  <line class="ax" x1="60" y1="40" x2="60" y2="210"/>
  <line class="ax" x1="60" y1="210" x2="500" y2="210"/>
  <line class="zero" x1="60" y1="125" x2="500" y2="125"/>
  <text class="num" x="52" y="129" text-anchor="end">0</text>
  <text class="tag" x="48" y="125" transform="rotate(-90 48 125)" text-anchor="middle">ΔG</text>
  <text class="tag" x="280" y="232" text-anchor="middle">T (K)  →</text>
  <path class="line1" d="M80 70 L480 200"/>
  <path class="line2" d="M80 180 L480 50"/>
  <text class="cool" x="75" y="55">ΔH &lt; 0 , ΔS &gt; 0</text>
  <text class="ex"   x="75" y="68">always spontaneous</text>
  <text class="hot"  x="315" y="62" text-anchor="end">ΔH &gt; 0 , ΔS &lt; 0</text>
  <text class="ex"   x="315" y="76" text-anchor="end">never spontaneous</text>
  <circle cx="262" cy="125" r="4" fill="${ACCENT}"/>
  <text class="lbl" x="250" y="155" text-anchor="middle">crossover T = ΔH / ΔS</text>
  <rect x="24" y="238" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40"  y="253">EXAMPLE</text>
  <text class="ex"  x="125" y="253">ice → water  ·  ΔH = +6.0 kJ , ΔS = +22 J/K  →  T = 273 K</text>
</svg>`;

// ────────── 9.3 · Thermo vs kinetic energy profile ──────────
const kineticSVG = `
<svg viewBox="0 0 560 260" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .curve { stroke: ${ACCENT}; stroke-width: 2; fill: none; }
      .dash  { stroke: ${FAINT}; stroke-width: 0.8; stroke-dasharray: 3 3; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .hot   { fill: #ff5b3c; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">ENERGY PROFILE · TWO PRODUCTS</text>
  <line class="ax" x1="60" y1="40" x2="60" y2="210"/>
  <line class="ax" x1="60" y1="210" x2="520" y2="210"/>
  <text class="tag" x="48" y="120" transform="rotate(-90 48 120)" text-anchor="middle">ENERGY</text>
  <text class="tag" x="290" y="232" text-anchor="middle">REACTION COORDINATE →</text>
  <path class="curve" d="M80 150 Q140 60 200 90 Q240 110 280 70 Q320 40 360 95 Q400 135 440 170 Q480 195 510 185"/>
  <line class="dash" x1="80"  y1="150" x2="520" y2="150"/>
  <line class="dash" x1="280" y1="70"  x2="280" y2="210"/>
  <line class="dash" x1="440" y1="170" x2="440" y2="210"/>
  <circle cx="80"  cy="150" r="4" fill="${FG}"/>
  <circle cx="280" cy="70"  r="4" class="hot"/>
  <circle cx="440" cy="170" r="4" fill="${ACCENT}"/>
  <text class="lbl" x="80"  y="142" text-anchor="middle">reactants</text>
  <text class="lbl" x="280" y="60"  text-anchor="middle">kinetic product</text>
  <text class="ex"  x="280" y="224" text-anchor="middle">low Ea · fast</text>
  <text class="lbl" x="440" y="162" text-anchor="middle">thermo product</text>
  <text class="ex"  x="440" y="224" text-anchor="middle">lowest G · stable</text>
  <rect x="24" y="238" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40"  y="253">EXAMPLE</text>
  <text class="ex"  x="125" y="253">diamond vs graphite at 25 °C  ·  diamond = kinetic  ·  graphite = thermo</text>
</svg>`;

// ────────── 9.4 · ΔG vs K sign map ──────────
const freeEnergyKSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .zero  { stroke: ${FAINT}; stroke-width: 0.8; stroke-dasharray: 3 3; }
      .curve { stroke: ${ACCENT}; stroke-width: 2; fill: none; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">ΔG° = −RT ln K</text>
  <line class="ax" x1="60" y1="30" x2="60" y2="170"/>
  <line class="ax" x1="60" y1="100" x2="500" y2="100"/>
  <text class="num" x="52" y="104" text-anchor="end">0</text>
  <text class="tag" x="48" y="100" transform="rotate(-90 48 100)" text-anchor="middle">ΔG°</text>
  <text class="tag" x="280" y="190" text-anchor="middle">ln K  →</text>
  <path class="curve" d="M80 40 L500 160"/>
  <circle cx="170" cy="74" r="3" fill="${ACCENT}"/>
  <text class="lbl" x="240" y="54" text-anchor="start">K &lt; 1  ·  ΔG° &gt; 0</text>
  <circle cx="275" cy="100" r="3" fill="${ACCENT}"/>
  <text class="lbl" x="340" y="84" text-anchor="start">K = 1  ·  ΔG° = 0</text>
  <circle cx="400" cy="136" r="3" fill="${ACCENT}"/>
  <text class="lbl" x="300" y="158" text-anchor="end">K &gt; 1  ·  ΔG° &lt; 0</text>
  <rect x="24" y="192" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40"  y="207">EXAMPLE</text>
  <text class="ex"  x="125" y="207">K = 1 × 10⁵ at 298 K  →  ΔG° = −(8.314)(298) ln(10⁵) ≈ −28.5 kJ/mol</text>
</svg>`;

// ────────── 9.5 · Galvanic cell diagram ──────────
const galvanicSVG = `
<svg viewBox="0 0 560 300" width="100%" style="max-width:560px">
  <defs>
    <marker id="e-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .bkr   { fill: none; stroke: ${LINE}; stroke-width: 1.5; }
      .sol   { fill: ${ACCENT}; opacity: 0.08; }
      .sol2  { fill: #ff5b3c; opacity: 0.10; }
      .elec  { fill: ${INK}; stroke: ${FG}; stroke-width: 1; }
      .wire  { stroke: ${FG}; stroke-width: 1.2; fill: none; }
      .flow  { stroke: ${ACCENT}; stroke-width: 1.6; fill: none; }
      .salt  { fill: ${DIM}; opacity: 0.3; stroke: ${LINE}; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sym   { font-family: Fraunces, serif; font-size: 16px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
    </style>
  </defs>
  <text class="tag" x="24" y="14">GALVANIC CELL · Zn/Cu</text>
  <rect class="sol2" x="60"  y="120" width="140" height="100" rx="4"/>
  <path class="bkr" d="M60 80 L60 220 L200 220 L200 80"/>
  <rect class="sol" x="360" y="120" width="140" height="100" rx="4"/>
  <path class="bkr" d="M360 80 L360 220 L500 220 L500 80"/>
  <rect class="elec" x="118" y="60" width="24" height="120"/>
  <text class="sym" x="130" y="200" text-anchor="middle">Zn</text>
  <text class="tag" x="130" y="244" text-anchor="middle">ANODE (−)</text>
  <text class="ex"  x="130" y="258" text-anchor="middle">oxidation</text>
  <rect class="elec" x="418" y="60" width="24" height="120"/>
  <text class="sym" x="430" y="200" text-anchor="middle">Cu</text>
  <text class="tag" x="430" y="244" text-anchor="middle">CATHODE (+)</text>
  <text class="ex"  x="430" y="258" text-anchor="middle">reduction</text>
  <path class="salt" d="M200 100 Q200 60 280 60 Q360 60 360 100 L360 120 Q360 90 280 90 Q200 90 200 120 Z"/>
  <text class="tag" x="280" y="78" text-anchor="middle">SALT BRIDGE</text>
  <path class="wire" d="M130 60 L130 40 L430 40 L430 60"/>
  <rect x="260" y="22" width="40" height="26" fill="${INK}" stroke="${LINE}" rx="3"/>
  <text class="sym" x="280" y="40" text-anchor="middle">V</text>
  <path class="flow" d="M200 48 L260 48" marker-end="url(#e-arr)"/>
  <path class="flow" d="M300 48 L360 48" marker-end="url(#e-arr)"/>
  <text class="num" x="230" y="38" text-anchor="middle">e⁻</text>
  <text class="num" x="330" y="38" text-anchor="middle">e⁻</text>
  <text class="ex" x="130" y="140" text-anchor="middle">Zn²⁺(aq)</text>
  <text class="ex" x="430" y="140" text-anchor="middle">Cu²⁺(aq)</text>
  <rect x="24" y="272" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40"  y="287">EXAMPLE</text>
  <text class="ex"  x="125" y="287">E°cell = +0.34 − (−0.76) = +1.10 V  →  ΔG° = −nFE° = −212 kJ/mol</text>
</svg>`;

export const UNIT_09: UnitStudyGuide = {
  unitSlug: 'applications-thermo',

  topics: [
    // ────────────────── 9.1  Entropy ──────────────────
    {
      topicId: '9.1',
      overview:
        'Energy tends to spread out. Entropy is the bookkeeping that tells you how hard it\'s spreading.',
      lead: [
        {
          heading: 'Entropy, $S$, counts the ways',
          body:
            'Entropy ($S$) is a measure of how many equally-probable microscopic arrangements — called microstates — are available to a system. A microstate is one specific snapshot: this molecule here, that one there, with this much kinetic energy. If a state has many microstates, it has high entropy; if only a few, low entropy. Boltzmann made this exact: $S = k_B \\ln W$, where $W$ is the microstate count and $k_B$ is Boltzmann\'s constant.',
          svg: entropySVG,
          formula: 'S = k_B \\ln W',
        },
        {
          heading: 'Entropy change, $\\Delta S$',
          body:
            'What matters in chemistry is the change $\\Delta S = S_{\\text{final}} - S_{\\text{initial}}$. If the final state has more microstates than the initial state, $\\Delta S > 0$. Gases have vastly more microstates than liquids, which have more than solids — so phase changes toward the gas phase are strongly positive in $\\Delta S$.',
          callout:
            'The sign of $\\Delta S$ is almost always predictable from the reaction equation: count moles of gas on each side, and check phase changes.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget starts with all particles bottled on one side. Remove the partition and let them spread.',
        tryThis: [
          'Start with 4 particles on the left, then 8. Watch how much faster 8 "forgets" the partition.',
          'Pause mid-spread and count the number of particles on each side.',
          'Reset and imagine the reverse: all particles return to one side. Do they ever do it?',
        ],
        observe: [
          'The spread state has many microstates; the "all on one side" state has exactly one arrangement.',
          'Once spread, the system doesn\'t un-spread — not because it\'s forbidden, but because the odds are astronomical.',
          'More particles means the entropy gap between spread and packed grows exponentially.',
        ],
      },
      notes: [
        {
          heading: 'Predicting the sign of $\\Delta S$',
          body:
            'Four fast cues: (1) More moles of gas on the product side → $\\Delta S > 0$. (2) Solid → liquid → gas increases $S$. (3) Dissolving a solid into solution usually increases $S$. (4) A rise in temperature raises $S$ because faster motion opens more microstates.',
          callout:
            'If the equation has $\\Delta n_{\\text{gas}} \\ne 0$, that term almost always dominates. Gases win.',
        },
        {
          heading: 'Standard molar entropy, $S^{\\circ}$',
          body:
            'Tabulated $S^{\\circ}$ values (in J/(mol·K)) let you compute $\\Delta S^{\\circ}_{\\text{rxn}}$ exactly like enthalpies: products minus reactants, weighted by coefficients. Unlike $\\Delta H^{\\circ}_f$, pure elements have non-zero $S^{\\circ}$ — only a perfect crystal at 0 K has $S = 0$ (the third law).',
          formula: '\\Delta S^{\\circ}_{\\text{rxn}} = \\sum n\\,S^{\\circ}_{\\text{prod}} - \\sum n\\,S^{\\circ}_{\\text{react}}',
        },
        {
          heading: 'Worked example · predicting a sign',
          body:
            'For $2\\,\\text{H}_2\\text{O}_2(\\ell) \\rightarrow 2\\,\\text{H}_2\\text{O}(\\ell) + \\text{O}_2(g)$: the reactant side has 0 mol of gas, the product side has 1 mol. Going from 0 → 1 mol of gas means $\\Delta n_{\\text{gas}} = +1$, so $\\Delta S > 0$ without a table lookup.',
          formula: '\\Delta n_{\\text{gas}} = +1 \\;\\Longrightarrow\\; \\Delta S > 0',
        },
      ],
      mcqs: [
        {
          id: 'q9.1.1',
          question: 'Which process has the LARGEST positive $\\Delta S$?',
          choices: [
            '$\\text{H}_2\\text{O}(\\ell) \\rightarrow \\text{H}_2\\text{O}(s)$',
            '$\\text{H}_2\\text{O}(\\ell) \\rightarrow \\text{H}_2\\text{O}(g)$',
            '$\\text{H}_2\\text{O}(g) \\rightarrow \\text{H}_2\\text{O}(\\ell)$',
            '$2\\,\\text{H}_2(g) + \\text{O}_2(g) \\rightarrow 2\\,\\text{H}_2\\text{O}(\\ell)$',
          ],
          correctIndex: 1,
          explanation:
            'Liquid → gas unlocks the largest jump in microstates; evaporation is the big entropy winner. Option D actually removes 2 moles of gas (negative $\\Delta S$).',
        },
        {
          id: 'q9.1.2',
          question: 'Entropy of a substance goes to zero at:',
          choices: ['0 °C', '25 °C', 'a perfect crystal at 0 K', '100 °C'],
          correctIndex: 2,
          explanation:
            'That\'s the third law: at 0 K a perfect crystal has exactly 1 microstate, so $S = k_B \\ln 1 = 0$.',
        },
        {
          id: 'q9.1.3',
          question: 'For $\\text{N}_2(g) + 3\\,\\text{H}_2(g) \\rightarrow 2\\,\\text{NH}_3(g)$, $\\Delta S$ is:',
          choices: ['Strongly positive', 'Strongly negative', 'Close to zero', 'Undefined'],
          correctIndex: 1,
          explanation:
            '4 mol of gas → 2 mol of gas. $\\Delta n_{\\text{gas}} = -2$, so $\\Delta S$ is negative.',
        },
        {
          id: 'q9.1.4',
          question: 'Boltzmann\'s equation $S = k_B \\ln W$ says entropy scales with:',
          choices: [
            'the temperature squared',
            'the logarithm of the number of microstates',
            'the mass of the sample',
            'pressure',
          ],
          correctIndex: 1,
          explanation:
            'Doubling $W$ adds $k_B \\ln 2$ to $S$ — a small but real increase. Entropy is a logarithmic count of arrangements.',
        },
        {
          id: 'q9.1.5',
          question: 'Which statement about entropy is FALSE?',
          choices: [
            'Gases have higher $S^{\\circ}$ than liquids of the same substance.',
            'Heating a substance raises its entropy.',
            'Pure elements have $S^{\\circ} = 0$ by convention.',
            'Dissolving a solid in water usually raises entropy.',
          ],
          correctIndex: 2,
          explanation:
            'The zero-entropy reference is a perfect crystal at 0 K — not "pure element at 25 °C." That convention (zero) is what $\\Delta H^{\\circ}_f$ uses, not $S^{\\circ}$.',
        },
      ],
    },

    // ────────────────── 9.2  Gibbs Free Energy ──────────────────
    {
      topicId: '9.2',
      overview:
        'Spontaneity has two knobs — enthalpy and entropy — and Gibbs free energy combines them into one number.',
      lead: [
        {
          heading: 'Gibbs free energy, $\\Delta G$',
          body:
            'Gibbs free energy ($G$) is the part of a system\'s energy that\'s free to do useful work at constant $T$ and $P$. Its change $\\Delta G = \\Delta H - T\\Delta S$ is the spontaneity criterion: $\\Delta G < 0$ means the process runs forward on its own; $\\Delta G > 0$ means it doesn\'t; $\\Delta G = 0$ means the system is at equilibrium. Because $T$ is in kelvin and $\\Delta S$ is usually in J/(mol·K), be sure to convert $\\Delta H$ to joules (or $\\Delta S$ to kJ) before combining.',
          svg: gibbsSVG,
          formula: '\\Delta G = \\Delta H - T\\,\\Delta S',
        },
        {
          heading: 'The four sign combinations',
          body:
            'Four cases sort everything. $\\Delta H<0,\\,\\Delta S>0$: spontaneous at every $T$. $\\Delta H>0,\\,\\Delta S<0$: never spontaneous. $\\Delta H<0,\\,\\Delta S<0$: spontaneous at LOW $T$ (enthalpy wins). $\\Delta H>0,\\,\\Delta S>0$: spontaneous at HIGH $T$ (entropy wins).',
          callout:
            'Exothermic + disorder-increasing is the "always-on" quadrant. Endothermic + order-increasing is the "never" quadrant. The other two flip with temperature.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Drag $\\Delta H$ and $\\Delta S$ around all four sign quadrants.',
          'Scrub the temperature slider from 0 K up to 1000 K.',
          'Try to make $\\Delta G = 0$ by matching $T = \\Delta H / \\Delta S$.',
        ],
        observe: [
          'The plot is a line with slope $-\\Delta S$ and intercept $\\Delta H$ — that\'s the entire equation.',
          'In the "both positive" quadrant, the line starts above zero and crosses downward — spontaneous only above the crossover $T$.',
          'The crossover temperature is $T = \\Delta H / \\Delta S$ — the same equilibrium temperature a phase change sits at.',
        ],
      },
      notes: [
        {
          heading: 'Standard $\\Delta G^{\\circ}$ from tables',
          body:
            'Given $\\Delta H^{\\circ}_f$ and $S^{\\circ}$ tables: compute $\\Delta H^{\\circ}_{\\text{rxn}}$ and $\\Delta S^{\\circ}_{\\text{rxn}}$ by products-minus-reactants, then combine at the specified temperature. Alternatively, $\\Delta G^{\\circ}_f$ is tabulated directly — products minus reactants gives $\\Delta G^{\\circ}_{\\text{rxn}}$ in one step.',
          formula: '\\Delta G^{\\circ}_{\\text{rxn}} = \\sum n\\,\\Delta G^{\\circ}_{f,\\text{prod}} - \\sum n\\,\\Delta G^{\\circ}_{f,\\text{react}}',
        },
        {
          heading: 'Worked example · ice melting at what T?',
          body:
            'For $\\text{H}_2\\text{O}(s) \\rightarrow \\text{H}_2\\text{O}(\\ell)$: $\\Delta H = +6.01$ kJ/mol, $\\Delta S = +22.0$ J/(mol·K). At equilibrium $\\Delta G = 0 \\Rightarrow T = \\Delta H / \\Delta S = 6010 / 22.0 = 273$ K. Below 273 K, $\\Delta G > 0$ and ice is favored; above 273 K, water wins.',
          formula: 'T_{\\text{eq}} = \\dfrac{\\Delta H}{\\Delta S} = \\dfrac{6010\\,\\text{J}}{22.0\\,\\text{J/K}} = 273\\,\\text{K}',
          callout:
            'Watch units. $\\Delta H$ in kJ and $\\Delta S$ in J/K are the classic AP trap — convert one before dividing.',
        },
        {
          heading: 'Worked example · ΔG at non-standard T',
          body:
            'A reaction has $\\Delta H^{\\circ} = -92$ kJ/mol and $\\Delta S^{\\circ} = -199$ J/(mol·K). At 298 K: $\\Delta G^{\\circ} = -92{,}000 - (298)(-199) = -92{,}000 + 59{,}302 = -32.7$ kJ/mol → spontaneous. At 600 K: $\\Delta G^{\\circ} = -92{,}000 + 119{,}400 = +27.4$ kJ/mol → no longer spontaneous. The reaction shuts off above $T = 92{,}000 / 199 \\approx 462$ K.',
        },
      ],
      mcqs: [
        {
          id: 'q9.2.1',
          question: 'A reaction has $\\Delta H > 0$ and $\\Delta S > 0$. It is spontaneous:',
          choices: ['At all T', 'At no T', 'Only at low T', 'Only at high T'],
          correctIndex: 3,
          explanation:
            '$\\Delta G = \\Delta H - T\\Delta S$. With both positive, the $-T\\Delta S$ term wins once $T$ is large enough — spontaneous at high T.',
        },
        {
          id: 'q9.2.2',
          question:
            'For a reaction with $\\Delta H = -50.0$ kJ/mol and $\\Delta S = -100$ J/(mol·K), at 298 K, $\\Delta G$ is:',
          choices: ['−20.2 kJ/mol', '−79.8 kJ/mol', '+20.2 kJ/mol', '+79.8 kJ/mol'],
          correctIndex: 0,
          explanation:
            '$\\Delta G = -50{,}000 - (298)(-100) = -50{,}000 + 29{,}800 = -20{,}200$ J/mol = −20.2 kJ/mol.',
        },
        {
          id: 'q9.2.3',
          question: 'At the boiling point of a liquid, $\\Delta G_{\\text{vap}}$ equals:',
          choices: ['$\\Delta H_{\\text{vap}}$', '$T\\Delta S_{\\text{vap}}$', '0', 'undefined'],
          correctIndex: 2,
          explanation:
            'At a phase-change equilibrium the two phases coexist, so $\\Delta G = 0$. That gives the useful relation $T_{\\text{bp}} = \\Delta H_{\\text{vap}} / \\Delta S_{\\text{vap}}$.',
        },
        {
          id: 'q9.2.4',
          question:
            'A reaction has $\\Delta H = +30$ kJ/mol and $\\Delta S = +100$ J/(mol·K). The crossover temperature is:',
          choices: ['30 K', '100 K', '300 K', '3000 K'],
          correctIndex: 2,
          explanation:
            '$T = \\Delta H / \\Delta S = 30{,}000 / 100 = 300$ K. Below 300 K: non-spontaneous; above: spontaneous.',
        },
        {
          id: 'q9.2.5',
          question: 'If $\\Delta G^{\\circ} < 0$, the reaction:',
          choices: [
            'is fast',
            'has $K > 1$',
            'has $\\Delta H < 0$',
            'is always endothermic',
          ],
          correctIndex: 1,
          explanation:
            'Sign of $\\Delta G^{\\circ}$ tells you which way the equilibrium lies, not rate. $\\Delta G^{\\circ} < 0 \\Leftrightarrow K > 1$, via $\\Delta G^{\\circ} = -RT\\ln K$.',
        },
      ],
    },

    // ────────────────── 9.3  Thermodynamic vs Kinetic Control ──────────────────
    {
      topicId: '9.3',
      overview:
        'A reaction that "should" go might not — and the product you actually get might not be the most stable one.',
      lead: [
        {
          heading: 'Two separate questions',
          body:
            'Thermodynamics asks "is there a downhill?" — the sign of $\\Delta G$. Kinetics asks "is the uphill between me and the downhill small enough to climb?" — the size of the activation energy $E_a$. A reaction can be thermodynamically favorable ($\\Delta G<0$) yet kinetically blocked (huge $E_a$) and never actually run at room temperature.',
          svg: kineticSVG,
        },
        {
          heading: 'Kinetic vs thermodynamic product',
          body:
            'When two products compete, the one that forms fastest (lowest $E_a$) is the kinetic product; the one with the lowest $G$ is the thermodynamic product. Low temperatures and short times favor the kinetic product — the system doesn\'t have enough energy to cross into the deeper well. High temperatures and long times favor the thermodynamic product — everything equilibrates.',
          callout:
            'Classic example: diamond has higher $G$ than graphite at 25 °C and 1 atm, yet your ring doesn\'t crumble — the conversion\'s $E_a$ is enormous.',
        },
      ],
      notes: [
        {
          heading: 'Spotting the difference on exam questions',
          body:
            'Phrases like "at low temperature" or "briefly heated" point to the kinetic product; "at equilibrium," "long reaction time," or "high temperature" point to the thermodynamic product. A catalyst lowers $E_a$ for both paths but does NOT change $\\Delta G$ — so it speeds up the approach to equilibrium without shifting which product is thermodynamically favored.',
        },
        {
          heading: 'Worked example · kinetic vs thermodynamic',
          body:
            'Reactants branch to product A ($E_a = 60$ kJ/mol, $\\Delta G_A = -10$ kJ/mol) or product B ($E_a = 100$ kJ/mol, $\\Delta G_B = -40$ kJ/mol). At 25 °C the low-$E_a$ path dominates — product A is the major product (kinetic). Heat strongly and wait — B accumulates because it sits in a deeper well (thermodynamic).',
          formula: '\\text{kinetic: min}\\,E_a \\qquad \\text{thermodynamic: min}\\,G',
        },
        {
          heading: 'Worked example · diamond and graphite',
          body:
            'At 25 °C, $\\Delta G^{\\circ}(\\text{C}_{\\text{diamond}} \\rightarrow \\text{C}_{\\text{graphite}}) = -2.9$ kJ/mol — graphite is the thermodynamic product. Diamond persists because the rearrangement has an $E_a$ on the order of hundreds of kJ/mol — no molecule gets over it at room temperature, so the conversion is effectively zero.',
        },
      ],
      mcqs: [
        {
          id: 'q9.3.1',
          question: 'A reaction with $\\Delta G < 0$ that doesn\'t appear to proceed at room temperature is:',
          choices: [
            'at equilibrium',
            'under kinetic control (large $E_a$)',
            'endothermic',
            'non-spontaneous',
          ],
          correctIndex: 1,
          explanation:
            'Negative $\\Delta G$ guarantees a thermodynamic driving force, not a rate. A big activation barrier can freeze the reaction in place.',
        },
        {
          id: 'q9.3.2',
          question: 'A catalyst changes:',
          choices: [
            '$\\Delta G$ for the reaction',
            'the equilibrium constant K',
            '$E_a$ for both forward and reverse paths',
            'the $\\Delta H$ of the reaction',
          ],
          correctIndex: 2,
          explanation:
            'Catalysts lower the activation barrier symmetrically — forward and reverse rates both speed up. They don\'t touch the thermodynamic quantities.',
        },
        {
          id: 'q9.3.3',
          question:
            'Two products form from the same reactant: P₁ ($E_a = 40$ kJ, $\\Delta G = -15$), P₂ ($E_a = 80$ kJ, $\\Delta G = -50$). The KINETIC product is:',
          choices: ['P₁', 'P₂', 'a mix', 'neither forms'],
          correctIndex: 0,
          explanation:
            'Kinetic = fastest-forming = lowest $E_a$. P₁ wins the kinetic race even though P₂ is more stable.',
        },
        {
          id: 'q9.3.4',
          question: 'Which best explains why diamond is stable at room temperature despite graphite being thermodynamically preferred?',
          choices: [
            'Diamond has a lower $\\Delta G^{\\circ}_f$.',
            'The activation energy for diamond → graphite is very large.',
            'Diamond has higher entropy than graphite.',
            'Carbon doesn\'t obey Gibbs\' equation at 25 °C.',
          ],
          correctIndex: 1,
          explanation:
            'Graphite is the thermodynamic product, but the rearrangement barrier is so large that the conversion rate is effectively zero.',
        },
      ],
    },

    // ────────────────── 9.4  Free Energy & Equilibrium ──────────────────
    {
      topicId: '9.4',
      overview:
        'The equilibrium constant K and the standard free-energy change $\\Delta G^{\\circ}$ are two views of the same truth — one equation ties them together.',
      lead: [
        {
          heading: 'The bridge equation',
          body:
            'At standard conditions, $\\Delta G^{\\circ} = -RT\\ln K$, with $R = 8.314$ J/(mol·K) and $T$ in kelvin. If $K > 1$, then $\\ln K > 0$ and $\\Delta G^{\\circ} < 0$ — products are favored. If $K < 1$, then $\\Delta G^{\\circ} > 0$ — reactants are favored. At exactly $K = 1$, $\\Delta G^{\\circ} = 0$ — a perfectly balanced reaction.',
          svg: freeEnergyKSVG,
          formula: '\\Delta G^{\\circ} = -RT\\,\\ln K',
        },
        {
          heading: 'Away from standard: $\\Delta G$ vs $\\Delta G^{\\circ}$',
          body:
            'Under non-standard concentrations, use the reaction quotient $Q$: $\\Delta G = \\Delta G^{\\circ} + RT\\ln Q$. When the system is at equilibrium, $Q = K$ and $\\Delta G = 0$ — which recovers the standard equation. When $Q < K$, $\\Delta G < 0$ and the reaction runs forward; when $Q > K$, $\\Delta G > 0$ and it runs in reverse.',
          formula: '\\Delta G = \\Delta G^{\\circ} + RT\\,\\ln Q',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Pick a temperature and sweep $K$ from 10⁻⁵ to 10⁵ — watch $\\Delta G^{\\circ}$ cross zero at $K = 1$.',
          'Hold $K = 10^{3}$ and raise $T$ — $|\\Delta G^{\\circ}|$ grows linearly with $T$.',
          'Set $Q = K$ — confirm $\\Delta G = 0$.',
        ],
        observe: [
          'Negative $\\Delta G^{\\circ}$ ⇔ products-favored equilibrium. Positive $\\Delta G^{\\circ}$ ⇔ reactants-favored.',
          'Even a modest $K$ of 10 gives $\\Delta G^{\\circ} \\approx -5.7$ kJ/mol at 298 K — small on the enthalpy scale but decisive.',
          '$\\Delta G = 0$ is the definition of equilibrium, not $\\Delta G^{\\circ} = 0$. Those are different statements.',
        ],
      },
      notes: [
        {
          heading: 'Reading $K$ from $\\Delta G^{\\circ}$',
          body:
            'Rearrange: $K = e^{-\\Delta G^{\\circ}/RT}$. At 298 K, a handy rule: every 5.7 kJ/mol of $\\Delta G^{\\circ}$ shifts $K$ by a factor of 10. So $\\Delta G^{\\circ} = -11.4$ kJ/mol gives $K \\approx 100$.',
          formula: 'K = \\exp\\!\\left(-\\dfrac{\\Delta G^{\\circ}}{RT}\\right)',
        },
        {
          heading: 'Worked example · $K$ from thermochemistry',
          body:
            'A reaction has $\\Delta H^{\\circ} = -20.0$ kJ/mol and $\\Delta S^{\\circ} = +50.0$ J/(mol·K). At 298 K: $\\Delta G^{\\circ} = -20{,}000 - (298)(50.0) = -34{,}900$ J/mol. Then $K = \\exp(34{,}900/(8.314 \\cdot 298)) = \\exp(14.08) \\approx 1.3 \\times 10^{6}$. Strongly products-favored.',
          formula: '\\Delta G^{\\circ} = -34.9\\,\\text{kJ/mol} \\;\\Rightarrow\\; K \\approx 1.3\\times 10^{6}',
        },
        {
          heading: 'Worked example · direction from $Q$ vs $K$',
          body:
            'A reaction has $\\Delta G^{\\circ} = -10$ kJ/mol at 298 K ($K \\approx 56$). Start with $Q = 100$ (more product than equilibrium). Then $\\Delta G = -10{,}000 + (8.314)(298)\\ln 100 = -10{,}000 + 11{,}411 = +1{,}411$ J/mol. Positive → the reaction runs in reverse until $Q$ drops to $K$.',
        },
      ],
      mcqs: [
        {
          id: 'q9.4.1',
          question: 'For a reaction at 298 K with $K = 1 \\times 10^{-4}$, $\\Delta G^{\\circ}$ is approximately:',
          choices: ['−22.8 kJ/mol', '−5.7 kJ/mol', '+5.7 kJ/mol', '+22.8 kJ/mol'],
          correctIndex: 3,
          explanation:
            '$\\Delta G^{\\circ} = -RT\\ln K = -(8.314)(298)\\ln(10^{-4}) = -(8.314)(298)(-9.21) \\approx +22{,}800$ J/mol.',
        },
        {
          id: 'q9.4.2',
          question: 'If $\\Delta G^{\\circ} = 0$, then:',
          choices: ['$K = 0$', '$K = 1$', '$K = e$', '$K$ is undefined'],
          correctIndex: 1,
          explanation:
            '$0 = -RT\\ln K \\Rightarrow \\ln K = 0 \\Rightarrow K = 1$.',
        },
        {
          id: 'q9.4.3',
          question: 'A reaction has $Q < K$. Then:',
          choices: [
            '$\\Delta G > 0$, runs reverse',
            '$\\Delta G < 0$, runs forward',
            'already at equilibrium',
            '$\\Delta G^{\\circ}$ must be zero',
          ],
          correctIndex: 1,
          explanation:
            '$Q<K$ means too few products → reaction runs forward to make more. Mathematically $\\Delta G = \\Delta G^{\\circ} + RT\\ln Q$ is more negative than at equilibrium.',
        },
        {
          id: 'q9.4.4',
          question: 'Raising temperature for an endothermic reaction ($\\Delta H > 0$):',
          choices: [
            'decreases K',
            'increases K',
            'leaves K unchanged',
            'makes $\\Delta G^{\\circ}$ independent of T',
          ],
          correctIndex: 1,
          explanation:
            'Endothermic → entropy of surroundings decreases when the reaction runs; raising $T$ softens that penalty, so $K$ grows. Le Châtelier and Gibbs agree.',
        },
        {
          id: 'q9.4.5',
          question: 'A reaction with $K = 1.0$ has $\\Delta G^{\\circ}$ equal to:',
          choices: ['0', '$RT$', '$-RT$', 'depends on T'],
          correctIndex: 0,
          explanation:
            '$\\ln 1 = 0$, so $\\Delta G^{\\circ} = -RT(0) = 0$ regardless of temperature.',
        },
      ],
    },

    // ────────────────── 9.5  Galvanic & Electrolytic Cells ──────────────────
    {
      topicId: '9.5',
      overview:
        'A redox reaction with $\\Delta G < 0$ can be harnessed to push electrons through a wire. Reverse the sign and you pay electricity to force a reaction uphill.',
      lead: [
        {
          heading: 'Anatomy of a galvanic cell',
          body:
            'A galvanic (voltaic) cell splits a spontaneous redox reaction into two half-reactions in separate beakers. Oxidation happens at the anode — that electrode loses mass and sources electrons. Reduction happens at the cathode — electrons arrive there and deposit on or near the metal. A salt bridge (a tube of inert electrolyte like KNO₃) lets spectator ions migrate to keep both half-cells electrically neutral. Electrons always flow through the external wire from anode (−) to cathode (+).',
          svg: galvanicSVG,
        },
        {
          heading: 'Standard reduction potential, $E^{\\circ}$',
          body:
            'Each half-reaction has a standard reduction potential ($E^{\\circ}$), measured in volts, which tells you how strongly that species wants to gain electrons — all written as reductions by convention. The cell voltage is $E^{\\circ}_{\\text{cell}} = E^{\\circ}_{\\text{cathode}} - E^{\\circ}_{\\text{anode}}$, where both values come straight from the reduction table (no sign flip — the subtraction handles it). A positive $E^{\\circ}_{\\text{cell}}$ means the cell runs spontaneously.',
          formula: 'E^{\\circ}_{\\text{cell}} = E^{\\circ}_{\\text{cathode}} - E^{\\circ}_{\\text{anode}}',
          callout:
            'Memory trick: "AN OX, RED CAT" — ANode = OXidation, REDuction = CAThode.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Build Zn | Zn²⁺ ‖ Cu²⁺ | Cu. Note which electrode dissolves.',
          'Swap the electrodes — the cell runs backwards (now negative $E^{\\circ}$).',
          'Remove the salt bridge and watch the voltage collapse.',
        ],
        observe: [
          'Electrons always leave the anode through the external wire, never through the salt bridge.',
          'Cations in the salt bridge drift toward the cathode; anions toward the anode — they balance the charge the electron flow leaves behind.',
          'E°(Cu²⁺/Cu) = +0.34 V, E°(Zn²⁺/Zn) = −0.76 V → E°cell = +0.34 − (−0.76) = +1.10 V.',
        ],
      },
      notes: [
        {
          heading: '$\\Delta G$ and cell voltage',
          body:
            'The relation that ties thermo to electrochemistry is $\\Delta G^{\\circ} = -nFE^{\\circ}_{\\text{cell}}$, where $n$ is the number of moles of electrons transferred per mole of reaction and $F$ is the Faraday constant, $F = 96{,}485$ C/mol (the charge of one mole of electrons). Sign bookkeeping: positive $E^{\\circ}$ gives negative $\\Delta G^{\\circ}$ gives spontaneous.',
          formula: '\\Delta G^{\\circ} = -nFE^{\\circ}_{\\text{cell}} \\qquad F = 96{,}485\\,\\text{C/mol}',
        },
        {
          heading: 'Electrolytic cells: paying to go uphill',
          body:
            'An electrolytic cell forces a non-spontaneous redox reaction by applying an external voltage greater than $|E^{\\circ}_{\\text{cell}}|$. The electrode names stay tied to the chemistry (anode = oxidation, cathode = reduction), but the sign convention flips: in an electrolytic cell the anode is the + terminal of the power supply and the cathode is the − terminal. Applications: electroplating, electrolysis of water, aluminum smelting, rechargeable batteries on the charging stroke.',
          callout:
            'AN OX / RED CAT is always true. What flips between galvanic and electrolytic is which electrode has the + label, not which half-reaction lives where.',
        },
        {
          heading: 'Worked example · Zn/Cu cell',
          body:
            'Half-reactions: Zn²⁺ + 2e⁻ → Zn, $E^{\\circ} = -0.76$ V ; Cu²⁺ + 2e⁻ → Cu, $E^{\\circ} = +0.34$ V. Cu²⁺ has the higher $E^{\\circ}$, so it reduces (cathode); Zn is oxidized (anode). $E^{\\circ}_{\\text{cell}} = (+0.34) - (-0.76) = +1.10$ V. With $n = 2$: $\\Delta G^{\\circ} = -(2)(96{,}485)(1.10) = -2.12 \\times 10^{5}$ J/mol $= -212$ kJ/mol.',
          formula: '\\Delta G^{\\circ} = -nFE^{\\circ} = -(2)(96{,}485)(1.10) = -212\\,\\text{kJ/mol}',
        },
        {
          heading: 'Worked example · grams deposited by electrolysis',
          body:
            'How much Cu plates out of Cu²⁺(aq) with 2.00 A for 30.0 min? Charge $Q = It = (2.00)(1800) = 3600$ C. Moles of electrons $= 3600 / 96{,}485 = 0.0373$ mol. Cu²⁺ needs 2 e⁻ per Cu atom, so moles Cu $= 0.0373 / 2 = 0.0187$ mol. Mass $= 0.0187 \\times 63.55 = 1.19$ g.',
          formula: 'm = \\dfrac{I\\,t}{nF}\\,M',
        },
      ],
      mcqs: [
        {
          id: 'q9.5.1',
          question: 'In a galvanic cell, electrons flow through the external wire:',
          choices: [
            'anode → cathode',
            'cathode → anode',
            'through the salt bridge',
            'in both directions',
          ],
          correctIndex: 0,
          explanation:
            'Oxidation at the anode releases electrons, which travel through the wire to the cathode where reduction consumes them.',
        },
        {
          id: 'q9.5.2',
          question:
            'Given $E^{\\circ}(\\text{Ag}^{+}/\\text{Ag}) = +0.80$ V and $E^{\\circ}(\\text{Cu}^{2+}/\\text{Cu}) = +0.34$ V, the cell voltage when Ag⁺/Ag is paired with Cu²⁺/Cu is:',
          choices: ['+0.46 V', '−0.46 V', '+1.14 V', '+0.23 V'],
          correctIndex: 0,
          explanation:
            'Higher $E^{\\circ}$ = cathode. $E^{\\circ}_{\\text{cell}} = 0.80 - 0.34 = +0.46$ V.',
        },
        {
          id: 'q9.5.3',
          question: 'The Faraday constant, $F = 96{,}485$ C/mol, represents:',
          choices: [
            'the charge of one electron',
            'the charge of one mole of electrons',
            'the voltage of a standard cell',
            'Avogadro\'s number divided by the electron charge',
          ],
          correctIndex: 1,
          explanation:
            '$F = e \\cdot N_A = (1.602\\times 10^{-19})(6.022\\times 10^{23}) \\approx 96{,}485$ C/mol.',
        },
        {
          id: 'q9.5.4',
          question:
            'A cell has $E^{\\circ}_{\\text{cell}} = +0.50$ V and transfers 2 mol of electrons. $\\Delta G^{\\circ}$ is:',
          choices: ['−96.5 kJ/mol', '−48.2 kJ/mol', '+96.5 kJ/mol', '+48.2 kJ/mol'],
          correctIndex: 0,
          explanation:
            '$\\Delta G^{\\circ} = -nFE^{\\circ} = -(2)(96{,}485)(0.50) = -96{,}485$ J/mol ≈ −96.5 kJ/mol.',
        },
        {
          id: 'q9.5.5',
          question: 'The role of the salt bridge is to:',
          choices: [
            'carry electrons between the half-cells',
            'maintain electrical neutrality in the two beakers',
            'supply reactant ions',
            'slow down the reaction',
          ],
          correctIndex: 1,
          explanation:
            'Ions in the bridge migrate to cancel the charge imbalance that electron flow would otherwise create. Without it the voltage collapses almost instantly.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  unitTest: [
    {
      id: 'ut9.1',
      question: 'For $\\text{CaCO}_3(s) \\rightarrow \\text{CaO}(s) + \\text{CO}_2(g)$, the sign of $\\Delta S$ is:',
      choices: ['Large positive', 'Small positive', 'Negative', 'Zero'],
      correctIndex: 0,
      explanation:
        '0 mol of gas → 1 mol of gas dominates; $\\Delta S$ is strongly positive.',
    },
    {
      id: 'ut9.2',
      question: 'Which process has $\\Delta S < 0$?',
      choices: [
        'Ice melting',
        '$\\text{NaCl}(s)$ dissolving in water',
        '$2\\,\\text{NO}_2(g) \\rightarrow \\text{N}_2\\text{O}_4(g)$',
        'Sublimation of dry ice',
      ],
      correctIndex: 2,
      explanation:
        '2 mol of gas → 1 mol of gas. Fewer gas moles on the product side makes $\\Delta S$ negative.',
    },
    {
      id: 'ut9.3',
      question: 'The statement "$S = 0$ for a perfect crystal at 0 K" is:',
      choices: [
        'the first law',
        'the second law',
        'the third law',
        'Hess\'s law',
      ],
      correctIndex: 2,
      explanation:
        'Third law of thermodynamics. One microstate → $S = k_B \\ln 1 = 0$.',
    },
    {
      id: 'ut9.4',
      question:
        'A reaction has $\\Delta H = +40.0$ kJ/mol and $\\Delta S = +160$ J/(mol·K). Its crossover temperature is closest to:',
      choices: ['100 K', '250 K', '400 K', '640 K'],
      correctIndex: 1,
      explanation:
        '$T = \\Delta H / \\Delta S = 40{,}000 / 160 = 250$ K.',
    },
    {
      id: 'ut9.5',
      question: 'At the melting point of a solid, $\\Delta G$ for the melting process is:',
      choices: ['negative', 'positive', 'zero', 'equal to $\\Delta H$'],
      correctIndex: 2,
      explanation:
        'Phase coexistence → equilibrium → $\\Delta G = 0$. That gives $T_{\\text{m}} = \\Delta H / \\Delta S$.',
    },
    {
      id: 'ut9.6',
      question: 'Which combination guarantees spontaneity at every temperature?',
      choices: [
        '$\\Delta H < 0$, $\\Delta S < 0$',
        '$\\Delta H > 0$, $\\Delta S > 0$',
        '$\\Delta H < 0$, $\\Delta S > 0$',
        '$\\Delta H > 0$, $\\Delta S < 0$',
      ],
      correctIndex: 2,
      explanation:
        'Exothermic ($-\\Delta H$) and entropy-gaining ($+\\Delta S$): $\\Delta G = \\Delta H - T\\Delta S$ is negative for any $T > 0$.',
    },
    {
      id: 'ut9.7',
      question: 'A reaction with $\\Delta G < 0$ that appears not to proceed at 25 °C is best described as:',
      choices: [
        'at equilibrium',
        'under kinetic control',
        'endothermic',
        'under thermodynamic control',
      ],
      correctIndex: 1,
      explanation:
        'Thermodynamics says "go"; a large $E_a$ makes the rate vanishingly slow at 25 °C.',
    },
    {
      id: 'ut9.8',
      question: 'A catalyst affects which of the following?',
      choices: [
        'the sign of $\\Delta G$',
        'the equilibrium constant',
        'the activation energy',
        'the value of $\\Delta H$',
      ],
      correctIndex: 2,
      explanation:
        'Catalysts lower $E_a$ for both directions — thermodynamic quantities like $\\Delta G$, $\\Delta H$, and $K$ are untouched.',
    },
    {
      id: 'ut9.9',
      question:
        'At 298 K, a reaction has $K = 100$. $\\Delta G^{\\circ}$ is approximately:',
      choices: ['−11.4 kJ/mol', '−5.7 kJ/mol', '+5.7 kJ/mol', '+11.4 kJ/mol'],
      correctIndex: 0,
      explanation:
        '$\\Delta G^{\\circ} = -RT\\ln K = -(8.314)(298)\\ln(100) \\approx -(2478)(4.605) \\approx -11{,}400$ J/mol.',
    },
    {
      id: 'ut9.10',
      question: 'If $\\Delta G^{\\circ} > 0$, then $K$ is:',
      choices: ['$>1$', '$<1$', '$= 1$', '$= 0$'],
      correctIndex: 1,
      explanation:
        'Positive $\\Delta G^{\\circ}$ makes $\\ln K < 0$, so $K < 1$: reactants are favored at equilibrium.',
    },
    {
      id: 'ut9.11',
      question: 'A reaction mixture has $Q > K$. The reaction will:',
      choices: [
        'run forward; $\\Delta G < 0$',
        'run reverse; $\\Delta G > 0$',
        'already be at equilibrium',
        'stop entirely',
      ],
      correctIndex: 1,
      explanation:
        '$Q > K$ means too many products → reaction runs in reverse. $\\Delta G = \\Delta G^{\\circ} + RT\\ln Q$ is positive.',
    },
    {
      id: 'ut9.12',
      question: 'In the cell Zn | Zn²⁺ ‖ Cu²⁺ | Cu, the anode is:',
      choices: [
        'Zn; electrons leave the cell there',
        'Cu; electrons leave the cell there',
        'Zn; electrons arrive there',
        'the salt bridge',
      ],
      correctIndex: 0,
      explanation:
        'Oxidation at Zn (anode), reduction at Cu (cathode). Electrons flow out of Zn through the wire.',
    },
    {
      id: 'ut9.13',
      question:
        'Given $E^{\\circ}(\\text{Fe}^{2+}/\\text{Fe}) = -0.44$ V and $E^{\\circ}(\\text{Ag}^{+}/\\text{Ag}) = +0.80$ V, the cell voltage is:',
      choices: ['+0.36 V', '+1.24 V', '−1.24 V', '−0.36 V'],
      correctIndex: 1,
      explanation:
        'Ag⁺/Ag has higher $E^{\\circ}$, so it is cathode. $E^{\\circ}_{\\text{cell}} = 0.80 - (-0.44) = +1.24$ V.',
    },
    {
      id: 'ut9.14',
      question:
        'A cell has $E^{\\circ}_{\\text{cell}} = +1.10$ V and $n = 2$. $\\Delta G^{\\circ}$ is closest to:',
      choices: ['−53 kJ/mol', '−106 kJ/mol', '−212 kJ/mol', '−424 kJ/mol'],
      correctIndex: 2,
      explanation:
        '$\\Delta G^{\\circ} = -nFE^{\\circ} = -(2)(96{,}485)(1.10) \\approx -212{,}000$ J/mol ≈ −212 kJ/mol.',
    },
    {
      id: 'ut9.15',
      question: 'In an electrolytic cell, compared to a galvanic cell:',
      choices: [
        'oxidation moves from anode to cathode',
        '$E^{\\circ}_{\\text{cell}}$ becomes positive',
        'an external source supplies energy to drive a non-spontaneous reaction',
        'the salt bridge is no longer needed',
      ],
      correctIndex: 2,
      explanation:
        'Electrolytic cells pay electrical energy to force a reaction with $E^{\\circ}_{\\text{cell}} < 0$ (equivalently $\\Delta G^{\\circ} > 0$). Anode is still oxidation, cathode still reduction.',
    },
  ],
};
