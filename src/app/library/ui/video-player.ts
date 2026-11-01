import {
  afterNextRender,
  Component,
  computed,
  inject,
  Injector,
  input,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Icon } from '../../shared/ui/icon';
import { HostedVideo } from '../domain/hosted-video';
import type { VideoSource } from '../domain/learning-content';
import { YouTubeVideoId } from '../domain/youtube-video-id';

/**
 * A video, wherever it plays. On YouTube it sits behind a poster of our own: nothing is requested
 * from YouTube (no player, no thumbnail, no cookies) until the visitor presses play (docs/adr/0002).
 * Hosted by the academy it is a native player with Spanish captions and a transcript (docs/adr/0004).
 */
@Component({
  selector: 'app-video-player',
  imports: [Icon],
  host: { class: 'block' },
  template: `
    @if (hosted(); as hosted) {
      <div class="relative aspect-video overflow-hidden rounded-card bg-graphite">
        <video
          class="absolute inset-0 size-full"
          controls
          playsinline
          preload="none"
          [attr.poster]="hosted.posterUrl"
          [attr.aria-label]="'Video: ' + title()"
        >
          <source [attr.src]="hosted.fileUrl" [attr.type]="mimeTypeOf(hosted.fileUrl)" />
          <track
            kind="captions"
            srclang="es"
            label="Español"
            default
            [attr.src]="hosted.captionsUrl"
          />
        </video>
      </div>
      <details class="mt-3 rounded-xl border border-line p-4">
        <summary class="min-h-8 cursor-pointer font-semibold">Leer lo que muestra el video</summary>
        <ol class="mt-3 grid list-decimal gap-2 pl-6 text-ink-muted">
          @for (line of hosted.transcript; track $index) {
            <li>{{ line }}</li>
          }
        </ol>
      </details>
    } @else if (youtube(); as youtube) {
      <div
        class="relative aspect-video overflow-hidden rounded-card bg-graphite text-on-graphite [--focus:var(--pencil)]"
      >
        @if (playing()) {
          <iframe
            #frame
            class="absolute inset-0 size-full"
            [src]="embedUrl()"
            [title]="'Video: ' + title()"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        } @else {
          <div class="poster-grid notebook-grid absolute inset-0" aria-hidden="true"></div>
          <button
            type="button"
            class="group absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center"
            (click)="play()"
          >
            <span
              class="grid size-16 place-items-center rounded-full bg-pencil text-on-pencil shadow-[0_3px_0_var(--pencil-strong)] transition-transform duration-200 group-hover:scale-105 sm:size-20"
            >
              <app-icon name="play" class="size-8 translate-x-0.5 sm:size-9" />
            </span>
            <span class="max-w-lg font-display text-lg font-bold text-balance sm:text-2xl">
              <span class="sr-only">Reproducir video: </span>{{ title() }}
            </span>
          </button>
        }
      </div>
      <p class="mt-3">
        <a
          [href]="youtube.watchUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex min-h-12 items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink"
        >
          <app-icon name="external" class="size-4" />
          Ver en YouTube<span class="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </p>
    }
  `,
  styles: `
    .poster-grid {
      --grid-line: color-mix(in oklab, var(--on-graphite) 9%, transparent);
    }
  `,
})
export class VideoPlayer {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly injector = inject(Injector);
  private readonly frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');

  readonly video = input.required<VideoSource>();
  /** Names the play button and the player for screen readers. */
  readonly title = input.required<string>();

  protected readonly playing = signal(false);
  protected readonly hosted = computed(() => {
    const video = this.video();
    return video instanceof HostedVideo ? video : null;
  });
  protected readonly youtube = computed(() => {
    const video = this.video();
    return video instanceof YouTubeVideoId ? video : null;
  });
  // Reviewed in docs/adr/0002-youtube-video-embedding.md: the URL is built by YouTubeVideoId from a
  // validated 11-character id, always on youtube-nocookie.com; nothing typed by a visitor reaches it.
  protected readonly embedUrl = computed(() =>
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization -- see docs/adr/0002-youtube-video-embedding.md
    this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube()?.embedUrl ?? 'about:blank'),
  );

  protected mimeTypeOf(fileUrl: string): string {
    return fileUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4';
  }

  protected play(): void {
    this.playing.set(true);
    // The button disappears; keep keyboard and screen reader users on the player.
    afterNextRender(() => this.frame()?.nativeElement.focus(), { injector: this.injector });
  }
}
