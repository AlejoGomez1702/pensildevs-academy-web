import { Component, input } from '@angular/core';

/** Eyebrow + title + optional intro used at the top of every content section. */
@Component({
  selector: 'app-section-heading',
  host: { class: 'block max-w-2xl' },
  template: `
    @if (eyebrow(); as eyebrow) {
      <p class="eyebrow">{{ eyebrow }}</p>
    }
    <h2 [id]="headingId()" class="mt-3 text-3xl font-bold sm:text-4xl">{{ title() }}</h2>
    @if (intro(); as intro) {
      <p class="mt-4 text-lg text-ink-muted">{{ intro }}</p>
    }
  `,
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly eyebrow = input<string>();
  readonly intro = input<string>();
}
