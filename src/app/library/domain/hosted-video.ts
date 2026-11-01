import { err, ok, type Result } from '../../shared/kernel/result';

/** Files under `/media/`, served by the academy itself; no other origin, no `..`. */
const MEDIA_PATH = /^\/media\/(?:[\w-]+\/)*[\w.-]+$/;
const VIDEO_FILE = /\.(?:mp4|webm)$/;
const CAPTIONS_FILE = /\.vtt$/;
const POSTER_FILE = /\.(?:jpg|jpeg|png|webp)$/;

export interface HostedVideoInput {
  readonly file: string;
  readonly captions: string;
  readonly poster: string;
  /** What the video shows, in order: the text alternative for people who cannot watch it. */
  readonly transcript: readonly string[];
}

export type HostedVideoError = 'invalid-hosted-video';

/**
 * A video the academy serves itself (docs/adr/0004). Captions and a transcript are required: the
 * video has no narration, so text is the only way some people get what it shows.
 */
export class HostedVideo {
  readonly fileUrl: string;
  readonly captionsUrl: string;
  readonly posterUrl: string;
  readonly transcript: readonly string[];

  private constructor(input: HostedVideoInput) {
    this.fileUrl = input.file;
    this.captionsUrl = input.captions;
    this.posterUrl = input.poster;
    this.transcript = input.transcript;
  }

  static create(input: HostedVideoInput): Result<HostedVideo, HostedVideoError> {
    const valid =
      isMedia(input.file, VIDEO_FILE) &&
      isMedia(input.captions, CAPTIONS_FILE) &&
      isMedia(input.poster, POSTER_FILE) &&
      input.transcript.length > 0;
    return valid ? ok(new HostedVideo(input)) : err('invalid-hosted-video');
  }
}

function isMedia(path: string, extension: RegExp): boolean {
  return MEDIA_PATH.test(path) && !path.includes('..') && extension.test(path);
}
