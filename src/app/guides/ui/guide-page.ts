import { Component, computed, inject, input, resource } from '@angular/core';
import {
  ContentHeading,
  ContentNotice,
  OpenContent,
  RelatedContent,
  type Guide,
} from '../../library';
import { Icon } from '../../shared/ui/icon';
import { topicLink } from '../../topics';

@Component({
  selector: 'app-guide-page',
  imports: [ContentHeading, ContentNotice, Icon, RelatedContent],
  template: `
    @if (state(); as state) {
      @if (state.ok) {
        @let guide = state.value.content;
        @let topic = topicOf(guide);
        <article aria-labelledby="content-title">
          <header class="relative overflow-hidden">
            <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
            <div class="container-page py-14 sm:py-20">
              <app-content-heading
                kind="guide"
                [title]="guide.title"
                [topicName]="topic.name"
                [topicPath]="topic.path"
              />
              <p class="mt-5 max-w-2xl text-lg text-ink-muted">{{ guide.summary }}</p>
              <p class="mt-4 inline-flex items-center gap-1.5 font-medium text-ink-muted">
                <app-icon name="clock" class="size-5" />
                {{ guide.readingTime.format() }} de lectura
              </p>
            </div>
          </header>

          <div class="container-page grid gap-12 pb-16 sm:pb-24 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <nav aria-labelledby="guide-index-title" class="lg:sticky lg:top-24 lg:self-start">
              <h2 id="guide-index-title" class="font-sans text-base font-semibold text-leaf-text">
                En esta guía
              </h2>
              <ol class="mt-3 grid gap-1">
                @for (section of guide.sections; track section.id) {
                  <li>
                    <a
                      [href]="'#' + section.id"
                      class="flex min-h-12 items-center rounded-xl px-3 font-medium text-ink-muted hover:bg-paper-sunken hover:text-ink"
                      >{{ section.title }}</a
                    >
                  </li>
                }
              </ol>
            </nav>

            <div class="grid max-w-2xl gap-12">
              @for (section of guide.sections; track section.id) {
                <section
                  [id]="section.id"
                  [attr.aria-labelledby]="section.id + '-title'"
                  class="scroll-mt-24"
                >
                  <h2 [id]="section.id + '-title'" class="text-2xl font-bold sm:text-3xl">
                    {{ section.title }}
                  </h2>
                  @if (section.intro; as intro) {
                    <p class="mt-3 text-lg text-ink-muted">{{ intro }}</p>
                  }
                  <ol class="mt-6 grid gap-4">
                    @for (step of section.steps; track $index) {
                      <li class="flex gap-4">
                        <span class="step-dot mt-0.5">{{ $index + 1 }}</span>
                        <span class="text-lg">{{ step }}</span>
                      </li>
                    }
                  </ol>
                </section>
              }
            </div>
          </div>
        </article>
        <app-related-content [contents]="state.value.related" />
      } @else {
        @switch (state.error.reason) {
          @case ('coming-soon') {
            @let topic = topicOf(state.error.content);
            <app-content-notice
              title="Esta guía estará disponible pronto"
              message="La estamos escribiendo. Mientras tanto, revisa el resto del contenido."
              [linkLabel]="'Ver contenido de ' + topic.name"
              [linkPath]="topic.path"
            />
          }
          @default {
            <app-content-notice
              title="No encontramos esa guía"
              message="Puede que el enlace haya cambiado. Busca la guía desde su producto o servicio."
              linkLabel="Ir al inicio del academy"
              linkPath="/"
            />
          }
        }
      }
    }
  `,
})
export class GuidePage {
  private readonly openContent = inject(OpenContent);

  readonly slug = input.required<string>();

  protected readonly result = resource({
    params: () => this.slug(),
    loader: ({ params }) => this.openContent.execute('guide', params),
  });
  protected readonly state = computed(() => (this.result.hasValue() ? this.result.value() : null));

  protected readonly topicOf = (guide: Guide) => topicLink(guide.topicSlug);
}
