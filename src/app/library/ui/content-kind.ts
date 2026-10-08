import type { IconName } from '../../shared/ui/icon';
import type { ContentKindFilter } from '../domain/content-shelf';
import type { ContentKind, LearningContent } from '../domain/learning-content';

interface ContentKindPresentation {
  readonly label: string;
  readonly plural: string;
  readonly icon: IconName;
  /** URL segment of the kind's pages and value of the `?tipo=` filter. */
  readonly segment: string;
}

export const CONTENT_KIND: Readonly<Record<ContentKind, ContentKindPresentation>> = {
  course: { label: 'Curso', plural: 'Cursos', icon: 'course', segment: 'cursos' },
  video: { label: 'Video', plural: 'Videos', icon: 'video', segment: 'videos' },
  guide: { label: 'Guía', plural: 'Guías', icon: 'guide', segment: 'guias' },
};

export const CONTENT_KINDS = Object.keys(CONTENT_KIND) as readonly ContentKind[];

export function contentPath(content: Pick<LearningContent, 'kind' | 'slug'>): string {
  return `/${CONTENT_KIND[content.kind].segment}/${content.slug}`;
}

export function lessonPath(courseSlug: string, lessonSlug: string): string {
  return `/${CONTENT_KIND.course.segment}/${courseSlug}/${lessonSlug}`;
}

/** Reads the `?tipo=` filter; anything unknown shows everything. */
export function kindFilterFromSegment(segment: string | undefined): ContentKindFilter {
  return CONTENT_KINDS.find((kind) => CONTENT_KIND[kind].segment === segment) ?? 'all';
}

export function lessonCountLabel(count: number): string {
  return count === 1 ? '1 lección' : `${count} lecciones`;
}
