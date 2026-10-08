import { Component, computed, inject, input, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ContentNotice,
  contentPath,
  lessonPath,
  VideoPlayer,
  WatchLesson,
  type Course,
} from '../../library';
import { Icon } from '../../shared/ui/icon';
import { topicLink, type TopicLink } from '../../topics';
import { LessonList } from './lesson-list';

@Component({
  selector: 'app-lesson-page',
  imports: [ContentNotice, Icon, LessonList, RouterLink, VideoPlayer],
  templateUrl: './lesson-page.html',
})
export class LessonPage {
  private readonly watchLesson = inject(WatchLesson);

  readonly slug = input.required<string>();
  readonly lesson = input.required<string>();

  protected readonly result = resource({
    params: () => ({ course: this.slug(), lesson: this.lesson() }),
    loader: ({ params }) => this.watchLesson.execute(params.course, params.lesson),
  });
  protected readonly state = computed(() => (this.result.hasValue() ? this.result.value() : null));

  protected coursePath(course: Course): string {
    return contentPath(course);
  }

  protected lessonPathOf(course: Course, lessonSlug: string): string {
    return lessonPath(course.slug, lessonSlug);
  }

  protected topicLinkOf(course: Course): TopicLink {
    return topicLink(course.topicSlug);
  }
}
