import { Component, computed, inject, input, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ContentHeading,
  ContentNotice,
  contentDuration,
  isPublishedLesson,
  lessonCountLabel,
  lessonPath,
  OpenContent,
  RelatedContent,
  type Course,
} from '../../library';
import { Icon } from '../../shared/ui/icon';
import { topicLink } from '../../topics';
import { LessonList } from './lesson-list';

@Component({
  selector: 'app-course-page',
  imports: [ContentHeading, ContentNotice, Icon, LessonList, RelatedContent, RouterLink],
  template: `
    @if (state(); as state) {
      @if (state.ok) {
        @let course = state.value.content;
        @let topic = topicOf(course);
        <section aria-labelledby="content-title" class="relative overflow-hidden">
          <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
          <div class="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_26rem]">
            <div>
              <app-content-heading
                kind="course"
                [title]="course.title"
                [topicName]="topic.name"
                [topicPath]="topic.path"
              />
              <p class="mt-5 max-w-2xl text-lg text-ink-muted">{{ course.summary }}</p>
              <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-medium text-ink-muted">
                <li class="inline-flex items-center gap-1.5">
                  <app-icon name="course" class="size-5" />
                  {{ lessonCount(course) }}
                </li>
                <li class="inline-flex items-center gap-1.5">
                  <app-icon name="clock" class="size-5" />
                  {{ length(course) }} publicados
                </li>
              </ul>
              @if (firstLessonPath(course); as path) {
                <a [routerLink]="path" class="btn-primary mt-9">
                  Empezar el curso
                  <app-icon name="play" class="size-5" />
                </a>
              }
            </div>
            <div>
              <h2 class="text-xl font-bold">Lecciones</h2>
              <app-lesson-list class="mt-4" [course]="course" />
            </div>
          </div>
        </section>
        <app-related-content [contents]="state.value.related" />
      } @else {
        @switch (state.error.reason) {
          @case ('coming-soon') {
            @let topic = topicOf(state.error.content);
            <app-content-notice
              title="Este curso estará disponible pronto"
              message="Estamos grabando sus lecciones. Mientras tanto, revisa el resto del contenido."
              [linkLabel]="'Ver contenido de ' + topic.name"
              [linkPath]="topic.path"
            />
          }
          @default {
            <app-content-notice
              title="No encontramos ese curso"
              message="Puede que el enlace haya cambiado. Busca el curso desde su producto o servicio."
              linkLabel="Ir al inicio del academy"
              linkPath="/"
            />
          }
        }
      }
    }
  `,
})
export class CoursePage {
  private readonly openContent = inject(OpenContent);

  readonly slug = input.required<string>();

  protected readonly result = resource({
    params: () => this.slug(),
    loader: ({ params }) => this.openContent.execute('course', params),
  });
  protected readonly state = computed(() => (this.result.hasValue() ? this.result.value() : null));

  protected readonly topicOf = (course: Course) => topicLink(course.topicSlug);
  protected readonly lessonCount = (course: Course) => lessonCountLabel(course.lessons.length);
  protected readonly length = (course: Course) => contentDuration(course).format();

  protected firstLessonPath(course: Course): string | null {
    const first = course.lessons.find(isPublishedLesson);
    return first ? lessonPath(course.slug, first.slug) : null;
  }
}
