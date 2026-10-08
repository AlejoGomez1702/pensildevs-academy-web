import { describe, expect, it } from 'vitest';
import { Duration } from '../../shared/kernel/duration';
import { contentDuration, isAvailable } from './learning-content';
import { aCourse, aGuide, aLesson, aVideo, aYouTubeVideo } from './learning-content.fixtures';

describe('Learning content', () => {
  describe('availability', () => {
    it('makes a video available once it has a YouTube video', () => {
      expect(isAvailable(aVideo({ video: aYouTubeVideo() }))).toBe(true);
      expect(isAvailable(aVideo({ video: null }))).toBe(false);
    });

    it('makes a course available once at least one lesson is published', () => {
      expect(
        isAvailable(aCourse({ lessons: [aLesson({ video: null }), aLesson({ slug: 'b' })] })),
      ).toBe(true);
      expect(isAvailable(aCourse({ lessons: [aLesson({ video: null })] }))).toBe(false);
      expect(isAvailable(aCourse({ lessons: [] }))).toBe(false);
    });

    it('makes a guide available once it has sections', () => {
      expect(isAvailable(aGuide())).toBe(true);
      expect(isAvailable(aGuide({ sections: [] }))).toBe(false);
    });
  });

  describe('duration', () => {
    it('is the length of the video', () => {
      expect(contentDuration(aVideo({ duration: Duration.ofMinutes(7) })).seconds).toBe(420);
    });

    it('adds up only the published lessons of a course', () => {
      const course = aCourse({
        lessons: [
          aLesson({ slug: 'a', duration: Duration.ofMinutes(4) }),
          aLesson({ slug: 'b', duration: Duration.ofMinutes(6) }),
          aLesson({ slug: 'c', duration: Duration.ofMinutes(30), video: null }),
        ],
      });

      expect(contentDuration(course).seconds).toBe(600);
    });

    it('is the reading time of a guide', () => {
      expect(contentDuration(aGuide({ readingTime: Duration.ofMinutes(3) })).seconds).toBe(180);
    });
  });
});
