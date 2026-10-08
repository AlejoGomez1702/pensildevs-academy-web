import { Component, computed, inject, input, resource } from '@angular/core';
import {
  ContentHeading,
  ContentNotice,
  OpenContent,
  RelatedContent,
  VideoPlayer,
  type Video,
} from '../../library';
import { Icon } from '../../shared/ui/icon';
import { topicLink } from '../../topics';

@Component({
  selector: 'app-video-page',
  imports: [ContentHeading, ContentNotice, Icon, RelatedContent, VideoPlayer],
  template: `
    @if (state(); as state) {
      @if (state.ok) {
        @let video = state.value.content;
        @let topic = topicOf(video);
        <article aria-labelledby="content-title" class="container-page py-10 sm:py-14">
          <div class="max-w-4xl">
            <app-content-heading
              kind="video"
              [title]="video.title"
              [topicName]="topic.name"
              [topicPath]="topic.path"
            />
            <p class="mt-4 inline-flex items-center gap-1.5 font-medium text-ink-muted">
              <app-icon name="clock" class="size-5" />
              {{ video.duration.format() }}
            </p>
            @if (video.video; as youtube) {
              <app-video-player class="mt-8" [video]="youtube" [title]="video.title" />
            }
            <h2 class="mt-8 text-2xl font-bold">De qué trata</h2>
            <p class="mt-3 max-w-2xl text-lg text-ink-muted">{{ video.summary }}</p>
          </div>
        </article>
        <app-related-content [contents]="state.value.related" />
      } @else {
        @switch (state.error.reason) {
          @case ('coming-soon') {
            @let topic = topicOf(state.error.content);
            <app-content-notice
              title="Este video estará disponible pronto"
              message="Lo estamos preparando. Mientras tanto, revisa el resto del contenido."
              [linkLabel]="'Ver contenido de ' + topic.name"
              [linkPath]="topic.path"
            />
          }
          @default {
            <app-content-notice
              title="No encontramos ese video"
              message="Puede que el enlace haya cambiado. Busca el video desde su producto o servicio."
              linkLabel="Ir al inicio del academy"
              linkPath="/"
            />
          }
        }
      }
    }
  `,
})
export class VideoPage {
  private readonly openContent = inject(OpenContent);

  readonly slug = input.required<string>();

  protected readonly result = resource({
    params: () => this.slug(),
    loader: ({ params }) => this.openContent.execute('video', params),
  });
  protected readonly state = computed(() => (this.result.hasValue() ? this.result.value() : null));

  protected readonly topicOf = (video: Video) => topicLink(video.topicSlug);
}
