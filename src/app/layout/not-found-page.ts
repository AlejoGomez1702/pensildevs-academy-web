import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'app-not-found-page',
  imports: [Icon, RouterLink],
  template: `
    <section aria-labelledby="not-found-title" class="relative overflow-hidden">
      <div class="notebook-grid absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-page py-24 text-center sm:py-32">
        <p class="font-display text-8xl font-extrabold text-line" aria-hidden="true">404</p>
        <h1 id="not-found-title" class="mt-2 text-4xl font-extrabold sm:text-5xl">
          Esta lección se quedó en <span class="scribble">boceto</span>
        </h1>
        <p class="mx-auto mt-4 max-w-md text-lg text-ink-muted">
          No encontramos lo que buscas. Puede que el enlace haya cambiado o que la dirección tenga un error.
        </p>
        <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a routerLink="/" class="btn-primary">
            Ir al inicio del academy
            <app-icon name="arrow-right" class="size-5" />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPage {}
