import { useEffect, useRef, useState } from 'react';
import UISlider from '../components/ui/Slider';
import SlideTabs from '../components/ui/SlideTabs';

/**
 * Endothermic vs Exothermic — PhET-grade interactive.
 *
 * Synchronized panels:
 *  · LEFT  — molecular animation (reactants → transition state → products), looping.
 *  · RIGHT — energy diagram with marble that rides an SVG path (getPointAtLength).
 *  · BELOW — thermometer for the surroundings, live bond-energy tally,
 *            real-reaction selector, sign-convention banner, and live numbers.
 *
 * Sign convention:  ΔH < 0 → exothermic (system releases heat to surroundings)
 *                   ΔH > 0 → endothermic (system absorbs heat from surroundings)
 */

type Mode = 'exo' | 'endo';

type Atom = { sym: string; r: number; color: string; charge?: string };
type BondSpec = { a: number; b: number; order?: 1 | 2 | 3 };
type P = { x: number; y: number };
type Reaction = {
  id: string;
  mode: Mode;
  label: string;
  equation: React.ReactNode;
  deltaH: number;        // kJ/mol
  Ea: number;            // kJ/mol activation energy (illustrative)
  reactE: number;        // baseline reactant energy (kJ/mol, illustrative)
  // Bond-energy ledger
  broken: { name: string; E: number }[];   // kJ/mol, positive (energy IN)
  formed: { name: string; E: number }[];   // kJ/mol, positive magnitude (energy OUT)
  // Atoms + five-frame position track (variable length per reaction)
  atoms: Atom[];
  frames: P[][];          // 5 frames, each same length as atoms
  oldBonds: BondSpec[];   // bonds present at start (fade out through transition)
  newBonds: BondSpec[];   // bonds formed by products (fade in after transition)
  persistBonds?: BondSpec[]; // bonds visible the entire time (e.g. internal ion bonds)
  // Optional note appended below the scene to clarify scale / stoichiometry
  note?: string;
  // Display labels for reactants / products in the scene
  rLabel: string;
  pLabel: string;
};

const C = {
  H:  '#f0e6d2',
  O:  '#ff5b3c',
  C:  '#7d8d99',
  N:  '#5dd0ff',
  Cl: '#69e36b',
  Na: '#a78bfa',
  hot:    '#ff6b35',
  cool:   '#5dd0ff',
  warn:   '#fbbf24',
  paper:  '#f5f1e8',
};

const REACTIONS: Reaction[] = [
  // ============================================================
  // Methane combustion: CH4 + 2 O2 -> CO2 + 2 H2O (9 atoms)
  // ============================================================
  {
    id: 'methane',
    mode: 'exo',
    label: 'Methane combustion',
    equation: <>CH<sub>4</sub> + 2 O<sub>2</sub> → CO<sub>2</sub> + 2 H<sub>2</sub>O</>,
    deltaH: -890, Ea: 250, reactE: 0,
    broken: [
      { name: '4 × C–H', E: 4 * 413 },
      { name: '2 × O=O', E: 2 * 498 },
    ],
    formed: [
      { name: '2 × C=O', E: 2 * 799 },
      { name: '4 × O–H', E: 4 * 463 },
    ],
    // atoms: [C, H1..H4 (from CH4), O5,O6 (first O2 → CO2), O7,O8 (second O2 → waters)]
    atoms: [
      { sym: 'C', r: 20, color: C.C },
      { sym: 'H', r: 12, color: C.H },
      { sym: 'H', r: 12, color: C.H },
      { sym: 'H', r: 12, color: C.H },
      { sym: 'H', r: 12, color: C.H },
      { sym: 'O', r: 17, color: C.O },
      { sym: 'O', r: 17, color: C.O },
      { sym: 'O', r: 17, color: C.O },
      { sym: 'O', r: 17, color: C.O },
    ],
    // Trajectories (smooth, roughly monotonic):
    //   C0 drifts rightward to become CO2's carbon.
    //   O2's break: O6/O7 converge on C to form O=C=O; O5 & O8 coast over to the
    //   left to cap the two water molecules (forming ∧ over the top H's and ∨
    //   under the bottom H's). The H's stay in their quadrants and only flex a
    //   bit vertically to bracket their new O partners.
    frames: [
      // Frame 0 — CH4 on left, two O2 on right (top & bottom)
      [{x:100,y:150},{x:70,y:115},{x:135,y:115},{x:70,y:185},{x:135,y:185},{x:445,y:85},{x:500,y:85},{x:445,y:215},{x:500,y:215}],
      // Frame 1 — approaching / aligning
      [{x:175,y:150},{x:135,y:118},{x:200,y:118},{x:135,y:182},{x:200,y:182},{x:345,y:95},{x:400,y:115},{x:345,y:205},{x:400,y:185}],
      // Frame 2 — transition state: compact cluster, O2 bonds loosening
      [{x:230,y:150},{x:170,y:112},{x:225,y:112},{x:170,y:188},{x:225,y:188},{x:245,y:95},{x:275,y:140},{x:275,y:160},{x:245,y:205}],
      // Frame 3 — products forming: CO2 center, O's arching out to the waters
      [{x:275,y:150},{x:130,y:110},{x:190,y:110},{x:130,y:190},{x:190,y:190},{x:170,y:88},{x:235,y:150},{x:325,y:150},{x:170,y:212}],
      // Frame 4 — products settled: linear O=C=O, two bent H2O on the left
      [{x:280,y:150},{x:118,y:108},{x:182,y:108},{x:118,y:192},{x:182,y:192},{x:150,y:82},{x:235,y:150},{x:325,y:150},{x:150,y:218}],
    ],
    oldBonds: [
      {a:0,b:1},{a:0,b:2},{a:0,b:3},{a:0,b:4},   // CH4
      {a:5,b:6,order:2},{a:7,b:8,order:2},        // two O=O
    ],
    newBonds: [
      {a:0,b:6,order:2},{a:0,b:7,order:2},        // O=C=O
      {a:5,b:1},{a:5,b:2},                        // water 1 (O5 + H1,H2)
      {a:8,b:3},{a:8,b:4},                        // water 2 (O8 + H3,H4)
    ],
    rLabel: 'CH₄ · 2 O₂',
    pLabel: 'CO₂ · 2 H₂O',
  },

  // ============================================================
  // H2 + Cl2 -> 2 HCl (4 atoms) — atoms literally re-pair
  // ============================================================
  {
    id: 'h2cl2',
    mode: 'exo',
    label: 'H₂ + Cl₂ → 2 HCl',
    equation: <>H<sub>2</sub>(g) + Cl<sub>2</sub>(g) → 2 HCl(g)</>,
    deltaH: -184, Ea: 25, reactE: 0,
    broken: [
      { name: '1 × H–H', E: 436 },
      { name: '1 × Cl–Cl', E: 242 },
    ],
    formed: [
      { name: '2 × H–Cl', E: 2 * 431 },
    ],
    atoms: [
      { sym: 'H',  r: 14, color: C.H },
      { sym: 'H',  r: 14, color: C.H },
      { sym: 'Cl', r: 22, color: C.Cl },
      { sym: 'Cl', r: 22, color: C.Cl },
    ],
    frames: [
      // Frame 0 — H2 left, Cl2 right
      [{x:130,y:150},{x:180,y:150},{x:440,y:150},{x:500,y:150}],
      // Frame 1 — approaching
      [{x:190,y:150},{x:245,y:150},{x:380,y:150},{x:440,y:150}],
      // Frame 2 — transition: linear arrangement
      [{x:220,y:150},{x:310,y:150},{x:265,y:150},{x:355,y:150}],
      // Frame 3 — products forming: two HCl molecules separating
      [{x:170,y:150},{x:420,y:150},{x:225,y:150},{x:475,y:150}],
      // Frame 4 — settled
      [{x:150,y:150},{x:410,y:150},{x:205,y:150},{x:465,y:150}],
    ],
    oldBonds: [{a:0,b:1},{a:2,b:3}],
    newBonds: [{a:0,b:2},{a:1,b:3}],
    rLabel: 'H₂ · Cl₂',
    pLabel: '2 HCl',
  },

  // ============================================================
  // Photosynthesis — shown as the 1:1 balanced fragment
  //   CO2 + H2O -> CH2O + O2  (×6 gives the full equation)
  // ============================================================
  {
    id: 'photo',
    mode: 'endo',
    label: 'Photosynthesis',
    equation: <>6 CO<sub>2</sub> + 6 H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6 O<sub>2</sub></>,
    deltaH: 2803, Ea: 3100, reactE: 0,
    broken: [
      { name: '12 × C=O', E: 12 * 799 },
      { name: '12 × O–H', E: 12 * 463 },
    ],
    formed: [
      // glucose (open-chain): 5 C–C, 7 C–H, 5 C–O, 5 O–H, 1 C=O (aldehyde)
      { name: 'glucose bonds', E: 5 * 358 + 7 * 413 + 5 * 358 + 5 * 463 + 1 * 745 },
      { name: '6 × O=O', E: 6 * 498 },
    ],
    // atoms: [C0, O1, O2 (from CO2); H3, H4, O5 (from H2O)]
    // In the product, C0 keeps its bond to O1 (this becomes formaldehyde's C=O);
    // O2 leaves and pairs with O5 (the water's oxygen) to form O2 gas;
    // H3 and H4 migrate onto C0 to complete H2C=O.
    atoms: [
      { sym: 'C', r: 20, color: C.C },
      { sym: 'O', r: 18, color: C.O },
      { sym: 'O', r: 18, color: C.O },
      { sym: 'H', r: 12, color: C.H },
      { sym: 'H', r: 12, color: C.H },
      { sym: 'O', r: 18, color: C.O },
    ],
    // Stacked reactant layout (CO2 on top, H2O on bottom — both on the left)
    // keeps trajectories mostly monotonic and avoids atoms crossing each other.
    frames: [
      // Frame 0 — CO2 top-left (linear), H2O bottom-left (bent)
      [{x:130,y:85},{x:70,y:85},{x:190,y:85},{x:90,y:235},{x:175,y:235},{x:130,y:220}],
      // Frame 1 — drifting toward center
      [{x:135,y:120},{x:85,y:110},{x:195,y:115},{x:105,y:205},{x:185,y:200},{x:215,y:210}],
      // Frame 2 — transition: loose cluster mid-left, O2-going-out drifts right
      [{x:145,y:145},{x:110,y:115},{x:240,y:140},{x:115,y:180},{x:175,y:180},{x:330,y:160}],
      // Frame 3 — products forming: CH2O on the left, O2 emerging on the right
      [{x:140,y:155},{x:140,y:95},{x:420,y:148},{x:108,y:190},{x:172,y:190},{x:480,y:152}],
      // Frame 4 — settled
      [{x:140,y:155},{x:140,y:90},{x:425,y:150},{x:105,y:192},{x:175,y:192},{x:485,y:150}],
    ],
    oldBonds: [
      {a:0,b:1,order:2},{a:0,b:2,order:2},  // O=C=O (CO2)
      {a:5,b:3},{a:5,b:4},                   // H-O-H (water)
    ],
    newBonds: [
      {a:0,b:1,order:2},                      // formaldehyde's C=O (keeps C–O1 bond)
      {a:0,b:3},{a:0,b:4},                    // two new C-H bonds (H3, H4 migrate to C)
      {a:2,b:5,order:2},                      // O=O (O2 from CO2's other oxygen + water's oxygen)
    ],
    note: 'Shown at 1:1 balanced stoichiometry (CO₂ + H₂O → CH₂O + O₂). Six of these sum to the full equation: 6 × CH₂O gives the C₆H₁₂O₆ atom count of glucose.',
    rLabel: 'CO₂ · H₂O',
    pLabel: 'CH₂O · O₂',
  },

  // ============================================================
  // NH4NO3(s) -> NH4+(aq) + NO3-(aq) — ionic dissociation
  //   no covalent bonds break; the lattice ion pair just separates
  // ============================================================
  {
    id: 'nh4no3',
    mode: 'endo',
    label: 'NH₄NO₃ dissolving',
    equation: <>NH<sub>4</sub>NO<sub>3</sub>(s) → NH<sub>4</sub><sup>+</sup>(aq) + NO<sub>3</sub><sup>−</sup>(aq)</>,
    deltaH: 25, Ea: 15, reactE: 0,
    broken: [
      { name: 'lattice (NH₄⁺·NO₃⁻)', E: 650 },
    ],
    formed: [
      { name: 'hydration NH₄⁺', E: 305 },
      { name: 'hydration NO₃⁻', E: 320 },
    ],
    // atoms: [N0, H1..H4 (NH4+); N5, O6, O7, O8 (NO3-)]
    atoms: [
      { sym: 'N', r: 16, color: C.N, charge: '+' },
      { sym: 'H', r: 10, color: C.H },
      { sym: 'H', r: 10, color: C.H },
      { sym: 'H', r: 10, color: C.H },
      { sym: 'H', r: 10, color: C.H },
      { sym: 'N', r: 16, color: C.N },
      { sym: 'O', r: 15, color: C.O },
      { sym: 'O', r: 15, color: C.O },
      { sym: 'O', r: 15, color: C.O, charge: '−' },
    ],
    // Spaced so persistent N–H and N–O bonds are clearly visible
    // (edge-to-edge gap ≥ ~15px on every bond).
    frames: [
      // Frame 0 — lattice pair (ions close)
      [{x:230,y:150},{x:195,y:115},{x:265,y:115},{x:195,y:185},{x:265,y:185},{x:345,y:150},{x:345,y:100},{x:302,y:178},{x:388,y:178}],
      // Frame 1
      [{x:210,y:150},{x:175,y:115},{x:245,y:115},{x:175,y:185},{x:245,y:185},{x:365,y:150},{x:365,y:100},{x:322,y:178},{x:408,y:178}],
      // Frame 2 (drifting apart)
      [{x:180,y:150},{x:145,y:115},{x:215,y:115},{x:145,y:185},{x:215,y:185},{x:395,y:150},{x:395,y:100},{x:352,y:178},{x:438,y:178}],
      // Frame 3
      [{x:150,y:150},{x:115,y:115},{x:185,y:115},{x:115,y:185},{x:185,y:185},{x:430,y:150},{x:430,y:100},{x:387,y:178},{x:473,y:178}],
      // Frame 4 — fully separated
      [{x:130,y:150},{x:95,y:115},{x:165,y:115},{x:95,y:185},{x:165,y:185},{x:460,y:150},{x:460,y:100},{x:417,y:178},{x:503,y:178}],
    ],
    // lattice contact: a dashed N⋯N line shows the two ions held together at
    // the start; it fades (via distOp) as the ions drift apart.
    oldBonds: [{a:0,b:5}],
    newBonds: [],
    persistBonds: [
      {a:0,b:1},{a:0,b:2},{a:0,b:3},{a:0,b:4},  // N–H within NH4+
      {a:5,b:6},{a:5,b:7},{a:5,b:8},             // N–O within NO3-
    ],
    rLabel: 'NH₄NO₃(s)',
    pLabel: 'NH₄⁺ · NO₃⁻ (aq)',
  },
];

export default function EndoExo() {
  const [rxnId, setRxnId] = useState<string>(REACTIONS[0].id);
  const rxn = REACTIONS.find(r => r.id === rxnId)!;
  const mode = rxn.mode;

  const [t, setT] = useState(0);              // 0..1, full reaction-coordinate progress
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(0.5);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  // Pause on tab hidden
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Pause when scrolled out of view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Animation loop — continuous cycle 0 → 1 → 0
  useEffect(() => {
    if (!playing || hidden || !visible) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT(v => {
        let n = v + dt * 0.12 * speed;
        if (n > 1) n = 0;
        return n;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, visible, hidden]);

  // Live numbers — derived from rxn + t
  const totalBroken = rxn.broken.reduce((s, b) => s + b.E, 0);
  const totalFormed = rxn.formed.reduce((s, b) => s + b.E, 0);
  const computedDeltaH = totalBroken - totalFormed; // approx ΔH from bond enthalpies

  const reactE = rxn.reactE;
  const peakE  = reactE + rxn.Ea;
  const prodE  = reactE + rxn.deltaH;

  // Tally progresses through the transition state (t between 0.30 and 0.70)
  const tallyT = clamp((t - 0.30) / 0.40, 0, 1);
  // Bonds break first (first half of transition), bonds form second half
  const breakProg = clamp(tallyT * 2, 0, 1);
  const formProg  = clamp(tallyT * 2 - 1, 0, 1);
  const energyIn   = totalBroken * breakProg;
  const energyOut  = totalFormed * formProg;
  const netSoFar   = energyIn - energyOut;

  // Surroundings temperature change ramps in from the start of the barrier and
  // saturates by the end, so the thermometer visibly moves throughout.
  const release = ease(clamp((t - 0.15) / 0.75, 0, 1));
  const tempDelta = release * (mode === 'exo' ? +1 : -1);

  // Phase string (for the marble label)
  const phase =
    t < 0.20 ? 'reactants' :
    t < 0.40 ? 'climbing barrier' :
    t < 0.55 ? 'transition state' :
    t < 0.80 ? 'descending to products' : 'products';

  return (
    <div ref={rootRef} style={{ display: 'grid', gap: 16 }}>
      {/* Sign-convention banner */}
      <div style={{
        border: '1px solid var(--line)', borderLeft: `3px solid ${mode === 'exo' ? C.hot : C.cool}`,
        background: 'var(--ink-1)', padding: '10px 14px', borderRadius: 4,
      }}>
        <div className="eyebrow">Sign convention · system perspective</div>
        <div className="serif" style={{ fontSize: 15, marginTop: 4, lineHeight: 1.5 }}>
          <span style={{ color: C.hot }}>Exothermic</span>: ΔH &lt; 0 — the system <em>releases</em> heat to the surroundings.
          {' '}
          <span style={{ color: C.cool }}>Endothermic</span>: ΔH &gt; 0 — the system <em>absorbs</em> heat from the surroundings.
        </div>
      </div>

      {/* Reaction selector */}
      <SlideTabs<string>
        tabs={REACTIONS.map(r => ({
          id: r.id,
          label: (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: r.mode === 'exo' ? C.hot : C.cool, marginRight: 8,
              }} />
              {r.label}
            </span>
          ),
        }))}
        value={rxnId}
        onChange={(id) => { setRxnId(id); setT(0); }}
      />

      {/* Equation + ΔH */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <div className="serif" style={{ fontSize: 22, fontStyle: 'italic' }}>{rxn.equation}</div>
        <div className="mono" style={{ fontSize: 13, color: mode === 'exo' ? C.hot : C.cool }}>
          ΔH = {rxn.deltaH > 0 ? '+' : ''}{rxn.deltaH} kJ/mol · {mode === 'exo' ? 'EXOTHERMIC' : 'ENDOTHERMIC'}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => setPlaying(p => !p)} className="mono" style={ctrlBtn()}>
          {playing ? '❚❚ pause' : '▶ play'}
        </button>
        <button onClick={() => { setT(0); setPlaying(true); }} className="mono" style={ctrlBtn()}>↻ restart</button>
        <div style={{ minWidth: 200 }}>
          <UISlider label="Speed" value={speed} min={0.05} max={1.5} step={0.05}
                    onChange={setSpeed} accent="var(--phos)"
                    format={(v) => `${v.toFixed(2)}×`} />
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <UISlider label="ξ" value={t} min={0} max={1} step={0.001}
                    onChange={(v) => { setT(v); setPlaying(false); }}
                    accent={mode === 'exo' ? C.hot : C.cool}
                    format={(v) => `${(v * 100).toFixed(0)}%`} />
        </div>
      </div>

      {/* Two synchronized panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        {/* LEFT — molecular scene */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="eyebrow">Reaction · molecular view</span>
            <span className="mono" style={{ fontSize: 10, color: phaseTint(t, mode) }}>{phase.toUpperCase()}</span>
          </div>
          <MolecularScene rxn={rxn} t={t} />
          <div className="mono" style={{
            display: 'flex', justifyContent: 'space-between', fontSize: 11,
            color: 'var(--paper-dim)', marginTop: 8,
          }}>
            <span>{rxn.rLabel}</span>
            <span style={{ opacity: 0.5 }}>→</span>
            <span>{rxn.pLabel}</span>
          </div>
          {rxn.note && (
            <div style={{
              marginTop: 8, fontSize: 11, lineHeight: 1.5,
              color: 'var(--paper-faint)', fontStyle: 'italic',
            }}>
              {rxn.note}
            </div>
          )}
        </Panel>

        {/* RIGHT — energy diagram */}
        <Panel>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="eyebrow">Energy diagram</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--paper-dim)' }}>marble · ξ = {(t * 100).toFixed(0)}%</span>
          </div>
          <EnergyDiagram mode={mode} t={t} reactE={reactE} peakE={peakE} prodE={prodE} deltaH={rxn.deltaH} Ea={rxn.Ea} />
        </Panel>
      </div>

      {/* Surroundings + tally + numbers */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr 1fr', gap: 16 }}>
        {/* Thermometer */}
        <Panel>
          <div className="eyebrow">Surroundings</div>
          <Thermometer mode={mode} delta={tempDelta} />
          {(() => {
            const mag = Math.abs(tempDelta);
            const status =
              mag < 0.05 ? 'STABLE' :
              mode === 'exo' ? '↑ WARMING' : '↓ COOLING';
            const col = mag < 0.05 ? 'var(--paper-faint)' : (mode === 'exo' ? C.hot : C.cool);
            return (
              <div className="mono" style={{
                fontSize: 11, color: col, marginTop: 8, textAlign: 'center',
                letterSpacing: '0.16em', opacity: mag < 0.05 ? 0.6 : 0.4 + 0.6 * mag,
                transition: 'opacity 200ms, color 200ms',
              }}>
                {status}
              </div>
            );
          })()}
          <div className="mono" style={{ fontSize: 11, color: mode === 'exo' ? C.hot : C.cool, marginTop: 6, textAlign: 'center' }}>
            {mode === 'exo' ? 'q_surr > 0 (heated)' : 'q_surr < 0 (cooled)'}
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--paper-faint)', marginTop: 4, textAlign: 'center', lineHeight: 1.5 }}>
            q<sub>sys</sub> = −q<sub>surr</sub>
          </div>
        </Panel>

        {/* Bond-energy tally */}
        <Panel>
          <div className="eyebrow">Bond-energy tally · ΔH ≈ Σ broken − Σ formed</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
            <TallyCol title="Energy IN · bonds broken" sign="+" color={C.warn} items={rxn.broken} progress={breakProg} total={totalBroken} live={energyIn} />
            <TallyCol title="Energy OUT · bonds formed" sign="−" color={C.cool} items={rxn.formed} progress={formProg} total={totalFormed} live={energyOut} />
          </div>
          <div style={{ marginTop: 12, padding: '10px 12px',
                        border: `1px solid ${(netSoFar < 0 ? C.hot : C.cool)}55`,
                        background: `${(netSoFar < 0 ? C.hot : C.cool)}10`, borderRadius: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="eyebrow">NET (so far)</span>
              <span className="serif" style={{ fontSize: 22, color: netSoFar < 0 ? C.hot : C.cool }}>
                {netSoFar > 0 ? '+' : ''}{netSoFar.toFixed(0)} kJ/mol
              </span>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--paper-faint)', marginTop: 4 }}>
              final ΔH (bond-enthalpy estimate) = {computedDeltaH > 0 ? '+' : ''}{computedDeltaH.toFixed(0)} kJ/mol
            </div>
          </div>
        </Panel>

        {/* Live numerical panel */}
        <Panel>
          <div className="eyebrow">Live numbers · kJ/mol</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <NumStat label="Reactant E" value={fmt(reactE)} />
            <NumStat label="Transition E" value={fmt(peakE)} accent={C.warn} />
            <NumStat label="Product E"   value={fmt(prodE)} accent={mode === 'exo' ? C.hot : C.cool} />
            <NumStat label="Eₐ" value={`+${rxn.Ea}`} accent={C.warn} />
            <NumStat label="ΔH" value={`${rxn.deltaH > 0 ? '+' : ''}${rxn.deltaH}`}
                     accent={mode === 'exo' ? C.hot : C.cool} big />
            <NumStat label="System → Surr." value={mode === 'exo' ? 'releases' : 'absorbs'}
                     accent={mode === 'exo' ? C.hot : C.cool} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ============================================================
   Molecular scene — 4 atoms, schematic re-pairing
   ============================================================ */

function MolecularScene({ rxn, t }: { rxn: Reaction; t: number }) {
  const atoms = rxn.atoms;
  const VBW = 600, VBH = 300;

  // Catmull-Rom spline through the 5 keyframes — C¹-continuous so atoms don't
  // change direction abruptly at segment boundaries. A gentle global ease on t
  // smooths the start and end of the whole trajectory.
  const frames = rxn.frames;
  const N = frames.length;           // 5
  const te = ease(clamp(t, 0, 1));
  const u = te * (N - 1);
  let i = Math.floor(u);
  if (i >= N - 1) i = N - 2;
  const local = u - i;
  const getFrame = (j: number) => frames[clamp(j, 0, N - 1)];
  const pos = (idx: number): P => {
    const p0 = getFrame(i - 1)[idx];
    const p1 = getFrame(i)[idx];
    const p2 = getFrame(i + 1)[idx];
    const p3 = getFrame(i + 2)[idx];
    return {
      x: catmullRom(p0.x, p1.x, p2.x, p3.x, local),
      y: catmullRom(p0.y, p1.y, p2.y, p3.y, local),
    };
  };

  // Bond opacity is driven primarily by inter-atomic distance relative to the
  // bond's reference (equilibrium) length — bonds stretch thin and fade as
  // atoms separate, and new bonds pinch into existence as atoms converge.
  // A soft time gate on top prevents either kind from appearing off-phase.
  const distOp = (ax: number, ay: number, bx: number, by: number, refLen: number) => {
    const d = Math.hypot(bx - ax, by - ay);
    // full opacity at or below ref; linear fade to 0 over the next ~80% stretch
    return clamp(1 - (d / refLen - 1) / 0.8, 0, 1);
  };
  const refLen = (b: BondSpec, frame: P[]) => {
    const pa = frame[b.a], pb = frame[b.b];
    return Math.max(1, Math.hypot(pb.x - pa.x, pb.y - pa.y));
  };
  const oldGate = clamp(1.5 - t * 2.0, 0, 1);        // 1 until t=0.25, 0 by t=0.75
  const newGate = clamp(t * 2.0 - 0.5, 0, 1);        // 0 until t=0.25, 1 by t=0.75
  const bondStrain = (ax: number, ay: number, bx: number, by: number, refLen: number) => {
    const d = Math.hypot(bx - ax, by - ay);
    return clamp((d / refLen - 1) / 0.8, 0, 1);     // 0 at equilibrium, 1 when fully broken
  };

  const auraOp = clamp((t - 0.5) / 0.4, 0, 1);
  const auraCol = rxn.mode === 'exo' ? C.hot : C.cool;

  return (
    <div style={{ position: 'relative', marginTop: 8, aspectRatio: '2 / 1', borderRadius: 4, background: 'var(--ink-2)', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 55%, ${auraCol}33 0%, transparent 65%)`,
        opacity: auraOp, pointerEvents: 'none', transition: 'opacity 200ms',
      }} />

      <svg viewBox={`0 0 ${VBW} ${VBH}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* persistent bonds (e.g. internal ion bonds) */}
        {rxn.persistBonds?.map((b, idx) => (
          <Bond key={`p${idx}`} A={pos(b.a)} B={pos(b.b)} opacity={1} color="#e8dcc2" order={b.order} thick />
        ))}
        {/* old bonds — fade as the atoms move apart past their reactant distance */}
        {rxn.oldBonds.map((b, idx) => {
          const A = pos(b.a), B = pos(b.b);
          const ref = refLen(b, frames[0]);
          const op = oldGate * distOp(A.x, A.y, B.x, B.y, ref);
          const strain = bondStrain(A.x, A.y, B.x, B.y, ref);
          return <Bond key={`o${idx}`} A={A} B={B} opacity={op} color="#d6c9b3" order={b.order} strain={strain} />;
        })}
        {/* new bonds — appear as the atoms approach their product distance */}
        {rxn.newBonds.map((b, idx) => {
          const A = pos(b.a), B = pos(b.b);
          const ref = refLen(b, frames[N - 1]);
          const op = newGate * distOp(A.x, A.y, B.x, B.y, ref);
          return <Bond key={`n${idx}`} A={A} B={B} opacity={op} color={C.warn} order={b.order} thick />;
        })}

        {/* atoms */}
        {atoms.map((a, idx) => {
          const p = pos(idx);
          return (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r={a.r}
                      fill={a.color} stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              <text x={p.x} y={p.y + a.r * 0.36} textAnchor="middle"
                    fontFamily="Fraunces" fontWeight="700" fontSize={a.r * 0.95}
                    fill="#0a0908">{a.sym}</text>
              {a.charge && (
                <text x={p.x + a.r * 0.85} y={p.y - a.r * 0.55} textAnchor="middle"
                      fontFamily="JetBrains Mono" fontSize={a.r * 0.7}
                      fill={a.charge === '+' ? C.hot : C.cool}>{a.charge}</text>
              )}
            </g>
          );
        })}

        {t > 0.40 && t < 0.60 && (
          <text x={VBW / 2} y={24} textAnchor="middle" fontFamily="JetBrains Mono"
                fontSize="11" letterSpacing="0.18em" fill={C.warn}>
            ‡ TRANSITION STATE
          </text>
        )}
        {t > 0.60 && (
          <text x={VBW / 2} y={24} textAnchor="middle" fontFamily="JetBrains Mono"
                fontSize="11" letterSpacing="0.18em" fill={auraCol}>
            {rxn.mode === 'exo' ? '↯ HEAT RELEASED' : '❄ HEAT ABSORBED'}
          </text>
        )}
      </svg>
    </div>
  );
}

function Bond({ A, B, opacity, color, thick, order, strain }: {
  A: P; B: P; opacity: number; color: string; thick?: boolean; order?: 1 | 2 | 3; strain?: number;
}) {
  if (opacity <= 0.01) return null;
  const s = clamp(strain ?? 0, 0, 1);
  // stretched bonds get thinner, slightly dimmer, and start dashing as they strain
  const swBase = thick ? 3.5 : 2.8;
  const sw = swBase * (1 - 0.55 * s);
  const dash = s > 0.2 ? `${2 + 6 * (1 - s)} ${2 + 6 * s}` : undefined;
  const lineProps = {
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeDasharray: dash,
  };
  if (!order || order === 1) {
    return <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} {...lineProps}
                 style={{ opacity }} />;
  }
  const dx = B.x - A.x, dy = B.y - A.y;
  const len = Math.hypot(dx, dy) || 1;
  const off = 3.2;
  const ox = (-dy / len) * off, oy = (dx / len) * off;
  const thinProps = { ...lineProps, strokeWidth: sw - 0.8 };
  if (order === 2) {
    return (
      <g style={{ opacity }}>
        <line x1={A.x + ox} y1={A.y + oy} x2={B.x + ox} y2={B.y + oy} {...thinProps} />
        <line x1={A.x - ox} y1={A.y - oy} x2={B.x - ox} y2={B.y - oy} {...thinProps} />
      </g>
    );
  }
  return (
    <g style={{ opacity }}>
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} {...thinProps} />
      <line x1={A.x + ox} y1={A.y + oy} x2={B.x + ox} y2={B.y + oy} {...thinProps} />
      <line x1={A.x - ox} y1={A.y - oy} x2={B.x - ox} y2={B.y - oy} {...thinProps} />
    </g>
  );
}

/* ============================================================
   Energy diagram with marble on the curve
   ============================================================ */

function EnergyDiagram({
  mode, t, reactE, peakE, prodE, deltaH, Ea,
}: {
  mode: Mode; t: number;
  reactE: number; peakE: number; prodE: number; deltaH: number; Ea: number;
}) {
  const W = 460, H = 280;
  // Map energy → y. Build a normalized scale that includes both endpoints + peak.
  const eMin = Math.min(reactE, prodE) - Math.max(20, Math.abs(deltaH) * 0.1);
  const eMax = peakE + Math.max(20, Ea * 0.15);
  const yOf  = (E: number) => 30 + (1 - (E - eMin) / (eMax - eMin)) * (H - 60);

  const reactY = yOf(reactE);
  const prodY  = yOf(prodE);
  const peakY  = yOf(peakE);

  // Smooth curve: reactant plateau → bump → product plateau.
  const x0 = 50, xR = 130, xP = 250, xL = 350, x1 = W - 30;
  const pathD = `M ${x0} ${reactY} L ${xR} ${reactY} C ${xR + 60} ${reactY}, ${xP - 60} ${peakY}, ${xP} ${peakY} C ${xP + 60} ${peakY}, ${xL - 30} ${prodY}, ${xL} ${prodY} L ${x1} ${prodY}`;

  const pathRef = useRef<SVGPathElement | null>(null);
  const [marble, setMarble] = useState<P>({ x: x0, y: reactY });
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    const p = pathRef.current.getPointAtLength(len * clamp(t, 0, 1));
    setMarble({ x: p.x, y: p.y });
  }, [t, pathD]);

  const curveColor = mode === 'exo' ? C.hot : C.cool;

  return (
    <div style={{ marginTop: 8, aspectRatio: '1.6 / 1', position: 'relative' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="ee-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,241,232,0.04)" />
          </pattern>
          <marker id="ee-arr-down" markerWidth="10" markerHeight="10" refX="5" refY="6" orient="auto">
            <path d="M0,0 L6,0 L3,6 z" fill={curveColor} />
          </marker>
          <marker id="ee-arr-up" markerWidth="10" markerHeight="10" refX="5" refY="0" orient="auto">
            <path d="M0,6 L6,6 L3,0 z" fill={curveColor} />
          </marker>
          <marker id="ea-arr" markerWidth="10" markerHeight="10" refX="5" refY="0" orient="auto">
            <path d="M0,6 L6,6 L3,0 z" fill={C.warn} />
          </marker>
        </defs>
        <rect width={W} height={H} fill="url(#ee-grid)" />

        {/* axes */}
        <line x1="40" y1="20" x2="40" y2={H - 30} stroke="rgba(245,241,232,0.3)" />
        <line x1="40" y1={H - 30} x2={W - 10} y2={H - 30} stroke="rgba(245,241,232,0.3)" />
        <text x="14" y={H / 2} fill="rgba(245,241,232,0.5)" fontSize="9" fontFamily="JetBrains Mono"
              transform={`rotate(-90 14 ${H / 2})`} textAnchor="middle">POTENTIAL ENERGY</text>
        <text x={W / 2} y={H - 10} fill="rgba(245,241,232,0.5)" fontSize="9" fontFamily="JetBrains Mono"
              textAnchor="middle">REACTION COORDINATE →</text>

        {/* dashed level lines */}
        <line x1={x0} y1={reactY} x2={x1} y2={reactY} stroke="rgba(245,241,232,0.18)" strokeDasharray="2 4" />
        <line x1={x0} y1={prodY}  x2={x1} y2={prodY}  stroke="rgba(245,241,232,0.18)" strokeDasharray="2 4" />

        {/* the curve */}
        <path ref={pathRef} d={pathD} fill="none" stroke={curveColor} strokeWidth="2.5" strokeLinecap="round" />

        {/* labels */}
        <text x={x0 + 4} y={reactY - 6} fill="var(--paper)" fontSize="10" fontFamily="JetBrains Mono">REACTANTS</text>
        <text x={x1 - 4} y={prodY - 6}  fill="var(--paper)" fontSize="10" fontFamily="JetBrains Mono" textAnchor="end">PRODUCTS</text>
        <text x={xP} y={peakY - 8} fill={C.warn} fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">‡  Eₐ</text>

        {/* Eₐ arrow on the left side of the peak */}
        <line x1={xR + 10} y1={reactY} x2={xR + 10} y2={peakY + 5}
              stroke={C.warn} strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#ea-arr)" />
        <text x={xR + 16} y={(reactY + peakY) / 2} fill={C.warn} fontSize="11" fontFamily="Fraunces" fontStyle="italic">
          +{Ea}
        </text>

        {/* ΔH arrow on the right */}
        <line x1={W - 50} y1={reactY} x2={W - 50} y2={prodY}
              stroke={curveColor} strokeWidth="1.5"
              markerEnd={mode === 'exo' ? 'url(#ee-arr-down)' : 'url(#ee-arr-up)'} />
        <text x={W - 44} y={(reactY + prodY) / 2 + 4} fill={curveColor} fontSize="13" fontFamily="Fraunces" fontStyle="italic">
          ΔH
        </text>
        <text x={W - 44} y={(reactY + prodY) / 2 + 20} fill={curveColor} fontSize="10" fontFamily="JetBrains Mono">
          {deltaH > 0 ? '+' : ''}{deltaH}
        </text>

        {/* Marble */}
        <circle cx={marble.x} cy={marble.y} r="14" fill={curveColor} opacity="0.18" />
        <circle cx={marble.x} cy={marble.y} r="6.5" fill={C.paper} stroke="rgba(0,0,0,0.45)" />
      </svg>
    </div>
  );
}

/* ============================================================
   Thermometer
   ============================================================ */

function Thermometer({ mode, delta }: { mode: Mode; delta: number }) {
  // baseline at 50%, swings up (exo) or down (endo) by delta (−1..+1)
  const fill = clamp(0.5 + (mode === 'exo' ? delta : delta) * 0.40, 0.05, 0.95);
  const color = mode === 'exo' ? C.hot : C.cool;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <svg viewBox="0 0 80 200" style={{ width: 64, height: 180 }}>
        {/* ticks */}
        {[0.2, 0.4, 0.6, 0.8].map((v, i) => (
          <line key={i} x1="44" y1={20 + (1 - v) * 140} x2="50" y2={20 + (1 - v) * 140}
                stroke="rgba(245,241,232,0.4)" />
        ))}
        {/* tube */}
        <rect x="32" y="20" width="14" height="140" rx="7" fill="var(--ink-2)" stroke="var(--line-strong)" />
        {/* fluid — no CSS transition: the value already updates every frame
            via rAF, so a 200ms transition fights it and produces visible jumps */}
        <rect x="34" y={20 + (1 - fill) * 140} width="10" height={fill * 140} fill={color} />
        {/* bulb */}
        <circle cx="39" cy="170" r="14" fill={color} stroke="var(--line-strong)" />
        {/* labels */}
        <text x="56" y="24"  fill="rgba(245,241,232,0.5)" fontSize="9" fontFamily="JetBrains Mono">hot</text>
        <text x="56" y="160" fill="rgba(245,241,232,0.5)" fontSize="9" fontFamily="JetBrains Mono">cold</text>
      </svg>
    </div>
  );
}

/* ============================================================
   Tally column
   ============================================================ */

function TallyCol({
  title, sign, color, items, progress, total, live,
}: {
  title: string; sign: '+' | '−'; color: string;
  items: { name: string; E: number }[]; progress: number; total: number; live: number;
}) {
  return (
    <div style={{ borderLeft: `2px solid ${color}55`, padding: '4px 0 4px 10px' }}>
      <div className="eyebrow" style={{ color }}>{title}</div>
      <div style={{ marginTop: 6, display: 'grid', gap: 4 }}>
        {items.map((b, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span style={{ color: 'var(--paper-dim)' }}>{b.name}</span>
            <span className="mono" style={{ color: progress >= (i + 1) / items.length ? color : 'var(--paper-faint)' }}>
              {sign}{b.E}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 6, height: 4, background: 'var(--ink-2)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: color, transition: 'width 100ms' }} />
      </div>
      <div className="mono" style={{ fontSize: 11, color, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
        <span>{sign}{live.toFixed(0)}</span>
        <span style={{ color: 'var(--paper-faint)' }}>/ {sign}{total}</span>
      </div>
    </div>
  );
}

/* ============================================================
   Small atoms
   ============================================================ */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--ink-1)', border: '1px solid var(--line)', borderRadius: 6,
      padding: 16, display: 'flex', flexDirection: 'column',
    }}>
      {children}
    </div>
  );
}

function NumStat({ label, value, accent, big }: { label: string; value: string; accent?: string; big?: boolean }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 4 }}>{label}</div>
      <div className="serif" style={{ fontSize: big ? 22 : 16, color: accent ?? 'var(--paper)' }}>{value}</div>
    </div>
  );
}

function ctrlBtn(): React.CSSProperties {
  return {
    padding: '8px 14px', fontSize: 11, letterSpacing: '0.16em',
    textTransform: 'uppercase', border: '1px solid var(--line-strong)',
    background: 'transparent', color: 'var(--paper)', cursor: 'pointer',
  };
}

function phaseTint(t: number, mode: Mode): string {
  if (t < 0.25) return 'var(--paper-dim)';
  if (t < 0.55) return C.warn;
  return mode === 'exo' ? C.hot : C.cool;
}

function fmt(v: number): string { return `${v > 0 ? '+' : ''}${v.toFixed(0)}`; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function lerp(a: number, b: number, k: number) { return a + (b - a) * k; }
function ease(x: number) { return x * x * x * (x * (x * 6 - 15) + 10); }
function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
