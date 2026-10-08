/**
 * Content as an editor writes it (and as a CMS or API would send it): plain text links and numbers.
 * The adapter turns it into domain objects.
 */
interface RawContentBase {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** Slug of the product or service, the same one pensildevs.com uses. */
  readonly topic: string;
  /** ISO date (YYYY-MM-DD). */
  readonly publishedOn: string;
  readonly featured?: boolean;
}

export interface RawVideo extends RawContentBase {
  readonly kind: 'video';
  /** Missing while the video is coming soon. */
  readonly youtubeUrl?: string;
  readonly durationSeconds: number;
}

export interface RawLesson {
  readonly slug: string;
  readonly title: string;
  /** Missing while the lesson is coming soon. */
  readonly youtubeUrl?: string;
  readonly durationSeconds: number;
}

export interface RawCourse extends RawContentBase {
  readonly kind: 'course';
  readonly lessons: readonly RawLesson[];
}

export interface RawGuide extends RawContentBase {
  readonly kind: 'guide';
  readonly readingMinutes: number;
  readonly sections: readonly {
    readonly id: string;
    readonly title: string;
    readonly intro?: string;
    readonly steps: readonly string[];
  }[];
}

export type RawContent = RawVideo | RawCourse | RawGuide;
