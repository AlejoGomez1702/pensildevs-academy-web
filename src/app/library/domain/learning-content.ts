import { Duration } from '../../shared/kernel/duration';
import type { YouTubeVideoId } from './youtube-video-id';

export type ContentKind = 'video' | 'course' | 'guide';

interface ContentBase {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** Slug of the product or service the content teaches about. */
  readonly topicSlug: string;
  /** ISO date (YYYY-MM-DD). */
  readonly publishedOn: string;
  readonly featured: boolean;
}

export interface Video extends ContentBase {
  readonly kind: 'video';
  /** `null` while the video is coming soon. */
  readonly video: YouTubeVideoId | null;
  readonly duration: Duration;
}

export interface Lesson {
  readonly slug: string;
  readonly title: string;
  /** `null` while the lesson is coming soon. */
  readonly video: YouTubeVideoId | null;
  readonly duration: Duration;
}

export interface Course extends ContentBase {
  readonly kind: 'course';
  readonly lessons: readonly Lesson[];
}

export interface GuideSection {
  readonly id: string;
  readonly title: string;
  readonly intro?: string;
  readonly steps: readonly string[];
}

export interface Guide extends ContentBase {
  readonly kind: 'guide';
  readonly readingTime: Duration;
  readonly sections: readonly GuideSection[];
}

export type LearningContent = Video | Course | Guide;

export function isPublishedLesson(lesson: Lesson): boolean {
  return lesson.video !== null;
}

/** Content that can be opened; the rest is announced as coming soon. */
export function isAvailable(content: LearningContent): boolean {
  switch (content.kind) {
    case 'video':
      return content.video !== null;
    case 'course':
      return content.lessons.some(isPublishedLesson);
    case 'guide':
      return content.sections.length > 0;
  }
}

export function contentDuration(content: LearningContent): Duration {
  switch (content.kind) {
    case 'video':
      return content.duration;
    case 'course':
      return Duration.sum(content.lessons.filter(isPublishedLesson).map((lesson) => lesson.duration));
    case 'guide':
      return content.readingTime;
  }
}
