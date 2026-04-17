import { useState } from 'react';
import type { TopicStudy, MCQ, Note, InteractionGuide } from '../../data/study';
import MCQCard from './MCQCard';
import { TeX, renderTeX } from './Math';

// ──────────────────────────────────────────────────────────────────────
// Study-guide rendering.
//
// A topic's study content splits into three pieces relative to the animation:
//   · TopicStudyLead   — context + lead-in notes (goes ABOVE the animation)
//   · TopicStudyInteract — "try / observe" guide (goes WITH the animation)
//   · TopicStudyBody   — the formal notes + MCQs (goes BELOW the animation)
//
// TopicStudyBlock is kept as a fallback that renders all three stacked,
// for topics with no animation or callers that don't want the split layout.
// ──────────────────────────────────────────────────────────────────────

export function TopicStudyLead({
  topic, accent,
}: {
  topic: TopicStudy;
  accent: string;
  topicTitle?: string;
}) {
  return (
    <div style={{ marginTop: 8, marginBottom: 20 }}>
      <div style={{
        background: `${accent}08`,
        border: `1px solid ${accent}33`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 6,
        padding: '18px 22px',
      }}>
        <div className="eyebrow" style={{ color: accent, marginBottom: 6 }}>
          OVERVIEW
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--paper)' }}>
          {renderTeX(topic.overview)}
        </p>
      </div>

      {topic.lead && topic.lead.length > 0 && (
        <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
          {topic.lead.map((n, i) => <NoteBlock key={i} note={n} accent={accent} />)}
        </div>
      )}
    </div>
  );
}

export function TopicStudyInteract({
  guide, accent,
}: {
  guide: InteractionGuide;
  accent: string;
}) {
  return (
    <div style={{
      marginTop: 12,
      marginBottom: 16,
      background: 'var(--ink-1)',
      border: `1px dashed ${accent}66`,
      borderRadius: 6,
      padding: '14px 18px',
    }}>
      <div className="eyebrow" style={{ color: accent, marginBottom: 6 }}>
        {guide.heading ?? 'With the interaction'}
      </div>
      {guide.intro && (
        <p style={{ fontSize: 14, color: 'var(--paper)', lineHeight: 1.55, marginBottom: 10 }}>
          {renderTeX(guide.intro)}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="grid-2-1@md">
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: accent, marginBottom: 6 }}>
            TRY THIS
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.55, color: 'var(--paper-dim)' }}>
            {guide.tryThis.map((t, i) => <li key={i} style={{ marginBottom: 4 }}>{renderTeX(t)}</li>)}
          </ul>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--paper-faint)', marginBottom: 6 }}>
            LOOK FOR
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.55, color: 'var(--paper-dim)' }}>
            {guide.observe.map((t, i) => <li key={i} style={{ marginBottom: 4 }}>{renderTeX(t)}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TopicStudyBody({
  topic, accent,
}: {
  topic: TopicStudy;
  accent: string;
}) {
  return (
    <div style={{ marginTop: 20 }}>
      {topic.notes.length > 0 && (
        <div style={{ display: 'grid', gap: 12 }}>
          {topic.notes.map((n, i) => <NoteBlock key={i} note={n} accent={accent} />)}
        </div>
      )}

      {topic.mcqs.length > 0 && (
        <div style={{
          marginTop: 22,
          paddingTop: 14,
          borderTop: '1px dashed var(--line)',
        }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>
            Quick checks · {topic.mcqs.length} question{topic.mcqs.length === 1 ? '' : 's'}
          </div>
          {topic.mcqs.map((q, i) => (
            <MCQCard key={q.id} mcq={q} index={i} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}

// Combined block — used for topics without an animation so everything stacks.
export function TopicStudyBlock({
  topic, accent, topicTitle,
}: {
  topic: TopicStudy;
  accent: string;
  topicTitle: string;
}) {
  return (
    <>
      <TopicStudyLead topic={topic} accent={accent} topicTitle={topicTitle} />
      {topic.interact && <TopicStudyInteract guide={topic.interact} accent={accent} />}
      <TopicStudyBody topic={topic} accent={accent} />
    </>
  );
}

function NoteBlock({ note, accent }: { note: Note; accent: string }) {
  return (
    <div style={{
      background: 'var(--ink-1)',
      border: '1px solid var(--line)',
      borderRadius: 6,
      padding: '16px 18px',
    }}>
      <div className="serif" style={{ fontSize: 18, marginBottom: 6 }}>
        {renderTeX(note.heading)}
      </div>
      {note.svg && (
        <div
          aria-hidden
          style={{
            margin: '10px 0 14px',
            padding: '10px 12px',
            background: 'var(--ink-2)',
            border: '1px solid var(--line)',
            borderRadius: 4,
            display: 'flex', justifyContent: 'center',
          }}
          dangerouslySetInnerHTML={{ __html: note.svg }}
        />
      )}
      <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--paper)' }}>
        {renderTeX(note.body)}
      </p>
      {note.formula && (
        <div style={{
          marginTop: 12,
          padding: '12px 16px',
          background: 'var(--ink-2)',
          border: '1px solid var(--line)',
          borderRadius: 4,
          fontSize: 15,
          color: accent,
          textAlign: 'center',
        }}>
          <TeX src={note.formula} display />
        </div>
      )}
      {note.callout && (
        <div style={{
          marginTop: 12,
          padding: '10px 14px',
          borderLeft: `3px solid ${accent}`,
          background: `${accent}10`,
          borderRadius: 3,
          fontSize: 13.5,
          color: 'var(--paper-dim)',
          lineHeight: 1.55,
        }}>
          {renderTeX(note.callout)}
        </div>
      )}
    </div>
  );
}

// Final-quiz section. Tracks score; reveals a tally only after every question
// is attempted. Students can retry individual questions without resetting the
// running tally.
export function UnitTest({
  questions, accent, unitTitle,
}: {
  questions: MCQ[];
  accent: string;
  unitTitle: string;
}) {
  const [scoreMap, setScoreMap] = useState<Record<string, boolean>>({});
  const answered = Object.keys(scoreMap).length;
  const correct = Object.values(scoreMap).filter(Boolean).length;
  const allDone = answered === questions.length;
  const percent = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  return (
    <section style={{
      marginTop: 60, paddingTop: 50, paddingBottom: 80,
      borderTop: `2px solid ${accent}`,
    }}>
      <div className="shell">
        <div className="eyebrow" style={{ color: accent, marginBottom: 8 }}>
          UNIT TEST · {questions.length} QUESTIONS
        </div>
        <h2 className="serif" style={{ fontSize: 36, fontWeight: 400 }}>
          {unitTitle} — final quiz
        </h2>
        <p style={{ fontSize: 15, color: 'var(--paper-dim)', maxWidth: 720, marginTop: 8, lineHeight: 1.55 }}>
          A mixed set spanning every topic in this unit. Answer all of them; the
          score panel below updates live and locks in once you have attempted
          every question. You can retry any question individually.
        </p>

        <div style={{
          marginTop: 24,
          padding: '14px 18px',
          background: allDone ? `${accent}15` : 'var(--ink-1)',
          border: `1px solid ${allDone ? accent : 'var(--line)'}`,
          borderRadius: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div>
            <div className="eyebrow" style={{ color: allDone ? accent : 'var(--paper-dim)' }}>
              {allDone ? 'Final score' : 'Progress'}
            </div>
            <div className="serif" style={{ fontSize: 26, marginTop: 2 }}>
              {correct} / {questions.length}
              {' '}
              <span style={{ fontSize: 14, color: 'var(--paper-dim)', marginLeft: 8 }}>
                ({answered} answered · {percent}% correct)
              </span>
            </div>
          </div>
          {allDone && (
            <div className="mono" style={{
              padding: '8px 14px',
              fontSize: 11,
              letterSpacing: '0.14em',
              border: `1px solid ${accent}`,
              color: accent,
              borderRadius: 3,
            }}>
              {percent >= 80 ? 'EXCELLENT' : percent >= 60 ? 'PASSING' : 'REVIEW NEEDED'}
            </div>
          )}
        </div>

        <div style={{ marginTop: 8 }}>
          {questions.map((q, i) => (
            <MCQCard
              key={q.id}
              mcq={q}
              index={i}
              accent={accent}
              onAnswered={(ok) => setScoreMap(prev => ({ ...prev, [q.id]: ok }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
