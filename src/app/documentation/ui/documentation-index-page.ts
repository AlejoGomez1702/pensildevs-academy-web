import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Membership, SIGN_IN_PATH } from '../../account';
import { Icon } from '../../shared/ui/icon';
import { findTopicBySlug } from '../../topics';
import { BrowseDocumentation } from '../application/read-documentation';
import { DOC_TRACKS } from '../domain/documentation';
import { DOC_TRACK, productDocumentationPath } from './doc-track';

/** Public entrance: what each product's documentation covers, and how to get in. */
@Component({
  selector: 'app-documentation-index-page',
  imports: [Icon, RouterLink],
  template: `
    <section aria-labelledby="documentation-title" class="relative overflow-hidden">
      <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-page py-16 sm:py-20">
        <p class="eyebrow">Documentación</p>
        <h1 id="documentation-title" class="mt-2 text-4xl font-extrabold sm:text-6xl">
          El manual completo de tus productos
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-ink-muted">
          Cada producto de Pensil.Devs tiene su documentación funcional, para usarlo día a día, y su
          documentación técnica, para instalarlo y darle soporte. Es exclusiva para clientes:
          ingresa con la misma cuenta que usas en el producto.
        </p>
      </div>
    </section>

    <section aria-labelledby="documented-products-title" class="container-page pb-16 sm:pb-24">
      <h2 id="documented-products-title" class="sr-only">Productos con documentación</h2>
      <ul class="grid gap-6">
        @for (product of products(); track product.productSlug) {
          @let path = pathOf(product.productSlug);
          <li class="card grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 class="text-3xl font-bold">{{ nameOf(product.productSlug) }}</h3>
              <ul class="mt-6 grid gap-4 sm:grid-cols-2">
                @for (track of tracks; track track) {
                  <li class="flex gap-3">
                    <span
                      class="grid size-11 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf-text"
                    >
                      <app-icon [name]="trackInfo[track].icon" class="size-6" />
                    </span>
                    <span>
                      <span class="block font-semibold"
                        >{{ trackInfo[track].label }} · {{ articlesLabel(product[track]) }}</span
                      >
                      <span class="block text-ink-muted">{{ trackInfo[track].audience }}</span>
                    </span>
                  </li>
                }
              </ul>
            </div>
            @if (member()) {
              <a [routerLink]="path" class="btn-primary">
                Abrir documentación
                <app-icon name="arrow-right" class="size-5" />
              </a>
            } @else {
              <a [routerLink]="signInPath" [queryParams]="{ volver: path }" class="btn-primary">
                <app-icon name="lock" class="size-5" />
                Ingresar para leer
              </a>
            }
          </li>
        }
      </ul>
    </section>
  `,
})
export class DocumentationIndexPage {
  private readonly browse = inject(BrowseDocumentation);

  protected readonly member = inject(Membership).member;
  protected readonly signInPath = SIGN_IN_PATH;
  protected readonly tracks = DOC_TRACKS;
  protected readonly trackInfo = DOC_TRACK;
  protected readonly catalog = resource({ loader: () => this.browse.products() });
  protected readonly products = () => (this.catalog.hasValue() ? this.catalog.value() : []);

  protected nameOf(productSlug: string): string {
    return findTopicBySlug(productSlug)?.name ?? productSlug;
  }

  protected pathOf(productSlug: string): string {
    return productDocumentationPath(productSlug);
  }

  protected articlesLabel(count: number): string {
    return count === 1 ? '1 artículo' : `${count} artículos`;
  }
}
