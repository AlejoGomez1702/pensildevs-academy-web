import {
  availableCount,
  byKind,
  newestFirst,
  type ContentKindFilter,
} from '../domain/content-shelf';
import type { LearningContent } from '../domain/learning-content';
import type { Library } from './library';

export interface TopicShelf {
  readonly contents: readonly LearningContent[];
  /** Available content of the whole topic per kind, to label the filters. */
  readonly availableByKind: Readonly<Record<ContentKindFilter, number>>;
}

/** Everything about one product or service, optionally narrowed to one kind of content. */
export class ExploreTopic {
  constructor(private readonly library: Library) {}

  async execute(topicSlug: string, kind: ContentKindFilter): Promise<TopicShelf> {
    const topicContent = (await this.library.allContent()).filter(
      (content) => content.topicSlug === topicSlug,
    );
    return {
      contents: newestFirst(byKind(topicContent, kind)),
      availableByKind: {
        all: availableCount(topicContent),
        video: availableCount(byKind(topicContent, 'video')),
        course: availableCount(byKind(topicContent, 'course')),
        guide: availableCount(byKind(topicContent, 'guide')),
      },
    };
  }
}
