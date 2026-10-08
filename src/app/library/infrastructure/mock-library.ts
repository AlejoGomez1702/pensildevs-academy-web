import { Duration } from '../../shared/kernel/duration';
import { err, ok, type Result } from '../../shared/kernel/result';
import { Library } from '../application/library';
import type { LearningContent, Lesson } from '../domain/learning-content';
import { YouTubeVideoId } from '../domain/youtube-video-id';
import type { RawContent, RawLesson } from './raw-content';

type Conversion<T> = Result<T, string>;

/** Serves content written by hand in `mock-content.ts` until the academy has a CMS or an API. */
export class MockLibrary extends Library {
  private readonly shelf: readonly LearningContent[];

  constructor(raw: readonly RawContent[]) {
    super();
    this.shelf = raw.flatMap((item) => {
      const content = toLearningContent(item);
      if (!content.ok) {
        // A broken item must not take the whole academy down: skip it and tell whoever loads the data.
        console.error(`Academy content "${item.slug}" was skipped: ${content.error}`);
        return [];
      }
      return [content.value];
    });
  }

  allContent(): Promise<readonly LearningContent[]> {
    return Promise.resolve(this.shelf);
  }
}

function toLearningContent(raw: RawContent): Conversion<LearningContent> {
  const base = {
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    topicSlug: raw.topic,
    publishedOn: raw.publishedOn,
    featured: raw.featured ?? false,
  };
  switch (raw.kind) {
    case 'video': {
      const video = toVideoId(raw.youtubeUrl);
      return video.ok
        ? ok({
            ...base,
            kind: 'video',
            video: video.value,
            duration: Duration.ofSeconds(raw.durationSeconds),
          })
        : video;
    }
    case 'course': {
      const lessons = collect(raw.lessons.map(toLesson));
      return lessons.ok ? ok({ ...base, kind: 'course', lessons: lessons.value }) : lessons;
    }
    case 'guide':
      return ok({
        ...base,
        kind: 'guide',
        readingTime: Duration.ofMinutes(raw.readingMinutes),
        sections: raw.sections,
      });
  }
}

function toLesson(raw: RawLesson): Conversion<Lesson> {
  const video = toVideoId(raw.youtubeUrl);
  return video.ok
    ? ok({
        slug: raw.slug,
        title: raw.title,
        video: video.value,
        duration: Duration.ofSeconds(raw.durationSeconds),
      })
    : err(`lesson "${raw.slug}": ${video.error}`);
}

function toVideoId(youtubeUrl: string | undefined): Conversion<YouTubeVideoId | null> {
  if (youtubeUrl === undefined) {
    return ok(null);
  }
  const id = YouTubeVideoId.parse(youtubeUrl);
  return id.ok ? id : err(`"${youtubeUrl}" is not a YouTube video`);
}

function collect<T>(conversions: readonly Conversion<T>[]): Conversion<readonly T[]> {
  const values: T[] = [];
  for (const conversion of conversions) {
    if (!conversion.ok) {
      return conversion;
    }
    values.push(conversion.value);
  }
  return ok(values);
}
