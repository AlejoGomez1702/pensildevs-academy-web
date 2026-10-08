import { isAvailable, type ContentKind, type LearningContent } from './learning-content';

export type ContentKindFilter = ContentKind | 'all';

export function byKind(
  shelf: readonly LearningContent[],
  kind: ContentKindFilter,
): readonly LearningContent[] {
  return kind === 'all' ? shelf : shelf.filter((content) => content.kind === kind);
}

export function availableCount(shelf: readonly LearningContent[]): number {
  return shelf.filter(isAvailable).length;
}

/** What can be opened comes first, newest first; what is coming soon goes last. */
export function newestFirst(shelf: readonly LearningContent[]): readonly LearningContent[] {
  return [...shelf].sort(
    (a, b) =>
      Number(isAvailable(b)) - Number(isAvailable(a)) || b.publishedOn.localeCompare(a.publishedOn),
  );
}

/** Other available content about the same topic, to keep learning after `current`. */
export function relatedTo(
  shelf: readonly LearningContent[],
  current: LearningContent,
  limit: number,
): readonly LearningContent[] {
  return newestFirst(
    shelf.filter(
      (content) =>
        content.topicSlug === current.topicSlug &&
        isAvailable(content) &&
        !(content.kind === current.kind && content.slug === current.slug),
    ),
  ).slice(0, limit);
}
