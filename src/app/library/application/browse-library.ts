import { newestFirst } from '../domain/content-shelf';
import { isAvailable, type LearningContent } from '../domain/learning-content';
import type { Library } from './library';

export interface LibraryOverview {
  readonly featured: readonly LearningContent[];
  readonly latest: readonly LearningContent[];
  /** Available content per topic slug; topics without any are missing. */
  readonly availableByTopic: ReadonlyMap<string, number>;
}

/** What the home page shows: featured and latest content, and how much each topic has. */
export class BrowseLibrary {
  static readonly LATEST_LIMIT = 6;

  constructor(private readonly library: Library) {}

  async execute(): Promise<LibraryOverview> {
    const available = newestFirst((await this.library.allContent()).filter(isAvailable));
    const availableByTopic = new Map<string, number>();
    for (const content of available) {
      availableByTopic.set(content.topicSlug, (availableByTopic.get(content.topicSlug) ?? 0) + 1);
    }
    return {
      featured: available.filter((content) => content.featured),
      latest: available.slice(0, BrowseLibrary.LATEST_LIMIT),
      availableByTopic,
    };
  }
}
