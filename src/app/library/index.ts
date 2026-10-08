// Public API of the library module. It must not import `topics` (topics imports this file).
export type { ContentKindFilter } from './domain/content-shelf';
export {
  contentDuration,
  isAvailable,
  isPublishedLesson,
  type ContentKind,
  type Course,
  type Guide,
  type GuideSection,
  type LearningContent,
  type Lesson,
  type Video,
} from './domain/learning-content';
export type { LessonNavigation } from './domain/lesson-navigation';
export type { YouTubeVideoId } from './domain/youtube-video-id';
export { BrowseLibrary, type LibraryOverview } from './application/browse-library';
export { ExploreTopic, type TopicShelf } from './application/explore-topic';
export { OpenContent, type OpenContentError, type OpenedContent } from './application/open-content';
export {
  WatchLesson,
  type LessonInCourse,
  type WatchLessonError,
} from './application/watch-lesson';
export { provideLibrary } from './library.providers';
export { ContentCard } from './ui/content-card';
export { ContentHeading } from './ui/content-heading';
export { ContentNotice } from './ui/content-notice';
export { contentDescription, contentTitle } from './ui/content-resolvers';
export { RelatedContent } from './ui/related-content';
export {
  CONTENT_KIND,
  CONTENT_KINDS,
  contentPath,
  kindFilterFromSegment,
  lessonCountLabel,
  lessonPath,
} from './ui/content-kind';
export { VideoPlayer } from './ui/video-player';
