import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import { contentDuration, isAvailable, type LearningContent } from '../domain/learning-content';
import { CONTENT_KIND, contentPath, lessonCountLabel } from './content-kind';

const AVAILABLE_CLASSES =
  'transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-leaf/50';
const COMING_SOON_CLASSES = 'border-dashed shadow-none';

/** A video, course or guide in a list. Content coming soon is shown, but cannot be opened. */
@Component({
  selector: 'app-content-card',
  imports: [Icon, RouterLink],
  host: { class: 'block h-full' },
  template: `
    @let kind = kindPresentation();
    <article class="card group relative flex h-full flex-col p-6" [class]="stateClasses()">
      <div class="flex items-center justify-between gap-3">
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-leaf-text">
          <span class="grid size-9 place-items-center rounded-xl bg-leaf-soft">
            <app-icon [name]="kind.icon" class="size-5" />
          </span>
          {{ kind.label }}
        </span>
        @if (!available()) {
          <span class="rounded-full bg-paper-sunken px-3 py-1 text-sm font-semibold text-ink-muted"
            >Próximamente</span
          >
        }
      </div>
      @if (topicName(); as topicName) {
        <p class="mt-4 text-sm font-medium text-ink-muted">{{ topicName }}</p>
      }
      <h3 class="mt-2 text-xl font-bold" [class.mt-4]="!topicName()">
        @if (available()) {
          <a
            [routerLink]="path()"
            class="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-focus"
            >{{ content().title }}</a
          >
        } @else {
          {{ content().title }}
        }
      </h3>
      <p class="mt-2 grow text-ink-muted">{{ content().summary }}</p>
      @if (available()) {
        <p
          class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-ink-muted"
        >
          <span class="inline-flex items-center gap-1.5">
            <app-icon name="clock" class="size-4" />
            {{ lengthLabel() }}
          </span>
          @if (lessons(); as lessons) {
            <span>{{ lessons }}</span>
          }
        </p>
      }
    </article>
  `,
})
export class ContentCard {
  readonly content = input.required<LearningContent>();
  /** Shown above the title when the list mixes topics. */
  readonly topicName = input<string>();

  protected readonly available = computed(() => isAvailable(this.content()));
  protected readonly stateClasses = computed(() =>
    this.available() ? AVAILABLE_CLASSES : COMING_SOON_CLASSES,
  );
  protected readonly kindPresentation = computed(() => CONTENT_KIND[this.content().kind]);
  protected readonly path = computed(() => contentPath(this.content()));
  protected readonly lengthLabel = computed(() => {
    const length = contentDuration(this.content()).format();
    return this.content().kind === 'guide' ? `${length} de lectura` : length;
  });
  protected readonly lessons = computed(() => {
    const content = this.content();
    return content.kind === 'course' ? lessonCountLabel(content.lessons.length) : null;
  });
}
