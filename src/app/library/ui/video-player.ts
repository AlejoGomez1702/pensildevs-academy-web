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
import type { YouTubeVideoId } from '../domain/youtube-video-id';

/**
 * YouTube video behind a poster of our own: nothing is requested from YouTube (no player, no
 * thumbnail, no cookies) until the visitor presses play.
 */
@Component({
  selector: 'app-video-player',
  imports: [Icon],
  host: { class: 'block' },
  template: `
    <div class="relative aspect-video overflow-hidden rounded-card bg-graphite text-on-graphite [--focus:var(--pencil)]">
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
        [href]="video().watchUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex min-h-12 items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink"
      >
        <app-icon name="external" class="size-4" />
        Ver en YouTube<span class="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </p>
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

  readonly video = input.required<YouTubeVideoId>();
  /** Names the play button and the player for screen readers. */
  readonly title = input.required<string>();

  protected readonly playing = signal(false);
  // Safe: the URL is built by YouTubeVideoId from a validated id, always on youtube-nocookie.com.
  protected readonly embedUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.video().embedUrl));

  protected play(): void {
    this.playing.set(true);
    // The button disappears; keep keyboard and screen reader users on the player.
    afterNextRender(() => this.frame()?.nativeElement.focus(), { injector: this.injector });
  }
}
