import { Component, input } from '@angular/core';
import type { LearningContent } from '../domain/learning-content';
import { ContentCard } from './content-card';

/** More content of the same topic, at the end of a video, course or guide. */
@Component({
  selector: 'app-related-content',
  imports: [ContentCard],
  host: { class: 'block' },
  template: `
    @if (contents().length > 0) {
      <section aria-labelledby="related-title" class="bg-paper-sunken py-16 sm:py-20">
        <div class="container-page">
          <h2 id="related-title" class="text-3xl font-bold">Sigue aprendiendo</h2>
          <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @for (content of contents(); track content.kind + content.slug) {
              <li><app-content-card [content]="content" /></li>
            }
          </ul>
        </div>
      </section>
    }
  `,
})
export class RelatedContent {
  readonly contents = input.required<readonly LearningContent[]>();
}
