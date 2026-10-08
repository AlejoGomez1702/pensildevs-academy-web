import { describe, expect, it } from 'vitest';
import { availableCount, byKind, newestFirst, relatedTo } from './content-shelf';
import { aCourse, aGuide, aVideo } from './learning-content.fixtures';

describe('Content shelf', () => {
  const video = aVideo({ slug: 'video', publishedOn: '2026-10-03' });
  const comingSoonVideo = aVideo({ slug: 'soon', publishedOn: '2026-10-09', video: null });
  const course = aCourse({ slug: 'course', publishedOn: '2026-10-01' });
  const guide = aGuide({ slug: 'guide', publishedOn: '2026-10-05', topicSlug: 'automatizacion' });

  it('keeps every content for "all" and only one kind otherwise', () => {
    const shelf = [video, course, guide];

    expect(byKind(shelf, 'all')).toEqual(shelf);
    expect(byKind(shelf, 'course')).toEqual([course]);
    expect(byKind(shelf, 'guide')).toEqual([guide]);
  });

  it('counts only available content', () => {
    expect(availableCount([video, comingSoonVideo, course])).toBe(2);
  });

  it('lists available content first, newest first, then what is coming soon', () => {
    expect(
      newestFirst([course, comingSoonVideo, video, guide]).map((content) => content.slug),
    ).toEqual(['guide', 'video', 'course', 'soon']);
  });

  it('relates available content of the same topic, newest first, without the current one', () => {
    const olderVideo = aVideo({ slug: 'older', publishedOn: '2026-09-01' });
    const shelf = [video, comingSoonVideo, course, guide, olderVideo];

    expect(relatedTo(shelf, video, 5).map((content) => content.slug)).toEqual(['course', 'older']);
    expect(relatedTo(shelf, video, 1).map((content) => content.slug)).toEqual(['course']);
  });

  it('does not mistake content of another kind with the same slug for the current one', () => {
    const sameSlugGuide = aGuide({ slug: 'video', publishedOn: '2026-10-02' });

    expect(relatedTo([video, sameSlugGuide], video, 5)).toEqual([sameSlugGuide]);
  });
});
