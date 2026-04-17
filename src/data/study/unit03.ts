import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 3 · Intermolecular Forces & Properties  (AP CED weighting: 18–22%)
//
// Heavy unit. Covers how molecules touch (IMFs), the phases those touches
// produce (solids / liquids / gases), the gas law that quantifies the
// gaseous limit, the microscopic picture (KMT + Maxwell–Boltzmann), how
// mixtures dissolve, and Beer–Lambert as the workhorse concentration tool.
// ──────────────────────────────────────────────────────────────────────

// Shared diagram palette — pulls from CSS vars so diagrams invert cleanly
// between dark and light themes.
const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#5dd0ff'; // Unit 3 hue

// ──────────────────────────────────────────────────────────────────────
// Diagrams
// ──────────────────────────────────────────────────────────────────────

// IMF hierarchy (Topic 3.1)
const imfHierarchySVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .bar   { fill: ${ACCENT}; opacity: 0.85; }
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .num   { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${ACCENT}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">IMF STRENGTH · RELATIVE (kJ/mol)</text>
  <rect class="bar" x="120" y="40"  width="40"  height="20"/>
  <rect class="bar" x="120" y="72"  width="90"  height="20"/>
  <rect class="bar" x="120" y="104" width="180" height="20"/>
  <rect class="bar" x="120" y="136" width="360" height="20"/>
  <text class="lbl" x="24" y="55">LDF</text>
  <text class="lbl" x="24" y="87">Dipole-dipole</text>
  <text class="lbl" x="24" y="119">H-bond</text>
  <text class="lbl" x="24" y="151">Ion-dipole</text>
  <text class="num" x="170" y="55">0.1–10</text>
  <text class="num" x="220" y="87">5–20</text>
  <text class="num" x="310" y="119">10–40</text>
  <text class="num" x="490" y="151">40–600</text>
  <rect x="24" y="180" width="520" height="44" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="198">EXAMPLE · boiling points (K)</text>
  <text class="ex" x="40" y="216">CH₄ 112  ·  HCl 188  ·  H₂O 373  ·  NaCl(aq) → ion-dipole dominates</text>
</svg>`;

// Solids classification (Topic 3.2)
const solidTypesSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .cell  { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .hd    { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .num   { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${ACCENT}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">FOUR SOLID TYPES · WHAT HOLDS THEM TOGETHER</text>
  <rect class="cell" x="24"  y="36" width="128" height="120" rx="4"/>
  <rect class="cell" x="160" y="36" width="128" height="120" rx="4"/>
  <rect class="cell" x="296" y="36" width="128" height="120" rx="4"/>
  <rect class="cell" x="432" y="36" width="112" height="120" rx="4"/>
  <text class="hd"  x="88"  y="58" text-anchor="middle">Ionic</text>
  <text class="hd"  x="224" y="58" text-anchor="middle">Metallic</text>
  <text class="hd"  x="360" y="58" text-anchor="middle">Network</text>
  <text class="hd"  x="488" y="58" text-anchor="middle">Molecular</text>
  <text class="sub" x="88"  y="76" text-anchor="middle">cation + anion</text>
  <text class="sub" x="224" y="76" text-anchor="middle">cation sea of e⁻</text>
  <text class="sub" x="360" y="76" text-anchor="middle">covalent lattice</text>
  <text class="sub" x="488" y="76" text-anchor="middle">molecules + IMF</text>
  <text class="ex"  x="88"  y="104" text-anchor="middle">NaCl, MgO</text>
  <text class="ex"  x="224" y="104" text-anchor="middle">Cu, Fe, Na</text>
  <text class="ex"  x="360" y="104" text-anchor="middle">C(diamond), SiO₂</text>
  <text class="ex"  x="488" y="104" text-anchor="middle">ice, I₂, CO₂(s)</text>
  <text class="num" x="88"  y="128" text-anchor="middle">mp: high</text>
  <text class="num" x="224" y="128" text-anchor="middle">mp: var</text>
  <text class="num" x="360" y="128" text-anchor="middle">mp: huge</text>
  <text class="num" x="488" y="128" text-anchor="middle">mp: low</text>
  <text class="num" x="88"  y="146" text-anchor="middle">cond: aq/melt</text>
  <text class="num" x="224" y="146" text-anchor="middle">cond: yes</text>
  <text class="num" x="360" y="146" text-anchor="middle">cond: no*</text>
  <text class="num" x="488" y="146" text-anchor="middle">cond: no</text>
  <rect x="24" y="180" width="520" height="44" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="198">EXAMPLE · identification</text>
  <text class="ex" x="40" y="216">mp 801°C, conducts in water → IONIC  ·  mp 1538°C, ductile → METALLIC  ·  mp 3550°C, insulator → NETWORK</text>
</svg>`;

// Phase diagram + particle motion (Topic 3.3)
const phaseSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .curve { fill: none; stroke: ${ACCENT}; stroke-width: 1.6; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .pt    { fill: ${ACCENT}; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">PHASE DIAGRAM · P vs T</text>
  <line class="ax" x1="60" y1="180" x2="460" y2="180"/>
  <line class="ax" x1="60" y1="40"  x2="60"  y2="180"/>
  <text class="tag" x="260" y="200" text-anchor="middle">TEMPERATURE  →</text>
  <text class="tag" x="20"  y="110" transform="rotate(-90 20 110)" text-anchor="middle">PRESSURE</text>
  <path class="curve" d="M60 120 L180 100"/>
  <path class="curve" d="M180 100 L180 40"/>
  <path class="curve" d="M180 100 Q 300 120 440 60"/>
  <circle class="pt" cx="180" cy="100" r="4"/>
  <circle class="pt" cx="440" cy="60"  r="4"/>
  <text class="lbl" x="110" y="70"  text-anchor="middle">SOLID</text>
  <text class="lbl" x="260" y="70"  text-anchor="middle">LIQUID</text>
  <text class="lbl" x="380" y="150" text-anchor="middle">GAS</text>
  <text class="sub" x="180" y="120" text-anchor="middle">triple</text>
  <text class="sub" x="440" y="80"  text-anchor="middle">critical</text>
  <rect x="480" y="40" width="70" height="140" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="515" y="58" text-anchor="middle">MOTION</text>
  <text class="ex" x="515" y="80"  text-anchor="middle">solid</text>
  <text class="ex" x="515" y="95"  text-anchor="middle">vibrate</text>
  <text class="ex" x="515" y="118" text-anchor="middle">liquid</text>
  <text class="ex" x="515" y="133" text-anchor="middle">slide</text>
  <text class="ex" x="515" y="156" text-anchor="middle">gas</text>
  <text class="ex" x="515" y="171" text-anchor="middle">fly</text>
  <rect x="24" y="210" width="520" height="24" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="226">EXAMPLE · H₂O triple point: 0.01°C, 0.006 atm   ·   CO₂ triple point: −56.6°C, 5.11 atm</text>
</svg>`;

// Ideal gas law (Topic 3.4)
const idealGasSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <style>
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .hd    { font-family: Fraunces, serif; font-size: 16px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .big   { font-family: Fraunces, serif; font-size: 26px; fill: ${ACCENT}; }
      .arr   { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; opacity: 0.6; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">IDEAL GAS LAW · PV = nRT</text>
  <text class="big" x="280" y="60" text-anchor="middle">PV = nRT</text>
  <rect class="box" x="24"  y="80" width="120" height="54" rx="4"/>
  <rect class="box" x="156" y="80" width="120" height="54" rx="4"/>
  <rect class="box" x="288" y="80" width="120" height="54" rx="4"/>
  <rect class="box" x="420" y="80" width="120" height="54" rx="4"/>
  <text class="tag" x="84"  y="96"  text-anchor="middle">P · PRESSURE</text>
  <text class="tag" x="216" y="96"  text-anchor="middle">V · VOLUME</text>
  <text class="tag" x="348" y="96"  text-anchor="middle">n · MOLES</text>
  <text class="tag" x="480" y="96"  text-anchor="middle">T · TEMP</text>
  <text class="hd"  x="84"  y="116" text-anchor="middle">atm</text>
  <text class="hd"  x="216" y="116" text-anchor="middle">L</text>
  <text class="hd"  x="348" y="116" text-anchor="middle">mol</text>
  <text class="hd"  x="480" y="116" text-anchor="middle">K</text>
  <text class="sub" x="84"  y="130" text-anchor="middle">101325 Pa/atm</text>
  <text class="sub" x="216" y="130" text-anchor="middle">1000 mL = 1 L</text>
  <text class="sub" x="348" y="130" text-anchor="middle">n = m/M</text>
  <text class="sub" x="480" y="130" text-anchor="middle">°C + 273.15</text>
  <rect x="24" y="150" width="520" height="30" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="168">R = 0.0821  L·atm/(mol·K)   ·   8.314  J/(mol·K)   ·   pick R to match your units</text>
  <rect x="24" y="186" width="520" height="28" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="204">EXAMPLE · 1.00 mol at STP (273 K, 1 atm) → V = nRT/P = (1)(0.0821)(273)/1 = 22.4 L</text>
</svg>`;

// Maxwell–Boltzmann distribution (Topic 3.5)
const mbSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .cold  { fill: none; stroke: ${ACCENT}; stroke-width: 1.8; opacity: 0.9; }
      .hot   { fill: none; stroke: #ff9a4d; stroke-width: 1.8; opacity: 0.9; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">MAXWELL–BOLTZMANN · speed distribution</text>
  <line class="ax" x1="60" y1="180" x2="520" y2="180"/>
  <line class="ax" x1="60" y1="40"  x2="60"  y2="180"/>
  <path class="cold" d="M60 180 Q 120 60 180 80 Q 220 95 260 140 Q 320 178 520 180"/>
  <path class="hot"  d="M60 180 Q 160 110 240 115 Q 300 118 360 150 Q 440 176 520 180"/>
  <text class="lbl" x="150" y="74"  fill="${ACCENT}">low T</text>
  <text class="lbl" x="250" y="108" fill="#ff9a4d">high T</text>
  <text class="tag" x="260" y="200" text-anchor="middle">MOLECULAR SPEED  →</text>
  <text class="tag" x="20"  y="110" transform="rotate(-90 20 110)" text-anchor="middle">FRACTION OF MOLECULES</text>
  <text class="sub" x="180" y="96"  text-anchor="middle">peak = most-probable v</text>
  <rect x="24" y="210" width="520" height="24" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="226">EXAMPLE · heating broadens &amp; lowers peak; area under curve (total molecules) is conserved</text>
</svg>`;

// Solutions — like dissolves like (Topic 3.6)
const solutionsSVG = `
<svg viewBox="0 0 560 230" width="100%" style="max-width:560px">
  <defs>
    <style>
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .pol   { fill: ${ACCENT}; opacity: 0.75; }
      .non   { fill: #ff9a4d; opacity: 0.75; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .hd    { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .sym   { font-family: Fraunces, serif; font-size: 22px; fill: ${FG}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">LIKE DISSOLVES LIKE · polarity match</text>
  <rect class="box" x="24"  y="36" width="250" height="130" rx="6"/>
  <rect class="box" x="286" y="36" width="250" height="130" rx="6"/>
  <text class="tag" x="149" y="54"  text-anchor="middle">POLAR · POLAR</text>
  <text class="tag" x="411" y="54"  text-anchor="middle">NONPOLAR · NONPOLAR</text>
  <circle class="pol" cx="90"  cy="100" r="14"/>
  <circle class="pol" cx="140" cy="118" r="14"/>
  <circle class="pol" cx="190" cy="92"  r="14"/>
  <circle class="pol" cx="220" cy="130" r="14"/>
  <circle class="non" cx="340" cy="100" r="14"/>
  <circle class="non" cx="390" cy="118" r="14"/>
  <circle class="non" cx="440" cy="92"  r="14"/>
  <circle class="non" cx="490" cy="130" r="14"/>
  <text class="hd" x="149" y="158" text-anchor="middle">NaCl / sugar in H₂O</text>
  <text class="hd" x="411" y="158" text-anchor="middle">I₂ in hexane / oil in oil</text>
  <rect x="24" y="180" width="512" height="42" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="198">EXAMPLE · soap works because one end is polar (water), other is nonpolar (grease)</text>
  <text class="ex" x="40" y="216">mismatch (oil + water) → two layers; match → one phase</text>
</svg>`;

// Beer-Lambert (Topic 3.7)
const beerSVG = `
<svg viewBox="0 0 560 230" width="100%" style="max-width:560px">
  <defs>
    <marker id="bl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .cuvette { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .liq     { fill: ${ACCENT}; opacity: 0.35; }
      .beam    { stroke: ${ACCENT}; stroke-width: 2; fill: none; }
      .tag     { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .hd      { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .sub     { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .big     { font-family: Fraunces, serif; font-size: 22px; fill: ${ACCENT}; }
      .ex      { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">BEER–LAMBERT · A = εbc</text>
  <rect class="cuvette" x="180" y="60" width="160" height="90" rx="3"/>
  <rect class="liq"     x="184" y="64" width="152" height="82"/>
  <line class="beam" x1="80"  y1="105" x2="178" y2="105" marker-end="url(#bl-arr)"/>
  <line class="beam" x1="342" y1="105" x2="500" y2="105" marker-end="url(#bl-arr)" opacity="0.5"/>
  <text class="tag" x="80"  y="90"  >I₀ in</text>
  <text class="tag" x="500" y="90"  text-anchor="end">I out</text>
  <text class="sub" x="260" y="172" text-anchor="middle">path length b</text>
  <line x1="180" y1="160" x2="340" y2="160" stroke="${DIM}" stroke-width="0.8"/>
  <text class="big" x="260" y="200" text-anchor="middle">A = ε · b · c</text>
  <rect x="24" y="210" width="512" height="18" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="222">EXAMPLE · ε=2500 M⁻¹cm⁻¹, b=1.00 cm, c=4.0×10⁻⁴ M → A = 2500·1·4.0e-4 = 1.00</text>
</svg>`;

// ──────────────────────────────────────────────────────────────────────
// UNIT 3 STUDY GUIDE
// ──────────────────────────────────────────────────────────────────────

export const UNIT_03: UnitStudyGuide = {
  unitSlug: 'intermolecular-forces',

  topics: [
    // ────────────────── 3.1  Intermolecular Forces ──────────────────
    {
      topicId: '3.1',
      overview:
        'Everything physical about a substance — its boiling point, viscosity, surface tension — comes from how strongly its molecules attract each other. Those attractions are the IMFs.',
      lead: [
        {
          heading: 'Intra vs inter: don\'t confuse them',
          body:
            'A covalent or ionic bond is an $\\textit{intra}$molecular force — it holds atoms $\\textit{inside}$ a molecule together. An intermolecular force (IMF) is the much weaker attraction $\\textit{between}$ molecules. Boiling water separates molecules from each other (break IMFs, ~41 kJ/mol); it does $\\textit{not}$ break the O–H bonds inside $\\text{H}_2\\text{O}$ (~460 kJ/mol).',
          svg: imfHierarchySVG,
        },
        {
          heading: 'The four IMFs, weakest to strongest',
          body:
            'London dispersion forces (LDF) appear in $\\textit{every}$ molecule — they come from momentary electron pileups that induce dipoles in neighbors. Dipole–dipole works when a molecule has a permanent dipole (polar). Hydrogen bonding is the turbo-charged dipole-dipole that appears when H is bonded to N, O, or F. Ion–dipole appears when an ion sits in a polar solvent (e.g. $\\text{Na}^{+}$ in water).',
          formula: '\\text{LDF} \\;<\\; \\text{dipole-dipole} \\;<\\; \\text{H-bond} \\;<\\; \\text{ion-dipole}',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'Swap molecules and watch which IMFs turn on. The widget reports the dominant IMF and a relative strength bar.',
        tryThis: [
          'Compare $\\text{CH}_4$ vs $\\text{CCl}_4$ — both nonpolar, but one is much bigger.',
          'Compare $\\text{H}_2\\text{O}$ vs $\\text{H}_2\\text{S}$ — same group, but H-bonding only applies to one.',
          'Compare $\\text{HCl}$ vs $\\text{HBr}$ — where does dipole lose to size?',
        ],
        observe: [
          'LDF strength scales with molar mass (more electrons → bigger induced dipole).',
          'Hydrogen bonding only activates for N–H, O–H, or F–H donors.',
          'When LDF wins over a weak dipole (HCl vs HBr above ~20 g/mol difference), the bigger molecule boils higher even if less polar.',
        ],
      },
      notes: [
        {
          heading: 'Predicting boiling point from IMF',
          body:
            'Boiling requires breaking all IMFs at once. Stronger IMF → higher BP. Apply the hierarchy from top down: (1) are these ionic or ion-dipole? (2) H-bonding present? (3) permanent dipole? (4) otherwise, compare LDFs by size/shape. A long skinny molecule has more surface contact than a compact one of the same mass, so $n$-pentane boils higher than neopentane.',
          callout:
            'Hydrogen bonding REQUIRES H directly bonded to N, O, or F. $\\text{CH}_4$ has no H-bonding — C is not electronegative enough. "N, O, F" is the only rule worth memorising here.',
        },
        {
          heading: 'Worked example · rank BPs',
          body:
            'Rank $\\text{CH}_4$, $\\text{HCl}$, $\\text{H}_2\\text{O}$, $\\text{NaCl}$ by boiling point. NaCl is ionic (not even an IMF — full ionic bonds, BP ~1465°C). Of the molecules, $\\text{H}_2\\text{O}$ has H-bonding (373 K), $\\text{HCl}$ has dipole-dipole (188 K), $\\text{CH}_4$ has only LDF (112 K). Order: $\\text{CH}_4 < \\text{HCl} < \\text{H}_2\\text{O} < \\text{NaCl}$.',
          formula: '\\text{BP}:\\;\\text{CH}_4\\,(112) < \\text{HCl}\\,(188) < \\text{H}_2\\text{O}\\,(373) < \\text{NaCl}\\,(1738)\\;\\text{K}',
        },
        {
          heading: 'Worked example · $n$-pentane vs neopentane',
          body:
            'Both are $\\text{C}_5\\text{H}_{12}$, both nonpolar, same molar mass (72 g/mol) — so only LDF. But $n$-pentane is a long chain (more surface area for molecules to touch) while neopentane is a compact sphere (less contact). Surface area wins: $n$-pentane BP 36°C, neopentane BP 9.5°C. Shape matters for LDF.',
        },
      ],
      mcqs: [
        {
          id: 'q3.1.1',
          question: 'Which substance exhibits hydrogen bonding in the pure liquid?',
          choices: ['$\\text{CH}_3\\text{F}$', '$\\text{CH}_3\\text{OH}$', '$\\text{CH}_3\\text{Cl}$', '$\\text{H}_2\\text{S}$'],
          correctIndex: 1,
          explanation:
            'H-bonding requires H bonded directly to N, O, or F. Methanol has O–H. $\\text{CH}_3\\text{F}$ has C–H and C–F but no H–F bond. $\\text{H}_2\\text{S}$ has H–S (S is not in the NOF club).',
        },
        {
          id: 'q3.1.2',
          question: 'Why does $\\text{Br}_2$ boil higher (332 K) than $\\text{Cl}_2$ (239 K) even though both are nonpolar?',
          choices: [
            'Br is more electronegative.',
            '$\\text{Br}_2$ has hydrogen bonding.',
            '$\\text{Br}_2$ has more electrons, so stronger LDF.',
            '$\\text{Cl}_2$ has a permanent dipole.',
          ],
          correctIndex: 2,
          explanation:
            'Both are nonpolar diatomics — only LDF. LDF scales with polarizability, which grows with electron count. $\\text{Br}_2$ has more electrons, hence stronger LDF, higher BP.',
        },
        {
          id: 'q3.1.3',
          question: 'The dominant IMF in a solution of KCl dissolved in water is:',
          choices: ['LDF', 'Dipole-dipole', 'Hydrogen bonding', 'Ion-dipole'],
          correctIndex: 3,
          explanation:
            '$\\text{K}^{+}$ and $\\text{Cl}^{-}$ ions attract the polar $\\text{H}_2\\text{O}$ dipoles. Ion-dipole is what makes ionic solids dissolve in polar solvents.',
        },
        {
          id: 'q3.1.4',
          question:
            'Both $n$-pentane and neopentane have formula $\\text{C}_5\\text{H}_{12}$. Why does $n$-pentane boil higher?',
          choices: [
            'It is more polar.',
            'Its chain shape gives more surface contact, strengthening LDF.',
            'It has hydrogen bonding.',
            'Neopentane is ionic.',
          ],
          correctIndex: 1,
          explanation:
            'Same formula, same molar mass, both nonpolar — IMF is LDF only. Elongated shape allows more contact between molecules, boosting LDF. Surface area matters, not just mass.',
        },
        {
          id: 'q3.1.5',
          question: 'Which pair\'s IMF comparison is INCORRECT?',
          choices: [
            '$\\text{H}_2\\text{O}$ has stronger IMF than $\\text{H}_2\\text{S}$ (H-bond vs dipole).',
            '$\\text{CO}_2$ has stronger IMF than $\\text{N}_2$ (bigger, more LDF).',
            '$\\text{HF}$ has stronger IMF than $\\text{HCl}$ (H-bond vs dipole).',
            '$\\text{NH}_3$ has stronger IMF than $\\text{PH}_3$ because $\\text{PH}_3$ is nonpolar.',
          ],
          correctIndex: 3,
          explanation:
            '$\\text{PH}_3$ is in fact slightly polar (pyramidal), but the real reason $\\text{NH}_3$ boils higher is H-bonding via N–H. The stated reason is wrong — $\\text{PH}_3$ is not purely nonpolar.',
        },
      ],
    },

    // ────────────────── 3.2  Properties of Solids ──────────────────
    {
      topicId: '3.2',
      overview:
        'The macroscopic properties of a solid — melting point, conductivity, hardness, solubility — are fingerprints of what holds the particles together.',
      lead: [
        {
          heading: 'Four types of solid',
          body:
            'Ionic (cations + anions in a lattice), metallic (cations in a sea of delocalized electrons), covalent network (atoms linked by covalent bonds throughout the entire crystal), and molecular (discrete molecules held by IMFs). The holding force — Coulomb, metallic, covalent, IMF — sets every property that follows.',
          svg: solidTypesSVG,
        },
        {
          heading: 'Three diagnostic tests',
          body:
            'Three measurements separate almost every solid: melting point (how strong is the bonding?), electrical conductivity as solid / liquid / aqueous (are there mobile charge carriers?), and hardness/brittleness. Ionic solids conduct only when melted or dissolved — the ions have to move. Metals conduct everywhere because the electron sea is already mobile.',
          callout:
            'Network covalent solids (diamond, quartz, $\\text{SiO}_2$) have the highest melting points of all — you must break covalent bonds to melt them, not just IMFs.',
        },
      ],
      notes: [
        {
          heading: 'Metallic bonding and alloys',
          body:
            'A metal is a lattice of cations with delocalized valence electrons flowing through. This "sea" explains malleability (planes slide without breaking the bond), ductility (can be drawn into wires), and high conductivity. Alloys come in two flavours: substitutional (similar-size atoms swap lattice sites — brass = Cu + Zn) and interstitial (small atoms fill gaps — steel = Fe with C in the gaps, making it much harder).',
        },
        {
          heading: 'Why NaCl is brittle but Cu is ductile',
          body:
            'Push on a copper lattice and the cations slide past each other; the electron sea flows with them, bonds intact. Push on NaCl and you shift one plane by one ion — suddenly like charges line up next to each other and the crystal flies apart by Coulomb repulsion. Same Coulomb force, opposite consequence.',
        },
        {
          heading: 'Worked example · identify the solid',
          body:
            'A solid melts at 1084°C, conducts electricity as a solid, is malleable and dense. What type? High but not extreme mp (rules out network), conducts as a solid (rules out ionic and molecular — they don\'t conduct as solids), malleable (rules out brittle ionic). → METALLIC. It\'s copper.',
          formula: '\\text{metallic}:\\; \\text{high mp}\\;+\\;\\text{conducts(s)}\\;+\\;\\text{malleable}',
        },
        {
          heading: 'Worked example · NaCl vs MgO melting points',
          body:
            'NaCl melts at 801°C; MgO at 2852°C. Same lattice type (rock salt), so compare charges and size. MgO has $\\pm 2$ charges (NaCl has $\\pm 1$), giving 4× the Coulomb force. MgO ions are also smaller, shrinking $d$ further. Lattice energy $U \\propto |q_1 q_2|/d$ — MgO wins on both factors, so far more thermal energy is needed to melt it.',
          formula: 'U_{\\text{lattice}} \\propto \\dfrac{|q_1\\, q_2|}{d}',
        },
      ],
      mcqs: [
        {
          id: 'q3.2.1',
          question: 'A solid has mp = 3550°C and is an electrical insulator. It is most likely:',
          choices: ['Ionic', 'Metallic', 'Network covalent', 'Molecular'],
          correctIndex: 2,
          explanation:
            'Extremely high mp AND insulator — diamond-like network covalent. Ionic would conduct when molten; metallic would conduct as a solid.',
        },
        {
          id: 'q3.2.2',
          question: 'Which solid would conduct electricity when DISSOLVED IN WATER but NOT as a solid?',
          choices: ['Cu', 'NaCl', 'Diamond', 'Solid $\\text{CO}_2$ (dry ice)'],
          correctIndex: 1,
          explanation:
            'Ionic solids have fixed ions — no conduction as solid. Dissolving frees the ions to carry charge. Cu conducts as a solid. Diamond and dry ice don\'t conduct at all.',
        },
        {
          id: 'q3.2.3',
          question: 'Steel is harder than pure iron because:',
          choices: [
            'Iron forms covalent bonds with carbon.',
            'Carbon atoms fit into interstitial sites and lock iron planes from sliding.',
            'Steel is ionic.',
            'Carbon is heavier than iron.',
          ],
          correctIndex: 1,
          explanation:
            'Interstitial alloy: small C atoms slot into gaps in the Fe lattice, jamming the planes so they resist sliding. The metallic bond is still there, but brittleness/hardness rises.',
        },
        {
          id: 'q3.2.4',
          question: 'Rank melting points low → high: dry ice ($\\text{CO}_2$), NaCl, MgO, $\\text{SiO}_2$.',
          choices: [
            '$\\text{CO}_2 < \\text{NaCl} < \\text{MgO} < \\text{SiO}_2$',
            '$\\text{NaCl} < \\text{CO}_2 < \\text{MgO} < \\text{SiO}_2$',
            '$\\text{CO}_2 < \\text{SiO}_2 < \\text{NaCl} < \\text{MgO}$',
            '$\\text{MgO} < \\text{NaCl} < \\text{SiO}_2 < \\text{CO}_2$',
          ],
          correctIndex: 0,
          explanation:
            'Molecular (weak IMF, lowest) → ionic ±1 → ionic ±2 → network covalent (highest). $\\text{CO}_2$ −78°C, NaCl 801°C, MgO 2852°C, $\\text{SiO}_2$ ~1710°C (close to MgO; network bonds are huge).',
        },
        {
          id: 'q3.2.5',
          question: 'Which of these explains why metals are malleable?',
          choices: [
            'Fixed directional covalent bonds.',
            'Delocalized electrons allow cation layers to slip without breaking bonds.',
            'Metallic atoms are all the same size.',
            'Electrostatic repulsion between cations is weak.',
          ],
          correctIndex: 1,
          explanation:
            'The "electron sea" is non-directional — planes of cations can slide and the bonding re-forms instantly in the new geometry. Contrast ionic solids (shift one plane, like-charges meet, shatter).',
        },
      ],
    },

    // ────────────────── 3.3  Solids, Liquids, Gases ──────────────────
    {
      topicId: '3.3',
      overview:
        'Temperature adds kinetic energy; IMF sets how much KE it takes to break apart. The phase that wins is the balance between the two.',
      lead: [
        {
          heading: 'Three phases, three behaviours',
          body:
            'In a solid, particles vibrate in fixed positions — IMFs dominate. In a liquid, particles still touch but slide past each other — roughly equal balance. In a gas, particles fly freely with negligible interaction — kinetic energy dominates. Raising $T$ or lowering $P$ pushes the balance toward the gas side.',
          svg: phaseSVG,
        },
        {
          heading: 'Phase transitions cost energy',
          body:
            'Melting (fusion), boiling (vaporisation), and sublimation all require heat — $\\Delta H_{\\text{fus}}$ or $\\Delta H_{\\text{vap}}$. That energy goes entirely into breaking IMFs; temperature does $\\textit{not}$ change during a phase transition. A heating curve shows flat plateaus at the mp and bp because all added $q$ is going into overcoming IMF, not into speeding up the particles.',
          formula: 'q_{\\text{phase}} = n \\cdot \\Delta H_{\\text{transition}}',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Start at low $T$ and crank it up. Watch the particles go from lattice → slosh → free flight.',
          'Pause at the melting plateau and verify the temperature is flat while energy keeps flowing in.',
          'Lower the pressure at a fixed $T$ below bp — watch boiling start without raising temperature.',
        ],
        observe: [
          'During a phase transition, average KE (temperature) is constant; potential energy is what changes.',
          'At higher pressure, boiling point rises — fewer molecules have enough KE to overcome both the IMF and the external pressure.',
          'Sublimation (solid → gas) happens when the curve crosses solid/gas directly, e.g. dry ice at 1 atm.',
        ],
      },
      notes: [
        {
          heading: 'Reading a phase diagram',
          body:
            'Axes are $P$ vs $T$. Lines are the boundaries: solid-liquid (fusion curve, usually nearly vertical, slightly positive slope — for water, slightly $\\textit{negative}$), liquid-gas (vaporisation curve), solid-gas (sublimation curve). Triple point: all three phases coexist. Critical point: above this $T$ and $P$, liquid and gas become indistinguishable (supercritical fluid).',
          callout:
            'Water\'s solid-liquid line slopes the "wrong way" — ice is $\\textit{less}$ dense than liquid water, so increasing pressure on ice melts it. Almost every other substance does the opposite.',
        },
        {
          heading: 'Vapour pressure and boiling',
          body:
            'Every liquid has a vapour pressure — the equilibrium pressure of its gas phase. Boiling happens when vapour pressure equals the external pressure. So: raise external $P$, you need higher $T$ to hit it (pressure cooker). Lower external $P$ (at altitude), water boils below 100°C — which is why it\'s hard to cook pasta on Mt. Everest.',
        },
        {
          heading: 'Worked example · heating curve energy',
          body:
            'How much heat to convert 36.0 g of ice at 0°C to liquid water at 0°C? That\'s pure fusion — no temperature change. $n = 36.0/18.0 = 2.00$ mol. $\\Delta H_{\\text{fus}}$(water) $= 6.01$ kJ/mol. $q = 2.00 \\times 6.01 = 12.0$ kJ. Only the phase, not $T$, changes.',
          formula: 'q = n\\,\\Delta H_{\\text{fus}} = (2.00)(6.01) = 12.0\\;\\text{kJ}',
        },
        {
          heading: 'Worked example · why $\\Delta H_{\\text{vap}} \\gg \\Delta H_{\\text{fus}}$',
          body:
            'For water, fusion costs 6.01 kJ/mol but vaporisation costs 40.7 kJ/mol. Melting only loosens the lattice — molecules still touch. Vaporising breaks almost every IMF at once and separates molecules to essentially infinite distance. Far more IMFs to break → far more energy.',
        },
      ],
      mcqs: [
        {
          id: 'q3.3.1',
          question: 'During the melting of ice at 0°C, which statement is TRUE?',
          choices: [
            'Temperature rises as heat is added.',
            'Kinetic energy rises; potential energy is constant.',
            'Potential energy rises as IMFs are broken; temperature is constant.',
            'Both $T$ and KE rise together.',
          ],
          correctIndex: 2,
          explanation:
            'Phase changes are flat on a heating curve. Added heat goes into breaking IMFs (potential energy rises). Temperature — a proxy for average KE — does not change until the phase change is complete.',
        },
        {
          id: 'q3.3.2',
          question: 'Liquid water at 100°C and 1 atm is in equilibrium with steam. If external $P$ drops to 0.5 atm, the boiling point:',
          choices: ['rises above 100°C', 'falls below 100°C', 'stays at 100°C', 'depends on the volume'],
          correctIndex: 1,
          explanation:
            'Boiling occurs when vapour pressure = external pressure. Lower external $P$ → vapour pressure matches at a lower temperature → bp falls.',
        },
        {
          id: 'q3.3.3',
          question: 'On a standard phase diagram, the triple point is the unique (T, P) where:',
          choices: [
            'Only solid exists.',
            'Solid, liquid, and gas coexist in equilibrium.',
            'Liquid and gas become one supercritical phase.',
            'The substance decomposes.',
          ],
          correctIndex: 1,
          explanation:
            'Triple point = intersection of all three boundary curves — all three phases present at once. Critical point (different) is where liquid/gas merge into supercritical fluid.',
        },
        {
          id: 'q3.3.4',
          question: 'How much heat is required to melt 90.0 g of ice at 0°C? ($\\Delta H_{\\text{fus}} = 6.01$ kJ/mol)',
          choices: ['27.0 kJ', '30.0 kJ', '60.1 kJ', '90.0 kJ'],
          correctIndex: 1,
          explanation:
            '$n = 90.0/18.0 = 5.00$ mol; $q = 5.00 \\times 6.01 = 30.05 \\approx 30.0$ kJ.',
        },
        {
          id: 'q3.3.5',
          question: 'Dry ice (solid $\\text{CO}_2$) sublimes at 1 atm because:',
          choices: [
            '$\\text{CO}_2$ is a polar molecule.',
            'At 1 atm, $\\text{CO}_2$ has no stable liquid phase — the solid-gas line crosses 1 atm directly.',
            'It reacts with air.',
            'Atmospheric pressure is below its triple point.',
          ],
          correctIndex: 3,
          explanation:
            'Triple point of $\\text{CO}_2$ is at 5.11 atm. At 1 atm (below triple), liquid $\\text{CO}_2$ can\'t exist — solid goes straight to gas. (Choice 2 says the same thing in different words, but the canonical AP reason is "below triple point pressure".)',
        },
      ],
    },

    // ────────────────── 3.4  Ideal Gas Law ──────────────────
    {
      topicId: '3.4',
      overview:
        'An ideal gas is a simple model: point particles, no IMFs, elastic collisions. One equation, $PV = nRT$, ties pressure, volume, temperature, and mole count into a single relationship.',
      lead: [
        {
          heading: 'One law, four variables',
          body:
            'The ideal gas law $PV = nRT$ links pressure $P$, volume $V$, moles $n$, and temperature $T$ using the gas constant $R$. It follows from combining Boyle ($P \\propto 1/V$), Charles ($V \\propto T$), and Avogadro ($V \\propto n$) into one statement. Always check units: use $R = 0.0821\\;\\text{L·atm/(mol·K)}$ with L, atm, K, or $R = 8.314\\;\\text{J/(mol·K)}$ with SI units.',
          svg: idealGasSVG,
          formula: 'PV = nRT',
        },
        {
          heading: 'Combined and partial laws',
          body:
            'For a fixed amount of gas moving between two states: $\\dfrac{P_1 V_1}{T_1} = \\dfrac{P_2 V_2}{T_2}$. For mixtures, Dalton: total pressure is the sum of partial pressures, $P_{\\text{total}} = \\sum P_i$, and each partial is the mole fraction times total, $P_i = x_i P_{\\text{total}}$.',
          callout:
            'ALWAYS use Kelvin for $T$. Celsius silently breaks the law — ratios of $T$ in °C are meaningless (0°C is not "zero temperature").',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Hold $n$ and $T$ fixed; change $V$. Watch $P$ move inversely (Boyle).',
          'Hold $n$ and $P$ fixed; ramp $T$. Watch $V$ grow linearly in K (Charles).',
          'Inject more particles at fixed $V$ and $T$. Watch $P$ climb (Avogadro in $P$ form).',
        ],
        observe: [
          'Products $PV$ stay constant along any isotherm (horizontal $T$ slider).',
          'Ratios $V/T$ stay constant along any isobar (fixed $P$).',
          'All three laws are just special cases of $PV = nRT$ with two variables frozen.',
        ],
      },
      notes: [
        {
          heading: 'Molar volume at STP',
          body:
            'At STP (IUPAC: 0°C = 273.15 K, 1 atm, though AP often uses 1 bar), 1.00 mol of any ideal gas occupies 22.4 L. Derive it: $V = nRT/P = (1)(0.0821)(273)/1 \\approx 22.4$ L. This is the single number to memorise for fast gas stoichiometry.',
          formula: 'V_{\\text{STP}} = \\dfrac{nRT}{P} = 22.4\\;\\text{L/mol}',
        },
        {
          heading: 'Density and molar mass',
          body:
            'Rearranging $PV = nRT$ and substituting $n = m/M$: $PM = \\rho RT$. So a gas\'s density $\\rho$ at given $P, T$ reveals its molar mass. A denser gas at the same conditions is heavier — that\'s why $\\text{CO}_2$ (44) pools at floor level while $\\text{He}$ (4) rises.',
          formula: '\\rho = \\dfrac{PM}{RT}',
        },
        {
          heading: 'Worked example · moles from P, V, T',
          body:
            'How many moles of $\\text{O}_2$ are in a 2.50 L container at 1.20 atm and 25°C?  $T = 298$ K. $n = PV/RT = (1.20)(2.50)/((0.0821)(298)) = 3.00/24.5 = 0.123$ mol. Check units: atm·L on top, L·atm/(mol·K)·K = L·atm/mol on bottom → mol. ✓',
          formula: 'n = \\dfrac{PV}{RT} = \\dfrac{(1.20)(2.50)}{(0.0821)(298)} = 0.123\\;\\text{mol}',
        },
        {
          heading: 'Worked example · Dalton & mole fractions',
          body:
            'A tank contains 2.0 mol $\\text{N}_2$ and 3.0 mol $\\text{O}_2$ at 5.0 atm total. Mole fractions: $x_{\\text{N}_2} = 2/5 = 0.40$; $x_{\\text{O}_2} = 0.60$. Partial pressures: $P_{\\text{N}_2} = 0.40 \\times 5.0 = 2.0$ atm; $P_{\\text{O}_2} = 3.0$ atm. They sum to 5.0 — sanity check passes.',
          formula: 'P_i = x_i\\, P_{\\text{total}}',
        },
      ],
      mcqs: [
        {
          id: 'q3.4.1',
          question: 'A 5.00 L vessel holds 0.400 mol of gas at 300 K. What is the pressure?',
          choices: ['1.97 atm', '2.00 atm', '24.6 atm', '0.500 atm'],
          correctIndex: 0,
          explanation:
            '$P = nRT/V = (0.400)(0.0821)(300)/5.00 = 9.85/5.00 = 1.97$ atm.',
        },
        {
          id: 'q3.4.2',
          question: 'A gas sample at 1.00 atm and 300 K is compressed to half volume and heated to 600 K. The new pressure is:',
          choices: ['1.00 atm', '2.00 atm', '4.00 atm', '0.500 atm'],
          correctIndex: 2,
          explanation:
            '$P_2 = P_1 (V_1/V_2)(T_2/T_1) = 1.00 \\times 2 \\times 2 = 4.00$ atm. Halving V doubles P; doubling T doubles P again.',
        },
        {
          id: 'q3.4.3',
          question: 'Which gas at STP has the LARGEST volume for 1 mole?',
          choices: ['$\\text{H}_2$', '$\\text{O}_2$', '$\\text{CO}_2$', 'All the same'],
          correctIndex: 3,
          explanation:
            'The ideal gas law has no mass term — 1 mol of any ideal gas at the same $P, T$ occupies the same volume (22.4 L at STP).',
        },
        {
          id: 'q3.4.4',
          question: 'A balloon contains 0.200 mol $\\text{He}$ and 0.300 mol $\\text{Ar}$. Total pressure = 2.00 atm. The partial pressure of $\\text{He}$ is:',
          choices: ['0.400 atm', '0.600 atm', '0.800 atm', '1.20 atm'],
          correctIndex: 2,
          explanation:
            '$x_{\\text{He}} = 0.200/0.500 = 0.40$; $P_{\\text{He}} = 0.40 \\times 2.00 = 0.80$ atm.',
        },
        {
          id: 'q3.4.5',
          question:
            'A 0.500 g sample of unknown gas occupies 250 mL at 1.00 atm and 300 K. Its molar mass is approximately:',
          choices: ['12 g/mol', '24 g/mol', '49 g/mol', '98 g/mol'],
          correctIndex: 2,
          explanation:
            '$n = PV/RT = (1)(0.250)/((0.0821)(300)) = 0.01015$ mol. $M = m/n = 0.500/0.01015 \\approx 49$ g/mol.',
        },
      ],
    },

    // ────────────────── 3.5  Kinetic Molecular Theory ──────────────────
    {
      topicId: '3.5',
      overview:
        'KMT is the microscopic picture behind $PV=nRT$. Its five postulates let you derive every gas law from first principles and tell you exactly $\\textit{where}$ ideal behaviour breaks down.',
      lead: [
        {
          heading: 'The five postulates',
          body:
            'An ideal gas is (1) a huge number of tiny particles, (2) with negligible volume compared to the container, (3) in constant random motion, (4) with no IMF attractions or repulsions, and (5) undergoing perfectly elastic collisions. Postulates 2 and 4 are the ones that break in real gases — leading to the corrections in Unit 3.4.',
          svg: mbSVG,
        },
        {
          heading: 'Temperature IS average kinetic energy',
          body:
            'Temperature is not how hot something feels — it is a direct measure of the average translational kinetic energy of its particles. At a given $T$, every ideal gas has the same $\\overline{KE}$ per molecule. Heavier molecules must therefore be slower, since $KE = \\frac{1}{2} m v^2$.',
          formula: '\\overline{KE} = \\tfrac{3}{2}\\,k_B T \\qquad v_{\\text{rms}} = \\sqrt{\\dfrac{3RT}{M}}',
          callout:
            'Two gases at the same $T$ have the same $\\overline{KE}$, not the same speed. $\\text{He}$ and $\\text{O}_2$ at 300 K both average the same KE, but He is $\\sqrt{32/4} \\approx 2.83\\times$ faster.',
        },
      ],
      notes: [
        {
          heading: 'Maxwell–Boltzmann distribution',
          body:
            'At any $T$, molecules don\'t all have the same speed — speeds follow the MB distribution, a right-skewed bell curve. Increasing $T$ broadens it, lowers and shifts the peak to higher speeds, and increases the fraction of fast molecules. This "fraction above a threshold" is exactly what governs reaction rates (Unit 5).',
        },
        {
          heading: 'Effusion and Graham\'s law',
          body:
            'Effusion is a gas escaping through a tiny hole. At the same $T$, lighter molecules effuse faster because they move faster. The rate ratio is $\\dfrac{r_1}{r_2} = \\sqrt{\\dfrac{M_2}{M_1}}$. This is how uranium was enriched — UF₆ molecules with $^{235}$U effuse marginally faster than those with $^{238}$U.',
          formula: '\\dfrac{r_1}{r_2} = \\sqrt{\\dfrac{M_2}{M_1}}',
        },
        {
          heading: 'When real gases deviate',
          body:
            'Real gases deviate from ideal at (a) HIGH pressure — particles are squeezed close and their own volume is no longer negligible, so $V_{\\text{real}} > V_{\\text{ideal}}$ once excluded-volume dominates, and (b) LOW temperature — slow-moving molecules start to feel IMFs, and attractive forces lower the effective pressure, so $P_{\\text{real}} < P_{\\text{ideal}}$. $\\text{He}$ behaves most ideally (tiny, no IMF); $\\text{NH}_3$ behaves worst (H-bonds).',
        },
        {
          heading: 'Worked example · Graham effusion',
          body:
            'How much faster does $\\text{He}$ (M = 4) effuse than $\\text{O}_2$ (M = 32)?  $r_{\\text{He}}/r_{\\text{O}_2} = \\sqrt{32/4} = \\sqrt{8} \\approx 2.83$. He effuses ~2.83× faster. If $\\text{O}_2$ takes 10 min to escape, He takes about 3.5 min.',
          formula: '\\dfrac{r_{\\text{He}}}{r_{\\text{O}_2}} = \\sqrt{\\tfrac{32}{4}} = 2.83',
        },
      ],
      mcqs: [
        {
          id: 'q3.5.1',
          question: 'At 300 K, which two gases have the same average kinetic energy per molecule?',
          choices: ['$\\text{He}$ and $\\text{Ar}$', '$\\text{H}_2$ only', 'Only gases of equal mass', 'None — heavier means more KE'],
          correctIndex: 0,
          explanation:
            '$\\overline{KE} = \\tfrac{3}{2} k_B T$ depends only on $T$. All ideal gases at the same $T$ share the same average KE; heavier ones compensate with lower speed.',
        },
        {
          id: 'q3.5.2',
          question: 'Raising the temperature of a gas sample shifts the Maxwell–Boltzmann curve how?',
          choices: [
            'Peak higher and narrower.',
            'Peak lower and broader, shifted to higher speeds.',
            'Peak unchanged, just taller.',
            'Distribution becomes a spike at one speed.',
          ],
          correctIndex: 1,
          explanation:
            'Higher $T$ spreads speeds out. The total area (molecule count) is conserved, so a wider curve must be lower. Peak shifts right.',
        },
        {
          id: 'q3.5.3',
          question: '$\\text{H}_2$ (M = 2) vs $\\text{O}_2$ (M = 32). How much faster is $\\text{H}_2$\'s rms speed at the same $T$?',
          choices: ['2×', '4×', '8×', '16×'],
          correctIndex: 1,
          explanation:
            '$v_{\\text{rms}} \\propto 1/\\sqrt{M}$. Ratio = $\\sqrt{32/2} = \\sqrt{16} = 4$.',
        },
        {
          id: 'q3.5.4',
          question: 'Real gases deviate most from ideal behaviour at:',
          choices: [
            'low P and low T',
            'high P and high T',
            'high P and low T',
            'low P and high T',
          ],
          correctIndex: 2,
          explanation:
            'Low $T$ → IMFs matter (attractive pull). High $P$ → molecular volume matters (excluded volume). Both effects are strongest together — high P, low T.',
        },
        {
          id: 'q3.5.5',
          question: 'Which of the following is NOT a KMT postulate for an ideal gas?',
          choices: [
            'Particles are in constant random motion.',
            'Collisions are perfectly elastic.',
            'Particles exert no IMF attractions.',
            'Particle volume is significant compared to the container.',
          ],
          correctIndex: 3,
          explanation:
            'Ideal gas particles are treated as point-like — negligible volume relative to the container. Failure of this postulate at high $P$ is why real gases deviate.',
        },
      ],
    },

    // ────────────────── 3.6  Solutions & Mixtures ──────────────────
    {
      topicId: '3.6',
      overview:
        'A solution is a homogeneous mixture: one substance (solute) distributed molecule-by-molecule through another (solvent). Whether it forms, and how concentrated it gets, all comes back to IMF matching.',
      lead: [
        {
          heading: 'Like dissolves like',
          body:
            'For a solute to dissolve, the solute–solvent attraction must be comparable to the solute–solute and solvent–solvent attractions you break to make room. Polar solvents dissolve polar solutes; nonpolar solvents dissolve nonpolar solutes. Mix the two and you get two layers — oil and water.',
          svg: solutionsSVG,
        },
        {
          heading: 'Molarity and the dilution equation',
          body:
            'The concentration currency in this course is molarity: $M = \\dfrac{\\text{mol solute}}{\\text{L solution}}$. When you dilute a stock, moles of solute are conserved: $M_1 V_1 = M_2 V_2$. This is the single most useful formula in lab work.',
          formula: 'M = \\dfrac{n}{V} \\qquad M_1 V_1 = M_2 V_2',
        },
      ],
      notes: [
        {
          heading: 'The three steps of dissolution',
          body:
            'To dissolve NaCl in water: (1) pull the ions apart in the lattice — costs lattice energy (endothermic). (2) push water molecules apart to make room — costs some H-bonding energy (endothermic). (3) let ions and water attract — ion-dipole attractions form (exothermic). The sum $\\Delta H_{\\text{soln}}$ decides whether dissolution is exo- or endothermic.',
          callout:
            'If solute-solvent attractions > the two energies you break, dissolution is exothermic and spontaneous. If much weaker, the solute just doesn\'t dissolve.',
        },
        {
          heading: 'Solubility trends',
          body:
            'Most ionic and molecular SOLIDS become more soluble as $T$ rises (heat helps overcome lattice energy). GASES become LESS soluble as $T$ rises (heat drives them out of solution — warm soda goes flat). Gas solubility also rises linearly with partial pressure (Henry\'s law: $C = k_H P$) — which is why soda is carbonated under pressure.',
        },
        {
          heading: 'Worked example · making a dilution',
          body:
            'You have 12.0 M HCl stock. How do you make 250 mL of 1.50 M HCl? Use $M_1 V_1 = M_2 V_2$: $(12.0)(V_1) = (1.50)(250)$ → $V_1 = 31.3$ mL of stock. Pipette 31.3 mL of 12 M HCl into a volumetric flask, then dilute to the 250 mL mark (always add acid to water, never the reverse).',
          formula: 'V_1 = \\dfrac{M_2 V_2}{M_1} = \\dfrac{(1.50)(250)}{12.0} = 31.3\\;\\text{mL}',
        },
        {
          heading: 'Worked example · % mass and molarity',
          body:
            'A 10.0% (w/w) NaCl solution has density 1.07 g/mL. Find molarity. Per 1 L (= 1070 g solution): mass NaCl = 0.100 × 1070 = 107 g; mol NaCl = 107/58.44 = 1.83 mol. Molarity = 1.83/1.00 L = 1.83 M. Two pieces of info to track: percent and density.',
        },
      ],
      mcqs: [
        {
          id: 'q3.6.1',
          question: 'Which pair forms a single-phase solution when mixed?',
          choices: [
            'Hexane + water',
            'Methanol + water',
            'Oil + vinegar',
            'Ethanol + octane... and water',
          ],
          correctIndex: 1,
          explanation:
            'Methanol ($\\text{CH}_3\\text{OH}$) has an O–H and can H-bond with water. Polar-polar match → miscible. Hexane is nonpolar (won\'t mix with water).',
        },
        {
          id: 'q3.6.2',
          question: 'How many mL of 6.0 M NaOH are needed to prepare 500 mL of 0.30 M NaOH?',
          choices: ['10 mL', '25 mL', '50 mL', '100 mL'],
          correctIndex: 1,
          explanation:
            '$V_1 = M_2 V_2/M_1 = (0.30)(500)/6.0 = 25$ mL.',
        },
        {
          id: 'q3.6.3',
          question: 'Warming an open soda causes it to go flat because:',
          choices: [
            '$\\text{CO}_2$ reacts with water at higher $T$.',
            'Solubility of gases decreases with increasing temperature.',
            'The container expands and loses gas.',
            'Sugar crystallises and displaces $\\text{CO}_2$.',
          ],
          correctIndex: 1,
          explanation:
            'Gas solubility drops with $T$ — opposite of most solids. Warmer liquid holds less dissolved gas, so $\\text{CO}_2$ escapes.',
        },
        {
          id: 'q3.6.4',
          question: 'A student mixes 50.0 mL of 0.200 M KCl with 150.0 mL of water. The final $[\\text{KCl}]$ is:',
          choices: ['0.0500 M', '0.0667 M', '0.150 M', '0.200 M'],
          correctIndex: 0,
          explanation:
            '$M_2 = M_1 V_1/V_2 = (0.200)(50.0)/(200.0) = 0.0500$ M. Moles conserved; volume quadrupled; concentration drops 4×.',
        },
        {
          id: 'q3.6.5',
          question: 'Dissolution of $\\text{NH}_4\\text{NO}_3$ in water feels COLD to the touch. This means:',
          choices: [
            '$\\Delta H_{\\text{soln}} < 0$ (exothermic)',
            '$\\Delta H_{\\text{soln}} > 0$ (endothermic)',
            'Water is reacting with the salt.',
            'No energy change occurs.',
          ],
          correctIndex: 1,
          explanation:
            'Cold solution = heat flowed FROM surroundings INTO the dissolution. That\'s endothermic. It\'s why ammonium nitrate is used in instant cold packs.',
        },
      ],
    },

    // ────────────────── 3.7  Beer–Lambert Law ──────────────────
    {
      topicId: '3.7',
      overview:
        'Shine light through a coloured solution, measure how much comes out the other side, and you know the concentration. Beer–Lambert is the equation behind almost every spectrophotometer in the world.',
      lead: [
        {
          heading: 'Absorbance is proportional to concentration',
          body:
            'Absorbance $A$ measures how much light the sample swallowed: $A = \\log_{10}(I_0/I)$. Beer–Lambert says $A$ depends linearly on three things — the molar absorptivity $\\varepsilon$ (how good this species is at absorbing this wavelength), the path length $b$ (how much sample the light crosses), and the concentration $c$.',
          svg: beerSVG,
          formula: 'A = \\varepsilon\\, b\\, c',
        },
        {
          heading: 'Why it works in practice',
          body:
            'Pick a wavelength where the analyte absorbs strongly (its $\\lambda_{\\text{max}}$). Make a calibration curve: measure $A$ for several known $c$, plot $A$ vs $c$ — you get a line through the origin with slope $\\varepsilon b$. Then drop an unknown onto the line and read off its $c$.',
          callout:
            'Beer\'s law is linear only at moderate concentrations. At high $c$, molecules start interacting and the line bends. If $A > \\sim 1.0$, dilute the sample.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Increase $c$ at fixed $b$ and $\\varepsilon$; watch $A$ climb linearly.',
          'Halve the cuvette path length; watch $A$ halve.',
          'Switch wavelength — only at $\\lambda_{\\text{max}}$ is $\\varepsilon$ large.',
        ],
        observe: [
          '$A$ is unitless; $\\varepsilon$ has units of $\\text{M}^{-1}\\text{cm}^{-1}$ so the product $\\varepsilon b c$ is dimensionless.',
          'Transmittance $T = I/I_0$ drops exponentially as $c$ rises; absorbance $A = -\\log T$ is the quantity that stays linear.',
          'A solution that absorbs red light looks green — the colour you see is the complement of the absorbed wavelength.',
        ],
      },
      notes: [
        {
          heading: 'From calibration curve to unknown',
          body:
            'Run several standards, plot $A$ vs $c$, fit a line (intercept should be ~0; if not, your blank was off). Measure the unknown\'s $A$ under identical conditions. Read $c_{\\text{unknown}} = A_{\\text{unknown}}/\\text{slope}$. The precision of the method is essentially the precision of that slope fit.',
        },
        {
          heading: 'What absorbance actually measures',
          body:
            'Every molecule the light passes has a chance of absorbing. Double the molecules (double $c$) → double the chance → double the absorbance. Double the path → double the molecules encountered → double the absorbance. That\'s why the law is multiplicative in $b$ and $c$ but additive in $\\log$ space.',
          formula: 'A = \\log_{10}\\!\\left(\\dfrac{I_0}{I}\\right) = -\\log_{10} T',
        },
        {
          heading: 'Worked example · find $c$',
          body:
            'A $\\text{Cu}^{2+}$ solution in a 1.00 cm cuvette has $A = 0.640$ at 635 nm, where $\\varepsilon = 80.0\\;\\text{M}^{-1}\\text{cm}^{-1}$. $c = A/(\\varepsilon b) = 0.640/((80.0)(1.00)) = 8.00 \\times 10^{-3}$ M.',
          formula: 'c = \\dfrac{A}{\\varepsilon b} = \\dfrac{0.640}{(80.0)(1.00)} = 8.00{\\times}10^{-3}\\;\\text{M}',
        },
        {
          heading: 'Worked example · dilution then measurement',
          body:
            'You pipette 5.00 mL of a stock into a 50.0 mL flask and dilute to the mark. The diluted sample reads $A = 0.300$. If $\\varepsilon b = 1500\\;\\text{M}^{-1}$, the stock concentration is: $c_{\\text{diluted}} = 0.300/1500 = 2.00 \\times 10^{-4}$ M. Dilution factor 50.0/5.00 = 10×, so stock = $2.00{\\times}10^{-3}$ M.',
        },
      ],
      mcqs: [
        {
          id: 'q3.7.1',
          question: 'A solution has $A = 0.500$ in a 1.00 cm cuvette at a wavelength where $\\varepsilon = 1000\\;\\text{M}^{-1}\\text{cm}^{-1}$. What is $c$?',
          choices: ['$5.0{\\times}10^{-4}$ M', '$5.0{\\times}10^{-3}$ M', '$2.0{\\times}10^{-3}$ M', '$0.500$ M'],
          correctIndex: 0,
          explanation:
            '$c = A/(\\varepsilon b) = 0.500/((1000)(1.00)) = 5.0 \\times 10^{-4}$ M.',
        },
        {
          id: 'q3.7.2',
          question: 'Doubling the concentration of absorber while keeping $b$ and $\\varepsilon$ fixed will:',
          choices: [
            'double the absorbance',
            'double the transmittance',
            'halve the absorbance',
            'have no effect (they\'re independent)',
          ],
          correctIndex: 0,
          explanation:
            'Beer–Lambert is linear in $c$. Double $c$ → double $A$. Transmittance (not $A$) drops exponentially.',
        },
        {
          id: 'q3.7.3',
          question: 'Why does a $\\text{Cu}^{2+}$(aq) solution appear blue?',
          choices: [
            'It emits blue light.',
            'It absorbs around the orange/red region, and the transmitted complement looks blue.',
            'Blue wavelengths reflect off the surface.',
            'Water is blue.',
          ],
          correctIndex: 1,
          explanation:
            'The colour you see is the complement of what\'s absorbed. Cu²⁺ has $\\lambda_{\\text{max}}$ near 620 nm (orange); removing orange from white light leaves cyan/blue.',
        },
        {
          id: 'q3.7.4',
          question: 'A calibration curve of $A$ vs $c$ gives slope $= 2500\\;\\text{M}^{-1}$. An unknown reads $A = 0.750$. Its concentration is:',
          choices: ['$3.0{\\times}10^{-4}$ M', '$3.0{\\times}10^{-3}$ M', '$1.9{\\times}10^{3}$ M', '$7.5{\\times}10^{-1}$ M'],
          correctIndex: 0,
          explanation:
            'Slope = $\\varepsilon b$. $c = A/\\text{slope} = 0.750/2500 = 3.0 \\times 10^{-4}$ M.',
        },
        {
          id: 'q3.7.5',
          question:
            'If absorbance exceeds ~1.5 for a sample, the best next step is to:',
          choices: [
            'Use a longer cuvette.',
            'Dilute the sample and re-measure.',
            'Switch to a wavelength where $\\varepsilon$ is larger.',
            'Report the value as-is — the law is always linear.',
          ],
          correctIndex: 1,
          explanation:
            'Beer–Lambert loses linearity at high $A$. Dilute by a known factor, measure in the linear region, then scale back up.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST (15 Qs) ────────────────────
  unitTest: [
    {
      id: 'ut3.1',
      question:
        'Rank the boiling points of $\\text{CH}_4$, $\\text{CH}_3\\text{OH}$, and $\\text{CH}_3\\text{F}$ low → high.',
      choices: [
        '$\\text{CH}_4 < \\text{CH}_3\\text{F} < \\text{CH}_3\\text{OH}$',
        '$\\text{CH}_3\\text{F} < \\text{CH}_4 < \\text{CH}_3\\text{OH}$',
        '$\\text{CH}_3\\text{OH} < \\text{CH}_3\\text{F} < \\text{CH}_4$',
        '$\\text{CH}_4 < \\text{CH}_3\\text{OH} < \\text{CH}_3\\text{F}$',
      ],
      correctIndex: 0,
      explanation:
        '$\\text{CH}_4$: LDF only (lowest). $\\text{CH}_3\\text{F}$: dipole-dipole (C–F polar but no H–F bond → no H-bonding). $\\text{CH}_3\\text{OH}$: H-bonding (highest).',
    },
    {
      id: 'ut3.2',
      question: 'A substance melts at 3550°C and does not conduct electricity. What type of solid is it?',
      choices: ['Ionic', 'Metallic', 'Network covalent', 'Molecular'],
      correctIndex: 2,
      explanation:
        'Extreme mp + no conductivity = covalent network (diamond-like). Breaking it requires breaking covalent bonds throughout the lattice.',
    },
    {
      id: 'ut3.3',
      question: 'During boiling of water at 100°C, the added energy goes primarily into:',
      choices: [
        'increasing the kinetic energy of the molecules',
        'breaking O–H covalent bonds',
        'breaking hydrogen bonds between molecules (potential energy)',
        'raising the temperature of the system',
      ],
      correctIndex: 2,
      explanation:
        'Phase change is flat on a heating curve: $T$ (and KE) are constant. The energy breaks IMFs — here, H-bonds — raising PE, not $T$.',
    },
    {
      id: 'ut3.4',
      question: 'A 2.50 L container holds $\\text{N}_2$ at 2.00 atm and 300 K. How many moles?',
      choices: ['0.0203', '0.203', '2.03', '0.610'],
      correctIndex: 1,
      explanation:
        '$n = PV/RT = (2.00)(2.50)/((0.0821)(300)) = 5.00/24.6 = 0.203$ mol.',
    },
    {
      id: 'ut3.5',
      question: 'A gas sample at STP has volume 11.2 L. How many moles of gas are present?',
      choices: ['0.250', '0.500', '1.00', '2.00'],
      correctIndex: 1,
      explanation:
        'At STP, 1 mol occupies 22.4 L. $n = 11.2/22.4 = 0.500$ mol.',
    },
    {
      id: 'ut3.6',
      question: 'Which gas has the highest average molecular speed at 300 K?',
      choices: ['$\\text{H}_2$', '$\\text{He}$', '$\\text{N}_2$', '$\\text{O}_2$'],
      correctIndex: 0,
      explanation:
        '$v_{\\text{rms}} \\propto 1/\\sqrt{M}$. $\\text{H}_2$ has the smallest molar mass (2 g/mol), so fastest.',
    },
    {
      id: 'ut3.7',
      question: 'Gas X effuses 1.5× faster than gas Y at the same $T$. If $M_{\\text{Y}} = 90$ g/mol, what is $M_{\\text{X}}$?',
      choices: ['40 g/mol', '60 g/mol', '135 g/mol', '20 g/mol'],
      correctIndex: 0,
      explanation:
        'Graham: $r_X/r_Y = \\sqrt{M_Y/M_X}$. $1.5 = \\sqrt{90/M_X}$ → $2.25 = 90/M_X$ → $M_X = 40$ g/mol.',
    },
    {
      id: 'ut3.8',
      question: 'At the same $T$, which real gas deviates LEAST from ideal behaviour?',
      choices: ['$\\text{H}_2\\text{O}$', '$\\text{NH}_3$', '$\\text{He}$', '$\\text{CO}_2$'],
      correctIndex: 2,
      explanation:
        'He is tiny (small excluded volume) and has only the weakest LDF (no meaningful IMF). Both postulates holding → closest to ideal.',
    },
    {
      id: 'ut3.9',
      question: 'A container of $\\text{O}_2$ and $\\text{N}_2$ has total pressure 3.00 atm; $P_{\\text{O}_2} = 0.90$ atm. The mole fraction of $\\text{N}_2$ is:',
      choices: ['0.10', '0.30', '0.70', '0.90'],
      correctIndex: 2,
      explanation:
        '$P_{\\text{N}_2} = 3.00 - 0.90 = 2.10$ atm. $x_{\\text{N}_2} = 2.10/3.00 = 0.70$.',
    },
    {
      id: 'ut3.10',
      question: 'You dissolve 5.85 g of NaCl (M = 58.44 g/mol) in enough water to make 250 mL of solution. The molarity is:',
      choices: ['0.100 M', '0.250 M', '0.400 M', '1.00 M'],
      correctIndex: 2,
      explanation:
        'mol NaCl = 5.85/58.44 = 0.100 mol. $M = 0.100/0.250 = 0.400$ M.',
    },
    {
      id: 'ut3.11',
      question: 'Which solvent is BEST for dissolving iodine ($\\text{I}_2$)?',
      choices: ['Water', 'Methanol', 'Ammonia', 'Hexane'],
      correctIndex: 3,
      explanation:
        '$\\text{I}_2$ is nonpolar (LDF only). Like dissolves like → nonpolar hexane wins. Water/methanol/ammonia are all polar with H-bonding, incompatible with $\\text{I}_2$.',
    },
    {
      id: 'ut3.12',
      question: 'To make 100.0 mL of 0.250 M HCl from 3.00 M stock, the volume of stock needed is:',
      choices: ['6.25 mL', '8.33 mL', '12.5 mL', '25.0 mL'],
      correctIndex: 1,
      explanation:
        '$V_1 = M_2 V_2/M_1 = (0.250)(100.0)/3.00 = 8.33$ mL.',
    },
    {
      id: 'ut3.13',
      question: 'In a Beer–Lambert analysis, $A = 0.900$ in a 2.00 cm cuvette at $\\varepsilon = 3000\\;\\text{M}^{-1}\\text{cm}^{-1}$. The concentration is:',
      choices: ['$1.5{\\times}10^{-4}$ M', '$3.0{\\times}10^{-4}$ M', '$1.5{\\times}10^{-3}$ M', '$6.0{\\times}10^{3}$ M'],
      correctIndex: 0,
      explanation:
        '$c = A/(\\varepsilon b) = 0.900/((3000)(2.00)) = 0.900/6000 = 1.5 \\times 10^{-4}$ M.',
    },
    {
      id: 'ut3.14',
      question: 'A Maxwell–Boltzmann plot for two samples of the same gas at $T_1$ and $T_2$ shows curve 1 is taller and narrower than curve 2. Which is true?',
      choices: [
        '$T_1 > T_2$',
        '$T_1 < T_2$',
        '$T_1 = T_2$ but pressure differs.',
        'One sample is a different gas.',
      ],
      correctIndex: 1,
      explanation:
        'Higher $T$ broadens and lowers the peak (shifts right). Taller/narrower means colder. $T_1 < T_2$.',
    },
    {
      id: 'ut3.15',
      question: 'Which statement about phase diagrams is CORRECT?',
      choices: [
        'The critical point is where solid, liquid, and gas coexist.',
        'Above the critical point, liquid and gas become indistinguishable.',
        'Water\'s fusion curve has a positive slope like most substances.',
        'Sublimation only happens below absolute zero.',
      ],
      correctIndex: 1,
      explanation:
        'Critical point = end of the liquid-gas curve; beyond it, you get a supercritical fluid. Triple point (not critical) is where all three phases meet. Water\'s fusion line slopes NEGATIVELY (ice is less dense).',
    },
  ],
};
