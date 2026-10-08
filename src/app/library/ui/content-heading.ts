import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ContentKind } from '../domain/learning-content';
import { CONTENT_KIND } from './content-kind';

/** Kind and topic above the title of a video, course or guide page, with a link back to the topic. */
@Component({
  selector: 'app-content-heading',
  imports: [RouterLink],
  host: { class: 'block' },
  template: `
    <p class="eyebrow">
      {{ kindLabel() }} ·
      <a
        [routerLink]="topicPath()"
        class="underline decoration-2 underline-offset-4 hover:decoration-pencil"
        >{{ topicName() }}</a
      >
    </p>
    <h1 id="content-title" class="mt-2 text-4xl font-extrabold sm:text-5xl">{{ title() }}</h1>
  `,
})
export class ContentHeading {
  readonly kind = input.required<ContentKind>();
  readonly title = input.required<string>();
  readonly topicName = input.required<string>();
  readonly topicPath = input.required<string>();

  protected readonly kindLabel = computed(() => CONTENT_KIND[this.kind()].label);
}
