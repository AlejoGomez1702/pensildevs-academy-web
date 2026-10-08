import { err, ok, type Result } from '../../shared/kernel/result';
import { isPublishedLesson, type Course, type Lesson } from './learning-content';

export interface LessonNavigation {
  readonly lesson: Lesson;
  /** 1-based position among all the lessons of the course, published or not. */
  readonly position: number;
  readonly total: number;
  /** Nearest published lessons; lessons coming soon are skipped. */
  readonly previous?: Lesson;
  readonly next?: Lesson;
}

export type LessonNavigationError = 'lesson-not-found' | 'lesson-coming-soon';

export function navigateLesson(
  course: Course,
  lessonSlug: string,
): Result<LessonNavigation, LessonNavigationError> {
  const lessons = course.lessons;
  const index = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  const lesson = lessons[index];
  if (!lesson) {
    return err('lesson-not-found');
  }
  if (!isPublishedLesson(lesson)) {
    return err('lesson-coming-soon');
  }
  return ok({
    lesson,
    position: index + 1,
    total: lessons.length,
    previous: lessons.slice(0, index).reverse().find(isPublishedLesson),
    next: lessons.slice(index + 1).find(isPublishedLesson),
  });
}
