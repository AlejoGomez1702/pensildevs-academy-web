import type { LearningContent } from '../domain/learning-content';

/** Where the academy content comes from: test data today, a CMS or an API later. */
export abstract class Library {
  abstract allContent(): Promise<readonly LearningContent[]>;
}
