import { Component, computed, inject, input, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentNotice } from '../../library';
import { firstName, Membership } from '../../account';
import { Icon } from '../../shared/ui/icon';
import { findTopicBySlug } from '../../topics';
import { BrowseDocumentation } from '../application/read-documentation';
import { DOC_TRACKS, type DocArticle } from '../domain/documentation';
import { articlePath, DOC_TRACK, DOCUMENTATION_PATH } from './doc-track';

@Component({
  selector: 'app-product-documentation-page',
  imports: [ContentNotice, Icon, RouterLink],
  template: `
    @if (state(); as state) {
      @if (state.ok) {
        <section aria-labelledby="product-documentation-title" class="relative overflow-hidden">
          <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
          <div class="container-page py-14 sm:py-20">
            <p class="eyebrow">{{ greeting() }}</p>
            <h1 id="product-documentation-title" class="mt-2 text-4xl font-extrabold sm:text-6xl">
              Documentación de {{ productName() }}
            </h1>
            <p class="mt-5 max-w-2xl text-lg text-ink-muted">
              Elige por dónde empezar. Cada artículo dice cuánto tarda en leerse y cuándo lo
              revisamos por última vez contra el producto.
            </p>
          </div>
        </section>

        <div class="container-page grid gap-12 pb-16 sm:pb-24 lg:grid-cols-2">
          @for (track of tracks; track track) {
            @let info = trackInfo[track];
            <section [attr.aria-labelledby]="'track-' + track">
              <div class="flex items-center gap-3">
                <span
                  class="grid size-11 place-items-center rounded-xl bg-leaf-soft text-leaf-text"
                >
                  <app-icon [name]="info.icon" class="size-6" />
                </span>
                <h2 [id]="'track-' + track" class="text-2xl font-bold sm:text-3xl">
                  {{ info.label }}
                </h2>
              </div>
              <p class="mt-3 text-ink-muted">{{ info.audience }}</p>
              <ol class="mt-6 grid gap-3">
                @for (article of state.value.articles[track]; track article.slug) {
                  <li>
                    <a
                      [routerLink]="pathOf(article)"
                      class="card flex gap-4 p-5 transition-colors hover:border-ink"
                    >
                      <span class="step-dot mt-1">{{ $index + 1 }}</span>
                      <span class="grid gap-1">
                        <span class="text-lg font-semibold">{{ article.title }}</span>
                        <span class="text-ink-muted">{{ article.summary }}</span>
                        <span class="flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                          <app-icon name="clock" class="size-4" />
                          {{ article.readingTime.format() }} de lectura
                        </span>
                      </span>
                    </a>
                  </li>
                }
              </ol>
            </section>
          }
        </div>
      } @else {
        <app-content-notice
          title="No encontramos esa documentación"
          message="Ese producto todavía no tiene documentación. Revisa los productos disponibles."
          linkLabel="Ver la documentación"
          [linkPath]="documentationPath"
        />
      }
    }
  `,
})
export class ProductDocumentationPage {
  private readonly browse = inject(BrowseDocumentation);
  private readonly member = inject(Membership).member;

  readonly product = input.required<string>();

  protected readonly documentationPath = DOCUMENTATION_PATH;
  protected readonly tracks = DOC_TRACKS;
  protected readonly trackInfo = DOC_TRACK;
  protected readonly productName = computed(
    () => findTopicBySlug(this.product())?.name ?? this.product(),
  );
  protected readonly greeting = computed(() => {
    const member = this.member();
    if (!member) {
      return 'Documentación';
    }
    const business = member.businessName ? ` · ${member.businessName}` : '';
    return `Hola, ${firstName(member)}${business}`;
  });

  protected readonly result = resource({
    params: () => this.product(),
    loader: ({ params }) => this.browse.execute(params),
  });
  protected readonly state = computed(() => (this.result.hasValue() ? this.result.value() : null));

  protected pathOf(article: DocArticle): string {
    return articlePath(this.product(), article.track, article.slug);
  }
}
