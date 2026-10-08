import { describe, expect, it } from 'vitest';
import { aCourse, aGuide, aVideo } from '../domain/learning-content.fixtures';
import { BrowseLibrary } from './browse-library';
import { InMemoryLibrary } from './library.fixtures';

describe('Browse library', () => {
  const featuredVideo = aVideo({ slug: 'featured', featured: true, publishedOn: '2026-10-01' });
  const featuredComingSoon = aVideo({ slug: 'featured-soon', featured: true, video: null });
  const course = aCourse({ slug: 'course', publishedOn: '2026-10-05' });
  const guide = aGuide({ slug: 'guide', publishedOn: '2026-10-03', topicSlug: 'automatizacion' });

  const browse = () =>
    new BrowseLibrary(
      new InMemoryLibrary([featuredVideo, featuredComingSoon, course, guide]),
    ).execute();

  it('features only available content marked as featured', async () => {
    expect((await browse()).featured.map((content) => content.slug)).toEqual(['featured']);
  });

  it('lists the latest available content, newest first', async () => {
    expect((await browse()).latest.map((content) => content.slug)).toEqual([
      'course',
      'guide',
      'featured',
    ]);
  });

  it('keeps the latest list short', async () => {
    const many = Array.from({ length: 10 }, (_, index) => aVideo({ slug: `video-${index}` }));

    const { latest } = await new BrowseLibrary(new InMemoryLibrary(many)).execute();

    expect(latest).toHaveLength(BrowseLibrary.LATEST_LIMIT);
  });

  it('counts the available content of each topic', async () => {
    const { availableByTopic } = await browse();

    expect(availableByTopic.get('pensil-pos')).toBe(2);
    expect(availableByTopic.get('automatizacion')).toBe(1);
    expect(availableByTopic.get('tiendas-en-linea')).toBeUndefined();
  });
});
