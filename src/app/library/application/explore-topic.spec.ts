import { describe, expect, it } from 'vitest';
import { aCourse, aGuide, aVideo } from '../domain/learning-content.fixtures';
import { ExploreTopic } from './explore-topic';
import { InMemoryLibrary } from './library.fixtures';

describe('Explore topic', () => {
  const video = aVideo({ slug: 'video', publishedOn: '2026-10-02' });
  const comingSoon = aVideo({ slug: 'soon', video: null, publishedOn: '2026-10-09' });
  const course = aCourse({ slug: 'course', publishedOn: '2026-10-04' });
  const otherTopic = aGuide({ slug: 'other', topicSlug: 'automatizacion' });

  const explore = new ExploreTopic(new InMemoryLibrary([video, comingSoon, course, otherTopic]));

  it('lists the content of the topic, available first and newest first', async () => {
    const { contents } = await explore.execute('pensil-pos', 'all');

    expect(contents.map((content) => content.slug)).toEqual(['course', 'video', 'soon']);
  });

  it('keeps only the chosen kind', async () => {
    const { contents } = await explore.execute('pensil-pos', 'video');

    expect(contents.map((content) => content.slug)).toEqual(['video', 'soon']);
  });

  it('counts the available content of the topic by kind, whatever the filter', async () => {
    const { availableByKind } = await explore.execute('pensil-pos', 'guide');

    expect(availableByKind).toEqual({ all: 2, video: 1, course: 1, guide: 0 });
  });

  it('returns nothing for a topic without content', async () => {
    const result = await explore.execute('tiendas-en-linea', 'all');

    expect(result.contents).toEqual([]);
    expect(result.availableByKind.all).toBe(0);
  });
});
