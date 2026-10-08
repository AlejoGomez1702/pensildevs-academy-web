// Test data builders for the library. Only imported from specs.
import { Duration } from '../../shared/kernel/duration';
import type { Course, Guide, Lesson, Video } from './learning-content';
import { YouTubeVideoId } from './youtube-video-id';

export function aYouTubeVideo(id = 'oFdO0jTK0n8'): YouTubeVideoId {
  const parsed = YouTubeVideoId.parse(id);
  if (!parsed.ok) {
    throw new Error(`Invalid test video id ${id}`);
  }
  return parsed.value;
}

export function aVideo(overrides: Partial<Video> = {}): Video {
  return {
    kind: 'video',
    slug: 'a-video',
    title: 'A video',
    summary: 'What the video teaches.',
    topicSlug: 'pensil-pos',
    publishedOn: '2026-10-01',
    featured: false,
    video: aYouTubeVideo(),
    duration: Duration.ofMinutes(5),
    ...overrides,
  };
}

export function aLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    slug: 'a-lesson',
    title: 'A lesson',
    video: aYouTubeVideo(),
    duration: Duration.ofMinutes(5),
    ...overrides,
  };
}

export function aCourse(overrides: Partial<Course> = {}): Course {
  return {
    kind: 'course',
    slug: 'a-course',
    title: 'A course',
    summary: 'What the course teaches.',
    topicSlug: 'pensil-pos',
    publishedOn: '2026-10-01',
    featured: false,
    lessons: [aLesson()],
    ...overrides,
  };
}

export function aGuide(overrides: Partial<Guide> = {}): Guide {
  return {
    kind: 'guide',
    slug: 'a-guide',
    title: 'A guide',
    summary: 'What the guide explains.',
    topicSlug: 'pensil-pos',
    publishedOn: '2026-10-01',
    featured: false,
    readingTime: Duration.ofMinutes(4),
    sections: [{ id: 'first', title: 'First', steps: ['Do this.'] }],
    ...overrides,
  };
}
