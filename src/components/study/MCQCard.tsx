import { useState } from 'react';
import type { MCQ } from '../../data/study';
import { renderTeX } from './Math';

// A single interactive multiple-choice question.
// Choice buttons stay responsive until answered; then all lock, the correct
// one turns green, the picked-wrong one turns red, and the explanation unfurls
// underneath. A "Try again" affordance resets state without reshuffling.
export default function MCQCard({
  mcq, index, accent,
  onAnswered,
}: {
  mcq: MCQ;
  index?: number;
  accent: string;
  onAnswered?: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const locked = picked !== null;
  const correct = picked === mcq.correctIndex;

  const choose = (i: number) => {
    if (locked) return;
    setPicked(i);
    onAnswered?.(i === mcq.correctIndex);
  };

  return (
    <div style={{
      background: 'var(--ink-1)',
      border: '1px solid var(--line)',
      borderRadius: 6,
      padding: 18,
      marginTop: 14,
    }}>
      <div className="eyebrow" style={{ marginBottom: 8, color: accent }}>
        {index !== undefined ? `Question ${index + 1}` : 'Check'}
      </div>
      <div className="serif" style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 14 }}>
        {renderTeX(mcq.question)}
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {mcq.choices.map((c, i) => {
          const isCorrect = i === mcq.correctIndex;
          const isPicked = i === picked;
          // color states: neutral (unanswered), correct (green on reveal),
          // wrong-and-picked (red), or dimmed (unpicked after lock)
          let border = 'var(--line-strong)';
          let background = 'transparent';
          let color = 'var(--paper)';
          if (locked) {
            if (isCorrect) {
              border = 'var(--phos)';
              background = 'rgba(111, 200, 120, 0.1)';
              color = 'var(--phos)';
            } else if (isPicked) {
              border = 'var(--hot)';
              background = 'rgba(255, 107, 53, 0.1)';
              color = 'var(--hot)';
            } else {
              color = 'var(--paper-dim)';
            }
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={locked}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                border: `1px solid ${border}`,
                background,
                color,
                borderRadius: 4,
                cursor: locked ? 'default' : 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                lineHeight: 1.4,
                transition: 'background 120ms ease, border-color 120ms ease',
              }}
            >
              <span className="mono" style={{
                fontSize: 11, letterSpacing: '0.14em',
                marginRight: 10, opacity: 0.7,
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              {renderTeX(c)}
            </button>
          );
        })}
      </div>
      {locked && (
        <div style={{
          marginTop: 14, padding: '10px 14px',
          border: `1px solid ${correct ? 'var(--phos)' : 'var(--hot)'}55`,
          background: `${correct ? 'var(--phos)' : 'var(--hot)'}10`,
          borderRadius: 4,
        }}>
          <div className="mono" style={{
            fontSize: 10, letterSpacing: '0.14em',
            color: correct ? 'var(--phos)' : 'var(--hot)',
            marginBottom: 6,
          }}>
            {correct ? '✓ CORRECT' : '✗ INCORRECT'}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--paper)' }}>
            {renderTeX(mcq.explanation)}
          </div>
          <button
            onClick={() => setPicked(null)}
            className="mono"
            style={{
              marginTop: 10, padding: '6px 10px',
              fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
              border: '1px solid var(--line-strong)',
              background: 'transparent', color: 'var(--paper-dim)',
              cursor: 'pointer', borderRadius: 3,
            }}
          >
            ↻ Try again
          </button>
        </div>
      )}
    </div>
  );
}
