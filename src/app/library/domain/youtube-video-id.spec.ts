import { describe, expect, it } from 'vitest';
import { YouTubeVideoId } from './youtube-video-id';

const ID = 'oFdO0jTK0n8';

describe('YouTubeVideoId', () => {
  it.each([
    ID,
    `https://www.youtube.com/watch?v=${ID}`,
    `https://youtube.com/watch?feature=shared&v=${ID}&t=42s`,
    `https://m.youtube.com/watch?v=${ID}`,
    `https://youtu.be/${ID}?si=abc123`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube-nocookie.com/embed/${ID}?rel=0`,
    `https://www.youtube.com/shorts/${ID}`,
    `  https://www.youtube.com/watch?v=${ID}  `,
  ])('reads the video id from "%s"', (text) => {
    const result = YouTubeVideoId.parse(text);

    expect(result.ok && result.value.value).toBe(ID);
  });

  it.each([
    '',
    'not a video',
    'oFdO0jTK0n',
    'oFdO0jTK0n8x',
    'https://www.youtube.com/watch?v=short',
    'https://vimeo.com/123456789',
    `https://example.com/watch?v=${ID}`,
    'https://www.youtube.com/channel/UC1234567890',
  ])('rejects "%s"', (text) => {
    expect(YouTubeVideoId.parse(text)).toEqual({ ok: false, error: 'invalid-youtube-video' });
  });

  it('builds a privacy-enhanced embed that starts playing and keeps suggestions from this channel', () => {
    const id = YouTubeVideoId.parse(ID);

    expect(id.ok && id.value.embedUrl).toBe(`https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0`);
    expect(id.ok && id.value.watchUrl).toBe(`https://www.youtube.com/watch?v=${ID}`);
  });
});
