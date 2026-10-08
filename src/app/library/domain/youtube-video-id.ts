import { err, ok, type Result } from '../../shared/kernel/result';

const VIDEO_ID = /^[\w-]{11}$/;
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
]);
const PATH_PREFIXES = ['/embed/', '/shorts/'];

export type YouTubeVideoIdError = 'invalid-youtube-video';

/** Identifier of a YouTube video, read from any of the link formats YouTube shares. */
export class YouTubeVideoId {
  private constructor(readonly value: string) {}

  static parse(text: string): Result<YouTubeVideoId, YouTubeVideoIdError> {
    const candidate = text.trim();
    const id = VIDEO_ID.test(candidate) ? candidate : idFromUrl(candidate);
    return id && VIDEO_ID.test(id) ? ok(new YouTubeVideoId(id)) : err('invalid-youtube-video');
  }

  /** Privacy-enhanced mode: YouTube sets no cookies until the visitor plays the video. */
  get embedUrl(): string {
    return `https://www.youtube-nocookie.com/embed/${this.value}?autoplay=1&rel=0`;
  }

  get watchUrl(): string {
    return `https://www.youtube.com/watch?v=${this.value}`;
  }
}

function idFromUrl(text: string): string | null {
  const url = URL.parse(text);
  if (!url || !YOUTUBE_HOSTS.has(url.hostname)) {
    return null;
  }
  if (url.hostname === 'youtu.be') {
    return url.pathname.slice(1);
  }
  if (url.pathname === '/watch') {
    return url.searchParams.get('v');
  }
  const prefix = PATH_PREFIXES.find((candidate) => url.pathname.startsWith(candidate));
  return prefix ? url.pathname.slice(prefix.length) : null;
}
