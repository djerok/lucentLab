// ──────────────────────────────────────────────────────────────────────
// Study-guide data schema.
//
// A StudyGuide is attached to a unit slug. It's a sequence of TopicStudy
// blocks (one per curriculum topic) plus one final UnitTest at the end.
//
// Each TopicStudy has three parts around the animation:
//   · lead      — short set-up that renders ABOVE the animation (the "why")
//   · interact  — "try this / look for this" guidance shown with the animation
//   · notes     — the formal notes shown BELOW after the student has played
// Plus MCQ quick-checks after the notes.
// ──────────────────────────────────────────────────────────────────────

export type Note = {
  heading: string;
  body: string;
  // Optional canonical formula rendered in the serif font.
  formula?: string;
  // Optional "key fact" pulled out as a callout (e.g. rule of thumb, warning).
  callout?: string;
  // Optional inline SVG markup (string) rendered above the body as a diagram.
  // Authors write the SVG by hand; it's trusted content bundled with the app.
  svg?: string;
};

export type MCQ = {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  // Shown after the student answers — should teach, not just announce correctness.
  explanation: string;
};

// A guided-interaction block, shown alongside the animation.
// `tryThis` is a list of concrete things for the student to do in the interaction;
// `observe` is what they should notice while doing them.
export type InteractionGuide = {
  heading?: string;
  intro?: string;
  tryThis: string[];
  observe: string[];
};

export type TopicStudy = {
  topicId: string; // matches curriculum.ts topic id (e.g. '1.4')
  overview: string;        // 1–2 sentence "why this matters"
  lead?: Note[];           // rendered ABOVE the animation — context / set-up
  interact?: InteractionGuide; // rendered next to/with the animation
  notes: Note[];           // rendered BELOW the animation — the formal content
  mcqs: MCQ[];
};

export type UnitStudyGuide = {
  unitSlug: string;
  topics: TopicStudy[];
  unitTest: MCQ[];
};
