import { isAvailable, type Course, type Video } from '../domain/learning-content';
import { MOCK_CONTENT } from './mock-content';
import { MockLibrary } from './mock-library';
import type { RawContent } from './raw-content';

describe('Mock library (real test data)', () => {
  it('turns every piece of test data into academy content', async () => {
    const shelf = await new MockLibrary(MOCK_CONTENT).allContent();

    expect(shelf).toHaveLength(MOCK_CONTENT.length);
  });

  it('publishes the first Pensil.Pos video, as a video and as the first lesson of the starter course', async () => {
    const shelf = await new MockLibrary(MOCK_CONTENT).allContent();

    const video = shelf.find(
      (content): content is Video =>
        content.kind === 'video' && content.topicSlug === 'pensil-pos' && isAvailable(content),
    );
    expect(video?.video?.value).toBe('oFdO0jTK0n8');

    const course = shelf.find(
      (content): content is Course =>
        content.kind === 'course' && content.topicSlug === 'pensil-pos',
    );
    expect(course?.lessons[0]?.video?.value).toBe('oFdO0jTK0n8');
  });

  it('keeps content without a video as coming soon', async () => {
    const raw: RawContent = {
      kind: 'video',
      slug: 'soon',
      title: 'Soon',
      summary: 'Coming soon.',
      topic: 'pensil-pos',
      publishedOn: '2026-10-08',
      durationSeconds: 300,
    };

    const [video] = await new MockLibrary([raw]).allContent();

    expect(video && isAvailable(video)).toBe(false);
  });

  it('drops content with an invalid YouTube link and reports it', async () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const raw: RawContent = {
      kind: 'course',
      slug: 'broken',
      title: 'Broken',
      summary: 'A lesson points to another site.',
      topic: 'pensil-pos',
      publishedOn: '2026-10-08',
      lessons: [
        { slug: 'one', title: 'One', youtubeUrl: 'https://vimeo.com/1', durationSeconds: 60 },
      ],
    };

    expect(await new MockLibrary([raw]).allContent()).toEqual([]);
    expect(report).toHaveBeenCalledWith(expect.stringContaining('broken'));
  });
});
