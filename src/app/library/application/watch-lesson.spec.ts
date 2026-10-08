import { describe, expect, it } from 'vitest';
import { aCourse, aLesson } from '../domain/learning-content.fixtures';
import { InMemoryLibrary } from './library.fixtures';
import { WatchLesson } from './watch-lesson';

describe('Watch lesson', () => {
  const course = aCourse({
    slug: 'primeros-pasos',
    lessons: [aLesson({ slug: 'uno' }), aLesson({ slug: 'dos', video: null }), aLesson({ slug: 'tres' })],
  });
  const comingSoonCourse = aCourse({ slug: 'avanzado', lessons: [aLesson({ slug: 'uno', video: null })] });

  const watch = new WatchLesson(new InMemoryLibrary([course, comingSoonCourse]));

  it('places the lesson inside its course', async () => {
    const result = await watch.execute('primeros-pasos', 'tres');

    expect(result.ok && result.value.course).toBe(course);
    expect(result.ok && result.value.navigation.position).toBe(3);
    expect(result.ok && result.value.navigation.previous?.slug).toBe('uno');
  });

  it('reports an unknown course', async () => {
    expect(await watch.execute('nope', 'uno')).toEqual({ ok: false, error: { reason: 'course-not-found' } });
  });

  it('reports a course that is coming soon', async () => {
    expect(await watch.execute('avanzado', 'uno')).toEqual({
      ok: false,
      error: { reason: 'course-coming-soon', course: comingSoonCourse },
    });
  });

  it.each([
    ['nope', 'lesson-not-found'],
    ['dos', 'lesson-coming-soon'],
  ] as const)('reports lesson "%s" as %s, keeping the course to link back', async (lessonSlug, reason) => {
    expect(await watch.execute('primeros-pasos', lessonSlug)).toEqual({ ok: false, error: { reason, course } });
  });
});
