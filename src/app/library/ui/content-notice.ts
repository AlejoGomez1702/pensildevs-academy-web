import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';

/** Whole-page message for content that does not exist or is not available yet, with a way out. */
@Component({
  selector: 'app-content-notice',
  imports: [Icon, RouterLink],
  host: { class: 'block' },
  template: `
    <section aria-labelledby="content-notice-title" class="relative overflow-hidden">
      <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-page py-24 text-center sm:py-32">
        <h1 id="content-notice-title" class="text-4xl font-extrabold sm:text-5xl">{{ title() }}</h1>
        <p class="mx-auto mt-4 max-w-md text-lg text-ink-muted">{{ message() }}</p>
        <a [routerLink]="linkPath()" class="btn-primary mt-9">
          {{ linkLabel() }}
          <app-icon name="arrow-right" class="size-5" />
        </a>
      </div>
    </section>
  `,
})
export class ContentNotice {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly linkLabel = input.required<string>();
  readonly linkPath = input.required<string>();
}
