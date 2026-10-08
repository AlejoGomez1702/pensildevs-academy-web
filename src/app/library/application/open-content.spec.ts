import { describe, expect, it } from 'vitest';
import { aCourse, aGuide, aLesson, aVideo } from '../domain/learning-content.fixtures';
import { InMemoryLibrary } from './library.fixtures';
import { OpenContent } from './open-content';

describe('Open content', () => {
  const video = aVideo({ slug: 'cobrar', publishedOn: '2026-10-02' });
  const guide = aGuide({ slug: 'cobrar', publishedOn: '2026-10-03' });
  const comingSoonCourse = aCourse({ slug: 'inventario', lessons: [aLesson({ video: null })] });
  const otherTopicVideo = aVideo({ slug: 'otro', topicSlug: 'automatizacion' });

  const open = new OpenContent(new InMemoryLibrary([video, guide, comingSoonCourse, otherTopicVideo]));

  it('opens available content with related content of the same topic', async () => {
    const result = await open.execute('video', 'cobrar');

    expect(result.ok && result.value.content).toBe(video);
    expect(result.ok && result.value.related).toEqual([guide]);
  });

  it('tells content apart by kind even when slugs match', async () => {
    const result = await open.execute('guide', 'cobrar');

    expect(result.ok && result.value.content).toBe(guide);
  });

  it('reports unknown content', async () => {
    expect(await open.execute('course', 'nope')).toEqual({ ok: false, error: { reason: 'not-found' } });
  });

  it('reports content that is coming soon, keeping it to link its topic', async () => {
    expect(await open.execute('course', 'inventario')).toEqual({
      ok: false,
      error: { reason: 'coming-soon', content: comingSoonCourse },
    });
  });
});
