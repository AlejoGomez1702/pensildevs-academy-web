import { HostedVideo } from '../domain/hosted-video';
import { isAvailable, type Course, type Video } from '../domain/learning-content';
import { YouTubeVideoId } from '../domain/youtube-video-id';
import { MOCK_CONTENT } from './mock-content';
import { MockLibrary } from './mock-library';
import type { RawContent } from './raw-content';

describe('Mock library (real test data)', () => {
  it('turns every piece of test data into academy content', async () => {
    const shelf = await new MockLibrary(MOCK_CONTENT).allContent();

    expect(shelf).toHaveLength(MOCK_CONTENT.length);
  });

  it('opens the Pensil.Pos starter course with the hosted introduction, then the first YouTube video', async () => {
    const shelf = await new MockLibrary(MOCK_CONTENT).allContent();

    const introduction = shelf.find(
      (content): content is Video =>
        content.kind === 'video' && content.slug === 'introduccion-a-pensil-pos',
    );
    expect(introduction?.video).toBeInstanceOf(HostedVideo);
    expect(introduction?.featured).toBe(true);

    const course = shelf.find(
      (content): content is Course =>
        content.kind === 'course' && content.topicSlug === 'pensil-pos',
    );
    expect(course?.lessons[0]?.video).toBeInstanceOf(HostedVideo);
    const firstYouTube = course?.lessons[1]?.video;
    expect(firstYouTube instanceof YouTubeVideoId && firstYouTube.value).toBe('oFdO0jTK0n8');
  });

  it('drops a video that is both on YouTube and hosted, or hosted outside the academy', async () => {
    const report = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const base = {
      kind: 'video',
      title: 'Video',
      summary: 'A video.',
      topic: 'pensil-pos',
      publishedOn: '2026-10-08',
      durationSeconds: 60,
    } as const;
    const hostedVideo = {
      file: '/media/a.mp4',
      captions: '/media/a.vtt',
      poster: '/media/a.jpg',
      transcript: ['Hola.'],
    };
    const raw: RawContent[] = [
      { ...base, slug: 'both', hostedVideo, youtubeUrl: 'oFdO0jTK0n8' },
      { ...base, slug: 'elsewhere', hostedVideo: { ...hostedVideo, file: 'https://x.com/a.mp4' } },
    ];

    expect(await new MockLibrary(raw).allContent()).toEqual([]);
    expect(report).toHaveBeenCalledWith(expect.stringContaining('both'));
    expect(report).toHaveBeenCalledWith(expect.stringContaining('elsewhere'));
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
