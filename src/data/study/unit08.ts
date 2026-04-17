import type { UnitStudyGuide } from './types';

// ──────────────────────────────────────────────────────────────────────
// Unit 8 · Acids & Bases  (AP CED weighting: 11–15%)
//
// Topics:
//   8.1 pH & pOH
//   8.2 Strong vs Weak Acids
//   8.3 Buffers
//   8.4 Acid-Base Titrations
//   8.5 pKa & Conjugate Strength
// ──────────────────────────────────────────────────────────────────────

const FG = 'var(--paper)';
const DIM = 'var(--paper-dim)';
const FAINT = 'var(--paper-faint)';
const INK = 'var(--ink-2)';
const LINE = 'var(--line-strong)';
const ACCENT = '#ff5b3c'; // Unit 8 hue

// ─── 8.1 pH scale ────────────────────────────────────────────────
const pHScaleSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <linearGradient id="ph-grad" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0"    stop-color="#ff5b3c"/>
      <stop offset="0.5"  stop-color="${INK}"/>
      <stop offset="1"    stop-color="#4ea8ff"/>
    </linearGradient>
    <style>
      .bar   { stroke: ${LINE}; stroke-width: 1; }
      .tick  { stroke: ${LINE}; stroke-width: 1; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${FG}; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .ttl   { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 12px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .acc   { fill: ${ACCENT}; font-family:'JetBrains Mono',monospace; font-size: 11px; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">pH SCALE · WATER AT 25 °C</text>
  <rect class="bar" x="40" y="60" width="480" height="30" rx="4" fill="url(#ph-grad)"/>
  ${Array.from({ length: 15 }).map((_, i) =>
    `<line class="tick" x1="${40 + i * (480 / 14)}" y1="90" x2="${40 + i * (480 / 14)}" y2="98"/>`
  ).join('')}
  ${Array.from({ length: 15 }).map((_, i) =>
    `<text class="num" x="${40 + i * (480 / 14)}" y="114" text-anchor="middle">${i}</text>`
  ).join('')}
  <text class="tag" x="80"  y="50" text-anchor="middle">ACIDIC</text>
  <text class="tag" x="280" y="50" text-anchor="middle">NEUTRAL</text>
  <text class="tag" x="480" y="50" text-anchor="middle">BASIC</text>
  <text class="ttl" x="80"  y="140" text-anchor="middle">[H₃O⁺] &gt; [OH⁻]</text>
  <text class="ttl" x="280" y="140" text-anchor="middle">[H₃O⁺] = [OH⁻]</text>
  <text class="ttl" x="480" y="140" text-anchor="middle">[H₃O⁺] &lt; [OH⁻]</text>
  <text class="sub" x="280" y="158" text-anchor="middle">Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴</text>
  <rect x="24" y="178" width="520" height="46" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="196">EXAMPLE</text>
  <text class="acc" x="100" y="196">0.010 M HCl</text>
  <text class="ex"  x="200" y="196">→ [H₃O⁺] = 10⁻²  →  pH = 2.0  →  pOH = 12.0</text>
  <text class="ex"  x="40"  y="216">Each pH unit = factor of 10 in [H₃O⁺]. pH 3 is 100× more acidic than pH 5.</text>
</svg>`;

// ─── 8.2 Strong vs weak ──────────────────────────────────────────
const strongWeakSVG = `
<svg viewBox="0 0 560 260" width="100%" style="max-width:560px">
  <defs>
    <style>
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .ttl   { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .full  { fill: ${ACCENT}; }
      .part  { fill: ${ACCENT}; opacity: 0.35; }
      .und   { fill: ${FG}; opacity: 0.45; }
      .lbl   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .ln    { stroke: ${LINE}; stroke-width: 0.8; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">DISSOCIATION · 0.10 M ACID</text>
  <rect class="box" x="40"  y="40" width="220" height="170" rx="6"/>
  <rect class="box" x="300" y="40" width="220" height="170" rx="6"/>
  <text class="ttl" x="150" y="62"  text-anchor="middle">STRONG (HCl)</text>
  <text class="ttl" x="410" y="62"  text-anchor="middle">WEAK (CH₃COOH)</text>
  <text class="sub" x="150" y="80"  text-anchor="middle">100% dissociated</text>
  <text class="sub" x="410" y="80"  text-anchor="middle">~1% dissociated</text>
  ${Array.from({ length: 10 }).map((_, i) => {
    const x = 60 + (i % 5) * 36;
    const y = 100 + Math.floor(i / 5) * 30;
    return `<circle class="full" cx="${x}" cy="${y}" r="6"/>`;
  }).join('')}
  ${Array.from({ length: 10 }).map((_, i) => {
    const x = 320 + (i % 5) * 36;
    const y = 100 + Math.floor(i / 5) * 30;
    const cls = i === 0 ? 'full' : 'und';
    return `<circle class="${cls}" cx="${x}" cy="${y}" r="6"/>`;
  }).join('')}
  <text class="lbl" x="150" y="180" text-anchor="middle">H₃O⁺ = 0.10 M</text>
  <text class="lbl" x="410" y="180" text-anchor="middle">H₃O⁺ ≈ 1.3 × 10⁻³ M</text>
  <text class="ex"  x="150" y="200" text-anchor="middle">pH = 1.00</text>
  <text class="ex"  x="410" y="200" text-anchor="middle">pH ≈ 2.87</text>
  <rect x="24" y="222" width="520" height="30" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="240">EXAMPLE</text>
  <text class="ex"  x="125" y="240">Ka(CH₃COOH) = 1.8 × 10⁻⁵   →   x = √(Ka·C) ≈ 1.3 × 10⁻³ M</text>
</svg>`;

// ─── 8.3 Buffer ladder ────────────────────────────────────────────
const bufferLadderSVG = `
<svg viewBox="0 0 560 260" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .grid  { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.5; }
      .step  { stroke: ${ACCENT}; stroke-width: 2.4; fill: none; }
      .zone  { fill: ${ACCENT}; opacity: 0.1; }
      .dot   { fill: ${ACCENT}; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">BUFFER · pH vs log([A⁻]/[HA])</text>
  <rect class="zone" x="140" y="60" width="260" height="130"/>
  <line class="ax"   x1="60" y1="190" x2="520" y2="190"/>
  <line class="ax"   x1="60" y1="40"  x2="60"  y2="190"/>
  <line class="grid" x1="60" y1="125" x2="520" y2="125"/>
  <path class="step" d="M60 180 Q 140 175 200 150 T 340 90 Q 420 78 520 72"/>
  <circle class="dot" cx="270" cy="125" r="5"/>
  <line class="grid" x1="270" y1="125" x2="270" y2="190"/>
  <text class="num" x="270" y="206" text-anchor="middle">0</text>
  <text class="num" x="60"  y="206" text-anchor="middle">−2</text>
  <text class="num" x="520" y="206" text-anchor="middle">+2</text>
  <text class="tag" x="270" y="220" text-anchor="middle">log([A⁻]/[HA])</text>
  <text class="num" x="48"  y="128" text-anchor="end">pKa</text>
  <text class="num" x="48"  y="70"  text-anchor="end">pKa+2</text>
  <text class="num" x="48"  y="186" text-anchor="end">pKa−2</text>
  <text class="lbl" x="270" y="52"  text-anchor="middle">half-equivalence</text>
  <text class="sub" x="270" y="150" text-anchor="middle">[A⁻] = [HA]</text>
  <text class="tag" x="175" y="80">BUFFER ZONE</text>
  <text class="tag" x="160" y="95">~90% HA</text>
  <text class="tag" x="340" y="80">~90% A⁻</text>
  <rect x="24" y="232" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="247">EXAMPLE</text>
  <text class="ex"  x="125" y="247">pKa(CH₃COOH)=4.74  ·  [A⁻]=[HA]=0.10 M  →  pH = 4.74</text>
</svg>`;

// ─── 8.4 Titration curve ──────────────────────────────────────────
const titrationSVG = `
<svg viewBox="0 0 560 280" width="100%" style="max-width:560px">
  <defs>
    <style>
      .ax    { stroke: ${LINE}; stroke-width: 1; }
      .grid  { stroke: ${LINE}; stroke-width: 0.5; stroke-dasharray: 2 4; opacity: 0.5; }
      .curve { stroke: ${ACCENT}; stroke-width: 2.4; fill: none; }
      .strong{ stroke: #4ea8ff; stroke-width: 1.8; fill: none; stroke-dasharray: 4 4; opacity: 0.8; }
      .dot   { fill: ${ACCENT}; }
      .dotb  { fill: #4ea8ff; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .lbl   { font-family: Fraunces, serif; font-size: 12px; fill: ${FG}; }
      .num   { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${FG}; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">TITRATION · ACID (aq) + NaOH</text>
  <line class="ax"   x1="60" y1="240" x2="520" y2="240"/>
  <line class="ax"   x1="60" y1="40"  x2="60"  y2="240"/>
  <line class="grid" x1="60" y1="140" x2="520" y2="140"/>
  <line class="grid" x1="290" y1="40" x2="290" y2="240"/>
  <path class="strong" d="M60 228 Q 260 225 285 210 L 290 60 Q 360 50 520 48"/>
  <path class="curve"  d="M60 200 Q 140 180 200 160 L 290 125 Q 320 85 360 65 Q 440 52 520 50"/>
  <circle class="dot"  cx="145" cy="175" r="5"/>
  <circle class="dot"  cx="290" cy="95"  r="5"/>
  <circle class="dotb" cx="290" cy="140" r="5"/>
  <text class="lbl" x="145" y="168" text-anchor="middle">½ eq.</text>
  <text class="sub" x="145" y="192" text-anchor="middle">pH = pKa</text>
  <text class="lbl" x="290" y="88"  text-anchor="middle">equivalence</text>
  <text class="sub" x="335" y="118" text-anchor="start">weak: pH &gt; 7</text>
  <text class="sub" x="335" y="150" text-anchor="start">strong: pH = 7</text>
  <text class="num" x="48" y="244" text-anchor="end">0</text>
  <text class="num" x="48" y="144" text-anchor="end">7</text>
  <text class="num" x="48" y="48"  text-anchor="end">14</text>
  <text class="tag" x="30" y="140" transform="rotate(-90 30 140)" text-anchor="middle">pH</text>
  <text class="num" x="290" y="258" text-anchor="middle">V_eq</text>
  <text class="tag" x="520" y="258" text-anchor="end">mL NaOH →</text>
  <text class="tag" x="520" y="36" text-anchor="end">— weak   ⋯ strong</text>
</svg>`;

// ─── 8.5 Conjugate seesaw ─────────────────────────────────────────
const conjugateSVG = `
<svg viewBox="0 0 560 240" width="100%" style="max-width:560px">
  <defs>
    <marker id="cj-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="${ACCENT}"/>
    </marker>
    <style>
      .pivot { stroke: ${LINE}; stroke-width: 1.2; }
      .beam  { stroke: ${ACCENT}; stroke-width: 2; fill: none; }
      .box   { fill: ${INK}; stroke: ${LINE}; stroke-width: 1; }
      .tag   { font-family:'JetBrains Mono',monospace; font-size: 10px; letter-spacing:.16em; fill: ${FAINT}; }
      .ttl   { font-family: Fraunces, serif; font-size: 14px; fill: ${FG}; }
      .sub   { font-family: Fraunces, serif; font-size: 11px; fill: ${DIM}; font-style: italic; }
      .acc   { fill: ${ACCENT}; font-family:'JetBrains Mono',monospace; font-size: 12px; }
      .ex    { font-family:'JetBrains Mono',monospace; font-size: 11px; fill: ${DIM}; }
    </style>
  </defs>
  <text class="tag" x="24" y="22">CONJUGATE STRENGTH · SEESAW</text>
  <line class="pivot" x1="280" y1="100" x2="280" y2="150"/>
  <polygon points="260,150 300,150 280,170" fill="${LINE}"/>
  <path class="beam" d="M100 80 L460 120"/>
  <rect class="box" x="50"  y="50" width="140" height="54" rx="4"/>
  <rect class="box" x="370" y="100" width="140" height="54" rx="4"/>
  <text class="ttl" x="120" y="70" text-anchor="middle">HA (acid)</text>
  <text class="acc" x="120" y="92" text-anchor="middle">Ka LARGE</text>
  <text class="ttl" x="440" y="120" text-anchor="middle">A⁻ (conj. base)</text>
  <text class="acc" x="440" y="142" text-anchor="middle">Kb small</text>
  <text class="tag" x="280" y="190" text-anchor="middle">Ka · Kb = Kw</text>
  <text class="sub" x="280" y="206" text-anchor="middle">pKa + pKb = 14</text>
  <rect x="24" y="214" width="520" height="22" fill="${INK}" stroke="${LINE}" rx="4"/>
  <text class="tag" x="40" y="229">EXAMPLE</text>
  <text class="ex"  x="125" y="229">HF: Ka=7.2×10⁻⁴ (pKa 3.14)  →  F⁻: Kb=1.4×10⁻¹¹ (pKb 10.86)</text>
</svg>`;

export const UNIT_08: UnitStudyGuide = {
  unitSlug: 'acids-bases',

  topics: [
    // ────────────────── 8.1 pH & pOH ──────────────────
    {
      topicId: '8.1',
      overview:
        'Acidity spans fourteen orders of magnitude in water. The pH scale compresses that range into a single small number you can read at a glance.',
      lead: [
        {
          heading: 'pH is a logarithm of $[\\text{H}_3\\text{O}^{+}]$',
          body:
            'A Brønsted-Lowry acid is a proton donor; a base is a proton acceptor. Water auto-ionises into hydronium $\\text{H}_3\\text{O}^{+}$ and hydroxide $\\text{OH}^{-}$, and the product of their concentrations is fixed: $K_w = [\\text{H}_3\\text{O}^{+}][\\text{OH}^{-}] = 1.0 \\times 10^{-14}$ at 25 °C. Because that product spans 14 decades, we take a $-\\log$ to turn it into a tidy 0–14 ruler.',
          svg: pHScaleSVG,
          formula: '\\text{pH} = -\\log[\\text{H}_3\\text{O}^{+}] \\qquad \\text{pOH} = -\\log[\\text{OH}^{-}]',
        },
        {
          heading: 'pH + pOH = 14 (at 25 °C)',
          body:
            'Take $-\\log$ of both sides of $K_w$ and you get $\\text{pH} + \\text{pOH} = 14$. That means pOH is always just 14 minus pH — no new arithmetic. Every unit on the pH scale is a factor of ten in $[\\text{H}_3\\text{O}^{+}]$: pH 3 is a thousand times more acidic than pH 6.',
          formula: '\\text{p}K_w = \\text{pH} + \\text{pOH} = 14.00',
          callout:
            '"pH 7 is neutral" is only true at 25 °C. $K_w$ rises with temperature, so neutral water at 50 °C has pH ≈ 6.63 — still neutral because $[\\text{H}_3\\text{O}^{+}] = [\\text{OH}^{-}]$.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The neutralisation widget lets you mix strong acid and strong base while the $[\\text{H}_3\\text{O}^{+}]$, $[\\text{OH}^{-}]$, pH and pOH all update in real time.',
        tryThis: [
          'Start with 0.010 M HCl and note pH. Then dilute 10× and watch pH shift by one unit.',
          'Add NaOH one drop at a time until neutral; watch $[\\text{OH}^{-}]$ creep up while $[\\text{H}_3\\text{O}^{+}]$ crashes.',
          'Overshoot neutralisation — pH should climb above 7 and pOH drop below 7.',
        ],
        observe: [
          'pH + pOH never strays from 14.0 — the $K_w$ constraint is enforced at every step.',
          'Going from pH 2 to pH 3 drops $[\\text{H}_3\\text{O}^{+}]$ by a factor of 10, not "a little bit".',
          'Near neutral the curve is almost vertical — tiny added acid/base causes big pH swings when neither species dominates.',
        ],
      },
      notes: [
        {
          heading: 'Going backward: pH → $[\\text{H}_3\\text{O}^{+}]$',
          body:
            'Undo the log: $[\\text{H}_3\\text{O}^{+}] = 10^{-\\text{pH}}$. If pH = 3.70, then $[\\text{H}_3\\text{O}^{+}] = 10^{-3.70} = 2.0 \\times 10^{-4}$ M. Practice both directions — exam problems jump between them without warning.',
          formula: '[\\text{H}_3\\text{O}^{+}] = 10^{-\\text{pH}} \\qquad [\\text{OH}^{-}] = 10^{-\\text{pOH}}',
        },
        {
          heading: 'Worked example · pH of 0.0025 M HNO₃',
          body:
            'HNO₃ is a strong acid, so it dissociates completely: $[\\text{H}_3\\text{O}^{+}] = 0.0025$ M = $2.5 \\times 10^{-3}$. pH = $-\\log(2.5 \\times 10^{-3}) = 3 - \\log 2.5 = 3 - 0.40 = 2.60$. Check: pOH = 14.00 − 2.60 = 11.40, and $[\\text{OH}^{-}] = 10^{-11.40} \\approx 4.0 \\times 10^{-12}$ M — consistent with $K_w$.',
          formula: '\\text{pH} = -\\log(2.5\\times 10^{-3}) = 2.60',
        },
        {
          heading: 'Worked example · pOH from a base',
          body:
            'A 0.050 M NaOH solution is a strong base: $[\\text{OH}^{-}] = 0.050$ M. pOH = $-\\log(0.050) = 1.30$. pH = 14.00 − 1.30 = 12.70. Do not plug 0.050 into the pH formula — that treats the base as if it released $\\text{H}_3\\text{O}^{+}$, which it did not.',
          callout:
            'Rule of thumb: if the solution is basic, find pOH first, then subtract from 14. Skipping straight to pH invites sign errors.',
        },
      ],
      mcqs: [
        {
          id: 'q8.1.1',
          question: 'What is the pH of a 1.0 × 10⁻⁴ M HCl solution?',
          choices: ['2.0', '3.0', '4.0', '10.0'],
          correctIndex: 2,
          explanation:
            'HCl is strong, so $[\\text{H}_3\\text{O}^{+}] = 1.0 \\times 10^{-4}$. pH = $-\\log(10^{-4}) = 4.0$.',
        },
        {
          id: 'q8.1.2',
          question: 'A solution has pH = 9.0 at 25 °C. Which statement is true?',
          choices: [
            '$[\\text{H}_3\\text{O}^{+}] = 10^{-9}$ M and pOH = 5.0',
            '$[\\text{OH}^{-}] = 10^{-9}$ M and pOH = 5.0',
            '$[\\text{H}_3\\text{O}^{+}] = 10^{-9}$ M and pOH = 9.0',
            'The solution is acidic',
          ],
          correctIndex: 0,
          explanation:
            'pH 9 → $[\\text{H}_3\\text{O}^{+}] = 10^{-9}$. pOH = 14 − 9 = 5, so $[\\text{OH}^{-}] = 10^{-5}$ (basic).',
        },
        {
          id: 'q8.1.3',
          question: 'How many times more acidic is a solution of pH 2 than one of pH 5?',
          choices: ['3×', '10×', '100×', '1000×'],
          correctIndex: 3,
          explanation:
            'Each pH unit = factor of 10 in $[\\text{H}_3\\text{O}^{+}]$. 5 − 2 = 3 units → $10^{3} = 1000\\times$.',
        },
        {
          id: 'q8.1.4',
          question: 'What is the pH of 0.025 M NaOH?',
          choices: ['1.60', '7.00', '12.40', '13.60'],
          correctIndex: 2,
          explanation:
            '$[\\text{OH}^{-}] = 0.025$; pOH = $-\\log(0.025) = 1.60$; pH = 14.00 − 1.60 = 12.40.',
        },
        {
          id: 'q8.1.5',
          question:
            'At 50 °C, $K_w = 5.5 \\times 10^{-14}$. The pH of pure (neutral) water at this temperature is:',
          choices: ['exactly 7.00', 'slightly above 7', 'slightly below 7', 'undefined'],
          correctIndex: 2,
          explanation:
            '$[\\text{H}_3\\text{O}^{+}] = \\sqrt{K_w} = \\sqrt{5.5 \\times 10^{-14}} \\approx 2.3 \\times 10^{-7}$, so pH ≈ 6.63. Still neutral because $[\\text{H}_3\\text{O}^{+}] = [\\text{OH}^{-}]$.',
        },
      ],
    },

    // ────────────────── 8.2 Strong vs Weak ──────────────────
    {
      topicId: '8.2',
      overview:
        'Strong acids hand their protons off completely; weak acids only nudge the equilibrium. The difference shows up in pH, conductivity, and the shape of every titration curve.',
      lead: [
        {
          heading: '"Strong" means 100% dissociated',
          body:
            'Six strong acids memorise: HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ (first proton only). Strong bases: Group-1 hydroxides plus Ca(OH)₂, Sr(OH)₂, Ba(OH)₂. For these, $[\\text{H}_3\\text{O}^{+}]$ (or $[\\text{OH}^{-}]$) equals the initial concentration. Everything else is weak and needs an equilibrium calculation.',
          svg: strongWeakSVG,
        },
        {
          heading: '$K_a$ measures partial dissociation',
          body:
            'For a weak acid HA the equilibrium is $\\text{HA} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^{+} + \\text{A}^{-}$. The acid dissociation constant $K_a$ is the ratio of products to reactants at equilibrium — small $K_a$ means the reaction barely proceeds. The conjugate base $\\text{A}^{-}$ is what you get after HA gives up its proton; it is the other side of the equilibrium, not a new species.',
          formula: 'K_a = \\dfrac{[\\text{H}_3\\text{O}^{+}][\\text{A}^{-}]}{[\\text{HA}]}',
          callout:
            'If $K_a \\geq 1$, treat the acid as strong for AP purposes. If $K_a < 10^{-3}$ and the initial concentration is at least 100 × $K_a$, the "$x$ is small" approximation is safe (error < 5%).',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The titration widget ships with both a strong-acid and a weak-acid mode. Flip between them with the same base to see how the curve shape changes.',
        tryThis: [
          'Titrate 25 mL of 0.10 M HCl with 0.10 M NaOH. Note the starting pH and the jump at equivalence.',
          'Switch to 0.10 M CH₃COOH and repeat. Compare the starting pH and the shape of the buffer plateau.',
          'Mark the half-equivalence volume on each curve — see what pH the acetic-acid curve reads there.',
        ],
        observe: [
          'Strong acid starts near pH 1; weak acid starts near pH 3 (same concentration).',
          'Weak-acid curve has a gentle plateau in the middle — that\'s the buffer region (Topic 8.3).',
          'Both curves steepen dramatically at equivalence, but the equivalence pH is different (7 for strong-strong, >7 for weak-strong).',
        ],
      },
      notes: [
        {
          heading: 'Worked example · pH of 0.10 M CH₃COOH ($K_a = 1.8 \\times 10^{-5}$)',
          body:
            'Set up the ICE table: start 0.10 M HA, 0 M H₃O⁺, 0 M A⁻. Let $x$ = amount dissociated. At equilibrium: [HA] = 0.10 − $x$, [H₃O⁺] = [A⁻] = $x$. Plug into $K_a$: $1.8 \\times 10^{-5} = x^2 / (0.10 − x) \\approx x^2 / 0.10$. Solve $x = \\sqrt{1.8 \\times 10^{-6}} = 1.34 \\times 10^{-3}$. pH = $-\\log(1.34 \\times 10^{-3}) = 2.87$. Check: $x / 0.10 = 1.3\\%$ — tiny, so the approximation was valid.',
          formula: 'x = \\sqrt{K_a \\cdot C_0} = \\sqrt{(1.8\\times 10^{-5})(0.10)} = 1.3\\times 10^{-3}\\,\\text{M}',
        },
        {
          heading: 'Strong bases and weak bases',
          body:
            'A weak base like NH₃ accepts a proton from water: $\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^{+} + \\text{OH}^{-}$. Its strength is $K_b$, and the same $x = \\sqrt{K_b \\cdot C_0}$ shortcut gives $[\\text{OH}^{-}]$. Convert to pOH, then subtract from 14 for pH.',
          formula: 'K_b = \\dfrac{[\\text{BH}^{+}][\\text{OH}^{-}]}{[\\text{B}]}',
        },
        {
          heading: 'Worked example · 0.20 M NH₃ ($K_b = 1.8 \\times 10^{-5}$)',
          body:
            '$x = \\sqrt{(1.8 \\times 10^{-5})(0.20)} = \\sqrt{3.6 \\times 10^{-6}} = 1.9 \\times 10^{-3}$ M = $[\\text{OH}^{-}]$. pOH = $-\\log(1.9 \\times 10^{-3}) = 2.72$. pH = 14.00 − 2.72 = 11.28. Note the solution is basic but well short of NaOH at the same concentration (which would give pH 13.3).',
          callout:
            'The starting pH of a weak acid or base is always closer to 7 than the equivalent strong species at the same concentration — because only a tiny fraction reacted.',
        },
      ],
      mcqs: [
        {
          id: 'q8.2.1',
          question: 'Which of these is NOT a strong acid?',
          choices: ['HCl', 'HClO₄', 'HF', 'HNO₃'],
          correctIndex: 2,
          explanation:
            'HF is weak ($K_a = 7.2 \\times 10^{-4}$). Hydrogen-halide strength goes HF ≪ HCl < HBr < HI because the H–F bond is unusually strong.',
        },
        {
          id: 'q8.2.2',
          question:
            'A 0.10 M solution of a monoprotic weak acid has pH = 4.00. What is $K_a$?',
          choices: ['$1.0 \\times 10^{-8}$', '$1.0 \\times 10^{-7}$', '$1.0 \\times 10^{-6}$', '$1.0 \\times 10^{-4}$'],
          correctIndex: 1,
          explanation:
            'pH 4 → $x = [\\text{H}_3\\text{O}^{+}] = 10^{-4}$. $K_a \\approx x^2 / C_0 = 10^{-8}/0.10 = 10^{-7}$.',
        },
        {
          id: 'q8.2.3',
          question:
            'At equal concentration, which solution has the LOWEST pH?',
          choices: ['0.10 M HCl', '0.10 M CH₃COOH', '0.10 M NH₃', '0.10 M NaOH'],
          correctIndex: 0,
          explanation:
            'HCl is fully dissociated — gives pH = 1.0. The weak acid (acetic) gives pH ≈ 2.87; NH₃ and NaOH are basic.',
        },
        {
          id: 'q8.2.4',
          question:
            'Which statement correctly describes 0.1 M HCl vs 0.1 M CH₃COOH?',
          choices: [
            'Both have the same pH because both are monoprotic.',
            'CH₃COOH has a lower pH because it has more H atoms.',
            'HCl has a lower pH because it fully dissociates.',
            'HCl has a higher pH because it is more concentrated in A⁻.',
          ],
          correctIndex: 2,
          explanation:
            'Full dissociation sets [H₃O⁺] = 0.1 M for HCl (pH 1); acetic acid only reaches ~1.3 mM (pH ≈ 2.87).',
        },
        {
          id: 'q8.2.5',
          question: 'The pH of 0.20 M HF ($K_a = 7.2 \\times 10^{-4}$) is closest to:',
          choices: ['1.1', '1.9', '2.9', '4.0'],
          correctIndex: 1,
          explanation:
            '$x = \\sqrt{(7.2 \\times 10^{-4})(0.20)} = \\sqrt{1.44 \\times 10^{-4}} = 1.2 \\times 10^{-2}$. pH = $-\\log(0.012) \\approx 1.92$.',
        },
      ],
    },

    // ────────────────── 8.3 Buffers ──────────────────
    {
      topicId: '8.3',
      overview:
        'A buffer is a weak acid and its conjugate base mixed in comparable amounts. Adding a little acid or base barely budges the pH, because one partner neutralises each incoming proton.',
      lead: [
        {
          heading: 'Two ingredients, one pH hinge',
          body:
            'A buffer needs a weak acid HA and its conjugate base $\\text{A}^{-}$ both present at useful concentrations. Added strong acid gets soaked up by $\\text{A}^{-}$ (→ HA); added strong base is soaked up by HA (→ $\\text{A}^{-}$). Both reactions convert intruders into the buffer\'s existing species, so the pH barely moves.',
          svg: bufferLadderSVG,
        },
        {
          heading: 'Henderson-Hasselbalch',
          body:
            'Take $-\\log$ of the $K_a$ expression and solve for pH: you get the Henderson-Hasselbalch equation. When $[\\text{A}^{-}] = [\\text{HA}]$, the log term is zero and $\\text{pH} = \\text{p}K_a$ exactly. That\'s the "hinge" of the buffer — move one decade in either direction ($\\pm 1$ pH unit) and one partner becomes 10× the other.',
          formula: '\\text{pH} = \\text{p}K_a + \\log\\!\\left(\\dfrac{[\\text{A}^{-}]}{[\\text{HA}]}\\right)',
          callout:
            'Buffers work only within about $\\pm 1$ pH unit of their $\\text{p}K_a$. Outside that window one partner runs out — pick a buffer whose $\\text{p}K_a$ matches your target pH.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The buffer widget starts with a 1:1 mix of acetic acid and acetate. You can add HCl or NaOH and watch both the ratio and the pH update.',
        tryThis: [
          'Add small pulses of HCl — watch acetate convert to acetic acid and the pH dip slightly.',
          'Increase the total buffer concentration (both species together) and repeat; the pH change per pulse should shrink.',
          'Push past the buffer capacity by dumping in a lot of NaOH — the pH suddenly leaps once $\\text{HA}$ runs out.',
        ],
        observe: [
          'At the 1:1 point the pH sits right on the $\\text{p}K_a$ line.',
          '"Buffer capacity" — the amount of acid/base a buffer can absorb — scales with total concentration, not ratio.',
          'Dilution with pure water changes both concentrations equally, so the ratio (and pH) holds. That\'s why HH uses a ratio.',
        ],
      },
      notes: [
        {
          heading: 'Worked example · making a pH 4.74 buffer',
          body:
            'Goal: pH 4.74 using acetic acid ($\\text{p}K_a = 4.74$). HH says pH = $\\text{p}K_a$ when the ratio is 1. So dissolve equal moles of $\\text{CH}_3\\text{COOH}$ and $\\text{CH}_3\\text{COONa}$ — say 0.10 mol of each per litre. Check: $\\log(0.10/0.10) = 0$, so pH = 4.74. For pH 5.74, use a 10:1 ratio of acetate to acetic acid.',
          formula: '\\text{pH} = 4.74 + \\log(1) = 4.74',
        },
        {
          heading: 'Worked example · adding 0.010 mol NaOH to a buffer',
          body:
            'Start: 0.10 mol HA + 0.10 mol A⁻ in 1.00 L. Add 0.010 mol NaOH. NaOH consumes HA 1-for-1: new HA = 0.090 mol, new A⁻ = 0.110 mol. pH = $\\text{p}K_a + \\log(0.110/0.090) = 4.74 + \\log(1.22) = 4.74 + 0.087 = 4.83$. The pH barely moved (0.09 units). Without the buffer, 0.010 mol NaOH in 1 L pure water would hit pH 12.',
          formula: '\\text{pH} = \\text{p}K_a + \\log\\!\\left(\\tfrac{n_{A^-} + n_{OH^-}}{n_{HA} - n_{OH^-}}\\right)',
        },
        {
          heading: 'Buffer capacity',
          body:
            'Buffer capacity is a measure of how much strong acid or base a buffer can absorb before the pH shifts by one unit. It is largest when $[\\text{A}^{-}] = [\\text{HA}]$ and scales with the total moles of buffer present. Doubling the concentrations doubles the capacity; halving the ratio 10:1 cuts it sharply because the minority partner runs out first.',
        },
      ],
      mcqs: [
        {
          id: 'q8.3.1',
          question: 'Which pair makes the best buffer at pH 7?',
          choices: [
            'HCl / NaCl',
            'H₃PO₄ / H₂PO₄⁻ ($\\text{p}K_{a1}=2.1$)',
            'H₂PO₄⁻ / HPO₄²⁻ ($\\text{p}K_{a2}=7.2$)',
            'HPO₄²⁻ / PO₄³⁻ ($\\text{p}K_{a3}=12.4$)',
          ],
          correctIndex: 2,
          explanation:
            'Pick the conjugate pair whose $\\text{p}K_a$ is closest to the target pH. 7.2 is within 1 unit of 7 — the others aren\'t.',
        },
        {
          id: 'q8.3.2',
          question:
            'A buffer has $[\\text{A}^{-}]/[\\text{HA}] = 10$ and $\\text{p}K_a = 4.74$. Its pH is:',
          choices: ['3.74', '4.74', '5.74', '14.00 − 4.74'],
          correctIndex: 2,
          explanation:
            'pH = 4.74 + $\\log 10$ = 4.74 + 1.00 = 5.74. A 10:1 ratio shifts the buffer one decade above $\\text{p}K_a$.',
        },
        {
          id: 'q8.3.3',
          question:
            'You double the volume of a buffer by adding pure water. The pH:',
          choices: [
            'drops by one unit',
            'rises by one unit',
            'stays essentially unchanged',
            'drops to 7.0 exactly',
          ],
          correctIndex: 2,
          explanation:
            'HH uses the ratio of the two species. Diluting both by the same factor leaves the ratio unchanged, so pH is unchanged (capacity drops, though).',
        },
        {
          id: 'q8.3.4',
          question:
            'Which addition will destroy a pH 4.74 acetic-acid/acetate buffer fastest?',
          choices: [
            'A pulse of water',
            'A large amount of NaOH — more moles than the HA present',
            'Adding more acetate',
            'Stirring',
          ],
          correctIndex: 1,
          explanation:
            'Once the NaOH exceeds the moles of HA, all the acid is consumed and only A⁻ remains — the buffer is gone and pH jumps to the basic region.',
        },
        {
          id: 'q8.3.5',
          question:
            'A buffer is made from 0.20 mol HA and 0.10 mol A⁻ in 1.00 L ($\\text{p}K_a = 5.00$). Its pH is closest to:',
          choices: ['4.70', '5.00', '5.30', '5.70'],
          correctIndex: 0,
          explanation:
            'pH = 5.00 + $\\log(0.10/0.20)$ = 5.00 + $\\log(0.5)$ = 5.00 − 0.30 = 4.70. More HA than A⁻ → pH below $\\text{p}K_a$.',
        },
      ],
    },

    // ────────────────── 8.4 Titrations ──────────────────
    {
      topicId: '8.4',
      overview:
        'A titration is a stoichiometric contest: add measured base to a measured acid until the reaction is exactly complete. The pH curve reveals whether the acid is strong or weak, and exactly how much of it is there.',
      lead: [
        {
          heading: 'The equivalence point',
          body:
            'The equivalence point is the volume of titrant where moles of added base equal moles of original acid. It is NOT necessarily pH 7 — that\'s only true for a strong-strong titration. A weak acid titrated with strong base finishes at pH > 7 because the conjugate base $\\text{A}^{-}$ is basic.',
          svg: titrationSVG,
        },
        {
          heading: 'Half-equivalence: the free $\\text{p}K_a$',
          body:
            'At the half-equivalence point, exactly half the weak acid has been converted to its conjugate base — so $[\\text{HA}] = [\\text{A}^{-}]$. Plug into Henderson-Hasselbalch: the log term is zero and $\\text{pH} = \\text{p}K_a$. Reading the pH off the curve at half-equivalence is the quickest way to measure $\\text{p}K_a$ in lab.',
          formula: '\\text{at }\\tfrac{1}{2} V_{\\text{eq}}: \\quad [\\text{HA}] = [\\text{A}^{-}] \\;\\Rightarrow\\; \\text{pH} = \\text{p}K_a',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'Run the titration widget with a weak acid and watch the whole four-region story unfold: initial, buffer, equivalence, excess base.',
        tryThis: [
          'Mark the initial pH, half-equivalence pH, equivalence pH, and final pH on a sketch.',
          'Re-run with a different $K_a$ and compare where the buffer plateau sits.',
          'Swap to a polyprotic acid (if supported) — two equivalence points appear, one per proton.',
        ],
        observe: [
          'The steepest part of the curve ("the jump") brackets the equivalence point.',
          'The indicator you choose needs its colour-change window to sit inside the jump, not around pH 7.',
          'The plateau pH equals $\\text{p}K_a$ at exactly $V_{\\text{eq}}/2$ — line up the tick mark with the y-axis.',
        ],
      },
      notes: [
        {
          heading: 'Four regions of a weak-acid / strong-base curve',
          body:
            'Region 1 (before any base): pure weak acid, use $x = \\sqrt{K_a C_0}$. Region 2 (buffer): mix of HA and A⁻, use Henderson-Hasselbalch with mole ratios. Region 3 (equivalence): only A⁻ left, use $K_b = K_w / K_a$ and solve for $[\\text{OH}^{-}]$. Region 4 (past equivalence): excess OH⁻ dominates, use the leftover hydroxide directly.',
          callout:
            'Stop treating each region as a new mystery. They are four equilibria — initial weak acid, buffer, salt of a weak acid, strong base — that you already know how to solve individually.',
        },
        {
          heading: 'Worked example · 25.0 mL of 0.100 M CH₃COOH vs 0.100 M NaOH',
          body:
            'Moles HA = 0.00250. Equivalence reached at 25.0 mL NaOH. At half-equivalence (12.5 mL), $[\\text{HA}] = [\\text{A}^{-}]$, so pH = $\\text{p}K_a$ = 4.74. At equivalence, all 0.00250 mol is now acetate in 50.0 mL total: $[\\text{A}^{-}] = 0.0500$ M. $K_b = 10^{-14}/1.8 \\times 10^{-5} = 5.6 \\times 10^{-10}$. $[\\text{OH}^{-}] = \\sqrt{(5.6 \\times 10^{-10})(0.0500)} = 5.3 \\times 10^{-6}$. pOH = 5.28, pH = 8.72.',
          formula: '\\text{pH}_{\\text{eq}} = 14 - \\tfrac{1}{2}\\big(\\text{p}K_b - \\log C_{A^-}\\big) \\approx 8.72',
        },
        {
          heading: 'Indicator selection',
          body:
            'An acid-base indicator is itself a weak acid whose protonated and deprotonated forms have different colours. It changes colour over roughly $\\text{p}K_{\\text{In}} \\pm 1$. Choose an indicator whose $\\text{p}K_{\\text{In}}$ sits inside the equivalence-point jump. For weak acid vs strong base (equiv pH ≈ 8–10), phenolphthalein ($\\text{p}K_{\\text{In}} \\approx 9.4$) is the standard choice. Methyl orange ($\\text{p}K_{\\text{In}} \\approx 3.7$) would flip far before the real endpoint.',
        },
      ],
      mcqs: [
        {
          id: 'q8.4.1',
          question:
            '25.0 mL of 0.100 M HCl is titrated with 0.100 M NaOH. The pH at equivalence is:',
          choices: ['Less than 7', 'Exactly 7', 'Greater than 7', 'Depends on the indicator'],
          correctIndex: 1,
          explanation:
            'Strong acid + strong base gives a neutral salt (NaCl). Only water auto-ionisation remains → pH 7.',
        },
        {
          id: 'q8.4.2',
          question:
            'At half-equivalence in the titration of 0.10 M formic acid ($K_a = 1.8 \\times 10^{-4}$), the pH is:',
          choices: ['1.87', '2.87', '3.74', '4.74'],
          correctIndex: 2,
          explanation:
            'At half-equivalence pH = $\\text{p}K_a$ = $-\\log(1.8 \\times 10^{-4}) \\approx 3.74$.',
        },
        {
          id: 'q8.4.3',
          question:
            'A weak-acid/strong-base titration equivalence pH is 9.1. The best indicator is:',
          choices: [
            'Methyl orange ($\\text{p}K_{\\text{In}} = 3.7$)',
            'Bromocresol green (4.7)',
            'Bromothymol blue (7.1)',
            'Phenolphthalein (9.4)',
          ],
          correctIndex: 3,
          explanation:
            'The indicator must flip colour inside the equivalence jump. Only phenolphthalein sits near pH 9.',
        },
        {
          id: 'q8.4.4',
          question:
            'A 40.0 mL sample of HCl required 16.0 mL of 0.250 M NaOH to reach equivalence. The concentration of HCl is:',
          choices: ['0.0625 M', '0.100 M', '0.160 M', '0.250 M'],
          correctIndex: 1,
          explanation:
            'Moles NaOH = 0.0160 × 0.250 = 0.00400 mol = moles HCl. [HCl] = 0.00400 / 0.0400 = 0.100 M.',
        },
        {
          id: 'q8.4.5',
          question:
            'Which statement about a weak-acid/strong-base titration is TRUE?',
          choices: [
            'The equivalence point is always pH 7.',
            'The pH at equivalence is above 7 because the conjugate base is basic.',
            'The buffer region is steepest near equivalence.',
            'Adding more base lowers the final pH.',
          ],
          correctIndex: 1,
          explanation:
            'At equivalence only $\\text{A}^{-}$ remains; it hydrolyses water to give $[\\text{OH}^{-}] > [\\text{H}_3\\text{O}^{+}]$, so pH > 7.',
        },
      ],
    },

    // ────────────────── 8.5 pKa & Conjugate ──────────────────
    {
      topicId: '8.5',
      overview:
        'A stronger acid gives up protons more eagerly — which means its conjugate base holds them more weakly. $\\text{p}K_a$ turns that seesaw into a single number you can rank acids by.',
      lead: [
        {
          heading: '$\\text{p}K_a = -\\log K_a$',
          body:
            'Big $K_a$ (strong acid) → small $\\text{p}K_a$. Every drop of one unit in $\\text{p}K_a$ means the acid is 10× stronger. Acetic acid is $\\text{p}K_a$ 4.74; HF is 3.17 (about 40× stronger); HCl is around −7 (roughly 10¹² stronger). The sign flip takes getting used to — smaller $\\text{p}K_a$ means MORE acidic.',
          svg: conjugateSVG,
          formula: '\\text{p}K_a = -\\log K_a \\qquad \\text{p}K_a + \\text{p}K_b = 14',
        },
        {
          heading: 'The conjugate seesaw',
          body:
            'For any conjugate pair, $K_a \\cdot K_b = K_w$. Take logs: $\\text{p}K_a + \\text{p}K_b = 14$. So a strong acid (low $\\text{p}K_a$) has a weak conjugate base (high $\\text{p}K_b$), and vice versa. The anion of a strong acid ($\\text{Cl}^{-}$, $\\text{NO}_3^{-}$) is so weak a base it doesn\'t affect pH at all — that\'s why NaCl is neutral and NaF is slightly basic.',
          callout:
            'Strong-acid conjugates ($\\text{Cl}^{-}$, $\\text{Br}^{-}$, $\\text{NO}_3^{-}$, $\\text{ClO}_4^{-}$) are spectator ions. Weak-acid conjugates ($\\text{F}^{-}$, $\\text{CH}_3\\text{COO}^{-}$, $\\text{CN}^{-}$) are weak bases and DO raise pH.',
        },
      ],
      interact: {
        heading: 'Do this in the interaction below',
        intro:
          'The buffer widget is repurposed here — use it to explore how shifting $\\text{p}K_a$ shifts the buffer\'s pH hinge without changing any concentrations.',
        tryThis: [
          'Hold the 1:1 ratio constant and change the acid from acetic ($\\text{p}K_a$ 4.74) to HF (3.17) to HCN (9.21).',
          'For each acid, note the buffer pH and the conjugate base $K_b$.',
          'Spot which conjugate base is strong enough to push pH above 10 on its own (salt hydrolysis).',
        ],
        observe: [
          'The buffer pH at 1:1 is always exactly $\\text{p}K_a$ — the widget is drawing a slice through the conjugate seesaw.',
          'Low-$\\text{p}K_a$ acids give acidic buffers; high-$\\text{p}K_a$ acids give basic ones.',
          'HCN\'s conjugate $\\text{CN}^{-}$ is a meaningfully basic anion — a solution of pure NaCN is well above pH 10.',
        ],
      },
      notes: [
        {
          heading: 'Ranking acid strength from structure',
          body:
            'Down a group: H–X bond weakens, so HX is more acidic (HI ≫ HCl). Across a period: electronegativity of X wins, so $\\text{H}_2\\text{O}$ < HF, and $\\text{CH}_4$ < $\\text{NH}_3$ < $\\text{H}_2\\text{O}$ < HF. Oxyacids: more oxygens on the central atom pull electrons off the O–H, making it more acidic ($\\text{HClO}_4 > \\text{HClO}_3 > \\text{HClO}_2 > \\text{HClO}$).',
        },
        {
          heading: 'Worked example · is NaF acidic, basic, or neutral?',
          body:
            'NaF fully dissociates into $\\text{Na}^{+}$ (spectator) and $\\text{F}^{-}$. $\\text{F}^{-}$ is the conjugate base of the weak acid HF ($\\text{p}K_a$ = 3.17), so it is mildly basic. Compute $K_b = K_w / K_a = 10^{-14}/(7.2 \\times 10^{-4}) = 1.4 \\times 10^{-11}$. For 0.10 M NaF: $[\\text{OH}^{-}] = \\sqrt{(1.4 \\times 10^{-11})(0.10)} = 1.2 \\times 10^{-6}$. pOH = 5.9, pH ≈ 8.1 — slightly basic, as predicted.',
          formula: 'K_b(\\text{F}^{-}) = \\dfrac{K_w}{K_a(\\text{HF})} = 1.4\\times 10^{-11}',
        },
        {
          heading: 'Worked example · pick the stronger acid by $\\text{p}K_a$',
          body:
            'Chloroacetic acid $\\text{p}K_a$ = 2.87; acetic acid $\\text{p}K_a$ = 4.74. Chloroacetic is stronger by 4.74 − 2.87 = 1.87 pH units → roughly $10^{1.87} \\approx 74$× stronger. Why? The electronegative Cl on the $\\alpha$ carbon pulls electron density away from the –COOH, stabilising the anion and making the proton easier to release.',
        },
      ],
      mcqs: [
        {
          id: 'q8.5.1',
          question: 'Acid A has $\\text{p}K_a$ = 3; acid B has $\\text{p}K_a$ = 6. Which is stronger and by how much?',
          choices: [
            'B is stronger by 2×',
            'A is stronger by 3×',
            'A is stronger by ~1000×',
            'B is stronger by ~1000×',
          ],
          correctIndex: 2,
          explanation:
            'Smaller $\\text{p}K_a$ → stronger acid. Difference of 3 units = $10^{3}$ = 1000× in $K_a$.',
        },
        {
          id: 'q8.5.2',
          question:
            'HClO has $\\text{p}K_a$ = 7.5. The $\\text{p}K_b$ of $\\text{ClO}^{-}$ is:',
          choices: ['6.5', '7.5', '10⁻⁷·⁵', '14 − 7.5 = 6.5... no, 6.5'],
          correctIndex: 0,
          explanation:
            '$\\text{p}K_a + \\text{p}K_b = 14$. 14 − 7.5 = 6.5.',
        },
        {
          id: 'q8.5.3',
          question: 'Which 0.1 M salt solution has the HIGHEST pH?',
          choices: ['NaCl', 'NH₄Cl', 'NaF', 'NaCN (HCN $\\text{p}K_a$ = 9.2)'],
          correctIndex: 3,
          explanation:
            'CN⁻ is the conjugate of a very weak acid (high $\\text{p}K_a$ → strong conjugate base). It hydrolyses water substantially; 0.1 M NaCN is ~pH 11.',
        },
        {
          id: 'q8.5.4',
          question: 'Which statement about conjugate pairs is correct?',
          choices: [
            'A strong acid has a strong conjugate base.',
            'A weak acid has a weak conjugate base.',
            'A strong acid has a weak conjugate base.',
            'Conjugate strength is unrelated to acid strength.',
          ],
          correctIndex: 2,
          explanation:
            'The seesaw: $K_a K_b = K_w$. Bigger $K_a$ forces smaller $K_b$, and vice versa.',
        },
        {
          id: 'q8.5.5',
          question:
            'Based on structure, which is the STRONGEST acid?',
          choices: ['HClO', 'HClO₂', 'HClO₃', 'HClO₄'],
          correctIndex: 3,
          explanation:
            'More oxygens on Cl pull electron density off the O–H and stabilise the anion. Strength rises HClO < HClO₂ < HClO₃ < HClO₄.',
        },
      ],
    },
  ],

  // ──────────────────── UNIT-WIDE FINAL TEST ────────────────────
  unitTest: [
    {
      id: 'ut8.1',
      question: 'The pH of a 0.0010 M HNO₃ solution is:',
      choices: ['1.0', '2.0', '3.0', '4.0'],
      correctIndex: 2,
      explanation:
        'HNO₃ is strong; $[\\text{H}_3\\text{O}^{+}] = 10^{-3}$ → pH = 3.0.',
    },
    {
      id: 'ut8.2',
      question: 'A solution has $[\\text{OH}^{-}] = 2.0 \\times 10^{-3}$ M. Its pH is closest to:',
      choices: ['2.70', '3.70', '10.30', '11.30'],
      correctIndex: 3,
      explanation:
        'pOH = $-\\log(2.0 \\times 10^{-3}) = 2.70$; pH = 14.00 − 2.70 = 11.30.',
    },
    {
      id: 'ut8.3',
      question: 'Which of the following is a weak acid?',
      choices: ['HBr', 'HClO₄', 'HNO₃', 'HF'],
      correctIndex: 3,
      explanation:
        'HF is the only weak acid here ($K_a = 7.2 \\times 10^{-4}$). The others are all among the six standard strong acids.',
    },
    {
      id: 'ut8.4',
      question:
        'The pH of 0.20 M benzoic acid ($K_a = 6.3 \\times 10^{-5}$) is closest to:',
      choices: ['1.95', '2.45', '2.95', '3.45'],
      correctIndex: 1,
      explanation:
        '$x = \\sqrt{(6.3 \\times 10^{-5})(0.20)} = \\sqrt{1.26 \\times 10^{-5}} = 3.55 \\times 10^{-3}$. pH = $-\\log(3.55 \\times 10^{-3}) \\approx 2.45$.',
    },
    {
      id: 'ut8.5',
      question:
        'A buffer contains 0.30 M HA and 0.15 M A⁻. If $\\text{p}K_a$ = 5.00, pH ≈',
      choices: ['4.70', '4.85', '5.00', '5.30'],
      correctIndex: 0,
      explanation:
        'pH = 5.00 + $\\log(0.15/0.30)$ = 5.00 − 0.30 = 4.70.',
    },
    {
      id: 'ut8.6',
      question:
        'Which statement about a buffer is FALSE?',
      choices: [
        'It contains a weak acid and its conjugate base.',
        'Its pH equals $\\text{p}K_a$ when [HA] = [A⁻].',
        'It works best when the target pH is within ±1 of $\\text{p}K_a$.',
        'It is destroyed by dilution with pure water.',
      ],
      correctIndex: 3,
      explanation:
        'HH uses a ratio, so dilution (which changes both concentrations equally) leaves pH essentially unchanged. Buffer capacity drops, but pH holds.',
    },
    {
      id: 'ut8.7',
      question:
        'For the titration of 25.0 mL of 0.10 M CH₃COOH ($\\text{p}K_a$ = 4.74) with 0.10 M NaOH, at the half-equivalence point the pH is:',
      choices: ['2.87', '4.74', '7.00', '8.72'],
      correctIndex: 1,
      explanation:
        'At half-equivalence [HA] = [A⁻], so pH = $\\text{p}K_a$ = 4.74.',
    },
    {
      id: 'ut8.8',
      question:
        'At the equivalence point of the same titration, the pH is:',
      choices: ['≈ 4.74', '= 7.00', '≈ 8.72', '≈ 12.00'],
      correctIndex: 2,
      explanation:
        'Only acetate remains. $K_b = 10^{-14}/1.8 \\times 10^{-5} = 5.6 \\times 10^{-10}$; solving with $C_{A^-}$ = 0.050 M gives pH ≈ 8.72.',
    },
    {
      id: 'ut8.9',
      question:
        '30.0 mL of HCl is titrated with 0.150 M NaOH, reaching equivalence at 24.0 mL. [HCl] =',
      choices: ['0.0500 M', '0.120 M', '0.150 M', '0.188 M'],
      correctIndex: 1,
      explanation:
        'Moles NaOH = 0.024 × 0.150 = 0.00360 mol = moles HCl. [HCl] = 0.00360 / 0.0300 = 0.120 M.',
    },
    {
      id: 'ut8.10',
      question:
        'Which indicator is best for a titration whose equivalence pH is 4.5?',
      choices: [
        'Methyl orange ($\\text{p}K_{\\text{In}} = 3.7$)',
        'Bromocresol green (4.7)',
        'Bromothymol blue (7.1)',
        'Phenolphthalein (9.4)',
      ],
      correctIndex: 1,
      explanation:
        'Bromocresol green flips colour within ~3.7–5.7, bracketing the equivalence pH of 4.5.',
    },
    {
      id: 'ut8.11',
      question:
        'Rank these acids by increasing strength: HClO, HClO₂, HClO₃, HClO₄.',
      choices: [
        'HClO < HClO₂ < HClO₃ < HClO₄',
        'HClO₄ < HClO₃ < HClO₂ < HClO',
        'HClO₂ < HClO₄ < HClO < HClO₃',
        'All are equally strong (oxyacids of Cl)',
      ],
      correctIndex: 0,
      explanation:
        'More terminal oxygens pull electron density off the O–H bond and stabilise the anion → stronger acid.',
    },
    {
      id: 'ut8.12',
      question: 'Which salt dissolves to give a basic solution?',
      choices: ['NaCl', 'KNO₃', 'NaF', 'NH₄Cl'],
      correctIndex: 2,
      explanation:
        'F⁻ is the conjugate base of weak HF → mildly basic. NaCl and KNO₃ have spectator ions (neutral). NH₄Cl is acidic (NH₄⁺ is a weak acid).',
    },
    {
      id: 'ut8.13',
      question:
        'Acid X has $K_a = 4.0 \\times 10^{-4}$. What is $\\text{p}K_a$ (to 2 d.p.)?',
      choices: ['2.60', '3.40', '3.60', '4.00'],
      correctIndex: 1,
      explanation:
        '$\\text{p}K_a = -\\log(4.0 \\times 10^{-4}) = 4 - \\log 4 = 4 - 0.60 = 3.40$.',
    },
    {
      id: 'ut8.14',
      question:
        'Adding 0.010 mol HCl to a 1.00 L buffer containing 0.10 mol HA and 0.10 mol A⁻ ($\\text{p}K_a$ = 5.00) gives a new pH of:',
      choices: ['4.05', '4.91', '5.00', '5.09'],
      correctIndex: 1,
      explanation:
        'HCl converts A⁻ → HA: new HA = 0.110, new A⁻ = 0.090. pH = 5.00 + $\\log(0.090/0.110)$ = 5.00 − 0.087 ≈ 4.91.',
    },
    {
      id: 'ut8.15',
      question:
        'Which pair of statements about conjugates is correct?',
      choices: [
        'Strong acids have strong conjugate bases; $K_a K_b = K_w$.',
        'Strong acids have weak conjugate bases; $K_a K_b = K_w$.',
        'Strong acids have weak conjugate bases; $K_a + K_b = K_w$.',
        'Conjugate strength is independent of acid strength.',
      ],
      correctIndex: 1,
      explanation:
        'The seesaw: $K_a \\cdot K_b = K_w$ (not sum). Strong acid → tiny $K_b$ for its conjugate base.',
    },
  ],
};
