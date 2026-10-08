import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import { topicPath, type CatalogTopic } from './topic-catalog';

/** A product or service on the home page, with how much content it already has. */
@Component({
  selector: 'app-topic-card',
  imports: [Icon, RouterLink],
  host: { class: 'block h-full' },
  template: `
    <article
      class="card group relative flex h-full flex-col p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-leaf/50"
    >
      <span
        class="grid size-12 place-items-center rounded-2xl bg-leaf-soft text-leaf-text transition-colors group-hover:bg-pencil group-hover:text-on-pencil"
      >
        <app-icon [name]="topic().icon" class="size-6" />
      </span>
      <h3 class="mt-5 text-xl font-bold">
        <a
          [routerLink]="path()"
          class="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-3 focus-visible:after:outline-focus"
        >{{ topic().name }}</a>
      </h3>
      <p class="mt-2 grow text-ink-muted">{{ topic().summary }}</p>
      <p class="mt-5 inline-flex items-center gap-1 font-semibold">
        {{ countLabel() }}
        <app-icon name="arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  `,
})
export class TopicCard {
  readonly topic = input.required<CatalogTopic>();
  /** Available content of the topic. */
  readonly available = input.required<number>();

  protected readonly path = computed(() => topicPath(this.topic()));
  protected readonly countLabel = computed(() => {
    const count = this.available();
    if (count === 0) {
      return 'Contenido en camino';
    }
    return count === 1 ? '1 contenido' : `${count} contenidos`;
  });
}
