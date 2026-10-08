import { err, ok, type Result } from '../../shared/kernel/result';
import { isAvailable, type Course } from '../domain/learning-content';
import { navigateLesson, type LessonNavigation } from '../domain/lesson-navigation';
import type { Library } from './library';

export interface LessonInCourse {
  readonly course: Course;
  readonly navigation: LessonNavigation;
}

export type WatchLessonError =
  | { readonly reason: 'course-not-found' }
  | { readonly reason: 'course-coming-soon' | 'lesson-not-found' | 'lesson-coming-soon'; readonly course: Course };

/** Opens one lesson of a course, with where it sits and which lessons come before and after. */
export class WatchLesson {
  constructor(private readonly library: Library) {}

  async execute(courseSlug: string, lessonSlug: string): Promise<Result<LessonInCourse, WatchLessonError>> {
    const course = (await this.library.allContent()).find(
      (content): content is Course => content.kind === 'course' && content.slug === courseSlug,
    );
    if (!course) {
      return err({ reason: 'course-not-found' });
    }
    if (!isAvailable(course)) {
      return err({ reason: 'course-coming-soon', course });
    }
    const navigation = navigateLesson(course, lessonSlug);
    return navigation.ok ? ok({ course, navigation: navigation.value }) : err({ reason: navigation.error, course });
  }
}
