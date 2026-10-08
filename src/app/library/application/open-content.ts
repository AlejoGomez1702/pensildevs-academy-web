import { err, ok, type Result } from '../../shared/kernel/result';
import { relatedTo } from '../domain/content-shelf';
import { isAvailable, type ContentKind, type LearningContent } from '../domain/learning-content';
import type { Library } from './library';

export interface OpenedContent<T extends LearningContent> {
  readonly content: T;
  readonly related: readonly LearningContent[];
}

export type OpenContentError<T extends LearningContent> =
  { readonly reason: 'not-found' } | { readonly reason: 'coming-soon'; readonly content: T };

/** Opens a video, a course or a guide, with more content of its topic to keep learning. */
export class OpenContent {
  static readonly RELATED_LIMIT = 3;

  constructor(private readonly library: Library) {}

  async execute<K extends ContentKind>(
    kind: K,
    slug: string,
  ): Promise<
    Result<
      OpenedContent<Extract<LearningContent, { kind: K }>>,
      OpenContentError<Extract<LearningContent, { kind: K }>>
    >
  > {
    const shelf = await this.library.allContent();
    const content = shelf.find(
      (candidate): candidate is Extract<LearningContent, { kind: K }> =>
        candidate.kind === kind && candidate.slug === slug,
    );
    if (!content) {
      return err({ reason: 'not-found' });
    }
    if (!isAvailable(content)) {
      return err({ reason: 'coming-soon', content });
    }
    return ok({ content, related: relatedTo(shelf, content, OpenContent.RELATED_LIMIT) });
  }
}
