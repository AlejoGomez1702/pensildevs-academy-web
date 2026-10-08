import { describe, expect, it } from 'vitest';
import { aCourse, aLesson } from './learning-content.fixtures';
import { navigateLesson } from './lesson-navigation';

describe('Lesson navigation', () => {
  const course = aCourse({
    lessons: [
      aLesson({ slug: 'one' }),
      aLesson({ slug: 'two', video: null }),
      aLesson({ slug: 'three' }),
      aLesson({ slug: 'four' }),
      aLesson({ slug: 'five', video: null }),
    ],
  });

  const slugsAround = (lessonSlug: string) => {
    const result = navigateLesson(course, lessonSlug);
    if (!result.ok) {
      throw new Error(result.error);
    }
    const { lesson, position, total, previous, next } = result.value;
    return { lesson: lesson.slug, position, total, previous: previous?.slug, next: next?.slug };
  };

  it('places the first lesson, with nothing before it', () => {
    expect(slugsAround('one')).toEqual({ lesson: 'one', position: 1, total: 5, previous: undefined, next: 'three' });
  });

  it('skips lessons that are coming soon when moving back and forth', () => {
    expect(slugsAround('three')).toEqual({ lesson: 'three', position: 3, total: 5, previous: 'one', next: 'four' });
  });

  it('has nothing after the last published lesson', () => {
    expect(slugsAround('four')).toEqual({ lesson: 'four', position: 4, total: 5, previous: 'three', next: undefined });
  });

  it('refuses a lesson that does not exist', () => {
    expect(navigateLesson(course, 'nope')).toEqual({ ok: false, error: 'lesson-not-found' });
  });

  it('refuses a lesson that is coming soon', () => {
    expect(navigateLesson(course, 'two')).toEqual({ ok: false, error: 'lesson-coming-soon' });
  });
});
