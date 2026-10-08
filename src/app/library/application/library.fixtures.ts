// In-memory library for use case specs. Only imported from specs.
import type { LearningContent } from '../domain/learning-content';
import { Library } from './library';

export class InMemoryLibrary extends Library {
  constructor(private readonly shelf: readonly LearningContent[]) {
    super();
  }

  allContent(): Promise<readonly LearningContent[]> {
    return Promise.resolve(this.shelf);
  }
}
