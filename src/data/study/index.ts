import type { UnitStudyGuide } from './types';
import { UNIT_01 } from './unit01';
import { UNIT_02 } from './unit02';
import { UNIT_03 } from './unit03';
import { UNIT_04 } from './unit04';
import { UNIT_05 } from './unit05';
import { UNIT_06 } from './unit06';
import { UNIT_07 } from './unit07';
import { UNIT_08 } from './unit08';
import { UNIT_09 } from './unit09';

// Registry keyed by unit slug. Units without a study guide yet return undefined —
// the UnitPage handles that case by hiding the study-mode toggle.
const STUDY_GUIDES: Record<string, UnitStudyGuide> = {
  [UNIT_01.unitSlug]: UNIT_01,
  [UNIT_02.unitSlug]: UNIT_02,
  [UNIT_03.unitSlug]: UNIT_03,
  [UNIT_04.unitSlug]: UNIT_04,
  [UNIT_05.unitSlug]: UNIT_05,
  [UNIT_06.unitSlug]: UNIT_06,
  [UNIT_07.unitSlug]: UNIT_07,
  [UNIT_08.unitSlug]: UNIT_08,
  [UNIT_09.unitSlug]: UNIT_09,
};

export function getStudyGuide(slug: string): UnitStudyGuide | undefined {
  return STUDY_GUIDES[slug];
}

export type { UnitStudyGuide, TopicStudy, MCQ, Note, InteractionGuide } from './types';
