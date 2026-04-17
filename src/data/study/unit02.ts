import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 2 · Molecular & Ionic Compound Structure  (AP CED weighting: 7–9%)
//
// Topics: 2.1 Types of Chemical Bonds, 2.2 Intramolecular Force & PE,
//         2.3 Structure of Ionic Solids, 2.4 Metals & Alloys,
//         2.5 Lewis Diagrams, 2.6 Resonance & Formal Charge,
//         2.7 VSEPR & Hybridization.
// Same layout pattern as Unit 1: overview + lead + interact + notes + mcqs,
// followed by a 15-question unit test at the end.
// ──────────────────────────────────────────────────────────────────────

// Shared theme palette — inverts cleanly between light and dark.
const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#a78bfa'; // Unit 2 hue (violet)

// ───────────────── 2.1 · Bond-type triangle ─────────────────
const bondTypeSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <style>
      .edge { stroke: ${LINE}; stroke-width: 1.2; fill: none; }
      .fill { fill: ${ACCENT}; opacity: 0.08; stroke: ${ACCENT}; stroke-width: 1; }
      .tag  { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .node { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .sub  { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex   { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .axl  { font-family: 'JetBrains Mono', monospace; font-size: 10px; fill: ${ACCENT}; letter-spacing: .14em; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">BOND-TYPE TRIANGLE · ΔEN vs AVERAGE EN</text>
  <polygon class="fill" points="90,200 470,200 280,70"/>
  <circle cx="90"  cy="200" r="5" fill="${ACCENT}"/>
  <circle cx="470" cy="200" r="5" fill="${ACCENT}"/>
  <circle cx="280" cy="70"  r="5" fill="${ACCENT}"/>
  <text class="node" x="90"  y="220" text-anchor="middle">METALLIC</text>
  <text class="sub"  x="90"  y="234" text-anchor="middle">low ΔEN, low avg EN</text>
  <text class="node" x="470" y="220" text-anchor="middle">COVALENT</text>
  <text class="sub"  x="470" y="234" text-anchor="middle">low ΔEN, high avg EN</text>
  <text class="node" x="280" y="58" text-anchor="middle">IONIC</text>
  <text class="sub"  x="280" y="44" text-anchor="middle">high ΔEN</text>
  <text class="axl" x="280" y="216" text-anchor="middle">ΔEN ≈ 0 (sharing)</text>
  <text class="axl" x="170" y="132" transform="rotate(-34 170 132)" text-anchor="middle">ΔEN ↑ (transfer)</text>
  <text class="axl" x="390" y="132" transform="rotate(34 390 132)" text-anchor="middle">ΔEN ↑ (transfer)</text>
  <rect x="24" y="246" width="0" height="0" fill="none"/>
</svg>`;

// ───────────────── 2.2 · Lennard-Jones-style PE curve ─────────────────
const peCurveSVG = `
<svg viewBox="0 0 560 252" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .grid  { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.4; }
      .curve { stroke: ${ACCENT}; stroke-width: 2; fill: none; }
      .dot   { fill: ${ACCENT}; }
      .lead  { stroke: ${LINE}; stroke-width: 0.8; stroke-dasharray: 2 3; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .val   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${ACCENT}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">INTRAMOLECULAR PE · BOND LENGTH IS THE MINIMUM</text>
  <line class="ax"   x1="60" y1="200" x2="540" y2="200"/>
  <line class="ax"   x1="60" y1="30"  x2="60"  y2="200"/>
  <line class="grid" x1="60" y1="130" x2="540" y2="130"/>
  <path class="curve" d="M80 50 Q 150 60 200 170 T 300 180 Q 400 182 540 182"/>
  <circle class="dot" cx="245" cy="185" r="4"/>
  <line class="lead" x1="245" y1="185" x2="245" y2="200"/>
  <line class="lead" x1="60"  y1="185" x2="245" y2="185"/>
  <text class="lbl"  x="245" y="220" text-anchor="middle">$r_e$ · bond length</text>
  <text class="val"  x="50"  y="190" text-anchor="end">−D</text>
  <text class="tag"  x="50"  y="130" text-anchor="end">0</text>
  <text class="tag"  x="540" y="220" text-anchor="end">r →</text>
  <text class="tag"  x="20"  y="110" transform="rotate(-90 20 110)" text-anchor="middle">POTENTIAL ENERGY</text>
  <text class="ex"   x="130" y="78">repulsion dominates (r &lt; r_e)</text>
  <text class="ex"   x="360" y="156">attraction tail (r &gt; r_e)</text>
  <text class="tag" x="24" y="246">EXAMPLE · H–H:  r_e = 74 pm,  D = 436 kJ/mol</text>
</svg>`;

// ───────────────── 2.3 · Ionic lattice (NaCl) ─────────────────
const ionicLatticeSVG = `
<svg viewBox="0 0 560 244" width="100%" style="max-width:560px">
  <defs>
    <style>
      .na   { fill: ${ACCENT}; }
      .cl   { fill: #4ade80; }
      .sym  { font-family: Fraunces, serif; font-size: 12px; fill: #1a1611; }
      .tag  { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ex   { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .edge { stroke: ${LINE}; stroke-width: 0.8; opacity: 0.6; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">NaCl · 6:6 ROCK-SALT LATTICE</text>
  <g transform="translate(40,40)">
    ${[0,1,2,3].map(row =>
      [0,1,2,3].map(col => {
        const x = col * 40, y = row * 40;
        const isNa = (row + col) % 2 === 0;
        return `<circle class="${isNa ? 'na' : 'cl'}" cx="${x+20}" cy="${y+20}" r="${isNa ? 14 : 16}"/>
<text class="sym" x="${x+20}" y="${y+24}" text-anchor="middle">${isNa ? 'Na⁺' : 'Cl⁻'}</text>`;
      }).join('')
    ).join('')}
    ${[0,1,2,3].map(i => `<line class="edge" x1="${i*40+20}" y1="10" x2="${i*40+20}" y2="150"/>
<line class="edge" x1="10" y1="${i*40+20}" x2="150" y2="${i*40+20}"/>`).join('')}
  </g>
  <g transform="translate(240,40)">
    <text class="tag" x="0" y="0">COORDINATION</text>
    <text class="lbl" x="0" y="22">each Na⁺ has 6 Cl⁻ neighbors</text>
    <text class="lbl" x="0" y="42">each Cl⁻ has 6 Na⁺ neighbors</text>
    <text class="tag" x="0" y="72">LATTICE ENERGY</text>
    <text class="lbl" x="0" y="94">$U \\propto \\dfrac{|q_1 q_2|}{d}$</text>
    <text class="ex"  x="0" y="116">bigger charges → stronger</text>
    <text class="ex"  x="0" y="132">smaller ions → stronger</text>
    <text class="tag" x="0" y="162">EXAMPLE</text>
    <text class="ex"  x="0" y="182">MgO (2+/2−, small)  U ≈ 3795 kJ/mol</text>
    <text class="ex"  x="0" y="198">NaCl (1+/1−, larger) U ≈ 787 kJ/mol</text>
  </g>
</svg>`;

// ───────────────── 2.4 · Metallic bonding / alloys ─────────────────
const metalsSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <style>
      .core { fill: ${ACCENT}; }
      .big  { fill: #4ade80; }
      .small{ fill: #f97316; }
      .sea  { fill: ${ACCENT}; opacity: 0.1; }
      .dot  { fill: ${FG}; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .sym  { font-family: Fraunces, serif; font-size: 11px; fill: #1a1611; }
      .ex   { font-family:'JetBrains Mono',monospace; font-size: 10px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">METALLIC · SEA OF DELOCALIZED ELECTRONS</text>
  <rect class="sea" x="24" y="32" width="160" height="110" rx="4"/>
  ${[0,1,2].map(r => [0,1,2,3].map(c =>
    `<circle class="core" cx="${44 + c*36}" cy="${52 + r*32}" r="10"/>
<text class="sym" x="${44 + c*36}" y="${56 + r*32}" text-anchor="middle">M⁺</text>`
  ).join('')).join('')}
  ${[0,1,2,3,4,5,6,7].map(i => `<circle class="dot" cx="${40 + (i%4)*36 + ((i>=4)?18:0)}" cy="${68 + Math.floor(i/4)*32}" r="2"/>`).join('')}
  <text class="lbl" x="104" y="160" text-anchor="middle">pure metal</text>
  <text class="ex"  x="104" y="176" text-anchor="middle">cations in e⁻ sea</text>
  <text class="tag" x="220" y="44">SUBSTITUTIONAL</text>
  ${[0,1,2].map(r => [0,1,2].map(c => {
    const x = 220 + c*34, y = 56 + r*32;
    const sub = (r === 1 && c === 1);
    return `<circle class="${sub ? 'big' : 'core'}" cx="${x}" cy="${y}" r="${sub ? 12 : 10}"/>`;
  }).join('')).join('')}
  <text class="ex" x="254" y="170" text-anchor="middle">similar-size atoms</text>
  <text class="ex" x="254" y="184" text-anchor="middle">swap into lattice</text>
  <text class="ex" x="254" y="198" text-anchor="middle">ex. brass (Cu/Zn)</text>
  <text class="tag" x="390" y="44">INTERSTITIAL</text>
  ${[0,1,2,3].map(r => [0,1,2,3].map(c =>
    `<circle class="core" cx="${394 + c*30}" cy="${56 + r*26}" r="8"/>`
  ).join('')).join('')}
  <circle class="small" cx="409" cy="69" r="4"/>
  <circle class="small" cx="469" cy="95" r="4"/>
  <circle class="small" cx="439" cy="121" r="4"/>
  <text class="ex" x="454" y="170" text-anchor="middle">small atom in holes</text>
  <text class="ex" x="454" y="184" text-anchor="middle">between lattice sites</text>
  <text class="ex" x="454" y="198" text-anchor="middle">ex. steel (Fe/C)</text>
</svg>`;

// ───────────────── 2.5 · Lewis diagram walkthrough (CO₂) ─────────────────
const lewisSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <style>
      .atom { font-family: Fraunces, serif; font-size: 22px; fill: ${FG}; }
      .dot  { fill: ${FG}; }
      .bond { stroke: ${FG}; stroke-width: 2; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .num  { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${ACCENT}; }
      .ex   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">LEWIS · 5-STEP RECIPE (CO₂)</text>
  <text class="num" x="24" y="48">1. count e⁻</text>
  <text class="ex"  x="24" y="64">C(4) + 2·O(6) = 16</text>
  <text class="num" x="24" y="88">2. central = lowest EN</text>
  <text class="ex"  x="24" y="104">C in middle</text>
  <text class="num" x="24" y="128">3. single bonds</text>
  <text class="ex"  x="24" y="144">uses 4 e⁻</text>
  <text class="num" x="24" y="168">4. fill outer octets</text>
  <text class="ex"  x="24" y="184">12 more → 16 total</text>
  <text class="num" x="24" y="208">5. multiple bonds if short</text>
  <g transform="translate(240,80)">
    <text class="atom" x="0"   y="8" text-anchor="middle">O</text>
    <text class="atom" x="100" y="8" text-anchor="middle">C</text>
    <text class="atom" x="200" y="8" text-anchor="middle">O</text>
    <line class="bond" x1="12"  y1="2" x2="88"  y2="2"/>
    <line class="bond" x1="12"  y1="10" x2="88" y2="10"/>
    <line class="bond" x1="112" y1="2" x2="188" y2="2"/>
    <line class="bond" x1="112" y1="10" x2="188" y2="10"/>
    <circle class="dot" cx="-12" cy="-4" r="2"/>
    <circle class="dot" cx="-12" cy="4" r="2"/>
    <circle class="dot" cx="-12" cy="12" r="2"/>
    <circle class="dot" cx="-12" cy="20" r="2"/>
    <circle class="dot" cx="212" cy="-4" r="2"/>
    <circle class="dot" cx="212" cy="4" r="2"/>
    <circle class="dot" cx="212" cy="12" r="2"/>
    <circle class="dot" cx="212" cy="20" r="2"/>
    <text class="tag"  x="100" y="48" text-anchor="middle">O=C=O · linear</text>
    <text class="ex"   x="100" y="66" text-anchor="middle">each atom has 8 e⁻</text>
  </g>
  <rect x="200" y="170" width="360" height="44" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="216" y="186">EXAMPLE · NH₃</text>
  <text class="ex"  x="216" y="205">5 + 3·1 = 8 e⁻ → 3 N–H + 1 lone pair on N</text>
</svg>`;

// ───────────────── 2.6 · Resonance + formal charge (NO₃⁻) ─────────────────
const resonanceSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="res-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .atom { font-family: Fraunces, serif; font-size: 16px; fill: ${FG}; }
      .bond { stroke: ${FG}; stroke-width: 1.6; }
      .dbl  { stroke: ${ACCENT}; stroke-width: 1.6; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .fc   { font-family:'JetBrains Mono',monospace; font-size: 10px; fill: ${ACCENT}; }
      .ex   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .arr  { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; }
      .brk  { stroke: ${LINE}; stroke-width: 0.8; stroke-dasharray: 2 3; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">NO₃⁻ · THREE RESONANCE STRUCTURES</text>
  ${[0,1,2].map(i => {
    const cx = 90 + i*170;
    const cy = 100;
    const top = i === 0, right = i === 1, left = i === 2;
    return `
    <text class="atom" x="${cx}" y="${cy+4}" text-anchor="middle">N</text>
    <text class="atom" x="${cx}" y="${cy-46}" text-anchor="middle">O</text>
    <text class="atom" x="${cx+46}" y="${cy+36}" text-anchor="middle">O</text>
    <text class="atom" x="${cx-46}" y="${cy+36}" text-anchor="middle">O</text>
    <line class="${top?'dbl':'bond'}" x1="${cx}" y1="${cy-12}" x2="${cx}" y2="${cy-36}"/>
    ${top ? `<line class="dbl" x1="${cx-3}" y1="${cy-12}" x2="${cx-3}" y2="${cy-36}"/>` : ''}
    <line class="${right?'dbl':'bond'}" x1="${cx+10}" y1="${cy+6}" x2="${cx+36}" y2="${cy+28}"/>
    ${right ? `<line class="dbl" x1="${cx+14}" y1="${cy+3}" x2="${cx+40}" y2="${cy+25}"/>` : ''}
    <line class="${left?'dbl':'bond'}" x1="${cx-10}" y1="${cy+6}" x2="${cx-36}" y2="${cy+28}"/>
    ${left ? `<line class="dbl" x1="${cx-14}" y1="${cy+3}" x2="${cx-40}" y2="${cy+25}"/>` : ''}
    <text class="fc" x="${cx}" y="${cy-62}" text-anchor="middle">${top?'0':'−1'}</text>
    <text class="fc" x="${cx+58}" y="${cy+50}">${right?'0':'−1'}</text>
    <text class="fc" x="${cx-70}" y="${cy+50}">${left?'0':'−1'}</text>
    <text class="fc" x="${cx+16}" y="${cy+2}">+1</text>`;
  }).join('')}
  <text class="tag" x="175" y="158" text-anchor="middle">⟷</text>
  <text class="tag" x="345" y="158" text-anchor="middle">⟷</text>
  <rect x="24" y="180" width="512" height="48" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="198">FORMAL CHARGE</text>
  <text class="ex"  x="40" y="216">FC = (valence e⁻) − (lone e⁻) − ½(bonding e⁻)   ·   Σ FC = overall charge (−1 here)</text>
</svg>`;

// ───────────────── 2.7 · VSEPR domain → geometry ─────────────────
const vseprSVG = `
<svg viewBox="0 0 590 260" width="100%" style="max-width:590px">
  <defs>
    <style>
      .cell { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .atom { fill: ${ACCENT}; }
      .lp   { fill: ${FG}; opacity: 0.55; }
      .bond { stroke: ${FG}; stroke-width: 1.6; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 11px; fill: ${FG}; }
      .ang  { font-family:'JetBrains Mono',monospace; font-size: 10px; fill: ${ACCENT}; }
      .ex   { font-family:'JetBrains Mono',monospace; font-size: 10px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">ELECTRON DOMAINS → MOLECULAR SHAPE</text>
  ${[
    { x: 40,  title: '2 DOMAINS',  name: 'linear',         ang: '180°', ex: 'CO₂' },
    { x: 150, title: '3 DOMAINS',  name: 'trig. planar',   ang: '120°', ex: 'BF₃' },
    { x: 260, title: '4 DOMAINS',  name: 'tetrahedral',    ang: '109.5°', ex: 'CH₄' },
    { x: 370, title: '4 (1 LP)',   name: 'trig. pyramidal',ang: '~107°', ex: 'NH₃' },
    { x: 480, title: '4 (2 LP)',   name: 'bent',           ang: '~104.5°', ex: 'H₂O' },
  ].map(d => `
    <rect class="cell" x="${d.x}" y="36" width="100" height="180" rx="4"/>
    <text class="tag" x="${d.x+50}" y="54" text-anchor="middle">${d.title}</text>
    <circle class="atom" cx="${d.x+50}" cy="118" r="8"/>`).join('')}
  <!-- linear -->
  <line class="bond" x1="64"  y1="118" x2="124" y2="118"/>
  <circle class="atom" cx="56"  cy="118" r="5"/>
  <circle class="atom" cx="124" cy="118" r="5"/>
  <!-- trig planar -->
  <line class="bond" x1="200" y1="118" x2="200" y2="78"/>
  <line class="bond" x1="200" y1="118" x2="166" y2="140"/>
  <line class="bond" x1="200" y1="118" x2="234" y2="140"/>
  <circle class="atom" cx="200" cy="74"  r="5"/>
  <circle class="atom" cx="162" cy="144" r="5"/>
  <circle class="atom" cx="238" cy="144" r="5"/>
  <!-- tetrahedral -->
  <line class="bond" x1="310" y1="118" x2="310" y2="80"/>
  <line class="bond" x1="310" y1="118" x2="280" y2="140"/>
  <line class="bond" x1="310" y1="118" x2="340" y2="140"/>
  <line class="bond" x1="310" y1="118" x2="310" y2="154"/>
  <circle class="atom" cx="310" cy="76"  r="5"/>
  <circle class="atom" cx="276" cy="144" r="5"/>
  <circle class="atom" cx="344" cy="144" r="5"/>
  <circle class="atom" cx="310" cy="158" r="5"/>
  <!-- trig pyramidal (4 dom, 1 LP up) -->
  <circle class="lp"   cx="420" cy="80"  r="7"/>
  <line class="bond" x1="420" y1="118" x2="390" y2="140"/>
  <line class="bond" x1="420" y1="118" x2="450" y2="140"/>
  <line class="bond" x1="420" y1="118" x2="420" y2="154"/>
  <circle class="atom" cx="386" cy="144" r="5"/>
  <circle class="atom" cx="454" cy="144" r="5"/>
  <circle class="atom" cx="420" cy="158" r="5"/>
  <!-- bent (4 dom, 2 LP) -->
  <circle class="lp"   cx="530" cy="82"  r="7"/>
  <circle class="lp"   cx="500" cy="100" r="7"/>
  <line class="bond" x1="530" y1="118" x2="506" y2="146"/>
  <line class="bond" x1="530" y1="118" x2="554" y2="146"/>
  <circle class="atom" cx="502" cy="150" r="5"/>
  <circle class="atom" cx="558" cy="150" r="5"/>
  ${[
    { x: 40,  name: 'linear',         ang: '180°',   ex: 'CO₂' },
    { x: 150, name: 'trig. planar',   ang: '120°',   ex: 'BF₃' },
    { x: 260, name: 'tetrahedral',    ang: '109.5°', ex: 'CH₄' },
    { x: 370, name: 'trig. pyr.',     ang: '~107°',  ex: 'NH₃' },
    { x: 480, name: 'bent',           ang: '~104.5°',ex: 'H₂O' },
  ].map(d => `
    <text class="lbl" x="${d.x+50}" y="186" text-anchor="middle">${d.name}</text>
    <text class="ang" x="${d.x+50}" y="202" text-anchor="middle">${d.ang}</text>
    <text class="ex"  x="${d.x+50}" y="214" text-anchor="middle">${d.ex}</text>`).join('')}
  <text class="tag" x="24" y="248">EXAMPLE · H₂O: 4 domains · 2 lone pairs · bent · 104.5°</text>
</svg>`;

export const UNIT_02: UnitStudyGuide = {
  unitSlug: 'molecular-structure',

  topics: [
    // ────────────────── 2.1 Types of Chemical Bonds ──────────────────
    {
      topicId: '2.1',
      overview:
        'Three bond types — ionic, covalent, metallic — come from one variable: the electronegativity difference ($\\Delta\\text{EN}$) between the bonded atoms.',
      lead: [
        {
          heading: 'One axis, three regimes',
          body:
            'Electronegativity (EN) measures how strongly an atom pulls on shared electrons. When two atoms meet, compare their ENs. Small $\\Delta\\text{EN}$ with both atoms hungry for electrons → they share equally (covalent). Small $\\Delta\\text{EN}$ with both atoms loose holders → electrons pool between nuclei (metallic). Large $\\Delta\\text{EN}$ → the hungrier atom yanks the electron right off (ionic).',
          svg: bondTypeSVG,
        },
        {
          heading: 'Rough cutoffs (use them as guides, not laws)',
          body:
            '$\\Delta\\text{EN} < 0.4$: nonpolar covalent. $0.4 \\le \\Delta\\text{EN} < 1.7$: polar covalent. $\\Delta\\text{EN} \\ge 1.7$: usually ionic. The triangle matters more than the cutoffs — a metal + nonmetal pairing is ionic almost regardless of the exact number.',
          formula: '\\Delta\\text{EN} \\;=\\; |\\text{EN}_A - \\text{EN}_B|',
        },
      ],
      notes: [
        {
          heading: 'What each bond type predicts about the substance',
          body:
            'Ionic solids: high melting point, brittle, conduct only when molten or dissolved. Molecular covalent solids: low melting, usually soft, nonconductive. Network covalent solids (diamond, SiO₂): very high melting, hard, nonconductive. Metals: malleable, ductile, conductive at all temperatures.',
          callout:
            'Conductivity test: a solid that conducts electricity is either a metal or graphite. A solid that conducts only when melted is ionic.',
        },
        {
          heading: 'Polar covalent is just a tilted share',
          body:
            'In $\\text{H–Cl}$, $\\Delta\\text{EN} \\approx 0.9$. Chlorine hogs the shared electrons without stealing them outright, giving partial charges $\\delta^{+}$ on H and $\\delta^{-}$ on Cl. A polar bond is a permanent dipole — remember it for Unit 3 (IMFs).',
        },
        {
          heading: 'Worked example · classify three bonds',
          body:
            'Given EN values H = 2.2, C = 2.55, O = 3.44, Na = 0.93, Cl = 3.16. (a) C–H: $\\Delta\\text{EN} = 0.35$ → nonpolar covalent. (b) O–H: $\\Delta\\text{EN} = 1.24$ → polar covalent. (c) Na–Cl: $\\Delta\\text{EN} = 2.23$, metal + nonmetal → ionic. Report the classification and flag the polar one as the dipole source for IMF questions.',
          formula: '\\Delta\\text{EN}(\\text{Na,Cl}) = 3.16 - 0.93 = 2.23',
        },
      ],
      mcqs: [
        {
          id: 'q2.1.1',
          question: 'The bond in $\\text{KBr}$ is best classified as:',
          choices: ['nonpolar covalent', 'polar covalent', 'ionic', 'metallic'],
          correctIndex: 2,
          explanation:
            'K is a Group 1 metal (EN $\\approx 0.82$); Br is a halogen (EN $\\approx 2.96$). $\\Delta\\text{EN} \\approx 2.1$, metal + nonmetal → ionic.',
        },
        {
          id: 'q2.1.2',
          question: 'Which property is characteristic of a metallic solid but not an ionic solid?',
          choices: [
            'Conducts electricity in the solid state.',
            'Has a high melting point.',
            'Dissolves in water to form an electrolyte.',
            'Contains cations.',
          ],
          correctIndex: 0,
          explanation:
            'Ionic solids only conduct when molten or dissolved (ions have to move). Metals conduct in the solid state because their valence electrons are delocalized.',
        },
        {
          id: 'q2.1.3',
          question: 'Rank $\\text{H–F}$, $\\text{H–Cl}$, $\\text{H–Br}$ by bond polarity, least → most polar.',
          choices: [
            '$\\text{H–F} < \\text{H–Cl} < \\text{H–Br}$',
            '$\\text{H–Br} < \\text{H–Cl} < \\text{H–F}$',
            '$\\text{H–Cl} < \\text{H–F} < \\text{H–Br}$',
            'They are equally polar.',
          ],
          correctIndex: 1,
          explanation:
            'EN rises up a group, so F > Cl > Br. $\\Delta\\text{EN}$ with H is largest for H–F. The more electronegative the halogen, the more polar the bond.',
        },
        {
          id: 'q2.1.4',
          question: 'Which bond is NONpolar covalent?',
          choices: ['$\\text{O–H}$', '$\\text{C–Cl}$', '$\\text{N–N}$', '$\\text{Na–F}$'],
          correctIndex: 2,
          explanation:
            'Two identical atoms have $\\Delta\\text{EN} = 0$, so the bond is perfectly nonpolar covalent.',
        },
        {
          id: 'q2.1.5',
          question: 'A solid is brittle, has a high melting point, and conducts only when dissolved in water. It is most likely:',
          choices: ['metallic', 'ionic', 'molecular covalent', 'network covalent'],
          correctIndex: 1,
          explanation:
            'Brittle + high melting + conducts only when dissolved = ionic. Metals conduct as solids; molecular covalents melt low; network covalents do not dissolve into ions.',
        },
      ],
    },

    // ────────────────── 2.2 Intramolecular Force & Potential Energy ──────────────────
    {
      topicId: '2.2',
      overview:
        'A covalent bond is a compromise: the nuclei attract the shared electrons, but they repel each other. The potential-energy curve is the scoreboard for that tug-of-war.',
      lead: [
        {
          heading: 'The potential-energy well',
          body:
            'Plot potential energy ($PE$) versus internuclear distance $r$. Far apart, $PE \\approx 0$ (the atoms ignore each other). As they approach, attraction pulls $PE$ downward. Push too close and nucleus-nucleus repulsion shoots $PE$ up. The lowest point of the well is the equilibrium bond length $r_e$, and its depth is the bond-dissociation energy $D$.',
          svg: peCurveSVG,
          formula: 'PE(r) \\;=\\; \\text{attraction}(r) \\;+\\; \\text{repulsion}(r)',
        },
        {
          heading: 'Bond length and bond energy, defined',
          body:
            'Bond length $r_e$ is the distance where $PE$ is minimum. Bond energy $D$ is the energy required to pull the atoms back up to $PE = 0$ — i.e. break the bond. Stronger bonds have deeper wells (larger $D$) AND usually shorter $r_e$: $\\text{C}\\equiv\\text{C}$ ($D \\approx 839$) is shorter than $\\text{C}=\\text{C}$ ($D \\approx 614$) which is shorter than $\\text{C–C}$ ($D \\approx 347$ kJ/mol).',
          callout:
            'Same-shape curve, different magnitude: this intramolecular well is 10–100× deeper than the intermolecular (IMF) well you will meet in Unit 3. The shape looks identical; only the depth differs.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget lets you drag the internuclear distance and watch the PE curve update in real time. Use it to feel where repulsion kicks in, where attraction dominates, and where the balance sits.',
        tryThis: [
          'Drag the distance slider from very large $r$ toward very small $r$. Stop when the curve turns upward.',
          'Switch between $\\text{H–H}$, $\\text{H–Cl}$, and $\\text{Cl–Cl}$ and compare well depths.',
          'Set two molecules to the same $r_e$ but different $D$, and predict which bond is stronger before reading the number.',
        ],
        observe: [
          'At $r \\gg r_e$ the curve is flat — the atoms effectively don\'t feel each other.',
          'At $r = r_e$ the slope is zero — the bond sits at the bottom of the well with no net force.',
          'At $r < r_e$ the curve shoots up steeply — repulsion grows much faster than attraction as nuclei overlap.',
          'Deeper well ↔ stronger bond ↔ bigger $D$. The $x$-position of the minimum is the bond length.',
        ],
      },
      notes: [
        {
          heading: 'Bond order controls everything',
          body:
            'Bond order counts shared pairs: single = 1, double = 2, triple = 3. Higher order means more electron density between the nuclei, deeper well (more $D$), shorter $r_e$. For the same two atoms, the order of bond strength is always triple > double > single.',
        },
        {
          heading: 'Why real bonds vibrate',
          body:
            'Atoms never sit exactly at $r_e$ — they oscillate around it (molecular vibration). The curvature of the well sets the vibrational frequency: a stiffer (narrower) well vibrates faster. This is what an IR spectrometer measures — each bond has a vibrational fingerprint.',
        },
        {
          heading: 'Worked example · which bond is stronger?',
          body:
            'Compare $\\text{C–C}$ (single, $r_e = 154$ pm, $D = 347$ kJ/mol) with $\\text{C=C}$ (double, $r_e = 134$ pm, $D = 614$ kJ/mol). The double bond is shorter and deeper: more shared electrons pull the atoms closer and the well bottom drops. If an exam gives $r_e$ without $D$, you can still predict: shorter bond between the same pair = stronger bond.',
          formula: 'r_e(\\text{C=C}) < r_e(\\text{C–C}) \\;\\Longrightarrow\\; D(\\text{C=C}) > D(\\text{C–C})',
        },
        {
          heading: 'Worked example · reading the curve',
          body:
            'A PE curve shows a minimum of $-436$ kJ/mol at $r = 74$ pm. This is $\\text{H}_2$: bond length 74 pm, bond dissociation energy 436 kJ/mol. To break 1 mol of $\\text{H}_2$ into gas-phase H atoms costs $+436$ kJ; to form it releases $-436$ kJ. The sign convention is always "energy to climb out of the well is positive".',
        },
      ],
      mcqs: [
        {
          id: 'q2.2.1',
          question: 'On a PE vs $r$ curve for a diatomic, the bond length corresponds to:',
          choices: [
            'the $r$ where $PE = 0$',
            'the $r$ where $PE$ is at its minimum',
            'the $r$ where $PE$ is at its maximum',
            'any $r$ less than $r_e$',
          ],
          correctIndex: 1,
          explanation:
            'Bond length $r_e$ is the minimum of the well — the equilibrium compromise between attraction and repulsion.',
        },
        {
          id: 'q2.2.2',
          question: 'Among $\\text{N–N}$, $\\text{N=N}$, $\\text{N}\\equiv\\text{N}$, which has the SHORTEST bond length and the LARGEST bond energy?',
          choices: [
            '$\\text{N–N}$',
            '$\\text{N=N}$',
            '$\\text{N}\\equiv\\text{N}$',
            'all three are equal',
          ],
          correctIndex: 2,
          explanation:
            'Higher bond order → more shared density between nuclei → shorter bond and deeper well. Triple bond wins on both metrics.',
        },
        {
          id: 'q2.2.3',
          question: 'As two atoms move closer than $r_e$, the potential energy:',
          choices: [
            'decreases further',
            'stays flat',
            'rises sharply due to nucleus-nucleus and electron-electron repulsion',
            'goes to zero',
          ],
          correctIndex: 2,
          explanation:
            'Past the minimum, repulsion dominates — the curve climbs steeply upward.',
        },
        {
          id: 'q2.2.4',
          question: 'A deeper PE well implies:',
          choices: [
            'a weaker bond',
            'a stronger bond',
            'a longer bond length',
            'no change in stability',
          ],
          correctIndex: 1,
          explanation:
            'Depth of the well = bond dissociation energy $D$. Deeper well ⇒ more energy needed to break the bond ⇒ stronger bond.',
        },
        {
          id: 'q2.2.5',
          question: 'Compared to intermolecular PE wells (IMF, Unit 3), an intramolecular PE well is typically:',
          choices: [
            'the same depth',
            '10–100× deeper',
            '10–100× shallower',
            'sign-inverted',
          ],
          correctIndex: 1,
          explanation:
            'Same basic shape, very different magnitude. Covalent bonds are ~100s of kJ/mol; IMFs are ~1–40 kJ/mol.',
        },
      ],
    },

    // ────────────────── 2.3 Structure of Ionic Solids ──────────────────
    {
      topicId: '2.3',
      overview:
        'An ionic solid is not a pile of molecules — it is one giant 3D array of alternating cations and anions held by Coulomb attraction. Its properties follow directly from that geometry.',
      lead: [
        {
          heading: 'A lattice, not a molecule',
          body:
            '$\\text{NaCl}$ in the solid is a cubic array where every $\\text{Na}^{+}$ is surrounded by six $\\text{Cl}^{-}$ and vice versa. The formula unit $\\text{NaCl}$ is the smallest repeating ratio, not a discrete molecule. Chemists talk about "formula units" for ionic compounds because there is no single $\\text{Na}^{+}\\text{Cl}^{-}$ pair to point to.',
          svg: ionicLatticeSVG,
        },
        {
          heading: 'Lattice energy, one more time',
          body:
            'Lattice energy $U$ is the energy released when gas-phase ions assemble into the solid. From Unit 1, $U \\propto |q_1 q_2| / d$: bigger charges raise $U$ roughly multiplicatively, smaller ions raise $U$ via smaller $d$. This single equation explains why ionic solids are hard, have high melting points, and are brittle.',
          formula: 'U_{\\text{lattice}} \\;\\propto\\; \\dfrac{|q_1\\, q_2|}{d}',
        },
      ],
      notes: [
        {
          heading: 'Why ionic solids shatter instead of bending',
          body:
            'Displace one layer by half a spacing and now $\\text{Na}^{+}$ sits next to $\\text{Na}^{+}$. Huge repulsion — the crystal cleaves along that plane. Metals, in contrast, tolerate the slip because the electron sea keeps holding the cations together (see 2.4).',
          callout:
            'Brittleness is not weakness. $\\text{MgO}$ has $U \\approx 3800$ kJ/mol — extremely strong — yet still brittle, because the failure mode is like-charge alignment, not bond rupture.',
        },
        {
          heading: 'Conductivity rules for ionic compounds',
          body:
            'Solid: does NOT conduct (ions locked in lattice sites). Molten or dissolved: DOES conduct (ions are free to migrate). This "conducts only when mobile" signature is the single most reliable test for ionicity on a free-response question.',
        },
        {
          heading: 'Worked example · rank three lattice energies',
          body:
            'Rank $\\text{NaF}$, $\\text{KF}$, $\\text{MgO}$ by lattice energy. Step 1: $\\text{MgO}$ has $\\pm 2$ charges — factor of 4 in $|q_1 q_2|$. It wins immediately. Step 2: $\\text{NaF}$ vs $\\text{KF}$: same charges, smaller cation in $\\text{NaF}$ → smaller $d$ → larger $U$. Final order (low → high): $\\text{KF} < \\text{NaF} < \\text{MgO}$. Always sort on charge first, then on ion size.',
          formula: 'U(\\text{MgO}) \\gg U(\\text{NaF}) > U(\\text{KF})',
        },
        {
          heading: 'Worked example · predicting melting point from $U$',
          body:
            'If $U(\\text{CaO}) \\approx 3414$ kJ/mol and $U(\\text{NaCl}) \\approx 787$ kJ/mol, which melts at a higher temperature? $\\text{CaO}$ — its lattice takes about four times as much energy per mole to pull apart. Experimental values agree: $\\text{CaO}$ melts near 2572 °C, $\\text{NaCl}$ at 801 °C.',
        },
      ],
      mcqs: [
        {
          id: 'q2.3.1',
          question: 'Why is solid $\\text{NaCl}$ a non-conductor, while aqueous $\\text{NaCl}$ conducts electricity?',
          choices: [
            'Water ionizes NaCl into new species.',
            'Dissolved ions are free to move; in the solid they are locked into lattice sites.',
            'Solid NaCl has no charge carriers at all.',
            'The lattice energy changes sign in water.',
          ],
          correctIndex: 1,
          explanation:
            'Conductivity needs mobile charge. The ions exist in both states; only in solution (or melt) can they migrate to carry current.',
        },
        {
          id: 'q2.3.2',
          question: 'Which pair of ions produces the LARGEST lattice energy?',
          choices: ['$\\text{Na}^{+}$ and $\\text{Cl}^{-}$', '$\\text{K}^{+}$ and $\\text{Br}^{-}$', '$\\text{Mg}^{2+}$ and $\\text{O}^{2-}$', '$\\text{Cs}^{+}$ and $\\text{I}^{-}$'],
          correctIndex: 2,
          explanation:
            '$\\text{MgO}$ has $\\pm 2$ charges and small ions — both factors push $U$ up.',
        },
        {
          id: 'q2.3.3',
          question: 'In the rock-salt structure of $\\text{NaCl}$, each $\\text{Na}^{+}$ is surrounded by how many nearest-neighbor $\\text{Cl}^{-}$ ions?',
          choices: ['2', '4', '6', '8'],
          correctIndex: 2,
          explanation:
            'Rock salt is 6-coordinate: one above, one below, and four around the equator.',
        },
        {
          id: 'q2.3.4',
          question: 'Ionic solids are brittle because:',
          choices: [
            'the bonds are weak',
            'slipping a layer brings like charges next to each other, producing strong repulsion',
            'they are made of small molecules',
            'they sublime easily',
          ],
          correctIndex: 1,
          explanation:
            'Shifting one layer aligns cations with cations (or anions with anions). The repulsion splits the crystal along that plane.',
        },
      ],
    },

    // ────────────────── 2.4 Metals & Alloys ──────────────────
    {
      topicId: '2.4',
      overview:
        'A metallic bond is a lattice of cations bathed in a shared "sea" of delocalized valence electrons. That simple picture explains conductivity, malleability, and alloying in one shot.',
      lead: [
        {
          heading: 'Sea-of-electrons model',
          body:
            'Metal atoms give up their valence electrons to a collective pool that belongs to the whole crystal. Positive cations ($\\text{M}^{n+}$) occupy fixed lattice sites; the electrons move freely among them. Because the glue is delocalized, you can slide one layer of cations over another without breaking the bond — the electrons simply follow.',
          svg: metalsSVG,
        },
        {
          heading: 'Properties, in one sentence each',
          body:
            'Electrical conductivity: mobile electrons carry current. Thermal conductivity: mobile electrons carry kinetic energy. Malleability and ductility: layers slide without bond rupture. Luster: delocalized electrons re-emit absorbed light across a broad spectrum.',
          callout:
            'More valence electrons per atom → tighter sea → stronger bond. $\\text{Na}$ (1 valence e⁻) melts at 98 °C, $\\text{Mg}$ (2) at 650 °C, $\\text{Al}$ (3) at 660 °C. The trend breaks for transition metals because $d$ electrons join the sea too.',
        },
      ],
      notes: [
        {
          heading: 'Alloy type 1 · substitutional',
          body:
            'Substitutional alloys form when the two metals have similar atomic radii (within ~15%). Foreign atoms take the place of host atoms in the lattice. Example: brass is Cu with some Zn substituted in. Substitution disrupts the regular glide of layers, which is why alloys are usually harder than the pure metal.',
        },
        {
          heading: 'Alloy type 2 · interstitial',
          body:
            'Interstitial alloys form when the guest atom is much smaller than the host. The small atom squeezes into gaps (interstices) between host atoms without replacing them. Example: steel is Fe with C atoms wedged into the Fe lattice. Interstitial atoms pin dislocations, making the alloy much harder and less ductile than pure Fe.',
          callout:
            'Quick rule: similar-size metals → substitutional; tiny non-metal (H, C, N, B) in a metal → interstitial.',
        },
        {
          heading: 'Worked example · predict the alloy type',
          body:
            'Brass is Cu + Zn. Copper ($r \\approx 128$ pm) and zinc ($r \\approx 134$ pm) differ by only ~5% — similar size, so Zn substitutes for Cu atoms. Steel is Fe + C. Iron ($r \\approx 126$ pm) is much larger than carbon ($r \\approx 70$ pm) — C fits into the gaps, so it is interstitial. Bronze (Cu + Sn) is substitutional; stainless steel (Fe + Cr + Ni + tiny C) is a mix: Cr/Ni substitute, C is interstitial.',
        },
      ],
      mcqs: [
        {
          id: 'q2.4.1',
          question: 'Metals conduct electricity in the solid state because:',
          choices: [
            'their ions are free to move',
            'their valence electrons are delocalized over the entire lattice',
            'they contain free protons',
            'they are made of molecules',
          ],
          correctIndex: 1,
          explanation:
            'The "sea of electrons" is the charge carrier. The cations stay put.',
        },
        {
          id: 'q2.4.2',
          question: 'Why is pure metal malleable?',
          choices: [
            'The bonds are ionic and easily reformed.',
            'Layers of cations can slide over one another because the electron sea is non-directional.',
            'Metallic bonds are weak.',
            'The cations are held in place by hydrogen bonding.',
          ],
          correctIndex: 1,
          explanation:
            'The bond holds the whole solid together, not a specific pair of atoms. Slipping one layer does not break it.',
        },
        {
          id: 'q2.4.3',
          question: 'Which is MOST likely an interstitial alloy?',
          choices: ['brass (Cu/Zn)', 'bronze (Cu/Sn)', 'steel (Fe/C)', 'sterling silver (Ag/Cu)'],
          correctIndex: 2,
          explanation:
            'Carbon is much smaller than iron and wedges into gaps. Brass, bronze, and sterling silver involve similar-size metals → substitutional.',
        },
        {
          id: 'q2.4.4',
          question: 'Alloys are generally harder than the pure host metal because:',
          choices: [
            'alloys have stronger metallic bonds',
            'foreign atoms disrupt the regular gliding of lattice layers',
            'alloys contain ionic bonds',
            'alloys have more electrons in the sea',
          ],
          correctIndex: 1,
          explanation:
            'Impurity atoms block dislocation motion. Layers cannot slide as freely, so the alloy resists deformation.',
        },
        {
          id: 'q2.4.5',
          question: 'Among $\\text{Na}$, $\\text{Mg}$, $\\text{Al}$, which has the HIGHEST melting point?',
          choices: ['Na', 'Mg', 'Al', 'all equal'],
          correctIndex: 2,
          explanation:
            'More valence electrons per atom → denser electron sea → stronger metallic bond. Al (3 valence e⁻) > Mg (2) > Na (1).',
        },
      ],
    },

    // ────────────────── 2.5 Lewis Diagrams ──────────────────
    {
      topicId: '2.5',
      overview:
        'A Lewis diagram is a cheap map of where every valence electron lives in a molecule. Draw it well and the rest of Unit 2 becomes arithmetic.',
      lead: [
        {
          heading: 'The 5-step recipe',
          body:
            'Step 1: add up valence electrons from every atom (add for anions, subtract for cations). Step 2: put the least electronegative atom in the center (H is never central). Step 3: connect each outer atom to the center with a single bond (each bond = 2 e⁻). Step 4: distribute remaining electrons as lone pairs on outer atoms first (octets), then the center. Step 5: if the center lacks an octet, pull lone pairs in as double or triple bonds.',
          svg: lewisSVG,
        },
        {
          heading: 'Octet rule and its exceptions',
          body:
            'Most main-group atoms want 8 valence electrons around them (2 for H, He). Three common exceptions: (a) $\\text{B}$ and $\\text{Be}$ are often electron-deficient (6 and 4 e⁻ around them); (b) odd-electron species like $\\text{NO}$ have a lone radical electron; (c) third-row and below (P, S, Cl, Xe) can have expanded octets — 10 or 12 electrons via empty $d$ orbitals nearby.',
          callout:
            'Rule of thumb: if your element is $\\text{P}$, $\\text{S}$, or past, an expanded octet is allowed. If it is period 2 ($\\text{C}$, $\\text{N}$, $\\text{O}$, $\\text{F}$), it isn\'t — stop at 8.',
        },
      ],
      notes: [
        {
          heading: 'Counting shortcut for diatomics',
          body:
            'Total e⁻ divided into bonds and lone pairs. For $\\text{N}_2$: 10 valence e⁻. One single bond leaves 8 e⁻ to place; two lone pairs on each N plus a bond gives only 6 on each — not enough. Try a triple bond ($6\\,\\text{e}^-$ between them) and one lone pair on each N: $6 + 2 + 2 = 10$ ✓. Everyone has an octet. $\\text{N}\\equiv\\text{N}$ is the answer.',
          formula: '\\text{N}_2 :\\; :\\!\\text{N}\\!\\equiv\\!\\text{N}\\!: \\qquad 10 = 6\\,(\\text{bonds}) + 2 + 2',
        },
        {
          heading: 'Central atom = lowest EN (with caveats)',
          body:
            'The atom that prefers to share (lower EN) usually sits in the middle. Hydrogen never does — it has only 1 bonding slot. For oxyanions ($\\text{NO}_3^-$, $\\text{SO}_4^{2-}$), the non-oxygen atom is central, since O has higher EN and is more comfortable on the outside holding lone pairs.',
        },
        {
          heading: 'Worked example · $\\text{H}_2\\text{O}$',
          body:
            'Step 1: valence e⁻ = $2(1) + 6 = 8$. Step 2: O in center (H can\'t be central). Step 3: two O–H bonds use 4 e⁻. Step 4: place the remaining 4 e⁻ as two lone pairs on O. Check: each H has 2 e⁻ (duet ✓), O has $2(2) + 2(2) = 8$ e⁻ (octet ✓). Total drawn = $4 + 4 = 8$ ✓.',
          formula: '\\text{H}_2\\text{O}:\\; \\text{H–}\\!\\overset{\\,\\cdot\\cdot}{\\underset{\\cdot\\cdot}{\\text{O}}}\\!\\text{–H}',
        },
        {
          heading: 'Worked example · expanded octet $\\text{SF}_6$',
          body:
            'Valence e⁻ = $6 + 6(7) = 48$. Six S–F single bonds use $12\\,\\text{e}^-$; each F needs 3 lone pairs ($6 \\times 6 = 36\\,\\text{e}^-$). Total = 48 ✓. Sulfur ends up with 12 electrons in its valence shell — a classic expanded octet, allowed because S is a third-row element.',
        },
      ],
      mcqs: [
        {
          id: 'q2.5.1',
          question: 'How many valence electrons are in the Lewis structure of $\\text{NH}_4^{+}$?',
          choices: ['7', '8', '9', '10'],
          correctIndex: 1,
          explanation:
            'N contributes 5, four H contribute 4, and the $+1$ charge removes 1. Total = $5 + 4 - 1 = 8$.',
        },
        {
          id: 'q2.5.2',
          question: 'In the Lewis structure of $\\text{CO}_2$, the bond order of each C–O bond is:',
          choices: ['1', '1.5', '2', '3'],
          correctIndex: 2,
          explanation:
            'Correct structure is $\\text{O}{=}\\text{C}{=}\\text{O}$: two double bonds, bond order 2 on each.',
        },
        {
          id: 'q2.5.3',
          question: 'Which molecule has an EXPANDED octet on its central atom?',
          choices: ['$\\text{CH}_4$', '$\\text{NH}_3$', '$\\text{H}_2\\text{O}$', '$\\text{PCl}_5$'],
          correctIndex: 3,
          explanation:
            'P is a third-row element and can hold 10 electrons (5 single bonds). C, N, and O in the other choices are period 2 — strict octet.',
        },
        {
          id: 'q2.5.4',
          question: 'In $\\text{NH}_3$, the nitrogen atom has:',
          choices: [
            'three lone pairs and no bonds',
            'three bonds and one lone pair',
            'four bonds and no lone pairs',
            'two bonds and two lone pairs',
          ],
          correctIndex: 1,
          explanation:
            'Valence e⁻ = 8. Three N–H bonds use 6 e⁻; the last 2 e⁻ sit on N as one lone pair.',
        },
        {
          id: 'q2.5.5',
          question: 'Which atom is placed at the CENTER of a Lewis diagram for $\\text{SO}_3$?',
          choices: ['S', 'O', 'either', 'neither — the structure is linear'],
          correctIndex: 0,
          explanation:
            'S has lower EN (2.58) than O (3.44), so S is central and the three oxygens hang off of it.',
        },
      ],
    },

    // ────────────────── 2.6 Resonance & Formal Charge ──────────────────
    {
      topicId: '2.6',
      overview:
        'When one Lewis structure isn\'t enough, chemistry uses a set of resonance structures — and formal charge picks the best ones. The real molecule is the average.',
      lead: [
        {
          heading: 'Formal charge, first',
          body:
            'Formal charge ($FC$) is a bookkeeping device: pretend every covalent bond is shared perfectly evenly, then ask how many electrons each atom "owns" compared with a neutral atom. $FC = (\\text{valence e}^-) - (\\text{lone e}^-) - \\tfrac{1}{2}(\\text{bonding e}^-)$. The sum of formal charges equals the overall charge on the species.',
          svg: resonanceSVG,
          formula: 'FC \\;=\\; V - L - \\tfrac{1}{2}B',
        },
        {
          heading: 'Resonance: multiple pictures, one molecule',
          body:
            'Some Lewis structures can be drawn in several ways that differ only by the position of electrons (not atoms). These resonance structures are connected by double-headed arrows ($\\leftrightarrow$). The real molecule is not flipping between them — it is a single average (a "resonance hybrid") where the delocalized electrons are spread across all positions.',
          callout:
            'In $\\text{NO}_3^{-}$, drawing one $\\text{N=O}$ implies one bond is different from the others. In reality, all three N–O bonds are identical (bond order $= 4/3 \\approx 1.33$). That is the hybrid speaking.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget lets you click on bonds to convert between single and double bonds, watching formal charges update live. Use it to find the best Lewis structure and to generate resonance sets.',
        tryThis: [
          'Start with $\\text{NO}_3^{-}$ drawn with three single bonds and compute all four formal charges.',
          'Click one $\\text{N–O}$ bond into a double bond. Watch that oxygen\'s $FC$ drop from $-1$ to $0$ and nitrogen\'s drop from $+2$ to $+1$.',
          'Rotate the double bond to each of the three oxygens. Verify all three forms have identical formal-charge patterns.',
          'Try the same exercise with $\\text{SO}_2$ and $\\text{O}_3$.',
        ],
        observe: [
          'Every valid resonance structure has the same skeleton (atoms in the same positions) — only electrons move.',
          'The sum of formal charges always matches the molecular charge (−1 for $\\text{NO}_3^{-}$, 0 for $\\text{SO}_2$).',
          'The best single Lewis structure minimizes $|FC|$ on each atom and places any negative $FC$ on the most electronegative atom.',
          'All three $\\text{NO}_3^{-}$ resonance forms are equivalent — the widget confirms bond-order 1.33 for every N–O.',
        ],
      },
      notes: [
        {
          heading: 'Rules for "best" Lewis structure',
          body:
            '(1) Every atom has a complete octet if possible (duet for H). (2) Formal charges are as close to zero as possible. (3) Negative formal charge sits on the more electronegative atom. (4) Like charges should not be adjacent. When two candidate structures differ, these tie-breakers pick the major contributor.',
        },
        {
          heading: 'Bond order in a resonance hybrid',
          body:
            'Average across the resonance structures. In $\\text{NO}_3^{-}$: each N–O bond is double in exactly one of the three forms, single in the other two — average bond order = $\\tfrac{1 \\cdot 2 + 2 \\cdot 1}{3} = \\tfrac{4}{3}$. In $\\text{O}_3$ there are two resonance structures, so the O–O bond order is $\\tfrac{1 + 2}{2} = 1.5$. Averaged bonds are shorter than a single but longer than a double.',
          formula: '\\text{BO}_{\\text{avg}} \\;=\\; \\dfrac{\\text{total bonding e}^- \\text{ between a pair}}{\\text{number of resonance structures}}',
        },
        {
          heading: 'Worked example · formal charges in $\\text{CO}_2$',
          body:
            'Structure $\\text{O}{=}\\text{C}{=}\\text{O}$. Each O: $V = 6$, $L = 4$ (two lone pairs), $B = 4$ (one double bond). $FC = 6 - 4 - 2 = 0$. C: $V = 4$, $L = 0$, $B = 8$. $FC = 4 - 0 - 4 = 0$. All zeros — a great structure. Sum = 0, matching neutral $\\text{CO}_2$.',
          formula: 'FC(\\text{O}) = 6 - 4 - \\tfrac{1}{2}(4) = 0',
        },
        {
          heading: 'Worked example · pick the best structure for $\\text{CNO}^{-}$',
          body:
            'Cyanate ion can be drawn as (a) $[\\text{N}{=}\\text{C}{=}\\text{O}]^{-}$ or (b) $[\\text{N}{\\equiv}\\text{C}{-}\\text{O}]^{-}$ or (c) $[\\text{N}{-}\\text{C}{\\equiv}\\text{O}]^{-}$. Compute $FC$: in (b), N has $FC = 0$, O has $FC = -1$; in (c), N has $FC = -2$, O has $FC = 0$. Rule: negative $FC$ goes on the more electronegative atom (O > N). Structure (b) wins — it places the $-1$ on O. The real ion is closer to $[\\text{N}{\\equiv}\\text{C}{-}\\text{O}]^{-}$ than to the others.',
        },
      ],
      mcqs: [
        {
          id: 'q2.6.1',
          question: 'Which statement about resonance structures is TRUE?',
          choices: [
            'The molecule rapidly flips between them.',
            'They differ in the positions of atoms.',
            'They differ only in the positions of electrons; the real molecule is an average.',
            'Only one of them is actually correct.',
          ],
          correctIndex: 2,
          explanation:
            'Resonance forms share the same skeleton; electrons are delocalized. The real molecule is a single hybrid, not a flicker.',
        },
        {
          id: 'q2.6.2',
          question: 'In $\\text{NO}_3^{-}$, the average N–O bond order is:',
          choices: ['1', '4/3', '3/2', '2'],
          correctIndex: 1,
          explanation:
            'One double + two singles spread across three equivalent resonance structures: $(2 + 1 + 1)/3 = 4/3 \\approx 1.33$.',
        },
        {
          id: 'q2.6.3',
          question: 'In one resonance structure of $\\text{NO}_3^{-}$, the doubly-bonded oxygen has two lone pairs and one double bond. What is its formal charge?',
          choices: ['$-1$', '$0$', '$+1$', '$+2$'],
          correctIndex: 1,
          explanation:
            '$V = 6$, $L = 4$ (two lone pairs), $B = 4$ (one double bond = 4 bonding e⁻). $FC = 6 - 4 - \\tfrac{1}{2}(4) = 0$.',
        },
        {
          id: 'q2.6.4',
          question: 'Which criterion makes one resonance structure better than another?',
          choices: [
            'Having more double bonds.',
            'Having formal charges as close to zero as possible, with negative charges on the more electronegative atoms.',
            'Being drawn in a straight line.',
            'Having hydrogen in the center.',
          ],
          correctIndex: 1,
          explanation:
            'Low $|FC|$ and $FC$-on-electronegative-atom are the two tie-breakers for the best Lewis structure.',
        },
        {
          id: 'q2.6.5',
          question: 'How many equivalent resonance structures does $\\text{SO}_3$ have?',
          choices: ['1', '2', '3', '4'],
          correctIndex: 2,
          explanation:
            'The double bond can sit on any of three equivalent oxygens → 3 resonance structures. Each S–O bond averages to 4/3.',
        },
      ],
    },

    // ────────────────── 2.7 VSEPR & Hybridization ──────────────────
    {
      topicId: '2.7',
      overview:
        'VSEPR says electron groups around an atom repel each other and spread out as far as possible. The number of groups picks the electron geometry; the number of lone pairs picks the molecular shape within it.',
      lead: [
        {
          heading: 'Count domains, then look up the shape',
          body:
            'An "electron domain" is any group of valence electrons on the central atom: a single bond, a double bond, a triple bond, or a lone pair — each counts as one domain. Count them, then read off the electron geometry (2 = linear, 3 = trigonal planar, 4 = tetrahedral, 5 = trigonal bipyramidal, 6 = octahedral). Replace lone-pair domains with invisible placeholders to get the molecular shape.',
          svg: vseprSVG,
        },
        {
          heading: 'Hybridization mirrors domain count',
          body:
            'To make the geometry work, the central atom mixes its $s$ and $p$ (and sometimes $d$) orbitals into equivalent hybrid orbitals. Domains ↔ hybrid: $2 \\to sp$, $3 \\to sp^2$, $4 \\to sp^3$, $5 \\to sp^3d$, $6 \\to sp^3d^2$. The number of hybrid orbitals equals the number of electron domains — always.',
          formula: '\\text{domains} \\;=\\; \\text{hybrid orbitals} \\;=\\; \\sigma\\text{-bonds} + \\text{lone pairs}',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget lets you pick a molecule and watch its 3D geometry emerge from the domain count. Use it to verify the rules below before trusting them on new molecules.',
        tryThis: [
          'Build $\\text{CH}_4$, $\\text{NH}_3$, $\\text{H}_2\\text{O}$ in turn. All three have 4 domains but different numbers of lone pairs.',
          'Toggle lone-pair visibility and watch the shape labels change: tetrahedral → trigonal pyramidal → bent.',
          'Measure the H–X–H angle in each: $109.5° \\to 107° \\to 104.5°$. Lone pairs push harder than bonding pairs.',
          'Compare $\\text{CO}_2$ (2 domains, linear) with $\\text{SO}_2$ (3 domains with 1 LP, bent) — same formula pattern, different geometry.',
        ],
        observe: [
          'Electron geometry does not change when lone pairs appear; only the molecular shape name does.',
          'Each lone pair squeezes bond angles down by ~2–3° because lone-pair repulsion > bonding-pair repulsion.',
          'Multiple bonds ($\\sigma + \\pi$) count as ONE domain for shape purposes — bond order doesn\'t split into multiple directions.',
          'Hybridization index (sp, sp², sp³…) equals the number of domains you count on the central atom.',
        ],
      },
      notes: [
        {
          heading: 'Reference table (memorize these six)',
          body:
            '2 domains, 0 LP → linear, 180°, $sp$. 3 domains, 0 LP → trigonal planar, 120°, $sp^2$. 3 domains, 1 LP → bent, ~118°, $sp^2$. 4 domains, 0 LP → tetrahedral, 109.5°, $sp^3$. 4 domains, 1 LP → trigonal pyramidal, ~107°, $sp^3$. 4 domains, 2 LP → bent, ~104.5°, $sp^3$. Five and six-domain cases add trigonal bipyramidal and octahedral families (with seesaw, T-shape, square planar variants).',
        },
        {
          heading: 'Polarity = geometry + bond dipoles',
          body:
            'A molecule is polar if its bond dipoles do NOT cancel. $\\text{CO}_2$: two $\\text{C=O}$ dipoles point opposite (linear) → cancel → nonpolar. $\\text{H}_2\\text{O}$: two O–H dipoles at 104.5° → add → polar. Same bond type, different geometry → opposite overall polarity. This is the bridge to Unit 3 intermolecular forces.',
          callout:
            'Quick polarity test: if the central atom has any lone pairs OR the surrounding atoms are not all identical, the molecule is probably polar. Symmetric molecules with no central lone pairs (like $\\text{CCl}_4$, $\\text{BF}_3$, $\\text{CO}_2$) are nonpolar even though individual bonds are polar.',
        },
        {
          heading: 'Worked example · $\\text{SO}_2$ shape and hybridization',
          body:
            'Lewis: $\\text{O}{=}\\text{S}{-}\\text{O}$ with a lone pair on S (and a resonance partner). Count S domains: 1 single bond + 1 double bond + 1 lone pair = 3 domains. Electron geometry = trigonal planar, molecular shape = bent (one domain is a LP). Bond angle ≈ $119°$ (slightly less than 120° due to LP). Hybridization of S: $sp^2$. Polar? Yes — the two S–O dipoles don\'t cancel in the bent geometry.',
          formula: '\\text{SO}_2:\\; 3\\text{ domains} \\to sp^{2} \\to \\text{bent},\\; \\sim 119°',
        },
        {
          heading: 'Worked example · $\\text{XeF}_4$',
          body:
            'Lewis: 4 Xe–F bonds + 2 lone pairs on Xe = 6 domains. Electron geometry = octahedral, hybridization $sp^3d^2$. The two lone pairs take opposite (trans) positions because they repel each other most. The four F atoms sit in a plane → molecular shape is square planar. Bond angle F–Xe–F = 90°. Symmetric → nonpolar despite polar Xe–F bonds.',
        },
      ],
      mcqs: [
        {
          id: 'q2.7.1',
          question: 'The molecular shape of $\\text{NH}_3$ is:',
          choices: ['tetrahedral', 'trigonal pyramidal', 'trigonal planar', 'bent'],
          correctIndex: 1,
          explanation:
            'N has 4 domains (3 bonds + 1 LP). Electron geometry tetrahedral, shape trigonal pyramidal, angle ≈ 107°.',
        },
        {
          id: 'q2.7.2',
          question: 'The hybridization of the central atom in $\\text{BF}_3$ is:',
          choices: ['$sp$', '$sp^2$', '$sp^3$', '$sp^3d$'],
          correctIndex: 1,
          explanation:
            'B has 3 domains (3 single bonds, no LP) → trigonal planar → $sp^2$.',
        },
        {
          id: 'q2.7.3',
          question: 'Which molecule is NONPOLAR despite containing polar bonds?',
          choices: ['$\\text{H}_2\\text{O}$', '$\\text{NH}_3$', '$\\text{CCl}_4$', '$\\text{SO}_2$'],
          correctIndex: 2,
          explanation:
            '$\\text{CCl}_4$ is tetrahedral and symmetric — the four C–Cl dipoles cancel by geometry. The others have lone pairs on the central atom (asymmetric) and are polar.',
        },
        {
          id: 'q2.7.4',
          question: 'The bond angle in $\\text{H}_2\\text{O}$ (~104.5°) is LESS than the tetrahedral 109.5° because:',
          choices: [
            'H atoms repel each other strongly',
            'lone pairs on oxygen repel bonding pairs more than bonding pairs repel each other',
            'water is ionic',
            'oxygen uses $sp^2$ hybrids, not $sp^3$',
          ],
          correctIndex: 1,
          explanation:
            'Lone-pair repulsion > bond-pair repulsion, so lone pairs squeeze the H–O–H angle inward by ~5°.',
        },
        {
          id: 'q2.7.5',
          question: 'In $\\text{CO}_2$, the carbon atom is:',
          choices: [
            'bent with $sp^3$ hybridization',
            'linear with $sp$ hybridization',
            'trigonal planar with $sp^2$ hybridization',
            'tetrahedral with $sp^3$ hybridization',
          ],
          correctIndex: 1,
          explanation:
            '2 domains (two double bonds, no LP) → linear, $sp$. Each double bond is one domain for shape purposes.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  // 15 MCQs spanning all seven topics — mix of conceptual and "pick the right shape/structure".
  unitTest: [
    {
      id: 'ut2.1',
      question: 'Given EN: $\\text{Cs} = 0.79$, $\\text{F} = 3.98$. The bond in $\\text{CsF}$ is:',
      choices: ['nonpolar covalent', 'polar covalent', 'ionic', 'metallic'],
      correctIndex: 2,
      explanation:
        '$\\Delta\\text{EN} \\approx 3.2$ and it\'s a Group 1 metal paired with a halogen — textbook ionic.',
    },
    {
      id: 'ut2.2',
      question: 'On an intramolecular PE curve, the bond dissociation energy is:',
      choices: [
        'the height of the curve at $r = 0$',
        'the depth of the well (energy required to climb back to $PE = 0$)',
        'the slope at the minimum',
        'the curvature near $r_e$',
      ],
      correctIndex: 1,
      explanation:
        'The well depth $D$ is the energy needed to separate the bonded atoms to infinity.',
    },
    {
      id: 'ut2.3',
      question: 'For the same two atoms, ranking bond length short → long:',
      choices: [
        'single < double < triple',
        'triple < double < single',
        'all equal',
        'double < single < triple',
      ],
      correctIndex: 1,
      explanation:
        'Higher bond order pulls the nuclei closer: triple < double < single.',
    },
    {
      id: 'ut2.4',
      question: 'Which has the GREATEST lattice energy?',
      choices: ['$\\text{NaCl}$', '$\\text{KCl}$', '$\\text{MgO}$', '$\\text{CsI}$'],
      correctIndex: 2,
      explanation:
        '$\\text{MgO}$ has $\\pm 2$ charges and small ions — largest $|q_1 q_2|/d$.',
    },
    {
      id: 'ut2.5',
      question: 'Molten $\\text{NaCl}$ conducts electricity because:',
      choices: [
        'Na and Cl atoms are now free',
        '$\\text{Na}^{+}$ and $\\text{Cl}^{-}$ ions are now free to move',
        'the liquid contains free electrons',
        'it becomes a metal when molten',
      ],
      correctIndex: 1,
      explanation:
        'Melting unlocks the ions from lattice sites; mobile ions carry the current.',
    },
    {
      id: 'ut2.6',
      question: 'Steel (Fe with a small amount of C) is an example of what kind of alloy?',
      choices: ['substitutional', 'interstitial', 'ionic', 'network covalent'],
      correctIndex: 1,
      explanation:
        'C atoms are much smaller than Fe and slot into the gaps in the Fe lattice — interstitial.',
    },
    {
      id: 'ut2.7',
      question: 'Which explains why metals are good electrical conductors in the solid state?',
      choices: [
        'Ions move freely through the solid.',
        'Valence electrons are delocalized and mobile across the whole lattice.',
        'Metals are made of small polar molecules.',
        'Metals contain protons that carry current.',
      ],
      correctIndex: 1,
      explanation:
        'Sea-of-electrons model. The cations stay put; the electrons drift.',
    },
    {
      id: 'ut2.8',
      question: 'The total number of valence electrons in the Lewis diagram of $\\text{SO}_4^{2-}$ is:',
      choices: ['30', '32', '34', '36'],
      correctIndex: 1,
      explanation:
        'S: 6; 4 × O: 24; plus 2 for the $2-$ charge. $6 + 24 + 2 = 32$.',
    },
    {
      id: 'ut2.9',
      question: 'Which species has an EXPANDED octet on its central atom?',
      choices: ['$\\text{CO}_2$', '$\\text{SF}_6$', '$\\text{NH}_3$', '$\\text{H}_2\\text{O}$'],
      correctIndex: 1,
      explanation:
        'S in $\\text{SF}_6$ is surrounded by 12 valence electrons (six single bonds) — expanded octet allowed for third-row atoms.',
    },
    {
      id: 'ut2.10',
      question: 'The formal charge on the central N in $[\\text{NH}_4]^{+}$ is:',
      choices: ['$-1$', '$0$', '$+1$', '$+2$'],
      correctIndex: 2,
      explanation:
        '$V = 5$, $L = 0$, $B = 8$ (four N–H bonds). $FC = 5 - 0 - 4 = +1$. Matches the ion\'s total charge.',
    },
    {
      id: 'ut2.11',
      question: 'The average S–O bond order in $\\text{SO}_3$ is:',
      choices: ['1', '4/3', '3/2', '2'],
      correctIndex: 1,
      explanation:
        'Three resonance structures, each with one double + two singles. Average per bond = $(2+1+1)/3 = 4/3$.',
    },
    {
      id: 'ut2.12',
      question: 'The molecular shape of $\\text{SO}_2$ is:',
      choices: ['linear', 'bent', 'trigonal planar', 'trigonal pyramidal'],
      correctIndex: 1,
      explanation:
        'S has 3 domains (one single, one double, one LP). Electron geometry trigonal planar, molecular shape bent (~119°).',
    },
    {
      id: 'ut2.13',
      question: 'Hybridization of the central atom in $\\text{PCl}_5$ is:',
      choices: ['$sp^2$', '$sp^3$', '$sp^3d$', '$sp^3d^2$'],
      correctIndex: 2,
      explanation:
        'Five single bonds, no lone pairs on P → 5 domains → trigonal bipyramidal → $sp^3d$.',
    },
    {
      id: 'ut2.14',
      question: 'Which molecule is POLAR?',
      choices: ['$\\text{CO}_2$', '$\\text{BF}_3$', '$\\text{CCl}_4$', '$\\text{NH}_3$'],
      correctIndex: 3,
      explanation:
        '$\\text{NH}_3$ is trigonal pyramidal (lone pair on N) — dipoles don\'t cancel. The other three are symmetric and nonpolar.',
    },
    {
      id: 'ut2.15',
      question: 'Water\'s H–O–H angle (~104.5°) is smaller than the tetrahedral 109.5° because:',
      choices: [
        'oxygen uses $sp^2$ hybridization',
        'the two lone pairs on oxygen repel the bonding pairs more strongly than the bonds repel each other',
        'hydrogen atoms attract each other',
        'water is bent because of resonance',
      ],
      correctIndex: 1,
      explanation:
        'Lone-pair–lone-pair repulsion > lone-pair–bond-pair > bond-pair–bond-pair. The two LPs on O compress the H–O–H angle.',
    },
  ],
};
