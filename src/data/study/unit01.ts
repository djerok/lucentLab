import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 1 · Atomic Structure & Properties  (AP CED weighting: 7–9%)
//
// Each topic is laid out around the animation:
//   · overview + lead  — shown ABOVE the animation (set the question up)
//   · interact         — shown with the animation (what to try, what to see)
//   · notes            — shown BELOW the animation (consolidate the learning)
//   · mcqs             — quick checks at the bottom of the topic
// Diagrams are inline SVG strings — small, legible, and theme-aware (they
// use currentColor and the CSS variables where possible).
// ──────────────────────────────────────────────────────────────────────

// Shared diagram palette — pulls from the CSS vars so diagrams invert cleanly
// between dark and light themes.
const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#4ea8ff'; // Unit 1 hue

// Mass ↔ moles ↔ particles bridge (Topic 1.1)
const moleBridgeSVG = `
<svg viewBox="0 0 560 200" width="100%" style="max-width:560px">
  <defs>
    <marker id="mb-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .ttl   { font-family: Fraunces, serif; font-size: 18px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
      .op    { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${ACCENT}; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
      .arrow { stroke: ${ACCENT}; stroke-width: 1.4; fill: none; }
    </style>
  </defs>
  <rect class="box" x="20"  y="30" width="140" height="70" rx="6"/>
  <rect class="box" x="210" y="30" width="140" height="70" rx="6"/>
  <rect class="box" x="400" y="30" width="140" height="70" rx="6"/>
  <text class="tag" x="90"  y="52" text-anchor="middle">GRAMS</text>
  <text class="ttl" x="90"  y="80" text-anchor="middle">mass · m</text>
  <text class="tag" x="280" y="52" text-anchor="middle">MOLES</text>
  <text class="ttl" x="280" y="80" text-anchor="middle">n</text>
  <text class="tag" x="470" y="52" text-anchor="middle">PARTICLES</text>
  <text class="ttl" x="470" y="80" text-anchor="middle">N</text>
  <path class="arrow" d="M160 56 L210 56" marker-end="url(#mb-arr)"/>
  <path class="arrow" d="M210 74 L160 74" marker-end="url(#mb-arr)"/>
  <path class="arrow" d="M350 56 L400 56" marker-end="url(#mb-arr)"/>
  <path class="arrow" d="M400 74 L350 74" marker-end="url(#mb-arr)"/>
  <text class="op" x="185" y="48" text-anchor="middle">÷ M</text>
  <text class="op" x="185" y="90" text-anchor="middle">× M</text>
  <text class="op" x="375" y="48" text-anchor="middle">× Nₐ</text>
  <text class="op" x="375" y="90" text-anchor="middle">÷ Nₐ</text>
  <text class="tag" x="280" y="130" text-anchor="middle">EXAMPLE · 18.0 g of H₂O</text>
  <text class="ex" x="90"  y="158" text-anchor="middle">18.0 g</text>
  <text class="ex" x="280" y="158" text-anchor="middle">1.00 mol</text>
  <text class="ex" x="470" y="158" text-anchor="middle">6.02 × 10²³</text>
  <text class="sub" x="280" y="185" text-anchor="middle">M(H₂O) = 18.0 g/mol   ·   Nₐ = 6.022 × 10²³ mol⁻¹</text>
</svg>`;

// Mass spectrum — two peaks (Topic 1.2)
const massSpecSVG = `
<svg viewBox="0 0 520 248" width="100%" style="max-width:520px">
  <defs>
    <style>
      .ax   { stroke: ${LINE}; stroke-width: 1; }
      .grid { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.5; }
      .bar  { fill: ${ACCENT}; }
      .tag  { font-family:'JetBrains Mono',monospace; font-size: 10px; fill: ${FAINT}; letter-spacing:.14em; }
      .num  { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${ACCENT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .calc { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <line class="grid" x1="60" y1="40"  x2="480" y2="40"/>
  <line class="grid" x1="60" y1="90"  x2="480" y2="90"/>
  <line class="grid" x1="60" y1="140" x2="480" y2="140"/>
  <line class="ax"   x1="60" y1="170" x2="480" y2="170"/>
  <line class="ax"   x1="60" y1="30"  x2="60"  y2="170"/>
  <rect class="bar" x="170" y="40"  width="34" height="130"/>
  <rect class="bar" x="330" y="120" width="34" height="50"/>
  <text class="num" x="187" y="32"  text-anchor="middle">76%</text>
  <text class="num" x="347" y="112" text-anchor="middle">24%</text>
  <text class="lbl" x="187" y="190" text-anchor="middle">³⁵Cl</text>
  <text class="lbl" x="347" y="190" text-anchor="middle">³⁷Cl</text>
  <text class="tag" x="270" y="210" text-anchor="middle">m / z  →</text>
  <text class="tag" x="20"  y="100" transform="rotate(-90 20 100)" text-anchor="middle">ABUNDANCE</text>
  <text class="calc" x="270" y="232" text-anchor="middle">Ā = 35(0.76) + 37(0.24) = 35.48 ≈ 35.45</text>
</svg>`;

// Atom anatomy (Topic 1.3)
const atomAnatomySVG = `
<svg viewBox="0 0 520 240" width="100%" style="max-width:520px">
  <defs>
    <style>
      .cloud { fill: ${ACCENT}; opacity: 0.08; }
      .orbit { fill: none; stroke: ${FAINT}; stroke-width: 0.8; }
      .p     { fill: #ff5b3c; }
      .n     { fill: ${FG}; opacity: 0.55; }
      .e     { fill: ${ACCENT}; }
      .lead  { stroke: ${LINE}; stroke-width: 0.8; stroke-dasharray: 2 3; }
      .tag   { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ex    { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <circle class="cloud" cx="150" cy="120" r="95"/>
  <ellipse class="orbit" cx="150" cy="120" rx="82" ry="26"/>
  <ellipse class="orbit" cx="150" cy="120" rx="82" ry="26" transform="rotate(60 150 120)"/>
  <ellipse class="orbit" cx="150" cy="120" rx="82" ry="26" transform="rotate(-60 150 120)"/>
  <circle class="p" cx="145" cy="118" r="6"/>
  <circle class="n" cx="158" cy="116" r="6"/>
  <circle class="p" cx="150" cy="128" r="6"/>
  <circle class="n" cx="140" cy="126" r="6"/>
  <circle class="e" cx="232" cy="120" r="4"/>
  <circle class="e" cx="110" cy="82"  r="4"/>
  <circle class="e" cx="100" cy="160" r="4"/>
  <line class="lead" x1="168" y1="118" x2="310" y2="70"/>
  <text class="tag" x="316" y="64">NUCLEUS</text>
  <text class="lbl" x="316" y="82">p⁺ = Z     n⁰ = A − Z</text>
  <line class="lead" x1="232" y1="120" x2="310" y2="150"/>
  <text class="tag" x="316" y="144">ELECTRONS</text>
  <text class="lbl" x="316" y="162">cloud · charge = p⁺ − e⁻</text>
  <rect x="30" y="200" width="460" height="30" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="46" y="219">EXAMPLE</text>
  <text class="ex"  x="110" y="219">²³Na⁺  →  Z = 11, A = 23  →  11 p⁺ · 12 n⁰ · 10 e⁻</text>
</svg>`;

// Aufbau / filling order diagram (Topic 1.4)
const aufbauSVG = `
<svg viewBox="0 0 560 280" width="100%" style="max-width:560px">
  <defs>
    <style>
      .orb  { font-family: 'JetBrains Mono', monospace; font-size: 13px; fill: ${FG}; }
      .arr  { stroke: ${ACCENT}; stroke-width: 1.2; fill: none; opacity: 0.7; }
      .tag  { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .box  { fill: none; stroke: ${LINE}; stroke-width: 1; }
      .spin { font-family: 'JetBrains Mono', monospace; font-size: 14px; fill: ${ACCENT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; }
      .ex   { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${FG}; }
      .exb  { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">AUFBAU · DIAGONAL FILL ORDER</text>
  <g transform="translate(30,40)" text-anchor="middle">
    <text class="orb" x="20"  y="14">1s</text>
    <text class="orb" x="20"  y="40">2s</text><text class="orb" x="60"  y="40">2p</text>
    <text class="orb" x="20"  y="66">3s</text><text class="orb" x="60"  y="66">3p</text><text class="orb" x="100" y="66">3d</text>
    <text class="orb" x="20"  y="92">4s</text><text class="orb" x="60"  y="92">4p</text><text class="orb" x="100" y="92">4d</text><text class="orb" x="140" y="92">4f</text>
    <text class="orb" x="20"  y="118">5s</text><text class="orb" x="60" y="118">5p</text><text class="orb" x="100" y="118">5d</text>
    <text class="orb" x="20"  y="144">6s</text><text class="orb" x="60" y="144">6p</text>
    <text class="orb" x="20"  y="170">7s</text>
    <path class="arr" d="M32 8   L-4 48"/>
    <path class="arr" d="M32 34  L-4 74"/>
    <path class="arr" d="M72 34  L-4 100"/>
    <path class="arr" d="M72 60  L-4 126"/>
    <path class="arr" d="M112 60 L-4 152"/>
    <path class="arr" d="M112 86 L-4 178"/>
  </g>
  <g transform="translate(260,40)">
    <text class="tag" x="0" y="-4">PAULI · HUND</text>
    <rect class="box" x="0"   y="10" width="28" height="26"/>
    <rect class="box" x="30"  y="10" width="28" height="26"/>
    <rect class="box" x="60"  y="10" width="28" height="26"/>
    <text class="spin" x="14" y="30" text-anchor="middle">↑↓</text>
    <text class="spin" x="44" y="30" text-anchor="middle">↑</text>
    <text class="spin" x="74" y="30" text-anchor="middle">↑</text>
    <text class="lbl"  x="14" y="54" text-anchor="middle">paired</text>
    <text class="lbl"  x="59" y="54" text-anchor="middle">parallel</text>
    <text class="tag"  x="0" y="84">EXAMPLE · NITROGEN (Z=7)</text>
    <g transform="translate(0,94)">
      <rect class="box" x="0"   y="0" width="28" height="26"/>
      <text class="spin" x="14" y="20" text-anchor="middle">↑↓</text>
      <text class="lbl"  x="14" y="42" text-anchor="middle">1s</text>
      <rect class="box" x="42"  y="0" width="28" height="26"/>
      <text class="spin" x="56" y="20" text-anchor="middle">↑↓</text>
      <text class="lbl"  x="56" y="42" text-anchor="middle">2s</text>
      <rect class="box" x="92"  y="0" width="28" height="26"/>
      <rect class="box" x="122" y="0" width="28" height="26"/>
      <rect class="box" x="152" y="0" width="28" height="26"/>
      <text class="spin" x="106" y="20" text-anchor="middle">↑</text>
      <text class="spin" x="136" y="20" text-anchor="middle">↑</text>
      <text class="spin" x="166" y="20" text-anchor="middle">↑</text>
      <text class="lbl"  x="136" y="42" text-anchor="middle">2p</text>
    </g>
    <text class="ex"  x="0" y="168">1s² 2s² 2p³</text>
    <text class="exb" x="0" y="186">3 unpaired e⁻ (Hund)</text>
  </g>
</svg>`;

// PES spectrum (Topic 1.5)
const pesSVG = `
<svg viewBox="0 0 560 272" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .grid  { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.4; }
      .p1s   { fill: #ff5b3c; }
      .p2s   { fill: ${ACCENT}; }
      .p2p   { fill: #69e36b; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 12px; fill: ${FG}; }
      .lbl   { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .cap   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">NEON · 1s² 2s² 2p⁶</text>
  <line class="grid" x1="60" y1="60"  x2="520" y2="60"/>
  <line class="grid" x1="60" y1="110" x2="520" y2="110"/>
  <line class="grid" x1="60" y1="160" x2="520" y2="160"/>
  <line class="ax"   x1="60" y1="200" x2="520" y2="200"/>
  <line class="ax"   x1="60" y1="40"  x2="60"  y2="200"/>
  <rect class="p1s" x="100" y="60"  width="30" height="140"/>
  <rect class="p2s" x="320" y="150" width="30" height="50"/>
  <rect class="p2p" x="440" y="60"  width="30" height="140"/>
  <text class="num" x="115" y="54"  text-anchor="middle">2 e⁻</text>
  <text class="num" x="335" y="144" text-anchor="middle">2 e⁻</text>
  <text class="num" x="455" y="54"  text-anchor="middle">6 e⁻</text>
  <text class="lbl" x="115" y="220" text-anchor="middle">1s</text>
  <text class="lbl" x="335" y="220" text-anchor="middle">2s</text>
  <text class="lbl" x="455" y="220" text-anchor="middle">2p</text>
  <text class="tag" x="115" y="240" text-anchor="middle">HIGH BE</text>
  <text class="tag" x="455" y="240" text-anchor="middle">LOW BE</text>
  <text class="cap" x="290" y="256" text-anchor="middle">← binding energy</text>
  <text class="tag" x="20" y="130" transform="rotate(-90 20 130)" text-anchor="middle">RELATIVE COUNT</text>
</svg>`;

// Periodic trends arrows (Topic 1.6)
const trendsSVG = `
<svg viewBox="0 0 560 260" width="100%" style="max-width:560px">
  <defs>
    <marker id="tr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="#ff5b3c"/>
    </marker>
    <marker id="tr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .cell { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .hi   { fill: #ff5b3c; opacity: 0.12; stroke: #ff5b3c; stroke-width: 1; }
      .tag  { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .across { stroke: #ff5b3c; stroke-width: 2; fill: none; }
      .down   { stroke: ${ACCENT};  stroke-width: 2; fill: none; }
      .txt  { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .red  { fill: #ff5b3c; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .14em; }
      .blue { fill: ${ACCENT}; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .14em; }
      .ex   { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">PERIODIC TABLE · SIMPLIFIED</text>
  ${Array.from({ length: 4 }).map((_, row) =>
    Array.from({ length: 4 }).map((_, col) =>
      `<rect class="cell" x="${40 + col * 44}" y="${40 + row * 44}" width="42" height="42"/>`
    ).join('')
  ).join('')}
  <rect class="hi" x="40"  y="40" width="42" height="42"/>
  <rect class="hi" x="40"  y="172" width="42" height="42"/>
  <rect class="hi" x="172" y="40"  width="42" height="42"/>
  <path class="across" d="M52 108 L208 108" marker-end="url(#tr-a)"/>
  <path class="down"   d="M130 52 L130 208" marker-end="url(#tr-b)"/>
  <text class="tag" x="260" y="54">ACROSS  →</text>
  <text class="red" x="260" y="76">IE ↑   EN ↑   radius ↓</text>
  <text class="ex"  x="260" y="96">(Zeff grows, same shell)</text>
  <text class="tag" x="260" y="136">DOWN  ↓</text>
  <text class="blue" x="260" y="158">IE ↓   EN ↓   radius ↑</text>
  <text class="ex"  x="260" y="178">(new shell, farther valence)</text>
  <rect x="24" y="224" width="520" height="28" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="242">EXAMPLE</text>
  <text class="ex"  x="100" y="242">r(Na) &gt; r(Mg)  ·  IE(F) &gt; IE(O)  ·  EN(F) &gt; EN(Cl) &gt; EN(Br)</text>
</svg>`;

// Octet / ionic formation diagram (Topic 1.7)
const octetSVG = `
<svg viewBox="0 0 560 220" width="100%" style="max-width:560px">
  <defs>
    <marker id="oct-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .na   { fill: #a78bfa; }
      .cl   { fill: #4ade80; }
      .sym  { font-family: Fraunces, serif; font-size: 22px; fill: #1a1611; }
      .dot  { fill: ${FG}; }
      .tag  { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; fill: ${FAINT}; }
      .lbl  { font-family: Fraunces, serif; font-size: 13px; fill: ${FG}; }
      .ex   { font-family: 'JetBrains Mono', monospace; font-size: 12px; fill: ${ACCENT}; }
      .sub  { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
      .arr  { stroke: ${ACCENT}; stroke-width: 1.6; fill: none; }
    </style>
  </defs>
  <text class="tag" x="70"  y="32" text-anchor="middle">BEFORE</text>
  <text class="tag" x="490" y="32" text-anchor="middle">AFTER</text>
  <circle class="na" cx="70" cy="90" r="38"/>
  <text class="sym" x="70" y="98" text-anchor="middle">Na</text>
  <circle class="dot" cx="70" cy="42" r="3"/>
  <text class="lbl" x="70" y="150" text-anchor="middle">1 valence e⁻</text>
  <text class="sub" x="70" y="168" text-anchor="middle">[Ne] 3s¹</text>
  <circle class="cl" cx="230" cy="90" r="38"/>
  <text class="sym" x="230" y="98" text-anchor="middle">Cl</text>
  <circle class="dot" cx="230" cy="42" r="3"/>
  <circle class="dot" cx="280" cy="66" r="3"/>
  <circle class="dot" cx="280" cy="90" r="3"/>
  <circle class="dot" cx="280" cy="114" r="3"/>
  <circle class="dot" cx="230" cy="138" r="3"/>
  <circle class="dot" cx="180" cy="114" r="3"/>
  <circle class="dot" cx="180" cy="90" r="3"/>
  <text class="lbl" x="230" y="168" text-anchor="middle">7 valence e⁻</text>
  <text class="sub" x="230" y="186" text-anchor="middle">[Ne] 3s² 3p⁵</text>
  <path class="arr" d="M300 90 L370 90" marker-end="url(#oct-m)"/>
  <text class="ex" x="335" y="78" text-anchor="middle">1 e⁻ transfers</text>
  <circle class="na" cx="440" cy="90" r="32"/>
  <text class="sym" x="440" y="98" text-anchor="middle">Na⁺</text>
  <circle class="cl" cx="520" cy="90" r="36"/>
  <text class="sym" x="520" y="98" text-anchor="middle">Cl⁻</text>
  <text class="sub" x="440" y="150" text-anchor="middle">[Ne]</text>
  <text class="sub" x="520" y="150" text-anchor="middle">[Ar]</text>
  <text class="lbl" x="480" y="176" text-anchor="middle">NaCl — ionic bond</text>
</svg>`;

export const UNIT_01: UnitStudyGuide = {
  unitSlug: 'atomic-structure',

  topics: [
    // ────────────────── 1.1  Moles & Molar Mass ──────────────────
    {
      topicId: '1.1',
      overview:
        'Chemistry happens with particles you can\'t see but has to be measured in grams you can. The mole is the bridge.',
      lead: [
        {
          heading: 'The mole is just a counting word',
          body:
            'Like "dozen" = 12, one mole = 6.022 × 10²³. Nothing more magical than that. We need a huge counting word because atoms are tiny — one grain of salt is about 10¹⁸ formula units.',
          svg: moleBridgeSVG,
        },
        {
          heading: 'Every mole problem is a unit conversion',
          body:
            'Grams, moles, and particles are the three currencies. Molar mass M (g/mol) converts grams ↔ moles; Avogadro\'s number Nₐ converts moles ↔ particles. If you keep the units, the math takes care of itself.',
          formula: 'n = \\dfrac{m}{M} \\qquad N = n \\cdot N_A',
        },
      ],
      notes: [
        {
          heading: 'Percent composition',
          body:
            'The mass fraction of an element in a compound = (atoms of that element × its atomic mass) ÷ (whole molar mass) × 100%. The four elements in a compound always sum to 100%.',
          formula: '\\%\\,\\text{X} = \\dfrac{n_X \\cdot M_X}{M_{\\text{compound}}} \\times 100\\%',
        },
        {
          heading: 'Empirical vs molecular formula',
          body:
            'Empirical = smallest whole-number ratio (CH₂O). Molecular = actual count (C₆H₁₂O₆). From percent data: assume 100 g, convert each % to moles, divide by the smallest. Then if you have a measured molar mass, divide it by the empirical mass to get the multiplier.',
          callout:
            'If ratios land on 1 : 1.5, DO NOT round. Multiply everything by 2 to clear the half. Rounding 1.5 → 2 silently changes the compound.',
        },
        {
          heading: 'Worked example · grams → molecules',
          body:
            'How many water molecules are in 36.0 g of H₂O?  Step 1: moles = 36.0 g ÷ 18.0 g/mol = 2.00 mol.  Step 2: molecules = 2.00 mol × 6.022 × 10²³ = 1.20 × 10²⁴. Keep the units visible — g/mol cancels grams, 1/mol cancels moles, leaving molecules.',
          formula: '36.0\\,\\text{g} \\,\\div\\, 18.0\\,\\tfrac{\\text{g}}{\\text{mol}} \\,\\times\\, 6.022{\\times}10^{23} = 1.20{\\times}10^{24}\\,\\text{molecules}',
        },
        {
          heading: 'Worked example · empirical → molecular',
          body:
            'A compound is 40.0% C, 6.7% H, 53.3% O, molar mass 180 g/mol. Assume 100 g: 40.0/12 = 3.33 mol C, 6.7/1 = 6.64 mol H, 53.3/16 = 3.33 mol O. Divide by 3.33 → 1 : 2 : 1 → empirical CH₂O (30 g/mol). Multiplier = 180 / 30 = 6. Molecular formula = C₆H₁₂O₆ (glucose).',
        },
      ],
      mcqs: [
        {
          id: 'q1.1.1',
          question: 'How many water molecules are in a 9.0 g sample of H₂O (M = 18.0 g/mol)?',
          choices: ['6.02 × 10²³', '3.01 × 10²³', '1.20 × 10²⁴', '5.42 × 10²²'],
          correctIndex: 1,
          explanation:
            '9.0 g ÷ 18.0 g/mol = 0.500 mol, then 0.500 × 6.022 × 10²³ ≈ 3.01 × 10²³. Half a mole → half of Nₐ.',
        },
        {
          id: 'q1.1.2',
          question: 'A compound is 40.0% C, 6.7% H, 53.3% O. What is its empirical formula?',
          choices: ['CHO', 'C₂H₃O₂', 'CH₂O', 'C₂H₄O'],
          correctIndex: 2,
          explanation:
            'Assume 100 g → 3.33 mol C, 6.64 mol H, 3.33 mol O. Divide by smallest (3.33) → 1 : 2 : 1 → CH₂O.',
        },
        {
          id: 'q1.1.3',
          question: 'A hydrocarbon has empirical formula CH₂ and molar mass 84 g/mol. What is the molecular formula?',
          choices: ['C₃H₆', 'C₄H₈', 'C₆H₁₂', 'C₇H₁₄'],
          correctIndex: 2,
          explanation:
            'Empirical mass of CH₂ = 14 g/mol. 84 ÷ 14 = 6 → (CH₂)₆ = C₆H₁₂.',
        },
        {
          id: 'q1.1.4',
          question: 'A 5.00 g sample of impure NaCl contains 4.00 g of NaCl. What is its % purity?',
          choices: ['20.0%', '25.0%', '80.0%', '125%'],
          correctIndex: 2,
          explanation:
            'Purity = (target ÷ total) × 100 = (4.00 ÷ 5.00) × 100 = 80.0%.',
        },
        {
          id: 'q1.1.5',
          question: 'What is the mass of 0.250 mol of Ca(NO₃)₂ (M = 164.09 g/mol)?',
          choices: ['41.0 g', '164 g', '656 g', '6.5 g'],
          correctIndex: 0,
          explanation:
            'm = n × M = 0.250 × 164.09 ≈ 41.0 g.',
        },
      ],
    },

    // ────────────────── 1.2  Mass Spectroscopy ──────────────────
    {
      topicId: '1.2',
      overview:
        'A mass spectrometer sorts atoms by mass. The bar chart that comes out tells you which isotopes exist and how common each one is.',
      lead: [
        {
          heading: 'Reading the spectrum',
          body:
            'Each bar is one isotope. The bar\'s x-position is its mass number A (for singly-charged ions, m/z = A). The bar\'s height is how much of the sample is that isotope. Chlorine shows two bars because it has two stable isotopes, ³⁵Cl and ³⁷Cl.',
          svg: massSpecSVG,
        },
        {
          heading: 'Average atomic mass from the spectrum',
          body:
            'The number on the periodic table is a weighted average of the bar positions, weighted by bar heights. That\'s why it isn\'t a whole number: it\'s a mix, not a single isotope.',
          formula: '\\bar{A} \\;=\\; \\sum_i m_i\\, f_i \\qquad \\sum_i f_i = 1',
        },
      ],
      notes: [
        {
          heading: 'A fast sanity check',
          body:
            'The weighted average always sits closer to the tallest peak. Chlorine\'s 35.45 is closer to 35 than to 37 because ³⁵Cl is more abundant. If your answer falls outside the range of the peaks, you made an arithmetic error.',
          callout:
            'Fractional abundance is just percent ÷ 100. It must sum to 1 across all isotopes of the element.',
        },
        {
          heading: 'Worked example · chlorine',
          body:
            'Chlorine shows two peaks: m/z = 35 at 75.8% and m/z = 37 at 24.2%. Average = 35(0.758) + 37(0.242) = 26.53 + 8.95 = 35.48 amu. The periodic-table value (35.45) matches to two decimals — the small gap reflects isotope mass defects beyond whole numbers.',
          formula: '\\bar{A}(\\text{Cl}) = 35(0.758) + 37(0.242) = 35.48',
        },
        {
          heading: 'Worked example · solving for unknown abundance',
          body:
            'Copper has isotopes ⁶³Cu (mass 62.93) and ⁶⁵Cu (mass 64.93); average mass is 63.55. Let x = fraction ⁶³Cu, so (1 − x) = fraction ⁶⁵Cu. Then 62.93x + 64.93(1 − x) = 63.55 → 64.93 − 2x = 63.55 → x = 0.69. So ⁶³Cu is 69% abundant.',
        },
      ],
      mcqs: [
        {
          id: 'q1.2.1',
          question:
            'Element X shows two peaks: m/z = 24 (80.0%) and m/z = 26 (20.0%). Its average atomic mass is closest to:',
          choices: ['24.0', '24.4', '25.0', '25.6'],
          correctIndex: 1,
          explanation:
            '(24 × 0.80) + (26 × 0.20) = 19.2 + 5.2 = 24.4. The average sits closer to the taller peak.',
        },
        {
          id: 'q1.2.2',
          question:
            'A pure element gives peaks at m/z = 10 (20%) and 11 (80%). What element is it?',
          choices: ['Beryllium', 'Boron', 'Carbon', 'Nitrogen'],
          correctIndex: 1,
          explanation:
            '10(0.20) + 11(0.80) = 10.8. Boron\'s periodic-table mass is 10.81.',
        },
        {
          id: 'q1.2.3',
          question: 'Why does a chlorine mass spectrum show TWO peaks?',
          choices: [
            'Chlorine has two oxidation states in the ionizer.',
            'Chlorine has two stable isotopes with different natural abundances.',
            'The spectrometer detects Cl and Cl₂ at once.',
            'Chlorine\'s electrons are in two different subshells.',
          ],
          correctIndex: 1,
          explanation:
            'Each peak is one isotope. ³⁵Cl and ³⁷Cl both occur naturally (~76% / 24%).',
        },
        {
          id: 'q1.2.4',
          question: 'For any element, the fractional abundances of its isotopes must:',
          choices: ['be integers', 'sum to 1', 'each exceed 0.1', 'all be equal'],
          correctIndex: 1,
          explanation:
            'They are probabilities across all naturally-occurring isotopes of the element, so they sum to 1 (100%).',
        },
      ],
    },

    // ────────────────── 1.3  Atomic Structure ──────────────────
    {
      topicId: '1.3',
      overview:
        'An atom is a tiny, heavy, positive nucleus surrounded by a big, light, negative electron cloud.',
      lead: [
        {
          heading: 'Three separate counts',
          body:
            'Protons identify the element. Neutrons set the isotope. Electrons set the charge. Changing one does not change the others in ordinary chemistry.',
          svg: atomAnatomySVG,
          formula: 'Z = p^{+} \\qquad A = p^{+} + n^{0} \\qquad q = p^{+} - e^{-}',
        },
        {
          heading: 'Coulomb\'s law is the engine',
          body:
            'The force between two charges grows with the product of the charges and shrinks with the square of the distance between them. This single rule — bigger charge or smaller distance means a stronger pull — drives every periodic trend in §1.6.',
          formula: 'F = \\dfrac{k\\, q_1\\, q_2}{r^2}',
        },
        {
          heading: 'Effective nuclear charge, $Z_{\\text{eff}}$',
          body:
            'A valence electron doesn\'t feel the full $+Z$ of the nucleus. Inner (core) electrons sit between it and the nucleus and push back with their own negative charge — this push-back is called shielding, $S$. The net pull the valence electron actually feels is the effective nuclear charge $Z_{\\text{eff}}$. A quick rule: across a period, $Z$ grows but $S$ barely changes, so $Z_{\\text{eff}}$ rises sharply. Down a group, $Z$ grows but $S$ grows with it, so $Z_{\\text{eff}}$ barely changes.',
          formula: 'Z_{\\text{eff}} \\;\\approx\\; Z - S',
          callout:
            'Every time you hear "valence electrons are held more tightly," translate it in your head to "$Z_{\\text{eff}}$ felt by the valence is larger." That mental swap carries you through §1.5 and §1.6.',
        },
      ],
      notes: [
        {
          heading: 'Ions: electrons move, protons don\'t',
          body:
            'Adding electrons makes anions (−); removing them makes cations (+). Protons stay fixed unless there\'s a nuclear reaction. A species with 20 protons and 18 electrons has charge +2, not −2 — the subtraction goes (p⁺ − e⁻).',
        },
        {
          heading: 'Worked example · ³¹P³⁻',
          body:
            'The symbol ³¹P³⁻ tells you everything. Z for phosphorus = 15, so protons = 15 (fixed). A = 31, so neutrons = 31 − 15 = 16. Charge = −3 means 3 extra electrons, so electrons = 15 − (−3) = 18. Verify: 18 e⁻ matches the argon configuration — exactly what P wants as an anion.',
          formula: 'p^{+} = 15 \\qquad n^{0} = 16 \\qquad e^{-} = 18',
        },
      ],
      mcqs: [
        {
          id: 'q1.3.1',
          question: 'An atom has 19 protons, 20 neutrons, and 18 electrons. What is it?',
          choices: ['Ar', 'K', 'K⁺', 'Ca²⁺'],
          correctIndex: 2,
          explanation:
            '19 protons → potassium (Z = 19). 19 − 18 = +1 charge → K⁺.',
        },
        {
          id: 'q1.3.2',
          question: 'Isotopes of an element differ in which particle count?',
          choices: ['Protons', 'Electrons', 'Neutrons', 'Quarks'],
          correctIndex: 2,
          explanation: 'Same element → same Z (same protons). Different mass → different neutron count.',
        },
        {
          id: 'q1.3.3',
          question: '²³⁵U has how many neutrons?',
          choices: ['92', '143', '235', '327'],
          correctIndex: 1,
          explanation: 'N = A − Z = 235 − 92 = 143.',
        },
        {
          id: 'q1.3.4',
          question:
            'Per Coulomb\'s law, the attraction between an electron and its nucleus increases when:',
          choices: [
            'The electron moves closer (smaller r).',
            'The electron moves farther (larger r).',
            'The charge decreases.',
            'The temperature rises.',
          ],
          correctIndex: 0,
          explanation:
            'F ∝ 1/r² — halving r quadruples the force. Closer electrons are held harder.',
        },
      ],
    },

    // ────────────────── 1.4  Electron Configuration ──────────────────
    {
      topicId: '1.4',
      overview:
        'Electrons don\'t pile into the lowest orbital they can find — they follow three rules: Aufbau, Pauli, and Hund. The animation lets you drop electrons into atoms and watch the rules fire.',
      lead: [
        {
          heading: 'The three rules, in plain English',
          body:
            'Aufbau: fill low-energy orbitals first (1s before 2s, 2s before 2p, …). Pauli: each orbital box holds at most two electrons, with opposite spins. Hund: within a subshell of equal-energy orbitals, put one electron in each box before doubling any of them up.',
          svg: aufbauSVG,
        },
        {
          heading: 'Notation you\'ll write on the exam',
          body:
            'Full configuration lists every occupied orbital: 1s² 2s² 2p⁶ 3s¹ for sodium. The noble-gas shortcut replaces the filled inner core: [Ne] 3s¹. Use orbital diagrams (the box+arrow picture) when the question asks about Hund or unpaired electrons.',
          formula: '\\text{Na}:\\; 1s^{2}\\,2s^{2}\\,2p^{6}\\,3s^{1} \\;=\\; [\\text{Ne}]\\,3s^{1}',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The widget lets you build up a configuration one electron at a time, or jump to any element on the periodic table. Use it to test the rules, not just read them.',
        tryThis: [
          'Build carbon (Z=6) one electron at a time. Watch the 2p shell fill.',
          'Jump to chromium (Z=24) and nitrogen (Z=7) and compare their 3d and 2p rows.',
          'Flip between "orbital diagram" and "notation" views so the two forms become the same thing in your head.',
        ],
        observe: [
          'Which orbital lights up first when you add electron 5? (Answer: a 2p, per Aufbau.)',
          'In carbon\'s 2p, the two electrons sit in different boxes — that\'s Hund. Try to force them into the same box; the widget blocks it.',
          'Chromium\'s configuration is [Ar] 4s¹ 3d⁵, not 4s² 3d⁴. Half-filled d is extra stable — this is an Aufbau exception.',
        ],
      },
      notes: [
        {
          heading: 'Why 4s fills before 3d',
          body:
            'On an isolated atom the 4s orbital is slightly lower in energy than 3d, so it fills first. Once both are populated, 3d is actually lower (screened less), which is why transition-metal ions lose the 4s electrons before the 3d ones. On the exam: fill 4s first; ionise 4s first.',
        },
        {
          heading: 'Half-filled and full-filled stability',
          body:
            'Half-filled and full-filled subshells (d⁵, d¹⁰, f⁷, f¹⁴) are extra stable. Cr and Cu break the textbook pattern to land on d⁵ and d¹⁰:  Cr = [Ar] 4s¹ 3d⁵,  Cu = [Ar] 4s¹ 3d¹⁰.',
          callout:
            'You only need to memorise the Cr and Cu exceptions for AP. Their heavier cousins (Mo, Ag, Au) follow the same logic but won\'t be tested as novel content.',
        },
        {
          heading: 'Worked example · Fe and Fe²⁺',
          body:
            'Iron (Z = 26). Fill in order: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ → [Ar] 4s² 3d⁶. To form Fe²⁺, remove TWO electrons — but 4s goes first (not 3d). So Fe²⁺ = [Ar] 3d⁶ (not [Ar] 4s² 3d⁴). The cation rule "4s out first" catches most students.',
          formula: '\\text{Fe}:\\; [\\text{Ar}]\\,4s^{2}\\,3d^{6} \\;\\longrightarrow\\; \\text{Fe}^{2+}:\\; [\\text{Ar}]\\,3d^{6}',
        },
      ],
      mcqs: [
        {
          id: 'q1.4.1',
          question: 'The ground-state configuration of nitrogen (Z = 7) is:',
          choices: ['1s² 2s² 2p³', '1s² 2s² 2p² 3s¹', '1s² 2s¹ 2p⁴', '1s² 2s² 2p⁶ 3s¹'],
          correctIndex: 0,
          explanation:
            '7 electrons: 2 in 1s, 2 in 2s, 3 in 2p. Per Hund, those three 2p electrons sit unpaired in three different boxes.',
        },
        {
          id: 'q1.4.2',
          question: 'Chromium (Z = 24) is an Aufbau exception. Its configuration is:',
          choices: ['[Ar] 4s² 3d⁴', '[Ar] 4s¹ 3d⁵', '[Ar] 4s² 3d⁵', '[Ar] 3d⁶'],
          correctIndex: 1,
          explanation:
            'Cr promotes one 4s electron to 3d to give the half-filled d⁵ configuration, which is extra stable.',
        },
        {
          id: 'q1.4.3',
          question: 'Hund\'s rule tells you that within a p subshell:',
          choices: [
            'Electrons always pair up first.',
            'Each orbital gets one electron before any orbital doubles up.',
            'Opposite spins are forbidden.',
            'All three orbitals must be empty or full.',
          ],
          correctIndex: 1,
          explanation:
            'Hund: one electron per orbital first, all parallel spins, before any pairing — minimises electron repulsion.',
        },
        {
          id: 'q1.4.4',
          question: 'Fe³⁺ (iron atom Z = 26) has configuration:',
          choices: ['[Ar] 4s² 3d³', '[Ar] 4s¹ 3d⁴', '[Ar] 3d⁵', '[Ar] 3d⁶'],
          correctIndex: 2,
          explanation:
            'Fe is [Ar] 4s² 3d⁶. Losing three electrons: 4s goes first (both), then one 3d → [Ar] 3d⁵. Conveniently half-filled.',
        },
      ],
    },

    // ────────────────── 1.5  Photoelectron Spectroscopy ──────────────────
    {
      topicId: '1.5',
      overview:
        'PES fires high-energy photons at atoms and measures the binding energies of every electron that escapes. The spectrum is a direct picture of the electron configuration.',
      lead: [
        {
          heading: 'How to read a PES spectrum',
          body:
            'Each peak is one subshell. Its x-position is the binding energy (how tightly those electrons are held). Its height is the number of electrons in that subshell — so a 2p peak (6 electrons) is 3× taller than a 2s peak (2 electrons). Convention: higher binding energy is plotted to the LEFT.',
          svg: pesSVG,
        },
        {
          heading: 'What the pattern tells you',
          body:
            'Core electrons (1s, 2s) have high BE — they sit close to the nucleus, feeling the full nuclear charge. Valence electrons (outer s, p) have low BE — they\'re far and shielded. Same subshell across a period: BE rises (because $Z_{\\text{eff}}$ rises). Same subshell down a group: BE falls (because $r$ rises).',
          callout:
            'A peak height of 2 : 2 : 6 (1s : 2s : 2p) is the classic neon fingerprint. Heights always match orbital capacity: s = 2, p = 6, d = 10.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Cycle through H → He → Li → C → N → O → Ne and watch peaks appear as subshells fill.',
          'Compare C and N — both have a 2p peak, but N\'s is taller.',
          'Compare Na and K — same group, different period.',
        ],
        observe: [
          'Each peak height is an integer multiple of 2 (1 electron = half-height). Count: it matches the exponent in the configuration.',
          'The 1s peak keeps moving left (higher BE) as Z grows — more protons pull those 1s electrons harder.',
          'Na vs K: the valence peak is lower BE for K. Larger r → Coulomb pull is weaker.',
        ],
      },
      notes: [
        {
          heading: 'Binding energy is just the Coulomb depth',
          body:
            'Binding energy (BE) is the energy needed to remove that specific electron. Large $Z_{\\text{eff}}$ and small $r$ make a deep Coulomb well, which gives a high BE. Ionisation energy (§1.6) is exactly the BE of the lowest-BE peak — PES is where IE comes from.',
        },
        {
          heading: 'Worked example · identify from a spectrum',
          body:
            'A PES has peaks at BE = 104, 6.8, 3.7, 0.6 MJ/mol with heights 2, 2, 6, 1. Read from high BE to low: 1s² (2), 2s² (2), 2p⁶ (6), 3s¹ (1). Sum: 11 electrons → Z = 11 (neutral) → sodium. Cross-check: Na = [Ne] 3s¹, matches exactly.',
          formula: '2 \\cdot 2 \\cdot 6 \\cdot 1 \\;\\Rightarrow\\; 1s^{2}\\,2s^{2}\\,2p^{6}\\,3s^{1} \\;=\\; \\text{Na}',
        },
      ],
      mcqs: [
        {
          id: 'q1.5.1',
          question:
            'A PES spectrum shows peaks with relative heights 2 : 2 : 6 from high to low BE. The atom is most likely:',
          choices: ['He', 'Li', 'Ne', 'Na'],
          correctIndex: 2,
          explanation:
            '1s² 2s² 2p⁶ → 2 : 2 : 6 heights. That\'s neon (Z = 10).',
        },
        {
          id: 'q1.5.2',
          question: 'Going from Li to F across period 2, the 1s peak:',
          choices: [
            'shifts to lower binding energy',
            'shifts to higher binding energy',
            'stays at the same binding energy',
            'disappears',
          ],
          correctIndex: 1,
          explanation:
            '$Z_{\\text{eff}}$ rises across the period while $n$ stays the same, so even the 1s electrons feel a stronger pull. Higher BE.',
        },
        {
          id: 'q1.5.3',
          question: 'In a PES spectrum of oxygen (1s² 2s² 2p⁴), the 2p peak height relative to the 2s peak is:',
          choices: ['half', 'equal', 'twice', 'three times'],
          correctIndex: 2,
          explanation: '4 electrons in 2p vs 2 in 2s → 2× the height.',
        },
        {
          id: 'q1.5.4',
          question: 'The lowest-BE peak in a PES spectrum corresponds to which quantity for that atom?',
          choices: ['Electronegativity', 'Electron affinity', 'First ionisation energy', 'Atomic radius'],
          correctIndex: 2,
          explanation:
            'The easiest electron to remove is the highest-energy valence electron — its BE is the first IE.',
        },
      ],
    },

    // ────────────────── 1.6  Periodic Trends ──────────────────
    {
      topicId: '1.6',
      overview:
        'Every periodic trend comes from Coulomb\'s law: how hard does the nucleus pull on the outermost electron? That\'s it.',
      lead: [
        {
          heading: 'Two levers: $Z_{\\text{eff}}$ and distance',
          body:
            'Every trend in this topic comes from the same two knobs introduced in §1.3. Across a period, $Z_{\\text{eff}}$ rises (more protons, same shell) so atoms shrink, IE rises, and EN rises. Down a group, a new shell is added — so $r$ grows, while $Z_{\\text{eff}}$ stays roughly flat — so IE and EN fall, and radius grows. That is the whole trend map.',
          svg: trendsSVG,
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        tryThis: [
          'Sweep across period 3 (Na → Ar) and watch the radius bars shrink.',
          'Sweep down group 1 (H → Cs) and watch them grow.',
          'Toggle between atomic radius / IE / EN with the metric picker. They all move together, in opposite directions.',
        ],
        observe: [
          'Radius and IE are mirror images — big atom → far valence → easy to pull off → low IE.',
          'N → O is a known kink in the IE trend: removing the paired 2p electron in O is easier than the unpaired one in N (pair repulsion).',
          'EN peaks at F (not He/Ne, since noble gases don\'t bond). Cs is the loosest holder.',
        ],
      },
      notes: [
        {
          heading: 'Ionisation energy (IE)',
          body:
            'Energy to remove one electron from a gas-phase atom. Successive IEs always grow (IE₁ < IE₂ < IE₃…) because you\'re pulling electrons out of an increasingly positive ion. There\'s a sudden jump when you start removing core electrons — that jump tells you how many valence electrons the atom had.',
          callout:
            'A huge jump between IE₂ and IE₃ means the element has 2 valence electrons (Group 2). The biggest jump is the fingerprint of the group.',
        },
        {
          heading: 'Electron affinity (EA) and electronegativity (EN)',
          body:
            'EA = energy released when a neutral atom gains an electron. More negative EA → the atom really wants the electron (halogens are the winners; noble gases are around zero). EN is the same tendency but inside a bond — Pauling scale: F = 3.98 (highest), Cs ≈ 0.79.',
        },
        {
          heading: 'Worked example · ordering IE',
          body:
            'Rank the first IE of Na, Mg, Al, Si, P, S low → high. Period 3 left-to-right generally rises, BUT watch two dips: Al (3s² 3p¹ — pulling from the new p subshell is easier than from filled 3s²) and S (3p⁴ — pair-repulsion makes the paired electron easier to remove than P\'s unpaired 3p³). Order: Na < Al < Mg < S < Si < P.',
        },
        {
          heading: 'Worked example · comparing across and down',
          body:
            'Which is larger, O or S? S — same group, one shell farther out. Which has higher IE, O or S? O — smaller atom, valence closer to nucleus. General rule: when comparing two elements, find out whether "across" or "down" dominates, then apply that one trend.',
        },
      ],
      mcqs: [
        {
          id: 'q1.6.1',
          question: 'Which has the largest atomic radius?',
          choices: ['Na', 'Mg', 'K', 'Cs'],
          correctIndex: 3,
          explanation:
            'Radius grows down a group. Cs is in period 6 — farthest valence shell among the choices.',
        },
        {
          id: 'q1.6.2',
          question:
            'The first ionisation energy is highest for which atom?',
          choices: ['Na', 'Mg', 'Al', 'Cl'],
          correctIndex: 3,
          explanation:
            'IE rises across a period. Cl sits farthest right among these four (noble gases aren\'t offered).',
        },
        {
          id: 'q1.6.3',
          question:
            'For magnesium (1s² 2s² 2p⁶ 3s²), you expect the largest JUMP between successive IEs to be:',
          choices: ['IE₁ → IE₂', 'IE₂ → IE₃', 'IE₃ → IE₄', 'IE₆ → IE₇'],
          correctIndex: 1,
          explanation:
            'Mg has 2 valence electrons. IE₁ and IE₂ both come from 3s. IE₃ means ripping a core 2p electron — huge jump.',
        },
        {
          id: 'q1.6.4',
          question: 'Which pair is correctly ordered by electronegativity, low → high?',
          choices: ['F < O < N', 'Cs < K < Li', 'Na < Mg < Al', 'S < Cl < F'],
          correctIndex: 3,
          explanation:
            'EN rises across period 3 (S < Cl) and up a group (Cl < F). S < Cl < F is a correct chain.',
        },
      ],
    },

    // ────────────────── 1.7  Valence Electrons & Ionic Compounds ──────────────────
    {
      topicId: '1.7',
      overview:
        'Chemistry is valence-electron bookkeeping. Atoms gain, lose, or share to reach a noble-gas octet — and that is what makes ionic compounds form.',
      lead: [
        {
          heading: 'Why atoms form ions',
          body:
            'An isolated Na atom has 1 valence electron; losing it gives [Ne]. An isolated Cl atom has 7 valence electrons; gaining one gives [Ar]. The electron transfer leaves a +1 cation and a −1 anion, and their Coulombic attraction is the ionic bond.',
          svg: octetSVG,
        },
        {
          heading: 'Predicting the charge from the group',
          body:
            'Group 1 → +1 (lose 1 s electron). Group 2 → +2. Group 13 → +3. Group 15 → −3. Group 16 → −2. Group 17 → −1. Transition metals can take multiple charges — you need the Roman numeral from context (e.g. FeCl₃ = iron(III)).',
        },
      ],
      notes: [
        {
          heading: 'Lattice energy is Coulomb\'s law again',
          body:
            'Lattice energy is the energy released when gas-phase ions come together to form the solid. It grows with |q₁q₂| and shrinks with inter-ion distance. MgO (2+/2−, small ions) has a much bigger lattice energy than NaCl (1+/1−, larger ions) — which is why MgO melts at 2800 °C and NaCl at 801 °C.',
          formula: 'U_{\\text{lattice}} \\;\\propto\\; \\dfrac{|q_1\\, q_2|}{d}',
        },
        {
          heading: 'Formula-from-charges trick',
          body:
            'Write each ion with its charge, then swap the magnitudes to become subscripts. Al³⁺ + O²⁻ → Al₂O₃. Always reduce the final subscripts to simplest ratio (Ca²⁺ + O²⁻ gives CaO, not Ca₂O₂).',
        },
        {
          heading: 'Worked example · magnesium nitride',
          body:
            'Mg is Group 2 → Mg²⁺. N is Group 15 → N³⁻. Crisscross the magnitudes: Mg gets subscript 3, N gets subscript 2 → Mg₃N₂. Check neutrality: 3(+2) + 2(−3) = +6 − 6 = 0 ✓.',
          formula: '\\text{Mg}^{2+} + \\text{N}^{3-} \\;\\rightarrow\\; \\text{Mg}_{3}\\text{N}_{2}',
        },
        {
          heading: 'Worked example · lattice energy ordering',
          body:
            'Rank LiF, NaF, NaCl, MgO by lattice energy. MgO has ±2 charges → 4× Coulomb factor — biggest. Among the ±1/±1 salts, smaller ions = bigger U: LiF (both small) > NaF > NaCl. Final: NaCl < NaF < LiF < MgO.',
        },
      ],
      mcqs: [
        {
          id: 'q1.7.1',
          question: 'What is the formula of aluminum oxide?',
          choices: ['AlO', 'Al₂O', 'AlO₃', 'Al₂O₃'],
          correctIndex: 3,
          explanation: 'Al³⁺ + O²⁻ → crisscross 3 and 2 → Al₂O₃.',
        },
        {
          id: 'q1.7.2',
          question: 'Rank by lattice energy, low → high: NaCl, MgO, KBr.',
          choices: [
            'KBr < NaCl < MgO',
            'NaCl < KBr < MgO',
            'MgO < NaCl < KBr',
            'KBr < MgO < NaCl',
          ],
          correctIndex: 0,
          explanation:
            'MgO has ±2 charges AND small ions (huge U). KBr has ±1 and larger ions (smaller U). NaCl sits between.',
        },
        {
          id: 'q1.7.3',
          question: 'The valence configuration of a Group 16 atom is:',
          choices: ['ns² np²', 'ns² np³', 'ns² np⁴', 'ns² np⁶'],
          correctIndex: 2,
          explanation:
            'Group 16 (O, S, Se…) has 6 valence electrons: ns² np⁴. Gaining 2 more → octet, −2 charge.',
        },
        {
          id: 'q1.7.4',
          question: 'Which element MOST readily forms a +1 cation?',
          choices: ['Mg', 'Cl', 'Cs', 'O'],
          correctIndex: 2,
          explanation:
            'Cs has the lowest IE on the periodic table — losing its lone valence electron is nearly free.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  // 15 questions spanning every topic. Mixes calculation and conceptual.
  unitTest: [
    {
      id: 'ut1.1',
      question: 'How many atoms are in 2.00 g of helium (M = 4.00 g/mol)?',
      choices: ['1.20 × 10²³', '3.01 × 10²³', '6.02 × 10²³', '1.20 × 10²⁴'],
      correctIndex: 1,
      explanation:
        '2.00 ÷ 4.00 = 0.500 mol; × Nₐ ≈ 3.01 × 10²³ atoms.',
    },
    {
      id: 'ut1.2',
      question:
        'A compound\'s mass-% is 52.9% Al and 47.1% O. The empirical formula is:',
      choices: ['AlO', 'Al₂O', 'Al₂O₃', 'AlO₂'],
      correctIndex: 2,
      explanation:
        '52.9/27.0 ≈ 1.96 mol Al ; 47.1/16.0 ≈ 2.94 mol O. Ratio ≈ 2 : 3 → Al₂O₃.',
    },
    {
      id: 'ut1.3',
      question:
        'A mass spectrum of an element shows peaks at m/z = 63 (69.2%) and 65 (30.8%). The average atomic mass is:',
      choices: ['63.0', '63.6', '64.0', '65.0'],
      correctIndex: 1,
      explanation: '(63 × 0.692) + (65 × 0.308) ≈ 43.60 + 20.02 ≈ 63.6 (copper).',
    },
    {
      id: 'ut1.4',
      question: 'Which species has 18 electrons?',
      choices: ['Na⁺', 'F⁻', 'Mg²⁺', 'Ca²⁺'],
      correctIndex: 3,
      explanation:
        'Ca has 20 protons; Ca²⁺ has 20 − 2 = 18 electrons (the argon configuration).',
    },
    {
      id: 'ut1.5',
      question: 'Ground-state configuration of a neutral Fe atom (Z = 26):',
      choices: ['[Ar] 4s² 3d⁶', '[Ar] 4s¹ 3d⁷', '[Ar] 3d⁸', '[Ne] 3s² 3p⁶ 4s² 3d⁶'],
      correctIndex: 0,
      explanation:
        '4s fills before 3d; Fe = [Ar] 4s² 3d⁶. (The last option expands [Ar] correctly, but is non-standard notation.)',
    },
    {
      id: 'ut1.6',
      question: 'Which neutral atom has the configuration [Kr] 5s¹ 4d⁵?',
      choices: ['Mn', 'Cr', 'Mo', 'Nb'],
      correctIndex: 2,
      explanation:
        'Mo (Z = 42) is a heavier cousin of Cr and follows the same half-filled-d exception.',
    },
    {
      id: 'ut1.7',
      question:
        'A PES spectrum shows 4 peaks with heights 2, 2, 6, 1 (high BE → low). Which atom?',
      choices: ['Ne', 'Na', 'Mg', 'Al'],
      correctIndex: 1,
      explanation:
        '1s² 2s² 2p⁶ 3s¹ → 2/2/6/1. That\'s sodium.',
    },
    {
      id: 'ut1.8',
      question:
        'Across period 3 (Na → Ar), which property generally INCREASES?',
      choices: ['Atomic radius', 'Shielding', 'Effective nuclear charge on valence', 'Ionic radius (cation/anion uniform)'],
      correctIndex: 2,
      explanation:
        'Protons are added, the valence shell doesn\'t change — $Z_{\\text{eff}}$ on valence rises, so atoms shrink and IE grows.',
    },
    {
      id: 'ut1.9',
      question: 'Which element has the largest first ionization energy?',
      choices: ['Li', 'Na', 'F', 'Ne'],
      correctIndex: 3,
      explanation:
        'Ne is period 2 and on the right edge — the valence 2p is tightly held. Noble-gas IE is highest in its period.',
    },
    {
      id: 'ut1.10',
      question: 'A huge jump between IE₃ and IE₄ suggests the atom has:',
      choices: ['3 valence electrons', '4 valence electrons', '3 core electrons', '1 core electron'],
      correctIndex: 0,
      explanation:
        'Three "cheap" ionisations then a hard one → 3 valence electrons (group 13).',
    },
    {
      id: 'ut1.11',
      question: 'Lattice energy is GREATEST for:',
      choices: ['KCl', 'CaO', 'NaF', 'CsI'],
      correctIndex: 1,
      explanation:
        'CaO has ±2 charges and small ions → largest |q₁q₂|/d → biggest U.',
    },
    {
      id: 'ut1.12',
      question: 'Which set is correctly ordered by atomic radius, small → large?',
      choices: ['F < Cl < Br', 'Na < Li < K', 'Al < Si < P', 'Mg²⁺ < Mg < Na'],
      correctIndex: 0,
      explanation:
        'Down a group, radius increases. F < Cl < Br.',
    },
    {
      id: 'ut1.13',
      question:
        'Which is true of Hund\'s rule applied to a neutral oxygen atom (2p⁴)?',
      choices: [
        'All 4 electrons are paired.',
        'Two electrons are paired; two are unpaired.',
        'All 4 electrons are unpaired.',
        'Three electrons are paired; one is unpaired.',
      ],
      correctIndex: 1,
      explanation:
        '2p has three orbitals. Fill each with one (3 electrons) — then the fourth MUST pair up. Result: 2 paired + 2 unpaired.',
    },
    {
      id: 'ut1.14',
      question: 'The valence configuration of Br⁻ is:',
      choices: ['4s² 4p⁵', '4s² 4p⁶', '4s¹ 4p⁶', '3d¹⁰ 4p⁶'],
      correctIndex: 1,
      explanation:
        'Br has 4s² 4p⁵. Gaining one electron gives the closed-shell [Kr] core: 4s² 4p⁶.',
    },
    {
      id: 'ut1.15',
      question:
        'Why is the periodic-table mass of Cl 35.45 and not 35 or 37?',
      choices: [
        'Because of a third isotope.',
        'Because it\'s the weighted average of ³⁵Cl and ³⁷Cl by abundance.',
        'Because protons have a non-integer mass.',
        'Because the nucleus of chlorine is unstable.',
      ],
      correctIndex: 1,
      explanation:
        'Chlorine has two stable isotopes (~76% ³⁵Cl, ~24% ³⁷Cl). The table mass is the abundance-weighted average.',
    },
  ],
};
