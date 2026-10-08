import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPublishedLesson, lessonPath, type Course } from '../../library';
import { Icon } from '../../shared/ui/icon';

/** Lessons of a course in order. Lessons coming soon are listed, but cannot be opened. */
@Component({
  selector: 'app-lesson-list',
  imports: [Icon, RouterLink],
  host: { class: 'block' },
  template: `
    <nav aria-label="Lecciones del curso">
      <ol class="grid gap-2">
        @for (lesson of course().lessons; track lesson.slug; let index = $index) {
          <li>
            @if (isPublished(lesson)) {
              <a
                [routerLink]="pathOf(lesson.slug)"
                class="flex min-h-12 items-center gap-4 rounded-2xl border p-4 transition-colors hover:border-ink"
                [class]="lesson.slug === current() ? 'border-ink bg-paper-sunken' : 'border-line bg-paper-raised'"
                [attr.aria-current]="lesson.slug === current() ? 'page' : null"
              >
                <span class="step-dot">{{ index + 1 }}</span>
                <span class="grow font-semibold">{{ lesson.title }}</span>
                <span class="inline-flex shrink-0 items-center gap-1.5 text-sm text-ink-muted">
                  <app-icon name="clock" class="size-4" />
                  {{ lesson.duration.format() }}
                </span>
              </a>
            } @else {
              <div class="flex min-h-12 items-center gap-4 rounded-2xl border border-dashed border-line p-4">
                <span class="grid size-7 shrink-0 place-items-center rounded-full bg-paper-sunken text-sm font-bold text-ink-muted">
                  {{ index + 1 }}
                </span>
                <span class="grow font-semibold text-ink-muted">{{ lesson.title }}</span>
                <span class="shrink-0 text-sm font-semibold text-ink-muted">Próximamente</span>
              </div>
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class LessonList {
  readonly course = input.required<Course>();
  /** Slug of the lesson being watched, if any. */
  readonly current = input<string>();

  protected readonly isPublished = isPublishedLesson;

  protected pathOf(lessonSlug: string): string {
    return lessonPath(this.course().slug, lessonSlug);
  }
}
